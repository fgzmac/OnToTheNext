# OnToTheNext — Travel App Planning

> An app that helps people discover experiences their travel group will enjoy, turn their choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

**Phase:** Product design and planning  
**Current blueprint section:** 1 — Product Vision and Problem Brief; DRAFT, not yet approved  
**Immediate priority:** Prepare the actual Japan itinerary and reservation plan without waiting for the app  
**Starting Japan cities:** Tokyo, Kyoto, Osaka; complete their core itinerary before optional destination expansion  
**Booking baseline:** Only plane tickets booked, as reported by the owner; exact private details remain in chat  
**Initial device focus:** Phones; operating system and native/web delivery not selected  
**Discovery testing:** Spontaneous nearby discovery in San Jose, California  
**First complete software-test target:** November 10, 2026; not the itinerary-preparation or booking deadline  
**Spending:** Free first; flexible paid-operation references; no purchase authorized  
**Owner effort:** Flexible/as necessary; not quantified or assumed unlimited  
**Implementation:** Not started through this planning workflow  
**Last updated:** 2026-09-19

`OnToTheNext` is the repository name. Final product branding remains open.

## Start here: current amendments

**[D-026 — Phone-first; Japan itinerary now; discovery testing in San Jose](planning/decisions/D-026-phone-first-and-japan-priority.md)** amends the earlier product brief and D-025 testing sequence. Actual Japan planning must not wait for a working beta, simulations, or the software milestone.

**[D-027 — Japan starting cities and worthwhile lesser-known destinations](planning/decisions/D-027-core-cities-and-worthwhile-detours.md)** records Tokyo, Kyoto, and Osaka as the starting city set, and adds experience-led recommendations for lesser-known destinations. The city list is not an approved order or allocation of nights. Public research examples are candidates, not selected stops or bookings.

**[D-028 — Main cities first and flights-only booking baseline](planning/decisions/D-028-main-cities-first-and-booking-baseline.md)** refines the order: build the main-city itinerary and address its booking needs first, then offer optional additional destinations. Only flights have been booked. The precise core-plan completion rule remains open; it does not automatically mean all reservations must be purchased first.

Read these amendments before older next-step prompts. Phone focus, main cities, and the existing-booking inventory have been answered.

| Document | Purpose | Status |
| --- | --- | --- |
| [Current sequencing decision](planning/decisions/D-028-main-cities-first-and-booking-baseline.md) | Main-city-first flow, optional expansion afterward, flights-only booking baseline. | D-028 sequence confirmed; exact completion rules, order, nights, and lodging open. |
| [Destination decision](planning/decisions/D-027-core-cities-and-worthwhile-detours.md) | Starting cities, worthwhile-detour requirement, preliminary public research. | Read with D-028: extra destinations considered after the core itinerary. |
| [Priority decision](planning/decisions/D-026-phone-first-and-japan-priority.md) | Phone focus, immediate Japan reservation planning, San Jose discovery tests, generic booking-action template. | D-026 confirmed; implementation and bookings open. |
| [Planning blueprint](planning/blueprint.md) | Framework and sequential progress tracker. | Adopted framework, not blanket approval. |
| [Product vision and problem brief](planning/00-product-brief.md) | Detailed Section 1 draft through D-025. | Read with D-026 through D-028; full section not approved. |
| [Product success standards](planning/00-product-success-standards.md) | Standards, preferences, sources, formats, balanced days, proposed evaluations. | Detailed thresholds open; amendments and question register govern current direction. |
| [App budget policy and options](planning/00-app-budget-options.md) | Free-first policy, retained cost scenarios, access risks. | D-017 confirmed; no vendor or purchase selected. |
| [Decision register](planning/decisions.md) | Historical decisions/inputs through D-025. | Extended by standalone D-026 through D-028; preserve earlier reasoning. |
| [Open questions](planning/open-questions.md) | Remaining questions and next actionable choice. | Next: Q-014 main-city hotel-base preference, then order/nights. Q-015 answered. |

## Current priorities — independent workstreams

| Workstream | Immediate purpose | Does not require |
| --- | --- | --- |
| Actual Japan itinerary | Build the main-city plan and research its reservation-sensitive arrangements now; consider extra destinations afterward. | Finished app, beta, simulations, or public distribution. |
| Phone-first spontaneous discovery | Continue design; later test useful current nearby experiences and optional outings in San Jose. | Nationwide U.S. coverage, a local hotel booking, or automatic tracking. |

