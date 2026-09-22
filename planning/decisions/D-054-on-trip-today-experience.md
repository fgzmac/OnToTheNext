# D-054 — On-Trip Today mobile experience approved

**Status:** CONFIRMED Section 3 mobile travel-mode direction. Exact live-data providers, offline caching implementation, alert rules, and leave-by calculation details remain OPEN.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved the proposed On-Trip Mobile Home / Today experience.  
**Related:** D-047 itinerary builder; D-050 reservations; D-051 expenses; D-052 map; D-053 simplified companion role; Section 3.  
**Blueprint:** Section 3 remains DRAFT.

## Confirmed Today hierarchy

During the trip, mobile Home becomes a Today screen centered on:

1. Next activity
2. Leave-by / travel timing
3. Ticket or reservation access
4. Remaining day timeline
5. Intentional free time
6. Nearby discovery
7. Return-to-hotel action
8. Quick expense entry
9. Alerts that materially affect the day

## Next activity

The top of the screen should surface:
- activity name,
- start time,
- recommended leave-by time,
- travel duration,
- reservation/booking state,
- ticket/confirmation access,
- directions action.

## Leave-by behavior

Leave-by time may consider:
- current or selected starting location,
- hotel,
- previous itinerary stop,
- walking/transit time,
- check-in requirement,
- configurable/reasonable buffer.

If live location is unavailable or not permitted, use a known trip location such as the hotel or previous stop.

## Free time

Free time remains intentional.

On the Today screen it can expose actions such as:
- Find something nearby
- Food nearby
- Shopping nearby
- Return to hotel

Nearby recommendations must account for the next fixed commitment and should not be added until explicitly confirmed.

## Hotel return

The hotel should be a first-class travel action.

The app may show:
- travel time to hotel,
- expected hotel arrival,
- how much rest/free time remains,
- recommended departure for the next fixed activity.

## Live-day adjustments

Flexible itinerary items can support:
- Skip
- Move later
- Move to another day
- Replace

Material changes should be previewed before applying.

A "running late" state may propose adjustments without silently changing the itinerary.

## Completed items

Completed activities can collapse while remaining accessible so the next and remaining items stay prominent.

## Quick expense

A quick-add expense action should be accessible from Today without requiring navigation to the full expense dashboard.

## Alerts

Travel-mode alerts may include:
- reservation changes,
- transit disruption,
- weather that materially affects plans,
- cancellation deadlines,
- other trip-critical changes.

Exact live data sources and notification mechanics remain later decisions.

## Companion Today

Companions can see the same practical Today information but without organizer-only planning controls.

## Offline-ready design

The architecture/UI should support eventual local availability of essential travel information such as:
- today's itinerary,
- hotel address,
- reservation times,
- confirmation references,
- ticket links/attachments where permitted,
- essential trip notes.

Offline implementation details are deferred.

## Next Section 3 decision

Design the **Pre-Trip Readiness / Trip Overview** experience:
- what remains undecided,
- hotel readiness,
- transportation readiness,
- reservation readiness,
- itinerary coverage,
- budget/expense status,
- companion access,
- and departure-critical warnings.
