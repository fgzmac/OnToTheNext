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

**Recommended starting direction:** C — invite link with lightweight guest identity, with the option to require/upgrade to a full account later.
