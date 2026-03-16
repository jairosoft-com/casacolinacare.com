# prd.json Schema Contract

This document defines the canonical schema for `prd.json`, the shared contract between `cc-gen-prd-task` (producer) and `cc-azure-board-sync` (consumer).

---

## Root Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `project` | string | Yes | Project name (e.g., "CasaColinaCare") |
| `featureName` | string | Yes | Feature name in kebab-case, prefixed with `ralph/` for branch naming |
| `featureId` | string | Yes | 3-digit feature number from folder name, preserving leading zeros (e.g., "006", "010") |
| `description` | string | Yes | Feature description from PRD title/intro |
| `detailedPrdPath` | string | Yes | Source document filename: `PRD.md` or `BRD_PRD.md` |
| `technicalSpecPath` | string | No | Path to tech spec, typically `TECH_SPEC.md` |
| `userStories` | array | Yes | Array of User Story objects (see below) |

### Azure Sync Fields (added by cc-azure-board-sync)

| Field | Type | Description |
|-------|------|-------------|
| `azureWorkItemId` | number | Azure Feature work item ID |
| `azureWorkItemUrl` | string | Azure Feature work item URL |
| `lastSyncedToAzure` | string | ISO 8601 timestamp of last sync |
| `azureOrganization` | string | Azure DevOps organization name |
| `azureProject` | string | Azure DevOps project name |

---

## User Story Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Format: `US-{feature_number}-{seq}` (e.g., "US-006-01") |
| `title` | string | Yes | Story title from PRD heading |
| `description` | string | Yes | "As a [user], I want [feature] so that [benefit]" |
| `technicalSpecSection` | string | No | Markdown anchor to TECH_SPEC.md section (e.g., "#31-us-006-01-story-title") |
| `acceptanceCriteria` | array | Yes | Array of Acceptance Criteria objects (see below) |
| `priority` | number | Yes | Execution order (1-based, dependency-ordered) |
| `passes` | boolean | Yes | Whether story passes all criteria. Always `false` when generated |
| `notes` | string | Yes | Execution notes. Always `""` when generated |

### Azure Sync Fields (added by cc-azure-board-sync)

| Field | Type | Description |
|-------|------|-------------|
| `azureWorkItemId` | number | Azure User Story work item ID |
| `azureWorkItemUrl` | string | Azure User Story work item URL |

---

## Acceptance Criteria Object

**All acceptance criteria MUST be objects with `id` and `text` fields.** String-based criteria are not valid.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Format: `AC-{feature_number}-{seq}` with global sequential numbering |
| `text` | string | Yes | Verifiable criterion text |
| `passes` | boolean | Yes | Whether this criterion has been verified. Always `false` when generated |

### Azure Sync Fields (added by cc-azure-board-sync)

| Field | Type | Description |
|-------|------|-------------|
| `azureWorkItemId` | number | Azure Task work item ID |
| `azureWorkItemUrl` | string | Azure Task work item URL |

---

## ID Constraints

- **Feature ID:** 3-digit string preserving leading zeros (e.g., "006", not "6")
- **User Story IDs:** `US-{featureId}-{seq}` where `{seq}` is 2-digit zero-padded
- **AC IDs:** `AC-{featureId}-{seq}` with **global** sequential numbering across all stories (does NOT reset per story)
- All IDs in a single prd.json must use the same `featureId`

---

## Canonical Example

From `prds/006_about_founder_name/prd.json`:

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
          "text": "The About page team entry shows 'Kriss Aseniero'.",
          "passes": false
        },
        {
          "id": "AC-006-02",
          "text": "The string 'Kriss Judd' does not appear in src/app/about/page.tsx.",
          "passes": false
        }
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    }
  ]
}
```

### With Azure Sync Fields

After `cc-azure-board-sync` runs, the same file gains Azure metadata:

```json
{
  "featureId": "006",
  "azureWorkItemId": 200268,
  "azureWorkItemUrl": "https://dev.azure.com/jairo/CasaColinaCare.com/_workitems/edit/200268",
  "lastSyncedToAzure": "2026-03-06T20:42:30Z",
  "azureOrganization": "jairo",
  "azureProject": "CasaColinaCare.com",
  "userStories": [
    {
      "id": "US-006-01",
      "azureWorkItemId": 200269,
      "azureWorkItemUrl": "https://dev.azure.com/jairo/CasaColinaCare.com/_workitems/edit/200269",
      "acceptanceCriteria": [
        {
          "id": "AC-006-01",
          "text": "The About page team entry shows 'Kriss Aseniero'.",
          "passes": false,
          "azureWorkItemId": 200270,
          "azureWorkItemUrl": "https://dev.azure.com/jairo/CasaColinaCare.com/_workitems/edit/200270"
        }
      ]
    }
  ]
}
```
