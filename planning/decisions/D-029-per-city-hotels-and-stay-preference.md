# D-029 — Separate main-city hotel stays and an app question about hotel bases

**Status:** CONFIRMED trip preference and product-question inclusion. Exact interface, hotel choices, route, and nights remain OPEN.  
**Recorded:** 2026-09-19.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner's answer to separate hotel stays versus fewer bases: “New hotel in each city. But this is a good question to ask users in the app.”  
**Related:** D-009/D-010 hotel and transportation support; D-023/D-024 day balance and hotel breaks; D-026 immediate Japan planning and phone focus; D-027 main cities; D-028 main-city-first sequence and booking baseline.  
**Blueprint status:** Section 1 remains DRAFT. Record this requirement now; specify the question and resulting behavior in the relevant later journey section.

## Confirmed choices

**For the initial trip:** Use a separate hotel stay in each of the main cities: Tokyo, Kyoto, and Osaka. Do not substitute one shared base for multiple main cities without the owner's explicit revision. This answers the hotel-base portion of Q-014.

**For the product:** Ask travelers about their preferred hotel-base strategy instead of assuming everyone wants to change hotels in each city. The question should distinguish separate city stays from fewer bases with travel to other destinations. Asking the question is confirmed; exact wording, options, placement, defaults, and validation remain to be designed.

The owner's choice is a trip preference, not a permanent account preference or universal product default. No actual hotel or room has been selected, reserved, or purchased. The latest booking baseline is still flights only (D-028).

## Proposed question and choices

> When visiting multiple cities, how would you prefer to arrange your hotel stays?

| Proposed answer | Intended interpretation |
| --- | --- |
| A hotel stay in each city | Plan accommodation in each selected main city and evaluate travel between those stays. |
| Fewer hotel changes | Compare staying in fewer bases and traveling to other cities when practical. Do not promise that this works for every route. |
| I am not sure; show me the tradeoffs | Explain the alternatives before asking for a final preference. This additional option is proposed, not explicitly approved. |

Ask when relevant to a multi-city trip, after the main cities are known and before finalizing accommodation and routing recommendations. This placement is proposed. Do not require a hotel booking before basic activity discovery, repeat an already answered question unnecessarily, or impose the same questionnaire on a single-city outing without a reason.

## Proposed effects on planning

Use the answer when evaluating city order and nights, hotel locations, transfers, packing and luggage handling, check-in/check-out timing, time available for activities, and hotel breaks. These are design considerations, not verified transport estimates, provider guarantees, a completed optimization rule, or an instruction to book.

Show the consequences of an alternative rather than claiming that changing hotels always saves time or that fewer bases always save money. Compare the actual route and available lodging information when those decisions are made.

Treat travel/check-in days as distinct from full activity days where the actual timing calls for it. Preserve the earlier preference for main experiences plus optional downtime and spontaneous discovery. Do not fill relocation days as if changing cities used no time.

Keep this preference editable. A proposed change should explain affected stays, transfers, activities, and reservations before altering the plan. Existing confirmed arrangements must not be silently canceled, moved, or replaced. Exact edit permissions and approval/publication rules remain Section 2/3 decisions.

## Boundaries and unresolved details

A separate stay in each city does not determine city order, night allocation, hotel district, room type, nightly spending, or a specific property. If the route revisits a city, whether to reuse the same property or choose another is still open; this answer is not a requirement to choose a new hotel on every return. It also does not require changing accommodation for every optional day trip or lesser-known destination.

D-028 still governs sequencing: establish the core-city itinerary and booking needs first, then assess optional destinations. D-026 still keeps real Japan preparation independent of app readiness. Phone-first, free-first, ranked success standards, and the November software-test target are unchanged.

No accommodation search, current availability or price verification, booking transaction, provider selection, paid service, application code, or completed test is established by this update. Exact personal travel dates, flight details, and private spending values remain outside public commits.

## Next decisions and traceability

**Resolved:** Q-014 hotel-base preference; the app should ask the corresponding traveler question. Do not ask the owner to choose separate city hotels versus fewer bases again.

**Next useful input — Q-016:** Preferred lodging style and priorities for the main-city shortlist: simple/comfortable, upscale, or a mix with a special stay. No category is preselected. Core city order and nights remain Q-014; budget currency and inclusions remain Q-011. Do not infer a nightly room budget from the per-person total.

**Later specification:** Q-201 question timing and minimal onboarding; Q-209 hotel/transport recommendations and revisions; Q-202 core route and optional expansion; Q-304/Q-352 evaluation of whether choices affect the plan; Q-305 transfer-day constraints; Q-404 trip-level preference representation. These links do not mark those sections complete.

**Affected records:** This standalone amendment, README, and open-question tracker. It extends the historical decision register through D-025 and the standalone D-026–D-028 records.

**Revisit:** The owner changes the trip preference, actual route/lodging evidence reveals a conflict, or testing shows the question or tradeoffs are unclear.
