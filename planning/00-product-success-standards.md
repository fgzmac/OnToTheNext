# Section 1 Supporting Note — Product Success Standards

**Status:** Priority order, first-version same-day capability, both experience formats, and local/cultural inclusion CONFIRMED; owner preferences, sources, planning problems, flexible time commitment, and example day flow RECORDED; detailed behaviors, metrics, and acceptance thresholds OPEN.  
**Owner:** Project owner (`fgzmac`).  
**Recorded:** 2026-09-19.  
**Decisions:** D-018 standards; D-019 personal taste; D-020 formats; D-021 sources; D-022 local/cultural inclusion; D-023 planning friction and desired day balance; D-024 flexible effort and example planned/rest/spontaneous flow.  
**Related section:** [Product Vision and Problem Brief](00-product-brief.md), especially 1.4, 1.6, 1.7, 1.9, 1.12, and 1.16.  
**Related questions:** Q-004, Q-005, Q-006, Q-008, resolved Q-012, Q-201, Q-207, Q-212, Q-213, Q-304, Q-305, Q-309, Q-356, Q-402, Q-403.  
**Source:** The owner's ranked standards, preferences, format and coverage choices, discovery sources, planning difficulties, and proposed day-flow example.  
**Next discussion:** Companion participation in testing under Q-008. Weekly effort is flexible/as necessary under D-024; do not require a numerical estimate to proceed.  
**Evidence status:** Self-reports and product choices, not observed task performance. No product test, live event search, measured outcome, or acceptance of a working product has been completed by writing this note.

## Confirmed order of importance

| Rank | Owner's standard | Meaning at product level |
| --- | --- | --- |
| 1 | High-quality suggestions. | Things the traveler would genuinely consider adding. A functioning generator or attractive list is not enough. |
| 2 | Real-time, on-the-fly planning. | Decide what to do today using worthwhile nearby events and experiences, including festivals and pop-ups. |
| 3 | Functionality and ease. | Easy, seamless, and useful, not a chore. Completing a task matters more than having many controls. |

This order guides tradeoffs and evaluation before greater discretionary investment under D-017. It does not waive correctness, privacy, reliability, or accessibility. Defining standards is not evidence that a product meets them.

Personalized sharing remains in D-005. Elaborate reveal effects cannot compensate for poor suggestions or difficult everyday use.

## Current planning problems and desired balance — D-023

The owner has described the actual planning difficulties, not only hypothetical quality criteria.

| Reported problem | Desired outcome from the owner's account | Proposed design response, not yet an approved mechanism |
| --- | --- | --- |
| Deciding where to go first and what to experience. | Help narrow worthwhile choices and choose a sensible sequence. | Explain why suggested stops belong together and why a proposed order works; do not assume nearest-first is always best. |
| Organizing activities in a way that makes sense. | A coherent trip rather than disconnected recommendations. | Consider relevant travel, opening/entry times, fixed bookings, duration, and daily start/end locations. |
| Balancing energy-demanding activities with free time for shopping and good food. | Enjoyable days with room for both substantial experiences and unhurried personal time. | Assess overall day effort and preserve flexible windows; do not fill every gap or treat meals/shopping as expendable filler. |
| Finding events occurring during the trip. | Discover date-specific opportunities when they can actually be used. | Consider event dates before assigning all flexible activities; retain actual occurrence and reservation uncertainty. |
| Difficulty starting because of travel, hotel proximity, and recommendation-quality variables. | A manageable starting point without solving all dependencies manually first. | Ask only for the next useful inputs, reuse known trip details, and support a provisional plan when some arrangements remain undecided. |

**Proposed problem statement:** Help a traveler move from many interdependent choices to a worthwhile, logically ordered trip that fits their dates and travel arrangements while balancing demanding experiences with free time for shopping, food, and spontaneous choices.

This is not a request for an itinerary maximizing stop count, minimizing distance at any cost, or packing every day with high-effort adventures. The existing priority ranking in D-018 is unchanged.

### Example day: planned highlights, downtime, then optional discovery — D-024

The owner proposed this flow:

```text
One or two main experiences for the day
    → Finish the planned experiences
    → Free time
    → Rest and hang out at the hotel
    → When interested, the traveler opens the app
    → Find worthwhile experiences or events within a radius
    → Choose and spontaneously do something nearby
```

**Recorded as an example, not a mandatory daily template.** One or two main experiences is not a product-wide maximum. A hotel break is part of this scenario, not required every day. This does not require two main experiences when one fills the available day, or an additional outing when the traveler prefers to remain at the hotel.

