# Sprint 4 — Reservation Workflow

**Accepted and merged through PR #4.** D-122 records CEO acceptance and merge
commit `887e393560f326bb469dbc5b013fb9ccad2c9dd2`.

The implementation and verification notes below are historical, pre-acceptance
records. Their pending-review language is superseded by
[D-122](../decisions/D-122-sprint-4-reservation-workflow-accepted-and-merged.md).
Historical results are unchanged; human comprehension testing was not conducted.

## Objective, authority and baseline

Milestone 4 makes booking state trustworthy while keeping external evidence and
provider transactions separate. The core boundary remains:
**Accepted ≠ Scheduled ≠ Booked ≠ Paid.**

Slice 1: explicit Activity reservation creation, six planning states, independent
desired/confirmed snapshots, external handoff, explicit Mark booked, many-to-many
Source/Evidence links and safe item detachment. Reviewed baseline:
`610a1c76d0ce825ad5ddd103a048778b9864a21f`, with 107 unit + 114 integration tests
and 12 browser tests passing. These are historical baseline results, not Slice 2
verification claims.

Slice 2 continues `sprint-4-reservation-workflow` and draft PR #4 without replacing
subsequent work, branching again or merging. The original main baseline remains
`bb147cb6726ac129cc4affe1c9b80aaa4c518ee5` (merged Sprint 3 and D-121).
Only On To The Next resources are authorized; Options App remains untouched.

Authority: D-050, D-055, D-058, D-059, D-066, D-073, D-079, D-080, D-091 and roadmap
Milestone 4; Slice 1 decisions and boundaries remain applicable.

## Navigation and retained records

Home has exactly one compact Reservations utility entry. It opens the current
Trip's focused follow-up list, with Back to Home and Home highlighted as the owning
primary section. Primary navigation remains Home / Itinerary / Discover. No More,
readiness score, additional warning cards or Discover reservation shortcuts exist.

The list includes every Trip-owned reservation. Attached records link to their
stable `#item-<id>` anchor in that Trip's Itinerary. They do not duplicate the
attached management editor. Unattached rows say "Not attached to an itinerary
item" and expand the same shared reservation-details presenter/capabilities.
Cancelled records are retained in a subordinate collapsed group, not urgent tasks.

Reservation.title is an immutable-at-creation title snapshot from the actual Item.
The migration backfills attached titles from their actual Item and uses honest
"Unlinked activity reservation" (or corresponding type) fallbacks for already
unattached records. No lost names are fabricated through city matching. Deletion
retains title, notes, desired/confirmed values, reference, state and evidence links.
No reattachment, replacement booking or record merging occurs.

## Typed release observations

ReleaseObservation is an optional one-to-one child owned by EvidenceRecord, with
an explicit enum for each independent concern:

- ReleasePrecision: UNKNOWN, NOT_ANNOUNCED, DATE_ONLY, EXACT, WINDOW.
- AvailabilityObservation: UNKNOWN, AVAILABLE, UNAVAILABLE, LIMITED.
- EvidenceAttribution: OFFICIAL, THIRD_PARTY, USER_REPORTED, DEVELOPMENT_FIXTURE.

A missing child means "No release information recorded". UNKNOWN is an explicit
unknown observation. NOT_ANNOUNCED is an explicit sourced assertion, never inferred
from absence. Availability remains a reported observation, not workflow state.
No authoritative timing is extracted from free text.

DATE_ONLY stores a DATE and displays "Time not announced". It is never converted
to a midnight deadline. EXACT requires an ISO timestamp with an explicit numeric
UTC offset or Z. PostgreSQL TIMESTAMPTZ stores the instant and sourceTimeZone retains
the supplied numeric offset for source-local display. Offset-only representation
is intentional: unqualified local times and named-zone-only inputs are rejected,
including ambiguous/nonexistent DST wall times. An explicit offset disambiguates
an instant; the app does not invent IANA-zone rules or validate a named zone that
was not supplied. Impossible dates/times and invalid offsets are rejected.

WINDOW preserves reported wording and/or a bounded DATE range. Both endpoints
are required when using a date range, and reversed/impossible dates are rejected.
Vague or intraday windows stay as reported text. They are never parsed into exact
instants or used as exact deadlines.

