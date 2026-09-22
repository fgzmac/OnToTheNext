# D-111 — Segment removal preserves Days and regenerates assignment

**Status:** CONFIRMED Section 13 data-model decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved preserving Day rows when a TripSegment is removed.  
**Related:** D-098 temporary Unassigned dates; D-110 Day reconciliation; Section 13 Data and Persistence Planning.  
**Blueprint:** Section 13 remains DRAFT.

## Confirmed persistence behavior

Removing a TripSegment does **not** cascade-delete Day rows.

`Day.primarySegmentId` remains nullable.

Within the Segment mutation transaction:
1. remove the Segment,
2. regenerate/reconcile Days,
3. reassign affected Days when another Segment validly owns them,
4. otherwise set `primarySegmentId = null`,
5. surface those dates as Unassigned.

## Example

```text
Before:
Nov 30 → Kyoto Segment

Remove Kyoto Segment

After regeneration:
Nov 30 → Unassigned
```

## Why this is approved

- Days belong to the Trip calendar, not the Segment lifecycle.
- Segment removal should create visible planning gaps, not erase calendar dates.
- Matches the approved temporary-Unassigned planning behavior.
- Keeps the Trip date range stable unless the Trip itself is changed.

## Foreign-key direction

The Day → TripSegment relationship should use non-cascading behavior suitable for nullable reassignment, rather than deleting Day records automatically.
