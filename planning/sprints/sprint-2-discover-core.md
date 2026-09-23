# Discover Core — Slice 1

Status: Slice 1 implemented for TPM review. Sprint 2 is not complete. Keep the pull request in draft; do not merge or begin Slice 2 as part of this change.

## Objective and boundaries

Prove the first Discover interaction: choose a Trip Segment, read a small factual batch, Accept or Deny, retain the decision, and request a different finite batch. Recommendation quality is not evaluated by this slice.

Started from current `origin/main` at `24a8fe043a95b2b84f7840344746a9c248c17a66`, including accepted Sprint 1 and D-119, with a clean tracked working tree. Branch: `sprint-2-discover-core`. Later confirmed planning decisions govern the implementation, including factual-only cards and the Home / Itinerary / Discover navigation boundary.

Web remains on 3100; host PostgreSQL remains on 5433 (container 5432), Compose project `ontothenext`, volume `ontothenext_ontothenext-postgres`. Options App resources were not modified. No Home or Itinerary redesign or primary navigation destination was added.

## Persistence and behavior

- `Place` stores reusable factual identity, category/base, optional address/coordinates, and timestamps.
- `Recommendation` belongs to a Trip and Segment and references a Place. It holds the summary, optional duration/cost/logistics, and deterministic display rank. A composite Segment/Trip foreign key rejects cross-trip relationships. This slice requires Segment context.
- `RecommendationDecision` is separate, with a unique recommendation ID and one canonical current outcome. Accept/Deny use an upsert; changing a decision does not delete its Recommendation. Saved and Must-do are schema values only, with no actions or UI.
- `Source` identifies the development catalog. Place-linked `EvidenceRecord` stores topic, illustrative factual text, catalog record date, and fixture status.
- Trip or Segment deletion cascades to owned Recommendations and Decisions. Reusable Places, Sources, and their Evidence survive. Place deletion is restricted while referenced by a Recommendation; its Evidence follows Place deletion. Source deletion is restricted while Evidence references it.

The additive `202609230001_discover_slice1` migration leaves the Sprint 1 migration unchanged. It creates five tables, one enum, indexes, and foreign keys; no existing application rows are rewritten.

Server-rendered Discover reads the application service; mutations pass through a Server Action into the service, then Prisma. UI components never call Prisma. The service validates prototype ownership and exact Trip/Segment/Recommendation context. The Prisma factory now reuses its connection pool in production as well as development, avoiding a new pool per service call.

Segment options include position, base, and dates, distinguishing outbound and return Tokyo by ID. Batches contain four cards ordered by rank then ID. Decisions do not shift pagination. A third page honestly reports exhaustion; Previous batch permits deliberate revisiting. Cards retain explicit Accepted/Denied labels and expose keyboard-operable buttons with place-specific accessible names. Errors are visible and action results announced.

Accepted ideas appear in a subordinate section inside Discover for the selected Segment. Acceptance never schedules, books, pays, creates ItineraryItems, or changes Trip preferences/Days. No-Segment, no-catalog, invalid-Segment, load/save failure, and exhausted states are represented.

## Development fixtures

`src/modules/discover/fixture-catalog.ts` contains eight imaginary Places. `prisma/discover-seed.ts` creates eight Recommendations, one Development Fixture Catalog Source, and eight Evidence records for the first Tokyo Segment of the existing synthetic Japan demo Trip. This provides two disjoint four-card batches. Return Tokyo and other Segments remain empty.

Cards identify all details as illustrative development fixtures, with no live prices, hours, availability, photos, or provider verification claims. The fixed catalog record date is explicitly not a live verification date. No private travel data is used.

The standard development seed retains Sprint 1 semantics: it recreates only the known demo Trip (four Segments, fifteen Days) and then adds Discover fixtures. Normal Trip creation does not invoke seeding. Catalog-only upserts preserve existing Recommendation IDs and Decisions. Running the full demo seed deliberately resets demo-trip decisions along with the demo Trip; it is not a private-data migration.

## Verification evidence

Local verification completed on 2026-09-22 using only `ontothenext_verify_20260922_discover` on localhost:5433 for destructive operations. Actual database/user and itinerary container/volume ownership were checked before setup, seeding, and the approved reset. The reset guard remains unchanged.

| Check | Result |
| --- | --- |
| Prisma generate and schema validation | Passed |
| Forward migration from populated Sprint 1 schema | Passed; all rows and fields in the five original application tables exactly preserved |
| Migration status | Both migrations applied |
| Extended seed | Passed; foundation counts 1 owner / 1 Trip / 4 Segments / 15 Days / 1 preference profile; Discover counts 8 Places / 8 Recommendations / 1 Source / 8 Evidence / 0 Decisions |
| Isolated guarded reset and reseed | Passed after explicit consent for the exact isolated database |
| Typecheck and lint | Passed |
| Sprint 1 unit tests | 36 passed, including 22 reset safety tests |
| Discover domain unit tests | 8 passed |
| Production Prisma pool regression | 1 passed |
| Total unit tests | 45 passed |
| PostgreSQL integration tests | 17 passed: 8 Sprint 1 + 9 Discover |
| Total Vitest | 62 passed; 0 skipped |
| Production build | Passed |
| Playwright | 4 passed: 2 preserved Sprint 1 + desktop and phone Discover flows |
| Desktop / phone acceptance | 1280 × 900 and 390 × 844; screenshots reviewed and no horizontal overflow |
| Normal development database | Read-only before/after audit confirmed identical rows, schema, and indexes; no normal reset, seed, or migration performed |

Integration tests exercise separate entities, decision reversal/upsert, persistence through a new Prisma connection, immutable batch traversal, repeated-city scoping, wrong-trip rejection, fixture evidence updates/reseeding, Trip/Segment deletion, and empty catalogs. They compare the full Trip skeleton before and after decisions to prove scheduling/preferences remain unchanged.

Browser tests cover keyboard acceptance, denial, refresh, navigation to Home/Itinerary and back, accepted-only filtering, decision reversal, distinct second batch, finite exhaustion, repeated-city selection, and normal newly created Trips with empty Discover data. Decision state is expressed in text, not only color. Original foundation tests remain; their placeholder-heading assertions now expect Discover empty states.

The existing CI workflow is extended to this branch and PRs to main. It retains migrations, seed, guarded reset, all tests, build, and browser verification. GitHub CI status must be checked against the submitted PR head; local results alone do not establish remote CI success.

Evidence logs, database snapshots, screenshots, browsers, and generated files remain ignored local artifacts and are excluded from the commit. Existing local infrastructure files are preserved.

## Known issues and deferred work

No blocking or data-integrity failures remain in the verified flows. The PostgreSQL adapter emits an existing pg query-concurrency deprecation warning; tests and build pass. The inherited shell still says “Sprint 1 prototype”; changing shell branding is deferred. The fixed/sticky shell header may appear at the current scroll offset in full-page Playwright captures; viewport interaction tests pass.

The normal development database is deliberately unchanged and still requires the additive migration before serving Discover from this branch. Apply `npm run db:deploy` against the verified intended development target. The optional full demo seed recreates the known demo Trip; do not run a reset to install this slice.

Deferred: recommendation quality, live providers, Map mode, Save/Must-do UI, hotel/reservation functionality, scheduling, weather/transit/routes, personalization explanations, ML/vector search, sharing/companions, production authentication, swipe interactions, and native apps. Sprint 2 remains incomplete.
