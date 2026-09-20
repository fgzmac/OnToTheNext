# Decision Register

**Purpose:** Record explicit decisions and their boundaries.  
**Owner:** Project owner (`fgzmac`).  
**Last updated:** 2026-09-19.  
**Current phase:** Product design.  
**Source:** Explicit statements in the planning conversation. Prior pricing references are in [App Budget Policy and Options](00-app-budget-options.md). Ranked standards, preference examples, discovery sources, formats, and proposed evaluations are in [Product Success Standards](00-product-success-standards.md). No user testing or live provider integration test is recorded.

A commit is not a product approval. Recommendations copied into the base idea do not automatically become requirements. Each decision records only the part supported by the owner's actual direction.

## Confirmed decisions and recorded inputs

| ID | Decision or input | Status | Date |
| --- | --- | --- | --- |
| D-001 | Use the supplied blueprint and complete it sequentially in this chat. | CONFIRMED | 2026-09-19 |
| D-002 | An organizer plans a trip they are taking and shares it with companions. | CONFIRMED | 2026-09-19 |
| D-003 | Complete design before Codex implementation. | CONFIRMED | 2026-09-19 |
| D-004 | Maintain planning in `fgzmac/OnToTheNext`. | CONFIRMED | 2026-09-19 |
| D-005 | Use Discover / Organize / Delight as the starting concept. | CONFIRMED at concept level | 2026-09-19 |
| D-006 | Develop/test for the Japan pilot before commercial launch. | CONFIRMED; timing clarified D-011–D-013 | 2026-09-19 |
| D-007 | Commercial app-store/SaaS goal with subscription and ad revenue. | CONFIRMED direction; implementation open | 2026-09-19 |
| D-008 | Initial pilot: a couple, two travelers total. | CONFIRMED for pilot | 2026-09-19 |
| D-009 | Account for hotels and transportation alongside activities. | CONFIRMED; paths clarified D-010 | 2026-09-19 |
| D-010 | First version organizes existing hotel/transport bookings and recommends options for both. | CONFIRMED capabilities | 2026-09-19 |
| D-011 | Tokyo included; trip window spans late November through early December. | CONFIRMED context; calendar settled D-012 | 2026-09-19 |
| D-012 | First complete test targeted for November 10, 2026. | CONFIRMED planning target, not guarantee | 2026-09-19 |
| D-013 | Tokyo-local travel times supplied; arrival and departure are partial-day context. | CONFIRMED input; exact values private | 2026-09-19 |
| D-014 | Supplied trip-spending range excludes plane tickets; not an app allowance. | CONFIRMED input; basis D-016; currency open | 2026-09-19 |
| D-015 | Account for reservation-required events and restaurants. | CONFIRMED requirement; detail open | 2026-09-19 |
| D-016 | Trip-budget range is per person. | CONFIRMED basis; other meanings open | 2026-09-19 |
| D-017 | Free first; flexible $100/$150 references; necessary spending reviewed; greater investment after owner acceptance. | CONFIRMED policy; no purchase approved | 2026-09-19 |
| D-018 | Rank suggestion quality first, same-day nearby discovery/on-the-fly planning second, seamless functionality third. Same-day capability belongs in first version. | CONFIRMED priorities/capability; tests and acceptance open | 2026-09-19 |
| D-019 | Initial organizer favors scenic, participatory, locally distinctive and multi-part experiences over the supplied novelty-object and standalone-statue examples. | STATED PREFERENCE RECORDED; not universal; formats settled D-020 | 2026-09-19 |
| D-020 | Offer both ready-made provider excursions and app-assembled combinations of separate activities. | CONFIRMED formats; shorter/all-day options are a proposal | 2026-09-19 |
| D-021 | Discovery uses or values real experiences, positive Reddit posts, highly rated reviews, date-relevant calendars, and destination-related must-see experiences/events. | REPORTED SOURCES / PREFERENCES RECORDED; integrations and verification rules open | 2026-09-19 |

## D-001 — Sequential blueprint planning

**Question:** What process guides planning?

**Decision:** The supplied blueprint is the main framework. This chat is solely for filling it out one section at a time.

**Source:** Owner instruction to keep the blueprint as the main point and progress one by one.

**Reason:** An organized blueprint should support later development.

**Boundaries:** Adopting the process does not approve every example, suggested feature, technical approach, or milestone. Later questions can be parked without answering prematurely.

**Current effect:** Section 1 is the active draft. No completed section is approved.

