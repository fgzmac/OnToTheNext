# Section 1 — Product Vision and Problem Brief

**Lifecycle status:** DRAFT — not approved as a completed section.  
**Owner:** Project owner (`fgzmac`); assistant facilitates drafting.  
**Phase:** Product design.  
**Last updated:** 2026-09-19.  
**Source:** The owner's app concept and decisions through D-017, including per-person trip-budget basis and the free-first, flexible app-spending policy.  
**Related framework:** [Blueprint, Section 1](blueprint.md#1-product-vision-and-problem-brief).  
**Supporting note:** [App Budget Policy and Options](00-app-budget-options.md) — adopted policy plus retained price references and scenarios, not provider selections.  
**Next review trigger:** Define the high-level standards the first working product must meet under Q-005.  
**Approval record:** Section not yet approved. Timing target approved under D-012; free-first spending policy approved under D-017. No paid service or product-acceptance decision approved.

> Saving this draft does not approve every proposal it contains. CONFIRMED decisions, PROPOSED directions, ASSUMPTIONS, and OPEN questions are different states.

## 1.1 Working product name

**Working label:** Travel Itinerary App.  
**Repository:** `fgzmac/OnToTheNext`.

The repository name is confirmed. It does not automatically establish the final app name or brand. Naming should not block the product planning.

**Status:** OPEN for the final product name; repository confirmed. See Q-001 and D-004.

## 1.2 One-sentence description

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

This wording combines Discover, Organize, and Delight without positioning the product primarily as an AI tool. Product coverage includes hotels and transportation alongside activities (D-009). Both hotel/transport existing-booking organization and recommendations are first-version requirements (D-010). The owner also wants a trip-budget range excluding plane tickets (D-014), now confirmed as per person (D-016), and planning that accounts for events and restaurants requiring reservations (D-015). Detailed behavior remains to be specified.

**Status:** PROPOSED wording based on the adopted base idea. Exact wording is not yet approved.

## 1.3 Primary use case

> Someone plans a trip they are taking and shares that plan with their travel companions.

The organizer participates in the trip. The primary use case is not arranging a completely secret trip for someone else.

The emotional experience is **“Look what I planned for us.”** The practical experience is **“Here is our plan, and here is what we need to know next.”**

**Status:** CONFIRMED. See D-002.

## 1.4 The problem we are trying to solve

**Problem hypothesis:** A trip organizer needs to connect three tasks.

**Choosing:** Discover experiences that fit the group rather than collecting an overwhelming list of popular places.

**Planning:** Bring activity choices, hotel stays, transportation, spending preferences, and reservation needs together into days that make sense given timing, location, travel, budget, and the group's pace.

**Sharing:** Present the plan in a way that excites companions while giving them clear, usable trip details.

Our hypothesis is that organizers would benefit from completing these tasks in a connected experience instead of manually assembling the result across separate resources. Hotel/transport coverage and reservation-aware event/restaurant planning are explicit requirements (D-009, D-015); the claimed benefit of integrating them still needs validation.

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
- Understanding costs and which activities need reservations before the plan is dependable.
- Keeping companions informed without repeatedly explaining or resending details.
- Making the shared plan personal without creating a separate presentation.

Research should establish which problems matter, to whom, and whether people want a new tool to solve them. We have not yet selected the single most important pain point for the initial audience.

**Status:** ASSUMPTIONS. Pilot audience is confirmed in D-008; see Q-006 and Q-010 for evidence and wider targeting.

## 1.8 Primary and secondary users

| User | Main goal | Intended support |
| --- | --- | --- |
| Organizer | Plan a trip they will take with companions. | Discover options, make choices, account for activities/hotels/transportation, review a realistic schedule, personalize the presentation, and share the plan. |
| Travel companion | Understand, anticipate, and participate in the trip. | Enjoy receiving the itinerary and find relevant details while traveling. |

These are roles within a trip, not necessarily permanent account types.

**Initial pilot:** A couple, **two travelers total**: one organizer and one companion. The project owner is the initial organizer/tester. This is the anonymous first-use profile recorded under D-008; no names, ages, bookings, or identifying details are needed in the planning repository.

**Boundaries:** The pilot does not impose a permanent two-person limit, make the commercial service couples-only, imply identical preferences, or require a romantic presentation theme. The companion's actual participation in app testing remains to be arranged. The travel-budget range is now explicitly per person under D-016; this does not settle how each shared expense is allocated.

**Eventual commercial audience:** Still OPEN (Q-010). Testing with the pilot group does not automatically select the broader customer segment or validate demand from other travelers.

Whether companions can view, suggest, or directly edit belongs in Section 2 — Users, Roles, and Ownership. No permission model has been approved, including for the two-person pilot.

**Status:** Pilot group and count are CONFIRMED; Q-003 resolved for the pilot. Broader commercial segment, testing participation, and permissions remain OPEN. See D-008, Q-008, Q-010, and Q-101.

## 1.9 Core value: Discover, Organize, Delight

| Responsibility | User question | Intended value |
| --- | --- | --- |
| Discover | “What would we actually enjoy doing?” | A manageable selection of personally relevant options with understandable reasons. |
| Organize | “How do these choices become a trip that works?” | Realistic days that account for activities, hotels, transportation, budget, reservations, important commitments, timing, and downtime. |
| Delight | “How do I make everyone excited about this?” | Personalized sharing connected to an itinerary that remains practical to use. |

The supplied concept recommends that **Keep means interest, not guaranteed scheduling**. This is an important proposed rule to resolve explicitly during journey and feature design; listing it here does not finalize all shortlist behavior.

### Hotels and transportation

**Confirmed requirement:** The app/service must account for hotels and transportation, not only activities (D-009).

**Confirmed first-version support (D-010; Q-009 resolved):** Both organizing existing bookings and recommending options before booking are required for both product areas.

| Area | Existing-booking organization | Recommendations before booking |
| --- | --- | --- |
| Hotels | Include already-booked stays in the trip plan. | Help the organizer find and choose hotel options. |
| Transportation | Include already-booked transportation in the trip plan. | Help the organizer find and choose transportation options. |

These are capability-level requirements for the first version, not merely future ideas. Do not silently reduce the pilot to existing-booking organization alone. Any change to that inclusion requires an explicit scope decision. Free-first spending under D-017 does not remove either capability.

The following are **proposed considerations**, not approved feature specifications:

| Area | What to consider in later design |
| --- | --- |
| Hotel stays | Location, stay dates, check-in/check-out constraints, and how each stay affects the start/end of a day. |
| Main journeys and transfers | Relevant arrivals/departures, fixed commitments, and time unavailable for activities. Distinguish flight times from hotel arrival and the time to leave for an airport. Exact modes and coverage remain open. |
| Local transportation | Movement between accommodation and activities, travel time, and the selected travel mode. |
| Trip costs | Accommodation, transport, food, and activity costs together, subject to approved inclusions; distinguish per-person/shared costs and estimates/known amounts. The owner's plane-ticket exclusion must be preserved. |
| Shared itinerary | Practical access to stay and journey information, with visibility rules still to be decided. |

Accounting for a reservation or recommending an option is not the same as making a reservation. No direct booking/payment, cancellation, automatic import, live-price guarantee, data provider, or transport-mode commitment has been approved. Manual entry, import mechanisms, recommendation criteria, availability verification, and booking handoffs remain design questions in Q-209 and the later scope/system sections.

### Trip-budget range

**Confirmed input (D-014, clarified in D-016):** Use a low/high spending range **per person** for the pilot, excluding plane tickets. The numerical dollar-denominated bounds were supplied in chat and are retained there rather than publishing personal financial amounts in this repository. Their absence here is not missing user input.

**Interpretation:** This is a traveler budget, not an app-running allowance. The app's separate free-first spending policy is recorded in D-017. No hosting, API, AI, or development spending is authorized from the travel range.

**Still open:** Currency; whether the range covers the whole trip or remaining unspent costs; exact included categories; and how lower/upper bounds should affect suggestions. The per-person basis is answered and must not be re-asked. See Q-011 and Q-211.

**Proposed behavior:** Use configurable budget inputs rather than hardcoding pilot amounts. Do not treat the lower bound as a spending requirement. Clarify whether the upper bound is a firm ceiling or a preference; flag relevant tradeoffs rather than silently exceeding it. Separate excluded airfare from included costs while retaining flights in the schedule. Label unknown prices and estimates, distinguish shared and per-person charges, and avoid counting a deposit again as an additional full charge. A per-person budget does not establish an equal split for every shared expense. No currency conversion, category allocation, daily allowance, or affordability claim has been established. D-017's flexibility applies to app spending, not automatically to the travel range.

### Events and restaurants requiring reservations

**Confirmed requirement (D-015):** Account for events and restaurants that require reservations. Carry this into discovery and realistic-trip planning; do not quietly treat it as unrelated future work. Detailed pilot depth remains to be specified.

**Proposed design considerations:**

| Concern | Proposed treatment |
| --- | --- |
| Requirement versus booking state | Distinguish whether a reservation is required/recommended/not required/unknown from whether the traveler has actually secured one. Payment is another separate state. |
| Booking information | Show a trusted booking route and any known booking-opening time or deadline, with its relevant local time, source, and freshness. Label unavailable information; do not invent lead times or availability. |
| Tentative versus confirmed plans | A liked option or suggested time is not a secured reservation. Keep unconfirmed bookings visibly tentative; consider an alternative when unavailable. |
| Schedule protection | Place confirmed timed commitments and necessary travel/check-in buffers before flexible activities. Replanning should not silently move, replace, or cancel a booking. Exact lock/override rules remain open. |
| Budget impact | Represent known tickets, meals, deposits, and fees with clear price bases and payment status; detailed inclusion and accounting rules remain open. |

These are proposed rules for Q-210/Q-305, not an approved status schema, reminder system, or transaction integration. User-entered confirmation and provider-verified confirmation must not be conflated. No restaurants or events have been researched or chosen, and no reservations have been made.

**Status:** Product purpose, both hotel/transport support paths, per-person range-based trip-budget input excluding airfare, and event/restaurant reservation consideration are CONFIRMED at the stated level. Detailed workflows, rules, modes, coverage, and technical methods remain PROPOSED or OPEN. See D-009, D-010, D-014 through D-016 and Q-209 through Q-211.

## 1.10 Intended distinguishing idea

> Connect the experience of choosing a trip, anticipating it together, and using the plan while traveling.

The intended distinction is the combination of **personal fit**, **practical fit**, **personal presentation**, and **continued usefulness**. The itinerary is the output; the overall planning and shared experience are the design focus.

This is positioning to test, not a researched claim that competing products lack these features.

**Status:** PROPOSED positioning based on the supplied concept.

## 1.11 Long-term vision

> Become a planning companion that helps a group move from initial trip inspiration to a shared, adaptable travel experience.

**Confirmed commercial ambition:** Launch through a mobile app store or as a SaaS product and earn revenue from subscriptions and advertising. The distribution approach has not been selected. Revenue mechanisms are intended directions, not evidence of profitability or a finalized monetization design. See D-007.

**Investment sequence:** Build free first until spending is necessary; consider greater investment after a working product meets the owner's standards (D-017). This does not change the long-term commercial goal or approve any paid service now.

Possible product extensions include broader destinations, multi-city trips, richer companion input, date-specific events, and more advanced adjustments during the trip.

Mentioning an extension here does not commit it to the pilot or first commercial release. Some capabilities may be tested earlier if approved scope and dependency evidence justify them. Hotel/transport coverage and both first-version support paths are confirmed in D-009/D-010. Events requiring reservations are an explicit planning requirement under D-015; broader event discovery/coverage still needs scoping. Do not use an older generic later-feature example to silently remove a subsequently confirmed need.

**Status:** Commercial objective, revenue direction, hotel/transport support, reservation consideration, and investment sequence are CONFIRMED. Detailed extensions and distribution choices remain PROPOSED or OPEN.

## 1.12 First-release promise

### Immediate Japan pilot

**Confirmed goal:** Develop and test the app for the Japan trip beginning in November and ending in December before prioritizing a commercial launch. Tokyo is confirmed (D-011); the pilot involves two travelers (D-008). The approved first complete test target is **November 10, 2026** (D-012). This is a real-use testing milestone, not a commitment to publicly release a monetized app by November.

**Proposed pilot promise incorporating confirmed capabilities:**

> For the destinations needed by the Japan pilot, the organizer can choose preferences and a trip-budget range, keep appealing activities, organize existing hotel and transportation bookings, receive hotel and transportation recommendations, account for restaurant and event reservations, review and adjust a realistic itinerary, and share a polished, mobile-friendly version with the companion.

The proposed complete test preserves all three product jobs: Discover, Organize, and Delight. Personalized sharing is part of the concept to test, rather than decoration to consider only after the planning tools are finished.

The first test does not necessarily require elaborate animation or many presentation styles. A minimum meaningful reveal and a usable trip view could test the principle.

Japan is the confirmed pilot context, not a promise of nationwide coverage or a permanent Japan-only product. Tokyo is included; additional cities, single-city versus multi-city needs, practical activity windows, scheduling guarantees, and supported devices remain OPEN. Local arrival/departure times have been supplied privately (D-013), but transfer and airport-processing assumptions are not established. Exact modes, recommendation coverage, budget treatment, and reservation behavior remain for later scope decisions. Do not silently exclude a required capability or trip need based on an earlier generic scope suggestion, a lean-prototype example, or the free-first spending policy.

### Product standards before greater investment

D-017 establishes that the product must work and meet the owner's standards before greater discretionary spending. What those standards mean is the next Section 1 discussion under Q-005. Later, Q-304/Q-502 will turn them into observable tests. Do not mark the product accepted merely because screens are complete, a demo runs, tests against prepared data pass, or the target date arrives.

Candidate areas to discuss are recommendation usefulness, realistic scheduling, clear hotel/transport/reservation information, ease of planning, dependable saved work, and the companion-facing presentation. These are prompts for the owner's answer, not an approved checklist or an exhaustive list.

### First commercial release

The public release is a separate milestone. Its date, audience, platform, wider destination coverage, production requirements, and monetization behavior are not yet approved. Meeting the owner's standards provides a basis to consider spending more; it is not itself authorization to launch or buy services.

**Status:** Individual decisions D-006 and D-008 through D-017 apply. The complete pilot promise, quality standards, detailed specifications, and first-commercial-release scope remain PROPOSED or OPEN. See Q-005, Q-301, Q-302, Q-304, and Q-306.

## 1.13 Explicit non-goals and presentation boundaries

**Proposed first-release exclusions:** Broad worldwide coverage, complex multi-city travel, unrestricted group editing, group voting, advanced same-day replanning, and in-app booking/payment.

These exclusions require approval; they are not already recorded as rejected features. In particular, the Japan pilot's city-to-city needs must be understood before deciding how much multi-city support is necessary. Tokyo being named does not confirm a Tokyo-only trip.

**Reservation clarification:** A proposed exclusion of in-app booking/payment does not exclude organizing existing hotel/transport bookings, recommending options, or accounting for event/restaurant reservation requirements. Their inclusion does not approve selling, making, changing, or canceling reservations. Existing-plan organization, recommendations, reservation-aware scheduling, and transactions are separate capabilities.

**Proposed feature sequencing:** Validate the core planning and sharing experience before implementing subscription billing, ads, or app-store publication work. The owner has confirmed that the pilot comes first, but detailed monetization exclusions for that pilot remain open under Q-306. D-017 settles how we approach spending on development; it does not independently settle the product's billing/ad feature scope.

The supplied design direction also calls for two important boundaries:

**Do not misrepresent booking status.** A suggested activity, restaurant, event, hotel, or journey must not look reserved or paid merely because it appears in a polished itinerary. Reservation requirement, reservation status, and payment status need distinct meanings; exact representation and evidence remain to be specified.

**Do not obstruct practical use with the reveal.** Recipients should not have to replay an introduction whenever they need an address, time, or booking detail.

These boundaries will need observable criteria in later feature specifications.

**Status:** Feature exclusions and detailed sequencing are PROPOSED. Presentation safeguards are part of the supplied design direction, with detailed behavior still to be specified. Free-first spending is separately CONFIRMED under D-017.

## 1.14 Evidence and important assumptions

**Established in this planning record:** The owner's concept, organizer-to-companion use case, sequential planning process, GitHub repository, later implementation workflow, Japan-first priority, commercial subscription/ad ambition, two-traveler pilot, both hotel/transport support paths, Tokyo/travel context, approved testing target, supplied per-person trip-budget range excluding plane tickets, event/restaurant reservation requirement, and free-first spending policy. Private pilot values are in the conversation, not provider-verified or published here.

**Prior targeted external research:** The previous app-budget comparison recorded official hosting/database/runtime-AI/mapping price references, app-store fees, and one hotel API's access prerequisites. Sources and arithmetic assumptions remain in [App Budget Policy and Options](00-app-budget-options.md). This budget-policy revision does not refresh those sources. They are pricing/access references, not provider selections or live coverage tests.

**Not documented:** Interviews, observed planning sessions, prototype findings, willingness to pay, comparative product research, real provider integration tests, scheduling evaluation results, or owner acceptance of a working product. Choosing a real trip as the pilot does not mean testing has already happened.

Important assumptions:

1. Organizers want a connected discovery, planning, and sharing workflow.
2. Personalized presentation provides meaningful value to organizers and companions.
3. The practical plan reduces effort or confusion compared with current workarounds, including coordinating activities, accommodation, transportation, spending, and reservations.
4. Reliable information is available under usable technical, commercial, and content conditions. Availability, schedules, pricing, reservation requirements, and booking windows must not be treated as verified without an appropriate source.
5. Realistic schedules can be produced within acceptable cost and reliability constraints. Published infrastructure prices do not establish live hotel/reservation access or a fixed cost per itinerary. The free-first objective is not proof that every required production dependency will be free.
6. Other travelers will see enough ongoing value to subscribe, and advertising can support the business without undermining the experience. This needs separate commercial validation; one successful trip or owner acceptance does not establish it.

These will become experiments in Section 5. No demand, coverage, correctness, or revenue claims are treated as validated. Cost scenarios remain estimates until measured against a selected implementation and workload. Investigate paid dependencies early without activating paid services as part of this documentation-only phase.

**Status:** ASSUMPTIONS and evidence gaps, with limited prior official-source cost research recorded. See Q-006, Q-354, and Q-355.

## 1.15 Project goal, business model, and distribution

**Confirmed process goal:** Design the app through the blueprint, organize the maintained planning record in GitHub, and use Codex to build after the design phase.

| Priority | Objective | Status |
| --- | --- | --- |
| Immediate | First complete test targeted for November 10, 2026, ahead of the Japan trip beginning in November and ending in December. Build free first until an expense is necessary. | CONFIRMED target and spending policy — D-006, D-011, D-012, D-017 |
| Ultimate | Launch a commercial mobile app-store or SaaS product and earn subscription and advertising revenue; consider greater investment after a working product meets the owner's standards. | CONFIRMED direction — D-007, D-017 |

**Order of work:** The Japan pilot comes first. Commercial ambition should inform later design without turning the pilot into a requirement to ship the entire business at once. Flexible budget guidance does not authorize unlimited spending.

**Business-model direction:** Subscriptions and advertising are intended revenue sources. Pricing, billing intervals, free versus paid features, trial behavior, ad placement, ad-free plans, vendors, and monetization timing remain OPEN. No booking commission or other revenue stream has been selected. See resolved Q-007 and open Q-306/Q-407.

**Initial testing path:** The owner will develop and test against the Japan trip, whose travel party is one organizer and one companion. Companion testing participation and feedback arrangements remain open. Recruiting broader testers and eventual customer acquisition are not yet defined. See resolved Q-003 and open Q-008/Q-010.

**Distribution:** Mobile app-store versus web delivery remains OPEN. SaaS is a service/business model and app-store release is a distribution channel; they need not be mutually exclusive. No operating system, platform order, store listing, hosting plan, billing provider, or pilot delivery method is selected. The cost note's mobile-friendly web pilot is an assistant recommendation, not a choice established by free-first. No public-launch date is promised.

**Status:** Q-002 and high-level Q-007 are resolved. Q-004's test target and spending policy are answered; specific future costs and capacity remain open. The per-person travel range in D-014/D-016 does not fund app expenses.

## 1.16 Constraints

**Confirmed process constraints:** Complete the blueprint sequentially; keep this workflow in design; maintain planning in `fgzmac/OnToTheNext`; use Codex after the design phase. D-017 does not authorize starting implementation now.

**Confirmed immediate context:** The Japan pilot takes priority, includes Tokyo, and has two travelers. Travel date endpoints and arrival/departure clock times were supplied in the chat, explicitly in Tokyo local time. The public record retains a late-November to early-December, approximately two-week window and partial-day timing context. Do not ask for supplied values again. Airports, transfers, hotel check-in/out, nights per stay, and other destinations remain unspecified.

**Approved readiness target:** First complete end-to-end test on **November 10, 2026**, as accepted by the owner (D-012). The period afterward and before travel is intended for fixes and repeat testing. This is a planning target, not a guarantee that unestimated scope fits, a public-launch date, or implementation authorization.

**Proposed scheduling implications from supplied travel times (D-013):** Treat arrival and departure as partial days. Do not equate airport arrival with hotel arrival or activity availability, or flight departure with when travelers leave the hotel. Account for airport procedures, transfers, check-in/out, and rest preference. Exact buffers, routing, verification, and change handling remain open. Keep destination-local times distinct from the organizer's home/browser time zone.

**Confirmed capability constraints:** Preserve both hotel/transport existing-booking organization and recommendations (D-010), the per-person travel range with plane tickets excluded (D-014/D-016), and reservation-aware event/restaurant planning (D-015). Detailed implementation remains open; spending policy does not silently remove requirements.

**Two separate budgets:** The travel range is per person, excluding plane tickets. Its currency, remaining-versus-total meaning, and other categories remain open (Q-011). App spending is governed by D-017. Development tools, one-time costs, actual future service quotes, and available development/maintenance time are separate constraints under Q-004.

### Adopted app-spending policy — free first, flexible reference

**D-017 is confirmed:** Use suitable free options for design, development, and testing until an expense is necessary. Aim for no additional app-service costs while free options adequately meet the current needs.

Keep **$100/month as an initial paid-operation planning target and $150 as a flexible upper reference**, not a fixed ceiling, minimum spend, automatic cutoff, or authority to buy services. The owner explicitly said the rule is not fixed. Lower spending—including $0—is preferred where it works; higher spending can be considered later through a specific decision.

**Necessary expense review:** Before proposing payment, explain the requirement or test blocked by the free approach, alternatives considered, the smallest useful paid option, expected one-time/recurring/usage charges and overages, and the consequence of postponing it. Obtain an explicit spending decision before a paid commitment. A limited necessary expense can be considered before full product acceptance; discretionary expansion should wait for a working product meeting the owner's standards.

**Larger-investment gate:** The owner must see a working product and judge that it meets their standards. Q-005 will define the high-level expectations next; later sections will specify measurable checks. Do not treat an attractive demonstration, prepared data, or mock tests alone as proof of a real-use-ready system.

**Retained comparisons:** The [supporting note](00-app-budget-options.md) keeps the earlier monthly USD scenarios of $0–$50, $75–$150, $150–$400, and $400–$1,500+ for future reference. They are estimates, not activated tiers or a schedule of required upgrades. The prior fixed-ceiling recommendation is superseded by D-017.

**Separate or unpriced:** Development-tool subscriptions/overages, domains, store enrollment, transaction charges, labor, hardware, taxes, marketing/legal work, and unpriced data contracts remain outside the runtime reference. No purchase or vendor is selected. Existing personal subscriptions are not asserted to be free.

**Quality and feasibility boundaries:** Free-first does not promise all travel data is freely available or permit unsafe/incorrect handling. Investigate data access, terms, coverage, and potential paid dependencies early. Simulated components must be visible as simulations, and a blocked required capability must produce a cost/scope discussion—not a silent omission. Specific usage limits and fallbacks will be chosen later; there is no approved hard $150 application cutoff.

**Other open delivery constraints:** Available personal development time, maintenance capacity, supported devices, remaining pilot coverage, and commercial launch timing. See Q-004, Q-209 through Q-211, and Q-301/Q-302.

**Unselected technical decisions:** Stack, database, identity/access system, AI components, and external providers. See Q-401. Free-first does not decide local-only versus hosted, native versus web, or a vendor.

Providers in the base concept and cost note are candidates. Before selection, verify current documentation, coverage, cost, content-use terms, and access requirements. No accommodation, timetable, reservation, or price-comparison provider has been selected.

**Repository visibility:** Verified public at setup on 2026-09-19. Use fictional/redacted examples; do not commit credentials, private bookings, exact private travel dates/times, personal travel-spending amounts, or identifying research responses. Software-testing targets and app operating references are project-planning material, not private flight or travel-budget disclosures. Public repository visibility does not make itineraries public.

## 1.17 Completion and next discussion

This section remains a draft. Core direction, pilot context and target, hotel/transport capabilities, per-person travel-budget input with airfare exclusion, reservation consideration, and the free-first flexible app-spending approach are recorded. Broader targeting, quality standards, remaining constraints, evidence, and complete release promises still need decisions or explicit deferral.

**Next question — Q-005:** What must the app do well for the owner to consider the first version successful and worth further investment? Invite the owner to identify their most important outcomes or deal-breakers; do not choose their standards for them. Candidate areas include recommendation quality, realistic scheduling, usability, reliability, and the companion-facing presentation. Detailed acceptance tests come later.

Q-004's spending-policy subquestion is answered under D-017. No need to re-ask for a fixed budget: flexibility is intentional. Available development time, separate costs, and specific future paid-service decisions remain open. Q-011's per-person basis is answered; currency and remaining category meanings still need clarification in sequence.

Do not re-ask the approved test date/year, supplied travel timing, Q-002, pilot group/count, Q-007, Q-009, per-person basis, reservation inclusion, or free-first policy. Do not jump to implementation. Section approval still requires the owner's explicit approval.

## Revision record

| Date | Change | Approval effect |
| --- | --- | --- |
| 2026-09-19 | Saved the initial product-brief draft and linked the repository. | No section approval; proposals and assumptions remain labeled. |
| 2026-09-19 | Recorded Japan pilot first and commercial subscription/ad goal. | D-006/D-007 confirmed; section DRAFT. |
| 2026-09-19 | Recorded two-person couple pilot and hotel/transport inclusion. | D-008/D-009 confirmed; support depth initially open. |
| 2026-09-19 | Confirmed hotel/transport organization and recommendations in first version. | D-010 confirmed; full specifications open. |
| 2026-09-19 | Recorded Tokyo and month-spanning travel window without private dates. | D-011 records context; year/target were initially assumption/proposal. |
| 2026-09-19 | Recorded dated test-target approval and receipt of local flight times. | D-012/D-013 confirmed; no private flight details published. |
| 2026-09-19 | Recorded private trip-budget range excluding flights and reservation consideration. | D-014/D-015 recorded; app costs not settled by travel range. |
| 2026-09-19 | Confirmed per-person basis and added researched app-budget scenarios. | D-016 confirmed; the then-proposed $100/$150 fixed-ceiling approach was not approved at that stage. |
| 2026-09-19 | Adopted free-first policy, flexible paid-operation references, and greater-investment gate based on owner standards. | D-017 confirmed; old fixed-ceiling proposal superseded. No paid service, implementation, product acceptance, or Section 1 approval. |
