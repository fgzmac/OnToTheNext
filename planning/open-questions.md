# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next question to discuss:** Q-004 — choose or revise the monthly app operating target and ceiling after reviewing the requested tiers. Travel-budget per-person basis is answered (D-016); remaining currency/category questions remain under Q-011.

Questions are grouped by their relevant blueprint stage. Later-stage questions are parked for sequencing; this does not mean the owner has approved deferring the associated feature from the release. Do not implement an unanswered question as an assumed default.

## Section 1 — Active product-brief questions

Ask and resolve these one at a time. Use existing answers before asking for information again. The listed options are examples, not forced choices.

**Already answered:** The immediate goal is developing and testing for the Japan trip; the ultimate goal is commercial app-store or SaaS launch with subscription and ad revenue. The pilot audience is a couple: two travelers total. Both hotels and transportation require existing-booking organization and recommendations in the first version. Tokyo and private travel date/time values have been supplied. **November 10, 2026 is approved for the first complete test.** A low/high trip-spending range excluding plane tickets was supplied and is now confirmed as **per person**. Planning must account for reservation-dependent events and restaurants. See D-006 through D-016. Do not re-ask supplied inputs or confirmed capability choices.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-004 | Which monthly app operating tier, normal target, and ceiling should guide the pilot? What remaining development-tool, one-time cost, development-time, and maintenance constraints apply? | Assesses scope and service choices against the approved target without mixing app costs and trip spending. | PARTIALLY ANSWERED — timing settled; owner requested tiers/pros/cons. Researched options are in 00-app-budget-options.md. $100 normal target / $150 monthly ceiling is PROPOSED, excluding stated separate costs; no budget or vendor approved. Next discuss this operating envelope only. |
| Q-011 | What is the travel-budget currency? Does the supplied per-person range cover total or remaining trip spending, and which non-airfare categories are included? | Prevents incorrect allocations without re-asking the now-confirmed per-person basis. | PARTIALLY ANSWERED — private bounds, plane-ticket exclusion, and per-person basis supplied (D-014/D-016); currency, total/remaining meaning, and categories OPEN. USD in the app-cost note does not answer travel currency. |
| Q-005 | Is the proposed pilot promise the right high-level outcome? What must be protected, including hotel/transport support, trip-budget inputs, and reservation-dependent events/restaurants? | Aligns on the complete experience before detailed scope. | PARTIALLY ANSWERED — individual requirements apply; the complete promise is not approved |
| Q-006 | What real planning examples, observed frustrations, or tester access can inform the problem hypothesis? Which pain point is most important? | Separates concept and requirements from evidence of user value. | OPEN — trip context and requirements are not completed research |
| Q-008 | How will the pilot be tested, how will the companion participate, and how should later external testers or customers find the product? | Distinguishes first-use testing from broader validation and acquisition. | PARTIALLY ANSWERED — owner will test on Japan trip with one companion; app-testing participation, external testing, and acquisition OPEN |
| Q-010 | Which broader commercial audience should the service eventually target? | Keeps a two-person pilot separate from a permanent couples-only segment or limit. | OPEN — split from Q-003; do not re-ask the pilot group |
| Q-001 | Is OnToTheNext intended to be the app name, or only the repository name? | Avoids treating a repository label as an approved brand. | OPEN — not a reason to block product planning |

The one-sentence description, problem statement, positioning, evidence gaps, non-goals, and long-term vision also require review before the section is approved. An answer to one question does not automatically approve the rest of the brief.

**Timing clarification:** The first complete test target is approved, not merely proposed. It is a software milestone, not a public-launch date or a guarantee that unestimated scope is feasible. The pilot uses the 2026 planning calendar and spans a month boundary. Arrival/departure clock times were supplied in Tokyo local time and stay private in the conversation. They do not establish airports, transfer durations, hotel nights, hotel-ready times, or full activity days. Tokyo is included; additional destinations remain open.

