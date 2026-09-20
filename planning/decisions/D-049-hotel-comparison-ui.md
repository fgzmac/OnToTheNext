# D-049 — Hotel discovery and comparison UI approved

**Status:** CONFIRMED Section 3 hotel UI direction. Exact provider integrations, pricing freshness rules, image rights, and filter set remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner said to continue after reviewing the proposed hotel comparison model; this is treated as approval to proceed.  
**Related:** D-031/D-036/D-038 hotel strategy and comparison requirements; D-037 web/mobile; D-046 workspace; Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed hotel experience

For each city, when valid inventory supports it, show approximately 4–5 meaningful hotel options.

Support:
- configurable price range,
- value and comfort/upscale tiers,
- room and bed details,
- useful hotel/room photos,
- amenities,
- full-stay cost,
- taxes/fees where available,
- cancellation/refundability terms where available,
- itinerary-aware location context,
- transit/walking times to planned anchors,
- factual pros/cons,
- Keep / Deny / Compare / Map actions.

If fewer than 4–5 valid matches exist, show fewer honestly.

## Web behavior

Web should support:
- side-by-side comparison,
- map alongside hotel results,
- filters,
- compare drawer/table,
- richer room/amenity/transit detail.

## Mobile behavior

Mobile should support:
- focused hotel card,
- photo carousel,
- concise room/amenity summary,
- key itinerary distances,
- Keep / Deny,
- Compare / Map,
- deeper details on expansion.

## Pricing state clarity

Prices should identify their status, such as:
- Live for your dates
- Recent observed rate
- Typical rate
- Price unavailable
- Sold out
- Required room/bed unavailable

Do not present generic "from" pricing as if it were the user's actual trip rate.

## Photo priority

Prefer useful booking photos:
1. actual room,
2. bathroom,
3. exterior,
4. practical amenities,
5. common areas,
6. neighborhood context where useful.

Do not make lobby imagery the primary representation when room reality is the key decision factor.

## Next Section 3 decision

Design the Reservations Center:
- booking states,
- timing/urgency,
- official booking route,
- desired date/time,
- linked itinerary item,
- confirmation details,
- reminders/check-back states,
- and web/mobile behavior.
