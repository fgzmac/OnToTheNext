# D-112 — Trip deletion cascades to Trip-owned child records

**Status:** CONFIRMED Section 13 data-model decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved cascading Trip deletion to Trip-owned child records while preserving the PrototypeUser.  
**Related:** D-105 prototype-owner identity; D-111 Segment removal preserves Days; Section 13 Data and Persistence Planning.  
**Blueprint:** Section 13 remains DRAFT pending closeout.

## Confirmed behavior

Deleting a Trip removes records that have no meaning outside that Trip.

Sprint 1 cascade scope:
- TripSegments
- Days
- TripPreferenceProfile

Conceptually:

```text
Delete Trip
├── delete TripSegments
├── delete Days
└── delete TripPreferenceProfile
```

The PrototypeUser remains.

## Why this is approved

- Prevents orphaned Trip-owned records.
- Matches aggregate ownership.
- Simplifies development reset/testing.
- Keeps PrototypeUser independent from the lifecycle of any one Trip.

## Important distinction

This differs from Segment deletion.

- **Delete Segment:** preserve Days and regenerate/reassign them because Days belong to the Trip calendar.
- **Delete Trip:** remove Days because the Trip calendar itself no longer exists.
