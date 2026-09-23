# Sprint 2 — Discover Core

Current scope: Slice 1 plus Slice 2 (Trip interests and decision-based refinement). Review status and current evidence are recorded in the Slice 2 section below.

## Discover Core — Slice 1 (historical record)

Status at Slice 1 submission: implemented for TPM review; Sprint 2 incomplete. TPM subsequently accepted Slice 1 for continued development and authorized Slice 2 on the same branch and draft PR #2.

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

## Discover Core — Slice 2: Trip Interests + Decision-Based Recommendation Refinement

Objective: retain the recommendation-first experience while using optional explicit Trip interests and current organizer reactions to refine only future batches. Continue `sprint-2-discover-core` and draft PR #2 from Slice 1 head `8769dfde1b7a3de68aa824a20ba40ee9557df81c`; no new branch or PR, and no merge.

### Preferences and factual classification

`DiscoverInterest` is a PostgreSQL/Prisma enum with nine values: Sightseeing/Landmarks, Architecture/Design, Culture/History, Food/Drink, Shopping, Nature/Outdoors, Nightlife, Entertainment, and Wellness/Relaxation. `TripPreferenceProfile.discoverInterests` and `Place.interestTags` are typed enum arrays, defaulting to empty. Existing budget/planning fields and the human-readable Place category remain intact. No JSON preference bag or User Preference Profile is introduced.

Discover contains a collapsed, optional “Interests for this trip” control with labeled checkboxes, Save, and Clear. Empty interests remain valid. Validation rejects unknown values and canonicalizes duplicates/order. Updates preserve other Trip preference fields and do not change Recommendations, Decisions, or historical batches. The form initializes from the persisted values after save, including clearing an existing selection.

### Ranking and stable batch assignment

`rankUnassignedRecommendations` is a pure function. Only unassigned, undecided Recommendations are eligible. Each matching explicit Trip interest adds 10 internally; any shared Accepted tag adds a bounded 3; any shared Denied tag subtracts a bounded 1. Repeated reactions do not accumulate into stronger implicit preferences. Explicit Trip interests dominate reaction signals. Denial never excludes a category. Ties use display rank, then ID. There are no scores, match explanations, inferred profiles, or persuasive personalization on cards.

`Recommendation.presentationBatch` stores stable membership; `presentationOrder` retains the chosen order without overwriting the base `displayRank`. A unique Segment/batch/position constraint and a check for valid paired values protect assignments. These two nullable fields avoid a separate session/job framework. Existing decisions remain independently editable.

`requestAnotherRecommendationBatch` runs through a Server Action and application service into a PostgreSQL transaction. Every assignment path locks the selected, ownership-checked Segment row with `FOR UPDATE`; READ COMMITTED lets a waiting request observe its predecessor's committed assignment. The originating batch is the retry key: a duplicate request from batch 0 always returns already-created batch 1, even after batch 2 exists. Concurrent same-origin requests cannot assign competing batches. Unexpected future origins are rejected. At exhaustion, the action returns the existing final batch.

Initial assignment follows the curated base order, independent of interests. A fresh seed supplies four varied cards in batch 0. For other unassigned catalogs, the service initializes that first batch once under the same Segment lock. Merely requesting a future page never creates a later batch; only the explicit action does. Once assigned, membership and presentation order are not changed by interest edits, decision edits, ordinary navigation, retries, or reseeding. Decision signals are scoped to the selected Trip/Segment; explicit interests apply to the Trip.

Previous batch and Next generated batch read stable history. Show another batch appears only at the newest generated batch while unseen candidates remain. The final generated cards remain readable alongside the honest exhausted message. No catalog and no Segment retain their distinct states. Accepted stays inside Discover and never implies scheduled, booked, paid, or completed. The shell label is now the durable “Prototype”; no shell redesign or new navigation destination was added.

### Fixture and migration behavior

The catalog now has twelve imaginary Places/Recommendations and twelve Evidence records from one Development Fixture Catalog Source. Fresh setup creates four initial cards plus eight unassigned candidates, giving three finite four-card batches. Typed tags cover all nine interests. Four new fixtures are Brickwork Design Studio, Twilight Food Court, Courtyard Architecture Gallery, and Listening Room Pavilion. All details remain explicitly synthetic; no private trip data or live provider claims are used.

Additive migration: `202609230002_discover_refinement`. Neither prior migration was edited. Because Slice 1 stored no page-view history, migration conservatively backfills every existing rank window as historical membership/order. On an eight-card Slice 1 demo, its original two pages remain stable; the four newly seeded candidates remain unassigned. This intentionally preserves history rather than pretending old recommendations are unseen.

