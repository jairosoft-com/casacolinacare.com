---
name: cc-azure-board-sync
description: "Synchronize a PRD.md or BRD_PRD.md and its canonical prd.json to Azure Boards. Creates one Feature for the source document, User Stories for each story, Tasks for each acceptance criterion, then writes Azure work item IDs back to prd.json. Triggers on: sync to azure boards, create azure work items, populate azure boards from prd."
user-invocable: true
---

# Azure Boards Synchronization Expert

You synchronize local requirements artifacts to Azure Boards using Azure DevOps MCP tools.

> **Schema contract:** See [prd-json-schema.md](../prd-json-schema.md) for the full prd.json field definitions shared with `cc-gen-prd-task`.

## Goal

Create one Azure Feature from a source requirements document, create Azure User Stories and Tasks from the canonical `prd.json`, establish hierarchy, update `prd.json` with Azure work item IDs, and return a synchronization report.

## The Job

### Step 1: Validate Inputs

Before doing any parsing, validate all prerequisites.

**Folder path**
- Require a folder path in the format `prds/{NNN}_{feature_name}/`
- Extract the folder name from the path and validate `^(\d{3})_(.+)$`
- Preserve the 3-digit feature number as a string
- Reject `000`
- If invalid, halt with a descriptive error and ask for a corrected folder path

**Markdown file**
- Require exactly one source requirements document in the folder
- Supported source filenames are `PRD.md` and `BRD_PRD.md`
- If both exist, require the user to specify which one to sync
- If neither exists, halt with an error

**JSON metadata**
- Require `prd.json` in the same folder
- Halt if the file does not exist, is unreadable, or is invalid JSON

**Azure connection**
- Verify Azure DevOps MCP tools are available
- Require organization and project name
- Validate the connection before attempting any work item creation

### Step 1.5: Detect Existing Azure Sync State

Before parsing, check `prd.json` for existing Azure metadata to determine sync mode.

**Detection logic:**
1. Check if root-level `azureWorkItemId` exists → Feature already synced
2. Check each user story for `azureWorkItemId` → Story already synced
3. Check each acceptance criterion for `azureWorkItemId` → Task already synced

**Classify items:**
- `alreadySynced`: Items with existing `azureWorkItemId` fields
- `needsCreation`: Items without `azureWorkItemId` fields

**Sync mode prompt:**
- If **all items** already synced: prompt user with options:
  - **Skip**: Do nothing, report current state
  - **Update**: Update existing Azure work items with current prd.json content
  - **Force recreate**: Delete Azure references from prd.json and create all items fresh
- If **some items** already synced (**Partial** mode): create only missing items by default (skip already-synced items)
- If **no items** synced (**Normal** mode): proceed normally (create all items)

### Step 2: Parse The Source Document And JSON

Use the source markdown for business context and the JSON file for executable structure.

**From the markdown document**
- Read the document overview, business objectives, success metrics, and narrative context
- Do not create separate Azure Features for individual business objectives
- Build a single Feature description from the document title, description, and summarized objectives or goals
- For each user story in `prd.json`, locate the matching story section in the markdown document using the story ID
- Support the story-section formats already present in local docs, including heading-style and bold-label story markers
- Extract fenced `gherkin` blocks only from the matching story section
- Ignore Gherkin in separate testing sections such as `Testing Requirements`, `Test Cases`, or other downstream validation sections
- If the story section has no inline Gherkin, synthesize Gherkin from that story's checklist acceptance criteria
- When synthesizing Gherkin, exclude quality-gate criteria such as lint, typecheck, unit tests, E2E tests, and browser verification
- If no behavioral criteria remain after filtering, leave the Azure User Story acceptanceCriteria field empty and log a warning

**From `prd.json`**
- Require root fields: `project`, `featureName`, `featureId`, `description`, `userStories`
- Require `featureId` to match the 3-digit folder feature number
- Require each user story to include:
  - `id` in format `US-{feature_number}-{seq}`
  - `title`
  - `description`
  - `acceptanceCriteria`
- Require each acceptance criterion to be an object:
  - `{ "id": "AC-{feature_number}-{seq}", "text": "..." }`
- Validate every User Story ID and Acceptance Criteria ID against the folder feature number
- Log warnings for mismatches only when the ID is parseable but inconsistent
- Halt for malformed canonical IDs or invalid JSON structure