The owner wants the Japan plan soon enough to act on advance reservations. Determine actual release windows for chosen items, not a universal booking horizon or November 10 default. D-025's former local-first/beta/Japan-simulation sequence cannot block real trip preparation. Japan software rehearsals can still follow a beta; they are separate from planning the actual trip now.

Phones are the initial focus; desktop parity is not the priority. No OS, native/web architecture, browser matrix, offline guarantee, framework, deployment, provider, or store submission selected.

## Main-city foundation, then optional destinations — D-027/D-028

**Starting set:** Tokyo, Kyoto, and Osaka. Their order in the owner's answer does not establish itinerary order. Under D-028, focus planning and booking decisions on these main cities first; branch out once their itinerary is established.

**Proposed flow:** Establish city order/nights → build main-city stays, transport, experiences, and reservation actions → review the core itinerary → consider worthwhile additional destinations → preview changes → accept or keep the core plan. The main-city-first sequence is confirmed; detailed substeps and the review/completion rule remain open.

**Booking baseline:** The owner reports only plane tickets booked. Hotels, intercity journeys, and timed experiences are not yet booked. Q-015 is resolved; do not request the same inventory again. Flight constraints remain in the private conversation. No live booking verification, route, stay allocation, or purchase authority is implied.

**Completed plan versus paid reservations:** Do not assume that every hotel and activity must be purchased before optional suggestions can appear. A reviewed core draft with clearly identified unbooked items is a proposed interpretation for later design. Selected, tentative, confirmed, and paid arrangements must not be conflated. Main-city reservation research should proceed as needed without waiting for the app.

**Confirmed product inclusion:** Recommend lesser-known cities when specific attractions, events, or experiences make them worth considering, now sequenced after core-city planning. Do not equate obscurity with quality or require a detour merely to make the route different. This is not removal of D-027 or deferral to an unspecified future release.

**Proposed expansion support:** Explain appeal, relevance to dates, day trip versus overnight, added travel/cost/lodging effort, reservations, and what would change in the established plan. Preserve desired free time and confirmed commitments unless the traveler explicitly approves a change. A larger detour can be considered with its consequences visible; no automatic rewriting or extra-city quota is selected. Keeping only the main cities is a valid complete outcome.

D-027 records preliminary official-source examples: Chichibu, Uji, and Kinosaki Onsen. The owner likes these ideas, but **none is selected or booked; keep them optional until the main-city itinerary is ready**. Annual dates are not current-year program or inventory confirmation; transport estimates are not dated train schedules. Recheck the evidence when an option is actually considered.

**Next — Q-014:** Is a separate hotel stay in each main city preferred, or fewer hotel changes with more travel from a base? Then propose the core order/nights within the supplied flights. This is a preference question, not a claim of route feasibility. Known private dates/times, traveler count, budget bounds, and cities must not be requested again.

## Core use case and product coverage

An organizer takes the trip and shares the plan with companions: **“Look what I planned for us,”** not primarily a fully secret trip for someone else.

- **Discover:** Appealing experiences, nearby events, local advice, cultural opportunities, and worthwhile destinations beyond the familiar ones.
- **Organize:** Enjoyable days considering stays, travel, spending, reservations, effort, and free time.
- **Delight:** Personal, exciting sharing without obstructing practical details.

The pilot is a couple, two travelers (D-008), not a permanent limit, couples-only market, or assumption of identical tastes.

Hotels and transportation require organizing existing bookings and recommending options before booking (D-009/D-010). Reservation-dependent dining/events are included (D-015). Requirement, actual booking, and payment differ. No transaction, import, provider, or guaranteed inventory selected.

The trip range is per person and excludes airfare (D-014/D-016); numerical bounds remain in chat. Currency, categories, and total-versus-remaining meaning are open. Not app funding or payment authority.

Offer real provider excursions and app-assembled combinations (D-020). A sequence is not automatically one product, price, jointly available set, or booking. Shorter/all-day options remain tentative duration ideas, not fixed hours/defaults. Format, duration, and exertion differ.

Local recommendations and cultural experiences are included (D-022). Specific source verification, categories, and coverage open; no host marketplace or fabricated endorsement.

## Success standards — D-018

| Rank | Standard |
| --- | --- |
| 1 | Suggestions the traveler would genuinely consider adding. |
| 2 | Useful same-day nearby events/experiences, including festivals and pop-ups, and on-the-fly planning. |
| 3 | Seamless, useful operation, not a chore. |

