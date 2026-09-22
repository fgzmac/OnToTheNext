# D-110 — Sprint 1 reconciles Days by unique (tripId, date)

**Status:** CONFIRMED Section 13 data-model decision. Later content-aware Day migration remains deferred until real itinerary content exists.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved using `(tripId, date)` as the logical uniqueness boundary for Day reconciliation in Sprint 1.  
**Related:** D-099 Day regeneration; D-102 date-only semantics; D-109 minimal TripPreferenceProfile; Section 13 Data and Persistence Planning.  
**Blueprint:** Section 13 remains DRAFT.

## Confirmed Day persistence rule

For Sprint 1, exactly one Day exists for each `(tripId, date)` pair.

Database constraints:
- unique `(tripId, date)`,
- unique `(tripId, position)`.

## Regeneration behavior

When Trip or Segment dates change:

- create missing Day dates,
- update `primarySegmentId` for existing Day dates,
- normalize Day positions,
- remove Day rows whose dates are no longer inside the confirmed Trip range,
- preserve exactly one Day row per Trip/date.

## Identity rule

`Day.id` remains an opaque application ID.

The logical reconciliation key is `(tripId, date)`, not the Day ID itself.

## Why this is approved

- Prevents duplicate calendar Days.
- Keeps regeneration deterministic.
- Works cleanly with Sprint 1 date-only semantics.
- Makes transfer-day and Unassigned behavior easier to verify.
- Is safe while Days do not yet contain real Itinerary Items.

## Later behavior

Once Days contain itinerary content, deleting/remapping Day rows requires an explicit migration/preview strategy rather than blind reconciliation.
