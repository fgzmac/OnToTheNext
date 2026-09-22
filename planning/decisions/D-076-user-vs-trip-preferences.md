# D-076 — Separate long-term User Preferences from Trip Preferences

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact preference fields, learning behavior, and privacy controls remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved separating durable user preferences from trip-specific planning preferences.  
**Related:** D-030 recommendation-led planning; D-044 preference model; D-075 Recommendation Decision; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

Use two distinct preference concepts:

### User Preference Profile
Optional longer-term tendencies that may help future trips.

Conceptual examples:
- general interests,
- recurring accommodation preferences,
- typical pace,
- recurring dislikes/preferences,
- explicitly provided accessibility needs,
- other durable travel tendencies.

### Trip Preference Profile
Represents the planning context for one specific Trip.

Conceptual examples:
- budget/comfort range,
- pace for this Trip,
- trip-specific interests,
- must-dos,
- exclusions,
- hotel requirements,
- transportation preferences,
- special constraints.

## Precedence rule

For the current Trip:

**Trip Preference Profile takes priority over User Preference Profile.**

A long-term preference should never silently override an explicit trip-specific choice.

## Why they remain separate

- Trip context changes.
- One unusual Trip should not permanently distort future recommendations.
- Recommendation behavior remains easier to explain.
- Trip preferences can be removed with the Trip.
- Long-term preferences remain optional and user-controlled.
- Recommendation Decisions can inform either profile later without forcing automatic permanent learning.

## Important boundary

Recommendation Decisions are observations about user choices.

They do not automatically become permanent User Preferences without later-defined learning rules.

## Next Section 6 decision

Define how the trip's budget target relates to Planned Costs and actual Expenses.
