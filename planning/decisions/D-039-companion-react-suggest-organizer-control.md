# D-039 — Companion can view, react, and suggest; organizer retains final control

**Status:** CONFIRMED initial permission model. Detailed reactions, suggestion workflow, voting, notification behavior, and future co-editor permissions remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed Section 2 model: companions can view, react, and suggest while the organizer retains final control.  
**Related:** Approved Section 1; Section 2 Users, Roles, and Ownership; D-030 recommendation-led planning; D-037 web/mobile first-class.  
**Blueprint:** Section 2 remains DRAFT.

## Confirmed permission model

### Organizer
The organizer:
- Owns the trip by default.
- Makes final itinerary decisions.
- Can accept or reject companion suggestions.
- Can change the itinerary.
- Can manage core trip preferences and planning choices.
- Retains final control over confirmed or locked plan items.

### Companion
A companion can:
- View the shared itinerary.
- See practical trip information that the organizer chooses to share.
- React to recommendations.
- Suggest alternatives.
- Participate in planning without directly overwriting the organizer's plan.

By default, a companion **cannot**:
- Delete the trip.
- Directly move or remove confirmed itinerary items.
- Directly change locked or booked items.
- Override the organizer's final decision.

## Product implication

Companion input should appear as a proposal or reaction, not as an immediate destructive edit.

Example:

```text
Companion likes Hotel B
        ↓
Companion suggests Hotel B
        ↓
Organizer sees:
"Companion prefers Hotel B because it is closer to shopping."
        ↓
Organizer accepts / rejects / keeps comparing
```

This model fits the recommendation-led product because multiple travelers can contribute preference signals without immediately creating co-edit conflicts.

## Still open

- Exact reaction types: like/dislike, emojis, rankings, comments, etc.
- Whether companions can vote between options.
- Whether companions can suggest a new hotel/activity not already surfaced.
- Whether companions can edit notes.
- Whether the organizer can grant co-editor rights later.
- Whether companions see all budget details, private notes, booking references, or only selected shared fields.
- Whether companion actions trigger notifications.
- Account versus shared-link access.
- Access revocation and expiration.

## Next decision

Resolve whether companions need an account or can participate through a shared invite/link.

No implementation begins from this permission decision alone.
