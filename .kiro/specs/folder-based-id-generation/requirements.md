# Requirements Document

## Introduction

This document specifies requirements for implementing folder-based ID generation across four PRD generation skills (cc-gen-brd-prd, cc-gen-prd, cc-gen-prd-lite, cc-gen-tech-spec). The feature extracts a numeric prefix from the folder name and uses it to generate consistent, traceable IDs for all requirement artifacts (user stories, acceptance criteria, objectives, etc.).

## Glossary

- **ID_Generator**: The system component responsible for generating requirement IDs
- **Folder_Parser**: The system component that extracts numeric prefixes from folder paths
- **Feature_Number**: A 3-digit numeric identifier extracted directly from the folder prefix, preserving leading zeros (e.g., "006", "010", "099")
- **PRD_Skill**: Any of the four document generation skills (cc-gen-brd-prd, cc-gen-prd, cc-gen-prd-lite, cc-gen-tech-spec)
- **Folder_Prefix**: The 3-digit numeric value at the start of a folder name (e.g., "006" in "006_about_founder_name")
- **Requirement_ID**: A unique identifier for a requirement artifact following the pattern {TYPE}-{feature_number}-{seq}
- **Validation_Engine**: The system component that verifies folder name format compliance

## Requirements

### Requirement 1: Extract Feature Number from Folder Path

**User Story:** As a PRD generator, I want to extract the feature number from the folder path, so that I can generate consistent IDs for all requirements.

#### Acceptance Criteria

1. WHEN a folder path is provided, THE Folder_Parser SHALL extract the 3-digit numeric prefix from the folder name
2. WHEN the numeric prefix is extracted, THE Folder_Parser SHALL use it as-is to produce the Feature_Number (preserving leading zeros)
3. THE Folder_Parser SHALL use the regex pattern `^(\d{3})_` to extract the Folder_Prefix
4. WHEN the folder name is "006_about_founder_name", THE Folder_Parser SHALL produce Feature_Number "006"
5. WHEN the folder name is "010_payment_gateway", THE Folder_Parser SHALL produce Feature_Number "010"
6. WHEN the folder name is "099_final_feature", THE Folder_Parser SHALL produce Feature_Number "099"

### Requirement 2: Validate Folder Name Format

**User Story:** As a PRD generator, I want to validate the folder name format, so that I can prevent invalid ID generation.

#### Acceptance Criteria

1. THE Validation_Engine SHALL verify that the folder name starts with exactly 3 digits
2. THE Validation_Engine SHALL verify that the 3 digits are followed by an underscore character
3. WHEN the folder name does not match the pattern `{NNN}_{feature_name}`, THE Validation_Engine SHALL halt document generation
4. WHEN validation fails, THE Validation_Engine SHALL display an error message containing the expected pattern
5. WHEN validation fails, THE Validation_Engine SHALL display an example of a valid folder name
6. THE Validation_Engine SHALL verify that the Folder_Prefix is between 001 and 999 inclusive

### Requirement 3: Generate Requirement IDs

**User Story:** As a PRD generator, I want to generate requirement IDs based on the feature number, so that all IDs are traceable to the folder structure.

#### Acceptance Criteria

1. THE ID_Generator SHALL format Requirement_IDs using the pattern `{TYPE}-{feature_number}-{seq}`
2. THE ID_Generator SHALL format the sequential number as 2 digits with zero-padding
3. WHEN generating the first user story for Feature_Number "006", THE ID_Generator SHALL produce "US-006-01"
4. WHEN generating the tenth acceptance criterion for Feature_Number "006", THE ID_Generator SHALL produce "AC-006-10"
5. THE ID_Generator SHALL support the following ID types: OBJ, GOAL, US, AC, RISK, NFR, TC, FR
6. THE ID_Generator SHALL use global sequential numbering for acceptance criteria across all user stories
7. WHEN Feature_Number is "010" and sequential index is 5, THE ID_Generator SHALL produce IDs in the format "{TYPE}-010-05"

