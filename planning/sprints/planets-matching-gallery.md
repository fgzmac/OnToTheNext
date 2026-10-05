# Planets matching, review availability and bounded photos

Implemented 2026-09-25 on feat/cross-destination-discovery, starting at bec4e823de703894173d0f2ab1126f958f7581ec. Scoped correction for draft PR #7, based on refine/itinerary-builder-basics. No styling, dependency, schema, migration, workflow or launcher changes.

## Evidence and matching

The screenshot establishes a Planets name and Toyosu address, but not Google's websiteUri, country components or businessStatus. No existing safe live rejection code was available. **The precise live rejection remains unknown.** Synthetic reproduction establishes a narrower defect: the prior website rule rejected verified alternative official Planets URLs. Passing fixtures are not proof of a successful live match.

Official sources independently checked on 2026-09-25:

| Exact supported URL | Source role and evidence |
| --- | --- |
| https://www.teamlab.art/e/planets/ | Official Planets exhibition/works page, Toyosu |
| https://planets.teamlab.art/tokyo/ | Legacy official URL; observed redirect to the exhibition page |
| https://teamlabplanets.dmm.com/en | Official English ticket site; identifies Toyosu and links its Works introduction to the exhibition page |
| https://teamlabplanets.dmm.com/ | Official ticket-site root, observed redirect to /en; not an invented language variant |

No other language paths or sibling subdomains are allowed. Ticket-site identity does not establish availability. Provider URLs are never fetched to resolve redirects. Borderless/other exhibition paths contradict Planets; generic or unrelated unverified sites provide insufficient evidence. Name, operational status, Japan country, Tokyo city and Toyosu area checks still apply. Pokémon branch regressions remain. Multiple eligible candidates require deliberate selection; no known Google ID is silently bound.

Explicit owner-only production diagnostics use ONTOTHENEXT_OWNER_DIAGNOSTICS=bounded, the enabled local pilot, its exact permanent approval identity and its local database identity. Output is server-console only: curated appPlaceId, stable summary/candidate reason codes and passed/failed/missing check states. No response body, Google ID, review text, photo reference, credentials or private trip details is logged or returned as traveler diagnostics. This opt-in is off by default and does not depend on NODE_ENV=development.

## Reviews and gallery behavior

Reviews distinguish unlinked, loading, returned, successful empty, failure, exhausted allowance and expired session. Confirmation still precedes linked context; Reviews is deliberate, uses the current reference revision and existing reviews mask/budget gate. One generic match explanation replaces duplicate rejection messages. Independent overview, exhibit link, attribution, translation information, relevance order and Add remain available.

The existing DetailSession loads photo position 0 after eligible context. Positions 1 and 2 require explicit buttons, including keyboard activation. No prefetch, automatic retry, compensating fourth attempt or request on revisiting a retained image. Each new attempt fetches fresh photo metadata, validates the linked owned identity/revision and uses only that metadata's selected position. Server admission validates integer positions 0..2 and synchronously permits each once, at most three, even under concurrent requests.

Opaque in-memory server grants hold only binding hashes, attempted positions and expiry, never provider content/photo names. Unknown or expired grants fail closed; a process restart invalidates them. The existing fixed five-minute client display window clears all content on close/expiry/identity change and ignores late replies. Server grants also expire after a fixed five minutes. Browsing cannot extend either clock. Explicit Refresh begins a fresh session under the same remaining cumulative allowance. Failed or missing photos retain a prior good image and the independent overview.

Photo labels are neutral. Positions may repeat images if provider order changes. A position is an attempt, not a uniqueness guarantee. Photo bytes/credits are temporary open-session display only; no durable media storage or resource-name cache was added.

### Conservative operation reservations

| Fresh first-confirmation path | Searches | Details | Photo reservations | USD reserved |
| --- | ---: | ---: | ---: | ---: |
| Overview + initial photo | 1 | 2 | 1 | 0.082 |
| Overview + three photo positions | 1 | 4 | 3 | 0.136 |
| Three positions + deliberate Reviews | 1 | 5 | 3 | 0.161 |

Reopening an already linked place omits the search: one-photo path 0/2/1 and USD0.047; three-photo path 0/4/3 and USD0.101. Each photo attempt reserves its metadata Details and media operation before dispatch. Missing/uncertain media retains the reservation. Actual media downloads may be fewer. Existing USD10 cumulative ceiling and 40 searches / 100 Details / 20 photos caps are unchanged; no renewal of the existing eight-case pilot.

## Media limits

The independent Planets photo remains the credited exterior-only photograph documented in public/media/tokyo/README.md and the existing manifest. No independently licensed representative interior image was established in this task. No Borderless image, synthetic artwork or exterior relabeling fills that gap. The independent **See the exhibits** link opens https://www.teamlab.art/e/planets/ without embedding or copying its copyrighted images. Google images are not classified as interiors/artworks. Live experience-photo quality remains for the owner's deliberate retest.

## Verification and preservation

Local checks are unit/mocked only, with database URLs and provider key absent. Final results are recorded in the PR/handoff. Added coverage includes alternate identities and negative URLs, safe production diagnostics, review states, exact references/masks, each photo position, duplicate/missing/failure handling, fixed expiry and late-reply races, and concurrent admission/accounting. Existing 660 unit/integration tests and 35 browser flows are retained; new desktop and 390x844 browser flows use clearly synthetic provider responses and a labelled one-pixel fixture, not live-quality evidence.

PostgreSQL migrations/seed/guarded reset, integration tests, production build and Playwright run only in the existing unchanged workflow's fresh GitHub-hosted ontothenext_test services, under this task's explicit authorization. No local database fixtures/reset/seed/migration or live Places/photo/avatar requests. No active pilot rebuild/restart, local review-pin change, Cloud change or limit change.

Read-only local evidence in ignored .cache/planets1 captures the pilot identity/accounting and fingerprints all public tables plus existing launcher/configuration/build files before and after. Owner restart/retest instructions are in the ignored .cache/planets1/OWNER-RESTART.md; they use the existing guarded scripts and masked-key entry, and are instructions only.
