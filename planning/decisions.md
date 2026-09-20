# Decision Register

**Purpose:** Record explicit decisions and their boundaries.  
**Owner:** Project owner (`fgzmac`).  
**Last updated:** 2026-09-19.  
**Current phase:** Product design.  
**Source:** Explicit statements in the planning conversation. Prior pricing references are in [App Budget Policy and Options](00-app-budget-options.md). Ranked standards, preference examples, format choices, and proposed evaluations are in [Product Success Standards](00-product-success-standards.md). No user testing or live provider integration test is recorded.

A commit is not a product approval. Recommendations copied into the base idea do not automatically become requirements. Each decision records only the part supported by the owner's actual direction.

## Confirmed decisions

| ID | Decision | Status | Date |
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
| D-019 | Initial organizer favors scenic, participatory, locally distinctive and multi-part experiences over the supplied novelty-object and standalone-statue examples. | STATED PREFERENCE RECORDED; not a universal rule; formats subsequently settled by D-020 | 2026-09-19 |
| D-020 | Offer both ready-made provider excursions and app-assembled combinations of separate activities. | CONFIRMED formats; shorter/all-day options are a user proposal, not fixed duration rules | 2026-09-19 |

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

**Boundaries:** No stack, database, identity system, API provider, or AI component selected. This workflow remains documentation-only. Test-target, spending-policy, quality-standard, or format approval does not authorize implementation.

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

**Confirmed implications:** Owner is first organizer/tester. D-008 supplies two-person audience; D-009/D-010 supply hotel/transport support; D-011 clarifies Tokyo and a December end; D-012 confirms test target/calendar; D-013 supplies local travel times. Exact private values stay in chat. D-018 further defines first-version standards; D-020 confirms both experience formats.

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

**Related:** Q-003 resolved for pilot; commercial audience Q-010; participation Q-008; permissions Q-101; preference input Q-106; remaining budget meanings Q-011. D-019's organizer examples do not supply the companion's preferences.

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

**Acceptance gate:** D-018 subsequently defines the three standards and order; D-019 supplies initial organizer taste examples. Detailed tests/thresholds and acceptance remain open under Q-304/Q-502. A functioning demo, attractive screens, mock tests, or a calendar milestone do not establish acceptance. This gate is not satisfied merely by defining it.

**Scope/evidence:** Preserve confirmed capabilities, including D-018 same-day discovery and D-020 experience formats. Free-first changes cost sequence, not requirements. Label simulations; they do not prove live event coverage, durable storage, correct routes, or travel readiness. Investigate paid dependencies early and surface quality/cost/scope conflicts. No unsafe data handling or false availability claims to maintain a free label.

**Separate expenses:** Development subscriptions/overages, domains, enrollment, hardware, one-time purchases, and unpriced licenses outside runtime reference. Travel funds/rules unaffected; existing subscriptions are not reclassified as free.

**Implementation/source boundaries:** Remain Section 1 design. No stack, vendor, native/web, deployment, metered billing, purchase, or automation approved. Retained reference prices need relevant re-verification before use.

**Supersedes:** Fixed-$150-ceiling proposal and implication paid infrastructure should start immediately. Keeps amounts only as adjustable references.

**Affected:** README, brief, budget note, decisions, questions. D-018 adds a standards note without modifying this policy.

**Related:** Q-004 spending policy answered; capacity/separate costs/actual purchases open. Q-005 ranked standards answered by D-018; full promise open. Q-304/Q-353/Q-355/Q-356/Q-403/Q-405/Q-502/Q-503 define later evidence and controls.

**Revisit:** Necessary expense, measured use beyond free capacity, owner acceptance, or explicit policy change. Flexibility is not unlimited authority.

## D-018 — Ranked standards and same-day discovery

**Question:** What are the three most important things the first version must do well to meet the owner's standards?

**Decision, in descending importance:**

1. **High-quality suggestions:** Options must be things a traveler would actually consider adding to an itinerary; without this the product lacks its purpose.
2. **Real-time, on-the-fly planning:** Help decide what to do that day using worthwhile nearby events and experiences, including festivals and pop-ups.
3. **Functionality and ease:** The app should feel seamless and useful, not a chore.

**Source:** Owner's explicitly numbered priority answer to the first-version success-standard question on 2026-09-19.

**Reason:** These are the owner's chosen standards for useful product behavior and later investment, not an assistant-selected feature ranking.

**First-version scope effect:** Same-day nearby discovery and on-the-fly planning are required capabilities. An earlier proposal to postpone advanced same-day replanning must not remove them. More automated or whole-trip replanning remains a distinct open feature. A generic list of permanent nearby places alone does not demonstrate the requested current-event experience.

**Relationship to existing idea:** Preserve Discover/Organize/Delight, hotel/transport recommendations and organization, budget context, and reservation requirements. Personalized sharing remains; extra reveal effects cannot compensate for poor suggestions or difficult use. Ranking does not waive essential correctness, privacy, reliability, or accessibility.

