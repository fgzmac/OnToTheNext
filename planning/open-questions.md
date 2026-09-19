# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next question to discuss:** Q-004 — the desired date, including year, for the first full test before the November trip.

Questions are grouped by their relevant blueprint stage. Later-stage questions are parked for sequencing; this does not mean the owner has approved deferring the associated feature from the release. Do not implement an unanswered question as an assumed default.

## Section 1 — Active product-brief questions

Ask and resolve these one at a time. Use existing answers before asking for information again. The listed options are examples, not forced choices.

**Already answered:** The immediate goal is developing and testing for a November Japan trip; the ultimate goal is commercial app-store or SaaS launch with subscription and ad revenue. The pilot audience is a couple: two travelers total, one organizer and one companion. For both hotels and transportation, the first version must organize existing bookings and recommend options before booking. See D-006 through D-010 and resolved Q-002/Q-003/Q-007/Q-009. Do not re-ask these choices.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-004 | What date, including the year, should the app be ready for the first full test before the November trip? What remaining travel-timing, budget, operating-cost, development-time, and maintenance constraints apply? | Establishes a requested readiness target without inventing a delivery guarantee or publishing a private schedule. | PARTIALLY ANSWERED — November pilot first; next ask only the readiness date/year, then address remaining constraints one at a time |
| Q-005 | Is the proposed Japan-pilot promise in the brief the right high-level outcome? What must be protected, including hotels and transportation, and what belongs only in a public release? | Aligns on the complete experience before the detailed scope section. | PARTIALLY ANSWERED — both hotel/transport organization and recommendations are included in the first version (D-010); complete promise not approved |
| Q-006 | What real planning examples, observed frustrations, or potential tester access can inform the problem hypothesis? Which pain point is most important? | Separates the owner's concept from evidence of a user need. | OPEN — Japan trip supplies a context, not completed research |
| Q-008 | How will the pilot be tested, how will the companion participate, and how should later external testers or customers find the product? | Distinguishes first-use testing from broader validation and acquisition. | PARTIALLY ANSWERED — owner will test on Japan trip with one travel companion; participation in app testing, external testing, and acquisition remain OPEN |
| Q-010 | Which broader commercial audience should the service eventually target? | Keeps a two-person pilot separate from a permanent couples-only customer segment or product limit. | OPEN — remaining commercial-audience portion split from Q-003; not a reason to re-ask the pilot group |
| Q-001 | Is OnToTheNext intended to be the app name, or only the repository name? | Avoids treating a repository label as an approved brand. | OPEN — not a reason to block product planning |

The one-sentence description, problem statement, positioning, evidence gaps, non-goals, and long-term vision also require review before the section is approved. A short answer to one question does not automatically approve the rest of the brief.

Detailed monetization choices are parked in Q-306, commercial validation in Q-354, and delivery/platform questions in Q-401/Q-407. Hotel/transport organization and recommendations do not authorize booking transactions, provider selection, or private booking-data imports. Their workflows and technical detail remain in Q-209 and later sections. Do not treat either selected capability as future-only without an explicit scope revision.

## Section 2 — Users, Roles, and Ownership

| ID | Question | Status |
| --- | --- | --- |
| Q-101 | Can companions only view, suggest changes for approval, or directly edit? Who owns and controls the itinerary? | OPEN — parked for Section 2; couple status does not decide permissions |
| Q-102 | Do organizers and companions need accounts, and when? | OPEN — parked for Section 2 |
| Q-103 | How are trips shared: anyone-with-link, invited recipients, or another model? How can access be revoked? | OPEN — parked for Section 2 |
| Q-104 | Who can publish, delete, invite, or remove access? Can ownership transfer? | OPEN — parked for Section 2 |
| Q-105 | Which information is private to the organizer, and what may companions see, including hotel/transport details and booking information? | OPEN — parked for Section 2 |
| Q-106 | Does the organizer enter group preferences, do companions provide their own, or is input combined? | OPEN — parked for Section 2; two travelers does not imply identical preferences |

