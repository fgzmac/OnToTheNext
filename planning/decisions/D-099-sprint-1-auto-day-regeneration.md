# D-099 — Sprint 1 auto-regenerates Days after confirmed date edits

**Status:** CONFIRMED Section 10 feature-spec decision. Later itinerary-content migration behavior remains deferred.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved automatic Day regeneration after confirmed Trip/Segment date edits during Sprint 1.  
**Related:** D-095 transfer-day ownership; D-097 shared Segment boundary; D-098 temporary Unassigned dates; Section 10 Detailed Feature Specification.  
**Blueprint:** Section 10 remains DRAFT.

## Confirmed Sprint 1 behavior

When Trip or Segment dates change and the user confirms/saves the change:

- recalculate Day records from the updated date structure,
- preserve deterministic transfer-day ownership,
- preserve valid shared Segment boundaries,
- preserve temporary Unassigned dates,
- update the visible Day list immediately.

## Why this is safe in Sprint 1

Sprint 1 Days do not yet contain:
- Activities,
- Reservations,
- Free Time blocks,
- Hotel/Rest blocks,
- other real itinerary content.

Therefore, automatic regeneration does not risk silently moving or deleting meaningful itinerary data.

## Later behavior

Once Days contain real itinerary content, date changes should use a safer migration/preview flow.

Future behavior may include:
- preview affected Days,
- show displaced Itinerary Items,
- offer remapping choices,
- preserve booked/fixed items,
- require confirmation before applying the change.

Automatic regeneration without review should not continue once itinerary content exists.

## Next decision

Define the first Segment created during Trip creation.