**Planning implication:** Planned highlights and optional later discoveries should coexist. Free time remains available until the traveler chooses to use it; completion of an activity must not be interpreted as a request to automatically fill the rest of the day. The example is user-initiated: reopen the app when ready, not unsolicited alerts, automatic fatigue detection, or background location monitoring.

**Proposed interaction detail for later design:** Reuse existing trip preferences and relevant bookings; establish the current/selected search area and time still available; offer radius-based nearby options; explain travel, timing, cost, booking needs, and uncertainty; preview the chosen addition without silently changing the remaining plan. Current-location access requires permission if selected; a manually chosen area or known hotel is a possible alternative, not an approved default or evidence that the traveler is currently there.

**Radius and time are different checks.** No distance, unit, default radius, automatic expansion, travel mode, or maximum travel time has been selected. Being within a radius does not by itself establish a feasible route, acceptable journey, open admission, or available booking. A listed event occurring today is not necessarily usable at the moment the app is reopened. Include arrival and any needed onward travel when later specifying feasibility.

**Optional means optional.** Staying at the hotel is a valid outcome. Proposed fallback behavior is to show no suitable matches honestly and offer changes to search area/time only by user choice, not pad the results or silently broaden the request. A ready-made excursion keeps its real departure and duration; do not invent a shortened variant to fit a spontaneous gap.

**Candidate tests, not approved thresholds:** Resume after a break without repeating all setup; use a chosen radius; handle a denied location permission; exclude an option that would finish too late; preserve a later reservation; decline all suggestions and leave free time unchanged; find no suitable dated events without fabricating one. Completed, unfinished, skipped, optional, and reserved items may need distinct handling, but no state model or controls are selected here.

This example makes D-018's same-day requirement concrete while preserving D-023's day balance. Detailed defaults and tests remain Q-207/Q-213/Q-304/Q-305/Q-309. No actual event search, location access, reservation, notification, or code is authorized by recording the flow.

### Proposed planning principles for later specification

**Hotel location informs, but does not dictate, the plan.** Use known stay locations when relevant to daily travel. Do not invent a hotel, require a booking before any exploration, assume every day must start/end at the same hotel, or discard a worthwhile farther experience automatically. Travel-time limits, start/end preferences, and hotel-not-yet-chosen behavior remain open.

**Balance applies to the whole day and potentially consecutive days.** Include the effort of activities and transport, not duration alone. Walking, standing, transfers, early starts, and several demanding days are candidate considerations, not selected scoring inputs. Do not infer physical ability, health status, fatigue, or an exact personal energy score. The traveler should be able to express pace rather than accept an unverified estimate as fact.

**Free time is a desired part of the experience.** Optional shopping areas, food choices, or a flexible neighborhood window may be more useful than booking every minute. Shopping is not necessarily low-effort and dining is not necessarily quick or reservation-free. Preserve the distinction between optional ideas, tentative plan items, and fixed bookings.

**Make tradeoffs visible.** When a timed event, a longer excursion, travel, and free time conflict, propose alternatives for review instead of quietly dropping a priority, moving a booking, or erasing the flexible time. No automatic editing authority or mathematical optimization objective is approved.

**Starting should not be an exhaustive survey.** Present a useful first decision with the information available. Exact onboarding order, required fields, default assumptions, full-draft generation, and manual controls remain open. This does not replace the established activity-choice approach with fully automatic planning.

### Candidate evaluation additions

Observe whether the organizer can begin without assistance, judge the proposed order, preserve desired free time, understand total travel/effort, and identify relevant events during a defined date window. Compare a tightly packed proposal with a balanced alternative using the same preferences and constraints. Test a known hotel and an undecided hotel, while keeping assumptions visible.

These are proposed tests, not approved thresholds or claims of reduced effort. The self-report does not establish which tools the owner uses to save ideas, actual hours spent, or how the companion prefers to travel. Those remain research gaps; the main frustration question itself is answered.

## Scope reconciliation

Same-day nearby discovery and on-the-fly planning are **core first-version capabilities** under D-018, not optional later enhancements. Older advanced-replanning deferral proposals must not remove them.

**Required at capability level:** Find worthwhile nearby options for today, including time-specific events, and help form a usable plan.

**Still open:** Minimum areas/categories, adding versus replacing items, how much of a day changes, freshness/response targets, and precise constraint checks. D-024 supplies a requested scenario and radius-based discovery idea, not default distances or a finalized screen flow.

