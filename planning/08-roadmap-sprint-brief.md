# Section 9 — Roadmap and Sprint Brief

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–8; decisions D-001 through D-093.  
**Approval record:** None yet.

## Purpose

Turn the approved product, domain, architecture, and capability model into a practical implementation sequence.

This section defines:
- build order,
- milestone boundaries,
- what each sprint should prove,
- what can remain mocked/manual,
- and what must be working before moving forward.

Implementation still does **not** begin until the owner explicitly transitions from planning/design into implementation.

## Roadmap principles

### 1. Build the core loop first
Prioritize the smallest path from:
```text
Create Trip
→ Discover
→ Accept / Deny
→ Itinerary
→ Reservation state
→ Today
→ Share Trip
```

### 2. Build vertical slices
Prefer a thin end-to-end feature over many disconnected backend/frontend pieces.

### 3. Mock external providers before integrating deeply
Use fixtures/manual data where necessary until the product behavior is proven.

### 4. Preserve approved simplicity
Do not add extra dashboards, tabs, or duplicate navigation while implementing.

### 5. Treat Tier C integrations as optional until core flows work
Advanced source ingestion, live inventory, route optimization, transit/weather, and richer offline behavior come later.

## Proposed roadmap

### Milestone 0 — Project foundation
Goal: establish the codebase and domain skeleton.

Includes:
- Next.js + TypeScript setup
- PostgreSQL
- Prisma
- environment configuration
- basic domain/module folder structure
- prototype-only access approach
- baseline lint/typecheck/test setup
- managed/local database workflow

Exit criteria:
- app runs locally,
- database connection works,
- migrations work,
- a basic Trip record can be created/read,
- test command succeeds.

### Milestone 1 — Trip shell + Home
Goal: establish the core Trip/Segment/Day structure and the three-part navigation.

Includes:
- Home
- Itinerary
- Discover
- Trip creation
- Trip Segments
- Days
- basic Trip Preference Profile
- responsive shell
- simple Home summary

External providers:
- none required.

Exit criteria:
- user can create a multi-city trip,
- see Segments/Days,
- navigate Home / Itinerary / Discover,
- state persists in PostgreSQL.

### Milestone 2 — Discover core
Goal: validate the recommendation loop.

Includes:
- Recommendation
- Place
- Recommendation Decision
- factual recommendation cards
- Accept / Deny
- Save / Must-do if included
- small manual/fixture recommendation source
- source/evidence display
- request another batch

Map:
- may begin with static/simple provider integration or mock markers.

Exit criteria:
- recommendations can be shown,
- decisions persist,
- accepted/denied state is distinct,
- second batch can be generated/refined with simple rules/manual fixtures.

### Milestone 3 — Itinerary builder
Goal: turn accepted recommendations into a usable trip.

Includes:
- typed Itinerary Items
- day timeline
- add accepted recommendation to day
- move/reorder items
- Free Time
- Hotel/Rest
- Transportation blocks
- fixed/flexible state
- basic conflict rules
- preview-before-change for material moves

Exit criteria:
- user can create a realistic multi-day itinerary,
- free time is intentional,
- accepted/scheduled/booked remain distinct.

### Milestone 4 — Reservation workflow
Goal: make booking state trustworthy.

Includes:
- typed Reservation
- Book now
- Opens later
- Check back
- Booked
- Needs attention
- desired vs confirmed time
- next inventory release
- Source/Evidence link
- explicit mark-booked action
- official/external booking handoff

Exit criteria:
- reservation-state comprehension experiment can run against real UI,
- booking state persists,
- scheduled does not silently equal booked.

### Milestone 5 — Today mobile mode
Goal: make the trip usable while moving around.

Includes:
- Today mode
- next activity
- remaining timeline
- leave-by calculation using known context
- reservation/ticket detail access
- Free Time actions
- Return to Hotel
- skip/complete
- quick expense entry shell

Exit criteria:
- On-Trip Today usability experiment can run in San Jose.

