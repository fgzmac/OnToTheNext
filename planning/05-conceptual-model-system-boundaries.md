# Section 6 — Conceptual Model and System Boundaries

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–5; decisions D-001 through D-065.  
**Approval record:** None yet.

## Purpose

Define the app's core concepts and their relationships before choosing technical architecture, APIs, or database schemas.

The goal is to make sure the product model is coherent before implementation.

## Core product objects

### Trip
Represents the overall travel plan.

Contains or references:
- destination/region,
- trip dates,
- travelers,
- city/stay sequence,
- itinerary days,
- hotels,
- reservations,
- expenses,
- accepted/saved recommendations,
- sharing state.

A Trip is the primary container for the user's travel experience.

### Traveler
Represents a person participating in a Trip.

Conceptual properties:
- display name,
- role,
- trip membership,
- expense participation,
- optional preference profile.

Roles currently include:
- Organizer
- Companion

The Organizer controls trip planning/admin.
Companions primarily view the trip and participate in shared expenses.

### Day
Represents one calendar day within a Trip.

Contains:
- date,
- city/base,
- itinerary items,
- free-time blocks,
- travel blocks,
- hotel/rest blocks.

A Day should not be treated as a flat list only; order and time matter.

### Itinerary Item
Represents something intentionally placed into a Day.

Possible types:
- Activity
- Reservation-backed activity
- Meal
- Shopping block
- Travel/Transit
- Free time
- Hotel/rest
- Other custom item

Important states may include:
- flexible,
- must-do,
- fixed/booked,
- completed,
- skipped.

### Recommendation
Represents something the app is proposing before it becomes part of the itinerary.

A Recommendation may contain:
- title,
- category,
- place/location,
- factual description,
- duration,
- price/cost basis,
- source/evidence,
- reservation requirement,
- availability/freshness state,
- geographic context.

Possible user outcomes:
- Accept
- Deny
- Save
- Must-do

A Recommendation does not become a scheduled itinerary item until explicitly added/scheduled.

### Place
Represents a geographic place.

Examples:
- attraction,
- restaurant,
- neighborhood,
- hotel,
- station,
- airport,
- event venue.

A Place may be referenced by:
- recommendations,
- itinerary items,
- hotels,
- reservations,
- map views.

### Hotel Stay
Represents the selected lodging for part of the trip.

Conceptual properties:
- hotel/place,
- city/base,
- check-in/out dates,
- room/bed details,
- booking status,
- confirmation details,
- cost,
- cancellation terms.

Hotel discovery candidates are planning data; the confirmed Hotel Stay becomes part of the trip.

### Reservation
Represents booking state for something requiring or optionally using a reservation.

States include:
- Book now
- Opens later
- Check back
- Optional reservation
- No reservation needed
- Booked
- Needs attention
- Cancelled

Conceptual properties:
- linked itinerary/recommendation/place,
- desired date/time,
- confirmed date/time,
- booking source,
- next inventory release when known,
- confirmation reference,
- cost,
- cancellation/refund information.

### Expense
Represents an actual shared or individual trip cost.

Conceptual properties:
- description,
- original amount,
- currency,
- date,
- category,
- payer,
- participants,
- split method,
- notes,
- linked reservation/hotel/itinerary item where useful.

### Planned Cost
Represents an expected or estimated cost before payment.

This is distinct from Expense.

Examples:
- estimated ticket price,
- expected hotel total,
- planned transit pass.

A Planned Cost may later be replaced or paired with an actual Expense.

### Settlement
Represents a payment between travelers that reduces outstanding balances.

Conceptual properties:
- payer,
- recipient,
- amount,
- currency,
- date,
- external method label,
- note.

The app records the settlement; it does not need to move the money.

### Share Presentation
Represents the generated, destination-themed version of the trip suitable for sending by text/email/link.

Contains only share-safe trip information.

It should not automatically include:
- payment credentials,
- sensitive personal data,
- private internal planning information.

## Important relationships

```text
Trip
├── Travelers
├── Days
│   └── Itinerary Items
├── Hotel Stays
├── Reservations
├── Expenses
├── Planned Costs
├── Settlements
├── Recommendations
└── Share Presentation
```

Additional relationships:

```text
Recommendation
    ↓ accepted/scheduled
Itinerary Item

Reservation
    ↔ Recommendation / Itinerary Item / Hotel Stay

Expense
    ↔ Reservation / Hotel Stay / Itinerary Item

Place
    ↔ Recommendation / Hotel / Activity / Map
```

## Key conceptual boundaries

### Recommendation ≠ Itinerary Item
A recommendation is merely proposed.
It becomes part of the itinerary only after an explicit user decision.

