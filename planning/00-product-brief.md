# Section 1 — Product Vision and Problem Brief

**Lifecycle status:** DRAFT — not approved as a completed section.  
**Owner:** Project owner (`fgzmac`); assistant facilitates drafting.  
**Phase:** Product design.  
**Last updated:** 2026-09-19.  
**Source:** The owner's app concept and explicit decisions/inputs through D-021.  
**Related framework:** [Blueprint, Section 1](blueprint.md#1-product-vision-and-problem-brief).  
**Supporting notes:** [App Budget Policy and Options](00-app-budget-options.md); [Product Success Standards](00-product-success-standards.md).  
**Next review trigger:** Identify the most frustrating part of finding, checking, or organizing experiences under Q-006. Discovery sources are now supplied; do not re-ask them.  
**Approval record:** Section not yet approved. Timing D-012, spending D-017, ranked standards D-018, and both experience formats D-020 confirmed individually; D-019/D-021 record organizer preferences and discovery sources. Duration options are proposed. No working-product acceptance or paid service approved.

> Saving a draft does not approve every proposal it contains. CONFIRMED choices, PROPOSED directions, ASSUMPTIONS, and OPEN questions are different states.

## 1.1 Working product name

**Working label:** Travel Itinerary App.  
**Repository:** `fgzmac/OnToTheNext`.

Repository name is confirmed, not necessarily the final brand. Naming should not block planning.

**Status:** Final product name OPEN (Q-001); repository confirmed (D-004).

## 1.2 One-sentence description

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

This combines Discover, Organize, and Delight without positioning the product primarily as an AI tool. Coverage includes activities, hotels and transportation, both organizing existing bookings and recommending options, per-person range-based trip budgeting with the stated exclusions, and reservation-aware restaurant/event planning (D-009, D-010, D-014 through D-016).

D-018 makes useful suggestions the highest priority, same-day nearby discovery and on-the-fly planning second, and seamless functionality third. The product must help before the trip and when deciding what to do that day. D-019 supplies personal examples of quality for the initial organizer, not a universal travel taste or a new restriction on the target audience. D-020 confirms offering ready-made provider excursions and app-assembled combinations; shorter/all-day options are a user-proposed duration direction. D-021 records discovery through real experiences, Reddit recommendations, highly rated reviews, date-specific calendars, and destination highlights.

**Status:** Description wording PROPOSED; referenced choices and inputs confirmed at their recorded level.

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

The hypothesis is that one connected experience reduces manual research and coordination across resources. The owner explicitly values recommendation usefulness, on-the-fly discovery, and easy operation (D-018). D-021 identifies sources used or valued for discovery; the owner has not yet described the most frustrating step or the full organization workflow. Do not present our inferred pain points as observed findings or assume all travelers share them.

**Status:** User priorities and reported sources recorded; broader problem/value hypothesis remains an ASSUMPTION to validate.

## 1.5 When the problem occurs

The base situation is an organizer preparing an upcoming trip with companions and turning ideas into a usable shared plan.

**Also confirmed for the first version:** A traveler deciding what to do today wants high-quality nearby options, such as festivals, pop-ups, and experiences (D-018). This is a current-decision use case, not a requirement to continuously monitor location or automatically rewrite the entire trip.

**Pilot context:** Japan, including Tokyo, takes priority over commercial launch. Private travel date endpoints and Tokyo-local clock times were supplied in chat. The public record retains a late-November to early-December window, roughly two weeks, with late-day arrival and midday departure. Exact private dates/times remain outside this repository (D-006, D-011, D-013).

**Approved first-test target:** November 10, 2026 (D-012). This establishes the pilot planning calendar, not a public-launch date or delivery guarantee. Additional destinations, airports, hotels, transfer durations, and practical activity windows remain open. Tokyo is not automatically the only destination.

**Just exploring without dates** remains a proposed separate capability. Same-day planning does not automatically approve every date-free exploration workflow.

**Status:** Pilot context, target, and same-day use case CONFIRMED. Detailed workflow and coverage OPEN.

## 1.6 Current workaround and discovery sources

**Reported by the owner (D-021):** Activities are found through real experiences, positive posts on Reddit, highly rated reviews, calendars covering particular time frames, and popular must-see or must-experience events related to the destination.

| Source or signal | What the owner has supplied |
| --- | --- |
| Real experiences | Values experiences grounded in what people actually do; own versus others' firsthand experiences has not been specified. |
| Positive Reddit posts | Uses or values positive community recommendations. No subreddit, thread, account, or integration selected. |
| Highly rated reviews | Considers strong reviews. No review service, rating threshold, minimum review count, or weighting selected. |
| Date-specific event calendars | Looks for events during the relevant time frame. No particular calendar selected. |
| Destination-related highlights | Considers popular must-see or must-experience events associated with the destination. This does not mandate every famous attraction. |

This replaces the earlier statement that all discovery sources were unknown. It is a self-reported practice/source preference, not an observed planning session or proof of any source's accuracy.

**Still open under Q-006:** How the organizer saves, compares, verifies, schedules, and shares these discoveries; which step is most frustrating; and the effort involved. Notes, spreadsheets, saved lists, and messages remain possible workarounds, not tools the owner has confirmed using. Do not infer an actual past trip, attended event, or companion behavior from “real experiences.”

**Status:** Discovery sources RECORDED. Detailed workflow, frustration, and observational evidence OPEN.

## 1.7 Why the current approach may be insufficient

Candidate pain points are filtering generic or unappealing suggestions, finding timely local experiences, checking practical schedules and costs, understanding reservation needs, repeatedly explaining plans to companions, and creating a personal presentation separately. D-021 does not select one of these as the owner's main frustration.

**Owner's confirmed priority order (D-018):**

| Rank | Standard | Meaning |
| --- | --- | --- |
| 1 | High-quality suggestions. | Things a traveler would genuinely consider adding to the itinerary. Without this value, a functioning app is not enough. |
| 2 | Real-time, on-the-fly planning. | Find worthwhile options for the day nearby, including festivals, pop-ups, and experiences, and help make a plan. |
| 3 | Seamless functionality and ease. | The experience must be useful and easy, not feel like a chore. |

The high-level order is settled. D-019 supplies positive and negative examples: connected scenic/participatory experiences versus standalone novelty-object or statue stops for the initial organizer. D-020 confirms both provider excursions and app-assembled recommendations. D-021 adds firsthand, community, review, calendar, and destination-highlight evidence preferences. Detailed weighting, quantitative success, and validation for the wider audience remain open.

**Status:** Priorities and formats CONFIRMED; preference examples and discovery sources RECORDED. Specific frustration, broader evidence, and metrics OPEN (Q-006, Q-010, Q-304).

## 1.8 Primary and secondary users

| User | Main goal | Intended support |
| --- | --- | --- |
| Organizer | Plan a trip they will take with companions. | Discover useful options, organize activities/stays/transport, account for budget and reservations, make same-day decisions, and share the result. |
| Travel companion | Understand, anticipate, and participate in the trip. | Enjoy receiving the plan and easily access useful details while traveling. |

Roles apply within a trip, not necessarily permanent account types.

**Initial pilot:** A couple, two travelers total, one organizer and one companion (D-008). The owner is the initial organizer/tester. No names, ages, or identifying details are needed in this public record.

This does not impose a permanent two-person limit, make the service couples-only, imply identical preferences, or select a romantic theme. Companion testing participation remains open. D-016's per-person spending basis does not settle how every shared expense is divided. D-019/D-021 apply to the organizer, not automatically to the companion.

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

D-018 confirms quality of suggestions first, same-day discovery/on-the-fly planning second, and seamless functionality third. The [standards note](00-product-success-standards.md) preserves the source, implications, preference examples, discovery evidence, formats, and proposed evaluations.

A polished reveal is not a substitute for the first two priorities. Sharing remains part of the concept; the owner did not remove it. Correctness, privacy, reliability, and accessibility are not dispensable because they were not separately ranked.

**Proposed quality dimensions:** Personal appeal, practical fit, trustworthy information, useful variety, and enough detail to make a decision. Do not define quality as only popularity, ratings, novelty, luxury, or hidden gems. Initial examples follow; exact criteria and weights remain open.

### Initial organizer's experience preferences — D-019

**Would consider:** A connected excursion combining a breathtaking beach view, snorkeling, and an oceanside dinner; or an ATV excursion with scenic views and something distinctive to the area.

**Would reject:** The world's largest rubber band or a historical statue, as standalone attractions in the supplied examples.

**Working interpretation:** Favor immersive, participatory experiences, memorable scenery, meaningful combinations, and a locally distinctive setting for this organizer. Recommendations should explain what the traveler will do and see rather than rely only on the attraction's fame or novelty.

These are stated preferences, not global prohibitions on history, museums, statues, sightseeing, or popular places. They do not establish the companion's taste, physical ability, skill, exertion preference, willingness to spend, or a preference for a full-day package every day. A strong single activity can still be a worthwhile option. No actual snorkeling, ATV, beach, or restaurant option has been verified for the pilot.

### Discovery evidence — D-021

Preserve the owner's five source preferences: real/firsthand experiences, positive Reddit posts, highly rated reviews, event calendars for relevant dates, and destination-related must-see or must-experience highlights. This is not a hidden-gems-only product direction or an instruction to maximize popularity.

**Proposed approach:** Use these inputs to discover and assess appealing candidates, then verify material dates, locations, inclusions, and booking requirements against suitable current information before claiming practical fit. An enthusiastic post supports an account of enjoyment; it does not confirm today's event occurrence or availability. Organizer/venue/operator information is a proposed fact-checking route, not an approved exclusive supplier hierarchy.

Review content, recency, volume, context, and useful critical caveats could qualify a high rating. Calendars need the relevant occurrence date/year and local time, not merely a recently fetched page. Avoid duplicate evidence and fabricated social-proof labels. No review thresholds, numerical weights, mandatory source count, specific calendar, or source-access mechanism is selected. Details are in the standards note and later Q-204/Q-304/Q-356/Q-402/Q-403.

Naming sources does not approve scraping, paid API access, importing account histories, reproducing posts/photos, or using community content for training. No actual post, review, calendar, or event was retrieved or verified in this update.

### Both experience formats — D-020

**Confirmed choice:** Offer ready-made provider excursions and app-assembled combinations of separate activities. Q-012 is answered by the owner's explicit “Offer both.” This is separate from the hotel/transport capability decision in D-010.

A provider excursion is an actual advertised offering. An app-created combination is a proposed sequence, not automatically one provider's package, one price, or a confirmed booking. Verify advertised package inclusions for the former; evaluate separately sourced components, timing, travel, costs, and reservation dependencies for the latter. Specific sources, depth of coverage, presentation, algorithms, and transactional booking remain open.

**User-proposed duration direction:** The owner suggested, “Maybe shorter activities and all day activities.” Explore both short outings and full-day options without fixing hour cutoffs, an intermediate category, or a screen/filter yet. Recommendation format and duration are separate: either format could suit either amount of available time. This is not a promise of actual inventory in every combination.

**Proposed time-fit behavior:** Ask or reuse how much usable time the traveler has; distinguish advertised activity duration from total time including relevant travel and commitments. Avoid double-counting transfers included in a provider offering, show uncertainty, and do not compress a fixed operator itinerary without evidence of a shorter variant. Short options should still be worthwhile; a full-day plan should not fill every minute or override reservations. Details belong in Q-212/Q-305, not a new round of format approval.

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

These are proposals, not an approved state schema or integration. User-entered and provider-verified confirmation are different evidence. No specific event/restaurant has been chosen or researched through this update. No reservations, monitoring, or reminders have been created.

The earlier proposal that Keep means interest, not guaranteed scheduling, remains to be specified in the user journey; D-018 does not silently approve its exact controls.

**Status:** Purpose, ranked standards, same-day capability, hotel/transport paths, budget basis/exclusion, reservation consideration, and both experience formats CONFIRMED at their stated level; D-019/D-021 record preferences and reported sources. Shorter/all-day choices and detailed source rules, duration, behavior, models, and thresholds remain PROPOSED/OPEN.

## 1.10 Intended distinguishing idea

> Connect choosing a trip, anticipating it together, and discovering worthwhile possibilities while traveling.

The intended combination is personal fit, practical fit, timely discovery, personalized presentation, and continued usefulness. D-018 makes the quality and immediate usefulness of recommendations the leading product tests. D-021 suggests grounding discovery in experience reports, reviews, calendars, and destination context; the exact sourcing design remains open.

This is proposed positioning, not a researched claim that competitors lack these capabilities.

**Status:** Positioning wording PROPOSED; priority order CONFIRMED.

## 1.11 Long-term vision

> Become a planning companion that helps a group move from inspiration to a shared, adaptable travel experience.

**Commercial ambition (D-007):** Mobile app-store/SaaS product with subscription and ad revenue. Distribution and detailed monetization remain open; intended revenue is not proof of profitability.

**Investment sequence (D-017):** Free first until an expense is necessary; greater investment follows a working product that meets the owner's standards. D-018 defines the high-level order and D-019 supplies initial personal examples; measurable checks and actual acceptance remain open.

Possible extensions include broader destination/event coverage, multi-city complexity, richer companion input, and more automated replanning. Their allocation remains open. Existing hotel/transport recommendations, reservation-aware planning, basic same-day discovery, and both experience formats are confirmed needs, not hypothetical future-only extensions. Older generic later-feature examples must not override them.

**Status:** Commercial direction, investment sequence, and individual capabilities CONFIRMED; detailed expansion OPEN.

## 1.12 First-release promise

### Immediate Japan pilot

**Confirmed goal:** Develop and test for the Japan trip before commercial launch. Tokyo is included, the pilot has two travelers, and the first complete test target is November 10, 2026 (D-006, D-008, D-011/D-012).

**Proposed complete promise incorporating confirmed capabilities:**

> Help the organizer find suggestions they genuinely want to use, including ready-made excursions and app-assembled combinations; organize activities, hotel stays, transportation, spending, and reservation needs into a practical trip; discover worthwhile nearby events and experiences for a same-day plan; and share a personalized itinerary that is easy for both travelers to use.

This promise includes both recommendations and organizing existing hotel/transport bookings. It preserves Discover, Organize, and Delight, with D-018's explicit order guiding tradeoffs. D-020 confirms two experience formats; short/full-day duration options remain a proposal for later journey design.

**Evaluation direction:** First ask whether suggestions are genuinely worth considering; second whether same-day options are timely and usable; third whether the relevant tasks are easy to complete. D-019's examples inform personal appeal, not an automatic rule that every suggestion must be adventurous or bundled. D-021's sources inform evidence selection, not a guarantee of authenticity, accuracy, or availability. The [standards note](00-product-success-standards.md) proposes evaluation methods. Numeric thresholds, exact sample sets, and final acceptance remain open in Q-304.

The sharing test need not depend on elaborate animation or many themes. An appealing introduction and practical trip view are proposed minimums, not a finalized screen design. Visual polish alone cannot pass the recommendation or current-data tests.

Japan does not imply nationwide coverage or a permanent Japan-only product. Additional cities, specific source access, event and excursion coverage, duration presentation, freshness and response targets, travel modes, supported devices, budget calculations, reservation behavior, and practical activity windows still require design. Both formats are selected; user-supplied flight times do not establish transfers or hotel timing.

No budget or free-prototype shortcut can silently drop confirmed capabilities. When feasibility conflicts with the target, surface the tradeoff for an explicit decision.

### First commercial release

A separate milestone with date, audience, distribution, wider coverage, production requirements, and monetization details still open.

**Status:** Individual decisions/inputs through D-021 apply. Complete promise, detailed specifications, and release acceptance remain PROPOSED/OPEN. Section 1 is not approved by recording these individual choices.

## 1.13 Explicit non-goals and presentation boundaries

**Proposed first-release exclusions:** Broad worldwide coverage, complex multi-city travel, unrestricted group editing, group voting, automatic whole-trip reorganization, and in-app booking/payment. None is a finalized exclusion without an explicit scope decision. Tokyo alone does not settle city-to-city needs.

**Scope correction from D-018:** The earlier proposal to defer advanced same-day replanning must not exclude required same-day nearby event discovery and on-the-fly plan creation. More extensive automatic replanning remains a separate open feature. Do not describe all same-day functionality as future work.

**Reservation boundary:** Organizing bookings, recommending choices, and accounting for reservation requirements do not authorize booking transactions, changes, or cancellations.

**Preference and format boundary:** D-019's rejection examples are not a product-wide exclusion of history or sightseeing. D-020 confirms both provider excursions and app-assembled combinations; it does not approve a provider, automatic whole-trip edits, transactions, or a combining algorithm. The proposed duration range does not mandate full-day adventures or exclude short single experiences. D-021's popular highlights are not mandatory additions or a reversal of personal-fit preferences.

**Source boundary:** D-021 records source categories and Reddit as a valued discovery platform. No integration, scraping method, content-storage permission, private account access, or paid data agreement has been approved. Review and social-proof claims require actual evidence, not invented endorsements.

**Proposed feature sequencing:** Test core planning and sharing before billing, ads, and store-publication work. Those exclusions remain Q-306; the confirmed free-first spending policy does not automatically settle monetization feature scope.

**Presentation safeguards:** Suggestions must not look booked or paid without appropriate evidence. Requirement, booking state, and payment state need distinct meanings. An app-created combination must not appear to be a verified all-inclusive package. A reveal must not prevent quick access to useful trip information. Precise criteria remain to be specified.

**Status:** Feature exclusions/details PROPOSED. D-018's same-day inclusion and D-020's formats supersede conflicting older language; D-019/D-021 do not establish global ranking rules.

## 1.14 Evidence and important assumptions

**Established:** User concept; primary use case; sequential planning and later Codex workflow; repository; pilot, test target, spending policy, individual capabilities; ranked standards; organizer preference examples; both experience formats; and reported discovery sources. The shorter/all-day idea is proposed. These are choices, self-reports, or preferences, not demonstrated product results.

**Prior external research:** The budget note retains earlier official price/access references and arithmetic assumptions. This update does not refresh them or validate coverage. No live event, excursion, Reddit, review, or calendar lookup was performed for this source-preference discussion.

**Not yet documented:** Observed planning sessions, the specific current frustration, the organization process after discovery, prototype tests, recommendation acceptance measurements, live coverage/integration tests, scheduling evaluations, willingness to pay, or owner acceptance of a working product. Initial taste examples are in D-019 and discovery sources in D-021; companion preferences remain open.

Important assumptions to test:

1. The connected workflow reduces effort compared with the user's current approach.
2. Useful, personally fitting suggestions can be consistently identified; D-019's examples and D-021's sources are starting evidence, not a complete quality test.
3. Enough timely event information can be obtained for the same-day promise, including festivals and pop-ups; coverage, freshness, and access must be demonstrated rather than inferred from source names.
4. Locations, occurrence times, prices, reservations, and deadlines can be represented with honest evidence and uncertainty. Positive reviews do not establish live logistics.
5. The main tasks can be made easy without hiding essential checks or losing saved work.
6. Practical and personalized sharing matters to companions.
7. The implementation can meet cost/reliability needs. Free-first does not prove every production dependency is free.
8. Wider users will return, subscribe, or accept advertising; one successful trip does not establish that.
9. Provider excursions and separate components can be sourced and presented distinctly, with combinations fitting available time. Offering both does not prove inventory or scheduling feasibility.
10. Firsthand/community/review/calendar evidence can be accessed and used appropriately, interpreted without duplicate or misleading support, and shown usefully within the selected scope.

These become experiments in Section 5. Same-day data feasibility is an early risk to examine before polishing an interface around untested coverage. Prepared examples test interactions, not current-world recommendation quality. Necessary paid dependencies require a specific decision under D-017.

**Status:** Assumptions and evidence gaps. Q-006's taste examples and discovery sources are answered; its frustration/workflow portion remains open. Q-356 retains current-data tests, and Q-354/Q-355 retain commercial and reservation-data questions.

## 1.15 Project goal, business model, and distribution

| Priority | Objective | Status |
| --- | --- | --- |
| Immediate | First complete test on November 10, 2026 for the Japan pilot; build free first and evaluate using D-018's ranked standards. | CONFIRMED target/direction, not a delivery guarantee. |
| Ultimate | Commercial app-store/SaaS offering earning subscription/ad revenue, with greater investment after owner acceptance. | CONFIRMED direction; detailed model open. |

The pilot comes first, not the entire commercial business. Flexible references do not authorize unlimited spending.

Pricing, billing intervals, free/paid features, trials, ad placement, ad-free plans, vendors, and monetization timing remain OPEN. No booking commission or other revenue stream is selected (Q-306/Q-407).

The owner is the first tester; companion testing arrangements, outside testers, and acquisition remain open (Q-008/Q-010). Naming Reddit as a discovery source does not select it as a marketing channel or authorize posting.

Mobile app-store versus web delivery is unresolved. SaaS and app-store distribution need not be mutually exclusive. No operating system, framework, provider, hosting plan, store listing, or pilot delivery method is selected. Free-first does not settle the platform.

**Status:** High-level objectives, timing, spending approach, ranked standards, formats, and source preferences answered; detailed cost/capacity, distribution, and revenue design open.

## 1.16 Constraints

**Process:** Sequential blueprint, documentation in `fgzmac/OnToTheNext`, design before Codex implementation. No implementation transition approved.

**Pilot:** Tokyo/Japan, two travelers, late-November to early-December 2026 planning context. Exact travel and spending values already supplied privately remain in chat, not missing inputs. Airports, transfers, stay details, and additional destinations remain unspecified.

**Target:** November 10, 2026 first complete test, then an intended period for fixes/retesting. This does not guarantee unestimated scope fits.

**Scheduling proposals:** Partial arrival/departure days; separate flight events, hotel timing, travel buffers, and rest preferences; preserve destination-local time meaning. Explore shorter/all-day options using total required time, not only activity duration. No exact buffers, duration cutoffs, or transport mode selected.

**Capabilities to preserve:** Both hotel/transport paths (D-010), per-person range/exclusion (D-014/D-016), reservation-aware dining/events (D-015), useful same-day planning (D-018), and both provider excursions and app-assembled recommendations (D-020). Detailed specifications remain open, not permission to omit capabilities.

**Ranked quality constraint:** Suggestion quality first, same-day usefulness second, seamless functionality third. Basic data correctness, privacy, reliability, and accessibility remain necessary. D-019's appeal examples and D-021's sources do not establish a finished ranking formula, source-count requirement, universal exclusions, or acceptance thresholds.

**Two budgets:** Trip budget is per person excluding flights; currency and remaining meanings open (Q-011). App policy is D-017. Development tools, one-time costs, actual service quotes, and development/maintenance time stay separate.

### Adopted app-spending policy — free first, flexible reference

Prefer suitable free options until an expense is necessary. Aim for no additional app-service charges while those options meet the need.

Retain $100/month as an initial paid-operation planning target and $150 as a flexible upper reference—not fixed ceiling, required spend, automatic cutoff, or purchase authority. Lower spending is preferred where it works; greater spending needs a specific decision.

Before a paid commitment, identify the blocked requirement/test, free alternatives, smallest useful paid option, recurring and usage costs/overages, and consequence of waiting. A necessary expense before full acceptance is a separate decision; discretionary expansion should follow a working product meeting owner standards.

**Acceptance gate:** D-018 defines the priorities. The standards note records D-019's examples, D-020's formats, D-021's sources, and proposed tests; no numerical threshold or acceptance has been approved. A demo, prepared data, passing mock tests, visual polish, or a target date alone does not establish success. Static events are not verified current recommendations; hypothetical combinations are not secured excursions; unsourced praise is not verified review evidence.

The [budget note](00-app-budget-options.md) retains earlier scenarios, not an upgrade schedule. D-017 supersedes the fixed-ceiling proposal. Development tools/overages, domains, enrollment, transaction charges, labor, hardware, taxes, marketing/legal work, and unpriced data contracts remain separate.

Free-first does not justify unsafe/incorrect behavior or promise free access to all data. Investigate event coverage, sourcing rights, freshness, and paid dependencies early without activating subscriptions. A blocked capability needs an explicit quality/cost/scope tradeoff.

**Other open constraints:** Development time, maintenance capacity, devices, detailed pilot coverage, and public launch timing (Q-004/Q-301). No stack, identity system, AI model, or external data provider selected (Q-401). Re-verify provider references before selection/spending. D-021 does not grant API, scraping, storage, or redistribution permissions.

**Public record:** Use fictional/redacted examples. No credentials, private bookings, precise travel dates/times, personal travel-budget amounts, or identifying research responses in commits. Generalized preferences and reported source categories can be recorded without personal account histories. Public repository visibility does not authorize public itineraries.

## 1.17 Completion and next discussion

Section 1 remains DRAFT. Ranked standards/same-day inclusion (D-018), organizer examples (D-019), both formats (D-020), and discovery sources (D-021) are recorded. Shorter/all-day options remain proposed. None of these individually approves the full brief or demonstrates product success.

**Next — Q-006, remaining pain point:** Which part takes the most effort now: finding worthwhile options, checking their dates and booking requirements, or combining them into a practical plan? These are prompts, not assumed frustrations. The owner has answered where ideas come from; do not ask that again.

Duration controls, cutoffs, format presentation, and total-time rules remain Q-212 for journeys. The complete promise, measurable acceptance, wider audience, organization workflow, capacity, and travel-budget currency/categories still need decisions or explicit deferral. Spending flexibility is intentional; do not re-ask a fixed ceiling.

Continue one Section 1 question at a time. Preserve supplied examples, formats, sources, priorities, timing, group, budget basis, hotel/transport capabilities, reservation inclusion, and spending policy. Do not start implementation or mark later sections complete.

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
| 2026-09-19 | Ranked quality, same-day planning, and seamless use; reconciled earlier deferral language. | D-018 confirmed; tests and section approval remain open. |
| 2026-09-19 | Recorded positive scenic/participatory and negative standalone-attraction examples. | D-019 preference input; formats still open at that revision. |
| 2026-09-19 | Confirmed both formats; recorded shorter/all-day as tentative. | D-020, Q-012 resolved; no cutoffs, providers, transactions, or section approval. |
| 2026-09-19 | Recorded firsthand experiences, positive Reddit posts, highly rated reviews, relevant calendars, and destination highlights as discovery inputs. | D-021 source preferences recorded; Q-006 source portion answered. Pain point, source integrations, and detailed verification remain open. |
