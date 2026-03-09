# Requirements Document

## Introduction

The cc-azure-board-sync skill currently uses a different ID format than all other skills in the .claude/skills directory. This inconsistency creates a mismatch when users generate PRDs with IDs like `US-006-01` using the PRD generation skills, then try to sync to Azure Boards using cc-azure-board-sync, which expects IDs like `US-001`.

This feature will update cc-azure-board-sync to use the same ID convention as other skills (cc-gen-prd, cc-gen-prd-lite, cc-gen-brd-prd, cc-gen-tech-spec), which includes a feature number extracted from the folder path in the format `{TYPE}-{feature_number}-{seq}`.

## Glossary

- **Skill**: A Claude AI skill definition file that provides specialized capabilities for document generation and synchronization
- **ID_Format**: The pattern used to identify requirements (User Stories, Acceptance Criteria, Objectives)
- **Feature_Number**: A 3-digit number extracted from the folder path (e.g., `006` from `prds/006_about_founder_name/`)
- **Azure_Boards**: Microsoft Azure DevOps work item tracking system
- **Work_Item**: An Azure Boards entity representing a Feature, User Story, or Task
- **cc-azure-board-sync**: The skill that synchronizes PRD documents to Azure Boards work items
- **PRD_Generator_Skills**: Skills that generate Product Requirements Documents (cc-gen-prd, cc-gen-prd-lite, cc-gen-brd-prd, cc-gen-tech-spec)
- **JSON_Metadata_File**: A JSON file containing structured user story data (typically prd.json)
- **Markdown_File**: A markdown document containing business objectives and requirements (typically BRD/PRD)
- **Bidirectional_Tracking**: The ability to link requirements to Azure work items and vice versa through stored IDs

## Requirements

### Requirement 1: Feature Number Extraction

**User Story:** As a developer using cc-azure-board-sync, I want the skill to extract feature numbers from folder paths, so that generated work item IDs match the IDs in my PRD documents.

#### Acceptance Criteria

1. WHEN a folder path is provided to cc-azure-board-sync, THE Skill SHALL extract the 3-digit feature number from the folder name
2. THE Skill SHALL validate that the folder name matches the pattern `{NNN}_{feature_name}` where NNN is exactly 3 digits
3. THE Skill SHALL preserve leading zeros in the feature number (e.g., "006" not "6")
4. IF the folder name does not match the required pattern, THEN THE Skill SHALL halt with a descriptive error message
5. THE Skill SHALL extract the feature number from the folder name portion only, not the full path
6. THE Skill SHALL validate that the numeric prefix is between 001 and 999

### Requirement 2: User Story ID Parsing

**User Story:** As a developer, I want cc-azure-board-sync to parse User Story IDs with feature numbers, so that it correctly identifies and processes user stories from PRD documents.

#### Acceptance Criteria

1. THE Skill SHALL parse User Story IDs in the format `US-{feature_number}-{seq}`
2. THE Skill SHALL extract the feature number from User Story IDs (e.g., `US-006-01` → feature number `006`)
3. THE Skill SHALL extract the sequence number from User Story IDs (e.g., `US-006-01` → sequence `01`)
4. WHEN parsing JSON metadata files, THE Skill SHALL validate that User Story IDs match the expected format
5. IF a User Story ID does not match the format, THEN THE Skill SHALL log a warning and continue processing
6. THE Skill SHALL validate that extracted feature numbers match the folder path feature number

### Requirement 3: Acceptance Criteria ID Parsing

**User Story:** As a developer, I want cc-azure-board-sync to parse Acceptance Criteria IDs with feature numbers, so that Tasks are created with correct IDs and parent relationships.

#### Acceptance Criteria

1. THE Skill SHALL parse Acceptance Criteria IDs in the format `AC-{feature_number}-{seq}`
2. THE Skill SHALL extract the feature number from Acceptance Criteria IDs (e.g., `AC-006-15` → feature number `006`)
3. THE Skill SHALL extract the sequence number from Acceptance Criteria IDs (e.g., `AC-006-15` → sequence `15`)
4. WHEN generating Acceptance Criteria IDs from JSON, THE Skill SHALL use the format `AC-{feature_number}-{seq}`
5. THE Skill SHALL use global sequential numbering for Acceptance Criteria across all user stories within a feature
6. THE Skill SHALL validate that extracted feature numbers match the folder path feature number

