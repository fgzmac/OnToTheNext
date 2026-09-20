# D-037 — Web and mobile are both first-class experiences

**Status:** CONFIRMED product direction; exact technology, breakpoints, native-app strategy, and component layouts remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner wants to optimize for both web and mobile because the product will contain many visuals and could become cramped on mobile.  
**Related:** D-026 prior phone-first focus; D-030 recommendation-led planning; D-036 hotel cards/maps/photos/tradeoffs.  
**Blueprint:** Section 1 remains DRAFT. This decision supersedes the earlier interpretation that desktop parity is not an initial priority, while preserving mobile as essential for on-trip use.

## Confirmed direction

Design the product for **both larger-screen web use and mobile use**.

Do not treat desktop/web as a stretched phone layout or mobile as a squeezed desktop interface. The same trip data and decisions should remain consistent across both experiences, while each form factor emphasizes what it is best at.

This changes D-026's device direction:
- Mobile remains essential, especially during the trip and for spontaneous nearby discovery.
- Larger-screen web is now also a primary experience, especially for visual planning, maps, comparisons, and itinerary organization.
- No native iOS/Android implementation, PWA, responsive-web-only strategy, framework, or deployment choice is selected yet.

## Proposed role split

### Larger-screen web

Prioritize:
- Multi-column hotel comparisons
- Larger hotel photo galleries
- Map + itinerary side-by-side
- Day-by-day itinerary board
- Drag/reorder or reviewable trip organization
- 4–5 hotel cards visible without excessive scrolling
- Pros/cons and evidence comparisons
- Budget visualization
- Reservation/action checklist
- Route and neighborhood exploration
- Optional-destination preview against the established core itinerary

### Mobile

Prioritize:
- Today's itinerary
- What is next
- Reservation details
- Directions / transit handoff
- Quick hotel and booking information
- Nearby spontaneous discovery
- Keep / reject / replace reactions
- Compact comparison of a few recommendations
- Map-first nearby exploration
- Easy access to tickets/links when supported
- Simple edits without exposing every planning control at once

These are proposed emphases, not a final screen inventory.

## Shared experience requirement

A trip should remain the same trip across form factors.

A user who:
- saves a hotel on web,
- rejects an activity on mobile,
- changes a budget preference on web,
- or adds a spontaneous activity on mobile

should see the resulting trip state consistently everywhere once persistence/sync is implemented.

Exact account, sync, offline, conflict-resolution, and publication behavior remain later design questions.

## Responsive visual strategy

D-036's hotel comparison is a strong example.

**Web concept:**  
4–5 hotel cards or a comparison table beside a larger neighborhood/transit map.

**Mobile concept:**  
One focused hotel card at a time, horizontal comparison/swipe or shortlist mode, expandable pros/cons, and a full-screen map when requested.

Do not simply shrink:
- five hotel cards,
- a detailed map,
- photo gallery,
- price graph,
- amenities,
- and itinerary pros/cons

onto one phone screen.

Use progressive disclosure: show the most decision-relevant information first, then let users expand details.

## Visual consistency

Both experiences should share:
- recommendation meaning
- hotel/activity status labels
- source/evidence semantics
- budget meaning
- reservation states
- map symbols
- amenity meanings
- must-do / interested / suggested / booked distinctions
- visual identity

Layout can change by screen size without changing what the data means.

## Product-quality principle

The user should be able to do deep trip planning comfortably on a larger screen and then use the same plan naturally from a phone while traveling.

Success is not pixel-identical parity. Success is **task parity with form-factor-appropriate presentation**.

## Supersedes / preserves

**Supersedes:** D-026 language that desktop parity is not an initial priority.

**Preserves:** Mobile remains central for real-world trip use, spontaneous discovery, directions, quick decisions, and itinerary access.

## Later design questions

Q-013: Browser/device/OS/accessibility coverage for both web and mobile.  
Q-201–Q-214: Which journeys differ by form factor and which stay identical.  
Q-304/Q-352: Test planning tasks on larger screens and on-trip tasks on mobile.  
Q-401/Q-405/Q-407: Delivery architecture, responsive behavior, performance, accessibility, offline strategy, and commercial distribution.

No implementation begins from this decision alone.
