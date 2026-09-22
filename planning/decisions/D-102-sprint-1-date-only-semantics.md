# D-102 — Sprint 1 uses ISO date-only values / database DATE semantics

**Status:** CONFIRMED Section 11 API-contract decision. Exact TypeScript date helper/library remains OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved date-only ISO values for Sprint 1 Trip, Segment, and Day dates.  
**Related:** D-096 Sprint 1 date requirement; D-099 Day regeneration; Section 11 Detailed API Contract for Current Feature.  
**Blueprint:** Section 11 remains DRAFT.

## Confirmed representation

Sprint 1 calendar dates use date-only values in `YYYY-MM-DD` form and database `DATE` semantics.

Examples:

```text
Trip.startDate        = "2026-11-24"
Trip.endDate          = "2026-12-08"
Segment.arrivalDate   = "2026-11-24"
Segment.departureDate = "2026-11-28"
Day.date              = "2026-11-24"
```

## Important rule

Do not represent these Sprint 1 calendar dates as midnight UTC timestamps.

The application should preserve the calendar date exactly rather than allowing timezone conversion to shift it backward or forward.

## Why this is approved

- Sprint 1 has no exact reservation/transportation times.
- Day generation remains deterministic.
- Segment-boundary comparisons remain simple.
- The representation matches the product concept of a calendar day.

## Later date-time model

When reservations and transportation introduce exact times, add timezone-aware date-time values separately.

Do not overload the Sprint 1 date-only fields with time-of-day semantics.

## Next decision

Define the atomic `reorderSegments` contract.