**Not selected:** Continuous location tracking, notifications, background monitoring, automatic whole-trip rewriting, live inventory guarantees, reservation transactions, paid providers, or AI architecture.

Permanent places may complement events, but a generic nearby list does not demonstrate event discovery. An event today is not necessarily still running, reachable, open for entry, or bookable.

D-020 confirms both provider excursions and app-assembled combinations. D-022 adds local recommendations and cultural experiences. Neither should silently become later-only. Shorter/all-day duration categories remain proposed. D-023/D-024 refine planning usefulness, not permission to choose an algorithm or begin implementation.

## 1. Recommendation quality — proposed evaluation framework

Quality is the highest priority. Proposed dimensions, without approved weights or thresholds:

| Dimension | Question to test |
| --- | --- |
| Personal appeal | Would this traveler seriously consider doing it, rather than merely recognize its popularity? |
| Practical fit | Does it fit dates, available time, travel effort, cost, group, hotel context, desired pace, and known commitments? |
| Trustworthy information | What supports the description, location, timing, and reservation requirement? What is uncertain? |
| Decision usefulness | Can the traveler judge it without reconstructing the research from scratch? |
| Useful variety | Are alternatives meaningfully different, relevant, and not filler or duplicates? |

Do not equate quality solely with popularity, ratings, novelty, luxury, authenticity, or obscurity. A famous option can fit well; an unusual one can fit poorly. D-019/D-021 provide initial preference evidence, not universal ranking weights.

### Initial organizer preference examples — D-019

| Response | Owner's example | Careful interpretation |
| --- | --- | --- |
| Would consider | Breathtaking beach view, snorkeling, and oceanside dinner in one excursion. | Scenery, participation, and a connected sequence appeal. |
| Would consider | Scenic ATV exploration with something distinctive to the area. | Active exploration, setting, and local distinctiveness appeal. |
| Would reject | The world's largest rubber band. | Standalone novelty-object attraction is a negative example for this organizer. |
| Would reject | A historical statue. | Standalone, mainly observational stop is a negative example for this organizer. |

Favor meaningful participation, scenery, and complementary experiences for this organizer without requiring every result to have all those elements. These are choices the owner would consider, not bookings or guaranteed attendance.

**Personalization boundaries:** No global ban on history, museums, monuments, sightseeing, or popular places. Do not copy these tastes to the companion or infer willingness to pay, physical ability, skill, risk tolerance, or constant all-day availability. D-023/D-024 explicitly add balance and free time, not a measured exertion limit. These examples do not request snorkeling or ATV trips in Tokyo or verify their availability there.

A strong single activity remains eligible. A historical setting can host an engaging experience. Do not pack every gap into an adventure sequence. Exact mix and weights remain open.

**Explanation proposal:** Describe what the traveler will do and see, why it fits, and what is locally distinctive when supported. Avoid generic excitement or unsupported claims that something exists nowhere else. Local distinctiveness does not require obscurity or exclusivity.

### Discovery sources and evidence preferences — D-021

The owner reports real experiences, positive Reddit posts, highly rated reviews, date-relevant event calendars, and destination-related must-see/must-experience highlights. Preserve these categories; D-022 adds local recommendations.

| Input | Proposed contribution | Boundary |
| --- | --- | --- |
| Real experiences / firsthand accounts | What people did and why it was worthwhile. | An account is not verified attendance; own versus others' accounts is unspecified. No invented past trip. |
| Positive Reddit posts | Community ideas, reasons, and practical details. | Check context, dates, and activity/operator identity. Praise/upvotes do not prove current availability. |
| Highly rated reviews | Supporting experience evidence. | Consider content, recency, volume, and useful criticisms. No service, star threshold, count, or weight selected. |
| Date-relevant calendars | Actual occurrences in the requested window. | Distinguish publication date, event year/edition, local admission, cancellation, and ticket availability. |
| Destination highlights | Meaningful well-known experiences as well as lesser-known options. | Popularity informs candidates; it is not compulsory inclusion or a reversal of personal dislikes. |

**Proposed sourcing:** Discover candidates, assess appeal, verify material logistics using suitable current organizer/venue/operator/booking information, check practical fit, then explain evidence and uncertainty. This is not an exclusive source hierarchy or algorithm.

Keep evidence roles separate: community praise may support appeal, while current organizer information may support dates. Neither guarantees the other or a reservation. An option need not have every source type.

