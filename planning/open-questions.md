# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next question to discuss:** Q-005 — what must the first working version do well to meet the owner's standards and justify greater investment? Q-004's spending policy is resolved by D-017; remaining capacity and specific expense decisions stay open.

Questions are grouped by their relevant blueprint stage. Later-stage questions are parked for sequencing; this does not mean the owner has approved deferring the associated feature from the release. Do not implement an unanswered question as an assumed default.

## Section 1 — Active product-brief questions

Ask and resolve these one at a time. Use existing answers before asking for information again. The listed options are examples, not forced choices.

**Already answered:** Japan pilot first; commercial app-store/SaaS ambitions with subscription/ad revenue ultimately. The pilot is for a couple, two travelers total. Hotels and transportation require both existing-booking organization and recommendations in the first version. Tokyo and private travel values have been supplied. **November 10, 2026 is approved for the first complete test.** The trip-spending range excludes plane tickets and is per person. Account for reservation-dependent events and restaurants. **Build free first until spending is necessary; retain flexible $100/month and $150 app-operation references, not a fixed ceiling, and consider more investment once a working product meets the owner's standards.** See D-006 through D-017. Do not re-ask these choices.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-005 | What must the first version do well for the owner to consider it successful and worth further investment? Does the complete pilot promise reflect those standards? | Defines the owner's quality expectations and the investment gate in D-017 before later measurable acceptance tests. | NEXT — individual capability requirements are confirmed; full promise, standards, and acceptance remain OPEN. Ask about the most important outcomes/deal-breakers, not every detailed test at once. |
| Q-004 | What development-tool/one-time costs, available development time, and maintenance constraints remain? When an actual paid dependency appears, what specific expense and usage limit should be approved? | Keeps capacity and future cost decisions separate from the now-confirmed free-first policy. | PARTIALLY RESOLVED — test target under D-012 and spending policy under D-017. No need to choose a fixed monthly ceiling; flexibility is intentional. Capacity, separate costs, and actual purchases remain OPEN. |
| Q-011 | What is the travel-budget currency? Does the supplied per-person range cover total or remaining trip spending, and which non-airfare categories are included? | Prevents incorrect allocations without re-asking the per-person basis. | PARTIALLY ANSWERED — private bounds, plane-ticket exclusion, and per-person basis supplied (D-014/D-016); currency, total/remaining meaning, and categories OPEN. App-budget flexibility does not resolve travel-budget rules. |
| Q-006 | What real planning examples, observed frustrations, or tester access can inform the problem hypothesis? Which pain point is most important? | Separates concept and requirements from evidence of user value. | OPEN — trip context and requirements are not completed research |
| Q-008 | How will the pilot be tested, how will the companion participate, and how should later external testers or customers find the product? | Distinguishes first-use testing from broader validation and acquisition. | PARTIALLY ANSWERED — owner will test on Japan trip with one companion; app-testing participation, external testing, and acquisition OPEN |
| Q-010 | Which broader commercial audience should the service eventually target? | Keeps a two-person pilot separate from a permanent couples-only segment or limit. | OPEN — split from Q-003; do not re-ask the pilot group |
| Q-001 | Is OnToTheNext intended to be the app name, or only the repository name? | Avoids treating a repository label as an approved brand. | OPEN — not a reason to block product planning |

The one-sentence description, problem statement, positioning, evidence gaps, non-goals, and long-term vision also require review before the section is approved. An answer to one question does not automatically approve the rest of the brief.

**Timing clarification:** The first complete test target is approved. It is a software milestone, not a public-launch date or a guarantee that unestimated scope is feasible. The pilot uses the 2026 planning calendar and spans a month boundary. Arrival/departure times were supplied in Tokyo local time and stay private in the conversation. They do not establish airports, transfers, hotel nights, hotel-ready times, or full activity days. Tokyo is included; additional destinations remain open.

**Travel-budget clarification:** The supplied range is per person, not a combined two-person allowance. Keep private numerical bounds in chat; do not re-ask or publish them. Currency and inclusions remain open. The input is not a hosting/API/AI allowance, an equal-split rule, or permission to spend. No category allocation, conversion, hard upper cap, or minimum-spend behavior is approved.

