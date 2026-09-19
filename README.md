# OnToTheNext — Travel App Planning

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

**Phase:** Product design and planning  
**Current blueprint section:** 1 — Product Vision and Problem Brief  
**Current section status:** Draft; not yet approved  
**First complete test target:** November 10, 2026 — approved planning target  
**Implementation:** Not started through this planning workflow  
**Last updated:** 2026-09-19

`OnToTheNext` is the repository name. The final product name has not been confirmed.

## Start here

| Document | Purpose | Status |
| --- | --- | --- |
| [Planning blueprint](planning/blueprint.md) | The detailed, reusable framework for progressing from product vision to a buildable first release. | Adopted planning framework; not approval of every proposed feature. |
| [Product vision and problem brief](planning/00-product-brief.md) | The current section, populated from the supplied app concept and confirmed objectives. | Draft for discussion. |
| [Decision register](planning/decisions.md) | Explicitly confirmed decisions, with their reasoning and boundaries. | Maintained as decisions are made. |
| [Open questions](planning/open-questions.md) | Unresolved questions organized by blueprint section. | Only the current section's questions are active. |

## Confirmed core use case

An organizer plans a trip they are taking and shares the plan with their travel companions. The primary experience is **“Look what I planned for us,”** rather than planning a fully secret trip for somebody else.

The product direction connects three jobs:

- **Discover:** Help the organizer find experiences that fit the group.
- **Organize:** Turn selected possibilities into realistic, enjoyable days, accounting for hotels and transportation as well as activities.
- **Delight:** Make receiving the itinerary personal and exciting without making practical trip details difficult to access.

**Initial pilot audience:** A couple, **two travelers total**: one organizer and one companion (D-008). This does not make the commercial service couples-only, impose a two-person product limit, or decide companion permissions.

**Hotels and transportation:** Both areas are included (D-009), and each must support **organizing existing bookings and recommending options before booking in the first version** (D-010). Purchasing reservations is a separate, undecided capability. No provider, live-price/availability guarantee, automatic booking import, or direct transaction capability is selected by these decisions.

## Confirmed priorities

| Priority | Goal | Boundaries |
| --- | --- | --- |
| Immediate | First complete test targeted for November 10, 2026, ahead of the Japan-trip pilot including Tokyo and two travelers. | Target approved, not a delivery guarantee. Detailed feature specifications, capacity, costs, additional cities, and devices remain open. |
| Ultimate | Launch commercially through a mobile app store or as a SaaS product, earning subscription and ad revenue. | Distribution approach, pricing, ad behavior, implementation timing, and launch date remain open. |

See decisions **D-006 through D-013** in the [decision register](planning/decisions.md).

The pilot is not a public-launch deadline. Japan is the first testing context, not a promise of nationwide coverage or a permanent Japan-only product. Tokyo is confirmed, but a Tokyo-only trip is not. A successful trip would provide pilot evidence, not automatically validate customer demand or subscription revenue.

**Timing:** The owner approved **November 10, 2026** for the first complete test (D-012), establishing the 2026 pilot planning calendar. The late-November to early-December trip spans approximately two weeks and crosses a month boundary. The owner supplied Tokyo-local arrival/departure times (D-013): the pilot includes a late-day arrival and a midday departure. Exact private travel dates and clock times remain in the chat. The proposed scheduling approach should distinguish airport events, hotel arrival/departure, transfers, and usable activity time; exact rules and buffers remain open.

**Next discussion:** Q-004 — the monthly budget for running and testing the app, separate from the travel budget. The approved testing target/year, supplied travel timing, pilot group/count, project objective, revenue direction, and both hotel/transport support paths are answered; do not ask them again.

## Planning workflow

```text
Draft one section
    → Discuss its open questions
    → Record explicit decisions
    → Obtain approval of the section
    → Update the planning status
    → Move to the next section
```

The chat is the discussion space. This repository is the maintained planning record. Sections are completed sequentially; unresolved later topics are recorded rather than prematurely settled.

Publishing a draft to GitHub does **not** approve its proposals.

### Decision labels

| Label | Meaning |
| --- | --- |
| CONFIRMED | Explicitly chosen or approved by the project owner. |
| PROPOSED | A suggested direction awaiting a decision. |
| ASSUMPTION | A belief that needs evidence or testing. |
| OPEN | An unresolved question. |
| DEFERRED | Explicitly postponed, not silently forgotten. |
| REJECTED | Considered and deliberately excluded. |

A confirmed product choice is not automatically a validated market assumption. A whole document can remain a draft while containing individual confirmed decisions.

## Design before implementation

Codex will be used to implement the app after the design phase. Until that phase is explicitly approved as complete, work through this planning workflow is documentation-only: do not scaffold the app, choose a stack, install dependencies, provision services, implement endpoints, or create a database merely to fill a planning gap.

Design completion means the product direction, first-release scope, main journeys, important constraints and risks, and first buildable delivery slice are sufficiently defined. It does **not** mean specifying every future feature. Approval of a testing target is not approval of the design-to-implementation transition.

Future implementation should use the approved planning documents as its basis. Proposed features, unresolved permissions, example providers, and hypothetical technical choices are not implementation instructions. Conflicts or missing product decisions must be surfaced rather than silently invented.

## Current boundaries

No technology stack, database, authentication system, AI model, data provider, companion-permission model, sharing-access policy, complete pilot scope, or final commercial-release scope has been selected. Individual confirmed first-version capabilities, including D-010, must be preserved while those remaining decisions are made.

The pilot's Japan/Tokyo context, date window, local arrival/departure times, two-traveler group, and dated testing target are supplied or confirmed. Additional destinations, airports, transfer durations, hotel check-in/out, and practical activity windows are not. Flight times alone do not establish hotel-ready times or when to leave the hotel. Organizer-led collaboration remains a proposal. Google Places, Google Routes, and Ticketmaster were examples in the supplied concept, not selected integrations; their current capabilities, terms, coverage, and cost would need evaluation when relevant. Hotel and transport coverage does not select accommodation, transport-timetable, reservation, or price-comparison providers.

Subscription and ad revenue are confirmed intentions, not a finalized free/paid tier model or authorization to implement billing/ads now. A pilot without monetization is a proposed scope boundary to review, not an already approved feature exclusion. App-store or SaaS delivery has not settled the pilot's platform or technical architecture.

A proposed exclusion of in-app booking/payment does not exclude organizing existing hotel/transport bookings or recommending options. Both are confirmed first-version capabilities. Exact entry methods, recommendation behavior, modes, coverage, and data verification remain open. Do not silently defer one selected capability to a later release; any change requires an explicit scope decision.

## Public repository

This repository is public. Record only minimum non-sensitive milestone context and anonymous pilot profiles. Keep exact private travel dates/times, detailed schedules, credentials, companion names, private booking information, identifying research responses, and other sensitive material out of commits. Use fictional or redacted examples for planning and testing. Omitted private travel values are not missing user input; consult the planning conversation rather than asking the owner to repeat them. The software-testing target is a project milestone, not a published flight schedule.

## Update rules

1. Update the relevant section when a decision is made; do not leave contradictory versions in place.
2. Record confirmed decisions in `planning/decisions.md` and close or revise the matching open question.
3. Use `planning/blueprint.md` as the section-order and completion tracker.
4. Keep later features broad until their turn. Specify the next implementable slice precisely only after its product direction is approved.
5. Preserve existing application code and unrelated files when making planning updates.
