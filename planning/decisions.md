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
| D-006 | Prioritize developing and testing the app for a November Japan-trip pilot before commercial launch. | CONFIRMED; timing clarified in D-011 through D-013 | 2026-09-19 |
| D-007 | Ultimately launch commercially through a mobile app store or as SaaS, with subscriptions and ads as intended revenue sources. | CONFIRMED direction; platform and implementation OPEN | 2026-09-19 |
| D-008 | The initial pilot audience is a couple: two travelers total, one organizer and one companion. | CONFIRMED for pilot | 2026-09-19 |
| D-009 | The app/service must account for hotels and transportation as well as activities. | CONFIRMED; support paths clarified in D-010 | 2026-09-19 |
| D-010 | For both hotels and transportation, the first version must organize existing bookings and recommend options before booking. | CONFIRMED at capability level | 2026-09-19 |
| D-011 | Tokyo is a confirmed pilot destination; the stated travel window spans late November through early December. | CONFIRMED context; planning calendar and target subsequently settled in D-012 | 2026-09-19 |
| D-012 | Target November 10, 2026 for the first complete pre-trip test. | CONFIRMED planning target, not a delivery guarantee | 2026-09-19 |
| D-013 | Tokyo-local arrival/departure times have been supplied; the pilot includes partial arrival and departure days. | CONFIRMED user-supplied context; exact details retained in chat | 2026-09-19 |
| D-014 | Use the supplied low/high trip-spending range excluding plane tickets; do not apply it to app-running costs. | Range/exclusion CONFIRMED; currency and per-person/group basis OPEN | 2026-09-19 |
| D-015 | Account for events and restaurants that require reservations. | CONFIRMED planning requirement; detailed behavior OPEN | 2026-09-19 |

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

**Boundaries:** No application stack, database, authentication model, API provider, or AI component is selected by this decision. The present planning setup is documentation-only, not permission to scaffold or deploy the app. Approval of the test target in D-012 does not itself approve the transition to implementation.

**Working interpretation:** Design completion means sufficiently defined direction, first-release scope, main experiences, important constraints/risks, and first buildable feature, followed by explicit approval of the transition. It does not require fully specifying all future features. This interpretation should be reviewed with the owner before transition.

**Revisit when:** The owner explicitly authorizes implementation or changes the workflow.

## D-004 — Planning repository

**Question:** Where should the maintained planning record live?

**Decision:** Use `https://github.com/fgzmac/OnToTheNext`.

**Source:** The repository URL supplied by the owner.

**Verified repository facts at setup:** Default branch `main`; visibility public. These are observations of repository metadata on 2026-09-19, not immutable product decisions.

**Boundaries:** The repository name does not automatically become the final app name. Public repository visibility does not authorize public user itineraries or publication of sensitive information. No credentials, personal booking details, exact private travel dates/times, personal spending amounts, or identifying research responses should be committed. An approved software-testing milestone may be recorded without publishing a flight schedule.

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

**Confirmed implications:** The project owner is the initial organizer/tester. Japan is the initial pilot context. Planning should distinguish the pilot from a public commercial release. D-003 still applies: design precedes implementation with Codex. The companion group, originally open, was subsequently confirmed under D-008; hotel/transport capabilities were clarified under D-009/D-010. D-011 confirms Tokyo and a travel window extending into December. D-012 confirms the dated 2026 testing target; D-013 records receipt of local travel times. Exact private travel dates/times are deliberately omitted from the public record.

**Boundaries:** Additional destinations, airports, transfer durations, detailed feature specifications, data coverage, device support, and pilot distribution mechanism remain open. The trip is not a public-launch deadline. The choice does not promise all-Japan coverage, permanently restrict the app to Japan, approve single-city limitations, or require subscriptions/ads in the pilot.

**Evidence limits:** A selected trip is a testing opportunity, not a completed test. It does not establish broader demand, willingness to pay, or technical feasibility.

