# D-048 — Discover cards stay factual; user accepts or denies

**Status:** CONFIRMED Section 3 Discover UI direction. Exact card layout, evidence density, action labels, and ranking logic remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed Discover model with one change: do not explain why an activity is a good match; present useful details and let the user accept or deny it.  
**Related:** D-030 recommendation-led planning; D-035 community/local sourcing; D-044 group preferences; D-047 itinerary builder; Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed Discover principle

The recommendation engine may use traveler preferences, trip context, group reactions, dates, geography, budget, and prior choices to rank candidates internally.

The UI should **not** try to persuade the user with statements such as:
- "Why this fits you"
- "Because you liked..."
- "Strong match for you"
- "People like you also liked..."

Instead, show clear factual and decision-relevant details so the traveler can decide for themselves.

## Recommended card information

A Discover card should prioritize:
- Photo / visual
- Experience name
- What the traveler actually does
- Location
- Duration / total-time estimate
- Approximate or current price basis
- Distance / travel time from relevant itinerary context
- Reservation requirement/status
- Date/time constraints
- Current availability/verification status where supported
- Source/evidence summary
- Practical pros/cons or cautions when factual
- Whether it conflicts with the current itinerary

Community/local/review evidence can still be expandable, but it should describe evidence rather than convert it into a personalized sales pitch.

## User actions

Primary actions should be simple and direct:
- **Accept / Add**
- **Deny / Not interested**

Additional actions may include:
- Must-do
- Save for later
- Compare
- Show another
- View map
- View sources

Exact wording remains UI detail.

## Preference learning

The app can still learn from:
- accepted options,
- denied options,
- optional rejection reasons,
- companion reactions,
- must-do choices,
- itinerary edits.

A denial remains one signal, not a permanent category ban.

The preference-learning logic should refine future ranking without requiring the card to expose the internal reasoning.

## Group behavior

Individual and group preference profiles from D-044 remain valid internally.

The Discover card does not need to show a numeric "group fit" score by default.

Companion reactions can still be shown as explicit social input, for example:
- "1 companion accepted"
- "Companion suggested this"

That is different from the app asserting why the activity fits the group.

## Evidence behavior

Expandable evidence can show:
- recent traveler/community discussion,
- locally based source context,
- review themes,
- official verification,
- cautions,
- conflicting information,
- source links.

Do not overstate community opinion or current logistics.

## Web/mobile

**Web:** richer side-by-side cards, map, filters, evidence drawer.

**Mobile:** focused visual card with concise facts and clear Accept / Deny actions; deeper details and sources behind expansion.

## Next Section 3 decision

Formalize the Hotel Discovery & Comparison screen using the same principle:
- factual details,
- 4–5 meaningful options,
- configurable price range,
- photos,
- amenities,
- map/transit context,
- pros/cons,
- and clear Keep / Reject / Compare behavior.

No implementation begins from this decision alone.
