# D-084 — PostgreSQL from the start

**Status:** CONFIRMED Section 7 architecture decision. Exact hosting provider, schema migration tooling, and ORM/data-access library remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved using PostgreSQL from the beginning rather than starting with a throwaway local database.  
**Related:** D-071 Expense Allocations; D-074 Trip Membership; D-077 Budget/Planned Cost/Expense separation; D-081 modular monolith; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed database direction

Use **PostgreSQL** as the primary application database from the personal prototype onward.

## Why this is approved

The product model is highly relational:
- Trips and Trip Segments,
- Days and Itinerary Items,
- Reservations,
- Expenses and Expense Allocations,
- Settlements,
- Trip Membership,
- Recommendation Decisions,
- Hotel Stays,
- sharing/access relationships.

PostgreSQL provides:
- relational integrity,
- transactional updates,
- mature indexing/query capabilities,
- strong support for structured application data,
- JSON support where provider-specific metadata needs flexibility,
- a straightforward path from prototype to production.

## Prototype implication

The personal prototype should not use a disposable data model that would require a major migration once multi-user/commercial development begins.

A local or managed PostgreSQL instance may be used depending on development convenience.

## Still open

- Managed PostgreSQL provider
- Local-development setup
- ORM/data-access layer
- Migration tooling
- Backup/retention policy
- production connection pooling
- production scaling strategy

These will be decided only when they materially affect the current stage.

## Next Section 7 decision

Choose the V1 ORM/data-access layer.
