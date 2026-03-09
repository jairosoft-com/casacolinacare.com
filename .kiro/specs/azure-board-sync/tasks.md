# Implementation Plan: Azure Board Sync

**Status:** ✅ COMPLETED

**Deliverable:** `.claude/skills/cc-azure-board-sync/SKILL.md` - A fully functional Claude Skill for synchronizing BRD/PRD markdown files AND JSON metadata files to Azure Boards work items, with bidirectional tracking via JSON file updates.

## Overview

This plan outlines the tasks for creating the azure-board-sync Claude Skill. All functionality has been completed. The deliverable is a SKILL.md file at `.claude/skills/cc-azure-board-sync/SKILL.md` that provides comprehensive system prompt instructions for Claude to synchronize BOTH BRD/PRD markdown files AND JSON metadata files to Azure Boards work items using Azure DevOps MCP tools, then update the JSON file with Azure work item IDs.

This is a documentation/prompt engineering task to create a structured SKILL.md file following the Agent Skills Specification - NOT a code implementation.

## Tasks

- [x] 1. Create SKILL.md file structure with frontmatter
  - Create directory `.claude/skills/cc-azure-board/`
  - Create `SKILL.md` file with YAML frontmatter
  - Set `name: cc-azure-board` in frontmatter
  - Set `user-invocable: true` in frontmatter
  - Write description including keywords: "Azure Boards", "BRD", "PRD", "work items"
  - Add trigger phrases: "sync to azure boards", "create azure work items", "populate azure boards from prd"
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 11.1_

- [x] 2. Write Role and Goal sections
  - [x] 2.1 Write Role section defining Claude's persona
    - Define role as "Azure Boards Synchronization Expert"
    - List expertise areas: BRD/PRD parsing, work item mapping, MCP tools, traceability, error handling
    - Use second person ("You are...", "You specialize in...")
    - _Requirements: 11.2, 11.3_
  
  - [x] 2.2 Write Goal section
    - State primary objective: Transform BRD/PRD markdown files into Azure Boards work items
    - Keep concise (1-2 sentences)
    - _Requirements: 11.3_

- [x] 3. Write The Job section with step-by-step instructions
  - [x] 3.1 Write Step 1: Validate Prerequisites
    - Instruct Claude to verify file path provided
    - Instruct Claude to check file exists and is readable
    - Instruct Claude to verify Azure MCP tools available
    - Instruct Claude to verify Azure org/project names provided
    - Instruct Claude to test connection using `mcp_ado_core_list_projects`
    - Include error handling: halt on failure with clear message
    - _Requirements: 2.1, 2.6, 3.1, 3.2, 7.1, 7.2, 7.3, 7.4_
  
  - [x] 3.2 Write Step 2: Parse the BRD/PRD File
    - Instruct Claude to read markdown file content
    - Instruct Claude to extract Business Objectives (OBJ-XX or GOAL-XX format)
    - Instruct Claude to extract User Stories (US-XXX format with "As a... I want... so that...")
    - Instruct Claude to extract Acceptance Criteria (checkbox lists under stories)
    - Instruct Claude to extract "Validates:" field from user stories
    - Instruct Claude to handle both unified and separate BRD/PRD files
    - Include validation for user story format
    - Include error handling: log warnings for invalid format, continue with partial data
    - ✅ UPDATED: Added JSON metadata file parsing (see tasks 10-11)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15, 6.2, 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [x] 3.3 Write Step 3: Map Requirements to Work Items
    - Instruct Claude to map Business Objectives to Features
    - Instruct Claude to map User Stories to User Stories
    - Instruct Claude to map Acceptance Criteria to Tasks
    - Specify title format: "{sourceId}: {title}" (max 255 chars)
    - Specify description format: full text in HTML format
    - Specify state values: "New" for Features/Stories, "To Do" for Tasks
    - Specify tags: semicolon-separated, include "synced-from-prd"
    - Include validation rules: title length, required fields
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 6.3, 9.4, 9.5_
  
  - [x] 3.4 Write Step 4: Create Work Items in Azure Boards
    - Instruct Claude to use `mcp_ado_wit_create_work_item` for each work item
    - Provide parameter examples for Features (type, title, description, state, tags)
    - Provide parameter examples for User Stories (include acceptanceCriteria field)
    - Provide parameter examples for Tasks
    - Instruct Claude to capture work item ID and URL from responses
    - Instruct Claude to store mapping: sourceId → azureWorkItemId
    - Include error handling: log error with details, continue with remaining items
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7, 6.3, 9.1, 9.2_
  
  - [x] 3.5 Write Step 5: Establish Parent-Child Relationships
    - Instruct Claude to link User Stories to Features using "Validates:" field
    - Instruct Claude to link Tasks to User Stories using task ID pattern (AC-XXX-XX → US-XXX)
    - Instruct Claude to use `mcp_ado_wit_work_items_link` tool
    - Specify link type: "System.LinkTypes.Hierarchy-Reverse"
    - Instruct Claude to validate parent exists before creating link
    - Include error handling: log warning if parent not found, skip link, continue
    - Include error handling: log warning if link creation fails, continue
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 6.4, 9.3_
  
  - [x] 3.6 Write Step 6: Generate Synchronization Report
    - Instruct Claude to create markdown report with timestamp and source file
    - Specify Summary section: counts of Features, User Stories, Tasks, Links, Errors
    - Specify Created Work Items section: tables with Source ID, Azure ID, Title, Parent, URL
    - Specify Errors section: table with Item, Type, Stage, Error Message
    - Specify Warnings section: table with Item, Type, Issue
    - Specify Next Steps section: actionable guidance for user
    - ✅ UPDATED: Added JSON file update status to report (see task 14)
    - _Requirements: 6.5, 7.7, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.6, 9.7, 13.11_

