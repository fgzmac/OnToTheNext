# D-121 — Sprint 3 Itinerary Builder accepted and merged

**Status:** CONFIRMED  
**Recorded:** 2026-09-22  
**Owner:** CEO / project owner (`fgzmac`)  
**Source:** Explicit instruction: `Approve Sprint 3 and merge PR #3`.

## Accepted milestone

**Sprint 3 — Itinerary Builder** is complete.

Accepted branch head:

`65a57b16de2406a093adad7a85dd07c34ad820aa`

Merged pull request:

[#3 — Sprint 3: Itinerary Builder](https://github.com/fgzmac/OnToTheNext/pull/3)

Merge commit:

`61ea6c94f84ec5e8a30b0c570635d1d003d27584`

## Acceptance evidence

At acceptance:
- exact PR head verified,
- current-head CI passed,
- Accepted / Scheduled / Booked remained distinct,
- typed Itinerary Items and day timeline were implemented,
- Free Time, Hotel / Rest, and Transportation blocks were implemented,
- reorder and cross-Day movement were protected and transactional,
- material moves required preview/confirm,
- conflict warnings were derived and non-mutating,
- occupied-Day date shrink remained blocked,
- concurrent mutation tests preserved ordering/content,
- no Reservation, booking state, Map, external provider, or Options App scope leaked into the milestone.

## Next milestone

Next roadmap milestone: **Reservation Workflow**.

This decision closes Sprint 3 only. Reservation Workflow implementation begins through explicit Codex handoff prompts from the TPM.
