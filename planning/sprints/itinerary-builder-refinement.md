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

## Pass 2 — recommendation-first composer (2026-09-23)

The CEO found Pass 1 too much like a form: too many menus, steps and required
activity details. Passing technical checks did not establish usability acceptance.
D-123 records the narrow amendment: Itinerary may embed shared Discover ideas,
with explicit Add to Day, while standalone Accept still only keeps an idea.
Ranking, decisions, booking and scheduling retain their existing shared capabilities.

### Product experience and interaction counts

Setup now presents destination, start date and end date, followed by one Start
planning action into Itinerary. The supported-city selector determines scope;
a generated name and default traveler count avoid optional typing. Country setup
creates a starting Segment only on explicit choice. The old form exposed scope
separately and four HTML-required fields (destination, travelers and two dates).
The new main flow has three required controls, with optional travelers/details.
Calendar entry can supply dates without destination text entry.

Desktop places four recommendations beside the selected Day. Phone uses one column
with a sticky Day selector and View day shortcut. Each Add accepts and schedules
in one persisted action. Three activities require three Add clicks, zero activity
detail text entry and zero primary navigation switches. Pass 1 required manual
activity names or separate Discover Accept then scheduling controls, and had no
fresh-trip real catalog path.

Day selection follows explicit planDay/Home context, otherwise the first Day,
never the clock. Item hashes reveal their owning Day and shared detail panel.
Manual entry and Free Time/Rest/Transportation are secondary controls. Existing
editing, movement, booking and travel capabilities live in one accessible dialog.
Rows omit empty/system fields while retaining Fixed, booking attention, conflicts
and stale travel warnings. Interest chips save directly and retain confirmed state
on failure.

### Catalog and provenance

The checked-in catalog contains 24 distinct real experiences: eight each for
Tokyo, Kyoto and Osaka. `src/modules/discover/catalog.ts` retains every official
source URL, actual observation date (2026-09-23), original factual summary,
category/interests and verified location or null. Primary sources include operators
(Senso-ji, Tokyo National Museum, Meiji Jingu, Kyoto temples, Nishiki, Kuromon,
Sumiyoshi and Umeda Sky Building), GO TOKYO, Osaka Convention & Tourism Bureau,
and Kyoto Railway Museum's official visitor guide. Descriptions are original.

Only three source-backed planning estimates are supplied: Edo-Tokyo Open Air
Architectural Museum 120 minutes, Osaka Castle Museum 60 and Kaiyukan 120.
All other durations remain unknown. Hours, prices, availability, reservation
requirements, travel times and coordinates are not inferred. No licensed photos
were available; the intentional image-free cards expose sources in details.
Nothing is labeled live or provider-confirmed timing.

Shared Segment provisioning uses strict canonical city mapping (case/outer
whitespace only), actual Segment IDs and append-only evidence versions. Product
code creates eight Recommendations without a trip-specific seed. Repeated Tokyo
Segments have independent Recommendation/decision/batch identities. Unsupported
or ambiguous names get honest coverage text and manual entry; Unassigned Days
get one destination-context action in Home. Synthetic regression Trips are isolated
by evidence provenance without product fixture IDs. Database conflict handling
protects shared Place/Source/Evidence inserts across concurrent Trips. Existing
recommendation content, decisions, historical batches, scheduled snapshots and
booking/evidence links remain unchanged during synchronization.

### Atomic addition and data safety

`addRecommendationToDay` locks the owned Trip, validates Day/Segment/Recommendation,
then accepts and appends in one transaction. Shared append validation creates a
Flexible Activity with unknown exact start and snapshots known location/source/
duration. It creates no Reservation. Append failure rolls acceptance back;
concurrent additions and retries return one item and its actual Day. Standalone
Accept stays unscheduled, removal retains acceptance, and Deny retains existing
items and bookings.

