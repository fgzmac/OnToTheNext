# D-079 — Separate Reservation workflow state from external availability evidence

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact availability-refresh behavior and monitoring cadence remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved separating user-facing Reservation workflow state from external inventory/availability evidence.  
**Related:** D-050 reservation states; D-073 Source/Evidence model; D-078 Reservation cost lifecycle; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

### Reservation
Represents the user's workflow/booking state.

Examples:
- Book now
- Opens later
- Check back
- Optional reservation
- No reservation needed
- Booked
- Needs attention
- Cancelled

### Availability / inventory evidence
Represented through Source + Evidence Records.

Examples:
- inventory currently available,
- inventory currently unavailable,
- next batch release date/time,
- official booking-window rule,
- current sale date,
- last verified timestamp,
- source/provider.

## Example

```text
Reservation
State: CHECK BACK

Evidence
- Current inventory unavailable
- Next release: Oct 3 at 10:00 JST
- Source: official venue
- Verified: Sep 21
```

## Why they remain separate

- External inventory can change without changing user intent.
- Stale evidence can be identified honestly.
- Multiple sources may conflict.
- The app avoids pretending to be the authoritative inventory system.
- Reservation workflow remains understandable while evidence refreshes independently.

## Important boundary

Refreshing Evidence does not automatically mark a Reservation as Booked.

A Reservation only becomes Booked through:
- explicit user confirmation,
- or a trusted future integration that returns authoritative booking confirmation.

## Next Section 6 decision

Confirm the app-owned versus provider-owned action boundary for purchasing, navigation, payments, and other external services.
