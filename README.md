# OnToTheNext — Travel App Planning

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

**Phase:** Product design and planning  
**Current blueprint section:** 1 — Product Vision and Problem Brief  
**Current section status:** Draft; not yet approved  
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
- **Organize:** Turn selected possibilities into realistic, enjoyable days.
- **Delight:** Make receiving the itinerary personal and exciting without making practical trip details difficult to access.

## Confirmed priorities

| Priority | Goal | Boundaries |
| --- | --- | --- |
| Immediate | Develop and test the app for a November Japan-trip pilot. | Comes first. Year, exact dates, cities, readiness deadline, devices, and feature scope remain open. |
| Ultimate | Launch commercially through a mobile app store or as a SaaS product, earning subscription and ad revenue. | Distribution approach, pricing, ad behavior, implementation timing, and launch date remain open. |

See decisions **D-006** and **D-007** in the [decision register](planning/decisions.md).

The pilot is not a public-launch deadline. Japan is the first testing context, not a promise of nationwide coverage or a permanent Japan-only product. A successful trip would provide pilot evidence, not automatically validate customer demand or subscription revenue.

**Next discussion:** The initial pilot's companion group and traveler count (Q-003). The project objective and high-level revenue direction are answered; do not ask them again.

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

Design completion means the product direction, first-release scope, main journeys, important constraints and risks, and first buildable delivery slice are sufficiently defined. It does **not** mean specifying every future feature.

Future implementation should use the approved planning documents as its basis. Proposed features, unresolved permissions, example providers, and hypothetical technical choices are not implementation instructions. Conflicts or missing product decisions must be surfaced rather than silently invented.

## Current boundaries

No technology stack, database, authentication system, AI model, data provider, companion-permission model, sharing-access policy, detailed pilot scope, or final commercial-release scope has been selected.

The pilot's Japan context is confirmed; its exact destination coverage and multi-city needs are not. Organizer-led collaboration remains a proposal. Google Places, Google Routes, and Ticketmaster were examples in the supplied concept, not selected integrations; their current capabilities, terms, coverage, and cost would need evaluation when relevant.

Subscription and ad revenue are confirmed intentions, not a finalized free/paid tier model or authorization to implement billing/ads now. A pilot without monetization is a proposed scope boundary to review, not an already approved feature exclusion. App-store or SaaS delivery has not settled the pilot's platform or technical architecture.

## Public repository

This repository is public. Record only minimum non-sensitive milestone context. Keep credentials, detailed private travel schedules, companion names, private booking information, identifying research responses, and other sensitive material out of commits. Use fictional or redacted examples for planning and testing.

## Update rules

1. Update the relevant section when a decision is made; do not leave contradictory versions in place.
2. Record confirmed decisions in `planning/decisions.md` and close or revise the matching open question.
3. Use `planning/blueprint.md` as the section-order and completion tracker.
4. Keep later features broad until their turn. Specify the next implementable slice precisely only after its product direction is approved.
5. Preserve existing application code and unrelated files when making planning updates.
