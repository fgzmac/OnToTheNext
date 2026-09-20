# D-041 — Unique companion invites, revocation, and unused-link expiry

**Status:** CONFIRMED access-lifecycle model. Exact expiration duration, token implementation, recovery, and device persistence remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved unique per-companion invites with organizer-controlled revocation and expiry for unused invites.  
**Related:** D-039 companion permissions; D-040 invite-link guest access; Section 2 Users, Roles, and Ownership.  
**Blueprint:** Section 2 remains DRAFT.

## Confirmed model

- Each companion receives a **unique invite**.
- The organizer can **revoke a companion's access at any time**.
- Once a companion joins, access continues until they are removed, the trip is deleted, or another explicit access-ending event occurs.
- **Unused invite links expire**.
- A forwarded unique invite should not silently create an additional companion identity.

## Product implications

The organizer should be able to see who has access and manage it from the trip.

A future access-management view may show:
- companion name,
- invite status,
- joined / not joined,
- current role,
- revoke/remove action,
- resend/regenerate invite,
- optional expiry information.

Exact UI remains Section 3 work.

## Still open

- Exact unused-link expiry duration.
- Whether redeemed access survives browser/device changes without account upgrade.
- Whether revoked users can be reinvited with a new token.
- Whether invite links can be manually invalidated before expiry.
- Whether sensitive fields require an additional authentication step.
- How link-forwarding attempts are detected or handled.
- Recovery if a guest loses access after clearing local data.

## Next decision

Resolve companion visibility:
- which trip details are visible by default,
- what remains organizer-only,
- and whether booking references, spending, private notes, and exact location data are shared.

No implementation begins from this decision alone.