- [x] 3.7 Write Step 6.5: Update JSON Metadata File with Azure Work Item IDs
    - Instruct Claude to read original JSON file content
    - Instruct Claude to add `azureWorkItemId` and `azureWorkItemUrl` to root level (Feature)
    - Instruct Claude to add `azureWorkItemId` and `azureWorkItemUrl` to each user story in `userStories[]` array
    - Instruct Claude to convert `acceptanceCriteria` strings to objects with `text`, `azureWorkItemId`, `azureWorkItemUrl`
    - Instruct Claude to add synchronization metadata: `lastSyncedToAzure`, `azureOrganization`, `azureProject`
    - Instruct Claude to write updated JSON back to file with 2-space indentation
    - Include error handling: log error if write fails but don't fail entire sync
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9_

- [x] 4. Write Checklist section
  - List prerequisite: BRD/PRD markdown file with structured requirements
  - List prerequisite: File contains Business Objectives (OBJ-XX or GOAL-XX)
  - List prerequisite: File contains User Stories (US-XXX)
  - List prerequisite: File contains Acceptance Criteria (AC-XXX-XX)
  - List prerequisite: Azure DevOps MCP server installed and configured
  - List prerequisite: Personal Access Token with Work Items permissions
  - List prerequisite: Azure DevOps organization name known
  - List prerequisite: Azure DevOps project name known
  - List prerequisite: Project exists and user has access
  - Use checkbox format `- [ ]` for each item
  - ✅ UPDATED: Added JSON metadata file prerequisite and write permissions (see task 15)
  - _Requirements: 11.5, 12.8_

- [x] 5. Write Examples section
  - [x] 5.1 Write Example 1: Basic BRD/PRD Sync (happy path)
    - Show sample input: file path, organization, project
    - Show sample BRD/PRD content with objectives, stories, criteria
    - Show expected output: complete synchronization report with all work items
    - Include work item IDs, URLs, and summary counts
    - ✅ UPDATED: Added JSON file input and JSON before/after sync (see tasks 16, 21)
    - _Requirements: 6.6, 6.7, 11.7, 12.9, 13.10_
  
  - [x] 5.2 Write Example 2: Handling Errors (error case)
    - Show sample input: file with missing parent objective reference
    - Show expected output: report with warnings about missing parent
    - Demonstrate that work item is created but not linked
    - _Requirements: 6.6, 6.7, 6.8, 11.7_

  - [x] 5.3 Write Example 3: JSON File Update (new example)
    - Show sample JSON file structure before synchronization
    - Show sample JSON file structure after synchronization with Azure work item IDs
    - Demonstrate `azureWorkItemId` and `azureWorkItemUrl` fields added at all levels
    - Show `lastSyncedToAzure` timestamp and Azure project metadata
    - _Requirements: 13.10, 12.9_