**Public-record boundary:** Record only minimum milestone context and an anonymous pilot profile. Do not add names, bookings, addresses, or detailed private travel schedules.

**Affected documents:** Product brief, README, decision register, open-question register. Later sections should use this priority when resolving scope and risks.

**Related questions:** Q-002 resolved; Q-003 resolved for the pilot under D-008; Q-004 timing target approved under D-012; Q-004 app budget/capacity and Q-008 partially open; Q-005 and detailed Q-301/Q-302 scope still open. The supplied trip-spending range is separately recorded in D-014.

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

**Boundaries:** This does not make the commercial product couples-only, impose a permanent two-person limit, assume identical interests, select a romantic theme, or decide who may edit, approve, or view information. The companion's actual participation in testing is still to be arranged. It also does not determine whether a supplied spending range is per person or shared.

**Affected documents:** Product brief, README, decision register, open-question register.

**Related questions:** Q-003 resolved for the pilot; its broader commercial-audience question is retained as Q-010. Q-008, Q-101, Q-106, and budget basis in Q-011 remain open.

**Revisit when:** Pilot participation changes or the owner chooses the wider target audience.

## D-009 — Account for hotels and transportation

**Question:** Does the app cover only activity discovery and scheduling?

**Decision:** No. Hotels and transportation are required parts of the app/service's planning coverage, alongside activities.

**Source:** The owner's explicit addition: “As part of the app / service I also want to account for hotels and transportation.”

**Reason:** The owner expanded the product direction to include where travelers stay and how they move through the trip.

**Confirmed versus open:** Inclusion was confirmed here. The initial choice between existing-booking organization and recommendations was left open as Q-009 and was subsequently resolved by D-010: both capabilities are required for both hotels and transportation in the first version. Detailed coverage, transport modes, cost tracking, and scheduling behavior remain open. D-014 later provides range-based trip-budget input with airfare excluded, but does not approve every cost rule.

**Proposed interpretation, not approved detail:** Hotel locations and stay dates could anchor the schedule; fixed journeys could constrain available activity time; local travel could connect stops; lodging and transport could contribute to the visible trip budget. These are planning considerations, not a completed feature specification.

**Boundaries:** This does not authorize making, modifying, or canceling reservations; taking payments; accessing booking accounts or email; promising live prices/availability; selecting providers; or adding a commission model. Planning around a booking and purchasing that booking are different capabilities. A proposed exclusion of in-app booking/payment does not exclude hotel/transport planning.

**Affected documents:** Product brief, README, decision register, open-question register. Carry the requirement into journeys, scope, risks, conceptual data, and integration planning when those sections begin; they remain NOT STARTED.

**Related questions:** Q-009 resolved under D-010; detailed behavior in Q-209, scope in Q-302/Q-303/Q-305, and sources/concepts in Q-402/Q-404.

**Revisit when:** The owner changes the desired support level or feasibility evidence requires an explicit scope tradeoff.

## D-010 — Both existing-booking organization and recommendations

**Question:** For hotels and transportation, should the first version organize bookings already made, recommend options before booking, or do both?

**Decision:** Both. The first version must support existing-booking organization and recommendations for both hotels and transportation.

**Source of explicit approval:** The owner's answer, “both,” to the immediately preceding question specifying these two capabilities for hotels and transportation. No different answer was supplied for either area.

**Reason:** The owner selected support for planning around existing arrangements as well as finding options that have not yet been booked.

**Required capability matrix:**

| Area | Organize existing bookings | Recommend options before booking |
| --- | --- | --- |
| Hotels | Included in first version. | Included in first version. |
| Transportation | Included in first version. | Included in first version. |

**Boundaries:** This does not approve in-app booking, payments, reservation changes/cancellation, email or booking-account access, automatic imports, live prices/availability, a particular transport mode, a provider, an affiliate/commission model, or all-destination coverage. Entry methods, recommendation criteria, data verification, and booking handoffs remain to be specified. A recommendation is not confirmation that a booking has been made.

