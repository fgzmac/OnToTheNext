# Section 2 Closeout — Users, Roles, and Ownership

**Lifecycle status:** IN REVIEW — awaiting explicit owner approval.  
**Recorded:** 2026-09-20.  
**Purpose:** Consolidate the initial user/role/ownership model before moving to Section 3 — User Journeys and Interface Behavior.

## Roles

### Organizer
The organizer:
- Owns the trip by default.
- Makes final itinerary decisions.
- Can accept/reject companion suggestions.
- Manages core trip preferences.
- Controls invites and membership.
- Can publish/share the itinerary.
- Can delete the trip.
- Can deliberately transfer ownership.
- Retains final administrative control.

### Companion
A companion:
- Joins through a unique invite link.
- Can use a lightweight guest identity without creating a full account initially.
- Can view the shared itinerary.
- Can react to recommendations.
- Can suggest alternatives.
- Can participate in shared expense tracking.
- Cannot directly overwrite confirmed plans by default.
- Cannot delete the trip, remove other companions, or transfer ownership by default.

## Invite and access model

- Unique invite per companion.
- Organizer can revoke access.
- Unused invites expire.
- A forwarded invite should not silently create additional companion identities.
- Once joined, access continues until removed or another explicit access-ending event occurs.
- Full account upgrade may be supported later but is not required for initial access.

## Trip visibility

Companions can see the practical trip information needed to travel together, including:
- itinerary dates/times,
- activities,
- hotels and locations,
- transportation plan,
- maps/directions,
- reservation status,
- shared trip costs/budget,
- shared expense ledger,
- shared notes needed for the trip.

Sensitive payment credentials and unrelated private personal information remain protected.

Exact visibility of raw booking-reference numbers, precise live location, and private personal notes can be specified later when needed.

## Shared finances

The trip includes a shared expense ledger.

The ledger can represent:
- amount,
- currency,
- date,
- category,
- payer,
- participants sharing the expense,
- split method,
- notes,
- running balances,
- and final settle-up state.

The core product should be able to show who paid, who owes whom, and the final group settlement summary.

Direct money movement/payment processing is not currently required.

Removing a participant from trip access does not erase historical expenses or unresolved balances.

## Preference model

Each traveler keeps a distinct preference/reaction profile.

The app should:
- show when an option fits everyone,
- show when an option mainly fits one traveler,
- propose balanced alternatives,
- preserve visible disagreements,
- and allow the organizer to make the final itinerary decision.

The app should not silently average distinct traveler preferences into one hidden group profile.

## Ownership and administrative safeguards

Organizer administrative control includes:
- invites,
- removals,
- publishing,
- trip deletion,
- deliberate ownership transfer.

Later UI/data/security design must still specify:
- ownership-transfer confirmation,
- deletion/recovery behavior,
- exact invite expiry duration,
- guest-device persistence,
- expense edit/delete permissions,
- and sensitive-field visibility.

These are implementation/interface details, not blockers to the product role model.

## Section 2 approval candidate

Approve Section 2 if the following model is correct:

> A trip has one organizer with final administrative and itinerary control. Companions join through unique invite links with lightweight guest identities, can view/react/suggest and participate in shared expenses, and retain their own preferences. Shared travel and cost information is visible to the group, while truly sensitive credentials remain private. Membership changes do not erase financial history.

Approval advances the blueprint to **Section 3 — User Journeys and Interface Behavior**.

Approval does not authorize implementation.