- [x] 6. Document Azure MCP Tool Usage
  - [x] 6.1 Document mcp_ado_core_list_projects tool
    - Purpose: Verify connection and list projects
    - Parameters: organization
    - Expected response format
    - Error conditions
    - _Requirements: 10.1, 10.4, 10.5_
  
  - [x] 6.2 Document mcp_ado_wit_create_work_item tool
    - Purpose: Create work items (Feature, User Story, Task)
    - Parameters: organization, project, type, title, description, state, tags, acceptanceCriteria
    - Expected response format with id, url, _links.html.href
    - Error conditions
    - _Requirements: 10.1, 10.2, 10.5, 10.6_
  
  - [x] 6.3 Document mcp_ado_wit_work_items_link tool
    - Purpose: Create parent-child relationships
    - Parameters: organization, project, sourceId, targetId, linkType, comment
    - Expected response format
    - Error conditions
    - _Requirements: 10.1, 10.3, 10.5, 10.6_
  
  - [x] 6.4 Document prerequisites and troubleshooting
    - Authentication requirements (PAT with Work Items permissions)
    - Environment variables (AZURE_DEVOPS_PAT, AZURE_DEVOPS_ORG)
    - Common issues: connection failures, permission errors, invalid work item types
    - Troubleshooting guidance
    - _Requirements: 10.5, 10.7_

- [x] 7. Validate SKILL.md structure
  - Verify file is at correct path: `.claude/skills/cc-azure-board/SKILL.md`
  - Verify frontmatter has all required fields
  - Verify markdown heading hierarchy is valid (no skipped levels)
  - Verify all required sections present: Role, Goal, The Job, Checklist, Examples
  - Verify job steps are clear and actionable
  - Verify examples demonstrate typical usage
  - _Requirements: 1.1, 1.6, 1.7, 11.4, 11.6_

- [x] 8. Create config file for spec
  - Create `.kiro/specs/azure-board-sync/.config.kiro` file
  - Set specId to unique UUID
  - Set workflowType to "requirements-first"
  - Set specType to "feature"
  - _Workflow requirement: Config File Reference_

- [x] 9. Checkpoint - Review SKILL.md completeness
  - Ensure all tests pass, ask the user if questions arise.

## New Requirement: Support GUID-based IDs from PRD Generation Skills

The PRD generation skills (cc-gen-brd-prd, cc-gen-prd, cc-gen-prd-lite, cc-gen-prd-task) are being updated to generate GUIDs for feature IDs and user story IDs instead of sequential numbers. The azure-board-sync skill already supports GUIDs in the JSON metadata file, but the SKILL.md documentation should be updated to reflect that GUIDs are now the standard format.

- [x] 21. Update SKILL.md examples to show GUID format
  - Update Example 1 to show featureId as GUID (e.g., "a1b2c3d4-e5f6-7890-abcd-ef1234567890")
  - Update Example 1 to show user story id as GUID (e.g., "b2c3d4e5-f6a7-8901-bcde-f12345678901")
  - Update Example 3 JSON before/after to use GUID format for featureId and user story ids
  - Add note that GUIDs are the standard format generated by PRD skills
  - Document that sequential IDs (001, 002, US-001) are still supported for backward compatibility
  - _Requirements: 12.2, 12.3, 12.8, 12.9_

## Remaining Work

### Phase 1: Add JSON Metadata File Support (Requirements 12.1-12.10)

- [x] 10. Update Step 1 (Validation) to require JSON metadata file
  - Add instruction to check for JSON file in same directory as markdown
  - Add auto-detection logic: look for `prd.json` or `{markdown_basename}_prd.json`
  - Add instruction to prompt user for JSON file path if not found
  - Add validation that JSON file exists and is readable
  - Add error handling: halt if JSON file missing or unreadable
  - _Requirements: 2.9, 2.10, 12.1_

