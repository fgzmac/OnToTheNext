# D-092 — Home and Today compose canonical domain data

**Status:** CONFIRMED Section 8 capability-design decision. Exact read-model/query shapes remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved Home/Today as composition/read-model surfaces rather than owners of duplicate stored state.  
**Related:** D-059 one-feature-one-home; D-091 hybrid API capabilities; Section 8 Lightweight API Capability Inventory.  
**Blueprint:** Section 8 remains DRAFT.

## Confirmed model

Home and Today do not own duplicate business state.

They compose data from the canonical domain capabilities.

```text
Home / Today
    ↓
Trip
Itinerary
Reservations
Expenses
Trip Membership
Sharing
```

## Examples

- Next activity comes from Itinerary.
- Booking state comes from Reservation.
- Current balance comes from Expenses.
- Traveler/access state comes from Trip Membership.
- Share Trip launches the Sharing capability.
- Essentials information is derived from existing domain state rather than separately maintained.

## Read-model allowance

Home/Today may use a purpose-built query/read model for:
- faster loading,
- fewer round trips,
- screen-specific aggregation.

That read model is derived/composed state, not a second source of truth.

## Why this is approved

- Avoids inconsistent duplicate status fields.
- Preserves one canonical owner for each domain concept.
- Keeps Home/Today flexible as the UI changes.
- Keeps business rules in the owning modules.

## Next Section 8 decision

Decide whether V1 needs a public/external API or only an internal application capability layer for the Next.js app.
