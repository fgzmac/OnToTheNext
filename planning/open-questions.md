# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next question to discuss:** Q-009 — organize existing hotel/transport bookings, recommend options, or both?

Questions are grouped by their relevant blueprint stage. Later-stage questions are parked for sequencing; this does not mean the owner has approved deferring the associated feature from the release. Do not implement an unanswered question as an assumed default.

## Section 1 — Active product-brief questions

Ask and resolve these one at a time. Use existing answers before asking for information again. The listed options are examples, not forced choices.

**Already answered:** The immediate goal is developing and testing for a November Japan trip; the ultimate goal is commercial app-store or SaaS launch with subscription and ad revenue. The pilot audience is a couple: two travelers total, one organizer and one companion. Hotels and transportation must be accounted for in the app/service. See D-006 through D-009 and resolved Q-002/Q-003/Q-007. Do not re-ask whether these broad choices are desired.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-009 | For the first version, should hotel and transportation support organize bookings already made, recommend options to choose from, or do both? | Clarifies the new product capability without assuming reservation, payment, or live-availability integrations. The two areas can have different answers. | OPEN — next discussion; inclusion in the overall app confirmed by D-009 |
| Q-004 | What year, trip dates, and pre-trip readiness date define the November pilot target? What development budget, operating-cost limit, available time, and maintenance capacity apply? | Turns a month-level pilot target into usable constraints without inventing a deadline or publishing a private schedule. | PARTIALLY ANSWERED — November pilot first; year, exact dates, readiness deadline, budget, and capacity remain OPEN |
| Q-005 | Is the proposed Japan-pilot promise in the brief the right high-level outcome? What must be protected, including hotels and transportation, and what belongs only in a public release? | Aligns on the complete experience before the detailed scope section. | PARTIALLY INFORMED — hotels/transport are required product areas; detailed pilot promise not approved |
| Q-006 | What real planning examples, observed frustrations, or potential tester access can inform the problem hypothesis? Which pain point is most important? | Separates the owner's concept from evidence of a user need. | OPEN — Japan trip supplies a context, not completed research |
| Q-008 | How will the pilot be tested, how will the companion participate, and how should later external testers or customers find the product? | Distinguishes first-use testing from broader validation and acquisition. | PARTIALLY ANSWERED — owner will test on Japan trip with one travel companion; participation in app testing, external testing, and acquisition remain OPEN |
| Q-010 | Which broader commercial audience should the service eventually target? | Keeps a two-person pilot separate from a permanent couples-only customer segment or product limit. | OPEN — remaining commercial-audience portion split from Q-003; not a reason to re-ask the pilot group |
| Q-001 | Is OnToTheNext intended to be the app name, or only the repository name? | Avoids treating a repository label as an approved brand. | OPEN — not a reason to block product planning |

The one-sentence description, problem statement, positioning, evidence gaps, non-goals, and long-term vision also require review before the section is approved. A short answer to one question does not automatically approve the rest of the brief.

Detailed monetization choices are parked in Q-306, commercial validation in Q-354, and delivery/platform questions in Q-401/Q-407. Hotel/transport inclusion does not authorize building an online booking agency, selecting providers, or importing private booking data. Keep the discussion at product level until the relevant later sections.

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
| Q-209 | How do travelers add or select hotel stays and transportation, see them alongside activities, and review the effects of a change? Which times, costs, and statuses must be represented? | OPEN — detailed workflow follows the high-level Q-009 answer; no booking/import mechanism selected |

## Section 4 — First-Release Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | Which Japanese cities, trip lengths, group sizes, date ranges, languages, and devices must the pilot support? What differs for public release? | PARTIALLY ANSWERED — Japan pilot and two travelers confirmed; wider group limits and remaining coverage OPEN |
| Q-302 | Which capabilities belong in the first complete test, working Japan pilot, first commercial release, and later backlog? What hotel/transport depth and modes are needed at each stage? | OPEN — hotels/transport in product confirmed; exact feature allocation not approved |
| Q-303 | Are multi-city travel, voting, advanced replanning, and in-app booking/payments excluded initially? Which multi-city and hotel/transport needs arise from the pilot? | OPEN — exclusions are proposals; planning existing bookings is not the same as making reservations |
| Q-304 | Which completion, companion-usability, scheduling-quality, effort, and cost measures will be tracked? | OPEN — parked for Section 4 |
| Q-305 | What does realistic scheduling promise, including accommodation and transportation constraints, and which unknowns or manual checks must be disclosed? | OPEN — detailed constraints and guarantees not approved |
| Q-306 | When should subscriptions and ads be implemented? What pricing, billing intervals, free/paid features, trials, ad placements, and ad-free behavior fit the approved release? | OPEN — subscription/ad intent confirmed; pilot inclusion and details not approved |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What observation would support or challenge the proposed value of personalized sharing? | OPEN — parked for Section 5 |
| Q-352 | What real-data samples and manually checked itineraries should be used for feasibility tests, including the approved hotel/transport behavior? | OPEN — Japan pilot informs context; exact samples and tests remain OPEN |
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

## Resolution procedure

For each answer, record the answer in the active section. If it is an explicit choice, add the decision ID to the decision register. Mark the matching question answered and preserve its history. If the owner intentionally leaves something open, record why, who is responsible, and what will trigger review. Do not call a section approved until the owner approves that section.

**Current next step:** Clarify hotel/transport support at product level through Q-009, then continue the remaining Section 1 questions. Do not re-ask the pilot group/count or the decision to include hotels and transportation. Dates/year and readiness planning remain in Q-004; request only information necessary for planning and keep detailed private travel schedules out of the public repository.
