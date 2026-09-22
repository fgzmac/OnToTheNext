# Section 7 — Architecture, Quality, and External Dependencies

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–6; decisions D-001 through D-080.  
**Approval record:** None yet.

## Purpose

Choose a technical architecture that supports the approved product without overengineering V1.

The architecture should prioritize:
- fast iteration,
- reliable trip state,
- web + mobile usability,
- simple deployment,
- replaceable external providers,
- strong data separation,
- and room for richer integrations later.

## Architecture principles

### 1. Keep one product backend
Avoid separate backend systems for web and mobile.

Both clients should use the same trip/domain model and server-side rules.

### 2. Keep external providers behind adapters
Maps, routing, places, hotel data, reservations, weather, transit, and source ingestion should not leak provider-specific assumptions throughout the app.

Use provider adapters/interfaces so services can be swapped later.

### 3. Treat the database as the source of truth for app-owned state
App-owned state includes:
- Trips,
- Segments,
- Itinerary Items,
- Recommendations and Decisions,
- Reservation workflow,
- Expenses,
- Membership,
- Sharing,
- Preferences.

External providers remain authoritative for external/live facts.

### 4. Prefer server-side integration for secrets
API keys, provider credentials, and privileged integrations should not be exposed to the browser/mobile client when avoidable.

### 5. Design for responsive web first, without blocking future native clients
The approved product requires web and mobile experiences, but that does not necessarily require two separate native codebases for V1.

The technical choice should preserve a path to:
- responsive web,
- installable/PWA-style behavior if useful,
- future native clients if real usage justifies them.

### 6. Avoid premature microservices
V1 should favor a modular monolith unless a provider or scaling boundary clearly justifies separation.

## Proposed V1 architecture

### Frontend
Recommended:
- **Next.js + React + TypeScript**

Why:
- strong web/mobile-responsive support,
- server + client rendering options,
- good routing/layout primitives,
- shared UI code,
- straightforward deployment,
- compatible with future PWA behavior.

### Backend/application layer
Recommended:
- Next.js server actions / route handlers or a small application service layer within the same repo/application initially.

Keep domain logic modular:
- trip service,
- recommendation service,
- itinerary service,
- reservation service,
- expense service,
- sharing service,
- provider adapters.

### Database
Recommended:
- relational database, likely **PostgreSQL**.

Why:
- trips contain strongly related structured data,
- expenses/allocations need relational integrity,
- memberships/roles are relational,
- reservations and itinerary links are relational,
- PostgreSQL supports JSON where flexible provider metadata is useful.

### ORM / data access
Recommended direction:
- Prisma or another mature TypeScript-friendly ORM/data layer.

Do not lock exact ORM until implementation planning.

### Authentication
Recommended:
- support full user accounts plus lightweight guest identities.
- keep identity separate from Trip Membership per D-074.

Provider choice remains open.

### File/media storage
Potential uses:
- share presentation assets,
- ticket attachments,
- uploaded reservation screenshots,
- future receipt images.

Use object storage rather than database blobs.

Exact provider remains open.

## External dependency categories

### Maps / Places / Routing
Need:
- geocoding/place identity,
- map rendering,
- route/travel-time context,
- external directions handoff.

Possible providers to evaluate later:
- Google Maps Platform
- Mapbox
- Apple Maps/MapKit where appropriate
- transit-specific providers

Do not select yet without cost/API review.

### Recommendation/source data
Potential inputs:
- official venue/operator sources,
- tourism boards,
- local publications,
- community/forums,
- review platforms,
- map/place providers.

Need:
- licensing/access review,
- attribution rules,
- caching/freshness rules,
- provider adapters.

### Hotels
Need:
- property identity,
- room/bed/amenity data,
- date-specific pricing where possible,
- external booking handoff.

Exact provider/API remains open.

### Reservation / ticket inventory
Need:
- official source links,
- sale/release timing,
- current availability where integrations allow it.

V1 does not require universal direct booking.

### Weather
Needed primarily for travel-mode contextual alerts.

Exact provider open.

