---
name: cc-gen-prd-task
description: "Convert a PRD.md or BRD_PRD.md into canonical prd.json for Jodex autonomous execution. Preserve folder-based IDs from the source requirements document and emit TECH_SPEC.md references when available. Triggers on: convert this prd, turn this into jodex format, create prd.json from this, jodex json."
user-invocable: true
---

# Jodex PRD Converter

Converts existing PRDs to the prd.json format that Jodex uses for autonomous execution.

---

> **Schema contract:** See [prd-json-schema.md](../prd-json-schema.md) for the full prd.json field definitions shared with `cc-azure-board-sync`.

## The Job

Take a source requirements document (`PRD.md` or `BRD_PRD.md`) and convert it to `prd.json` in the same feature folder.

---

## Feature to User Story Relationship

**One source requirements document = One Feature = One prd.json**

- Each `PRD.md` or `BRD_PRD.md` describes a single feature
- That feature is broken down into multiple user stories
- Each user story becomes one entry in the `userStories` array
- All stories in prd.json belong to the same feature

If you have multiple features, create separate requirements documents and convert each one individually.

---

## Output Format

```json
{
  "project": "[Project Name]",
  "featureName": "[feature-name-kebab-case]",
  "featureId": "[3-digit feature number from the folder name]",
  "description": "[Feature description from PRD title/intro]",
  "detailedPrdPath": "[PRD.md or BRD_PRD.md]",
  "technicalSpecPath": "TECH_SPEC.md",
  "userStories": [
    {
      "id": "US-007-01",
      "title": "[Story title]",
      "description": "As a [user], I want [feature] so that [benefit]",
      "technicalSpecSection": "#31-us-007-01-story-title",
      "acceptanceCriteria": [
        {
          "id": "AC-007-01",
          "text": "Criterion 1",
          "passes": false,
          "estimatedHours": 1
        },
        {
          "id": "AC-007-02",
          "text": "Criterion 2",
          "passes": false,
          "estimatedHours": 0.25
        }
      ],
      "priority": 1,
      "storyPoints": 2,
      "totalEstimatedHours": 1.25,
      "passes": false,
      "notes": ""
    }
  ]
}
```

---

## Story Size: The Number One Rule

**Each story must be completable in ONE Jodex iteration (one context window).**

Jodex spawns a fresh agent instance per iteration with no memory of previous work. If a story is too big, the LLM runs out of context before finishing and produces broken code.

### Right-sized stories:
- Add a database column and migration
- Add a UI component to an existing page
- Update a server action with new logic
- Add a filter dropdown to a list

### Too big (split these):
- "Build the entire dashboard" - Split into: schema, queries, UI components, filters
- "Add authentication" - Split into: schema, middleware, login UI, session handling
- "Refactor the API" - Split into one story per endpoint or pattern

**Rule of thumb:** If you cannot describe the change in 2-3 sentences, it is too big.

---

## Story Ordering: Dependencies First

Stories execute in priority order. Earlier stories must not depend on later ones.

**Correct order:**
1. Schema/database changes (migrations)
2. Server actions / backend logic
3. UI components that use the backend
4. Dashboard/summary views that aggregate data

**Wrong order:**
1. UI component (depends on schema that does not exist yet)
2. Schema change

---

## Hour Estimation

Every acceptance criterion gets an `estimatedHours` value. Every user story gets `totalEstimatedHours` (sum of its ACs) and `storyPoints` (Fibonacci relative sizing).

### Estimation Procedure

Before assigning `estimatedHours` to any AC, read the source documents to understand the implementation scope:

1. **Read the source PRD/BRD_PRD.md** — identify for each user story:
   - How many files/components does the story touch?
   - Are there design constraints (responsive, a11y, brand rules)?
   - What is the functional complexity (simple swap vs. new logic)?
   - What are the non-goals (scope explicitly excluded)?

2. **Read TECH_SPEC.md** (if `technicalSpecPath` exists) — for each story:
   - Use `technicalSpecSection` to find the relevant heading
   - Identify specific files listed for modification
   - Note the implementation approach (class change vs. refactor)
   - Note edge cases, constraints, or dependencies called out

3. **Read the story description** — the "As a..., I want..., so that..." clause reveals scope:
   - "As a developer" stories are usually internal/tooling (lower hours)
   - "As a site visitor" stories involve user-facing UI (consider a11y, responsiveness, visual verification)

