# Project instructions

Before implementation, verify the checkout with:
- git rev-parse --show-toplevel
- git remote get-url origin
- git branch --show-current
- git status --short

Origin must be https://github.com/fgzmac/OnToTheNext.git. Verify the branch against
the current authorized task. Stop with PROJECT BOUNDARY CHECK FAILED if the
checkout or remote is wrong. Do not switch branches to bypass this check.

Options App is READ-ONLY / OUT OF SCOPE. Never modify its repository, environment,
database, containers, volumes, networks, caches, builds or ports. Shared Docker
Desktop and physical storage do not authorize cross-project changes. Never copy
credentials between projects or globally prune Docker resources.

## Runtime and database boundaries

Use web host port 3100, PostgreSQL host port 5433 and container port 5432.
Compose project: ontothenext. Volume: ontothenext_ontothenext-postgres.
Verify effective Compose ownership before mutations and port ownership before
starting a server. Do not reuse an unrelated server.

Before destructive database commands or seeding, prove the redacted target:
host/port, database, user, actual current_database()/current_user, and Docker
container/volume ownership. Compare with the exact database authorized for the
task. A port or URL identity alone is insufficient. Never reset normal development
data for tests. Tests must use an explicitly identified isolated itinerary DB.

The reset runner validates DATABASE_URL before Prisma reset and seed, permits
only local itinerary identities, and rejects connection query overrides.
This allowlist is not authorization to destroy data.

## Local development storage

On Windows, dot-source scripts/dev-session.ps1 in every new PowerShell process
before npm, Prisma, Next.js or Playwright commands. It keeps caches and temporary
files inside ignored .cache and sets PLAYWRIGHT_BROWSERS_PATH=0.
See DEVELOPMENT-STORAGE.md. Keep generated artifacts inside the checkout.
Use a Docker named volume for live PostgreSQL, never an exFAT bind mount.

Keep .env, caches, database files, browser binaries, private boundary maps,
machine-specific mount paths, and backup records outside Git.
Global Docker storage relocation/shutdown and backup cleanup require separate
infrastructure authorization; ordinary application work does not authorize them.
