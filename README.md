# OnToTheNext — Travel App Planning

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

**Phase:** Product design and planning  
**Current blueprint section:** 1 — Product Vision and Problem Brief  
**Current section status:** Draft; not yet approved  
**First complete test target:** November 10, 2026 — approved planning target  
**App spending policy:** Free first; flexible paid-operation reference; no paid service authorized  
**Implementation:** Not started through this planning workflow  
**Last updated:** 2026-09-19

`OnToTheNext` is the repository name. The final product name has not been confirmed.

## Start here

| Document | Purpose | Status |
| --- | --- | --- |
| [Planning blueprint](planning/blueprint.md) | Reusable framework and sequential progress tracker. | Adopted framework; examples are not blanket approval. |
| [Product vision and problem brief](planning/00-product-brief.md) | Current section populated from the concept and explicit decisions. | Draft for discussion; latest local/cultural addition is detailed in the standards note and D-022. |
| [Product success standards](planning/00-product-success-standards.md) | Ranked standards, same-day discovery, personal taste, formats, discovery evidence, local/cultural inclusion, and proposed evaluations/durations. | D-018/D-020/D-022 confirmed; D-019/D-021 inputs recorded; detailed behavior open. |
| [App budget policy and options](planning/00-app-budget-options.md) | Free-first policy, prior tier comparisons, example costs, and data-access risks. | D-017 confirmed; providers, purchases, controls unselected. |
| [Decision register](planning/decisions.md) | Confirmed decisions and recorded inputs, reasoning, and boundaries. | Maintained as choices are made. |
| [Open questions](planning/open-questions.md) | Unresolved questions by blueprint section. | Only current-section questions active. |

## Confirmed core use case

An organizer plans a trip they are taking and shares it with travel companions. The main experience is **“Look what I planned for us,”** rather than a fully secret trip for someone else.

The product connects three jobs:

- **Discover:** Genuinely appealing experiences, including nearby events for same-day plans, local recommendations, and cultural experiences.
- **Organize:** Realistic days accounting for hotels, transportation, spending, and reservation-dependent dining/events.
- **Delight:** Personal, exciting sharing without obstructing practical trip details.

**Initial audience:** A couple, two travelers total, organizer and companion (D-008). Not a couples-only commercial product, permanent size limit, or permission model.

**Hotels and transportation:** Both organizing existing bookings and recommending options before booking belong in the first version (D-009/D-010). No transaction capability, provider, live-availability guarantee, or automatic import selected.

**Trip budget:** Supplied low/high range excludes plane tickets (D-014), per person (D-016). Personal numerical bounds stay in chat. Currency, total/remaining meaning, and category inclusions remain open. It is not app funding or permission to spend.

**Events and restaurants:** Account for reservation requirements (D-015). Requirement, booking state, and payment state need distinct meanings; exact rules open. No automatic booking, monitoring, reminders, notifications, or guaranteed availability approved.

## Ranked product standards — D-018

| Rank | Standard | First-version meaning |
| --- | --- | --- |
| 1 | High-quality suggestions. | Things the intended traveler would genuinely consider adding. A polished unappealing list is not success. |
| 2 | Real-time, on-the-fly planning. | Worthwhile nearby events and experiences for today, including festivals and pop-ups. |
| 3 | Seamless functionality. | Useful tasks should be straightforward, not a chore. |

Same-day discovery is a **core first-version capability**, not later-only. Older advanced-replanning deferral proposals must not remove it. Continuous tracking, whole-trip automation, refresh intervals, providers, guaranteed inventory, and paid services remain unselected.

Sharing remains part of the concept. Extra reveal effects do not take priority over these standards. Correctness, privacy, reliability, and accessibility remain necessary.

The [standards note](planning/00-product-success-standards.md) separates priorities from proposed tests. No quality score, response target, coverage minimum, or working-product acceptance established. Recently fetched does not mean recently verified; an event today is not necessarily reachable or bookable now.

### Organizer preference examples — D-019

Positive examples: scenic beach view, snorkeling, and oceanside dinner in one outing; scenic ATV exploration with a distinctive local element. Standalone novelty-object and historical-statue stops are negative examples.

