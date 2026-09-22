# App-Building Blueprint

**Purpose:** The main planning framework for this project.  
**Source:** The app-building blueprint adopted in the planning conversation.  
**Framework status:** CONFIRMED as the planning process; not approval of every product proposal.  
**Current section:** 6 — Conceptual Model and System Boundaries.  
**Current section status:** IN REVIEW — Section 6 closeout prepared; awaiting explicit owner approval.  
**Last updated:** 2026-09-19.  
**Next review trigger:** The next planning answer from the project owner.

## Operating principle

> Understand the overall product, but only fully specify the next useful piece that will be built.

Delay unnecessary implementation decisions, not critical questions about feasibility, security, data ownership, or user value. This chat and its repository documents are for design; implementation with Codex begins only after the project owner approves the transition.

This file translates the earlier blueprint into maintainable templates. It retains the product-planning order, technical worksheets, travel-specific considerations, and delivery safeguards. It is a framework, not a completed design or permission to implement speculative features.

### Three levels of detail

| Level | Content | Detail |
| --- | --- | --- |
| Product direction | Problem, users, value, boundaries, capabilities, major risks. | Clear without premature implementation detail. |
| Upcoming work | Likely next outcomes, dependencies, questions, rough size. | Sufficient to prioritize and investigate. |
| Current delivery slice | Behavior, screens, permissions, contracts, data changes, tests, release conditions. | Precise enough to implement and verify. |

During the design phase, complete the product-wide direction and plan the first buildable slice. Do not interpret this as a requirement to fully specify every future slice. During later development, reuse the detailed feature templates only for selected upcoming work.

### Review loop

```text
Draft one section
    → Discuss unresolved questions
    → Record explicit decisions and evidence
    → Obtain section approval
    → Save the maintained version in GitHub
    → Advance to the next section
```

Drafts may be saved before approval. A commit records a version; it does not approve its contents. Do not move a section to APPROVED without the project owner's explicit approval. If an unresolved question is intentionally deferred, record who decided that, why it is safe, and the event that will reopen it.

### Status vocabulary

- **CONFIRMED:** Explicitly chosen or approved by the project owner.
- **PROPOSED:** Suggested but not approved.
- **ASSUMPTION:** Believed but not adequately tested.
- **OPEN:** Requires a decision or investigation.
- **DEFERRED:** Deliberately postponed.
- **REJECTED:** Deliberately excluded.

Document lifecycle is separate: **NOT STARTED → DRAFT → IN REVIEW → APPROVED**, with **NEEDS REVISION** when new evidence invalidates prior approval. A confirmed product decision does not make a market or technical assumption true.

### Standard document header

```text
Document:
Owner:
Lifecycle status:
Last updated:
Related goal, feature, or decision:
Source or evidence:
Next review trigger:
Approval record:
```

## Sequential progress tracker

The original long-form blueprint had introductory sections before the product templates. The middle column maps this sequential workflow to those original headings.

| Step | Original blueprint heading | Planning section | Status |
| --- | --- | --- | --- |
| 1 | 3 | Product Vision and Problem Brief | APPROVED — 2026-09-20 |
| 2 | 4 | Users, Roles, and Ownership | APPROVED — 2026-09-20 |
| 3 | 5 | User Journeys and Interface Behavior | APPROVED — 2026-09-21 |
| 4 | 6 | First-Release Scope and Success Measures | NOT STARTED |
| 5 | 7 | Assumptions, Risks, and Early Experiments | NOT STARTED |
| 6 | 8 | Conceptual Model and System Boundaries | NOT STARTED |
| 7 | 9 | Architecture, Quality, and External Dependencies | NOT STARTED |
| 8 | 10 | Lightweight API Capability Inventory | NOT STARTED |
| 9 | 11 | Roadmap and Sprint Brief | NOT STARTED |
| 10 | 12 | Detailed Feature Specification | NOT STARTED |
| 11 | 13 | Detailed API Contract for the Current Feature | NOT STARTED |
| 12 | 14 | Implementation Boundaries and Simulated Components | NOT STARTED |
| 13 | 15 | Data and Persistence Planning | NOT STARTED |
| 14 | 16 | Testing, Completion, and Release Readiness | NOT STARTED |
| 15 | 17 | Feedback, Decisions, and Documentation | NOT STARTED |

