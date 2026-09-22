# D-075 — Separate Recommendation from Recommendation Decision

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact history-retention and reversal semantics remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved separating Recommendation content from the organizer's decision about it.  
**Related:** D-048 factual Discover cards; D-068 Place/Recommendation separation; D-074 identity/membership separation; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

Use separate concepts for:

### Recommendation
Represents the proposed option and its factual/contextual information.

### Recommendation Decision
Represents a user/trip-specific response to that Recommendation.

Conceptual fields may include:
- Recommendation reference,
- Trip reference,
- identity or Trip Membership when relevant,
- outcome,
- timestamp,
- optional reason,
- optional superseded/reversed state.

Possible outcomes:
- Accepted
- Denied
- Saved
- Must-do

## Why they remain separate

- Recommendation facts/evidence can refresh without erasing user intent.
- A traveler can change their mind later.
- Interaction history can be preserved.
- Ranking/refinement logic can learn from decisions cleanly.
- The same Recommendation/Place data can be reused across trips without mixing decisions together.

## V1 simplification

For V1, Recommendation Decisions primarily reflect the Organizer's planning choices.

Companion-specific voting/reaction decisions are not required.

## Important boundary

Recommendation Decision does **not** itself mean:
- scheduled,
- booked,
- paid,
- completed.

Those remain separate through Itinerary Item, Reservation, Expense, and travel-state concepts.

## Next Section 6 decision

Define how trip-specific planning preferences relate to any longer-term user preference profile.