**Scope effect:** Do not silently treat recommendations as a future-only capability or reduce the first version to a booking organizer. If later feasibility or timing requires a change, surface that tradeoff and obtain an explicit decision. This confirms capability inclusion, not the full feature specification or approval of Section 1.

**Evidence limits:** This is a product choice, not a verified statement about data availability, recommendation quality, or development effort.

**Affected documents:** Product brief, README, decision register, open-question register.

**Related questions:** Q-009 resolved. Remaining detailed behavior in Q-209; coverage and acceptance conditions in Q-301/Q-302/Q-305; sourcing and concepts in Q-402/Q-404. Q-004's target was approved in D-012; its app budget and capacity remain open.

**Revisit when:** The owner changes the requirement or evidence requires an explicit scope decision.

## D-011 — Tokyo and travel-window clarification

**Question:** What destination and timing context should guide the pilot?

**Confirmed context:** Tokyo is included in the Japan trip. The owner supplied outbound and return month/day endpoints in the planning conversation. The public planning record retains only the late-November through early-December window and approximate two-week calendar span, not the exact private dates.

**Source:** The owner's travel-date clarification following the question about a first full test. No external booking data was accessed or published.

**Year and target history:** At this decision, the year was unstated and 2026 was a working assumption; a pre-trip test was proposed but not approved. D-012 subsequently records explicit acceptance of November 10, 2026 as the first complete test target and establishes the 2026 pilot planning calendar. D-013 subsequently records supplied Tokyo-local travel times.

**Boundaries:** Travel dates alone did not approve a software target; the approval is separately recorded in D-012. Neither establishes a public-launch commitment. Tokyo being named does not establish a Tokyo-only itinerary, a particular airport, accommodation nights, transfer durations, or full sightseeing days. Additional destinations remain open.

**Related questions:** Q-004 timing target is settled under D-012; app budget and capacity remain open. Q-301 has Tokyo and a month-spanning pilot context; remaining coverage and detailed scheduling are open. Do not re-ask supplied travel endpoints simply because they are omitted from the public repository.

**Revisit when:** The owner changes the test target, adds destinations, or changes travel plans.

## D-012 — Approved first complete test target

**Question:** Does November 10, 2026 work as the target for the first complete test?

**Decision:** Yes. Target **November 10, 2026** for the first complete pre-trip test.

**Source of explicit approval:** The owner's “Yes” immediately following the dated milestone question. The previous response made the 2026 planning year explicit.

**Reason:** Establish a concrete pre-trip testing milestone and leave a period for fixes and repeat testing before real use.

**Calendar effect:** Use 2026 for this pilot's planning timeline; the prior year assumption and unapproved testing target are superseded at the planning level. Exact flight dates/times remain in the conversation rather than this public repository.

**Boundaries:** This is an approved planning target, not a delivery guarantee, evidence of feasibility, a public release date, approval of every suggested feature, or permission to start implementation before the design transition under D-003. Scope, capacity, budget, acceptance criteria, and dependency feasibility still need evaluation. No reminder, calendar event, or automated task is requested or created by this decision.

**Affected documents:** Product brief, README, decision register, open-question register. The blueprint's current-section status stays DRAFT.

**Related questions:** Q-004 timing subquestion resolved. Monthly app-running costs, one-time costs, and development/maintenance capacity remain open. D-014's later trip-spending answer does not resolve those app costs. Q-304 and Q-501/Q-502 will define how the full test is evaluated.

**Revisit when:** Scope or feasibility evidence requires an explicit target tradeoff, or the owner changes the milestone.

## D-013 — Supplied Tokyo-local travel times

**Question:** What time-of-day context must the pilot plan respect?