**Travel-budget clarification:** The owner has confirmed the supplied range is per person, not a combined two-person allowance. Keep private numerical bounds in chat; do not re-ask or publish them. Currency and other inclusions remain open. This is not a hosting/API/AI allowance or permission to spend. The per-person input does not require every shared expense to be split equally or counted twice. No category allocation, currency conversion, hard upper cap, or minimum-spend behavior is approved.

**App-budget comparison:** The owner requested different tiers, possibilities, and pros/cons rather than selecting a dollar amount. The [Section 1 supporting note](00-app-budget-options.md) compares monthly USD operating envelopes of $0–$50, $75–$150, $150–$400, and $400–$1,500+. The recommended pilot proposal is $100/month normal target and $150/month ceiling, separate from development tools, one-time costs, and unpriced data contracts. Published reference prices are distinguished from hypothetical allowances. This is not a build quote, capacity guarantee, provider choice, spending authorization, or approval to provision infrastructure. Provider access and Japan data coverage remain to be tested. Section 7 is not started by this targeted budget research.

**Reservation clarification:** D-015 confirms that planning must account for events/restaurants requiring reservations. Exact requirement labels, booking states, release windows, sources, schedule locks, alternatives, costs, reminders, and transaction handling remain open. Unknown availability is not a secured reservation. Keep consideration of requirements separate from actually making bookings.

Detailed monetization is parked in Q-306, commercial validation in Q-354, and delivery/platform questions in Q-401/Q-407. Confirmed capabilities do not authorize transactions, provider selection, or private-data imports. Do not silently defer either selected hotel/transport path or discard reservation consideration. A lean prototype in the budget comparison is an interim experiment, not a replacement for the confirmed pilot capabilities.

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
| Q-201 | Which trip basics are required initially, and is date-free exploration supported? How are local times, usable activity windows, and trip-budget inputs represented? | OPEN for behavior — supplied pilot timing, numerical budget bounds, and per-person basis are already in chat, not missing inputs |
| Q-202 | Can users choose a country/state, jump directly to a city, or plan multiple destinations? | OPEN — Tokyo confirmed for pilot; Tokyo-only is not |
| Q-203 | What precisely do Keep, Replace, Must-do, Lock, and Undo mean? | OPEN — parked for Section 3 |
| Q-204 | Which card details are required, how are unknowns labeled, and what optional rejection feedback is collected? | OPEN — include reservation-information needs from D-015 without inventing a status schema |
| Q-205 | Does sharing expose a snapshot, all edits, or explicitly published updates? What stays in a draft? | OPEN — coordinated with Section 2 permissions |
| Q-206 | What is the minimum reveal experience, and how do recipients reach the practical itinerary directly? | OPEN — parked for Section 3 |
| Q-207 | How do Replace this activity and Find something to do now differ, and how are proposed changes previewed? | OPEN — include treatment of confirmed reservations; release inclusion in Section 4 |
| Q-208 | What happens on save failure, interruption, refresh, back navigation, or loss of access? | OPEN — parked for Section 3 |
| Q-209 | How do travelers add existing hotel/transport bookings, choose recommendations, see them alongside activities, and review changes? Which entry methods, local times, buffers, costs, statuses, and booking handoffs are needed? | OPEN for detail — both paths confirmed; no import/provider/transfer/transaction mechanism selected |
| Q-210 | How should event/restaurant reservation requirements, booking-opening/deadline information, booking/payment states, and tentative/confirmed commitments appear? What happens when availability is unknown or a reservation cannot be secured? | OPEN for detail — reservation consideration confirmed by D-015; sources, state model, booking actions, locks, alternatives, and reminders remain undecided |
| Q-211 | How should budget bounds, currency, per-person/group basis, exclusions, paid/remaining totals, shared costs, deposits, unknown prices, and over-budget tradeoffs be represented? | OPEN for detail — preserve D-014/D-016 inputs, including per-person basis; no hard cap, daily allowance, equal-split rule, or cost formula selected |

