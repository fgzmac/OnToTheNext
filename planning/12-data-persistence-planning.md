# Section 13 — Data and Persistence Planning

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–12; decisions D-001 through D-107.  
**Approval record:** None yet.

## Purpose

Define the Sprint 1 persistence model precisely enough for Prisma/PostgreSQL implementation.

This section covers:
- entities/tables,
- IDs,
- relationships,
- date fields,
- ordering,
- constraints,
- indexes,
- transactional behavior,
- migrations,
- development seed/reset behavior.

It does not yet authorize implementation.

## Sprint 1 persistent entities

Recommended minimal set:

### PrototypeUser
Represents the deterministic prototype owner seam.

Fields:
- `id`
- optional display label
- created/updated timestamps

This is intentionally minimal and replaceable later by the real User/Trip Membership model.

### Trip
Fields:
- `id`
- `ownerId`
- optional `name`
- destination label
- destination scope/type: city/base vs country/region
- `startDate`
- `endDate`
- traveler count
- optional rough budget/comfort placeholder
- created/updated timestamps

### TripSegment
Fields:
- `id`
- `tripId`
- destination/base name
- `arrivalDate`
- `departureDate`
- `position`
- created/updated timestamps

### Day
Fields:
- `id`
- `tripId`
- `date`
- nullable `primarySegmentId`
- `position`
- created/updated timestamps

A null `primarySegmentId` represents an Unassigned date during incomplete planning.

### TripPreferenceProfile
Sprint 1 placeholder only.

Fields may be intentionally minimal:
- `id`
- `tripId`
- optional JSON/future-safe placeholder or a small number of clearly approved fields

Do not prematurely model the full preference system in Sprint 1.

## Relationships

```text
PrototypeUser
└── Trips

Trip
├── TripSegments
├── Days
└── TripPreferenceProfile
```

A Day belongs to one Trip and may reference one primary Segment.

A TripSegment belongs to exactly one Trip.

## Date semantics

Use PostgreSQL `DATE` semantics for:
- Trip.startDate
- Trip.endDate
- TripSegment.arrivalDate
- TripSegment.departureDate
- Day.date

Do not use midnight UTC timestamps for these values.

Created/updated metadata may use normal timestamps.

## Proposed ID strategy

Use application-generated opaque IDs.

Recommended options:
- UUID
- CUID2

Avoid:
- exposing sequential database integers as the long-term public identity,
- deriving IDs from destination/date text.

Exact choice is the first Section 13 decision.

## Proposed uniqueness / constraints

### Trip
- `endDate >= startDate`
- traveler count >= 1

### TripSegment
- unique `(tripId, position)`
- `departureDate >= arrivalDate`
- dates must fall within Trip dates; enforced in application/domain transaction rather than cross-table CHECK constraint
- overlap/boundary validation enforced in application/domain layer

### Day
- unique `(tripId, date)`
- unique `(tripId, position)`
- `primarySegmentId`, when non-null, must belong to same Trip; enforce through application logic plus FK constraints where practical

### TripPreferenceProfile
- at most one profile per Trip

## Indexes

Sprint 1 likely needs:
- Trip.ownerId
- TripSegment.tripId + position
- Day.tripId + date
- Day.tripId + position
- Day.primarySegmentId

Avoid speculative indexes beyond real query paths.

## Ordering

Segment and Day positions should use explicit integer positions.

Server owns:
- Segment reorder,
- Day generation/order.

The UI should not directly mutate arbitrary position values.

## Day regeneration persistence strategy

When Trip/Segment dates change:

Within one transaction:
1. validate proposed Trip/Segment structure,
2. persist structural change,
3. recompute expected Days,
4. upsert/create/delete Day records to match the expected date set,
5. assign primary Segment or null for Unassigned,
6. normalize Day positions,
7. commit.

If any step fails:
- roll back the entire transaction.

## Deletion behavior

### Remove Segment
- remove Segment,
- regenerate Days,
- affected dates may become Unassigned.

### Delete Trip
Not required as a user-facing Sprint 1 feature unless implementation needs it for development.

If supported internally:
- dependent Segment/Day/Preference records should cascade or be removed transactionally.

Exact cascade policy should remain explicit in Prisma schema.

## Seed / reset

Development seed:
- deterministic PrototypeUser,
- optional deterministic Japan Trip,
- Tokyo / Kyoto / Osaka / Tokyo Segments,
- generated Days.

Rules:
- reseeding is predictable,
- app works with no seed,
- seed is never required by production logic.

Development reset may:
- drop/reset dev database,
- rerun migrations,
- apply seed.

No user-facing reset feature.

## Migration policy

Sprint 1:
- Prisma migrations checked into Git,
- schema changes go through migrations,
- avoid manual production-schema edits,
- development reset is acceptable while no valuable user data exists.

Later, once real trip data matters:
- destructive migrations require explicit migration/data-preservation planning.

## First Section 13 decision

**Q-1201:** Which opaque ID format should Sprint 1 use?

**Recommended direction:** use **CUID2** (or Prisma-supported CUID-style opaque IDs) for application entities.

Why:
- generated in the application,
- URL-safe,
- non-sequential,
- easy with Prisma,
- convenient for a web-first prototype.

UUID would also work, but there is no strong V1 requirement that favors UUID interoperability yet.

**Confirmed direction — D-108:** use CUID2/CUID-style opaque IDs for Sprint 1 app-owned entities.


## Next decision — Sprint 1 TripPreferenceProfile persistence

**Q-1202:** How much preference data should Sprint 1 persist before Discover exists?

**Recommended direction:** keep `TripPreferenceProfile` deliberately minimal and structured.

For Sprint 1, persist only fields that already have clear product meaning, for example:
- optional rough budget/comfort label or range,
- optional planning note,
- timestamps.

Do **not** add a generic JSON blob for dozens of future preference fields.

Why:
- Sprint 1 does not use recommendation logic yet,
- generic JSON would hide an undefined schema rather than solve it,
- later Discover work can add real typed preference fields through migrations,
- keeps the first database honest and small.

If a field is not used by Sprint 1 behavior, prefer to omit it rather than create a speculative placeholder.

**Confirmed direction — D-109:** Sprint 1 uses a minimal typed TripPreferenceProfile with no catch-all future-preferences JSON blob.


## Next decision — Day regeneration persistence strategy

**Q-1203:** During Sprint 1 Day regeneration, should the database treat `(tripId, date)` as the stable Day identity boundary and reconcile the set from that key?

Recommended behavior:

For the expected Trip date range:
- one Day per `(tripId, date)`,
- create missing dates,
- update `primarySegmentId` / position for existing dates,
- remove Day rows whose dates are no longer inside the Trip after a confirmed Trip-date change.

This keeps `Day.id` opaque, but makes the logical uniqueness deterministic.

Example:

```text
Trip A + 2026-11-28
→ exactly one Day row
```

Constraints:
- unique `(tripId, date)`,
- unique `(tripId, position)`.

Because Sprint 1 has no real Itinerary Items yet, deleting obsolete Day rows during regeneration is safe.

Later, once Days have itinerary content, Day deletion/remapping must become migration-aware.

**Recommended direction:** reconcile Days by unique `(tripId, date)` during Sprint 1 regeneration.
