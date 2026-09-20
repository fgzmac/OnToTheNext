# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next discussion:** Q-006 — the most frustrating part of finding, checking, or organizing worthwhile experiences. The owner supplied discovery sources under D-021; do not ask where ideas come from again.

Later-stage questions are parked for sequencing, not an approved decision to exclude their features. Do not implement an unanswered question as a default. Use existing answers and proceed one question at a time.

## Section 1 — Active questions

**Already answered:** Japan pilot first; eventual app-store/SaaS subscription/ad ambition. Couple, two travelers. Both hotel and transport existing-booking organization and recommendations in the first version. Tokyo and private timing supplied; November 10, 2026 first test approved. Travel range per person, plane tickets excluded. Reservation-dependent events/restaurants included. Free-first with flexible $100/$150 references, not a fixed ceiling or purchasing authority. **Priorities: suggestion quality, same-day nearby discovery/on-the-fly planning, then seamless functionality.** Same-day capability is first-version work. D-019 records personal preferences. D-020 confirms both provider excursions and app-assembled combinations; shorter/all-day is proposed. D-021 records discovery from real experiences, positive Reddit posts, highly rated reviews, date-relevant calendars, and destination-related must-see experiences/events.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-006 | What is most frustrating or time-consuming about finding, checking, or organizing experiences? How are discovered ideas saved and turned into a plan? | Identifies the actual problem rather than inferring frustration from source preferences. | PARTIALLY RESOLVED — taste examples D-019 and discovery sources D-021 answered. NEXT: ask only the main pain point; detailed workflow and observed effort remain open. |
| Q-005 | Does the complete pilot promise reflect the owner's standards, and what additional deal-breakers matter? | Links approved priorities to the complete experience and investment gate. | PARTIALLY RESOLVED — ranking/same-day D-018, formats D-020; full promise and acceptance OPEN. |
| Q-004 | What development/tool/one-time costs, available time, and maintenance capacity remain? What specific future expense should be approved? | Separates capacity and actual purchases from the adopted policy. | PARTIALLY RESOLVED — timing D-012, free-first D-017; no fixed ceiling needed. Specific costs/capacity OPEN. |
| Q-011 | What is the trip-budget currency, total-versus-remaining meaning, and included non-airfare categories? | Prevents incorrect allocations without re-asking the per-person basis. | PARTIALLY ANSWERED — private bounds, airfare exclusion, and per-person basis supplied; other meanings OPEN. |
| Q-008 | How will the pilot be tested, how will the companion participate, and how will later testers/customers be reached? | Separates personal use from validation and acquisition. | PARTIALLY ANSWERED — owner first tester; companion testing and wider recruitment OPEN. Naming Reddit as a discovery source does not select a marketing channel. |
| Q-010 | What broader commercial audience should eventually be targeted? | Couple pilot is not a couples-only product or market. | OPEN — split from Q-003. |
| Q-001 | Is OnToTheNext the product name or just the repository name? | Avoids assuming a brand. | OPEN — not a blocker. |

The description, problem statement, positioning, evidence, non-goals, and long-term vision still need section review. Answering one question is not approving the whole brief.

### Standards clarification — D-018

The priority order is confirmed in [Product Success Standards](00-product-success-standards.md). Same-day discovery is not future-only. Include meaningful current events/experiences such as festivals and pop-ups, not permanent landmarks relabeled as live events. Areas, freshness, speed, result counts, scheduling rules, and acceptance thresholds remain open.

“Real time” means usefulness for a current decision, not selected continuous GPS, automatic monitoring, notifications, whole-trip rewriting, guaranteed inventory, booking transactions, or providers. Fetching today does not prove accuracy today; occurring today does not prove reachable or bookable now. Exact checks and fallbacks require design.

The standards note's evaluation dimensions and metrics are proposals. No percentage, minimum event coverage, time/tap limit, or product acceptance approved. Sharing remains; elaborate presentation cannot compensate for poor suggestions. Correctness, privacy, reliability, and accessibility remain necessary concerns.

### Organizer preferences — D-019

Positive examples: beach-view/snorkeling/oceanside-dinner excursion and scenic ATV exploration with a distinctive local element. Negative examples: standalone world's-largest-rubber-band and historical-statue attractions. These are personal quality examples, not verified Tokyo options.

Do not require adventure-only users or multi-part recommendations, exclude all history/sightseeing, assume companion agreement, or infer skill, ability, risk tolerance, exertion, luxury spending, or all-day availability.

### Discovery sources — D-021

The owner reports **real experiences, positive Reddit posts, highly rated reviews, calendars for relevant time frames, and popular destination-related must-see/must-experience events**. The source portion of Q-006 is answered. Real experiences may mean the owner's or others' firsthand experiences; no specific past attendance or personal history should be inferred.