Only Section 1 currently has a populated product document: [Product brief](00-product-brief.md). Later templates below are reference material, not completed planning sections. Open questions are in [the question register](open-questions.md), and approved decisions are in [the decision register](decisions.md).

## Process safeguards from the strategy analysis

### Keep

Begin with the problem, audience, value, and boundaries. Involve intended users and interface thinking early. Outline API capabilities without specifying the whole API. Detail only selected upcoming functionality. Use simulations when they help answer a real question. Treat feedback as input to the next decision.

### Improve

**API first does not mean backend first every time.** Agree on the interaction between interface and backend. Start with a prototype, integration experiment, or persistent slice according to the uncertainty that matters most.

**Separate experiments from product delivery.** A prototype tests an idea. A working feature performs the promised behavior using its required real components. A release-ready feature also satisfies its agreed quality and operational requirements.

**Investigate high-risk dependencies early.** Do not finish every screen before checking whether required data can be obtained, used, afforded, or scheduled realistically.

**Do not require an interface and repository for every class.** Add boundaries for an actual reason: isolating rules, testing behavior, or replacing an external dependency. Logical components need not be separately deployed services.

**Define value, completion, and release checks.** A feature can meet its specification without solving a worthwhile problem. A pleasing demonstration can still be unsuitable for production.

---

# 1. Product Vision and Problem Brief

**Purpose:** Explain the app's reason for existing in language that does not depend on the technology stack.

**Working document:** [00-product-brief.md](00-product-brief.md).

```text
WORKING PRODUCT NAME
[Name or placeholder; distinguish repository name from final brand.]

ONE-SENTENCE DESCRIPTION
For [specific user], the app helps them [task/outcome]
by [approach], so they can [benefit].

PRIMARY PROBLEM
[What is difficult, frustrating, confusing, costly, or time-consuming?]

WHEN THE PROBLEM OCCURS
[The situation that creates the need.]

CURRENT WORKAROUND
[How the intended user solves it today.]

WHY THAT APPROACH IS INSUFFICIENT
[Specific failure points or unnecessary effort.]

PRIMARY USER
[The first audience to serve well.]

SECONDARY USERS
[Other participants and recipients.]

CORE VALUE
[What becomes easier, clearer, faster, or more enjoyable?]

DISTINGUISHING IDEA
[Intended differentiation; do not imply unresearched uniqueness.]

EVIDENCE
[Observed tasks, interviews, examples, or research.]

IMPORTANT ASSUMPTIONS
[Beliefs not yet adequately tested.]

LONG-TERM VISION
[What the product could eventually become.]

FIRST-RELEASE PROMISE
[The complete but narrow outcome the first version should deliver.]

EXPLICIT NON-GOALS
[What the product or first release will not do.]

BUSINESS OR PROJECT GOAL
[Commercial launch, personal use, learning, portfolio, or combination.]

POTENTIAL BUSINESS MODEL
[Open or a clearly labeled hypothesis.]

INITIAL DISTRIBUTION
[How initial users will find and access it.]

CONSTRAINTS
[Time, budget, team, skills, devices, operational limits.]
```

**Ready for approval when:** The owner can explain the audience, problem, core value, and first-release promise without describing frameworks. Important unknowns are either answered or explicitly retained with owners and review triggers. Product brief approval is not evidence that the market assumptions are validated.

# 2. Users, Roles, and Ownership

**Purpose:** Identify participants, resources, ownership, access, and responsibility without assuming everyone needs an account.

```text
ROLE NAME:
Main goal:
When they use the app:
What they need to see:
What they may create or change:
What they must not access or change:
Account requirement: [required / optional / unnecessary / open]
Relationship to a trip or other resource:
How access begins:
How access ends:
Successful experience:
Open questions:
```

Ownership worksheet:

```text
Who owns a trip?
Can ownership change?
Can the same person have different roles on different trips?
Who can edit, publish, share, or delete?
Who can see private notes?
Who can invite or remove participants?
What happens when an owner deletes their trip or account?
Which actions require sign-in, an invitation, or another access mechanism?
How are permissions enforced for each resource?
```

Organizer and companion are roles in a trip, not automatically different permanent account types. Companion does not imply co-editor. Identity and permission are different decisions.

**Ready for approval when:** The participants and permissions needed for the initial workflows are unambiguous; later roles are explicitly deferred rather than assumed.

