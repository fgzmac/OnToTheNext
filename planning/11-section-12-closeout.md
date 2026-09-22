# Section 12 Closeout — Implementation Boundaries and Simulated Components

**Lifecycle status:** IN REVIEW — awaiting explicit owner approval.  
**Recorded:** 2026-09-21.  
**Purpose:** Lock what Sprint 1 builds for real versus what remains deferred, simulated, or intentionally absent.

## Real Sprint 1 implementation

### Stack
- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma

### Real domain behavior
- Trip persistence
- Trip Segment persistence
- Day persistence
- Trip/Segment date validation
- transfer-day ownership
- valid shared transfer boundary
- temporary Unassigned dates
- automatic Day regeneration
- atomic Segment reorder
- blocking errors / non-blocking warnings

### Real UI
- Create Trip
- Segment editing
- Home
- Itinerary
- Discover placeholder
- responsive desktop/mobile shell

### Real testing
At minimum:
- Trip date rules
- Segment date rules
- transfer-boundary logic
- true overlap rejection
- Unassigned warning behavior
- Day ownership
- Day regeneration
- Segment reorder atomicity

## Prototype identity — D-105

Use one deterministic prototype owner.

No real authentication in Sprint 1.

Keep the identity seam isolated so real User/Trip Membership can replace it later.

## Development seed data — D-106

May include deterministic Japan Trip data:
- Tokyo
- Kyoto
- Osaka
- return Tokyo
- generated Days

Rules:
- development/test only,
- app works with empty database,
- Create Trip remains real product path,
- no fake recommendations/reservations/hotels/expenses.

## External providers

None in Sprint 1.

No:
- maps,
- hotel APIs,
- recommendation sources,
- routing,
- weather,
- transit,
- currency,
- booking APIs.

## Provider abstractions — D-107

Do **not** create empty speculative adapters.

Add adapters only when a real feature needs them.

## Discover behavior

Discover is an intentional placeholder only.

Example:

> Your trip structure is ready.  
> Recommendations come next.

Do not build fake recommendation behavior.

## Not in Sprint 1

- recommendations
- Map
- hotels
- reservations
- expenses
- Share Trip
- companions
- production authentication
- production security/privacy hardening
- provider integrations
- background jobs
- object storage
- offline sync
- notifications
- native apps
- public API
- analytics dashboards

## Data reset

Development may support a simple reset/reseed workflow.

Do not build a user-facing factory-reset feature.

## Scope-control rule

If a feature belongs to a later milestone, do not "just add a small version" during Sprint 1 unless the approved Sprint 1 feature cannot function without it.

The goal is a small, real, reliable vertical foundation.

## Section 12 approval candidate

Approve Section 12 if these implementation boundaries are correct.

Approval advances to **Section 13 — Data and Persistence Planning**.

Approval still does not authorize coding.
