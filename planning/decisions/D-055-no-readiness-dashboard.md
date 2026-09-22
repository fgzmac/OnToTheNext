# D-055 — No readiness dashboard; keep trip prep lightweight

**Status:** CONFIRMED Section 3 simplification.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner rejected a dedicated trip-readiness dashboard as too complex and requested a simpler product with only a short essentials checklist.  
**Related:** D-045 recommendation-first onboarding; D-046 trip workspace; D-050 reservations; D-054 Today experience; Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed simplification

Do **not** create:
- a dedicated Trip Readiness dashboard,
- a readiness percentage/score,
- a menu full of checklists,
- multiple readiness widgets duplicating Hotels, Reservations, Expenses, and Itinerary,
- extra planning surfaces whose information already exists elsewhere.

The product should prioritize:
- usefulness,
- simplicity,
- low visual clutter,
- clear primary actions,
- minimal navigation,
- progressive disclosure.

## Essentials checklist

A short trip-prep checklist is still useful.

It should be lightweight and embedded in an existing surface such as Overview/Home or a small pre-departure card.

Possible items:
- Hotel(s) booked
- Major transportation handled
- Critical reservations handled
- Tickets/confirmations accessible
- Companion access active
- Airport/arrival plan known

The list should stay short and trip-specific.

It should not become a general-purpose travel checklist system.

## Behavior

- Resolved items can collapse or disappear.
- Intentional free time is never treated as incomplete planning.
- Existing modules remain the source of truth for details.
- A checklist item should deep-link to the relevant existing screen instead of creating another management interface.
- The app may surface one important unresolved item on Home, but should avoid stacked warning widgets.

## Product rule

When choosing between:
- more controls,
- more status widgets,
- more dashboards,

and a simpler path to the user's next useful action,

prefer the simpler path unless the added UI solves a clear recurring problem.

## Next Section 3 step

Review the remaining Section 3 journeys for unnecessary complexity, simplify where needed, and close the section once the core experience is coherent.
