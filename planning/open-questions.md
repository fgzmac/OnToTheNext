# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next discussion:** Q-006 — current sources for worthwhile experiences and the most frustrating part of finding or organizing them. Q-012 is resolved: offer both experience formats. Shorter/all-day options are captured as a proposal under Q-212.

Later-stage questions are parked for sequencing, not an approved decision to exclude their features. Do not implement an unanswered question as a default. Use existing answers and proceed one question at a time.

## Section 1 — Active questions

**Already answered:** Japan pilot first; eventual app-store/SaaS subscription/ad ambition. Couple, two travelers. Both hotel and transport existing-booking organization and recommendations in the first version. Tokyo and private timing supplied; November 10, 2026 first test approved. Travel range per person, plane tickets excluded. Reservation-dependent events/restaurants included. Free-first app spending with flexible $100/$150 references, not a fixed ceiling or purchasing authority. **Ranked standards: useful high-quality suggestions first, same-day nearby discovery/on-the-fly planning second, seamless functionality third.** The same-day capability is required in the first version. D-019 records personal experience preferences, not global rules. **D-020 confirms offering both ready-made excursions and app-assembled combinations.** See D-006 through D-020.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-006 | Where does the owner currently find experiences they like, and what is most frustrating about finding or organizing them? What observed behavior provides evidence? | Connects the product to the current workaround rather than relying only on stated tastes. | NEXT — positive/negative examples already supplied in D-019. Ask about current discovery/workflow, not the same examples again. |
| Q-005 | Does the complete pilot promise reflect the owner's standards, and what additional deal-breakers must be protected? | Links approved priorities to the full promised experience and investment gate. | PARTIALLY RESOLVED — top-three order/basic same-day capability D-018 and both formats D-020 confirmed; full promise and product acceptance OPEN. |
| Q-004 | What development/tool/one-time costs, available time, and maintenance capacity remain? What specific future expense is necessary and should be approved? | Keeps capacity and individual cost decisions separate from the adopted spending policy. | PARTIALLY RESOLVED — timing D-012, policy D-017. No fixed monthly ceiling needed; separate costs/capacity/purchases OPEN. |
| Q-011 | What is the trip-budget currency, total-versus-remaining meaning, and included non-airfare categories? | Prevents incorrect allocations without re-asking the per-person basis. | PARTIALLY ANSWERED — private bounds, airfare exclusion, per-person basis supplied; other meanings OPEN. |
| Q-008 | How will the pilot be tested, how will the companion participate, and how will later testers/customers be reached? | Separates personal use from broader validation and acquisition. | PARTIALLY ANSWERED — owner is first tester; companion testing arrangements and wider recruitment OPEN. |
| Q-010 | What broader commercial audience should eventually be targeted? | Pilot couple does not establish a couples-only product or market. | OPEN — split from Q-003. |
| Q-001 | Is OnToTheNext the product name or just the repository name? | Avoids assuming a brand. | OPEN — not a blocker to product planning. |

The description, problem statement, positioning, evidence, non-goals, and long-term vision still require section review. Answering one question is not approving the whole brief.

### Standards clarification — D-018

The priority order is confirmed in [Product Success Standards](00-product-success-standards.md). Same-day discovery is not future-only. It must include meaningful current events/experiences such as festivals and pop-ups, not simply relabel permanent landmarks as live events. Detailed supported areas, data freshness, response speed, result counts, scheduling rules, and acceptance thresholds remain open.

“Real time” specifies usefulness for a current decision. It does not select continuous GPS, automatic monitoring, notifications, automatic whole-trip replanning, live inventory guarantees, reservation transactions, or providers. A listing fetched today is not necessarily accurate today; an event today is not necessarily reachable or bookable now. Exact checks and fallback behavior require design.

The standards note's evaluation dimensions and metrics are proposals. No quality percentage, minimum event coverage, time limit, number of taps, or product acceptance is approved. Personalized sharing remains; elaborate presentation cannot compensate for poor suggestions. Basic correctness, privacy, reliability, and accessibility remain necessary concerns.

### Organizer preference examples — D-019

The owner would consider a beach-view/snorkeling/oceanside-dinner excursion and scenic ATV exploration with a locally distinctive element. The owner would reject the world's-largest-rubber-band or historical-statue examples as standalone attractions. This supplies the requested initial quality examples, not a verified list of Tokyo options.

Use the examples as an organizer-specific preference reference. Do not impose an adventure-only audience, require every recommendation to be a bundle, discard all historical or sightseeing content, assume the companion shares the preference, or infer ability, skill, risk tolerance, exertion, luxury spending, or all-day availability.

