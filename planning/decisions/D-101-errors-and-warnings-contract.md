# D-101 — Structural mutations return blocking errors and non-blocking warnings

**Status:** CONFIRMED Section 11 API-contract decision. Exact TypeScript result types remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the structured errors + warnings model.  
**Related:** D-098 temporary Unassigned dates; D-099 Day regeneration; Section 11 Detailed API Contract for Current Feature.  
**Blueprint:** Section 11 remains DRAFT.

## Confirmed result behavior

Structural Trip operations return structured:
- data,
- blocking errors,
- non-blocking warnings.

Conceptually:

```text
Result
├── ok
├── data
├── errors[]
└── warnings[]
```

## Blocking errors

Errors prevent the mutation from being committed.

Examples:
- Trip end before start,
- Segment departure before arrival,
- Segment outside Trip bounds,
- true Segment overlap,
- invalid reorder request,
- persistence failure,
- Day-regeneration failure.

## Non-blocking warnings

Warnings allow the valid mutation to save.

Examples:
- Unassigned dates remain,
- Segment sequence is incomplete,
- another destination/base still needs to be added.

## Product rule

**Incomplete planning is allowed. Invalid structure is not.**

The API should preserve that distinction rather than forcing every unfinished state into an error.

## UI implication

The UI may show warnings after save and guide the user toward the next step, but it should not pretend the valid save failed.

## Transaction implication

If an operation includes Day regeneration and regeneration fails, that is a blocking error because the structural state must remain internally consistent.

## Next decision

Choose the canonical Sprint 1 date representation for Trip, Segment, and Day values.
