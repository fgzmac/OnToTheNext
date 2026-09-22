# Sprint 1 — Foundation + Trip Skeleton

**Status:** READY FOR REVIEW  
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


## Implementation result

Implemented on branch `sprint-1-foundation`:

- Next.js / React / TypeScript foundation
- PostgreSQL + Prisma schema and migration
- deterministic prototype-owner seam
- Trip persistence
- Trip Segment persistence
- Day persistence/regeneration
- minimal typed TripPreferenceProfile
- date-only domain rules
- valid shared transfer boundary behavior
- true-overlap rejection
- temporary Unassigned dates
- atomic Segment reordering
- rollback-safe structural transactions
- Home / Itinerary / Discover responsive shell
- deterministic Japan development seed
- unit, PostgreSQL integration, and Playwright browser tests
- GitHub Actions verification pipeline

## Verification

Latest full CI verification: **PASS**

https://github.com/fgzmac/OnToTheNext/actions/runs/35691340637

The successful run verified:
- dependency install
- Prisma generation
- fresh migration deploy
- deterministic seed
- database reset + deterministic reseed
- TypeScript typecheck
- ESLint
- unit/domain tests
- PostgreSQL integration tests
- production Next.js build
- desktop browser happy path
- phone-width navigation/overflow check

## Known issues / follow-up

No known blocker or data-integrity defects remain in approved Sprint 1 scope.

Low-risk notes:
- visual design is intentionally foundation-level, not final polish,
- production authentication/security/privacy remains deferred by D-083,
- manual owner visual acceptance is still required before Sprint 1 is formally accepted.

## Scope check

No later-milestone product feature was added:
- no recommendations,
- no Map,
- no hotel search,
- no reservations,
- no expenses,
- no Share Trip,
- no companion workflow,
- no external provider integrations.
