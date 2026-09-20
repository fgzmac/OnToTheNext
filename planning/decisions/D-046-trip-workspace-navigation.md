# D-046 — Trip-centered workspace and responsive navigation approved

**Status:** CONFIRMED Section 3 information architecture. Exact visual styling, labels, component sizing, and breakpoint behavior remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed trip-centered workspace/navigation structure.  
**Related:** D-037 web/mobile first-class; D-045 recommendation-first onboarding; Section 3 User Journeys and Interface Behavior.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed conceptual structure

Each trip is organized around these conceptual areas:
- Overview
- Itinerary
- Discover
- Hotels
- Reservations
- Expenses
- Map

Exact labels may change, but these information domains are confirmed.

## Overview behavior

The Overview should be recommendation-driven rather than a passive dashboard.

It should surface:
- the next useful planning decision,
- upcoming booking actions,
- unresolved conflicts,
- companion suggestions,
- current trip progress,
- recommendation cards,
- high-level hotel/itinerary/expense status.

The app should guide the user toward the next meaningful action instead of requiring them to manually inspect every module.

## Web workspace

Larger-screen web should support:
- persistent trip navigation,
- main planning canvas,
- contextual side panel or map,
- richer comparisons,
- multi-column layouts,
- simultaneous context where it improves decision-making.

## Mobile workspace

Primary mobile navigation should stay compact.

Confirmed direction:
- Home
- Itinerary
- Discover
- Map
- More

Secondary areas such as Hotels, Reservations, Expenses, Companions, and Trip Settings may live under Home/More or contextual entry points.

## Planning mode versus travel mode

The same trip should adapt emphasis over time.

**Planning mode:** next decision, hotel/activity selection, reservations, route building.

**Travel mode:** today's plan, next activity, directions, hotel, reservation details, nearby discovery, quick expense entry.

Exact automatic-switching behavior remains open, but the responsive task emphasis is confirmed.

## Next Section 3 decision

Define the Itinerary Builder:
- visual day structure,
- fixed versus flexible items,
- travel blocks,
- free-time blocks,
- hotel breaks,
- reservation status,
- conflicts,
- drag/reorder plus accessible alternatives,
- map synchronization,
- and mobile versus web behavior.
