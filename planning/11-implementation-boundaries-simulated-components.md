# Section 12 — Implementation Boundaries and Simulated Components

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–11; decisions D-001 through D-104.  
**Approval record:** None yet.

## Purpose

Define exactly what Sprint 1 should implement for real, what may be mocked or stubbed, and what must not be built yet.

The goal is to prevent accidental scope creep once coding starts.

## Sprint 1 implementation boundary

Sprint 1 is a real, persistent vertical slice for:

- Trip
- Trip Segment
- Day
- Home / Itinerary / Discover shell
- PostgreSQL persistence
- Prisma migrations
- structural validation
- responsive navigation
- basic automated tests

Everything outside that boundary is either:
- stubbed,
- represented as an intentional placeholder,
- or omitted entirely.

## Real components in Sprint 1

### Application
- Next.js
- React
- TypeScript

### Persistence
- PostgreSQL
- Prisma
- migrations

### Real domain behavior
- create Trip
- update Trip basics/dates
- add/update/remove Segment
- atomic Segment reorder
- server-owned Day regeneration
- transfer-day ownership
- shared transfer-date boundaries
- temporary Unassigned dates
- blocking errors / non-blocking warnings

### Real UI
- Create Trip flow
- Segment editing
- Home
- Itinerary
- Discover placeholder
- responsive mobile/desktop shell

### Real tests
At minimum:
- Trip date validation
- Segment range validation
- transfer-boundary rule
- true overlap rejection
- Unassigned-date warning
- Day ownership
- Day regeneration
- Segment reorder validation/atomicity

## Simulated / placeholder components

### Discover
Sprint 1 shows only an intentional empty/coming-next state.

No fake recommendation engine should be built.

### Authentication
No production auth.

Personal prototype may use:
- a single prototype owner identity,
- local/private access assumption,
- or a lightweight development-only identity seam.

Do not build account recovery, password flows, social auth, or guest onboarding yet.

### External providers
No maps, hotel APIs, recommendation sources, routing, weather, transit, FX, or booking-provider integrations in Sprint 1.

Provider adapter interfaces may exist only if required to keep boundaries clean, but they should not be implemented prematurely.

### File storage
No object-storage integration unless Sprint 1 unexpectedly requires persistent files, which it currently does not.

### Background jobs
None required in Sprint 1.

## Explicitly forbidden Sprint 1 creep

Do not add:
- recommendation cards,
- Map mode,
- hotel comparison,
- reservation states,
- expense tracking,
- Share Trip,
- companion flows,
- live inventory,
- notifications,
- offline sync,
- production-grade auth/security/privacy,
- native apps,
- public API,
- analytics dashboards.

## Prototype data

Development may use:
- seeded sample Trip data,
- Japan example data,
- deterministic test fixtures.

But the real user flow must still create/persist Trips through the application rather than depending only on seed data.

## Development identity seam

Recommended Sprint 1 approach:

Use one deterministic prototype owner identity inside the application layer.

Example concept:

```text
PrototypeOwner
└── owns personal Trips
```

Do not hard-wire owner assumptions deep into the domain schema.

Instead, keep a seam where real User/Trip Membership can be introduced later.

## Feature flags / stubs

Avoid a complicated feature-flag system in Sprint 1.

If an unfinished area appears in navigation:
- render an intentional placeholder,
- do not wire fake behavior.

Example:

```text
Discover

Your trip structure is ready.
Recommendations come next.
```

## Data reset strategy

For a personal prototype, support a simple development reset path such as:
- reset local/dev database,
- rerun migrations,
- reseed deterministic fixtures if desired.

Do not build a user-facing "factory reset" feature unless later needed.

## First Section 12 decision

**Q-1101:** Should Sprint 1 use a single deterministic prototype-owner identity behind the scenes, rather than implementing real authentication now?

**Recommended direction:** yes.

Reason:
- matches D-083,
- keeps personal-use testing simple,
- allows Trips to have an owner relationship from the start,
- preserves a clean seam for later User/Trip Membership,
- avoids wasting Sprint 1 on auth infrastructure.

Important:
The prototype owner should be isolated in one development/application boundary, not scattered as hard-coded checks throughout the codebase.
