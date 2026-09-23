# Local setup

Discover Core is accepted and merged through PR #2 (D-120). Itinerary Builder Slices 1 and 2 are on `sprint-3-itinerary-builder`. Milestone implementation is pending TPM/CEO review; Sprint 3 is not accepted and PR #3 stays draft/unmerged.

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

## Discover Core Slices 1 and 2

Apply migrations with `npm run db:deploy` against the intended, verified development
database. Installation does not require a reset. The optional `npm run db:seed`
creates the synthetic Japan demo only when absent and ensures twelve imaginary
Discover fixtures for its first Tokyo Segment. Repeated seeding preserves the
existing demo Trip, preferences, decisions, and generated batches. A fresh demo
has four initial recommendations and eight unassigned candidates. Normal newly
created Trips work with an empty recommendation catalog.

The Slice 2 migration preserves existing Slice 1 rank windows as assigned history.
On an upgraded eight-card demo, those two batches remain intact; seeding adds four
unassigned candidates. No existing decision or historical batch is discarded to
recreate a fresh-start scenario.

Open the demo Trip, choose Discover, then select the first Tokyo Segment. Optional
“Interests for this trip” controls can save or clear nine typed interests. Accept
and Deny remain editable. Show another batch explicitly assigns up to four unseen
candidates using Trip interests and prior Segment decisions. Previous/next generated
batch navigation reads stable history. Cards remain factual; acceptance never
schedules or books anything. No live provider data is used.

See [the Sprint 2 implementation record](planning/sprints/sprint-2-discover-core.md)
for ranking rules, ownership, migration preservation, verification, and deferred scope.

## Itinerary Builder Slices 1 and 2

Apply the additive migration with `npm run db:deploy` against the verified intended
development database; an upgrade does not require a reset. Normal seed does not
schedule recommendations or modify existing itinerary items.

Accept an idea in Discover, open Itinerary, choose a Day owned by that idea's
Segment, optionally choose a local time, and select Flexible or Fixed. Add to
itinerary appends an Activity to that Day. Refresh preserves it; Remove preserves
the Discover decision and makes accepted ideas available to schedule again.

Dates containing scheduled content cannot be removed by shrinking the Trip.
Remove the relevant items first. Removing a source Segment preserves the scheduled
item and its Day while detaching the deleted Recommendation reference.

See [the Sprint 3 implementation record](planning/sprints/sprint-3-itinerary-builder.md)
for constraints, verification and deferred work. Sprint 3 remains pending acceptance.

Use Add planning block in Itinerary for intentional Free Time, Hotel / Rest and
manual Transportation. Free Time requires duration. Transport can link distinct
origin/destination Segments; a transfer uses an origin-owned Day and retains its title
snapshot if a Segment is deleted. All new blocks append in explicit position order.

Move earlier/later swaps neighbors without changing time. Swaps affecting Fixed items
require confirmation. Move to another day always shows a preview before Confirm;
Cancel leaves the plan unchanged. Changed/expired previews require a fresh preview.
Overlap and past-midnight warnings are derived, factual and nonblocking; they never
automatically retime, move or remove items. No full time editor is included.

The single-process prototype invalidates previews after a server restart. A future
multi-process deployment needs shared preview signing configuration. No external
travel provider, Reservation, Map or booking state is part of this implementation.