**Proposed use:** Discover appealing candidates from those inputs, assess personal fit, verify material logistics with suitable current organizer/venue/operator/booking information, and show usable recommendations with honest evidence. Community praise and high ratings are not confirmation of current dates, openings, or bookability. Destination highlights are not mandatory stops or a reversal of D-019's personal dislikes.

**Still open:** Source access, review thresholds/weights, recency rules, evidence display, duplicate/conflict handling, and practical verification. Consider content and useful critical caveats rather than collecting only praise; no exact scoring formula or requirement for all five sources per option is selected.

No subreddit, calendar, review provider, API, scraper, paid contract, storage/reproduction permission, private-account import, or training-data use has been selected. No actual posts/reviews/calendars were fetched in this update. The owner's most frustrating step and post-discovery organization process remain unknown.

### Both formats confirmed; durations proposed — D-020

Offer ready-made provider excursions and app-assembled combinations. Q-012 is resolved. An app-created sequence is not automatically one package, price, booking, or jointly available set. Operator inclusions and separate components' timing, travel, costs, and reservations need evidence. No provider, algorithm, paid service, or transaction selected.

“Maybe shorter activities and all day activities” is a duration proposal, not precise cutoffs/controls. Q-212 carries it into journey design. Do not equate short with self-guided, all-day with provider tour, or longer with higher quality.

Proposed time handling accounts for total usable time, travel, and commitments without double-counting operator transfers. Do not invent shorter variants of fixed excursions or precise fits with unknown timing. No approved formula yet.

### Previously resolved boundaries

**Timing:** Approved test target, not public release or feasibility guarantee. Private Tokyo-local values already in chat. Airports, transfers, hotel nights/readiness, and additional destinations open.

**Travel budget:** Per-person range, not shared total or app allowance. Currency/inclusions open. No equal split, conversion, minimum spend, hard cap, or payment authority.

**App policy:** Free first; flexible $100/month and $150 upper references. Necessary spending requires review and a specific decision. Greater discretionary investment follows owner acceptance using D-018; acceptance has not happened.

**Cost note:** Prior references are not an upgrade schedule, provider selection, quote, or capacity promise. Re-verify before use. Tools, one-time costs, and data contracts separate. This source-preference update does not refresh prices.

**Reservations:** Consideration confirmed; labels, evidence, windows, locks, changes, costs, reminders, and transactions open. Unknown availability is not booked/paid.

Free-first cannot silently remove hotel/transport paths, reservation awareness, same-day discovery, or experience formats. Prototype examples test interactions, not current data. Investigate coverage/access and disclose paid dependencies without activating them.

## Section 2 — Users, Roles, and Ownership

| ID | Question | Status |
| --- | --- | --- |
| Q-101 | Who owns the plan; can companions view, suggest, or edit, including same-day changes? | OPEN — couple status and D-018 do not settle permissions. |
| Q-102 | Who needs accounts, and when? | OPEN — Section 2. |
| Q-103 | Anyone-with-link, invited-only, or another model; how revoke access? | OPEN — Section 2. |
| Q-104 | Who can publish, delete, invite, remove access, or transfer ownership? | OPEN — Section 2. |
| Q-105 | What stays private, including booking, spending, and location details? | OPEN — Section 2. |
| Q-106 | How collect and combine group preferences? | OPEN — D-019/D-021 supply organizer inputs, not companion agreement. |

## Section 3 — User Journeys and Interface Behavior

| ID | Question | Status |
| --- | --- | --- |
| Q-201 | What basics are needed for pre-trip versus same-day decisions? How represent local/available time and budgets? | OPEN — pilot values supplied; full onboarding for same-day tasks not assumed. |
| Q-202 | Country/state, direct city, or multiple destinations? | OPEN — Tokyo included, Tokyo-only unconfirmed. |
| Q-203 | Meanings of Keep, Replace, Must-do, Lock, Undo? | OPEN — Section 3. |
| Q-204 | How show reasons, real experiences/review support, events versus venues, times, costs, booking needs, source attribution, and uncertainty without clutter? | OPEN — D-021 identifies sources, not widgets, badges, ranking weights, or verification guarantees. D-020 formats must be distinct. |
| Q-205 | Snapshot, all edits, or published updates; what stays draft/private? | OPEN — coordinate with permissions. |
| Q-206 | Minimum reveal and direct itinerary access? | OPEN — sharing retained below extra polish over D-018. |
| Q-207 | How do same-day discovery, plan creation, and replacement work? What inputs, preview, and no-result behavior? | CAPABILITY CONFIRMED D-018; flows OPEN. Q-212 duration ideas; no location permission or whole-trip automation granted. |
| Q-208 | Failed save, interruption, refresh, lost connectivity, or access? | OPEN — recovery must be understandable. |
| Q-209 | Hotel/transport entry, recommendations, comparison, change previews, time/budget/booking handoffs? | OPEN detail — both paths confirmed; no imports/providers/transactions. |
| Q-210 | Reservation requirement, windows, booking/payment states, tentative plans, unavailable/unknown slots? | OPEN detail — reviews/calendars do not prove available seats or tables; combining items does not reserve them. |
| Q-211 | Budget bounds, currency/basis, exclusions, totals, shared costs, deposits, unknown prices, and over-budget choices? | OPEN detail — preserve D-014/D-016; operator inclusions versus separate costs; app policy is not travel accounting. |
| Q-212 | Shorter/all-day choices, exact time, format labels, total duration, cutoffs or intermediate categories? | OPEN detail — duration idea tentative; both formats confirmed; no hours, filters, defaults, or formula approved. |

