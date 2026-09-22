# Section 8 — Lightweight API Capability Inventory

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–7; decisions D-001 through D-090.  
**Approval record:** None yet.

## Purpose

List the application capabilities that the frontend and internal modules need without prematurely designing detailed REST/GraphQL contracts.

This section answers:

> What must the system be able to do?

It does **not** yet answer:
- exact URL paths,
- exact request/response JSON,
- exact database queries,
- final provider API contracts.

Those details belong later when the current feature is specified for implementation.

## API design principles

### 1. Capability-first
Name capabilities around product actions and domain rules.

### 2. One source of truth
Do not create separate web/mobile APIs for the same product state.

### 3. Domain language
Use Trip, Segment, Itinerary Item, Reservation, Expense, Recommendation, and other approved concepts consistently.

### 4. Preserve state distinctions
Capabilities must not blur:
- Accepted vs Scheduled,
- Scheduled vs Booked,
- Planned Cost vs Expense,
- Share Link vs Companion Invite.

### 5. Provider abstraction
Frontend capabilities should use app-owned concepts rather than Google/Mapbox/hotel-provider-specific payloads.

## Capability groups

## A. Trip lifecycle

Needed capabilities:

- Create Trip
- Read Trip
- Update Trip basics
- Archive/delete Trip later
- List Trips
- Update trip dates/destination
- Read trip-level summary for Home
- Generate/save trip title/theme metadata where needed

Prototype simplification:
- single-owner personal mode is acceptable initially.

## B. Trip Segments

Needed capabilities:

- Add Segment
- Read Segment
- Update Segment
- Reorder Segments
- Remove Segment
- Assign destination/base
- Set arrival/departure context
- Attach/update Hotel Stay
- Read Segment Days

## C. Days and Itinerary

Needed capabilities:

- Create/read Day
- Read day timeline
- Add Itinerary Item
- Update Itinerary Item
- Move/reorder Itinerary Item
- Move item to another Day
- Mark fixed/flexible/must-do where appropriate
- Skip/complete item during travel
- Add/remove Free Time block
- Add/remove Hotel/Rest block
- Read basic conflict results
- Preview a material itinerary change before applying it

## D. Discover / Recommendations

Needed capabilities:

- Request recommendation batch for Trip/Segment/context
- Read Recommendation details
- Read linked Place
- Read source/evidence summary
- Record Recommendation Decision:
  - Accept
  - Deny
  - Save
  - Must-do
- Request another batch
- Read accepted/unscheduled Recommendations
- Read date-specific recommendations
- Read nearby discovery results
- Filter/scope Discover by city, category, time, or current planning context

## E. Places / Map

Map is a Discover mode, but the application still needs capabilities to:

- Read Places for Discover context
- Read map markers for current city/day/discovery state
- Read route/travel-time summaries
- Read hotel-to-itinerary travel context
- Read nearby Places
- Resolve/select a Place from provider data
- Preserve app-owned Place identity with provider references

No separate Map domain API is required.

## F. Hotels

Planning-phase capabilities:

- Request hotel candidates for a Segment
- Read 4–5 meaningful hotel candidates when available
- Filter by price/amenities/bed needs
- Read hotel room/bed/amenity information
- Read price freshness/state
- Compare hotel candidates
- Read itinerary-aware travel context
- Keep/Deny candidate
- Select Hotel Stay
- Change confirmed Hotel Stay deliberately
- Open external booking handoff

After lodging is confirmed, hotel-shopping capabilities should recede from normal UI use.

## G. Reservations

Needed capabilities:

- Create Reservation
- Read Reservation
- Update workflow state
- Set desired date/time
- Set confirmed date/time
- Set booking source
- Record next inventory release when known
- Read availability Evidence
- Mark Booked only through explicit confirmation/trusted integration
- Save confirmation reference/details
- Save cancellation/refund terms
- Link Reservation to Itinerary Item / Hotel Stay / transportation
- Open provider booking handoff
- Flag Needs Attention
- Cancel Reservation state
- Read reservations requiring action

## H. Costs / Budget / Expenses

### Trip Budget
- Set/read Trip Budget
- Set reference currency
- Set total/per-person basis

### Planned Costs
- Add/update Planned Cost
- Link Planned Cost to reservation/hotel/item
- Read planned spend/forecast

### Expenses
- Add Expense
- Update own/authorized Expense
- Remove Expense where allowed
- Create Expense Allocations
- Recalculate allocations from selected split method
- Read transaction history
- Read running balances
- Link Expense to Reservation/Hotel/Item
- Record actual posted amount when available

### Settlements
- Record Settlement
- Read settlement history
- Read remaining balances

## I. Home / Today

Home capabilities:

