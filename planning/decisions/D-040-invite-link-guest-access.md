# D-040 — Invite-link companion access with lightweight guest identity

**Status:** CONFIRMED initial access model. Link security, expiration, revocation, account upgrade, and identity verification remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed companion access model: invite link plus lightweight guest identity.  
**Related:** D-039 companion permissions; Section 2 Users, Roles, and Ownership.  
**Blueprint:** Section 2 remains DRAFT.

## Confirmed access model

A companion should be able to join a shared trip through an organizer-provided invite link without being forced to create a full account first.

Initial flow:

```text
Organizer sends invite link
        ↓
Companion opens link
        ↓
Companion enters or confirms a display name
        ↓
Companion gains allowed trip access
        ↓
Companion can view, react, and suggest under D-039
```

A full account may be offered later for persistence, multi-device access, trip history, or richer participation, but it is not required for the initial join flow.

## Boundaries

- An invite link does not make the trip public by default.
- Anyone-with-link public access is not selected.
- Guest identity is lightweight and is not assumed to be legally verified identity.
- The organizer still controls membership and final itinerary decisions.
- Booking/payment authority is not granted by guest access.
- Private organizer-only fields may still require separate visibility rules.

## Still open

- Link expiration
- Link revocation
- Single-use versus reusable invites
- Whether one link is unique per companion
- Whether the organizer can remove a guest after joining
- Whether guest access persists across devices
- Whether guests can later claim/upgrade their access through a full account
- What happens if the link is forwarded
- Whether sensitive fields require an additional sign-in step

## Next decision

Resolve link/access lifecycle:
- how the organizer revokes access,
- whether invites expire,
- and whether each companion should have a unique invite.

No implementation begins from this decision alone.