All eleven migrations and dependencies remain unchanged. No forward migration is
needed because Pass 2 has no schema change. Prisma validation/status and read-only
datasource/schema drift checks pass. Approved reset replayed all eleven migrations
only in `ontothenext_verify_20260923_composer2` on localhost:5433 as `ontothenext`,
after checking actual Prisma subprocess identity, matching test/browser URLs and
Compose/volume ownership. Fresh exact-target CEO approval preceded reset and all
destructive acceptance setup. Repeated seed full-data SHA-256 was identical:
`33e4b78da76770dd505edc81887bb7b9f4c675dc7c9d65b3c0ca486c54353e4c`.

Persistent `ontothenext_builder_review`, all pre-existing databases and review
configuration remain excluded. Fingerprints/configuration hashes are retained in
ignored `.cache/composer2`. Options resources are outside every command. Web3100,
PG5433→5432, itinerary Compose/volume and SSD configuration are preserved.

### Acceptance evidence and limitations

Final verification/screenshot results follow below after acceptance. First full
unit/integration run: 443/444 passed; concurrent shared Place insertion failed.
Using PostgreSQL conflict handling for shared catalog inserts fixed the race;
all 15 focused composer integration tests then passed. TypeScript caught a new
browser assertion querying interests on Trip rather than TripPreferenceProfile;
the assertion was corrected. A migrations-directory drift command lacked a lock
file; the correct read-only configured datasource/schema comparison found no drift.

Coverage is limited to these three cities/eight entries each. Catalog observations
are not live provider availability; photos are absent. Unsaved detail drafts do not
survive reload. Prototype ownership/authentication, provider integrations, maps,
payments, sharing/export and public deployment remain outside this pass. Today
Slice 3 and roadmap work remain paused. Automated acceptance does not substitute
for CEO usability review.

### Final Pass 2 local verification

- 216 unit + 228 PostgreSQL integration = **444 passed**, zero skipped/failed.
  All 419 baseline tests remain, with ten catalog unit and fifteen composer
  integration cases added. The final full rerun passed after the insertion-race fix.
- **24/24 browser tests passed**, zero skipped/flaky, 3.3 minutes. All 22 baseline
  business flows remain through the new UI, plus fresh supported-city desktop and
  390×844 flows. Tests verify one persisted Add action, zero activity typing and
  zero primary-navigation switches for three activities; no trip-specific catalog
  seeding is used. Interest failure/retry preserves exact prior preference state.
- Supplementary additive browser checks covered Kyoto, Osaka, explicit Japan/Kyoto
  starting context, ambiguous Tokyo/Kyoto with no unrelated ideas, and manual fallback.
- Prisma generate/validate/status/read-only drift, approved isolated reset/reseed,
  repeated seed fingerprints, typecheck, lint and production build pass. Generated
  Next configuration changes are excluded. No dependency/schema changes.
- First browser run: 19 passed/5 failed. Three failures assumed immediate checkbox
  state despite confirmed autosave; two travel tests opened an item before navigation
  completed. Explicit persistence/navigation waits fixed them. A six-test rerun
  passed five and exposed an assertion requiring an optional preference record;
  comparing the exact prior record (including null) fixed that test. The final full
  rerun passed all 24. A small phone sticky-header gap found visually was corrected.
- Before/after desktop and 390×844 screenshots were visually reviewed for setup,
  empty Day, populated Day, detail panel and warning/error. Local gallery:
  `.cache/composer2/review.html`; original baseline captures in `before`, final
  viewport captures in `after/{desktop,phone}-{setup,empty,populated,detail,error}.png`.
  Before detail/warning captures show protected Booked editing; after captures show
  the shared editor and a real invalid-reference error with recoverable draft.
- All 13 excluded database fingerprints match, including protected review SHA-256
  `270d3f6f02c653c5136b4be5944b05c8fe5315765930bdeed27059f42cf59342`.
  `.env` and review launcher/connection configuration hashes match. The verification
  server stops with acceptance; no E2E or provisioning ran against persistent review.
- Existing pg concurrent-query deprecation and terminal color warnings remain under
  D-122's unchanged conditional dependency deferral.

