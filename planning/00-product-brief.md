# Section 1 — Product Vision and Problem Brief

**Lifecycle status:** DRAFT — not approved as a completed section.  
**Owner:** Project owner (`fgzmac`); assistant facilitates drafting.  
**Phase:** Product design.  
**Last updated:** 2026-09-19.  
**Source:** The project owner's supplied travel-app concept, organizer-to-companion use case, Japan-pilot and commercial objectives, two-traveler pilot profile, and hotel/transportation requirement.  
**Related framework:** [Blueprint, Section 1](blueprint.md#1-product-vision-and-problem-brief).  
**Next review trigger:** The owner's answer about hotel/transport support: organize existing bookings, recommend options, or both (Q-009).  
**Approval record:** None yet.

> Saving this draft does not approve every proposal it contains. CONFIRMED decisions, PROPOSED directions, ASSUMPTIONS, and OPEN questions are different states.

## 1.1 Working product name

**Working label:** Travel Itinerary App.  
**Repository:** `fgzmac/OnToTheNext`.

The repository name is confirmed. It does not automatically establish the final app name or brand. Naming should not block the product planning.

**Status:** OPEN for the final product name; repository confirmed. See Q-001 and D-004.

## 1.2 One-sentence description

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

This wording combines the supplied Discover, Organize, and Delight direction without positioning the product primarily as an AI tool. Product coverage now explicitly includes hotels and transportation alongside activities (D-009); exact support levels remain to be defined.

**Status:** PROPOSED wording based on the adopted base idea. Exact wording is not yet approved.

## 1.3 Primary use case

> Someone plans a trip they are taking and shares that plan with their travel companions.

The organizer participates in the trip. The primary use case is not arranging a completely secret trip for someone else.

The emotional experience is **“Look what I planned for us.”** The practical experience is **“Here is our plan, and here is what we need to know next.”**

**Status:** CONFIRMED. See D-002.

## 1.4 The problem we are trying to solve

**Problem hypothesis:** A trip organizer needs to connect three tasks.

**Choosing:** Discover experiences that fit the group rather than collecting an overwhelming list of popular places.

**Planning:** Bring activity choices, hotel stays, and transportation together into days that make sense given timing, location, travel, budget, and the group's pace.

**Sharing:** Present the plan in a way that excites companions while giving them clear, usable trip details.

Our hypothesis is that organizers would benefit from completing these tasks in a connected experience instead of manually assembling the result across separate resources. Hotel and transportation planning coverage is an explicit product requirement (D-009); the claimed benefit of integrating it still needs validation.

**Status:** Problem/value ASSUMPTION to validate. The problem has not yet been validated through research recorded in this blueprint.

## 1.5 When the problem occurs

The base scenario is an organizer preparing an upcoming trip with other people and moving from general ideas to a plan everyone can understand and use.

**Confirmed initial testing context:** A Japan-trip pilot in November is the immediate development and testing goal. This takes priority over commercial launch. The travel year, exact dates, trip duration, cities, and pilot-ready deadline have not yet been explicitly confirmed; do not invent a public-launch deadline from the month alone. See D-006 and Q-004.

The experience continues after sharing. During the trip, the group needs to consult the plan and may need to adjust an activity.

A **Just exploring** mode could support people without dates, with date-specific verification when they commit. Its first-release inclusion remains undecided.

**Status:** Upcoming group-trip planning and the Japan pilot are CONFIRMED. Exploring mode is PROPOSED.

## 1.6 Current workaround

The organizer may gather ideas from search results, maps, social media, travel sites, and recommendations. They may organize those ideas in notes, spreadsheets, saved lists, or messages before sharing details with companions.

The tools actually used by our initial audience, and the relative difficulty of this process, have not been established.

**Status:** ASSUMPTION, not a confirmed description of every intended user.

## 1.7 Why the current approach may be insufficient

Candidate pain points to investigate:

- Narrowing options to experiences that fit the group.
- Checking whether choices form a practical schedule, including hotel locations and transportation needs.
- Keeping companions informed without repeatedly explaining or resending details.
- Making the shared plan personal without creating a separate presentation.

Research should establish which problems matter, to whom, and whether people want a new tool to solve them. We have not yet selected the single most important pain point for the initial audience.

**Status:** ASSUMPTIONS. Pilot audience is now confirmed in D-008; see Q-006 and Q-010 for evidence and wider targeting.

## 1.8 Primary and secondary users

| User | Main goal | Intended support |
| --- | --- | --- |
| Organizer | Plan a trip they will take with companions. | Discover options, make choices, account for activities/hotels/transportation, review a realistic schedule, personalize the presentation, and share the plan. |
| Travel companion | Understand, anticipate, and participate in the trip. | Enjoy receiving the itinerary and find relevant details while traveling. |

These are roles within a trip, not necessarily permanent account types.

**Initial pilot:** A couple, **two travelers total**: one organizer and one companion. The project owner is the initial organizer/tester. This is the anonymous first-use profile recorded under D-008; no names, ages, bookings, or identifying details are needed in the planning repository.

**Boundaries:** The pilot does not impose a permanent two-person limit, make the commercial service couples-only, imply identical preferences, or require a romantic presentation theme. The companion's actual participation in app testing remains to be arranged.

**Eventual commercial audience:** Still OPEN (Q-010). Testing with the pilot group does not automatically select the broader customer segment or validate demand from other travelers.

Whether companions can view, suggest, or directly edit belongs in Section 2 — Users, Roles, and Ownership. No permission model has been approved, including for the two-person pilot.

**Status:** Pilot group and count are CONFIRMED; Q-003 resolved for the pilot. Broader commercial segment, testing participation, and permissions remain OPEN. See D-008, Q-008, Q-010, and Q-101.

## 1.9 Core value: Discover, Organize, Delight

| Responsibility | User question | Intended value |
| --- | --- | --- |
| Discover | “What would we actually enjoy doing?” | A manageable selection of personally relevant options with understandable reasons. |
| Organize | “How do these choices become a trip that works?” | Realistic days that account for activities, hotels, transportation, important commitments, timing, and downtime. |
| Delight | “How do I make everyone excited about this?” | Personalized sharing connected to an itinerary that remains practical to use. |

The supplied concept recommends that **Keep means interest, not guaranteed scheduling**. This is an important proposed rule to resolve explicitly during journey and feature design; listing it here does not finalize all shortlist behavior.

### Hotels and transportation

**Confirmed requirement:** The app/service must account for hotels and transportation, not only activities (D-009).

**Open product-level distinction (Q-009):** Should the first version organize arrangements already booked, recommend options before booking, or do both? Hotel and transportation support may have different initial depths.

The following are **proposed considerations**, not approved feature specifications:

| Area | What to consider in later design |
| --- | --- |
| Hotel stays | Location, stay dates, check-in/check-out constraints, and how each stay affects the start/end of a day. |
| Main journeys and transfers | Relevant arrivals/departures, fixed commitments, and time unavailable for activities. Exact modes and coverage remain open. |
| Local transportation | Movement between accommodation and activities, travel time, and the selected travel mode. |
| Trip costs | Accommodation, transport, and activity costs together; clearly distinguish per-person costs from shared costs and estimates from known amounts. |
| Shared itinerary | Practical access to stay and journey information, with visibility rules still to be decided. |

Accounting for a reservation is not the same as making one. No direct booking/payment, cancellation, automatic import, live-price guarantee, data provider, or transport-mode commitment has been approved. This product requirement must carry forward into later scope and system discussions without silently filling in those choices.

**Status:** The three-part purpose and hotel/transport product coverage are CONFIRMED directions. Detailed workflows, rules, and pilot depth remain PROPOSED or OPEN. See D-009, Q-009, and Q-209.

## 1.10 Intended distinguishing idea

> Connect the experience of choosing a trip, anticipating it together, and using the plan while traveling.

The intended distinction is the combination of **personal fit**, **practical fit**, **personal presentation**, and **continued usefulness**. The itinerary is the output; the overall planning and shared experience are the design focus.

This is positioning to test, not a researched claim that competing products lack these features.

**Status:** PROPOSED positioning based on the supplied concept.

## 1.11 Long-term vision

> Become a planning companion that helps a group move from initial trip inspiration to a shared, adaptable travel experience.

**Confirmed commercial ambition:** Launch through a mobile app store or as a SaaS product and earn revenue from subscriptions and advertising. The distribution approach has not been selected. The revenue mechanisms are intended directions, not evidence of profitability or a finalized monetization design. See D-007.

Possible product extensions include broader destinations, multi-city trips, richer companion input, date-specific events, and more advanced adjustments during the trip.

Mentioning an extension here does not commit it to the pilot or first commercial release. Some capabilities may be tested earlier if approved scope and dependency evidence justify them. Hotel/transport coverage itself is confirmed in D-009 and must not be treated as merely a hypothetical later extension; its initial depth remains open.

**Status:** Commercial objective, revenue direction, and hotel/transport inclusion are CONFIRMED. Individual extensions and distribution choices remain PROPOSED or OPEN.

## 1.12 First-release promise

### Immediate Japan pilot

**Confirmed goal:** Develop and test the app for the November Japan trip before prioritizing a commercial launch. The pilot involves two travelers (D-008). This is a real-use testing milestone, not a commitment to publicly release a monetized app by November.

**Proposed pilot promise:**

> For the destinations needed by the Japan pilot, the organizer can choose preferences, keep appealing activities, account for hotels and transportation at the agreed pilot support level, review and adjust a realistic itinerary, and share a polished, mobile-friendly version with the companion.

The proposed complete test preserves all three product jobs: Discover, Organize, and Delight. Personalized sharing is part of the concept to test, rather than decoration to consider only after the planning tools are finished.

The first test does not necessarily require elaborate animation or many presentation styles. A minimum meaningful reveal and a usable trip view could test the principle.

Japan is the confirmed pilot context, not a promise of nationwide coverage or a permanent Japan-only product. The actual cities, single-city versus multi-city needs, trip duration, essential features, scheduling guarantees, and supported devices are still OPEN. Hotel/transport depth must be clarified through Q-009 and later scope decisions. Do not silently exclude a trip need based on an earlier generic scope suggestion.

### First commercial release

The public release is a separate milestone. Its date, audience, platform, wider destination coverage, production requirements, and monetization behavior are not yet approved.

**Status:** Pilot priority/group and hotel/transport product coverage are CONFIRMED (D-006, D-008, D-009). Detailed pilot promise and first-commercial-release scope remain PROPOSED or OPEN. See Q-005, Q-009, Q-301, Q-302, and Q-306.

## 1.13 Explicit non-goals and presentation boundaries

**Proposed first-release exclusions:** Broad worldwide coverage, complex multi-city travel, unrestricted group editing, group voting, advanced same-day replanning, and in-app booking/payment.

These exclusions require approval; they are not already recorded as rejected features. In particular, the Japan pilot's city-to-city needs must be understood before deciding how much multi-city support is necessary.

**Hotel/transport clarification:** A proposed exclusion of in-app booking/payment does not exclude including hotel stays or journeys in the plan. Adding hotel/transport coverage does not itself approve selling, changing, or canceling reservations. Existing-plan organization, recommendations, and transactional booking are separate capabilities.

**Proposed pilot sequencing:** Validate the core planning and sharing experience before implementing subscription billing, ads, or app-store publication work. The owner has confirmed that the pilot comes first, but has not yet approved the detailed monetization exclusions for that pilot. Revenue intent alone is not authorization to build billing or advertising now. See Q-306.

The supplied design direction also calls for two important boundaries:

**Do not misrepresent booking status.** A suggested activity, hotel, or journey must not look reserved or paid merely because it appears in a polished itinerary. The exact representation and source of those statuses need specification.

**Do not obstruct practical use with the reveal.** Recipients should not have to replay an introduction whenever they need an address, time, or booking detail.

These boundaries will need observable criteria in later feature specifications.

**Status:** Exclusions and detailed sequencing are PROPOSED. Presentation safeguards are part of the supplied design direction, with detailed behavior still to be specified.

## 1.14 Evidence and important assumptions

**Established in this planning record:** The owner's concept, the three product responsibilities, the primary organizer-to-companion use case, the sequential planning process, the GitHub repository, the intended later implementation workflow, the Japan-first pilot priority, the longer-term subscription/ad-supported commercial ambition, the two-traveler couple pilot, and the requirement to account for hotels and transportation.

**Not documented:** Interviews, observed planning sessions, prototype findings, willingness to pay, comparative product research, real provider tests, or scheduling evaluation results. Choosing a real trip as the pilot does not mean testing has already happened.

Important assumptions:

1. Organizers want a connected discovery, planning, and sharing workflow.
2. Personalized presentation provides meaningful value to organizers and companions.
3. The practical plan reduces effort or confusion compared with current workarounds, including coordinating activities, accommodation, and transportation.
4. Reliable information is available under usable technical, commercial, and content conditions. Hotel/transport availability, schedules, and pricing must not be assumed reliable where the selected feature depends on them.
5. Realistic schedules can be produced within an acceptable cost and reliability budget.
6. Other travelers will see enough ongoing value to subscribe, and advertising can support the business without undermining the experience. This needs separate commercial validation; one successful trip does not establish it.

These will become specific experiments in Section 5. No demand, cost, coverage, correctness, or revenue claims are being treated as validated.

**Status:** ASSUMPTIONS and evidence gaps. See Q-006 and Q-354.

## 1.15 Project goal, business model, and distribution

**Confirmed process goal:** Design the app through the blueprint, organize the maintained planning record in GitHub, and use Codex to build after the design phase.

| Priority | Objective | Status |
| --- | --- | --- |
| Immediate | Develop and test the app for the November Japan trip. | CONFIRMED — D-006 |
| Ultimate | Launch a commercial mobile app-store or SaaS product and earn subscription and advertising revenue. | CONFIRMED direction — D-007 |

**Order of work:** The Japan pilot comes first. The commercial ambition should inform later design decisions without turning the pilot into a requirement to ship the entire commercial business at once.

**Business-model direction:** Subscriptions and advertising are confirmed intended revenue sources. Pricing, billing intervals, free versus paid features, trial behavior, ad format and placement, ad-free plans, vendors, and the point at which monetization is introduced remain OPEN. No booking commission or other revenue stream has been selected, including following the hotel/transport requirement. See resolved Q-007 and open Q-306/Q-407.

**Initial testing path:** The owner will develop and test against the Japan trip, whose travel party is one organizer and one companion. Companion testing participation and feedback arrangements remain open. Recruiting broader testers and eventual customer acquisition are not yet defined. See resolved Q-003 and open Q-008/Q-010.

**Distribution:** Mobile app-store release versus SaaS delivery remains OPEN. No operating system, platform order, app-store listing, hosting plan, billing provider, or initial pilot delivery mechanism is selected. No public-launch date is promised.

**Status:** Q-002 is resolved at the objective/priority level. Q-007 is resolved at the revenue-direction level. Detailed commercial and distribution decisions remain open.

## 1.16 Constraints

**Confirmed process constraints:** Complete the blueprint sequentially; keep this workflow in design; maintain the planning documents in `fgzmac/OnToTheNext`; use Codex for implementation after the design phase.

**Confirmed immediate context:** The November Japan pilot takes priority and has two travelers. Month, country, and anonymous pilot group are established; year, exact dates, pre-trip readiness date, and cities are not explicitly confirmed. Store only the minimum milestone information in this public repository; do not commit names, bookings, addresses, or detailed private travel schedules.

**Open delivery constraints:** Available development time, budget, maintenance capacity, supported devices, operating-cost limits, detailed pilot coverage, hotel/transport support depth, and commercial launch timing. See Q-004, Q-009, and Q-301.

**Unselected technical decisions:** Stack, database, identity/access system, AI components, and external data providers. See Q-401.

Google Places, Google Routes, and Ticketmaster in the supplied concept are candidates to investigate, not approved dependencies. Any actual selection requires current provider documentation, coverage, cost, and content-use evaluation. No accommodation, transport-timetable, reservation, or price-comparison provider has been selected either.

**Repository visibility:** The repository was verified as public on 2026-09-19. Use fictional/redacted examples; do not commit credentials, private booking details, or identifying research responses. Public visibility does not mean the eventual app or its itineraries should be public.

## 1.17 Completion and next discussion

This section is drafted, not finalized. The project objective, immediate priority, intended revenue direction, initial pilot group/count, and hotel/transport product inclusion are now confirmed. The broader commercial audience, practical constraints, evidence, and exact pilot/public-release promises still require decisions or explicit deferral.

The immediate next question is Q-009: **For hotels and transportation, should the first version organize bookings already made, recommend options to choose from, or do both?** The answers may differ between hotels and transportation. This is a product-level capability question, not a request for private booking details.

Continue through the remaining Section 1 questions one at a time. Do not re-ask Q-002, the pilot group/count in Q-003, the high-level Q-007, or whether hotels/transportation should be included at all. The remaining broader-audience portion of Q-003 is tracked separately as Q-010. Do not jump to companion permissions or implementation. When the owner approves this section, update the approval record, decision register, question register, and blueprint tracker together.

## Revision record

| Date | Change | Approval effect |
| --- | --- | --- |
| 2026-09-19 | Saved the initial product-brief draft and linked the confirmed repository. | No section approval; proposals and assumptions remain labeled. |
| 2026-09-19 | Recorded the November Japan pilot as the first priority and commercial launch with subscriptions and ads as the ultimate goal; separated pilot and public-release decisions. | D-006 and D-007 confirmed; the section remains DRAFT. |
| 2026-09-19 | Recorded the two-person couple pilot and required hotel/transport coverage; updated the proposed promise and queued the support-depth question. | D-008 and D-009 confirmed; detailed hotel/transport scope and the whole section remain unapproved. |