### Both formats confirmed; duration options proposed — D-020

Q-012 is resolved by the owner's answer, “Offer both.” Recommend ready-made provider excursions and app-assembled combinations of separate activities. An app-created sequence is not automatically one package, price, booking, or set of jointly available components. Operator inclusions and the timing, travel, costs, and reservation needs of separate components need evidence. No provider, algorithm, paid service, or transaction is selected.

The owner also suggested, “Maybe shorter activities and all day activities.” This is a **duration proposal**, not approval of precise cutoffs or controls. Record the idea now and specify it in Q-212 during journey design. Do not equate short with self-guided, all-day with a provider tour, or longer with higher quality.

Proposed duration handling should consider total usable time, including relevant travel and known commitments, with no double-counting of an operator's included transfers. Do not invent a shorter variant of a fixed excursion or claim a precise fit when important timing is unknown. These considerations are not yet an approved scheduling formula.

### Previously resolved boundaries

**Timing:** Approved test target, not a public release or feasibility guarantee. Private date/time values already supplied in Tokyo local time stay in chat. Airports, transfers, hotel nights, hotel-ready times, and additional destinations remain open.

**Travel budget:** Per-person range, not shared total or app allowance. Currency and inclusions open. No equal-split rule, conversion, forced minimum spend, hard cap, or payment authority established.

**App policy:** Free first; flexible $100 monthly reference/$150 upper reference, not spend target or cutoff. Necessary costs require review of blocker, free alternatives, charges, and consequence of waiting. Greater discretionary investment follows owner acceptance of a working product using D-018's standards; actual acceptance has not occurred.

**Cost note:** Prior examples remain references, not an upgrade schedule, provider choice, quote, or capacity promise. Re-verify when relevant. Development tools, one-time costs, and data contracts stay separate. This format/duration update does not refresh price research.

**Reservations:** Consideration is confirmed; exact labels, source verification, booking windows, locks, changes, costs, reminders, and transactions remain open. Unknown availability is not booked or paid.

Free-first cannot silently drop either hotel/transport path, reservation awareness, same-day discovery, or either experience format. Prototype examples test interactions, not live event quality. Investigate coverage and access before building around assumptions; disclose any necessary paid dependency without activating it.

## Section 2 — Users, Roles, and Ownership

| ID | Question | Status |
| --- | --- | --- |
| Q-101 | Who owns the plan, and can companions view, suggest, or edit, including same-day changes? | OPEN — couple status and D-018 do not settle permissions. |
| Q-102 | Who needs accounts, and when? | OPEN — Section 2. |
| Q-103 | Anyone-with-link, invited-only, or another access model? How is access revoked? | OPEN — Section 2. |
| Q-104 | Who can publish, delete, invite, remove access, or transfer ownership? | OPEN — Section 2. |
| Q-105 | What is private to the organizer, including booking/spending/location details? | OPEN — Section 2. |
| Q-106 | How are group preferences collected and combined? | OPEN — two travelers do not imply identical interests; D-019 supplies only the organizer's stated taste. |

## Section 3 — User Journeys and Interface Behavior

| ID | Question | Status |
| --- | --- | --- |
| Q-201 | What basics are required for pre-trip planning versus a same-day decision? How are local time, available time, and budgets represented? | OPEN for behavior — supplied pilot values already in chat. Do not assume full onboarding is needed for a same-day task. |
| Q-202 | Country/state, direct city, or multiple destinations? | OPEN — Tokyo included; Tokyo-only unconfirmed. |
| Q-203 | Exact meanings of Keep, Replace, Must-do, Lock, Undo? | OPEN — Section 3. |
| Q-204 | What makes cards easy to judge? How show reasons, events versus venues, what travelers do/see, times, costs, booking needs, sources, and uncertainty? | OPEN — D-019 is personal taste, not ranking weights or UI rules. D-020 confirms both formats; distinguish provider offerings from app-created combinations. |
| Q-205 | Snapshot, all edits, or published updates? What stays private/draft? | OPEN — coordinate with permissions. |
| Q-206 | Minimum reveal and direct practical itinerary access? | OPEN — sharing retained; do not prioritize elaborate effects over D-018. |
| Q-207 | How do Find something to do today, create a same-day plan, and Replace this activity work? What location/time/preferences are needed, how is a change previewed, and what happens when no useful event is found? | CAPABILITY CONFIRMED by D-018; flows OPEN. Q-212 adds duration ideas. Separate from automatic whole-trip replanning; no location permission granted. |
| Q-208 | What happens after failed save, interruption, refresh, lost connectivity, or lost access? | OPEN — Section 3; seamless must include understandable recovery. |
| Q-209 | Hotel/transport booking entry, recommendations, comparison, change previews, time/budget/booking handoffs? | OPEN detail — both support paths confirmed; no imports/providers/transactions selected. |
| Q-210 | Reservation requirement, booking windows, booking/payment states, tentative plans, and unavailable/unknown slots? | OPEN detail — D-015 plus D-018 same-day feasibility. D-020 does not create combined availability or reservations. |
| Q-211 | Budget bounds, currency/basis, exclusions, totals, shared costs, deposits, uncertain prices, and over-budget choices? | OPEN detail — preserve D-014/D-016. D-020 requires distinguishing operator inclusions from separately priced components; app policy D-017 is not travel accounting. |
| Q-212 | How should shorter and all-day choices, exact available time, and provider-versus-app-assembled labels be presented? What counts toward total duration, and are cutoffs or an intermediate category needed? | NEW OPEN detail — shorter/all-day is a user proposal. Both formats are confirmed by D-020. No hours, categories, filters, defaults, or timing formula approved. |