The earlier explicit CEO approval for the disposable GitHub `ontothenext_test`
service on this refinement branch/dependent PR remains applicable. This is the
same branch and PR; the current handoff separately requests push and exact-head CI.
Local approval is restricted to composer2; CI cannot access local databases/volumes.
Exact-head remote results are reported in PR #6 and the engineering handoff.

### CI navigation follow-up

The first exact-head CI checks at `47ee1bc` passed all 444 unit/integration tests
and the build, but the Today browser flow exposed a navigation race not reproduced
in the full local run: push passed 22/24; PR passed 23/24. After following a
Reservation's exact-item link, the test could check for a dialog before navigation
opened it and then try Home behind the modal. The test now explicitly awaits the
correct named dialog before closing it; every existing context assertion remains.
No application behavior changed. The corrected desktop and phone flows each passed
twice locally (4/4), and typecheck/lint passed before the normal follow-up commit.
The subsequent complete exact-head CI results are recorded in PR #6.

## Recommendation quality and real photographs — 2026-09-23

This pass extends the existing composer, preserving its one-action Add and separate
standalone Accept behavior. Tokyo now has 24 evergreen experiences plus two dated
event occurrences (26 distinct suggestions when dates qualify). Kyoto and Osaka
retain their eight existing entries each. No schema, migration, dependency, paid
provider, Today feature, authentication or deployment change is included.

### Content and source coverage

Required anchors include Imperial Palace **East Gardens** (not access to the inner
palace), Pokémon Center SHIBUYA (PARCO 6F) and MEGA TOKYO (Sunshine City alpa 2F),
Shibuya Crossing, SHIBUYA SKY, Akihabara, Ginza, teamLab **Planets in Toyosu**, temple
and museum visits, and Hama-rikyu with an optional matcha purchase. Market, vintage,
kitchenware and neighborhood walks add variety. Walks are app-authored,
self-directed suggestions; optional stops are not separate scheduled activities.
The source matrix and checked-in catalog record exact URLs and observation dates.

Operator and public tourism sources establish identities and access distinctions.
Six entries also retain separately labeled local/community context: Hama-rikyu
(Time Out), Yanaka (WHEN IN TOKYO), Planets barefoot-access discussion, both Pokémon
branches' stock caveat, and SKY rooftop/weather discussion. Community accounts
supply attributed perspective, not operator rules. The Pokémon discussion was only
verified through a limited public search observation; no claim of a full thread
review is made. Conflicting Planets comfort reports remain conflicting. No articles
or forum archives are copied. Descriptions are original, and visit durations are
editorial planning estimates. Prices, inventory, opening times and live availability
remain unknown rather than inferred from photographs or discussions.

All 24 evergreen Tokyo suggestions have distinct local WebP photographs, totaling
3,183,522 bytes, each at most 960 pixels wide and under 400 KB. Per-file Commons
metadata, creator, source page, license/link, capture date, restrictions, conversion
and place-match review are recorded in `src/modules/discover/media-manifest.json`.
Attribution is visible on each card, with full title and rights details expandable.
Full framing is retained with contain sizing. The SHIBUYA storefront's de minimis
basis requires retaining its surrounding context; characters must not be isolated.
ShareAlike photograph licenses remain attached to their derivatives.

Planets has a correctly matched **exterior-only** image, visibly labeled; it does
not show or establish the immersive interior experience. Museum/building exterior
and courtyard photographs show their stated subject rather than exhibit access.
Historical street photographs do not imply current stores or conditions. Neither
2026 event has a cleared event-specific photo: both display an honest missing-photo
state. Kyoto/Osaka photo coverage is outside this Tokyo pilot. A failed asset keeps
the card, source details and Add control usable. Research candidates and unlicensed
originals remain ignored and are excluded from publication.

### Dates, history and ranking

Events are manually observed, not a live event feed: Tokyo Grand Tea Ceremony at
Hama-rikyu and Roppongi Art Night, both October 31–November 1, 2026. Hama-rikyu dates
are not confused with the earlier Koganei occurrence. Roppongi's overnight core time
is descriptive; no exact-time booking is invented. Organizer and dated public notice
links are retained. Observed September 23; October 7 is an **editorial 14-day recheck
limit**, not organizer-confirmed availability or a guarantee lasting until then.