**Confirmed context:** The owner supplied the arrival and departure clock times and explicitly described both as Tokyo local time. The arrival is late in the day and departure is around midday. Exact values and private date/time pairs remain in the planning conversation, not in repository files or commit messages.

**Source:** The owner's timing clarification accompanying approval of D-012. These are user-supplied plans, not a live airline schedule check. Do not ask the owner to repeat the values just because they are absent from GitHub.

**Proposed product implications:** Plan for partial arrival and departure days. Keep flight arrival distinct from reaching the hotel and being ready for activities. Keep flight departure distinct from leaving the hotel and reaching the airport. Determine transfers, airport-procedure buffers, check-in/out, and any rest preference when the needed information is available. Preserve destination-local time meaning rather than treating it as the organizer's home/browser time.

**Boundaries:** No airport, airline, flight number, transfer mode/duration, check-in deadline, hotel, or sightseeing allocation is inferred. No booking access, location tracking, flight monitoring, reminder, or scheduling action is authorized. Exact buffer and scheduling rules remain proposals for later sections, not approved implementation specifications.

**Affected documents:** Product brief, README, decision register, open-question register. Carry the timing distinctions into journey, scope, and test planning later without starting those sections now.

**Related questions:** Timing context for Q-004 is supplied; detailed behavior in Q-201/Q-209, scheduling limits in Q-305, and representative tests in Q-352.

**Revisit when:** Travel times change or routing/airport/hotel information makes a planning assumption more precise.

## D-014 — Trip-spending range with plane tickets excluded

**Question:** How should the new spending-range answer be recorded?

**Confirmed input:** The owner requested a range, supplied lower and upper dollar-denominated amounts in chat, and explicitly excluded plane tickets. Preserve that input without inventing its currency or per-person/group basis. The numerical amounts stay in the conversation/private pilot configuration, not this public record.

**Context and interpretation:** This answer followed a question about monthly app-running costs. The explicit airfare exclusion indicates trip spending instead. Record it as a traveler budget input, not an infrastructure allowance. The monthly app budget in Q-004 remains unanswered. This interpretation is visible to the owner and can be corrected; do not authorize spending based on it.

**Product direction:** Support the chosen range and exclusion in the pilot's planning input. Do not silently replace the range with a single amount, assign it to app costs, or assume included categories beyond what the owner has specified.

**Still OPEN:** Currency, whether the amount covers both travelers together or each person, whether it is total-trip or remaining spending, all category inclusions, upper-bound firmness, lower-bound meaning, and cost-display/calculation behavior. Q-011 addresses the immediate basis/currency ambiguity; Q-211 covers later detailed behavior.

**Proposed safeguards:** Configurable inputs rather than hardcoded personal amounts; do not treat the lower bound as a required minimum spend; clarify before using the upper bound as a hard cap; show estimates and unknown prices honestly; separate shared/per-person and paid/remaining amounts; avoid counting deposits twice. Excluding airfare from a budget does not remove flight times from itinerary planning. These safeguards are proposals, not a complete accounting specification.

**Evidence limits and boundaries:** No affordability conclusion, currency conversion, nightly/daily allowance, category allocation, or permission to spend is established. No provider, pricing source, expense-tracking integration, or financial transaction is selected.

**Affected documents:** Product brief, README, decision register, open questions. Public records preserve the requirement and unresolved basis, not personal financial figures.

**Related questions:** Q-004 app budget remains OPEN; Q-011 is next; detailed budget behavior in Q-211, scope in Q-308, and data/test considerations in Q-402/Q-404/Q-352.

**Revisit when:** The owner clarifies the budget basis, included costs, or spending preferences.

## D-015 — Reservation-aware events and restaurants

**Question:** Should the plan account for events and restaurants that require reservations?

**Decision:** Yes. Account for reservation requirements when planning events and restaurants.

**Source:** The owner's explicit instruction to take into account events or restaurants requiring reservations, supplied with the spending-range answer.

