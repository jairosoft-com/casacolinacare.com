# Implementation Plan: Folder-Based ID Generation

## Overview

This implementation plan updates four PRD generation skills (cc-gen-brd-prd, cc-gen-prd, cc-gen-prd-lite, cc-gen-tech-spec) to use folder-based ID generation. The feature extracts a 3-digit numeric prefix from folder names and uses it to generate consistent, traceable requirement IDs.

**Important Context:** This is NOT about writing TypeScript code. We are updating markdown SKILL.md files with natural language instructions that tell AI agents how to prompt users, validate inputs, extract feature numbers, and generate IDs.

## Tasks

- [x] 1. Add folder path prompting instructions
  - Add instructions to prompt users for folder path before document generation
  - Specify prompt text: "Where should this document be saved? (e.g., prds/006_about_founder_name/)"
  - Include instructions to capture and store the user's folder path input
  - Add guidance to display the prompt at the start of document generation workflow
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 2. Add folder name validation instructions
  - [x] 2.1 Add validation pattern instructions
    - Specify the validation pattern: folder name must match `^(\d{3})_(.+)$`
    - Add instructions to check folder name starts with exactly 3 digits
    - Add instructions to verify the 3 digits are followed by an underscore
    - Add instructions to verify the numeric prefix is between 001 and 999
    - _Requirements: 2.1, 2.2, 2.3, 2.6_
  
  - [x] 2.2 Add validation error handling instructions
    - Add instructions to halt document generation if validation fails
    - Specify error message format with expected pattern, example, user input, and specific issue
    - Add instructions to allow user to retry with corrected folder path
    - Include example error messages for common validation failures
    - _Requirements: 2.4, 2.5, 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 3. Add feature number extraction instructions
  - Add instructions to extract the 3-digit prefix using pattern `^(\d{3})_`
  - Specify that leading zeros must be preserved (e.g., "006" not "6")
  - Add instructions to extract from the folder name portion of the path
  - Include examples: "006_about_founder_name" → "006", "010_payment_gateway" → "010"
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 4. Add confirmation message instructions
  - Add instructions to display extracted feature number to user
  - Specify confirmation message format: "Using feature number {feature_number} from folder '{folder_name}'"
  - Add instructions to wait for user confirmation before proceeding
  - Include example: "Using feature number 006 from folder '006_about_founder_name'"
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 5. Update cc-gen-brd-prd skill with ID generation instructions
  - [x] 5.1 Add ID format instructions for all ID types
    - Specify ID format pattern: `{TYPE}-{feature_number}-{seq}`
    - Add instructions for 2-digit zero-padded sequential numbers
    - List all supported ID types: OBJ, GOAL, US, AC, RISK, NFR, TC, FR
    - Include examples: US-006-01, AC-006-10, RISK-010-05
    - _Requirements: 3.1, 3.2, 3.5, 3.7_
  
  - [x] 5.2 Add global AC counter instructions
    - Add instructions for global sequential numbering for AC IDs across all user stories
    - Specify that AC counter does NOT reset per user story
    - Include example showing AC-006-01, AC-006-02 under US-006-01, then AC-006-03 under US-006-02
    - _Requirements: 3.6, 5.4_
  
  - [x] 5.3 Update document sections with ID generation
    - Update Business Objectives section to use OBJ-{feature_number}-{seq}
    - Update Goals section to use GOAL-{feature_number}-{seq}
    - Update User Stories section to use US-{feature_number}-{seq}
    - Update Acceptance Criteria to use AC-{feature_number}-{seq} with global counter
    - Update Risks section to use RISK-{feature_number}-{seq}
    - Update NFRs section to use NFR-{feature_number}-{seq}
    - Update Technical Constraints to use TC-{feature_number}-{seq}
    - Update Functional Requirements to use FR-{feature_number}-{seq}
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_
  
  - [x] 5.4 Update metadata instructions
    - Add instructions to set featureId field in JSON output to the extracted feature_number
    - _Requirements: 5.9_
  
  - [x] 5.5 Integrate folder path workflow
    - Add folder path prompting at skill initialization
    - Add validation before document generation
    - Add confirmation message display
    - Update file naming instructions to use prds/{prefix}_{name}/BRD_PRD.md
    - _Requirements: 4.5, 11.1_

- [x] 6. Update cc-gen-prd skill with ID generation instructions
  - [x] 6.1 Add ID format instructions
    - Specify ID format pattern: `{TYPE}-{feature_number}-{seq}`
    - Add instructions for US, AC, and FR ID types
    - Add instructions for global AC sequential numbering
    - Include examples: US-010-01, AC-010-01, FR-010-01
    - _Requirements: 3.1, 3.2, 6.1, 6.2, 6.3_
  
  - [x] 6.2 Update document sections with ID generation
    - Update User Stories section to use US-{feature_number}-{seq} format
    - Update Acceptance Criteria to use AC-{feature_number}-{seq} with global counter
    - Update Functional Requirements to use FR-{feature_number}-{seq} format
    - Update example PRD in skill to show folder-based IDs
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 6.3 Integrate folder path workflow
    - Add folder path prompting at skill initialization
    - Add validation instructions before document generation
    - Add confirmation message display
    - Update file naming instructions to use prds/{prefix}_{name}/PRD.md
    - _Requirements: 6.4, 6.5, 11.2_

