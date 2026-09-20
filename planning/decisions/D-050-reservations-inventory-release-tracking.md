# D-050 — Reservations Center approved with inventory-release tracking

**Status:** CONFIRMED Section 3 reservation UI direction. Exact notification mechanism, provider integrations, and inventory-monitoring implementation remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed Reservations Center and added one requirement: for `Check Back` items, show when the next batch of inventory is expected to go on sale when that information is known.  
**Related:** D-047 itinerary builder; D-048 factual Discover cards; D-049 hotel comparison UI; Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed reservation states

The Reservations Center supports:
- Book now
- Opens later
- Check back
- Optional reservation
- No reservation needed
- Booked
- Needs attention
- Cancelled

## Check Back inventory-release requirement

For a `Check Back` item, display the next known inventory-release date or window when reliable information exists.

Example:

```text
CHECK BACK

Current inventory
Unavailable

Next batch
Expected Oct 3 at 10:00 AM JST

Source
Official venue

Last checked
Sep 20
```

If the next release is not known, say so explicitly:

```text
Next batch
Not announced yet
```

Do not infer or fabricate a release date from historical patterns without clearly labeling it as an estimate.

Useful fields may include:
- next inventory release date,
- release time,
- timezone,
- release window/range,
- source,
- confidence/status,
- last checked timestamp.

## Confirmed Reservations Center behavior

- Organize items by action state and urgency.
- Link reservations to itinerary items.
- Store desired date/time separately from confirmed booking time.
- Show official booking route when available.
- Keep official and third-party booking sources distinct.
- Store confirmation details after booking.
- Connect confirmed costs to the shared expense ledger.
- Re-run itinerary conflict checks when a reservation becomes fixed.
- Show cancellation/refund deadlines where available.
- Never mark an item as Booked merely because it was accepted, scheduled, or an external link was clicked.

## Mobile/web behavior

**Web:** richer reservation list, status groupings, confirmation details, itinerary context, and action management.

**Mobile:** action-first list while planning; confirmed tickets, times, directions, and booking details become more prominent during travel.

## Next Section 3 decision

Design the Expenses & Split Costs experience:
- quick expense entry,
- payer/participants,
- split methods,
- balances,
- multi-currency handling,
- settlement,
- reservation-to-expense handoff,
- and web/mobile dashboards.
