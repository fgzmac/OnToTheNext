# D-035 — Community, tourist, and local recommendation sourcing

**Status:** CONFIRMED product sourcing principle; exact providers, weights, rights, APIs, and ranking logic remain OPEN.  
**Recorded:** 2026-09-20.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner asked whether the app can incorporate Reddit/forum suggestions from people who traveled to Japan and local recommendations instead of relying on the same tourist websites.  
**Related:** D-018 recommendation quality; D-021 discovery sources; D-022 local/cultural inclusion; D-030 recommendation-led refinement; D-034 must-do anchors.  
**Blueprint:** Section 1 remains DRAFT. This decision guides later source/dependency work and current manual itinerary research; it does not authorize scraping, copying, or provider selection.

## Confirmed principle

Use a **multi-source recommendation model** rather than relying primarily on generic tourism websites.

The app should be able to discover ideas from:
- Travelers reporting firsthand experiences
- Reddit discussions
- Relevant forum/community boards
- Local guides and locally based creators where their local connection is reasonably supported
- Local publications, neighborhood guides, venue/community calendars, and city-specific sources
- Official tourism and operator sources
- Reviews and other supporting evidence

The goal is not to maximize source count. It is to find recommendations with useful context: what someone did, why they liked it, what they would skip, who it suits, crowd/effort considerations, and practical caveats.

## Distinguish source roles

Different sources should answer different questions.

| Source role | Useful for |
| --- | --- |
| Tourist/community firsthand reports | Appeal, surprises, regrets, pacing, crowd experience, practical tips |
| Local recommendations | Neighborhood character, food, customs, recurring local experiences, locally relevant context |
| Reviews | Pattern checking across many experiences, recent quality/caveats |
| Official organizer/venue/operator | Current dates, hours, prices, rules, ticket releases, closures, access |
| Transit/official route source | Current route/timing/fare rules when material |
| App's own preference model | Fit to the traveler based on accepted/rejected recommendations |

A Reddit post can justify **considering** an idea; it should not by itself establish that the activity is currently open, still exists, or has tickets.

## Proposed recommendation evidence object

For later UI/design, each recommendation may carry a compact evidence summary such as:

- Why this is being suggested
- Source type(s): traveler / local / official / review / event calendar
- How recent the supporting information is
- Common praise
- Common cautions
- Current logistics verification status
- Whether the app found conflicting information

Exact labels, source counts, confidence scores, and display rules remain open.

## Avoid source monoculture

Do not repeatedly surface the same famous attractions merely because the same tourism sites rank them highly.

Proposed candidate-generation approach:
1. Generate a broad candidate set from multiple source categories.
2. Deduplicate the same place/event/operator.
3. Extract the reasons people recommend or reject it.
4. Check fit against the traveler's preferences, dates, geography, budget, pace, and current itinerary.
5. Verify material logistics using suitable primary/current sources.
6. Present a small set of genuinely different options.

A popular attraction can still rank highly if it fits. "Hidden gem" or "local" is not automatically better.

## Local recommendation safeguards

Do not label something "locals love it" merely because one anonymous poster says so.

Potential evidence can distinguish:
- Self-identified local/resident or guide recommendation
- Locally based publication or organization
- Repeated community mentions
- Tourist firsthand recommendation
- Provider marketing

The app should disclose the basis rather than manufacture authenticity or consensus.

## Reddit/forum safeguards

- Reddit/forum content is community evidence, not verified fact.
- Consider post/comment date and whether the described experience matches the current operator/location.
- Preserve material negative caveats instead of cherry-picking only praise.
- Avoid treating repeated copied recommendations as independent confirmation.
- Do not require users to have Reddit accounts or expose private account history.
- Access, storage, reproduction, attribution, and API/scraping rights must be evaluated before implementation.
- Do not copy large amounts of user content into the app without an appropriate basis.

## Fit with recommendation-led planning

This sourcing model supports D-030:

```text
Multiple sources discover possibilities
        ↓
App explains why a few options may fit
        ↓
Traveler reacts
        ↓
Next suggestions become more specific
        ↓
Primary/current sources verify logistics before action
```

The traveler should not need to open ten websites and forums to reconstruct the reasoning themselves.

## Current Japan planning application

For the Japan pilot, manual research may use Reddit/community/local recommendations now to enrich the core Tokyo, Kyoto, and Osaka plan.

The current must-do anchors remain D-034. Community suggestions should produce complementary ideas around those anchors, not replace them or prematurely reintroduce optional cities before the main-city itinerary is established.

Recent community research already illustrates useful signals:
- First-time travelers emphasize leaving room to wander rather than treating every famous sight as mandatory.
- Post-trip reports identify practical pacing issues such as extra station/building navigation time.
- Locally framed Kansai recommendations include Namba/Shinsaibashi/Nipponbashi lodging/food context and less-obvious food/retail ideas.
These are examples of community evidence; current logistics still need verification.

## Later design questions

Q-204: How show evidence and source context without phone clutter?  
Q-304: How measure whether community/local evidence improves recommendation quality?  
Q-356: How test valid results and known omissions?  
Q-402/Q-403: Which sources can be accessed lawfully/reliably and under what terms?  

No source weight, API, scraper, partnership, embedding model, or ranking algorithm is selected by this decision.
