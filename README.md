# OnToTheNext — Travel App Planning

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

**Phase:** Product design and planning  
**Current blueprint section:** 1 — Product Vision and Problem Brief  
**Current section status:** Draft; not yet approved  
**First complete test target:** November 10, 2026 — approved planning target  
**App spending policy:** Free first; flexible paid-operation references; no paid service authorized  
**Implementation:** Not started through this planning workflow  
**Last updated:** 2026-09-19

`OnToTheNext` is the repository name. Final product branding remains open.

## Start here

| Document | Purpose | Status |
| --- | --- | --- |
| [Planning blueprint](planning/blueprint.md) | Framework and sequential progress tracker. | Adopted framework, not blanket feature approval. |
| [Product vision and problem brief](planning/00-product-brief.md) | Current Section 1, including owner-reported planning problems and local/cultural coverage. | Draft; decisions through D-023 incorporated. |
| [Product success standards](planning/00-product-success-standards.md) | Ranked standards, taste, sources, formats, local/cultural inclusion, balanced-day needs, proposed evaluations. | Choices/inputs recorded; detailed behavior and thresholds open. |
| [App budget policy and options](planning/00-app-budget-options.md) | Free-first policy, retained cost scenarios, and access risks. | D-017 confirmed; no vendor or purchase selected. |
| [Decision register](planning/decisions.md) | Decisions and reported inputs, reasons, boundaries, history. | Maintained as planning progresses. |
| [Open questions](planning/open-questions.md) | Remaining questions by section. | Next: Q-004 weekly capacity. |

## Confirmed core use case

An organizer plans a trip they are taking and shares it with companions: **“Look what I planned for us,”** not primarily a fully secret trip for somebody else.

- **Discover:** Appealing experiences, relevant nearby events, local advice, and cultural opportunities.
- **Organize:** Coherent, enjoyable days considering stays, travel, spending, reservations, effort, and free time.
- **Delight:** Personal and exciting sharing without obstructing practical details.

**Pilot audience:** Couple, two travelers total (D-008); not a permanent size limit, couples-only market, identical preferences, or permission model.

**Hotels/transport:** Both organizing existing bookings and recommendations before booking belong in the first version (D-009/D-010). No transaction, import, provider, or live-availability guarantee selected.

**Trip budget:** Supplied low/high range excludes airfare (D-014), per person (D-016); private amounts in chat. Currency, total-versus-remaining meaning, and categories remain open. Not app funding or purchase authority.

**Reservations:** Account for events/restaurants requiring them (D-015). Requirement, booking state, and payment differ. Exact rules, transactions, monitoring, reminders, and notifications remain open.

## Planning problems and desired day balance — D-023

The owner reports difficulty deciding what to experience and where to go first; organizing choices sensibly; balancing demanding activities with free time for shopping and good food; finding events during the trip; and starting while coordinating travel, hotel proximity, and quality recommendations.

**Proposed problem statement:** Help a traveler move from many interdependent choices to a worthwhile, logically ordered trip that fits dates and travel arrangements while balancing substantial experiences with flexibility, shopping, and food.

