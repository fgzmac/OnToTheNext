# D-028 — Main cities first; optional destinations afterward; flights-only booking baseline

**Status:** CONFIRMED planning sequence; current booking baseline RECORDED from owner. Detailed completion rules and implementation remain OPEN.  
**Recorded:** 2026-09-19.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner likes the suggested destinations but wants the app to focus on booking around the main cities first, branching out once their itinerary is done. Nothing has been booked except plane tickets.  
**Related:** D-026 immediate Japan preparation and phone focus; D-027 starting cities and worthwhile lesser-known destinations; D-015 reservations; D-018 priorities; D-023/D-024 balanced days.  
**Blueprint:** Section 1 remains DRAFT; this is not whole-section or implementation approval.

## Confirmed direction

Prioritize **Tokyo, Kyoto, and Osaka** as the core itinerary. Organize the main-city plan and its booking needs first. Offer optional lesser-known destinations after the itinerary for those areas is established, not as competing decisions during initial setup.

The owner expresses interest in the previously proposed Chichibu, Kinosaki Onsen, and Uji ideas. This is not selection of a stop, date, overnight stay, or reservation. Keep them as optional candidates for the later expansion stage. No new destination research or booking rule has been verified in this update.

This is a product-flow requirement, not merely a one-off itinerary preference. Apply the same focus to the immediate Japan planning workstream. It refines when D-027's destination suggestions appear; it does not remove that capability or postpone it to an unspecified future product release.

## Current booking baseline

**User-reported:** Plane tickets are the only bookings made. Hotels, intercity transportation, and timed experiences have not been booked.

Q-015 is answered. Do not ask for the same broad inventory again. Exact flight dates and Tokyo-local arrival/departure times were already supplied in the conversation and stay outside this public repository. Do not invent airports, flight numbers, fares, booking references, cancellation terms, stay dates, or live verification.

The interior city order, nights, and accommodation arrangements can now be proposed within the already-supplied flight constraints. The absence of other bookings does not select a route, a hotel strategy, or permission to purchase anything.

## Proposed product flow for later specification

```text
Choose the main cities
    → Establish city order and nights
    → Build the main-city itinerary and identify booking needs
    → Review the core plan and unresolved reservations
    → Explore optional additional destinations
    → Preview any effect on time, travel, cost, stays, and commitments
    → Accept an addition or keep the core itinerary unchanged
```

The main-cities-before-extensions sequence is confirmed. Exact substeps, hotel-versus-activity selection order, screen layout, and the rule for considering the core itinerary complete remain proposed.

### Proposed meaning of a ready core plan

A reviewed draft could identify the city order, intended stays and transportation, main experiences, dining/reservation needs, and desired free time. Each arrangement should retain its actual status: proposed, selected but unbooked, confirmed by the user, or verified by a provider where applicable. Exact labels and fields are for later design.

**Do not equate a completed itinerary with everything purchased.** The user has not required every ticket, hotel, or restaurant to be booked before optional exploration. The precise review/confirmation that enables expansion is OPEN. Equally, do not present incomplete or tentative reservations as secured merely because the main-city schedule is assembled.

Reservation-sensitive main-city choices remain an immediate planning priority under D-026. Identify their actual booking requirements as they are selected, rather than waiting for the whole app or treating every option as urgent without evidence.

### Proposed handling of optional expansion

Evaluate an optional city against the reviewed core plan. A visit may fit existing free time, replace a flexible item, or require an overnight/route change; show those consequences before the traveler decides. Do not silently shorten a main-city stay, move a confirmed commitment, cancel a booking, or fill protected rest time to make a candidate fit.

Not every extra destination must be rejected because it requires change. Larger changes should be visible choices, not automatic rewrites. If no worthwhile addition fits, the main-city itinerary remains a successful complete plan.

The previously researched candidates remain on hold for this expansion stage. Their annual dates, transport orientation, operator descriptions, and availability limits in D-027 need rechecking when considered; positive interest is not acceptance or a current booking opportunity.

## Boundaries and continuity

Phone-first focus, San Jose spontaneous-discovery testing, immediate Japan itinerary preparation, the November 10, 2026 software-test target, free-first spending, and the existing quality/same-day/ease priority order remain unchanged.

No in-app transactions, automatic purchases, imports, providers, host/identity architecture, notifications, location tracking, or Codex implementation are approved. A manually prepared itinerary is not proof that the software implements the workflow.

This amendment supersedes any current next-step prompt to inventory already-booked arrangements or prioritize extra destinations before completing the core plan. Earlier records remain historical; do not erase them or confuse main-city-first sequencing with removal of D-027.

## Questions and next step

- **Resolved Q-015:** Only flights booked.
- **Q-014:** Main cities known; order, nights, and hotel-base strategy still OPEN. Optional additions are explicitly sequenced after the core itinerary.
- **Next practical question under Q-014:** Is a separate hotel stay in each main city preferred, or fewer hotel changes with more travel from a base? This is a preference to clarify, not a claim about route feasibility or a selected accommodation arrangement.
- **Later Q-202/Q-209/Q-210:** Specify the core-plan review point, booking-status treatment, and optional-extension preview without requiring all purchases upfront.
- **Later Q-304/Q-305:** Test that optional additions disclose conflicts and leave the core plan unchanged when declined.

Updated alongside README and the open-question tracker. The earlier product brief and historical register are read with D-026 through D-028. No private detailed itinerary, source lookup, purchase, or product test has been created by this documentation update.
