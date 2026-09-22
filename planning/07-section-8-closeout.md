# Section 8 Closeout — Lightweight API Capability Inventory

**Lifecycle status:** APPROVED.  
**Recorded:** 2026-09-21.  
**Purpose:** Consolidate the capabilities the application must support before moving into roadmap and sprint planning.

## Capability design rule

Use:
- simple CRUD for ordinary maintenance,
- explicit domain actions for meaningful state transitions.

Examples:

```text
acceptRecommendation
denyRecommendation
moveItineraryItem
previewItineraryChange
markReservationBooked
recordExpense
recordSettlement
generateSharePresentation
```

Avoid generic update calls for important domain transitions.

## Capability groups

### Trip
- create/read/update Trip
- list Trips
- read Home summary

### Trip Segments
- add/update/reorder/remove Segment
- assign destination/base
- manage arrival/departure context
- attach Hotel Stay

### Itinerary
- read Day timeline
- add/update/move/reorder Itinerary Item
- move items across days
- manage free time/rest
- mark skip/complete
- preview material changes
- read conflict results

### Discover
- request recommendation batches
- read factual Recommendation details
- read linked Place/Evidence
- Accept / Deny / Save / Must-do
- request another batch
- nearby discovery
- date-specific recommendations

### Discover Map mode
- read map markers
- read Places
- read route/travel-time context
- read nearby Places
- resolve provider Place data into app-owned Place identity

Map remains a Discover capability, not a separate domain.

### Hotels
Planning-phase only:
- request/filter/compare hotel candidates
- read price/room/bed/amenity context
- select Hotel Stay
- deliberately change Hotel Stay
- external booking handoff

### Reservations
- create/read/update Reservation
- set desired/confirmed time
- change workflow state through explicit actions
- read next inventory release/evidence
- save confirmation/cancellation details
- link reservation to itinerary/hotel/transportation
- read reservations requiring action

### Budget and costs
- set/read Trip Budget
- add/update/read Planned Costs
- calculate planned spend

### Expenses
- record/update/remove authorized Expense
- calculate/store Expense Allocations
- read transaction history
- read running balances
- link Expense to relevant trip objects

### Settlements
- record Settlement
- read settlement history
- read remaining balance

### Home / Today
Home and Today are composed read surfaces over canonical domain data.

They may use optimized read models, but do not own duplicate business state.

### Sharing
- generate/regenerate Share Presentation
- create/read Share Link
- expose share-safe content only

### Travelers / Membership
Prototype may simplify this, but the capability model supports:
- Companion Invite
- invite redemption
- membership reads
- revocation/removal
- ownership transfer later

### Preferences
- read/update Trip Preference Profile
- read optional User Preference Profile
- preserve Trip preference priority

### Source / Evidence
- read Source attribution
- read/update Evidence
- track freshness and verification
- support manual refresh during prototype
- later support scheduled refresh

### Provider adapters
Potential adapters include:
- Places/Maps
- Hotels
- booking/source lookup
- Weather
- Transit
- Currency

Provider-specific payloads should not leak directly into UI/domain code.

## API exposure

### V1 — D-093
No public developer API.

Use:

```text
Next.js UI
→ Server Action / Route Handler
→ Application / Domain Capability
→ Prisma / Provider Adapter
```

Public API design is deferred until a real external consumer exists.

## One-source-of-truth rule

The capability model preserves the approved product/domain boundaries:

- Home does not own Reservation state.
- Discover Map does not own a second Place model.
- Itinerary does not own Expense state.
- Share Link does not create Trip Membership.
- Provider data does not replace app-owned domain identity.

## Section 8 approval candidate

Approve Section 8 if this capability inventory and internal-only V1 API boundary are correct.

Approval advances the blueprint to **Section 9 — Roadmap and Sprint Brief**.

Approval does not authorize implementation.


## Approval record

**Approved by owner:** 2026-09-21.  
**Owner instruction:** “Approve section 8.”  
**Effect:** Advance to Section 9 — Roadmap and Sprint Brief. This approval does not authorize implementation.
