# D-113 — Sprint 1 automation focuses on domain, persistence, and core end-to-end behavior

**Status:** CONFIRMED Section 14 testing decision. Exact test frameworks and browser/device matrix remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved requiring automated tests for domain rules, database behavior, and the core end-to-end flow while keeping lower-risk visual/responsive checks manual during the personal prototype.  
**Related:** D-090 lightweight testing baseline; D-094 Sprint 1 scope; Section 14 Testing, Completion, and Release Readiness.  
**Blueprint:** Section 14 remains DRAFT.

## Automated tests required for Sprint 1 completion

Automation must cover:
- Trip date validation,
- Segment date/boundary/overlap rules,
- repeated-city Segments,
- Unassigned-date behavior,
- Day generation and ownership,
- Day regeneration,
- Segment reorder validation and atomicity,
- structural transaction rollback,
- persistence/read-after-write,
- Segment deletion preserving Days,
- Trip deletion cascade behavior,
- one core end-to-end happy path.

## Manual checks allowed

During the personal prototype, the following may remain manual:
- detailed visual polish,
- exact spacing,
- responsive layout checks,
- empty-state appearance,
- subjective form/button usability.

These are still part of acceptance review, but they do not require a full automated visual-regression system in Sprint 1.

## Why this is approved

- Protects the rules that later milestones depend on.
- Keeps prototype development fast.
- Avoids heavy UI automation before visual design stabilizes.
- Ensures the foundation is trustworthy rather than merely rendered.
