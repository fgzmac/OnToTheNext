# D-045 — Recommendation-first onboarding with progressive refinement

**Status:** CONFIRMED Section 3 journey direction. Exact screen copy, visual styling, fields, progress indicators, and recommendation counts remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed onboarding model: short setup, immediate visual recommendations, then progressive refinement.  
**Related:** D-030 recommendation-led planning; D-037 web/mobile first-class; approved Sections 1–2; Section 3 User Journeys and Interface Behavior.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed onboarding model

Avoid a long prerequisite questionnaire.

Use a short setup:
- destination or region if known,
- dates or "just exploring",
- number of travelers,
- rough budget/comfort context when useful,

then immediately provide visual recommendations.

The app should learn progressively from:
- kept ideas,
- rejected ideas,
- must-dos,
- reaction reasons,
- companion reactions,
- later itinerary decisions.

## Confirmed journey shape

```text
Create Trip
    → a few useful basics
    → immediate visual recommendations
    → keep / reject / refine
    → app asks the next useful question
    → recommendations improve
    → initial trip structure emerges
```

Do not require the traveler to know all cities, hotels, interests, or activities before seeing value.

## Input philosophy

Use progressive disclosure:
- ask only what materially changes the next recommendation,
- reuse answers already supplied,
- permit skipping nonessential details,
- allow users to correct assumptions later.

A blank search box may exist, but it should not be the only or primary way to begin.

## Date flexibility

Support both:
- known travel dates,
- and "just exploring / dates not set yet."

Exact behavior for date-dependent events and reservation recommendations in undated mode remains later journey detail.

## Web/mobile interpretation

**Web:** may show trip basics alongside multiple recommendation cards and richer context.

**Mobile:** should focus on one/few recommendations at a time with clear Keep / Reject / Show Another actions.

Same trip state and recommendation meaning across form factors.

## Next Section 3 decision

Define the **main planning workspace/dashboard** after onboarding:
- primary navigation,
- how cities/hotels/activities/itinerary/maps/reservations/expenses relate,
- what the organizer sees first,
- and how web versus mobile reorganize the same information.

No implementation begins from this decision alone.
