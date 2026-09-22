# Section 5 — Assumptions, Risks, and Early Experiments

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–4; decisions D-001 through D-059.  
**Approval record:** None yet.

## Purpose

Identify the assumptions that could make the product fail even if the software works, then define cheap tests that can validate or falsify those assumptions before deeper implementation.

The goal is not to eliminate all uncertainty. It is to reduce the most expensive uncertainty first.

## Core assumptions to test

### A1 — Recommendations are actually useful
Assumption:
Travelers will value a small number of curated, factual recommendations more than a large undifferentiated search result list.

Risk:
If recommendation quality is weak, the core product loses its reason to exist.

Early experiment:
Use the Japan pilot and San Jose/local tests to compare:
- app-curated shortlist,
- ordinary search/maps results,
- and manually researched options.

Measure:
- percentage of suggestions the organizer accepts,
- whether accepted suggestions materially improve the itinerary,
- whether the user still feels forced to research elsewhere.

### A2 — Accept / Deny is enough
Assumption:
A simple Accept / Deny interaction can teach the system enough without requiring long preference questionnaires or "why this fits" explanations.

Risk:
Too little signal may make recommendations repetitive or generic.

Early experiment:
Track how quickly recommendations improve after:
- a few accepts,
- a few denies,
- a few must-do selections.

Measure:
Does the next batch visibly get better without extra questioning?

### A3 — One-feature-one-home stays understandable
Assumption:
A small navigation model (Home / Itinerary / Discover) is easier to learn than many shortcut buttons.

Risk:
Over-consolidation could hide important capabilities.

Early experiment:
Give a prototype to a tester after a short introduction and ask:
- Where would you look for the map?
- Where would you add an expense?
- Where would you share the trip?
- Where would you change a scheduled activity?

Measure:
Can users predict the correct home without trial-and-error?

### A4 — Planning-only hotel discovery is enough
Assumption:
Hotel-shopping UI can disappear after booking without making later hotel management confusing.

Risk:
Users may need to revisit or change lodging more often than expected.

Early experiment:
Prototype the lifecycle:
- unresolved hotel,
- hotel selected,
- hotel booked,
- change hotel.

Measure:
Can users still find the confirmed hotel details and intentionally change lodging when needed?

### A5 — Reservation states are understandable
Assumption:
Book Now / Opens Later / Check Back / Booked and related states are clear enough to prevent missed bookings.

Risk:
Users may confuse "accepted" with "booked" or misunderstand future inventory release timing.

Early experiment:
Show reservation cards to testers with different scenarios and ask what action they would take next.

Measure:
Can users correctly identify:
- what is already booked,
- what can be booked now,
- what needs waiting,
- and when the next inventory batch is expected?

### A6 — Themed sharing is valuable
Assumption:
A polished destination-themed itinerary makes the trip more exciting and useful to recipients than a plain link or text list.

Risk:
Themed sharing could become decorative work that users do not care about.

Early experiment:
Create 2–3 mock shared-trip formats:
- plain itinerary,
- polished themed summary,
- themed summary with app link.

Measure:
Which one would users actually send?

### A7 — Today mode provides enough on-trip value
Assumption:
Next activity, leave-by context, ticket access, directions context, free-time actions, and quick expenses are the highest-value on-trip tasks.

Risk:
Users may still default to notes, email, screenshots, or maps because the app is too slow or incomplete.

Early experiment:
Use a simulated day in San Jose:
- fixed reservation,
- free-time block,
- nearby discovery,
- return-to-hotel/home equivalent,
- expense entry.

Measure:
How often does the tester need another app for trip-state information versus specialized navigation/payment tasks?

### A8 — Shared expenses belong in the same app
Assumption:
Simple Splitwise-like expense tracking adds value without making the travel app feel bloated.

Risk:
Expense features may add cognitive weight or duplicate tools users already prefer.

Early experiment:
Run a two-person simulated trip day with several expenses.

Measure:
Can both people understand:
- who paid,
- what each owes,
- and the final balance
without opening a spreadsheet or another expense app?

## Technical/product risks

### R1 — Data freshness
Travel inventory, hours, ticket rules, and prices change.

