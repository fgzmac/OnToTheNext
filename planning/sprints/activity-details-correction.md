# Activity details and verified venue matching — 2026-09-24

Scope: focused correction on feat/cross-destination-discovery, starting from remotely reviewed 016d21a76d475ad3c7c2a0881859e4b99dbc6dd4. Preserve the owner-operated eight-case pilot, permanent approval identity and cumulative allowance. No Cloud, dependency, schema, migration, provider, CI workflow or reset-guard change.

## Confirmed defects and unresolved live diagnosis

The former exact-host comparison rejects an otherwise eligible SHIBUYA candidate using the legacy pokemon.co.jp URL against the catalog's current shop.pokemon.co.jp URL. Its pathname prefix comparison can also incorrectly equate path siblings. Independent rechecks on 2026-09-24 confirmed:
- https://www.pokemon.co.jp/shop/pokecen/shibuya/ redirects to https://shop.pokemon.co.jp/ja/shop/pokemoncenter-shibuya/
- https://www.pokemon.co.jp/shop/en/pokecen/shibuya/ redirects to https://shop.pokemon.co.jp/en/shop/pokemoncenter-shibuya/
- https://shop.pokemon.co.jp/en/shop/pokemoncenter-megatokyo/ identifies the separate Ikebukuro branch.
- https://www.pokemon.co.jp/shop/pokecen/megatokyo/ redirects to https://shop.pokemon.co.jp/ja/shop/pokemoncenter-megatokyo/

The first two current pages identify SHIBUYA at Shibuya PARCO 6F. MEGA TOKYO is independently described at Sunshine City alpa 2F. These are identity observations, not current stock/ticket guarantees. teamLab's Planets operator page https://www.teamlab.art/e/planets/ still identifies Planets in Toyosu; a fresh Borderless page retrieval was unavailable, so no additional equivalence was inferred.

The small reviewed identity map recognizes exact listed hosts/paths and language variants, with an optional trailing slash. It does not follow provider URLs, infer aliases from brand/subdomain strings, use pathname prefix matching or archive Google responses. Missing/generic/unknown Pokémon website evidence is held separately from a verified competing branch. Name, Japan country/city, area, operational/moved status and deliberate selection still apply. MEGA TOKYO/SHIBUYA, Planets/Borderless, ambiguous, wrong-city, closed and relocated safeguards remain.

Google's actual websiteUri from the owner's screenshot is unknown. The rule defect is reproduced with synthetic fixtures; the exact live failure and real photo/usefulness remain unverified.

The previous UI independently caused the other reported problems: API-purpose buttons inside nested disclosures, unconditional activation copy, rendering a provider box for any message, and clearing the entire result before each request. Those paths are replaced below.

## Interaction and transient state

Cards retain photo, name, area/duration, independent summary and one-action Add, with View details as the secondary action. Recommendation and saved-item views use the same activity-details content in the existing single panel. Independent overview is immediate. Overview/Reviews tabs precede compact photo content; Sources is secondary. Saved items retain scheduled context/editing/booking/history without a duplicate Add.

Only explicit View details / saved-item opening initiates a bounded flow:
1. A read-only server availability/ownership/reference check performs no provider operation.
2. Unlinked: one matching request; eligible candidate(s) require Use this location. There is no automatic link or generic conflict override.
3. Linked or newly confirmed: one overview Details request revalidates identity, then one photo-purpose request obtains fresh metadata and at most one media item.
4. Reviews fetch once on deliberate tab opening. Completed/failed in-session sections do not redispatch on tab switches. Refresh details is explicit, and starts a fresh bounded overview/photo check.

No request effects on component mount, render, hover, route prefetch, Day change or Add. Cross-item hash navigation closes the old session before showing another item; its former content cannot be attached to the new recommendation. Hash-based navigation can show independent saved details without dispatch; its View place details action explicitly begins the same flow. Section state is owned by the explicit panel session, not remount effects.

Identity, overview, reviews and photo state are separate. Review/photo failure retains successful overview; changed place ID/reference revision invalidates the whole provider view. Server validation compares the supplied revision before reservation and rechecks after dispatch. Confirmation returns the exact reference written inside its existing lock. Existing reserveGoogle, global accounting lock, receipts, prices, uncertainty retention, transport/retry behavior and kill-switch checks are unchanged.

All provider content is memory-only. Five minutes from the first retained payload is a fixed session expiry, not extended by tabs/reviews. Close/unmount drops content; generation guards discard late replies and prevent continuation after close. Reopening is new explicit intent and pays for fresh data; expired content is not restored. No browser/disk/database Google-content cache.

Normal copy distinguishes disabled/loading/confirmation/ambiguity/ready/unavailable/budget-exhausted/expired, without an empty provider box. Reviews is unavailable until overview establishes a linked identity. Closure/moved-location, independent event, booking and travel warnings remain. Google Maps, third-party, photo/review author credits, source links, translation and relevance-order labels remain with visible content. Developer diagnostics require development mode and GOOGLE_PLACES_DIAGNOSTICS=bounded, emit only allowlisted codes and never log provider payloads or credentials.

## Operations and cost accounting

