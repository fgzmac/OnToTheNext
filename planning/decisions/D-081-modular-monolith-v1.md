# D-081 — V1 uses a modular monolith

**Status:** CONFIRMED Section 7 architecture decision. Exact deployment vendor, ORM, auth provider, and supporting managed services remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed modular-monolith architecture for V1.  
**Related:** D-080 app/provider boundary; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed V1 architecture

Use one primary application codebase organized as a **modular monolith**.

Recommended technical baseline:
- Next.js
- React
- TypeScript
- PostgreSQL
- clear internal domain/application modules
- provider adapters for external services

## Proposed shape

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
│   ├── Maps / Places
│   ├── Hotels
│   ├── Sources
│   ├── Weather / Transit
│   └── Currency
└── PostgreSQL
```

## Why this is approved

- Fastest path to a reliable first release.
- Simpler deployment and debugging.
- Keeps one consistent Trip/domain model.
- Avoids premature microservices.
- Makes web/mobile-responsive development easier.
- Clean module/provider boundaries still allow future extraction if scale or operational needs justify it.

## Architectural constraints

The modular monolith should still preserve:
- clear ownership between domain modules,
- limited cross-module coupling,
- provider abstraction,
- server-side handling of secrets,
- transactional integrity for trip/expense/reservation state,
- testable business logic independent of UI.

## Not approved by this decision

This does not yet lock:
- hosting provider,
- ORM,
- authentication provider,
- object storage vendor,
- background-job vendor,
- map provider,
- recommendation-source providers,
- hotel provider,
- weather/transit providers,
- FX provider.

## Next Section 7 decision

Choose the V1 client delivery strategy:
- responsive web/PWA first,
- or separate native mobile applications in addition to web.
