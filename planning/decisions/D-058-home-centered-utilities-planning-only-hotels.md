# D-058 — Home-centered utilities and planning-only hotel flow

**Status:** CONFIRMED navigation and lifecycle simplification. Exact transition animations, back-navigation patterns, and final settings placement remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner wants Hotels to exist only during planning, and wants Share Trip, Expenses, and Companion Access launched from Home rather than occupying persistent navigation. Navigation between screens should remain fast and obvious.  
**Related:** D-046, D-049, D-055, D-056, D-057; Section 3 and Section 4.  
**Blueprint:** Section 4 remains DRAFT.

## Confirmed navigation simplification

Persistent navigation should focus only on high-frequency trip tasks.

### Recommended primary navigation
- **Home**
- **Itinerary**
- **Discover**

A permanent `More` destination is no longer required for the capabilities identified below.

Low-frequency utilities can be launched from Home or a compact settings/profile affordance.

## Home as the trip hub

Home can expose compact buttons/cards for:
- **Share Trip**
- **Expenses**
- **Travelers / Companion Access**
- **Trip Settings** when needed
- **Reservations requiring attention** when relevant

Selecting one opens its dedicated focused screen.

Each secondary screen should provide:
- obvious back navigation,
- preservation of the user's trip context,
- quick return to Home,
- no deep nested menu maze.

The goal is easy movement between functions without adding permanent navigation tabs.

## Hotels are planning-only

Hotel discovery/comparison exists while lodging is unresolved.

During planning:
```text
Home / city planning
    → Choose hotel
    → Compare hotel options
    → Select / book externally
    → Save reservation
```

Once a city stay is confirmed:
- the hotel recommendation/comparison surface no longer needs to remain a prominent navigation option,
- the selected hotel becomes part of the itinerary/trip details,
- hotel address, confirmation, check-in/out, directions, and cost remain available where operationally useful.

A user may still deliberately change a hotel later through the relevant reservation/trip detail, but the product should not keep presenting hotel-shopping UI after the task is complete.

## Lifecycle-based UI principle

Features can appear or recede based on trip state.

Examples:
- Hotel selection appears while lodging is unresolved.
- Hotel shopping recedes after booking.
- Reservation actions surface when action is required.
- Today replaces planning emphasis during travel.
- Share/Expenses/Travelers remain accessible from Home without consuming primary navigation.

The interface should reflect what the traveler needs **now**, not expose every capability at all times.

## Back-and-forth navigation principle

Secondary screens should feel like branches from the trip, not separate applications.

Preferred behavior:
- Home → Expenses → Back/Home
- Home → Travelers → Back/Home
- Home → Share Trip → Back/Home
- Discover → Map mode → back to cards without losing filters/context
- Itinerary → Reservation details → back to the same day/item
- Itinerary → Hotel details → back to the same trip context

Preserve scroll position, selected day, filters, and relevant state where practical.

## Section 4 implication

V1 should prove that a small persistent navigation can support the full core experience.

The first software test should prioritize:
- obvious navigation,
- shallow hierarchy,
- preserved context,
- and state-aware appearance/disappearance of planning tools.