**Canonical relationship rules**
- One source document maps to one Azure Feature
- Each JSON user story maps to one Azure User Story
- Each acceptance criterion maps to one Azure Task
- Each Task must carry an explicit `parentStoryId` from the user story it came from

### Step 3: Build The Work Item Model

Construct a normalized in-memory model before calling Azure.

```text
Feature
  sourceDocumentPath
  featureId
  featureName
  description
  businessContextSummary

UserStory
  id
  title
  description
  priority
  technicalSpecSection
  acceptanceCriteriaGherkin
  gherkinSource

Task
  id
  text
  parentStoryId
```

**Feature mapping**
- Create exactly one Azure Feature
- Title format: `{featureId}: {featureName}`
- Description includes the source document summary plus business objectives or goals in Markdown

**User Story mapping**
- Title format: `{story.id}: {story.title}`
- Description comes from the story description
- Include story priority when available
- Acceptance Criteria field comes from `acceptanceCriteriaGherkin`
- Track whether the Gherkin payload was `extracted`, `synthesized`, or `empty`

**Task mapping**
- Title format: `{criterion.id}: {criterion.text}`
- Description comes from the criterion text
- Parent linkage comes from the stored `parentStoryId`, never from inferring a parent from AC numbering

### Step 4: Create Azure Work Items

Create work items in this order:

1. Feature (skip if already synced and not in Update mode)
2. User Stories (skip items with existing `azureWorkItemId` unless in Update mode)
3. Tasks (skip items with existing `azureWorkItemId` unless in Update mode)

**Sync mode behavior:**
- **Normal/Create mode:** Only create items classified as `needsCreation` in Step 1.5
- **Update mode:** Update existing Azure work items with current title, description, and synthesized or extracted acceptance criteria from the source files
- **Force recreate mode:** Create all items fresh (Azure references were already cleared in Step 1.5)

For each created or updated item:
- Capture the Azure work item ID
- Capture the Azure work item URL
- Store mapping from canonical source ID to Azure work item ID

**User Story create/update payload**
- When creating or updating a User Story work item, include the Azure `acceptanceCriteria` field if `acceptanceCriteriaGherkin` is non-empty
- If `acceptanceCriteriaGherkin` is empty, omit the Azure `acceptanceCriteria` field and log a warning
- In Update mode, overwrite the Azure `acceptanceCriteria` field for stories being updated using the current markdown-derived payload

If creation fails:
- Log the error with item type, source ID, title, and stage
- Continue where safe
- Skip children only when their required parent was not created

### Step 5: Establish Hierarchy

Create relationships using Azure MCP link tools.

- Link every Azure User Story to the single Azure Feature created for the source document
- Link every Azure Task to its parent Azure User Story using the stored `parentStoryId`
- **Skip link creation for items that were already synced** (they already have Azure hierarchy links)
- Do not derive parent story links from the AC ID pattern
- If a parent item is missing, log a warning and skip the link

### Step 6: Update `prd.json`

Preserve canonical IDs and add Azure metadata.

**Root level**
- Add `azureWorkItemId`
- Add `azureWorkItemUrl`
- Add `lastSyncedToAzure`
- Add `azureOrganization`
- Add `azureProject`

**User stories**
- Preserve each `id` unchanged
- Add `azureWorkItemId`
- Add `azureWorkItemUrl`

**Acceptance criteria**
- Preserve each criterion object and its `id` unchanged
- Add `azureWorkItemId`
- Add `azureWorkItemUrl`

**Formatting**
- Preserve unrelated fields
- Write JSON with 2-space indentation

### Step 7: Return A Sync Report

Return a Markdown report with:
- source folder
- source markdown file
- Azure organization and project
- **sync mode** (Normal / Update / Force recreate / Partial)
- counts for Feature, User Stories, Tasks, links, warnings, and errors
- **skip/create/update counts** (items skipped due to existing sync, items created, items updated)
- counts for User Stories using `extracted`, `synthesized`, or `empty` acceptance-criteria payloads
- mismatch count for feature-number validation
- JSON update status
- tables of created Azure items with source IDs and Azure URLs

## Checklist

Before running this skill, ensure:

