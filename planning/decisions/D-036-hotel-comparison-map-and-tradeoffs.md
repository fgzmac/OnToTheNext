# D-036 — Hotel comparison cards, configurable price range, map context, and pros/cons

**Status:** CONFIRMED product requirements at capability level; exact UI, map provider, hotel source, photo rights, ranking logic, and numerical defaults remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner wants at least 4–5 hotel options per city, a configurable hotel price range, hotel photos and amenities, a map showing nearby places and transportation, and useful pros/cons such as proximity to shopping, hot-spring access, or needing transit for casual exploration.  
**Related:** D-009/D-010 hotel support; D-029 hotel-base preference; D-030 recommendation-led planning; D-031 accepted personal hotel reference; D-033 configurable amenities; D-032 approved core-city schedule; D-035 multi-source recommendation evidence.  
**Blueprint:** Section 1 remains DRAFT. This decision records product behavior, not implementation/provider selection or booking authority.

## Confirmed hotel discovery requirements

For each city in a multi-city itinerary, the app should present **at least 4–5 useful hotel candidates** when sufficient valid inventory exists.

The goal is not to pad the list. If fewer than 4–5 credible options satisfy the traveler's constraints, show the smaller set honestly and explain which constraints are limiting the result rather than inserting poor matches.

Each hotel comparison should include:

- Hotel name and meaningful photos
- Actual room/bed option when available
- Configurable price range and full-stay cost context
- Hotel and room amenities
- Location/neighborhood context
- Nearby transportation
- Map of relevant nearby places
- Pros and cons tied to the traveler's actual itinerary and preferences
- Booking/cancellation/tax/fee information when supported
- Why the hotel is being recommended

## Configurable price range

The traveler should be able to set or revise a hotel price range. This must not be permanently hardcoded to the owner's approved personal search reference.

Proposed behavior:
- Recommend a starting range using known trip budget and hotel preferences when enough context exists.
- Let the user edit the range directly.
- Permit strong cheaper matches.
- Optionally show a more expensive comparison when the added value is material and clearly explained.
- Distinguish a **soft preferred range** from a **hard maximum** if the user wants that behavior. This distinction is proposed, not yet approved.
- Always identify charge basis: room/night, person/night, bed/night, or total stay.
- Show taxes/mandatory fees and unknown amounts separately when they are not included.

## Photos

Hotel cards should include useful images such as:
- Exterior
- Actual room type
- Bathroom
- Lobby/common areas
- Relevant amenities such as onsen, gym, pool, lounge, laundry
- Neighborhood/location imagery when useful

Do not use a generic property image as if it depicts the exact offered room. Photo source rights, retention, attribution, and provider support must be evaluated later.

## Amenities

D-033 remains in force: amenities are traveler-specific and configurable.

Hotel comparison should make it easy to see:
- Which requested amenities are present
- Which are room-specific versus property-wide
- Which are **must-have**, **nice-to-have**, or irrelevant if those priority controls are later approved
- Important distinctions such as in-room washer/dryer versus shared laundry versus paid laundry service
- Whether an amenity is verified for the selected room/property or merely mentioned generally

## Map and transportation context

Each hotel should have a map-oriented view showing relevant nearby context.

Candidate map layers:
- Planned must-do experiences
- Planned optional activities
- Shopping areas
- Dining/nightlife clusters
- Major train/subway stations
- Airport/intercity transport connections
- Convenience stores/pharmacies where useful
- Hotel-to-hotel/intercity departure points
- Current selected hotel neighborhood

For each important itinerary anchor, show practical travel information when supported, such as:
- Walk time
- Public-transit time
- Number of transfers
- Relevant station
- Last-mile walking
- Whether casual return-to-hotel breaks are practical

Exact map provider, route provider, radius, travel modes, latency, and coverage remain later technical choices.

## Traveler-specific pros and cons

Pros/cons should be generated from the traveler's actual plan rather than generic marketing language.

Good examples:
- **Pro:** Walkable to the shopping district you already selected.
- **Pro:** In-room washer/dryer; useful midway through a two-week trip.
- **Pro:** Public bath / hot spring on property.
- **Pro:** Direct access to a major subway line used by several planned days.
- **Con:** Most casual evening areas require a train ride back and forth.
- **Con:** Excellent for sightseeing but weaker for nightlife/late dining.
- **Con:** Room is smaller than similarly priced alternatives.
- **Con:** Great location, but substantially above the preferred range.
- **Con:** Two transfers to a must-do experience that appears on the itinerary more than once.

Avoid vague statements such as "great location" without explaining **great for what**.

## Comparison structure

A proposed phone-first hotel comparison can include:

1. **Best overall match**
2. **Best value**
3. **Best location**
4. **Best amenities**
5. **Upgrade / alternate**

These labels are proposed, not mandatory. The confirmed requirement is at least 4–5 meaningful options and understandable tradeoffs.

Each result should let the traveler react:
- Keep
- Reject
- Compare
- Cheaper
- Better location
- More comfortable
- Need a specific amenity
- Show something different

Those reactions should refine the next hotel suggestions under D-030.

## Product-quality rule

The app should help answer:

> "What will staying here actually feel like for the trip I am planning?"

not merely:

> "What are the highest-rated hotels in this city?"

A hotel can be highly rated yet a poor fit because it creates unnecessary transit, does not support hotel breaks, lacks a required amenity, or consumes too much of the travel budget.

## Evidence and implementation boundaries

- Official/property/provider information should verify material room and amenity facts.
- Reviews/community reports can inform quietness, neighborhood feel, ease of transit, and recurring issues, but should not replace current official facts.
- Map/transit claims must be based on suitable current routing data when presented as current.
- Photos require appropriate access/rights.
- No booking, payment, map provider, hotel API, photo source, ranking algorithm, or affiliate relationship is selected.
- Paid/sponsored hotel placement must not masquerade as an organic "best match" if monetization is added later.

## Current Japan planning application

For the owner's Tokyo, Kyoto, and Osaka planning, later hotel shortlists should expand from the current research shortlist to **4–5 real options per city**, using:
- the approved city schedule,
- one-large-bed preference,
- upscale/comfortable/convenient/value-conscious style,
- personal hostel exclusion,
- accepted personal hotel search reference,
- itinerary anchors,
- amenity preferences when supplied,
- actual transit and neighborhood tradeoffs.

No current researched hotel is selected merely by being listed.

## Later questions

Q-204: How compactly should photos, evidence, map context, and pros/cons appear on phone?  
Q-209: Hotel filter, comparison, map, amenities, and change-preview behavior.  
Q-211/Q-308: Price-range semantics, taxes, fees, and full-stay accounting.  
Q-304/Q-352: Test whether 4–5 options improve decisions without causing overload.  
Q-401/Q-402/Q-403: Hotel/photo/map/transit provider choices, terms, freshness, and cost.  
Q-406: API capability inventory for hotel discovery/comparison.

**Affected:** README and open-question tracker should treat 4–5 hotel options, configurable range, photos, amenities, map/transit context, and itinerary-specific pros/cons as confirmed capability requirements.
