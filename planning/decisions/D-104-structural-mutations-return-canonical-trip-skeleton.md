# D-104 — Structural mutations return the refreshed canonical Trip skeleton

**Status:** CONFIRMED Section 11 API-contract decision. Exact TypeScript response types remain to be defined during implementation planning.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved returning the refreshed Trip/Segment/Day structure after structural mutations.  
**Related:** D-099 Day regeneration; D-101 errors/warnings; D-103 atomic Segment reorder; Section 11 Detailed API Contract for Current Feature.  
**Blueprint:** Section 11 remains DRAFT pending closeout.

## Confirmed behavior

After a successful structural Trip mutation, return the refreshed canonical Trip skeleton rather than only a changed record or success flag.

Conceptually:

```text
data
├── Trip basics
├── ordered Segments
├── regenerated Days
└── structural summary / Unassigned dates

errors[]
warnings[]
```

## Applies to

Examples:
- `createTrip`
- `updateTrip` when structural/date fields change
- `addSegment`
- `updateSegment`
- `reorderSegments`
- `removeSegment`

## Why this is approved

- The server owns validation and Day generation.
- The UI does not reconstruct Segment/Day rules locally.
- Home and Itinerary can stay synchronized from one canonical response.
- Fewer follow-up reads are needed during the prototype.
- Debugging is simpler because the post-mutation state is explicit.

## Scope note

Later, simple non-structural edits may return narrower data where appropriate.

This decision applies to mutations that materially affect the Trip skeleton.
