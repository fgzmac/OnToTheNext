# Section 10 — Detailed Feature Specification

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–9; decisions D-001 through D-094.  
**Approval record:** None yet.

## Purpose

Turn the first implementation milestone into an implementation-ready feature specification.

Section 10 focuses on **behavior and acceptance criteria**, not exact API payloads or database implementation details.

The first feature to specify is the Sprint 1 vertical slice:

> **Create Trip + Trip Segment + Day Skeleton**

## Feature 1 — Create Trip

### Goal

Allow the owner to create a new trip with enough structure to support later Discover, Itinerary, Hotels, Reservations, Expenses, and Share Trip features.

### Primary actor

Organizer / prototype owner.

### Entry point

From Home:

```text
Home
→ Create Trip
```

For the personal prototype, no account-selection flow is required.

## Proposed initial fields

Keep the first form intentionally small:

- Trip name (optional; can default from destination)
- Primary destination / country or region
- Start date
- End date
- Traveler count
- Optional rough budget/comfort range

Do not require:
- detailed interests,
- hotel preferences,
- reservations,
- city sequence,
- companion identities,
- transportation,
- long onboarding questionnaire.

Those come later through progressive refinement.

## Date behavior

### Known dates
User selects start/end date.

System validates:
- start date exists,
- end date exists,
- end date is not before start date.

### Exploring mode
The broader product supports undated exploration, but Sprint 1 may defer this if it complicates the first persistence model.

Recommended Sprint 1 scope:
- require dates for the first implementation slice,
- preserve the conceptual ability to add exploring mode later.

## Trip creation result

After creation:

```text
Trip
├── basic trip metadata
├── empty or initial Segment structure
└── Days generated once Segments are defined
```

The user lands on the new Trip Home.

## Feature 2 — Trip Segments

### Goal

Represent the ordered destination/base blocks within a trip.

Example:

```text
Japan Trip
├── Tokyo
├── Kyoto
├── Osaka
└── Tokyo
```

The same destination may appear more than once.

### Segment fields for Sprint 1

- destination/base name
- arrival date
- departure date
- order position

Optional fields may remain null:
- exact arrival time
- exact departure time
- Hotel Stay
- transportation links

## Segment actions

Sprint 1 must support:
- Add Segment
- Edit Segment
- Reorder Segments
- Remove Segment
- Read ordered Segment list

## Segment date rules

Recommended validation:

- Segment arrival cannot be before Trip start.
- Segment departure cannot be after Trip end.
- Departure cannot be before arrival.
- Segments should not silently overlap.
- Gaps should be surfaced rather than auto-filled.
- Same destination may appear in multiple Segments.

For Sprint 1, user resolves overlap/gap issues manually.

Do not auto-rewrite Segment dates.

## Feature 3 — Day generation

### Goal

Generate the Trip's calendar Days from the approved Segment date ranges.

### Conceptual behavior

If:
- Tokyo Segment starts Nov 24
- Tokyo Segment transitions out Nov 28

Days might be:

```text
Nov 24
Nov 25
Nov 26
Nov 27
Nov 28
```

But transfer-day ownership must be deterministic.

### Proposed V1 rule

A calendar Day belongs to the Segment where the traveler **starts that day**, unless the Day is the initial arrival day.

Example:

```text
Nov 28
Start in Tokyo
Travel Tokyo → Kyoto
End in Kyoto

Primary Day Segment: Tokyo
```

The transportation item later records the transition to Kyoto.

This avoids duplicating one calendar date under two Segments.

**Confirmed — D-095:** transfer days belong to the Segment where the traveler starts the day.

## Day fields for Sprint 1

- date
- Trip
- primary Segment
- display/order position

No Itinerary Items are required yet.

## Regeneration behavior

Changing Segment dates may require Days to be recalculated.

Recommended behavior:
- before any Itinerary Items exist, Day regeneration may happen automatically after confirmed Segment date changes,
- once Days contain real itinerary content in later milestones, date changes should use a safer migration/preview flow.

Sprint 1 only needs the simple pre-itinerary behavior.