**Revisit:** Owner changes the process.

## D-002 — Organizer plans a trip they are taking

**Question:** Shared trip or surprise trip for someone else?

**Decision:** Primary use case is planning a trip the organizer takes and shares with companions.

**Source:** Owner answer, “Planning a trip to share with companions.”

**Reason:** Explicitly selected use case.

**Boundaries:** Does not select organizer-only editing, suggestions, voting, guest accounts, access mechanisms, or publication behavior. Future surprise experiences are not forbidden.

**Implication:** “Look what I planned for us,” with a plan useful to the group. D-018 adds same-day decisions without replacing this base use case.

**Revisit:** Owner or research changes the primary use case.

## D-003 — Design first; implementation afterward

**Question:** When does coding begin, and what supports it?

**Decision:** Complete design, then use Codex to build.

**Source:** Owner's instruction to use Codex once the design phase is done.

**Boundaries:** No stack, database, identity system, API provider, or AI component selected. This workflow remains documentation-only. Test-target, spending-policy, quality-standard, format, or source-preference input does not authorize implementation.

**Working interpretation:** Sufficiently define direction, first-release scope, main journeys, constraints/risks, and first buildable feature, followed by explicit transition approval. Do not specify all future features upfront. Review this interpretation with the owner at transition.

**Revisit:** Owner authorizes implementation or changes workflow.

## D-004 — Planning repository

**Question:** Where is the maintained record?

**Decision:** `https://github.com/fgzmac/OnToTheNext`.

**Source:** Owner-supplied repository URL.

**Verified at setup:** Default branch `main`; public visibility, observed 2026-09-19. These are metadata observations, not immutable product decisions.

**Boundaries:** Repository name is not automatically the final brand. Public repository does not authorize public itineraries or disclosure of private bookings, dates/times, personal spending, credentials, or identifying research responses. Project milestones and generalized standards may be recorded without private trip details.

**Organization:** README, reusable blueprint, active product brief, decisions, questions, and relevant Section 1 supporting notes. Cost and success-standard notes do not complete later architecture or testing sections.

**Revisit:** Owner changes repository, visibility, or documentation workflow.

## D-005 — Adopt the base concept, not every recommendation

**Question:** What idea should the blueprint develop?

**Decision:** Discover experiences people will enjoy, organize choices into a realistic trip, and present a personalized itinerary worth sharing.

**Source:** Owner instruction to use the supplied material as the base idea.

**Core jobs:** Discover, Organize, Delight; primary use case D-002.

**Boundaries:** Not blanket approval of limited destinations, companion suggestions, private drafts/publication rules, email/text delivery, guest access, exact selection controls, providers, or AI. Explicit later choices refine this concept.

**Later clarification:** D-018 ranks recommendation quality, same-day usefulness, and ease ahead of extra presentation effects. It does not remove personalized sharing.

**Revisit:** Vision changes or evidence challenges core assumptions.

## D-006 — Japan pilot comes first

**Question:** What is the immediate objective versus commercialization?

**Decision:** Develop and test for a Japan trip initially described as in November; prioritize it over commercial launch.

**Source:** Owner explicitly selected the trip as the immediate goal.

**Reason:** A concrete real-use scenario for the first test.

**Confirmed implications:** Owner is first organizer/tester. D-008 supplies two-person audience; D-009/D-010 supply hotel/transport support; D-011 clarifies Tokyo and a December end; D-012 confirms test target/calendar; D-013 supplies local travel times. Exact private values stay in chat. D-018 defines first-version standards; D-020 confirms both formats. D-021 adds discovery-source preferences, not integration approval.

**Boundaries:** Additional destinations, airports, transfers, detailed specifications, data coverage, devices, and delivery mechanism remain open. No nationwide/Japan-only promise, single-city restriction, public-launch deadline, or mandatory pilot billing/ads.

**Evidence limit:** A chosen trip is not a completed test or proof of demand, willingness to pay, or feasibility.

**Public-record boundary:** Generalized milestone and anonymous pilot profile, not detailed private travel data.

**Affected:** Product brief, README, decisions, questions; later scope and risks.

**Related:** Q-002/Q-003 resolved; Q-004 timing/spending approach settled by D-012/D-017; specific costs/capacity, Q-008, full Q-005 promise, and detailed scope open. D-018 settles ranked standards, not full acceptance.

**Revisit:** Trip needs, evidence, or priorities change.

## D-007 — Commercial goal and revenue sources

**Question:** Ultimate business objective?

