# D-085 — Prisma for V1 data access and migrations

**Status:** CONFIRMED Section 7 architecture decision. Exact repository patterns and migration workflow details remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved Prisma as the V1 ORM/data-access layer.  
**Related:** D-081 modular monolith; D-084 PostgreSQL; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed data-access direction

Use **Prisma** for V1 access to PostgreSQL and schema migrations.

## Why this is approved

- Strong TypeScript integration.
- Readable relational schema.
- Generated types.
- Built-in migration workflow.
- Fast iteration for a solo/personal prototype.
- Good fit with Next.js and PostgreSQL.

## Architecture boundary

Prisma is a persistence tool, not the product/domain model.

Business rules should live in application/domain modules rather than:
- UI components,
- raw route handlers,
- scattered ORM calls.

Preferred shape:

```text
UI
↓
Application / Domain Service
↓
Repository / Data Access
↓
Prisma
↓
PostgreSQL
```

## Future flexibility

If later scale/performance needs require another data-access approach, the modular architecture should allow Prisma-specific persistence code to be replaced without rewriting product rules.

## Next Section 7 decision

Choose the file/media storage approach for:
- generated Share Trip assets,
- ticket/confirmation attachments,
- uploaded reservation screenshots,
- future receipt images.
