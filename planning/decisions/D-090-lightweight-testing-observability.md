# D-090 — Lightweight automated testing and basic observability for V1

**Status:** CONFIRMED Section 7 architecture/quality decision. Exact test framework and error-reporting vendor remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved a lightweight automated-testing and logging baseline for the personal prototype.  
**Related:** D-081 modular monolith; D-087 minimal background jobs; D-089 managed deployment; Section 7 Architecture, Quality, and External Dependencies.  
**Blueprint:** Section 7 remains DRAFT.

## Confirmed quality baseline

Use enough automated testing to protect the highest-risk product rules.

Priority areas:
- itinerary ordering and state transitions,
- reservation-state rules,
- expense allocation math,
- planned-versus-actual cost behavior,
- Trip Membership/access relationships,
- Share Trip generation basics,
- a small end-to-end test set for Tier A journeys.

## Confirmed observability baseline

Keep lightweight visibility into:
- application errors,
- provider/API failures,
- failed background jobs when jobs exist,
- basic slow-request/performance issues,
- deployment/runtime failures.

Do not log:
- passwords,
- API secrets,
- private keys,
- payment credentials,
- other sensitive credential material.

## Prototype rule

Do not build:
- enterprise monitoring dashboards,
- complex alerting systems,
- heavy telemetry pipelines,
- multi-tool observability stacks

during the personal prototype.

Use managed-host logs first. Add one lightweight error-reporting solution only if it materially improves testing/debugging.

## Next step

Section 7 is ready for closeout review.
