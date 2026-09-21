# D-053 — Simplified companion role: view trip and participate in expenses

**Status:** CONFIRMED amendment to the companion-collaboration model. This supersedes the in-app reaction/suggestion portions of D-039 and D-044.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner does not want companions to use in-app thumbs-up/down, suggestion, or proposal workflows. Companions are expected to communicate planning feedback directly to the organizer outside the app.  
**Related:** D-039, D-040, D-041, D-042, D-043, D-044, Section 2, Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed companion role

Companions can:
- Join through their unique invite.
- View the shared trip.
- View itinerary, hotels, reservations, maps, and shared trip costs.
- View booking details needed for the trip.
- Participate in shared expense tracking.
- Add expenses they paid.
- Record settlements they make.
- See balances and shared financial history.

Companions do **not** need in-app controls for:
- thumbs-up/down reactions,
- activity voting,
- hotel voting,
- suggesting alternatives,
- proposing itinerary changes,
- commenting on planning choices,
- organizer approval workflows for planning suggestions.

If a companion wants a planning change, they can communicate with the organizer directly through their normal communication channel.

## Organizer role

The organizer remains responsible for:
- selecting/rejecting recommendations,
- choosing hotels,
- changing itinerary items,
- managing reservations,
- making final planning decisions,
- managing companion access.

## Expense collaboration remains

Expense participation is still collaborative because companions may directly incur trip costs.

Companions should be able to:
- add an expense they paid,
- edit their own expense,
- see how it is split,
- see current balances,
- record settlement.

Edits/deletions of another person's expense remain controlled and should preserve meaningful history.

## Preference-model amendment

The app no longer depends on companion reactions/suggestions to build an in-app group-fit score.

Traveler preferences may still exist as product concepts where explicitly collected, but the UI should not require companion voting or expose a group-fit workflow.

The primary recommendation loop is centered on the organizer's planning interactions and explicit trip inputs.

## Product simplification

Remove from current scope:
- companion suggestion inbox,
- companion reaction badges,
- approval/decline workflow for companion proposals,
- push notifications for planning reactions/suggestions,
- group-fit displays based on companion voting.

This reduces UI complexity while preserving the useful shared-trip and shared-expense experience.

## Next Section 3 decision

Design the **On-Trip Mobile Home / Today experience**:
- today's itinerary,
- next activity,
- reservation/ticket access,
- directions,
- hotel return,
- nearby discovery,
- quick expense entry,
- and handling changes during the day.
