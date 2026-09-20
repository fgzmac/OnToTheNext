# OnToTheNext — Travel App Planning

> An app that helps people discover experiences their travel group will enjoy, turn their choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

**Phase:** Product design and planning  
**Current blueprint section:** 1 — Product Vision and Problem Brief; DRAFT, not yet approved  
**Core interaction principle:** Offer useful ideas and refine them through user reactions, rather than requiring users to invent the plan  
**Immediate priority:** Prepare the actual Japan itinerary and reservation plan without waiting for the app  
**Starting Japan cities:** Tokyo, Kyoto, Osaka; complete their core itinerary before optional destination expansion  
**Hotel-base preference:** Separate hotel stay in each main city; the app should ask travelers for their own preference  
**Hotel style:** Upscale, comfortable, conveniently located, value-conscious; no hostels for this traveler; numerical budget not yet approved  
**Booking baseline:** Only plane tickets booked, as reported by the owner; exact private details remain in chat  
**Initial device focus:** Phones; operating system and native/web delivery not selected  
**Discovery testing:** Spontaneous nearby discovery in San Jose, California  
**First complete software-test target:** November 10, 2026; not the itinerary-preparation or booking deadline  
**Spending:** Free first; flexible paid-operation references; no purchase authorized  
**Owner effort:** Flexible/as necessary; not quantified or assumed unlimited  
**Implementation:** Not started through this planning workflow  
**Last updated:** 2026-09-20

`OnToTheNext` is the repository name. Final product branding remains open.

## Start here: current amendments

**[D-026 — Phone-first; Japan itinerary now; discovery testing in San Jose](planning/decisions/D-026-phone-first-and-japan-priority.md)** amends the earlier product brief and D-025 testing sequence. Actual Japan planning must not wait for a working beta, simulations, or the software milestone.

**[D-027 — Japan starting cities and worthwhile lesser-known destinations](planning/decisions/D-027-core-cities-and-worthwhile-detours.md)** records Tokyo, Kyoto, and Osaka as the starting city set, and adds experience-led recommendations for lesser-known destinations. The city list is not an approved order or allocation of nights. Public research examples are candidates, not selected stops or bookings.

**[D-028 — Main cities first and flights-only booking baseline](planning/decisions/D-028-main-cities-first-and-booking-baseline.md)** refines the order: build the main-city itinerary and address its booking needs first, then offer optional additional destinations. Only flights have been booked. The precise core-plan completion rule remains open; it does not automatically mean all reservations must be purchased first.

**[D-029 — Per-city hotels and the traveler preference question](planning/decisions/D-029-per-city-hotels-and-stay-preference.md)** records a separate hotel stay in each main city for this trip and confirms that the app should ask users about separate city stays versus fewer bases. The trip preference is not a universal default. Exact question wording and placement remain proposed; properties, city order, and nights remain open.

**[D-030 — Recommendation-led planning and hotel value](planning/decisions/D-030-recommendation-led-planning-and-hotel-value.md)** confirms that the app should continually offer useful ideas and refine them through user reactions. It records upscale, comfortable, conveniently located, reasonably priced hotels and no hostels for this traveler. Show budget points and tradeoffs; the suggested nightly comparison amounts are proposals, not approved limits or live quotes.

Read these amendments before older next-step prompts. Phone focus, main cities, booking inventory, hotel-base preference, and hotel style have been answered.

