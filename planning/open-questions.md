# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next discussion:** Q-006 — examples of an experience the owner would add and one they would reject, with reasons. Q-005's priority order is answered in D-018; detailed acceptance and the full promise remain open.

Later-stage questions are parked for sequencing, not an approved decision to exclude their features. Do not implement an unanswered question as a default. Use existing answers and proceed one question at a time.

## Section 1 — Active questions

**Already answered:** Japan pilot first; eventual app-store/SaaS subscription/ad ambition. Couple, two travelers. Both hotel and transport existing-booking organization and recommendations in the first version. Tokyo and private timing supplied; November 10, 2026 first test approved. Travel range per person, plane tickets excluded. Reservation-dependent events/restaurants included. Free-first app spending with flexible $100/$150 references, not a fixed ceiling or purchasing authority. **Ranked standards: useful high-quality suggestions first, same-day nearby discovery/on-the-fly planning second, seamless functionality third.** The same-day capability is required in the first version. See D-006 through D-018.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-006 | What distinguishes a suggestion worth adding from one to reject? Give a concrete example of each and explain why. What current planning frustrations or workarounds provide evidence? | Makes the highest-priority quality standard concrete without assuming popularity, novelty, reviews, luxury, or hidden gems. | NEXT — priorities chosen under D-018; examples, personal criteria, and observed evidence still OPEN. |
| Q-005 | Does the complete pilot promise reflect the owner's standards, and what additional deal-breakers must be protected? | Links approved priorities to the full promised experience and investment gate. | PARTIALLY RESOLVED — top-three order and basic same-day capability confirmed D-018; full promise and product acceptance OPEN. Do not re-ask the ranking. |
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

### Previously resolved boundaries

**Timing:** Approved test target, not a public release or feasibility guarantee. Private date/time values already supplied in Tokyo local time stay in chat. Airports, transfers, hotel nights, hotel-ready times, and additional destinations remain open.

**Travel budget:** Per-person range, not shared total or app allowance. Currency and inclusions open. No equal-split rule, conversion, forced minimum spend, hard cap, or payment authority established.

**App policy:** Free first; flexible $100 monthly reference/$150 upper reference, not spend target or cutoff. Necessary costs require review of blocker, free alternatives, charges, and consequence of waiting. Greater discretionary investment follows owner acceptance of a working product using D-018's standards; actual acceptance has not occurred.

**Cost note:** Prior examples remain references, not an upgrade schedule, provider choice, quote, or capacity promise. Re-verify when relevant. Development tools, one-time costs, and data contracts stay separate. This standards update does not refresh price research.

**Reservations:** Consideration is confirmed; exact labels, source verification, booking windows, locks, changes, costs, reminders, and transactions remain open. Unknown availability is not booked or paid.

Free-first cannot silently drop either hotel/transport support path, reservation awareness, or same-day discovery. Prototype examples test interactions, not live event quality. Investigate coverage and access before building around assumptions; disclose any necessary paid dependency without activating it.

## Section 2 — Users, Roles, and Ownership

| ID | Question | Status |
| --- | --- | --- |
| Q-101 | Who owns the plan, and can companions view, suggest, or edit, including same-day changes? | OPEN — couple status and D-018 do not settle permissions. |
| Q-102 | Who needs accounts, and when? | OPEN — Section 2. |
| Q-103 | Anyone-with-link, invited-only, or another access model? How is access revoked? | OPEN — Section 2. |
| Q-104 | Who can publish, delete, invite, remove access, or transfer ownership? | OPEN — Section 2. |
| Q-105 | What is private to the organizer, including booking/spending/location details? | OPEN — Section 2. |
| Q-106 | How are group preferences collected and combined? | OPEN — two travelers do not imply identical interests. |

## Section 3 — User Journeys and Interface Behavior