**What remains OPEN:** Detailed quality factors and weights; exact preference inputs; supported areas/event coverage; requested-time and location behavior; what fits available time; freshness and latency targets; scheduling/preview/permission rules; numerical pass criteria; and the owner's acceptance of the implementation. Initial organizer examples previously requested here are now recorded under D-019, not missing input.

**Proposed evaluations:** Assess serious consideration of options, voluntary additions, rejection reasons, factual/feasibility errors, valid current-event coverage and known omissions, and task completion/effort. These are not approved numeric targets or a finalized test suite. See [Product Success Standards](00-product-success-standards.md).

**Real-time boundaries:** The user outcome is current-decision usefulness, not automatic approval of polling frequency, continuous GPS, notifications, background monitoring, guaranteed inventory, automatic reservation transactions, a data provider, or an AI architecture. A fetched listing is not automatically freshly verified; an event today is not necessarily currently reachable or bookable. These distinctions need later specification.

**Free-first relationship:** D-017 unchanged. Research current-data access/quality risks early; do not treat a prepared-data demo as proof of same-day usefulness. If suitable coverage cannot be obtained freely, present the evidence and tradeoff without silently lowering standards or authorizing paid access.

**Evidence limit:** This is an explicit product decision, not proof that any current version meets it, sources exist for all events, or the full scope fits the target. No live event lookup, provider test, booking, paid service, or product acceptance occurred in this update.

**Affected:** README, product brief, decision register, question register, and new Section 1 standards note. Cost policy retained. Later blueprint sections remain NOT STARTED.

**Related questions:** Q-005 priority subquestion resolved; complete promise remains open. Q-006 examples subsequently supplied in D-019. Q-207 workflow; Q-309 minimum same-day capability; Q-304 measurements; Q-305 scheduling; Q-356 data/quality feasibility; Q-402/Q-404 data concepts; Q-502/Q-503 tests and simulations.

**Supersedes:** Any earlier proposed treatment of basic same-day nearby discovery/on-the-fly planning as optional later work, and the statement that the owner has not ranked success standards. Does not approve unrelated advanced automation or the complete Section 1 brief.

**Revisit:** Owner refines quality examples/criteria, changes priority order, or feasibility evidence requires an explicit scope decision.

## D-019 — Initial organizer's experiential recommendation preferences

**Question:** What experience would the owner consider adding to a trip, and what would they reject?

**Stated positive examples:** An excursion combining a breathtaking beach view, snorkeling, and an oceanside dinner; an ATV excursion through scenic views that exposes something distinctive to the area.

**Stated negative examples:** The world's largest rubber band; a historical statue.

**Source:** The owner's examples in direct response to Q-006's quality clarification. These are hypothetical preference examples, not actual offerings, bookings, or a request for destination-specific research.

**Recorded interpretation:** For the initial organizer, the examples favor participating in a memorable setting, scenery, a distinctive local element, and connected experiences with multiple appealing components over standalone novelty or monument viewing. This is a working interpretation of their examples, not a quantitative scoring model.

**Personalization boundary:** Treat these as one organizer's stated taste. Do not globally ban statues, historical attractions, museums, sightseeing, or popular places; do not assign the same preferences to the companion or all future users. Do not assume a romantic theme, luxury budget, risk tolerance, skill, physical ability, preferred exertion, or desire for an all-day excursion. A good single activity is not automatically a poor suggestion merely because the examples combine several things.

**Destination/evidence boundary:** No claim that snorkeling, ATV trips, or the illustrative combination is available or appropriate for the actual Tokyo pilot dates. No specific operator, event, itinerary, restaurant, inclusion, price, or reservation has been verified. The phrase about something local expresses the desired appeal; it is not permission to invent exclusivity or unsupported claims that an attraction exists nowhere else.

**Capability history — Q-012:** The examples alone did not settle ready-made provider excursions versus app-assembled sequences; that was left open here. D-020 subsequently records the owner's explicit selection of both. The earlier hotel/transport answer in D-010 was about a different question and was not used as approval of the excursion formats.

**Proposed planning safeguards:** Clearly distinguish a real excursion product from an app-created combination. Check advertised inclusions for the former; for the latter show separate components, time/travel fit, cost basis, booking needs, and uncertainty. Combining options does not establish one ticket, one reservation, included food, or simultaneous availability. The same-day experience must still fit the time and commitments that apply.

**Scope effect:** Refines the highest-priority quality standard without replacing D-018's order or removing other confirmed requirements. This preference input alone did not approve package booking, automatic bundling, an algorithm, new sources, paid services, or implementation. D-020 now confirms both recommendation formats; those implementation boundaries remain.

**Evidence limit:** Stated preferences from one organizer, not observed app use, attended experiences, a complete benchmark, market validation, or owner acceptance of a working product.

**Affected:** Product brief, standards note, README, decision register, and open questions. Section 1 remains DRAFT.

**Related questions:** Q-006 example subquestion answered; current workarounds and broader validation still open. Q-012 subsequently resolved under D-020. Q-106 companion preferences, Q-204/Q-209/Q-210 presentation and reservation detail, Q-304/Q-352 recommendation evaluation, and Q-404 data distinctions remain for their later sections.