4. **Then classify each AC** using the Hour Scale table below, adjusting based on scope context from steps 1–3.

### Hour Scale (per AC)

| Hours | Label | When to use |
|-------|-------|-------------|
| 0.25 | Trivial | Quality gates: lint, typecheck, unit tests passing |
| 0.5 | Simple | E2E test pass, browser verification, single data/config change |
| 1 | Moderate | New test file, component update, multi-file change |
| 2 | Complex | New feature logic, significant refactor, cross-cutting change |

### Scope Adjustments

After reading the source documents, adjust the base hour value:

| Signal from source docs | Adjustment |
|------------------------|------------|
| TECH_SPEC lists 1 file to modify | No change |
| TECH_SPEC lists 3+ files for this AC | +0.5h (bump to next tier) |
| PRD specifies responsive/a11y constraints | +0.25h on UI ACs |
| TECH_SPEC calls out edge cases or gotchas | +0.25h |
| AC involves cross-component coordination | Bump to 2h |
| Story non-goals explicitly exclude scope | -0.25h (simpler than it looks) |
| Test AC: single assertion vs. multi-scenario | 0.5h vs 1h vs 2h |

**Cap:** No single AC exceeds 2h. If adjustments push past 2h, the AC is too large — flag it for splitting.

### Story Points (per User Story)

| Points | Label | Signals |
|--------|-------|---------|
| 1 | Trivial | 1–2 ACs, single file, ≤ 0.75h, no TECH_SPEC constraints |
| 2 | Small | 2–3 ACs, 1–2 files, ≤ 1.5h, simple implementation |
| 3 | Medium | 3–5 ACs, 2–4 files, ≤ 3h, some constraints/edge cases |
| 5 | Large | 5–7 ACs, 4–6 files, ≤ 5h, responsive/a11y/multi-concern |
| 8 | Extra Large | 7+ ACs, 6+ files, cross-cutting — consider splitting |

### Quick Reference

- **Read PRD/BRD_PRD.md and TECH_SPEC.md BEFORE estimating** — AC text alone is insufficient
- Quality gate ACs (lint, typecheck, unit tests) → always **0.25h** (no scope read needed)
- E2E tests / browser verification → always **0.5h** (no scope read needed)
- Content/logic ACs → **0.5h–2h** based on source document scope
- Apply scope adjustments from TECH_SPEC (file count, edge cases, constraints)
- `totalEstimatedHours` = sum of all AC `estimatedHours`
- `storyPoints` = Fibonacci value based on AC count + totalEstimatedHours + scope complexity

---

## Acceptance Criteria: Must Be Verifiable

Each criterion must be something Jodex can CHECK, not something vague.

### Good criteria (verifiable):
- "Add `status` column to tasks table with default 'pending'"
- "Filter dropdown has options: All, Active, Completed"
- "Clicking delete shows confirmation dialog"
- "Typecheck passes"
- "Tests pass"

### Bad criteria (vague):
- "Works correctly"
- "User can do X easily"
- "Good UX"
- "Handles edge cases"

### Always include as final criteria:
```
"Lint passes (run project's lint command)"
"Typecheck passes (run project's typecheck command)"
"Unit tests pass"
```

For stories with testable logic, also include:
```
"E2E tests pass"
```

### For stories that change UI, also include:
```
"Verify in browser using dev-browser skill"
```

**Note:** The prd skill automatically adds these standard quality criteria based on story type, so they should already be present in the source PRD.

Frontend stories are NOT complete until visually verified. Jodex will use the dev-browser skill to navigate to the page, interact with the UI, and confirm changes work.

---

## Conversion Rules

1. **Each user story becomes one JSON entry**
2. **IDs**: Preserve source IDs exactly as written in the source document
3. **Priority**: Based on dependency order, then document order
4. **All stories**: `passes: false` and empty `notes`
5. **branchName**: Derive from feature name, kebab-case, prefixed with `jodex/`
6. **detailedPrdPath**: Set to the actual source document name (`PRD.md` or `BRD_PRD.md`)
7. **technicalSpecPath** (optional): Set to `TECH_SPEC.md` if technical specifications are available
8. **technicalSpecSection** (per story, optional): Set to the markdown heading anchor for each story
   - Anchors are auto-generated from TECH_SPEC.md headings
   - Format: lowercase, spaces→hyphens, special chars removed
   - Example: `### 3.1 US-007-01: Update Schema.org Structured Data` → `#31-us-007-01-update-schemaorg-structured-data`
   - Example: `### 3.2 US-007-02: Update Contact Page — Phone, Fax, and Address` → `#32-us-007-02-update-contact-page--phone-fax-and-address`
