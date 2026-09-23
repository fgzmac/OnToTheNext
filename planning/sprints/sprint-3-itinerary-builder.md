# Sprint 3 — Itinerary Builder

**Slices 1 and 2 implemented; pending TPM/CEO review. Sprint 3 is not accepted.
PR #3 remains draft. Do not merge.**

## Objective and baseline

Milestone 3 turns accepted recommendations into a usable manual, day-based itinerary:
typed items, intentional planning blocks, ordering and movement, Fixed/Flexible
planning state, basic conflicts and preview before material moves.

Branch: `sprint-3-itinerary-builder`, originally based on `origin/main` at
`21e48239493ababd605840d2bb84905e39ca2bc4`, including merged Sprint 2 and D-120.
Slice 1 head `1bfe7c2346c3dd23cc353880e46362726e3e8855` passed TPM review before
Slice 2. Slice 2 continues that clean branch and existing draft PR #3.
Only `fgzmac/OnToTheNext` is in scope; Options App resources remain untouched.

Authority reviewed: D-047, D-067, D-070, D-075, D-098, D-099, D-104,
D-111, D-118, D-120 and roadmap Milestone 3. Later milestone capabilities described
in broader planning decisions remain excluded by the Slice 2 scope.

## Slice 1 preserved

Discover Accept → accepted-unscheduled → explicitly choose a suitable Day,
optional local time and Fixed/Flexible → persisted Activity → Day timeline →
refresh → remove → accepted-unscheduled again.

Only ACCEPTED recommendations can be scheduled. Acceptance, scheduling and booking
remain distinct. Decisions do not mutate scheduled items. Removing an item preserves
Recommendation/Decision/Place/Evidence and makes a still-accepted source schedulable.
Title/duration are snapshots. Source deletion safely detaches its nullable reference.

The typed ItineraryItem remains the sole planning model. ACTIVITY, MEAL, SHOPPING,
TRANSPORTATION, FREE_TIME, HOTEL_REST and CUSTOM remain in the enum. Shared fields
include title, optional startMinute/durationMinutes/notes, explicit Day position,
Fixed/Flexible, optional sourceRecommendationId and timestamps. Local time remains
within-day minutes (0–1439), with positive whole-minute duration when known.
FLEXIBLE is the default; neither state means booked, paid or completed.

## Slice 2 — intentional planning blocks

`createPlanningBlock` creates exactly FREE_TIME, HOTEL_REST and TRANSPORTATION.
Free Time requires positive duration; rest and transport allow unknown duration.
Time and notes are optional. Notes are limited to 2,000 characters. All blocks append
to the selected Day under the same Trip lock used by scheduling and structural edits.
No inferred gaps, automatic free-time filling or automatic transport generation exists.

Default titles: Free time, Hotel / Rest, and a mode-based transportation label.
Known inter-Segment transfers snapshot a title such as Train · Tokyo → Kyoto.
Transportation modes: TRAIN, FLIGHT, BUS, CAR, TRANSIT, WALK, FERRY, OTHER.
Nullable origin/destination Segment references are validated against the Trip and
must differ when both are supplied. Repeated cities retain distinct Segment IDs.
A known origin must match an assigned Day; providing both references requires an
origin-owned Day. A lone origin reference may be created on an Unassigned Day.
References are optional for local transportation. No Reservation or hotel search exists.

## Ordering and movement

Position, never clock time, controls the timeline. Shared normalization maintains
0...N-1 positions using a disjoint temporary range to avoid unique-key collisions.
Move earlier/later swaps the immediate neighbor. Boundary controls are disabled;
there is no wrapping or drag dependency. Planning values are never retimed by reorder.

A Flexible-to-Flexible reorder applies directly. Any swap affecting a Fixed item
(including a Fixed neighbor) first produces a visible preview and requires Confirm.
This protects Fixed items from indirect movement as well as direct clicks.

Every cross-Day move uses `previewMoveItineraryItem` followed by
`confirmMoveItineraryItem`. Preview shows item, source/target date and Segment context,
planning flexibility, end-of-Day placement, and derived target conflicts. Fixed items
have an explicit warning. Cancel is a no-write action. Confirm locks the Trip,
validates current ownership/eligibility, moves atomically, normalizes the source,
and appends to the target while preserving all other planning fields.

Sourced Activities can move only within their current Recommendation Segment.
Detached Activities may move independently. Transportation with an origin can move
only to origin-owned Days; transportation without an origin and Free Time/Hotel-Rest
may move to any other same-Trip Day. The current Day and invalid targets are omitted.
All constraints are rechecked on the server.

## Preview consistency

A signed token binds Trip, item, target, optional reorder direction, context fingerprint
and a 30-minute expiry. The fingerprint includes the canonical Trip/Segment/Day/item
snapshot, including target contents and source links. A monotonic item revision
prevents movement/reordering away and back from reusing an old preview.

