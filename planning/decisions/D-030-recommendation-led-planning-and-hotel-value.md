# D-030 — Recommendation-led planning and value-conscious hotel choices

**Status:** CONFIRMED design principle; hotel preferences RECORDED; numerical budget and detailed behavior PROPOSED / OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner wants the app to continually supply ideas and recommendations that help refine what the traveler wants, rather than requiring the traveler to invent the plan. The owner requests hotel budget points and prefers upscale, comfortable, conveniently located accommodation, with no hostels for this trip and without excessive expense. Other travelers may want hostels.  
**Related:** D-018 quality/same-day/ease ranking; D-023 starting friction and balanced days; D-024 optional discovery; D-026 phone focus and immediate Japan planning; D-028 main cities first; D-029 per-city stays and traveler-specific lodging strategy.  
**Blueprint status:** Section 1 remains DRAFT. This amends the earlier brief and next-step prompts; it does not authorize implementation or bookings.

## 1. Confirmed core principle: offer ideas, then refine

> The app should do the work of proposing useful possibilities. Travelers should be able to react to concrete recommendations and progressively shape the plan, rather than having to think of every destination, activity, hotel, or sequence themselves.

Treat this as a cross-product design requirement, not merely a hotel feature. A blank search box or a long survey alone does not deliver it. Use the traveler's existing choices, interests, dates, accommodation context, budget meaning, and known commitments as they become available.

**Proposed interaction loop:**

```text
Use known trip information
    → Offer a small, relevant set of concrete options with reasons and tradeoffs
    → Traveler keeps, rejects, compares, or refines an option
    → Update the suggestions while preserving accepted decisions
    → Present the next useful choice or a reviewable plan
```

The loop is proposed behavior, not an approved screen count, fixed number of suggestions, ranking formula, or AI/provider choice. Examples of optional refinements include closer, less expensive, more comfortable, less demanding, or more cultural. A rejection should not automatically mean dislike of an entire category. The precise preference-learning and persistence rules require design.

**Keep agency and momentum:** Recommend a sensible starting choice and explain alternatives, but allow custom entries, corrections, undo, and stopping. Reuse answers; do not repeatedly ask users to generate open-ended ideas. Ask for missing information when it materially changes the next decision. Avoid an endless recommendation loop that prevents completing the plan.

**Not interruption or automatic action:** Continually helpful within the task does not mean push notifications, background monitoring, continuous GPS, unsolicited messages, automatically filling downtime, or changing reservations without approval. The D-024 spontaneous-discovery example remains traveler-initiated. A recommendation is not a booking or permission to pay.

**Existing scope still applies:** Build the main-city itinerary first under D-028, then offer optional destinations. Do not use proactive suggestions to revive detours before that stage, force extra spending, or erase free time. Other confirmed capabilities and D-017's free-first app-spending policy remain unchanged.

## 2. Hotel preference for the initial trip

| Dimension | Owner's direction | Boundary |
| --- | --- | --- |
| Experience | Upscale and comfortable. | Not a selected star rating, brand, room size, amenity list, or luxury tier. |
| Location | Convenient. | Evaluate against the actual trip, relevant transport, activities, food/shopping, and returning for breaks; no neighborhood or walking threshold selected. |
| Price | Not overly expensive; show budget points. | Value-conscious preference, not a numeric cap, approved nightly range, or authority to spend. |
| Exclusion | No hostels for this traveler. | Do not substitute a private hostel room as a cheaper workaround without a changed preference. This is not a global exclusion for other travelers. |
| Hotel bases | Separate hotel stay in each main city. | D-029 unchanged. No property, room, order, nights, or booking chosen here. |

Comfort should be judged at the offered-room level, not solely by a luxury label or attractive lobby. Candidate checks include room layout/size, bed and bathroom arrangements, quietness information, useful location, total price, inclusions, and cancellation terms. These checks are proposed; do not silently promote them to new hard personal requirements.

