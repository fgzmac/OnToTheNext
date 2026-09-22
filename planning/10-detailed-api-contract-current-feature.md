# Section 11 — Detailed API Contract for Current Feature

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–10; decisions D-001 through D-100.  
**Approval record:** None yet.

## Purpose

Define the exact internal application contracts needed for the Sprint 1 feature:

> **Create Trip + Trip Segment + Day Skeleton**

This is still an internal application contract, not a public developer API.

The goal is to make implementation unambiguous while keeping transport details lightweight.

## Contract principles

### 1. Internal-only
These operations are consumed by the Next.js application.

No public API compatibility commitment is required.

### 2. Explicit domain actions
Use named operations for important transitions.

### 3. Dates are canonical inputs
Sprint 1 requires Trip and Segment dates.

### 4. Day generation is server-owned
The client does not invent or reconcile Day records itself.

### 5. Validation errors are structured
The UI should receive enough information to explain:
- invalid dates,
- real overlap,
- valid transfer boundary,
- unassigned dates,
- persistence failure.

## Proposed operation set

### Trip operations

#### createTrip
Creates the Trip and optionally the first Segment when the destination is already a specific city/base.

Input concept:
- optional name
- destination label/type
- start date
- end date
- traveler count
- optional rough budget/comfort context

Returns:
- Trip
- created first Segment if applicable
- generated Day summary if enough Segment coverage exists
- validation warnings, including Unassigned dates

#### getTrip
Returns canonical Trip state for the current Trip.

#### updateTrip
Simple maintenance for:
- name
- destination metadata
- traveler count
- dates

If dates change:
- server validates existing Segments,
- if save is confirmed and valid enough for Sprint 1,
- Days regenerate automatically.

### Segment operations

#### addSegment
Adds one Trip Segment.

Input concept:
- Trip ID
- destination/base
- arrival date
- departure date
- desired order position

Server:
- validates Trip date bounds,
- validates Segment range,
- validates overlap/boundary rules,
- persists Segment,
- regenerates Days.

#### updateSegment
Updates:
- destination/base
- arrival/departure
- position where appropriate

Server revalidates and regenerates Days after successful confirmed change.

#### reorderSegments
Input:
- Trip ID
- ordered Segment IDs

Server:
- verifies all Segment IDs belong to the Trip,
- verifies no duplicates/missing IDs,
- updates order atomically.

Dates are **not** silently rewritten when order changes.

If the reordered dates create an incoherent route, return warnings/errors rather than auto-fixing dates.

#### removeSegment
Removes a Segment.

Sprint 1 behavior:
- removal may create Unassigned dates,
- this is allowed during planning,
- Days regenerate accordingly.

### Day operations

#### getDays
Returns all Trip Days in chronological order, including:
- date
- primary Segment when assigned
- Unassigned state when no Segment owns that date

#### regenerateDays
Internal/application operation, not normally exposed as a standalone user-facing button.

Called after confirmed Trip/Segment date mutations.

Server applies:
- D-095 transfer-day ownership,
- D-097 shared transfer boundary,
- D-098 Unassigned-day behavior.

## Proposed response shape philosophy

Use explicit result envelopes rather than relying on thrown errors for expected validation.

Conceptually:

```text
Result
├── ok
├── data
├── errors[]
└── warnings[]
```

### Error
Fields may include:
- code
- message
- field
- related Segment IDs/dates when relevant

### Warning
Fields may include:
- code
- message
- affected dates

Examples:
- UNASSIGNED_DATES
- SEGMENT_OVERLAP
- SEGMENT_OUTSIDE_TRIP
- INVALID_DATE_RANGE
- DUPLICATE_SEGMENT_ORDER
- DAY_GENERATION_FAILED

Exact TypeScript shapes come next in implementation planning.

## Atomicity rules

Operations that change Trip structure should be transactional.

Examples:
- add/update/remove Segment + Day regeneration
- reorder Segments

If regeneration fails, the structural mutation should not leave the Trip half-updated.

## Date semantics

Use date-only calendar values for Sprint 1:
- Trip start/end
- Segment arrival/departure
- Day date

Exact arrival/departure times are out of Sprint 1.

Timezone-specific date-time handling comes later when reservations/transportation are introduced.

## Query/read-model needs

### Home read model
Needs:
- Trip basics
- ordered Segment list
- Unassigned-date warning
- simple continue-planning state

### Itinerary read model
Needs:
- ordered Day list
- primary Segment per Day
- Unassigned label where applicable

### Discover read model
Sprint 1:
- Trip context only
- intentional placeholder state

No recommendation API yet.

## First Section 11 decision

**Q-1001:** Should structural Trip mutations return both **errors** and non-blocking **warnings**, instead of treating every incomplete condition as an error?

Recommended rule:

### Errors block save
Examples:
- Trip end before start
- Segment departure before arrival
- Segment outside Trip bounds
- true Segment overlap

### Warnings allow save
Examples:
- Unassigned dates remain
- Segment sequence is incomplete
- route still needs another city/base

This matches the approved planning behavior: incomplete is allowed; invalid is not.

**Recommended direction:** structured errors + warnings, where warnings do not block Sprint 1 saves.
