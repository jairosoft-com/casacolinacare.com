# Requirements Document

## Introduction

The azure-board-sync feature is a Claude Skill that automates the creation of Features, User Stories, and Tasks in Azure Boards from BRD/PRD markdown files and JSON metadata files. This skill eliminates manual work item creation by parsing structured requirement documents and using Azure DevOps MCP tools to create corresponding work items with proper hierarchy and traceability.

The skill requires TWO input files:
1. **Markdown file** (e.g., `BRD_PRD.md` or `prd.md`) - Contains business objectives, user stories, and acceptance criteria in narrative format
2. **JSON metadata file** (e.g., `prd.json`) - Contains structured user story data with IDs, titles, descriptions, and acceptance criteria

**Key Mapping Principle:** One BRD/PRD or PRD document is mapped to ONE Feature work item in Azure Boards. The business objectives from the document are included in the Feature's description field, not created as separate Feature work items.

After creating work items in Azure Boards, the skill updates the JSON metadata file with the Azure Board work item IDs, creating a bidirectional link between the local requirements and the Azure Board items.

The skill follows the established pattern of other Claude Skills in `.claude/skills/` (such as cc-gen-brd-prd, cc-gen-prd, cc-gen-prd-lite) and provides a user-invocable command that reads both files, extracts requirements, synchronizes them to Azure Boards, and updates the JSON file with work item IDs.

**Implementation Status:** ✅ COMPLETED - All requirements implemented including JSON metadata file support and JSON update functionality

## Glossary

- **Azure_Board_Sync_Skill**: The Claude Skill that orchestrates the synchronization workflow from BRD/PRD files to Azure Boards
- **SKILL_File**: The `.claude/skills/cc-azure-board/SKILL.md` file containing frontmatter, role, goal, and job steps
- **BRD_PRD_Parser**: Skill component that extracts business objectives, user stories, and acceptance criteria from both markdown files and JSON metadata files
- **JSON_Metadata_File**: Required JSON file (e.g., `prd.json`) containing structured user story data with fields like id (GUID), title, description, acceptanceCriteria, priority, and featureId (GUID). This file is updated with Azure Board work item IDs after synchronization.
- **Markdown_Requirements_File**: Required markdown file (e.g., `BRD_PRD.md` or `prd.md`) containing business objectives, user stories, and acceptance criteria in narrative format
- **Azure_MCP_Client**: Skill component that invokes Azure DevOps MCP tools to create work items
- **Work_Item_Mapper**: Skill component that maps parsed requirements to Azure Boards work item types. One BRD/PRD document maps to ONE Feature work item, with business objectives included in the Feature description.
- **Hierarchy_Builder**: Skill component that establishes parent-child relationships between work items
- **JSON_Updater**: Skill component that writes Azure Board work item IDs back to the JSON metadata file after successful creation
- **Azure_DevOps_MCP**: Model Context Protocol tools for interacting with Azure DevOps services
- **Feature_Work_Item**: Azure Boards work item type representing the entire BRD/PRD document. One document = one Feature. Business objectives are included in the Feature description field using Markdown format.
- **User_Story_Work_Item**: Azure Boards work item type representing a user-facing requirement
- **Task_Work_Item**: Azure Boards work item type representing an acceptance criterion or implementation task
- **Skill_Frontmatter**: YAML metadata at the top of SKILL.md defining name, description, and user-invocable status
- **Work_Item_ID**: The unique identifier assigned by Azure Boards to a work item (e.g., 12345)
- **Feature_ID**: A Global Unique Identifier (GUID) generated for each BRD/PRD document to uniquely identify the feature across systems
- **User_Story_ID**: A Global Unique Identifier (GUID) generated for each user story to uniquely identify it across systems. Used as a tag in Azure Boards work items for traceability.

## Requirements

### Requirement 1: Create SKILL.md File Structure ✅

