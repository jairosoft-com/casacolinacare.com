---
name: jodex-gen-prd-task
description: "Convert PRDs to prd.json format for the Ralph autonomous agent system. Use when you have an existing PRD and need to convert it to Ralph's JSON format. Triggers on: convert this prd, turn this into ralph format, create prd.json from this, ralph json."
user-invocable: true
---

# Ralph PRD Converter

Converts existing PRDs to the prd.json format that Ralph uses for autonomous execution.

---

## The Job

Take a PRD (markdown file or text) and convert it to `prd.json` in your ralph directory.

---

## Feature to User Story Relationship

**One PRD.md = One Feature = One prd.json**

- Each PRD.md describes a single feature
- That feature is broken down into multiple user stories
- Each user story becomes one entry in the `userStories` array
- All stories in prd.json belong to the same feature

If you have multiple features, create separate PRD.md files and convert each one individually.

---

## Output Format

```json
{
  "project": "[Project Name]",
  "featureName": "[feature-name-kebab-case]",
  "featureId": "[Feature id from the the PRD]",
  "description": "[Feature description from PRD title/intro]",
  "detailedPrdPath": "PRD.md",
  "technicalSpecPath": "TECH_SPEC.md",
  "userStories": [
    {
      "id": "US-001",
      "title": "[Story title]",
      "description": "As a [user], I want [feature] so that [benefit]",
      "technicalSpecSection": "#32-us-001-update-schemaorg-structured-data",
      "acceptanceCriteria": [
        "Criterion 1",
        "Criterion 2",
        "Lint passes (run project's lint command)",
        "Typecheck passes (run project's typecheck command)",
        "Unit tests pass",
        "E2E tests pass (if UI story)",
        "Verify in browser using dev-browser skill (if UI story)"
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    }
  ]
}
```

---

## Story Size: The Number One Rule

**Each story must be completable in ONE Ralph iteration (one context window).**

Ralph spawns a fresh Amp instance per iteration with no memory of previous work. If a story is too big, the LLM runs out of context before finishing and produces broken code.

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

## Acceptance Criteria: Must Be Verifiable

Each criterion must be something Ralph can CHECK, not something vague.

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

Frontend stories are NOT complete until visually verified. Ralph will use the dev-browser skill to navigate to the page, interact with the UI, and confirm changes work.

---

## Conversion Rules

1. **Each user story becomes one JSON entry**
2. **IDs**: Sequential (US-001, US-002, etc.)
3. **Priority**: Based on dependency order, then document order
4. **All stories**: `passes: false` and empty `notes`
5. **branchName**: Derive from feature name, kebab-case, prefixed with `ralph/`
6. **detailedPrdPath**: Always set to `PRD.md`
7. **technicalSpecPath** (optional): Set to `TECH_SPEC.md` if technical specifications are available
8. **technicalSpecSection** (per story, optional): Set to the markdown heading anchor for each story
   - Anchors are auto-generated from TECH_SPEC.md headings
   - Format: lowercase, spaces→hyphens, special chars removed
   - Example: `### 3.2 US-001: Update Schema.org Structured Data` → `#32-us-001-update-schemaorg-structured-data`
   - Example: `### 3.3 US-002: Update Contact Page — Phone, Fax, and Address` → `#33-us-002-update-contact-page--phone-fax-and-address`
9. **Preserve all acceptance criteria** from the source PRD (quality checks like lint, typecheck, tests are already included by the prd skill)

---

## Splitting Large Features

If a feature in your PRD is too large, split it into smaller user stories:

**Original:**
> "Add user notification system"

**Split into:**
1. US-001: Add notifications table to database
2. US-002: Create notification service for sending notifications
3. US-003: Add notification bell icon to header
4. US-004: Create notification dropdown panel
5. US-005: Add mark-as-read functionality
6. US-006: Add notification preferences page

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
  "featureName": "ralph/task-status",
  "featureId": "00001",
  "description": "Task Status Feature - Track task progress with status indicators",
  "detailedPrdPath": "PRD.md",
  "technicalSpecPath": "TECH_SPEC.md",
  "userStories": [
    {
      "id": "US-001",
      "title": "Add status field to tasks table",
      "description": "As a developer, I need to store task status in the database.",
      "technicalSpecSection": "#32-us-001-add-status-field-to-tasks-table",
      "acceptanceCriteria": [
        "Add status column: 'pending' | 'in_progress' | 'done' (default 'pending')",
        "Generate and run migration successfully",
        "Lint passes (run project's lint command)",
        "Typecheck passes (run project's typecheck command)",
        "Unit tests pass"
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    },
    {
      "id": "US-002",
      "title": "Display status badge on task cards",
      "description": "As a user, I want to see task status at a glance.",
      "technicalSpecSection": "#33-us-002-display-status-badge-on-task-cards",
      "acceptanceCriteria": [
        "Each task card shows colored status badge",
        "Badge colors: gray=pending, blue=in_progress, green=done",
        "Lint passes (run project's lint command)",
        "Typecheck passes (run project's typecheck command)",
        "Unit tests pass",
        "E2E tests pass",
        "Verify in browser using dev-browser skill"
      ],
      "priority": 2,
      "passes": false,
      "notes": ""
    },
    {
      "id": "US-003",
      "title": "Add status toggle to task list rows",
      "description": "As a user, I want to change task status directly from the list.",
      "technicalSpecSection": "#34-us-003-add-status-toggle-to-task-list-rows",
      "acceptanceCriteria": [
        "Each row has status dropdown or toggle",
        "Changing status saves immediately",
        "UI updates without page refresh",
        "Lint passes (run project's lint command)",
        "Typecheck passes (run project's typecheck command)",
        "Unit tests pass",
        "E2E tests pass",
        "Verify in browser using dev-browser skill"
      ],
      "priority": 3,
      "passes": false,
      "notes": ""
    },
    {
      "id": "US-004",
      "title": "Filter tasks by status",
      "description": "As a user, I want to filter the list to see only certain statuses.",
      "technicalSpecSection": "#35-us-004-filter-tasks-by-status",
      "acceptanceCriteria": [
        "Filter dropdown: All | Pending | In Progress | Done",
        "Filter persists in URL params",
        "Lint passes (run project's lint command)",
        "Typecheck passes (run project's typecheck command)",
        "Unit tests pass",
        "E2E tests pass",
        "Verify in browser using dev-browser skill"
      ],
      "priority": 4,
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

**The ralph.sh script handles this automatically** when you run it, but if you are manually updating prd.json between runs, archive first.

---

## Checklist Before Saving

Before writing prd.json, verify:

- [ ] **Previous run archived** (if prd.json exists with different branchName, archive it first)
- [ ] `detailedPrdPath` field set to `PRD.md`
- [ ] `technicalSpecPath` field set to `TECH_SPEC.md` (if technical specs available)
- [ ] `technicalSpecSection` set for each user story using full markdown anchor (e.g., `#32-us-001-update-schemaorg-structured-data`)
- [ ] Each story is completable in one iteration (small enough)
- [ ] Stories are ordered by dependency (schema to backend to UI)
- [ ] Quality criteria present (lint, typecheck, unit tests for all stories; e2e tests and browser verification for UI stories)
- [ ] Acceptance criteria are verifiable (not vague)
- [ ] No story depends on a later story
