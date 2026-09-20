# Decision Register

**Purpose:** Preserve explicit choices, reported inputs, reasoning, and boundaries.  
**Owner:** Project owner (`fgzmac`).  
**Last updated:** 2026-09-19.  
**Phase:** Product design.  
**Sources:** Planning conversation; prior external cost references in [App Budget Policy and Options](00-app-budget-options.md); detailed standards in [Product Success Standards](00-product-success-standards.md). No observed user test or live integration test recorded.

A commit is not approval of the whole product. Copied recommendations are not automatically requirements. A stated preference or reported difficulty is evidence of the owner's account, not a validated market or technical claim.

## Confirmed decisions and recorded inputs

| ID | Decision or input | Status | Date |
| --- | --- | --- | --- |
| D-001 | Use the blueprint sequentially in this chat. | CONFIRMED | 2026-09-19 |
| D-002 | Organizer takes the trip and shares with companions. | CONFIRMED | 2026-09-19 |
| D-003 | Design before Codex implementation. | CONFIRMED | 2026-09-19 |
| D-004 | Maintain planning in `fgzmac/OnToTheNext`. | CONFIRMED | 2026-09-19 |
| D-005 | Discover / Organize / Delight as the starting concept. | CONFIRMED concept | 2026-09-19 |
| D-006 | Japan pilot before commercial launch. | CONFIRMED | 2026-09-19 |
| D-007 | Commercial app-store/SaaS ambition; subscriptions and ads. | CONFIRMED direction | 2026-09-19 |
| D-008 | Couple, two travelers in initial pilot. | CONFIRMED pilot | 2026-09-19 |
| D-009 | Hotels and transportation alongside activities. | CONFIRMED inclusion | 2026-09-19 |
| D-010 | Existing-booking organization and recommendations for both hotels and transport. | CONFIRMED first-version capabilities | 2026-09-19 |
| D-011 | Tokyo included, late-November through early-December context. | CONFIRMED input; calendar later D-012 | 2026-09-19 |
| D-012 | November 10, 2026 first complete test target. | APPROVED target, not guarantee | 2026-09-19 |
| D-013 | Tokyo-local arrival/departure times supplied. | RECORDED private input | 2026-09-19 |
| D-014 | Supplied trip range excludes airfare, not app funding. | CONFIRMED input | 2026-09-19 |
| D-015 | Reservation-aware events and restaurants. | CONFIRMED inclusion | 2026-09-19 |
| D-016 | Trip range is per person. | CONFIRMED basis | 2026-09-19 |
| D-017 | Free first; flexible $100/$150 references; review necessary spending. | CONFIRMED policy, no purchase | 2026-09-19 |
| D-018 | Suggestion quality, same-day discovery, seamless functionality, in that order. | CONFIRMED priorities and first-version same-day capability | 2026-09-19 |
| D-019 | Scenic, participatory, locally distinctive experiences appeal; supplied standalone novelty/statue examples do not. | PERSONAL PREFERENCE RECORDED | 2026-09-19 |
| D-020 | Both provider excursions and app-assembled combinations. | CONFIRMED formats; durations proposed | 2026-09-19 |
| D-021 | Real experiences, Reddit, reviews, date calendars, destination highlights inform discovery. | REPORTED SOURCES RECORDED | 2026-09-19 |
| D-022 | Include local recommendations and cultural experiences. | CONFIRMED inclusion | 2026-09-19 |
| D-023 | Planning is difficult to begin and organize; desired help includes worthwhile choices/order, hotel/travel context, date-specific events, and balancing effort with shopping, food, and free time. | REPORTED PROBLEMS / DESIRED OUTCOMES RECORDED; mechanisms open | 2026-09-19 |

## D-001 — Sequential blueprint planning

**Decision/source:** The owner designated the supplied blueprint as the main framework and this chat as the place to fill it out one section at a time.

**Reason:** Produce an organized basis for later development. Section 1 remains the active draft.

**Boundary:** Process adoption does not approve all examples, suggested features, architecture, or milestones. Later questions can be parked without premature decisions. No completed section is yet approved.

