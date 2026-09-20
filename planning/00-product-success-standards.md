# Section 1 Supporting Note — Product Success Standards

**Status:** Priority order and first-version same-day capability CONFIRMED; detailed behavior, metrics, and acceptance thresholds PROPOSED / OPEN.  
**Owner:** Project owner (`fgzmac`).  
**Recorded:** 2026-09-19.  
**Decision:** D-018.  
**Related section:** [Product Vision and Problem Brief](00-product-brief.md), especially 1.7, 1.9, 1.12, and 1.16.  
**Related questions:** Q-005, Q-006, Q-207, Q-304, Q-309, Q-356.  
**Source:** The owner's ordered answer to the question about the three most important things the first version must do well.  
**Next discussion:** What makes an individual suggestion worth adding, and what makes the owner reject it?  
**Evidence status:** No product test, recommendation evaluation, live event search, or owner acceptance has been completed by writing this note.

## Confirmed order of importance

| Rank | Owner's standard | Meaning at product level |
| --- | --- | --- |
| 1 | High-quality suggestions. | Suggestions must be things the intended traveler would genuinely consider adding to the itinerary. A functioning generator or attractive list is not enough. |
| 2 | Real-time ability to make a plan on the fly. | A traveler should be able to decide what to do that day using high-quality nearby events and experiences, including festivals and pop-ups. |
| 3 | Functionality and ease of use. | The app should feel easy, seamless, and useful, not like a chore. Completing a real task matters more than the presence of many controls. |

This order guides product tradeoffs and the owner's evaluation before greater discretionary investment under D-017. It is not permission to neglect basic correctness, privacy, reliability, or accessibility. Defining standards is not a finding that the app meets them.

Personalized sharing remains in the base concept (D-005). Elaborate reveal effects cannot compensate for poor suggestions or broken everyday use. The owner has not requested removal of the sharing experience.

## Scope reconciliation

Same-day nearby discovery and on-the-fly planning are **core first-version capabilities**, not an optional later enhancement. This follows from the context of the question the owner answered: what the first version must do well.

Older proposals to postpone advanced same-day replanning must not be used to postpone this confirmed capability. Distinguish:

- **Required at capability level:** Find worthwhile options for today near a relevant location, including time-specific events and experiences, and help the traveler form a usable plan.
- **Still to decide:** Minimum supported locations and categories, how to add or replace items, how much of a day can be rearranged, refresh behavior, exact response-time and freshness targets, and how constraints are checked.
- **Not selected by this answer:** Continuous location tracking, automatic notifications, background monitoring, automatic whole-trip rewriting, live seat/room guarantees, reservation transactions, paid providers, or an AI architecture.

Basic permanent-place suggestions may complement events, but a generic list of nearby landmarks is not sufficient evidence that event discovery works. Likewise, an event occurring today is not necessarily occurring now, reachable in time, open for entry, or bookable.

## 1. Recommendation quality — proposed evaluation framework

The owner has chosen quality as the highest priority. These dimensions are a proposal for making that preference testable; their weights and thresholds are not approved.

| Dimension | Question to test |
| --- | --- |
| Personal appeal | Would this traveler seriously consider doing it, rather than merely recognize that it is popular? |
| Practical fit | Does it fit the relevant dates, time available, travel effort, cost context, group, and known commitments? |
| Trustworthy information | Is there evidence for the description, location, timing, and reservation requirement? What remains uncertain? |
| Decision usefulness | Is there enough concise information to accept or reject the option without reconstructing the recommendation from scratch? |
| Useful variety | Are the choices meaningfully different and relevant rather than duplicates or filler? |

Do not silently equate quality with popularity, high ratings, novelty, luxury, local authenticity, or hidden gems. A famous attraction can be a strong personal fit; an unusual event can be a poor fit. The owner's specific quality criteria still need examples under Q-006.

**Candidate measurements for Section 4:** Number of seriously considered options within a defined shortlist; voluntary saves/additions; reasons for rejection; discovered factual or feasibility errors; and whether the selected experience remained worthwhile after use. A save is evidence of interest, not proof of attendance or satisfaction. Do not optimize for clicks or completed bookings as the sole measure of quality.

Evaluate against the same user context and declared constraints. Do not claim a recommendation success rate without defining the sample, denominator, and evaluation procedure. No arbitrary percentage threshold is approved here.

## 2. Same-day discovery — proposed user outcome and behavior

**User outcome:** “Help me find something I would actually enjoy near me today, and help me fit it into the time I have.”

A proposed flow to flesh out in Section 3:

