# D-052 — Trip-aware synchronized Map experience approved

**Status:** CONFIRMED Section 3 map UI direction. Exact map provider, marker styling, routing source, clustering implementation, and location-permission behavior remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed Map experience.  
**Related:** D-036 hotel/map tradeoffs; D-037 web/mobile first-class; D-047 itinerary builder; D-049 hotel comparison; Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed map model

The map is a visual layer over the trip, not an isolated pin browser.

It should be synchronized with:
- itinerary items,
- hotels,
- accepted/unscheduled activities,
- suggested activities,
- restaurants/food areas,
- shopping,
- transit,
- airports/stations,
- spontaneous nearby options.

## Confirmed views

Support:
- whole-trip view,
- city view,
- specific-day view.

The purpose is to preserve useful context while avoiding excessive marker clutter.

## Marker/state distinction

Planned, booked/fixed, accepted/unscheduled, suggested, hotel, food, shopping, and transit items should be visually distinguishable.

Exact icon/color system remains later visual-design work.

## Map ↔ itinerary synchronization

Selecting an itinerary item should update map context.

Selecting a map item should expose the corresponding itinerary/recommendation context.

Relevant context may include:
- previous/next stop,
- route,
- hotel,
- nearby activities,
- walking/transit duration.

## Route-quality behavior

The map should help identify inefficient day routing.

When possible, show:
- total transit,
- walking,
- inefficient segments,
- geographic backtracking.

Proposed improvements must be previewed before changing the itinerary.

## Hotel comparison support

Selecting different hotel options should update relevant itinerary transit/walking context so users can compare location tradeoffs with actual trip anchors.

## Layers and clustering

Map layers may include:

**Trip**
- confirmed itinerary
- must-dos
- accepted/unscheduled

**Explore**
- activities
- food
- shopping
- nightlife
- cultural
- events

**Logistics**
- hotels
- transit
- airports/stations

Nearby markers may cluster when zoomed out.

## Nearby / spontaneous mode

A traveler can request nearby options using:
- current location,
- hotel,
- itinerary stop,
- manually selected area.

The system may consider:
- free time remaining,
- next fixed reservation,
- travel time,
- opening status,
- price,
- preference history,
- accepted/denied options.

No suggestion is added to the itinerary until the user confirms.

## Location privacy

Continuous background GPS is not required.

Live/current location should not automatically become visible to companions.

Users can choose whether to use location or substitute a hotel/stop/manual area.

## Routing scope

Initial scope does not require full turn-by-turn navigation.

The app can show summary routing and hand off to a selected external map/transit provider for detailed directions.

## Web/mobile behavior

**Web:** map plus planning/comparison panels.

**Mobile:** full-screen touch-first map with bottom information card and nearby discovery actions.

## Next Section 3 decision

Design Companion Collaboration:
- reactions,
- suggestions,
- proposed itinerary changes,
- organizer approval/rejection,
- shared expenses,
- visibility of group participation,
- and mobile/web interaction.
