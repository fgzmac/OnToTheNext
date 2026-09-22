# D-105 — Sprint 1 uses one deterministic prototype-owner identity

**Status:** CONFIRMED Section 12 implementation-boundary decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved using a single prototype-owner identity instead of implementing real authentication in Sprint 1.  
**Related:** D-083 deferred production auth/security/privacy; D-074 identity vs Trip Membership; Section 12 Implementation Boundaries and Simulated Components.  
**Blueprint:** Section 12 remains DRAFT.

## Confirmed Sprint 1 identity approach

Use one deterministic prototype-owner identity behind the application layer.

Conceptually:

```text
Prototype Owner
    ↓
Personal Trips
```

## Requirements

- Trips can still have an owner relationship from the beginning.
- The prototype owner should be resolved through one development/application seam.
- Do not scatter hard-coded owner checks throughout UI, domain, or persistence code.
- Keep the schema/application boundary compatible with later User + Trip Membership support.

## Not in Sprint 1

Do not build:
- signup,
- login,
- password reset,
- social auth,
- guest onboarding,
- companion authentication,
- account linking,
- production session management.

## Replacement path later

The prototype-owner resolver can later be replaced by a real authenticated identity provider without rewriting Trip ownership rules.
