# Candidate-based trip draft: benchmark first step

**Superseded by the paste-first organizer product contract.** The unpublished
catalog-based whole-trip generator, temporary preview UI and its generator-specific
tests have been retired. A private local source checkpoint preserves that work.
See [Paste-first organizer](paste-first-organizer.md). The historical record below
describes the superseded experiment, not the current product or acceptance claim.

Starting revision: a721daeda5827eb41ce1c654c6a38c7b8f6d5ead, branch
feat/cross-destination-discovery. The restored canonical checkout was clean.
No unpublished planner existed. The owner supplied private benchmarks for
judgment and organized output; those files, their itinerary and personal details
are not part of this record, fixtures or repository.

## Capability boundary established before implementation

| Behavior | Existing foundation | This slice | Explicit remaining gap |
| --- | --- | --- | --- |
| Preferences and wishlist | Saved interests, decisions and recommendations | Reuses interests and accepted candidates; declines excluded | Conversation ingestion, provenance of evolving user assertions and consequential clarification |
| City stays | Manually entered segments and calendar validation | Displays existing stay sequence | Recommending stay lengths, lodging candidates and justified route tradeoffs |
| Protect arrangements | Reservations, fixed/free-time blocks, guarded edits | Leaves every saved day and dated reservation/intention intact | Revising around partial-day protected intervals and explicit booking amendment proposals |
| Spacious days | Entered durations and travel estimates | Reserves arrival, departure and transfers; long experiences stand alone | Real arrival/departure constraints, routing, queues, hotel access and transport feasibility |
| Location grouping | Stored place coordinates | At most two candidates within 1.5 km straight-line distance; absent coordinates means no pairing | Verified walking/transit routes, barriers and accessibility |
| Selective additions | Interest ranking and diverse recommendation batches | Bounded daily load; excess ideas stay separate | Conversational judgment about which additions genuinely improve a wishlist |
| Alternatives and revision | Guarded individual edits | Explicit one-for-one replacement; protect/omit/pace revision retains valid unrelated proposals | Durable versioned trip proposals and atomic reviewed application of a multi-day revision |
| Dependencies and next decision | Reservation/evidence workflows | Prompts review of candidates, free days, tickets, lodging and transfers | Structured dependency graph and personalized decision prioritization |
| Provenance and uncertainty | Source metadata, event-local guards, reservation states | Proposed/estimated/saved labels; no invented prices, hours, routes or availability | Field-level provenance across conversation facts, assumptions, corrections and proposals |

This is a deterministic candidate-based first delivery. It is not equivalent to
the benchmark conversation, a researched itinerary, or a booking service.

## Implemented interaction

The existing builder contains **Plan the whole trip · Draft & revise**.
Preparation explicitly reads a repeatable database snapshot. It does not provision
catalogs, contact a provider, change recommendations/decisions, edit reservations,
or alter saved itinerary items. The surrounding builder retains its normal
catalog behavior and existing one-action Add controls.

The draft uses only already-available candidates for existing segments. Explicit
interest overlap outranks inferred reactions; accepted ideas lead within equal
interest overlap. Denied and scheduled ideas are excluded. Event eligibility uses
the existing real-calendar and event-local observation guard with an injectable
clock. Unknown/withdrawn event metadata is held. Eligibility is not ticket inventory.

Saved days and dated non-cancelled reservations/intentions are protected as a whole.
Arrival, departure and segment boundary days remain spacious by default. A short
day has at most two ideas, total estimated duration plus a **60-minute assumed
pacing allowance** within 240 relaxed or 360 balanced minutes. Experiences of
300–720 estimated minutes occupy a day alone. Missing/invalid durations are held.
These conservative bounds are planning assumptions, not sourced route durations.

Protecting another day relocates or holds affected proposals while retaining valid
unrelated placements. Omitting an idea does not silently insert an alternative.
Replacement is explicitly one-for-one on the same eligible day and rechecks load
and location constraints. Previously excluded ideas stay excluded on revision.

Previews live only in component memory. They are explicitly temporary and disappear
on navigation/refresh or saved-context remount. There is no bulk Apply action;
the existing Add workflow remains the way to save reviewed ideas. No reservation
is amended or created by the planner. A refreshed draft reads the current saved
context rather than pretending an old preview is current.

## Synthetic acceptance scenarios

- A multi-base trip retains an existing reservation and an intentionally free
  afternoon; transfer, arrival and departure days receive no extra sightseeing.
- A full-day experience has no additional stops. Unknown duration is held;
  missing/invalid coordinates never become invented proximity.
- A protected-day revision removes/relocates only affected proposals. Other
  days retain their proposals; stored items, bookings and accounting are equal.
- A replacement removes its named predecessor and does not increase the load.
- A later date/eligibility correction respects current constraints and preserves
  saved information. Invalid calendar dates, stale event observations and the
  event-local midnight boundary remain held through the existing guard.
- A real desktop and phone browser prepares a draft, protects a day, sees the
  revision, then uses direct Add and refreshes the saved plan.

Tests assert constraints and outcomes, not a particular attraction sequence or
generated wording. All places, reservations and dates in new fixtures are synthetic.

## Verification

Local verification uses only the task-authorized isolated planner database on
the existing itinerary Compose service. Existing migrations only; no schema change
or reset. Excluded database fingerprints and protected launcher/environment file
hashes are compared before and after. Live providers are disabled in the verification
runner. The dedicated browser run uses ordinary Next startup without the synthetic
Google preload, preserving the existing provider test-boundary allowlist.

Verification completed 2026-10-03:

- Prisma validation/generation and all 14 existing migrations passed on the new
  isolated target. No new migration or reset.
- 735/735 unit and PostgreSQL integration tests passed across 41 files, no skips
  or failures. This includes 12 new pure constraint tests and 3 new database tests.
- Typecheck and source lint passed. The initial broad lint invocation traversed
  ignored local caches (45 errors); rerunning with `.cache/**` excluded passed.
  No lint rules or application assertions were weakened.
- Production build passed. Next's automatic tsconfig/next-env edits were removed
  from the source diff after building.
- 2/2 targeted Playwright cases passed: desktop and 390×844 phone. A second build
  and 2/2 rerun passed after correcting stretched day-card spacing. No failed
  browser cases or retries. The complete pre-existing browser suite was not run;
  its separate synthetic-provider activation allowlist was not changed.
- Real rendered draft/revision captures were inspected. There was no horizontal
  overflow. Local ignored gallery: `.cache/planner1/review.html`; full captures
  and normal viewport captures are under `.cache/planner1/browser-results/`.
- All 18 excluded database fingerprints and protected environment/launcher file
  hashes matched before and after destructive fixture verification.
- A separate synthetic trip in the same isolated target is available for local
  review. The verification build is not a prepared/repinned Google pilot build.
  Live providers remain disabled; no provider gates or accounting were changed.

Changes remain uncommitted. No push, PR edit, merge or Cloud change. No private
benchmark data, caches, credentials or screenshot fixtures are included in source.
