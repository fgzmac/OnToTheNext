# Section 14 — Testing, Completion, and Release Readiness

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–13; decisions D-001 through D-112.  
**Approval record:** None yet.

## Purpose

Define what Sprint 1 must prove before it can be called complete and before the project moves to the next implementation milestone.

This section focuses on:
- automated tests,
- manual acceptance checks,
- responsive checks,
- data-integrity checks,
- failure behavior,
- completion criteria,
- and handoff readiness.

It does not authorize implementation.

## Completion principle

Sprint 1 is complete only when the real vertical slice works end-to-end:

```text
Create Trip
→ build/reorder Segments
→ generate Days
→ persist
→ refresh/reopen
→ navigate Home / Itinerary / Discover
```

A partially wired UI or schema-only implementation does not count as complete.

## Automated-test layers

### 1. Domain/unit tests

Priority rules:

#### Trip dates
- valid start/end accepted
- end before start rejected
- traveler count below 1 rejected

#### Segment dates
- departure before arrival rejected
- Segment outside Trip range rejected
- valid shared transfer boundary accepted
- true overlap rejected
- repeated city/base allowed

#### Segment ordering
- complete ID list accepted
- duplicate IDs rejected
- missing IDs rejected
- foreign Segment ID rejected
- atomic reorder preserves all-or-nothing behavior

#### Day generation
- one Day per Trip/date
- chronological position
- transfer Day belongs to Segment where traveler starts the day
- Unassigned dates remain null-primarySegment
- repeated city Segments work
- Trip date shortening removes obsolete Sprint 1 Days
- date extension creates new Days

#### Segment deletion
- Days are preserved
- affected Days reassign when valid
- otherwise become Unassigned

### 2. Persistence/integration tests

Use a real test database or isolated PostgreSQL test environment for:
- Prisma migrations
- Trip creation
- Segment mutation + Day regeneration transaction
- rollback on failed regeneration/mutation
- unique constraints
- cascade Trip deletion
- non-cascade Segment→Day behavior
- reopen/read-after-write behavior

### 3. UI/integration tests

Cover:
- Create Trip form
- broad destination asks for first city/base
- specific city/base may create first Segment
- Segment add/edit/remove
- Segment reorder
- validation errors displayed
- warnings displayed without blocking save
- Home summary updates
- Itinerary Day list updates
- Discover placeholder renders intentionally

### 4. Small end-to-end suite

Core happy path:
1. Start from empty database.
2. Create a dated Japan Trip.
3. Add Tokyo / Kyoto / Osaka / Tokyo Segments.
4. Verify transfer boundaries.
5. Verify Days.
6. Reorder/edit a Segment where valid.
7. Refresh/reopen.
8. Confirm state persists.
9. Switch Home / Itinerary / Discover.
10. Confirm same Trip context remains.

## Manual acceptance checks

### Empty state
- empty DB shows Create Trip path clearly
- no hidden dependence on seed data

### Trip creation
- dates are understandable
- broad region vs specific city behavior works
- no giant onboarding flow

### Segment editing
- adding destinations feels straightforward
- gaps appear as Unassigned rather than errors
- true overlap is blocked clearly
- reorder does not alter dates silently

### Home
- simple summary only
- no readiness dashboard
- no later-feature widgets

### Itinerary
- Days are chronological
- Unassigned days are understandable
- no fake itinerary content

### Discover
- intentional placeholder
- no fake recommendation logic

## Responsive readiness

Test at minimum:
- desktop/laptop width
- modern phone width

Verify:
- no horizontal overflow
- primary navigation remains usable
- forms remain readable
- Segment list controls remain reachable
- Day list remains readable
- warnings/errors do not break layout

Exact breakpoint values can be chosen during implementation.

## Failure behavior

Manually test:
- database unavailable
- Trip save failure
- Segment save failure
- regeneration failure
- invalid reorder payload
- unexpected server error

Expected behavior:
- user sees a clear failure state,
- no silent data loss,
- no half-applied structural mutation,
- existing valid state remains intact when transaction fails.

## Migration readiness

Sprint 1 is ready only if:
- fresh DB can run migrations successfully,
- existing dev DB can apply current migration sequence,
- deterministic reset/reseed works,
- no undocumented manual schema edits are needed.

## Seed readiness

Japan seed data must:
- be deterministic,
- create repeated Tokyo Segments correctly,
- obey boundary rules,
- generate expected Days,
- be removable/resettable,
- not be required for normal app use.

## Definition of Done

Sprint 1 is done when all of the following are true:

### Functional
- Create Trip works.
- Segments work.
- Days generate correctly.
- Persistence survives refresh/restart.
- Home / Itinerary / Discover shell works.

### Validation
- invalid structures are blocked,
- incomplete structures can save with warnings,
- Unassigned days work,
- transfer boundaries work.

### Data integrity
- no duplicate Trip/date Days,
- no partial structural updates,
- reorder is atomic,
- deletion behavior matches D-111/D-112.

### Responsive
- core screens usable on desktop and phone widths.

### Quality
- typecheck passes,
- lint passes,
- required automated tests pass,
- end-to-end happy path passes.

### Scope
- no later-milestone features have slipped into Sprint 1.

## Release/readiness distinction

Sprint 1 completion is **not** a public release.

It means:
- the first vertical foundation is trustworthy enough to build Discover on top of,
- schema/domain behavior is stable enough for the next milestone,
- known defects are documented,
- no blocker remains in the Trip / Segment / Day foundation.

## First Section 14 decision

**Q-1301:** Should Sprint 1 require the full automated test stack above before it is considered complete, or allow some lower-risk UI checks to remain manual?

**Recommended direction:** require automated tests for domain rules, database transactions, and the core end-to-end happy path; allow lower-risk responsive/visual checks to remain manual during the personal prototype.

This balances reliability with speed.
