# Section 1 — Product Vision and Problem Brief

**Lifecycle status:** DRAFT — not approved as a completed section.  
**Owner:** Project owner (`fgzmac`); assistant facilitates drafting.  
**Phase:** Product design.  
**Last updated:** 2026-09-19.  
**Source:** Owner's concept and explicit decisions/inputs through D-023.  
**Related framework:** [Blueprint, Section 1](blueprint.md#1-product-vision-and-problem-brief).  
**Supporting notes:** [App Budget Policy and Options](00-app-budget-options.md); [Product Success Standards](00-product-success-standards.md).  
**Next review trigger:** Available weekly planning, development-review, and testing time under Q-004. Q-006's main planning difficulties are now answered.  
**Approval record:** Individual decisions are recorded; full Section 1, implementation transition, and working-product acceptance remain unapproved.

> Saving a draft does not approve every proposal it contains. CONFIRMED choices, RECORDED self-reports, PROPOSED mechanisms, ASSUMPTIONS, and OPEN questions have different meanings.

## 1.1 Working product name

**Working label:** Travel Itinerary App.  
**Repository:** `fgzmac/OnToTheNext`.

Repository name confirmed, final brand OPEN (Q-001). Naming should not block planning. See D-004.

## 1.2 One-sentence description

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

The concept connects Discover, Organize, and Delight rather than leading with an AI label. It covers activity discovery, hotels and transportation, trip-budget inputs, reservations, same-day options, both provider excursions and app-assembled plans, and local/cultural discovery.

D-023 clarifies why organization matters: the owner struggles to begin, decide what to experience and where to go first, coordinate travel and hotel proximity, balance demanding activities with food/shopping/free time, and find events during the trip.

**Status:** Description wording PROPOSED; individual requirements and reported problems retain their recorded status.

## 1.3 Primary use case

> Someone plans a trip they are taking and shares the plan with their travel companions.

The organizer participates. The main use case is not a fully secret trip for someone else. Emotional framing: **“Look what I planned for us.”** Practical framing: **“Here is our plan and what we need to know next.”**

Same-day planning complements pre-trip planning and sharing (D-018). Neither D-018 nor D-023 settles who may change the shared plan.

**Status:** CONFIRMED direction (D-002/D-018); permissions remain Section 2 work.

## 1.4 The problem we are trying to solve

**Owner-reported problem (D-023):** It is difficult to decide where to go first and what to experience, organize choices coherently, balance high-energy activities with free time for shopping and good food, find events during the trip, and start planning while considering travel, proximity to the hotel, and recommendation quality together.

**Proposed problem statement:**

> Travelers need help turning many interdependent choices into a worthwhile, logically ordered trip that fits their dates and travel arrangements while balancing demanding experiences with time to shop, eat well, and enjoy unplanned moments.

For the first organizer, the problem is not only a shortage of ideas. Choosing, sequencing, feasibility, pace, and getting started are connected difficulties. Do not reduce the solution to a bigger list of attractions, the shortest route, or the greatest possible number of stops.

**Product-value hypothesis:** One connected experience could reduce the effort of selecting, checking, organizing, and sharing those choices. The owner has reported this need; improved outcomes, measured time savings, and demand from other travelers remain unvalidated.

**Status:** Owner's difficulties RECORDED. Proposed problem wording and broader value hypothesis still require review and validation.

## 1.5 When the problem occurs

The main situation is an organizer preparing a trip with companions and moving from ideas to a usable shared plan. D-023 identifies difficulty at the beginning, not only during later itinerary editing.

**Also confirmed for the first version:** Decide what to do today using worthwhile nearby events and experiences, including festivals and pop-ups (D-018). It is a current-decision use case, not automatic continuous tracking or whole-trip rewriting.

**Pilot context:** Japan, including Tokyo, two travelers. The public record retains a late-November to early-December 2026 planning window, roughly two weeks, with late-day arrival and midday departure. Exact private travel dates and Tokyo-local times are already in the conversation (D-006/D-008/D-011/D-013); do not ask for them again.

**Approved first-test target:** November 10, 2026 (D-012). This is not a public-launch date or guarantee that unestimated scope fits. Additional cities, airports, hotels, transfers, and practical activity windows remain open. Tokyo included does not mean Tokyo-only.

**Just exploring without dates** remains proposed. Same-day support does not approve every date-free workflow.

## 1.6 Current workaround and discovery sources

**Reported sources (D-021):** Real experiences, positive Reddit posts, highly rated reviews, calendars covering relevant time frames, and destination-related must-see/must-experience highlights.

| Input | What has been supplied |
| --- | --- |
| Real experiences | Firsthand experience is valued; the owner has not specified whose accounts or any particular past trip. |
| Positive Reddit posts | Community recommendations are valued; no subreddit, thread, account, or integration selected. |
| Highly rated reviews | Strong review evidence matters; no platform, score threshold, count, or weighting selected. |
| Date-relevant calendars | Events during the relevant window matter; no particular calendar selected. |
| Destination highlights | Popular, meaningful experiences can be candidates; not every famous attraction is mandatory. |

D-022 additionally requires local recommendations and cultural experiences. This is a product addition, not evidence that the owner currently uses a particular local-guide service.

**Reported difficulty (D-023):** Evaluating quality and trip timing, deciding order, and coordinating hotel proximity, travel, energy, shopping, and food make it hard to begin and organize.

**Still unknown:** Exact tools used to save/compare/share ideas, the detailed current sequence of work, time spent, and observed task performance. Notes, spreadsheets, saved lists, and messaging remain possible tools, not confirmed practices. These gaps do not justify repeating the answered main-frustration question.

**Status:** Sources, preferences, and main problems RECORDED as self-reports; full workflow and observational evidence OPEN.

## 1.7 Why the current approach is difficult for the owner

| Reported difficulty | Desired outcome | Proposed response to evaluate later |
| --- | --- | --- |
| Deciding what to experience and where to go first. | Worthwhile choices in a sensible order. | Explain suggested selection/grouping/order, including why a farther or timed experience may come first. |
| Coordinating many variables before planning can begin. | A manageable first step. | Reuse known basics, ask only relevant next questions, and mark missing information instead of inventing it. |
| Accounting for travel and what is near the hotel. | Practical daily geography. | Use known stay locations and relevant start/end points, while allowing worthwhile farther trips and undecided accommodation. |
| Balancing demanding experiences with free time, shopping, and good food. | A day worth enjoying, not just a feasible list. | Preserve flexible time, consider overall effort, and avoid automatically filling every gap. |
| Finding events during the trip. | Date-appropriate opportunities considered early enough to matter. | Distinguish actual event occurrences from general attractions, then check timing and reservation feasibility. |

The right-hand column is proposed design, not approved algorithms, defaults, controls, buffers, or allocation ratios. The owner has not ranked these individual problems; D-018's overall priority order remains authoritative.

**Confirmed success order (D-018):**

1. Suggestions people genuinely want to add.
2. Useful same-day nearby discovery and on-the-fly planning.
3. Seamless, easy operation that does not feel like a chore.

The owner enjoys substantial experiences (D-019) but also wants free time (D-023). Those preferences coexist. Do not infer that every day should be an all-day excursion or that a long activity is necessarily more demanding than a short one.

**Status:** Main difficulties and desired balance RECORDED. Broad-market relevance, measurements, and implementation behavior OPEN.

## 1.8 Primary and secondary users

| User | Goal | Intended support |
| --- | --- | --- |
| Organizer | Plan a trip they take with companions. | Discover, choose, arrange stays/transport/activities, account for costs/reservations, balance days, make same-day decisions, and share. |
| Companion | Understand, anticipate, and participate in the trip. | Enjoy receiving the plan and find practical details easily. |

These are trip roles, not permanent account classes. The pilot is a couple, two travelers, owner as initial organizer/tester (D-008). No permanent size limit, couples-only market, identical tastes, or romantic theme is established.

D-019/D-021/D-023 describe the organizer, not automatically the companion. The per-person budget does not fix how shared expenses are split. Companion testing participation, broader audience, and permissions remain Q-008/Q-010/Q-101/Q-106.

## 1.9 Core value: Discover, Organize, Delight

| Responsibility | User question | Intended value |
| --- | --- | --- |
| Discover | “What would we enjoy, including nearby today?” | Relevant experiences supported by useful information, not filler. |
| Organize | “Where should we go first, and how does this become an enjoyable day?” | Coherent timing/geography with stays, travel, costs, reservations, effort, and free time considered. |
| Delight | “How do I get everyone excited?” | Personalized sharing with easy access to practical information. |

### Ranked quality and desired day balance

D-018's order is unchanged. D-023 makes whole-day fit important alongside individual recommendation appeal. A collection of individually attractive experiences can still form an undesirable day.

**Proposed principles:** Use hotel context without requiring a hotel booking to begin; explain order; consider cumulative activity/travel effort; preserve desired free time; distinguish optional shopping/food ideas from fixed reservations; review conflicts with the user rather than silently removing choices. No universal energy score, health inference, mandatory rest ratio, nearest-first rule, or automatic whole-trip generation is approved. Shopping and dining must not automatically be classified as low-effort or reservation-free.

Detailed examples, boundaries, and proposed evaluations are in [Product Success Standards](00-product-success-standards.md#current-planning-problems-and-desired-balance--d-023). Candidate quality dimensions remain personal appeal, practical fit, information support, variety, and decision usefulness. Weights and thresholds are open.

### Organizer's preferences — D-019

**Would consider:** A beach view, snorkeling, and oceanside dinner combined; scenic ATV exploration with something distinctive to the area.

**Would reject:** Standalone world's-largest-rubber-band and historical-statue examples.

Interpretation: scenery, participation, local distinctiveness, and complementary components appeal. These are not a global ban on history, sightseeing, or popular places; a single activity can still be excellent. No skill, risk tolerance, physical ability, luxury spending, partner preference, or verified Tokyo availability is inferred. D-023 adds desire for balance rather than canceling the positive examples.

### Sources and local/cultural coverage — D-021/D-022

Preserve the five reported source categories and include local recommendations and cultural experiences.

**Proposed source handling:** Use community/firsthand/review evidence for appeal, date calendars for occurrences, and suitable current organizer/venue/operator information for logistics. Positive feedback does not establish current availability. Consider critical caveats, recency, volume, context, duplicated evidence, and conflicts. No mandatory source count, ratings threshold, supplier hierarchy, or scoring formula chosen.

**Proposed distinction:** Local recommendations concern the source of advice; cultural experiences concern what the traveler learns, does, or observes. Examples include food traditions, crafts, neighborhood experiences, performances, and public festivals, not a fixed taxonomy or inventory guarantee. Support local-endorsement claims with source context; do not invent authenticity, exclusivity, or community agreement. Explain material language, access, etiquette, participation, and reservation requirements when supported.

Culture need not be adventurous, obscure, or purely participatory; history is not excluded. Popular highlights can have local support. No guide marketplace, host accounts, partnerships, or direct-contact feature selected.

Named sources do not authorize scraping, paid APIs, private histories, content reproduction, training on community material, or posting. Access/rights/coverage remain later dependency work. No real offering was verified in this update.

### Both experience formats — D-020

Offer **provider excursions** and **app-assembled combinations**. Q-012 is resolved. An operator offering has advertised inclusions and conditions; an app sequence is separately sourced components, not automatically one package, price, or reservation.

Verify actual inclusions or separate components' timing, travel, cost bases, and booking dependencies. Sources, coverage depth, comparison presentation, algorithms, and transactions remain open.

**Tentative duration idea:** Shorter and all-day options. No hour cutoffs, added intermediate bucket, filters, or defaults selected. Duration and format are independent. Proposed total-time handling includes relevant travel without double-counting operator transfers; do not invent a shorter variant of a fixed tour. D-023 adds balancing demanding experiences with flexible time. Details remain Q-212/Q-213/Q-305.

### Same-day nearby discovery — D-018

Required in the first version: worthwhile nearby events/experiences for today, including festivals and pop-ups, plus on-the-fly plan creation.

Proposed flow: reuse or ask relevant area, time, and preferences; show current options and practical constraints; preview a plan/change; confirm. No complete multi-day itinerary prerequisite assumed. Free time should not automatically trigger more scheduled activities.

Distinguish a venue from an event occurrence, fetch time from verification, and happening today from being reachable/bookable now. Consider local entry windows, later commitments, known cancellations, duplicates, costs, and reservation uncertainty. No results should prompt honesty and proposed alternatives, not invented events. Lack of found data is not proof that no events exist.

Refresh intervals, performance targets, continuous GPS, monitoring, notifications, automatic whole-trip edits, live inventory guarantees, and exact fallback behavior remain open.

### Hotels and transportation — D-009/D-010

Both **organizing existing arrangements** and **recommending choices before booking** are first-version requirements for each area. Do not reduce them to a static booking list under a free-first or time-saving assumption.

Proposed considerations: stay geography/dates, check-in/out, relevant starts/ends, fixed journeys, partial travel days, mode and transfer time, and costs. Flight arrival is not hotel arrival; flight departure is not when to leave the hotel. Unknown hotel information needs explicit handling rather than invented assumptions or automatic blockage of discovery.

No transactions, cancellation/modification, automatic import, account/email access, provider, live-price guarantee, mode, or buffer is selected. Detail remains Q-209 and later scope/system sections.

### Trip budget — D-014/D-016

Supplied low/high range is per person and excludes plane tickets. Personal amounts stay in the conversation. Currency, total-versus-remaining meaning, included categories, and range enforcement remain open (Q-011/Q-211).

Proposed safeguards: configurable inputs, no forced minimum spend, explicit cap behavior, estimates and unknowns labeled, shared/per-person bases, paid/remaining totals, and no double-counted deposits or included package components. Airfare exclusion does not remove flight timing. No conversion, equal-split rule, daily allowance, category allocation, or affordability conclusion established.

### Reservation-aware events and restaurants — D-015

Account for required reservations in pre-trip and same-day planning. Proposed treatment distinguishes requirement, booking state, and payment; trusted booking route and supported release/deadline data; tentative unconfirmed slots; fixed commitments preserved in previews; alternatives when not available.

User-entered confirmation differs from provider-verified confirmation. No automatic booking, payment, changes, cancellation, monitoring, reminders, state schema, or integration approved. Keep-as-interest rather than guaranteed scheduling remains proposed exact behavior.

## 1.10 Intended distinguishing idea

> Connect choosing a trip, arranging enjoyable days, anticipating the experience together, and discovering worthwhile possibilities while traveling.

Personal fit, practical organization, date-relevant discovery, useful evidence, local/cultural context, and personalized sharing form the intended combination. D-023 emphasizes getting started and balancing the whole day, not only finding individual attractions.

**Status:** Proposed positioning, not researched competitive uniqueness.

## 1.11 Long-term vision

> Become a planning companion that helps a group move from inspiration to a shared, adaptable travel experience.

Commercial app-store/SaaS ambition with subscriptions and ads remains D-007. Distribution, pricing, and revenue viability are open. Under D-017, build free first and invest more after a working product meets owner standards; necessary earlier expenses require review.

Broader coverage, multi-city complexity, companion input, and extensive automated replanning are possible extensions, not all approved scope. Already confirmed hotel/transport paths, reservation consideration, same-day planning, both formats, and local/cultural inclusion must not be reclassified as optional future-only work.

## 1.12 First-release promise

### Japan pilot

**Confirmed goal:** Test the app for the two-person Japan trip including Tokyo before commercial launch. First complete test target: November 10, 2026.

**Proposed complete promise:**

> Help the organizer get started, find genuinely worthwhile experiences, and decide a sensible order around trip dates, hotel context, and travel. Balance demanding activities with time for shopping, good food, and flexibility; support existing and recommended hotels/transport, reservation-aware activities, both experience formats, local/cultural discovery, and useful same-day options; share an itinerary that both travelers can easily use.

This incorporates confirmed choices without approving every implementation detail or exact screen. D-018 still governs priority. A simpler appealing reveal can test sharing without elaborate effects.

Evaluate recommendation appeal, current-event usefulness, ease of beginning/using the plan, and desired day balance. Proposed tests are in the standards note; numeric thresholds, scope, sample sets, and acceptance remain open. No inference of a guaranteed fully automated perfect itinerary.

Additional cities, date/event coverage, source access, duration/effort rules, supported devices, travel modes, budgets, hotel timing, and reservation detail require later decisions. No free-prototype shortcut can silently remove a confirmed capability; conflicts require explicit tradeoffs.

### Commercial release

Separate milestone: audience, date, distribution, wider coverage, production needs, and monetization detail OPEN.

**Status:** Individual decisions through D-023 apply. Full promise, whole Section 1 approval, and actual product acceptance remain OPEN.

## 1.13 Non-goals and presentation boundaries

**Proposed exclusions, not approved:** Worldwide coverage, complex multi-city travel, unrestricted group editing, voting, automatic whole-trip rewriting, in-app booking/payment. Tokyo alone does not settle multi-city needs.

Required same-day discovery is not excluded by earlier advanced-replanning deferral. Organizing or recommending bookings does not authorize transactions. Cultural inclusion does not mean a marketplace. Owner preferences do not ban history globally. Both formats do not establish an all-inclusive package. Source names do not select or license integrations.

**D-023 clarification:** Maximizing scheduled stops and filling free time are not the owner's stated goals. Exact daily intensity, free-time amount, scheduling objective, or learning/personalization mechanism is not selected.

Suggested activities must not look booked/paid without evidence. A reveal must not obstruct practical access. Exact criteria and the proposed sequence of core tests before billing/ads/store publication remain for later approval.

## 1.14 Evidence and assumptions

**Recorded:** Concept, choices, pilot context/target, spending policy, standards, taste examples, formats, sources, local/cultural inclusion, and now concrete planning problems and desired balance. D-023 is a self-report, not an observed session or result.

**Prior external research:** Budget note retains earlier official pricing/access references. This update does not refresh prices, verify data coverage, or research actual attractions.

**Not demonstrated:** Actual workflow tools or measured time spent, companion tastes, prototype usability, recommendation acceptance, current-event coverage, scheduling correctness, willingness to pay, or acceptance of a working product.

Assumptions for later tests: the workflow reduces effort; fitting recommendations can be found consistently; sufficient timely event/local/cultural/excursion data is accessible; logistics can be represented honestly; balanced days can fit constraints and preferences; starting is easy despite incomplete information; sharing helps companions; free/paid choices meet reliability and cost needs; broader users will return or pay. Source praise does not prove logistics, free-first does not prove free data access, and a successful personal trip does not validate a market.

Prepared examples test interactions, not live-world quality. Investigate data dependencies early and obtain specific approval for necessary spending. Q-006's examples, sources, and main problems are answered; workflow tools and measurement remain separate research gaps.

## 1.15 Project goal, business model, distribution

| Priority | Objective | Status |
| --- | --- | --- |
| Immediate | First complete test November 10, 2026, Japan pilot, free-first, using ranked standards. | Confirmed target/direction, not guarantee. |
| Ultimate | Commercial app-store/SaaS service earning subscriptions/ads, investing more after owner acceptance. | Confirmed direction; detail open. |

Pricing, intervals, tiers, trials, ad placements, vendors, ad-free behavior, and monetization timing remain open; no additional revenue model chosen. Owner is the first tester; companion participation, external testing, and acquisition remain Q-008/Q-010. Reddit discovery does not select a marketing channel.

SaaS and app-store delivery are not inherently exclusive. No OS, framework, deployment, host, identity, or store choice made. Free-first does not decide local-only, web, or native delivery.

## 1.16 Constraints

**Process:** One blueprint section at a time; GitHub is the maintained planning record; Codex after approved design transition. Current work is documentation-only.

**Pilot:** Tokyo/Japan, couple, two people, late-November to early-December 2026 context. Exact private dates, local times, and spending amounts already supplied in chat. Airports, transfers, hotel details, additional cities remain open.

**Target:** November 10, 2026 first full test with intended fixes/retesting afterward, not an effort estimate or guarantee.

**Quality/planning:** Preserve ranked standards and all confirmed capabilities. D-023 adds clear owner needs for sensible order, easier starting, hotel/travel context, events during dates, and energy/free-time balance. No chosen energy model, rigid daily ratio, health inference, or automatic editing authority.

**Separate budgets:** Per-person trip range excluding airfare is not app funding. Travel currency/categories remain open. App policy follows D-017; development tools, one-time purchases, service quotes, and personal time are separate.

### Free-first app-spending policy

Aim for no additional app-service cost while suitable free options meet the need. Retain $100/month and $150 as flexible paid-operation references, not mandatory spend, fixed ceiling, automatic cutoff, or purchase authority.

Before an expense, review blocker, free alternatives, smallest useful paid choice, ongoing/usage/overage charges, and consequence of postponement. Necessary limited spending before full acceptance is a separate decision. Greater discretionary investment follows a working product meeting owner standards.

Budget examples are references, not upgrade schedules or provider choices. Coding tools, domains, enrollment, hardware, labor, transactions, taxes, marketing/legal work, and unpriced licenses stay separate. No paid service is activated.

Simulated data, polished screens, mock tests, and the calendar target do not establish live coverage, correctness, or owner acceptance. Do not fabricate facts, compromise essential protection, or silently omit requirements to remain free. Verify terms, coverage, cost, and rights when evaluating providers.

**Next constraint:** Available weekly time for planning, reviewing implementation, and testing (Q-004). Maintenance capacity, separate expenses, devices, and final scope remain open. Do not reinterpret flexible policy as unlimited budget.

**Public record:** No private dates/times, financial amounts, bookings, account histories, companion identities, credentials, or identifying research records in commits. Generalized needs and project milestones are appropriate planning material. Public repository does not imply public itineraries.

## 1.17 Completion and next discussion

Section 1 remains DRAFT. Q-006's main problem question is answered by D-023: deciding what/where first, organizing, balancing effort with food/shopping/free time, finding events during dates, and getting started among travel/hotel/quality variables. Do not repeat it.

**Next — Q-004:** How many hours per week can the owner realistically dedicate to planning, reviewing Codex's work, and testing before November 10? This informs scope feasibility without starting implementation or asking for an already settled budget rule.

Exact workflow tools, measured effort, travel currency/categories, broader audience, full-promise approval, and final acceptance remain open. Energy/time controls and detailed routing behavior belong in Q-201/Q-212/Q-213/Q-305. Finish Section 1 through explicit decisions or recorded deferrals before marking it approved.

## Revision record

| Date | Change | Record |
| --- | --- | --- |
| 2026-09-19 | Initial brief and repository. | Draft, not approval. |
| 2026-09-19 | Japan pilot first; commercial subscription/ad ambition. | D-006/D-007. |
| 2026-09-19 | Two travelers; hotels/transport. | D-008/D-009. |
| 2026-09-19 | Both hotel/transport organization and recommendations. | D-010. |
| 2026-09-19 | Tokyo/month-spanning context; later target/calendar/local-time clarification. | D-011/D-012/D-013; private values omitted. |
| 2026-09-19 | Trip range, airfare exclusion, reservations, and later per-person basis. | D-014/D-015/D-016. |
| 2026-09-19 | Free-first flexible budget. | D-017 supersedes fixed-ceiling proposal. |
| 2026-09-19 | Ranked standards and required same-day discovery. | D-018. |
| 2026-09-19 | Personal experience examples; later both formats and tentative durations. | D-019/D-020. |
| 2026-09-19 | Reported discovery sources. | D-021; not integration approval. |
| 2026-09-19 | Local/cultural inclusion recorded in standards/register; now reconciled into this brief. | D-022 retained. |
| 2026-09-19 | Recorded actual planning friction, energy/free-time balance, hotel context, and date-specific discovery needs; advanced to capacity question. | D-023; Q-006 main problems answered. Section, implementation, and product acceptance remain unapproved. |
