# Section 10 Closeout — Detailed Feature Specification

**Lifecycle status:** IN REVIEW — awaiting explicit owner approval.  
**Recorded:** 2026-09-21.  
**Purpose:** Lock the first implementation-ready feature specification before moving to detailed API contracts.

## Feature in scope

**Create Trip + Trip Segment + Day Skeleton**

This is the Sprint 1 product slice.

## Create Trip

Sprint 1 fields:
- Trip name, optional
- Primary destination / country / region
- Start date
- End date
- Traveler count
- Optional rough budget/comfort context

Sprint 1 requires dates.

Undated "just exploring" mode remains part of the broader product but is deferred beyond Sprint 1.

## Initial Segment behavior — D-100

- Specific city/base entered → may create first Segment automatically.
- Broad country/region entered → ask for the first city/base.
- Do not create country-level Segments such as "Japan."

## Trip Segments

Sprint 1 supports:
- add,
- edit,
- reorder,
- remove,
- read ordered Segments.

A Segment contains:
- destination/base,
- arrival date,
- departure date,
- order position.

Exact times, Hotel Stay, and transportation links may remain empty.

## Date rules

### Transfer-day ownership — D-095
A Day belongs to the Segment where the traveler starts that calendar day.

### Dates required — D-096
Trip and Segment dates are required in Sprint 1.

### Shared transfer boundary — D-097
Consecutive Segments may share exactly one boundary date:

```text
previous departure == next arrival
```

This is a valid transfer boundary, not an overlap.

### Temporary gaps — D-098
Unassigned dates are allowed while the route is being built.

The app must:
- show them explicitly as Unassigned,
- never invent a destination,
- never silently extend a Segment.

Complete Segment coverage is required before the trip structure is treated as complete.

## Day generation

Days are generated from the Trip + Segment date structure.

Each Day has:
- date,
- Trip,
- one primary Segment,
- display/order position.

### Automatic regeneration — D-099
During Sprint 1, confirmed Trip/Segment date changes automatically regenerate Days.

This is allowed because Sprint 1 Days do not yet contain real itinerary content.

Later, once Days contain activities/reservations/free time, date changes require a safer preview/migration flow.

## Home shell

Home remains simple.

It may show:
- Trip title,
- date range,
- ordered Segment list,
- one clear continue-planning action.

Do not add:
- readiness dashboards,
- hotel widgets,
- reservation widgets,
- expense widgets,
- Share Trip,
- unrelated utilities

during Sprint 1.

## Primary navigation

Persistent navigation:
- **Home**
- **Itinerary**
- **Discover**

Trip context persists when switching sections.

### Home
Basic Trip summary + Segment structure.

### Itinerary
Ordered Days, initially empty.

### Discover
Intentional placeholder only.

No fake recommendations.

## Empty states

### No Trip
> Plan your first trip  
> Create Trip

### No Segments
> Where will you stay first?  
> Add Destination

### Empty Itinerary
> Your days are ready. Activities will appear here as you build the trip.

### Discover during Sprint 1
> Discover is coming next. Your trip structure is ready.

## Validation/error behavior

Must handle visibly:
- invalid Trip dates,
- invalid Segment ranges,
- true Segment overlap,
- valid transfer boundary,
- temporary gap/Unassigned dates,
- failed Trip save,
- failed Segment save,
- failed Day generation,
- database failure.

Do not silently discard changes.

## Acceptance criteria

### Trip
- create and persist Trip,
- reopen after refresh/restart,
- dates render correctly.

### Segments
- multiple Segments supported,
- same city may appear more than once,
- reorder works,
- validation distinguishes overlap vs valid boundary,
- temporary Unassigned dates supported.

### Days
- generated chronologically,
- one primary Segment per Day,
- deterministic transfer-day ownership,
- automatic Sprint 1 regeneration works,
- Days persist.

### Navigation
- Home / Itinerary / Discover work,
- same Trip context persists,
- no duplicate feature homes.

### Responsive
- works at desktop width,
- works at phone width,
- no horizontal overflow in core screens.

### Quality
- typecheck passes,
- baseline tests pass,
- Trip/Segment/Day rules have automated tests.

## Explicitly out of scope

- recommendations,
- map,
- hotels,
- reservations,
- expenses,
- Share Trip,
- companion access,
- auth,
- provider integrations,
- route planning,
- offline behavior,
- themed sharing.

## Section 10 approval candidate

Approve Section 10 if this first feature specification is implementation-ready.

Approval advances the blueprint to **Section 11 — Detailed API Contract for Current Feature**.

Approval still does not authorize coding; the project remains in specification mode until the owner explicitly transitions to implementation.
