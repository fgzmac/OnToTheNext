# D-103 — Segment reordering uses the complete ordered ID list and applies atomically

**Status:** CONFIRMED Section 11 API-contract decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed atomic Segment reorder contract.  
**Related:** D-069 Trip Segment model; D-099 Day regeneration; D-101 errors/warnings; Section 11 Detailed API Contract for Current Feature.  
**Blueprint:** Section 11 remains DRAFT.

## Confirmed contract

`reorderSegments` receives the complete desired Segment order for the Trip.

Conceptually:

```text
reorderSegments({
  tripId,
  orderedSegmentIds: [
    segmentA,
    segmentB,
    segmentC,
    segmentD
  ]
})
```

## Server validation

Before applying the reorder, verify:
- every supplied Segment belongs to the Trip,
- there are no duplicate Segment IDs,
- no existing Segment is omitted,
- no foreign Segment is included.

## Atomic behavior

If validation succeeds:
- update all Segment positions in one transaction,
- keep Segment dates unchanged,
- re-run structural validation,
- regenerate Days if needed,
- return any non-blocking warnings.

If validation fails:
- apply none of the reorder.

## Why this is approved

- avoids duplicate positions,
- avoids partial/half-reordered state,
- keeps drag/reorder deterministic,
- ensures the server remains authoritative for Segment order.

## Next decision

Define what successful structural mutation responses return to the UI.
