# Decision Register

**Purpose:** Record explicit decisions and their boundaries.  
**Owner:** Project owner (`fgzmac`).  
**Last updated:** 2026-09-19.  
**Current phase:** Product design.  
**Source:** Explicit statements in the planning conversation. No user research or provider evaluation has yet been recorded.

A GitHub commit is not a product approval. Recommendations copied into the base idea do not automatically become approved requirements. Each decision below records only the part supported by the owner's actual direction.

## Confirmed decisions

| ID | Decision | Status | Date |
| --- | --- | --- | --- |
| D-001 | Use the supplied app-building blueprint and complete it sequentially in this chat. | CONFIRMED | 2026-09-19 |
| D-002 | Primary use case: an organizer plans a trip they are taking and shares it with companions. | CONFIRMED | 2026-09-19 |
| D-003 | Complete the design phase before using Codex for implementation. | CONFIRMED | 2026-09-19 |
| D-004 | Maintain planning documents in `fgzmac/OnToTheNext`. | CONFIRMED | 2026-09-19 |
| D-005 | Use the supplied Discover / Organize / Delight concept as the product's starting direction. | CONFIRMED at concept level | 2026-09-19 |
| D-006 | Prioritize developing and testing the app for a November Japan-trip pilot before commercial launch. | CONFIRMED | 2026-09-19 |
| D-007 | Ultimately launch commercially through a mobile app store or as SaaS, with subscriptions and ads as intended revenue sources. | CONFIRMED direction; platform and implementation OPEN | 2026-09-19 |
| D-008 | The initial pilot audience is a couple: two travelers total, one organizer and one companion. | CONFIRMED for pilot | 2026-09-19 |
| D-009 | The app/service must account for hotels and transportation as well as activities. | CONFIRMED product requirement; support depth OPEN | 2026-09-19 |

## D-001 — Sequential blueprint planning

**Question:** What process should guide planning?

**Decision:** The blueprint from this conversation is the main framework. This chat is solely for filling it out one section at a time.

**Source:** The owner's instruction to keep the blueprint as the main point and progress through it one by one.

**Reason:** The owner wants an organized blueprint to support later development.

**Boundaries:** Adopting the process does not approve every example, suggested feature, technical approach, or future milestone in that framework. Later-section questions may be parked without being answered prematurely.

**Current effect:** Section 1 — Product Vision and Problem Brief is the active draft. No completed section has been approved.

**Revisit when:** The owner changes the planning process.

## D-002 — Organizer plans for a trip they are taking

**Question:** Is the initial focus planning a shared trip or creating a surprise trip for someone else?

**Decision:** The primary use case is planning a trip to share with companions; the organizer is taking that trip.

**Source:** The owner's answer, “Planning a trip to share with companions.”

**Reason:** This is the explicit use case chosen by the owner.

**Boundaries:** This does not select organizer-only editing, companion suggestions, group voting, guest accounts, access mechanisms, or publication behavior. It does not forbid future surprise-oriented experiences.

**Product implication:** The emotional framing is “Look what I planned for us,” while the shared plan should remain useful to the group.

**Revisit when:** Research or the owner explicitly changes the primary use case.

## D-003 — Design first; implementation afterward

**Question:** When should coding begin, and what will support implementation?

**Decision:** Complete the design phase, then use Codex to build the app.

**Source:** The owner's instruction that Codex will be used once the design phase is done.

**Boundaries:** No application stack, database, authentication model, API provider, or AI component is selected by this decision. The present planning setup is documentation-only, not permission to scaffold or deploy the app.

**Working interpretation:** Design completion means sufficiently defined direction, first-release scope, main experiences, important constraints/risks, and first buildable feature, followed by explicit approval of the transition. It does not require fully specifying all future features. This interpretation should be reviewed with the owner before transition.

**Revisit when:** The owner explicitly authorizes implementation or changes the workflow.

## D-004 — Planning repository

**Question:** Where should the maintained planning record live?

**Decision:** Use `https://github.com/fgzmac/OnToTheNext`.

**Source:** The repository URL supplied by the owner.

**Verified repository facts at setup:** Default branch `main`; visibility public. These are observations of repository metadata on 2026-09-19, not immutable product decisions.

**Boundaries:** The repository name does not automatically become the final app name. Public repository visibility does not authorize public user itineraries or publication of sensitive information. No credentials, personal booking details, or identifying research responses should be committed.

