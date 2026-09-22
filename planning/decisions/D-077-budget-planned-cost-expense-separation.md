# D-077 — Separate Trip Budget, Planned Cost, and Expense

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact category budgeting and hard/soft limit behavior remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved keeping Trip Budget, Planned Cost, and Expense as distinct concepts.  
**Related:** D-051 expenses UI; D-071 Expense Allocations; D-076 preference profiles; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

Use three separate concepts:

### Trip Budget
Represents the target or spending constraint for the Trip.

Conceptual fields may include:
- reference currency,
- target amount or range,
- per-person versus total basis,
- optional category targets,
- optional hard/soft limits.

### Planned Cost
Represents an expected or forecast cost before payment.

Examples:
- expected hotel total,
- expected activity ticket cost,
- expected transit cost.

A Planned Cost may link to:
- Recommendation,
- Itinerary Item,
- Reservation,
- Hotel Stay,
- Transportation item.

### Expense
Represents money actually spent.

Conceptual fields include:
- original amount,
- currency,
- payer,
- Expense Allocations,
- date,
- category,
- linked Trip object where useful.

## Why they remain separate

- Budget is a target, not a transaction.
- Planned Cost is an estimate and may change before purchase.
- Expense is actual spending and requires historical accuracy.
- Planned-versus-actual reporting becomes straightforward.
- Budget status can change without rewriting transactions.

## Example

```text
Trip Budget
$5,000 per person
        ↓
Planned Costs
$4,300 forecast
        ↓
Actual Expenses
$2,100 paid so far
```

## Next Section 6 decision

Define how a Reservation should transition from an estimated Planned Cost to an actual Expense after purchase.