9. **Acceptance criteria**: Emit canonical objects with `id`, `text`, `passes: false`, and `estimatedHours`, preserving source IDs exactly
10. **Preserve all acceptance criteria** from the source PRD (quality checks like lint, typecheck, tests are already included by the PRD skill)
11. **estimatedHours**: Read source PRD/BRD_PRD.md and TECH_SPEC.md first, then estimate each AC using the hour scale (0.25, 0.5, 1, 2) based on implementation scope. Quality gates are always 0.25h
12. **totalEstimatedHours**: Sum of all AC `estimatedHours` for the story
13. **storyPoints**: Fibonacci estimate (1, 2, 3, 5, 8) based on AC count, `totalEstimatedHours`, and scope complexity from source documents

---

## Splitting Large Features

If a feature in your PRD is too large, split it into smaller user stories:

**Original:**
> "Add user notification system"

**Split into:**
1. US-007-01: Add notifications table to database
2. US-007-02: Create notification service for sending notifications
3. US-007-03: Add notification bell icon to header
4. US-007-04: Create notification dropdown panel
5. US-007-05: Add mark-as-read functionality
6. US-007-06: Add notification preferences page

Each is one focused change that can be completed and verified independently.

---

## Example

**Input PRD:**
```markdown
# Task Status Feature

Add ability to mark tasks with different statuses.

## Requirements
- Toggle between pending/in-progress/done on task list
- Filter list by status
- Show status badge on each task
- Persist status in database
```

**Output prd.json:**
```json
{
  "project": "TaskApp",
  "featureName": "jodex/task-status",
  "featureId": "007",
  "description": "Task Status Feature - Track task progress with status indicators",
  "detailedPrdPath": "PRD.md",
  "technicalSpecPath": "TECH_SPEC.md",
  "userStories": [
    {
      "id": "US-007-01",
      "title": "Add status field to tasks table",
      "description": "As a developer, I need to store task status in the database.",
      "technicalSpecSection": "#31-us-007-01-add-status-field-to-tasks-table",
      "acceptanceCriteria": [
        {
          "id": "AC-007-01",
          "text": "Add status column: 'pending' | 'in_progress' | 'done' (default 'pending')",
          "passes": false,
          "estimatedHours": 1
        },
        {
          "id": "AC-007-02",
          "text": "Generate and run migration successfully",
          "passes": false,
          "estimatedHours": 0.5
        },
        {
          "id": "AC-007-03",
          "text": "Lint passes (run project's lint command)",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-04",
          "text": "Typecheck passes (run project's typecheck command)",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-05",
          "text": "Unit tests pass",
          "passes": false,
          "estimatedHours": 0.25
        }
      ],
      "priority": 1,
      "storyPoints": 2,
      "totalEstimatedHours": 2.25,
      "passes": false,
      "notes": ""
    },
    {
      "id": "US-007-02",
      "title": "Display status badge on task cards",
      "description": "As a user, I want to see task status at a glance.",
      "technicalSpecSection": "#32-us-007-02-display-status-badge-on-task-cards",
      "acceptanceCriteria": [
        {
          "id": "AC-007-06",
          "text": "Each task card shows colored status badge",
          "passes": false,
          "estimatedHours": 1
        },
        {
          "id": "AC-007-07",
          "text": "Badge colors: gray=pending, blue=in_progress, green=done",
          "passes": false,
          "estimatedHours": 0.5
        },
        {
          "id": "AC-007-08",
          "text": "Lint passes (run project's lint command)",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-09",
          "text": "Typecheck passes (run project's typecheck command)",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-10",
          "text": "Unit tests pass",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-11",
          "text": "E2E tests pass",
          "passes": false,
          "estimatedHours": 0.5
        },
        {
          "id": "AC-007-12",
          "text": "Verify in browser using dev-browser skill",
          "passes": false,
          "estimatedHours": 0.5
        }
      ],
      "priority": 2,
      "storyPoints": 3,
      "totalEstimatedHours": 3.25,
      "passes": false,
      "notes": ""
    },
    {
      "id": "US-007-03",
      "title": "Add status toggle to task list rows",
      "description": "As a user, I want to change task status directly from the list.",
      "technicalSpecSection": "#33-us-007-03-add-status-toggle-to-task-list-rows",
      "acceptanceCriteria": [
        {
          "id": "AC-007-13",
          "text": "Each row has status dropdown or toggle",
          "passes": false,
          "estimatedHours": 1
        },
        {
          "id": "AC-007-14",
          "text": "Changing status saves immediately",
          "passes": false,
          "estimatedHours": 1
        },
        {
          "id": "AC-007-15",
          "text": "UI updates without page refresh",
          "passes": false,
          "estimatedHours": 1
        },
        {
          "id": "AC-007-16",
          "text": "Lint passes (run project's lint command)",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-17",
          "text": "Typecheck passes (run project's typecheck command)",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-18",
          "text": "Unit tests pass",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-19",
          "text": "E2E tests pass",
          "passes": false,
          "estimatedHours": 0.5
        },
        {
          "id": "AC-007-20",
          "text": "Verify in browser using dev-browser skill",
          "passes": false,
          "estimatedHours": 0.5
        }
      ],
      "priority": 3,
      "storyPoints": 5,
      "totalEstimatedHours": 4.75,
      "passes": false,
      "notes": ""
    },
    {
      "id": "US-007-04",
      "title": "Filter tasks by status",
      "description": "As a user, I want to filter the list to see only certain statuses.",
      "technicalSpecSection": "#34-us-007-04-filter-tasks-by-status",
      "acceptanceCriteria": [
        {
          "id": "AC-007-21",
          "text": "Filter dropdown: All | Pending | In Progress | Done",
          "passes": false,
          "estimatedHours": 1
        },
        {
          "id": "AC-007-22",
          "text": "Filter persists in URL params",
          "passes": false,
          "estimatedHours": 1
        },
        {
          "id": "AC-007-23",
          "text": "Lint passes (run project's lint command)",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-24",
          "text": "Typecheck passes (run project's typecheck command)",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-25",
          "text": "Unit tests pass",
          "passes": false,
          "estimatedHours": 0.25
        },
        {
          "id": "AC-007-26",
          "text": "E2E tests pass",
          "passes": false,
          "estimatedHours": 0.5
        },
        {
          "id": "AC-007-27",
          "text": "Verify in browser using dev-browser skill",
          "passes": false,
          "estimatedHours": 0.5
        }
      ],
      "priority": 4,
      "storyPoints": 5,
      "totalEstimatedHours": 3.75,
      "passes": false,
      "notes": ""
    }
  ]
}
```

