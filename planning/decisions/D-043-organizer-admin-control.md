# D-043 — Organizer administrative control; expense history survives membership changes

**Status:** CONFIRMED administrative permission model. Exact ownership-transfer flow, deletion recovery, and expense-edit permissions remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed organizer-admin model.  
**Related:** D-039 companion participation; D-040/D-041 invite lifecycle; D-042 shared finances and expense ledger; Section 2 Users, Roles, and Ownership.  
**Blueprint:** Section 2 remains DRAFT.

## Confirmed administrative model

The organizer can:
- Invite companions.
- Remove/revoke companion access.
- Publish/share the itinerary.
- Delete the trip.
- Deliberately transfer trip ownership.
- Retain final administrative control over the trip.

Companions cannot by default:
- Delete the trip.
- Remove other companions.
- Transfer ownership.
- Override organizer administrative decisions.

## Expense-history safeguard

Removing a companion from active trip access must **not erase shared financial history**.

If a removed participant has:
- paid expenses,
- owes money,
- is owed money,
- or appears in settled history,

those records remain preserved for the trip's financial ledger until explicitly resolved according to later-defined rules.

Membership state and financial-history state are separate concepts.

## Ownership transfer

Ownership transfer is allowed in principle, but must be deliberate.

Later design should specify:
- who can receive ownership,
- whether the recipient must have a full account,
- confirmation requirements,
- what happens to the original organizer's role,
- and whether transfer is reversible.

## Deletion boundary

Trip deletion is an organizer action, but later sections must define:
- warnings/confirmation,
- what happens to shared companions,
- what happens to expense records,
- whether there is recovery/undo,
- and retention/deletion requirements.

No permanent-delete behavior is selected by this decision.

## Next decision

Resolve how group preferences influence recommendation ranking:
- organizer-only preferences,
- combined traveler preferences,
- individual preference profiles,
- conflict handling,
- and whether the app should seek consensus versus preserve distinct tastes.

No implementation begins from this decision alone.
