# D-091 — Hybrid API capabilities: CRUD for simple edits, explicit actions for meaningful state changes

**Status:** CONFIRMED Section 8 capability-design decision. Exact transport mechanism and naming conventions remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed hybrid capability model.  
**Related:** D-081 modular monolith; approved Section 6 domain model; Section 8 Lightweight API Capability Inventory.  
**Blueprint:** Section 8 remains DRAFT.

## Confirmed approach

Use a hybrid application capability model.

### Simple CRUD-style operations
Use straightforward create/read/update/delete behavior for ordinary maintenance where no meaningful domain transition is involved.

Examples:
- update Trip title,
- edit a note,
- update a preference field,
- change a display label.

### Explicit action capabilities
Use named actions for important state changes with business rules.

Examples:
- `acceptRecommendation`
- `denyRecommendation`
- `moveItineraryItem`
- `previewItineraryChange`
- `markReservationBooked`
- `recordExpense`
- `recordSettlement`
- `generateSharePresentation`

## Why this is approved

- Important business rules are visible in the API/application layer.
- State transitions are harder to bypass accidentally.
- Simple maintenance does not become overengineered.
- Tests can target meaningful domain actions directly.
- The same actions can serve responsive web/mobile layouts.

## Important rule

Avoid one generic "update anything" operation for critical domain state.

For example, changing a Reservation to Booked should pass through the booking action/rules rather than arbitrarily mutating a status field from the UI.

## Next Section 8 decision

Decide whether Home/Today should own separate stored state or compose the canonical domain data already owned by Trip, Itinerary, Reservations, Expenses, and Membership.