**User Story:** As a Claude user, I want a properly structured SKILL.md file, so that the azure-board-sync skill can be invoked and discovered like other skills.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ THE SKILL_File SHALL be located at `.claude/skills/cc-azure-board/SKILL.md`
2. ✅ THE SKILL_File SHALL include YAML frontmatter with name, description, and user-invocable fields
3. ✅ THE SKILL_File SHALL set `name: cc-azure-board` in the frontmatter
4. ✅ THE SKILL_File SHALL set `user-invocable: true` in the frontmatter
5. ✅ THE SKILL_File SHALL include a description that mentions "Azure Boards", "BRD", "PRD", and "work items"
6. ✅ THE SKILL_File SHALL follow the same structural pattern as other skills (Role, Goal, Job Steps sections)
7. ✅ THE SKILL_File SHALL use markdown formatting with proper heading hierarchy

### Requirement 2: Parse BRD/PRD Files ✅

**User Story:** As a developer using the skill, I want the skill to parse both BRD/PRD markdown files and JSON metadata files, so that business objectives and user stories are extracted for synchronization.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ WHEN the skill is invoked with a file path, THE BRD_PRD_Parser SHALL read the markdown file content
2. ✅ THE BRD_PRD_Parser SHALL identify and extract business objectives from sections containing "Business Objectives" or "Goals"
3. ✅ THE BRD_PRD_Parser SHALL extract user story IDs (GUID format) and their descriptions from the JSON metadata file
4. ✅ THE BRD_PRD_Parser SHALL extract acceptance criteria associated with each user story
5. ✅ THE BRD_PRD_Parser SHALL handle both unified BRD-PRD files and separate BRD/PRD files
6. ✅ IF the markdown file does not exist or is not readable, THEN THE BRD_PRD_Parser SHALL report an error and halt execution
7. ✅ THE BRD_PRD_Parser SHALL validate that user stories follow the "As a [role], I want [feature], so that [benefit]" format
8. ✅ THE BRD_PRD_Parser SHALL extract the "Validates:" field from user stories to map them to business objectives
9. ✅ THE BRD_PRD_Parser SHALL require a JSON metadata file (e.g., `prd.json`) in the same directory as the markdown file
10. ✅ IF the JSON metadata file does not exist, THE BRD_PRD_Parser SHALL report an error and halt execution
11. ✅ THE BRD_PRD_Parser SHALL parse JSON files with the structure: `{ project, featureName, featureId, description, userStories[] }` where featureId is a GUID
12. ✅ THE BRD_PRD_Parser SHALL extract user story data from JSON including: id (GUID), title, description, acceptanceCriteria[], priority, technicalSpecSection
13. ✅ THE BRD_PRD_Parser SHALL merge data from both markdown and JSON sources to create a complete requirements model
14. ✅ THE BRD_PRD_Parser SHALL use markdown for business objectives (OBJ-XX) and JSON for user story details
15. ✅ IF the JSON file is malformed or invalid, THE BRD_PRD_Parser SHALL report an error with details and halt execution

### Requirement 3: Invoke Azure DevOps MCP Tools ✅

**User Story:** As a developer using the skill, I want the skill to invoke Azure DevOps MCP tools, so that work items are created in Azure Boards programmatically.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ THE Azure_MCP_Client SHALL validate that Azure DevOps MCP tools are available before processing
2. ✅ THE Azure_MCP_Client SHALL use MCP tools to verify connection to the Azure DevOps organization and project
3. ✅ THE Azure_MCP_Client SHALL invoke MCP tools to create Feature work items with title and description fields
4. ✅ THE Azure_MCP_Client SHALL invoke MCP tools to create User Story work items with title and description fields
5. ✅ THE Azure_MCP_Client SHALL invoke MCP tools to create Task work items for acceptance criteria
6. ✅ THE Azure_MCP_Client SHALL capture and return work item IDs from MCP tool responses
7. ✅ IF an MCP tool invocation fails, THEN THE Azure_MCP_Client SHALL log the error with details and continue processing remaining items

### Requirement 4: Map Requirements to Work Items ✅