### Transit
Needed for travel-time context and possibly later live disruption data.

Exact provider open.

### Currency
Need:
- reference conversion for display/forecasting,
- preserve original amounts,
- manual correction/actual posted values.

Exact FX provider open.

### Email / messaging share
V1 can rely primarily on device-native sharing and share links.

Direct transactional email delivery may be added later if needed.

## Quality attributes

### Simplicity
Architecture should make product simplification easy, not force feature proliferation.

### Reliability
Critical distinctions must remain correct:
- Accepted ≠ Scheduled
- Scheduled ≠ Booked
- Booked ≠ Paid
- Planned Cost ≠ Expense

### Data integrity
Expense allocations, membership, reservation state, and itinerary ordering need transactional consistency.

### Security
Protect:
- credentials,
- provider keys,
- guest invite tokens,
- share-link access rules,
- private trip data,
- uploaded documents.

### Privacy
Avoid unnecessary live-location storage.

Trip sharing must not expose private financial information unless explicitly intended.

### Performance
Primary interactions should feel immediate:
- opening trip,
- switching day,
- viewing Today,
- Accept/Deny,
- expense entry.

Heavy provider calls should be cached/deferred where appropriate.

### Offline tolerance
Critical travel data should eventually support local caching:
- Today itinerary,
- hotel address,
- reservation times,
- confirmation references,
- essential notes.

V1 may start with limited offline support, but the architecture should not block it.

### Observability
Need basic:
- application errors,
- provider failures,
- failed background refreshes,
- slow requests,
- booking/source freshness failures.

Avoid exposing sensitive user content in logs.

## Background jobs

Some future capabilities need scheduled/background work:
- inventory checks,
- source refresh,
- reservation release checks,
- weather/transit updates,
- share asset generation.

Recommended V1 direction:
- use a simple managed job/queue system when needed,
- do not introduce a complex distributed job architecture early.

## Deployment

Recommended direction:
- managed web deployment,
- managed PostgreSQL,
- managed object storage,
- minimal operational burden.

Exact vendor remains open until cost/dependency evaluation.

## First Section 7 decision

**Q-601:** What application architecture should V1 use?

**Recommended direction:** a **modular monolith** using one Next.js/TypeScript application with a relational PostgreSQL database and clearly separated internal domain modules/provider adapters.

Why:
- fastest path to a reliable V1,
- simpler deployment,
- easier debugging,
- supports responsive web/mobile,
- avoids premature microservices,
- still leaves clean boundaries for future extraction.

Proposed shape:

```text
Next.js / TypeScript App
├── UI
├── Application / Domain Modules
│   ├── Trips
│   ├── Discover
│   ├── Itinerary
│   ├── Reservations
│   ├── Expenses
│   └── Sharing
├── Provider Adapters
│   ├── Maps/Places
│   ├── Hotels
│   ├── Sources
│   ├── Weather/Transit
│   └── Currency
└── PostgreSQL
```

**Confirmed direction — D-081:** modular monolith for V1, using one Next.js/TypeScript application, PostgreSQL, provider adapters, and clear internal module boundaries.


## Next decision — V1 web/mobile delivery strategy

**Q-602:** Should V1 ship as a responsive web application with installable/PWA behavior before building separate native iOS/Android clients?

Recommended direction:

### V1
- responsive Next.js web app,
- mobile layouts treated as first-class,
- installable/PWA behavior where useful,
- browser access on desktop/laptop,
- strong mobile Today experience,
- deep/share links open the same product,
- offline-ready architecture with limited initial caching.

### Later, if usage justifies it
- native iOS/Android clients can use the same backend/domain model.

Why:
- avoids maintaining separate web + iOS + Android codebases during V1,
- preserves the approved web-and-mobile product experience,
- makes Share Trip links easier to open,
- keeps iteration fast,
- still allows eventual native apps if App Store distribution or device capabilities become important.

Important:
This is a delivery/implementation choice, not a downgrade of mobile. Mobile UX remains first-class.

**Recommended direction:** responsive web + PWA-style V1, native apps later if validated.