### Requirement 4: Prompt User for Folder Path

**User Story:** As a user, I want to be prompted for the folder path before document generation, so that the system can extract the feature number.

#### Acceptance Criteria

1. WHEN document generation begins, THE PRD_Skill SHALL prompt the user for the folder path
2. THE PRD_Skill SHALL display the prompt text "Where should this document be saved? (e.g., prd/006_about_founder_name/)"
3. WHEN the user provides a folder path, THE PRD_Skill SHALL pass it to the Folder_Parser
4. WHEN the folder path is invalid, THE PRD_Skill SHALL allow the user to retry with a corrected path
5. THE PRD_Skill SHALL not proceed with document generation until a valid folder path is provided

### Requirement 5: Update cc-gen-brd-prd Skill

**User Story:** As a user of cc-gen-brd-prd, I want all generated IDs to use folder-based numbering, so that my BRD-PRD documents have consistent traceability.

#### Acceptance Criteria

1. THE cc-gen-brd-prd skill SHALL generate Business Objective IDs using the format `OBJ-{feature_number}-{seq}`
2. THE cc-gen-brd-prd skill SHALL generate Goal IDs using the format `GOAL-{feature_number}-{seq}`
3. THE cc-gen-brd-prd skill SHALL generate User Story IDs using the format `US-{feature_number}-{seq}`
4. THE cc-gen-brd-prd skill SHALL generate Acceptance Criteria IDs using the format `AC-{feature_number}-{seq}` with global sequential numbering
5. THE cc-gen-brd-prd skill SHALL generate Risk IDs using the format `RISK-{feature_number}-{seq}`
6. THE cc-gen-brd-prd skill SHALL generate Non-Functional Requirement IDs using the format `NFR-{feature_number}-{seq}`
7. THE cc-gen-brd-prd skill SHALL generate Technical Constraint IDs using the format `TC-{feature_number}-{seq}`
8. THE cc-gen-brd-prd skill SHALL generate Functional Requirement IDs using the format `FR-{feature_number}-{seq}`
9. THE cc-gen-brd-prd skill SHALL set the featureId field in the JSON output to the Feature_Number

### Requirement 6: Update cc-gen-prd Skill

**User Story:** As a user of cc-gen-prd, I want all generated IDs to use folder-based numbering, so that my PRD documents have consistent traceability.

#### Acceptance Criteria

1. THE cc-gen-prd skill SHALL generate User Story IDs using the format `US-{feature_number}-{seq}`
2. THE cc-gen-prd skill SHALL generate Acceptance Criteria IDs using the format `AC-{feature_number}-{seq}` with global sequential numbering
3. THE cc-gen-prd skill SHALL generate Functional Requirement IDs using the format `FR-{feature_number}-{seq}`
4. THE cc-gen-prd skill SHALL prompt for folder path before document generation
5. THE cc-gen-prd skill SHALL validate the folder name format before generating IDs

### Requirement 7: Update cc-gen-prd-lite Skill

**User Story:** As a user of cc-gen-prd-lite, I want all generated IDs to use folder-based numbering, so that my streamlined PRD documents have consistent traceability.

#### Acceptance Criteria

1. THE cc-gen-prd-lite skill SHALL generate User Story IDs using the format `US-{feature_number}-{seq}`
2. THE cc-gen-prd-lite skill SHALL generate Acceptance Criteria IDs using the format `AC-{feature_number}-{seq}` with global sequential numbering
3. THE cc-gen-prd-lite skill SHALL generate Functional Requirement IDs using the format `FR-{feature_number}-{seq}`
4. THE cc-gen-prd-lite skill SHALL generate Non-Functional Requirement IDs using the format `NFR-{feature_number}-{seq}`
5. THE cc-gen-prd-lite skill SHALL set the Feature ID field in the Overview section to the Feature_Number
6. THE cc-gen-prd-lite skill SHALL prompt for folder path before document generation

### Requirement 8: Update cc-gen-tech-spec Skill