**App-budget policy — resolved:** D-017 accepts the earlier recommendation with modifications. Use suitable free options and aim for no additional app-service costs until spending is necessary. $100/month is a flexible initial paid-operation target, with $150 retained as an upper reference, **not a fixed ceiling, required spend, or automatic cutoff**. No paid tier or service is activated. Before an expense, present the blocked requirement, free alternatives, cost/overage assumptions, and consequence of waiting for a specific decision. Greater discretionary spending follows a working product meeting the owner's standards; a limited necessary earlier expense is a separate decision. No purchase is authorized by the policy alone.

**Acceptance clarification:** D-017 does not say the product already meets the owner's standards. Q-005 defines the high-level expectations; Q-304/Q-502 will later define observable checks. Prepared data, mock tests, visual polish, or the test date alone are not acceptance. Candidate discussion areas include useful recommendations, realistic schedules, hotel/transport/reservation clarity, usability, reliable saved work, and companion presentation; these are prompts, not an approved checklist.

**Cost reference status:** [App Budget Policy and Options](00-app-budget-options.md) retains the earlier $0–$50, $75–$150, $150–$400, and $400–$1,500+ USD scenarios and source references. They are not an upgrade schedule, provider choice, build quote, or capacity promise. The old fixed-ceiling recommendation is superseded. This policy update does not refresh price research; re-verify terms and prices before selection. Development tools, one-time costs, and unpriced data contracts remain separate. Section 7 is not started by the supporting cost note.

**Reservation clarification:** D-015 requires consideration of events/restaurants needing reservations. Exact labels, booking states, release windows, sources, schedule locks, alternatives, costs, reminders, and transactions remain open. Unknown availability is not a secured reservation. Planning around a booking is different from making it.

Detailed monetization is parked in Q-306, commercial validation in Q-354, and platform questions in Q-401/Q-407. Free-first does not silently defer either hotel/transport support path, discard reservation consideration, permit unsafe data handling, or establish that all necessary data is free. Raise a cost/scope conflict explicitly. Local and simulated prototypes are experiments, not automatically the finished pilot.

## Section 2 — Users, Roles, and Ownership

| ID | Question | Status |
| --- | --- | --- |
| Q-101 | Can companions only view, suggest changes for approval, or directly edit? Who owns and controls the itinerary? | OPEN — parked for Section 2; couple status does not decide permissions |
| Q-102 | Do organizers and companions need accounts, and when? | OPEN — parked for Section 2 |
| Q-103 | How are trips shared: anyone-with-link, invited recipients, or another model? How can access be revoked? | OPEN — parked for Section 2 |
| Q-104 | Who can publish, delete, invite, or remove access? Can ownership transfer? | OPEN — parked for Section 2 |
| Q-105 | Which information is private to the organizer, and what may companions see, including bookings and spending details? | OPEN — parked for Section 2 |
| Q-106 | Does the organizer enter group preferences, do companions provide their own, or is input combined? | OPEN — parked for Section 2; two travelers does not imply identical preferences |

## Section 3 — User Journeys and Interface Behavior

| ID | Question | Status |
| --- | --- | --- |
| Q-201 | Which trip basics are required initially, and is date-free exploration supported? How are local times, usable activity windows, and trip-budget inputs represented? | OPEN for behavior — supplied timing, numerical bounds, and per-person basis are already in chat |
| Q-202 | Can users choose a country/state, jump directly to a city, or plan multiple destinations? | OPEN — Tokyo confirmed for pilot; Tokyo-only is not |
| Q-203 | What precisely do Keep, Replace, Must-do, Lock, and Undo mean? | OPEN — parked for Section 3 |
| Q-204 | Which card details are required, how are unknowns labeled, and what optional rejection feedback is collected? | OPEN — include reservation needs from D-015 without inventing a status schema |
| Q-205 | Does sharing expose a snapshot, all edits, or explicitly published updates? What stays in a draft? | OPEN — coordinated with Section 2 permissions |
| Q-206 | What is the minimum reveal experience, and how do recipients reach the practical itinerary directly? | OPEN — parked for Section 3 |
| Q-207 | How do Replace this activity and Find something to do now differ, and how are changes previewed? | OPEN — include confirmed reservations; release inclusion in Section 4 |
| Q-208 | What happens on save failure, interruption, refresh, back navigation, or loss of access? | OPEN — parked for Section 3 |
| Q-209 | How do travelers add hotel/transport bookings, choose recommendations, see them alongside activities, and review changes? Which entry methods, local times, buffers, costs, statuses, and handoffs are needed? | OPEN for detail — both paths confirmed; no import/provider/transfer/transaction mechanism selected |
| Q-210 | How should event/restaurant reservation requirements, booking windows, booking/payment states, and tentative/confirmed commitments appear? What happens when availability is unknown or a reservation cannot be secured? | OPEN for detail — D-015 confirms consideration; sources, state model, booking actions, locks, alternatives, and reminders undecided |
| Q-211 | How should budget bounds, currency, per-person/group basis, exclusions, paid/remaining totals, shared costs, deposits, unknown prices, and over-budget tradeoffs be represented? | OPEN for detail — preserve D-014/D-016; no travel hard cap, daily allowance, equal-split rule, or formula selected. D-017 addresses app costs, not traveler cost rules. |