# 3. User Journeys and Interface Behavior

**Purpose:** Describe an outcome and its recovery paths before converting the experience into endpoints and tables.

```text
JOURNEY NAME:
Actor:
Trigger:
Starting conditions:
Desired result:
Main path:
  1. User [...]
  2. App [...]
Decision points:
Alternative paths:
Failure paths:
Recovery, correction, retry, undo:
Save and resume:
Ending state:
Observable success:
```

For each important screen:

```text
SCREEN NAME:
Purpose:
Primary user:
Main action:
Information required:
Information shown:
Secondary actions:
Loading state:
Empty state:
Error state:
Partial/unavailable data:
Saved versus unsaved state:
Back navigation:
Mobile behavior:
Keyboard, pointer, touch, and accessibility behavior:
```

For activity selection, define Keep and Replace precisely. Plan buttons as well as gestures, and alternatives to dragging when reordering. Accessibility checks must cover how users operate and understand the experience, not just its colors.

**Ready for approval when:** Someone can walk through the core task, a failure, and a recovery without inventing missing behavior. A journey is not necessarily one screen per step.

# 4. First-Release Scope and Success Measures

**Purpose:** Choose a complete narrow experience rather than a shallow fragment of every feature.

```text
TARGET USER:
Main problem:
Complete outcome delivered:
Included capabilities:
Excluded capabilities:
Supported limits:
  [Destinations, dates, duration, group size, devices, languages.]
Acceptable manual steps:
Acceptable simplifications:
Unacceptable compromises:
Dependencies:
Release acceptance:
```

Measurement worksheet:

```text
METRIC:
Why it matters:
Exact definition:
Numerator and denominator, where applicable:
Measurement method:
Baseline:
Target:
Measurement period:
Exclusions:
Decision influenced:
```

Candidate questions: Can organizers complete a shareable plan? Can recipients locate the next activity, time, and place? Do evaluated plans meet agreed scheduling checks? Is the process easier than the current workaround? What does a completed planning session cost, including retries and replacement requests?

Supporting fewer destinations can be a deliberate limitation. Claiming to produce realistic days without accounting for required timing constraints would break the promise. Targets remain open until chosen; no fabricated baseline or adoption claims.

**Ready for approval when:** The first release has a bounded end-to-end outcome, explicit exclusions, and observable acceptance and success measures.

# 5. Assumptions, Risks, and Early Experiments

**Purpose:** Find what could invalidate the idea or force a major redesign before expensive work depends on it.

```text
RISK ID:
Assumption or uncertainty:
Category: [value / usability / technical / data / cost / security / operation]
Why it matters:
Impact if wrong:
Evidence:
Confidence:
Smallest useful test:
Pass/fail criteria:
Owner:
Decision deadline or trigger:
Fallback:
Result:
Decision:
```

Candidate experiments: Observe Keep/Replace comprehension; inspect representative real provider records and permitted uses; test a companion's ability to use the shared plan; evaluate scheduling cases against known constraints; measure provider calls and costs; check what owner, recipient, and uninvited visitor can see.

An experiment ends with findings and a decision, not just experimental code. Clearly distinguish observations, user statements, interpretations, and open hypotheses.

**Ready for approval when:** Highest-impact risks have tests and owners, and dependencies that could block the first slice are resolved or have explicit acceptable fallbacks.

# 6. Conceptual Model and System Boundaries

**Purpose:** Identify important concepts and responsibilities before committing to a complete schema.

```text
CONCEPT NAME:
Plain-language meaning:
Why it exists:
Who owns or supplies it:
Identifier:
Relationships:
States:
Rules that must remain true:
Source of truth:
Unknowns:
```

Candidate concepts, not selected tables: Trip, Destination, Activity Option, Selected Activity, Itinerary Item, Itinerary, Participant, Shared Version.

An interesting activity, a saved choice, and a scheduled occurrence may be distinct concepts. Identify which distinction the approved behavior actually requires.

```text
SYSTEM BOUNDARIES
What the app does:
What users do outside it:
What external services provide:
What the app stores:
What the app calculates:
What the app only displays:
What it does not guarantee:
Authority for each type of information:
```

Distinguish suggesting an experience from reserving or paying for it. Do not let wording or presentation imply booking actions that have not occurred.

