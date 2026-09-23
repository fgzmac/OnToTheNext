# Sprint 4 — Reservation Workflow

**Slice 1 implemented; pending TPM/CEO review. Sprint 4 incomplete. Do not merge.**

## Objective and authority

Milestone 4 tracks reservation planning separately from external availability and
provider transactions. Slice 1 proves: Discover Accept → explicitly schedule an
Activity → explicitly create reservation tracking → Check back → optional external
handoff without a state change → explicit Mark booked → persistent Booked state.

Branch `sprint-4-reservation-workflow` starts from `origin/main` at
`bb147cb6726ac129cc4affe1c9b80aaa4c518ee5`, including Sprint 3 merged through PR #3
and D-121 acceptance. The checkout was clean before work began.
Only `fgzmac/OnToTheNext` is in scope. Options App resources remain untouched.

Authority reviewed: D-050, D-066, D-073, D-078, D-079, D-080, D-091, D-093,
D-121, navigation D-057/D-058/D-059, and roadmap Milestone 4.

## Model and lifecycle

ReservationType supports ACTIVITY, HOTEL, TRANSPORTATION. Slice 1 capabilities and
UI create only ACTIVITY Reservations attached to an existing same-Trip ACTIVITY.
ReservationState retains BOOK_NOW, OPENS_LATER, CHECK_BACK, OPTIONAL,
NO_RESERVATION_NEEDED, BOOKED, NEEDS_ATTENTION and CANCELLED.

A Reservation belongs to a Trip and optionally links one ItineraryItem through a
unique nullable foreign key. PostgreSQL enforces one Reservation per linked Item.
Application capabilities validate prototype ownership, same-Trip membership and
Activity type under the existing Trip row lock. Concurrent create, state, booking,
removal and structural operations use that lock. Direct database writes are not
application capabilities.

Item deletion sets itineraryItemId to null without deleting booking history,
confirmation details or evidence links. Trip deletion cascades Reservations and
ReservationEvidence join rows. Deleting a Reservation never deletes reusable
EvidenceRecord, Source or Place rows. Activity cards explain retention before
removal. Unattached reservations remain Trip-owned; their management UI is deferred.

Additive migration: `202609230005_reservation_slice1`. Earlier migrations are
unchanged. The migration adds enums, Reservation, ReservationEvidence, foreign
keys, uniqueness/indexes and database checks for local minutes from 0 through 1439.

## Explicit state boundaries

`createActivityReservation` accepts six planning states only. Scheduling, Fixed
planning, booking URL presence, evidence availability and Recommendation changes
never create or book a Reservation.

`setReservationWorkflowState` transitions among those six planning states. It
rejects BOOKED/CANCELLED targets and cannot demote BOOKED. `markReservationBooked`
is the only application action setting BOOKED. It accepts optional confirmed date,
local time, confirmation reference and note, preserving desired values and Item
planning. Repeated/concurrent confirmations cannot overwrite the first successful
booking. Invalid inputs leave existing state intact. Cancellation/unbooking is
not implemented.

## Desired and confirmed times

Desired and confirmed dates use PostgreSQL DATE; desired and confirmed times are
nullable timezone-neutral minutes within a day. UI creation prefills the itinerary
date/time as a convenience and saves an independent snapshot. No timezone model
or midnight-UTC user-facing date semantics are introduced.

`updateReservationDesiredTime` is a narrow pre-booking capability; it does not edit
the Item. Item movement or time changes do not rewrite the Reservation. Mark booked
never overwrites desired values or retimes the Item. A factual message identifies
confirmed time differences, without automatic conflict resolution.

## Booking handoff and evidence

Optional bookingSourceLabel and bookingUrl provide external context. URL validation
allows HTTP/HTTPS, rejects unsafe schemes, embedded credentials, control/space
characters and overlong URLs. The link uses target="_blank" with noopener noreferrer.
There is no click action, state tracking, provider fetch or return callback.
The external provider owns the transaction; the organizer explicitly records it.
Confirmation references are optional user metadata, limited to 120 characters,
rendered only in Trip reservation context. Source labels are limited to 200,
URLs 2,048 and notes 2,000 characters.

ReservationEvidence is an explicit many-to-many join. `linkReservationEvidence`
validates ownership and the attached Activity's source Place, accepts relevant
availability topics, and links idempotently. Multiple and conflicting records can
coexist without copying evidence into Reservation or changing workflow state.