**Revisit:** Owner changes the process.

## D-002 — Organizer takes the shared trip

**Decision/source:** The owner's answer, “Planning a trip to share with companions,” selects an organizer who participates, rather than primarily planning a secret trip for somebody else.

**Implication:** “Look what I planned for us,” paired with practical information. D-018 later adds same-day decisions without replacing pre-trip planning or sharing.

**Boundary:** No organizer-only editing, companion suggestions, voting, accounts, invitations, publication policy, or permission model selected. Future surprise experiences are not forbidden.

**Related/revisit:** Q-101 through Q-106; revisit if the owner or evidence changes the primary use case.

## D-003 — Design before implementation

**Decision/source:** Complete design, then use Codex, as explicitly requested by the owner.

**Working interpretation:** Define direction, first-release scope, journeys, constraints/risks, and first buildable slice sufficiently, then obtain explicit transition approval. Do not specify every future feature upfront. Review this interpretation with the owner at transition.

**Boundary:** Documentation-only now. No scaffolding, dependency installation, database, deployment, stack, identity, API provider, or AI choice follows from a milestone, preference, standard, source, format, or budget approval. No implementation transition recorded.

**Related/revisit:** Q-506; owner explicitly authorizes implementation or changes the workflow.

## D-004 — Planning repository

**Decision/source:** Owner supplied `https://github.com/fgzmac/OnToTheNext`.

**Observed at setup:** Default branch `main`, public visibility on 2026-09-19; observations, not immutable product choices.

**Organization:** README, blueprint, active brief, decisions, questions, and supporting standards/budget notes. Supporting notes do not complete later architecture or evaluation sections.

**Boundary:** Repository name is not automatically the brand. Public repository does not imply public itineraries or authorize private bookings, dates/times, finances, credentials, account histories, companion identities, or identifying research records in commits. Generalized needs and project milestones can be recorded.

**Revisit:** Repository, visibility, or documentation workflow changes.

## D-005 — Base concept, not blanket feature approval

**Decision/source:** Adopt the owner's supplied Discover / Organize / Delight idea: discover enjoyable experiences, organize choices into a realistic trip, and share a personalized itinerary.

**Boundary:** Does not automatically approve every recommendation in the supplied text: destination limits, suggestion approval, drafts/publication, email/text delivery, guest access, selection controls, providers, or AI remain explicit decisions.

**Later clarification:** D-018 puts quality, same-day usefulness, and ease ahead of extra visual effects, without removing sharing. D-023 refines the organization problem.

**Revisit:** Owner refines vision or evidence challenges its assumptions.

## D-006 — Japan pilot first

**Decision/source:** Owner explicitly prioritizes developing/testing for the Japan trip over commercialization.

**Reason:** A concrete real-use scenario. Owner is initial organizer/tester. Later decisions specify group (D-008), hotel/transport support (D-009/D-010), Tokyo and December end (D-011), test target/calendar (D-012), private local times (D-013), standards (D-018), formats (D-020), and discovery inputs/inclusions (D-021/D-022).

**Boundary:** No nationwide/Japan-only promise, Tokyo-only restriction, public-launch date, paid services, or mandatory pilot monetization. Additional cities, actual coverage, devices, implementation depth, airports/transfers, and distribution remain open.

**Evidence:** Chosen test context, not a completed test, proven feasibility, demand, or willingness to pay. Keep private schedule out of the public record.

**Related/revisit:** Q-004 capacity, Q-005 full promise, Q-008 testing, Q-301/Q-302 scope; revisit if trip needs, evidence, or priorities change.

## D-007 — Commercial objective

**Decision/source:** Ultimate mobile app-store or SaaS offering earning subscriptions and advertising revenue, as stated by the owner.

**Priority:** Pilot first; greater discretionary spending follows D-017 owner acceptance, informed by D-018 standards.

**Open:** Pricing, intervals, entitlements, free/paid tiers, trials, ad placements/formats, ad-free offerings, vendors, timing, and customer acquisition. No additional revenue stream selected.

