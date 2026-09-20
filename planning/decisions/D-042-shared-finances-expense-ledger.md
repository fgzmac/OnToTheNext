# D-042 — Shared trip finances and expense-splitting ledger

**Status:** CONFIRMED product capability and companion-visibility direction. Exact expense permissions, settlement/payment integrations, receipt handling, exchange-rate rules, and accounting model remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner wants trip financial information visible to all companions because costs will be shared, and wants an expense-tracking feature similar in concept to Splitwise so costs can be divided and settled after the trip.  
**Related:** D-039 companion view/react/suggest; D-040/D-041 companion access; Section 2 Users, Roles, and Ownership; later budget and persistence sections.  
**Blueprint:** Section 2 remains DRAFT.

## Confirmed visibility direction

Companions on a trip should be able to see the **shared trip financial picture** needed to understand and divide costs.

Shared financial information can include:
- Trip budget summary
- Shared hotel costs
- Shared transportation costs
- Shared activity/reservation costs
- Expense ledger
- Who paid
- Who participated in the expense
- Each participant's share
- Running balances
- End-of-trip settlement summary

The product should not default to hiding the trip budget or shared-cost breakdown from companions.

## Sensitive-data boundary

Shared financial visibility does **not** mean exposing:
- Card or bank-account numbers
- Payment credentials
- Account passwords
- Government identifiers
- Private authentication tokens
- Precise live/current-location history unless separately shared
- Other sensitive personal information not needed to split the trip

Booking confirmation/reference information may be shared when it is useful to the trip, but access and presentation should avoid exposing payment credentials or unrelated personal data.

## Confirmed expense-ledger capability

The trip should include a shared expense ledger inspired by the group-expense model used by products such as Splitwise.

At minimum, an expense needs concepts such as:
- Description
- Amount
- Currency
- Date
- Category
- Who paid
- Which trip participants share the expense
- How it is split
- Notes

The app should calculate:
- Each person's share
- Running net balances
- Who owes whom
- Group spending totals
- A final settle-up view after the trip

## Proposed split methods

Useful split modes include:
- Equal split
- Exact amounts
- Percentages
- Shares/weights
- One participant excluded from an expense
- Itemized split for bills with different individual items

These are proposed capabilities to specify later, not all automatically required for the first release.

## Settlement behavior

The core requirement is **tracking and calculation**, not moving money.

A proposed first-release behavior is:
- Show who owes whom.
- Allow users to record that an external settlement occurred (cash, Zelle, Venmo, bank transfer, etc.).
- Update balances after the settlement is recorded.

Direct payment processing inside the app is not approved by this decision.

## Currency implications

International travel creates multi-currency questions.

The app should preserve the original transaction currency and amount. Later design must decide:
- whether to store a converted reference amount,
- which exchange rate/date is used,
- whether users may override the conversion,
- how refunds and card-posted amounts are handled,
- and which currency is used for final settlement.

No conversion provider or accounting rule is selected here.

## Companion interaction

Because the ledger is shared, companions should be able to inspect the expenses and math that affect their balance.

The exact edit model remains open. Candidate behavior:
- Any companion can add an expense.
- A participant can edit an expense they created.
- Changes to shared expenses remain visible to the group.
- Deleting or materially changing another person's expense may require stronger permissions or confirmation.

This needs explicit specification before implementation.

## Product integration

Expense tracking should connect to the trip rather than live as an unrelated finance screen.

Examples:
- Hotel booking → optional expense entry
- Restaurant → add shared dinner expense
- Transit pass → choose which travelers share it
- Reserved activity → mark paid amount and payer
- End of trip → settlement summary

The itinerary and expense ledger remain different concepts. Scheduling an activity does not create an expense automatically unless the user confirms a cost/payment event.

## Evidence/reference

Splitwise's official help documents a group-expense model in which participants add expenses, track balances, and settle up. It also supports several split methods including equal, exact amount, percentage, shares, adjustment, and itemization. These references inform the concept only; this product is not required to copy Splitwise's implementation or feature set.

## Later questions

Section 2:
- Who may add/edit/delete shared expenses?
- Can organizer-only expenses exist?
- Can a companion be removed while balances remain unsettled?

Section 3:
- Expense-entry flow on web/mobile
- Trip budget/expense dashboard
- Settle-up experience
- Receipt/photo interaction if selected

Section 4:
- Which split methods are required in the first release?
- Is direct payment explicitly excluded?

Sections 6–7:
- Expense, payer, participant, balance, settlement, currency concepts
- Privacy/security of financial data

Section 13:
- Persistence, audit/history, currency calculations

No implementation or financial transaction is authorized by this decision.