**Current organization:** README, the reusable blueprint, the active product brief, this decision register, and the open-question register. Additional section documents are added when needed.

**Revisit when:** The owner changes the repository, visibility, or documentation workflow.

## D-005 — Adopt the base concept, not every recommendation

**Question:** What idea should the blueprint develop?

**Decision:** Use the owner's supplied concept: discover experiences people will enjoy, organize their choices into a realistic trip, and present the resulting itinerary as a personalized experience worth sharing.

**Source:** The owner's instruction to use the supplied material as the app's base idea.

**Core jobs:** Discover, Organize, Delight. The initial use case remains D-002.

**Boundaries:** The supplied material contains recommendations and open questions. It is not blanket approval of a limited-destination release, companion suggestions, private drafts and published updates, email/text delivery, guest access, exact shortlist rules, specific providers, or AI functionality. Record these as proposals until decided in the relevant section.

**Revisit when:** The owner refines the vision or evidence challenges a core product assumption.

## D-006 — Japan pilot comes first

**Question:** What is the immediate objective, and how does it rank against commercial launch?

**Decision:** Develop and test the app for a Japan trip in November. This is the immediate goal and takes priority over the ultimate commercial objective in D-007.

**Source:** The owner's explicit statement that the app should first be developed and tested for the November Japan trip and that this immediate goal comes first.

**Reason:** The owner has selected a concrete real-use scenario for the first test.

**Confirmed implications:** The project owner is the initial organizer/tester. Japan is the initial pilot context. Planning should distinguish the pilot from a public commercial release. D-003 still applies: design precedes implementation with Codex. The companion group, originally open, was subsequently confirmed under D-008.

**Boundaries:** The year, exact trip dates, pilot-ready deadline, cities, duration, feature scope, data coverage, device support, and pilot distribution mechanism are not explicitly confirmed. November is not a public-launch deadline. The choice does not promise all-Japan coverage, permanently restrict the app to Japan, approve single-city limitations, or require subscriptions/ads in the pilot.

**Evidence limits:** A selected trip is a testing opportunity, not a completed test. It does not establish broader demand, willingness to pay, or technical feasibility.

**Public-record boundary:** Record only minimum milestone context and an anonymous pilot profile. Do not add names, bookings, addresses, or detailed private travel schedules.

**Affected documents:** Product brief, README, decision register, open-question register. Later sections should use this priority when resolving scope and risks.

**Related questions:** Q-002 resolved; Q-003 subsequently resolved for the pilot under D-008; Q-004 and Q-008 partially informed; Q-005 and Q-301/Q-302 still open.

**Revisit when:** Trip needs, timing, evidence, or the owner's explicit priorities change.

## D-007 — Commercial goal and intended revenue sources

**Question:** What is the ultimate business objective?

**Decision:** Launch the app commercially through a mobile app store or as a SaaS offering and make money from subscriptions and ads. The owner has not chosen between the distribution approaches.

**Source:** The owner's explicit statement that the ultimate goal is app-store or SaaS launch with subscription and advertising revenue.

**Reason:** Commercialization and revenue are the stated long-term goals, not merely portfolio or personal-use objectives.

**Priority:** D-006 comes first. Commercial ambitions inform later design without authorizing immediate commercial implementation.

**Confirmed versus unconfirmed:** Subscription and ad revenue are confirmed intentions. Pricing, billing intervals, free/paid entitlements, ad formats/placements, ad-free plans, vendors, implementation order, and when monetization enters the product remain OPEN. No extra revenue stream has been selected.

**Distribution boundaries:** No operating system, native/web architecture, pilot delivery mechanism, platform order, app-store listing, hosting plan, or launch date is selected. App-store distribution and a SaaS business are not being treated as a settled technical architecture.

**Evidence limits:** The goal is not a claim of profitability, customer demand, retention, or willingness to pay. Those require evaluation beyond the owner's own trip.

**Affected documents:** Product brief, README, decision register, open-question register.

**Related questions:** Q-002 and high-level Q-007 resolved. Detailed monetization is tracked in Q-306; validation in Q-354; platform/delivery in Q-401 and Q-407.

**Revisit when:** Pilot findings, customer research, operating costs, applicable platform requirements, or the owner's priorities justify a business-model decision.

## D-008 — Two-person couple pilot

**Question:** Who is the first trip experience for?

**Decision:** The pilot is for a couple: two travelers in total, one organizer and one companion.

