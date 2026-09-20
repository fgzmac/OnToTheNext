# D-047 — Itinerary Builder interaction model approved

**Status:** CONFIRMED Section 3 journey/UI direction. Exact visuals, labels, drag library, conflict engine, and timing rules remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed Itinerary Builder model.  
**Related:** D-023/D-024 balanced days and free time; D-030 recommendation-led planning; D-037 web/mobile; D-046 workspace/navigation; Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed itinerary model

Use a day-based vertical timeline that explicitly represents:
- scheduled activities,
- must-do items,
- booked/fixed items,
- flexible items,
- suggested items,
- travel blocks,
- free-time blocks,
- hotel/rest blocks,
- meal/shopping blocks when relevant,
- conflicts,
- completed/skipped states while traveling.

Saved, scheduled, booked, and completed are different states.

## Confirmed planning behavior

- Free time is intentional and visibly represented.
- Booked/fixed items are protected unless the user explicitly changes them.
- Must-dos receive higher protection than flexible suggestions.
- Flexible items can move or be replaced.
- Travel time appears as explicit itinerary context.
- The app explains conflicts rather than showing only generic warnings.
- Changes are previewed before applying when they materially alter the plan.
- The app should propose fixes instead of requiring the user to solve every conflict manually.

## Reordering and accessibility

Support direct manipulation where appropriate, such as drag/reorder on web.

Dragging is not the only interaction. Provide alternatives such as:
- Move earlier
- Move later
- Move to another day
- Replace
- Remove

## Web behavior

Web should support:
- day selector,
- timeline/planning canvas,
- synchronized map,
- recommendation/suggestion area,
- visible travel and conflicts,
- richer multi-panel context.

## Mobile behavior

Mobile should use a simplified vertical day timeline emphasizing:
- Today
- Next activity
- Leave/travel context
- Directions
- Free time
- Reservation details
- Find something nearby
- Skip/continue/return-to-hotel decisions

## Map synchronization

Selecting an itinerary item should update relevant map context, such as:
- selected stop,
- previous/next stop,
- hotel,
- route,
- nearby food/shopping/optional experiences.

Likewise, map selections may open itinerary/recommendation context.

## Travel-mode interaction

After a planned item, the app can offer:
- Continue plan
- Find something nearby
- Return to hotel
- Skip next activity

No automatic modification occurs until confirmed.

## Next Section 3 decision

Design the Discover / Activity Recommendation experience:
- visual recommendation cards,
- source/community/local evidence,
- group fit,
- Keep / Reject / Must-do / Replace behavior,
- recommendation refinement,
- and web/mobile presentation.