## Section 4 — Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | Additional destinations, languages, devices, local-day coverage, wider trip/group limits? | PARTIALLY ANSWERED — Tokyo/Japan, two people, 2026 context; remaining scope OPEN. D-019 examples do not select destinations, tour modes, or seasonal availability. |
| Q-302 | Minimum modes/coverage for hotel/transport paths, reservation awareness, same-day discovery, and both experience formats? How allocate remaining work among prototype/pilot/commercial phases? | PARTIALLY ANSWERED — D-020 confirms both formats; required capabilities cannot silently become future-only. Duration depth follows Q-212. |
| Q-303 | Which multi-city complexity, voting, automatic whole-trip replanning, and in-app transactions are excluded initially? | OPEN — older advanced same-day deferral is not an exclusion of D-018's required basic same-day discovery/planning. |
| Q-304 | What measurable results establish recommendation quality, same-day usefulness, seamless tasks, and owner acceptance? | OPEN — order D-018; personal examples D-019; both formats D-020. Define samples, denominators, thresholds, and checks before claiming success. |
| Q-305 | What scheduling constraints protect hotels, transport, local times, partial days, buffers, and fixed reservations when forming or changing a day? | OPEN — evaluate the complete sequence's fit, including total duration and operator-fixed timings. No double-counted transfers or invented shorter tour variants. Exact rules remain unapproved. |
| Q-306 | Timing and details of subscriptions/ads, tiers, trials, placement, ad-free behavior? | OPEN — revenue intent is not initial feature approval. |
| Q-307 | Minimum reservation-aware behavior: links, manual status, deadlines, reminders, availability checks, transactions? | OPEN — D-015 does not select every mechanism. |
| Q-308 | Minimum range-budget currencies/categories/estimates/shared-cost/paid-total/warning support? | OPEN — personal values not product-wide limits. |
| Q-309 | What minimum nearby event/experience coverage, freshness, response speed, location reach, no-result behavior, and plan creation must the pilot demonstrate? | OPEN detail — basic capability D-018 required; both formats D-020 selected. No promise of every event, live inventory, or fixed result count. |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What observation supports or challenges personalized sharing's value? | OPEN — retained concept, below extra investment in D-018's leading standards. |
| Q-352 | What independently checked examples test hotel/transport, reservations, budgets, partial days, current events, provider excursions, and assembled plans? | OPEN — D-019 examples are stated preferences, not verified offerings. Compare appeal and total-time fit for useful single activities and combinations. |
| Q-353 | Which risks block implementation, including paid dependencies and free-tier limits? What fallbacks and success conditions apply? | OPEN — investigate early without purchase authority or fake-live claims. |
| Q-354 | What evidence supports wider demand, repeat subscription value, willingness to pay, acceptable ads, and sustainable costs? | OPEN — owner acceptance or individual taste alone is not commercial validation. |
| Q-355 | Can reservation rules/windows/routes and relevant availability be obtained with adequate freshness and coverage? | OPEN — prior access examples are not provider tests. |
| Q-356 | Can we find genuinely appealing, timely local events including festivals/pop-ups for a bounded area/time, and measure valid results and known suitable events missed? | OPEN risk — check occurrence dates, expiry/cancellation, duplicates, sources, entry feasibility, and retrieval-versus-verification time. Neither a short-duration label nor a package format proves same-day usability. |

## Sections 6–8 — System, Dependencies, API Capabilities

