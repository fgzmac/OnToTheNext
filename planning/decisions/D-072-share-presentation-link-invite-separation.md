# D-072 — Separate Share Presentation, Share Link, and Companion Invite

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact read-only access rules and link-expiration behavior remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved keeping Share Presentation, Share Link, and Companion Invite as distinct concepts.  
**Related:** D-040/D-041 companion access; D-053 simplified companion role; D-056 Share Trip; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

### Share Presentation
Represents the polished, themed itinerary artifact/view intended to be exciting and easy to receive.

May include:
- destination/theme,
- trip title,
- dates,
- city sequence,
- day highlights,
- selected hotels,
- major reservations,
- share-safe trip notes,
- app/deep link.

It must exclude sensitive financial/payment credentials and other private data not intended for sharing.

### Share Link
Represents a link that opens the Share Presentation or an approved read-only trip view.

A Share Link does **not** automatically:
- create trip membership,
- grant expense access,
- grant organizer/companion permissions,
- expose private trip data.

### Companion Invite
Represents the unique access mechanism used to join a Trip as a Companion.

It is governed by the access lifecycle from D-040/D-041:
- unique per companion,
- revocable by organizer,
- unused invites expire,
- joining grants companion permissions.

## Why they remain separate

- A beautiful itinerary can be shared with someone who is not a Trip member.
- Companion membership has stronger access, including shared expenses.
- Sharing should never silently elevate permissions.
- Public/read-only sharing can evolve independently from private membership.

## Next Section 6 decision

Define how source/evidence/freshness data should be modeled for Recommendations and Places.