| ID | Question | Status |
| --- | --- | --- |
| Q-201 | What basics are required for pre-trip planning versus a same-day decision? How are local time, available time, and budgets represented? | OPEN for behavior — supplied pilot values already in chat. Do not assume full onboarding is needed for a same-day task. |
| Q-202 | Country/state, direct city, or multiple destinations? | OPEN — Tokyo included; Tokyo-only unconfirmed. |
| Q-203 | Exact meanings of Keep, Replace, Must-do, Lock, Undo? | OPEN — Section 3. |
| Q-204 | What information makes cards easy to judge? How show reasons, events versus venues, times, costs, booking needs, sources, and uncertainty? | OPEN — detailed UI and schema unapproved; D-018 quality standard applies. |
| Q-205 | Snapshot, all edits, or published updates? What stays private/draft? | OPEN — coordinate with permissions. |
| Q-206 | Minimum reveal and direct practical itinerary access? | OPEN — sharing retained; do not prioritize elaborate effects over D-018. |
| Q-207 | How do Find something to do today, create a same-day plan, and Replace this activity work? What location/time/preferences are needed, how is a change previewed, and what happens when no useful event is found? | CAPABILITY CONFIRMED by D-018; precise flows OPEN. Separate from automatic whole-trip replanning. No location permission granted by this decision. |
| Q-208 | What happens after failed save, interruption, refresh, lost connectivity, or lost access? | OPEN — Section 3; seamless must include understandable recovery. |
| Q-209 | Hotel/transport booking entry, recommendations, comparison, change previews, time/budget/booking handoffs? | OPEN detail — both support paths confirmed; no imports/providers/transactions selected. |
| Q-210 | Reservation requirement, booking windows, booking/payment states, tentative plans, and unavailable/unknown slots? | OPEN detail — D-015 plus D-018 same-day feasibility; no automatic action approved. |
| Q-211 | Budget bounds, currency/basis, exclusions, totals, shared costs, deposits, uncertain prices, and over-budget choices? | OPEN detail — preserve D-014/D-016; D-017 is app policy, not travel accounting. |

## Section 4 — Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | Additional destinations, languages, devices, local-day coverage, wider trip/group limits? | PARTIALLY ANSWERED — Tokyo/Japan, two people, 2026 context; remaining scope OPEN. |
| Q-302 | Minimum modes/coverage for both hotel/transport paths, reservation awareness, and same-day discovery? How allocate remaining work among prototype/pilot/commercial phases? | PARTIALLY ANSWERED — confirmed capabilities cannot silently become future-only. |
| Q-303 | Which multi-city complexity, voting, automatic whole-trip replanning, and in-app transactions are excluded initially? | OPEN — older advanced same-day deferral is not an exclusion of D-018's required basic same-day discovery/planning. |
| Q-304 | What observable, measurable results establish recommendation quality, same-day usefulness, seamless tasks, and owner acceptance? | OPEN — order confirmed D-018; methods in standards note proposed. Define samples, denominators, thresholds, and checks before claiming success. |
| Q-305 | What scheduling constraints protect hotels, transport, local-time meaning, partial days, buffers, and fixed reservations when forming or changing a day? | OPEN — detailed rules and guarantees unapproved. |
| Q-306 | Timing and details of subscriptions/ads, tiers, trials, placement, ad-free behavior? | OPEN — revenue intent is not initial feature approval. |
| Q-307 | Minimum reservation-aware behavior: links, manual status, deadlines, reminders, availability checks, transactions? | OPEN — D-015 does not select every mechanism. |
| Q-308 | Minimum range-budget currencies/categories/estimates/shared-cost/paid-total/warning support? | OPEN — personal values not product-wide limits. |
| Q-309 | What minimum nearby event/experience coverage, freshness, response speed, location reach, no-result behavior, and plan creation must the pilot demonstrate? | NEW OPEN detail — basic capability required D-018. Do not guarantee every festival/pop-up, real-time inventory, or a fixed number of results without evidence. |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What observation supports or challenges personalized sharing's value? | OPEN — retained concept, below extra investment in D-018's leading standards. |
| Q-352 | What independently checked recommendation and itinerary examples test hotel/transport, reservations, budgets, partial days, and current events? | OPEN — synthetic private details; real event evidence required for live-data quality tests. |
| Q-353 | Which risks block implementation, including paid dependencies and free-tier limits? What fallbacks and success conditions apply? | OPEN — investigate early without purchase authority or fake-live claims. |
| Q-354 | What evidence supports wider demand, repeat subscription value, willingness to pay, acceptable ads, and sustainable costs? | OPEN — owner acceptance alone is not commercial validation. |
| Q-355 | Can reservation rules/windows/routes and relevant availability be obtained with adequate freshness and coverage? | OPEN — prior access examples are not provider tests. |
| Q-356 | Can we find genuinely appealing, timely local events including festivals/pop-ups for a bounded area/time, and measure both valid results and known suitable events missed? | NEW OPEN risk — D-018 makes this central. Check occurrence dates, expiry/cancellation, duplicates, sources, entry feasibility, and retrieval-versus-verification time. No source guarantees yet. |

