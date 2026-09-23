# Sprint 5 — Today mobile mode

**Slice 1 passed TPM review for continued development. Slice 2 is implemented for review; Sprint 5 remains incomplete.**
Human on-trip usability testing has not been conducted. The accepted Slice 1 baseline is `90461b06e3c44939c62358fd89adf37ae4f95767`; work continues on the same branch and draft PR #5.

## Authority and base

This slice follows D-054, D-055, D-058/059, D-063, D-067, D-075,
D-091/092, D-102, D-118 and D-122, and roadmap Milestone 5.
Branch `sprint-5-today-mode` starts from main
`c77ec2cf61823e651a9bd23b67fbde2f6a5bb76d`, including Sprint 4 merge
`887e393560f326bb469dbc5b013fb9ccad2c9dd2` and D-122.
The Sprint 4 record opening now reflects acceptance; its historical results remain intact.

## Home and explicit Day selection

Primary navigation remains Home / Itinerary / Discover. Home contains Planning
and Today / Day view modes. Planning keeps Trip/Segment controls and Reservations.
The selected view and Day are URL state, carried through primary navigation and
the exact-item Itinerary management link. Discover destination/batch navigation
and Reservations utility/detail/return links retain that context too. Refresh and
browser Back preserve it.

Day view requires an explicit existing Trip Day; it never infers destination date
from clocks, city labels, GPS or IP. The selected date is prominently labeled.
Segment identity, order and date range distinguish repeated cities; Unassigned
Days remain usable. Invalid, deleted and cross-Trip IDs expose no foreign data.
Date-only values and local minutes retain their existing meanings.

Next in your plan is the first PENDING item by canonical position (stable ID
breaks a tie). Time does not reorder the plan or change progress. Intentional
untimed Free Time can be next. Empty days and days with no pending items have
separate messages; Completed/Skipped items remain in a collapsible section.

## Canonical progress and deliberate actions

ItineraryItem owns PENDING / COMPLETED / SKIPPED; there is no Today business table.
Existing/new items default to PENDING. The optional progress timestamp records a
server action, not verified attendance. Itinerary shows a factual progress label.

Application capabilities mark completed, preview/confirm skip, and restore to
pending. Each validates prototype ownership, Trip/item identity, a signed expiring
context token, allowed transition and revision under the established Trip lock.
Tokens bind every planning/Day/booking field. A changed booking invalidates an
older skip preview. Exact retries succeed only while their resulting revision and
context are current; they do not rewrite the timestamp. Conflicting/stale actions
fail visibly. After a newer decision, an earlier request cannot overwrite it.

Skip preview names the item and identifies Fixed items. Booked items require an
explicit acknowledgement that the reservation stays Booked. The preview states
that skipping keeps the item and does not cancel, contact a provider or create a
refund. Cancel dismisses it without a write. Restore returns the same item to its
original position; it does not schedule or change a reservation.

Only progress, action metadata, shared revision and updatedAt change. Planning,
RecommendationDecision, Reservation, evidence and retained history remain separate.
Completed/Skipped items still occupy a Day and block destructive Trip date shrink.
Movement and accepted Segment/source deletion paths preserve progress.

## Reservation composition

The Today read capability composes owned Trip/Day/items and the existing shared
Reservation DTO/warnings in one repeatable-read transaction. It displays workflow
state, confirmed and planned times, mismatch/cancellation warnings, and an
expandable private confirmation reference (explicitly not an admission ticket).
Cancelled reservations remain visible on Pending items. Orphan history is never
reattached by matching text. Failed reservation reads are unavailable, not absence.
Management links target the exact canonical Itinerary item; Today adds no booking
form, cancellation manager, provider integration or ticket system.

## Slice 1 migration and verification (historical)

Evidence is generated using synthetic data in ignored local verification output.
The eight accepted migrations are unchanged. The ninth additive migration,
`202609230008_itinerary_progress`, adds the progress enum and three item columns.
It was applied over populated Sprint 4 data containing all four item types,
Fixed/Flexible items, Booked/planning/Cancelled reservations, detached history and
release evidence. Every original row value, count, column and index survived;
existing progress defaulted to PENDING with null action metadata. Two subsequent
seed runs produced exactly the same full database fingerprint as after migration.
Prisma validation and schema drift check passed.

Only `ontothenext_verify_20260922_today1` on localhost:5433 was reset/reseeded,
following the owner's fresh exact-target approval. Matching effective Prisma,
test and browser environments, the actual Prisma subprocess database/user,
Compose project and named volume were checked. All nine migrations and seed passed.
The separate disposable GitHub runner `ontothenext_test` reset also has fresh approval.
Normal development, earlier verification/demo databases and Options resources are
excluded from destructive tests. Before/after read-only fingerprints cover all
nine existing itinerary databases.

