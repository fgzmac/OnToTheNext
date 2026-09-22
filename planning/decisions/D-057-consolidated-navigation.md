# D-057 — Consolidate related features into fewer primary menus

**Status:** CONFIRMED navigation simplification rule. Exact final navigation labels and responsive layouts remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner wants related features combined wherever practical so the app does not accumulate too many buttons or menu destinations. The owner specifically cited combining Map with Discover because they naturally support the same task.  
**Related:** D-046 trip workspace/navigation; D-052 map experience; D-055 simplicity rule; D-056 shareable itinerary; Section 3 and Section 4.  
**Blueprint:** Section 4 remains DRAFT.

## Confirmed navigation principle

Do not give every capability its own permanent navigation item.

When two capabilities support the same user task, combine them into one experience and expose the secondary capability contextually.

Examples:
- **Discover + Map** belong together.
- **Reservations** should be available from itinerary items, Home, and More rather than requiring a permanent tab.
- **Hotels** should live within the trip-planning/discovery flow for each city rather than requiring permanent navigation.
- **Expenses** should be reachable through quick-add and More rather than occupying primary navigation.
- **Share Trip** should be a contextual action on the trip/itinerary, not a permanent navigation item.
- **Companion access/settings** should live under trip settings / More.

## Revised primary navigation

### Recommended mobile navigation
- **Home**
- **Itinerary**
- **Discover**
- **More**

Map becomes a view/mode inside Discover.

### Recommended web navigation
Use the same conceptual destinations:
- Home
- Itinerary
- Discover
- More

Web may show map, lists, filters, hotel comparison, and itinerary context simultaneously where screen space allows, but these do not become separate global destinations merely because the layout is larger.

## Discover + Map model

Discover should support two tightly connected views:

```text
Discover
├── Explore / Cards
└── Map
```

A user can move between:
- visual recommendation cards,
- map-based exploration,
- nearby options,
- hotel/area context,
- accepted and unscheduled places.

Selecting an item in one view should highlight/open it in the other.

The map remains a major product capability, but not a separate top-level menu.

## Simplicity test

Before adding a permanent navigation item, ask:

1. Is this a distinct user goal?
2. Will the user return to it frequently enough to justify permanent space?
3. Can it be reached naturally from an existing screen?
4. Would combining it reduce cognitive load without hiding important functionality?

If it can be accessed contextually without becoming hard to find, prefer consolidation.

## Current simplified product structure

### Home
- Next useful planning action
- Small essentials card when needed
- During travel: Today

### Itinerary
- Day timeline
- Reservations in context
- Travel/free-time/rest states
- Share Trip action

### Discover
- Activity discovery
- Map mode
- Nearby discovery
- Hotel discovery/comparison by city
- Accepted/unscheduled places
- Local/community evidence

### More
- Expenses
- Travelers / access
- Trip settings
- Reservation management view
- other low-frequency utilities

This structure may continue to be simplified if later usability review shows further consolidation is beneficial.

## Section 4 implication

V1 success includes proving that the product remains useful with a small number of primary navigation choices.

Feature count is not a reason to add more top-level menus.
