# Cross-Destination Discovery — Slice 1

Implementation branch: `feat/cross-destination-discovery`. Parent: `refine/itinerary-builder-basics`, reviewed SHA `148cc5748b81a8c358480b7be0fb32ac77e2899b`. PR #6 and PR #5 are unmerged dependencies, unchanged by this slice. Human discovery quality is not accepted.

## Runtime boundaries

An explicit “Find ideas for this destination” action in the existing composer creates a database-backed ResearchJob from the owned Trip/Segment dates, destination and explicit interests, plus a compact country/language clarification. No traveler identity, Trip name, private notes, budget note, booking reference or full database enters provider requests. Ambiguous destination identity is held; no famous-city default.

The separate local worker performs Brave web search → permitted structured reader → Responses structured extraction → independent schema/reference/identity/date checks → short publication transaction. Job progress is actual request/document/extraction/publication counts. Queue polling reads jobs only; it does not discover destinations on page load, Day switch or a schedule. Requests are bounded by activation limits, persisted reservations, an absolute deadline, and at most three explicit attempts per context/day. No automatic external retry: 429 Retry-After is recorded and the run stops. Interrupted runs require an explicit retry and retain monetary reservations.

Run after local activation/configuration and database migration approval:

```powershell
. ./scripts/dev-session.ps1
# Supply an approved, ignored local profile in this process; never overwrite .env.
node --env-file=.env.research.local --import tsx scripts/research-worker.ts --serve
```

Without `--serve`, at most one queued job runs. With it, the local process consumes only explicitly queued work and exits after one hour or shutdown. The web process must receive the same approved provider profile and database identity. No worker was launched with live credentials during implementation.

Research and publication never accept, schedule or book. Publication locks the owned Trip, then the job; rechecks Trip dates, Segment dates/destination and interests; appends existing Place/Source/EvidenceRecord/Recommendation concepts. Existing batch assignment/ranking and atomic Add remain authoritative. Thirteen migrations total: the original eleven are preserved, plus additive research and durable-budget-ledger migrations.

## Providers and source policy

The activation gate requires **all** of: explicit use approval, separate purpose-specific keys, current model selection, accepted retention, Brave storage/processing rights, positive request/token/currency limits, and a descriptive User-Agent. Existing unrelated credentials are never reused. There is no model default or paid CI call. Missing configuration is “Research is not connected,” distinct from completed research with no useful matches.

Concrete adapters:
- Brave: GET `https://api.search.brave.com/res/v1/web/search`, `X-Subscription-Token`. Only result URLs nominate candidates; snippets are discarded and never treated as verified facts.
- OpenAI: POST `https://api.openai.com/v1/responses`, configurable model, strict `text.format` JSON schema, `store:false`, no tools, no files or conversation state. Refusal, incomplete output, invalid shapes/usage and invented references are handled independently.
- Wikidata reader: HTTPS `Special:EntityData/Q….json` only. CC0 selected structured labels, descriptions and location claims; no general HTML parsing/crawling. Domain-specific registry entry has access evidence, role, storage/processing policy, attribution and serial one-second spacing.

Source registry:
| Source | Status | Basis / limitation |
| --- | --- | --- |
| Wikidata entity data | Permitted reader, globally inactive until provider activation | CC0 structured data; entity/revision and locators retained. Community reference, not official availability. Thirty-day editorial recheck. |
| Wikimedia Commons | Awaiting per-file rights and exact subject review | No image-search/og:image permission inference; no automatic media calls. Runtime metadata can feed existing cards only with creator/license/source/subject match. |
| Official operators / calendars / local editorial publishers | Awaiting individual access review | No blanket fetch of search hits. No official event coverage claimed. |
| Reddit | Blocked | No collection, mirrors, proxies, scraping or reclassified community snippets. |

These are source domains, not attraction-name seeds. Query families use destination/country/dates/interests, practical cautions, local/editorial and organizer listings. Portuguese, Korean and Spanish query families are supported alongside English; other selected languages use provider language selection. Permission limitations can produce sparse results. There is no replacement city catalog.

