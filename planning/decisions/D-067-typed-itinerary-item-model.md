# D-067 — One typed Itinerary Item concept for the day timeline

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact field requirements per type remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed typed Itinerary Item model.  
**Related:** D-047 Itinerary Builder; D-066 typed Reservation model; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

Use one general **Itinerary Item** concept for anything intentionally placed into a day timeline.

Initial types:
- Activity
- Meal
- Shopping
- Transportation / Transit
- Free Time
- Hotel / Rest
- Custom

## Shared itinerary behavior

All itinerary items can share concepts such as:
- trip/day reference,
- start time,
- end time or duration,
- day order/position,
- fixed/flexible state,
- notes,
- place/location where relevant,
- completion/skipped state during travel.

This keeps timing, ordering, conflict detection, and day rendering consistent across item types.

## Type-specific details

Types may expose additional fields only when useful.

Examples:

### Activity
- linked Place,
- linked Recommendation,
- linked Reservation,
- category.

### Meal
- linked restaurant/place,
- reservation when applicable,
- meal label.

### Transportation / Transit
- origin,
- destination,
- mode,
- travel duration,
- linked transportation Reservation when applicable.

### Free Time
- duration,
- optional label/note.

### Hotel / Rest
- linked Hotel Stay where applicable,
- intended rest duration.

### Custom
- freeform title,
- optional place,
- notes.

## Important boundary

Itinerary Item describes **what is intentionally part of the day**.

It does not by itself mean:
- booked,
- paid,
- recommended,
- or completed.

Those states remain separate through Reservation, Expense, Recommendation, and travel-state concepts.

## Next Section 6 decision

Clarify the relationship between **Place** and **Recommendation** so external place data, recommendation evidence, and the user's accept/deny decisions remain cleanly separated.