## Section 3 — User Journeys and Interface Behavior

| ID | Question | Status |
| --- | --- | --- |
| Q-201 | Which trip basics are required initially, and is date-free exploration supported? | OPEN — parked for Section 3 |
| Q-202 | Can users choose a country/state, jump directly to a city, or plan multiple destinations? | OPEN — parked for Section 3; release limits in Section 4 |
| Q-203 | What precisely do Keep, Replace, Must-do, Lock, and Undo mean? | OPEN — parked for Section 3 |
| Q-204 | Which card details are required, how are unknowns labeled, and what optional rejection feedback is collected? | OPEN — parked for Section 3 |
| Q-205 | Does sharing expose a snapshot, all edits, or explicitly published updates? What stays in a draft? | OPEN — parked for Section 3, coordinated with Section 2 permissions |
| Q-206 | What is the minimum reveal experience, and how do recipients reach the practical itinerary directly? | OPEN — parked for Section 3 |
| Q-207 | How do Replace this activity and Find something to do now differ, and how are proposed changes previewed? | OPEN — parked for Section 3; release inclusion in Section 4 |
| Q-208 | What happens on save failure, interruption, refresh, back navigation, or loss of access? | OPEN — parked for Section 3 |
| Q-209 | How do travelers add existing hotel/transport bookings, receive and choose recommendations, see them alongside activities, and review the effects of a change? Which criteria, entry methods, times, costs, statuses, and booking handoffs are needed? | OPEN for detail — both support paths confirmed by D-010; no import, provider, or transaction mechanism selected |

## Section 4 — First-Release Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | Which Japanese cities, trip lengths, group sizes, date ranges, languages, and devices must the pilot support? What differs for public release? | PARTIALLY ANSWERED — Japan pilot and two travelers confirmed; wider group limits and remaining coverage OPEN |
| Q-302 | What detailed hotel/transport modes and coverage are needed for the first version's organization and recommendation capabilities? How are remaining capabilities allocated across tests, pilot, commercial release, and backlog? | PARTIALLY ANSWERED — both support paths belong in the first version under D-010; modes, coverage, and remaining allocation OPEN |
| Q-303 | Are multi-city travel, voting, advanced replanning, and in-app booking/payments excluded initially? Which multi-city and hotel/transport needs arise from the pilot? | OPEN — exclusions are proposals; organizing or recommending bookings is not the same as making reservations |
| Q-304 | Which completion, companion-usability, scheduling-quality, effort, and cost measures will be tracked? | OPEN — parked for Section 4 |
| Q-305 | What does realistic scheduling promise, including accommodation and transportation constraints, and which unknowns or manual checks must be disclosed? | OPEN — detailed constraints and guarantees not approved |
| Q-306 | When should subscriptions and ads be implemented? What pricing, billing intervals, free/paid features, trials, ad placements, and ad-free behavior fit the approved release? | OPEN — subscription/ad intent confirmed; pilot inclusion and details not approved |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What observation would support or challenge the proposed value of personalized sharing? | OPEN — parked for Section 5 |
| Q-352 | What real-data samples and manually checked itineraries should be used for feasibility tests, including existing-booking organization and hotel/transport recommendations? | OPEN — Japan pilot informs context; exact samples and tests remain OPEN |
| Q-353 | Which risks must be resolved before implementation, and what are their test/fallback criteria? | OPEN — parked for Section 5; do not assume reliable hotel availability, transport timetables, prices, or reservation access |
| Q-354 | Beyond the owner's pilot, what evidence is needed for broader demand, recurring subscription value, willingness to pay, acceptable advertising, and sustainable operating costs? | OPEN — commercial objective is a goal, not validated revenue |

## Sections 6–8 — System, Dependencies, and API Capabilities