**Ready for approval when:** Concepts, relationships, authority, and boundaries are clear enough to support selected workflows without prematurely designing every table.

# 7. Architecture, Quality, and External Dependencies

**Purpose:** Decide enough technical direction to avoid predictable problems without building unnecessary infrastructure.

```text
ARCHITECTURE DECISION
Client experience:
Major logical components:
Server responsibilities:
Client responsibilities:
Data-storage direction:
Identity and access approach:
External dependencies:
Deployment direction:
Constraints:
Options considered:
Current choice and reason:
Consequences:
Revisit trigger:
```

One application with clear internal responsibilities is a proposal to evaluate, not a committed stack. A logical service need not be a separate deployed system.

```text
QUALITY REQUIREMENTS
Performance:
  Key interaction; response target; waiting behavior; measurement.
Reliability:
  What must not be lost; interruption recovery; retry limits.
Security:
  Resource permissions; enforcement; secrets; input validation; abuse limits.
Privacy:
  Fields collected; necessity; visibility; retention; deletion; third parties.
Accessibility:
  Target; supported interactions; automated and manual checks.
Operability:
  Errors and cost signals; support; incident owner; recovery expectations.
```

Security for real user data is not a later decorative step. Before release, establish secure transport, server-side validation, resource-level access enforcement, and error responses that do not expose sensitive details.

```text
EXTERNAL-SERVICE WORKSHEET
Capability needed:
Potential provider:
Official documentation:
Required fields:
Coverage to verify:
Freshness to verify:
Authentication:
Usage limits:
Pricing assumptions and verification date:
Storage/redistribution permissions:
Attribution and media requirements:
Failure behavior:
Fallback:
Replacement difficulty:
Representative real-data test:
Decision:
```

Evaluate actual providers when this section is active. Earlier Google Places, Google Routes, and Ticketmaster examples are not selected dependencies. Verify current documentation, prices, licensing, freshness, and geography before relying on them.

**Ready for approval when:** Required architecture choices and measurable quality needs are recorded; high-risk dependencies have evidence or an explicit test plan.

# 8. Lightweight API Capability Inventory

**Purpose:** Outline what the interface needs from the backend without fully specifying every endpoint.

```text
CAPABILITY:
User journey supported:
Caller:
Information supplied:
Information returned:
Changes stored data?:
Who may use it?:
External dependency:
Uncertainty:
Priority:
```

Illustrative capabilities: create/reopen a trip, suggest destinations, retrieve activity options, save choices, build/revise an itinerary, find replacements, prepare a shared version. These are examples, not one-endpoint-per-row instructions.

**Ready for approval when:** Initial journeys have supporting capabilities and important access/data responsibilities. Exact payloads remain for the selected slice.

# 9. Roadmap and Sprint Brief

**Purpose:** Select the next useful outcome while preserving room to learn.

```text
ROADMAP
NOW: [One primary outcome.]
NEXT: [Likely outcomes and unresolved dependencies.]
LATER: [Important possibilities without premature detail.]
NOT PLANNED: [Explicit exclusions.]

FOR EACH ITEM
Outcome:
User value:
Risk reduced:
Dependencies:
Approximate size:
Confidence:
Priority rationale:
```

```text
DELIVERY CYCLE
Name:
Available capacity:
Primary goal:
User-visible outcome:
Selected features:
Explicit exclusions:
Dependencies:
Questions to resolve:
Demonstration:
Validation:
Completion conditions:
Risks to the goal:
```

Prefer an outcome such as “A planner can save a trip and reopen it without losing selected activities” over a milestone consisting only of tables and endpoints.

**Ready for approval when:** The next outcome is coherent, bounded, and connected to a user goal, with a demonstration and validation plan.

# 10. Detailed Feature Specification

**Purpose:** Make one selected feature precise enough to build and test. Reuse this template per feature rather than fully specifying the whole backlog.