**Decision:** Commercial app-store or SaaS offering with subscription and advertising revenue; distribution approach unselected.

**Source:** Owner's explicit ultimate goal.

**Reason:** Commercialization, not only personal use or a portfolio.

**Priority:** Pilot D-006 first; greater discretionary investment follows D-017's owner-acceptance gate, informed by D-018.

**Open:** Pricing, billing intervals, free/paid entitlements, ad formats/placements, ad-free plans, vendors, introduction timing. No extra revenue stream selected.

**Distribution boundaries:** No native/web architecture, operating system, platform order, pilot delivery, store listing, hosting, or public-launch date chosen. SaaS and app-store distribution are not inherently exclusive choices.

**Evidence limit:** Intent is not profitability, retention, demand, or willingness-to-pay evidence.

**Affected:** Product brief, README, decisions, questions.

**Related:** Q-002/Q-007 resolved; monetization Q-306, validation Q-354, platform Q-401/Q-407.

**Revisit:** Pilot findings, research, actual costs, platform requirements, or owner priorities.

## D-008 — Two-person couple pilot

**Question:** Who is the first trip for?

**Decision:** Couple; two travelers total, organizer and companion.

**Source:** Owner said the trip is with a significant other and includes two people. Public record uses an anonymous profile.

**Reason:** Actual first-use group.

**Boundaries:** Not a permanent size limit, couples-only audience, identical preferences, romantic theme, or permission model. Companion testing participation remains open. This decision did not determine spending basis; D-016 later does.

**Affected:** Product brief, README, decisions, questions.

**Related:** Q-003 resolved for pilot; commercial audience Q-010; participation Q-008; permissions Q-101; preference input Q-106; remaining budget meanings Q-011. D-019/D-021 do not supply the companion's taste or discovery practices.

**Revisit:** Pilot participation or wider target changes.

## D-009 — Hotels and transportation

**Question:** Only activity discovery and scheduling?

**Decision:** Hotels and transportation are required planning areas alongside activities.

**Source:** Owner instruction to account for hotels and transportation.

**Reason:** Include where travelers stay and how they move.

**History:** Support depth initially open Q-009; D-010 later confirms organizing existing bookings and recommendations for both areas. Modes, costs, coverage, and scheduling behavior remain open. D-014 supplies travel-range input, not a complete accounting rule.

**Proposed interpretation:** Stays anchor daily geography; journeys constrain usable time; local travel connects stops; costs contribute to the relevant budget. These are considerations, not completed specifications.

**Boundaries:** No reservations, payments, modifications, cancellations, account/email access, live-price guarantees, provider selection, or commission model. Planning around a booking differs from buying it; proposed no-transactions scope does not remove planning.

**Affected:** Brief, README, decisions, questions; later journeys/scope/data/integrations remain unstarted.

**Related:** Q-009 resolved D-010; Q-209 detail; Q-302/Q-303/Q-305 scope; Q-402/Q-404 sources/concepts.

**Revisit:** Owner changes support or evidence requires a scope tradeoff.

## D-010 — Both existing-booking organization and recommendations

**Question:** Existing hotel/transport bookings, recommendations, or both in the first version?

**Decision:** Both for both areas.

**Source:** Owner's “both” to that explicit question; no different answer for either area.

**Reason:** Support existing arrangements and choices not yet booked.

| Area | Organize existing bookings | Recommend before booking |
| --- | --- | --- |
| Hotels | Included in first version. | Included in first version. |
| Transportation | Included in first version. | Included in first version. |

**Boundaries:** Does not approve payments, booking transactions/changes/cancellations, account/email access, automatic imports, live availability, a transport mode/provider, affiliate revenue, or worldwide coverage. Entry, verification, criteria, and handoffs remain open. Recommendation is not booking confirmation.

**Scope effect:** Do not downgrade to a booking organizer or silently postpone recommendations. Explicit revision required if feasibility conflicts. Neither free-first nor later priority ranking removes either path. Full specifications and Section 1 approval remain open.

**Evidence limit:** Choice, not proof of access, quality, or effort.

**Affected:** Brief, README, decisions, questions.

**Related:** Q-009 resolved; Q-209 workflow; Q-301/Q-302/Q-305 limits; Q-402/Q-404 sources/concepts; Q-004 capacity/cost details.

**Revisit:** Requirement changes or feasibility requires explicit tradeoff.

## D-011 — Tokyo and travel window

**Question:** What destination/timing guides the pilot?

