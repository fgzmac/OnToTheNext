# Section 14 Closeout — Testing, Completion, and Release Readiness

**Lifecycle status:** APPROVED.  
**Recorded:** 2026-09-21.  
**Purpose:** Lock what Sprint 1 must prove before it can be accepted and before the project advances to the next implementation milestone.

## Sprint 1 completion principle

Sprint 1 is complete only when the real vertical slice works end-to-end:

```text
Create Trip
→ build/reorder Segments
→ generate Days
→ persist
→ refresh/reopen
→ navigate Home / Itinerary / Discover
```

A schema-only or partially wired UI does not count as complete.

## Automated test boundary — D-113

Required automated coverage:
- Trip date validation,
- Segment range validation,
- shared transfer boundary,
- true overlap rejection,
- repeated-city Segments,
- Unassigned dates,
- Day generation/ownership,
- Day regeneration,
- Segment deletion behavior,
- Trip deletion cascade behavior,
- Segment reorder validation/atomicity,
- transaction rollback,
- persistence/read-after-write,
- one core end-to-end happy path.

## Manual checks

Allowed to remain manual in the personal prototype:
- detailed visual polish,
- exact spacing,
- responsive layout checks,
- empty-state appearance,
- subjective form/button usability.

Manual checks are still required for desktop and phone-width usability.

## Defect threshold — D-114

Sprint 1 requires:

> Zero known blockers and zero known data-integrity defects in approved Sprint 1 scope.

Must be fixed before completion:
- data loss,
- incorrect Day ownership,
- invalid overlap persistence,
- valid transfer-boundary rejection,
- non-atomic reorder,
- broken migration,
- partial structural state after failure,
- unusable primary navigation,
- failing core end-to-end path.

May carry forward if documented:
- minor spacing,
- copy polish,
- low-impact responsive quirks,
- development-only inconvenience.

## Failure behavior

Test:
- database unavailable,
- Trip save failure,
- Segment save failure,
- Day-regeneration failure,
- invalid reorder,
- unexpected server error.

Expected:
- clear failure state,
- no silent data loss,
- no partial structural mutation,
- previous valid state remains intact.

## Migration readiness

Sprint 1 acceptance requires:
- fresh database migration succeeds,
- current migration chain succeeds,
- deterministic reset/reseed succeeds,
- no undocumented manual schema edits.

## Seed readiness

Japan seed data must:
- be deterministic,
- support repeated Tokyo Segments,
- obey transfer boundaries,
- generate expected Days,
- be optional,
- never be required for normal app use.

## Responsive readiness

Manual checks must confirm:
- desktop/laptop usability,
- modern phone-width usability,
- no horizontal overflow,
- usable primary navigation,
- readable forms/Segment controls/Day list,
- warnings/errors do not break layout.

## Completion evidence — D-115

Before Sprint 1 is accepted, produce a concise completion report containing:

- typecheck result,
- lint result,
- automated test result,
- core end-to-end result,
- fresh migration result,
- reset/reseed result,
- desktop manual-check result,
- phone-width manual-check result,
- known issues,
- brief implementation summary,
- scope confirmation that later features were not added.

Optional:
- screenshots of Home / Itinerary / Discover at desktop/mobile widths.

## Release-readiness distinction

Sprint 1 completion is **not** a public release.

It means:
- the Trip / Segment / Day foundation is trustworthy,
- persistence is stable enough for Discover to build on,
- no blocker remains in the approved Sprint 1 scope,
- known low-risk issues are documented.

## Section 14 approval candidate

Approve Section 14 if these testing and completion requirements are correct.

Approval advances to **Section 15 — Feedback, Decisions, and Documentation**.

Approval still does not authorize coding.


## Approval record

**Approved by owner:** 2026-09-21.  
**Owner instruction:** “Approve section 14.”  
**Effect:** Advance to Section 15 — Feedback, Decisions, and Documentation. This approval does not authorize implementation.