These are recorded problems and desired outcomes, not measured results or an approved algorithm. The full [standards addition](planning/00-product-success-standards.md#current-planning-problems-and-desired-balance--d-023) separates proposed responses from confirmed input.

**Proposed direction:** Make starting manageable, reuse known details, consider hotel/travel context, explain suggested order, evaluate the day as a whole, and preserve desired flexible time. Do not automatically choose nearest-first, pack all gaps, require an already-booked hotel, or assign an unsupported energy score. Shopping/dining are not inherently low-effort or reservation-free. Exact pacing controls, free-time allocations, and conflict handling are later design questions.

Q-006's main problems, sources, and preference examples are answered. Exact organization tools and measured baseline remain research gaps, not reasons to repeat the broad frustration question.

## Ranked product standards — D-018

| Rank | Standard | First-version meaning |
| --- | --- | --- |
| 1 | High-quality suggestions. | Things the traveler genuinely wants to consider adding. |
| 2 | Real-time, on-the-fly planning. | Worthwhile nearby events/experiences today, including festivals and pop-ups. |
| 3 | Seamless functionality. | Useful tasks should be straightforward, not a chore. |

Basic same-day discovery is first-version work, not later-only. Whole-trip automation, ongoing GPS, refresh intervals, inventory guarantees, provider choices, and paid services remain open.

Sharing remains; elaborate effects cannot compensate for poor recommendations. Correctness, privacy, reliability, and accessibility remain necessary. No accepted numerical quality, latency, coverage, energy, or usability threshold exists yet. A fetched listing is not automatically verified, and today's event is not automatically reachable/bookable.

### Organizer taste — D-019

Positive examples: scenic beach/snorkeling/oceanside dinner; scenic ATV exploration with something locally distinctive. Standalone novelty-object and historical-statue examples are negative.

Interpretation: scenery, participation, local character, complementary experiences. Not a global history/sightseeing ban, companion taste, ability/risk assumption, or demand that every result be a multi-part adventure. D-023 now explicitly includes balance and free time. No actual Tokyo offering or seasonal availability verified.

### Discovery sources — D-021

Owner reports real experiences, positive Reddit posts, highly rated reviews, date-relevant calendars, and destination highlights. Sources are recorded preferences, not integrations.

Proposed use: firsthand/community/reviews support appeal; calendars identify dated events; suitable current venue/operator/organizer evidence helps check logistics. Popularity does not replace personal fit; praise does not secure availability. Preserve critical caveats and distinguish duplicated/conflicting evidence.

No review cutoff, weight, source count, subreddit/calendar, API/scraper, private history, paid access, reproduction rights, or training use selected. Do not invent source-backed labels, testimonials, or ratings. No real source retrieval was performed for this documentation update.

### Local recommendations and cultural experiences — D-022

Both are included. Proposed distinction: advice from residents/guides/locally based sources versus the subject of an experience, such as food, crafts, performances, customs, or history.

Illustrative workshops/walks/festivals are not verified offerings or a fixed taxonomy. Local need not mean obscure; culture need not mean adventure. Support endorsement, visitor access, language, etiquette, participation, and booking information with evidence. Do not fabricate authenticity, exclusivity, community agreement, or permission to enter restricted activities.

Specific sources, categories, labels, ranking, and coverage remain open. No guide marketplace, host accounts, partnerships, transactions, or account access approved.

### Formats and duration — D-020

Offer both real provider excursions and app-assembled combinations. A proposed sequence is not automatically one package, price, jointly available set, or reservation. Verify operator inclusions and separate components' timing, travel, costs, and booking needs.

Shorter/all-day options remain a tentative duration direction, not fixed hours, filters, or defaults. Format, length, and effort are separate. Proposed total-time checks should avoid double-counting included transfers or inventing shorter versions of fixed tours. Short is not filler; all-day does not mean every minute filled.

## Project priorities

| Priority | Goal | Boundaries |
| --- | --- | --- |
| Immediate | First full test November 10, 2026, ahead of the two-person Japan pilot including Tokyo. | Free-first; target, not guarantee. Capacity, exact scope, data coverage, devices, and additional cities open. |
| Ultimate | Commercial app-store/SaaS product earning subscriptions and ad revenue. | Greater investment after owner acceptance; distribution, pricing, ads, and public-launch date open. |

See decisions D-006 through D-023. Tokyo included does not mean Tokyo-only or nationwide coverage. The pilot is not public launch or proof of broad demand/revenue.

Private timing supplies late-November to early-December context with late-day arrival and midday departure in Tokyo-local time. Exact dates/times remain in chat. Do not confuse flights, transfers, hotel timing, and usable activity windows.

## Free-first budget — D-017

Aim for **$0 additional app-service cost** while suitable free options meet the need. Retain **$100/month and $150 as flexible paid-operation references**, not mandatory spending, fixed ceiling, automatic cutoff, or purchase authority.

Before spending, review blocker, free alternatives, smallest useful paid choice, charges/limits, and consequence of waiting, then obtain a specific decision. Necessary earlier expenses are separate from greater discretionary investment after a working product earns owner acceptance. Tools, one-time purchases, enrollment, and unpriced agreements stay separate.

Free-first does not remove requirements, imply free access to data, excuse unsafe handling, or make simulations verified evidence. Investigate dependencies early; disclose costs without activating services. Prior pricing examples require verification before selection or purchase.

**Next discussion:** Q-004 — how many hours per week can the owner realistically devote to planning, reviewing Codex's work, and testing before November 10? The main planning-frustration question is answered. Do not re-ask sources, tastes, formats, local/cultural inclusion, ranking, supplied timing, budget basis, or free-first policy.

## Planning workflow

```text
Draft one section
    → Discuss its remaining questions
    → Record choices and evidence
    → Obtain section approval
    → Update progress
    → Move to the next section
```

Chat is discussion; GitHub is the maintained record. A saved draft is not approval of its proposals.

**Labels:** CONFIRMED = explicit choice; RECORDED = self-report/input; PROPOSED = awaiting decision; ASSUMPTION = needs evidence; OPEN = unresolved; DEFERRED = explicitly postponed; REJECTED = deliberately excluded. User reports are not market validation or test results.

## Design before implementation

Codex follows explicit design-transition approval. Until then: documentation only, no scaffolding, dependency installation, infrastructure, endpoints, or database implementation to fill gaps.

Design completion means sufficient direction, scope, journeys, constraints/risks, and first buildable slice—not every future feature. Milestones, source preferences, budget rules, or problem reports do not approve coding.

No stack, identity system, AI model, provider, permission/sharing model, complete pilot scope, or commercial scope selected. Preserve confirmed choices and surface conflicts instead of inventing behavior. Free-first does not decide web/native/local-only delivery.

Bookings are not authorized by planning around them. Same-day planning does not authorize ongoing tracking or monitoring. Community/cultural sources do not approve a marketplace. Revenue intent does not approve implementing billing/ads now. App-budget flexibility does not change travel-budget rules.

## Public repository

Keep private finances, precise travel dates/times, detailed schedules, credentials, companion identities, bookings, personal histories, and identifying research data out of commits. Use fictional/redacted examples. Missing public values are not missing user answers; consult the conversation. Generalized needs, project milestones, and app-cost references are planning material.

## Maintenance

Update affected sections and corresponding questions/decisions together. Preserve prior reasoning. Use `planning/blueprint.md` for section order and approval status. Keep later work broad; detail the next implementation slice only when appropriate. Preserve code and unrelated files during planning updates.
