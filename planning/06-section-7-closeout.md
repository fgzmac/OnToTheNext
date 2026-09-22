# Section 7 Closeout — Architecture, Quality, and External Dependencies

**Lifecycle status:** APPROVED.  
**Recorded:** 2026-09-21.  
**Purpose:** Consolidate the V1 technical architecture before moving to Section 8 — Lightweight API Capability Inventory.

## V1 application architecture

### Modular monolith — D-081
Use one Next.js/TypeScript application with clear internal modules and provider adapters.

```text
Next.js / TypeScript
├── UI
├── Trips
├── Discover
├── Itinerary
├── Reservations
├── Expenses
├── Sharing
├── Provider Adapters
└── PostgreSQL
```

Avoid premature microservices.

## Client delivery

### Responsive web + PWA-style V1 — D-082
- one responsive web codebase,
- desktop/laptop planning,
- first-class mobile Today/Discover/Itinerary,
- installable/PWA behavior where useful,
- native iOS/Android deferred until validated needs justify them.

## Authentication/security timing

### Prototype-first boundary — D-083
Production-grade authentication, privacy, and security hardening are deferred until the product is validated and moving toward public/commercial release.

Current personal prototype:
- may operate mainly as single-owner/private-use,
- companion auth can be mocked/simplified until needed.

Minimum safety still required:
- secrets server-side,
- no committed credentials,
- no plaintext passwords,
- no public guessable access to private trip data where practical,
- no stored payment-card/bank credentials.

## Database

### PostgreSQL from the start — D-084
Use PostgreSQL from prototype onward.

Reasons:
- relational domain model,
- transactional expense/membership/reservation state,
- avoids throwaway data migration later.

## Data access

### Prisma — D-085
Use Prisma for V1:
- schema,
- generated types,
- migrations,
- PostgreSQL access.

Business logic stays in application/domain modules rather than UI/ORM calls.

## File/media storage

### Object storage + PostgreSQL metadata — D-086
Actual image/PDF/file bytes live in object storage.
PostgreSQL stores metadata/relationships.

Introduce object storage only when an implemented feature truly requires persistent files.

## Background work

### Minimal jobs — D-087
- normal user actions stay synchronous,
- background/scheduled jobs added only when needed,
- manual refresh acceptable during personal testing,
- simple managed scheduler/queue if required,
- no distributed worker architecture.

## External-provider strategy

### Capability + cost + replaceability — D-088
Choose providers based on:
- required capability,
- freshness/quality,
- licensing/terms,
- prototype cost,
- replaceability,
- Japan + U.S. coverage.

Keep all providers behind adapters.

Do not make provider IDs the app's canonical domain identity.

Specific vendors remain open until integrations are needed.

## Deployment

### Managed hosting + managed PostgreSQL — D-089
Prefer:
- GitHub-based deployment,
- HTTPS,
- managed environment variables,
- simple logs,
- easy rollback,
- low/free prototype cost,
- minimal server administration.

Avoid Kubernetes, custom load balancers, and heavy CI/CD.

## Quality/observability

### Lightweight baseline — D-090

Automated-test priorities:
- itinerary state/order,
- reservation rules,
- expense allocation math,
- planned-vs-actual costs,
- membership relationships,
- Share Trip basics,
- core Tier A end-to-end journeys.

Observability:
- application errors,
- provider failures,
- job failures,
- basic performance/runtime issues.

Enterprise monitoring is deferred.

## Provider-owned vs app-owned boundary

The app owns:
- trip state,
- recommendations/decisions,
- itinerary,
- reservation workflow,
- costs/expenses,
- memberships,
- sharing,
- Today.

Providers remain authoritative for:
- purchases,
- live inventory,
- payment transfer,
- turn-by-turn navigation,
- venue rules/hours,
- live transit/weather.

## Architecture success standard

The prototype architecture should make the product fast to build, simple to operate, and easy to change without sacrificing the integrity of the approved domain model.

The architecture should not be more complicated than the product.

## Section 7 approval candidate

Approve Section 7 if this technical direction is correct.

Approval advances the blueprint to **Section 8 — Lightweight API Capability Inventory**.

Approval does not authorize implementation.


## Approval record

**Approved by owner:** 2026-09-21.  
**Owner instruction:** “Approve section 7.”  
**Effect:** Advance to Section 8 — Lightweight API Capability Inventory. This approval does not authorize implementation.