## Feature 4 — Trip Home shell

After creating the Trip, Home should remain simple.

Example:

```text
Japan
Nov 24 – Dec 8

Tokyo
Kyoto
Osaka
Tokyo

[ Continue Planning ]
```

No readiness dashboard.

No hotel/reservation/expense widgets in Sprint 1.

## Feature 5 — Primary navigation

Persistent primary navigation:

- Home
- Itinerary
- Discover

Sprint 1 expectations:

### Home
Shows basic Trip summary and Segment list.

### Itinerary
Shows ordered Days, even though they are initially empty.

### Discover
Shows an intentional placeholder state such as:

> Discover recommendations will appear here as you continue planning.

Do not add fake recommendations yet.

## Responsive behavior

### Desktop
Navigation may be side/top-based depending on design system.

### Mobile
Use compact primary navigation.

The exact visual styling is not locked in this section.

Behavioral requirement:
- switching Home / Itinerary / Discover preserves the same Trip context,
- user should not need to reselect the Trip on every screen.

## Empty states

### No Trip
```text
Plan your first trip
[ Create Trip ]
```

### Trip with no Segments
```text
Where will you stay first?
[ Add Destination ]
```

### Itinerary with Days but no items
```text
Your days are ready.
Activities will appear here as you build the trip.
```

### Discover in Sprint 1
```text
Discover is coming next.
Your trip structure is ready.
```

Keep empty states short and useful.

## Error handling

Sprint 1 should visibly handle:
- failed Trip save,
- failed Segment save,
- invalid dates,
- overlapping Segment dates,
- failed Day generation,
- database connectivity failure.

Do not silently discard changes.

## Acceptance criteria

### Trip
- User can create one Trip.
- Trip persists after refresh/restart.
- Trip dates render correctly.
- Trip can be re-opened.

### Segments
- User can add multiple Segments.
- The same destination can appear more than once.
- Segments can be reordered.
- Invalid date ranges are rejected.
- Overlaps are surfaced.

### Days
- Days are generated in chronological order.
- Each Day has one primary Segment.
- Day generation remains deterministic.
- Days persist.

### Navigation
- Home / Itinerary / Discover are visible and usable.
- No duplicate Map/Hotel/Expense/Share navigation exists.
- Trip context persists when switching sections.

### Responsive
- Core shell works at desktop width.
- Core shell works at phone width.
- No horizontal overflow in primary screens.

### Quality
- Typecheck passes.
- Baseline automated tests pass.
- Core Trip/Segment/Day business rules have tests.

## Explicitly out of scope

Do not include:
- recommendations,
- Place data,
- maps,
- hotels,
- reservations,
- expenses,
- Share Trip,
- companion access,
- authentication,
- provider integrations,
- route planning,
- offline behavior,
- themed visual sharing.

## First Section 10 decision

**Q-901:** What should own a transfer day when one Segment ends and another begins?

**Confirmed direction — D-095:** assign each calendar Day to the Segment where the traveler **starts the day**.

Example:
- Wake up in Tokyo on Nov 28
- Travel to Kyoto during the day
- Day belongs primarily to Tokyo
- Later Transportation Itinerary Item records Tokyo → Kyoto

Why:
- one date belongs to exactly one Segment,
- no duplicated Days,
- easy day ordering,
- transition is represented explicitly by transportation.

This rule can be changed later only if real itinerary behavior proves it awkward.


## Next decision — Sprint 1 date requirement

**Q-902:** Should the first working Sprint 1 build require Trip start/end dates, while the broader "just exploring / dates not set" mode remains part of the product but is implemented later?

**Recommended direction:** yes.

Why:
- Day generation depends on dates.
- Segment validation is much simpler.
- Sprint 1 is about proving persistence/navigation, not every onboarding variation.
- The product model still preserves undated exploration for a later milestone.

Sprint 1 would therefore require:
- Trip start date,
- Trip end date,
- Segment date ranges.

Later, undated exploration can use a planning state that does not generate calendar Days until dates are chosen.