**Boundary:** App-store channel and SaaS model are not inherently exclusive. No OS, architecture, listing, host, platform order, pilot delivery method, or public date selected. Intent is not profit, retention, or market evidence.

**Related/revisit:** Q-306/Q-354/Q-401/Q-407; research, measured cost, platform requirements, or owner changes.

## D-008 — Two-person couple pilot

**Decision/source:** Owner travels with a significant other; two total. Record anonymous organizer/companion profile.

**Boundary:** Not a permanent size limit, couples-only market, romantic theme, identical interests, or permissions. Companion testing remains open. D-016 later resolves budget basis; D-019/D-021/D-023 do not automatically describe the companion.

**Related/revisit:** Q-003 pilot resolved; Q-008/Q-010/Q-101/Q-106 and remaining Q-011 open. Revisit when participation or audience changes.

## D-009 — Hotel and transportation inclusion

**Decision/source:** Owner explicitly adds hotels and transportation alongside activities.

**History:** Initial support-depth question Q-009 was resolved later by D-010: both existing arrangements and recommendations for each area.

**Proposed implications:** Hotel geography, dates/check-in, fixed journeys, local transfers, and costs can inform daily planning; not finished specifications. D-023 later explicitly reports difficulty coordinating hotel proximity and travel.

**Boundary:** No buying/changing/canceling reservations, payments, account/email access, live price/availability guarantee, provider, or commissions selected. Planning around a booking is different from transacting it.

**Related/revisit:** Q-209/Q-302/Q-303/Q-305/Q-402/Q-404; owner changes depth or evidence requires tradeoff.

## D-010 — Both hotel/transport support paths

**Decision/source:** Owner answered “both” to existing-booking organization versus recommendations before booking for hotels and transportation.

| Area | Existing arrangements | Recommendations before booking |
| --- | --- | --- |
| Hotels | Required first version. | Required first version. |
| Transportation | Required first version. | Required first version. |

**Reason:** Serve a mixture of already-booked and undecided arrangements.

**Boundary:** No transaction, payment, reservation changes, account/email access, automatic import, guaranteed inventory, mode/provider, affiliate model, or worldwide coverage selected. Exact entry methods, verification, comparison, criteria, and handoff remain open.

**Scope:** Do not quietly downgrade to a booking list or defer recommendations. Free-first and ranked priorities do not erase either path; changes require explicit decisions. Capability selection is not feasibility proof, full specifications, or section approval.

**Related/revisit:** Q-009 resolved; Q-209/Q-301/Q-302/Q-305/Q-402/Q-404 open; revise for explicit scope or feasibility tradeoff.

## D-011 — Tokyo and travel window

**Recorded/source:** Owner supplied Tokyo and outbound/return month-day endpoints. Retain generalized late-November to early-December, roughly two-week context publicly; private values remain in chat.

**History:** Year was initially unstated/assumed 2026. D-012 later approves dated test target/calendar; D-013 supplies Tokyo-local times.

**Boundary:** Travel dates alone did not approve software readiness. No airport, hotel nights, transfers, full sightseeing days, Tokyo-only trip, or public launch inferred.

**Related/revisit:** Q-301 scope and private values available without re-asking; revisit travel or milestone changes.

## D-012 — November 10, 2026 first complete test

**Decision/source:** Owner explicitly accepted the proposed dated target with “Yes.”

**Reason/effect:** A pre-trip testing milestone with intended time for fixes/retesting; use 2026 planning calendar, superseding earlier assumed year and unapproved target.

**Boundary:** Target, not guarantee, tested feasibility, public launch, blanket feature approval, or design-to-code permission. Scope, capacity, costs, tests, and dependencies need evaluation. No automation/calendar/reminder requested or created.

**Related/revisit:** Timing portion Q-004 resolved; capacity still open; Q-304/Q-501/Q-502 define completion. Explicit owner or evidence-driven target changes.

## D-013 — Tokyo-local travel times

