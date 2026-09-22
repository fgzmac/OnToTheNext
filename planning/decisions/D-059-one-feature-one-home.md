# D-059 — One feature, one canonical home

**Status:** CONFIRMED navigation/design rule. Exact information architecture details may continue to evolve, but duplicate cross-section feature entry points should be avoided.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner wants every feature to have one specific place in the product. Example: Map lives in Discover and should not also appear as a redirect/link in unrelated sections.  
**Related:** D-055 simplicity rule; D-057 consolidated navigation; D-058 home-centered utilities and planning-only hotels; Section 3 and Section 4.  
**Blueprint:** Section 4 remains DRAFT.

## Confirmed rule

Every major capability should have **one canonical home**.

Do not scatter duplicate buttons, links, or alternate entry points across unrelated sections just because the feature is relevant there.

The product should teach the user a predictable mental model:

```text
Need the map?        → Discover
Need the day plan?   → Itinerary
Need trip hub/tools? → Home
```

## Canonical homes

### Home
Home owns:
- trip-level summary / next useful action,
- Share Trip,
- Expenses,
- Travelers / Companion Access,
- lightweight trip settings or trip-level utilities where needed,
- Today mode during travel.

### Itinerary
Itinerary owns:
- day-by-day schedule,
- activity timing,
- travel blocks,
- free time,
- hotel/rest blocks,
- booked/fixed versus flexible items,
- day-level conflict handling,
- reservation details when attached to a scheduled item.

### Discover
Discover owns:
- activity recommendations,
- destination/city exploration,
- nearby discovery,
- Map mode,
- geographic exploration,
- hotel discovery/comparison during the planning phase.

## Important distinction: context versus navigation

Other sections may display **contextual information** from another feature when needed, but should not create a duplicate path to that feature.

Example:
- Itinerary may show that the next stop is 18 minutes away.
- It should not add a separate "Open Map" shortcut if Map's home is Discover.
- Today may show a reservation time or hotel address because those facts are operationally necessary.
- That does not mean Today becomes a second Reservations or Hotels hub.

The user should not have to wonder which of several buttons leads to the "real" version of a feature.

## Navigation principle

Avoid:
- duplicate feature buttons,
- shortcut proliferation,
- repeated feature cards in unrelated sections,
- multiple navigation paths to the same management screen unless required by a platform convention.

Prefer:
- one predictable home,
- clear back navigation,
- shallow hierarchy,
- preserved context,
- relevant facts displayed in place.

## Section 4 success implication

A V1 navigation test should verify that users can correctly predict where to find a feature after learning the app once.

The goal is not maximum shortcut density; it is a stable and memorable information architecture.
