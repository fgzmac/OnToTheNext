# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next question to discuss:** Q-011 — trip-budget currency and whether the supplied range covers both travelers combined or each person. Q-004's monthly app-running budget remains unanswered.

Questions are grouped by their relevant blueprint stage. Later-stage questions are parked for sequencing; this does not mean the owner has approved deferring the associated feature from the release. Do not implement an unanswered question as an assumed default.

## Section 1 — Active product-brief questions

Ask and resolve these one at a time. Use existing answers before asking for information again. The listed options are examples, not forced choices.

**Already answered:** The immediate goal is developing and testing for the Japan trip; the ultimate goal is commercial app-store or SaaS launch with subscription and ad revenue. The pilot audience is a couple: two travelers total. Both hotels and transportation require existing-booking organization and recommendations in the first version. Tokyo and private travel date/time values have been supplied. **November 10, 2026 is approved for the first complete test.** The owner has now supplied a low/high dollar-denominated spending range excluding plane tickets and instructed us to account for reservation-dependent events and restaurants. See D-006 through D-015. Do not re-ask supplied inputs or confirmed capability choices.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-011 | Is the supplied trip-budget range in U.S. dollars, and is it for both travelers combined or per person? Does it cover total or remaining trip spending, and which non-airfare categories are included? | Prevents incorrect cost allocations. The dollar sign does not establish currency, and a two-person trip does not establish a shared budget. | PARTIALLY ANSWERED — range bounds and plane-ticket exclusion supplied in chat (D-014); next clarify currency and combined/per-person basis only |
| Q-004 | What monthly budget is available for running and testing the app? What remaining one-time cost, development-time, and maintenance constraints apply? | Assesses scope and service choices against the approved target without mixing app costs and trip spending. | PARTIALLY ANSWERED — target/timing settled; app budget/capacity OPEN. The airfare-excluded trip range is not an answer to monthly app costs. Return after the immediate Q-011 clarification. |
| Q-005 | Is the proposed pilot promise the right high-level outcome? What must be protected, including hotel/transport support, trip-budget inputs, and reservation-dependent events/restaurants? | Aligns on the complete experience before detailed scope. | PARTIALLY ANSWERED — individual requirements apply; the complete promise is not approved |
| Q-006 | What real planning examples, observed frustrations, or tester access can inform the problem hypothesis? Which pain point is most important? | Separates concept and requirements from evidence of user value. | OPEN — trip context and requirements are not completed research |
| Q-008 | How will the pilot be tested, how will the companion participate, and how should later external testers or customers find the product? | Distinguishes first-use testing from broader validation and acquisition. | PARTIALLY ANSWERED — owner will test on Japan trip with one companion; app-testing participation, external testing, and acquisition OPEN |
| Q-010 | Which broader commercial audience should the service eventually target? | Keeps a two-person pilot separate from a permanent couples-only segment or limit. | OPEN — split from Q-003; do not re-ask the pilot group |
| Q-001 | Is OnToTheNext intended to be the app name, or only the repository name? | Avoids treating a repository label as an approved brand. | OPEN — not a reason to block product planning |

The one-sentence description, problem statement, positioning, evidence gaps, non-goals, and long-term vision also require review before the section is approved. An answer to one question does not automatically approve the rest of the brief.

**Timing clarification:** The first complete test target is approved, not merely proposed. It is a software milestone, not a public-launch date or a guarantee that unestimated scope is feasible. The pilot uses the 2026 planning calendar and spans a month boundary. Arrival/departure clock times were supplied in Tokyo local time and stay private in the conversation. They do not establish airports, transfer durations, hotel nights, hotel-ready times, or full activity days. Tokyo is included; additional destinations remain open.

**Budget clarification:** The preceding question was about monthly app costs, but the owner's reply excluded plane tickets. Treat that as trip spending (D-014), not an app-running allowance. Numerical bounds were already supplied in chat; do not ask for them again or publish them. Currency, combined/per-person basis, and other meanings remain open. No paid service, hosting budget, AI budget, category allocation, currency conversion, or purchase is approved. Do not treat the lower bound as a required spend or upper bound as permission to spend; exact enforcement needs a decision. Q-004 remains unanswered for app costs, not zero or resolved.

**Reservation clarification:** D-015 confirms that planning must account for events/restaurants requiring reservations. Exact requirement labels, booking states, release windows, sources, schedule locks, alternatives, costs, reminders, and transaction handling remain open. Unknown availability is not a secured reservation. Keep consideration of requirements separate from actually making bookings.