## Section 4 — First-Release Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | What additional destinations, local-day coverage, languages, devices, and broader trip/group limits are needed? | PARTIALLY ANSWERED — Japan/Tokyo, two travelers, 2026 calendar, month-spanning travel, and partial-day context supplied; remaining coverage OPEN |
| Q-302 | What hotel/transport modes and coverage are needed for both support paths? How are remaining capabilities allocated across tests, pilot, commercial release, and backlog? | PARTIALLY ANSWERED — both paths required; modes, coverage, reservation detail, and allocation OPEN. Free-first does not reduce confirmed scope. |
| Q-303 | Are multi-city travel, voting, advanced replanning, and in-app booking/payments excluded initially? Which multi-city and reservation needs arise from the pilot? | OPEN — exclusions are not approved; considering reservations is not making them |
| Q-304 | What observable outcomes define a successful full test and a product meeting the owner's standards? Which usability, schedule-quality, reliability, effort, and cost measures are tracked? | OPEN — milestone approved under D-012 and investment gate under D-017; Q-005 supplies high-level standards first. No fixed user-capacity promise or automatic acceptance. |
| Q-305 | What does realistic scheduling promise about hotel/transport constraints, local times, partial days, airport/transfer buffers, and reserved events/meals? Which unknowns require disclosure or manual checks? | OPEN — buffers, protection, tentative-plan handling, and guarantees unapproved |
| Q-306 | When should subscriptions and ads be implemented? What pricing, intervals, tiers, trials, placements, and ad-free behavior fit the release? | OPEN — revenue intent confirmed; free-first development is not automatic exclusion of monetization features |
| Q-307 | What minimum reservation-aware behavior must the pilot demonstrate? Are links, manual status entry, deadlines, reminders, availability checks, or booking transactions included? | OPEN — D-015 requires consideration, not all listed mechanisms |
| Q-308 | What minimum range-budget support is needed? Which categories, currencies, estimates, shared costs, paid amounts, and warnings must work? | OPEN — D-014/D-016 apply; numerical pilot values are not product-wide limits |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What observation would support or challenge the value of personalized sharing? | OPEN — parked for Section 5 |
| Q-352 | What samples and manually checked itineraries should test hotel/transport organization and recommendations, reservations, and budgets? | OPEN — use synthetic public examples for private dates/times/spending/bookings; include partial days, unknown prices, and unconfirmed reservations |
| Q-353 | What risks must be resolved, including necessary paid dependencies and limits of free options? What are the test/fallback criteria? | OPEN — investigate early without assuming free coverage or paid authorization. Cost comparison is not provider testing; simulated success does not prove real behavior. |
| Q-354 | Beyond the owner's pilot, what evidence is needed for demand, recurring subscription value, willingness to pay, acceptable ads, and sustainable costs? | OPEN — commercial objective and owner satisfaction are not validated revenue |
| Q-355 | Can reservation rules, booking windows, trusted routes, and availability data be obtained with suitable coverage/freshness? What is the fallback? | OPEN — no live tests/booking verification; prior partner-access example is not selected access. Surface necessary paid access before depending on it. |

## Sections 6–8 — System, Dependencies, and API Capabilities

