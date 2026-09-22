# D-116 — Approved plans may change through explicit amendments

**Status:** CONFIRMED Section 15 governance decision.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved allowing implementation discoveries to change approved plans through explicit amendments rather than treating the blueprint as immutable.  
**Related:** Section 15 Feedback, Decisions, and Documentation; all prior approved sections and decisions.  
**Blueprint:** Section 15 remains DRAFT pending closeout.

## Confirmed governance rule

The blueprint is authoritative, but it is not immutable.

If implementation, testing, or real-trip use shows that an approved rule is wrong, incomplete, or impractical:

1. Record the finding.
2. Create a new numbered decision/amendment.
3. State which prior decision/spec is affected.
4. Update the active or future specification.
5. Preserve the historical decision rather than silently rewriting history.

## Do not silently diverge

Implementation should not knowingly behave differently from the approved blueprint without recording the difference.

Small code-level implementation details that do not change product behavior or architecture do not require a new decision.

## Source-of-truth rule

When documents conflict, use this priority:

1. Latest confirmed decision/amendment
2. Latest approved section closeout plus later amendments
3. Current sprint specification
4. Implementation/experiment result records
5. Historical drafts

## Purpose

This keeps the project adaptable while preserving a reliable record of why the product changed.
