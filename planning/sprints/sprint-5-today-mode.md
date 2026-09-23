# Sprint 5 — Today mobile mode

**Slice 1 implementation for TPM review; Sprint 5 remains incomplete.**
Human on-trip usability testing has not been conducted. Slice 2 has not begun.

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

## Migration and verification

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

Automatic destination-date/time-zone activation, leave-by and travel-time logic,
GPS, maps/routing, nearby recommendations, Return to Hotel, expenses/payment,
notifications/background jobs, offline/PWA, automatic itinerary adjustment,
duplicate booking management, production auth and deployment are deferred.
No placeholder controls claim those features work. Real provider-data quality and
human on-trip usability have not been tested. Existing PostgreSQL client
concurrency deprecation warnings are non-failing and not resolved in this slice.