**User Story:** As a developer using the skill, I want the skill to map parsed requirements to Azure Boards work item types, so that the correct work item structure is created.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ WHEN a BRD/PRD document is parsed, THE Work_Item_Mapper SHALL map the entire document to ONE Feature_Work_Item
2. ✅ THE Work_Item_Mapper SHALL include all business objectives from the document in the Feature_Work_Item description field using Markdown format
3. ✅ WHEN a user story is parsed, THE Work_Item_Mapper SHALL map it to a User_Story_Work_Item
4. ✅ WHEN an acceptance criterion is parsed, THE Work_Item_Mapper SHALL map it to a Task_Work_Item
5. ✅ THE Work_Item_Mapper SHALL format Feature_Work_Item titles using the feature name from the JSON metadata file
6. ✅ THE Work_Item_Mapper SHALL format User_Story_Work_Item titles using the user story title from the JSON metadata file
7. ✅ THE Work_Item_Mapper SHALL include the user story ID (GUID) as a tag in User_Story_Work_Item for traceability
8. ✅ THE Work_Item_Mapper SHALL format Task_Work_Item titles using the acceptance criterion text
9. ✅ THE Work_Item_Mapper SHALL populate work item descriptions with full requirement text using Markdown format (not HTML)
10. ✅ THE Work_Item_Mapper SHALL set work item states to "New" for Features and User Stories, "To Do" for Tasks

### Requirement 5: Establish Work Item Hierarchy ✅

**User Story:** As a project manager, I want the skill to establish parent-child relationships between work items, so that traceability from features to user stories to tasks is maintained in Azure Boards.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ WHEN a User_Story_Work_Item is created, THE Hierarchy_Builder SHALL link it to the parent Feature_Work_Item (representing the entire BRD/PRD document) using Azure MCP tools
2. ✅ WHEN a Task_Work_Item is created, THE Hierarchy_Builder SHALL link it to its parent User_Story_Work_Item using Azure MCP tools
3. ✅ THE Hierarchy_Builder SHALL validate that parent work items exist before creating relationships
4. ✅ IF a parent work item does not exist, THEN THE Hierarchy_Builder SHALL log a warning and skip creating the relationship
5. ✅ THE Hierarchy_Builder SHALL use the "System.LinkTypes.Hierarchy-Reverse" link type for establishing work item hierarchy
6. ✅ THE Hierarchy_Builder SHALL verify successful relationship creation by checking MCP tool responses

### Requirement 6: Define Skill Workflow Steps ✅

**User Story:** As a Claude user, I want the SKILL.md file to define clear workflow steps, so that I understand what the skill does and can follow its execution.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ THE SKILL_File SHALL include a "The Job" section describing the overall workflow
2. ✅ THE SKILL_File SHALL define step-by-step instructions for parsing BRD/PRD files
3. ✅ THE SKILL_File SHALL define step-by-step instructions for creating work items using Azure MCP tools
4. ✅ THE SKILL_File SHALL define step-by-step instructions for establishing work item hierarchy
5. ✅ THE SKILL_File SHALL define step-by-step instructions for generating a synchronization report
6. ✅ THE SKILL_File SHALL include examples of expected input (BRD/PRD file paths)
7. ✅ THE SKILL_File SHALL include examples of expected output (work item IDs and summary)
8. ✅ THE SKILL_File SHALL document error handling procedures for common failure scenarios

### Requirement 7: Handle Skill Invocation ✅

**User Story:** As a Claude user, I want to invoke the skill with a simple command, so that I can synchronize BRD/PRD files to Azure Boards without manual work.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ WHEN the user invokes the skill, THE Azure_Board_Sync_Skill SHALL prompt for the BRD/PRD markdown file path if not provided
2. ✅ THE Azure_Board_Sync_Skill SHALL prompt for the JSON metadata file path if not provided, or auto-detect it based on the markdown file name
3. ✅ THE Azure_Board_Sync_Skill SHALL prompt for the Azure DevOps organization and project name if not configured
4. ✅ THE Azure_Board_Sync_Skill SHALL validate that the provided markdown file path exists before processing
5. ✅ THE Azure_Board_Sync_Skill SHALL validate that the provided JSON metadata file path exists before processing
6. ✅ THE Azure_Board_Sync_Skill SHALL display a confirmation message showing both files to be processed and target Azure project
7. ✅ THE Azure_Board_Sync_Skill SHALL execute the workflow steps in sequence: parse, map, create, link, update JSON, report
8. ✅ THE Azure_Board_Sync_Skill SHALL display progress updates during execution
9. ✅ THE Azure_Board_Sync_Skill SHALL display a final summary upon completion

