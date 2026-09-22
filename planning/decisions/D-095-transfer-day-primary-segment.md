# D-095 — Transfer days belong to the Segment where the traveler starts the day

**Status:** CONFIRMED Section 10 feature-spec decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed transfer-day ownership rule.  
**Related:** D-069 Trip Segment model; D-070 inter-segment transportation model; Section 10 Detailed Feature Specification.  
**Blueprint:** Section 10 remains DRAFT.

## Confirmed rule

Each calendar Day has exactly one primary Trip Segment.

When a traveler moves between Segments during the day, the Day belongs to the Segment where the traveler **starts that day**.

Example:

```text
Nov 28

Start: Tokyo
Travel: Tokyo → Kyoto
End: Kyoto

Primary Segment: Tokyo
```

The transition itself is represented later by a Transportation-type Itinerary Item.

## Why this is approved

- Prevents one date from appearing under two Segments.
- Keeps Day ordering deterministic.
- Keeps transfer behavior explicit in the itinerary.
- Reuses the approved Transportation Itinerary Item model.
- Makes Day generation simpler for Sprint 1.

## Future adjustment

If real-trip testing later proves this awkward, the rule may be revisited through an explicit migration/design decision rather than silently changed.
