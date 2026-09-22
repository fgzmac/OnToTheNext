# D-089 — Managed app hosting + managed PostgreSQL for the prototype

**Status:** CONFIRMED Section 7 architecture decision. Exact hosting/database vendors remain OPEN until deployment.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved managed hosting for the application plus managed PostgreSQL for the personal prototype.  
**Related:** D-081 modular monolith; D-082 responsive web/PWA; D-083 prototype security scope; D-084 PostgreSQL; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed deployment direction

Use:
- managed hosting for the Next.js application,
- managed PostgreSQL,
- GitHub-based deployment where practical.

## Prototype goals

Prefer infrastructure that provides:
- automatic deploys,
- HTTPS by default,
- environment-variable management,
- simple logs,
- easy rollback,
- low/free prototype cost where possible,
- minimal server administration,
- support for mobile testing and share links.

## Avoid during the prototype

Do not introduce unless later justified:
- self-managed VPS maintenance,
- Kubernetes,
- multi-region infrastructure,
- custom load balancers,
- complex CI/CD pipelines,
- dedicated operations infrastructure.

## Vendor selection

Exact vendors remain open until deployment.

Selection should follow D-088:
- capability,
- cost,
- simplicity,
- replaceability.

## Next Section 7 decision

Define the minimum quality/observability baseline for the prototype.