**User Story:** As a user of cc-gen-tech-spec, I want all generated IDs to use folder-based numbering, so that my technical specification documents have consistent traceability with the PRD.

#### Acceptance Criteria

1. WHEN a PRD exists with folder-based IDs, THE cc-gen-tech-spec skill SHALL extract the Feature_Number from existing Requirement_IDs
2. WHEN a PRD does not exist, THE cc-gen-tech-spec skill SHALL prompt the user for the folder path
3. THE cc-gen-tech-spec skill SHALL generate Technical Constraint IDs using the format `TC-{feature_number}-{seq}`
4. THE cc-gen-tech-spec skill SHALL generate Test Case IDs using the format `TC-{feature_number}-{seq}`
5. THE cc-gen-tech-spec skill SHALL reference existing User Story IDs from the PRD without modification

### Requirement 9: Display Error Messages

**User Story:** As a user, I want clear error messages when I provide an invalid folder name, so that I can quickly correct my input.

#### Acceptance Criteria

1. WHEN the folder name format is invalid, THE Validation_Engine SHALL display the text "Invalid folder name format"
2. WHEN the folder name format is invalid, THE Validation_Engine SHALL display the expected pattern "{NNN}_{feature_name}"
3. WHEN the folder name format is invalid, THE Validation_Engine SHALL display an example "006_about_founder_name"
4. WHEN the folder name format is invalid, THE Validation_Engine SHALL display the user's provided folder name
5. WHEN the folder name format is invalid, THE Validation_Engine SHALL display what is missing from the folder name
6. THE Validation_Engine SHALL format error messages with clear visual separation using line breaks

### Requirement 10: Confirm Feature Number with User

**User Story:** As a user, I want to see the extracted feature number before document generation, so that I can verify the system interpreted my folder name correctly.

#### Acceptance Criteria

1. WHEN the Feature_Number is extracted, THE PRD_Skill SHALL display it to the user
2. THE PRD_Skill SHALL display the message "Using feature number {feature_number} from folder '{folder_name}'"
3. WHEN the Feature_Number is "006" and folder name is "006_about_founder_name", THE PRD_Skill SHALL display "Using feature number 006 from folder '006_about_founder_name'"
4. THE PRD_Skill SHALL allow the user to confirm before proceeding with document generation

### Requirement 11: Maintain File Naming Conventions

**User Story:** As a user, I want the file naming conventions to remain unchanged, so that my existing folder structure is not disrupted.

#### Acceptance Criteria

1. THE cc-gen-brd-prd skill SHALL save documents to `prds/{prefix}_{name}/BRD_PRD.md`
2. THE cc-gen-prd skill SHALL save documents to `prds/{prefix}_{name}/PRD.md`
3. THE cc-gen-prd-lite skill SHALL save documents to `prds/{prefix}_{name}/PRD.md`
4. THE cc-gen-tech-spec skill SHALL save documents to `prds/{prefix}_{name}/TECH_SPEC.md`
5. THE PRD_Skill SHALL not modify the folder name or structure during document generation

### Requirement 12: Support Round-Trip ID Extraction

**User Story:** As a technical specification generator, I want to extract the feature number from existing PRD IDs, so that I can maintain ID consistency across documents.

#### Acceptance Criteria

1. WHEN reading a PRD with folder-based IDs, THE cc-gen-tech-spec skill SHALL parse Requirement_IDs to extract the Feature_Number
2. WHEN a PRD contains "US-006-01", THE cc-gen-tech-spec skill SHALL extract Feature_Number "006"
3. WHEN a PRD contains multiple ID types with the same Feature_Number, THE cc-gen-tech-spec skill SHALL extract the Feature_Number once
4. WHEN a PRD contains IDs with different Feature_Numbers, THE cc-gen-tech-spec skill SHALL halt with an error message
5. THE cc-gen-tech-spec skill SHALL use the regex pattern `\w+-(\d{3})-\d+` to extract Feature_Number from Requirement_IDs
