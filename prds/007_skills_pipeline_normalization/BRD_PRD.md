# Skills Pipeline Normalization

## Document Metadata

- **Feature ID**: 007
- **Feature Name**: skills_pipeline_normalization
- **Document Type**: BRD_PRD
- **Generated Date**: 2026-03-09

## Executive Summary

The local skill ecosystem has drifted into incompatible contracts. Different skills use conflicting filename conventions, conflicting ID formats, overlapping routing rules, and inconsistent sample artifacts. This feature normalizes the contract across document generation, tech-spec generation, JSON conversion, Azure Boards synchronization, and browser-verification guidance so that the skills can be used as one coherent pipeline.

## Business Objectives

### OBJ-007-01: Establish One Canonical Skill Contract
Standardize filenames, identifiers, and downstream handoffs so skill-generated artifacts can move from requirements to technical spec to JSON conversion to Azure Boards without translation errors.

### OBJ-007-02: Make Skill Selection Deterministic
Define clear boundaries between unified BRD/PRD generation, default PRD generation, advanced PRD generation, tech-spec generation, and Azure synchronization.

### OBJ-007-03: Remove Operational Friction
Eliminate avoidable setup noise and contradictory examples that slow down users and AI agents when using the skills.

## Scope

### In Scope

- Rename `cc-gen-tds` to `cc-gen-tech-spec`
- Standardize the canonical filenames `PRD.md`, `BRD_PRD.md`, `TECH_SPEC.md`, and `prd.json`
- Define deterministic routing between `cc-gen-prd-lite`, `cc-gen-prd`, and `cc-gen-brd-prd`
- Standardize `prd.json` on folder-based IDs and canonical acceptance-criteria objects
- Normalize `cc-azure-board-sync` to the same folder-based ID contract
- Align samples, templates, and supporting spec docs to the new contract
- Fix `dev-browser` path and startup guidance

### Out Of Scope

- Backward-compatibility support for legacy short-form IDs
- Backward-compatibility support for legacy Markdown filenames
- Migration of all historical `prds/` feature artifacts to the new format
- Changing the Azure work item type model beyond one source document mapping to one Azure Feature

## User Stories

### US-007-01: Rename and standardize the tech-spec skill
**Description:** As a user of the requirements pipeline, I want the technical-spec skill to use one stable name and one stable filename so that downstream references are unambiguous.

**Acceptance Criteria:**
- AC-007-01: The skill folder and frontmatter name use `cc-gen-tech-spec`.
- AC-007-02: The tech-spec skill outputs `TECH_SPEC.md`.
- AC-007-03: Cross-skill references no longer mention `cc-gen-tds` or `TDS.md`.
- AC-007-04: Examples and supporting docs reference `TECH_SPEC.md` consistently.

**Validates:** OBJ-007-01

### US-007-02: Make PRD skill selection deterministic
**Description:** As a user choosing a PRD generator, I want a clear default and clear escalation rules so that `cc-gen-prd-lite` and `cc-gen-prd` no longer overlap.

**Acceptance Criteria:**
- AC-007-05: `cc-gen-prd-lite` is documented as the default PRD skill for normal single-feature work.
- AC-007-06: `cc-gen-prd` is documented as the advanced PRD skill for multi-subsystem, migration-heavy, or high-ambiguity work.
- AC-007-07: `cc-gen-brd-prd` is documented as the unified strategic + tactical skill and outputs `BRD_PRD.md`.
- AC-007-08: Skill descriptions and “use when” guidance are consistent with those routing rules.

**Validates:** OBJ-007-02

### US-007-03: Normalize the `prd.json` contract
**Description:** As a downstream consumer of `prd.json`, I want a canonical JSON structure that preserves folder-based IDs so that tech-spec and Azure-sync tools do not need to renumber or infer relationships.

**Acceptance Criteria:**
- AC-007-09: `prd.json.userStories[].id` uses the canonical format `US-{feature_number}-{seq}`.
- AC-007-10: `prd.json.userStories[].acceptanceCriteria[]` uses object form with `id` and `text`.
- AC-007-11: `detailedPrdPath` is set to the actual source document name, either `PRD.md` or `BRD_PRD.md`.
- AC-007-12: `technicalSpecPath` is always `TECH_SPEC.md`.
- AC-007-13: `cc-gen-prd-task` preserves source IDs instead of renumbering them.

**Validates:** OBJ-007-01

### US-007-04: Normalize Azure-sync around one source document and canonical IDs
**Description:** As a user of Azure Boards synchronization, I want the sync skill to use the same folder-based IDs and document model as the generation skills so that work items are created predictably.