The first synthetic Place has two additional Development Fixture Catalog records:
Ticket availability and Booking policy. Both are explicitly synthetic and not live.
The normal seed now has 14 evidence records for 12 Places/Recommendations, and
creates zero Reservations. Upserts preserve later evidence edits and explicit
organizer state. Evidence edits do not alter workflow; Reservation deletion does
not remove reusable sources/evidence.

## Contextual UX

Activity cards offer Add reservation tracking, a compact creation form, a factual
state label, desired snapshot, optional external booking link, evidence linking and
an explicit Mark booked form. Booked cards show confirmed values and reference
separately. No controls are offered for Free Time, Hotel/Rest or Transportation.
The UI reads a dedicated application DTO through getItineraryReservationContext;
components do not query Prisma. Read failures do not offer misleading creation.
Primary navigation remains Home / Itinerary / Discover.

All controls have visible labels, keyboard access, native buttons/forms/details and
textual states. No drag, swipe, hover or color-only interaction is required.

## Verification

Verification target: `ontothenext_verify_20260922_reservations` on localhost:5433,
user ontothenext, Compose project ontothenext, owned PostgreSQL named volume.
Normal development database and Options App resources were excluded.

- Prisma generation and validation passed.
- Forward deployment over all five previous migrations preserved every existing
  Sprint 3 row, column and index, including five timeline items: two Activities,
  Free Time, Hotel/Rest and Train Transportation with Segment references.
- First seed preserved all existing rows and added exactly two fixture Evidence
  records. Repeated seed produced an identical full database fingerprint.
- Guarded reset/reseed passed after fresh user consent for this exact database;
  all six migrations reapplied, deterministic fixtures restored, zero Reservations.
- Typecheck, lint and production build passed; final suite results recorded below.

Unit coverage includes eight state labels, local-minute/date validation, safe and
unsafe URLs, planning transitions, explicit booking boundaries and distinct desired
versus confirmed presentation. Integration coverage exercises ownership, same-Trip
identity, non-Activity rejection, uniqueness/concurrency, independent time snapshots,
all planning states, explicit booking, invalid/repeated confirmations, evidence
reuse/edits, independent Recommendation decisions, detachment and Trip cascades.

Desktop (1280×900) and phone (390×844) browser coverage follows the full flow.
The external URL is intercepted with a controlled fixture and database equality is
checked before/after handoff. No external provider is required. Tests retain the
prior Sprint 1–3 cases and check primary navigation, keyboard operation, readable
fixture labels, distinct times and horizontal overflow.

Local verification passed: 107 unit tests + 114 integration tests = 221 passing,
zero skipped; 12/12 Playwright tests passing. The applied database and Prisma
schema have no migration drift. Final link-affordance polish is covered by the
same two reservation browser scenarios and fresh acceptance screenshots.
Normal development rows, columns and indexes retain their original fingerprint:
`8d75f381c937e0dbc92aa4d56a86cb082be64a31e6b4bde321dc9ef43665319e`.

Local evidence is ignored under `.cache/sprint4-slice1`: before/after database
snapshots and comparison scripts, reset snapshot, test JSON/logs and desktop/phone
screenshots. No private URLs, generated client, screenshots or local infrastructure
are committed. Existing pg-adapter deprecation and Playwright color-environment
warnings remain non-failing. Exact-head CI is required before TPM review; the draft
PR records the final commit and CI results without declaring Sprint 4 complete.

## Known limitations and deferred work

- Unattached Reservations persist with booking history; discovery/management of
  those records is deferred to the trip-level Reservations Center in Slice 2.
- Confirmation time differences are factual text only. No automatic retiming or
  full Reservation/itinerary conflict resolution is implemented.
- Prototype ownership follows the existing application's model; no new identity
  provider, account system or sharing scope is introduced.
- Availability evidence is synthetic. No official, live or current-inventory claim.

Deferred: Reservations Center, Home reservation attention, Hotel/Transportation
Reservation UI, cancellation workflow, inventory-release presentation/scheduling,
notifications/reminders, live inventory, provider APIs, ticket purchase/hotel
transactions, email/OCR, PlannedCost/Expense/budget/payment/settlement, Map and Today.
D-078 future cost relationships remain unimplemented. No inventory fields, paid
flags or release scheduling fields were added to Reservation.

Sprint 4 incomplete. Slice 2 has not begun. Draft PR must not be merged before
TPM/CEO approval.