The guard validates real calendar dates with round trips (including leap days),
published status, complete ordered intervals, observation/recheck dates, expiry,
and selected Day/Segment overlap. Its injectable clock converts the current instant
into explicit Asia/Tokyo context; a machine's local timezone is not used. Unknown,
cancelled, stale or invalid occurrences are excluded. Add, standalone scheduling,
and move confirmation recheck eligibility. Failed Add leaves decisions/items intact;
exact Add retries preserve an existing item. Saved snapshots and reservations remain
unchanged after cancellation or staleness, with a review warning instead of deletion
or movement. Event snapshot notes retain the occurrence/date/zone/observation.

Only new presentation batches apply category diversity within explicit-interest
priority. Previously presented batch membership/order, decisions and scheduled
snapshots remain untouched. Normal provisioning adds new candidates to existing
supported trips and appends evidence versions; it does not seed or replace trips.

Browser acceptance uses an advancing clock anchored on September 23 through a test-only preload,
with isolated database identity checks. Normal application launches use the actual
clock. Playwright refuses to reuse an existing server, protecting the persistent
review environment from accidental test-server reuse.

### Google Places / Photos proposal — not integrated

The local licensed pilot does not require a paid service. A later live-place option
would use Places text/nearby search or details to resolve identity and request photo
names, then the Photo Media endpoint for presentation. It would need separate API
and billing authorization, restricted server credentials, quotas and a measured
budget. A four-card batch could require up to four details and four photo requests
before additional search/pagination; actual billable SKUs depend on fields and
current pricing. No key, billing setup, API call or live-provider implementation is
included in this pass.