Final unit/integration acceptance: **146 unit + 161 PostgreSQL integration =
307 passed**, zero failed/skipped. The accepted 278-test baseline is preserved.
The strengthened seed test covers both Completed and Skipped history. Generation,
validation, typecheck, lint and production build passed. Next-generated configuration
changes were restored and typecheck rerun successfully.

All nine excluded database fingerprints matched exactly after migration and tests.
Desktop (1280×900) and phone (390×844) screenshots were reviewed for selected Day,
Fixed/Booked skip preview, processed items and no-pending states. Text, warnings,
controls and booking details remain legible; tested states have no horizontal
overflow. Keyboard Enter/Space operation is covered in the browser flows.

The first browser run preserved all 14 baseline tests but the two new flows exposed
a Day-selector label lookup problem: option text was included in its implicit label.
An explicit accessible label fixed it. Review also found secondary navigation
dropping Home context; Discover and Reservations links/forms now carry that state.
Both expanded Today flows passed after rebuild. The final full browser suite passed
**16/16** (the preserved 14-test baseline plus two Today flows), zero failures,
skips or flaky tests. All nine excluded fingerprints were rechecked unchanged
after this final acceptance run. The test server shut down after verification.

## Scope and known issues

D-122's dependency deferral carries forward unchanged: trusted static acyclic
configuration, PostgreSQL/PrismaPg, local prototype only. Dependencies and lockfile
are unchanged; deferred advisories are not fixed or declared safe. Reassess at the
exposure/maintenance triggers documented in D-122. No public binding or tunnel was
introduced; phone testing uses a 390×844 browser viewport.

Automatic destination-date/time-zone activation and automatic travel-time logic,
GPS, maps/routing, nearby recommendations, Return to Hotel, expenses/payment,
notifications/background jobs, offline/PWA, automatic itinerary adjustment,
duplicate booking management, production auth and deployment are deferred.
No placeholder controls claim those features work. Real provider-data quality and
human on-trip usability have not been tested. Existing PostgreSQL client
concurrency deprecation warnings are non-failing and not resolved in this slice.

## Slice 2 — Known-context leave-by planning

The canonical optional ItineraryTravelPlan belongs one-to-one to ItineraryItem.
It persists typed origin, source ID/label snapshot, entered travel/buffer minutes,
PLANNED/CONFIRMED basis, explicit clock assumptions and a reviewed-context hash.
It never stores a calculated departure timestamp or substitutes visit/ride duration.
Target and source composite foreign keys enforce Trip scope. Normal source-item
removal detaches the reference under the Trip lock before deletion, preserving the
label and inputs for review. Target deletion cascades its plan while retaining the
existing detached Reservation; Trip deletion cascades its owned plans.

Pending Activity and Transportation items expose one collapsed Travel planning
section in Itinerary. Today composes a read-only summary and its existing exact-item
link; Home/Day query context and primary navigation remain unchanged. Transportation
text explicitly describes getting to the departure point, separate from the journey.

The organizer must choose an entered label (2–160 trimmed characters) or an actual
earlier, non-Skipped item on the same Day with a known matching Segment. Completed
does not prove location; a Hotel / Rest block does not establish a booked hotel.
Travel must be an integer from 0–1440 minutes and buffer from 0–240; missing values
are unknown, while deliberately entered zeros are valid. The timing basis is explicit.
Confirmed basis requires an attached Booked reservation with matching Day/date and
known time. Different confirmed dates block calculation. Planned-versus-confirmed
differences remain visible and choosing planned requires deliberate acknowledgement.

Calculation is chosen canonical start minus entered travel minus entered buffer:
10:00 − 25 − 10 = 09:25. A 2030-04-02 00:15 target minus 30 and 10 produces
2030-04-01 23:35, with the earlier date shown explicitly. Date-only arithmetic is
independent of machine time zone. Departure outside Trip dates warns without
changing Days. A known earlier stop end after required departure warns factually;
unknown end cannot establish feasibility. No item is shortened, retimed or reordered.

Every estimate says “Manual estimate — not live routing.” The organizer explicitly
confirms a same-local-clock assumption. Different time zones or clock-change
ambiguity can be retained as inputs needing review, but produce no departure result.
No destination clock, current location, countdown, provider verification or guaranteed
arrival is inferred. Cancelled bookings and processed targets retain inputs but have
no active estimate. Missing plans and failed reads are presented differently.

## Slice 2 consistency