### Milestone 6 — Discover Map + planning hotels
Goal: add geographic context and lodging planning.

Includes:
- Map mode within Discover
- markers for recommendations/accepted/planned places
- city/day scope
- basic route/travel-time context
- hotel candidate flow per Segment
- planning-only hotel UI
- select Hotel Stay
- hotel shopping recedes after confirmation

Exit criteria:
- user can compare/select lodging,
- map remains inside Discover,
- no duplicate Map entry points.

### Milestone 7 — Expenses
Goal: support shared trip-cost tracking.

Includes:
- Trip Budget
- Planned Costs
- Expenses
- Expense Allocations
- equal/exact/percentage/shares
- running balances
- settlements
- planned vs actual
- Home-launched expense screen
- quick-add from Today

Exit criteria:
- Shared Expense Usefulness experiment can run end-to-end.

### Milestone 8 — Share Trip
Goal: create the exciting shareable itinerary experience.

Includes:
- Share Presentation
- destination-themed template
- share-safe content
- Share Link
- native browser/device share path
- Copy Link
- app/deep-link behavior
- no companion membership granted by Share Link

Exit criteria:
- Share Trip usefulness experiment can compare plain/polished/rich variants,
- recipient can understand trip without entering editor.

### Milestone 9 — Companion viewing
Goal: support simple shared access after the personal organizer flow works.

Includes:
- lightweight guest/member simulation or simplified real access
- companion read view
- shared costs
- companion expense entry
- membership lifecycle as needed for testing

Production-grade auth remains deferred under D-083.

Exit criteria:
- second traveler can view trip and participate in expenses.

### Milestone 10 — Provider integration hardening
Goal: replace the highest-value mocks/manual data with real adapters.

Candidates:
- Places/Map provider
- hotel data
- source/evidence refresh
- currency
- route/travel-time provider
- reservation/release data where accessible

Only integrate what materially improves the validated product.

### Milestone 11 — First complete software test
Goal: run the six Section 4/5 end-to-end scenarios against the integrated prototype.

Must test:
1. Start a trip
2. Build the trip
3. Handle planning details
4. Share it
5. Use it while traveling
6. Travel together / split expenses

Target remains the previously approved **November 10, 2026 first complete software-test milestone**, not a public launch.

## Proposed first sprint

### Sprint 1 — Foundation + Trip skeleton

Objective:
Build the smallest real slice that creates and persists a Trip with Segments/Days and exposes the approved primary navigation.

Scope:
- initialize Next.js/TypeScript project if not already present,
- configure PostgreSQL,
- configure Prisma,
- define first minimal schema:
  - Trip
  - Trip Segment
  - Day
  - Trip Preference Profile placeholder,
- create migration,
- create Trip flow,
- read Trip,
- create/reorder Segments,
- generate Days from Trip/Segment dates,
- build responsive shell:
  - Home
  - Itinerary
  - Discover,
- basic automated tests,
- no external APIs.

Out of scope for Sprint 1:
- recommendations,
- map,
- hotels,
- reservations,
- expenses,
- sharing,
- companion access,
- production auth,
- production security hardening.

### Sprint 1 exit criteria
- project runs locally,
- Trip persists in PostgreSQL,
- multi-city Segments persist,
- Days render in order,
- Home / Itinerary / Discover navigation works on desktop and mobile widths,
- no feature has duplicate navigation homes,
- typecheck/tests pass.

## First Section 9 decision

**Q-801:** Should implementation follow this milestone order, with Sprint 1 limited to Foundation + Trip skeleton?

**Confirmed direction — D-094:** use the approved milestone order and keep Sprint 1 limited to Foundation + Trip Skeleton. Future sprint details will be refined after validating each completed milestone rather than being over-specified upfront.


## Section 9 status

The roadmap sequence, first complete software-test target, and Sprint 1 brief are now defined.

Future sprint briefs should be created incrementally after each milestone is validated.

**Section 9 is ready for closeout review.**