Retain critical caveats; do not count copied mentions as independent support; distinguish editions/operators; disclose conflicting evidence. Do not manufacture testimonials, ratings, counts, or “Reddit recommended” labels. Source access, weighting, display, freshness, and credibility rules remain open.

Naming a source does not approve scraping, paid access, account/history imports, reproduction of posts/photos, or training on community content. Evaluate rights, attribution, retention, coverage, and cost later. No actual post, calendar, review, or event was fetched in this planning update.

### Local recommendations and cultural experiences — D-022

**Confirmed inclusion:** Both belong in discovery and trip planning. A recommendation's origin and an experience's subject are different dimensions.

| Addition | Proposed meaning | Illustrative possibilities, not verified offerings |
| --- | --- | --- |
| Local recommendations | Advice from residents, local guides, hosts, or locally based sources, with a reason. | Neighborhood food recommendation, community event, guide's selection. |
| Cultural experiences | Engagement with food, crafts, arts, customs, history, or everyday life. | Cooking and shared meal, craft workshop, guided neighborhood walk, public performance/festival. |

Not a fixed taxonomy or guaranteed inventory. Local does not mean obscure; popular highlights can have local support. Culture can be participatory or observational. Favor meaningful context for this organizer without making culture adventure-only or assuming companion agreement.

**Proposed evidence standard:** Proximity, review language, high ratings, and generic listings do not prove local endorsement. Distinguish individual opinion, host promotion, guide selection, and wider support where evidence permits. Do not invent verified residency, testimonials, authenticity, exclusivity, or community-wide agreement.

Explain what the visitor does/observes, relevant context, who offers it when known, and material language, access, etiquette, participation limits, duration, cost, and reservation information. Do not imply private/restricted participation without permission or disguise a provider's commercial interest as independent endorsement.

A cultural experience can stand alone, be in a genuine excursion, or be part of an assembled plan. Check same-day date and admission feasibility; do not assume walk-ins or current availability.

No guide marketplace, direct-contact system, host accounts, community-review feature, partnership, paid source, transaction, filter, or ranking weight is selected. Exact access and local-source checks remain open. D-017/D-018 are unchanged.

### Both ready-made excursions and app-assembled plans — D-020

**Confirmed:** Offer both; Q-012 resolved.

| Format | Meaning | Boundary |
| --- | --- | --- |
| Provider excursion | Actual operator offering, possibly with several activities. | Verify advertised inclusions, conditions, duration, price basis, and booking route. Selection is not reservation. |
| App-assembled combination | Proposed sequence of separate experiences/stops. | Do not imply one operator, joint availability, single package price, or one booking. |

Check components, travel, total time, costs, reservations, and uncertainty separately for assembled plans. Adding dinner to cards does not establish inclusion or provider endorsement. Same-day combinations must fit the remaining time and actual booking constraints. Operators, source access, ranking mix, editing, and transactions remain unselected.

### Shorter and all-day options — proposed duration direction

The owner's “Maybe shorter activities and all day activities” is tentative, not fixed hours, categories, mandatory all-day schedules, or approval of an added half-day bucket.

Format and duration are independent. Either format may cover a short outing or a longer day; that is a design possibility, not verified inventory. Duration does not determine quality or exertion.

**Proposed behavior:** Reuse or ask the available window; distinguish activity length from travel, between-stop transfers, and reaching the next commitment/endpoint. Avoid double-counting operator-included transfers. Label unknown timing rather than claiming a precise fit. D-023/D-024 add desired balance, free time, and a later optional outing.

Full-day options need not fill every minute. Short options must not be filler. Do not truncate a fixed operator itinerary or invent shorter variants. Exact cutoffs, intermediate durations, controls, start/end locations, and buffers remain Q-212/Q-213/Q-305.

### Candidate quality measurements

Assess serious consideration within a defined shortlist, voluntary saves/additions, rejection reasons, factual/feasibility errors, and post-use value. Saves show interest, not attendance or satisfaction; clicks/bookings alone are not success.

Use D-019 as initial preference examples, not a benchmark labeling all adventurous items good and all landmarks bad. Test both individual appeal and the complete day's fit using D-023/D-024. A beautiful but infeasible or unwantedly crowded combination is not success.

Define context, sample, denominator, and evaluation method before reporting a success rate. No numerical pass target is approved.

## 2. Same-day discovery — proposed behavior

**Outcome:** Find something worthwhile nearby today and fit it into the time available.

```text
Open same-day discovery
    → Supply or reuse area, available time, and preferences
    → Review a short set of relevant current options
    → See practical constraints and uncertainty
    → Preview adding an option or forming a small plan
    → Confirm the change
```