Confirmation rejects changed context, expired/invalid tokens and repeated confirmation
with `MOVE_PREVIEW_STALE`; a new preview is required. New target items therefore cannot
silently introduce unreviewed conflicts. The check is intentionally conservative:
unrelated Trip changes can also require a new preview.

The current prototype runs one server process. Its signing key is process-local;
restarting invalidates outstanding previews safely. Multiple server processes would
require a shared signing key before deployment to that architecture.

## Derived conflicts

No Conflict table or duplicate conflict state exists. The read model derives:
- TIME_OVERLAP for known half-open intervals [start, start + duration).
- PAST_MIDNIGHT when a known interval ends after minute 1440.

Back-to-back intervals do not overlap. Untimed/unknown-duration items are excluded.
Warnings name the items and times and suggest moving/removing an item or changing
its planning time later. No full editing screen was added. Past-midnight items remain
on the selected Day with a warning; they never wrap or generate another item.
Conflicts are read-only and nonblocking. Users may confirm an overlapping move.

## Persistence and structural safety

Slice 1 migration `202609230003_itinerary_slice1` remains unchanged.
Slice 2 adds `202609230004_itinerary_builder`: TransportationMode, nullable mode and
Segment fields with SET NULL foreign keys/indexes, and revision defaulting to zero.
All earlier migrations and existing planning snapshots are preserved.

The composite Day/Trip foreign key, unique source Recommendation, unique Day position,
and planning-value constraints remain. Occupied-Day date shrink is blocked for all
item types with `ITINERARY_CONTENT_WOULD_BE_REMOVED` and full transaction rollback.
Empty-Day shrink remains supported. The NO ACTION Day foreign key protects against
direct occupied-Day deletion; whole-Trip deletion cascades its owned content.

Segment deletion preserves Days under D-111 and never deletes items. Recommendation,
Transportation origin and Transportation destination links detach safely while title,
time, duration, notes and flexibility survive. Trip locking serializes appends,
removal, reorder, confirmation, decision edits and structural changes.

## UI and accessibility

One collapsible Add planning block form belongs to Itinerary, with progressively
revealed Transportation fields. Typed cards show planning data and mode where known.
Named Move earlier/later buttons, eligible-Day selection, visible preview, Confirm,
Cancel and Remove use standard controls. Preview receives focus and has an accessible
heading; conflicts include text and suggestions, not color alone. Mobile forms stack.
Home / Itinerary / Discover navigation stays unchanged; Discover has no editing controls.

## Verification

- Prisma generate/validate: passed.
- Forward migration from populated Slice 1: every old row and field preserved,
  including two scheduled Activities and Accepted/Denied decisions.
- Seed: full post-migration fingerprint unchanged; no auto-created blocks.
- Explicitly approved isolated reset/reseed: passed with five migrations; normal
  development database was not reset or migrated.
- Typecheck, lint and production build: passed.
- Unit tests: 85 passed. PostgreSQL integration tests: 77 passed. Skipped: zero.
  All 116 prior tests retained; 18 pure and 28 integration cases added.
- Playwright: all 10 tests passed, preserving all eight prior browser cases and adding
  desktop (1280 x 900) / phone (390 x 844) block/reorder/preview/conflict flows.
  Keyboard reorder, preview/cancel/confirm, refresh persistence, Fixed protection,
  nonblocking overlap and no horizontal overflow verified. Captured layouts reviewed.
- Normal development preservation: full rows/schema/index/migration fingerprint
  unchanged before/after verification. No Options App resources modified.
- Exact pushed-head CI is required before recommendation; result linked in PR #3.

Coverage includes manual persistence/fresh-client reread; type/transport validation;
source detachment; fixed neighbor protection; pure interval/eligibility/order rules;
read-only preview and Cancel; stale/tampered/duplicate confirmation; atomic move and
normalization; source/target constraints; read-only conflicts; each manual type's
occupied-Day protection; and concurrent appends, reorder/removal, duplicate moves,
and movement versus structural edits.

## Known issues and milestone exit assessment

The existing pg adapter emits a nonblocking client.query deprecation warning.
Preview expiry/restart and conservative context invalidation require a fresh preview,
not recovery of persisted data. Time editing is deliberately deferred; warnings do
not claim an editing feature or automatic resolution.

Typed Items, Day timeline, accepted-to-scheduled, reorder, move-to-Day, intentional
Free Time, Hotel/Rest, Transportation, Fixed/Flexible, basic conflict rules and
preview-before-material-change are implemented. Accepted ≠ Scheduled ≠ Booked.

Itinerary Builder implementation appears milestone-complete pending TPM/CEO review.
This is an implementation assessment, not Sprint 3 acceptance. PR #3 stays draft.

Meal/Shopping/Custom creation, Reservations, booking/payment/completion states, Map,
hotel search, Expenses, Today, sharing, external providers, routing/live transit,
weather and automatic itinerary generation remain out of scope. No next Sprint begun.