**Recorded/source:** Owner supplied late-day arrival and midday departure clock times, explicitly Tokyo-local. Exact private pairs remain in chat, not commit messages or public files. Not a live airline verification.

**Proposed implications:** Partial days; distinguish flight from hotel arrival/readiness, and flight departure from leaving the hotel. Consider transfers, airport buffers, check-in/out, and rest. Preserve destination-local meaning, not browser/home time.

**Boundary:** No airport, airline, flight number, transfer duration/mode, hotel, deadline, activity allocation, account access, tracking, monitoring, reminder, or booking inferred/authorized. Precise rules remain open.

**Related/revisit:** Q-201/Q-209/Q-305/Q-352; changes or actual routing/hotel evidence.

## D-014 — Trip range excluding airfare

**Recorded/source:** Owner supplied low/high dollar-denominated bounds and excluded plane tickets. Personal figures stay in chat. Basis initially open, later per person D-016. Currency still open.

**Interpretation:** Although responding after an app-cost question, airfare exclusion indicated trip spending. Later separate app-budget discussion confirmed that distinction; D-017 governs app costs. No spending authority follows.

**Open:** Currency, total/remaining meaning, categories, lower-bound purpose, upper firmness, accounting/display. App-budget flexibility does not settle trip flexibility.

**Proposed safeguards:** Configurable range, no forced minimum spend, honest estimates, shared/per-person and paid/remaining distinctions, no deposit double-counting. Airfare exclusion does not remove flight timing.

**Boundary:** No affordability finding, conversion, daily/nightly allowance, equal allocation, provider, financial transaction, or expense integration.

**Related/revisit:** Q-011/Q-211/Q-308/Q-402/Q-404/Q-352; currency/inclusions/spending preference clarification.

## D-015 — Reservation-aware events and restaurants

**Decision/source:** Owner explicitly requires accounting for events/restaurants needing reservations.

**Effect:** Carry into discovery, schedules, and pilot, including D-018's same-day use case. Not unrelated future-only work; precise depth remains open.

**Proposed treatment:** Separate requirement, booking status, and payment; supported booking route/deadlines with source/local time; tentative unconfirmed slots; protect commitments in previews; offer alternatives; handle deposits without duplication.

**Boundary:** No transactions, changes/cancellations, account/email imports, availability guarantee, source choice, release monitoring, notifications, or reminders. User-entered status differs from provider verification. No event/restaurant selected or verified by this requirement.

**Evidence/revisit:** Requirement, not proven coverage/effort; Q-210/Q-307/Q-305/Q-355/Q-402/Q-404. Source or experience refinement may require explicit tradeoff.

## D-016 — Per-person travel budget

**Decision/source:** Owner explicitly said the previously supplied range is per person. Airfare exclusion remains.

**Boundary:** No currency/category/total-versus-remaining resolution, equal split, minimum spend, or cap behavior. Keep private figures and derived totals in chat; do not count shared lodging twice.

**App-cost history:** Requesting comparison did not select vendors/purchases. D-017 later modifies the recommendation to free-first flexible references.

**Related/revisit:** Q-011 basis resolved; remaining meanings and Q-211/Q-308 open. Owner changes or clarification.

## D-017 — Free-first, flexible app budget

**Decision/source:** Owner accepts the recommended rule as a nonfixed reference, wants free development until spending is necessary, and greater spending after a working product meets their standards.

**Effect:** Aim for $0 additional app-service charges while suitable free options work. $100/month is an initial paid-operation reference; $150 an upper review reference, not hard ceiling, required spend, automatic cutoff, or purchase authority. No paid tier activated.

**Expense review:** Explain blocker, free alternatives, smallest useful paid option, recurring/usage/overage costs, and consequence of waiting; obtain specific approval. Necessary limited spending may precede full acceptance. Discretionary expansion follows owner judgment of a working product.

**Acceptance:** D-018 defines priorities; D-019/D-021/D-023 supply preference/problem context. Detailed tests remain Q-304/Q-502. Demo, visual polish, mock tests, calendar target, or merely defined standards do not establish success.