| Document | Purpose | Status |
| --- | --- | --- |
| [Recommendation-led design and hotel value](planning/decisions/D-030-recommendation-led-planning-and-hotel-value.md) | Guided choices, personal hotel preferences, budget comparison proposal, and evidence boundaries. | Principle and preferences recorded; numerical hotel budget and detailed behavior open. |
| [Hotel-base preference decision](planning/decisions/D-029-per-city-hotels-and-stay-preference.md) | Separate city stays and a reusable traveler question. | Preference/question inclusion confirmed; exact UI and properties open. |
| [Sequencing decision](planning/decisions/D-028-main-cities-first-and-booking-baseline.md) | Main-city-first flow, optional expansion, flights-only baseline. | Read with D-029/D-030; core completion, order, nights, and properties open. |
| [Destination decision](planning/decisions/D-027-core-cities-and-worthwhile-detours.md) | Starting cities, worthwhile-detour requirement, preliminary public research. | Extra destinations follow the core itinerary. |
| [Priority decision](planning/decisions/D-026-phone-first-and-japan-priority.md) | Phone focus, immediate Japan planning, San Jose tests, generic booking-action template. | Direction confirmed; implementation and bookings open. |
| [Planning blueprint](planning/blueprint.md) | Framework and sequential progress tracker. | Adopted framework, not blanket approval. |
| [Product vision and problem brief](planning/00-product-brief.md) | Detailed Section 1 draft through D-025. | Read with D-026 through D-030; full section not approved. |
| [Product success standards](planning/00-product-success-standards.md) | Standards, preferences, sources, formats, balanced days, proposed evaluations. | Thresholds open; amendments and question register govern current direction. |
| [App budget policy and options](planning/00-app-budget-options.md) | Free-first policy, prior cost scenarios, access risks. | D-017 confirmed; no vendor or purchase selected. |
| [Decision register](planning/decisions.md) | Historical decisions/inputs through D-025. | Extended by standalone D-026 through D-030; preserve earlier reasoning. |
| [Open questions](planning/open-questions.md) | Remaining questions and next actionable choice. | Next: react to proposed hotel budget reference, then core order/nights. Do not re-ask hotel style. |

## Core design principle — recommendations lead, the traveler decides

**D-030:** The app should provide concrete ideas that help travelers discover and refine what they want. Do not make a blank search box or an exhaustive questionnaire the only way to begin.

**Proposed loop:** Use known context → suggest a manageable set with reasons and tradeoffs → let the traveler choose, reject, compare, or refine → preserve accepted decisions and improve the next suggestions. Keep custom input and correction available. Exact number of choices, controls, learning rules, and algorithm remain open.

Examples of useful refinements include closer, less expensive, more comfortable, less demanding, and more cultural. A rejection is not automatically a dislike of an entire category. Reuse answers and help the user reach a completed plan rather than an endless stream of choices.

Continually helpful does not mean interruptions, background notifications, tracking, automatic bookings, unwanted upselling, or filling free time. D-024's spontaneous search remains user-initiated; D-028 still puts main cities before optional expansions. User control and truthful source/price information remain necessary.

## Current priorities — independent workstreams

| Workstream | Immediate purpose | Does not require |
| --- | --- | --- |
| Actual Japan itinerary | Build the main-city plan and research reservation-sensitive arrangements now; consider extra destinations afterward. | Finished app, beta, simulations, or public distribution. |
| Phone-first spontaneous discovery | Continue design; later test useful current nearby experiences and optional outings in San Jose. | Nationwide U.S. coverage, a local hotel booking, or automatic tracking. |

The owner wants the Japan plan soon enough to act on advance reservations. Determine actual release windows for chosen items, not a universal horizon or November 10 default. D-025's former local-first/beta/Japan-simulation sequence cannot block real trip preparation. Japan software rehearsals can still follow a beta; they are separate from actual planning.

Phones are the initial focus; desktop parity is not the priority. No OS, native/web architecture, browser matrix, offline guarantee, framework, deployment, provider, or store submission selected.

## Main-city foundation, then optional destinations — D-027/D-028

**Starting set:** Tokyo, Kyoto, and Osaka. Their order in the owner's answer is not itinerary order. Under D-028, focus planning and booking decisions on the main cities first; branch out once their itinerary is established. D-029 selects separate stays, not properties or nights.

**Proposed flow:** Recommend city order/nights using the hotel-base preference → build main-city stays, transport, experiences, and booking actions → review the core itinerary → consider worthwhile additional destinations → preview changes → accept or keep the core plan. Main-city-first and the preference question are confirmed; substeps, question placement, and completion rules remain open. D-030 calls for concrete recommendations rather than asking the traveler to invent the route.

**Booking baseline:** Only plane tickets booked, as reported. Hotels, intercity journeys, and timed experiences are not yet booked. Q-015 is resolved; do not request the inventory again. Hotel preferences do not create bookings. Private flight constraints remain in the conversation; no live verification or purchase authority implied.

**Completed plan versus paid reservations:** Do not assume every item must be purchased before optional suggestions can appear. A reviewed core draft with visible unbooked items is a proposed interpretation. Selected, tentative, confirmed, and paid arrangements differ. Reservation research need not wait for the app.

