# Sprint 1 — Foundation + Trip Skeleton

**Status:** ACTIVE  
**Started:** 2026-09-21  
**Branch:** `sprint-1-foundation`

## Objective

Create the smallest real application foundation that persists a multi-city Trip and exposes the approved Home / Itinerary / Discover navigation.

## Approved implementation scope

- Next.js / TypeScript application shell
- PostgreSQL
- Prisma 7 data layer/migrations
- deterministic prototype owner seam
- Trip persistence
- Trip Segment persistence
- Day persistence/regeneration
- minimal TripPreferenceProfile
- date-only domain rules
- valid shared transfer boundaries
- true-overlap rejection
- temporary Unassigned dates
- atomic Segment reorder
- responsive Home / Itinerary / Discover shell
- deterministic development seed
- automated domain tests

## Current implementation

Initial foundation work is active on the Sprint 1 branch.

## Completion evidence required

Before this sprint can move to COMPLETE:
- typecheck passes
- lint passes
- automated tests pass
- database-backed integration checks pass
- core end-to-end path passes
- fresh migration succeeds
- reset/reseed succeeds
- desktop manual check passes
- phone-width manual check passes
- known issues are documented
- zero known blocker/data-integrity defects remain
- D-115 completion report is produced
