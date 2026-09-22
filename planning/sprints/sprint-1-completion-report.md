# Sprint 1 completion report

**Engineering verification:** 2026-09-22
**Branch:** sprint-1-foundation
**PR:** [#1 — Foundation + Trip Skeleton](https://github.com/fgzmac/OnToTheNext/pull/1)
**Acceptance:** Pending CEO/TPM review; do not merge automatically.

## Implementation and audit

Reviewed the existing foundation against planning/blueprint.md, Sections 08–13,
the Sprint brief, and D-094 through D-117. The real Next.js application persists
the five approved Prisma models in PostgreSQL. SQL DATE fields preserve calendar
dates. The server validates and reconciles Trip/Segment/Day structure atomically.

Confirmed shared transfer boundaries, true-overlap rejection, repeated cities,
Unassigned gaps, stable surviving Day IDs, Segment removal preserving Days, Trip
cascade deletion preserving the prototype owner, complete reorder validation,
successful atomic reorder and rollback after injected regeneration failure.
Home, Itinerary and the Discover placeholder have one canonical navigation each.

Fixed the seed's midnight/noon comparison error by sharing the application Day
planner and wrapping fixture replacement in a transaction. Added malformed-date
validation, corrected the guarded reset CLI resolution, and required isolated test
targets before destructive fixtures. The seed preserves unrelated created trips.
No production authentication or later-sprint product capabilities were introduced.

## Actual local verification

| Check | Result |
| --- | --- |
| npm run db:generate | PASS |
| npm run db:deploy against a fresh empty database | PASS; one initial migration |
| npm run db:seed | PASS |
| npm run db:reset on verified isolated database | PASS; migration reset and explicit reseed |
| npm run typecheck | PASS, including after build-generated configuration restoration |
| npm run lint | PASS |
| Unit/domain tests | 14 passed |
| Reset identity/command-order tests | 22 passed |
| Total unit/safety tests | 36 passed |
| PostgreSQL integration tests | 8 passed |
| Total Vitest tests / skipped | 44 passed / 0 skipped |
| npm run build | PASS; normal Next.js production build |
| npm run e2e | 2 passed |
| Desktop visual review | PASS |
| Phone visual review, 390x844 | PASS |
| Known blockers / data-integrity failures | 0 / 0 |

The fresh local verification database was ontothenext_verify_20260922_acceptance,
on localhost:5433 with itinerary user ontothenext. Before reset, the redacted URL,
actual current_database()/current_user and owning itinerary container/volume were
verified. Prisma's runtime consent gate was honored with explicit owner approval.
The normal development database was never reset; its complete data/schema hash
was identical before and after verification. No Options resources were modified.

Both initial seed and reset/reseed produced exactly:
PrototypeUser 1, Trip 1, TripSegment 4, Day 15, TripPreferenceProfile 1.
Assertions checked all three transfer boundaries and the final date.
An integration regression seeds twice, checks ownership/counts, and verifies that
an unrelated trip survives. Synthetic dates are used throughout.

## Core flow and visual acceptance

Browser setup clears only its explicitly validated isolated test database.
The desktop flow proves empty application → broad Japan Trip → no invented Segment
→ Tokyo → Kyoto → Osaka → Tokyo → 15 Days with transfer ownership → refresh and
navigation persistence. The same route is checked at desktop and phone widths.

Coverage includes a rejected overlapping edit with visible error, a valid date edit
persisting after refresh, Segment removal yielding visible Unassigned Days, and
Home/Itinerary/Discover navigation. Screenshots cover creation, Home, editing/errors,
Itinerary, Discover and Unassigned warnings. Full-page screenshots were visually
reviewed; controls remain reachable, Day labels and messages readable, and tested
pages have no horizontal overflow. No UI redesign was required.

Local logs, database fingerprints and screenshots remain in ignored .cache and
test-results. Screenshots and fixtures contain only synthetic development data.

## Change inventory and public repository review

Changes present before the audit were classified before staging:

| Classification | Files / disposition |
| --- | --- |
| PRE-EXISTING VERIFIED INFRASTRUCTURE | .env.example, docker-compose.yml, package.json, playwright.config.ts, .github/workflows/sprint1-ci.yml, .gitignore, .npmrc, package-lock.json, scripts/dev-session.ps1, scripts/db-reset.ts, src/lib/database-reset.ts and its tests, IMPLEMENTATION.md |
| PRE-EXISTING INFRASTRUCTURE requiring portability review | AGENTS.md and DEVELOPMENT-STORAGE.md; rewritten as portable guidance |
| SPRINT 1 IMPLEMENTATION during this audit | seed/date fixes, isolated test safeguards, expanded regression/browser acceptance, updated Sprint reports |
| LOCAL-ONLY / DO NOT COMMIT | .env, .cache, .next, generated Prisma output, node_modules/browser binaries, test-results, external boundary map and mount/backup helpers |
| UNEXPECTED | None |

Significant additions across the Sprint branch relative to origin/main:
- app routes/components/styles for creation, Home, Itinerary and Discover.
- src/modules/trips domain/date/types/service/actions and prototype-owner seam.
- src/lib Prisma access and reset guard.
- Prisma schema, migration, synthetic seed and shared seed implementation.
- Domain/reset/integration/Playwright tests and isolated browser fixture setup.
- Package/lockfile, TypeScript/Next/ESLint/Vitest/Playwright configuration.
- Compose/environment example, CI, session/reset scripts and portable setup docs.
- D-117 implementation transition and the two Sprint reports.

No secrets, personal machine paths, SSD serials, private bookings or private travel
fixtures were added. Existing public local-development example credentials remain
examples, not production secrets. AGENTS/storage docs are portable; the external
PROJECT-BOUNDARIES.md is excluded. Generated/runtime/data files remain ignored.

## CI and scope gate

CI uses a fresh ephemeral itinerary PostgreSQL service on host 5433, npm ci,
Prisma generation/migration/seed/guarded reset, typecheck, lint, unit/safety and
integration tests, build and Chromium E2E with hermetic browsers.
The final engineering handoff and PR description record the actual pushed head
and its green run. See [current PR checks](https://github.com/fgzmac/OnToTheNext/pull/1/checks);
the old pre-audit run is not acceptance evidence for this revision.

Compared the Sprint branch to origin/main. No recommendations, activities,
Map, hotels, reservations, expenses, sharing, companions, external APIs, weather,
transit, ML or native applications were added. No out-of-scope additions required
removal. The implementation remains Foundation + Trip Skeleton.

## Known low-risk issues

- Phone Segment headings wrap dates and reorder labels; all controls remain usable.
  Low severity; optional later visual polish, no next-sprint dependency.
- The PostgreSQL adapter emits a pg deprecation warning about overlapping client
  queries. Current pinned-version tests pass with no failed persistence checks.
  Low severity; review with a future dependency upgrade, before pg 9.
- Prototype identity and foundation-level visual copy are intentional Sprint 1
  limitations, not production readiness. Production hardening stays deferred.

Zero known Sprint 1 blockers or data-integrity defects remain. CEO/TPM acceptance
and review of actual current-head green CI are required before advancing.