### Requirement 4: Folder Path Validation

**User Story:** As a developer, I want cc-azure-board-sync to validate folder paths before processing, so that I receive clear error messages if the path format is incorrect.

#### Acceptance Criteria

1. THE Skill SHALL validate the folder path format before parsing any files
2. THE Skill SHALL check that the folder name contains exactly 3 digits at the start
3. THE Skill SHALL verify the 3 digits are followed by an underscore character
4. THE Skill SHALL verify the numeric prefix is between 001 and 999
5. IF validation fails, THEN THE Skill SHALL display an error message with the expected pattern and the specific issue
6. THE Skill SHALL allow the user to retry with a corrected folder path after validation failure

### Requirement 5: Documentation Updates

**User Story:** As a developer, I want all examples and documentation in cc-azure-board-sync to use the new ID format, so that I understand how to structure my PRD documents correctly.

#### Acceptance Criteria

1. THE Skill SHALL update all example User Story IDs to use the format `US-{feature_number}-{seq}`
2. THE Skill SHALL update all example Acceptance Criteria IDs to use the format `AC-{feature_number}-{seq}`
3. THE Skill SHALL include examples showing folder path validation
4. THE Skill SHALL document the feature number extraction process
5. THE Skill SHALL update the JSON transformation examples to show the new ID format
6. THE Skill SHALL remove references to Business Objective ID parsing since one PRD maps to one feature

### Requirement 6: ID Format Consistency Validation

**User Story:** As a developer, I want cc-azure-board-sync to validate that all IDs in a document use consistent feature numbers, so that I catch errors before syncing to Azure Boards.

#### Acceptance Criteria

1. WHEN parsing a PRD document, THE Skill SHALL extract the feature number from the folder path
2. THE Skill SHALL validate that all User Story IDs contain the same feature number as the folder path
3. THE Skill SHALL validate that all Acceptance Criteria IDs contain the same feature number as the folder path
4. IF an ID contains a different feature number, THEN THE Skill SHALL log a warning with the mismatched ID
5. THE Skill SHALL continue processing after logging feature number mismatch warnings
6. THE Skill SHALL report the total count of IDs with mismatched feature numbers in the synchronization report

### Requirement 7: Error Messages and User Guidance

**User Story:** As a developer, I want clear error messages when ID formats are incorrect, so that I can quickly fix issues in my PRD documents.

#### Acceptance Criteria

1. WHEN a folder path validation fails, THE Skill SHALL display the expected pattern with an example
2. WHEN an ID format is invalid, THE Skill SHALL display the expected format for that ID type
3. THE Skill SHALL include the actual value that failed validation in error messages
4. THE Skill SHALL specify which file and line number contains the invalid ID when possible
5. THE Skill SHALL provide actionable guidance on how to fix the issue
6. THE Skill SHALL distinguish between errors that halt processing and warnings that allow continuation

### Requirement 8: JSON Metadata File Updates

**User Story:** As a developer, I want the JSON metadata file to be updated with Azure work item IDs using the new ID format, so that bidirectional tracking works correctly.

#### Acceptance Criteria

1. WHEN updating JSON metadata files, THE Skill SHALL preserve the original ID format in the `id` field
2. THE Skill SHALL add `azureWorkItemId` and `azureWorkItemUrl` fields to user stories with new format IDs
3. THE Skill SHALL add `azureWorkItemId` and `azureWorkItemUrl` fields to acceptance criteria with new format IDs
4. THE Skill SHALL add `azureWorkItemId` and `azureWorkItemUrl` fields to the root level for features with new format IDs
5. THE Skill SHALL maintain all existing fields when updating JSON files
6. THE Skill SHALL format the updated JSON with 2-space indentation for readability