**Confirmed context:** Tokyo included. Outbound/return month-day endpoints supplied in chat; public record retains only late-November through early-December and approximate two-week span.

**Source:** Owner clarification; no external booking data accessed/published.

**History:** Year initially unstated and assumed 2026. D-012 subsequently approves November 10, 2026 test target and planning calendar. D-013 supplies Tokyo-local times.

**Boundaries:** Travel dates alone did not approve software readiness; D-012 records that separately. Neither promises public launch, Tokyo-only travel, airports, accommodation nights, transfers, or full activity days. Additional destinations open.

**Related:** Timing Q-004 settled by D-012, spending policy by D-017; capacity/specific costs open. Q-301 has generalized context. Do not re-ask values merely because they are omitted publicly.

**Revisit:** Target, destinations, or travel plans change.

## D-012 — First complete test target

**Question:** Does November 10, 2026 work for the first complete test?

**Decision:** Yes; target November 10, 2026.

**Source:** Owner's “Yes” after explicit dated milestone question.

**Reason:** Establish a pre-trip test with a subsequent period for fixes/retesting.

**Calendar effect:** Use 2026 for pilot planning. Supersedes prior assumed year/unapproved target; private flight values remain in chat.

**Boundaries:** Planning target, not delivery guarantee, demonstrated feasibility, public launch, blanket feature approval, or implementation authorization. Scope, capacity, costs, tests, and dependencies need evaluation. No reminder/calendar/automation requested or created.

**Affected:** Brief, README, decisions, questions; section tracker remains DRAFT.

**Related:** Q-004 timing resolved; spending D-017; specific costs/capacity open; Q-304/Q-501/Q-502 define completion using D-018 standards. Travel budget is not app funding.

**Revisit:** Explicit target tradeoff or owner change.

## D-013 — Supplied Tokyo-local times

**Question:** What time-of-day context must the pilot respect?

**Confirmed context:** Owner supplied late-day arrival and midday departure clock times, both explicitly Tokyo-local. Private date/time pairs remain in chat, not commits.

**Source:** Owner's timing clarification with D-012 approval; not a live airline verification.

**Proposed implications:** Partial arrival/departure days; distinguish airport arrival from hotel arrival/activity readiness, and flight departure from hotel departure. Assess transfers, airport buffers, hotel rules, and rest with actual inputs. Preserve destination-local meaning, not home/browser time.

**Boundaries:** No airport, airline, flight number, transfer mode/duration, hotel, deadline, or activity allocation inferred. No account access, tracking, monitoring, reminder, or booking authorized. Exact rules remain proposed.

**Affected:** Brief, README, decisions, questions; carry distinctions into later journeys/scope/tests.

**Related:** Context supplied; Q-201/Q-209 behavior, Q-305 constraints, Q-352 representative tests.

**Revisit:** Travel changes or actual routing/hotel information clarifies assumptions.

## D-014 — Trip range excluding plane tickets

**Question:** How to record the spending-range answer?

**Confirmed input:** Low/high dollar-denominated trip range with plane tickets excluded; private amounts retained in chat. Basis initially open, later per person under D-016. Currency remains open.

**Context:** Despite following a monthly-app-cost question, airfare exclusion indicated trip spending. Owner later separately requested app tiers and chose D-017. No app purchase is authorized from the travel range.

**Product direction:** Preserve configurable range and exclusion; do not substitute a single amount, apply it to app costs, or invent category inclusions.

**Open:** Currency, total versus remaining costs, categories, lower-bound meaning, upper firmness, cost display/calculation. D-017 app flexibility does not settle trip flexibility.

**Proposed safeguards:** No forced minimum spend; clarify a hard cap; label estimates/unknowns; separate shared/per-person and paid/remaining; avoid deposit double-counting. Budget airfare exclusion does not remove flight timing.

**Evidence limits:** No affordability result, conversion, daily/nightly allowance, allocation, payment authority, pricing source, or expense integration.

**Affected:** Brief, README, decisions, questions; no public personal figures.

**Related:** D-017 app approach; Q-011 remaining meanings; Q-211 detail; Q-308 scope; Q-402/Q-404/Q-352 data/tests.

**Revisit:** Currency, inclusions, or spending preferences clarified.

## D-015 — Reservation-aware events and restaurants

**Question:** Account for events/restaurants requiring reservations?

**Decision:** Yes.

**Source:** Owner's explicit instruction accompanying the travel range.

