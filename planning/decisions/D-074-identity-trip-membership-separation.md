# D-074 — Separate User/Guest Identity from Trip Membership

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact authentication/account-upgrade behavior remains to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved separating a person's product identity from their role/access in a specific Trip.  
**Related:** D-040/D-041 invite access; D-043 organizer admin; D-053 companion role; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

Use separate concepts for:

### User / Guest Identity
Represents the person at the product level.

Possible identity states:
- full account,
- lightweight guest identity,
- guest later upgraded/claimed by a full account.

### Trip Membership
Represents that identity's relationship to one specific Trip.

Conceptual fields may include:
- Trip,
- identity,
- role,
- membership status,
- joined date,
- access/revocation state,
- expense participation.

Roles currently include:
- Organizer
- Companion

## Why they remain separate

- The same person can hold different roles in different Trips.
- Role belongs to a Trip, not globally to the account.
- Revoking Trip access does not require deleting the person's identity.
- A guest can later upgrade to an account without rebuilding the Trip relationship.
- Historical expenses can remain associated with a former member.
- Ownership transfer changes Trip Membership role/state, not global identity.

## Example

```text
Identity: Traveler A
├── Trip 1 Membership → Organizer
└── Trip 2 Membership → Companion
```

## Next Section 6 decision

Define whether a user's decision about a Recommendation should be represented as its own trip/user-specific interaction record rather than a mutable field on the Recommendation.
