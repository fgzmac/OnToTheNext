# D-080 — App owns trip state; providers own specialized transactions and live authority

**Status:** CONFIRMED Section 6 system-boundary decision. Exact provider selection, integration style, and return/deep-link mechanics remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed boundary between app-owned trip orchestration and provider-owned transactions/live authoritative data.  
**Related:** D-050 reservations; D-052 map; D-073 Source/Evidence; D-079 reservation workflow vs availability evidence; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed boundary

The app owns the **trip state and orchestration layer**.

Specialized external providers remain authoritative for the transaction, navigation, and live-data layers.

## App-owned responsibilities

The app owns:
- Trip structure,
- Trip Segments,
- Days and Itinerary Items,
- Recommendations,
- Recommendation Decisions,
- Trip/User preferences,
- Reservation workflow state,
- Planned Costs,
- Expenses and Expense Allocations,
- Settlements,
- Companion membership/access,
- Share Presentation,
- Today experience,
- internal relationships between these concepts.

## Provider-owned responsibilities

External providers remain authoritative for:
- actual ticket purchase,
- hotel booking transaction,
- airline/train purchase where applicable,
- payment/money transfer,
- turn-by-turn navigation,
- live inventory,
- authoritative venue hours/rules,
- live transit status,
- live weather,
- other provider-specific current facts.

## V1 interaction pattern

Typical flow:

```text
Reservation
→ Open official/provider booking flow
→ User completes purchase externally
→ Return to app
→ User or trusted integration confirms Booked
→ Save confirmation
→ Create/link actual Expense
```

## Important rule

The app may summarize, cache, or display external information, but should not imply that it is the authoritative source when it is not.

Provider-returned or user-confirmed results may update app-owned trip state.

## Why this boundary is preferred

- Keeps V1 scope realistic.
- Avoids rebuilding mature specialized systems.
- Preserves authoritative external sources.
- Reduces compliance and payment complexity.
- Lets the app remain the central source of truth for the Trip itself.

## Section 6 conclusion

With this decision, the major conceptual objects, relationships, and ownership boundaries are sufficiently defined for architecture planning.
