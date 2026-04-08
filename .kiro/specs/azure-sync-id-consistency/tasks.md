# Implementation Plan: Azure Sync ID Consistency

## Overview

This implementation updates the cc-azure-board-sync skill to use the consistent ID format `US-{feature_number}-{seq}` and `AC-{feature_number}-{seq}` that matches all other PRD generation skills. The feature number is extracted from the folder path (e.g., `prds/006_about_founder_name/` → `006`). All changes are made to the single markdown file `.claude/skills/cc-azure-board-sync/SKILL.md`.

## Tasks

- [x] 1. Implement folder path validation and feature number extraction
  - Add folder path validation at the beginning of Step 1 (Validate Prerequisites)
  - Extract 3-digit feature number from folder name pattern `{NNN}_{feature_name}`
  - Validate feature number is between 001 and 999
  - Preserve leading zeros in feature number
  - Display clear error messages for invalid folder paths
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 1.1 Write property test for folder path validation
  - **Property 1: Folder Path Validation and Feature Number Extraction**
  - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 4.1, 4.2, 4.3, 4.4, 4.5, 6.1**

- [x] 1.2 Write unit tests for folder path edge cases
  - Test cases: 000 (invalid), 001 (valid min), 999 (valid max), 1000 (invalid)
  - Test missing prefix, wrong format, missing underscore
  - _Requirements: 1.6, 4.2, 4.3, 4.4_

- [x] 2. Update User Story ID parsing logic
  - Modify Step 2 (Parse BRD/PRD Files) to parse new User Story ID format
  - Update regex from `US-\d+` to `US-(\d{3})-(\d{2})`
  - Extract feature number and sequence number from User Story IDs
  - Validate User Story IDs match expected format
  - Log warnings for invalid formats but continue processing
  - Validate feature numbers match folder path feature number
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 6.2, 6.4_

- [x] 2.1 Write property test for User Story ID parsing round trip
  - **Property 2: User Story ID Parsing Round Trip**
  - **Validates: Requirements 2.1, 2.2, 2.3**

- [x] 2.2 Write property test for User Story ID format validation
  - **Property 3: User Story ID Format Validation**
  - **Validates: Requirements 2.4, 2.5**

- [x] 2.3 Write property test for User Story feature number consistency
  - **Property 4: User Story Feature Number Consistency**
  - **Validates: Requirements 2.6, 6.2, 6.4**

- [x] 2.4 Write unit tests for User Story ID parsing
  - Test valid IDs: US-006-01, US-010-05, US-999-99
  - Test invalid IDs: US-001, US-6-01, US-006-1
  - Test feature number mismatch scenarios
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [-] 3. Update Acceptance Criteria ID generation logic
  - Modify Step 2 (Parse BRD/PRD Files) to generate new AC ID format
  - Generate AC IDs in format `AC-{feature_number}-{seq}`
  - Use global sequential numbering across all user stories
  - Extract feature number from folder path for AC ID generation
  - Validate AC IDs match expected format
  - Validate feature numbers match folder path feature number
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 6.3, 6.4_

- [x] 3.1 Write property test for Acceptance Criteria ID parsing round trip
  - **Property 5: Acceptance Criteria ID Parsing Round Trip**
  - **Validates: Requirements 3.1, 3.2, 3.3**

- [x] 3.2 Write property test for Acceptance Criteria ID generation
  - **Property 6: Acceptance Criteria ID Generation**
  - **Validates: Requirements 3.4**

- [ ] 3.3 Write property test for global sequential numbering
  - **Property 7: Global Sequential Numbering for Acceptance Criteria**
  - **Validates: Requirements 3.5**

- [ ] 3.4 Write property test for Acceptance Criteria feature number consistency
  - **Property 8: Acceptance Criteria Feature Number Consistency**
  - **Validates: Requirements 3.6, 6.3, 6.4**

- [ ] 3.5 Write unit tests for Acceptance Criteria ID generation
  - Test global sequential numbering with multiple user stories
  - Test feature number preservation with leading zeros
  - Test sequence number zero-padding
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 4. Implement feature number consistency validation
  - Add consistency validation in Step 2 after parsing all IDs
  - Compare all User Story IDs against folder path feature number
  - Compare all Acceptance Criteria IDs against folder path feature number
  - Log warnings for mismatched feature numbers
  - Track mismatch count for synchronization report
  - Continue processing after logging warnings
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ] 4.1 Write property test for mismatch count reporting
  - **Property 9: Mismatch Count Reporting**
  - **Validates: Requirements 6.6**

