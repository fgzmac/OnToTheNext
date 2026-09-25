# Dusk travel discovery — 2026-09-24

Presentation-only correction on feat/cross-destination-discovery, starting at ef4834e1b9dbb1dc6a9b52281337f8501e56af36. The two described reference images were unavailable in the supplied attachment directory; implementation follows the written direction, without claiming image inspection.

## Actual application changes

The existing itinerary composer remains recommendations beside the selected Day. Route-scoped dusk tokens provide a navy/violet background, mostly opaque layered cards, teal actions, soft borders and 18px corners. Home and standalone reservations retain their palette. No font/download/framework dependency was added. Opaque backgrounds work without color-mix support; reduced motion disables transitions/animation.

Cards keep full-framing photos, title, location, two supported chips (existing category and estimated duration), independent factual summary, material event cautions and direct one-action Add. View details sits beside Add; Not interested is quiet. Open cards and saved timeline rows expose an expanded state and a visual selection cue. The older destination Discover page retains its existing Accept decision semantics; visual work does not turn acceptance into scheduling.

The same accessible native dialog serves recommendations and saved activities. Its compact sticky header, one hero image, attached credits, essential summary, Overview/Logistics/Reviews row, secondary Sources and sticky action area replace the light nested visual treatment. Saved activity editing, booking, travel and removal controls remain. Saved activities show On Day status with no duplicate Add.

Logistics renders existing independent location/duration and already-loaded provider address/current/regular hours. Access/cost cautions remain in Overview; source details remain accessible. No map, routing/time/fit claim or future-hours guarantee was added. A header/selected-Day workspace remains visible behind a strongly dimmed modal backdrop but is not interactive.

The same DetailSession object and request lifecycle are unchanged. Only presentation tab state adds Logistics; click/keyboard Logistics navigation dispatches nothing. First-time confirmation, linked identity revalidation, overview/photo sequencing, explicit Reviews, fixed five-minute expiry, independent section failures and late-response cleanup remain. A saved item opened only through hash navigation does not claim activation is disabled before availability has been checked. Expiry shows a short refresh message; independent content and Add remain usable and no stale provider rating/hours survive.

## Photo and attribution rules

Reviewed existing experience photo contracts, manifest and public/media/tokyo/README.md. SHIBUYA explicitly cannot be cropped to isolate copyrighted characters; Planets is exterior-only. All card and hero images conservatively use contain/full framing on a dark matte, including Google transient media. No cropping, blur, recolor, watermark removal, new image sourcing or paid requests. Existing captions, creators, licenses, source links, exterior labels and Sources restrictions remain. Missing/failed images have deliberate dark fallback surfaces. The hero selects one loaded provider image or the permitted independent fallback, never both.

## Verification and evidence

Baseline 649 unit/integration cases and 33 browser flows retained. Added 11 unit presentation/contrast contracts and 2 complete CI browser flows at 1440×900 and 320×844 with 125% text. New browser checks retain actual direct Add, first-time confirmation, saved identity/status, no duplicate Add, Logistics/repeated keyboard tabs without dispatch, fixed expiry without extra dispatch, independent content, Sources, Escape/focus return, visible Close and no overflow. Existing desktop/390×844 photo/attribution/failure and business flows remain. The only baseline copy selector change follows the intentional shorter missing-photo label.

Local safe unit result: 386/386, no failures/skips. Initial typecheck caught a generic typing error in the new test-render helper; the helper was corrected rather than weakening assertions. No local integration/browser database fixture ran. Full PostgreSQL, production build and Playwright results are verified only in the unchanged Application CI using the freshly authorized GitHub-hosted ontothenext_test service; exact head/run results are recorded in draft PR7.