Official documentation checked 2026-09-23:
- [Brave endpoint documentation](https://api-dashboard.search.brave.com/documentation/services/web-search) and [pricing / storage-rights distinction](https://brave.com/search/api/). Search is $5/1,000 requests. Storage rights require an appropriate plan; publisher rights remain separate.
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [pricing](https://developers.openai.com/api/docs/pricing), [data controls](https://developers.openai.com/api/docs/guides/your-data). Standard GPT-6 Luna is listed at $0.10/M input and $0.50/M output tokens; model access and suitability still need approval. `store:false` is not a claim of Zero Data Retention: standard abuse-monitoring retention is generally 30 days; approved ZDR is a separate account control.
- [Wikidata CC0](https://www.wikidata.org/wiki/Wikidata:Licensing), [Wikimedia User-Agent policy](https://foundation.wikimedia.org/wiki/Policy:User-Agent_policy), [Commons reuse](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia).

Application storage is separate from provider retention. Raw responses stay in bounded process memory. Durable candidate/evidence payloads contain only permitted selected CC0 claims, provenance and diagnostics. Request logs have URLs, times and status, never Authorization headers or response bodies. Extraction data is not sent to unrelated services. Unsupported publisher data is neither fetched nor persisted.

## Consolidated activation request — not activated

Approve a narrowly scoped Brave Search plus OpenAI Responses pilot and individually provision keys locally (never paste secrets into chat). Confirm Brave plan rights for result URL processing/storage, OpenAI processing region and standard-retention versus approved ZDR, selected model and current rates, plus Wikimedia source use/contact User-Agent.

Required process configuration:
`RESEARCH_ENABLED=approved`, `RESEARCH_APPROVAL` (task-specific approval identifier), `RESEARCH_BRAVE_KEY`, `RESEARCH_OPENAI_KEY`, `RESEARCH_MODEL`, `RESEARCH_USER_AGENT`, `RESEARCH_RETENTION=standard-30-days|zdr`, `RESEARCH_SEARCH_STORAGE=approved`.
Limits: `RESEARCH_MAX_SEARCH`, `RESEARCH_MAX_DOCUMENTS`, `RESEARCH_MAX_EXTRACTIONS`, `RESEARCH_MAX_SECONDS`, `RESEARCH_MAX_INPUT_TOKENS`, `RESEARCH_MAX_OUTPUT_TOKENS`, `RESEARCH_MAX_USD`, `RESEARCH_PILOT_USD`, `RESEARCH_SEARCH_USD`, `RESEARCH_INPUT_USD_PER_MILLION`, `RESEARCH_OUTPUT_USD_PER_MILLION`.

Proposed, **unapproved** pilot: GPT-6 Luna subject to account access and extraction suitability, 12 search calls, 30 documents, 12 extractions, 300 seconds, 200,000 input and 24,000 output token ceilings per job. Rates above imply at most about $0.092 in provider charges at those token/request ceilings, excluding account taxes/plan costs. Propose $0.25 reserved per job and $1 total pilot ceiling; no reliance on free credits. The independent ResearchBudget ledger survives Trip/job deletion. App reservations remain spent after crashes/uncertain responses; no hidden automatic retry/refund. Provider-side spending controls should also be configured. These figures are proposals, not activation or spending permission.

## Evidence and quality

Exact Wikidata entity identity and P17 country plus a bounded P131 administrative chain establish location; name similarity alone never merges branches. Candidate document IDs must exist in the retrieved set. Material descriptions and names must match the permitted document, and each claim locator must exist. This conservative first slice can return short structured descriptions; it does not invent richer activity details from model memory. Tags/category are editorial classification. Conflicts and unsupported identities remain held with engineering reasons. Duplicate identity receipts make publication idempotent; repeated content is not an independent endorsement.

Events are generalized persisted occurrences, not Tokyo catalog lookups. Selected-Day Add and movement use explicit occurrence time zone, true calendar dates, observation/recheck dates and state, including postponed/unknown. The initial permitted reader cannot establish official event occurrence/access, so event-shaped community candidates are held. No inference from last year's listings. Changed evidence warns on existing scheduled items without deleting bookings or itinerary history.

Runtime Place IDs use the existing compact photo card and failed/missing-image state. Exact subject, creator, source, reuse basis and separate retrieval/capture dates are required. Extractors cannot grant licenses or review subject matching. No live runtime photos were retrieved; missing imagery is an explicit quality gap. No Tokyo photo is copied to another city. Visual discovery quality is **not verified**.

## Evaluation protocol

Development destination: **Lisbon, Portugal**, using synthetic HTTP only. The imaginary River Gallery fixture is explicitly synthetic and is not an attraction seed in application code. **Seoul, South Korea and Mexico City, Mexico remain holdouts**, with no live runs or destination-specific tuning. If a holdout later drives a fix, disclose contamination and select a replacement holdout.

After separate activation and pilot-database authorization, create an ordinary trip with city, country, dates, optional interests/language. Run the compiled application and local worker (or `npm run research:evaluate -- <tripId> <segmentId> <country> <language>`). Save the real job request log, sources, candidates/rejections, counts, latency, reserved currency and actual token usage. Do not manually repair outputs. Independent reviewers prepare reference coverage without supplying attraction names to the job.

Score separately: factual identity/correctness, useful variety, major omissions, source independence, accurate photo coverage, date eligibility, and human usefulness. Sparse permissible results must remain sparse. AI evaluation alone cannot establish 7/10 usefulness or human acceptance.

## Data protection and verification

Exact local disposable target: `ontothenext_verify_20260923_discovery1`, localhost:5433, user `ontothenext`; existing Compose project `ontothenext`, volume `ontothenext_ontothenext-postgres`. Explicit task consent received for setup/tests and reset/reseed. Effective Prisma subprocess identity and matching test/browser environments verified. Guarded reset/reseed exited 0; no guard modifications. All eleven prior migrations preserved.

Populated forward migration preserved every existing application row. Repeat-seed fingerprints matched. All fifteen excluded itinerary databases were fingerprinted read-only before and after all verification; every data/schema/index SHA-256 matched, including normal development and persistent builder review. Persistent review data, normal development data, Options resources, ports and global Docker/storage settings excluded. No public service/tunnel. No paid external calls in default tests or CI.

No new npm dependency or HTML parser. Native Node DNS/HTTP/JSON boundaries only. D-122 advisories remain deferred, not fixed; no forced upgrades/downgrades. Network input is now an added exposure: socket-time IPv4 allow checks, no unsafe URL credentials/ports, per-hop source checks, two redirects, 512KB uncompressed cap, compression rejected, timeout/deadline, and no page execution. Conservative IPv6 rejection is a documented coverage limitation.

Verification history:
1. Old-schema seed initially failed using the new generated client; regenerated the parent client, populated successfully, then restored the new client and applied the additive migration.
2. Typecheck caught two fixture typing issues, corrected.
3. First focused run: 48/50. Fixed missing Trip-date fingerprint (real stale-context bug) and a hostname assertion that incorrectly matched the Brave query's Reddit exclusion term.
4. Focused rerun: 50/50 passed. First complete run: 527/529; the new diversity fallback unintentionally changed two legacy fixture rankings. Restricted it to runtime identities without weakening either assertion.
5. Subsequent complete runs passed 531/531. Review then tightened Retry-After across explicit retries, global serial worker claims, nomination hold receipts and official event claim references.
6. A separate durable budget ledger prevents Trip deletion from refunding approval-scoped reservations. The additive ledger migration preserved all existing rows and includes backfill for any existing job reservations. Focused run: 54/54.
7. Final acceptance run: **535/535** (281 unit + 254 PostgreSQL integration), zero failed/skipped. All 479 baseline cases retained. Typecheck, lint and production build passed. Unsupported model caveats and stale-client Add after source withdrawal have explicit regression coverage.
8. Final-schema guarded reset/reseed also exited 0 with all thirteen migrations. Repeat-seed SHA-256 matched: 586662d1d348aa5d3c5d7633eac159e2f18848908437477dfd719a3b395fe438.
9. Complete Playwright suite: **30/30 passed**, zero failures/skips, retaining all 28 browser baseline cases. A subsequent strengthened media contract run passed **2/2** on desktop 1280×900 and phone 390×844. It intercepts the image HTTP request with an original explicitly synthetic graphic, validates the loaded image/credit, then forces an image failure and saves through the same Add control. No real media/provider endpoint was called.
10. Final typecheck and lint exited 0 after the test-only addition. Lint reported one warning in ignored Playwright transform-cache JavaScript; no application-source lint errors. Existing pg concurrent-query deprecation and terminal color warnings appeared during browser runs. No dependency or safety check was disabled.
11. Rendered missing-photo, source-detail, mocked-media, failed-media and saved-plan captures inspected. Add remains reachable and no horizontal overflow was observed. Screenshots are synthetic contract evidence, not live travel/photographic quality. Existing mobile sticky-header overlap while scrolled remains visible in the captures; no usability acceptance is claimed.
12. Local screenshot gallery: `.cache/discovery/review.html`; eight PNGs in `.cache/discovery/after/`: `desktop-research.png`, `phone-research.png`, `desktop-mock-media.png`, `phone-mock-media.png`, `desktop-failed-media.png`, `phone-failed-media.png`, `desktop-plan.png`, `phone-plan.png`. These ignored local artifacts are not committed or uploaded to GitHub.
13. Final read-only comparison after the media tests: **15/15 excluded databases unchanged**. The verification server stopped; no port-3100 listener remained. No persistent-review migration, seed, reset, smoke test or trip creation occurred.

## Publication status

Local implementation checks passed. A dependent draft PR is prepared to target `refine/itinerary-builder-basics`. Push and exact-head CI are pending explicit consent for the existing workflow's fresh disposable GitHub-runner database `ontothenext_test`; this task's local consent does not extend to it. The workflow's only edits add the feature branch and dependent-PR trigger; its isolated database and reset guard are unchanged. PR #5 and #6 heads, bases, titles, bodies, draft status and unmerged status were rechecked and match their pre-task state. No provider activation, live quality or human acceptance is claimed.

## Shared Experience Metadata and Accurate Provenance — Slice 1

Starting revision: `c5ae94bda9fad6f58774908b2c325581ed1a8b04`, preserved as an ancestor on `feat/cross-destination-discovery`. This section concerns metadata resolution and provenance only; it does not accept the complete discovery pipeline or activate providers.

### Shared contract and precedence

`src/modules/experiences/types.ts` explicitly owns experience kind, event occurrence, source, local/remote photo, runtime input and resolved metadata contracts. Pilot exports retain compatibility; photo types are no longer inferred from a Tokyo JSON manifest. `resolveExperienceMetadata` is pure over an already-loaded runtime record and immutable curated data. It performs no database reads, network requests, ranking or writes.

- An existing runtime record owns kind, occurrence and source reference. Missing runtime records use the existing curated metadata. Unknown identities remain unknown.
- A cancelled, stale, invalid, withdrawn or unrecognized runtime occurrence never becomes eligible through a catalog-event fallback. Existing `eventMatches` date/time-zone/freshness policy is unchanged.
- Runtime media must pass shape and existing subject/license checks. Genuinely absent media may use the existing local image for the same application ID. Rejected media and withdrawn runtime sources retain the missing-photo state.
- Local photos retain recorded dimensions, credits, captured/review dates, changes, restrictions and exterior captions. Remote photos retain their actual creator/license/source/capture/retrieval/subject fields; resolution no longer fabricates image dimensions, transformation statements or human-review dates. Remote image dimensions in the renderer are layout defaults only.
- Discovery/composer cards, eligible-event counting, Add/scheduling, movement preview/confirmation and saved-event warnings use the same resolver. No per-card database-query loop was added. Titles, factual summaries, ranks, duration snapshots and stored planning content are unchanged by resolution.

### Intentional wording changes

Known curated neighborhood walks retain their app-authored self-directed-walk description. Researched or unknown neighborhoods say “Neighborhood recommendation,” without invented route/stops/authorship. Documented curated event checks retain “manually checked”; runtime observations identify source observation without claiming human review. Unknown event review methods remain unknown. Missing/unclassified card evidence says “Source review not recorded” rather than implying curated verification. Existing source links and media attributions remain visible.

### Preservation and scope

No schema or migration changes. All thirteen migrations, curated identities/content/assets, existing worker/adapters/validation/publication, activation gates and budget controls remain intact. Research remains separate from Accept/Add/booking. Metadata resolution does not modify decisions, historical batches, saved item IDs/order/progress/snapshots or reservations.

The research activation gate still governs research execution, not every browser image load. Recorded, permitted remote images may render independently; this slice adds no new network gate. Acceptance uses synthetic transports and intercepted image requests. Google, Viator, additional event readers, new extractors and broader coverage are deferred. Runtime event tests remain synthetic; the existing extractor has not gained dated-event ingestion.

### Verification and authorization

Fresh task-specific consent covers destructive integration/browser fixture setup and teardown only in the existing `ontothenext_verify_20260923_discovery1`, localhost:5433 as `ontothenext`, after matching effective Prisma/application/test/browser targets and actual database/user/Compose/volume checks. No reset, migration or standalone seed command is needed or authorized by this section. Existing regression tests may invoke their synthetic fixture seed helpers only in that same approved database. Protected review data and launch settings are excluded.

Commands use the existing SSD development-session profile. Focused unit run: 86 passed. The first focused integration attempt passed 41 existing tests but the new component-rendering suite could not load because Vite inherited Next's `jsx: preserve`; a test-only Oxc automatic-JSX setting fixed that harness limitation. The rerun passed all 26 focused metadata unit/integration cases. The initial typecheck caught a missing local resolver variable during the edit, fixed before acceptance. Assertions were retained.

Final command/results, revision association, preservation and publication gates are recorded below after acceptance.

Changed-file groups: source-neutral contracts/resolver/media-shape/provenance helpers and focused tests in `src/modules/experiences/`; discovery catalog/type adapters, media/event helpers and card/eligibility service; research runtime/type adapters only; itinerary scheduling/Add/movement consumers; ComposerIdeas, ExperienceDetails and RecommendationPhoto; `tests/metadata.integration.test.ts`, the existing research browser contract, and the test-only JSX transform in `vitest.config.ts`. No research worker, transport, extractor, validation, publication, activation configuration, schema, migration, licensed asset, dependency or workflow implementation was changed.

An initial complete run passed **561/561**. Final review then made runtime observation wording more conservative (no inferred processing/review method), clarified unavailable-source wording, and added teardown of this suite's synthetic runtime overlays on curated IDs. Final acceptance reran the full suite and build after those changes. No safety assertion was weakened.

Acceptance command record (each relevant Windows process first loads `. ./scripts/dev-session.ps1`):
- Effective Prisma/test/browser preflight and `npx prisma validate`: passed, exit 0; actual subprocess connected to the approved `discovery1` identity. Existing schema and thirteen applied migrations are unchanged.
- `npm run typecheck`, `npm run lint`, `npm test -- --reporter=default --reporter=json --outputFile=.cache/metadata/final-tests.json`, and `npm run build`: passed, exit 0. Final regression result: **304 unit + 257 PostgreSQL integration = 561/561**, zero failures/skips; all 535 historical cases retained. Build includes Prisma generation. Lint has one warning in ignored Playwright transform-cache JavaScript, with no source errors; existing pg concurrent-query and terminal-color warnings remain.
- First complete `npm run e2e`: **29 passed, 1 failed**, exit 1. Phone provenance assertion exposed test-fixture cleanup that deleted its synthetic Place but left detached evidence through the existing SetNull relation. Fixed only the fixture to remove its own synthetic source evidence before its Place; production publication and the assertion remain unchanged. A final typecheck passed; the complete 30-case browser rerun is recorded below.
- Application source was frozen for the passing full regression/build; only browser-fixture isolation changed afterward. The final browser run uses that production build plus the final typechecked browser fixture. Source/test/config/schema association is recorded in the ignored 183-file SHA-256 manifest `.cache/metadata/tested-source-files.json`, manifest SHA-256 `BB6A197A64E6DE10B06498445FCF03F1D0BBC14F36B054B0F767DF314EBDB1C7`. This is local pre-commit verification, not exact-head GitHub CI.

Publication gate: the existing `Application CI` workflow triggers on this branch's push and on its dependent PR; it migrates, seeds, resets/reseeds and runs destructive fixtures only in disposable GitHub-runner `ontothenext_test`. No task-specific consent for that CI operation is present. Per this handoff, retain the new local commit; do not push or open a PR. No workflow/guard is changed to bypass the gate. The intended dependent PR base remains `refine/itinerary-builder-basics`. Remote discovery branch is absent; parent is still `148cc5748b81a8c358480b7be0fb32ac77e2899b`. PR #5 and #6 head/base/title/body/draft/unmerged fields match reconciliation exactly.

Final acceptance: the complete browser rerun passed **30/30**, zero failures/skips, exit 0 (4.8 minutes). The final fixture remains typechecked; all original browser assertions and all 30 baseline flows are retained. Synthetic transport-call counters, unchanged job records and blocked unexpected external requests demonstrate that ordinary UI/render/navigation/Add did not trigger research transport. **Live provider requests: 0. Live remote-image requests: 0**; runtime image responses/failures were intercepted. These assertions do not imply that normal permitted remote images are globally disabled.

All **15/15 excluded database fingerprints match** after both browser runs, including `ontothenext` and `ontothenext_builder_review`. Fingerprints cover public rows, columns and indexes. One PowerShell comparison initially had an operator-precedence error; a corrected name-set comparison and every SHA-256 comparison passed. Only approved `ontothenext_verify_20260923_discovery1` fixture setup/teardown was destructive. No reset, migration, standalone seed, protected-review smoke test or trip creation, Options operation, Docker/storage change, environment overwrite or launch-profile change occurred. The isolated browser server stopped; port 3100 has no listener.

Logs: `.cache/metadata/final-tests.json`, `final-tests.log`, `typecheck-final.log`, `lint-final.log`, `build.log`, `typecheck-browser-rerun.log`, `browser.log` (first attempt), `browser-rerun.log` (final), and read-only preservation logs/result. Eight existing captures from the final run are retained in `.cache/metadata/after/`: desktop/phone `research`, `mock-media`, `failed-media`, and `plan` PNGs. Rendered source details, image failure, Add and saved-plan views were inspected. Phone captures retain the documented sticky-header overlap and partially obscure the image area; automated image-load/failure assertions passed, but this is not human usability or live photo-quality acceptance. All evidence artifacts remain ignored/local, never uploaded to GitHub.

Final limits: source metadata and labels are shared and explicit; no live provider quality, live event ingestion or complete discovery-pipeline acceptance is claimed. Synthetic event coverage and mocked runtime media remain synthetic. Google/Viator, broader event ingestion and human usability review are deferred. Publication/new dependent draft PR/exact-head CI remain pending the explicit disposable CI database authorization described above. PR #5 and #6 remain unchanged, draft and unmerged.

## Publication-only CI authorization and preflight

The owner authorized the existing workflow's migration, deterministic seed, guarded reset/reseed and destructive synthetic fixtures only in each fresh GitHub-hosted Ubuntu runner's disposable PostgreSQL service: `ontothenext_test`, user `ontothenext`, localhost:5433 to container port 5432, public schema, for this discovery branch and its dependent draft PR. Initial runs and necessary task reruns are covered. This supersedes the earlier publication gate for this publication task only; no local database operation or provider activation is authorized.

Both branch triggers already existed. The only workflow addition is a pre-mutation fail-closed step using `scripts/ci-database-preflight.mjs`. It checks GitHub-hosted Linux/repository/job/event/branch context, equal exact database/test URLs, the runner-provided service ID and network, actual Docker container/port/volume ownership, a fresh anonymous image volume with no explicit bind/persistent mounts or other owner, effective Prisma/browser configuration, actual connected database/user/schema/server address/port, empty initial public schema, and checkout SHA. It rejects enabled research or provider credentials. Existing migration, seed, reset, checks and workflow permissions remain unchanged. Service context uses GitHub's documented [job and runner contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts).

Pre-publication validation: JavaScript syntax and targeted ESLint pass. YAML parses; structural comparison proves every existing workflow setting/step remains intact after removing only the new preflight step. Synthetic validation accepts push/PR and fresh-service fixtures and rejects 17 identity/context/mount/activation mismatches. Local invocation fails before Docker/database access. These checks are not claims of successful runner execution. All 42 previously unpublished paths and added-line secret/private-path patterns were scanned, with no forbidden generated/private artifacts found. Source/test changes from the prior two commits remain unchanged; no local database, server, environment or Docker/storage actions were performed in this task.

Published branch/PR and actual push/PR CI run evidence will be recorded in the dependent draft PR and task handoff after the runs finish. Prior local evidence remains distinct: original discovery 535 tests plus 30 browser checks and a subsequent two-test media run; shared metadata 561 tests (304 unit, 257 integration), final complete browser rerun 30/30, associated with its documented frozen source manifest and commit `47ee12d1b4490a5b0bfb0e144cccefb8044a0a5e`. No earlier local result is presented as fresh CI evidence.

First runner results at `b9f91c7`: push run `35946284123` (checkout `b9f91c71f8d4b98de5a35cff26b89da97a0f0cf6`) and PR run `35946316144` (generated merge checkout `c21c65fc0fe67f8d622a145b5bb2ab7c5ad51539`), both attempt 1, stopped at the anonymous-volume preflight before migrations/seed/reset/tests. Docker marks anonymous volumes with `com.docker.volume.anonymous`; the initial label-free assumption was incorrect. The scoped correction requires exactly that empty-valued marker, still rejecting named/custom-labelled volumes, bind mounts, old/shared volumes and identity mismatches. Added rejection cases for missing/non-anonymous labels; all 19 synthetic negative cases pass. No application changes or relaxed reset guard. Initial runner installation reported four high npm advisories and existing deprecation warnings; dependency updates are outside this publication task.