## Sections 6–8 — System, Dependencies, API Capabilities

| ID | Question | Status |
| --- | --- | --- |
| Q-401 | Which platform, structure, storage, identity, AI, and providers fit the approved product/free-first approach? | OPEN — budget and standards do not choose a stack. |
| Q-402 | Where do places, dated event occurrences, accommodation, prices, transport, reservation information, and booking status come from? How reconcile conflicts and distinguish retrieved, verified, estimated, and user-entered facts? | OPEN — no provider or freshness authority selected. |
| Q-403 | Terms, rights, attribution, storage limits, coverage, freshness, free quotas, expiry/auto-billing, and cost? | OPEN — prior price references need current verification before selection/spend. |
| Q-404 | Concepts/states for venues versus event occurrences, saved/scheduled items, stays, legs, local time, reservations/payments, budgets, and published versions? | OPEN — candidate distinctions, not schema approval. |
| Q-405 | Performance, reliability, accessibility, privacy/location consent, retention/deletion, abuse/usage controls, and recovery? | OPEN — no continuous tracking, fixed cutoff, or exact response/freshness targets selected. |
| Q-406 | What backend capabilities support the approved pre-trip and same-day journeys? | OPEN — Section 8. |
| Q-407 | Pilot delivery and commercial app-store/SaaS path; applicable billing/ad requirements? | OPEN — verify when relevant; web-first remains proposal. |

## Sections 9–15 — Delivery and Handoff

| ID | Question | Status |
| --- | --- | --- |
| Q-501 | First buildable slice and risk it addresses? | OPEN — quality/current-data risk now informs selection, not authorization to code. |
| Q-502 | Acceptance, permissions, contracts, data changes, failures? | OPEN — translate D-018 into agreed checks; do not invent thresholds. |
| Q-503 | Real versus simulated components, what each test proves, replacement trigger? | OPEN — prepared events cannot establish real-time usefulness. |
| Q-504 | Tests, migrations, restoration, monitoring, recovery? | OPEN — do not omit essential protections to remain free. |
| Q-505 | How do feedback, decisions, changes, and paid reviews update the plan? | OPEN — no automatic purchase authority. |
| Q-506 | Has design completion/implementation transition been approved? | OPEN — target, policy, and priorities do not approve transition. |

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

## Resolution procedure

Update active sections and decision records together. Preserve history and record explicit deferrals with reasons/owners/triggers. No section approval without the owner's approval. Do not equate a priority answer with successful testing.

**Current next step:** Ask for one appealing and one rejectable experience with reasons under Q-006. Keep discussion at product level; do not research actual trip attractions or choose providers unless requested or needed for the later evidence question. Preserve existing free-first policy and capability choices. Remaining currency, category, capacity, separate-cost, and full-promise questions stay open. Private trip details stay in chat.
