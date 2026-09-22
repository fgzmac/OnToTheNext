# Section 9 Closeout — Roadmap and Sprint Brief

**Lifecycle status:** IN REVIEW — awaiting explicit owner approval.  
**Recorded:** 2026-09-21.  
**Purpose:** Lock the implementation order and first sprint boundary before moving into detailed feature specification.

## Roadmap

1. **Foundation + Trip Skeleton**
2. **Discover Core**
3. **Itinerary Builder**
4. **Reservation Workflow**
5. **Mobile Today**
6. **Discover Map + Planning Hotels**
7. **Expenses**
8. **Share Trip**
9. **Companion Viewing**
10. **Provider Integration Hardening**
11. **First Complete Software Test**

Target for the first complete software test remains **November 10, 2026**.

This is not a public launch deadline.

## Build philosophy

Use vertical slices.

Prefer:
```text
small feature
→ real persistence
→ real UI
→ validate
→ next feature
```

over building many disconnected technical layers before any end-to-end behavior works.

External providers may remain mocked/manual until their integration materially improves a validated feature.

## Sprint 1 — Foundation + Trip Skeleton

### Objective
Create the smallest real application foundation that persists a multi-city Trip and exposes the approved navigation.

### Build
- Next.js
- TypeScript
- PostgreSQL
- Prisma
- environment configuration
- baseline lint/typecheck/tests

### Initial persistent concepts
- Trip
- Trip Segment
- Day
- Trip Preference Profile placeholder

### Capabilities
- create/read Trip
- create/update/reorder Segments
- generate/read Days
- persist state

### UI
Responsive primary navigation:
- Home
- Itinerary
- Discover

### Explicitly out of Sprint 1
- recommendations
- Map
- hotels
- reservations
- expenses
- Share Trip
- companion access
- production authentication/security/privacy
- external provider APIs

## Sprint 1 exit criteria

- application runs locally,
- PostgreSQL connection works,
- Prisma migration works,
- Trip persists,
- Segments persist/reorder,
- Days render correctly,
- Home / Itinerary / Discover work on desktop and mobile widths,
- approved canonical-navigation rule is preserved,
- typecheck/tests pass.

## Iterative sprint rule

Future sprint details are **not locked now**.

After each milestone:
1. validate the completed behavior,
2. capture issues/learning,
3. specify the next sprint.

This prevents the roadmap from becoming stale before implementation reaches later features.

## Section 9 approval candidate

Approve Section 9 if this implementation sequence and Sprint 1 boundary are correct.

Approval advances the blueprint to **Section 10 — Detailed Feature Specification**.

Approval still does **not** authorize implementation. The project remains in design/specification mode until the owner explicitly transitions to implementation.
