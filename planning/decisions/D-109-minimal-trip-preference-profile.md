# D-109 — Sprint 1 uses a minimal typed TripPreferenceProfile

**Status:** CONFIRMED Section 13 data-model decision. Additional typed preference fields are deferred until Discover/recommendation behavior is implemented.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved a minimal typed TripPreferenceProfile with no generic future-preferences JSON blob.  
**Related:** D-076 user vs Trip preferences; D-094 Sprint 1 scope; Section 13 Data and Persistence Planning.  
**Blueprint:** Section 13 remains DRAFT.

## Confirmed Sprint 1 preference persistence

TripPreferenceProfile remains intentionally small.

Persist only fields with clear Sprint 1 meaning, such as:
- optional rough budget/comfort information,
- optional planning note,
- created/updated timestamps.

## Explicitly avoid

Do not add:
- a catch-all future-preferences JSON blob,
- speculative interest arrays,
- recommendation-ranking weights,
- hotel amenity preference structures,
- transportation preference structures,
- other fields unused by Sprint 1 behavior.

## Why this is approved

- Sprint 1 does not yet run recommendation logic.
- A generic JSON blob would hide an undefined schema.
- Later Discover work can introduce real typed preference fields via migrations.
- Keeps the first database model smaller and easier to reason about.

## Migration direction later

When Discover is implemented:
- add only the typed preference fields actually required,
- preserve existing TripPreferenceProfile records,
- migrate incrementally rather than replacing the profile wholesale.