## Section 4 — Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | Additional destinations, languages, devices, local-day coverage, wider trip/group limits? | PARTIALLY ANSWERED — Tokyo/Japan, two people, 2026; other scope OPEN. Preference examples do not establish seasonal inventory. |
| Q-302 | Minimum coverage for hotel/transport, reservations, same-day discovery, and both formats; allocation among prototype/pilot/commercial phases? | PARTIALLY ANSWERED — confirmed capabilities cannot silently become future-only. Source-category preferences do not select complete integrations. |
| Q-303 | What multi-city complexity, voting, whole-trip automation, and transactions are excluded initially? | OPEN — advanced-replanning deferral must not remove D-018's basic capability. |
| Q-304 | Which measured outcomes establish recommendation quality, same-day usefulness, easy tasks, and acceptance? | OPEN — use D-018 priorities, D-019 examples, D-020 formats, D-021 evidence preferences. Define samples/denominators/thresholds; star scores alone are not approved success criteria. |
| Q-305 | What rules protect stays, travel, local times, partial days, buffers, and reservations during changes? | OPEN — total sequence fit, fixed operator times, no double-counted travel or invented variants. |
| Q-306 | Subscription/ad timing, tiers, trials, placements, ad-free behavior? | OPEN — revenue intent is not initial feature approval. |
| Q-307 | Minimum reservation-aware behavior: links, manual state, deadlines, reminders, checks, transactions? | OPEN — D-015 does not choose every mechanism. |
| Q-308 | Minimum budget currencies/categories/estimates/shared-cost/paid-total/warnings? | OPEN — personal values not global limits. |
| Q-309 | Minimum event/experience coverage, freshness, speed, reach, no-result behavior, and plan creation? | OPEN detail — D-018/D-020 apply; no promise of every event, live inventory, or fixed count. |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What supports or challenges personalized sharing's value? | OPEN — retained concept, not a substitute for leading standards. |
| Q-352 | What independently checked examples test recommendations, stays/transport, reservations, budgets, partial days, current events, and both formats? | OPEN — taste/source reports are not verified offerings. Evaluate appeal, fact support, and practical fit separately. |
| Q-353 | What risks block implementation, including paid dependencies/free limits? What fallbacks and success conditions? | OPEN — investigate without purchases or fake-live claims. |
| Q-354 | Evidence for wider demand, repeat value, willingness to pay, acceptable ads, and sustainable costs? | OPEN — individual taste and owner acceptance are not market validation. |
| Q-355 | Can reservation rules/windows/routes and relevant availability be sourced accurately? | OPEN — prior access examples, praise, and calendars are not live verification. |
| Q-356 | Can the source mix reveal appealing, timely events and measure valid results plus known suitable events missed? | OPEN — check occurrence/year, canceled/expired entries, duplicates, conflicting or copied evidence, entry feasibility, and retrieval versus verification. D-021 categories are not proven access or coverage. |

## Sections 6–8 — System, Dependencies, API Capabilities

| ID | Question | Status |
| --- | --- | --- |
| Q-401 | What platform, structure, storage, identity, AI, and providers fit the product/free-first approach? | OPEN — standards, formats, and source preferences do not select a stack. |
| Q-402 | How obtain and interpret firsthand/Reddit/review/calendar/highlight evidence alongside operator, venue, event, hotel, price, transport, and booking facts? How attribute and reconcile them? | OPEN — D-021 supplies source categories, not integration rights, verified authenticity, rating thresholds, or an exclusive fact-source hierarchy. |
| Q-403 | Access terms, rights, attribution, retention/storage, coverage, freshness, quotas, expiry/auto-billing, and cost? | OPEN — evaluate sources before selecting APIs, scraping, reproducing content, or paying. No right to use community content for training inferred. |
| Q-404 | Concepts for venues/occurrences, provider products versus assembled plans, schedules/stays/legs/time, reservations/payments/budgets, sources/evidence, and published versions? | OPEN — candidate distinctions, not schema approval. D-021 adds provenance considerations. |
| Q-405 | Performance, reliability, accessibility, privacy/location consent, deletion, abuse/usage controls, recovery? | OPEN — no ongoing tracking, fixed cutoff, or precise freshness/speed targets. |
| Q-406 | What API capabilities support approved pre-trip/same-day journeys and both formats? | OPEN — Section 8. |
| Q-407 | Pilot delivery and commercial app-store/SaaS path; billing/ad requirements? | OPEN — verify current sources when relevant; web-first remains proposed. |