**Lesser-known destinations:** Included when worthwhile attractions/events/experiences justify consideration, sequenced after the core-city plan. Obscurity is not quality or a mandatory detour; the capability has not been removed or deferred to an unspecified release.

**Proposed expansion support:** Explain appeal, date relevance, day trip versus overnight, added travel/cost/lodging, reservations, and what changes. Preserve free time and commitments unless the traveler explicitly approves a change. No automatic rewriting, extra-city quota, or hotel-count maximum selected. Keeping only the main cities is a valid complete outcome.

Chichibu, Uji, and Kinosaki Onsen remain preliminary D-027 candidates the owner liked, not selected stops or bookings. Consider them after the core plan. Annual dates are not current-year program/inventory confirmation; travel estimates are not dated train schedules. Recheck evidence when used.

## Hotel strategy and value — D-029/D-030

**For this trip:** Separate hotel stays in Tokyo, Kyoto, and Osaka; upscale, comfortable, conveniently located, and not overly expensive. Exclude hostels, including using a private hostel room as an unapproved substitute. Do not apply that exclusion to every traveler. Returning to a city need not mean a different property; exact properties, room types, order, and nights remain open.

**For the app:** Ask about separate city stays versus fewer bases instead of hardcoding the owner's choice. A compare-both option is proposed for undecided travelers. Explain the tradeoffs and offer hotel budget points so users can react to a useful starting recommendation.

**Proposed use:** Ask relevant questions before finalizing accommodation/routing, without requiring bookings to begin discovery. Evaluate the offered room's comfort and the location's fit with actual activities, transport, food/shopping, and hotel breaks. Consider transfer/check-in/luggage time when planning. Keep preferences editable and preview impacts rather than changing bookings silently. No star cutoff, room size, walking limit, amenities, or default selected.

**Proposed budget reference:** Compare USD 150, 200, 250, 300, and 400 per room per night for a two-adult shared-room example. Start by evaluating USD 200–260, including cheaper options that meet the same preferences. All numbers are unapproved planning scenarios, not date-specific quotes, verified market averages, or a required minimum spend. One shared room/equal splitting is a comparison assumption, not an expense rule.

Show currency, room/person/bed basis, guest count, complete stay cost, taxes/mandatory charges, inclusions, and cancellation terms for actual offers. Unknown totals remain explicit. The owner's trip-budget currency/category details are still open; using USD in examples does not settle them or change app-service funding. D-030 links general official accommodation guidance and current Kyoto tax context, not live property rates.

**Next — Q-016:** Ask whether the proposed USD 200–260 per room nightly search reference works, rather than re-asking what kind of hotel the owner wants. No numerical range is approved yet. Then propose the main-city order/nights under Q-014. Known dates/times, group, cities, hotel-base choice, and preferences must not be requested again.

## Core use case and product coverage

An organizer takes the trip and shares it with companions: **“Look what I planned for us,”** not primarily a secret trip for somebody else.

- **Discover:** Appealing experiences, nearby events, local advice, culture, and worthwhile destinations beyond familiar ones.
- **Organize:** Enjoyable days with stays, travel, spending, reservations, effort, and free time considered.
- **Delight:** Personal, exciting sharing without obstructing practical details.

The pilot is a couple, two travelers (D-008), not a permanent limit, couples-only market, or assumption of identical tastes.

Hotel/transport support includes existing bookings and recommendations before booking (D-009/D-010). The hotel-base question (D-029), guided recommendations and budget comparisons (D-030), and reservation-aware dining/events (D-015) apply. Requirement, actual booking, and payment differ. No transaction, import, provider, or guaranteed inventory selected.

The trip range is per person excluding airfare (D-014/D-016); amounts stay in chat. Currency, categories, and total/remaining meaning remain open. Not app funding or permission to spend.

Offer provider excursions and app combinations (D-020); a sequence is not automatically one product/price/reservation or jointly available. Shorter/all-day options remain tentative categories. Format, duration, and effort differ.

Local/cultural discovery (D-022) remains included; source verification, categories, and coverage open. No host marketplace or fabricated endorsements.

## Success standards — D-018

| Rank | Standard |
| --- | --- |
| 1 | Suggestions the traveler would genuinely consider adding. |
| 2 | Useful same-day nearby events/experiences, including festivals and pop-ups, and on-the-fly planning. |
| 3 | Seamless, useful operation, not a chore. |

