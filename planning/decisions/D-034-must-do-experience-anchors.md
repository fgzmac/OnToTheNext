# D-034 — Initial must-do experience anchors for Japan

**Status:** RECORDED owner priorities; itinerary placement, booking status, and exact variants remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner supplied examples of experiences they definitely want to do and asked planning to continue with recommendations.  
**Related:** D-018 recommendation quality; D-019 personal taste; D-020 both provider/app-assembled experiences; D-022 cultural experiences; D-028 main cities first; D-032 approved city schedule; D-033 hotel amenities.  
**Blueprint status:** Section 1 remains DRAFT. This record informs the actual Japan itinerary and later product behavior; it does not authorize bookings.

## Must-do anchors supplied by the owner

### Tokyo
- Shibuya Crossing
- SHIBUYA SKY
- Pokémon Centers
- Senso-ji
- Imperial Palace / castle-area experience (exact desired component still to be clarified by recommendations)
- Akihabara
- Ginza
- Tokyo National Museum
- teamLab Planets
- Matcha places / experiences

### Kyoto
- Fushimi Inari Taisha
- Nishiki Market
- Honen-in Temple
- Arashiyama
- Nijo-jo Castle
- Pokémon Center Kyoto
- Matcha places / experiences
- Hot-spring experience if it fits the core-city itinerary

### Osaka
- Universal Studios Japan, with SUPER NINTENDO WORLD as a priority
- Dotonbori
- Shinsekai
- Pokémon Center Osaka / Osaka DX
- Hot-spring experience if it fits the core-city itinerary
- Matcha places / experiences where worthwhile

These are strong itinerary anchors, not a complete checklist, exact daily order, or proof of availability.

## Planning rule

Use these anchors to generate complementary suggestions rather than asking the owner to invent more activities from scratch.

Proposed behavior:

```text
Must-do anchor
    → cluster nearby or naturally complementary experiences
    → show which additions improve the day
    → preserve rest / shopping / food time
    → distinguish optional recommendations from must-dos
```

Avoid adding filler simply because it is nearby. A suggestion should earn its place through fit, timing, local relevance, or convenience.

## Reservation-sensitive candidates

Current public research indicates that some anchors require more attention than others:
- SUPER NINTENDO WORLD may require area timed-entry handling in addition to Universal Studios Japan admission.
- SHIBUYA SKY sells timed admission and currently publishes a limited forward sales window.
- teamLab Planets uses timed admission tickets.
- Nijo-jo Castle has optional reserved English guided tours; ordinary admission and any special-access details must be checked separately.

Exact booking windows and current-year operating details must be verified against official sources before creating an action deadline. A must-do is not a confirmed reservation.

## Product implication

The app needs a clear distinction between:
- **Must do**
- **Interested / keep**
- **Suggested**
- **Booked / confirmed**
- **Optional if nearby / if time allows**

Exact names and controls remain later UI work. The app should use must-dos as anchors but still surface conflicts, reservation deadlines, travel burden, and free-time tradeoffs.

## Next planning step

Build the core Tokyo, Kyoto, and Osaka experience structure around these anchors, add complementary recommendations, then use that structure to refine hotel-area choices and reservation actions.

Optional lesser-known cities remain deferred until the main-city itinerary is established under D-028.
