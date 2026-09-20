# D-033 — One large bed and configurable hotel amenities

**Status:** CONFIRMED personal room preference and product requirement. Specific amenity defaults, UI, hotel inventory, and bookings remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner prefers one large bed for the Japan trip and wants the app to let users select preferred hotel amenities, including examples such as washer/dryer.  
**Related:** D-029 hotel-base preference; D-030 recommendation-led planning and hotel value; D-031 accepted hotel search reference; D-032 approved core-city schedule.  
**Blueprint status:** Section 1 remains DRAFT. This decision does not authorize bookings or implementation.

## Confirmed personal preference

For the initial Japan trip, prefer **one large bed** for the shared room. Do not substitute two separate beds unless the owner explicitly revises the preference or a specific comparison is presented for review.

This preference is trip-specific and must not become a universal default for every traveler. Exact bed labels differ by property and market; later hotel comparisons should show the room's actual offered bed configuration instead of relying only on a generic category name.

## Confirmed product requirement: selectable amenities

The app should let travelers select hotel amenities and room features that matter to them. The owner's example of a **washer/dryer or laundry capability** is an example of the kind of preference the app should support.

Potential amenity categories to design later include:

- Bed configuration
- In-room washer/dryer
- Self-service laundry / laundromat
- Breakfast
- Fitness center
- Pool or spa
- Onsen / public bath
- Kitchenette
- Refrigerator
- Workspace
- Bathtub versus shower
- Non-smoking room
- Quiet-room preference
- Luggage storage
- 24-hour front desk
- Parking
- Accessibility features
- Family/child-related needs

These are candidate fields, not an approved mandatory checklist or evidence that every provider exposes them reliably.

## Proposed interaction principle

Use amenities as preference signals, not an exhaustive form that blocks progress.

A proposed flow is:

```text
Suggest a few hotel options
    → Show why each fits location, comfort, price, and known preferences
    → Let the traveler refine with amenities such as "must have laundry"
    → Re-rank results while preserving accepted choices
```

Support priority levels such as **must have**, **nice to have**, and **don't care** rather than treating every selected amenity equally. These labels and controls are proposed, not yet approved.

A hotel that lacks a must-have should not be presented as an equally strong match without explaining the conflict. A nice-to-have should influence ranking without automatically eliminating otherwise strong options.

## Evidence and terminology safeguards

- Distinguish **in-room washer/dryer** from a **shared self-service laundry facility** and from **paid laundry service**.
- Do not infer an amenity from generic hotel marketing text when the actual room/property details do not support it.
- Distinguish property-wide amenities from room-specific features.
- If an amenity matters to the final choice, verify it against the actual offered room/property information before presenting it as confirmed.
- A filter result is not a booking or guarantee that the amenity will remain available for the selected room/date.

## Effect on the Japan hotel search

Keep the accepted hotel search reference and style: upscale, comfortable, convenient, value-conscious, no hostels for this traveler, separate hotel stays in the main cities.

Add **one large bed** as a personal room preference. Laundry capability is not yet recorded as a must-have for this owner; it was supplied as a product example unless later confirmed personally.

When real hotel shortlists are researched, compare the actual room offer, bed setup, location, total stay price, taxes/fees, cancellation terms, and material amenities.

## Next planning implication

Do not ask the owner to manually invent a complete amenity list. The app should propose common hotel preferences and let users refine them.

For this trip, the next useful step is to present concrete hotel shortlist recommendations by city using the approved city schedule and hotel preferences, while asking only about amenities that materially change the ranking.

**Affected:** README/open-question tracker should treat one-large-bed and selectable amenities as answered direction. Exact amenity controls and personal laundry preference remain later-detail questions.
