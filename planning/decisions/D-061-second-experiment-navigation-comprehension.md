# D-061 — Navigation comprehension is the second validation experiment

**Status:** CONFIRMED Section 5 experiment priority.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed navigation-comprehension experiment.  
**Related:** D-057 consolidated navigation; D-058 home-centered utilities; D-059 one-feature-one-home; Section 5.  
**Blueprint:** Section 5 remains DRAFT.

## Second experiment

Validate whether the simplified information architecture is predictable without relying on duplicated shortcuts.

### Structure under test
- Home
- Itinerary
- Discover

Canonical homes:
- Home → Share Trip, Expenses, Travelers
- Itinerary → day planning and scheduled details
- Discover → recommendations, Map, nearby discovery, planning-phase hotels

### Test tasks
Ask a tester, with minimal orientation, to:
1. Find the map.
2. Add an expense.
3. Share the trip.
4. Change a scheduled activity.
5. Find something new nearby.
6. Find traveler/companion access.

Do not tell them where each feature lives.

### Success target
The tester should correctly predict the section for at least **5 of 6 tasks** without hunting through multiple menus.

### Interpretation
If users repeatedly miss the same task:
- reconsider that feature's canonical home,
- improve labels/hierarchy,
- avoid solving the problem by scattering duplicate shortcut buttons throughout the app.

## Next experiment
Validate whether reservation states are immediately understandable and action-oriented.