The interpretation favors scenery, participation, local character, and complementary experiences for this organizer. It is not a ban on history/sightseeing for everyone, not companion preferences, and not a requirement for every result to be a multi-part adventure. No actual offering or seasonal availability verified for the pilot.

### Discovery sources and evidence — D-021

The owner reports discovering activities through **real experiences, positive Reddit posts, highly rated reviews, calendars for relevant time frames, and popular destination-related must-see or must-experience events**. D-022 adds local recommendations and cultural experiences alongside these inputs.

These are recorded source preferences, not selected integrations. The proposed approach is to use firsthand/community/review evidence to assess appeal, calendars to identify dated occurrences, and suitable current organizer/venue/operator information to verify material logistics. Positive feedback is not proof of present availability or a reservation. Popularity should inform, not override, personal fit.

No review threshold, source weight, minimum count, subreddit, particular calendar, API, scraper, account import, paid access, or content-use permission chosen. Do not invent source-backed labels or testimonials. The full source-checking proposal and open questions are in the standards note. No actual posts, reviews, calendars, or events were fetched for this update.

**Q-006 progress:** Discovery sources are answered. The most frustrating step and the process for organizing discoveries remain open; do not state assumed pain points as user-confirmed facts.

### Local recommendations and cultural experiences — D-022