Observations retain observation time, optional explicit recheck instant, source
name/kind, safe optional HTTP/HTTPS source URL and user-recording provenance.
OFFICIAL describes the user's selected source attribution; it is displayed with
"Recorded by user; not independently verified by the app". Fixture attribution
remains visibly "Development fixture / Not live". No live or independently verified
claim is introduced.

`recordReleaseEvidence` validates prototype Trip ownership and the attached
Activity's relevant source Place. Each submission creates a new Source/Evidence
observation and links it; shared historical rows are never silently overwritten.
`linkReservationEvidence` retains the existing Place/topic association checks.
Multiple conflicting observations coexist. Conflict labels identify contradictory
known availability, different exact instants/date-only dates, or explicit
not-announced versus reported release information; no winning source is selected.

The compact recording form is optional and collapsed within reservation evidence.
Fields depend on selected precision. Existing linked evidence remains readable if
the Item, Recommendation or Place disappears, and notes/cancellation still work.
Unavailable source association disables new linking/recording with an explanation;
no placeholder Place is created. EvidenceRecord's Place reference is now nullable
with SET NULL on Place deletion so linked evidence itself survives. The Source,
EvidenceRecord and ReservationEvidence relationships remain intact.

## Freshness, attention and timing context

Time-sensitive domain functions receive an injected `now`. Opening a page or
reseeding never changes observation timestamps. Freshness labels use an explicit
recheck deadline where recorded, otherwise a disclosed 30-day observation-age
threshold. An exact release that has passed says it needs rechecking. Neither age
nor the clock infers available inventory, BOOK_NOW or BOOKED.

Attention is derived on each canonical read, not stored as readiness state.
BOOKED stays BOOKED when warnings identify a different confirmed date/time,
confirmed date outside the Trip, detachment, stale release evidence or conflicting
observations. Comparisons use only known values; missing times display "Time not
recorded". Explicit NEEDS_ATTENTION remains a planning state with an optional
reason/note; generic planning actions cannot demote BOOKED or reopen CANCELLED.

Same-Day, same-base confirmed-start overlap checks reuse existing interval logic
only when confirmed date/time and planned duration are known. They label duration
as planned, not provider-confirmed. Unknown durations produce no invented end.
Unrelated city-local contexts are not compared as absolute instants. No conflict
table, auto-resolution, retiming, duration change or Fixed/Flexible mutation exists.
Existing itinerary move-preview protection is preserved.

List ordering is stable: non-cancelled before cancelled, derived attention first,
then future exact release instants when known, then title and ID tie-breaks.
Date-only/unknown/window observations do not create urgency instants.

## Explicit local cancellation

`previewReservationCancellation` uses the existing signed, expiring preview
infrastructure. `recordReservationCancellation` locks the Trip and verifies the
preview's purpose, owner/Trip/Reservation identity and full current Reservation
fingerprint, including revision. Reservation mutations increment revision.

BOOKED cancellation requires explicit acknowledgement that cancellation has
already been completed or confirmed externally. Unbooked confirmation explains
that it stops local tracking and does not imply a provider booking existed.
Cancel dismisses the confirmation without mutation. Confirm records local
CANCELLED, a TIMESTAMPTZ cancellation timestamp and a separate optional note.

This does not contact the provider, issue a refund/payment, remove or move an Item,
change RecommendationDecision, or clear confirmed values/reference/evidence.
Stale unbooked previews cannot cancel a newly Booked record. Simultaneous booking
and cancellation serialize; repeated cancellation cannot overwrite the original
timestamp/note. Cancelled records cannot be reopened through generic planning.
Notes remain independently editable on retained records.

## Transportation and shared workflow

`createTransportationReservation` accepts only existing same-Trip TRANSPORTATION
Items. `createActivityReservation` remains Activity-only. Both snapshot actual
Item titles and share owner checks, one-reservation uniqueness, independent times,
planning states, explicit booking, handoff, cancellation and retention behavior.
Transportation timing is explicitly departure context. No arrival time zones,
flight status, seats or purchase flow are added. No source evidence means unknown
availability; the app creates no artificial transportation Place.

HOTEL_REST does not create Hotel Reservations. Hotel-specific booking UI awaits a
proper lodging/Hotel Stay model. The three Reservation types and all eight approved
states remain in the schema.

## Data safety and migration evidence

New migrations only; all six prior migrations remain unchanged:

1. `202609230006_reservation_followup`: title snapshot/backfill, revision,
   cancellation timestamp/note and typed ReleaseObservation child.
