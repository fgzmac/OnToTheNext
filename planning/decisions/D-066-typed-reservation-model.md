# D-066 — One typed Reservation concept across booking categories

**Status:** CONFIRMED Section 6 conceptual-model decision. Type-specific fields remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed general Reservation model.  
**Related:** D-050 reservation states; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

Use one general **Reservation** concept across booking categories.

Reservation types may include:
- Activity
- Hotel
- Transportation

Additional types may be added later when justified.

## Shared reservation behavior

All reservation types can use common concepts such as:
- booking state,
- desired date/time,
- confirmed date/time,
- provider/source,
- confirmation reference,
- cost,
- cancellation/refund information,
- next inventory release date/time/window when applicable,
- notes.

Shared states include:
- Book now
- Opens later
- Check back
- Optional reservation
- No reservation needed
- Booked
- Needs attention
- Cancelled

## Type-specific details

The shared Reservation concept may expose type-specific fields.

Examples:

### Activity
- entry time,
- ticket count,
- admission type.

### Hotel
- check-in/out,
- room type,
- cancellation terms.

### Transportation
- departure/arrival,
- origin/destination,
- seat/car/vehicle details where applicable.

## Relationship to domain objects

A Hotel Stay remains its own trip concept and may reference a Hotel-type Reservation.

An itinerary activity may reference an Activity-type Reservation.

A transportation itinerary item may reference a Transportation-type Reservation.

This avoids building multiple parallel booking-state systems with duplicated logic.

## Next Section 6 decision

Decide whether the day timeline should use one general **Itinerary Item** concept with typed variants for activities, transit, meals, free time, and hotel/rest blocks.