```text
FEATURE ID:
Name:
Status:
Owner:
Related product goal:
Related journey:
Source:

1. USER OUTCOME
As [user], I want [capability], so that [benefit].

2. CURRENT BEHAVIOR
[Including a manual workaround.]

3. DESIRED BEHAVIOR
[The observable difference.]

4. INCLUDED SCOPE
5. EXCLUDED SCOPE
6. ENTRY CONDITIONS
7. INPUTS
8. MAIN FLOW
9. ALTERNATIVE FLOWS
10. ERROR AND RECOVERY FLOWS
11. BUSINESS RULES
12. PERMISSIONS
13. STATE CHANGES
14. OUTPUT
15. SIDE EFFECTS
16. INTERFACE STATES
17. DATA AND API CHANGES
18. REPEATED OR CONFLICTING ACTIONS
19. QUALITY REQUIREMENTS
20. ACCEPTANCE CRITERIA
21. TEST PLAN
22. MEASUREMENT
23. ROLLOUT AND RECOVERY
24. OPEN QUESTIONS, OWNERS, AND REVIEW TRIGGERS
```

Acceptance criterion format:

```text
Given [starting condition],
when [specific action],
then [observable result].
```

Illustrative Keep feature: Saving a not-yet-saved activity produces one saved entry; repeating the same save does not duplicate it; a failed save does not falsely show durable success; a persistent version retains it after reopening. Keeping does not implicitly schedule, purchase, or notify anyone. These examples still need a feature-level decision before implementation.

**Ready for approval when:** Important behavior, scope, permission, failure, persistence, and test conditions are explicit enough that implementation need not invent product decisions.

# 11. Detailed API Contract for the Current Feature

**Purpose:** Specify exact communication for the selected slice, potentially in an OpenAPI contract when appropriate.

```text
OPERATION NAME:
Feature:
HTTP method:
Path:
Description:

ACCESS
Identity/access mechanism:
Resource-level permission:

REQUEST
Path parameters:
Query parameters:
Headers:
Body:
Required/optional fields:
Types:
Allowed values:
Defaults:
Validation:
Meaning of omitted, empty, and null:

SUCCESS RESPONSE
Status:
Fields and meanings:
Example:
Ordering or pagination when relevant:

ERROR RESPONSES
Invalid input:
Missing/inaccessible resource:
Permission failure:
Conflicting/stale update:
Rate limit:
External failure:
Unexpected failure:

BEHAVIOR
Persistent changes:
Side effects:
Repeated-request behavior:
Retries:
Concurrent updates:
Timeout:
Partial results:

COMPATIBILITY
Consumers:
Potential breaking changes:
Transition plan:

VERIFICATION
Contract tests:
Business-rule tests:
Integration tests:
```

Use only relevant categories. Do not add complexity solely to fill a template. Missing hours must not silently mean open; an unknown price must not mean zero. Distinguish dates, local scheduled times, time zones, and timestamps as needed. A successful preview, save, publish action, and actual message delivery are different outcomes.

**Ready for approval when:** Consumer and server expectations are explicit for this slice, including access, uncertainty, errors, and side effects.

# 12. Implementation Boundaries and Simulated Components

**Purpose:** Organize responsibilities and explicitly identify what a prototype or test proves.

```text
Interface
    ↓
API handler
    ↓
Application service
    ↓
Storage component / external-provider adapter
    ↓
Database / external service
```

This is an optional logical arrangement, not a requirement for five layers or separately deployed applications.

```text
COMPONENT:
Responsibility:
Inputs:
Outputs:
Rules owned:
Dependencies:
Failure behavior:
What may be simulated:
What must be real now:
Tests:
```

Simulation worksheet:

```text
SIMULATED COMPONENT:
Why simulated:
Behavior represented:
Scenarios supported:
What it does not prove:
Where permitted to run:
Visible identification:
Replacement condition:
Owner:
Tracking item:
```

Use “stub” for prepared answers, “fake” for a simplified working substitute, and “mock” for interaction expectations where precision helps. The important rule is to document the limit of the evidence.

Prepared activity cards can test presentation without proving real data coverage. In-memory storage does not prove durable saving. A sample schedule does not prove scheduling feasibility. A message preview does not prove delivery or recipient access.

Include difficult cases: long names, missing photos, no results, partial information, slow responses, and failures. Make a dependency real when the promised outcome requires it, when it contains a major unresolved risk, or when continued simulation prevents learning. Do not force straightforward features through unnecessary simulation stages.

**Ready for approval when:** Responsibilities, real/simulated boundaries, and replacement conditions are explicit. No required production behavior is silently simulated.

# 13. Data and Persistence Planning

**Purpose:** Design storage for the current behavior and manage changes without inventing every future table.

