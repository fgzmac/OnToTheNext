# D-094 — Approve roadmap order and Sprint 1 Foundation + Trip Skeleton scope

**Status:** CONFIRMED Section 9 roadmap/sprint decision. Future sprint details remain intentionally flexible and will be refined after each milestone.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed milestone order and Sprint 1 scope.  
**Related:** Approved Sections 1–8; Section 9 Roadmap and Sprint Brief.  
**Blueprint:** Section 9 remains DRAFT pending closeout.

## Approved milestone order

1. Foundation + Trip Skeleton
2. Discover Core
3. Itinerary Builder
4. Reservation Workflow
5. Mobile Today
6. Discover Map + Planning Hotels
7. Expenses
8. Share Trip
9. Companion Viewing
10. Provider Integration Hardening
11. First Complete Software Test

The previously approved target remains **November 10, 2026** for the first complete software test.

This target is not a public launch date.

## Approved Sprint 1 objective

Build the smallest real vertical foundation that can create and persist a multi-city Trip and expose the approved primary navigation.

## Sprint 1 scope

### Project foundation
- Next.js
- TypeScript
- PostgreSQL
- Prisma
- environment configuration
- baseline lint/typecheck/test setup

### Initial domain persistence
- Trip
- Trip Segment
- Day
- Trip Preference Profile placeholder

### Initial capabilities
- create Trip,
- read Trip,
- create/update/reorder Trip Segments,
- generate/read Days from Trip/Segment date ranges,
- persist all of the above in PostgreSQL.

### Initial UI shell
Responsive:
- Home
- Itinerary
- Discover

The UI must preserve the approved navigation rules:
- one feature, one canonical home,
- no duplicate top-level navigation,
- no unnecessary dashboards or utility tabs.

## Sprint 1 exclusions

Do not build yet:
- recommendation engine,
- recommendation cards,
- Map,
- hotel search,
- reservation workflow,
- expense ledger,
- Share Trip,
- companion access,
- production authentication,
- production security/privacy hardening,
- external provider integrations.

## Sprint 1 exit criteria

Sprint 1 is complete when:
- the application runs locally,
- PostgreSQL connectivity works,
- Prisma migrations work,
- a Trip persists,
- multi-city Segments persist and can be reordered,
- Days render in the correct order,
- Home / Itinerary / Discover navigation works at desktop and mobile widths,
- no feature has duplicate navigation homes,
- typecheck and automated tests pass.

## Roadmap execution rule

Do not over-specify every future sprint before implementation begins.

After each milestone:
1. validate the finished behavior,
2. incorporate findings,
3. then detail the next sprint.

This preserves the approved iterative planning/build approach.