- [x] 11. Update Step 2 (Parsing) to parse JSON metadata file
  - Add instruction to parse JSON file structure
  - Add validation for required JSON fields: `project`, `featureName`, `featureId`, `userStories[]`
  - Add instruction to extract project metadata from JSON
  - Add instruction to extract user stories from JSON `userStories[]` array
  - Add instruction to extract acceptance criteria from JSON (each user story's `acceptanceCriteria[]`)
  - Add instruction to extract priority field from JSON user stories
  - Add instruction to merge markdown objectives with JSON user stories
  - Add error handling: halt if JSON is malformed or missing required fields
  - _Requirements: 2.11, 2.12, 2.13, 2.14, 2.15, 12.2, 12.3, 12.4, 12.5_

- [x] 12. Update Step 3 (Mapping) to use JSON metadata in work items
  - Add instruction to include JSON `featureId` and `featureName` in work item tags
  - Add instruction to use JSON `priority` field for User Story work items
  - Update tag format to include feature metadata: "synced-from-prd;feature-{featureId}"
  - _Requirements: 12.6, 12.7_

### Phase 2: Add JSON File Update Functionality (Requirements 13.1-13.11)

- [x] 13. Implement Step 6.5: Update JSON File with Azure Work Item IDs
  - This is the new task 3.7 defined above
  - Write complete instructions for JSON file update workflow
  - Include before/after JSON structure examples
  - _Requirements: 13.1-13.9_

- [x] 14. Update Step 7 (Reporting) to include JSON update status
  - Add "JSON File Update" section to report template
  - Show success/failure status of JSON file write
  - List counts of IDs added (Feature, User Stories, Tasks)
  - Include JSON file path in report
  - Show timestamp of JSON update
  - _Requirements: 13.11_

### Phase 3: Update Documentation and Examples

- [x] 15. Update Checklist section with JSON requirements
  - Add checklist item: "You have a JSON metadata file (prd.json) with user story data"
  - Add checklist item: "The JSON file contains required fields: project, featureName, featureId, userStories[]"
  - Add checklist item: "You have write permissions to update the JSON file"
  - _Requirements: 12.8_

- [x] 16. Update Example 1 to show dual-file input
  - Add JSON file path to input section
  - Show sample JSON file content alongside markdown
  - Update expected output to show JSON update success
  - _Requirements: 12.9, 13.10_

- [x] 17. Create Example 3: JSON File Before/After
  - This is the new task 5.3 defined above
  - Show complete JSON structure transformation
  - _Requirements: 13.10_

- [x] 18. Update SKILL.md description to mention JSON files
  - Update frontmatter description to include "JSON metadata files"
  - Update trigger phrases if needed
  - Update Role section to mention JSON parsing expertise

### Phase 4: Final Validation

- [x] 19. Validate updated SKILL.md structure
  - Verify all new sections are properly formatted
  - Verify markdown heading hierarchy remains valid
  - Verify JSON examples are valid JSON
  - Verify all requirements 12 and 13 are addressed
  - Test with sample JSON files

- [x] 20. Update requirements.md status markers
  - Mark Requirements 12.1-12.10 as completed
  - Mark Requirements 13.1-13.11 as completed
  - Update overall implementation status to "COMPLETED"

## Notes

- This is a documentation task, not a code implementation
- The SKILL.md file is a system prompt that instructs Claude on how to perform the synchronization
- Testing involves validating SKILL.md structure and manually invoking the skill with sample files
- The skill uses Azure DevOps MCP tools: mcp_ado_core_list_projects, mcp_ado_wit_create_work_item, mcp_ado_wit_work_items_link
- All tasks reference specific requirements for traceability
- Follow the Agent Skills Specification (https://agentskills.io/specification) for SKILL.md format

## Current Status Summary

**✅ ALL TASKS COMPLETED:**

The azure-board-sync Claude Skill is now fully implemented with:
- Complete SKILL.md structure with frontmatter, Role, Goal sections
- Full workflow for dual-file synchronization (markdown + JSON)
- JSON metadata file parsing and validation
- JSON file update with Azure work item IDs for bidirectional tracking
- Updated checklist with JSON prerequisites
- 3 comprehensive examples (happy path, error handling, JSON transformation)
- Azure MCP tool documentation (3 tools)
- Config file created

**Key Features Implemented:**
1. Dual-source parsing: Markdown for business objectives, JSON for user stories
2. Work item creation with feature metadata tags
3. Bidirectional tracking: JSON files updated with Azure work item IDs
4. Comprehensive error handling and reporting
5. Complete documentation with examples

The skill is ready for use and testing.
