# D-070 — Inter-segment travel uses Transportation Itinerary Items

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact transfer-day ownership and transportation-detail fields remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved using Transportation Itinerary Items plus optional Transportation Reservations for travel between Trip Segments.  
**Related:** D-066 typed Reservation model; D-067 typed Itinerary Item model; D-069 Trip Segment model; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

Travel between Trip Segments is represented as a **Transportation / Transit Itinerary Item**.

When booking information exists, that itinerary item may reference a **Transportation-type Reservation**.

For intercity transfer, the transportation item can also reference:
- origin Segment,
- destination Segment.

Example:

```text
Tokyo Segment
    ↓
Transportation Itinerary Item
Tokyo Station → Kyoto Station
    ↔ Transportation Reservation (optional)
    ↓
Kyoto Segment
```

## Why this model is preferred

- Reuses the existing Itinerary Item timing/order model.
- Reuses the existing Reservation booking-state model.
- Avoids introducing a separate transfer domain object.
- Keeps travel visible in the day timeline.
- Still makes city/base transitions explicit.

## Conceptual transportation fields

May include:
- mode,
- origin Place,
- destination Place,
- departure date/time,
- arrival date/time,
- duration,
- origin Segment,
- destination Segment,
- linked Reservation,
- notes.

## Important boundary

Transportation Itinerary Item describes the planned journey.

Transportation Reservation describes the booking/confirmation state.

Expense describes the actual money spent.

These remain separate concepts even when linked.

## Next Section 6 decision

Define how shared expenses should represent each traveler's portion of a cost.