The [Photo documentation](https://developers.google.com/maps/documentation/places/web-service/place-photos)
requires author attribution when returned and warns that photo names can expire and
must not be cached. [Places policies](https://developers.google.com/maps/documentation/places/web-service/policies)
restrict prefetching/storage/caching (with stated exceptions such as place IDs),
require Google/third-party attribution, and set map/non-map display and public terms
and privacy requirements. A later implementation must recheck these policies rather
than copying Google photos into this permanent local manifest. The
[usage and billing guide](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing)
describes pay-as-you-go SKUs and field-mask billing. Exact pricing, jurisdictional
terms, rights, budget and display design require a separate approved integration.

Manual work remains: content research, event rechecks, source interpretation, photo
selection/place matching and license review. Automated work: idempotent provisioning,
batch selection, event eligibility, attribution rendering and transactional Add.
CEO usability acceptance remains pending.

### Verification notes for this pass

Git recovery succeeded with Git 2.55.0.windows.4. Root, origin and branch matched;
recovery head was `9341036e24feca95c73f46ca49b55534438d9447`. Existing partial catalog,
24 assets, UI, events and tests were preserved. Every Git command clears inherited
safe.directory entries and trusts only this exact checkout for that process. No
persistent Git trust, Windows ownership/permissions or Docker/storage changes were
made. Normal Git identity was unset; the authorized commit uses the same name/email
as the four preceding project commits, through command-only settings.

Only `ontothenext_verify_20260923_quality1`, localhost:5433, user `ontothenext`, was
reset/reseeded with the recorded task-specific consent after Prisma's warning.
Actual Prisma subprocess, both URL variables, browser inheritance, connected
current_database/current_user, Compose project `ontothenext` and named volume
`ontothenext_ontothenext-postgres` were verified. The unchanged guarded runner
completed with exit **0**, applying all eleven existing migrations. Generate,
validate, migration status and read-only datasource/schema comparison passed with
no drift. Repeat-seed fingerprints matched exactly:
`cfec4cecb09aecd6ac52bab7fc64d64703be8a720b3e6325700efdecbb1810ef`.

The complete local regression rerun passed **241 unit + 238 PostgreSQL integration
= 479 tests**, no failures or skips. All 444 baseline cases remain. The first run
passed 478/479; its obsolete eight-evidence assertion was updated to the exact new
24 official + six contextual observations, retaining every history comparison.
Typecheck initially caught an integration input property typo; corrected to the
existing `itineraryItemId` API. Final unit-only revalidation passed 241/241 after
photo metadata/import updates. Typecheck, lint and production builds passed; Next's
generated tracked configuration edits were restored from exact prebuild copies.

Browser startup first stopped before tests because the native loader required JSON
import attributes. That compatibility fix passed all 25 quality unit tests. A later
run was interrupted after 14 passes/four new-test failures: a duplicate credit-text
selector and a test-clock subclass whose inherited Date.parse/UTC were lost by
Next's own wrapper. The proxy clock preserves native descriptors and was verified
through the actual wrapper; production event logic was not weakened. The following
run exposed a synthetic evidence-status labeling regression in Discover. The
original FIXTURE-versus-observation distinction was restored, preserving the
baseline assertions. These are reported failures, not ignored/flaky retries.

Visual comparison against the preceding text-only desktop/phone captures showed
that the initial large photo frame added unnecessary scrolling. Final full-frame
photos use 180px desktop/160px phone; image failures retain the same frame height.
Exterior-only captions cover Planets, the two museum-building views and Skytree.
All required anchor cards, credits, loaded first batches, populated Days, missing
images and event detail/eligibility are captured using disposable fixtures only.
Persistent CEO review data is never used for automated capture.

The next browser run passed all four new quality flows, including all 24 loaded
photos and Day-dependent event eligibility. It also reproduced two existing
Discover assertions affected by the evidence-label regression and a reservation
cancellation retry blocked by identical preview tokens under the frozen test clock.
The run was interrupted after those diagnosed failures. The test clock now advances
from its anchored date using monotonic elapsed time, preserving distinct preview
expiry instants while keeping event observations reproducible. Its Date.parse/UTC
and advancing Date.now were checked through Next's actual wrapper. No production
preview-token logic, expiry checks or baseline assertions were changed. Detail-card
captures hide only floating page headers so they do not obscure the actual photo;
normal viewport captures retain the full page chrome.
The corrected-clock focused run passed 6/6. The next complete run passed 27/28; the final trip-navigation flow still expected two Tokyo batches. Its three exact heading assertions now expect six batches for the 24 evergreen entries. Navigation, reload, repeated-city and date-boundary assertions are unchanged.

### Final local result

- **479/479 unit/integration and 28/28 complete browser tests passed**, zero skips,
  failures or flaky retries in the final runs. The complete browser run took 4.6
  minutes; its predecessor's one obsolete batch-count assertion is fixed.
- All **14 excluded itinerary database fingerprints match** before/after the
  destructive verification. Protected review SHA-256:
  `ce821f911889938d80fe7768ab1cbd02b503c0ee49b38339065e3e041ce27b13`.
  An initial PowerShell join-expression comparison falsely flagged the name set;
  explicit sorted-name and per-database hash comparisons confirmed exact equality.
- Local verification server stopped; no port 3100 listener remains. No protected
  review reset, seed, migration, test setup or automated trip creation occurred.
  Existing review data and all Options resources were preserved.
- Final rendered gallery: `.cache/quality/review.html`; 24 PNGs in
  `.cache/quality/after`, compared against copied prior text-only captures in
  `before`. Required anchors, phone/desktop populated plans, failed-image Add,
  source/license detail and dated event gaps were inspected. Detail crops hide
  floating page headers only; normal viewport screenshots retain them. All 28
  gallery file references were verified. Gallery/screenshots remain local.
- Full staged diff reviewed: optimized licensed photographs only; no credentials,
  absolute personal paths, databases, caches or research originals. No migration,
  dependencies, workflow, reset guard, global Git, Docker or storage changes.
- The normal scoped commit/push and exact-head CI results are recorded in draft
  PR #6 and the engineering handoff. PR #6 keeps its Sprint 5 base; parent PR #5
  remains unchanged, draft and unmerged. Neither PR is approved for merge, and
  automated verification does not constitute CEO usability acceptance.
