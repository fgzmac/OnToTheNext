# Section 15 — Feedback, Decisions, and Documentation

**Lifecycle status:** DRAFT — current section.  
**Owner:** Project owner (`fgzmac`).  
**Started:** 2026-09-21.  
**Related:** Approved Sections 1–14; decisions D-001 through D-115.  
**Approval record:** None yet.

## Purpose

Define how the project records decisions, implementation feedback, defects, scope changes, and milestone learnings once coding begins.

The goal is to keep the repository as the reliable planning record without turning documentation into bureaucracy.

## Documentation principles

### 1. Decisions are explicit
When a product/architecture rule changes, record the change as a new decision rather than silently rewriting history.

### 2. Approved sections remain historical baselines
Post-approval changes are recorded as amendments or superseding decisions.

### 3. Implementation findings can change later plans
If a real build disproves an assumption, update the next sprint/section through an explicit decision.

### 4. Do not document every tiny code change
Use Git history for ordinary implementation details.

Project documentation should focus on:
- product behavior,
- architecture,
- scope,
- important defects,
- validation results,
- material implementation tradeoffs.

## Decision-record model

Continue the existing numbered decision series:

```text
D-001
D-002
...
D-115
D-116
...
```

Each material decision should include:
- title,
- status,
- date,
- owner,
- reason/source,
- what was confirmed,
- what remains open,
- which prior decision it amends/supersedes when applicable.

Do not reuse decision numbers.

## Change categories

### Product amendment
Example:
- a feature is removed,
- a workflow changes,
- navigation changes.

### Architecture amendment
Example:
- change provider,
- change deployment pattern,
- replace ORM.

### Scope amendment
Example:
- feature moves into/out of current sprint.

### Data-model amendment
Example:
- new relationship,
- changed ownership rule,
- migration required.

### Validation finding
Example:
- experiment disproves recommendation behavior,
- usability testing reveals navigation confusion.

## Sprint implementation log

Each sprint should have a concise implementation record containing:

- sprint objective,
- implemented scope,
- tests/checks run,
- deviations from spec,
- known issues,
- deferred work,
- lessons that affect the next milestone.

This can be one markdown file per sprint.

Do not duplicate every commit.

## Defect documentation

Only defects that matter to milestone acceptance or later planning need a durable record.

Suggested fields:
- ID/title,
- severity,
- impact,
- current status,
- discovered in,
- planned follow-up.

Minor transient coding bugs can stay in GitHub issues/commits if they do not affect the blueprint.

## Validation/experiment results

The six early experiments from Section 5 should each produce a short result record when run.

Each result should capture:
- what was tested,
- who/what scenario was used,
- result,
- what changed because of it,
- whether the related assumption still holds.

## Source-of-truth hierarchy

Recommended order:

1. **Latest confirmed decision**
2. **Latest approved section closeout plus later amendments**
3. **Current sprint spec**
4. **Implementation log / experiment result**
5. Historical drafts

If documents conflict, the latest confirmed decision/amendment wins.

## GitHub structure

Recommended structure:

```text
planning/
├── decisions/
├── research/
├── experiments/
├── sprints/
├── blueprint.md
├── section closeouts
└── current active section
```

Add folders only when real files need them.

Do not create empty placeholder directories solely for neatness.

## Implementation transition

The project is currently still in planning/specification mode.

After Section 15 is approved, the blueprint is complete.

Implementation begins only when the owner gives an explicit instruction such as:

> Start implementation.

or:

> Begin Sprint 1.

At that point:
- create the Sprint 1 implementation brief,
- use the approved planning documents as authoritative,
- implement only approved Sprint 1 scope,
- produce the completion report required by D-115.

## First Section 15 decision

**Q-1401:** Should implementation discoveries be allowed to change approved plans through explicit amendments, rather than treating the blueprint as immutable?

**Recommended direction:** yes.

The blueprint should be authoritative, but not rigid.

If implementation reveals that a rule is wrong or impractical:
1. document the finding,
2. create a new decision/amendment,
3. update the affected active/future spec,
4. preserve the older decision as historical context.

Do not silently diverge from the approved blueprint.
