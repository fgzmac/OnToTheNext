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
| [Planning blueprint](planning/blueprint.md) | The reusable framework and sequential progress tracker. | Adopted framework; examples are not blanket feature approval. |
| [Product vision and problem brief](planning/00-product-brief.md) | The current section populated from the concept and explicit decisions. | Draft for discussion. |
| [Product success standards](planning/00-product-success-standards.md) | Ranked standards, same-day discovery, organizer taste, both experience formats, and proposed evaluations/durations. | D-018/D-020 choices confirmed; D-019 examples recorded; duration options and detailed behavior remain proposed. |
| [App budget policy and options](planning/00-app-budget-options.md) | Free-first policy plus retained tier comparisons, example costs, and data-access risks. | D-017 policy confirmed; providers, purchases, and detailed controls unselected. |
| [Decision register](planning/decisions.md) | Confirmed decisions, reasoning, and boundaries. | Maintained as decisions are made. |
| [Open questions](planning/open-questions.md) | Unresolved questions organized by blueprint section. | Only the current section's questions are active. |

## Confirmed core use case

An organizer plans a trip they are taking and shares the plan with their travel companions. The primary experience is **“Look what I planned for us,”** rather than planning a fully secret trip for somebody else.

The product connects three jobs:

- **Discover:** Find genuinely appealing experiences, including relevant nearby events for same-day plans.
- **Organize:** Turn choices into realistic days, accounting for hotels, transportation, spending, and reservation-dependent events/restaurants.
- **Delight:** Make receiving the itinerary personal and exciting without obstructing practical trip details.

**Initial pilot audience:** A couple, **two travelers total**, one organizer and one companion (D-008). This does not make the commercial service couples-only, impose a permanent two-person limit, or settle permissions.

**Hotels and transportation:** Both areas must support organizing existing bookings and recommending options before booking in the first version (D-009/D-010). Purchasing reservations is separate and undecided. No provider, live-price/availability guarantee, automatic import, or transaction capability is selected.

**Trip budget:** The owner's supplied low/high range excludes plane tickets (D-014) and is per person (D-016). Private numerical bounds stay in chat. Currency, total-versus-remaining meaning, and other category inclusions remain open. It is not an app-running allowance or permission to spend.

**Events and restaurants:** Account for those requiring reservations (D-015). Requirement, booking state, and payment state need distinct treatment; detailed rules are proposed. No automatic booking, monitoring, reminder, notification, or guaranteed availability is approved.

## Ranked product standards — D-018

| Rank | Standard | Meaning for the first version |
| --- | --- | --- |
| 1 | High-quality suggestions. | Options must be things the intended traveler would genuinely consider adding to their itinerary. A polished list of unappealing options is not success. |
| 2 | Real-time, on-the-fly planning. | Help the traveler decide what to do today using worthwhile nearby events and experiences, including festivals and pop-ups. |
| 3 | Seamless functionality and ease of use. | Completing useful tasks should be straightforward, not a chore. |

Same-day nearby discovery is a **core first-version capability**, not merely a later enhancement. Older proposals to defer advanced replanning must not remove it. Continuous tracking, automatic whole-trip reorganization, exact refresh intervals, providers, guaranteed live inventory, and paid services remain undecided.

Personalized sharing remains part of the concept. Extra reveal effects do not take precedence over these standards. Basic correctness, privacy, reliability, and accessibility are not optional just because they are outside the ranked three.

The [standards note](planning/00-product-success-standards.md) separates confirmed priorities from proposed tests. No quality score, latency target, minimum coverage, or owner acceptance of the product has yet been established. A recently retrieved event listing is not automatically accurate or currently bookable; an event today is not necessarily reachable in the time available.

### Initial organizer's preference examples — D-019

The organizer would consider an excursion combining a scenic beach view, snorkeling, and an oceanside dinner, or scenic ATV exploration with something distinctive to the area. Standalone novelty-object and historical-statue stops are negative examples.

The working interpretation favors scenery, participation, local character, and connected experiences for this organizer. These are stated preferences, not a ban on history or sightseeing for all travelers, not the companion's preferences, and not a requirement that every recommendation be a multi-part adventure. No actual offering or seasonal availability has been verified for the Tokyo pilot.

### Experience formats — D-020

**Confirmed:** Offer both **ready-made provider excursions** and **app-assembled combinations of separate activities**. Q-012 is resolved. An app-created sequence is not automatically a real package with one price or one reservation; verify advertised inclusions for operator products and the separate timing, travel, costs, and booking needs of assembled components.

**User-proposed duration direction:** Offer shorter activities and all-day activities. The owner said “Maybe”; exact duration categories, hour limits, filters, and defaults remain open under Q-212. Format and duration should be evaluated separately: either format could suit a short outing or a longer day. No specific offering or coverage is verified by this possibility.

**Proposed planning rule:** Match the available time, including travel and relevant reservation constraints, rather than relying only on an activity's advertised length. Short does not mean filler; all-day does not mean every minute must be packed. No automatic booking, algorithm, provider choice, or permission to alter a fixed operator itinerary is established.

## Confirmed project priorities