### Itinerary Item ≠ Reservation
An activity can be scheduled without being booked.
A reservation is the booking/commitment state.

### Reservation ≠ Expense
A reservation can exist before payment.
An expense represents actual spending.

### Planned Cost ≠ Expense
Estimated cost and actual paid cost are separate concepts.

### Hotel Candidate ≠ Hotel Stay
Hotel discovery options are temporary planning candidates.
The selected/confirmed lodging becomes a Hotel Stay.

### Companion Access ≠ Share Link
A companion's invite grants trip membership/access.
A themed Share Trip presentation is a communication artifact and should not silently create edit/admin access.

### Map is not a separate domain object
Map is a Discover presentation mode over Places, Recommendations, Hotels, and relevant itinerary context.

## System boundary — app owns

The app owns:
- trip structure,
- accepted/denied recommendation state,
- itinerary ordering,
- reservation state recorded by the user/integration,
- expense ledger,
- companion membership,
- generated share presentation,
- UI/navigation state needed for the experience.

## System boundary — external providers own

External systems may remain authoritative for:
- actual ticket inventory,
- official venue hours,
- hotel inventory/rates,
- ticket purchases,
- payment settlement,
- turn-by-turn navigation,
- maps/base geographic data,
- transit schedules/live status,
- weather,
- community/review/source content.

The app may summarize or cache supported data, but should not pretend to be the authority when it is not.

## First Section 6 decision

**Q-501:** Should `Reservation` be one general concept shared by activities, hotels, and transportation, or should those use separate booking concepts?

**Confirmed direction — D-066:** use one general **Reservation** concept with typed details.

Example:
- Activity reservation
- Hotel reservation
- Transportation reservation

Why:
- keeps shared states consistent,
- avoids duplicating Booked / Check Back / cancellation logic,
- still allows type-specific fields.

A Hotel Stay remains its own trip concept, but its booking details can reference a Reservation.


## Next decision — Itinerary item model

**Q-502:** Should the day timeline use one general `Itinerary Item` concept with typed variants?

Proposed types:
- Activity
- Meal
- Shopping
- Transportation / Transit
- Free Time
- Hotel / Rest
- Custom

Shared fields could include:
- date/day,
- start time,
- end time or duration,
- position/order,
- fixed/flexible state,
- notes,
- place/location where relevant.

Type-specific details would be added only when needed.

**Confirmed direction — D-067:** use one typed Itinerary Item model for the day timeline, with shared timing/order behavior and type-specific details.


## Next decision — Place versus Recommendation

**Q-503:** Should `Place` be the reusable factual entity and `Recommendation` be the trip-specific proposal about that place/experience?

Proposed model:

### Place
Represents the factual location/entity:
- name,
- coordinates,
- address,
- category,
- provider IDs,
- official/source metadata.

Examples:
- Shibuya Sky
- Fushimi Inari
- a restaurant
- a hotel
- a station
- a neighborhood

### Recommendation
Represents the app proposing something **for a specific trip/planning context**:
- linked Place when applicable,
- factual summary shown to the user,
- duration,
- cost basis,
- reservation/freshness context,
- evidence/source summary,
- ranking/context,
- user outcome: accepted / denied / saved / must-do.

Why separate them:
- the same Place can appear in many trips,
- user decisions belong to the trip, not the global place,
- map/location data stays reusable,
- recommendation evidence can change over time without changing the core Place identity.

**Confirmed direction — D-068:** separate reusable factual Place data from trip-specific Recommendation state.


## Next decision — Multi-city trip structure

**Q-504:** Should a Trip contain explicit **Trip Segments** (or Stops/Stays) for each destination block?

Proposed model:

```text
Trip
├── Segment: Tokyo
│   ├── Days
│   └── Hotel Stay
├── Segment: Kyoto
│   ├── Days
│   └── Hotel Stay
├── Segment: Osaka
│   ├── Days
│   └── Hotel Stay
└── Segment: Tokyo
    ├── Days
    └── Hotel Stay
```

A segment would represent one contiguous stay/base in a destination.

Conceptual fields:
- destination/city/base,
- arrival date/time,
- departure date/time,
- ordered position in trip,
- associated Days,
- associated Hotel Stay,
- incoming/outgoing transportation references where useful.

Why this helps:
- the same city can appear more than once in one trip,
- hotel stays naturally attach to a specific stay block,
- arrival/departure and transfer days are easier to reason about,
- planning-only hotel discovery can happen per segment,
- itinerary days remain simpler.

**Confirmed direction — D-069:** add a Trip Segment / Stay Segment concept between Trip and Day.


## Next decision — Inter-segment transportation

**Q-505:** How should travel between Trip Segments be represented?

