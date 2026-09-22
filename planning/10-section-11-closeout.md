# Section 11 Closeout — Detailed API Contract for Current Feature

**Lifecycle status:** IN REVIEW — awaiting explicit owner approval.  
**Recorded:** 2026-09-21.  
**Purpose:** Lock the Sprint 1 internal application contract for Trip / Segment / Day behavior before moving to implementation boundaries and simulated components.

## Contract scope

Current feature:
**Create Trip + Trip Segment + Day Skeleton**

Internal application only. No public API.

## Operations

### Trip
- `createTrip`
- `getTrip`
- `updateTrip`

### Segments
- `addSegment`
- `updateSegment`
- `reorderSegments`
- `removeSegment`

### Days
- `getDays`
- internal `regenerateDays`

## Result model — D-101

Expected domain validation uses:
- blocking `errors[]`
- non-blocking `warnings[]`

Rule:
> Incomplete planning is allowed. Invalid structure is not.

Examples of errors:
- invalid Trip date range,
- invalid Segment range,
- Segment outside Trip bounds,
- true Segment overlap,
- invalid reorder,
- persistence failure,
- Day-generation failure.

Examples of warnings:
- Unassigned dates,
- incomplete Segment sequence,
- another base still needs to be added.

## Date contract — D-102

Sprint 1 uses ISO date-only / database DATE semantics:

```text
YYYY-MM-DD
```

Do not use midnight UTC timestamps for Trip/Segment/Day calendar dates.

Exact timezone-aware date-times are added later for reservations and transportation.

## Day generation

Day generation is server/application owned.

The client does not calculate ownership or reconcile dates.

Generation applies:
- D-095 transfer-day ownership,
- D-097 shared transfer boundary,
- D-098 temporary Unassigned dates,
- D-099 automatic Sprint 1 regeneration.

## Segment reorder — D-103

`reorderSegments` receives the full ordered Segment ID list.

Validation:
- all IDs belong to Trip,
- no duplicates,
- no omissions,
- no foreign IDs.

Apply atomically.

Dates are not silently changed.

## Structural mutation response — D-104

Structural mutations return the refreshed canonical Trip skeleton:

```text
Trip basics
Ordered Segments
Regenerated Days
Unassigned-date summary
Warnings
Errors
```

The UI should not recreate structural logic locally.

## Atomicity

Structural mutation + Day regeneration occur transactionally.

If Day regeneration fails, the Trip must not be left half-updated.

## Read models

### Home
- Trip basics
- ordered Segments
- Unassigned-date context
- simple continue-planning state

### Itinerary
- ordered Days
- primary Segment
- Unassigned state where applicable

### Discover
- Trip context
- intentional Sprint 1 placeholder only

## Explicitly not included

- public API
- recommendation contract
- map/provider contract
- hotel contract
- reservation contract beyond future conceptual inventory
- expense contract
- sharing contract
- companion/auth contract

## Section 11 approval candidate

Approve Section 11 if this internal contract is implementation-ready.

Approval advances to **Section 12 — Implementation Boundaries and Simulated Components**.

Approval still does not authorize coding.