- [ ] 4.2 Write unit tests for feature number consistency validation
  - Test all IDs match folder path (valid case)
  - Test some IDs mismatch (warning case)
  - Test mismatch count accuracy
  - _Requirements: 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ] 5. Update work item title generation
  - Modify Step 3 (Map Requirements to Work Items) to use new ID format
  - Update Feature work item titles to use new format
  - Update User Story work item titles to use new format (US-{feature_number}-{seq})
  - Update Task work item titles to use new format (AC-{feature_number}-{seq})
  - Ensure titles remain under 255 character limit
  - _Requirements: 2.1, 3.1_

- [ ] 6. Update JSON metadata file update logic
  - Modify Step 6.5 (Update JSON Metadata File) to preserve new ID format
  - Ensure User Story `id` fields are preserved exactly (e.g., US-006-01)
  - Ensure Acceptance Criteria IDs are preserved when converting to objects
  - Add `azureWorkItemId` and `azureWorkItemUrl` fields without modifying `id` fields
  - Maintain all existing fields during JSON update
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ] 6.1 Write property test for JSON ID preservation
  - **Property 11: JSON ID Preservation During Update**
  - **Validates: Requirements 8.1**

- [ ] 6.2 Write property test for Azure work item ID addition to user stories
  - **Property 12: Azure Work Item ID Addition to User Stories**
  - **Validates: Requirements 8.2**

- [ ] 6.3 Write property test for Azure work item ID addition to acceptance criteria
  - **Property 13: Azure Work Item ID Addition to Acceptance Criteria**
  - **Validates: Requirements 8.3**

- [ ] 6.4 Write property test for JSON field preservation
  - **Property 14: JSON Field Preservation During Update**
  - **Validates: Requirements 8.5**

- [ ] 6.5 Write unit tests for JSON metadata update
  - Test JSON transformation with new ID format
  - Test acceptance criteria string to object conversion
  - Test field preservation (priority, technicalSpecSection, etc.)
  - Test 2-space indentation formatting
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ] 7. Update error messages throughout the skill
  - Update folder path validation error messages with expected pattern
  - Update User Story ID validation error messages with expected format
  - Update Acceptance Criteria ID validation error messages with expected format
  - Include actual value in all error messages
  - Include specific issue description in all error messages
  - Include actionable guidance in all error messages
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [ ] 7.1 Write property test for invalid ID error messages
  - **Property 10: Invalid ID Error Messages**
  - **Validates: Requirements 7.2, 7.3**

- [ ] 7.2 Write unit tests for error message content
  - Verify error messages contain expected pattern
  - Verify error messages contain actual value
  - Verify error messages contain specific issue description
  - Verify error messages contain actionable guidance
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 8. Update all examples in the skill document
  - Update Example 1 (Basic BRD/PRD Sync) to use new ID format
  - Update Example 2 (Handling Errors) to use new ID format
  - Update Example 3 (JSON File Transformation) to use new ID format
  - Update all inline examples in Step 2 (Parse BRD/PRD Files)
  - Update all inline examples in Step 3 (Map Requirements to Work Items)
  - Update all inline examples in Step 6.5 (Update JSON Metadata File)
  - Ensure all examples show folder path with feature number
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 9. Remove Business Objective ID parsing references
  - Remove references to Business Objective ID parsing (OBJ-{feature_number}-{seq})
  - Update documentation to clarify one PRD maps to one feature
  - Simplify Feature work item creation logic
  - _Requirements: 5.6_

- [ ] 10. Checkpoint - Ensure all tests pass
  - Run all property-based tests with fast-check
  - Run all unit tests with Vitest
  - Verify all tests pass
  - Ask the user if questions arise

- [ ] 11. Integration testing and validation
  - Test complete workflow with sample PRD using new ID format
  - Verify folder path validation works correctly
  - Verify User Story IDs are parsed correctly
  - Verify Acceptance Criteria IDs are generated correctly
  - Verify feature number consistency validation works
  - Verify work items are created with correct titles
  - Verify JSON file is updated correctly with IDs preserved
  - Verify error messages are clear and actionable
  - _Requirements: All requirements_

- [ ] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- All changes are made to the single file `.claude/skills/cc-azure-board-sync/SKILL.md`
- The skill is a markdown document, not executable code, so "implementation" means updating the skill instructions
- Property tests use fast-check library with minimum 100 iterations per test
- Unit tests use Vitest framework
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
