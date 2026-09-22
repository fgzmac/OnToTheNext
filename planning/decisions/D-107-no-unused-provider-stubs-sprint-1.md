# D-107 — No unused provider stubs in Sprint 1

**Status:** CONFIRMED Section 12 implementation-boundary decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved adding provider adapters only when the first real provider-backed feature needs them.  
**Related:** D-088 provider-selection rule; D-094 Sprint 1 scope; D-106 seed data; Section 12 Implementation Boundaries and Simulated Components.  
**Blueprint:** Section 12 remains DRAFT pending closeout.

## Confirmed Sprint 1 rule

Do not create empty or speculative adapters/interfaces for:
- Maps / Places,
- Hotels,
- Weather,
- Transit,
- Currency,
- Recommendation sources,
- other future providers.

## Just-in-time adapter rule

Introduce a provider adapter when:
- a real product feature requires the provider,
- the capability needs are known,
- the external provider boundary can be designed from actual usage.

Example:

```text
Sprint 1
Trip / Segment / Day
→ no Maps adapter

Later Discover + Map milestone
→ define Places/Maps adapter from real requirements
```

## Why this is approved

- Avoids speculative abstractions.
- Keeps Sprint 1 smaller.
- Prevents premature interfaces based on guesses.
- Still preserves D-088 once external providers are introduced.

## Architecture boundary remains

When integrations do arrive:
- provider-specific payloads stay behind adapters,
- UI/domain code uses app-owned concepts,
- providers remain replaceable.