## Section 4 — First-Release Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | What additional destinations, actual local-day coverage, languages, devices, and broader trip/group limits must be supported beyond the confirmed pilot context? | PARTIALLY ANSWERED — Japan/Tokyo, two travelers, 2026 calendar, month-spanning travel, and partial arrival/departure context supplied; remaining coverage OPEN |
| Q-302 | What hotel/transport modes and coverage are needed for both first-version support paths? How are remaining capabilities allocated across tests, pilot, commercial release, and backlog? | PARTIALLY ANSWERED — both paths required; modes, coverage, reservation detail, and remaining allocation OPEN |
| Q-303 | Are multi-city travel, voting, advanced replanning, and in-app booking/payments excluded initially? Which multi-city and reservation-related needs arise from the pilot? | OPEN — proposed exclusions are not approved; considering reservations is not making them |
| Q-304 | Which completion, companion-usability, scheduling-quality, effort, and cost measures will be tracked? What establishes a complete test at the approved milestone? | OPEN — November 10, 2026 target approved; measurable acceptance conditions still needed; budget note proposes measuring cost per planning session, not a fixed user-capacity promise |
| Q-305 | What does realistic scheduling promise about hotel/transport constraints, local times, partial days, airport/transfer buffers, and reserved events/meals? Which unknowns require disclosure or manual checks? | OPEN — precise buffers, commitment protection, tentative-plan handling, and guarantees not approved |
| Q-306 | When should subscriptions and ads be implemented? What pricing, billing intervals, tiers, trials, placements, and ad-free behavior fit the approved release? | OPEN — intent confirmed; pilot inclusion and details not approved |
| Q-307 | What minimum reservation-aware restaurant/event behavior must the pilot demonstrate? Are booking links, manual status entry, deadlines, reminders, availability checks, or booking transactions included? | OPEN — D-015 requires consideration, not all listed mechanisms; do not silently remove requirement |
| Q-308 | What minimum range-budget support is needed for the pilot? Which categories, currencies, estimates, shared costs, paid amounts, and warnings must work? | OPEN — D-014 range/airfare exclusion and D-016 per-person basis apply; numerical pilot values are not fixed product-wide limits |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What observation would support or challenge the value of personalized sharing? | OPEN — parked for Section 5 |
| Q-352 | What real-data samples and manually checked itineraries should test hotel/transport organization and recommendations, reservations, and budget handling? | OPEN — use synthetic public examples for private dates, clock times, spending, and bookings; include partial days, unknown prices, and unconfirmed reservations as candidate cases |
| Q-353 | Which risks must be resolved before implementation, and what are their test/fallback criteria? | OPEN — do not assume reliable availability, schedules, prices, access, or feasibility within the test target; budget comparison contains reference rates, not provider tests |
| Q-354 | Beyond the owner's pilot, what evidence is needed for demand, recurring subscription value, willingness to pay, acceptable ads, and sustainable operating costs? | OPEN — commercial objective is not validated revenue |
| Q-355 | Can required restaurant/event reservation rules, booking windows, trusted booking routes, and availability data be obtained with suitable coverage/freshness? What is the fallback when they cannot? | OPEN — no live tests or booking verification completed; Section 1 cost research identifies one hotel's partner-access prerequisite as an example, not a selected provider or verified coverage |

## Sections 6–8 — System, Dependencies, and API Capabilities

| ID | Question | Status |
| --- | --- | --- |
| Q-401 | Which platform, application structure, storage, identity, AI, and external providers fit the approved product? | OPEN — no stack/vendor selected; Section 7; budget examples do not select architecture |
| Q-402 | Where do place/event/accommodation data, prices, opening/routing/timetables, reservation requirements/windows, and booking status come from as required by scope? | OPEN — Sections 6–7; distinguish user-entered claims, estimates, and verified provider data |
| Q-403 | What provider terms, storage/media restrictions, attribution, coverage, freshness, limits, and cost apply? | OPEN — initial official price/access references reviewed for Q-004 in 00-app-budget-options.md; full evaluation and re-verification still required in Section 7 |
| Q-404 | Which concepts and states are needed for saved/scheduled items, stays, transport legs, local date/time, reservation requirements versus booking/payment state, budget ranges, and published versions? | OPEN — Section 6; candidate distinctions, not an approved schema |
| Q-405 | What performance, reliability, accessibility, privacy, retention, deletion, and abuse controls are required? | OPEN — Section 7; budget note proposes usage quotas and preserved itinerary access when optional generation pauses, but no implementation approved |
| Q-406 | Which backend capabilities support approved initial journeys? | OPEN — Section 8 |
| Q-407 | How will the pilot be delivered, and which app-store/SaaS path should the commercial product use? What platform, billing, and advertising requirements apply? | OPEN — verify current primary sources when relevant; web-first is only a recommendation in the cost note; no native/web/OS/vendor choice |

