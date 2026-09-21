# Section 2 — Users, Roles, and Ownership

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-20.  
**Related:** Approved Section 1 product direction and decisions D-001 through D-038.  
**Approval record:** None yet; individual choices will be recorded as they are made.

## Purpose

Define who participates in a trip, who owns it, what each participant can see or change, and how access begins and ends.

Do not assume every participant needs an account or that companions automatically have edit access.

## Current known roles

### Organizer
**Confirmed from Section 1:** The organizer plans a trip they are taking and shares it with companions.

Current likely responsibilities:
- Create the trip
- Make or approve final itinerary decisions
- Manage core trip preferences
- Review hotel/activity recommendations
- Track booking and reservation states
- Share the trip

The exact permission model remains open.

### Companion
**Confirmed from Section 1:** A companion receives and uses the shared itinerary and may participate in the trip-planning experience.

Open questions:
- View only?
- React/like/dislike?
- Suggest alternatives?
- Vote?
- Edit directly?
- Change same-day plans?
- Need an account?
- See all costs/booking details?
- Receive a published snapshot or live updates?

## Ownership questions

1. Who owns the trip?
2. Can ownership transfer?
3. Can the organizer invite/remove companions?
4. Can a companion ever become a co-organizer?
5. Who can delete the trip?
6. Who can change booked or locked items?
7. Who can publish/share a version?
8. Which information is private to the organizer?
9. What access requires an account versus a shared link?

## First decision to resolve

**Q-101:** For the initial product, what should companions be allowed to do?

Proposed starting models:

### A. View-only companion
- Organizer owns and edits.
- Companion can view the itinerary and practical trip details.
- Lowest complexity, but weak collaboration.

### B. View + react/suggest
- Organizer owns and makes final decisions.
- Companion can react to recommendations, suggest alternatives, and possibly vote.
- Organizer approves changes.
- Strong fit for the product's recommendation-led behavior without giving up trip control.

### C. Co-editor
- Organizer and companion can both directly edit the itinerary.
- More collaborative, but requires stronger conflict handling, audit/history, and permission rules.

### D. Configurable permissions
- Organizer chooses each companion's level.
- Most flexible, but significantly more UI and permission complexity for an early version.

**Confirmed starting direction — D-039:** B — organizer remains the final decision-maker while companions can view, react, and suggest.

This is now the default initial permission model. Exact reaction types, voting, private-field visibility, and future co-editor permissions remain open.

## Next decision

**Q-102:** How should companions gain access?

Proposed options:

### A. Account required
Every companion signs in before viewing or interacting.

### B. Shared link for viewing; account required for reacting/suggesting
Fast to open, but identity is required for participation.

### C. Shared invite link with lightweight guest identity
A companion can join from an invite link, choose/display a name, and react/suggest without creating a full account immediately.

### D. Anyone-with-link access
Lowest friction, but weaker privacy/control and not recommended as the default for private travel plans.

**Confirmed starting direction — D-040:** C — invite link with lightweight guest identity, with the option to upgrade to a full account later.

## Next decision

**Q-103:** What should happen to companion access over time?

Proposed starting model:

- Each companion gets a unique invite link.
- Organizer can revoke that companion's access at any time.
- Once redeemed, the companion keeps access until removed or the trip is deleted.
- Unused invite links can expire after a set period.
- Forwarding a unique invite should not silently create a second companion identity.

Exact expiration duration and technical token design remain later details.

**Confirmed direction — D-041:** unique invite per companion + organizer-controlled revocation + expiry for unused invites.

## Next decision

**Q-105:** Which trip details should companions see by default?

Recommended starting model:

**Companions can see**
- itinerary dates/times,
- activities,
- hotel names/locations,
- transportation plan,
- maps/directions,
- reservation status such as booked/not booked,
- shared notes needed for the trip.

**Organizer-only by default**
- full budget breakdown,
- payment details,
- booking confirmation/reference numbers,
- private planning notes,
- sensitive personal information,
- precise live/current location history.

The organizer can explicitly share more later.

**Recommended direction:** practical trip details shared; financial, sensitive, and private planning details remain organizer-only by default.


## Shared finances and expenses — D-042

**Confirmed:** Companions can see the shared trip budget/cost picture because participants will be splitting costs. The trip includes a shared expense ledger with payer, participants, amount, currency, split, running balances, and end-of-trip settle-up summary.

Sensitive payment credentials and unrelated private personal information remain excluded from shared visibility.

The exact expense edit/delete permission model remains open.

## Next decision

**Q-104:** Who controls destructive/administrative trip actions?

Recommended starting model:
- Organizer can invite/remove companions.
- Organizer can delete the trip.
- Organizer can publish/share the itinerary.
- Companions cannot delete the trip or remove other companions.
- Ownership can be transferred deliberately, but not accidentally.
- Shared expenses remain visible even if a companion is removed until outstanding balances are resolved or explicitly handled.

**Confirmed direction — D-043:** Organizer controls membership, deletion, publishing, and deliberate ownership transfer; companions participate in planning/expenses without administrative control.

Expense history and outstanding balances remain preserved even if a companion is removed.

## Next decision

**Q-106:** How should individual traveler preferences affect recommendations?

Proposed starting model:
- Each traveler can have their own preferences and reactions.
- The app should keep those signals separate rather than collapsing them into one anonymous group profile.
- Recommendations should show when something strongly fits everyone versus mainly one person.
- The organizer still chooses the final itinerary.
- When preferences conflict, the app should propose balanced alternatives rather than silently averaging away the disagreement.

Example:

```text
Option A
✓ Strong match for organizer
✓ Strong match for companion

Option B
✓ Strong match for organizer
△ Low interest from companion

Option C
Balanced alternative
✓ Moderate fit for both
```

**Confirmed direction — D-044:** individual preference profiles + transparent group-fit explanation + organizer final decision.

## Section 2 status

The core role/ownership model is now defined:

- Organizer owns and administrates the trip.
- Companions join through unique invite links with lightweight guest identity.
- Companions can view, react, and suggest but do not directly overwrite confirmed plans by default.
- Organizer can revoke access and unused invites expire.
- Shared trip finances and the expense ledger are visible to companions.
- Sensitive payment credentials and unrelated private data remain protected.
- Expense history survives membership changes.
- Each traveler retains distinct preferences and reactions.
- Group-fit differences are shown rather than silently averaged.
- Organizer retains the final itinerary decision.

Remaining details such as exact invite expiry duration, expense-edit permissions, raw-preference visibility, deletion recovery, and ownership-transfer mechanics can be specified in later interface/data/security work.

**Section 2 is ready for closeout review.**


## Companion model amendment — D-053

The owner simplified the companion role after Section 2 approval.

**Current rule:** companions view the trip and participate in shared expenses. They do not need in-app thumbs-up/down reactions, planning suggestions, hotel/activity voting, or itinerary-change proposals.

Planning feedback can happen directly between travelers outside the app, with the organizer making changes.

This amendment supersedes the reaction/suggestion portions of D-039 and D-044 while preserving invite/access, shared visibility, organizer control, and expense participation.
