# D-073 — Separate Source and Evidence Record concepts

**Status:** CONFIRMED Section 6 conceptual-model decision. Exact source schemas, refresh schedules, licensing metadata, and confidence logic remain to be defined later.  
**Recorded:** 2026-09-21.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner approved separate Source and Evidence Record concepts.  
**Related:** D-035 community/local sourcing; D-048 factual Discover cards; D-060 recommendation usefulness experiment; Section 6 Conceptual Model and System Boundaries.  
**Blueprint:** Section 6 remains DRAFT.

## Confirmed model

External information used by the app is modeled separately from the user's Recommendation decision state.

### Source

Represents where information originated.

Possible source types:
- official venue/operator,
- tourism board,
- local publication,
- community/forum,
- review platform,
- map/place provider,
- hotel/provider source,
- transit provider,
- weather provider,
- other supported source.

Conceptual fields may include:
- provider/source name,
- source type,
- URL/provider reference,
- attribution/licensing metadata,
- retrieval method where relevant.

### Evidence Record

Represents one sourced fact, claim, observation, or recurring theme.

Conceptual fields may include:
- Source reference,
- related Place and/or Recommendation,
- topic/claim,
- observed/retrieved date,
- freshness/verification state,
- applicable date range,
- recheck/expiration date when relevant,
- source-specific reference.

Examples:
- official opening hours,
- ticket-release schedule,
- current hotel cancellation terms,
- recurring traveler praise,
- recurring crowd complaint,
- transit information,
- current price basis.

## Important boundary

Evidence and user decisions are separate.

Refreshing or replacing evidence does not erase:
- Accepted,
- Denied,
- Saved,
- Must-do,
- scheduled itinerary state.

Likewise, a user's decision does not alter the underlying Source or Evidence Record.

## Evidence categories

The model should preserve meaningful distinctions between:
- official/current logistics,
- traveler/community opinion,
- local/editorial context,
- provider/map data.

Conflicting evidence may coexist rather than being overwritten prematurely.

## Why this matters

- Freshness can be tracked explicitly.
- Official facts remain distinguishable from opinion.
- Evidence can be rechecked independently.
- Recommendations can be updated without losing trip/user state.
- The app can honestly represent stale, unknown, or conflicting information.

## Next Section 6 decision

Define the boundary between a person's identity/account and their membership/role inside a specific Trip.
