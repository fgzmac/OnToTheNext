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

**Confirmed direction — D-082:** responsive web + PWA-style V1, with native apps deferred until validated needs justify them.


## Next decision — Authentication and guest identity

**Q-603:** How should V1 handle accounts and lightweight companion access?

Recommended direction:

### Full users
Support standard authenticated accounts for organizers and returning users.

### Guests
A companion can join through a unique invite and receive a lightweight guest identity without completing a full signup flow.

### Upgrade path
A guest may later create/claim a full account while preserving:
- Trip Membership,
- expense history,
- settlements,
- access to the shared Trip.

### Session/security requirements
- server-managed secure sessions,
- invite tokens stored/validated securely,
- revocation support,
- unused-invite expiry,
- no provider secrets exposed to the client.

### Provider strategy
Use a mature managed authentication provider or well-supported auth framework rather than building password/session security from scratch.

Exact provider should be selected after comparing:
- guest/anonymous identity support,
- account linking,
- Next.js support,
- pricing,
- security,
- operational simplicity.

**Amended direction — D-083:** keep managed authentication with full accounts + lightweight guest identity as the later commercial architecture, but defer full auth/privacy/security implementation during the current personal-use prototype.

For now:
- favor single-owner/private-use operation,
- mock or simplify companion authentication until multi-user testing requires it,
- keep only a minimum security baseline: server-side secrets, no committed credentials, no plaintext passwords, no public guessable access to private trip data, and no storage of payment credentials.


## Prototype security scope — D-083

Production-grade authentication, privacy, consent, and security hardening are intentionally deferred until the app is validated and moving toward public/commercial release.

This does **not** defer basic secret-handling and private-access hygiene.

## Next decision — Database and data access

**Q-604:** Should the prototype use PostgreSQL from the beginning, or start with a lighter local database and migrate later?

**Confirmed direction — D-084:** use PostgreSQL from the beginning.

Why:
- the conceptual model is highly relational,
- expenses/allocations/memberships benefit from relational constraints,
- avoids a migration from a throwaway data model later,
- managed PostgreSQL is inexpensive and simple enough for a personal prototype,
- still works cleanly with the modular monolith.

Exact hosting provider and ORM remain open.


## Next decision — ORM / data-access layer

**Q-605:** What should V1 use to access PostgreSQL?

**Recommended direction:** use **Prisma** for the first build.

Why:
- strong TypeScript integration,
- readable schema,
- generated types,
- migration tooling,
- straightforward relational modeling,
- fast iteration for a solo/personal prototype,
- works well with Next.js/PostgreSQL.

Important boundary:
Prisma should be treated as a persistence tool, not the domain model itself. Core business rules should live in application/domain modules rather than being scattered through raw ORM calls in UI code.

If later scale/performance needs justify another data-access approach, the modular architecture should make replacement possible.

**Confirmed direction — D-085:** Prisma for V1 data access and migrations.


## Next decision — File and media storage

**Q-606:** How should V1 store files and generated media?

Potential file types:
- Share Trip cover/generated assets,
- ticket PDFs/images,
- reservation screenshots,
- future receipt photos,
- other uploaded travel documents.

**Recommended direction:** use **object storage** for files and store only metadata/references in PostgreSQL.

Conceptually:

```text
PostgreSQL
└── File record / metadata
    ├── owner/trip
    ├── file type
    ├── storage key
    ├── content type
    └── related itinerary/reservation/share object

Object Storage
└── actual file bytes
```

For the personal prototype, we can keep this lightweight and only add object storage when the first file-upload/share-asset feature actually needs it.

Do not store large images/PDFs directly as database blobs.

**Confirmed direction — D-086:** object storage for file/media bytes + PostgreSQL metadata, introduced only when an implemented feature actually needs persistent files.


## Next decision — Background jobs

**Q-607:** How much background-job infrastructure should V1 introduce?

Potential background work:
- reservation/inventory rechecks,
- source/evidence refresh,
- Share Trip asset generation,
- later weather/transit refresh,
- later notification preparation.

**Recommended direction:** keep V1 job infrastructure minimal.

Use:
- synchronous request/response for normal user actions,
- a simple managed scheduler/queue only when a feature genuinely needs deferred or scheduled execution,
- idempotent jobs,
- retry limits,
- clear last-run/failure state.

Avoid:
- multiple worker services,
- complex distributed queues,
- event-bus architecture,
- always-on worker fleets

during the personal prototype.

For early testing, some refreshes may remain manual.

**Confirmed direction — D-087:** minimal managed jobs only as-needed; manual refresh is acceptable during the personal prototype.


## Next decision — External provider selection rule

**Q-608:** How should V1 choose maps, places, hotel, source, transit/weather, and currency providers?

**Recommended direction:** choose providers by **capability + cost + replaceability**, not by brand.

For the personal prototype:
- prefer free tiers / low-cost APIs,
- use official/current sources where authoritative data matters,
- allow manual data when an API is not worth paying for yet,
- avoid contracts/minimum commitments,
- keep every provider behind an adapter,
- store provider IDs separately from the app's own domain IDs,
- avoid making one provider the only representation of a Place, Reservation, or Trip object.

Selection criteria:
1. Does it provide the data we actually need?
2. Is the data current enough?
3. Are the terms/licensing compatible with the product?
4. Is the prototype cost reasonable?
5. Can we replace it later without rewriting product logic?
6. Does it support the countries/regions we need, starting with Japan and local U.S. testing?

**Confirmed direction — D-088:** low-cost, capability-driven, adapter-based provider selection; specific vendors remain open until each integration is needed.


## Next decision — Prototype deployment

**Q-609:** How should the personal prototype be deployed?

**Recommended direction:** use a **managed deployment** for the Next.js app plus managed PostgreSQL.

Goals:
- minimal server administration,
- automatic deployments from GitHub,
- HTTPS by default,
- simple environment-variable management,
- easy logs,
- low or free prototype cost,
- straightforward rollback,
- ability to keep the prototype private/restricted where practical.

Avoid for now:
- self-managed VPS/server maintenance,
- Kubernetes,
- multi-region infrastructure,
- custom load balancers,
- complex CI/CD pipelines.

Local development remains supported, but a managed hosted environment is useful for mobile testing and Share Trip links.

Exact vendor can be selected later after checking the current free/low-cost options.

**Confirmed direction — D-089:** managed app hosting + managed PostgreSQL for the prototype; exact vendors remain open until deployment.


## Next decision — Quality and observability baseline

**Q-610:** What minimum quality/observability should the personal prototype have?

**Recommended direction:** keep it lightweight but enough to catch real failures.

### Quality baseline
- TypeScript strictness where practical
- linting/formatting
- unit tests for important business rules
- integration tests for database-backed flows
- a small end-to-end test set for Tier A journeys

Priority test areas:
- itinerary ordering/state transitions,
- reservation-state rules,
- expense allocation math,
- planned-vs-actual behavior,
- Trip Membership/access relationships,
- Share Trip generation basics.

### Observability baseline
- application error logging,
- provider/API failure logging,
- failed background-job state when jobs exist,
- basic request/performance visibility,
- no sensitive credentials in logs.

### Prototype rule
Do not build enterprise dashboards/alerting yet.

Use the managed host's basic logs plus one lightweight error-reporting solution only if it materially helps testing.

**Recommended direction:** lightweight automated testing + basic error/provider logging, with enterprise monitoring deferred.