## Sections 9–15 — Delivery Planning and Handoff

| ID | Question | Status |
| --- | --- | --- |
| Q-501 | What is the first approved buildable slice, and what outcome and risk does it address? | OPEN — Section 9 |
| Q-502 | What exact acceptance criteria, permissions, contracts, data changes, and failure behavior define it? | OPEN — Sections 10–13 |
| Q-503 | What is real versus simulated, and when must each simulation be replaced? | OPEN — Section 12 |
| Q-504 | What tests, quality checks, migrations, restoration, monitoring, and recovery conditions are required? | OPEN — Sections 13–14 |
| Q-505 | How will feedback, decisions, and changes update the maintained plan? | OPEN — Section 15 |
| Q-506 | Has the owner explicitly approved design completion and transition to implementation? | OPEN — accepting a test date, requesting a cost comparison, or adding a requirement did not approve this transition |

## Resolved questions and recorded inputs

| ID | Question | Answer | Record |
| --- | --- | --- | --- |
| R-001 | What is the primary use case? | An organizer plans a trip they are taking and shares it with companions. | D-002 |
| R-002 | Which planning process should be used? | Adopted blueprint, filled out sequentially in this chat. | D-001 |
| R-003 | Where will planning be maintained? | `fgzmac/OnToTheNext`. | D-004 |
| R-004 | When will Codex implementation begin? | After design and explicit transition approval; no implementation start authorized. | D-003 |
| Q-002 | What is the primary project objective and priority? | Japan pilot first; commercial app-store/SaaS launch ultimately. Separate milestones. | D-006, D-007 — resolved 2026-09-19 |
| Q-007 | What is the intended business-model direction? | Subscriptions and ads; detailed monetization remains Q-306/Q-407. | D-007 — direction resolved 2026-09-19 |
| Q-003 | What is the initial group and traveler count? | Couple, two travelers; broader target is separately Q-010. | D-008 — resolved 2026-09-19 |
| Q-009 | Existing hotel/transport bookings, recommendations, or both? | Both for both areas. Details remain separate. | D-010 — resolved 2026-09-19 |
| Q-004 (timing) | What is the first-test target, and was local travel timing supplied? | November 10, 2026 approved; private date/time values already in chat. App budget/capacity remain open. | D-012, D-013 — recorded 2026-09-19 |
| R-005 | Has a trip-spending range and exclusion been supplied? | Yes: private low/high dollar-denominated bounds, excluding plane tickets. D-016 subsequently establishes per person; currency and other meanings still Q-011. Not a monthly app budget. | D-014 — input recorded 2026-09-19; D-016 clarification |
| R-006 | Must planning account for events/restaurants requiring reservations? | Yes. Details in Q-210/Q-307; no transaction/reminder authorization. | D-015 — confirmed 2026-09-19 |
| Q-011 (basis) | Is the supplied travel range combined or per person? | Per person. Do not re-ask; currency and category treatment remain separate. | D-016 — resolved 2026-09-19 |

## Resolution procedure

Record each answer in the active section. Add an explicit choice to the decision register. Mark the matching question answered while preserving history. For intentional deferral, record the reason, owner, and review trigger. Do not call a section approved until the owner approves it.

**Current next step:** Review the requested app-budget comparison and ask whether to adopt or revise the proposed $100 monthly operating target and $150 ceiling, with development tools and other stated exclusions separate. This is Q-004, not a re-ask of the travel budget. Q-011's per-person portion is answered. Remaining currency/categories, one-time costs, and capacity stay visible for later discussion. Keep private financial and travel details out of the public repository, and do not silently approve any spending or platform choice.