```text
STORAGE WORKSHEET
Feature:
Information that must persist:
Reason:
Owner:
Identifier:
Relationships:
Constraints:
Allowed states:
Queries:
Updates:
Deletion:
Retention:
External identifiers:
Source freshness/verification:
Concurrent-edit policy when relevant:
```

```text
DATA-CHANGE WORKSHEET
Change:
Reason:
Existing records affected:
Migration:
Default/backfill:
Compatibility with deployed code:
Verification:
Backup/recovery:
Roll-forward/rollback:
Deployment order:
```

Product questions with storage consequences: Does changing dates move scheduled activities? Does replacement remove a saved choice or only an occurrence? Does sharing expose a snapshot or published updates? What happens when an external activity changes or disappears? Resolve these at the appropriate product stage rather than letting storage convenience decide them.

**Ready for approval when:** Current required information can be preserved correctly and existing-data changes have verification and recovery plans.

# 14. Testing, Completion, and Release Readiness

**Purpose:** Establish what proves promised behavior and what makes it safe to release.

| Standard | Question |
| --- | --- |
| Acceptance criteria | Does this feature perform its specified behavior? |
| Definition of Done | Does it meet the shared engineering/quality requirements? |
| Product success measures | Does it produce useful outcomes for people? |

Test areas: business rules and boundaries; API contract; real integrations; end-to-end user journey; unauthorized access; recovery after timeouts or interrupted actions; accessibility; performance and cost.

A passing test with a simulated dependency is not proof that the real integration works.

Proposed Definition of Done to refine before implementation:

```text
Acceptance criteria satisfied.
Relevant automated tests pass.
Main journey manually checked.
Required real dependencies verified.
Permission and failure behavior tested.
Relevant accessibility checks performed.
Required persistence survives reloads/restarts.
No production-required behavior silently simulated.
Documentation and contracts match implementation.
Limitations recorded.
Deployment and recovery understood.
Demonstration requires no hidden manual fixes.
```

```text
RELEASE WORKSHEET
Release:
Included outcomes:
Excluded/incomplete work:
Environment:
Configuration and secrets:
Migrations:
External-service setup:
Pre-release checks:
Post-deployment smoke test:
Monitoring:
Cost alerts/limits:
Failure owner:
Disable/recovery procedure:
Backup-and-restore verification:
Known limitations communicated to users:
```

**Ready for approval when:** Completion and release requirements are realistic, measurable, and connected to the first slice. Before accepting real saved trips, verify restoration rather than merely claiming backups exist.

# 15. Feedback, Decisions, and Documentation

**Purpose:** Convert evidence into controlled plan changes and leave a clear record for later implementation.

```text
USER-FEEDBACK SESSION
Feature/journey:
Question being tested:
Participant and relevant context:
Task:
Observed behavior:
Assistance required:
Participant's statements:
Actual task completion:
Problems by severity:
Interpretation:
Proposed change:
Decision:
Follow-up test:
```

A realistic companion task might be: “You received this itinerary from a friend. Find where you should go first tomorrow and how to reach the next activity.” Capture behavior, not only opinions about appearance.

```text
DECISION RECORD
ID:
Question:
Context:
Options:
Decision:
Reason:
Evidence:
Tradeoffs:
Affected features:
Owner:
Date:
Revisit trigger:
Supersedes:
```

New ideas enter the backlog by default. Change current work only through an explicit decision needed for the goal, a serious problem, or a scope tradeoff. Do not use feedback as a reason to add unlimited work.

```text
Product goal → Journey → Feature → Acceptance criteria
    → API/data change → Tests → Release → Feedback
```

Keep references lightweight. One small project does not need a separate document for every arrow.

**Ready for approval when:** Evidence capture, decision ownership, document updates, and scope-change handling are clear.

---

# Travel-App Reference Worksheets

These preserve important considerations from the supplied concept. They are prompts for later sections, not completed decisions or approved release scope.

## A. Supplied experience direction

```text
Trip basics (dates/duration, budget, party, pace)
    → Country/state or direct city choice
    → Interests and personally relevant activity cards
    → Keep/replace shortlist and must-dos
    → Review realistic days
    → Personalize the reveal and share
    → Use the plan and preview adjustments
```

Recommended details awaiting decisions include dates before date-sensitive suggestions, optional exploration without dates, progressive preference questions, reasons for city recommendations, cards with labeled unknowns, undo and button alternatives, and optional reasons for replacement.