**Source:** The owner's explicit answer that the trip is with a significant other and there are two travelers total. The public planning record uses an anonymous pilot profile rather than names or other identifying details.

**Reason:** This is the actual first-use group selected for the Japan pilot.

**Boundaries:** This does not make the commercial product couples-only, impose a permanent two-person limit, assume identical interests, select a romantic theme, or decide who may edit, approve, or view information. The companion's actual participation in testing is still to be arranged.

**Affected documents:** Product brief, README, decision register, open-question register.

**Related questions:** Q-003 resolved for the pilot; its broader commercial-audience question is retained as Q-010. Q-008, Q-101, and Q-106 remain open.

**Revisit when:** Pilot participation changes or the owner chooses the wider target audience.

## D-009 — Account for hotels and transportation

**Question:** Does the app cover only activity discovery and scheduling?

**Decision:** No. Hotels and transportation are required parts of the app/service's planning coverage, alongside activities.

**Source:** The owner's explicit addition: “As part of the app / service I also want to account for hotels and transportation.”

**Reason:** The owner expanded the product direction to include where travelers stay and how they move through the trip.

**Confirmed versus open:** Inclusion is confirmed. Whether the first version organizes existing bookings, recommends options, or does both remains Q-009. Detailed pilot coverage, transport modes, cost tracking, and scheduling behavior will be specified after that product-level answer.

**Proposed interpretation, not approved detail:** Hotel locations and stay dates could anchor the schedule; fixed journeys could constrain available activity time; local travel could connect stops; lodging and transport could contribute to the visible trip budget. These are planning considerations to discuss, not a completed feature specification.

**Boundaries:** This does not authorize making, modifying, or canceling reservations; taking payments; accessing booking accounts or email; promising live prices/availability; selecting providers; or adding a commission model. Planning around a booking and purchasing that booking are different capabilities. A proposed exclusion of in-app booking/payment does not exclude hotel/transport planning.

**Affected documents:** Product brief, README, decision register, open-question register. Carry the requirement into journeys, scope, risks, conceptual data, and integration planning when those sections begin; they remain NOT STARTED.

**Related questions:** Q-009 is next; detailed behavior in Q-209, scope in Q-302/Q-303/Q-305, and sources/concepts in Q-402/Q-404.

**Revisit when:** The owner clarifies the desired support level or feasibility evidence requires a scope tradeoff.

## Approval register

| Item | Status | Approval evidence |
| --- | --- | --- |
| Blueprint as planning framework | Adopted | D-001 |
| Section 1 completed product brief | NOT APPROVED — draft | None |
| Immediate pilot priority and ultimate business direction | CONFIRMED at objective level | D-006 and D-007 |
| Pilot group: couple, two travelers | CONFIRMED for pilot | D-008 |
| Hotels and transportation in product coverage | CONFIRMED at capability level | D-009 |
| Sections 2–15 | NOT STARTED | None |
| Pilot and first-public-release feature scope | NOT APPROVED | None |
| Technical architecture and stack | NOT SELECTED | None |
| Monetization details and platform selection | NOT SELECTED | None |
| Design-to-implementation transition | NOT APPROVED | None |

## Proposals that must not be mistaken for decisions

Organizer-led editing with companion suggestions; shared links that show only published updates; private unfinished edits; companion access without installation or accounts; Keep as interest rather than mandatory scheduling; explicit must-dos and locked commitments; the exact limited-destination scope; Just exploring mode; provider choices; AI involvement; advanced same-day changes; multi-city support; booking/payment integrations; an ads/billing-free pilot; pricing and ad placements; native or web-first delivery; hotel/transport recommendations, booking imports, supported transport modes, and exact scheduling rules.

Many are coherent with the base idea. Coherence is not approval. Their detailed behavior, initial scope, and evidence will be addressed in the appropriate section. The Japan pilot, subscription/ad intent, two-traveler pilot, and hotel/transport inclusion are confirmed under D-006 through D-009, but do not finalize those detailed choices.

## New decision template

```text
ID:
Question:
Context:
Options considered:
Decision:
Status:
Source of explicit approval:
Reason:
Evidence and its limits:
Tradeoffs:
Affected documents/features:
Owner:
Date:
Revisit trigger:
Supersedes:
Related open-question IDs:
```

## Maintenance rule

When an answer settles a question, update the active document and corresponding question, add or revise the decision, and update the blueprint tracker only if the section itself is approved. Preserve superseded decisions with their history rather than silently rewriting the reason they were made.