| ID | Question | Status |
| --- | --- | --- |
| Q-401 | Which platform, application structure, storage, identity, AI, and external providers fit the product and free-first approach? | OPEN — no stack/vendor selected; Section 7; budget policy does not select architecture |
| Q-402 | Where do place/event/accommodation data, prices, opening/routing/timetables, reservation windows, and booking status come from? | OPEN — distinguish user-entered claims, estimates, simulated data, and verified provider data |
| Q-403 | What terms, storage/media restrictions, attribution, coverage, freshness, limits, free allowances, expiry/auto-billing, and cost apply? | OPEN — prior price/access sources in cost note need full evaluation and re-verification before selection or spend |
| Q-404 | Which concepts and states are needed for saved/scheduled items, stays, transport legs, local date/time, reservation versus booking/payment state, budget ranges, and published versions? | OPEN — Section 6; not an approved schema |
| Q-405 | What performance, reliability, accessibility, privacy, retention, deletion, abuse, usage-limit, and recovery controls are required? | OPEN — flexible budget is not unlimited use or a hardcoded $150 cutoff. Preserving itinerary access when optional generation pauses remains a proposed test. |
| Q-406 | Which backend capabilities support approved journeys? | OPEN — Section 8 |
| Q-407 | How will the pilot be delivered, and which app-store/SaaS path should the commercial product use? What billing/ad requirements apply? | OPEN — verify current sources when relevant; web-first remains a proposal, not a consequence of D-017 |

## Sections 9–15 — Delivery Planning and Handoff

| ID | Question | Status |
| --- | --- | --- |
| Q-501 | What is the first approved buildable slice, and what outcome/risk does it address? | OPEN — Section 9; free-first does not authorize coding before design approval |
| Q-502 | What acceptance criteria, permissions, contracts, data changes, and failure behavior define it? | OPEN — Sections 10–13; translate owner standards into tests rather than inventing acceptance |
| Q-503 | What is real versus simulated, what does each test prove, and when is a simulation replaced? | OPEN — Section 12; no fake-live data or silently incomplete travel-ready claims |
| Q-504 | What tests, migrations, restoration, monitoring, and recovery conditions are required? | OPEN — Sections 13–14; do not omit essential protection to maintain a free label |
| Q-505 | How will feedback, decisions, changes, and any paid-service reviews update the plan? | OPEN — Section 15; no automatic purchase authority |
| Q-506 | Has the owner approved design completion and transition to implementation? | OPEN — target, cost policy, and feature choices do not approve this transition |

## Resolved questions and recorded inputs

| ID | Question | Answer | Record |
| --- | --- | --- | --- |
| R-001 | What is the primary use case? | Organizer plans a trip they take and shares with companions. | D-002 |
| R-002 | Which planning process? | Adopted blueprint, sequentially in this chat. | D-001 |
| R-003 | Where is planning maintained? | `fgzmac/OnToTheNext`. | D-004 |
| R-004 | When does Codex implementation begin? | After design and explicit transition approval; not yet authorized. | D-003 |
| Q-002 | Primary project objective/priority? | Japan pilot first; commercial app-store/SaaS launch ultimately. | D-006/D-007 — resolved 2026-09-19 |
| Q-007 | Revenue direction? | Subscriptions and ads; details remain Q-306/Q-407. | D-007 — resolved 2026-09-19 |
| Q-003 | Initial group/count? | Couple, two travelers; broader targeting Q-010. | D-008 — resolved 2026-09-19 |
| Q-009 | Existing hotel/transport bookings or recommendations? | Both for both areas. | D-010 — resolved 2026-09-19 |
| Q-004 (timing) | First-test target and local travel timing? | November 10, 2026 approved; private travel values already in chat. | D-012/D-013 — recorded 2026-09-19 |
| R-005 | Trip range and exclusion supplied? | Yes; private bounds excluding plane tickets, later clarified per person. Remaining currency/meanings Q-011. | D-014/D-016 |
| R-006 | Account for reservation-required events/restaurants? | Yes; details Q-210/Q-307, no transaction/reminder authorization. | D-015 |
| Q-011 (basis) | Combined or per-person travel range? | Per person. | D-016 — resolved 2026-09-19 |
| Q-004 (spending policy) | Adopt or revise recommended app-budget rule? | Free first until spending is necessary. $100/month and $150 remain flexible paid-operation references, not a fixed ceiling or current spending. More investment follows a working product meeting owner standards; any paid commitment needs a specific decision. | D-017 — resolved 2026-09-19; capacity, separate costs, and future purchases remain open |

## Resolution procedure

Record each answer in the active section and explicit choices in the decision register. Preserve history when resolving a question. For intentional deferral, record the reason, owner, and review trigger. Do not call a section approved until the owner approves it.

**Current next step:** Ask under Q-005 what the app must do well for the owner to consider the first version successful. This makes the quality gate in D-017 meaningful while remaining in Section 1. Do not re-ask for a fixed budget or re-approve the free-first approach. Remaining currency/category, capacity, one-time/tool costs, and later specific paid-service decisions stay open. Keep private travel/financial values out of the public repository; do not infer purchases or platform choices from this policy.