- [ ] Folder path follows `prds/{NNN}_{feature_name}/`
- [ ] The folder contains `PRD.md` or `BRD_PRD.md`
- [ ] The folder contains canonical `prd.json`
- [ ] `prd.json.featureId` matches the folder feature number
- [ ] User Story IDs use `US-{feature_number}-{seq}`
- [ ] Acceptance Criteria IDs use `AC-{feature_number}-{seq}`
- [ ] Acceptance criteria are objects with `id` and `text`
- [ ] Source markdown contains inline Gherkin for a story, or the checklist criteria are sufficient to synthesize behavioral Gherkin
- [ ] Azure DevOps MCP access is configured

## Example

### Input Folder

`prds/006_about_founder_name/`

### Source Markdown

`BRD_PRD.md`

~~~markdown
### US-006-01: Update founder name in About page team section
**Description:** As a site visitor viewing the About page, I want to see the correct founder name so that I have accurate information about who runs the care home.

**Acceptance Criteria:**
- AC-006-01: The team array entry at index 0 has `name: 'Kriss Aseniero'`.
- AC-006-02: The string `Kriss Judd` does not appear anywhere in `src/app/about/page.tsx`.
- AC-006-03: Unit tests pass.
- AC-006-04: E2E tests pass.

```gherkin
Scenario: Correct founder name is displayed
  Given a site visitor opens the About page
  When the team section is rendered
  Then the founder name shown is "Kriss Aseniero"

Scenario: Old founder name is absent
  Given a site visitor opens the About page
  When the team section is rendered
  Then the page does not contain "Kriss Judd"
```
~~~

### Canonical JSON

```json
{
  "project": "CasaColinaCare",
  "featureName": "about-founder-name-correction",
  "featureId": "006",
  "description": "Correct founder name on the About page and supporting documentation.",
  "detailedPrdPath": "BRD_PRD.md",
  "technicalSpecPath": "TECH_SPEC.md",
  "userStories": [
    {
      "id": "US-006-01",
      "title": "Update founder name in About page team section",
      "description": "As a site visitor, I want to see the correct founder name so that I have accurate information.",
      "technicalSpecSection": "#31-us-006-01-update-founder-name-in-about-page-team-section",
      "acceptanceCriteria": [
        {
          "id": "AC-006-01",
          "text": "The About page team entry shows 'Kriss Aseniero'."
        },
        {
          "id": "AC-006-02",
          "text": "The string 'Kriss Judd' does not appear in src/app/about/page.tsx."
        }
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    }
  ]
}
```

### Expected Azure Shape

- One Feature: `006: about-founder-name-correction`
- One User Story: `US-006-01: Update founder name in About page team section`
- Two Tasks:
  - `AC-006-01: The About page team entry shows 'Kriss Aseniero'.`
  - `AC-006-02: The string 'Kriss Judd' does not appear in src/app/about/page.tsx.`

### Expected Azure User Story Acceptance Criteria Field

For `US-006-01`, the Azure User Story `acceptanceCriteria` field should contain the inline Gherkin from the markdown story section.

If a different story has no inline Gherkin, the skill should synthesize Gherkin from its behavioral checklist criteria and exclude quality-gate lines such as lint, typecheck, unit tests, E2E tests, and browser verification.

### Expected JSON Enrichment

```json
{
  "featureId": "006",
  "azureWorkItemId": 200268,
  "azureWorkItemUrl": "https://dev.azure.com/example/project/_workitems/edit/200268",
  "lastSyncedToAzure": "2026-03-09T12:00:00Z",
  "azureOrganization": "example",
  "azureProject": "CasaColinaCare.com",
  "userStories": [
    {
      "id": "US-006-01",
      "azureWorkItemId": 200269,
      "azureWorkItemUrl": "https://dev.azure.com/example/project/_workitems/edit/200269",
      "acceptanceCriteria": [
        {
          "id": "AC-006-01",
          "text": "The About page team entry shows 'Kriss Aseniero'.",
          "azureWorkItemId": 200270,
          "azureWorkItemUrl": "https://dev.azure.com/example/project/_workitems/edit/200270"
        }
      ]
    }
  ]
}
```

## Error Handling

- Invalid folder path: halt and request a corrected folder path
- Missing or invalid source markdown file: halt
- Missing or invalid `prd.json`: halt
- Invalid canonical IDs: halt if malformed, warn if parseable but mismatched
- Missing inline Gherkin: synthesize from behavioral checklist criteria when possible
- Stories with only quality-gate criteria: leave Azure User Story acceptanceCriteria empty and warn
- Azure work item creation failure: log and continue where safe
- JSON write failure: report failure but keep Azure creation results