**Scope effect:** Carry into discovery, scheduling, and pilot; not unrelated future-only work. D-018's same-day use case must also respect reservation feasibility. Depth and automation remain open.

**Proposed implications:** Separate requirement, booking state, and payment; trusted booking route; known release/deadline with source/local time; tentative unconfirmed slots; protect confirmed commitments when previewing changes; alternatives; deposits/fees without double-counting. Exact fields/rules/sources/tests remain proposed.

**Boundaries:** No automatic bookings, payments, changes/cancellations, account/email access, availability guarantee, provider, release monitoring, notifications, or reminders. No selected/verified event or restaurant. User-entered and provider-verified status are distinct evidence.

**Evidence limit:** Requirement, not proven data coverage or feasibility within the date. Free-first does not make unavailable information free or verified.

**Affected:** Brief, README, decisions, questions; later workflow/scope/data/verification.

**Related:** Q-210 behavior, Q-307 depth, Q-305 schedule, Q-355 reservation data, Q-402/Q-404 sources/concepts; D-018 same-day context. Do not re-ask inclusion.

**Revisit:** Experience refined or source evidence requires tradeoff.

## D-016 — Travel budget per person

**Question:** Combined two-person range or each person?

**Decision:** Per person; D-014 airfare exclusion remains.

**Source:** Owner's explicit “per person” answer followed by separate app-budget comparison request.

**Reason:** Avoid treating personal allowance as shared total.

**Boundaries:** Currency, categories, total/remaining, split of shared expenses, minimum spend, and cap behavior not settled. Private numbers/derived totals stay in chat. Do not count shared hotel cost twice.

**App-budget history:** Requesting tiers did not approve spending/providers/implementation. D-017 later accepts the $100/$150 recommendation with free-first/flexible modifications. Comparisons remain in the budget note.

**Affected:** Brief, README, decisions, questions, budget note.

**Related:** Q-011 basis resolved; remaining meanings open; app approach D-017; Q-211/Q-308 detail.

**Revisit:** Basis changes or other meanings supplied.

## D-017 — Free first; flexible budget

**Question:** Should recommended $100/month target and $150 ceiling guide the pilot?

**Decision:** Adopt as flexible reference, not fixed budget. Build with suitable free options until spending is necessary. Consider greater spending after the product works and meets owner standards.

**Source:** Owner explicitly requested free-first, flexibility, and a working-product gate before increased investment.

**Effect:** Aim for no additional app-service costs while adequate free options exist. $100/month remains initial paid-operation target; $150 is upper review reference, not hard ceiling, required spend, automatic cutoff, or purchase authority. No paid tier activated. Lower spending preferred; later higher spending requires a decision.

**Necessary spending versus investment:** Review any blocked requirement/test, free alternatives, smallest useful paid option, recurring/usage/overage costs, and consequences of waiting before a specific spending decision. Necessary limited spending may precede overall acceptance; discretionary expansion follows owner judgment of a working product. No automatic billing enrollment or subscription authority.

**Acceptance gate:** D-018 subsequently defines standards/order; D-019 supplies taste examples and D-021 records valued discovery sources. Detailed tests and acceptance remain open under Q-304/Q-502. A functioning demo, attractive screens, mock tests, or a calendar milestone do not establish acceptance. Defining the gate does not satisfy it.

**Scope/evidence:** Preserve confirmed capabilities, including D-018 same-day discovery and D-020 formats. Free-first changes cost sequence, not requirements. Label simulations; they do not prove live coverage, durable storage, correct routes, or readiness. Investigate paid dependencies early and surface conflicts. No unsafe handling or false availability claims to maintain a free label.

**Separate expenses:** Development subscriptions/overages, domains, enrollment, hardware, one-time purchases, and unpriced licenses outside runtime reference. Travel funds/rules unaffected; existing subscriptions are not reclassified as free.

**Implementation/source boundaries:** Remain Section 1 design. No stack, vendor, native/web, deployment, metered billing, purchase, or automation approved. Retained reference prices need relevant re-verification before use.

**Supersedes:** Fixed-$150-ceiling proposal and implication paid infrastructure should start immediately. Keeps amounts only as adjustable references.

**Affected:** README, brief, budget note, decisions, questions. Standards and sourcing notes do not modify this policy.

**Related:** Q-004 spending policy answered; capacity/separate costs/purchases open. Q-005 priorities answered by D-018; full promise open. Q-304/Q-353/Q-355/Q-356/Q-403/Q-405/Q-502/Q-503 define later evidence and controls.