Mitigation direction:
- show source and freshness states,
- distinguish verified/current/estimated/unknown,
- avoid pretending stale data is live.

### R2 — Recommendation-source access
Community/local data may have licensing, API, scraping, attribution, or rate-limit constraints.

Mitigation direction:
- validate source rights early,
- avoid building V1 around unauthorized scraping,
- support multiple source classes,
- keep source adapters replaceable.

### R3 — Live inventory complexity
Real-time hotel/activity inventory can be expensive or restricted.

Mitigation direction:
Treat live monitoring as Tier C initially; preserve manual/current-state entry and external booking handoff.

### R4 — Map/routing dependence
Routing and travel-time quality depend on third-party providers.

Mitigation direction:
Keep map/routing as provider-backed infrastructure, not custom routing logic in V1.

### R5 — Currency conversion ambiguity
Card settlement, exchange rates, and refunds can differ from estimates.

Mitigation direction:
Preserve original currency/amount and make reference conversion transparent/editable.

### R6 — Offline/travel connectivity
Poor connectivity could make the app unreliable on the road.

Mitigation direction:
Design critical Today data for eventual local caching and test degraded-connectivity behavior early.

### R7 — Overbuilding
The product could become cluttered by adding a new screen for every capability.

Mitigation direction:
Enforce D-055/D-057/D-058/D-059:
- simple primary navigation,
- contextual capabilities,
- lifecycle-based UI,
- one feature / one canonical home.

## First Section 5 decision

**Q-401:** Which assumption should we test first?

**Recommended first experiment:** test recommendation usefulness before deeper implementation.

Reason:
If users do not consistently accept and value the recommendations, the product's central differentiator is weak regardless of how polished the itinerary, map, sharing, or expense features become.

Suggested experiment:
1. Build a lightweight clickable/mock Discover flow using the Japan pilot.
2. Present small factual recommendation batches.
3. Let the organizer Accept / Deny.
4. Refine the next batch manually or with simple rules.
5. Track whether the second/third batch improves meaningfully.

Success signal:
The user says the app is saving research effort and accepts enough options to start forming a trip without needing to leave and research everything independently.


## Experiment priority — D-060

**Confirmed:** Recommendation usefulness is the first validation experiment.

The Japan pilot will be used to test small factual recommendation batches with Accept / Deny, followed by refined batches.

## Next decision — Navigation comprehension experiment

Test whether the simplified structure is immediately understandable:

- Home
- Itinerary
- Discover

Canonical homes:
- Home → Share Trip, Expenses, Travelers
- Itinerary → day planning and scheduled details
- Discover → recommendations, Map, nearby discovery, planning-phase hotels

### Proposed test

Give a tester the prototype after minimal orientation and ask them to complete these tasks:

1. Find the map.
2. Add an expense.
3. Share the trip.
4. Change a scheduled activity.
5. Find a new activity near today's plan.
6. Find the travelers/access screen.

Do **not** tell them where each feature lives.

### Success target

The user should correctly predict the section for at least **5 of 6 tasks** without hunting through multiple menus.

If multiple users repeatedly miss the same task, adjust the information architecture rather than adding duplicate shortcut buttons everywhere.

**Recommended direction:** use this as the second Section 5 experiment.


## Experiment priority — D-061

**Confirmed:** Navigation comprehension is Experiment 2.

Success target: at least 5 of 6 common tasks are found in the correct canonical section without menu hunting.

## Next decision — Reservation-state comprehension experiment

Test whether users can correctly distinguish:
- **Book now**
- **Opens later**
- **Check back**
- **Booked**
- **Needs attention**

### Proposed test

Show 5–6 reservation cards with realistic scenarios and ask the tester:

- What should you do now?
- Is this already booked?
- If not, why can't/can't you book it?
- When should you check again?
- Is there a known next inventory release?
- Does the itinerary already depend on this time?

### Success target

For every card, the tester should correctly identify the next action and whether the reservation is actually confirmed.

Particularly important:
- **Opens later** = booking window is known but not open yet.
- **Check back** = inventory/details are currently unavailable or incomplete; show next known batch if available.
- **Booked** = confirmed, not merely accepted or scheduled.

**Recommended direction:** use this as Experiment 3.