- Read next useful planning action
- Read compact trip summary
- Read small essentials checklist when applicable
- Launch Home-owned secondary experiences:
  - Share Trip
  - Expenses
  - Travelers

Travel-mode Today capabilities:

- Read next activity
- Read leave-by context
- Read reservation/ticket details needed now
- Read remaining day timeline
- Read free-time options
- Read hotel/rest context
- Quick-add Expense
- Record skip/complete/day adjustment
- Read meaningful day alerts when available

## J. Sharing

Needed capabilities:

- Generate Share Presentation
- Read Share Presentation
- Regenerate after itinerary changes
- Create/read Share Link
- Copy/share link
- Produce share-safe content only
- Store/share generated assets when later required

Companion Invite is separate from Share Link.

## K. Travelers / Membership

Prototype:
- may be simplified or mocked.

Future/current-domain capabilities:
- Create Companion Invite
- Redeem Invite
- Read Trip Memberships
- Revoke Membership
- Remove Companion
- Transfer ownership deliberately
- Preserve historical expense links

## L. Preferences

Needed capabilities:

- Read/update Trip Preference Profile
- Read optional User Preference Profile
- Keep Trip preferences higher priority
- Record explicit preference edits
- Use Recommendation Decisions as signals without automatically turning them into permanent global preferences

## M. Evidence / Source freshness

Needed capabilities:

- Read Source attribution
- Read Evidence Records
- Store/update freshness state
- Store verification/retrieval time
- Store next recheck date where relevant
- Refresh evidence manually during prototype
- Later schedule provider/source refresh
- Surface stale/unknown/conflicting status honestly

## N. External provider handoffs

Needed adapter capabilities may include:

- Places search/details
- Geocoding/map rendering data
- Route/travel-time summaries
- Hotel candidate/pricing lookup
- official/provider booking links
- source/evidence retrieval
- weather context
- transit context
- FX reference rates

These are provider-adapter contracts, not frontend/domain contracts.

## Capability boundaries

### Do not create duplicate capabilities because a feature appears in multiple screens

Example:
- Reservation details shown in Today and Itinerary still come from the same Reservation capability.
- Map facts used in Discover remain Discover/Place capabilities.
- Expenses launched from Home remain Expense capabilities.

### Do not expose provider payloads directly to the UI

Normalize into app-owned concepts.

### Do not create a generic "update anything" endpoint

Prefer explicit domain operations for important state transitions.

## First Section 8 decision

**Q-701:** Should V1 use mostly domain/action capabilities instead of generic CRUD endpoints?

Example:

Prefer:
- `acceptRecommendation`
- `moveItineraryItem`
- `markReservationBooked`
- `recordExpense`
- `recordSettlement`

over only:
- `updateRecommendation`
- `updateItem`
- `updateReservation`

**Confirmed direction — D-091:** use ordinary CRUD for simple data maintenance and explicit action capabilities for meaningful state transitions/business rules.

This keeps the API simple without hiding important domain behavior inside generic update calls.


## Next decision — Home/Today composition boundary

**Q-702:** Should Home and Today be **composition/read-model surfaces** over canonical domain data rather than owning duplicate stored state?

Recommended model:

```text
Home / Today
    ↓ compose
Trip + Itinerary + Reservations + Expenses + Membership
```

Examples:
- "Next activity" comes from Itinerary.
- "Booked" comes from Reservation.
- "Current balance" comes from Expenses.
- "Traveler access" comes from Trip Membership.
- "Share Trip" launches the Sharing capability.

Home may have a purpose-built query/read model for speed and convenience, but it should not duplicate the underlying source-of-truth fields.

Why:
- avoids inconsistent copies of the same status,
- keeps one-feature-one-home at the UI level without duplicating backend ownership,
- makes Today/Home easier to change,
- keeps business logic in the canonical modules.

**Confirmed direction — D-092:** Home/Today compose canonical domain capabilities; optimized read models are allowed but duplicate business state is not.


## Next decision — Internal application API versus public API

**Q-703:** Does the personal-use V1 need a public/external API?

**Recommended direction:** no public API for the prototype.

Use an internal application capability layer:

```text
Next.js UI
    ↓
Server Action / Route Handler / Application Service
    ↓
Domain capability
    ↓
Prisma / Provider Adapter
```

Benefits:
- smaller attack surface,
- less versioning/documentation work,
- faster iteration,
- no need to design a developer-facing API before there are external consumers.

Important:
- keep application/domain capabilities clean enough that a public API or native client can be added later,
- do not let UI components call Prisma or third-party providers directly.

A public API becomes justified later if:
- native clients require it,
- third-party integrations are added,
- external developers need access,
- or the product architecture clearly benefits from it.

**Recommended direction:** internal application API only for V1; public API deferred.