**Revisit:** Necessary expense, use beyond free capacity, owner acceptance, or policy change. Flexibility is not unlimited authority.

## D-018 — Ranked standards and same-day discovery

**Question:** What are the three most important things the first version must do well?

**Decision, in descending importance:**

1. **High-quality suggestions:** Options must be things a traveler would consider adding; without this the product lacks purpose.
2. **Real-time, on-the-fly planning:** Decide what to do that day using worthwhile nearby events and experiences, including festivals and pop-ups.
3. **Functionality and ease:** Seamless and useful, not a chore.

**Source:** Owner's explicitly numbered first-version priority answer on 2026-09-19.

**Reason:** Owner-chosen standards for behavior and investment, not assistant-selected ranking.

**First-version effect:** Same-day discovery and plan creation are required. An earlier proposal to postpone advanced replanning must not remove them. More automated or whole-trip replanning remains separately open. A list of permanent nearby places alone does not demonstrate current-event discovery.

**Relationship to existing idea:** Preserve Discover/Organize/Delight, hotel/transport paths, budgets, and reservations. Sharing remains; extra effects cannot compensate for poor suggestions or difficult use. Basic correctness, privacy, reliability, and accessibility are not waived.

**Open:** Detailed quality weights; preference inputs; area/event coverage; time/location behavior; time fit; freshness/latency; previews/permissions; numerical criteria; and owner acceptance. D-019 supplies appeal examples and D-021 discovery sources; these are no longer missing inputs.

**Proposed evaluations:** Serious consideration, voluntary additions, rejection reasons, factual/feasibility errors, valid current-event coverage and omissions, task completion/effort. No numerical targets or finalized suite. See [Product Success Standards](00-product-success-standards.md).

**Real-time boundaries:** Current-decision usefulness, not approval of polling, continuous GPS, notifications, monitoring, inventory guarantees, transactions, providers, or AI architecture. Retrieval is not verification; today is not necessarily reachable or bookable now.

**Free-first:** D-017 unchanged. Examine data risks early; prepared-data success is not live usefulness. Present any paid-access or scope tradeoff without silently lowering standards or spending.

**Evidence limit:** Product choice, not demonstrated success, source coverage, or feasibility within the target. No live event lookup, provider test, booking, purchase, or acceptance by recording it.

**Affected:** README, brief, decisions, questions, standards note; later sections remain NOT STARTED.

**Related:** Q-005 priorities answered; full promise open. Q-006 examples D-019 and sources D-021; Q-207 workflow; Q-309 minimum same-day; Q-304 metrics; Q-305 schedule; Q-356 data quality; Q-402/Q-404 concepts; Q-502/Q-503 tests.

**Supersedes:** Basic same-day planning as optional later work and the previously unranked standards. Does not approve advanced automation or the full section.

**Revisit:** Owner refinements, changed priorities, or evidence requiring explicit scope tradeoff.

## D-019 — Initial organizer's experiential recommendation preferences

**Question:** What would the owner consider adding or reject?

**Positive examples:** Breathtaking beach view, snorkeling, and oceanside dinner in a connected excursion; scenic ATV exploration with something distinctive to the area.

**Negative examples:** The world's largest rubber band; a historical statue.

**Source:** Direct response to Q-006. Hypothetical preferences, not actual bookings or a destination-research request.

**Interpretation:** Participation, memorable scenery, local distinctiveness, and complementary components appeal more than standalone novelty/monument viewing to this organizer. This is a working interpretation, not quantitative scoring.

**Personalization boundary:** Not a global history/statue/museum/sightseeing/popular-place ban or the companion's taste. Do not infer romance, luxury, risk tolerance, skill, physical ability, exertion, or all-day availability. Strong single activities remain eligible. D-021's destination highlights do not reverse these examples.

**Destination/evidence boundary:** No actual snorkeling/ATV combination, operator, inclusion, price, or seasonality verified for Tokyo. Local appeal does not authorize unsupported uniqueness claims.

**Capability history:** Q-012 initially left format open; D-020 later explicitly selects both. Hotel/transport D-010 was not reused to answer the format question.

**Proposed safeguards:** Distinguish operator product from app sequence; verify inclusions or separate components, time/travel/costs/booking needs, and uncertainty. A combination does not create one ticket, included food, or joint availability. Same-day fit still matters.

**Scope effect:** Refines quality, not priority replacement or capability removal. Preference alone did not select package booking, automatic bundling, an algorithm, source access, paid services, or implementation. D-020 confirms formats, not those details.

