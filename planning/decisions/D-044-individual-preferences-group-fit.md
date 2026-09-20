# D-044 — Individual traveler preferences with transparent group fit

**Status:** CONFIRMED recommendation and group-preference model. Exact scoring, weighting, privacy controls, onboarding questions, and conflict-resolution UI remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed model: each traveler keeps their own preferences/reactions, recommendations explain individual and group fit, and the organizer retains the final decision.  
**Related:** D-030 recommendation-led planning; D-039 companion participation; D-042 shared finances; Section 2 Users, Roles, and Ownership.  
**Blueprint:** Section 2 remains DRAFT.

## Confirmed model

Each traveler should have their own preference profile and reaction history within the trip.

The app should not collapse all travelers into one anonymous average profile.

Recommendations should be able to explain:
- strong fit for everyone,
- strong fit for one traveler but weak for another,
- balanced alternatives,
- and visible conflicts.

The organizer still makes the final itinerary decision.

## Group-fit behavior

Example:

| Option | Organizer | Companion | Group interpretation |
| --- | --- | --- | --- |
| Option A | Strong fit | Strong fit | Excellent group match |
| Option B | Strong fit | Low interest | Organizer-heavy choice |
| Option C | Medium fit | Strong fit | Companion-heavy choice |
| Option D | Medium fit | Medium fit | Balanced alternative |

The app should surface these differences rather than silently averaging them away.

## Recommendation implications

The system may use:
- explicit interests,
- kept/rejected recommendations,
- must-do selections,
- hotel preferences,
- activity pace,
- budget preferences,
- accommodation preferences,
- amenity preferences,
- and later reactions

to improve suggestions for each traveler.

A rejection should not automatically become a permanent dislike of an entire category.

## Conflict handling

When traveler preferences conflict, the app should:
- show the disagreement,
- propose alternatives,
- explain tradeoffs,
- preserve already accepted commitments,
- and let the organizer decide.

It should not automatically optimize for the organizer only, the companion only, or a hidden mathematical average.

## Privacy boundary

Trip participants may see group-fit explanations, but later design must determine:
- whether every raw preference is visible to every participant,
- whether private personal notes/preferences exist,
- and how much explanation is appropriate without exposing sensitive information.

No sensitive personal inference is authorized.

## Next step

This resolves Q-106 at the product-model level.

Section 2 can now be reviewed for completion. Remaining implementation-level details such as exact invite expiry duration, role-change UI, expense edit permissions, and raw-preference visibility may be safely carried into later interface/data/security sections if the owner approves the Section 2 model.
