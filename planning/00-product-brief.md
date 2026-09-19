# Section 1 — Product Vision and Problem Brief

**Lifecycle status:** DRAFT — not approved as a completed section.  
**Owner:** Project owner (`fgzmac`); assistant facilitates drafting.  
**Phase:** Product design.  
**Last updated:** 2026-09-19.  
**Source:** The project owner's supplied travel-app concept and confirmed organizer-to-companion use case.  
**Related framework:** [Blueprint, Section 1](blueprint.md#1-product-vision-and-problem-brief).  
**Next review trigger:** The owner's next answer about the project objective and initial audience.  
**Approval record:** None yet.

> Saving this draft does not approve every proposal it contains. CONFIRMED decisions, PROPOSED directions, ASSUMPTIONS, and OPEN questions are different states.

## 1.1 Working product name

**Working label:** Travel Itinerary App.  
**Repository:** `fgzmac/OnToTheNext`.

The repository name is confirmed. It does not automatically establish the final app name or brand. Naming should not block the product planning.

**Status:** OPEN for the final product name; repository confirmed. See Q-001 and D-004.

## 1.2 One-sentence description

> An app that helps people discover experiences their travel group will enjoy, turn those choices into a realistic trip, and share a personalized itinerary that builds excitement and remains useful while traveling.

This wording combines the supplied Discover, Organize, and Delight direction without positioning the product primarily as an AI tool.

**Status:** PROPOSED wording based on the adopted base idea. Exact wording is not yet approved.

## 1.3 Primary use case

> Someone plans a trip they are taking and shares that plan with their travel companions.

The organizer participates in the trip. The primary use case is not arranging a completely secret trip for someone else.

The emotional experience is **“Look what I planned for us.”** The practical experience is **“Here is our plan, and here is what we need to know next.”**

**Status:** CONFIRMED. See D-002.

## 1.4 The problem we are trying to solve

**Problem hypothesis:** A trip organizer needs to connect three tasks.

**Choosing:** Discover experiences that fit the group rather than collecting an overwhelming list of popular places.

**Planning:** Turn those choices into days that make sense given timing, location, travel, budget, and the group's pace.

**Sharing:** Present the plan in a way that excites companions while giving them clear, usable trip details.

Our hypothesis is that organizers would benefit from completing these tasks in a connected experience instead of manually assembling the result across separate resources.

**Status:** ASSUMPTION to validate. The problem has not yet been validated through research recorded in this blueprint.

## 1.5 When the problem occurs

The base scenario is an organizer preparing an upcoming trip with other people and moving from general ideas to a plan everyone can understand and use.

The experience continues after sharing. During the trip, the group needs to consult the plan and may need to adjust an activity.

A **Just exploring** mode could support people without dates, with date-specific verification when they commit. Its first-release inclusion remains undecided.

**Status:** Upcoming group-trip planning is the base scenario. Exploring mode is PROPOSED.

## 1.6 Current workaround

The organizer may gather ideas from search results, maps, social media, travel sites, and recommendations. They may organize those ideas in notes, spreadsheets, saved lists, or messages before sharing details with companions.

The tools actually used by our initial audience, and the relative difficulty of this process, have not been established.

**Status:** ASSUMPTION, not a confirmed description of every intended user.

## 1.7 Why the current approach may be insufficient

Candidate pain points to investigate:

- Narrowing options to experiences that fit the group.
- Checking whether choices form a practical schedule.
- Keeping companions informed without repeatedly explaining or resending details.
- Making the shared plan personal without creating a separate presentation.

Research should establish which problems matter, to whom, and whether people want a new tool to solve them. We have not yet selected the single most important pain point for the initial audience.

**Status:** ASSUMPTIONS. See Q-003 and Q-006.

## 1.8 Primary and secondary users

| User | Main goal | Intended support |
| --- | --- | --- |
| Organizer | Plan a trip they will take with companions. | Discover options, make choices, review a realistic schedule, personalize the presentation, and share the plan. |
| Travel companion | Understand, anticipate, and participate in the trip. | Enjoy receiving the itinerary and find relevant details while traveling. |

These are roles within a trip, not necessarily permanent account types. The initial audience within these broad roles remains open: friends, couples, families, or another first group must not be silently selected.

Whether companions can view, suggest, or directly edit belongs in Section 2 — Users, Roles, and Ownership. No permission model has been approved.

**Status:** Organizer/companion participation is the confirmed use-case direction. Initial segment and permissions are OPEN. See Q-003 and Q-101.

## 1.9 Core value: Discover, Organize, Delight

| Responsibility | User question | Intended value |
| --- | --- | --- |
| Discover | “What would we actually enjoy doing?” | A manageable selection of personally relevant options with understandable reasons. |
| Organize | “How do these choices become a trip that works?” | Realistic days that respect important commitments, timing, travel, and downtime. |
| Delight | “How do I make everyone excited about this?” | Personalized sharing connected to an itinerary that remains practical to use. |

The supplied concept recommends that **Keep means interest, not guaranteed scheduling**. This is an important proposed rule to resolve explicitly during journey and feature design; listing it here does not finalize all shortlist behavior.

**Status:** The three-part purpose is the adopted base direction. Exact workflows and detailed rules remain PROPOSED or OPEN.

## 1.10 Intended distinguishing idea

> Connect the experience of choosing a trip, anticipating it together, and using the plan while traveling.

The intended distinction is the combination of **personal fit**, **practical fit**, **personal presentation**, and **continued usefulness**. The itinerary is the output; the overall planning and shared experience are the design focus.

This is positioning to test, not a researched claim that competing products lack these features.

**Status:** PROPOSED positioning based on the supplied concept.

## 1.11 Long-term vision

> Become a planning companion that helps a group move from initial trip inspiration to a shared, adaptable travel experience.

Possible extensions include broader destinations, multi-city trips, richer companion input, date-specific events, and more advanced adjustments during the trip.

Mentioning an extension here does not commit it to the first release. Some capabilities may be tested earlier if approved scope and dependency evidence justify them.

**Status:** Long-term direction established at a high level; individual extensions remain PROPOSED.

## 1.12 First-release promise

**Proposed promise:**

> Within a limited set of supported destinations, an organizer can choose preferences, keep appealing activities, review and adjust a realistic itinerary, and share a polished, mobile-friendly version with companions.

The proposed first complete test preserves all three product jobs: Discover, Organize, and Delight. Personalized sharing is part of the concept to test, rather than decoration to consider only after the planning tools are finished.

The first test does not necessarily require elaborate animation or many presentation styles. A minimum meaningful reveal and a usable trip view could test the principle.

Exact destinations, supported trip types, required data, scheduling guarantees, and platform remain for the scope and system sections. No first-release limits have been approved yet.

**Status:** PROPOSED. See Q-005 and Q-301.

## 1.13 Explicit non-goals and presentation boundaries

**Proposed first-release exclusions:** Broad worldwide coverage, complex multi-city travel, unrestricted group editing, group voting, advanced same-day replanning, and in-app booking/payment.

These exclusions require approval; they are not already recorded as rejected features.

The supplied design direction also calls for two important boundaries:

**Do not misrepresent booking status.** A suggested activity must not look reserved or paid merely because it appears in a polished itinerary.

**Do not obstruct practical use with the reveal.** Recipients should not have to replay an introduction whenever they need an address, time, or booking detail.

These boundaries will need observable criteria in later feature specifications.

**Status:** Exclusions are PROPOSED. Presentation safeguards are part of the supplied design direction, with detailed behavior still to be specified.

## 1.14 Evidence and important assumptions

**Established in this planning record:** The owner's concept, the three product responsibilities, the primary organizer-to-companion use case, the sequential planning process, the GitHub repository, and the intended later implementation workflow.

**Not documented:** Interviews, observed planning sessions, prototype findings, willingness to pay, comparative product research, real provider tests, or scheduling evaluation results.

Important assumptions:

1. Organizers want a connected discovery, planning, and sharing workflow.
2. Personalized presentation provides meaningful value to organizers and companions.
3. The practical plan reduces effort or confusion compared with current workarounds.
4. Reliable information is available under usable technical, commercial, and content conditions.
5. Realistic schedules can be produced within an acceptable cost and reliability budget.

These will become specific experiments in Section 5. No demand, cost, coverage, or correctness claims are being treated as validated.

**Status:** ASSUMPTIONS and evidence gaps. See Q-006.

## 1.15 Project goal, business model, and distribution

**Confirmed process goal:** Design the app through the blueprint, organize the maintained planning record in GitHub, and use Codex to build after the design phase.

**Project/business objective:** OPEN. The priority among commercial launch, personal use, portfolio, and learning has not been selected. See Q-002.

**Business model:** OPEN. No subscription, advertising, transaction fee, or other model has been selected. See Q-007.

**Initial distribution:** OPEN. The first organizer/companion testers and how they will be recruited have not been selected. See Q-008.

Avoid inventing these answers to make the document appear finished.

## 1.16 Constraints

**Confirmed process constraints:** Complete the blueprint sequentially; keep this workflow in design; maintain the planning documents in `fgzmac/OnToTheNext`; use Codex for implementation after the design phase.

**Open delivery constraints:** Available time, budget, target launch window, maintenance capacity, initial destinations, supported devices, operating-cost limits. See Q-004 and Q-301.

**Unselected technical decisions:** Stack, database, identity/access system, AI components, and external data providers. See Q-401.

Google Places, Google Routes, and Ticketmaster in the supplied concept are candidates to investigate, not approved dependencies. Any actual selection requires current provider documentation, coverage, cost, and content-use evaluation.

**Repository visibility:** The repository was verified as public on 2026-09-19. Use fictional/redacted examples; do not commit credentials, private booking details, or identifying research responses. Public visibility does not mean the eventual app or its itineraries should be public.

## 1.17 Completion and next discussion

This section is drafted, not finalized. We have a clear core purpose and primary use case, but the initial audience, project objective, practical constraints, evidence, and exact first-release promise need decisions or explicit deferral.

The immediate next question is Q-002: **What is the primary goal of building this app — launching a business, personal use, a portfolio/learning project, or a combination?**

After that answer, continue through the remaining Section 1 questions one at a time. Do not jump to companion permissions merely because they appear in the base concept. When the owner approves this section, update the approval record, decision register, question register, and blueprint tracker together.

## Revision record

| Date | Change | Approval effect |
| --- | --- | --- |
| 2026-09-19 | Saved the initial product-brief draft and linked the confirmed repository. | No section approval; proposals and assumptions remain labeled. |