**Scope/evidence:** Preserve all confirmed capabilities. Free-first changes spending sequence, not features. Label simulations; they do not prove coverage, persistence, routes, quality, or readiness. Investigate paid dependencies early; surface quality/cost/scope conflicts, not unsafe handling or false claims.

**Separate:** Coding subscriptions/overages, domains, enrollment, hardware, one-time purchases, labor, unpriced licenses and other stated exclusions are outside runtime reference. Existing subscriptions are not reclassified as free. Travel funds unaffected.

**Boundary/history:** No stack/vendor/native/web/deployment/metered billing/purchase/automation approved. Recheck reference prices before use. Supersedes fixed-$150-ceiling proposal and any idea of activating paid infrastructure immediately.

**Related/revisit:** Q-004 policy resolved; capacity and actual costs open. Q-353/Q-355/Q-356/Q-403/Q-405/Q-503 cover feasibility/controls. Review on a necessary cost, measured usage, owner acceptance, or policy change; flexibility is not unlimited authority.

## D-018 — Ranked standards and same-day planning

**Decision/source:** Owner explicitly ranks: (1) high-quality suggestions someone would add, (2) real-time same-day nearby events/experiences and on-the-fly planning, (3) seamless functionality, not a chore.

**Effect:** Basic same-day discovery/plan creation belongs in the first version. An older advanced-replanning deferral cannot remove it. Festivals and pop-ups matter; permanent nearby-place lists alone do not prove this capability.

**Relationship:** Preserve original sharing, hotels/transport, budgets, and reservations. Extra reveal effects cannot compensate for poor suggestions/use. Correctness, privacy, reliability, and accessibility are not waived.

**Open:** Weights, preference inputs, areas/coverage, time/location handling, fit, freshness/response targets, previews/permissions, numerical tests, and acceptance. Later D-019 supplies taste, D-021 sources, D-023 problems; do not ask those again.

**Proposed tests:** Serious consideration, additions, rejection reasons, factual/feasibility errors, valid events and known omissions, completion/effort. No thresholds or finalized suite approved.

**Boundary:** Real time means current-decision usefulness, not automatic polling/GPS/monitoring/notifications/inventory/booking/provider/AI approval. Retrieval is not verification; happening today does not establish reachability or bookability. Prepared data does not prove live usefulness; necessary paid access needs D-017 review.

**Evidence:** Decision, not source availability, proven feasibility, or working-product acceptance.

**Related/history:** Q-005 priorities resolved, full promise open; Q-207/Q-309/Q-304/Q-305/Q-356/Q-402/Q-404/Q-502/Q-503. Supersedes earlier basic same-day deferral, not all advanced-automation questions. Revisit with owner or evidence-driven changes.

## D-019 — Organizer's experience preferences

**Recorded/source:** Would consider beach view/snorkeling/oceanside dinner and scenic ATV exploration with locally distinctive elements; would reject standalone world's-largest-rubber-band or historical-statue examples.

**Interpretation:** Participation, scenery, local character, and complementary components appeal to this organizer. Not a numerical scoring rule.

**Boundary:** Not global bans on history, statues, museums, sightseeing, or popular places; not companion tastes, luxury/risk/skill/ability/effort assumptions, or all-day preference. Strong single activities remain eligible. D-023 later explicitly emphasizes balance with free time, shopping, and food.

**Evidence:** Hypothetical preferences, not bookings, actual Tokyo options, exclusivity, seasonal suitability, operator inclusions, or verified prices. No live research requested by those examples.

**Format history:** Q-012 left open here, explicitly resolved later in D-020. D-010's different “both” answer was not reused.

**Proposed safeguards:** Distinguish genuine operator package from app sequence; verify inclusions/components, total time/travel/costs/reservations. Assembling cards does not create one ticket, included food, or joint availability.

**Related/revisit:** Q-006 example portion resolved; sources later D-021 and pain later D-023. Q-106/Q-204/Q-209/Q-210/Q-304/Q-352/Q-404 carry detail. Refine on owner/companion input or tests.