**Evidence limit:** One organizer's stated taste, not observed use, attendance, full benchmark, market validation, or working-product acceptance.

**Affected:** Brief, standards note, README, decisions, questions; Section 1 DRAFT.

**Related:** Q-006 examples answered, sources later D-021; workflow/frustration and broader evidence open. Q-012 resolved D-020. Q-106 companion, Q-204/Q-209/Q-210 presentation/reservations, Q-304/Q-352 evaluation, Q-404 concepts.

**Revisit:** Preference refinement, companion input, or actual testing.

## D-020 — Offer both experience formats; explore duration options

**Question:** Ready-made excursions, app-assembled combinations, or both?

**Decision:** Offer **both**. Q-012 resolved at capability level.

**Source:** “Offer both. Maybe shorter activities and all day activities.” First sentence confirms formats; second is tentative duration input.

**Reason:** Discover organized experiences and connected plans from separate activities without choosing only one.

**Format distinction:** Provider offering has actual advertised inclusions/conditions. App sequence is independently sourced components, not automatically one product, price, jointly available set, or booking. No transactions follow from recommending.

**Duration proposal:** Explore short and all-day options. No hour cutoffs, intermediate category, stop count, default, or controls selected. Duration and format are independent; neither format must be long or short. Do not fill every day or exclude single activities.

**Proposed fit checks:** Usable window; travel to/from relevant places; included transfers; activity length; breaks; entry times; reservations; later commitments. Avoid double-counting travel or shortening fixed tours without a real variant. Label unknown timing. These are considerations, not approved formulas.

**Scope effect:** Carry both formats into first-version planning; minimum coverage and implementation still need sizing. Duration direction remains proposed, not verified inventory or fixed categories.

**Boundaries:** No provider/API, ranking ratio, booking, automatic whole-trip edits, shared permissions, paid service, actual-trip recommendation, or implementation selected. Free-first D-017, ranking D-018, and section/acceptance status unchanged.

**Evidence limit:** Product choice and idea, not date-specific inventory or real-time availability evidence. No excursion lookup or reservation by recording it.

**Affected:** Brief, standards, README, decisions, questions; Section 1 DRAFT, later sections NOT STARTED.

**Related:** Q-012 resolved; Q-006 discovery sources later answered D-021, frustration still next. Q-212 durations/presentation; Q-302/Q-305 depth/timing; Q-402/Q-404 evidence/concepts; Q-304/Q-352 evaluation.

**Supersedes:** Open choice between formats, not tentative duration into fixed rules.

**Revisit:** Duration refinement, data-driven scope tradeoff, or confusing format presentation.

## D-021 — Reported discovery sources and recommendation evidence preferences

**Question:** Where does the owner find activities they genuinely like?

**Recorded input:** Real experiences; positive posts on Reddit; highly rated reviews; calendars listing events within particular time frames; popular must-see or must-experience events associated with the destination.

**Source:** The owner's answer to the current-discovery/workaround question. The source portion is answered; the answer does not identify the most frustrating part or explain the full organization process.

**Interpretation:** Preserve firsthand experience, community recommendations, review evidence, date-based discovery, and meaningful destination highlights as valued inputs for product design. This is a self-report/source preference, not proof of any specific post, review, event, or visited experience. “Real experiences” does not establish whose firsthand account it is; do not invent personal travel history.

**Relationship to D-018/D-019:** High ratings and popular highlights can help discover candidates, but do not replace personal appeal or practical fit. A familiar destination experience can be worthwhile; the product is not restricted to obscure discoveries. Do not use popularity to force the organizer's rejected examples into the plan or copy their preferences to companions.

**Proposed evidence handling:** Use community/experience/review evidence for why a candidate may be enjoyable; use suitable current organizer, venue, operator, or booking information to check material logistics. Consider context, recency, review content and volume, useful critical caveats, distinct occurrences/operators, and duplicate or conflicting evidence. A positive post is not proof of present availability; a calendar entry is not a secured reservation. No single option must have all five source types unless later approved.

**Boundaries:** No particular review platform other than the named Reddit category, subreddit, account, calendar, numerical review threshold, weighting, minimum evidence count, API, scraper, paid license, data supplier, or content-storage method selected. No account-history import, posting, copying of posts/photos into the product, training on community content, or monitoring authorized. Access, rights, attribution, retention, cost, and coverage need later evaluation. Naming Reddit is not a marketing-channel choice.