2. `202609230007_retained_evidence_place`: relax the existing EvidenceRecord Place
   reference to nullable SET NULL so catalog removal cannot erase linked history.

Dedicated disposable target: `ontothenext_verify_20260922_reservations2` on local
PostgreSQL host port 5433, user ontothenext, Compose project ontothenext and its
owned PostgreSQL volume. Actual database/user/container/mount identity was checked.
DATABASE_URL and TEST_DATABASE_URL must both select this target for destructive
tests; browser setup must check their equality. No fallback to normal development.

Forward migration was exercised on three Slice 1 reservations (Booked, unbooked,
and already detached), evidence joins, Activities and manual/Transportation blocks.
Comparisons prove preservation of all original rows/field values and indexes;
only the explicitly intended Place-reference nullability changed. Title backfill
used real available titles and the honest orphan fallback. Repeated normal seed
preserved the complete populated database without creating reservations or
refreshing evidence. No private booking data is used.

Normal development is not migrated or reset. The prior manual-test demo database
is retained separately. Local evidence, snapshots and screenshots remain ignored
under `.cache/sprint4-slice2`; credentials, runtime artifacts and machine-specific
paths are excluded from Git.

## Verification status

- Prisma generate/validate, all eight migrations up to date and final schema drift:
  passed; no difference detected.
- Populated forward migrations and title backfill: passed. All original Slice 1
  fields/rows/indexes were preserved, with the intended nullable Place reference.
- Repeated seed preserved the complete populated database. SHA-256 before/after:
  e2113e6635b1b9bdc1397f844aca27a8f9ebcde26bb588611ea63039fdd8e992.
- Guarded isolated reset/reseed: passed, exit 0, using npm run db:reset
  (tsx scripts/db-reset.ts -> prisma migrate reset --force -> prisma db seed).
  Fresh explicit user consent was supplied through Prisma's supported consent
  environment variable; no safety checks were disabled. An ignored preflight
  executed inside each actual Prisma subprocess and verified matching DATABASE_URL,
  TEST_DATABASE_URL and live database/user. Prisma configuration matched; the
  browser server has no target override. Redacted effective target:
  postgresql://ontothenext:[redacted]@localhost:5433/ontothenext_verify_20260922_reservations2.
  Compose project ontothenext, container ontothenext-postgres-1, named volume
  ontothenext_ontothenext-postgres were verified immediately before reset.
- Reset applied all eight migration.sql files: 202609220001_sprint1_foundation
  (Trip/Segment/Day/preferences/prototype ownership), 202609230001_discover_slice1
  (Place/Recommendation/Decision/Source/Evidence), 202609230002_discover_refinement
  (interest tags and persistent presentation batches), 202609230003_itinerary_slice1
  (ItineraryItem and scheduling constraints), 202609230004_itinerary_builder
  (Transportation mode and origin/destination), 202609230005_reservation_slice1
  (Reservation states/types and evidence links), 202609230006_reservation_followup
  (title/revision/cancellation and typed release observations), and
  202609230007_retained_evidence_place (nullable Place reference with SET NULL).
  The six prior files were not changed.
- Post-reset counts: PrototypeUser 1, Trip 1, TripSegment 4, Day 15,
  TripPreferenceProfile 1, Place 12, Recommendation 12, Source 1, EvidenceRecord 14,
  ItineraryItem 0, RecommendationDecision 0, Reservation 0, ReservationEvidence 0,
  ReleaseObservation 0, applied migrations 8.
- Final typecheck, lint and production build: passed.
- Complete Vitest run: 278 passed across 16 files; 138 unit + 140 PostgreSQL
  integration tests, zero failed/skipped. New coverage: 31 unit + 26 integration.
- Final full mutation-capable browser suite: 14/14 passed, zero failures/skips,
  after rebuilding the precision-reset fix. Desktop 1280x900 and phone 390x844
  reviewed: readable release/source labels, cancellation acknowledgement, retained
  history, Transportation details and consistent precision form; no horizontal
  overflow. Primary navigation remains Home / Itinerary / Discover.
- Excluded database preservation: fresh read-only full rows/columns/indexes
  fingerprints (including migration rows) before reset and after all testing match:
  - ontothenext: 8d75f381c937e0dbc92aa4d56a86cb082be64a31e6b4bde321dc9ef43665319e
  - ontothenext_verify_20260922_reservations:
    dd8fd965e3c8450eb9d280de2e82e19d9d919ba038691a27e77f7acb2b436c70
  Neither excluded database was reset, seeded or migrated. No Docker volume was
  changed and Options App was untouched.