**Scope effect:** Carry the requirement into discovery, scheduling, and pilot scope. Do not silently treat reservation-dependent event/dining planning as unrelated future-only work. Detailed coverage, automation, and feature depth remain to be agreed.

**Proposed product implications:** Distinguish reservation requirement, traveler booking state, and payment state. Show trusted booking instructions and known release/deadline information with local-time/source context; unknown is not available or booked. Keep an unconfirmed suggested slot tentative, protect confirmed timed commitments during replanning, and surface alternatives when booking is unavailable. Consider relevant deposits/fees without double-counting. Exact fields, rules, UI, sources, and acceptance criteria remain proposals.

**Boundaries:** No automatic or in-app reservations, payments, cancellations, modifications, account/email access, availability guarantee, provider choice, release-date monitoring, notifications, or reminders are authorized by this requirement. No specific event/restaurant has been selected or externally verified, and no reservation has been made. An organizer's entered status and provider-verified status are not the same evidence.

**Evidence limits:** This is a planning requirement, not proof that all required booking-window or availability data can be obtained, or that the requested scope fits the test target. Later feasibility findings may require an explicit tradeoff.

**Affected documents:** Product brief, README, decision register, open questions; later journeys, scope, data, and verification planning.

**Related questions:** Q-210 reservation behavior, Q-307 pilot depth, Q-305 scheduling, Q-355 data feasibility, and Q-402/Q-404 data sources and concepts. Inclusion itself is answered; do not re-ask it.

**Revisit when:** The owner refines the reservation experience or source/coverage evidence requires an explicit scope decision.

## Approval register

| Item | Status | Approval evidence |
| --- | --- | --- |
| Blueprint as planning framework | Adopted | D-001 |
| Section 1 completed product brief | NOT APPROVED — draft | None |
| Immediate pilot priority and ultimate business direction | CONFIRMED at objective level | D-006 and D-007 |
| Pilot group: couple, two travelers | CONFIRMED for pilot | D-008 |
| Hotels and transportation in product coverage | CONFIRMED at capability level | D-009 |
| First-version hotel/transport organization and recommendations | CONFIRMED at capability level | D-010 |
| Tokyo and stated travel window | CONFIRMED context; exact private dates omitted | D-011 |
| First complete test: November 10, 2026 | APPROVED planning target; not a delivery guarantee | D-012 |
| Tokyo-local arrival/departure timing | CONFIRMED user-supplied context; exact times omitted | D-013 |
| Trip-budget range excluding plane tickets | INPUT RECORDED; currency and person/group basis OPEN | D-014 |
| Event/restaurant reservation consideration | CONFIRMED planning requirement; details OPEN | D-015 |
| Monthly app-running/testing budget | UNANSWERED; trip budget is not an app allowance | Q-004 |
| Sections 2–15 | NOT STARTED | None |
| Complete pilot and first-public-release feature scope | NOT APPROVED; individual decisions above apply | None for complete scope |
| Technical architecture and stack | NOT SELECTED | None |
| Monetization details and platform selection | NOT SELECTED | None |
| Design-to-implementation transition | NOT APPROVED | None |

## Proposals that must not be mistaken for decisions

Organizer-led editing with companion suggestions; shared links showing only published updates; private unfinished edits; companion access without installation/accounts; Keep as interest rather than mandatory scheduling; must-dos/locked commitments; exact destination scope; Just exploring; provider/AI choices; advanced replanning; multi-city support; booking/payment integrations; an ads/billing-free pilot; pricing/ad placements; native or web-first delivery; imports; transport modes; recommendation criteria; scheduling and airport/transfer buffers; budget calculation/allocation rules; exact reservation/payment states; reminder/notification features.

The confirmed concepts and inputs under D-006 through D-015 do not approve all detailed behavior. Trip-budget values are not an infrastructure allowance, and reservation awareness is not permission to make bookings. Coherent suggestions remain proposals until decided.

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