Unchanged ceilings: total/provider USD10; 40 searches, 100 Details, 20 photos. Smaller stored/configured limits still win. Same aggregate-pilot account, existing database and permanent approval ID; no allowance reset. Read-only initial pilot accounting: 2 searches, 0 Details/photos, USD0.07 reserved; nominal remaining USD9.93, 38 searches, 100 Details and 20 photos, subject to any subsequent owner activity.

| Explicit flow | SearchText | Details | Photo media | Conservative reservation |
|---|---:|---:|---:|---:|
| First-time View details, then confirm, overview + photo | 1 | 2 | at most 1 | USD .082 |
| Already-linked opening or linked explicit refresh | 0 | 2 | at most 1 | USD .047 |
| First Reviews opening in that session | 0 | 1 | 0 | USD .025 |
| Repeated tab switch / render / Add | 0 | 0 | 0 | 0 |
| No eligible match | 1 | 0 | 0 | USD .035 |
| Overview fails after dispatch | 0 | 1 | 0 | USD .020 |
| Photo fails or no photo is supplied | 0 | 1 | 0–1 | USD .027 retained |

Open/reference checks and confirmation are local application operations, not billable Google calls. A successful photo media call also downloads at most one bounded image; visible contributor avatars may load separately. First-time full overview/photo/reviews is 5 API calls plus one photo download, reserved USD .107, unchanged from the former fully operated sequence. No automatic retries; requests already dispatched on close remain conservatively charged. An unlinked refresh repeats the one matching attempt and still requires confirmation.

Before: Sources → optional Google disclosure → Find → confirm → context → photo → reviews (7 clicks for the full flow; 6 for overview/photo). After: View details → Use this location → Reviews (3 clicks; 2 for overview/photo). Linked overview/photo requires one explicit opening. Fewer clicks do not reduce the underlying operation count.

## Verification and preservation

Local safe checks: 375 unit tests passed with no failures/skips; typecheck and scoped lint passed. Existing 326 unit baseline retained plus 49 targeted session, presentation and matching cases. No local database mutation tests, fixture setup, reset, seed, migration, repair or build replacement. Full PostgreSQL/browser verification is authorized only through unchanged Application CI in each fresh GitHub-hosted Ubuntu ontothenext_test service; exact-head results are recorded in draft PR #7 after publication. Existing 271 integration cases and 32 browser business flows remain, with 3 new integration cases and 1 browser flow.

Protected pilot and builder_review row fingerprints match before/after: 2/2 databases (24 pilot tables and 17 review tables), with the genuine pilot account still at 2 searches / USD0.07 reserved. Evidence is captured read-only in ignored local files. No discovery1 reuse. The genuine pilot's allowance/reference/trip state is not a fixture. Existing owner launch scripts, quota exception, key/policy settings, .env, dependencies, schema/migrations, CI/reset guards and existing build are preserved. No live Places/photo/avatar request, pilot restart or server replacement during implementation.

Four local desktop captures render the actual revised React presentation with clearly labeled synthetic data and a blocked browser network: overview, confirmation, review failure retaining overview/photo, and unavailable/message-only. They are isolated component captures, not a live Google or full interactive-application quality claim. CI browser tests capture actual synthetic application flows and retain baseline behavior assertions. Local rendered evidence is ignored and not committed.

## Owner-operated restart and retest after exact-head CI passes

Do not run an in-place build while the old pilot server is serving. Stop only the launcher-owned process using the unchanged Stop-GooglePilot.ps1 (or stop its owner terminal); ensure port3100 is free, preserving unrelated processes. Verify the branch and published correction SHA against PR #7. The local launcher's reviewedHead still pins the old reviewed application and will intentionally refuse the new head until the owner updates ONLY that reviewedHead field in ignored configuration-status.json to the verified correction SHA. Preserve all other fields, especially quotaException, approvalId, database and caps.

Using the already verified PowerShell7 executable, run existing Configure-GooglePilot.ps1 -PrepareBuild after that explicit stop/head review, then existing Start-GooglePilot.ps1 -EnableGoogle -AcceptDefaultCloudQuotas. Enter the existing key only at its masked owner-local prompt; leave that terminal open. These are owner actions, not performed by engineering. No database setup is part of restart. Build changes do not justify recreating/migrating/reseeding the pilot.

Retest within the same remaining eight-case evaluation: open SHIBUYA details; review an eligible location before confirming; inspect overview/photo then Reviews; Add; reopen the saved item. An unchanged linked reference should not ask for confirmation again. Unknown/conflicting matches must remain held. Do not treat synthetic tests as proof of the previously unseen live websiteUri. Keep existing accounting and stop at evaluation end; the quota exception does not extend it.


Initial CI at cceb9ce: 649/649 unit/integration tests, typecheck, lint, build and guarded disposable setup passed. Browser result was 31/33: the two baseline composer flows used a panel-wide status selector, now ambiguous because place details also has a status region. The selector is scoped to the unchanged item-details editor; the same save-message, focus, Day, notes and persistence assertions remain. A follow-up strengthens cross-item hash-navigation cleanup in the existing new Google browser flow. Full exact-head reruns and actual final results are recorded in draft PR #7. No local database/browser fixtures were used to diagnose these failures.