Same-day remains first-version work. Extra reveal effects cannot compensate for poor suggestions. Correctness, privacy, reliability, and accessibility remain necessary. Numerical quality/speed/coverage/effort/usability criteria are not yet approved.

Organizer preference examples favor scenic, participatory, locally distinctive and complementary experiences over the supplied standalone novelty/statue examples (D-019). Personal taste is not a global history ban, companion agreement, ability/risk assumption, or verified Japan offering.

Discovery inputs include firsthand accounts, positive Reddit posts, strong reviews, date calendars, destination highlights (D-021), and local/cultural information. Popularity does not override fit; praise does not establish current availability. No source weights, API/scraper, history import, paid access, copying rights, or training use selected. D-027's public research is preliminary manual work, not an app integration or proof of consistent quality.

## Day balance and spontaneous use — D-023/D-024

Reported problems: getting started with many variables, choosing worthwhile activities and order, coordinating hotel/travel context, balancing effort with shopping/food, and finding dated events.

```text
One or two main experiences
    → Free time
    → Rest at the hotel when wanted
    → Traveler chooses to reopen the app
    → Discover worthwhile options within a radius
    → Choose a spontaneous outing, or keep resting
```

Example, not a universal two-event maximum, mandatory hotel return, fixed rest, or compulsory extra outing. Free time is not automatically filled. The search is user-initiated, not a notification or inferred fatigue.

Proposed details: reuse preferences, establish area/time, check travel/entry/cost/reservations, and preview changes. Radius membership is not reachability or bookability; a hotel is not proof of current location. Units/defaults, consent, expansion, controls, and editing permissions remain open.

San Jose tests spontaneous discovery. Local success does not prove Japan coverage; distinguish controlled scenarios from current checked evidence. No working beta or completed successful test is claimed.

## Milestones, effort, spending

November 10, 2026 remains the first complete software-test target (D-012), not public launch or a booking deadline. Private timing establishes the late-November to early-December trip context, with late arrival and midday departure. Exact dates/times remain in chat; flights, transfers, hotels, and usable time differ.

Owner effort is as necessary (D-024), not a fixed weekly number or unlimited capacity. Estimate real tasks and evaluate progress later.

**D-017:** Aim for $0 additional app-service charges while suitable free options work. $100/month and $150 are flexible paid-operation references, not mandatory spending, hard ceiling, or purchase authority. Review blocker, free alternatives, smallest useful paid choice, charges/limits, and consequences before specific spending. Greater discretionary investment follows acceptance of a working product.

Tools, one-time purchases, domains, enrollment, hardware, labor, taxes, marketing/legal work, transactions, and unpriced licenses stay separate. Recheck prior costs before selection. Do not silently omit requirements or treat simulations as real-world evidence to stay free.

Ultimate app-store/SaaS commercialization with subscriptions/ads remains. Pricing, tiers, channels, timing, and public date open. The priority pivot does not remove the broader idea or authorize billing/ads implementation.

## Planning and implementation boundaries

App design continues sequentially. Section 1 is DRAFT; priority, destination, and booking-baseline answers do not approve later sections. Immediate actual-trip preparation can use research/manual planning before software exists; it does not authorize scaffolding, dependencies, infrastructure, schema, or deployment.

Codex follows explicit design-transition approval. Design completion means sufficient direction, scope, journeys, risks, and first buildable slice, not every future feature.

Research is not permission to book/change/cancel/pay. Phone/radius focus is not tracking, notifications, or monitoring permission. No stack, identity, provider, AI model, sharing/permission model, or complete release scope selected.

**Labels:** CONFIRMED = explicit choice; RECORDED = self-report/example; PROPOSED = awaiting choice; ASSUMPTION = needs evidence; OPEN = unresolved; DEFERRED = explicitly postponed; REJECTED = deliberately excluded. A commit or manual itinerary is not product acceptance.

## Public repository and maintenance

Keep private finances, exact dates/times, detailed personal itineraries, booking references, credentials, identities, home addresses, and identifying research out of commits. Generic structures, city-level contexts, non-identifying booking-status summaries, unselected public research examples, and software milestones are appropriate. Consult the conversation for already supplied private inputs.

Read standalone D-026 through D-028 alongside the historical register. Amend this overview and question tracker when priorities change; distinguish current decisions from historical prompts. Preserve earlier reasoning and unrelated files. Use `planning/blueprint.md` for section order and approval status.
