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
placement; full-day intentions stand alone. Source-supported flexible outings may share
a Day with suggested qualitative periods. Unknown duration is not a full-day commitment,
but no numerical fit or route is claimed. Same-city identity alone does not establish a
relationship. Existing order and unrelated Days are retained; unsupported additions
remain visible with the actual constraints encountered.
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

Original delivery verification (published baseline: 751 tests / 40 browser flows):
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


## Readable itinerary correction

The organizer now retains optional reviewed source context in the existing idea JSON:
shared outing, sequence, supplied area, description, next decision, source role,
short-visit qualification and conditional arrival-evening qualification. Labelled
continuation lines attach to the preceding activity; they do not create attractions.
All fields remain editable during import review. Broad prose understanding is still
not implemented: the private comparison restored relationships from the supplied
source through reviewed fields, rather than claiming automatic transcript extraction.

Related flexible stops can share a qualitative outline (up to three). Explicit
source sequence, priority and dates are respected. Protected/fixed/booked incomplete
timing remains conservative; a short early visit before protection requires explicit
support. Full-day activities stand alone. An incoming-city evening on a transfer Day
requires a conditional source instruction and stays optional. The generic hard
`periodsOverlap` function and free-time duration/transport standard are unchanged.
Source/event eligibility is checked before proposals and again during atomic apply.
Hold reasons report observed blockers or the organizer's inability to assess a grouping.

The main reading flow presents a full sequence of Days with content-derived titles,
periods, concise descriptions and one next decision. Arrival, transfer, departure and
full-day finishes have explicit purposes. Notes, source roles, original timing and
placement diagnostics remain in disclosures. Unique exact catalog identity (including
its own category suffix) permits reuse of an existing independent description; broad
aliases and branch guessing do not. One trip-level notice replaces repeated general
availability warnings. Specific booking/transport/protection warnings remain visible.
Titles are derived from current saved items. Moving a stop away from a source outing
suppresses its combined-sequence description in the main flow and asks for review;
the original description remains available as source material.

The comparison uses the same 14 selected activities, dates, times, periods and booking
intentions as the baseline, in a new private trip. No final schedule was preassigned.
It demonstrates paired outings, a short visit before protection, a conditional transfer
evening, a full-day commitment and a combined scenery outing with transport unresolved.
The optional excursion remains one unresolved alternative, not two additions. Some
Days remain unallocated because this selected list does not cover the entire stay.
No missing shopping stop was invented to imitate a fuller source benchmark.

Resync remains insert-only. This correction does not introduce automatic reorganization
of saved work: manual Move to is a separate signed proposal, with existing atomic apply,
lock, booking preservation, retry and undo paths. No migration or dependency was added.

Verification for this correction:
- Existing baseline tests retained. The obsolete unknown-duration assertion is replaced
  by a same-city-is-not-relationship assertion; supported grouping is tested separately.
- 17 additional pure cases cover provenance, grouping/sequence, fixed/protected/full-day
  constraints, transfer qualification, eligibility, order and derived content.
- Three new PostgreSQL cases cover save/move/reopen context, validation and exclusive
  alternative selection; one new browser flow covers rendered grouping and movement.
  They run only in the separately authorized disposable GitHub CI service.
- Local pure tests, typecheck, lint and production build pass. No local destructive
  fixtures, reset, seed, migration or provider call is part of this correction.
- Private before/after, saved-move/reopen evidence, the comparison identity and database
  preservation audit are kept under ignored `.cache/organizer2/`. Private source material
  and screenshots are not published. Exact-head CI results belong in the draft PR/handoff.

This is a bounded deterministic outline improvement, not equivalence to the supplied
conversational planning session or human usability acceptance. Current route feasibility,
opening calendars, ticket availability, lodging quotes and automatic extraction of
arbitrary conversational relationships remain unresolved.