### Requirement 8: Generate Synchronization Report ✅

**User Story:** As a project manager, I want the skill to generate a synchronization report, so that I can verify which work items were created and review any errors.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ WHEN synchronization completes, THE Azure_Board_Sync_Skill SHALL generate a markdown report
2. ✅ THE report SHALL include a summary section with counts of created Features, User Stories, and Tasks
3. ✅ THE report SHALL list all successfully created work items with their IDs, titles, and Azure Boards URLs
4. ✅ THE report SHALL list all errors encountered during synchronization with descriptive messages
5. ✅ THE report SHALL include the source BRD/PRD file path and timestamp
6. ✅ THE report SHALL be formatted as markdown with clear section headings
7. ✅ THE Azure_Board_Sync_Skill SHALL display the report to the user upon completion

### Requirement 9: Handle Errors Gracefully ✅

**User Story:** As a developer using the skill, I want the skill to handle errors gracefully, so that partial failures do not prevent other work items from being created.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ WHEN a work item creation fails, THE Azure_Board_Sync_Skill SHALL log the error with work item type, title, and error message
2. ✅ THE Azure_Board_Sync_Skill SHALL continue processing remaining work items after a creation failure
3. ✅ IF a parent work item creation fails, THEN THE Azure_Board_Sync_Skill SHALL skip creating child work items for that parent
4. ✅ THE Azure_Board_Sync_Skill SHALL validate required fields before attempting to create work items
5. ✅ IF required fields are missing, THEN THE Azure_Board_Sync_Skill SHALL log a validation error and skip that work item
6. ✅ THE Azure_Board_Sync_Skill SHALL include all errors in the final synchronization report
7. ✅ THE Azure_Board_Sync_Skill SHALL provide clear error messages that help users understand what went wrong

### Requirement 10: Document Azure MCP Tool Usage ✅

**User Story:** As a developer maintaining the skill, I want the SKILL.md file to document Azure MCP tool usage, so that I understand which MCP tools are required and how they are invoked.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ THE SKILL_File SHALL include a section listing required Azure DevOps MCP tools
2. ✅ THE SKILL_File SHALL document the MCP tool for creating work items with example invocation
3. ✅ THE SKILL_File SHALL document the MCP tool for creating work item relationships with example invocation
4. ✅ THE SKILL_File SHALL document the MCP tool for querying work items with example invocation
5. ✅ THE SKILL_File SHALL include prerequisites for using Azure MCP tools (authentication, permissions)
6. ✅ THE SKILL_File SHALL document expected MCP tool responses and error conditions
7. ✅ THE SKILL_File SHALL include troubleshooting guidance for common MCP tool issues

### Requirement 11: Follow Skill Pattern Conventions ✅

**User Story:** As a Claude user, I want the azure-board-sync skill to follow the same conventions as other skills, so that it feels consistent and familiar.

**Status:** COMPLETED

#### Acceptance Criteria

1. ✅ THE SKILL_File SHALL use the same frontmatter format as cc-gen-prd and cc-gen-brd-prd skills
2. ✅ THE SKILL_File SHALL include a "Role" section defining the skill's persona and expertise
3. ✅ THE SKILL_File SHALL include a "Goal" section stating the skill's primary objective
4. ✅ THE SKILL_File SHALL use markdown formatting consistent with other skills (headings, lists, code blocks)
5. ✅ THE SKILL_File SHALL include a "Checklist" section for pre-execution validation
6. ✅ THE SKILL_File SHALL use clear, actionable language in job steps
7. ✅ THE SKILL_File SHALL include examples demonstrating typical usage scenarios

### Requirement 12: Support JSON Metadata Files ✅