| ID | Question | Status |
| --- | --- | --- |
| Q-401 | Which platform, application structure, storage, identity, AI, and external providers fit the approved product? | OPEN — no stack or vendor selected; Section 7 |
| Q-402 | Where does authoritative place, event, accommodation, price, opening, routing, transport-schedule, and booking-status information come from, to the extent required by approved scope? | OPEN — Sections 6–7; user-entered information versus provider data also to be distinguished |
| Q-403 | What provider terms, storage/media restrictions, attribution, coverage, freshness, limits, and cost apply? | OPEN — requires current primary-source verification in Section 7 |
| Q-404 | Which logical concepts and persistent states are needed, including saved activities, scheduled occurrences, hotel stays, transportation legs, and published versions? | OPEN — Section 6; these are candidate distinctions, not an approved schema |
| Q-405 | What performance, reliability, accessibility, privacy, retention, deletion, and abuse controls are required? | OPEN — Section 7 |
| Q-406 | Which backend capabilities support the approved initial journeys? | OPEN — Section 8 |
| Q-407 | How will the pilot be delivered, and which app-store/SaaS distribution path should the commercial product use? What platform, billing, and advertising requirements apply when relevant? | OPEN — evaluate current primary-source requirements later; do not assume native, web-first, operating system, or vendors |

## Sections 9–15 — Delivery Planning and Handoff

| ID | Question | Status |
| --- | --- | --- |
| Q-501 | What is the first approved buildable slice, and what user outcome and risk does it address? | OPEN — Section 9 |
| Q-502 | What exact acceptance criteria, access rules, API/data changes, and failure behavior define it? | OPEN — Sections 10–13 |
| Q-503 | What is real versus simulated, and when must each simulation be replaced? | OPEN — Section 12 |
| Q-504 | What tests, quality checks, migrations, restoration checks, monitoring, and recovery conditions are required? | OPEN — Sections 13–14 |
| Q-505 | How will feedback, decisions, and changes update the maintained plan? | OPEN — Section 15 |
| Q-506 | Has the owner explicitly approved design completion and the transition to implementation? | OPEN — implementation remains unauthorized in this workflow |

## Resolved questions

| ID | Question | Answer | Record |
| --- | --- | --- | --- |
| R-001 | What is the primary use case? | An organizer plans a trip they are taking and shares it with companions. | D-002 |
| R-002 | Which planning process should be used? | The adopted blueprint, filled out sequentially in this chat. | D-001 |
| R-003 | Where will planning be maintained? | `fgzmac/OnToTheNext`. | D-004 |
| R-004 | When will Codex implementation begin? | After the design phase and explicit transition approval; no build date selected. | D-003 |
| Q-002 | What is the primary project objective and priority? | Develop and test for the November Japan trip first; ultimately launch commercially through a mobile app store or as SaaS. Pilot and public launch are separate milestones. | D-006, D-007 — resolved 2026-09-19 |
| Q-007 | What is the intended business-model direction? | Earn revenue from subscriptions and ads. Pricing, feature tiers, ad behavior, vendors, and implementation timing remain in Q-306/Q-407. | D-007 — direction resolved 2026-09-19 |
| Q-003 | What is the initial pilot's group type and traveler count? | A couple, two travelers total: one organizer and one companion. Broader commercial targeting is retained separately in Q-010. | D-008 — pilot audience resolved 2026-09-19 |
| Q-009 | Should the first version organize existing hotel/transport bookings, recommend options before booking, or do both? | Both for hotels and transportation. Detailed workflows, providers, modes, coverage, and transaction boundaries remain separate questions. | D-010 — capability selection resolved 2026-09-19 |

## Resolution procedure

For each answer, record the answer in the active section. If it is an explicit choice, add the decision ID to the decision register. Mark the matching question answered and preserve its history. If the owner intentionally leaves something open, record why, who is responsible, and what will trigger review. Do not call a section approved until the owner approves that section.

**Current next step:** Ask for the desired pilot-ready date, including the year, under Q-004. Address the remaining constraints afterward, one at a time. Do not re-ask Q-009, the pilot group/count, or whether hotels and transportation belong in the app. Request only necessary timing information and keep detailed private travel schedules out of the public repository.
