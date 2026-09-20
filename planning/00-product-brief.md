# Section 1 — Product Vision and Problem Brief

**Lifecycle status:** DRAFT — not approved as a completed section.  
**Owner:** Project owner (`fgzmac`); assistant facilitates drafting.  
**Phase:** Product design.  
**Last updated:** 2026-09-19.  
**Source:** The owner's app concept and explicit decisions/inputs through D-019.  
**Related framework:** [Blueprint, Section 1](blueprint.md#1-product-vision-and-problem-brief).  
**Supporting notes:** [App Budget Policy and Options](00-app-budget-options.md); [Product Success Standards](00-product-success-standards.md).  
**Next review trigger:** Clarify ready-made excursions versus app-assembled combinations of separate activities, or both, under Q-012. Q-006's initial preference examples have been supplied.  
**Approval record:** Section not yet approved. Timing target D-012, spending policy D-017, and ranked standards D-018 confirmed individually; D-019 records organizer preferences. No working-product acceptance or paid service approved.

> Saving a draft does not approve every proposal it contains. CONFIRMED choices, PROPOSED directions, ASSUMPTIONS, and OPEN questions are different states.

## 1.1 Working product name

**Working label:** Travel Itinerary App.  
**Repository:** `fgzmac/OnToTheNext`.

Repository name is confirmed, not necessarily the final brand. Naming should not block planning.

**Status:** Final product name OPEN (Q-001); repository confirmed (D-004).

## 1.2 One-sentence description

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

This combines Discover, Organize, and Delight without positioning the product primarily as an AI tool. Coverage includes activities, hotels and transportation, both organizing existing bookings and recommending options, per-person range-based trip budgeting with the stated exclusions, and reservation-aware restaurant/event planning (D-009, D-010, D-014 through D-016).

D-018 makes useful suggestions the highest priority, same-day nearby discovery and on-the-fly planning second, and seamless functionality third. The product must help before the trip and when deciding what to do that day. D-019 supplies personal examples of quality for the initial organizer, not a universal travel taste or a new restriction on the target audience.

**Status:** Description wording PROPOSED; referenced choices confirmed at their recorded level.

## 1.3 Primary use case

> Someone plans a trip they are taking and shares that plan with their travel companions.

The organizer participates. The main focus is not arranging a completely secret trip for someone else. Emotional framing: **“Look what I planned for us.”** Practical framing: **“Here is our plan and what we need to know next.”**

On-the-fly planning during the trip complements this use case (D-018); it does not replace pre-trip planning or sharing.

**Status:** CONFIRMED (D-002, D-018). Companion permissions remain open.

## 1.4 The problem we are trying to solve

**Problem hypothesis:** An organizer needs to connect choosing, planning, and sharing.

**Choosing:** Find options the group would genuinely want to do, including worthwhile nearby events and experiences for a same-day decision—not just a generic list of popular places.

**Planning:** Bring activities, stays, transportation, spending, and reservation needs into days that fit timing, location, travel effort, and pace. Allow useful decisions when a day is not already planned.

**Sharing:** Excite companions while giving them clear, practical details.

The hypothesis is that one connected experience reduces manual research and coordination across resources. The owner explicitly values recommendation usefulness, on-the-fly discovery, and easy operation (D-018); those choices are not evidence that a working solution already delivers them or that all travelers share those needs.

**Status:** User priorities confirmed; broader problem/value hypothesis remains an ASSUMPTION to validate.

## 1.5 When the problem occurs

The base situation is an organizer preparing an upcoming trip with companions and turning ideas into a usable shared plan.

**Also confirmed for the first version:** A traveler deciding what to do today wants high-quality nearby options, such as festivals, pop-ups, and experiences (D-018). This is a current-decision use case, not a requirement to continuously monitor location or automatically rewrite the entire trip.

**Pilot context:** Japan, including Tokyo, takes priority over commercial launch. Private travel date endpoints and Tokyo-local clock times were supplied in chat. The public record retains a late-November to early-December window, roughly two weeks, with late-day arrival and midday departure. Exact private dates/times remain outside this repository (D-006, D-011, D-013).

**Approved first-test target:** November 10, 2026 (D-012). This establishes the pilot planning calendar, not a public-launch date or delivery guarantee. Additional destinations, airports, hotels, transfer durations, and practical activity windows remain open. Tokyo is not automatically the only destination.

**Just exploring without dates** remains a proposed separate capability. Same-day planning does not automatically approve every date-free exploration workflow.

**Status:** Pilot context, target, and same-day use case CONFIRMED. Detailed workflow and coverage OPEN.

## 1.6 Current workaround

The organizer may gather ideas from searches, maps, social media, travel sites, and recommendations, then organize them in notes, spreadsheets, saved lists, or messages. A same-day decision may require another round of searching and checking what actually fits.

These are assumptions about current behavior, not recorded observations. D-019 provides taste examples, not evidence of which resources the initial users currently rely on or how much effort their process takes. That portion of Q-006 remains open.

**Status:** ASSUMPTION.

## 1.7 Why the current approach may be insufficient

Candidate pain points are filtering generic or unappealing suggestions, finding timely local experiences, checking practical schedules and costs, understanding reservation needs, repeatedly explaining plans to companions, and creating a personal presentation separately.

**Owner's confirmed priority order (D-018):**

| Rank | Standard | Meaning |
| --- | --- | --- |
| 1 | High-quality suggestions. | Things a traveler would genuinely consider adding to the itinerary. Without this value, a functioning app is not enough. |
| 2 | Real-time, on-the-fly planning. | Find worthwhile options for the day nearby, including festivals, pop-ups, and experiences, and help make a plan. |
| 3 | Seamless functionality and ease. | The experience must be useful and easy, not feel like a chore. |

The high-level order is settled. D-019 now supplies positive and negative examples: connected scenic/participatory experiences versus standalone novelty-object or statue stops for the initial organizer. Detailed weighting, quantitative success, and validation for the wider audience remain open.

**Status:** Priorities CONFIRMED; initial preference examples RECORDED. Broader evidence and metrics OPEN (Q-006, Q-010, Q-304).

## 1.8 Primary and secondary users

| User | Main goal | Intended support |
| --- | --- | --- |
| Organizer | Plan a trip they will take with companions. | Discover useful options, organize activities/stays/transport, account for budget and reservations, make same-day decisions, and share the result. |
| Travel companion | Understand, anticipate, and participate in the trip. | Enjoy receiving the plan and easily access useful details while traveling. |

Roles apply within a trip, not necessarily permanent account types.

**Initial pilot:** A couple, two travelers total, one organizer and one companion (D-008). The owner is the initial organizer/tester. No names, ages, or identifying details are needed in this public record.

This does not impose a permanent two-person limit, make the service couples-only, imply identical preferences, or select a romantic theme. Companion testing participation remains open. D-016's per-person spending basis does not settle how every shared expense is divided. D-019's taste examples apply to the organizer, not automatically to the companion.

**Eventual commercial audience:** OPEN (Q-010). The owner's satisfaction is not proof of demand from other travelers.

**Permissions:** View, suggest, directly edit, publish, or initiate shared-plan changes remain Section 2 decisions. D-018's same-day capability does not assign it to every companion or override ownership rules.

**Status:** Pilot audience CONFIRMED; commercial audience, companion testing, and permissions OPEN (Q-008, Q-010, Q-101).

## 1.9 Core value: Discover, Organize, Delight

| Responsibility | User question | Intended value |
| --- | --- | --- |
| Discover | “What would we actually enjoy doing, including nearby today?” | A manageable set of relevant, appealing choices with useful explanations and honest information. |
| Organize | “How can those choices form a trip or day that works?” | Practical plans respecting stays, transport, spending, reservations, time, and downtime. |
| Delight | “How do I get everyone excited?” | Personalized sharing connected to a practical itinerary. |

### Ranked success standards

D-018 confirms quality of suggestions first, same-day discovery/on-the-fly planning second, and seamless functionality third. The [standards note](00-product-success-standards.md) preserves the source, implications, preference examples, and proposed evaluations.

A polished reveal is not a substitute for the first two priorities. Sharing remains part of the concept; the owner did not remove it. Correctness, privacy, reliability, and accessibility are not dispensable because they were not separately ranked.

**Proposed quality dimensions:** Personal appeal, practical fit, trustworthy information, useful variety, and enough detail to make a decision. Do not define quality as only popularity, ratings, novelty, luxury, or hidden gems. Initial examples follow; exact criteria and weights remain open.

### Initial organizer's experience preferences — D-019

**Would consider:** A connected excursion combining a breathtaking beach view, snorkeling, and an oceanside dinner; or an ATV excursion with scenic views and something distinctive to the area.

**Would reject:** The world's largest rubber band or a historical statue, as standalone attractions in the supplied examples.

**Working interpretation:** Favor immersive, participatory experiences, memorable scenery, meaningful combinations, and a locally distinctive setting for this organizer. Recommendations should explain what the traveler will do and see rather than rely only on the attraction's fame or novelty.

These are stated preferences, not global prohibitions on history, museums, statues, sightseeing, or popular places. They do not establish the companion's taste, physical ability, skill, exertion preference, willingness to spend, or a preference for a full-day package every day. A strong single activity can still be a worthwhile option. No actual snorkeling, ATV, beach, or restaurant option has been verified for the pilot.

**Open capability distinction (Q-012):** Recommend existing provider excursions, assemble combinations of separate activities, or both? This answer does not settle that format. A proposed sequence must not masquerade as one provider's package, one price, or a confirmed booking. Later design must distinguish advertised package inclusions from separately sourced components and check timing, travel, costs, and reservation dependencies. The earlier hotel/transport 'both' decision answers a different question.

### Same-day nearby discovery and planning

**CONFIRMED first-version capability (D-018):** Help a traveler decide what to do that day using high-quality nearby events and experiences, including festivals and pop-ups. This is not merely an optional future enhancement.

**Proposed workflow:** Use a relevant location or selected area, available time, and known preferences; offer worthwhile current options; show practical constraints; preview a small plan or itinerary change; let the user confirm it. Exact inputs, permissions, minimum coverage, and entry path remain open. Do not assume a complete multi-day itinerary is a prerequisite without discussing that user cost.

**Proposed safeguards:** Distinguish permanent venues from dated events; check the relevant occurrence and local time; account for reaching the option before entry ends and any later commitment; label reservation needs, unknown availability, and uncertain prices; avoid duplicate or expired listings; show source/freshness context where available. Fetch time does not prove the underlying listing was recently verified. An event today is not automatically happening now, reachable, or bookable.

If no suitable events can be found, do not invent them or pass generic places off as verified current events. A wider area, another time, or clearly labeled non-event alternatives are proposed fallbacks, not approved interaction detail.

**Scope boundary:** Real-time usefulness is confirmed; exact refresh/latency targets, automatic replanning, background tracking, notifications, providers, transactions, and guaranteed live inventory are not. Basic same-day discovery must not disappear under an older proposal to defer advanced replanning.

### Hotels and transportation

**Confirmed coverage (D-009/D-010):** Both hotels and transportation must organize existing bookings and recommend options before booking in the first version.

| Area | Existing arrangements | Options not yet booked |
| --- | --- | --- |
| Hotels | Include booked stays in the plan. | Help find and choose hotel options. |
| Transportation | Include booked journeys in the plan. | Help find and choose ways to travel. |

Do not silently reduce either area to an existing-booking list. Free-first under D-017 and the ranking in D-018 do not remove earlier requirements.

**Proposed considerations:** Hotel locations and stay dates; check-in/out; travel between stays and activities; fixed journeys; partial arrival/departure days; relevant cost bases; and practical shared-trip details. Flight arrival is not hotel arrival; departure time is not when to leave the hotel. Exact modes, buffers, and coverage remain open.

Recommendations and stored arrangements do not authorize making, paying for, changing, or canceling bookings. Entry/import methods, sources, recommendation criteria, verification, and booking handoffs remain Q-209 and later scope/system work.

### Trip-budget range

**Confirmed input (D-014/D-016):** The supplied low/high range is per person and excludes plane tickets. Numerical bounds remain in chat, not the public repository. Do not re-ask them.

Currency, total-versus-remaining meaning, included categories, and treatment of upper/lower bounds remain OPEN (Q-011/Q-211). This is not the app's operating allowance; D-017 governs app spending separately.

**Proposed behavior:** Configurable inputs; no forced minimum spend; explicit upper-bound firmness; clear estimates/unknown costs; shared versus per-person charges; paid versus remaining amounts; no double-counting deposits; exclusions shown without removing flight timing from the itinerary. Per-person input does not mandate equal splitting of every shared charge. No conversion, daily allowance, category allocation, or affordability claim is established.

### Events and restaurants requiring reservations

**Confirmed requirement (D-015):** Account for reservation-dependent restaurants and events, including in same-day feasibility. Detailed pilot depth remains open.

**Proposed design:** Separate whether a reservation is required from whether one has been secured and paid. Show a trusted booking route and known release/deadline information with relevant local-time/source context. Keep unconfirmed slots tentative, consider alternatives when a booking cannot be obtained, and protect confirmed timed commitments when previewing changes. Consider deposits/fees without double-counting.

These are proposals, not an approved state schema or integration. User-entered and provider-verified confirmation are different evidence. No specific event/restaurant has been chosen or researched through this standards update. No reservations, monitoring, or reminders have been created.

The earlier proposal that Keep means interest, not guaranteed scheduling, remains to be specified in the user journey; D-018 does not silently approve its exact controls.

**Status:** Purpose, ranked standards, same-day capability, both hotel/transport paths, per-person budget basis/exclusion, and reservation consideration CONFIRMED at their stated level; D-019 records organizer preferences. Detailed behaviors, models, excursion formats, and thresholds remain PROPOSED/OPEN.

## 1.10 Intended distinguishing idea

> Connect choosing a trip, anticipating it together, and discovering worthwhile possibilities while traveling.

The intended combination is personal fit, practical fit, timely discovery, personalized presentation, and continued usefulness. D-018 makes the quality and immediate usefulness of recommendations the leading product tests.

This is proposed positioning, not a researched claim that competitors lack these capabilities.

**Status:** Positioning wording PROPOSED; priority order CONFIRMED.

## 1.11 Long-term vision

> Become a planning companion that helps a group move from inspiration to a shared, adaptable travel experience.

**Commercial ambition (D-007):** Mobile app-store/SaaS product with subscription and ad revenue. Distribution and detailed monetization remain open; intended revenue is not proof of profitability.

**Investment sequence (D-017):** Free first until an expense is necessary; greater investment follows a working product that meets the owner's standards. D-018 defines the high-level order and D-019 supplies initial personal examples; measurable checks and actual acceptance remain open.

Possible extensions include broader destination/event coverage, multi-city complexity, richer companion input, and more automated replanning. Their allocation remains open. Existing hotel/transport recommendations, reservation-aware planning, and basic same-day event discovery/on-the-fly planning are already confirmed needs, not hypothetical future-only extensions. Older generic later-feature examples must not override them.

**Status:** Commercial direction, investment sequence, and individual capabilities CONFIRMED; detailed expansion OPEN.

## 1.12 First-release promise

### Immediate Japan pilot

**Confirmed goal:** Develop and test for the Japan trip before commercial launch. Tokyo is included, the pilot has two travelers, and the first complete test target is November 10, 2026 (D-006, D-008, D-011/D-012).

**Proposed complete promise incorporating confirmed capabilities:**

> Help the organizer find suggestions they genuinely want to use; organize activities, hotel stays, transportation, spending, and reservation needs into a practical trip; discover worthwhile nearby events and experiences for a same-day plan; and share a personalized itinerary that is easy for both travelers to use.

This promise includes both recommendations and organizing existing hotel/transport bookings. It preserves Discover, Organize, and Delight, with D-018's explicit order guiding tradeoffs.

**Evaluation direction:** First ask whether suggestions are genuinely worth considering; second whether same-day options are timely and usable; third whether the relevant tasks are easy to complete. D-019's examples inform personal appeal, not an automatic rule that every suggestion must be adventurous or bundled. The [standards note](00-product-success-standards.md) proposes evaluation methods. Numeric thresholds, exact sample sets, and final acceptance remain open in Q-304.

The sharing test need not depend on elaborate animation or many themes. An appealing introduction and practical trip view are proposed minimums, not a finalized screen design. Visual polish alone cannot pass the recommendation or current-data tests.

Japan does not imply nationwide coverage or a permanent Japan-only product. Additional cities, exact categories/sources, useful event coverage, excursion formats, freshness and response targets, travel modes, supported devices, budget calculations, reservation behavior, and practical activity windows still require design. User-supplied flight times do not establish transfer durations or hotel timing.

No budget or free-prototype shortcut can silently drop confirmed capabilities. When feasibility conflicts with the target, surface the tradeoff for an explicit decision.

### First commercial release

A separate milestone with date, audience, distribution, wider coverage, production requirements, and monetization details still open.

**Status:** Individual decisions/inputs through D-019 apply. Complete promise, detailed specifications, and release acceptance remain PROPOSED/OPEN. Section 1 is not approved by recording the ranking or preference examples.

## 1.13 Explicit non-goals and presentation boundaries

**Proposed first-release exclusions:** Broad worldwide coverage, complex multi-city travel, unrestricted group editing, group voting, automatic whole-trip reorganization, and in-app booking/payment. None is a finalized exclusion without an explicit scope decision. Tokyo alone does not settle city-to-city needs.

**Scope correction from D-018:** The earlier proposal to defer advanced same-day replanning must not exclude required same-day nearby event discovery and on-the-fly plan creation. More extensive automatic replanning remains a separate open feature. Do not describe all same-day functionality as future work.

**Reservation boundary:** Organizing bookings, recommending choices, and accounting for reservation requirements do not authorize booking transactions, changes, or cancellations.

**Preference boundary:** D-019's rejection examples are not a product-wide exclusion of statues, history, or sightseeing. Its positive combinations do not yet approve provider-tour sourcing or automatic bundling; clarify Q-012 first.

**Proposed feature sequencing:** Test core planning and sharing before billing, ads, and store-publication work. Those exclusions remain Q-306; the confirmed free-first spending policy does not automatically settle monetization feature scope.

**Presentation safeguards:** Suggestions must not look booked or paid without appropriate evidence. Requirement, booking state, and payment state need distinct meanings. An app-created combination must not appear to be a verified all-inclusive package. A reveal must not prevent quick access to useful trip information. Precise criteria remain to be specified.

**Status:** Feature exclusions/details PROPOSED. D-018's same-day inclusion and ranking supersede conflicting older proposals; D-019 is personal taste, not a global restriction.

## 1.14 Evidence and important assumptions

**Established:** User concept; primary use case; sequential planning and later Codex workflow; repository; pilot, test target, spending policy, individual capabilities; ranked success standards; and the organizer's positive/negative experience examples. These are choices or stated preferences, not demonstrated product results.

**Prior external research:** The budget note retains earlier official price/access references and arithmetic assumptions. This update does not refresh them or validate provider coverage. No live same-day event search or excursion lookup was performed for this preference discussion.

**Not yet documented:** Observed planning sessions, prototype tests, recommendation acceptance measurements, live coverage/integration tests, scheduling evaluations, willingness to pay, or owner acceptance of a working product. Initial personal taste examples are now documented under D-019; companion preferences and actual current workarounds are not.

Important assumptions to test:

1. The connected workflow reduces effort compared with the user's current approach.
2. Useful, personally fitting suggestions can be consistently identified for the supported context; D-019's examples are an initial reference, not a complete quality test.
3. Enough timely nearby event information can be obtained for the same-day promise, including festivals and pop-ups; coverage, freshness, and access must be demonstrated rather than inferred from provider names.
4. Availability, locations, occurrence times, pricing, reservation requirements, and deadlines can be represented with honest evidence and uncertainty.
5. The main tasks can be made easy without hiding essential checks or losing saved work.
6. The practical and personalized sharing experience matters to companions.
7. The selected implementation can meet cost/reliability needs. Free-first does not prove every production dependency is free.
8. Wider users will return, subscribe, or accept advertising; one successful personal trip does not establish that.

These become experiments in Section 5. Same-day data feasibility is an early risk to examine before polishing a complete interface around untested coverage. Prepared examples test interface behavior, not current-world recommendation quality. Any necessary paid dependency requires a specific decision under D-017.

**Status:** Assumptions and evidence gaps. Q-006's example portion answered; Q-356 retains current-data tests. Q-354/Q-355 retain commercial and reservation-data questions.

## 1.15 Project goal, business model, and distribution

| Priority | Objective | Status |
| --- | --- | --- |
| Immediate | First complete test on November 10, 2026 for the Japan pilot; build free first and evaluate using D-018's ranked standards. | CONFIRMED target/direction, not a delivery guarantee. |
| Ultimate | Commercial app-store/SaaS offering earning subscription/ad revenue, with greater investment after owner acceptance. | CONFIRMED direction; detailed model open. |

The pilot comes first, not the entire commercial business. Flexible references do not authorize unlimited spending.

Pricing, billing intervals, free/paid features, trials, ad placement, ad-free plans, vendors, and monetization timing remain OPEN. No booking commission or other revenue stream is selected (Q-306/Q-407).

The owner is the first tester; companion testing arrangements, outside testers, and acquisition remain open (Q-008/Q-010).

Mobile app-store versus web delivery is unresolved. SaaS and app-store distribution need not be mutually exclusive. No operating system, framework, provider, hosting plan, store listing, or pilot delivery method is selected. Free-first does not settle the platform.

**Status:** High-level objectives, timing, spending approach, and ranked standards answered; detailed cost/capacity, distribution, and revenue design open.

## 1.16 Constraints

**Process:** Sequential blueprint, documentation in `fgzmac/OnToTheNext`, design before Codex implementation. No implementation transition approved.

**Pilot:** Tokyo/Japan, two travelers, late-November to early-December 2026 planning context. Exact travel and spending values already supplied privately remain in chat, not missing inputs. Airports, transfers, stay details, and additional destinations remain unspecified.

**Target:** November 10, 2026 first complete test, then an intended period for fixes/retesting. This does not guarantee unestimated scope fits.

**Scheduling proposals:** Partial arrival/departure days; separate flight events, hotel timing, travel buffers, and rest preferences; preserve destination-local time meaning. No exact buffers or transport mode selected.

**Capabilities to preserve:** Both hotel/transport support paths (D-010), per-person range/exclusion (D-014/D-016), reservation-aware dining/events (D-015), and useful same-day nearby discovery/on-the-fly planning (D-018). Detailed specifications remain open, not silent permission to omit capabilities.

**Ranked quality constraint:** Recommendation quality first, same-day usefulness second, seamless functionality third. D-018 does not waive basic data correctness, privacy, reliability, or accessibility. D-019 supplies organizer-specific appeal examples, not global exclusions, a completed ranking formula, or acceptance thresholds.

**Two budgets:** Trip budget is per person excluding flights; currency and remaining meanings open (Q-011). App policy is D-017. Development tools, one-time costs, actual service quotes, and development/maintenance time stay separate.

### Adopted app-spending policy — free first, flexible reference

Prefer suitable free options until an expense is necessary. Aim for no additional app-service charges while those options meet the need.

Retain $100/month as an initial paid-operation planning target and $150 as a flexible upper reference—not fixed ceiling, required spend, automatic cutoff, or purchase authority. Lower spending is preferred where it works; greater spending needs a specific decision.

Before a paid commitment, identify the blocked requirement/test, free alternatives, smallest useful paid option, recurring and usage costs/overages, and consequence of waiting. A necessary expense before full acceptance is a separate decision; discretionary expansion should follow a working product meeting owner standards.

**Acceptance gate:** D-018 defines the priorities. The [standards note](00-product-success-standards.md) records D-019's examples and proposes observable tests, but no numeric threshold or acceptance has been approved. A demo, prepared data, passing mock tests, visual polish, or the target date alone does not establish success. Do not classify static event examples as verified current recommendations or hypothetical combinations as secured excursions.

The [budget note](00-app-budget-options.md) retains earlier scenario ranges for reference, not an upgrade schedule. D-017 supersedes the old fixed-ceiling proposal. Development tools/overages, domains, enrollment, transaction charges, labor, hardware, taxes, marketing/legal work, and unpriced data contracts remain separate.

Free-first does not justify unsafe/incorrect behavior or promise free access to all required data. Investigate timely event coverage, sourcing rights, freshness, and possible paid dependencies early without activating subscriptions. A blocked required capability needs an explicit quality/cost/scope tradeoff.

**Other open constraints:** Available development time, maintenance capacity, supported devices, detailed pilot coverage, and commercial launch timing (Q-004/Q-301). No stack, identity system, AI model, or external data provider selected (Q-401). Re-verify provider references before selection or spending.

**Public record:** Use fictional/redacted examples. No credentials, private bookings, precise travel dates/times, personal travel-budget amounts, or identifying research responses in commits. Project milestones and generalized standards are not private trip details. Public repository visibility does not authorize public itineraries.

## 1.17 Completion and next discussion

Section 1 remains DRAFT. The owner has answered the top-three standards and their order (D-018), including same-day discovery as a first-version requirement, and provided initial positive/negative experience examples (D-019). This does not approve the full brief or demonstrate that the product meets those standards.

**Next — Q-012:** Should the app recommend ready-made excursions, put together its own combinations of separate activities, or offer both? Clarify this capability distinction using the supplied examples, without assuming one combined booking or applying the earlier hotel/transport 'both' answer to a different question.

Q-006's initial examples are answered. Current planning workarounds and observed frustrations remain open. The complete pilot promise, measurable acceptance, broader target audience, real-world evidence, remaining capacity, and travel-budget currency/category meanings still need decisions or explicit deferral. Spending-policy flexibility is intentional; do not ask for a fixed ceiling again.

Continue one Section 1 question at a time. Do not re-ask the examples, priority order, supplied timing, group, budget basis, hotel/transport capabilities, reservation inclusion, or spending policy. Do not start implementation or mark later sections complete.

## Revision record

| Date | Change | Approval effect |
| --- | --- | --- |
| 2026-09-19 | Saved initial brief and repository. | Draft, not section approval. |
| 2026-09-19 | Japan pilot first; subscription/ad commercial ambition. | D-006/D-007. |
| 2026-09-19 | Two-person couple pilot; hotel/transport inclusion. | D-008/D-009. |
| 2026-09-19 | Both hotel/transport organization and recommendations in first version. | D-010. |
| 2026-09-19 | Tokyo and month-spanning private travel context. | D-011; year/target initially assumption/proposal. |
| 2026-09-19 | Approved dated test target and supplied local flight times. | D-012/D-013; private values not published. |
| 2026-09-19 | Trip range excluding flights; reservation-aware planning. | D-014/D-015. |
| 2026-09-19 | Per-person basis; researched app-budget scenarios. | D-016; then-proposed fixed ceiling not approved. |
| 2026-09-19 | Free-first flexible spending and owner-standards investment gate. | D-017; no purchase/implementation/acceptance approval. |
| 2026-09-19 | Ranked recommendation quality, same-day nearby planning, and seamless use; reconciled earlier same-day deferral language and added standards note. | D-018 confirmed at priority/capability level. Detailed tests and Section 1 approval remain open. |
| 2026-09-19 | Recorded scenic, participatory, locally distinctive and multi-part preference examples, plus rejected standalone attraction examples; separated personal taste from global rules and queued excursion-format clarification. | D-019 preference input recorded; no package-format, booking, implementation, or whole-section approval. |