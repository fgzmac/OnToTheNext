# Paste-first organizer and incremental resync

The traveler supplies the list. Organization uses only selected imported items,
preserves saved placements and separates optional choices from additions. Discover
may suggest stored independent ideas only after an explicit gap request. It never
silently fills the itinerary. The previous unpublished whole-trip catalog generator
and its temporary preview entry point are superseded.

## Persistence and boundaries

The additive organizer migration adds import batches (original text and retry hash),
idea provenance/disposition/pending state, per-trip lock state, and change receipts
for idempotency and revision-checked undo. ItineraryItem keeps its ID, references,
progress and reservation association when its Day becomes null. A qualitative
period is stored separately from exact minutes. No invented numerical duration is
required. Historical migrations are unchanged.

The existing ownership/Trip row lock serializes organizer writes with scheduling,
trip structure, booking, progress and edit paths. Signed previews bind the full
saved context, lock state, inputs and booking revisions to the accepted placement
payload. Apply is one transaction, retry-safe, and optionally relocks. Unlocking
never reorganizes. Collecting ideas and editing notes/bookings remain possible
while locked. Supplier bookings are never changed by placement or resync.

## Parsing boundary

Deterministic line parsing supports city headings, bullets, links, ISO and named
month/day dates with a known year, 24-hour times, qualitative periods, full-day
intentions, protected periods, priorities, alternatives and explicit booking
phrases. City changes clear inherited date context. Unknowns remain blank; long or
instruction-like prose is retained as a note. Every original fragment is retained.
One editable batch review precedes saving. Identical accepted batches are retry-safe;
possible item duplicates remain reviewable, with explicit intentional-repeat control.
No URL fetches or model/provider calls occur. This is not general conversation or
natural-language understanding. Relative dates, ambiguous numeric dates and detailed
prose dependencies require review. Booking statements require explicit owner
confirmation and remain user-reported rather than API-verified.

## Organization and discovery

Protected input is considered before flexible activities. Supplied dates constrain
placement; full-day intentions stand alone. Otherwise only a tentative outline is proposed. Without a supplied period or
duration, one otherwise-empty Day is used with its period unspecified; multiple
unknown visits are not packed into invented slots. Unknown travel/duration is stated. Existing order and unrelated Days
are retained. An item that cannot fit remains unscheduled with a specific reason.
Optional choices must be selected explicitly. No independent catalog item enters an
organization proposal. Move to, drag between Days, within-Day ordering, unscheduling
and recent undo retain identity. Fixed/booking consequences are reviewed separately.

Gap discovery uses a selected Day, confirmed starting point, period and entered
free minutes. It separates From your list and Other ideas, excludes completed,
scheduled and explicitly excluded items, checks stored event eligibility and shows
known commitments. Protection is retained even when the user explicitly requests
ideas for protected time. A stored-duration buffer is an assumption, not routing.
Suggestions save as ideas and never insert themselves or move bookings.

## Verification and honest limits

Engineering fixtures are synthetic and run only in the authorized disposable CI
service. Local owner review uses a new private trip on the exact approved planner
database; no destructive local fixtures, reset or seed. The previous private review,
synthetic trip, excluded databases and provider accounting are fingerprinted.
Private inputs, local screenshots and runtime checkpoints are ignored and unpublished.

Known delivery limits to reassess before claiming full acceptance:
- A list can be saved before dates at `/organize`, grouped by supplied city. It can
  later be attached to a dated trip's Not scheduled list without fabricating dates.
  The second additive migration extends import batches for owner-scoped undated lists.
- No live routing or fresh availability; supplied city identity is exact and does not
  resolve uncertain area/country names. Access preferences need manual review.
- Resync only inserts or holds selected additions. It does not propose rearranging
  an existing flexible item to create space.
- Drag-and-drop moves between Days; Earlier/Move to provide accessible ordering.
- The interface's legacy activity detail panel and booking subsystem are retained.

Local verification completed:
- 466 unit tests passed in 25 files; typecheck, full source lint and production build passed.
- Both individually approved additive migrations applied only to the existing isolated
  planner review database. All 16 migration checksums match; schema validation and
  read-only database-to-schema comparison passed without drift.
- All 18 excluded database fingerprints match, including provider accounting. Every
  pre-existing row in the review target is retained. No local reset, seed or destructive
  fixture run was performed. Protected environment and pilot launcher files match.
- Source-based UI review retained 12 initial items and two later additions. It saved
  an arrangement, refreshed the persistent lock, previewed selected additions while
  locked without changing placements, cancelled, unlocked, applied and relocked.
  Unsupported additions remained visible with reasons. The optional choice stayed
  separate from the accurate pending count. Repeating the paste created no duplicates.
- An ordinary move saved without confirmation and was undone. A protected-date move
  showed the consequence and was cancelled. Another tab's lock caused an outdated
  Apply to fail safely. A same-list gap query added nothing; a discovered day-trip
  short-gap mismatch was fixed generically and rechecked in the interface.
- Private rendered evidence is stored locally under `.cache/organizer1/`:
  `saved-locked-plan.png` and `gap-discovery.png`. These show real source-based review
  data and are intentionally not committed. They do not establish owner acceptance.
- Ten new PostgreSQL integration cases and three synthetic browser flows are included
  for the separately authorized fresh CI service; no local fixture permission is inferred.
  Exact-head CI results will be recorded in the draft PR and final handoff.

Remaining limits: broader prose interpretation, semantic venue-alias deduplication,
verified routing, opening-hour/access checks and next-commitment route fit are not
implemented. Explicit dates/periods are constraints; unresolved crowded inputs can
remain unscheduled rather than receive an invented fit. Gap suggestions require
traveler review and are not guaranteed nearby or feasible. Existing stored ranking
is reused; no new live research or provider is activated.
