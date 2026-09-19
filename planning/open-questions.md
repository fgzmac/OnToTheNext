# Open Questions

**Purpose:** Keep unresolved decisions visible without asking about every future feature at once.  
**Current section:** 1 — Product Vision and Problem Brief.  
**Last updated:** 2026-09-19.  
**Next question to discuss:** Q-002 — primary project objective.

Questions are grouped by their relevant blueprint stage. Later-stage questions are parked for sequencing; this does not mean the owner has approved deferring the associated feature from the release. Do not implement an unanswered question as an assumed default.

## Section 1 — Active product-brief questions

Ask and resolve these one at a time. Use existing answers before asking for information again. The listed options are examples, not forced choices.

| ID | Question | Why it matters | Status |
| --- | --- | --- | --- |
| Q-002 | What is the primary goal of building this app: commercial launch, personal use, portfolio/learning, or a combination? If combined, which leads? | Guides scope, validation, cost limits, and launch expectations. | OPEN — next discussion |
| Q-003 | Which organizers and companions should the first version serve especially well? | Narrows the initial audience without assuming friends, couples, families, or a demographic. | OPEN — Section 1 queue |
| Q-004 | What development budget, ongoing cost limit, available time, launch expectations, and maintenance capacity should shape planning? | Establishes realistic project constraints without fabricating estimates. | OPEN — Section 1 queue |
| Q-005 | Is the proposed first-release promise in the brief the right high-level outcome? What must be protected? | Aligns on the complete experience before the detailed scope section. | OPEN — Section 1 queue |
| Q-006 | What real planning examples, observed frustrations, or potential tester access can inform the problem hypothesis? Which pain point is most important? | Separates the owner's concept from evidence of a user need. | OPEN — Section 1 queue |
| Q-007 | Is there an initial business-model hypothesis, or should that decision explicitly remain open with a review trigger? | Prevents assumed subscriptions, ads, or booking commissions. | OPEN — Section 1 queue |
| Q-008 | How should the first organizers and companions discover or test the product? | Establishes an initial distribution and validation path. | OPEN — Section 1 queue |
| Q-001 | Is OnToTheNext intended to be the app name, or only the repository name? | Avoids treating a repository label as an approved brand. | OPEN — not a reason to block product planning |

The one-sentence description, problem statement, positioning, evidence gaps, non-goals, and long-term vision also require review before the section is approved. A short answer to one question does not automatically approve the rest of the brief.

## Section 2 — Users, Roles, and Ownership

| ID | Question | Status |
| --- | --- | --- |
| Q-101 | Can companions only view, suggest changes for approval, or directly edit? Who owns and controls the itinerary? | OPEN — parked for Section 2 |
| Q-102 | Do organizers and companions need accounts, and when? | OPEN — parked for Section 2 |
| Q-103 | How are trips shared: anyone-with-link, invited recipients, or another model? How can access be revoked? | OPEN — parked for Section 2 |
| Q-104 | Who can publish, delete, invite, or remove access? Can ownership transfer? | OPEN — parked for Section 2 |
| Q-105 | Which information is private to the organizer, and what may companions see? | OPEN — parked for Section 2 |
| Q-106 | Does the organizer enter group preferences, do companions provide their own, or is input combined? | OPEN — parked for Section 2 |

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

## Section 4 — First-Release Scope and Success

| ID | Question | Status |
| --- | --- | --- |
| Q-301 | What destinations, trip lengths, group sizes, date ranges, languages, and devices are initially supported? | OPEN — parked for Section 4 |
| Q-302 | Which capabilities belong in the first complete test, first real release, and later backlog? | OPEN — parked for Section 4 |
| Q-303 | Are multi-city travel, voting, advanced replanning, and booking/payments excluded initially? | OPEN — exclusions are proposals, not approved deferrals |
| Q-304 | Which completion, companion-usability, scheduling-quality, effort, and cost measures will be tracked? | OPEN — parked for Section 4 |
| Q-305 | What does realistic scheduling promise, and which unknowns or manual checks must be disclosed? | OPEN — parked for Section 4 |

## Section 5 — Risks and Experiments

| ID | Question | Status |
| --- | --- | --- |
| Q-351 | What observation would support or challenge the proposed value of personalized sharing? | OPEN — parked for Section 5 |
| Q-352 | What real-data samples and manually checked itineraries should be used for feasibility tests? | OPEN — parked for Section 5 |
| Q-353 | Which risks must be resolved before implementation, and what are their test/fallback criteria? | OPEN — parked for Section 5 |

## Sections 6–8 — System, Dependencies, and API Capabilities

| ID | Question | Status |
| --- | --- | --- |
| Q-401 | Which platform, application structure, storage, identity, AI, and external providers fit the approved product? | OPEN — no stack or vendor selected; Section 7 |
| Q-402 | Where does authoritative place, event, price, opening, routing, and booking-status information come from? | OPEN — Sections 6–7 |
| Q-403 | What provider terms, storage/media restrictions, attribution, coverage, freshness, limits, and cost apply? | OPEN — requires current primary-source verification in Section 7 |
| Q-404 | Which logical concepts and persistent states are needed, including saved activities, scheduled occurrences, and published versions? | OPEN — Section 6; schema later |
| Q-405 | What performance, reliability, accessibility, privacy, retention, deletion, and abuse controls are required? | OPEN — Section 7 |
| Q-406 | Which backend capabilities support the approved initial journeys? | OPEN — Section 8 |

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

## Resolution procedure

For each answer, record the answer in the active section. If it is an explicit choice, add the decision ID to the decision register. Mark the matching question answered and preserve its history. If the owner intentionally leaves something open, record why, who is responsible, and what will trigger review. Do not call a section approved until the owner approves that section.

**Current next step:** Discuss Q-002, then continue the Section 1 brief one question at a time.