| ID | Question | Status |
| --- | --- | --- |
| Q-401 | Which platform, structure, storage, identity, AI, and providers fit the approved product/free-first approach? | OPEN — budget, standards, and formats do not choose a stack. |
| Q-402 | Where do places, dated events, excursions/inclusions, accommodation, prices, transport, reservation information, and booking status come from? How reconcile conflicts and distinguish evidence types? | OPEN — no provider selected. D-020 confirms the need for actual operator offerings and independently sourced components, not access to either. |
| Q-403 | Terms, rights, attribution, storage limits, coverage, freshness, free quotas, expiry/auto-billing, and cost? | OPEN — prior price references need current verification before selection/spend. |
| Q-404 | Concepts/states for venues/events, operator offerings/inclusions versus app-assembled sequences, saved/scheduled items, stays, legs, local time/duration, reservations/payments, budgets, and published versions? | OPEN — both formats confirmed D-020; preserve their distinction. Candidate concepts, not schema approval. |
| Q-405 | Performance, reliability, accessibility, privacy/location consent, retention/deletion, abuse/usage controls, and recovery? | OPEN — no continuous tracking, fixed cutoff, or exact response/freshness targets selected. |
| Q-406 | What backend capabilities support the approved pre-trip and same-day journeys, including both experience formats? | OPEN — Section 8. |
| Q-407 | Pilot delivery and commercial app-store/SaaS path; applicable billing/ad requirements? | OPEN — verify when relevant; web-first remains proposal. |

## Sections 9–15 — Delivery and Handoff

| ID | Question | Status |
| --- | --- | --- |
| Q-501 | First buildable slice and risk it addresses? | OPEN — quality/current-data risk informs selection, not authorization to code. |
| Q-502 | Acceptance, permissions, contracts, data changes, failures? | OPEN — translate D-018/D-020 and relevant preference examples into checks; no invented thresholds, duration cutoffs, or global category bans. |
| Q-503 | Real versus simulated components, what each test proves, replacement trigger? | OPEN — prepared events cannot establish real-time usefulness, and illustrative excursions are not verified packages. |
| Q-504 | Tests, migrations, restoration, monitoring, recovery? | OPEN — do not omit essential protections to remain free. |
| Q-505 | How do feedback, decisions, changes, and paid reviews update the plan? | OPEN — no automatic purchase authority. |
| Q-506 | Has design completion/implementation transition been approved? | OPEN — target, policy, priorities, preferences, and formats do not approve transition. |

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
| Q-004 (timing) | Test date/local travel timing? | November 10, 2026 target approved; private travel values supplied. | D-012/D-013 |
| R-005 | Trip range/exclusion? | Private range excluding flights, per person; other meanings open. | D-014/D-016 |
| R-006 | Reservation-aware events/restaurants? | Included; detailed methods open. | D-015 |
| Q-011 (basis) | Combined or personal budget? | Per person. | D-016 |
| Q-004 (policy) | App-budget rule? | Free first; flexible $100/$150 references; necessary costs reviewed; greater investment after owner acceptance. | D-017 |
| Q-005 (ranked standards) | Top three first-version standards? | 1. Suggestions people would add; 2. Same-day nearby events and on-the-fly plans; 3. Seamless, useful operation. | D-018 — resolved 2026-09-19; full promise/thresholds still open. |
| R-007 | Is same-day nearby discovery later-only? | No; core first-version capability. Advanced automation remains separate. | D-018 |
| Q-006 (initial examples) | What would the organizer consider adding or reject? | Positive: beach-view/snorkeling/oceanside-dinner excursion; scenic ATV exploration with a distinctive local element. Negative: standalone novelty-object and historical-statue examples. Personal preferences, not global rules or verified options. | D-019 — recorded 2026-09-19; workarounds/evidence still open. |
| Q-012 | Ready-made excursions, app-assembled combinations, or both? | Offer both. Shorter/all-day options are separately recorded as a tentative duration idea, not fixed categories. | D-020 — format resolved 2026-09-19; duration detail Q-212. |

## Resolution procedure

Update active sections and decision records together. Preserve history and record explicit deferrals with reasons/owners/triggers. No section approval without the owner's approval. Do not equate a priority, preference, or format answer with successful testing.

**Current next step:** Ask Q-006 about where the owner currently finds worthwhile experiences and what is most frustrating about that process. Do not re-ask the supplied examples or the now-confirmed choice of both formats. Keep duration details with Q-212 for journey design. No actual excursion research or provider choice is needed for recording this input. Preserve free-first policy and all confirmed capabilities; remaining currency, categories, capacity, separate costs, and complete-promise review stay open. Private trip details stay in chat.
