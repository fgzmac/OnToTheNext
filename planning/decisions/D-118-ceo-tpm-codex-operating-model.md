# D-118 — CEO / TPM / Codex operating model

**Status:** CONFIRMED  
**Recorded:** 2026-09-22  
**Owner:** CEO / project owner (`fgzmac`)

## Operating model

- CEO: final product and milestone approver.
- ChatGPT conversation: Technical Program Manager and architecture/scope control plane.
- Codex: software engineering team responsible for application coding, local terminal work, tests, commits, pushes, and Sprint implementation.

## Handoff loop

```text
CEO / TPM decision
→ TPM issues Codex prompt with recommended Astra mode
→ Codex implements and reports
→ CEO pastes report into TPM chat
→ TPM audits result
→ next prompt / acceptance decision
```

## Project-boundary rule

On To The Next and the Options App are separate applications. Codex must verify repository root, remote, and approved branch before every itinerary implementation task and must treat Options App resources as read-only/out of scope.

## Implementation rule

Normal application implementation work is performed in Codex. The TPM may maintain planning, decision, acceptance, and roadmap documentation directly.
