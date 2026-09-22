# D-088 — External providers selected by capability, cost, and replaceability

**Status:** CONFIRMED Section 7 architecture decision. Specific providers remain OPEN until each integration is needed.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the low-cost, adapter-based provider-selection strategy.  
**Related:** D-080 app/provider boundary; D-081 modular monolith; D-083 prototype simplification; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed provider-selection rule

Choose external services based on:
1. required capability,
2. data freshness/quality,
3. licensing/terms,
4. prototype cost,
5. replaceability,
6. geographic coverage.

Do not choose vendors primarily because of brand recognition.

## Prototype priorities

During personal-use testing:
- prefer free or low-cost tiers,
- avoid minimum commitments,
- allow manual data when an API is not worth paying for yet,
- use official/current sources where authoritative information matters,
- avoid locking product behavior to one provider too early.

## Adapter requirement

Every external provider should sit behind a provider adapter/interface.

Examples:
- Maps / Places adapter
- Hotel adapter
- Recommendation-source adapter
- Weather adapter
- Transit adapter
- Currency adapter

The rest of the application should depend on the app's own domain concepts rather than provider-specific response shapes.

## Identity rule

Provider IDs remain separate from the app's own IDs.

Example:
```text
Place
├── App Place ID
└── Provider references
    ├── Google Place ID
    ├── Mapbox ID
    └── other source IDs
```

A provider must not become the canonical definition of a Place, Reservation, Trip, or other app-owned object.

## Geographic requirement

Provider evaluation should include coverage for:
- Japan, for the primary pilot,
- U.S. local testing,
- and later broader destinations if the product expands.

## Next Section 7 decision

Choose the prototype deployment approach.
