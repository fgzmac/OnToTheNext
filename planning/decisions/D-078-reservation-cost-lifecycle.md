# D-078 — Reservation can preserve both Planned Cost and actual Expense

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact replacement/refund adjustment rules remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the Reservation cost lifecycle that preserves forecast and actual spend separately.  
**Related:** D-066 typed Reservation model; D-071 Expense Allocations; D-077 Budget/Planned Cost/Expense separation; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

A Reservation may reference:
- a **Planned Cost** before purchase,
- an **Expense** after purchase,
- both when both exist.

Example:

```text
Reservation
├── Planned Cost: ¥5,400
└── Expense: ¥5,800
```

## Preservation rule

When an actual Expense is recorded, the Planned Cost is not automatically overwritten.

Keeping both allows the app to show:
- forecast versus actual,
- price changes,
- trip-budget impact,
- planning accuracy.

If no estimate existed before purchase, the Reservation may link directly to an Expense.

## Important boundary

- Reservation describes booking state.
- Planned Cost describes expected spend.
- Expense describes actual spend.

A change to one does not implicitly rewrite the others.

## Next Section 6 decision

Separate reservation workflow state from external inventory/availability evidence.
