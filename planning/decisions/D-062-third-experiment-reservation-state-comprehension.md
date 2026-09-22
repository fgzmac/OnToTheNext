# D-062 — Reservation-state comprehension is the third validation experiment

**Status:** CONFIRMED Section 5 experiment priority.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed reservation-state comprehension experiment.  
**Related:** D-050 Reservations Center; Section 5.  
**Blueprint:** Section 5 remains DRAFT.

## Third experiment

Validate whether reservation states are immediately understandable and lead to the correct next action.

### States under test
- Book now
- Opens later
- Check back
- Booked
- Needs attention

### Test format
Show realistic reservation cards and ask:
- What should you do now?
- Is this already booked?
- If not, why can/can't you book it?
- When should you check again?
- Is there a known next inventory release?
- Does the itinerary already depend on this time?

### Success target
For every card, the tester correctly identifies:
- whether the reservation is actually confirmed,
- and what action should happen next.

### Critical distinctions
- **Opens later** = booking window is known but not open yet.
- **Check back** = inventory/details are unavailable or incomplete; next known batch is shown when reliable.
- **Booked** = confirmed, not merely accepted or scheduled.

## Next experiment
Validate whether the mobile Today experience is fast and useful during an actual moving-around day.
