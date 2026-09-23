# Itinerary Builder Refinement — Pass 1

## Priority and review boundary

The CEO paused further Today-mode work after TPM-reviewed Slice 2 at
`e2645c8e0d207bf08fa2cab3ca96870763083174`. Today work is preserved, not discarded;
Sprint 5 is not complete. This pass makes an ordinary fresh Trip useful through
manual itinerary creation and in-place editing. It does not resume Today Slice 3.

Branch `refine/itinerary-builder-basics` is based on that exact published
`sprint-5-today-mode` head. The refinement PR is draft and targets
`sprint-5-today-mode`, depending on unmerged draft PR #5. Neither PR is merged or
marked accepted. Options App, dependencies, Docker/storage configuration, and
ports are outside this change. D-122 and its dependency-deferral conditions remain
unchanged. No human usability testing is claimed.

## Manual creation and provenance

`createManualActivity` creates an ACTIVITY directly on an existing owned Trip
Day, including Unassigned Days. It requires a title and Day; local start minute,
positive whole-minute duration, location/address label, HTTP(S) reference URL and
notes are optional. Flexibility defaults to Flexible. Unknown values stay null;
there is no lookup, scraping, provider verification or invented Place,
Recommendation, Decision, Reservation, coordinates or availability.

The established Trip transaction lock serializes append and position
normalization. A purpose-specific signed request ID owns a small
`ManualActivitySubmission` receipt and canonical payload hash. Exact retries
return the original item without changing it; a different payload with that
request is rejected. A new request can deliberately create another similarly
named item. Item deletion nulls the receipt's item link, preventing resurrection;
Trip deletion cascades receipts. Application ownership checks bind receipt,
Trip and Day. Receipts are retained for the Trip lifetime.

`enteredManually` distinguishes this capability from detached historical
Activities. Existing rows default false, with new location/reference fields null.
No historical title/location is backfilled. The UI labels manual details as
unverified, retains accepted-recommendation attribution, and uses neutral wording
when an original source is unavailable.

## In-place editing and protected changes

One shared form edits title, planned start, duration, notes and Fixed/Flexible;
Activity forms also expose location and reference URL. Type is immutable and Day
changes use the existing Move workflow. Omitted fields preserve values, while
blank/null optional values clear them. Free Time still requires positive duration.
Reference URLs reuse existing safe URL validation without fetching them.

Edits retain the item ID, Day/position, Recommendation link, progress and all
Reservation data. They update only the narrow planning snapshot and edit/revision
metadata. Recommendation, Decision, Place, evidence, confirmed/desired booking
times, confirmation and history are not synchronized with the plan. Existing
one-schedule and recommendation Segment restrictions remain enforced. Manual
Activities can use existing reservation tracking; source-specific evidence is
unavailable when no associated Place exists.

Signed edit tokens bind purpose, Trip/item, revision, current planning details,
progress, source links, Day/Segment and booking context under the Trip lock.
Old/conflicting forms fail without partial writes. Exact edit retries succeed
only while their resulting revision and context remain current. Fixed or Booked
material changes to time, duration, location or flexibility first return a
before/after preview. Confirmation binds the exact proposed values and original
context, including intervening booking changes. The preview says:
“This changes your plan, not your booking.” Cancel is a local dismissal with no
write. Ordinary title/notes corrections do not require that preview.

## Travel and other confirmations

Target/source location labels now participate in reviewed travel fingerprints
when present. Omitting null labels preserves parent fingerprints for unchanged
existing rows. Target time/location and source time/duration/location changes
retain entered travel/buffer values but invalidate affected estimates until
review; stale leave-by output is suppressed. Notes and reference-link corrections
do not invalidate reviewed travel. Existing title/context invalidation remains.

Item revisions/full planning context continue to stale old progress and movement
requests. Reservation cancellation previews now also bind their attached item,
so a relevant intervening edit cannot be confirmed against an old preview.
Completed/Skipped state is preserved and occupied-Day protections still apply.

## Builder interaction

The vertical Day timeline and Home / Itinerary / Discover navigation remain.
A prominent Add activity action appears even with an empty catalog or itinerary.
The shared labeled form retains values and focuses the error on validation
failure. Create/Edit/Cancel work by keyboard; saved items and cancelled editors
receive focus. Time, duration and entered location are visible in each item;
Edit, existing movement and Remove remain discoverable. Notes/reference content
and existing reservation details are collapsed, with reservation warnings opening
relevant details. Travel keeps its existing collapsed editor. No other page was
redesigned.

## Data verification

