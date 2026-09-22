# D-097 — Consecutive Segments may share one transfer-date boundary

**Status:** CONFIRMED Section 10 feature-spec decision.
**Recorded:** 2026-09-21.
**Owner:** Project owner (`fgzmac`).
**Source:** The owner approved allowing a previous Segment's departure date to equal the next Segment's arrival date.
**Related:** D-069 Trip Segment model; D-095 transfer-day ownership; D-096 Sprint 1 date requirement; Section 10 Detailed Feature Specification.
**Blueprint:** Section 10 remains DRAFT.

## Confirmed rule

Consecutive Trip Segments may share exactly one boundary date when:

```text
previous.departureDate == next.arrivalDate
```

Example:

```text
Tokyo
Arrival: Nov 24
Departure: Nov 28

Kyoto
Arrival: Nov 28
Departure: Dec 2
```

The shared Nov 28 boundary is valid and is not treated as an overlap error.

## Day ownership

Under D-095:
- Nov 28 belongs primarily to Tokyo because the traveler starts the day there.
- The later Transportation Itinerary Item represents Tokyo → Kyoto.
- Kyoto becomes the primary Segment beginning the following calendar day.

## Invalid overlap

A true overlap exists when the next Segment begins before the previous Segment's allowed handoff boundary.

Example:

```text
Tokyo departure: Nov 29
Kyoto arrival: Nov 28
```

This is invalid because more than one Segment claims the same non-handoff date range.

## Implementation note

Date validation should explicitly distinguish:
- valid shared transfer boundary,
- invalid overlap,
- gap between Segments.

The gap behavior is decided separately.