## D-020 — Both experience formats; tentative durations

**Decision/source:** “Offer both. Maybe shorter activities and all day activities.” Both provider excursions and app-assembled combinations confirmed; duration wording tentative.

**Reason:** Support discovering an organized offering and making a connected plan from separate activities.

**Distinction:** Provider product has advertised conditions/inclusions. Assembled plan is separate components, not one operator product, price, jointly available set, or reservation.

**Duration proposal:** Explore short and all-day options, not selected hour cutoffs, intermediate category, stop count, default, or controls. Duration and format are independent; neither implies exertion or quality. Do not fill every day or exclude single activities.

**Proposed fit:** Usable window, travel/endpoints, included transfers, breaks, entry, reservations, later commitments. Avoid double-counting or inventing shortened operator variants. Label unknown timing; formulas remain open. D-023 later adds desired energy/free-time balance.

**Scope/boundary:** Both formats belong in first-version planning; no silent deferral. No provider/API, ranking ratio, booking, whole-trip automation, permissions, paid service, real-trip recommendation, or implementation selected. Detailed inventory/coverage and acceptance unproven.

**Related/history:** Q-012 resolved; Q-212 durations; Q-302/Q-305/Q-402/Q-404/Q-304/Q-352. Supersedes format uncertainty, not tentative durations. Revisit with refinement or evidence.

## D-021 — Reported discovery sources

**Recorded/source:** Owner finds or values real experiences, positive Reddit posts, highly rated reviews, calendars within relevant time frames, and destination-related must-see/must-experience highlights.

**Interpretation:** Firsthand/community/review/calendar/highlight evidence informs design. Own versus others' real experiences unspecified; no particular past attendance inferred.

**Relationship:** High ratings/popularity supply candidates without replacing personal or practical fit. Not hidden-gems-only, mandatory famous stops, or companion preference. D-022 adds local/cultural inclusion; D-023 later answers main frustrations.

**Proposed handling:** Distinguish appeal evidence from current logistical verification. Consider source context/recency, critical caveats, count/content, editions/operators, copied/duplicate or conflicting evidence. Praise is not present availability; calendars are not secured bookings. Not every result must have all five source types.

**Boundary:** No specific platform beyond named Reddit category, subreddit/account/calendar, rating cutoff/weight/count, API, scraper, supplier, paid license, storage/reproduction, history import, training use, monitoring, or posting selected. Rights, attribution, retention, cost, and coverage remain later evaluation. Not a marketing-channel choice.

**Evidence/history:** Source self-report, not fetched posts/reviews/events, authenticity proof, observed effort, or market validation. Supersedes wholly unknown discovery sources. Organization tools/measurement remain open; main pain subsequently D-023.

**Related/revisit:** Q-006 sources resolved; Q-204/Q-304/Q-352/Q-355/Q-356/Q-402/Q-403/Q-404. Concrete source or evidence clarification.

## D-022 — Local recommendations and cultural experiences

**Decision/source:** Owner explicitly adds both to discovery and trip planning.

**Proposed distinction:** Local recommendation concerns origin of advice—residents, guides, community hosts, or locally based sources—not just proximity. Culture concerns what one learns/does/observes: food, crafts, performances, public festivals, history, everyday life. Examples are not fixed categories or verified inventory.

**Personalization:** Propose meaningful context/participation for this organizer without making culture adventure-only, banning history, or assuming all users/companion agree. Popular highlights can have local endorsement; local need not mean obscure.

**Proposed evidence/respect:** Support source and reason; language, distance, rating, or anonymous opinion alone do not verify resident endorsement. Avoid fabricated “locals love it,” authenticity/exclusivity, community consensus, or access to private/restricted activities. Explain language, visitor access, participation, etiquette, timing, reservations, and material commercial relationships when supported.

**Fit/scope:** Include in pre-trip/same-day and both formats; date, travel, costs, and reservations still apply. No guaranteed walk-ins or current festival entry. Categories, sources, verification, ranking, coverage, and thresholds open.

