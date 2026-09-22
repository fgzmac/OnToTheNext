# Section 4 — First-Release Scope and Success Measures

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–3; decisions D-001 through D-055.  
**Approval record:** None yet.

## Purpose

Define the smallest first release that proves the product is genuinely useful without overbuilding it.

The first release should validate the core loop:

```text
Create trip
→ get useful recommendations
→ accept/deny
→ build itinerary
→ manage reservations
→ use trip on mobile
→ track shared expenses
```

## First-release design rule

Prefer:
- a smaller set of highly useful features,
- reliable core flows,
- simple navigation,
- transparent data states,
- and a real end-to-end trip experience.

Avoid:
- feature breadth for its own sake,
- duplicate dashboards,
- complex social systems,
- unnecessary payment infrastructure,
- background automation that is difficult to trust,
- and integrations that do not materially improve the core trip.

## Proposed V1 core

### 1. Trip creation
- Destination/region
- Dates or exploring mode
- Traveler count
- Lightweight preferences
- Save/resume

### 2. Recommendation-led Discover
- Visual activity cards
- Factual details
- Accept / Deny
- Must-do / Save where useful
- Basic evidence/source links
- Date-specific event support
- Recommendation refinement from user actions

### 3. Itinerary
- Day timeline
- Scheduled activities
- Travel blocks
- Free time
- Hotel/rest blocks
- Fixed/flexible states
- Basic conflict detection
- Move/reorder
- Mobile Today view

### 4. Hotels
- 4–5 meaningful options when available
- Value / comfort tiers
- Room/bed/amenity details
- Price state
- Map/transit context
- Keep / Deny / Compare
- External booking handoff

### 5. Reservations
- Book now / Opens later / Check back / Booked states
- Next inventory release when known
- Official booking link
- Desired versus confirmed time
- Confirmation details
- Itinerary connection

### 6. Map
- Trip/day/city views
- Itinerary synchronization
- Hotels and activities
- Basic route/travel-time context
- Nearby discovery
- External directions handoff

### 7. Expenses
- Shared expense entry
- Equal / exact / percentage / shares
- Payer and participants
- Original currency
- Running balances
- Planned versus actual
- Record external settlement

### 8. Companion access
- Unique invite
- Lightweight guest identity
- View trip
- View shared costs
- Add own expenses
- No voting/suggestion workflow

### 9. Mobile travel mode
- Today
- Next activity
- Leave-by context
- Tickets / confirmation access
- Directions
- Free-time actions
- Return to hotel
- Quick expense

## Proposed V1 exclusions

Not required for the first release:
- In-app payment processing
- Airline booking
- Universal direct hotel booking
- Full turn-by-turn navigation
- Continuous background GPS
- Social network/community posting
- Companion voting/suggestions
- Complex group roles
- Full receipt OCR/itemization
- Autonomous itinerary rewriting
- Automatic purchasing
- Guide marketplace
- Universal global coverage on day one
- Complex push-notification infrastructure
- Native offline sync beyond essential cached trip data
- Advanced recommendation ML before simpler ranking works

## First-release success concept

Success should be demonstrated through behavior, not vanity metrics.

Candidate first-release success measures:

### Planning usefulness
- A user can create a trip and reach a usable initial itinerary without external spreadsheets.
- Recommendations produce enough accepted items to form a meaningful plan.
- Users can understand why an item is bookable, unavailable, or needs checking later.

### Simplicity
- Core tasks are reachable without hunting through menus.
- The user can continue planning without needing to understand the whole app.
- Mobile Today provides what is needed during the trip without exposing planning complexity.

### Reliability
- Accepted/scheduled/booked states do not get confused.
- Existing plans are not silently overwritten.
- Reservation status is transparent.
- Expense math is reproducible and understandable.

### Real-trip validation
- The owner can use the app to plan the Japan trip.
- San Jose/local testing can validate spontaneous nearby discovery before travel.
- The product can support an end-to-end simulated trip before the November 10, 2026 software-test target.

## First Section 4 decision

**Q-301:** Should V1 include all eight core areas above, or should we narrow the first software-test build further?

**Recommended direction:** keep all eight as product scope, but define three tiers for implementation:

### Tier A — Must work end-to-end
- Trip creation
- Discover
- Itinerary
- Reservations
- Mobile Today

### Tier B — Must exist in useful form
- Hotels
- Map
- Expenses
- Companion viewing

### Tier C — May be simplified/stubbed for first software test
- Live inventory monitoring
- Rich multi-source recommendation ingestion
- Advanced route optimization
- Real-time transit/weather alerts
- Full offline caching
- Complex currency conversion
- Automatic reservation/provider integrations

This keeps the complete product shape intact while protecting the November test target.


## Added V1 capability — Shareable themed itinerary — D-056

A completed itinerary should be able to generate a polished, destination-themed trip summary that can be sent by text or email and includes a link back into the app.

### V1 target
- Generate a clean themed itinerary presentation.
- Include trip title/destination, dates, city sequence, day highlights, selected hotels, and major reservations where appropriate.
- Use destination-aware visual styling.
- Support **Share Trip** through device-native sharing, allowing text/email selection.
- Support Copy Link.
- Include an app/deep link.
- Do not expose sensitive credentials/private financial information.

### Later enhancements
- PDF export
- Image/story-style export
- Custom cover/theme editing
- Multiple visual templates
- Interactive external web presentation
- Social sharing

### Scope tier

**Recommended:** Tier A/B boundary — the sharing flow must work in V1, while highly customized export formats/themes may be simplified.

The important V1 proof is:
> Finish itinerary → Share Trip → recipient opens an exciting, readable trip summary → recipient can follow the app link.


## V1 navigation simplification — D-057

V1 should validate a small primary navigation:
- Home
- Itinerary
- Discover
- More

Map is integrated into Discover rather than shipped as a separate permanent tab.

Other capabilities should be contextual where possible:
- Hotels inside planning/discovery by city
- Reservations from itinerary/Home/More
- Expenses via quick-add and More
- Share Trip from trip/itinerary
- Companion access under trip settings/More

A successful V1 should prove that these capabilities remain easy to find without exposing each one as a separate global menu.


## V1 navigation/lifecycle amendment — D-058

Primary navigation target:
- Home
- Itinerary
- Discover

Home launches focused secondary screens for:
- Share Trip
- Expenses
- Travelers / Companion Access
- Trip Settings when needed

Hotel comparison is a planning-phase flow and should recede after lodging is confirmed.

V1 navigation success includes:
- shallow navigation,
- obvious back actions,
- preserved screen context,
- no redundant permanent tabs,
- state-aware appearance/disappearance of planning tools.


## V1 information-architecture rule — D-059

V1 should enforce **one feature, one canonical home**.

Canonical structure:
- Home → Share Trip, Expenses, Travelers/Companion Access, trip-level utilities
- Itinerary → day schedule and scheduled-item details
- Discover → recommendations, nearby discovery, Map, planning-phase hotel discovery

Contextual facts may appear elsewhere, but duplicate shortcut/redirect buttons should be avoided.

### Navigation success criterion

After learning the app once, a user should be able to predict where a feature lives without hunting between duplicate entry points.