Forward verification began with the Slice 1 schema, eight Recommendations and separate Accepted/Denied decisions. Every original row and field was compared after migration and remained identical; only the new columns were added/backfilled. Repeated full CLI seeding also preserved existing Trip data, Recommendation IDs/content, Decisions, Sources, and Evidence. Fixture tags are filled only when empty; nonempty classifications are retained.

Unlike the historical Slice 1 seed behavior described above, normal `npm run db:seed` now preserves the existing demo Trip and only creates it when absent. Catalog upserts do not rewrite decisions or assigned batches. Two consecutive full CLI seed runs produced identical database snapshots. The fixture helper can still replace the demo for isolated test setup; ordinary seed execution selects preservation mode. No normal development database reset, seed, or migration was performed.

### Slice 2 verification evidence

Verified on 2026-09-22 using fresh isolated database `ontothenext_verify_20260922_slice2` on localhost:5433, user `ontothenext`, with actual database identity and itinerary Docker project/volume ownership checked. The reset guard is unchanged. Prisma's guarded reset was performed only after fresh explicit consent for this exact database.

| Check | Result |
| --- | --- |
| Prisma generate / validate / migration status | Passed; all three migrations applied |
| Forward Slice 1 migration with Accepted/Denied decisions | Passed; all original data preserved and rank windows retained |
| Extended seed and full repeat seed | Passed; twelve fixtures; decisions and historical assignments preserved; repeat snapshots identical |
| Isolated reset/reseed | Passed; 1 owner / 1 Trip / 4 Segments / 15 Days / 1 preference profile; 12 Places / 12 Recommendations / 1 Source / 12 Evidence; 4 initial + 8 unassigned; 0 Decisions |
| Typecheck / lint / production build | Passed |
| Unit tests | 57 passed: 45 previous + 12 new refinement/validation tests |
| PostgreSQL integration | 28 passed: 17 previous + 11 new refinement tests |
| All Vitest | 85 passed; zero skipped |
| Browser E2E | Six passed: two Sprint 1, two preserved Slice 1, two new desktop/phone refinement flows |
| Responsive acceptance | 1280 × 900 and 390 × 844; saved interest controls, cards, actions, history, and Accepted reviewed; no horizontal overflow |
| Normal development database | Before/after full data/schema/index fingerprint unchanged |

Pure tests cover empty interests, explicit/accepted/denied relative ranking, denial without exclusion, bounded implicit signals, stable tie-breaks, assigned/decided candidate exclusion, immutable input, and typed interest validation/clearing. Integration tests cover persisted interests through a fresh client, missing preference profiles, preservation of budget/planning fields, explicit and decision-based ranking, concurrent duplicate requests, delayed retries, finite exhaustion, immutable prior order, repeated-city context, full reseed preservation, and delete ownership.

The original persistence and E2E assertions remain, adapted where the authorized behavior changed: twelve fixtures instead of eight, explicit generation rather than page-window reads, and three finite batches. New browser tests verify visible deterministic ordering after Architecture/Culture interests and acceptance, then a Food interest change that leaves existing pages intact while changing the next new batch. They check the saved checkbox display as well as PostgreSQL-driven ranking and refresh persistence. Screenshot review exposed a stale checkbox display after Save; the form was corrected and the stronger regression assertion retained.

CI continues on the existing draft PR. Current-head GitHub results are recorded in that PR after pushing; local results alone do not establish remote CI success. Private connection targets, snapshots, screenshots, browser binaries, and generated output remain ignored artifacts.

### Milestone exit assessment and remaining scope

All approved Discover Core implementation criteria are covered: recommendations are shown, decisions persist, Accepted/Denied remain distinct, and later batches are explicitly generated and refined using simple rules over manual fixtures. Discover Core implementation appears milestone-complete pending TPM/CEO review. This is an engineering assessment, not Sprint 2 acceptance. PR #2 remains DRAFT and must not be merged by this task.

Known low-risk limitation: the existing PostgreSQL adapter emits a pg query-concurrency deprecation warning while verification passes. The old sprint-specific shell label and stale saved-checkbox display are resolved. Normal development still needs the additive migrations before running this branch; preserving it was intentional. Upgraded Slice 1 batches remain historical and therefore have fewer unseen alternatives than a fresh seed. This is fixture interaction validation, not proof of real recommendation quality.

Deferred and not implemented: external providers, Maps, hotels, Reservations, ItineraryItems/scheduling, live logistics/pricing/weather/transit, ML/LLM ranking, embeddings/vector search, permanent User Preference learning, companions, swipe gestures, native apps, or another Sprint. Options App resources remain untouched.