---

## Archiving Previous Runs

**Before writing a new prd.json, check if there is an existing one from a different feature:**

1. Read the current `prd.json` if it exists
2. Check if `branchName` differs from the new feature's branch name
3. If different AND `progress.txt` has content beyond the header:
   - Create archive folder: `archive/YYYY-MM-DD-feature-name/`
   - Copy current `prd.json` and `progress.txt` to archive
   - Reset `progress.txt` with fresh header

**The jodex.sh script handles this automatically** when you run it, but if you are manually updating prd.json between runs, archive first.

---

## Checklist Before Saving

Before writing prd.json, verify:

- [ ] **Previous run archived** (if prd.json exists with different branchName, archive it first)
- [ ] `detailedPrdPath` field set to the actual source document name (`PRD.md` or `BRD_PRD.md`)
- [ ] `technicalSpecPath` field set to `TECH_SPEC.md` (if technical specs available)
- [ ] `technicalSpecSection` set for each user story using full markdown anchor (e.g., `#31-us-007-01-update-schemaorg-structured-data`)
- [ ] User story IDs preserved exactly from the source document
- [ ] Acceptance criteria emitted as objects with `id`, `text`, and `passes: false`
- [ ] Each story is completable in one iteration (small enough)
- [ ] Stories are ordered by dependency (schema to backend to UI)
- [ ] Quality criteria present (lint, typecheck, unit tests for all stories; e2e tests and browser verification for UI stories)
- [ ] Acceptance criteria are verifiable (not vague)
- [ ] No story depends on a later story
- [ ] Source PRD/BRD_PRD.md and TECH_SPEC.md read before setting estimates
- [ ] `estimatedHours` set for every AC (0.25, 0.5, 1, or 2)
- [ ] `totalEstimatedHours` set for every story (sum of AC hours)
- [ ] `storyPoints` set for every story (1, 2, 3, 5, or 8)
