# D-093 — Internal application API only for V1

**Status:** CONFIRMED Section 8 capability/exposure decision. Public API design is deferred until an external consumer exists.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved using only an internal application capability layer for the personal-use V1.  
**Related:** D-081 modular monolith; D-091 hybrid capabilities; D-092 Home/Today composition; Section 8 Lightweight API Capability Inventory.  
**Blueprint:** Section 8 remains DRAFT.

## Confirmed V1 boundary

The personal-use V1 does **not** need a public/external developer API.

Use an internal application layer:

```text
Next.js UI
    ↓
Server Action / Route Handler
    ↓
Application / Domain Capability
    ↓
Prisma / Provider Adapter
```

## Important architecture rule

UI components should not directly:
- query Prisma,
- mutate PostgreSQL,
- call third-party provider APIs,
- implement core business rules.

Those responsibilities stay behind application/domain capabilities and provider adapters.

## Why public API is deferred

A public API would add:
- versioning requirements,
- developer documentation,
- authentication/authorization surface,
- compatibility commitments,
- additional security considerations

before there is an actual external consumer.

## Future triggers for a public API

Revisit if:
- native clients require a stable remote interface,
- third-party integrations are added,
- external developers need trip data,
- partner integrations require it,
- or the architecture materially benefits from a separately deployed API.

## Section 8 conclusion

The application now has a sufficiently defined capability inventory and exposure boundary for roadmap planning.