**Revisit:** The owner clarifies preferences, the companion contributes their own tastes, or actual testing challenges the interpretation.

## D-020 — Offer both experience formats; explore duration options

**Question:** Should recommendations offer ready-made excursions, app-assembled combinations of separate activities, or both?

**Decision:** Offer **both** ready-made provider excursions and app-assembled combinations. This resolves Q-012 at the capability level.

**Source:** The owner's direct answer: “Offer both. Maybe shorter activities and all day activities.” The first sentence is an explicit format choice; the second is a tentative duration suggestion.

**Reason:** Preserve the ability to discover an existing organized experience and to form a connected plan from separate activities, rather than choosing only one approach.

**Format distinction:** A ready-made excursion is an actual provider offering with advertised inclusions and conditions. An app-assembled combination is a proposed sequence of independently sourced stops. Do not portray it as a single operator product, combined price, guaranteed availability, or one confirmed booking. No transaction capability follows from recommending either type.

**Duration proposal, not a fixed requirement:** Explore shorter activities and all-day activities. No exact hour cutoffs, intermediate category, number of stops, default, or screen/filter has been chosen. Duration is independent of provider versus app-assembled format; neither format is inherently short or full-day. Do not interpret this as making every day full or excluding strong single activities.

**Proposed fit checks:** Consider the user's usable time window, travel to/from relevant locations, included transfers, activity duration, breaks, entry times, reservations, and later commitments. Avoid double-counting travel already included by an operator. Do not truncate a fixed provider itinerary to force it to fit or claim precise total duration when material information is unknown. These are considerations for later journey and scheduling design, not a completed specification.

**Scope effect:** Carry both confirmed formats into product and first-version planning; detailed minimum coverage and implementation still need sizing. Do not silently leave one out. Shorter/all-day options remain a proposal to evaluate when defining the experience, not a verified coverage promise or an approved set of buckets.

**Boundaries:** No provider, API, ranking ratio, booking integration, automatic whole-trip changes, shared editing permission, paid service, current-trip recommendation, or implementation approval. Free-first policy D-017 and ranked standards D-018 are unchanged. The full Section 1 brief and product acceptance remain unapproved.

**Evidence limit:** A product choice and a duration idea, not proof that suitable excursions or combinations exist for particular dates, or that both formats have real-time inventory. No external excursion/event lookup or reservation was performed.

**Affected:** Product brief, standards note, README, decision register, and open questions. Section 1 remains DRAFT; later sections remain NOT STARTED.

**Related questions:** Q-012 resolved; Q-006 current discovery/workarounds next. Q-212 covers duration and format presentation in Section 3. Q-302/Q-305 cover minimum depth and timing; Q-402/Q-404 cover evidence and conceptual distinctions; Q-304/Q-352 cover evaluation.

**Supersedes:** The earlier open choice between these two experience formats. Does not turn the tentative duration suggestion into fixed scheduling or UI rules.

**Revisit:** The owner refines duration needs, actual data reveals a scope tradeoff, or tests show that the distinction is unclear.

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
| Initial organizer's appealing/rejectable experience examples | RECORDED stated preference, not a global rule | D-019 |
| Ready-made excursions and app-assembled combinations | BOTH CONFIRMED; details open | D-020, Q-012 resolved |
| Shorter and all-day duration options | USER PROPOSAL; cutoffs and behavior open | D-020, Q-212 |
| Working product meets standards | NOT DEMONSTRATED OR ACCEPTED | Later tests and owner judgment required |
| Numeric acceptance/freshness/latency criteria | NOT SELECTED | Q-304/Q-309 |
| Sections 2–15 | NOT STARTED | None |
| Complete pilot/commercial scope | NOT APPROVED; individual choices apply | No whole-scope approval |
| Stack/architecture/providers | NOT SELECTED | None |
| Monetization detail/platform | NOT SELECTED | None |
| Design-to-implementation transition | NOT APPROVED | None |

## Proposals not to mistake for decisions

Organizer-led suggestion approval; publication/draft model; account-free access; exact Keep/Must-do/Lock behavior; detailed coverage; date-free exploration; provider/AI choices; automated whole-trip replanning; multi-city complexity; booking/payment integrations; pilot billing/ad exclusions; price tiers/ad placement; native/web-first delivery; imports; transport modes; detailed recommendation ranking; scheduling/airport buffers; trip cost formulas; reservation/payment state model; monitoring/reminders; numeric quality, coverage, and response targets; proposed cost controls; duration buckets/filters and the exact activity-combination algorithm.

Basic same-day discovery and both experience formats are confirmed capabilities. D-019's examples express the organizer's taste, not a universal definition of quality or the companion's preferences. D-020's duration idea is still tentative. Neither ranking nor flexible budget authorizes spending, data collection, transactions, or implementation. The original fixed-ceiling proposal is superseded. Preserve historical decisions while using later clarifications as the current direction.

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

Update affected documents/questions when an answer settles a choice. Update the section tracker only when the owner approves the section. Preserve superseded decisions and their reasoning rather than silently replacing history. A standard, milestone, format, or documentation commit is not product acceptance.