Same-day remains first-version work. Extra reveal effects cannot compensate for poor suggestions. Correctness, privacy, reliability, and accessibility remain necessary. Numerical quality/speed/coverage/effort/usability criteria are not approved. D-030 gives a concrete interaction direction, not a validated outcome or scoring formula.

Organizer examples favor scenic, participatory, locally distinctive and complementary experiences over supplied standalone novelty/statue examples (D-019). Not a universal history ban, companion taste, ability/risk assumption, or verified offering.

Inputs include firsthand accounts, positive Reddit posts, reviews, date calendars, destination highlights (D-021), and local/cultural information. Popularity does not override fit; praise does not prove availability. No weights, API/scraper, history import, paid access, reproduction rights, or training use selected. Preliminary manual research is not an app integration or proof of consistent quality.

## Day balance and spontaneous use — D-023/D-024

Reported problems: getting started, choosing activities and order, coordinating hotel/travel context, balancing effort with shopping/food, and finding dated events.

```text
One or two main experiences
    → Free time
    → Rest at the hotel when wanted
    → Traveler chooses to reopen the app
    → Discover worthwhile options within a radius
    → Choose a spontaneous outing, or keep resting
```

Example, not a universal event maximum, mandatory return, fixed rest, or compulsory extra outing. D-030's proactive design must not automatically fill downtime or turn this into notifications or inferred fatigue.

Proposed details: reuse preferences, establish area/time, check travel/entry/cost/reservations, preview changes. Radius is not reachability/bookability; hotel address is not proof of current location. Units/defaults, consent, expansion, controls, and editing rights remain open.

San Jose tests spontaneous discovery. Local success does not prove Japan coverage; distinguish controlled scenarios from checked real-world evidence. No working beta or successful test claimed.

## Milestones, effort, spending

November 10, 2026 remains the software-test target, not public launch or a booking deadline. Private timing establishes late-November to early-December travel with late arrival/midday departure. Exact values stay in chat; flights, transfers, hotels, and usable time differ.

Effort is as necessary (D-024), not quantified or unlimited. Estimate actual tasks and evaluate progress later.

**D-017:** Aim for no additional app-service charges while suitable free options work. USD 100/month and 150 are flexible paid-operation references, not mandatory spending, hard ceiling, or purchase authority. Review blocker, alternatives, useful paid option, costs/limits, and consequences before spending. Greater discretionary investment follows working-product acceptance.

Tools, setup purchases, domains, enrollment, hardware, labor, taxes, marketing/legal work, transactions, and unpriced licenses remain separate. Recheck costs before selecting services. Do not silently omit requirements or pass simulations off as real evidence to stay free. Hotel budget comparisons are travel expenses, not changes to this policy.

Ultimate subscription/ad-supported app-store/SaaS ambitions remain; pricing, tiers, channels, timing, and public date open. No authority to implement billing/ads follows from the trip-planning pivot.

## Planning and implementation boundaries

App design stays sequential; Section 1 remains DRAFT. Individual preferences, principles, and price examples do not approve later sections. Actual-trip preparation may use research/manual planning before software exists; no scaffolding, dependencies, infrastructure, schema, or deployment authorized.

Codex follows explicit design-transition approval. Design completion means sufficient direction, scope, journeys, risks, and first buildable slice, not every future feature.

Research/recommendations are not permission to book, change, cancel, or pay. Phone/radius/guided-discovery focus does not grant tracking, notifications, monitoring, or unsolicited automatic changes. Stack, identity, providers, AI, permissions, and full release scope remain open.

**Labels:** CONFIRMED = explicit choice; RECORDED = self-report/example; PROPOSED = awaiting choice; ASSUMPTION = needs evidence; OPEN = unresolved; DEFERRED = explicitly postponed; REJECTED = deliberately excluded. A commit, manual itinerary, or comparison is not acceptance of the product.

## Public repository and maintenance

Keep private finances, exact dates/times, personal itineraries, booking references, credentials, identities, home addresses, and identifying research outside commits. Generic structures, city-level context, non-identifying preference/status summaries, unselected public research, illustrative budget scenarios, and software milestones are planning material. Consult the conversation for supplied private inputs.

Read standalone D-026 through D-030 alongside the historical register. Amend this overview and question tracker when choices change; distinguish current decisions from historical prompts. Preserve prior reasoning and unrelated files. Use `planning/blueprint.md` for section order and approval status.
