# Section 3 — User Journeys and Interface Behavior

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-20.  
**Related:** Approved Section 1 and Section 2; decisions D-001 through D-044.  
**Approval record:** None yet; individual journey/UI choices will be recorded as they are made.

## Purpose

Turn the approved product model into concrete web and mobile journeys, screens, states, and interaction rules before implementation.

This section will define:
- onboarding and trip creation,
- recommendation-led planning,
- destination/city suggestions,
- hotel comparison,
- activity discovery,
- itinerary building,
- reservation/action tracking,
- companion interactions,
- shared expenses,
- web dashboard,
- mobile trip mode,
- and spontaneous nearby discovery.

## Design principle

Do not ask the user to solve the plan before the app can help.

Use:

```text
Known trip context
    → concrete recommendations
    → user reacts
    → app refines
    → plan becomes more complete
```

The UI should preserve accepted decisions and avoid unnecessary repeated questions.

## Web and mobile roles

### Web
Best for:
- rich visual planning,
- multi-column comparison,
- map + itinerary side-by-side,
- hotel/activity research,
- budget/expense dashboards,
- reservation/action lists,
- route and day organization.

### Mobile
Best for:
- today's itinerary,
- quick recommendation reactions,
- nearby spontaneous discovery,
- directions/transit handoff,
- reservation details,
- expense entry,
- map-first exploration,
- quick edits.

Same trip data, different layout emphasis.

## Journey 1 — Create and shape a trip

**Actor:** Organizer  
**Trigger:** Starts a new trip  
**Goal:** Reach a useful initial trip structure without completing a huge questionnaire.

Proposed flow:

1. Create trip.
2. Enter destination/date basics if known.
3. App suggests main destinations/cities.
4. User keeps/rejects/refines.
5. App asks only the next meaningful question.
6. User sets major preferences such as pace, budget, hotel strategy, interests.
7. App proposes an initial route.
8. User reviews and confirms/refines.

Open details:
- exact first screen,
- date-free exploration,
- required versus skippable fields,
- progress indicator,
- save/resume behavior.

## Journey 2 — Hotel discovery and comparison

**Actor:** Organizer; companions may react/suggest  
**Goal:** Select hotels that fit the actual itinerary.

Confirmed product requirements:
- 4–5 meaningful hotels per city when valid inventory supports it,
- configurable price range,
- value and comfort/upscale tiers,
- photos,
- actual room/bed information when supported,
- amenities,
- itinerary-aware pros/cons,
- map/transit context,
- nearby shopping/food/activities,
- keep/reject/compare/refine reactions.

Proposed web layout:
- hotel cards/table on left,
- large map on right,
- sticky filters,
- compare drawer.

Proposed mobile layout:
- focused hotel card,
- photo carousel,
- top pros/cons,
- expandable amenities,
- full-screen map,
- horizontal compare/shortlist.

## Journey 3 — Activity recommendation and selection

**Actor:** Organizer + companion reactions  
**Goal:** Find worthwhile things without needing to research from scratch.

Proposed flow:
- App surfaces a small set of activities.
- Each card explains why it fits.
- Show source/evidence context.
- User can Keep / Reject / Must-do / Show different.
- Companion can react/suggest.
- App refines future options.

Open:
- exact labels,
- swipe versus buttons,
- rejection reasons,
- how many cards,
- comparison behavior,
- how group-fit appears.

## Journey 4 — Build and review itinerary

**Goal:** Turn selected activities into realistic days.

UI must account for:
- fixed reservations,
- travel time,
- hotel location,
- free time,
- meals/shopping/rest,
- opening hours,
- partial arrival/departure days,
- transfer days,
- same-day additions.

Proposed web:
- day columns/timeline,
- map sync,
- draggable/reorderable with accessible alternatives,
- visible conflicts.

Proposed mobile:
- vertical day timeline,
- next-item emphasis,
- compact conflict warnings,
- easy day switching.

## Journey 5 — Reservation/action center