**Boundary:** No marketplace, host accounts, guide messaging, review system, partnership, paid source, scraping, history import, booking, tracking, or implementation selected. No actual local/cultural offering verified by this choice. D-017/D-018 unchanged.

**Related/revisit:** Q-204/Q-212/Q-302/Q-309/Q-304/Q-352/Q-356/Q-402/Q-403/Q-404. Did not answer Q-006 frustration at the time; D-023 now does. Revisit on refinement or evidence.

## D-023 — Planning friction, sensible order, and balanced days

**Question:** What is most frustrating or time-consuming when planning, and what should the app help handle?

**Owner-reported difficulties and desired outcomes:**

| Problem or preference | Meaning to preserve |
| --- | --- |
| Deciding where to go first and what to experience. | Help prioritize worthwhile options and determine sensible order. |
| Organizing in a way that makes sense. | Coordinate choices as a coherent trip/day, not merely a list. |
| Balancing energy-demanding activities with free time for shopping and good food. | Enjoy substantial experiences without crowding out flexibility, shopping, or enjoyable meals. |
| Finding events happening during the trip. | Date-specific discovery matters both before travel and for same-day choices. |
| Difficulty starting amid travel, hotel proximity, and recommendation-quality variables. | Reduce the number of interdependent decisions the organizer must solve before making progress. |

**Source:** The owner's direct answer to the remaining Q-006 frustration question on 2026-09-19. Their account did not rank these problems individually or specify numerical limits.

**Proposed problem wording:** Help a traveler move from many interdependent choices to a worthwhile, logically ordered trip that fits dates and travel arrangements while balancing demanding experiences with free time for shopping, food, and spontaneous choices.

**Product implications to design, not already approved mechanisms:** Provide manageable starting steps; reuse known details; consider known hotel/start/end locations, travel, time windows, and fixed bookings; explain order; evaluate overall effort and protect desired flexible time; offer date-appropriate events before all flexible time is allocated. When requirements conflict, show tradeoffs rather than silently dropping something or rewriting bookings.

**Important distinctions:**

- The nearest stop is not automatically the right first stop. No shortest-route-only objective or blanket rule to keep everything near the hotel selected.
- A hotel may be booked or undecided. Do not invent it or block all exploration by requiring one without discussing the workflow.
- Individual recommendation quality and whole-day quality are different. Many appealing options can still form an overly demanding day.
- Free time is an intended part of the experience, not automatic permission to fill it. Shopping and dining are meaningful goals, but not inherently low-effort, short, cheap, or reservation-free.
- Duration is not exertion. No health status, physical capacity, fatigue measurement, universal energy score, mandatory recovery interval, or hard daily activity ratio inferred.
- Finding events during trip dates is not a request to perform a live event search, create reminders, or guarantee ticket availability now.
- “Where to go first” reports a sequencing difficulty; it does not by itself resolve city coverage or choose a particular route.

**Scope relationship:** Refines organization and ease within the existing concept, preserves D-018's ranked priorities, and complements D-019's active-experience taste, D-020's formats, and D-022's local/cultural inclusion. It does not remove earlier requirements or approve a new full-automatic planning mode, algorithm, location monitoring, provider, transaction, purchase, or implementation.

**Evidence limit:** The core problems are now self-reported, not merely assistant guesses. They are not observed behavior, measured effort, a complete workflow/tool inventory, evidence that the companion shares the same pace, or market validation. Do not mark the product as solving them before testing.

**Question resolution:** Q-006's initial examples, sources, and main-frustration subquestions are answered across D-019/D-021/D-023. Saving/organization tools and measured baseline can remain later research gaps; do not repeat the broad frustration question or block progress on a complete workflow reconstruction.

**Next discussion:** Q-004 available weekly capacity, so the approved November 10 test target can be evaluated alongside remaining scope. No new implementation start date or commitment is inferred.

**Later detail:** Q-201 manageable start; Q-209 hotel/transport dependencies; Q-212 duration; new Q-213 effort balance and flexible time; Q-305 scheduling/tradeoffs; Q-304/Q-352 evaluations. Full Section 1 approval remains open.

