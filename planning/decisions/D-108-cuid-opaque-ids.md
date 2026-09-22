# D-108 — Sprint 1 uses CUID/CUID2-style opaque IDs

**Status:** CONFIRMED Section 13 data-model decision. Exact Prisma generator function may be finalized during implementation.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved CUID/CUID2-style opaque IDs for Sprint 1 entities.  
**Related:** D-084 PostgreSQL; D-085 Prisma; Section 13 Data and Persistence Planning.  
**Blueprint:** Section 13 remains DRAFT.

## Confirmed ID strategy

Use application-generated, opaque, non-sequential IDs for Sprint 1 entities.

Preferred form:
- CUID2 where the selected Prisma/runtime tooling supports it cleanly,
- otherwise Prisma-supported CUID-style IDs with the same product properties.

Applies to:
- PrototypeUser,
- Trip,
- TripSegment,
- Day,
- TripPreferenceProfile,
- and later app-owned entities unless another integration creates a strong reason to differ.

## Why this is approved

- URL-safe.
- Non-sequential.
- Easy to generate in the application layer.
- Works well with Prisma.
- Avoids exposing simple row-number identities.
- Requires no external UUID interoperability for the current prototype.

## Important boundary

Provider IDs remain separate from app-owned IDs.

Future integrations may store external identifiers alongside these IDs without replacing them.