States may include:
- Book now
- Booking opens later
- Optional reservation
- No reservation needed
- Booked/confirmed
- Conflict
- Current-year details not published

Proposed screen:
- chronological action list,
- urgency/status,
- official booking route,
- desired target date/time,
- linked itinerary item.

## Journey 6 — Companion participation

Companion can:
- view,
- react,
- suggest,
- see group-fit,
- participate in shared expenses.

Organizer can:
- accept/reject suggestions,
- retain final control,
- manage access.

Open:
- comment/reaction UI,
- notification behavior,
- pending-suggestion inbox,
- visibility of raw preferences.

## Journey 7 — Shared expenses

Proposed experience:
- add expense,
- choose payer,
- choose participants,
- choose split method,
- show running balances,
- settle up after trip.

Web:
- expense dashboard and category totals.

Mobile:
- quick-add expense and current balance.

Open:
- exact split modes for V1,
- edit/delete permissions,
- receipt photo,
- currency conversion behavior.

## Journey 8 — On-trip mobile mode

Default emphasis:
- Today's plan
- Next activity
- hotel
- tickets/reservations
- directions
- quick expense entry
- nearby discovery

Avoid exposing every planning control at once.

## Journey 9 — Spontaneous discovery

Flow:

```text
Open "What should we do now?"
    → use or choose current area
    → use remaining time + preferences + commitments
    → show worthwhile nearby options
    → explain travel / entry / cost / reservation constraints
    → preview addition
    → confirm or keep free time
```

No automatic filling of downtime.

## First Section 3 decision

**Q-201:** What should the first screen after “Create trip” feel like?

Proposed direction:

### Recommendation-first start
Ask only a few basics:
- Where are you thinking of going?
- Dates or “just exploring”
- Who is going?
- Rough budget/comfort level

Then immediately show a visually rich set of destination/city ideas and let the user react.

Avoid a long onboarding questionnaire before the app gives any value.

**Confirmed direction — D-045:** short setup → immediate visual recommendations → progressive refinement.

The app should not front-load a long questionnaire before showing value.

## Next decision — Main planning workspace

**Q-202/Q-201 follow-on:** What should the organizer see after the trip has an initial structure?

Proposed information architecture:

### Primary trip navigation
- **Overview**
- **Itinerary**
- **Discover**
- **Hotels**
- **Reservations**
- **Expenses**
- **Map**

These are proposed top-level destinations; exact labels and whether some combine remain open.

### Web workspace
Proposed default:
- left navigation,
- main planning canvas,
- contextual right-side panel or map,
- persistent trip header with dates/travelers/budget state.

### Mobile workspace
Proposed default:
- bottom navigation with 4–5 high-frequency sections,
- secondary items under More/Trip,
- Today's plan emphasized while traveling,
- full-screen map when selected.

### Overview page
Proposed contents:
- trip progress / what remains undecided,
- next booking action,
- current city plan,
- hotel status,
- must-do count,
- companion suggestions,
- current budget/expense snapshot,
- recommendation cards for the next useful decision.

**Confirmed direction — D-046:** trip-centered workspace with Overview / Itinerary / Discover / Hotels / Reservations / Expenses / Map as the conceptual structure. Web exposes richer simultaneous context; mobile uses Home / Itinerary / Discover / Map / More with contextual access to secondary areas. The Overview surfaces the next useful action.

## Next decision — Itinerary Builder

**Q-203/Q-213/Q-305 follow-on:** How should the itinerary visually represent scheduled items, travel, free time, rest, reservations, and conflicts?

Proposed model:
- vertical timeline by day,
- cards for activities/reservations,
- explicit travel blocks,
- explicit free-time blocks,
- optional hotel/rest blocks,
- fixed/locked versus flexible states,
- visible booking status,
- conflict warnings,
- map synchronization,
- drag/reorder on web plus accessible Move Earlier / Move Later controls,
- simplified vertical timeline on mobile.

Detailed proposal follows in the discussion.