Migration 11, `202609230010_itinerary_details`, adds five item columns and the
creation-receipt table. All ten parent migrations are unchanged. The populated
parent fixture included all item types, Fixed/Flexible, detached recommendation
and booking/evidence sources, Pending/Completed/Skipped, Booked/Cancelled and
travel plans. Forward migration preserved every original row field, count,
column and index; new fields were null/false and no receipts were invented.

Local acceptance used only `ontothenext_verify_20260922_builder_refine1` on
localhost:5433 as user `ontothenext`. Before destructive work, effective Prisma,
unit/integration/browser URLs, the actual Prisma subprocess database/user,
Compose ownership and itinerary volume were verified. The CEO gave exact-target
fresh approval; the guarded reset then replayed all eleven migrations and seed.
Separate fresh approval covers `ontothenext_test` in the existing disposable
GitHub runner service. No local database/volume is reachable from that service.

The initial seed equality check failed because the populated fixture deliberately
deleted a seeded demo Recommendation. First reseeding restored exactly that one
fixture Recommendation; every existing row and detached source link stayed
unchanged. The second seed matched the first seed fingerprint exactly. An
additional integration assertion proves repeated seed preserves newly entered
manual fields, submission receipts, travel, progress and booking state exactly.
This is fixture restoration, not a claim that the first seed matched the
post-migration fingerprint.

Migration evidence (SHA-256):
- Populated parent: `edc0c27cf134f21f53f36c1eef06335f0a45f8a550f098af0f5d9229b21a6f05`.
- After migration: `7fe4ad646a81e294fe9001ac52c4dd4711a0251d3ec77acd9f2faa0e791f22db`.
- First and second seed: `ef26e0b1819dc4fba1a1e2f9edb9d158e360fc88204e71c9de4a6583c1a57b17`.

## Acceptance results

- Prisma generate/validate/drift, populated upgrade and approved reset/reseed passed.
- Focused new tests: 28 unit + 29 integration = 57 passed.
- Complete suite: 206 unit + 213 integration = 419 passed; zero skipped or failed.
  This preserves the parent 178 + 184 = 362 assertions and adds 57.
- Typecheck, lint and production build passed. Next-generated local config changes
  are excluded from the patch; the final typecheck/lint passed with restored config.
- All 11 excluded local database fingerprints match before/after, including normal development and every earlier demo/verification database. Final browser acceptance: 22/22 passed, zero failures, skips or flaky tests (2.8 minutes). Desktop and 390×844 screenshots reviewed; no horizontal overflow.

The four added browser flows cover desktop and 390×844: ordinary Create Trip UI,
two Days with no Recommendations or preinserted items, two manual Activities
(one untimed), edit/validation/cancel, reload, reorder/move and navigation without
visiting Discover; plus a Booked recommendation edit with no-write preview/cancel,
explicit confirmation, unchanged booking/source/progress and stale travel. The
18 parent browser tests retain their assertions; reservation interactions simply
open the newly collapsed details before using controls. Screenshots and overflow
assertions support automated visual review, not actual human testing.

During implementation, typecheck caught a missing builder creation token and a
test helper that assumed the wrong Result union; both were corrected before the
57-test focused and 419-test complete acceptance runs. The seed comparison issue
and its exact resolution are recorded above. Existing pg concurrent-client-query
deprecation and terminal color warnings remain; dependencies were not changed.
The first browser run passed 20 tests (all 18 parent flows and both Booked edit flows); the two fresh-Trip flows timed out on the notes field because existing textarea text made its accessible name unstable. The shared field now has an explicit accessible name and the validation-error focus assertion is retained in acceptance. The second run also passed 20 and failed the two fresh-Trip flows: it reached saving and exposed a focus race with server-rendered updates. Create/Edit focus now runs once after the transition commits, avoiding later refocusing on an old created item. An intermediate lint failure rejected an effect-driven state reset; the final implementation uses a ref for this DOM-only request. The final full browser rerun passed all 22 tests after rebuilding. CI trigger changes add only this push branch and the dependent PR base; every
existing job/check remains.

## Remaining usability limits and deferred work

The manual create/edit/move loop is the intended useful path for this pass.
There is one prominent Trip-level Add form with a Day selector, not a Day-local
shortcut. Stale/expired forms preserve their current draft but require refresh
and reopening; unsaved drafts do not survive page reload. Long trips still use
the existing scrolling timeline. Keyboard/phone automation does not substitute
for organizer/on-trip usability review. Local prototype ownership/authentication
and private operation remain unchanged.

Automatic activity discovery/generation, real provider/catalog integration,
Meal/Shopping/Custom creation, maps/hotel search/Return to Hotel, further Today
features, expenses/payments, sharing/export, public deployment/authentication,
tunnels and new network exposure remain deferred. Those roadmap gaps are
separate from entering and maintaining a manual itinerary.