**User Story:** As a developer using the skill, I want the skill to require and process JSON metadata files alongside markdown BRD/PRD files, so that I can provide structured user story data in a machine-readable format and track Azure Board work item IDs.

**Status:** ✅ COMPLETED

#### Acceptance Criteria

1. ✅ 12.1 THE BRD_PRD_Parser SHALL require a JSON file with a name pattern matching the markdown file (e.g., `Sample_BRD_PRD.md` → `Sample_prd.json` or `prd.json`)
2. ✅ 12.2 THE BRD_PRD_Parser SHALL parse JSON files with the structure: `{ project, featureName, featureId, description, userStories[] }` where featureId is a Global Unique Identifier (GUID)
3. ✅ 12.3 THE BRD_PRD_Parser SHALL extract user story data from JSON including: id (GUID), title, description, acceptanceCriteria[], priority, technicalSpecSection
4. ✅ 12.4 THE BRD_PRD_Parser SHALL use both markdown (for business objectives) and JSON (for user story details) to create work items
5. ✅ 12.5 THE BRD_PRD_Parser SHALL map the entire BRD/PRD document to ONE Feature work item, with business objectives included in the Feature description
6. ✅ 12.6 THE BRD_PRD_Parser SHALL map JSON `acceptanceCriteria` array to Task work items
7. ✅ 12.7 THE BRD_PRD_Parser SHALL use JSON `priority` field to set work item priority in Azure Boards
8. ✅ 12.8 THE BRD_PRD_Parser SHALL include JSON `featureId` (GUID) in Feature work item tags for traceability
9. ✅ 12.9 THE BRD_PRD_Parser SHALL include JSON user story `id` (GUID) in User Story work item tags for traceability
10. ✅ 12.10 THE BRD_PRD_Parser SHALL include JSON `featureName` in work item tags
11. ✅ 12.11 THE SKILL_File SHALL document the required JSON metadata file format with example structure showing featureId and user story id as GUIDs
12. ✅ 12.12 THE SKILL_File SHALL include an example demonstrating synchronization with both markdown and JSON files
13. ✅ 12.13 IF the JSON file is malformed or invalid, THE BRD_PRD_Parser SHALL report a detailed error and halt execution

### Requirement 13: Update JSON File with Azure Board Work Item IDs ✅

**User Story:** As a developer using the skill, I want the skill to update the JSON metadata file with Azure Board work item IDs after creation, so that I can track which local requirements correspond to which Azure Board items.

**Status:** ✅ COMPLETED

#### Acceptance Criteria

1. ✅ 13.1 WHEN a Feature work item is created, THE JSON_Updater SHALL add an `azureWorkItemId` field to the JSON root level with the Feature work item ID
2. ✅ 13.2 WHEN a User Story work item is created, THE JSON_Updater SHALL add an `azureWorkItemId` field to the corresponding user story object in the `userStories[]` array
3. ✅ 13.3 WHEN Task work items are created for acceptance criteria, THE JSON_Updater SHALL add an `azureWorkItemId` field to each acceptance criterion string or convert it to an object with `text` and `azureWorkItemId` fields
4. ✅ 13.4 THE JSON_Updater SHALL preserve all existing JSON structure and data when adding work item IDs
5. ✅ 13.5 THE JSON_Updater SHALL write the updated JSON back to the same file path
6. ✅ 13.6 THE JSON_Updater SHALL format the JSON output with proper indentation (2 spaces) for readability
7. ✅ 13.7 THE JSON_Updater SHALL add an `azureWorkItemUrl` field alongside each `azureWorkItemId` for direct browser access
8. ✅ 13.8 THE JSON_Updater SHALL add a `lastSyncedToAzure` timestamp field at the root level with ISO 8601 format
9. ✅ 13.9 IF the JSON file write fails, THE JSON_Updater SHALL report an error but not fail the entire synchronization
10. ✅ 13.10 THE SKILL_File SHALL include an example showing the JSON structure before and after Azure Board synchronization
11. ✅ 13.11 THE synchronization report SHALL indicate whether the JSON file was successfully updated with work item IDs