For other users, keep accommodation type and preferences configurable. The owner recognizes that hostels may suit others; this does not require a particular hostel integration, new marketplace, or complete accommodation taxonomy now.

## 3. Proposed hotel budget presentation

Show several meaningful price points and what the additional spending could buy. Do not ask only, 'What is your budget?' without context. Suggested comparison labels are **better value**, **best match**, and **upgrade worth comparing**; labels and number of choices remain proposals.

Example planning points for a two-adult shared-room comparison are **USD 150, 200, 250, 300, and 400 per room per night**. These are assistant-proposed budget scenarios, not live quotes, destination averages, assured quality bands, or user-approved limits. Do not permanently hardcode them across currencies, dates, or destinations.

**Proposed initial search reference:** USD 200–260 per room per night for two adults, while including less expensive options that meet the same preferences. This remains unapproved. Do not turn the lower bound into a minimum-spend target or raise the range without explaining the tradeoff. One shared room and equal sharing in examples are comparison assumptions, not confirmed room/expense-splitting rules.

For each real comparison, clearly show:

- Currency and charge basis: room, person, or bed; number of guests/rooms; nightly versus whole-stay amount.
- Actual offered room, dates, inclusions, cancellation conditions, and relevant evidence for comfort/location.
- Known taxes and mandatory charges, including whether collected separately. Unknown totals must remain labeled rather than advertised as all-inclusive.
- Whole-stay cost and the effect on remaining trip funds when the trip currency/categories and allocation are known. Do not confuse this travel cost with the app-service budget.

Formula for an illustrative room-only comparison: nightly room amount × nights × rooms. A displayed per-person share requires an explicit sharing assumption. Avoid double-counting breakfast, taxes, deposits, or components already included in the rate.

The private trip-budget bounds and exact travel schedule remain in the conversation. Q-011's currency/category/total-versus-remaining questions are not answered by using USD for this comparison.

## 4. Evidence checked for this discussion

These references provide context, not a property shortlist or date-specific availability.

- **JNTO, Japan Budget Travel Guide:** https://www.japan.travel/en/guide/japan-on-a-budget/ — accessed 2026-09-20. Its broad guide distinguishes double-room hotel rates from per-person lodging rates and lists a four-star double room from approximately JPY 30,000. This is general, undated-for-the-trip orientation, not a quote for the user's cities/dates. No exchange-rate conversion is implied by the USD scenarios above.
- **Kyoto City Official Travel Guide, accommodation-tax change:** https://kyoto.travel/en/news/tax-change/ — published 2026-02-26, accessed 2026-09-20. Accommodation-tax bands changed from 2026-03-01 and are per person per night. The applicable amount and whether already included must be checked for the actual rate; a headline nightly room price is not automatically the complete payable total.

No hotel, room, price for the actual stay, booking availability, or cancellation policy has been verified for selection. No paid service or transaction activated. Exact city dates remain necessary for live property comparisons; this does not block recording the principle or proposing a budget reference now.

## 5. Resolution and next step

**Answered:** Q-016's lodging-style/priorities portion: upscale, comfortable, convenient, value-conscious, no hostels for this traveler. D-029's per-city hotel preference stays confirmed. Record the cross-product recommendation-led principle rather than asking the owner to repeat it.

**Next useful decision:** Present the proposed hotel budget points, recommend the USD 200–260 shared-room nightly search reference, and ask whether that reference works. The number is a proposal, not a selected budget. Then propose the main-city route/nights under Q-014 instead of asking the user to invent them.

**Later design:** Q-201/Q-204/Q-209 cover guided choices and hotel comparisons; Q-211 covers cost basis; Q-304/Q-352 cover whether recommendations reduce effort, honor exclusions, preserve decisions, and allow correction; Q-402/Q-403 cover evidence and access. Specific controls, weights, metrics, sources, and implementation remain open.

**Affected:** This standalone record, README, and open-question tracker. Earlier detailed brief and register remain historical through their stated coverage and must be read with D-026 through D-030. Neither a new principle nor a price scenario approves a whole section or proves the product works.