**Acceptance Criteria:**
- AC-007-14: `cc-azure-board-sync` validates the folder path before parsing files.
- AC-007-15: `cc-azure-board-sync` uses one source document to create one Azure Feature.
- AC-007-16: User Stories and Tasks in Azure use canonical folder-based IDs.
- AC-007-17: Task-to-story hierarchy is based on explicit parent story context, not inferred from AC numbering.
- AC-007-18: JSON enrichment preserves canonical IDs while adding Azure work item metadata.
- AC-007-19: Azure-sync samples and Kiro specs reference the same canonical contract.

**Validates:** OBJ-007-01

### US-007-05: Remove operational friction from dev-browser guidance
**Description:** As a user of `dev-browser`, I want the setup and path instructions to reflect the actual repo layout so that I can run the skill without unnecessary reinstall steps or path confusion.

**Acceptance Criteria:**
- AC-007-20: `dev-browser` examples reference `.claude/skills/dev-browser`.
- AC-007-21: The startup script no longer runs `npm install` unconditionally.
- AC-007-22: The skill documentation states that `node_modules/`, `profiles/`, and `tmp/` are runtime artifacts.

**Validates:** OBJ-007-03

## Functional Requirements

- FR-007-01: The skill ecosystem shall use `PRD.md`, `BRD_PRD.md`, `TECH_SPEC.md`, and `prd.json` as the only canonical artifact names.
- FR-007-02: The skill ecosystem shall use folder-based IDs in the format `TYPE-{feature_number}-{seq}` for generated requirement references.
- FR-007-03: The JSON conversion skill shall preserve canonical IDs exactly as written in the source requirements document.
- FR-007-04: The Azure synchronization skill shall map one source requirements document to one Azure Feature and use JSON user stories and acceptance criteria as the executable source structure.
- FR-007-05: The Azure synchronization skill shall preserve canonical IDs during JSON enrichment and add Azure metadata only.
- FR-007-06: The PRD-generation skills shall publish deterministic routing guidance so `cc-gen-prd-lite`, `cc-gen-prd`, and `cc-gen-brd-prd` are not interchangeable.

## Non-Functional Requirements

- NFR-007-01: All skill and sample documentation shall be internally consistent on filename and skill-name references.
- NFR-007-02: The normalized contract shall be understandable from the skill docs without requiring users to inspect historical Kiro specs.
- NFR-007-03: Canonical examples shall be sufficient for an implementer to produce matching artifacts without guessing IDs or filenames.

## Risks

- RISK-007-01: Historical feature artifacts still use legacy IDs and may continue to appear in repo search results.
- RISK-007-02: Parallel in-progress work on Azure-sync code and tests may temporarily reflect assumptions older than the final skill-doc contract.

## Success Metrics

- GOAL-007-01: Zero active skill docs in `.claude/skills/` reference `cc-gen-tds` or `TDS.md`.
- GOAL-007-02: Zero active skill docs in `.claude/skills/` use sequential story IDs such as `US-001` as the canonical output contract.
- GOAL-007-03: The active Azure-sync skill, its sample markdown, and its sample JSON all describe the same one-document, one-feature model.
- GOAL-007-04: `dev-browser` setup instructions match the actual repo path and no longer reinstall dependencies on every run.

---

## Verification Report

**Verified:** 2026-03-20 by Claude Code

All 22 acceptance criteria and 4 success metrics have been verified against the current codebase. PRD 007 is **fully implemented**.

### Acceptance Criteria Results

| Story | AC Range | Result |
|---|---|---|
| US-007-01: Rename tech-spec skill | AC-007-01..04 | 4/4 PASS |
| US-007-02: PRD skill routing | AC-007-05..08 | 4/4 PASS |
| US-007-03: prd.json contract | AC-007-09..13 | 5/5 PASS |
| US-007-04: Azure-sync normalization | AC-007-14..19 | 6/6 PASS |
| US-007-05: dev-browser friction | AC-007-20..22 | 3/3 PASS |

### Success Metrics Results

| Metric | Result | Evidence |
|---|---|---|
| GOAL-007-01 | PASS | `grep -r 'cc-gen-tds\|TDS.md' .claude/skills/` returns zero matches |
| GOAL-007-02 | PASS | `grep -r 'US-001' .claude/skills/*/SKILL.md` returns zero matches |
| GOAL-007-03 | PASS | Sample_prd.json and Sample_BRD_PRD.md both describe one-document one-feature model |
| GOAL-007-04 | PASS | `server.sh` conditionally checks `node_modules/` before `npm install` |

### Key Evidence

- `.claude/skills/cc-gen-tds/` does not exist; replaced by `.claude/skills/cc-gen-tech-spec/`
- All three PRD skills have distinct, non-overlapping descriptions in frontmatter
- `prd.json` schema enforces `US-{feature_number}-{seq}` and AC object format with `id` and `text`
- Azure-sync uses explicit `parentStoryId`, not inferred from AC numbering
- `dev-browser/server.sh` lines 19-24 wrap `npm install` in `if [[ ! -d node_modules ]]`
