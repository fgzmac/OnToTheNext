# Sprint 1 — Foundation + Trip Skeleton

**Status:** Implementation verified locally; awaiting CEO/TPM acceptance and current-head CI gate.
**Started:** 2026-09-21
**Engineering audit:** 2026-09-22
**Branch:** sprint-1-foundation
**Pull request:** [#1](https://github.com/fgzmac/OnToTheNext/pull/1)

## Approved scope and implementation

The existing implementation was reviewed against the blueprint, approved Sections
9–14 and decisions D-094 through D-117. Later confirmed decisions take precedence.
This is the existing Sprint 1 foundation, not a replacement implementation.

- Next.js / React / TypeScript responsive Home, Itinerary and Discover placeholder.
- PostgreSQL 17 and Prisma schema/migration: PrototypeUser, Trip, TripSegment, Day
  and a minimal typed TripPreferenceProfile.
- ISO calendar dates backed by SQL DATE columns; metadata alone uses timestamps.
- Trip and Segment validation, repeated cities, shared transfer boundaries,
  start-of-day ownership, explicit Unassigned dates, and server-owned Day regeneration.
- Day reconciliation preserves surviving date identities and normalizes positions.
- Segment removal preserves Days; Trip deletion cascades its children, preserving owner.
- Complete-list reorder validation and structural writes/regeneration in one transaction.
  A reorder that contradicts unchanged dates is rejected visibly.
- One prototype-owner seam and a synthetic Japan seed, with no seed dependency for creation.

## Audit fixes

1. Seed comparisons mixed SQL DATE midnight values with noon Date objects, assigning
   transfer dates incorrectly and leaving the final date Unassigned. Seeding now uses
   the same date-only Day planner as the application, within one transaction.
2. Malformed calendar dates could throw during validation. They now return a
   structural validation error.
3. The new reset wrapper resolved Prisma's package entry rather than its CLI binary.
   It now launches the declared binary from the installed package metadata.
4. Destructive integration fixtures could fall back to a normal DATABASE_URL.
   Tests now require an explicit, validated isolated TEST_DATABASE_URL; browser setup
   verifies actual database/user identity before clearing its isolated fixture.

No product redesign or later-sprint features were added.

## Runtime and infrastructure reconciliation

Web uses 3100. PostgreSQL uses host 5433 and container 5432.
Compose project remains ontothenext; volume remains ontothenext_ontothenext-postgres.
Options App resources are read-only and unchanged.

Portable AGENTS.md and DEVELOPMENT-STORAGE.md are committed. Machine-specific
boundary maps, mount helpers and backup records remain outside Git.
The lockfile is included and CI uses npm ci. Windows session setup keeps temporary
files/caches inside ignored .cache; Playwright uses PLAYWRIGHT_BROWSERS_PATH=0.

## Verification and acceptance

See [completion report](sprint-1-completion-report.md) for actual results and coverage.
Local verification passed: Prisma generation, clean migration, seed, guarded isolated
reset/reseed, typecheck, lint, 36 unit/safety tests, 8 PostgreSQL integration tests,
production build and 2 expanded Playwright tests. No tests skipped.

Desktop and 390x844 phone screenshots were reviewed for creation, Home/segment
editing, Itinerary, Discover, errors and Unassigned warnings. No blocker found.

The final handoff must verify CI on the pushed branch's actual head, using
[PR #1 checks](https://github.com/fgzmac/OnToTheNext/pull/1/checks).
An older green run is not current-head evidence. The PR remains unmerged.
Acceptance belongs to the CEO/TPM; Sprint 2 has not started.
