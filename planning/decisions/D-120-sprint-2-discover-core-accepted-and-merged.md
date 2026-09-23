# D-120 — Sprint 2 Discover Core accepted and merged

**Status:** CONFIRMED  
**Recorded:** 2026-09-22  
**Owner:** CEO / project owner (`fgzmac`)  
**Source:** Explicit instruction: `Approve Sprint 2 and merge PR #2`.

## Accepted milestone

**Sprint 2 — Discover Core** is complete.

Accepted branch head:

`c11caae998a2c2b2ef2fcf568d83f6b440e1fde6`

Merged pull request:

[#2 — Sprint 2: Discover Core](https://github.com/fgzmac/OnToTheNext/pull/2)

Merge commit:

`2a829b3783bef880d0e6fd3d107b5ae4e156c067`

## Acceptance evidence

At acceptance:
- exact PR head verified,
- current-head CI passed,
- recommendation, decision, source, evidence, and Place boundaries were reviewed,
- explicit Trip interests and decision-based refinement were verified,
- historical recommendation batches remained immutable,
- batch generation was transactional and retry-safe,
- desktop and mobile acceptance passed,
- no external provider, Map, hotel, Reservation, itinerary scheduling, ML/vector search, or Options App scope leaked into the milestone.

## Discover Core exit criteria

Confirmed:
- recommendations are shown,
- decisions persist,
- Accepted and Denied remain distinct,
- later batches can be generated,
- later batches refine using simple rules over explicit Trip preferences and prior decisions,
- external providers are not required for this prototype milestone.

## Next milestone

Next roadmap milestone: **Itinerary Builder**.

This decision closes Sprint 2 only. Itinerary Builder implementation begins through explicit Codex handoff prompts from the TPM.
