# D-069 — Trip Segment model for multi-city stays

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact naming (Segment vs Stay Segment), required fields, and transition rules remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved adding a Trip Segment / Stay Segment concept between Trip and Day.  
**Related:** D-067 typed Itinerary Item model; D-068 Place/Recommendation separation; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

A Trip contains ordered **Trip Segments** representing contiguous destination/base stays.

Example:

```text
Trip
├── Tokyo Segment
│   ├── Days
│   └── Hotel Stay
├── Kyoto Segment
│   ├── Days
│   └── Hotel Stay
├── Osaka Segment
│   ├── Days
│   └── Hotel Stay
└── Tokyo Segment
    ├── Days
    └── Hotel Stay
```

## Segment purpose

A Segment represents one continuous stay/base in a destination.

Conceptual fields may include:
- destination/city/base,
- ordered position in the Trip,
- arrival date/time,
- departure date/time,
- associated Days,
- associated Hotel Stay,
- incoming/outgoing transportation references where useful.

## Why this model is useful

- The same city can appear more than once in one Trip.
- Hotel planning attaches to a specific stay block.
- Arrival/departure and transfer days are easier to reason about.
- Days remain simpler because they inherit destination/base context from the Segment.
- Planning-phase hotel discovery can operate per Segment.
- A Segment can exist even if lodging is not yet selected.

## Relationship to Day

A Day belongs to one primary Trip Segment.

A transfer day may include transportation between two Segments while still belonging to one primary Segment or carrying explicit transition context. Exact transfer-day rules are deferred.

## Relationship to Hotel Stay

A Segment may reference:
- no Hotel Stay yet,
- one confirmed Hotel Stay,
- or later a more complex lodging arrangement if future requirements justify it.

V1 should prefer one primary Hotel Stay per Segment unless a real use case requires otherwise.

## Next Section 6 decision

Define how transportation between Trip Segments should be modeled:
- whether intercity travel is a special Segment transition object,
- or a typed Itinerary Item plus optional Transportation Reservation.
