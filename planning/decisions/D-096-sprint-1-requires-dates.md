# D-096 — Sprint 1 requires Trip and Segment dates

**Status:** CONFIRMED Section 10 feature-spec decision. Undated exploration remains part of the broader product but is deferred beyond Sprint 1.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved requiring dates for the first working Sprint 1 build.  
**Related:** D-045 recommendation-first onboarding; D-094 Sprint 1 scope; D-095 transfer-day ownership; Section 10 Detailed Feature Specification.  
**Blueprint:** Section 10 remains DRAFT.

## Confirmed Sprint 1 rule

The first working build requires:
- Trip start date,
- Trip end date,
- Segment arrival/departure dates.

These dates drive:
- Segment validation,
- Day generation,
- chronological ordering.

## Deferred behavior

The broader product still supports:
- "just exploring,"
- dates not set yet,
- destination discovery before calendar Days exist.

That mode is intentionally deferred until after the dated Trip → Segment → Day foundation works.

## Why this is approved

- Day generation depends on dates.
- Segment validation is simpler and more deterministic.
- Sprint 1 remains focused on persistence and navigation.
- Undated exploration can later use a planning state that does not create calendar Days until dates are chosen.

## Next decision

Define how adjacent Segment dates are allowed to meet on a transfer day without being treated as an invalid overlap.
