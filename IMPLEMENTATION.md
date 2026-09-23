# Local setup

Discover Core Slice 1 is on `sprint-2-discover-core`, based on accepted Sprint 1. Sprint 2 is not complete.

## Requirements

- Node.js 22.13+
- npm
- PostgreSQL (or Docker)

## Quick start

1. First setup only: copy `.env.example` to `.env` if no local `.env` exists. Preserve existing credentials.
2. Start PostgreSQL. With Docker: `docker compose up -d postgres`.
3. Install dependencies: `npm ci`.
4. Apply migrations: `npm run db:migrate`.
5. Optional demo data: `npm run db:seed`.
6. Start the app: `npm run dev`.

## Quality commands

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`

The deterministic Japan development seed uses demonstration dates and does not contain private trip dates or personal spending information.

## Runtime isolation

On To The Next serves its normal dev/start commands at http://127.0.0.1:3100.
PostgreSQL uses localhost:5433 from host clients and port 5432 inside the container.
Compose project `ontothenext` and its existing named volume remain unchanged.
Both DATABASE_URL and TEST_DATABASE_URL must use the itinerary host port 5433.
Options App owns a separate namespace and may use 3000/5432; do not change its
resources, environment files or credentials from this repository.

Playwright uses http://127.0.0.1:3100 for both its base URL and managed server.
Local reuse is permitted only at that address; verify the existing server belongs
to this application. CI starts its own server. Run integration/E2E verification
only with an explicitly identified isolated itinerary database, never normal data.
For local Windows work, load scripts/dev-session.ps1 in each process and retain
PLAYWRIGHT_BROWSERS_PATH=0 for the project-local Chromium installation.

## Database reset safety

`npm run db:reset` runs scripts/db-reset.ts. Its reusable verifier permits only
PostgreSQL URLs on localhost or 127.0.0.1 with user ontothenext and database
ontothenext, ontothenext_test, or ontothenext_verify_ followed by letters, digits
or underscores. Unknown identities, remote hosts, malformed URLs and connection
query overrides are rejected without printing passwords. The schema query option
is supported. Only after validation does the runner reset and seed, using the same
captured DATABASE_URL for both commands; reset failure prevents seeding.

The guard verifies URL identity, not permission to delete data or actual server
ownership. Verify the actual target database/user and owning volume before any
authorized destructive operation. Never reset normal development data merely to
run tests. The verifier and command-ordering tests use no database connection.

## Discover Core Slice 1

Apply the additive migration with `npm run db:deploy` against the intended,
verified development database. Installation does not require a database reset.
The optional `npm run db:seed` preserves the existing convention of recreating the
known synthetic Japan demo Trip, then adds eight imaginary Discover recommendations
to its first Tokyo Segment. Full demo reseeding resets that demo Trip's decisions.
It does not populate recommendations for normal newly created Trips.

Open the demo Trip, choose Discover, then select the first Tokyo Segment. Two
four-card batches support Accept/Deny and an Accepted section. All content is
labeled as development fixtures; acceptance does not schedule or book anything.
Other Segments demonstrate the empty state. See
[the Slice 1 implementation record](planning/sprints/sprint-2-discover-core.md)
for data ownership, verification evidence, and deferred scope.