## Sections 9–15 — Delivery and Handoff

| ID | Question | Status |
| --- | --- | --- |
| Q-501 | First buildable slice and risk addressed? | OPEN — quality/data evidence informs selection, not coding authorization. |
| Q-502 | Acceptance, permissions, contracts, data changes, failures? | OPEN — translate confirmed choices and relevant inputs into checks; no invented thresholds or category bans. |
| Q-503 | Real versus simulated components; what each test proves; replacement trigger? | OPEN — prepared events, invented endorsements, and illustrative excursions are not verified evidence. |
| Q-504 | Tests, migrations, restoration, monitoring, recovery? | OPEN — essential protections cannot be omitted just to remain free. |
| Q-505 | How update feedback, decisions, changes, and spending reviews? | OPEN — no automatic purchase authority. |
| Q-506 | Has the design-to-implementation transition been approved? | OPEN — dates, budget policy, priorities, formats, and source preferences do not approve it. |

## Resolved questions and recorded inputs

| ID | Question | Answer | Record |
| --- | --- | --- | --- |
| R-001 | Primary use case? | Organizer takes trip and shares with companions. | D-002 |
| R-002 | Planning process? | Adopted blueprint, sequentially in chat. | D-001 |
| R-003 | Repository? | `fgzmac/OnToTheNext`. | D-004 |
| R-004 | When Codex implementation? | After design and explicit approval; not yet authorized. | D-003 |
| Q-002 | Project objective/priority? | Japan pilot first; commercial launch ultimately. | D-006/D-007 |
| Q-007 | Revenue direction? | Subscriptions and ads; details open. | D-007 |
| Q-003 | Initial audience? | Couple, two travelers; wider audience separate. | D-008 |
| Q-009 | Existing hotel/transport bookings or recommendations? | Both for both areas. | D-010 |
| Q-004 (timing) | Test date/local timing? | November 10, 2026 target; private travel values supplied. | D-012/D-013 |
| R-005 | Trip range/exclusion? | Private range excludes flights, per person; other meanings open. | D-014/D-016 |
| R-006 | Reservation-aware dining/events? | Included; methods open. | D-015 |
| Q-011 (basis) | Combined or per person? | Per person. | D-016 |
| Q-004 (policy) | App-budget rule? | Free first; flexible $100/$150 references; specific necessary-cost review; greater investment after owner acceptance. | D-017 |
| Q-005 (ranked standards) | Top three standards? | 1. Worthwhile suggestions; 2. Same-day nearby events/plans; 3. Seamless use. | D-018 — order resolved; full promise/tests open. |
| R-007 | Same-day discovery later-only? | No; core first-version capability. Advanced automation separate. | D-018 |
| Q-006 (initial examples) | Add/reject examples? | Positive scenic participatory/local combinations; negative standalone novelty/statue examples. Personal taste, not verified offerings. | D-019 — examples recorded. |
| Q-012 | Provider excursions or app combinations? | Both; shorter/all-day durations separately tentative. | D-020 — formats resolved, Q-212 details. |
| Q-006 (discovery sources) | Where do worthwhile ideas come from? | Real experiences, positive Reddit posts, highly rated reviews, calendars for relevant time frames, popular destination-related must-see experiences/events. | D-021 — reported sources recorded 2026-09-19; frustration/workflow still open. |

## Resolution procedure

Update active documents and decisions together. Preserve history and explicit deferrals with reasons/owners/triggers. No section approval without the owner's approval. Source or preference input is not successful product testing.

**Current next step:** Ask which part takes most effort: finding worthwhile options, checking dates/booking needs, or combining them into a practical plan. These are possible answers, not presumed pain points. Do not re-ask discovery sources, taste examples, or both formats. Keep duration detail in Q-212. No external Reddit/event lookup is needed just to record this input. Preserve free-first and all confirmed capabilities; remaining currency/categories, capacity, separate costs, complete promise, and observed workflow remain open. Private trip details stay in chat.