Detailed monetization is parked in Q-306, commercial validation in Q-354, and delivery/platform questions in Q-401/Q-407. Confirmed capabilities do not authorize transactions, provider selection, or private-data imports. Do not silently defer either selected hotel/transport path or discard reservation consideration.

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
| Q-201 | Which trip basics are required initially, and is date-free exploration supported? How are local times, usable activity windows, and trip-budget inputs represented? | OPEN for behavior — supplied pilot timing and numerical budget bounds are already in chat, not missing inputs |
| Q-202 | Can users choose a country/state, jump directly to a city, or plan multiple destinations? | OPEN — Tokyo confirmed for pilot; Tokyo-only is not |
| Q-203 | What precisely do Keep, Replace, Must-do, Lock, and Undo mean? | OPEN — parked for Section 3 |
| Q-204 | Which card details are required, how are unknowns labeled, and what optional rejection feedback is collected? | OPEN — include reservation-information needs from D-015 without inventing a status schema |
| Q-205 | Does sharing expose a snapshot, all edits, or explicitly published updates? What stays in a draft? | OPEN — coordinated with Section 2 permissions |
| Q-206 | What is the minimum reveal experience, and how do recipients reach the practical itinerary directly? | OPEN — parked for Section 3 |
| Q-207 | How do Replace this activity and Find something to do now differ, and how are proposed changes previewed? | OPEN — include treatment of confirmed reservations; release inclusion in Section 4 |
| Q-208 | What happens on save failure, interruption, refresh, back navigation, or loss of access? | OPEN — parked for Section 3 |
| Q-209 | How do travelers add existing hotel/transport bookings, choose recommendations, see them alongside activities, and review changes? Which entry methods, local times, buffers, costs, statuses, and booking handoffs are needed? | OPEN for detail — both paths confirmed; no import/provider/transfer/transaction mechanism selected |
| Q-210 | How should event/restaurant reservation requirements, booking-opening/deadline information, booking/payment states, and tentative/confirmed commitments appear? What happens when availability is unknown or a reservation cannot be secured? | OPEN for detail — reservation consideration confirmed by D-015; sources, state model, booking actions, locks, alternatives, and reminders remain undecided |
| Q-211 | How should budget bounds, currency, per-person/group basis, exclusions, paid/remaining totals, shared costs, deposits, unknown prices, and over-budget tradeoffs be represented? | OPEN for detail — preserve D-014 inputs; resolve Q-011 basis before allocations; no hard cap, daily allowance, or cost formula selected |

## Section 4 — First-Release Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | What additional destinations, actual local-day coverage, languages, devices, and broader trip/group limits must be supported beyond the confirmed pilot context? | PARTIALLY ANSWERED — Japan/Tokyo, two travelers, 2026 calendar, month-spanning travel, and partial arrival/departure context supplied; remaining coverage OPEN |
| Q-302 | What hotel/transport modes and coverage are needed for both first-version support paths? How are remaining capabilities allocated across tests, pilot, commercial release, and backlog? | PARTIALLY ANSWERED — both paths required; modes, coverage, reservation detail, and remaining allocation OPEN |
| Q-303 | Are multi-city travel, voting, advanced replanning, and in-app booking/payments excluded initially? Which multi-city and reservation-related needs arise from the pilot? | OPEN — proposed exclusions are not approved; considering reservations is not making them |
| Q-304 | Which completion, companion-usability, scheduling-quality, effort, and cost measures will be tracked? What establishes a complete test at the approved milestone? | OPEN — November 10, 2026 target approved; measurable acceptance conditions still needed |
| Q-305 | What does realistic scheduling promise about hotel/transport constraints, local times, partial days, airport/transfer buffers, and reserved events/meals? Which unknowns require disclosure or manual checks? | OPEN — precise buffers, commitment protection, tentative-plan handling, and guarantees not approved |
| Q-306 | When should subscriptions and ads be implemented? What pricing, billing intervals, tiers, trials, placements, and ad-free behavior fit the approved release? | OPEN — intent confirmed; pilot inclusion and details not approved |
| Q-307 | What minimum reservation-aware restaurant/event behavior must the pilot demonstrate? Are booking links, manual status entry, deadlines, reminders, availability checks, or booking transactions included? | OPEN — D-015 requires consideration, not all listed mechanisms; do not silently remove requirement |
| Q-308 | What minimum range-budget support is needed for the pilot? Which categories, currencies, estimates, shared costs, paid amounts, and warnings must work? | OPEN — D-014 range/airfare exclusion apply; numerical pilot values are not fixed product-wide limits |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What observation would support or challenge the value of personalized sharing? | OPEN — parked for Section 5 |
| Q-352 | What real-data samples and manually checked itineraries should test hotel/transport organization and recommendations, reservations, and budget handling? | OPEN — use synthetic public examples for private dates, clock times, spending, and bookings; include partial days, unknown prices, and unconfirmed reservations as candidate cases |
| Q-353 | Which risks must be resolved before implementation, and what are their test/fallback criteria? | OPEN — do not assume reliable availability, schedules, prices, access, or feasibility within the test target |
| Q-354 | Beyond the owner's pilot, what evidence is needed for demand, recurring subscription value, willingness to pay, acceptable ads, and sustainable operating costs? | OPEN — commercial objective is not validated revenue |
| Q-355 | Can required restaurant/event reservation rules, booking windows, trusted booking routes, and availability data be obtained with suitable coverage/freshness? What is the fallback when they cannot? | OPEN — no provider tests or booking verification completed; do not invent deadlines, available slots, or secured bookings |

