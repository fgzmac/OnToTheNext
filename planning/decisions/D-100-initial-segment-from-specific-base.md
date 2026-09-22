# D-100 — Initial Segment is created only from a specific city/base

**Status:** CONFIRMED Section 10 feature-spec decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed first-Segment creation rule.  
**Related:** D-069 Trip Segment model; D-096 Sprint 1 date requirement; Section 10 Detailed Feature Specification.  
**Blueprint:** Section 10 remains DRAFT pending closeout.

## Confirmed behavior

When creating a Trip:

### Specific city/base entered
If the destination entered is already a specific travel base, such as:
- Tokyo,
- Kyoto,
- Paris,
- San Francisco,

the app may create the first Trip Segment automatically from that city/base.

The first Segment:
- starts on the Trip start date,
- has an editable departure/end boundary,
- can be followed by additional Segments.

### Broad country/region entered
If the destination is a broader region, such as:
- Japan,
- Italy,
- California,

the app does **not** create a fake Segment using that broad destination.

Instead, ask:

> Where will you stay first?

The selected city/base then becomes the first Segment.

## Why this is approved

Trip Segments represent real stay/base blocks, not broad destination labels.

This keeps:
- Segment semantics correct,
- hotel planning tied to real bases,
- Day ownership meaningful,
- later transportation relationships clear.
