# D-086 — Object storage for file/media bytes with PostgreSQL metadata

**Status:** CONFIRMED Section 7 architecture decision. Exact object-storage provider and file-access policy remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved object storage for file/media bytes with metadata/references stored in PostgreSQL.  
**Related:** D-056 Share Trip; D-081 modular monolith; D-084 PostgreSQL; D-085 Prisma; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed storage model

Use object storage for actual file bytes.

Store only file metadata and relationships in PostgreSQL.

Potential file types include:
- Share Trip cover/generated assets,
- ticket PDFs/images,
- reservation screenshots,
- future receipt photos,
- uploaded travel documents.

## Conceptual structure

```text
PostgreSQL
└── File metadata
    ├── Trip / owner
    ├── file type
    ├── storage key
    ├── content type
    └── related reservation/share/itinerary object

Object Storage
└── Actual file bytes
```

## Prototype rule

Do not introduce object-storage infrastructure until an implemented feature actually needs persistent file bytes.

This keeps the personal prototype lightweight while preserving the correct architecture.

## Important boundary

Do not store large images, PDFs, or binary attachments directly as PostgreSQL blobs for normal application use.

## Still open

- Object-storage provider
- Upload size limits
- Signed/private access behavior
- Retention/deletion behavior
- Share Presentation asset generation
- attachment privacy rules for future commercial use

## Next Section 7 decision

Choose the V1 background-job strategy for source refreshes, inventory checks, share generation, and other deferred work.