| Priority | Goal | Boundaries |
| --- | --- | --- |
| Immediate | First complete test targeted for November 10, 2026, ahead of the Japan-trip pilot including Tokyo and two travelers. | Free-first. Target approved, not a delivery guarantee. Detailed specifications, capacity, data coverage, additional cities, and devices remain open. |
| Ultimate | Commercial mobile app-store/SaaS offering earning subscription and ad revenue. | Greater investment follows a working product meeting owner standards. Distribution, pricing, ad behavior, and launch date remain open. |

See decisions **D-006 through D-020** in the [decision register](planning/decisions.md).

The pilot is not a public-launch deadline or a promise of nationwide coverage. Tokyo is confirmed, but Tokyo-only is not. A successful trip can supply useful evidence without proving broader demand or subscription revenue.

**Timing:** November 10, 2026 is the approved first complete test target (D-012). The late-November to early-December trip spans a month boundary; supplied Tokyo-local times establish late-day arrival and midday departure context (D-013). Exact private dates/times remain in chat. Airport events, transfers, hotel timing, and usable activity windows must not be conflated; precise rules and buffers remain open.

## Adopted app budget rule — free first

**D-017:** Use suitable free options until an expense is necessary. Keep **$100/month as an initial paid-operation planning target and $150 as a flexible upper reference**, not a fixed ceiling, required spend, or purchase authority.

Aim for **$0 in additional app-service costs for as long as practical**. Do not activate paid tiers merely because they appeared in a comparison. Development tools, one-time purchases, store enrollment, and unpriced data agreements stay separate.

Before a paid commitment, identify the blocked requirement, free alternatives, expected charges/limits, and consequence of waiting; obtain a specific spending decision. Greater discretionary spending follows a working product the owner judges to meet the standards ranked in D-018 and informed by the personal examples in D-019. Detailed acceptance checks remain open; necessary earlier expenses are separate decisions, not blanket authorization.

Free-first does not remove confirmed features or turn simulated data into evidence of current recommendations. Investigate timely event coverage and other data-access risks before polishing a complete interface around untested assumptions. Disclose any paid dependency; do not promise every production capability will be free.

**Next discussion:** Q-006 — where the owner currently finds experiences they like and what is most frustrating about finding or organizing them. The format choice is answered in D-020; duration detail is recorded for later journey design. Do not re-ask the taste examples, format choice, priority order, budget policy, or per-person basis. The complete promise and measurable acceptance remain open.

## Planning workflow

```text
Draft one section
    → Discuss its open questions
    → Record decisions and evidence
    → Obtain section approval
    → Update planning status
    → Move to the next section
```

This chat is the discussion space; this repository is the maintained planning record. Sections are completed sequentially. Saving a draft is not approving its proposals.

### Decision labels

| Label | Meaning |
| --- | --- |
| CONFIRMED | Explicitly chosen or approved by the owner. |
| PROPOSED | Suggested, awaiting a decision. |
| ASSUMPTION | A belief that needs evidence. |
| OPEN | An unresolved question. |
| DEFERRED | Explicitly postponed. |
| REJECTED | Deliberately excluded. |

A confirmed choice is not automatically a validated market or technical assumption. A document can remain a draft while containing confirmed decisions.

## Design before implementation

Codex implementation begins after the approved design transition. Until then this workflow is documentation-only: do not scaffold, install dependencies, provision services, create endpoints, or design a database merely to fill a planning gap.

Design completion means sufficiently defined direction, first-release scope, main journeys, important constraints/risks, and the first buildable slice—not every future feature. Approving a date, standard, personal preference, format, or spending policy does not approve implementation.

Use approved decisions as the basis for future code. Do not silently decide proposed features, permissions, providers, freshness guarantees, or missing product behavior. Surface conflicts.

## Current boundaries

No stack, database, identity system, AI model, data provider, permission model, sharing-access policy, complete pilot scope, or commercial-release scope is selected. Confirmed capabilities, including D-018's same-day discovery and D-020's two formats, must be preserved while remaining decisions are made.

Additional destinations, airports, transfers, hotels, and practical activity windows remain open. Flight times alone do not establish hotel-ready times. Organizer-led collaboration remains proposed. Provider examples and cost references require verification before selection; no hotel, event, reservation, timetable, excursion, or price-comparison integration has been chosen.

Subscription and ad intent does not settle product tiers or authorize billing/ads now. Free-first development is not automatic exclusion of monetization features. Delivery format remains open.

Organizing or recommending bookings and accounting for reservation requirements do not authorize making, changing, or canceling them. Same-day discovery likewise does not authorize background location collection, automated booking, notifications, or ongoing monitoring. D-020 confirms recommending both formats, not selling components as a combined package or treating them as reserved together.

Travel-budget bounds, estimates, paid amounts, and excluded costs must not be conflated. Lower bound is not a minimum-spend requirement; upper-bound firmness is open. Per-person input does not imply an equal split of every shared charge. D-017's flexibility applies to app spending, not automatically to trip spending.

## Public repository

Keep private financial amounts, exact travel dates/times, detailed schedules, credentials, companion names, bookings, and identifying research responses out of commits. Use fictional/redacted examples. Omitted private inputs are not missing user input; consult the conversation instead of re-asking. Software milestones, generalized standards, and app cost references are project-planning material.

## Update rules

1. Update affected sections and resolve contradictions when a decision changes.
2. Record explicit decisions and update matching questions.
3. Use `planning/blueprint.md` as the section-order/completion tracker.
4. Keep later features broad; specify only the next selected slice in implementation detail.
5. Preserve application code and unrelated files during planning updates.
