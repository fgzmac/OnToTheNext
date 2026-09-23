# Sprint 3 — Itinerary Builder

**Sprint 3 incomplete. Slice 1 implemented; pending TPM/CEO review. Do not merge.**

## Objective and boundary

The milestone builds a day-based vertical itinerary. This slice implements only:
Discover Accept → accepted-unscheduled idea → explicit Day/time/flexibility selection
→ persisted Activity → Day timeline → refresh → remove → accepted-unscheduled again.

Branch: `sprint-3-itinerary-builder`, created from `origin/main` at
`21e48239493ababd605840d2bb84905e39ca2bc4`, including merged Sprint 2 / PR #2
and D-120 acceptance. The checkout was clean before branching. Only
`fgzmac/OnToTheNext` was modified; Options App remained out of scope.

Authority: D-047, D-067, D-070, D-075, D-098, D-099, D-104, D-111,
D-118, D-119, D-120 and the roadmap, journeys, conceptual model and capability inventory.

## Model and state boundaries

`ItineraryItem` is a distinct Trip/Day-owned planning snapshot with opaque ID,
type, title, optional startMinute/durationMinutes/notes, explicit position,
Fixed/Flexible state, nullable sourceRecommendationId and timestamps.

The enum supports ACTIVITY, MEAL, SHOPPING, TRANSPORTATION, FREE_TIME,
HOTEL_REST and CUSTOM. Slice 1 creates ACTIVITY only. FLEXIBLE is the default;
FIXED represents planning intent, never a reservation or payment/completion state.
Local time is an optional integer from 0 through 1439, independent of timezone.
Known duration is a positive integer. Title and duration are copied when scheduling.

Acceptance, scheduling and booking remain distinct. Only ACCEPTED recommendations
are schedulable; undecided, DENIED, SAVED and MUST_DO are rejected. Decision changes
do not modify an existing item. Removal deletes only the item and transactionally
normalizes remaining Day positions; Recommendation/Decision/Place/Evidence survive.
An accepted source becomes schedulable again after removal.

The service verifies prototype ownership, Trip identity, and matching
Day.primarySegmentId / Recommendation.tripSegmentId, including shared transfer dates.
Repeated city labels never establish identity. A nullable unique source link prevents
duplicate scheduling. A composite Day/Trip foreign key prevents cross-Trip Day use.
Unique (dayId, position) ordering appends atomically and never sorts by time.

## Data safety and migration

Additive migration: `202609230003_itinerary_slice1`. The preceding three migrations
are unchanged. It adds the item table, two enums, indexes, foreign keys, and
minute/duration/position checks without changing existing rows.

Trip date changes that would remove occupied Days return
`ITINERARY_CONTENT_WOULD_BE_REMOVED` with affected dates and a visible explanation.
The complete structural transaction rolls back. Empty-Day removal remains allowed.
A Trip row lock serializes scheduling/removal, structural edits and decision changes.
A NO ACTION Day foreign key also rejects direct occupied-Day deletion; whole-Trip
deletion still cascades its owned items and Days together.

Deleting a Recommendation sets the source link to null. Deleting its Segment may
cascade the Recommendation, but preserves the scheduled item's title, timing,
flexibility and Day. Days survive and may become Unassigned under D-111.
No preview, movement or automatic migration workflow was added.

## UI

Itinerary has a compact accepted-unscheduled section with Segment/date context,
duration, an explicit suitable-Day selector, optional native time field,
Fixed/Flexible selector, and Add to itinerary button. The Day timeline renders
position order with title, time or Time not set, duration, Activity, planning
flexibility, source indicator, and Remove button.

The dedicated `getItineraryBuilder` read capability composes the page without
moving scheduling business state into Home or Discover. Discover retains accepted
ideas and has no scheduling controls. Home / Itinerary / Discover navigation stays
unchanged. Standard named controls support keyboard operation and a single-column
phone form; no gestures or hover are required.

## Verification

- Prisma generate / validate: passed.
- Populated Sprint 2 forward migration: passed; every previous row/field preserved,
  including Accepted and Denied decisions. No ItineraryItems created automatically.
- Normal seed after upgrade: passed with identical complete database fingerprint.
- Explicitly approved isolated reset/reseed: passed, four migrations and twelve
  recommendations, zero ItineraryItems. Normal development was not reset/migrated.
- Typecheck / lint / production build: passed.
- Unit tests: 67 passed; PostgreSQL integration tests: 49 passed; skipped: zero.
  This retains all 85 prior tests and adds 31 scheduling/domain/data-safety cases.
- Playwright: all 8 browser tests passed, including the 6 prior tests and new desktop
  (1280 x 900) / phone (390 x 844) scheduling flows. Keyboard add/remove, optional
  time/default flexibility, persistence, decision independence, visible date-shrink
  protection and no horizontal overflow passed. Captured form/timeline layouts reviewed.
- Normal development preservation: complete rows/schema/index/migration fingerprint
  unchanged before/after verification. No Options App resources modified.
- CI: exact pushed head must be green before Slice 1 is recommended for review.

Integration coverage includes concurrent duplicate and distinct appends, composite
ownership and uniqueness constraints, wrong Segment / repeated city rejection,
snapshot persistence through fresh-client reads, decision independence, safe source
and Segment deletion, whole-Trip cascade, empty-Day shrink, occupied-Day rollback,
concurrent date changes, failed mutation atomicity and preserving seed behavior.

## Known issues and deferred work

The existing pg adapter emits a client.query deprecation warning during tests;
verification passes. No blocker or data-integrity failure is known.

Sprint 3 remains incomplete. Slice 2 work is deferred: reorder, move-to-Day,
conflict checks/suggestions and any preview-before-change workflow. No other item
creation UI, Map, Reservation/booking/payment/completion state, Expenses, Today,
sharing, provider integrations, routing, weather, transit or automatic itinerary
generation is implemented. Enum availability is not a completed creation capability.