- Publication gate: push normally on the existing branch and verify CI for the
  exact published head; record immutable run links in draft PR #4. User separately
  approved the existing GitHub workflow's disposable ontothenext_test database on
  its isolated runner. Historical baseline CI is not Slice 2 evidence.

Failures and reruns: the earlier automatic approval review blocked the reset before
execution; fresh target-specific approval resolved it. The earlier read-only browser
harness asserted a count before client navigation completed; an awaited assertion
fixed that harness failure and desktop/phone smoke checks passed. Those checks do
not substitute for the full mutation browser suite. The complete Vitest run passed
on its first execution. The first full browser run had 12 passes and two failures:
both movement tests used an ambiguous summary selector after Transportation gained
a reservation control. Selecting the exact movement label fixed both; the full
rerun passed 14/14. Screenshot review then found a native form reset left the
precision dropdown and conditional fields inconsistent after saving. The shared
form now synchronizes the precision state on reset; final browser assertions check
Unknown and removal of precision-specific fields after each of five observations.
A final production build and full browser rerun passed and verified that correction. Existing pg query-concurrency deprecation and color-environment
warnings remain non-fatal; no database coverage is skipped.

New coverage includes all-state scoped access, title retention, true Place deletion,
independent evidence observations, precision and freshness, Booked attention,
cancellation acknowledgement/staleness/concurrency, Transportation and preservation
of item/decision/booking history. Existing browser assertions are retained; selectors
are narrowed for collapsed secondary controls and distinct movement summaries.

## Reservation-state comprehension experiment protocol

**Prepared, not conducted with a person.** Automated checks demonstrate mechanics;
they do not establish human comprehension. Use synthetic records in the actual UI,
with an organizer who did not implement the feature. Avoid coaching before answers.

For each scenario ask: "Is anything booked? What action, if any, is needed? Did the
app contact a provider or record payment?" Record the person's exact answer,
confidence and any navigation hesitation; compare with these expected answers:

| Representative scenario | Expected answer |
| --- | --- |
| Accepted recommendation, not scheduled | Accepted idea only; no booking. Schedule deliberately if wanted. |
| Fixed scheduled Activity, no Reservation | Planning time is fixed; booking is not confirmed. |
| Check back + reported available evidence | Still not booked; review the source and book externally if desired. |
| Check back + future exact release | Revisit that source at its stated offset/time; no inventory guarantee. |
| Check back + date-only or reported window | Exact time is unknown; do not assume midnight or an invented deadline. |
| No release information vs Not announced | Absence is unknown; Not announced is an explicit source observation. |
| Booked + mismatch/stale warning | Remains Booked; review timing or evidence without automatic changes. |
| Booked + detached item | Booking history still exists; manage it under Home → Reservations. |
| External booking/source link clicked | Opening a link did not mark Booked, cancel or pay. |
| Record cancellation on Booked | Complete/confirm cancellation externally, then explicitly acknowledge and record locally. |
| Cancelled record | Retained history; local record does not prove a refund/payment or provider API call. |
| Transportation Check back / Booked | Same explicit booking boundary; displayed timing is departure context. |

Finish by asking where to find trip-level follow-up and attached booking details.
Expected: Home → Reservations for follow-up/retained records; Itinerary for attached
booking details; only Home / Itinerary / Discover are primary destinations.

Record misunderstandings for TPM/CEO review. No participant results or successful
comprehension claims exist yet.

## Milestone exit assessment and limits

The real UI supports running the comprehension experiment. Persistence and
Accepted/Scheduled/Booked separation passed the complete local suites. Engineering
verification is ready for review, subject to exact published-head CI. Human
comprehension has not been measured;
TPM/CEO acceptance remains outstanding. Sprint 4 is not declared accepted/complete.

Known limits: source observations are manually entered and unverified; freshness
uses the disclosed recheck/30-day rules; exact inputs require numeric UTC offsets;
windows remain text or date ranges; overlap warnings use only known same-context
planned durations. Confirmation previews expire after 30 minutes and server restart
invalidates them safely under the existing single-process prototype pattern.

Out of scope: Hotel booking UI, provider transactions or external cancellation,
live inventory/network scraping/monitoring, notifications, expenses/refunds/payments,
Map, Today, production authentication, automatic itineraries and another Sprint.