- [x] 7. Update cc-gen-prd-lite skill with ID generation instructions
  - [x] 7.1 Add ID format instructions
    - Specify ID format pattern: `{TYPE}-{feature_number}-{seq}`
    - Add instructions for US, AC, FR, and NFR ID types
    - Add instructions for global AC sequential numbering
    - Include examples: US-099-01, AC-099-01, FR-099-01, NFR-099-01
    - _Requirements: 3.1, 3.2, 7.1, 7.2, 7.3, 7.4_
  
  - [x] 7.2 Update document sections with ID generation
    - Update Overview section to set Feature ID field to feature_number
    - Update User Stories section to use US-{feature_number}-{seq} format
    - Update Acceptance Criteria to use AC-{feature_number}-{seq} with global counter
    - Update Functional Requirements to use FR-{feature_number}-{seq} format
    - Update NFRs section to use NFR-{feature_number}-{seq} format
    - Update example PRD in skill to show folder-based IDs
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [x] 7.3 Integrate folder path workflow
    - Add folder path prompting at skill initialization
    - Add validation instructions before document generation
    - Add confirmation message display
    - Update file naming instructions to use prds/{prefix}_{name}/PRD.md
    - _Requirements: 7.6, 11.3_

- [x] 8. Update cc-gen-tech-spec skill with ID generation instructions
  - [x] 8.1 Add round-trip ID extraction instructions
    - Add instructions to check if PRD exists in the same folder
    - Add instructions to extract feature_number from existing PRD IDs using pattern `\w+-(\d{3})-\d+`
    - Add instructions to validate all IDs have consistent feature_number
    - Add instructions to display error if inconsistent feature numbers detected
    - Include examples: "US-006-01" → "006", "AC-010-15" → "010"
    - _Requirements: 8.1, 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [x] 8.2 Add fallback to folder path prompting
    - Add instructions to prompt for folder path if PRD does not exist
    - Add instructions to prompt for folder path if ID extraction fails
    - Add instructions to validate and extract feature_number from provided folder path
    - _Requirements: 8.2_
  
  - [x] 8.3 Add ID format instructions for TECH_SPEC
    - Specify ID format pattern: `{TYPE}-{feature_number}-{seq}`
    - Add instructions for TC and TEST ID types
    - Include examples: TC-006-01, TEST-006-01
    - _Requirements: 3.1, 3.2, 8.3, 8.4_
  
  - [x] 8.4 Update document sections with ID generation
    - Update Technical Constraints section to use TC-{feature_number}-{seq}
    - Update Test Cases section to use TEST-{feature_number}-{seq}
    - Add instructions to reference existing US and AC IDs from PRD without modification
    - Update example TECH_SPEC in skill to show folder-based IDs
    - _Requirements: 8.3, 8.4, 8.5_
  
  - [x] 8.5 Integrate extraction and validation workflow
    - Add PRD existence check at skill initialization
    - Add ID extraction and validation logic
    - Add fallback to folder path prompting
    - Add confirmation message display
    - Update file naming instructions to use prds/{prefix}_{name}/TECH_SPEC.md
    - _Requirements: 11.4_

- [x] 9. Checkpoint - Review all skill updates
  - Verify all four skills have folder path prompting instructions
  - Verify all skills have validation and error handling instructions
  - Verify all skills have feature number extraction instructions
  - Verify all skills have confirmation message instructions
  - Verify all skills have correct ID format instructions
  - Verify TECH_SPEC skill has round-trip extraction instructions
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Update skill documentation with examples
  - [~] 10.1 Add complete workflow examples to each skill
    - Add example showing successful folder path input and ID generation
    - Add example showing validation error and retry flow
    - Add example for TECH_SPEC showing round-trip extraction from PRD
    - Include sample output showing folder-based IDs in generated documents
    - _Requirements: All requirements_
  
  - [~] 10.2 Add troubleshooting guidance
    - Add guidance for common validation errors
    - Add guidance for inconsistent feature numbers in TECH_SPEC
    - Add guidance for missing PRD in TECH_SPEC workflow
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 11. Final checkpoint - Verify complete implementation
  - Test folder path prompting in all four skills
  - Test validation with invalid folder names
  - Test feature number extraction with various folder names
  - Test ID generation with different feature numbers
  - Test TECH_SPEC round-trip extraction from existing PRDs
  - Verify all file naming conventions are correct
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- This implementation updates markdown instruction files, not TypeScript code
- The TypeScript code in the design document is illustrative only
- All changes are natural language instructions for AI agents
- Each skill file is updated independently
- TECH_SPEC skill has unique round-trip extraction capability
- Global AC counter is a critical feature for traceability
- Validation must happen before any document generation
- Leading zeros in feature numbers must be preserved throughout