```text
Open same-day discovery
    → Supply or reuse a relevant area, available time, and preferences
    → Review a short set of relevant current options
    → See practical constraints and uncertainty
    → Preview adding an option or forming a small plan
    → Confirm the change
```

Location permission with a manual-area alternative remains a proposed design, not a grant of location access. Do not require a fully built multi-day itinerary merely to investigate a same-day option; the exact entry requirements remain to be decided.

**Candidate information for each result:** What the experience is; why it fits; where it occurs; the event's relevant date and start/end or admission window; travel effort; estimated visit length and cost with their basis; reservation or ticket needs; a source; and freshness/verification context when available.

**Information distinctions to preserve in later specifications:**

| Statement | What it does not establish |
| --- | --- |
| The listing was fetched recently. | That the organizer recently updated it or that it is accurate. |
| The event takes place today. | That it is still running, reachable before entry closes, or fits the remaining day. |
| Tickets or reservations are required. | That tickets or tables are available, or that the traveler has booked. |
| A place is nearby geographically. | That the selected travel mode can reach it in an acceptable time. |
| An event was published by multiple sites. | That these are multiple distinct events or independent confirmations. |

**Proposed safeguards:** Exclude clearly expired or known canceled options from actionable suggestions; identify dates in the relevant local time; distinguish actual event occurrences from permanent venues; avoid duplicate listings; disclose conflicting or unverified details; preserve confirmed commitments when previewing changes; and explain when an option needs further reservation verification. Exact rules and sources remain open.

When suitable events cannot be found, say so rather than inventing results. Offering a wider area, another time, or clearly labeled non-event experiences is a proposed fallback. Lack of discovered data is not proof that nothing exists in the area.

**Candidate evaluation:** Use real, independently checked examples from a bounded destination and date/time window. Measure relevant valid options, expired/incorrect/duplicate results, time/entry feasibility, and known suitable events the system missed. Report source coverage and uncertainty separately from how attractive the options seem. Prototype data can test the interface, but cannot pass the live-data portion of this evaluation.

“Real time” describes the required usefulness for a current decision; no polling interval, continuous feed, freshness guarantee, or response-time threshold has been selected. Both data freshness and response speed need later definitions. The app must not label static demonstration data as current verified events.

## 3. Functionality and ease — proposed evaluation framework

The confirmed standard is that the app feels seamless and useful rather than burdensome. Proposed design principles are to reuse already-supplied preferences, ask for more information only when it affects the task, make the next action obvious, preserve saved work, support undo/recovery where relevant, and provide practical access without replaying a reveal.

These are proposed behaviors, not a finalized screen inventory or an assertion that the smallest number of taps always produces the best result. Necessary permission or booking checks should not be hidden merely to appear seamless.

**Candidate evaluation tasks:** Start planning, judge a suggestion, keep or replace an option, find something for today, preview a plan change, reopen saved work, and open the companion-facing itinerary. Existing hotel/transport and reservation-related requirements must also remain understandable.

Observe completion, hesitation, repeated input, requests for help, errors, recovery, and the user's judgment of effort. Response-time and task-duration targets should be based on chosen journeys and then explicitly agreed. No number of taps, seconds, or screens is approved here.

## Free-first spending and evidence

D-017 remains unchanged: prefer suitable free approaches and review any necessary spending specifically. These standards do not select providers or authorize purchases.

However, do not defer finding out whether adequate event data exists until after polishing the entire interface. The early feasibility question is whether we can obtain enough genuinely useful, timely local options for the supported pilot area under acceptable access, use, and cost conditions. Festivals and pop-ups are requirements to investigate, not claims of coverage by a particular service.

Prepared-data prototypes and live-data checks answer different questions. A free demo is not a completed test of current recommendations. If reliable coverage requires paid access or the free approach falls short, report the evidence and proposed tradeoff; do not silently weaken the standard, fabricate information, or treat the flexible budget as permission to spend.

## Outstanding decisions and next step

**Answered:** The three standards and their priority order; same-day nearby discovery/on-the-fly planning belongs in the first version.

**Open:** What distinguishes an appealing versus rejectable recommendation; minimum useful event coverage; current-location versus chosen-area behavior; scheduling constraints; real-time freshness/response targets; quantitative acceptance thresholds; and how the companion participates in validation.

The next Section 1 prompt is: **Give one example of an experience you would immediately add to a trip and one you would reject, and explain what makes the difference.** Names, bookings, and other private details are unnecessary in the public record.

No app code, external event search, paid service, or live test was created by this documentation update. Section 1 remains DRAFT, and later blueprint sections remain NOT STARTED.
