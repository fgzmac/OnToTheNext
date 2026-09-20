# D-026 — Phone-first; Japan itinerary now; spontaneous discovery tested in San Jose

**Status:** CONFIRMED device focus and priority change. Detailed workflows, booking selections, and implementation remain open.  
**Recorded:** 2026-09-19.  
**Owner:** Project owner (`fgzmac`).  
**Source:** The owner's direct answer: focus on phone; pivot to building the Japan itinerary as soon as possible because reservations may be needed well ahead; test spontaneous discovery locally in San Jose.  
**Related:** D-012 testing target; D-015 reservations; D-017 free-first; D-018 quality/same-day/ease ranking; D-024 example day; D-025 testing sequence.  
**Current blueprint:** Section 1 remains DRAFT. This decision is an amendment to the earlier product brief and testing sequence, not approval of later sections.

## Decision

1. Focus the initial experience and testing on **phones**. Desktop parity is not an initial priority. No particular mobile operating system, native application, mobile website, framework, or app-store launch has been selected.
2. Make creating the actual **Japan itinerary and reservation plan the immediate priority**. Do not make it wait for a working beta, completed simulations, app-store distribution, or the November software milestone.
3. Use **San Jose, California to test spontaneous discovery**: worthwhile nearby options for the current day, practical fit, and easy phone use.

The initial phone-focused product can continue to be designed and later built through the blueprint. Preparing the real trip is a separate deliverable that can use researched information and manual planning before software is ready. This interpretation avoids turning a trip-planning deadline into implied permission to begin app implementation before design approval.

## What changes from D-025

The old ordering, local early testing then working beta then Japan simulations, must not block **real Japan itinerary preparation or reservation research**. Those tasks now start independently, with priority over further nonurgent blueprint questions.

Japan-focused software rehearsals may still follow a working beta when useful. They are testing activities, not the first opportunity to plan the actual trip. San Jose's specifically selected testing purpose is spontaneous discovery; other local test tasks remain possible proposals rather than mandatory expanded scope.

**Two workstreams, not a dependency chain:**

| Workstream | Immediate purpose | Dependency |
| --- | --- | --- |
| Actual Japan itinerary and reservation preparation | Choose worthwhile experiences and an itinerary structure soon enough to act on verified booking rules. | Does not require the app or beta. Research and planning may proceed now. |
| Phone-first spontaneous-discovery app | Design and later test useful nearby recommendations and the optional post-rest outing flow in San Jose. | Implementation still follows the approved design transition; no code or provider chosen here. |

November 10, 2026 remains the approved **first complete software-test target**, not a Japan booking deadline, public launch, or guarantee. No replacement milestone or appointment has been scheduled by this decision.

## Proposed immediate Japan planning approach

This is a working approach, not approval of particular destinations, venues, prices, or booking transactions.

**First, establish the trip structure.** Tokyo is already known. Resolve whether other cities are included and what is already fixed before assigning date-bound excursions or meals to the wrong area. Do not re-ask the known travel endpoints, local arrival/departure times, traveler count, or per-person budget basis. Those private values remain in the conversation.

**Then identify reservation-sensitive priorities.** Research experiences, restaurants, stays, and transport that fit the owner's preferences. Record relevant official sales/release rules, dates, prerequisites, and cancellation/change conditions. Classify urgency based on actual rules and available evidence, not a generic claim that everything must be booked months ahead. A missing calendar date may mean not yet released rather than sold out.

**Build around the important fixed items.** Use confirmed bookings and selected date-specific events as constraints; leave unconfirmed reservations visibly tentative. Preserve shopping, good food, hotel rest when wanted, and spontaneous options. The example of one or two main experiences is not a mandatory quota.

**Keep the itinerary useful without software.** Maintain a readable day-by-day plan plus a reservation action list using whatever non-paid working format is adequate. A dedicated app feature, scraper, or automated reminder is not a prerequisite for doing this planning work.

### Reservation action-list template

Keep real personal dates, financial figures, and booking references outside this public repository. The generic structure is:

| Field | Meaning |
| --- | --- |
| Experience / restaurant / stay / journey | The specific candidate and the correct operator or location. |
| Personal priority and reason | Why it merits time on this trip; not just booking difficulty or popularity. |
| Proposed visit window and flexibility | Preferred and acceptable alternatives, recorded privately for the actual trip. |
| Reservation requirement | Required, recommended, not required, or not established. |
| Booking release rule | Rolling window, monthly release, lottery, direct request, currently open, or unknown, supported by a source. |
| Next action time | Exact actionable date/time in destination and planner time zones when calculable from a verified rule. Not an invented deadline. |
| Availability evidence | What was checked and when; distinguish not released, unavailable, and unknown. |
| Booking status | Candidate, needs action, tentative, confirmed, or alternative needed; labels proposed, not a database schema. |
| Cost / payment / cancellation | Known versus estimated amount, included components, deposits, and material conditions. |
| Official booking route and last verification | Source supporting the relevant fact; do not imply all facts are verified by one link. |
| Backup | An alternative that the traveler would actually enjoy and can realistically use. |

Researching or planning a reservation does not authorize buying, reserving, modifying, or canceling it. No ticket availability or booking is asserted by this document.

## Proposed San Jose discovery evaluation

Use the phone to initiate a search from a selected area or a permission-based location, within an agreed radius and available time. Evaluate suggestions by the existing priority order: appeal first, current-day usefulness second, and seamless operation third.

Candidate checks: a worthwhile event after a break; a locally recommended or cultural option with evidence; reaching an event before admission ends; reservation uncertainty; a later commitment; no suitable result; declining every suggestion while leaving free time unchanged; and readable/tappable controls on a phone. Exact platform, radius, permissions, data sources, thresholds, and test sessions remain open.

San Jose success is not proof of Japan coverage. Real Japan itinerary research can inform later test cases, but manual research success does not establish that the app has implemented the same capability. Controlled simulations and live verified information must remain distinguishable.

## Preserved boundaries

Free-first spending (D-017), the product's ranked standards (D-018), all confirmed hotel/transport and experience capabilities, personalized sharing, local/cultural inclusion, and the original trip context remain in place. This is a priority pivot, not cancellation of the broader product vision.

Phone-first does not approve native versus web, iOS versus Android, push notifications, continuous location tracking, a provider, purchases, or a public release. No implementation transition or whole-section approval is implied.

Keep the actual itinerary, exact travel dates/times, personal budget figures, companion identities, and booking information out of this public repository. San Jose is the selected test area, not a home address or permission to collect location history.

## Question resolution and next step

**Q-013 broad device focus:** Answered: phones. Specific operating systems, browsers, offline behavior, and device capabilities remain later questions.

**Q-008 initial testing sequence:** Updated: prioritize actual Japan planning now; test spontaneous discovery in San Jose. A working beta is no longer a prerequisite for the real-trip planning deliverable.

**Next immediate question — Q-014:** Beyond Tokyo, which Japan destinations should the itinerary include, or should the planning process recommend a route? Tokyo is already confirmed; do not infer a Tokyo-only trip or add other cities as approved choices.

This standalone decision extends `planning/decisions.md`. Read it alongside the register; it supersedes conflicting next-step and sequencing language in the earlier brief and supporting snapshots. Other historical decisions remain unchanged.
