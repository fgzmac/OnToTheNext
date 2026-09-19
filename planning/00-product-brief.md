# Section 1 — Product Vision and Problem Brief

**Lifecycle status:** DRAFT — not approved as a completed section.  
**Owner:** Project owner (`fgzmac`); assistant facilitates drafting.  
**Phase:** Product design.  
**Last updated:** 2026-09-19.  
**Source:** The project owner's supplied travel-app concept, organizer-to-companion use case, Japan-pilot and commercial objectives, two-traveler pilot profile, confirmation of both hotel/transport support paths, Tokyo/travel-window clarification, and approval of the first-test target with local travel times supplied in chat.  
**Related framework:** [Blueprint, Section 1](blueprint.md#1-product-vision-and-problem-brief).  
**Next review trigger:** The owner's answer about the monthly budget for running and testing the app, separate from travel costs (Q-004).  
**Approval record:** Section not yet approved. Individual timing target approved under D-012.

> Saving this draft does not approve every proposal it contains. CONFIRMED decisions, PROPOSED directions, ASSUMPTIONS, and OPEN questions are different states.

## 1.1 Working product name

**Working label:** Travel Itinerary App.  
**Repository:** `fgzmac/OnToTheNext`.

The repository name is confirmed. It does not automatically establish the final app name or brand. Naming should not block the product planning.

**Status:** OPEN for the final product name; repository confirmed. See Q-001 and D-004.

## 1.2 One-sentence description

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

This wording combines the supplied Discover, Organize, and Delight direction without positioning the product primarily as an AI tool. Product coverage explicitly includes hotels and transportation alongside activities (D-009). For both hotels and transportation, the first version must organize existing bookings and recommend options before booking (D-010); detailed workflows and technical methods remain to be defined.

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

**Confirmed initial testing context:** A Japan-trip pilot takes priority over commercial launch. Tokyo is a confirmed destination. The owner has supplied the travel month/day endpoints and local arrival/departure times in the planning conversation. The public record retains a late-November to early-December window with an approximately two-week calendar span, a late-day arrival, and a midday departure; exact private dates and clock times are not reproduced here. See D-006, D-011, and D-013.

**Confirmed planning calendar and test target:** The owner accepted **November 10, 2026** for the first complete test (D-012), establishing the 2026 pre-trip planning calendar. This is not a public-launch date or a delivery guarantee. Other destinations, airports, hotel arrangements, transfer durations, and practical activity windows remain open. Do not assume the entire trip is spent in Tokyo or that arrival/departure days are full activity days.

The experience continues after sharing. During the trip, the group needs to consult the plan and may need to adjust an activity.

A **Just exploring** mode could support people without dates, with date-specific verification when they commit. Its first-release inclusion remains undecided.

**Status:** Upcoming group-trip planning, Tokyo, the stated travel window, local timing context, and the dated first-test target are CONFIRMED. Detailed scheduling behavior and exploring mode remain PROPOSED or OPEN.

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

**Confirmed first-version support (D-010; Q-009 resolved):** Both organizing existing bookings and recommending options before booking are required for both product areas.

| Area | Existing-booking organization | Recommendations before booking |
| --- | --- | --- |
| Hotels | Include already-booked stays in the trip plan. | Help the organizer find and choose hotel options. |
| Transportation | Include already-booked transportation in the trip plan. | Help the organizer find and choose transportation options. |

These are capability-level requirements for the first version, not merely future ideas. Do not silently reduce the pilot to existing-booking organization alone. Any change to that inclusion requires an explicit scope decision.

The following are **proposed considerations**, not approved feature specifications:

| Area | What to consider in later design |
| --- | --- |
| Hotel stays | Location, stay dates, check-in/check-out constraints, and how each stay affects the start/end of a day. |
| Main journeys and transfers | Relevant arrivals/departures, fixed commitments, and time unavailable for activities. Distinguish flight times from hotel arrival and the time to leave for an airport. Exact modes and coverage remain open. |
| Local transportation | Movement between accommodation and activities, travel time, and the selected travel mode. |
| Trip costs | Accommodation, transport, and activity costs together; clearly distinguish per-person costs from shared costs and estimates from known amounts. |
| Shared itinerary | Practical access to stay and journey information, with visibility rules still to be decided. |

Accounting for a reservation or recommending an option is not the same as making a reservation. No direct booking/payment, cancellation, automatic import, live-price guarantee, data provider, or transport-mode commitment has been approved. Manual entry, import mechanisms, recommendation criteria, availability verification, and booking handoffs remain design questions in Q-209 and the later scope/system sections.

**Status:** The three-part purpose, hotel/transport coverage, and both first-version support paths are CONFIRMED directions. Detailed workflows, rules, modes, coverage, and technical methods remain PROPOSED or OPEN. See D-009, D-010, and Q-209.

## 1.10 Intended distinguishing idea

> Connect the experience of choosing a trip, anticipating it together, and using the plan while traveling.

The intended distinction is the combination of **personal fit**, **practical fit**, **personal presentation**, and **continued usefulness**. The itinerary is the output; the overall planning and shared experience are the design focus.

This is positioning to test, not a researched claim that competing products lack these features.

**Status:** PROPOSED positioning based on the supplied concept.

## 1.11 Long-term vision

> Become a planning companion that helps a group move from initial trip inspiration to a shared, adaptable travel experience.

**Confirmed commercial ambition:** Launch through a mobile app store or as a SaaS product and earn revenue from subscriptions and advertising. The distribution approach has not been selected. The revenue mechanisms are intended directions, not evidence of profitability or a finalized monetization design. See D-007.

Possible product extensions include broader destinations, multi-city trips, richer companion input, date-specific events, and more advanced adjustments during the trip.

Mentioning an extension here does not commit it to the pilot or first commercial release. Some capabilities may be tested earlier if approved scope and dependency evidence justify them. Hotel/transport coverage is confirmed in D-009, and both existing-booking organization and recommendations are required for the first version under D-010. These must not be treated as merely hypothetical later extensions; their detailed implementation remains open.

**Status:** Commercial objective, revenue direction, hotel/transport inclusion, and first-version support paths are CONFIRMED. Individual extensions and distribution choices remain PROPOSED or OPEN.

## 1.12 First-release promise

### Immediate Japan pilot

**Confirmed goal:** Develop and test the app for the Japan trip beginning in November and ending in December before prioritizing a commercial launch. Tokyo is confirmed (D-011); the pilot involves two travelers (D-008). The approved first complete test target is **November 10, 2026** (D-012). This is a real-use testing milestone, not a commitment to publicly release a monetized app by November.

**Proposed pilot promise incorporating confirmed capabilities:**

> For the destinations needed by the Japan pilot, the organizer can choose preferences, keep appealing activities, organize existing hotel and transportation bookings, receive hotel and transportation recommendations, review and adjust a realistic itinerary, and share a polished, mobile-friendly version with the companion.

The proposed complete test preserves all three product jobs: Discover, Organize, and Delight. Personalized sharing is part of the concept to test, rather than decoration to consider only after the planning tools are finished.

The first test does not necessarily require elaborate animation or many presentation styles. A minimum meaningful reveal and a usable trip view could test the principle.

Japan is the confirmed pilot context, not a promise of nationwide coverage or a permanent Japan-only product. Tokyo is included; additional cities, single-city versus multi-city needs, practical activity windows, scheduling guarantees, and supported devices are still OPEN. Local arrival/departure times have been supplied privately (D-013), but transfer and airport-processing assumptions are not established. The two hotel/transport support paths are selected; exact modes, coverage, and behavior remain for later scope decisions. Do not silently exclude a required capability or trip need based on an earlier generic scope suggestion.

### First commercial release

The public release is a separate milestone. Its date, audience, platform, wider destination coverage, production requirements, and monetization behavior are not yet approved.

**Status:** Pilot priority/group, Tokyo, timing context, dated testing target, and both hotel/transport support paths are CONFIRMED at context/capability level (D-006, D-008 through D-013). The complete pilot promise, detailed feature specifications, and first-commercial-release scope remain PROPOSED or OPEN. See Q-005, Q-301, Q-302, and Q-306.

## 1.13 Explicit non-goals and presentation boundaries

**Proposed first-release exclusions:** Broad worldwide coverage, complex multi-city travel, unrestricted group editing, group voting, advanced same-day replanning, and in-app booking/payment.

These exclusions require approval; they are not already recorded as rejected features. In particular, the Japan pilot's city-to-city needs must be understood before deciding how much multi-city support is necessary. Tokyo being named does not confirm a Tokyo-only trip.

**Hotel/transport clarification:** A proposed exclusion of in-app booking/payment does not exclude organizing existing hotel stays or journeys, or recommending options. Those first-version capabilities are confirmed in D-010. Their inclusion does not approve selling, changing, or canceling reservations. Existing-plan organization, recommendations, and transactional booking are separate capabilities.

**Proposed pilot sequencing:** Validate the core planning and sharing experience before implementing subscription billing, ads, or app-store publication work. The owner has confirmed that the pilot comes first, but has not yet approved the detailed monetization exclusions for that pilot. Revenue intent alone is not authorization to build billing or advertising now. See Q-306.

The supplied design direction also calls for two important boundaries:

**Do not misrepresent booking status.** A suggested activity, hotel, or journey must not look reserved or paid merely because it appears in a polished itinerary. The exact representation and source of those statuses need specification.

**Do not obstruct practical use with the reveal.** Recipients should not have to replay an introduction whenever they need an address, time, or booking detail.

These boundaries will need observable criteria in later feature specifications.

**Status:** Exclusions and detailed sequencing are PROPOSED. Presentation safeguards are part of the supplied design direction, with detailed behavior still to be specified.

## 1.14 Evidence and important assumptions

**Established in this planning record:** The owner's concept, the three product responsibilities, the primary organizer-to-companion use case, the sequential planning process, the GitHub repository, the intended later implementation workflow, the Japan-first pilot priority, the longer-term subscription/ad-supported commercial ambition, the two-traveler couple pilot, first-version support for both organizing existing hotel/transport bookings and recommending options, Tokyo/travel-window context, and the approved first-test target. Exact local travel times are user-supplied in the chat, not provider-verified or published here.

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
| Immediate | First complete test targeted for November 10, 2026, ahead of the Japan trip beginning in November and ending in December. | CONFIRMED target — D-006, D-011, D-012 |
| Ultimate | Launch a commercial mobile app-store or SaaS product and earn subscription and advertising revenue. | CONFIRMED direction — D-007 |

**Order of work:** The Japan pilot comes first. The commercial ambition should inform later design decisions without turning the pilot into a requirement to ship the entire commercial business at once.

**Business-model direction:** Subscriptions and advertising are confirmed intended revenue sources. Pricing, billing intervals, free versus paid features, trial behavior, ad format and placement, ad-free plans, vendors, and the point at which monetization is introduced remain OPEN. No booking commission or other revenue stream has been selected, including following the hotel/transport requirement. See resolved Q-007 and open Q-306/Q-407.

**Initial testing path:** The owner will develop and test against the Japan trip, whose travel party is one organizer and one companion. Companion testing participation and feedback arrangements remain open. Recruiting broader testers and eventual customer acquisition are not yet defined. See resolved Q-003 and open Q-008/Q-010.

**Distribution:** Mobile app-store release versus SaaS delivery remains OPEN. No operating system, platform order, app-store listing, hosting plan, billing provider, or initial pilot delivery mechanism is selected. No public-launch date is promised.

**Status:** Q-002 is resolved at the objective/priority level. Q-007 is resolved at the revenue-direction level. Q-004's first-test target is approved; its budget and capacity questions remain open. Detailed commercial and distribution decisions remain open.

## 1.16 Constraints

**Confirmed process constraints:** Complete the blueprint sequentially; keep this workflow in design; maintain the planning documents in `fgzmac/OnToTheNext`; use Codex for implementation after the design phase.

**Confirmed immediate context:** The Japan pilot takes priority, includes Tokyo, and has two travelers. The owner supplied the travel month/day endpoints and arrival/departure clock times in the chat, explicitly in Tokyo local time. The public planning record retains only a late-November to early-December, approximately two-week window and partial-day arrival/departure context. Do not ask for those values again or interpret their absence from the repository as missing user input. Airports, transfer durations, hotel check-in/out times, nights per stay, and additional destinations remain unspecified.

**Approved readiness target:** First complete end-to-end test on **November 10, 2026**, as explicitly accepted by the owner (D-012). This resolves the previous proposed date and sets the 2026 pilot planning calendar. The period after this target and before travel is intended for fixes and repeat testing. This is a planning target, not a guarantee that unestimated scope will fit, not a public-launch date, and not authorization to begin implementation before design approval.

**Proposed scheduling implications from supplied travel times (D-013):** Treat arrival and departure as partial days. Do not equate airport arrival with hotel arrival or immediate activity availability, or equate a flight departure time with when travelers should leave their hotel. Account for airport procedures, transfers, check-in/out, and a rest preference when calculating usable time. Exact buffers, routing, verification, and change handling remain for later design; no durations or airport choices have been invented. Keep supplied local times distinct from the organizer's home/browser time zone.

**Confirmed capability constraint:** The first version includes both existing-booking organization and recommendations for hotels and transportation (D-010). Exact transport modes, destination coverage, sourcing, and workflow detail are still open; they must be sized without quietly dropping either selected path.

**Open delivery constraints:** Monthly running/testing budget, one-time development costs, available development time, maintenance capacity, supported devices, remaining pilot coverage, and commercial launch timing. Ask the monthly app budget next, not the travel budget. Potential categories include hosting and any paid data or AI services selected later; mentioning them does not choose vendors or approve spending. See Q-004, Q-209, and Q-301/Q-302.

**Unselected technical decisions:** Stack, database, identity/access system, AI components, and external data providers. See Q-401.

Google Places, Google Routes, and Ticketmaster in the supplied concept are candidates to investigate, not approved dependencies. Any actual selection requires current provider documentation, coverage, cost, and content-use evaluation. No accommodation, transport-timetable, reservation, or price-comparison provider has been selected either.

**Repository visibility:** The repository was verified as public on 2026-09-19. Use fictional/redacted examples; do not commit credentials, private booking details, exact private travel dates/times, or identifying research responses. The software-testing target is a project milestone, not a published flight schedule. Public visibility does not mean the eventual app or its itineraries should be public.

## 1.17 Completion and next discussion

This section is drafted, not finalized. The project objective, immediate priority, intended revenue direction, pilot group/count, hotel/transport coverage and both first-version support paths, Tokyo destination, supplied travel context, and November 10, 2026 first-test target are confirmed. The broader commercial audience, remaining budget/capacity constraints, evidence, and complete pilot/public-release promises still require decisions or explicit deferral.

The immediate next question is the running-cost portion of Q-004: **What monthly budget is the owner comfortable setting aside for running and testing the app, separate from the trip budget?** Potential categories include hosting and any paid data or AI services later selected. One-time costs, available development time, and maintenance capacity can be addressed afterward; do not ask for all constraints at once.

Do not re-ask the approved test date/year, supplied travel endpoints or local times, Q-002, the pilot group/count in Q-003, the high-level Q-007, or the resolved Q-009. The broader-audience portion of Q-003 is tracked separately as Q-010. Do not jump to companion permissions or implementation. When the owner approves this section, update the approval record, decision register, question register, and blueprint tracker together.

## Revision record

| Date | Change | Approval effect |
| --- | --- | --- |
| 2026-09-19 | Saved the initial product-brief draft and linked the confirmed repository. | No section approval; proposals and assumptions remain labeled. |
| 2026-09-19 | Recorded the November Japan pilot as the first priority and commercial launch with subscriptions and ads as the ultimate goal; separated pilot and public-release decisions. | D-006 and D-007 confirmed; the section remains DRAFT. |
| 2026-09-19 | Recorded the two-person couple pilot and required hotel/transport coverage; updated the proposed promise and queued the support-depth question. | D-008 and D-009 confirmed; detailed hotel/transport scope and the whole section remain unapproved. |
| 2026-09-19 | Confirmed both existing-booking organization and recommendations for hotels and transportation in the first version; resolved Q-009 and moved the next discussion to the pilot-ready date. | D-010 confirmed at capability level; detailed specifications and Section 1 approval remain open. |
| 2026-09-19 | Recorded Tokyo and the month-spanning travel window without publishing exact private dates; separated travel timing from the proposed pre-trip test target. | D-011 records confirmed context; year remained an assumption and test target proposed at this revision. |
| 2026-09-19 | Recorded explicit approval of November 10, 2026 for the first complete test and receipt of Tokyo-local arrival/departure times; kept private flight details out of the repository and advanced to app budget. | D-012 confirms the target; D-013 records supplied timing context; Section 1 remains DRAFT. |