## B. Decisions not to infer

Organizer-led control, companion suggestions, guest access, sharing by email/text, a mobile link, live versus snapshot publication, private drafts, surprise controls, and initial destinations remain product decisions. The source concept is a starting direction, not blanket approval of every recommendation.

The primary use case is confirmed: the organizer is taking the trip and sharing with companions.

## C. Itinerary rules

```text
TRIP CONSTRAINTS
Trip-length limits:
Single-/multi-city:
Arrival/departure:
Known/flexible dates:
Day boundaries/time zones:

ACTIVITY CONSTRAINTS
Duration:
Fixed times:
Opening information:
Availability:
Reservation requirements:
Unknown/uncertain information:

MOVEMENT
Transport modes:
Travel-time source:
Buffers:
Maximum travel:
Starting/ending locations:

PREFERENCES
Pace:
Interests:
Budget:
Breaks/meals:
Accessibility/mobility:
Must-dos:
Locked commitments:

PLAN CHANGES
What may move automatically:
What requires confirmation:
What must never be silently removed:
Undo:
Impossible combinations:

OUTPUT
Warnings:
Unverified details:
Visible assumptions:
Sources:
Last checked:
```

Proposed scheduling goal: a doable, enjoyable day with minimal unnecessary travel. Do not claim mathematical optimality without defining and supporting it. Distinguish a preference, a must-do, and a fixed commitment; their exact behavior remains to be specified.

## D. Sharing and in-trip use

Separate the emotional reveal from the practical trip view. Define whether first-open and later-open experiences differ, how a recipient reaches details directly, and whether the reveal is replayable. Distinguish suggested, reserved, and paid. Define what is private and what recipients see before publication.

“Replace this activity” and “Find something to do now” are different proposed actions. A replacement should be assessed against remaining time and fixed commitments; changes should be previewed before application. Location access and manual-area alternatives need explicit design.

## E. Optional AI behavior

Complete only after choosing an actual AI capability.

```text
TASK:
Why AI helps:
Inputs:
Permitted sources:
Structured output:
Facts that require verified data:
Rules checked outside AI:
Actions requiring user approval:
Failure/fallback:
Evaluation examples:
Quality threshold:
Cost/latency limits:
Model/prompt version tracking:
```

AI-generated language must not be treated as proof that a venue exists, an event is occurring, or a schedule is feasible. Reliable places/events are the requirement; scraping or any specific provider is not inherently the requirement.

## F. Candidate development sequence — not approved

After design approval, a possible sequence is: a small complete experience prototype plus real-data feasibility experiments; persistent private core; real sharing; real recommendation workflow; scheduling and refinement. Test the planning and receiving experience rather than making login alone the primary product milestone. Identity and resource protection are still required before private real-user use.

This sequence must be reconciled with approved scope, dependencies, and evidence before being handed to Codex. No implementation is authorized by this reference.

# GitHub Organization and Future Codex Handoff

Current documents:

```text
README.md
planning/
├── blueprint.md
├── 00-product-brief.md
├── decisions.md
└── open-questions.md
```

As sections become active, add focused documents as needed: users/permissions, journeys, scope/success, risks, system concepts, quality/integrations, API capabilities, roadmap, feature specifications, contracts, validation sessions, and releases. Do not create many empty files simply to appear complete.

Design completion requires an explicit owner decision that the product direction, first-release outcome, main experiences, critical risks, quality expectations, and first implementable slice are sufficiently defined. Record blockers and deferred details; do not pretend every future feature is specified.

Future handoff template:

```text
Implement only [approved feature ID/name].

Read:
[Relevant approved decisions, feature specification, contracts.]

Outcome:
[User-visible result.]

Required behavior:
[Acceptance criteria.]

Scope boundaries:
[What must not change or be added.]

Real versus simulated:
[Explicit identification and limitations.]

Data/API changes:
[Approved changes only.]

Tests:
[Required checks.]

Completion report:
Explain changes and important design choices.
Report tests actually run and their results.
Identify remaining simulations, risks, and limitations.
Surface conflicts and missing product decisions.
Do not silently select features, permissions, providers, or technologies.
```

## Approval record

The planning framework is adopted. **No completed blueprint section or design-to-implementation transition has yet been approved in this repository.** The current task is to finish Section 1, not to begin coding.
