# D-098 — Allow temporary Unassigned dates while editing Segments

**Status:** CONFIRMED Section 10 feature-spec decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved allowing temporary gaps while the Segment sequence is still being built.  
**Related:** D-069 Trip Segment model; D-095 transfer-day ownership; D-097 shared transfer boundary; Section 10 Detailed Feature Specification.  
**Blueprint:** Section 10 remains DRAFT.

## Confirmed behavior

While the organizer is editing the trip structure, dates may temporarily be uncovered by any Trip Segment.

Those dates are shown explicitly as **Unassigned**.

Example:

```text
Trip: Nov 24–Dec 8

Tokyo: Nov 24–Nov 28
Kyoto: Nov 28–Dec 2

Dec 2–Dec 8
UNASSIGNED
```

## Rules

- Unassigned dates are allowed during planning.
- The app must not silently invent a destination.
- The app must not automatically stretch a Segment to cover the gap.
- The organizer can continue adding/reordering/editing Segments.
- Before the trip structure is treated as complete, every Trip date must resolve to exactly one primary Segment under the approved transfer-boundary rules.

## Why this is approved

- The route can be built incrementally.
- Users are not forced to know the whole trip immediately.
- Incomplete planning remains visible without becoming a blocking error.
- The app preserves user control instead of auto-filling geography.

## Next decision

Define how Day records regenerate when Trip or Segment dates change during Sprint 1.
