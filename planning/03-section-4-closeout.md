# Section 4 Closeout — First-Release Scope and Success Measures

**Lifecycle status:** APPROVED.  
**Recorded:** 2026-09-21.  
**Purpose:** Lock the V1 product boundary and define how the first complete software test will be judged before moving to Section 5 — Assumptions, Risks, and Early Experiments.

## V1 product rule

The first release must prove the full trip loop without overbuilding:

```text
Create trip
→ Discover
→ Accept / Deny
→ Build itinerary
→ Handle reservations
→ Share trip
→ Use trip on mobile
→ Track shared expenses
```

The product should stay simple, with one canonical home for each feature.

## Canonical navigation

### Primary navigation
- **Home**
- **Itinerary**
- **Discover**

### Canonical feature homes

**Home owns**
- Share Trip
- Expenses
- Travelers / Companion Access
- trip-level utilities
- Today mode during travel

**Itinerary owns**
- day-by-day schedule
- fixed/flexible items
- travel blocks
- free time
- hotel/rest blocks
- scheduled reservation details
- day-level conflicts and changes

**Discover owns**
- activity recommendations
- nearby discovery
- Map mode
- geographic exploration
- planning-phase hotel discovery/comparison

Other sections may display relevant facts, but should avoid duplicate redirect buttons to another feature.

## Lifecycle-based UI

Features appear when needed and recede when their job is done.

Example:
- Hotel discovery appears while lodging is unresolved.
- Once a hotel is confirmed, hotel-shopping UI recedes.
- The selected hotel remains available operationally in the itinerary/Today experience.
- Reservation actions surface when action is needed.
- Mobile Home becomes Today during travel.

## Tier A — Must work end-to-end

### 1. Trip creation
- destination/region
- dates or exploring mode
- traveler count
- lightweight preference setup
- save/resume

### 2. Discover + Map
- factual recommendation cards
- Accept / Deny
- Must-do / Save where useful
- basic evidence/source links
- date-specific events
- Map as a Discover mode
- nearby discovery
- basic recommendation refinement from user actions

### 3. Itinerary
- day timeline
- scheduled activities
- travel blocks
- free time
- hotel/rest
- fixed/flexible states
- basic conflict detection
- move/reorder
- mobile Today integration

### 4. Reservations
- Book now
- Opens later
- Check back
- Optional
- No reservation needed
- Booked
- Needs attention
- Cancelled
- next inventory release date/time/window when known
- official booking link
- desired versus confirmed time
- confirmation details
- itinerary connection

### 5. Mobile Today
- next activity
- leave-by context
- tickets/confirmation access
- directions information
- remaining day
- free-time actions
- nearby discovery
- return-to-hotel
- quick expense

### 6. Share Trip
- generate a polished, destination-themed itinerary summary
- share through device-native sharing for text/email
- copy link
- link back into the app
- no sensitive financial/payment information in the shared presentation

## Tier B — Must exist in useful form

### Hotels
- planning-phase only
- 4–5 meaningful options per city when inventory supports it
- value / comfort tiers
- useful room photos
- bed/room/amenity details
- price state
- itinerary-aware location context
- factual pros/cons
- Keep / Deny / Compare
- external booking handoff

### Expenses
- shared expense entry
- equal/exact/percentage/shares splits
- payer/participants
- original currency
- running balances
- planned versus actual cost
- record external settlement

### Companion viewing
- unique invite
- lightweight guest identity
- view shared trip
- view shared costs
- add expenses they paid
- view balances / record settlement
- no voting/suggestion workflow

## Tier C — May be simplified, manually supported, or partially integrated for first software test

- automatic live inventory monitoring
- broad automated Reddit/community/local-source ingestion
- advanced route optimization
- real-time transit alerts
- real-time weather alerts
- full offline synchronization
- sophisticated currency conversion
- direct reservation-provider integrations
- advanced recommendation ML
- advanced theme customization/export formats

## Explicit V1 exclusions

Not required:
- in-app payment processing
- airline purchasing
- universal direct hotel booking
- full turn-by-turn navigation
- continuous background GPS
- social network/community posting
- companion voting/suggestions
- complex group-role system
- detailed receipt OCR/itemization
- autonomous purchasing
- automatic whole-trip rewriting
- guide marketplace

## First software-test success criteria

### Test 1 — Start a trip
The organizer can create a trip and reach useful recommendations quickly without a long setup form.

**Pass:** no dead end and no excessive onboarding.

### Test 2 — Build the trip
The organizer can Discover → Accept/Deny → schedule activities → preserve free time → form a usable multi-day itinerary.

**Pass:** the itinerary is realistic enough to use.

### Test 3 — Handle planning details
The organizer can choose lodging during planning, save confirmed lodging, manage reservation states, and understand travel/geographic context.

**Pass:** the trip feels operational, not like a wishlist.

### Test 4 — Share it
The organizer can generate and send an attractive themed itinerary that is understandable outside the editor and links back into the app.

**Pass:** receiving the trip feels intentional and exciting rather than like receiving a plain calendar dump.

### Test 5 — Use it while traveling
Mobile Today clearly answers:
- What am I doing next?
- When should I leave?
- Where is my ticket/confirmation?
- How do I get there?
- What can I do during free time?

**Pass:** these answers do not require hunting through menus.

### Test 6 — Travel together
A companion can open the trip and see what they need, and travelers can enter shared expenses, understand balances, and settle up.

**Pass:** no separate itinerary spreadsheet is required for the shared trip.

## Core V1 success standard

> A single organizer can plan, share, and use a real trip from beginning to end without needing a separate itinerary spreadsheet.

External specialized services are acceptable for:
- payment/purchasing,
- official ticketing,
- turn-by-turn navigation,
- and other narrow tasks.

The trip itself should remain coherent in this app.

## Simplicity success standard

V1 should also prove:
- shallow navigation,
- obvious back behavior,
- preserved context,
- no redundant permanent tabs,
- one feature / one canonical home,
- state-aware appearance/disappearance of planning tools.

A user who learns the app once should be able to predict where major features live.

## Section 4 approval candidate

Approve Section 4 if this V1 boundary is correct.

Approval advances the blueprint to **Section 5 — Assumptions, Risks, and Early Experiments**.

Approval does not authorize implementation.


## Approval record

**Approved by owner:** 2026-09-21.  
**Owner instruction:** “Approve section 4.”  
**Effect:** Advance to Section 5 — Assumptions, Risks, and Early Experiments. This approval does not authorize implementation.
