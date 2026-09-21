# D-051 — Expenses, split costs, and planned-vs-actual spending approved

**Status:** CONFIRMED Section 3 expense UI direction. Exact exchange-rate provider, settlement rules, receipt support, and edit/delete permissions remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner said to continue after reviewing the proposed Expenses & Split Costs model; this is treated as approval to proceed.  
**Related:** D-042 shared finances and expense ledger; D-043 organizer admin; D-050 reservations; Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed expense experience

The trip includes a shared expense area supporting:
- expense description,
- amount,
- currency,
- date,
- category,
- payer,
- participants sharing the cost,
- split method,
- notes,
- running balances,
- settlement history.

## Confirmed split methods

Initial product direction supports:
- Equal
- Exact amount
- Percentage
- Shares/weights

Detailed restaurant itemization is not required at this stage.

## Planned versus actual

The product should distinguish:
- estimated/planned cost,
- actual paid expense,
- remaining forecast.

An itinerary/reservation item may have an estimated cost before purchase and an actual expense after purchase.

Example:
```text
Estimated: ¥5,400
Actual: ¥5,800
Paid by: Organizer
```

The trip budget can therefore show:
- target budget,
- planned spend,
- actual spend,
- remaining forecast.

## Multi-currency

Preserve the original transaction amount and currency.

The app may also store/display a trip reference currency value for comparison and settlement.

Later design must define:
- exchange-rate source,
- rate date/time,
- manual override,
- card-posted final amount,
- refunds,
- final settlement currency.

Do not overwrite the original transaction amount.

## Reservation integration

Reservation and hotel purchases can offer a prefilled handoff into the expense ledger.

Example:
```text
Reservation saved
2 tickets
¥24,000
Paid by Organizer

Add to shared expenses?
```

Avoid requiring the traveler to enter the same purchase twice.

## Settlement

The core product tracks balances and allows users to record external settlement.

The app may support recording payment methods such as:
- Cash
- Venmo
- Zelle
- Bank transfer
- Other

These are descriptive records only at this stage.

Direct in-app payment processing is not required.

## Web/mobile behavior

**Web:** expense dashboard, category totals, planned-vs-actual budget, transaction history, balances, settlement view.

**Mobile:** quick-add expense, current balance, recent expenses, settlement action.

## Next Section 3 decision

Design the Map experience:
- itinerary synchronization,
- hotels,
- accepted/suggested activities,
- food/shopping,
- transit,
- route context,
- nearby discovery,
- and web/mobile interaction.