D-024 supplies an example of entering this flow after main activities and hotel rest. Location permission and manual-area alternative are proposed, not permission to access location. A complete multi-day itinerary should not be assumed necessary to explore today. Exact entry requirements remain open. Existing flexible time must not automatically be interpreted as an instruction to fill it.

**Candidate result information:** What it is, why it fits, location, event occurrence/admission window, travel, visit length, cost basis, booking needs, source, and freshness. D-020 adds format distinction; Q-212 covers duration; D-021/D-022 evidence and culture are not guaranteed coverage.

| Known statement | Does not establish |
| --- | --- |
| Fetched recently. | Underlying organizer information recently updated or accurate. |
| Happens today. | Still running, reachable before entry closes, or fitting the remaining day. |
| Booking required. | Available inventory or an existing traveler booking. |
| Geographically near or within a radius. | Acceptable travel time by the selected mode. |
| Mentioned on multiple sites. | Distinct events or independent confirmation. |

**Proposed safeguards:** Exclude known expired/canceled options from actionable results; preserve local occurrence time; distinguish events from venues; avoid duplicates; disclose conflicting/unverified information; preserve existing commitments on previews; explain reservation uncertainty. Exact checks/sources remain open.

When suitable events cannot be found, say so. Wider area, another time, or labeled non-event alternatives are proposed fallbacks. Missing results do not prove no events exist. Never invent current events to fill a list.

**Candidate evaluation:** Independently checked real examples from a bounded date/time and location, including valid options, duplicates/errors, timing/entry fit, and known suitable events missed. Separate source coverage from appeal. Prepared data cannot pass the live-data check.

“Real time” means current-decision usefulness. No polling interval, continuous feed, freshness guarantee, latency threshold, inventory promise, or background monitoring selected.

## 3. Functionality and ease — proposed evaluation

Reuse provided preferences, ask only relevant next questions, make actions clear, preserve work, provide undo/recovery where appropriate, and allow practical access without replaying the reveal. These are proposals, not a screen inventory or a rule minimizing taps at the expense of essential checks.

D-023 confirms difficulty starting and coordinating variables, not just a general preference for simplicity. Candidate tasks include beginning with incomplete hotel information, narrowing choices, understanding suggested order, balancing an excursion with food/shopping/free time, judging a provider versus assembled plan, discovering today's events, resuming after a break (D-024), previewing changes, reopening saved work, and accessing the companion view.

Observe completion, hesitation, repeated input, help needed, errors, recovery, and reported effort. Include hotel/transport and reservation tasks. No number of taps, seconds, energy points, or mandatory breaks has been approved. Self-reported pain points are not measured time savings.

## Free-first spending and evidence

D-017 remains unchanged. Requirements and source preferences do not select suppliers or authorize purchases.

Investigate whether suitable timely event, local/cultural, and excursion information is accessible under acceptable rights, coverage, freshness, and cost before polishing around untested data. Prepare prototypes for interaction questions, but use real checks for live-data quality.

Report necessary spending or a free approach's limitations with evidence and a proposed tradeoff. Do not silently weaken a requirement, fabricate facts, or treat flexible references as permission to spend. A working demo does not prove readiness.

## Outstanding decisions and next step

**Answered:** Ranked standards, first-version same-day capability, initial organizer examples, both formats, reported sources, local/cultural inclusion, planning friction/day balance, and flexible/as-needed development effort. D-024 records an example flow from main experiences through free time/hotel rest to user-initiated radius-based discovery.

**Proposed:** Duration buckets, gradual onboarding, hotel-informed ordering, effort estimation, flexible windows, sequence explanations, exact source checks, the detailed day-flow controls, search-radius defaults, and evaluation methods. The example is not a universal one-or-two-event limit or mandatory hotel return.

**Open:** Companion testing participation, full pilot-promise approval, exact saving/organization tools and measured effort, scope/coverage, time/pace/radius controls, sources, freshness/response targets, numerical acceptance, and product validation. No quantified weekly capacity was supplied or should be invented; estimate and measure actual delivery effort later.

**Next — Q-008:** Will the companion test early versions and offer feedback before travel, or will the organizer handle the initial testing alone? This concerns evaluation participation, not editing permissions. Do not re-ask weekly hours, main frustrations, sources, examples, formats, or budget policy.

Section 1 remains DRAFT; later sections remain NOT STARTED. No code, booking, paid service, location access, integration, live event test, or automation was created by this documentation update.