**Affected:** Product brief, standards note, README, this register, and open questions. D-022 is also reconciled into the previously lagging brief/question summaries.

**Supersedes:** Current-status statements that the owner's main planning frustration is unknown. Does not rewrite the historical uncertainty at earlier decisions or convert proposed mechanisms into requirements.

**Revisit:** Owner/companion pace input, actual task observations, usability tests, scheduling evidence, or an explicit change of product priorities.

## Approval register

| Item | Status | Evidence |
| --- | --- | --- |
| Blueprint framework | Adopted | D-001 |
| Completed Section 1 | NOT APPROVED — draft | None |
| Pilot before commercialization | CONFIRMED | D-006/D-007 |
| Couple pilot; two travelers | CONFIRMED | D-008 |
| Hotel/transport inclusion and both support paths | CONFIRMED capabilities | D-009/D-010 |
| Tokyo/travel context | RECORDED; private values omitted | D-011/D-013 |
| November 10, 2026 first test | APPROVED target, not guarantee | D-012 |
| Per-person trip range excluding airfare | RECORDED; currency/details open | D-014/D-016 |
| Reservation-aware dining/events | CONFIRMED inclusion | D-015 |
| Free-first flexible app budget | CONFIRMED policy, no purchase | D-017 |
| Ranked standards and first-version same-day | CONFIRMED | D-018 |
| Personal experience examples | RECORDED, not global rules | D-019 |
| Both experience formats | CONFIRMED | D-020 |
| Shorter/all-day categories | USER PROPOSAL; details open | D-020/Q-212 |
| Discovery sources | RECORDED self-report; access open | D-021 |
| Local/cultural discovery | CONFIRMED inclusion | D-022 |
| Main planning problems and desired day balance | RECORDED self-report; solutions/test criteria open | D-023 |
| Full current tool workflow/measured effort | NOT OBSERVED; remaining research gap | Q-006 |
| Weekly development/review/testing capacity | NOT SUPPLIED; next question | Q-004 |
| Working product meets standards | NOT DEMONSTRATED OR ACCEPTED | Tests and owner judgment required |
| Numerical criteria and exact planning rules | NOT SELECTED | Q-304/Q-305/Q-309 |
| Sections 2–15 | NOT STARTED | None |
| Whole pilot/commercial scope | NOT APPROVED; individual choices apply | Q-005 and later scope |
| Stack/providers, monetization/platform detail | NOT SELECTED | Later sections |
| Design-to-code transition | NOT APPROVED | Q-506 |

## Proposals not to mistake for decisions

Organizer-led suggestion approval, publication/drafts, account-free access, exact Keep/Must-do/Lock behavior, detailed source/destination coverage, date-free exploration, providers/AI, automatic whole-trip edits, multi-city depth, transactions, billing/ad exclusions, pricing/placements, native/web choice, imports, modes, source weighting, ratings thresholds, evidence hierarchies/access, local verification, cultural taxonomy, duration buckets, energy ratings, free-time allocations, onboarding rules, hotel-required rules, routing/combination algorithms, airport buffers, budget formulas, booking/payment state models, monitoring/reminders, quantitative acceptance, and exact cost controls all remain open unless separately approved.

Confirmed same-day, formats, local/cultural inclusion, and stated balanced-day needs must not silently disappear. Owner taste is not a universal category ban or companion preference. Source names are not licensed access; positive opinions are not current logistics. Flexible app references do not authorize payments. The old fixed-ceiling proposal is superseded.

## New record template

```text
ID:
Question:
Decision or reported input:
Source and approval status:
Reason:
Evidence and limitations:
Proposed implications:
Boundaries:
Affected documents:
Related questions:
Supersedes:
Revisit trigger:
Owner and date:
```

## Maintenance

Update affected documents/questions together. Preserve historical reasoning and distinguish later clarifications from the state at the time. Change section completion only with explicit owner approval. A milestone, requirement, preference, problem report, or commit does not establish product acceptance.
