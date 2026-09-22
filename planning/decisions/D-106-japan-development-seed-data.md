# D-106 — Sprint 1 includes deterministic Japan development seed data

**Status:** CONFIRMED Section 12 implementation-boundary decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved deterministic Japan seed data for development/testing convenience.  
**Related:** D-032 approved Japan core-city schedule; D-094 Sprint 1 scope; D-105 prototype-owner identity; Section 12 Implementation Boundaries and Simulated Components.  
**Blueprint:** Section 12 remains DRAFT.

## Confirmed seed-data direction

Sprint 1 may include deterministic development seed data representing the Japan pilot.

Seed data may include:
- one Japan Trip,
- Tokyo Segment,
- Kyoto Segment,
- Osaka Segment,
- return Tokyo Segment,
- generated Days.

## Explicitly excluded from Sprint 1 seed data

Do not seed fake:
- recommendations,
- hotel candidates,
- reservations,
- expenses,
- Share Trip output,
- companion activity,
- provider responses.

Those features do not exist yet in Sprint 1.

## Rules

- The product must work when the database is empty.
- The real Create Trip flow remains the primary product path.
- Seed data is development/test-only.
- Reseeding should be deterministic.
- Seed data must not become a hidden dependency of the application.

## Why this is approved

- Faster UI iteration.
- Easier regression testing for repeated-city Segments.
- Easier transfer-day/boundary validation.
- Easier responsive testing without repeatedly recreating the same Trip manually.
