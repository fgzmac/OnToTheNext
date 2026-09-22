# Local development storage

Keep one canonical checkout on the external development drive. Source, .git,
node_modules, .next, src/generated/prisma, coverage, test-results and
playwright-report stay inside that checkout. Do not commit machine paths or data.

## Windows PowerShell

From the checkout, dot-source the session setup before installs, builds or tests:

```powershell
. ./scripts/dev-session.ps1
# First setup only; preserve any existing .env:
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm ci
npm run db:generate
npx playwright install chromium
docker compose config --quiet
docker compose up -d postgres
```

The session places npm and temporary files in ignored .cache subdirectories.
PLAYWRIGHT_BROWSERS_PATH=0 selects the hermetic browser location under
node_modules/playwright-core/.local-browsers on the same SSD. Project .npmrc also directs ordinary npm commands to .cache/npm.
Use the same session for Playwright installation and execution. Close the shell
to discard its environment overrides; dot-sourcing changes the working directory.
CI skips the session overrides and retains its normal ephemeral browser storage.
No global npm settings are changed.

## PostgreSQL

Compose uses the ontothenext-postgres named volume for PostgreSQL 17. Its live data
resides in Docker-managed Linux storage, never a direct exFAT bind mount. Existing
local example credentials are preserved. No existing volume should be deleted.
Keep the project workspace and global Docker storage on suitable filesystems. Machine-specific mount paths and backup records belong outside Git.
The ignored .data directory is reserved for optional project-local artifacts.

Validate startup, pg_isready, and persistence across container recreation before
considering a new storage location ready. Compose syntax validation alone does not
verify database filesystem compatibility. Do not run reset against user data.

## Filesystem limits

NTFS is preferred on Windows. exFAT lacks ownership/ACLs, symlinks, and journaling.
Git may require an exact-path safe.directory entry in the user's Git configuration;
never use a wildcard trust exception. Ordinary Windows npm command shims can work,
but packages requiring symlinks and some Next/Prisma operations may fail. Linux
PostgreSQL permission requirements may prevent Docker bind mounts on this filesystem.
Do not reformat or silently fall back to internal storage. Report an actual blocker.
File watching must be checked when the development server can run.

Use native Windows Node for this checkout. WSL access through /mnt/<drive> can be
slower and affect file watching; do not install a second dependency tree there or
share Windows node_modules with Linux. Internal-storage savings take priority.
Keep the SSD attached while tools or the database are running; stop them before
safely ejecting it. Docker images, build cache and the VM remain global Docker
storage; relocating that storage requires separate owner approval.

## Historical exFAT limitations

On exFAT, Playwright hermetic installation can still fail its directory lock
because directory modification timestamps round to two-second boundaries.
Changing from a separate cache to hermetic mode does not change that filesystem
behavior. The default Next.js Turbopack build also needs junction points, which
exFAT cannot create. Do not bypass browser locks or change product behavior to
hide these failures. NTFS avoids these limitations; verify
the browser suite and default build after infrastructure changes.

## Application ports and boundaries

On To The Next uses web port 3100 and PostgreSQL host port 5433; PostgreSQL's
container port remains 5432. Keep both local database URLs on localhost:5433.
Its Compose namespace is ontothenext and its database named volume is
ontothenext_ontothenext-postgres. Options owns its separate namespace and may use
3000/5432; never alter its resources from itinerary work. Playwright targets only
127.0.0.1:3100 and preserves the hermetic local browser setup described above.
The protected db:reset entry point validates URL identity before reset/seed;
actual target verification and explicit destructive-operation authorization still
apply. No global Docker shutdown, detach, prune or cleanup is implied by app work.