## Sections 6–8 — System, Dependencies, and API Capabilities

| ID | Question | Status |
| --- | --- | --- |
| Q-401 | Which platform, application structure, storage, identity, AI, and external providers fit the approved product? | OPEN — no stack/vendor selected; Section 7 |
| Q-402 | Where do place/event/accommodation data, prices, opening/routing/timetables, reservation requirements/windows, and booking status come from as required by scope? | OPEN — Sections 6–7; distinguish user-entered claims, estimates, and verified provider data |
| Q-403 | What provider terms, storage/media restrictions, attribution, coverage, freshness, limits, and cost apply? | OPEN — requires current primary-source verification in Section 7 |
| Q-404 | Which concepts and states are needed for saved/scheduled items, stays, transport legs, local date/time, reservation requirements versus booking/payment state, budget ranges, and published versions? | OPEN — Section 6; candidate distinctions, not an approved schema |
| Q-405 | What performance, reliability, accessibility, privacy, retention, deletion, and abuse controls are required? | OPEN — Section 7 |
| Q-406 | Which backend capabilities support approved initial journeys? | OPEN — Section 8 |
| Q-407 | How will the pilot be delivered, and which app-store/SaaS path should the commercial product use? What platform, billing, and advertising requirements apply? | OPEN — verify current primary sources when relevant; no native/web-first/OS/vendor assumption |

## Sections 9–15 — Delivery Planning and Handoff

| ID | Question | Status |
| --- | --- | --- |
| Q-501 | What is the first approved buildable slice, and what outcome and risk does it address? | OPEN — Section 9 |
| Q-502 | What exact acceptance criteria, permissions, contracts, data changes, and failure behavior define it? | OPEN — Sections 10–13 |
| Q-503 | What is real versus simulated, and when must each simulation be replaced? | OPEN — Section 12 |
| Q-504 | What tests, quality checks, migrations, restoration, monitoring, and recovery conditions are required? | OPEN — Sections 13–14 |
| Q-505 | How will feedback, decisions, and changes update the maintained plan? | OPEN — Section 15 |
| Q-506 | Has the owner explicitly approved design completion and transition to implementation? | OPEN — accepting a test date or another requirement did not approve this transition |

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
| R-005 | Has a trip-spending range and exclusion been supplied? | Yes: low/high dollar-denominated bounds in chat, excluding plane tickets. Currency/group basis still Q-011. This is not a monthly app budget. | D-014 — input recorded 2026-09-19 |
| R-006 | Must planning account for events/restaurants requiring reservations? | Yes. Details in Q-210/Q-307; no transaction/reminder authorization. | D-015 — confirmed 2026-09-19 |

## Resolution procedure

Record each answer in the active section. Add an explicit choice to the decision register. Mark the matching question answered while preserving history. For intentional deferral, record the reason, owner, and review trigger. Do not call a section approved until the owner approves it.

**Current next step:** Clarify currency and combined/per-person basis under Q-011 using the already supplied numerical range. Do not silently assume USD or a shared total. Monthly app costs under Q-004 remain unanswered; return after this immediate clarification. Keep private financial figures, exact travel details, and booking information out of the public repository. Do not re-ask confirmed requirements or jump ahead to implementation.