Recommended model:
- Use the existing **Transportation / Transit Itinerary Item** for the actual journey.
- Optionally link it to a **Transportation Reservation** when booking/seat details exist.
- The item references an origin Segment and destination Segment when it is an intercity transfer.

Example:

```text
Tokyo Segment
    ↓
Transportation Itinerary Item
Tokyo Station → Kyoto Station
    ↔ Transportation Reservation (optional)
    ↓
Kyoto Segment
```

Why this is preferred:
- avoids inventing a separate transfer object,
- reuses the Itinerary Item timing/order model,
- reuses the Reservation booking-state model,
- still makes segment transitions explicit.

**Confirmed direction — D-070:** model intercity transfer as a typed Itinerary Item, with optional Transportation Reservation and Segment-to-Segment references.


## Next decision — Expense allocations

**Q-506:** Should a shared `Expense` contain separate per-traveler **Expense Allocations** rather than storing only one split formula?

Recommended model:

```text
Expense
├── Payer: Gio
├── Original amount: ¥14,800
└── Allocations
    ├── Gio      → ¥7,400
    └── Companion → ¥7,400
```

For an uneven split:

```text
Expense
└── Allocations
    ├── Gio      → ¥10,000
    └── Companion → ¥4,800
```

The selected split method (equal / exact / percentage / shares) is the **input method** used to calculate the allocations.

The allocations become the resulting amounts each traveler is responsible for.

Why this helps:
- running balances become straightforward,
- historical math stays reproducible,
- changing split methods does not change the meaning of the stored result,
- travelers can be excluded cleanly,
- later settlement calculations become simpler.

**Confirmed direction — D-071:** shared Expenses use explicit per-traveler Expense Allocations; split methods calculate those stored responsibilities.


## Next decision — Sharing versus membership

**Q-507:** Should `Share Presentation`, `Share Link`, and `Companion Invite` be separate concepts?

Recommended model:

### Share Presentation
The polished, themed itinerary artifact/view:
- destination styling,
- trip dates,
- day highlights,
- selected hotels/reservations,
- app link,
- share-safe content only.

### Share Link
A link that opens the shared presentation or a read-only trip view.

It should not automatically grant companion membership or expense access.

### Companion Invite
A unique access token/link used to join the Trip as a Companion.

It grants the permissions defined by the companion model and can be revoked/expired under D-041.

Why keep them separate:
- someone may receive a beautiful itinerary without joining the trip,
- companion access has stronger permissions and financial visibility,
- sharing should never accidentally elevate access,
- public/read-only sharing can evolve independently from private membership.

**Confirmed direction — D-072:** keep Share Presentation, Share Link, and Companion Invite as separate concepts.


## Next decision — Source evidence and freshness

**Q-508:** Should external recommendation evidence be represented separately from the Recommendation itself?

Recommended model:

### Source
Represents where information came from:
- official venue/operator,
- local publication,
- tourism board,
- community/forum,
- review platform,
- map/place provider,
- transit provider,
- other supported source.

### Evidence Record
Represents one sourced claim or observation used by the app.

Conceptual fields:
- Source,
- source URL/provider reference,
- retrieved/observed date,
- claim/topic,
- source type,
- freshness/verification state,
- applicable Place/Recommendation,
- optional expiration/recheck date.

Examples:
- official opening hours,
- ticket release schedule,
- recurring traveler praise,
- common crowd complaint,
- current hotel cancellation terms.

### Recommendation
Uses one or more Evidence Records to present factual details and cautions.

Why separate them:
- evidence can be refreshed without recreating the Recommendation,
- conflicting sources can coexist,
- official logistics can be distinguished from traveler opinion,
- freshness can be tracked explicitly,
- the app can explain when information is unknown or stale.

**Confirmed direction — D-073:** add reusable Source + Evidence Record concepts and keep them separate from Recommendation/user decision state.


## Next decision — Identity versus Trip Membership

**Q-509:** Should a person's identity be separate from their role/access inside a specific Trip?

Recommended model:

### User / Guest Identity
Represents the person at the product level.

May be:
- full account,
- lightweight guest identity,
- later upgraded guest → account.

### Trip Membership
Represents that identity's relationship to one Trip.

Conceptual fields:
- Trip,
- identity,
- role: Organizer / Companion,
- membership status,
- joined date,
- access/revocation state,
- expense participation.

Example:

```text
User / Guest Identity
        ↓
Trip Membership
├── Trip A → Organizer
└── Trip B → Companion
```

Why separate them:
- the same person can have different roles in different trips,
- role belongs to the trip, not globally to the account,
- lightweight guest access can later upgrade without rebuilding the trip relationship,
- revoked membership does not require deleting the person's identity,
- expense history can remain linked even after active access ends.

**Recommended direction:** separate User/Guest Identity from Trip Membership.
