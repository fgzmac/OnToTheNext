# D-122 — Sprint 4 Reservation Workflow accepted and merged

**Status:** CONFIRMED — milestone accepted and merged.  
**Approved:** 2026-09-22 (America/Los_Angeles).  
**Owner:** CEO / project owner (`fgzmac`).  
**Source:** Explicit owner instruction: `Approve Sprint 4 and merge PR #4`.

## Acceptance record

- Milestone: **Sprint 4 — Reservation Workflow**.
- Pull request: [#4](https://github.com/fgzmac/OnToTheNext/pull/4).
- Accepted head: `d18f961832dcb8e1acec78262fe2ee8f3b003631`.
- Merge commit on `main`: `887e393560f326bb469dbc5b013fb9ccad2c9dd2`.
- GitHub merge timestamp: `2026-09-23T04:26:20Z`.
- Push verification: [run 35816779891](https://github.com/fgzmac/OnToTheNext/actions/runs/35816779891).
- Pull-request verification: [run 35816782694](https://github.com/fgzmac/OnToTheNext/actions/runs/35816782694).
- Both exact-head checks were rechecked as successful immediately before merge.

This record supersedes pending-acceptance language in the historical Slice 1/2 implementation notes. It accepts the personal-prototype milestone, not a public release.

## Accepted functional scope

Explicit Activity and Transportation reservation tracking, independent desired/confirmed/itinerary times, Home-owned reservation follow-up, retained unattached booking history, sourced release observations, derived attention warnings, and deliberate local cancellation recording.

Accepted, Scheduled, Booked and Paid remain distinct. External links and evidence do not book or cancel anything. Cancellation does not contact a provider, record payment/refund, or delete itinerary content. Source/evidence history survives the approved deletion paths. Options App remains separate and out of scope.

## Verification and limits

The reviewed completion baseline is 138 unit tests plus 140 PostgreSQL integration tests (278 total), 14 Playwright tests, and zero failed/skipped tests. Migration, guarded disposable-database reset/reseed, typecheck, lint and production build passed. Local development/demo database fingerprint preservation and desktop/phone screenshot review were supplied by Codex; TPM independently reviewed repository code, tests and GitHub verification, not the owner's laptop runtime.

The reservation-state comprehension experiment protocol is prepared. **Human comprehension testing has not been conducted.** Acceptance does not claim measured usability or real provider-data quality.

## Accepted dependency deferral — local prototype only

The CEO approval follows the documented TPM disposition in [PR review comment 5789012365](https://github.com/fgzmac/OnToTheNext/pull/4#issuecomment-5789012365). Four high-rated package entries remain reported in both full and production-only npm audits. They represent two underlying high advisories and a further moderate MySQL advisory, not four independently demonstrated application exploits.

- `deepmerge-ts` / `@prisma/config`: GHSA-ggr8-5vv4-36mx / CVE-2026-40345. The reviewed configuration is trusted, static and acyclic; the reported recursive-object precondition is not exercised.
- `mysql2`: GHSA-3f6p-5ww8-9rcr and GHSA-rgwj-5xj2-c3m3. The reviewed runtime and CI use PostgreSQL/PrismaPg, not the affected MySQL authentication or compressed-protocol connections.
- `prisma` and configuration aggregate findings retain their links to the underlying advisories. No forced downgrade, override or dependency change was performed for this acceptance.

These findings are **deferred, not fixed, false positives, or universally safe**. Developer/build/CI exposure remains relevant. Keep audit reporting enabled.

Reassess before public or network-accessible deployment, before enabling MySQL, before untrusted/generated/recursive configuration or configuration extensions, or at the next planned Prisma/dependency-maintenance change, whichever comes first. Do not automatically run forced audit fixes or upgrade/downgrade major versions. Any changed precondition requires renewed review.

## Carry-forward and next milestone

Hotel booking UI, provider integrations, live inventory, monitoring, notifications, payments/refunds and production authentication remain deferred to their approved scope. Existing non-failing warnings remain documented.

Next roadmap milestone: **Sprint 5 — Today mobile mode**. Normal coding, testing and branch implementation remain in Codex under D-118. This decision does not itself perform Sprint 5 implementation; the next TPM handoff defines its first slice.