Reads and previews do not write. Saves, edits, clears and explicit reconfirmations
validate ownership and signed expiring purpose/context/revision tokens under the
existing Trip lock. Identical retries return the same result without changing metadata;
conflicting or stale requests fail visibly, including save/clear/recreation histories.
Only travel inputs and shared item revision/action/update metadata change.

A purpose-specific hash tracks target date/time/position, booking state/date/time,
origin identity and eligibility, source timing, Segment and Trip date context. Notes,
evidence refreshes, target visit duration and unrelated booking details are excluded.
Changed assumptions suppress leave-by until reviewed through edit/reconfirmation.
Deleted/moved/Skipped sources need a valid replacement rather than silently becoming
manual origins. Complete/Skip suppress actionability; restoring unchanged valid
context reactivates the preserved inputs. All occupied-Day protections remain.

## Slice 2 data verification

The tenth additive migration, `202609230009_itinerary_travel_plan`, adds the typed
travel table, enums, same-Trip constraints and item action key. The nine accepted
migrations remain byte-for-byte unchanged. It was applied over populated Slice 1
Pending/Completed/Skipped, Fixed/Flexible, Booked/planning/Cancelled, detached-booking
and evidence fixtures. Every original field, count, column and index was preserved;
no item acquired a travel plan or invented durations. Two repeated seeds produced
the exact same full database fingerprint as immediately after migration. Separate
integration coverage preserves user-entered plans, progress, booking and evidence
through repeated seeds and reads. The normal demo creates no travel plans.

Only `ontothenext_verify_20260922_today2` on localhost:5433 was reset/reseeded after
fresh owner consent for that exact target. Effective Prisma/test/browser URLs,
actual Prisma subprocess database/user, Compose project and named volume were
verified. All ten migrations and seed passed; generation, validation and drift
checks passed. The previously approved disposable GitHub `ontothenext_test` service
remains the CI target. Excluded development/demo databases and Options resources
are outside destructive setup; ten excluded itinerary databases are fingerprinted
read-only before and after migration, seeds, reset and regression tests. All ten fingerprints match exactly.

## Slice 2 verification results

All **178 unit + 184 PostgreSQL integration = 362 tests passed**, with zero skipped
or failed tests. The complete accepted 307-test baseline remains intact. The first
new-test typecheck caught an incorrectly typed helper; correcting the helper made
typecheck and the initial 55 new tests pass. The full suite then passed twice, the
second run after strengthening the unsupported-target test to exercise a valid
travel token and the specific service guard. Assertions were not weakened.

Generation, validation, drift, typecheck, lint and production build passed. Build
was repeated after shortening phone clock-choice labels; full explanatory text
remains visible. Next-generated tracked configuration was restored and typecheck
and lint rerun successfully. Dependencies, lockfile and workflow are unchanged.

The first complete browser run passed all 16 baseline flows but failed both new
flows at their final refresh: the test reloaded before the client-side Home
navigation arrived, leaving Itinerary on screen. Captured Home URLs retained the
correct Day context. The test now asserts Home URL and selected Day before refresh,
then asserts them again afterward. All prior arithmetic, basis, review, source,
midnight, progress and clear checks had passed. This run and its traces were retained
in ignored verification output. Phone screenshot review also found clipped native
select option text; shorter clock labels retain the full nearby explanation.
The final complete browser rerun passed **18/18**: all 16 baseline flows plus the
two new desktop (1280×900) and phone (390×844) travel flows. Zero failures, skips or
flaky tests remain. Keyboard Enter/Space and explicit planned-basis acknowledgement,
refresh/context retention, stale review/reconfirmation, source conflict, midnight,
clear and Complete/Skip/Restore all passed. Screenshots of entry, stale state,
basis/feasibility and Day summaries were reviewed; tested states have no horizontal
overflow and the shortened clock label is fully readable. All ten excluded database
fingerprints were rechecked unchanged after this final run. The verification server
stopped; existing Compose ownership, named volume and port mapping remain unchanged.
## Remaining Milestone 5 requirements

Sprint 5 is not complete, and this slice does not begin Slice 3. Automatic
destination-date/time-zone activation remains unresolved. Free Time actions beyond
preserving intentional blocks, Return to Hotel/known-base behavior, and the quick
expense entry shell versus the later Expenses milestone still need scoped decisions
and implementation. On-trip experiment readiness remains unresolved; actual human
testing in San Jose has not been performed or claimed. Synthetic desktop/phone
acceptance is not a substitute for the milestone's human usability experiment.
D-122's conditional dependency deferral and reassessment triggers are unchanged.