**Evidence limit:** No external posts, reviews, calendars, or event offerings were researched, fetched, or verified in this update. Do not claim review authenticity, independent endorsements, current dates, ratings, or bookings without evidence. The full workflow, pain point, observed effort, and broader demand remain unknown.

**Affected:** Product brief 1.6/1.9/1.14; standards note; README; decisions; open questions. Preserve free-first, both formats, and ranked priorities. Section 1 remains DRAFT.

**Related:** Q-006 source portion answered; its remaining frustration/workflow is next. Q-204 evidence display; Q-304/Q-352 testing; Q-355/Q-356 reservation/event evidence; Q-402 sources and conflicts; Q-403 access/rights; Q-404 source attribution concepts. These later details stay open.

**Supersedes:** The assertion that the owner's current discovery sources are wholly unknown. Does not convert possible organizing tools into confirmed practices or approve a complete sourcing architecture.

**Revisit:** The owner describes the workflow or specific frustration, supplies concrete sources, or later access/quality tests require changes.

## Approval register

| Item | Status | Evidence |
| --- | --- | --- |
| Blueprint framework | Adopted | D-001 |
| Section 1 completed brief | NOT APPROVED — draft | None |
| Pilot first; eventual commercialization | CONFIRMED direction | D-006/D-007 |
| Couple, two travelers | CONFIRMED pilot | D-008 |
| Hotel/transport coverage and both paths | CONFIRMED capabilities | D-009/D-010 |
| Tokyo/travel context | CONFIRMED input; private values omitted | D-011/D-013 |
| First test November 10, 2026 | APPROVED target, not guarantee | D-012 |
| Range excluding airfare, per person | CONFIRMED input/basis; currency/details open | D-014/D-016 |
| Reservation-aware events/restaurants | CONFIRMED requirement | D-015 |
| Free-first flexible app budget | CONFIRMED policy; no purchase | D-017 |
| Ranked success standards | CONFIRMED priorities | D-018 |
| First-version same-day nearby discovery | CONFIRMED capability; details open | D-018 |
| Initial organizer's appealing/rejectable examples | RECORDED stated preference, not global rule | D-019 |
| Ready-made excursions and app-assembled combinations | BOTH CONFIRMED; details open | D-020, Q-012 resolved |
| Shorter and all-day duration options | USER PROPOSAL; rules open | D-020, Q-212 |
| Discovery sources and valued evidence | RECORDED self-report/source preferences; access unselected | D-021 |
| Specific current planning frustration/workflow | NOT YET DESCRIBED | Remaining Q-006 |
| Working product meets standards | NOT DEMONSTRATED OR ACCEPTED | Tests and owner judgment required |
| Numeric acceptance/freshness/latency criteria | NOT SELECTED | Q-304/Q-309 |
| Sections 2–15 | NOT STARTED | None |
| Complete pilot/commercial scope | NOT APPROVED; individual choices apply | No whole-scope approval |
| Stack/architecture/providers | NOT SELECTED | None |
| Monetization detail/platform | NOT SELECTED | None |
| Design-to-implementation transition | NOT APPROVED | None |

## Proposals not to mistake for decisions

Organizer-led suggestion approval; publication/draft model; account-free access; exact Keep/Must-do/Lock behavior; detailed coverage; date-free exploration; provider/AI choices; automated whole-trip replanning; multi-city complexity; booking/payment integrations; pilot billing/ad exclusions; price tiers/ad placement; native/web-first delivery; imports; transport modes; detailed recommendation ranking; scheduling/airport buffers; trip cost formulas; reservation/payment state model; monitoring/reminders; numeric quality/coverage/response targets; cost controls; duration buckets/filters; exact activity-combination algorithm; source weights, review thresholds, verification hierarchy, and source-access methods.

Basic same-day discovery and both experience formats are confirmed. D-019's examples are personal taste; D-020's durations are tentative; D-021 records sources without validating or licensing their content. Neither ranking nor flexible budget authorizes spending, data collection, transactions, or implementation. The fixed-ceiling proposal is superseded. Preserve historical reasoning while applying later clarifications.

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
Evidence and limits:
Tradeoffs:
Affected documents/features:
Owner:
Date:
Revisit trigger:
Supersedes:
Related open questions:
```

## Maintenance rule

Update affected documents/questions when an answer settles a choice. Update the section tracker only when the owner approves the section. Preserve superseded decisions and their reasoning. A standard, milestone, format, source preference, or documentation commit is not product acceptance.
