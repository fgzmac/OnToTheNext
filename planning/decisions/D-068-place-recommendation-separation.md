# D-068 — Separate reusable Place from trip-specific Recommendation

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact provider/source normalization and recommendation-ranking fields remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved separating factual Place data from trip-specific Recommendation state.  
**Related:** D-048 factual Discover cards; D-052 Map experience; D-067 typed Itinerary Item model; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

Use separate concepts for **Place** and **Recommendation**.

## Place

Place represents a reusable factual geographic/entity record.

Conceptual properties may include:
- name,
- coordinates,
- address,
- category/type,
- provider/source identifiers,
- official website/source metadata,
- geographic hierarchy such as city/neighborhood,
- other normalized location facts.

Examples:
- Shibuya Sky
- Fushimi Inari
- restaurant
- hotel
- station
- airport
- neighborhood
- event venue

## Recommendation

Recommendation represents the app proposing something for a specific trip/planning context.

Conceptual properties may include:
- linked Place when applicable,
- trip reference,
- factual summary shown to the user,
- duration,
- cost basis,
- reservation context,
- freshness/source evidence,
- ranking/context,
- user outcome.

Possible outcomes include:
- Accepted
- Denied
- Saved
- Must-do

## Why they remain separate

- The same Place can appear across many trips.
- Accept/Deny belongs to the specific trip/user context, not the global Place.
- Map/location data remains reusable.
- Recommendation evidence and ranking can change without mutating the core Place identity.
- A Recommendation may sometimes represent an experience broader than one single Place.

## Relationship to itinerary

A Recommendation can become or inform an Itinerary Item only after an explicit user action.

The resulting Itinerary Item may reference:
- the Recommendation,
- the Place,
- both,
- or neither for custom/freeform items.

## Next Section 6 decision

Define how multi-city trips are represented:
- whether a Trip should contain explicit city/stay segments,
- how Days attach to those segments,
- and how hotel stays and intercity travel relate to them.
