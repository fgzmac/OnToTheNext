# Section 13 Closeout — Data and Persistence Planning

**Lifecycle status:** APPROVED.  
**Recorded:** 2026-09-21.  
**Purpose:** Lock the Sprint 1 PostgreSQL/Prisma persistence model before moving to testing and release-readiness planning.

## Sprint 1 entities

### PrototypeUser
Minimal deterministic owner seam.

### Trip
Contains:
- opaque ID,
- owner ID,
- optional name,
- destination label/type,
- start/end DATE values,
- traveler count,
- minimal planning/budget context,
- timestamps.

### TripSegment
Contains:
- opaque ID,
- Trip ID,
- destination/base,
- arrival/departure DATE values,
- explicit position,
- timestamps.

### Day
Contains:
- opaque ID,
- Trip ID,
- DATE value,
- nullable primary Segment ID,
- explicit position,
- timestamps.

A null primary Segment means **Unassigned**.

### TripPreferenceProfile
Minimal typed Sprint 1 profile only.

No catch-all future-preferences JSON blob.

## ID strategy — D-108

Use CUID/CUID2-style opaque application IDs.

Provider IDs remain separate later.

## Date semantics

Use PostgreSQL `DATE` semantics for:
- Trip dates,
- Segment dates,
- Day date.

Created/updated metadata may use normal timestamps.

## Key constraints

### Trip
- end date >= start date
- traveler count >= 1

### TripSegment
- unique `(tripId, position)`
- departure >= arrival
- application/domain validation for Trip bounds and overlap rules

### Day
- unique `(tripId, date)`
- unique `(tripId, position)`
- nullable `primarySegmentId`

### TripPreferenceProfile
- maximum one per Trip

## Day reconciliation — D-110

Sprint 1 regenerates/reconciles Days using `(tripId, date)` as the logical uniqueness boundary.

Regeneration:
- creates missing dates,
- updates Segment assignment,
- normalizes position,
- removes dates outside a changed Trip range,
- preserves exactly one Day per Trip/date.

This is safe while Days have no real itinerary content.

## Segment deletion — D-111

Deleting a Segment does **not** delete Days.

Affected Days are:
- reassigned where valid,
- otherwise marked Unassigned.

## Trip deletion — D-112

Deleting a Trip removes:
- TripSegments,
- Days,
- TripPreferenceProfile.

PrototypeUser survives.

## Transactional structural updates

Trip/Segment structural changes and Day regeneration occur in one transaction.

If regeneration fails, the structural mutation rolls back.

## Indexes

Initial practical indexes:
- Trip.ownerId
- TripSegment.tripId + position
- Day.tripId + date
- Day.tripId + position
- Day.primarySegmentId

Avoid speculative indexing beyond real query paths.

## Seed/reset

Development may use deterministic Japan seed data.

Rules:
- product works with empty DB,
- real Create Trip flow remains required,
- seed is development/test-only,
- reset/reseed can be deterministic.

## Migrations

- Prisma migrations checked into Git.
- Schema changes go through migrations.
- No manual schema drift.
- Destructive development resets are acceptable while no valuable real user data exists.
- Later, real data requires explicit preservation/migration planning.

## Section 13 approval candidate

Approve Section 13 if this Sprint 1 persistence model is correct.

Approval advances to **Section 14 — Testing, Completion, and Release Readiness**.

Approval still does not authorize implementation.


## Approval record

**Approved by owner:** 2026-09-21.  
**Owner instruction:** “Approve section 13.”  
**Effect:** Advance to Section 14 — Testing, Completion, and Release Readiness. This approval does not authorize implementation.