**Confirmed:** Include both in discovery and trip planning. The [standards note](planning/00-product-success-standards.md#local-recommendations-and-cultural-experiences--d-022) contains the detailed addition.

**Proposed distinction:** Local recommendations are advice from residents, local guides, community hosts, or locally based sources—not simply nearby places. Cultural experiences concern what a traveler can learn, do, or observe, such as food traditions, crafts, performances, or public festivals. Examples are possibilities to evaluate, not selected or verified offerings.

For this organizer, emphasize participation and meaningful context without making culture adventure-only or excluding history. Popular attractions can also be locally recommended. Support local-endorsement claims with actual source context; do not invent “locals love it,” authenticity, or exclusivity labels. Explain relevant language, participation, visitor access, etiquette, timing, and reservation requirements where supported.

Specific sources, category boundaries, local-source verification, ranking, and pilot coverage remain open. This does not approve a guide marketplace, host accounts, paid partnerships, transactions, or source access. The existing Q-006 frustration question remains unanswered; inclusion itself does not need reconfirmation.

### Experience formats — D-020

**Confirmed:** Both ready-made provider excursions and app-assembled combinations. Q-012 resolved. An app-created sequence is not automatically one actual package, price, or reservation; verify operator inclusions and separate components' timing, costs, travel, and booking needs.

**Proposed durations:** The owner suggested shorter/all-day activities tentatively. Hours, buckets, filters, and defaults remain Q-212. Format and duration are separate; either format may suit a short or longer outing, without a verified inventory promise.

**Proposed planning:** Match total available time, including relevant travel and reservations, not merely advertised activity length. Short is not filler; all-day need not fill every minute. No automatic booking, algorithm, or alteration of a fixed operator itinerary approved.

## Confirmed project priorities

| Priority | Goal | Boundaries |
| --- | --- | --- |
| Immediate | First full test November 10, 2026, for the Japan pilot including Tokyo and two travelers. | Free-first; target, not guarantee. Detailed specifications, capacity, source access/coverage, other cities, and devices open. |
| Ultimate | Commercial app-store/SaaS offering earning subscriptions and ad revenue. | Greater investment after owner acceptance. Distribution, pricing, ad behavior, public-launch date open. |

See **D-006 through D-022** in the [decision register](planning/decisions.md).

The pilot is not public launch or a nationwide-coverage promise. Tokyo included does not mean Tokyo-only. A successful personal trip is evidence, not proof of broad demand or revenue.

**Timing:** November 10, 2026 is the approved test target (D-012). Private travel values establish a late-November to early-December window with a late-day arrival and midday departure in Tokyo-local time (D-013). Exact dates/times stay in chat. Airport events, transfers, hotels, and usable activity time must remain distinct; buffers/rules open.

## Adopted app budget rule — free first

**D-017:** Prefer suitable free options until spending is necessary. Retain **$100/month as an initial paid-operation reference and $150 as a flexible upper reference**, not fixed ceiling, required spend, or purchasing authority.

Aim for $0 additional app-service costs while practical. Do not activate tiers because they appeared in comparisons. Development tools, one-time purchases, enrollment, and unpriced data agreements remain separate.

Before spending, identify the blocked requirement, free alternatives, charges/limits, and consequence of waiting; obtain a specific decision. Greater discretionary investment follows a working product judged against D-018, informed by D-019's preferences. Detailed acceptance remains open; necessary earlier expenses need separate decisions.

Free-first does not remove capabilities, imply free access to Reddit/reviews/calendars/local sources, or turn simulations into current evidence. Investigate source rights, coverage, and costs before relying on them. Disclose paid dependencies without activating them.

**Next discussion:** Q-006 — which part takes most effort: finding worthwhile options, checking dates/booking requirements, or combining them into a practical plan? These are examples, not assumed frustrations. Source preferences are recorded under D-021 and local/cultural inclusion under D-022; do not re-ask them. Duration detail remains for journeys; full promise, capacity, and measurable acceptance stay open.

## Planning workflow

```text
Draft one section
    → Discuss its open questions
    → Record decisions and evidence
    → Obtain section approval
    → Update planning status
    → Move to the next section
```

The chat is discussion; the repository is the maintained record. Sections proceed sequentially. Saving a draft does not approve proposals.

### Decision labels

| Label | Meaning |
| --- | --- |
| CONFIRMED | Explicitly selected or approved. |
| PROPOSED | Suggested, awaiting a decision. |
| ASSUMPTION | Belief needing evidence. |
| OPEN | Unresolved question. |
| DEFERRED | Explicitly postponed. |
| REJECTED | Deliberately excluded. |

Reported preferences and source practices are recorded inputs, not validated market or technical facts. Draft documents may contain confirmed decisions.

## Design before implementation

Codex implementation follows explicit design-transition approval. Until then, this workflow is documentation-only: no scaffolding, dependency installation, provisioning, endpoints, or database creation to fill planning gaps.

Design completion means sufficiently defined direction, first-release scope, journeys, constraints/risks, and first buildable slice—not every future feature. Dates, standards, preferences, formats, sources, or spending policy do not approve coding.

Base code on approved decisions. Surface missing product behavior or conflicts instead of silently choosing permissions, providers, or data guarantees.

## Current boundaries

No stack, database, identity system, AI model, data provider, permission model, sharing access, complete pilot scope, or commercial scope selected. Confirmed capabilities, including same-day planning, both formats, and local/cultural discovery, remain in place.

Additional cities, airports, transfers, hotels, and practical activity windows open. Flight times do not establish hotel-ready times. Organizer-led collaboration proposed. Provider examples/prices need verification before selection; no hotel, event, reservation, timetable, excursion, review, local-guide, or price-comparison integration chosen. Naming Reddit is not choosing an access method or marketing channel.

Subscription/ad intent does not authorize billing/ads now. Free-first is not automatic removal of monetization features. Delivery format open.

Planning or recommending bookings does not authorize transactions, cancellations, or modifications. Same-day functionality does not authorize background tracking, notifications, or monitoring. App combinations are not automatically sold or booked together.

Travel-budget estimates, paid amounts, bounds, and excluded costs remain distinct. Lower bound is not required minimum spending; upper firmness open. Per-person does not force equal split of every expense. App-budget flexibility does not imply travel-budget flexibility.

## Public repository

Keep private financial amounts, exact travel dates/times, detailed schedules, credentials, companion identities, bookings, and identifying research responses out of commits. Use fictional/redacted examples. Omitted private inputs are not missing answers; consult the conversation. Milestones, generalized standards, source categories, and app cost references are planning material, not personal account histories.

## Update rules

1. Update affected sections and resolve contradictions when choices change.
2. Record decisions and update corresponding questions.
3. Use `planning/blueprint.md` for section order and approval tracking.
4. Keep later work broad; detail the next selected implementation slice only.
5. Preserve application code and unrelated files during planning updates.
