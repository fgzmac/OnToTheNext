# D-071 — Shared expenses use per-traveler Expense Allocations

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact persistence/audit fields remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the Expense + per-traveler Expense Allocation model.  
**Related:** D-042 shared finances; D-051 expenses UI; D-065 expense validation; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

A shared **Expense** stores the overall transaction.

Each traveler's responsibility is represented by one or more **Expense Allocation** records.

Example:

```text
Expense
├── Description: Dinner
├── Payer: Organizer
├── Amount: ¥14,800
├── Currency: JPY
└── Allocations
    ├── Traveler A → ¥7,400
    └── Traveler B → ¥7,400
```

## Split method versus stored result

Split methods such as:
- Equal
- Exact
- Percentage
- Shares

are the user-facing input/calculation method.

The resulting traveler amounts are stored conceptually as Expense Allocations.

## Why this model is useful

- Running balances are straightforward.
- Uneven splits are explicit.
- Travelers can be excluded cleanly.
- Historical calculations remain reproducible.
- Settlement calculations are simpler.
- Editing the split can generate a new set of explicit allocations.

## Important boundary

**Expense** = the transaction and payer.

**Expense Allocation** = how much of that transaction a traveler is responsible for.

**Settlement** = a later payment between travelers that reduces balances.

These remain separate concepts.

## Next Section 6 decision

Define the boundary between:
- Share Presentation,
- Share Link,
- and Companion Invite / Trip Membership.
