import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const requireMatch = (condition, label) => assert.ok(condition, 'CI DATABASE PREFLIGHT BLOCKED: ' + label);
export function verifyContext(env, event) {
  requireMatch(env.GITHUB_ACTIONS === 'true' && env.CI_RUNNER_ENVIRONMENT === 'github-hosted' && env.RUNNER_OS === 'Linux', 'fresh GitHub-hosted Linux runner required');
  requireMatch(env.GITHUB_REPOSITORY === 'fgzmac/OnToTheNext' && env.GITHUB_JOB === 'verify', 'repository/job mismatch');
  requireMatch(/^\d+$/.test(env.GITHUB_RUN_ID ?? '') && /^\d+$/.test(env.GITHUB_RUN_ATTEMPT ?? ''), 'run identity missing');
  const branch = 'feat/cross-destination-discovery';
  if (env.GITHUB_EVENT_NAME === 'push') requireMatch(env.GITHUB_REF === 'refs/heads/' + branch && event.after === env.GITHUB_SHA, 'push revision mismatch');
  else {
    requireMatch(env.GITHUB_EVENT_NAME === 'pull_request', 'event not authorized');
    requireMatch(event.pull_request?.head?.ref === branch && event.pull_request?.head?.repo?.full_name === env.GITHUB_REPOSITORY && event.pull_request?.base?.ref === 'refine/itinerary-builder-basics', 'dependent PR mismatch');
  }
  requireMatch(env.RESEARCH_ENABLED !== 'approved' && !env.RESEARCH_BRAVE_KEY && !env.RESEARCH_OPENAI_KEY && !env.OPENAI_API_KEY, 'live research/credentials forbidden');
  requireMatch(env.DATABASE_URL === env.TEST_DATABASE_URL, 'test URL mismatch');
  const url = new URL(env.DATABASE_URL);
  requireMatch(url.protocol === 'postgresql:' && url.hostname === 'localhost' && url.port === '5433' && url.pathname === '/ontothenext_test' && decodeURIComponent(url.username) === 'ontothenext' && url.search === '?schema=public' && !url.hash, 'connection target mismatch');
  const service = JSON.parse(env.CI_POSTGRES_SERVICE ?? '{}');
  requireMatch(/^[a-f0-9]{64}$/.test(service.id ?? '') && !!service.network && String(service.ports?.['5432']) === '5433', 'workflow service identity missing');
  return service;
}
export function verifyContainer(service, container, network, volumes, now = Date.now()) {
  requireMatch(container.Id === service.id && container.Config.Image === 'postgres:17-alpine' && container.State.Running, 'service container mismatch');
  requireMatch(network.Id === service.network || network.Name === service.network, 'workflow network mismatch');
  requireMatch(network.Name.startsWith('github_network_') && Object.keys(network.Containers ?? {}).length === 1 && !!network.Containers[service.id], 'network is not exclusive to this workflow service');
  requireMatch(Object.values(container.NetworkSettings.Networks).some(n => n.NetworkID === network.Id), 'container network mismatch');
  requireMatch(container.NetworkSettings.Ports['5432/tcp']?.every(p => p.HostPort === '5433') && container.NetworkSettings.Ports['5432/tcp'].length > 0, 'published port mismatch');
  requireMatch(!container.HostConfig.Binds?.length && !container.HostConfig.Mounts?.length && !container.HostConfig.VolumesFrom?.length, 'explicit/persistent mount forbidden');
  const created = Date.parse(container.Created);
  requireMatch(Number.isFinite(created) && created <= now && now - created < 30 * 60_000, 'service is not fresh');
  requireMatch(container.Mounts.length === 1 && volumes.length === 1, 'unexpected database mounts');
  const mount = container.Mounts[0], volume = volumes[0];
  requireMatch(mount.Type === 'volume' && /^[a-f0-9]{64}$/.test(mount.Name) && mount.Destination === '/var/lib/postgresql/data' && mount.RW && volume.Name === mount.Name && volume.Driver === 'local' && !Object.keys(volume.Options ?? {}).length && Object.keys(volume.Labels ?? {}).length === 1 && volume.Labels['com.docker.volume.anonymous'] === '', 'only fresh anonymous image volume permitted');
  requireMatch(Date.parse(volume.CreatedAt) >= created - 5000 && Date.parse(volume.CreatedAt) <= now, 'volume predates this service');
}
async function main() {
  // Refuse local invocation before reading event/config files or opening a connection.
  requireMatch(process.env.GITHUB_ACTIONS === 'true' && process.env.CI_RUNNER_ENVIRONMENT === 'github-hosted', 'GitHub-hosted execution only');
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const service = verifyContext(process.env, event);
  const inspect = (...args) => JSON.parse(execFileSync('docker', args, { encoding: 'utf8' }))[0];
  const container = inspect('inspect', service.id), network = inspect('network', 'inspect', service.network);
  const volumes = container.Mounts.filter(m => m.Type === 'volume').map(m => inspect('volume', 'inspect', m.Name));
  verifyContainer(service, container, network, volumes);
  const owners = execFileSync('docker', ['ps', '-a', '--no-trunc', '--filter', 'volume=' + volumes[0].Name, '--format', '{{.ID}}'], { encoding: 'utf8' }).trim().split('\n');
  requireMatch(owners.length === 1 && owners[0] === service.id, 'volume shared with another container');
  const { default: prisma } = await import('../prisma.config.ts');
  const { default: browser } = await import('../playwright.config.ts');
  requireMatch(prisma.datasource?.url === process.env.DATABASE_URL && !browser.webServer.env, 'effective Prisma/browser configuration mismatch');
  const { default: pg } = await import('pg');
  const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await db.connect();
  try {
    const { rows: [identity] } = await db.query('SELECT current_database() AS database, current_user AS username, current_schema() AS schema, inet_server_addr()::text AS address, inet_server_port() AS port');
    const addresses = Object.values(container.NetworkSettings.Networks).map(n => n.IPAddress);
    requireMatch(identity.database === 'ontothenext_test' && identity.username === 'ontothenext' && identity.schema === 'public' && identity.port === 5432 && addresses.includes(identity.address), 'actual database/user/schema/server mismatch');
    const { rows: [state] } = await db.query("SELECT count(*)::int AS tables FROM pg_tables WHERE schemaname='public'");
    requireMatch(state.tables === 0, 'service database is not empty before migrations');
    const checkout = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    requireMatch(checkout === process.env.GITHUB_SHA, 'checkout SHA mismatch');
    console.log('CI database identity verified:', JSON.stringify({ run: process.env.GITHUB_RUN_ID, attempt: process.env.GITHUB_RUN_ATTEMPT, event: process.env.GITHUB_EVENT_NAME, branchHead: event.pull_request?.head?.sha ?? event.after, checkout, host: 'localhost', hostPort: 5433, ...identity, serviceId: service.id, network: network.Name, freshAnonymousVolume: volumes[0].Name, publicTables: state.tables, liveResearch: 'disabled' }));
  } finally { await db.end(); }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error?.code === 'ERR_ASSERTION' ? error.message : 'CI DATABASE PREFLIGHT BLOCKED: inspection/configuration/connection failed'); process.exitCode = 1; });
}
