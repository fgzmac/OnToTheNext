# Section 3 Closeout — User Journeys and Interface Behavior

**Lifecycle status:** IN REVIEW — awaiting explicit owner approval.  
**Recorded:** 2026-09-21.  
**Purpose:** Consolidate the approved UI/journey decisions into one simple product structure before moving to Section 4 — First-Release Scope and Success Measures.

## Governing UX rule

The app should be:
- useful,
- easy to understand,
- quick to act on,
- visually uncluttered,
- progressively disclosed.

When a new dashboard, widget, menu item, or status surface duplicates information that already exists elsewhere, prefer the simpler experience.

## Simplified primary navigation

The product should not expose every internal feature as a permanent top-level destination.

### Mobile
Primary navigation:
- **Home**
- **Itinerary**
- **Discover**
- **Map**
- **More**

### Web
Use the same conceptual structure, with more room for simultaneous context:
- Home
- Itinerary
- Discover
- Map
- More / contextual utilities

Hotels, Reservations, Expenses, Companions, and Trip Settings remain important product areas, but they do not all need permanent top-level buttons.

They can be entered contextually:
- Hotel options from Home, itinerary city setup, or Discover
- Reservations from itinerary items, Home alerts, or More
- Expenses from quick-add, booking handoff, or More
- Companion access from trip settings / More

This simplifies the earlier D-046 navigation proposal while preserving all approved functionality.

## 1. Create Trip / Onboarding — D-045

Use:
```text
A few useful basics
→ immediate visual recommendations
→ user accepts/denies
→ app asks the next useful question
→ trip gradually takes shape
```

Do not require a long questionnaire before showing value.

Support:
- known destination,
- destination exploration,
- known dates,
- "just exploring",
- traveler count,
- lightweight budget/comfort context when useful.

## 2. Home

### Before the trip
Home should surface only the most useful next action.

Examples:
- choose hotel,
- review a reservation that is ready,
- continue building a day,
- complete one critical missing item.

It may include a **small essentials card**, not a readiness dashboard.

Possible essentials:
- hotels,
- major transportation,
- critical reservations,
- tickets/confirmations,
- companion access,
- arrival plan.

Resolved items can collapse/disappear.

### During the trip — D-054
Home becomes **Today**.

Priority:
1. Next activity
2. Leave-by time
3. Directions
4. Ticket / reservation access
5. Remaining timeline
6. Free time
7. Nearby discovery
8. Return to hotel
9. Quick expense
10. Only meaningful alerts

## 3. Discover — D-048

Recommendation cards remain factual.

Show:
- photo,
- experience name,
- what the traveler does,
- location,
- duration,
- cost,
- travel time,
- reservation requirement,
- availability/verification status,
- useful evidence/cautions,
- itinerary conflict where relevant.

Primary actions:
- **Accept / Add**
- **Deny / Not interested**

Secondary actions may include:
- Must-do
- Save for later
- Compare
- Show another
- Map
- Sources

The app may rank internally using preferences, but should not sell the user with "why this fits you" messaging.

## 4. Itinerary — D-047

Use a day-based vertical timeline.

Represent:
- booked/fixed items,
- must-dos,
- flexible activities,
- travel,
- meals/shopping where useful,
- free time,
- hotel/rest,
- conflicts,
- completed/skipped items.

Important rules:
- free time is intentional,
- saved ≠ scheduled ≠ booked,
- fixed items are protected,
- changes are previewed,
- conflicts are explained,
- the app proposes fixes instead of only reporting problems.

Web may use timeline + map side-by-side.

Mobile uses a simple vertical timeline.

## 5. Hotels — D-049

Hotel selection is a contextual planning flow, not necessarily a permanent top-level tab.

Show roughly 4–5 meaningful options per city when valid inventory supports it.

Include:
- value and comfort tiers,
- useful room photos,
- actual bed/room information when available,
- amenities,
- full-stay price,
- price freshness/status,
- cancellation terms,
- itinerary-aware travel times,
- factual pros/cons,
- map context.

Actions:
- Keep
- Deny
- Compare
- Map

Do not present generic "from" rates as actual trip prices.

## 6. Reservations — D-050

Reservations are a capability available from Home, itinerary items, and More.

States:
- Book now
- Opens later
- Check back
- Optional reservation
- No reservation needed
- Booked
- Needs attention
- Cancelled

For **Check Back**, show the next known inventory release date/time/window when reliable information exists.

If unknown:
> Next batch: Not announced yet

Never mark something Booked merely because it was accepted, scheduled, or an external link was opened.

Booking details should connect directly to itinerary conflicts and expenses.

## 7. Map — D-052

Map is trip-aware and synchronized with the itinerary.

Support:
- whole trip,
- city,
- day.

Distinguish:
- planned/booked,
- accepted/unscheduled,
- suggested,
- hotel,
- food,
- shopping,
- transit.

Use layers/clustering to avoid clutter.

Support:
- route-quality context,
- hotel location comparisons,
- nearby discovery,
- itinerary synchronization,
- external directions handoff.

Continuous background GPS is not required.

## 8. Nearby discovery

Available from:
- Home/Today,
- free-time blocks,
- Map,
- Discover.

The app can consider:
- selected/current area,
- time available,
- next fixed item,
- travel time,
- opening status,
- price,
- prior accepts/denies.

Nothing is inserted into the itinerary until confirmed.

## 9. Expenses — D-051

Expenses remain shared across trip participants.

Support:
- quick-add,
- payer,
- participants,
- equal/exact/percentage/shares splits,
- original currency,
- optional reference currency,
- running balances,
- settlement recording,
- planned versus actual cost,
- reservation/hotel handoff into expenses.

Do not require a separate finance-heavy experience for simple entry.

Direct in-app money movement is not required.

## 10. Companion experience — D-053

Companions primarily:
- view the trip,
- access practical itinerary/reservation/map details,
- view shared costs,
- add expenses they paid,
- view balances,
- record settlements.

Do not build:
- thumbs-up/down,
- voting,
- suggestion inbox,
- itinerary proposal workflow,
- hotel/activity reactions.

Planning changes remain organizer-controlled and can be discussed outside the app.

## 11. Web versus mobile

### Web
Use extra space for:
- map + list,
- hotel comparisons,
- itinerary planning,
- richer research context.

### Mobile
Prioritize:
- one clear task at a time,
- Today,
- quick decisions,
- directions/tickets,
- nearby discovery,
- quick expenses.

Task parity matters more than pixel parity.

## 12. Offline-ready direction

Design essential travel information so it can later be cached locally:
- today's itinerary,
- hotel address,
- reservation time,
- confirmation reference,
- ticket link/attachment where permitted,
- essential notes.

Implementation details remain later architecture work.

## Section 3 approval candidate

Approve Section 3 if this simplified structure is correct:

> The app uses a small primary navigation and keeps most capabilities contextual. Before travel, Home guides the user toward the next useful decision. During travel, Home becomes Today. Discover presents factual recommendations with Accept/Deny. Itinerary handles the real day structure. Map connects geography and nearby discovery. Hotels, reservations, expenses, and companion access exist where needed without becoming a wall of permanent tabs, dashboards, or widgets.

Approval advances the blueprint to **Section 4 — First-Release Scope and Success Measures**.

Approval does not authorize implementation.
