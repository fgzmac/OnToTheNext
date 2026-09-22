# D-087 — Minimal background jobs, added only when needed

**Status:** CONFIRMED Section 7 architecture decision. Exact scheduler/queue provider remains OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved keeping background-job infrastructure minimal during the personal prototype.  
**Related:** D-050 reservation checks; D-073 Source/Evidence; D-083 prototype simplification; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed strategy

Use synchronous request/response behavior for normal user actions.

Introduce scheduled/deferred work only when an implemented feature genuinely requires it.

Potential future jobs:
- reservation/inventory rechecks,
- Source/Evidence refresh,
- Share Trip asset generation,
- weather/transit refresh,
- notification preparation.

## Prototype allowance

Manual refresh/recheck is acceptable during the personal prototype.

Examples:
- user taps Refresh availability,
- developer manually runs a source refresh,
- reservation-release information is updated manually for a test trip.

This avoids infrastructure work before the feature value is validated.

## If jobs are introduced

Prefer:
- simple managed scheduler/queue,
- idempotent execution,
- bounded retries,
- visible last-run status,
- clear failure state,
- logging without sensitive content.

Avoid during prototype:
- multiple worker services,
- event-bus architecture,
- distributed queue complexity,
- always-on worker fleets.

## Next Section 7 decision

Define the provider-selection rule for maps, places, hotels, sources, weather/transit, and currency so V1 can stay low-cost and replaceable.