Before/after evidence uses actual ItineraryComposer, ComposerIdeas, ActivityDetails, GoogleContext, DetailPanel and RecommendationPhoto components in a separate ignored browser bundle. Server actions and Next navigation/image adapter are mocked, network is intercepted and existing licensed local image bytes are fulfilled locally. Real DetailSession and interactive component handlers execute. No static parallel product mockup, .next rebuild, local app server or persistent fixture was used. These captures are component integration evidence, not full Next server routing/optimizer or live Google quality evidence; full application behavior is checked in CI.

28 BEFORE captures cover discovery/selected Day, confirmation, overview, prior absence of Logistics, review failure, expiry and saved item at 1280×900, 1440×900, 390×844 and 320×844/125% text. AFTER captures add Logistics, failed image and long-title unavailable states. Fixture trip/rating/hour/provider-credit data is synthetic; photos are existing licensed assets and do not verify real provider quality. Files and a comparison gallery remain ignored under .cache/dusk-ui. Images were inspected, not just counted. No forced clicks are used.

Contrast verification checks actual rendered text/background colors plus token pairs on all opaque surfaces and the 96% translucent brand layer composited over both gradient endpoints. A low-contrast legacy interests label found visually was overridden within the dusk scope. Add/selected tabs meet normal text contrast. Full framing is asserted. Header/footer geometry, narrow overflow and focus are exercised through real browser interactions; remaining visual limitations are recorded in the final PR report.

## Preservation and operations

Read-only current pilot accounting at task start: 3 searches, 8 Details, 3 photos, USD0.296 reserved (not the earlier USD0.07). No allowance was replenished. Same permanent approval ID, USD10 aggregate/provider caps and 40/100/20 maxima; actual remaining allowance always wins. Protected source modules, schema/migrations/dependencies, workflow/reset guards, .env, repaired stop guard, launcher/pin/configuration, active build marker and all 24 pilot tables are fingerprinted. No pilot stop/replacement, key access, Cloud/policy change, discovery1 reuse, fixture mutation or Options/global storage change.

No business rules or data models changed. Provider clients, matching/evidence, DetailSession, accounting, ranking, events, scheduling and reservations are unchanged. No live provider/photo/avatar requests.

Operation/click counts remain: first-time overview/photo 2 clicks, 1 Search + 2 Details + at most 1 photo-media API call (USD0.082 reserved); first Reviews adds 1 Details (USD0.025), total first-time full flow 3 clicks/5 API calls plus one bounded image download (USD0.107). Linked opening or explicit linked refresh: 1 opening, 2 Details + at most 1 photo-media API call (USD0.047). Logistics, repeated completed tabs, render/hover/Day changes and Add: zero provider calls. Failure handling and conservative reservation retention are unchanged; no automatic retry or expiry refresh.

## Owner review

After green exact-head CI and owner review, stop only the existing launcher-owned process with the repaired Stop-GooglePilot.ps1, verify free port3100 and the published head, update only ignored configuration-status.json reviewedHead, then use existing Configure-GooglePilot.ps1 -PrepareBuild and Start-GooglePilot.ps1 -EnableGoogle -AcceptDefaultCloudQuotas with the verified PowerShell7 executable. Key stays in the masked owner terminal. No database setup belongs in restart. These are owner actions; engineering did not execute them in this UI slice. Existing launcher/handoff files are preserved.

PR7 remains a dependent draft targeting refine/itinerary-builder-basics; PR5/6 unchanged and all three unmerged. No live evaluation, human visual acceptance, public launch or additional feature scope is claimed.


Final local visual pass: 36 AFTER captures, zero browser runtime errors, zero horizontal-overflow findings and zero measured text-contrast failures across the four viewports; lowest measured ratio 5.74:1. Composited gradient backgrounds and the translucent brand layer are included. Scoped overrides corrected the legacy interests label and selected-tab hover contrast. Typecheck and scoped lint pass; focused final presentation rerun 18/18. All 156 protected-file hashes and 24/24 pilot-table fingerprints match; configuration and active build are unchanged, including the reviewedHead pin. Exact final CI results remain in draft PR7.
