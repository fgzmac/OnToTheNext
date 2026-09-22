# Section 6 Closeout — Conceptual Model and System Boundaries

**Lifecycle status:** APPROVED.  
**Recorded:** 2026-09-21.  
**Purpose:** Consolidate the core domain model and system boundaries before architecture and quality decisions.

## Core model

```text
Trip
├── Trip Segments
│   ├── Days
│   │   └── Itinerary Items
│   └── Hotel Stay
├── Travelers via Trip Membership
├── Recommendations
│   └── Recommendation Decisions
├── Reservations
├── Planned Costs
├── Expenses
│   └── Expense Allocations
├── Settlements
├── Preferences
└── Sharing
```

## Confirmed domain concepts

### Trip
Primary container for the travel experience.

### Trip Segment
Represents one contiguous stay/base in a destination and allows the same city to appear multiple times.

### Day
Represents one calendar day within a Segment.

### Itinerary Item
One typed model for:
- Activity
- Meal
- Shopping
- Transportation / Transit
- Free Time
- Hotel / Rest
- Custom

Scheduling does not itself imply booking, payment, or completion.

### Place
Reusable factual geographic/entity record.

### Recommendation
Trip-context proposal that may reference a Place.

### Recommendation Decision
Trip/user-specific Accepted / Denied / Saved / Must-do decision.

### Reservation
One typed model for activity, hotel, and transportation booking workflows.

Reservation workflow is separate from external availability evidence.

### Source + Evidence Record
Represent provenance, freshness, verification, official facts, and community/local observations separately from user decisions.

### User / Guest Identity
Represents the person at the product level.

### Trip Membership
Represents role and access inside one specific Trip.

### User Preference Profile
Optional longer-term tendencies.

### Trip Preference Profile
Trip-specific preferences and constraints; takes precedence during the current Trip.

### Trip Budget
Target/constraint.

### Planned Cost
Expected spending before payment.

### Expense
Actual spending.

### Expense Allocation
Each traveler's responsibility for a shared Expense.

### Settlement
External payment record that reduces traveler balances.

### Hotel Stay
Confirmed lodging for a Trip Segment.

### Share Presentation
Polished themed itinerary artifact.

### Share Link
Opens a share-safe/read-only presentation.

### Companion Invite
Unique mechanism for actual Trip membership/access.

## Important conceptual separations

```text
Recommendation ≠ Itinerary Item
Itinerary Item ≠ Reservation
Reservation ≠ Expense
Planned Cost ≠ Expense
Hotel Candidate ≠ Hotel Stay
Share Link ≠ Companion Invite
Identity ≠ Trip Membership
Reservation workflow ≠ External availability evidence
```

## Multi-city and transportation model

```text
Trip
├── Tokyo Segment
│   └── Days
├── Transportation Itinerary Item
│   ↔ Transportation Reservation (optional)
├── Kyoto Segment
│   └── Days
└── ...
```

No separate transfer domain object is required.

## Reservation cost lifecycle

A Reservation may reference:
- Planned Cost before purchase,
- Expense after purchase,
- both when both exist.

The Planned Cost is preserved for planned-vs-actual comparison.

## Expense model

```text
Expense
├── Payer
├── Amount / Currency
└── Allocations
    ├── Traveler A → responsibility
    └── Traveler B → responsibility
```

Split method calculates allocations; Settlement remains separate.

## Sharing/access boundary

```text
Share Presentation
    ↓
Share Link
    ↓
Read-only/share-safe experience

Companion Invite
    ↓
Trip Membership
    ↓
Companion permissions + shared expense access
```

Sharing never silently grants membership.

## System boundary

### App owns
- trip structure and relationships,
- recommendations and decisions,
- itinerary,
- reservation workflow,
- planned costs,
- expenses,
- memberships,
- share presentation,
- Today experience.

### External providers own
- actual purchases,
- payment transfer,
- turn-by-turn navigation,
- live inventory,
- authoritative venue rules/hours,
- live transit,
- live weather,
- other provider-specific current data.

The app can store confirmed outcomes without pretending to be the authority for the external transaction/data source.

## Section 6 approval candidate

Approve Section 6 if this conceptual model is correct.

Approval advances the blueprint to **Section 7 — Architecture, Quality, and External Dependencies**.

Approval does not authorize implementation.


## Approval record

**Approved by owner:** 2026-09-21.  
**Owner instruction:** “Approve section 6.”  
**Effect:** Advance to Section 7 — Architecture, Quality, and External Dependencies. This approval does not authorize implementation.
