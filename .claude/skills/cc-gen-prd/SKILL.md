---
name: cc-gen-prd
description: "Generate an advanced Product Requirements Document (PRD) for a complex or multi-subsystem feature. Use when the work spans multiple systems, integrations, migrations, rollout phases, or substantial ambiguity. Triggers on: create an advanced prd, complex feature prd, multi-system requirements, spec out a large feature."
user-invocable: true
---

# PRD Generator

Create detailed Product Requirements Documents for complex features that need explicit decomposition, scope control, and implementation-ready clarity.

---

## The Job

1. Receive a feature description from the user
2. Prompt for folder path where the document will be saved
3. Ask 3-5 essential clarifying questions (with lettered options)
4. Generate a structured PRD based on answers
5. Save to the specified folder path

**Important:**
- Do NOT start implementing. Just create the PRD.
- This PRD will be converted to `prd.json` format for Ralph autonomous execution using the `cc-gen-prd-task` skill.

**Use this skill when:**
- The feature spans multiple subsystems or teams
- The work includes external integrations, migrations, or phased rollout
- The feature likely needs more than 5 coherent user stories
- Technical and scope ambiguity need extra documentation depth

**Do not use this skill when:**
- The request is a normal single-feature PRD with limited ambiguity
- `cc-gen-prd-lite` can capture the scope cleanly

---

## Step 1: Folder Path Prompt

**Before asking any clarifying questions, prompt the user for the folder path where the document will be saved.**

Display this prompt:
```
Where should this document be saved? (e.g., prds/006_about_founder_name/)
```

**Instructions:**
- Capture the user's folder path input
- Store this folder path for use in document generation and file naming
- The folder path will be validated in Step 1.1
- Proceed to Step 1.1 after receiving the folder path

---

## Step 1.1: Validate Folder Path

**After receiving the folder path from the user, validate the folder name format before proceeding.**

### Validation Rules

The folder name must follow the pattern: `{NNN}_{feature_name}` where:
- `{NNN}` is exactly 3 digits (001-999)
- Followed by an underscore character `_`
- Followed by the feature name

### Validation Pattern

Use the regex pattern `^(\d{3})_(.+)$` to validate the folder name.

### Validation Steps

1. **Extract the folder name** from the full folder path (e.g., from `prds/006_about_founder_name/` extract `006_about_founder_name`)
2. **Check that the folder name starts with exactly 3 digits**
   - The first 3 characters must be numeric digits (0-9)
   - Must be exactly 3 digits, not 2 or 4
3. **Verify the 3 digits are followed by an underscore**
   - The 4th character must be an underscore `_`
4. **Verify the numeric prefix is between 001 and 999**
   - Convert the 3-digit prefix to a number
   - Check that it is >= 001 and <= 999
   - Reject 000 as invalid

### If Validation Fails

Display an error message in this format:

```
Invalid folder name format

Expected pattern: {NNN}_{feature_name}
Example: 006_about_founder_name

Your input: [user's folder name]
Issue: [specific issue - e.g., "Missing 3-digit numeric prefix at the start" or "Numeric prefix must be between 001 and 999"]

Please provide a valid folder path:
```

Then allow the user to retry with a corrected folder path. Repeat validation until a valid folder path is provided.

### If Validation Succeeds

**Extract the feature number from the validated folder name:**

1. **Use the regex pattern `^(\d{3})_` to extract the 3-digit prefix**
   - Apply this pattern to the folder name (not the full path)
   - The first capture group contains the feature number
   
2. **Preserve leading zeros**
   - The feature number must be kept as a string to maintain leading zeros
   - Example: "006" must remain "006", NOT "6"
   - Example: "010" must remain "010", NOT "10"
   
3. **Extract from the folder name portion only**
   - From path `prds/006_about_founder_name/`, extract from `006_about_founder_name`
   - From path `prd/010_payment_gateway/`, extract from `010_payment_gateway`

**Examples:**
- Folder name: `006_about_founder_name` → Feature number: `006`
- Folder name: `010_payment_gateway` → Feature number: `010`
- Folder name: `099_final_feature` → Feature number: `099`

**After extraction:**
1. Display confirmation: `Using feature number {feature_number} from folder '{folder_name}'`
   - Example: "Using feature number 006 from folder '006_about_founder_name'"
2. **Wait for user confirmation before proceeding**
   - Ask the user to confirm or provide a corrected folder path
   - Only proceed to the next step after receiving confirmation
3. Store the feature number for use in ID generation throughout the document
4. Proceed to Step 2 (Clarifying Questions)

---

## Step 2: Clarifying Questions

Ask only critical questions where the initial prompt is ambiguous. Focus on:

- **Problem/Goal:** What problem does this solve?
- **Core Functionality:** What are the key actions?
- **Scope/Boundaries:** What should it NOT do?
- **Success Criteria:** How do we know it's done?

### Format Questions Like This:

```
1. What is the primary goal of this feature?
   A. Improve user onboarding experience
   B. Increase user retention
   C. Reduce support burden
   D. Other: [please specify]

2. Who is the target user?
   A. New users only
   B. Existing users only
   C. All users
   D. Admin users only

3. What is the scope?
   A. Minimal viable version
   B. Full-featured implementation
   C. Just the backend/API
   D. Just the UI
```

This lets users respond with "1A, 2C, 3B" for quick iteration. Remember to indent the options.

---

## Step 3: PRD Structure

Generate the PRD with these sections:

### 1. Introduction/Overview

Brief description of the feature and the problem it solves.

### 2. Goals

Specific, measurable objectives (bullet list).

### 3. User Stories

Each story needs:
- **Title:** Short descriptive name
- **Description:** "As a [user], I want [feature] so that [benefit]"
- **Acceptance Criteria:** Verifiable checklist of what "done" means

Each story should be small enough to implement in one focused session.

**Required Format:** Use `### US-{feature_number}-{seq}: [Title]` format (heading level 3, colon after ID). This format is required for the `cc-gen-prd-task` skill to parse and convert to prd.json.

#### ID Generation Instructions

**User Story IDs:**
- Format: `US-{feature_number}-{seq}`
- `{feature_number}`: The 3-digit feature number extracted from the folder name (with leading zeros preserved)
- `{seq}`: 2-digit sequential number with zero-padding (01, 02, 03, etc.)
- Sequential counter starts at 01 for the first user story and increments for each subsequent user story
- Example: `US-006-01`, `US-006-02`, `US-010-01`

**Acceptance Criteria IDs:**
- Format: `AC-{feature_number}-{seq}`
- `{feature_number}`: Same 3-digit feature number as user stories
- `{seq}`: 2-digit sequential number with zero-padding
- **CRITICAL: Use GLOBAL sequential numbering across ALL user stories**
  - The AC counter does NOT reset for each user story
  - If US-006-01 has AC-006-01 and AC-006-02, then US-006-02 starts with AC-006-03
  - This ensures every acceptance criterion has a unique ID within the feature
- Example: First story has AC-006-01, AC-006-02; second story continues with AC-006-03, AC-006-04

**Format:**
```markdown
### US-006-01: [Title]
**Description:** As a [user], I want [feature] so that [benefit].

**Acceptance Criteria:**
- AC-006-01: Specific verifiable criterion
- AC-006-02: Another criterion
- AC-006-03: Lint passes (run project's lint command)
- AC-006-04: Typecheck passes (run project's typecheck command)
- AC-006-05: Unit tests pass
- AC-006-06: **[UI stories only]** E2E tests pass
- AC-006-07: **[UI stories only]** Verify in browser using dev-browser skill

### US-006-02: [Second Story Title]
**Description:** As a [user], I want [another feature] so that [benefit].

**Acceptance Criteria:**
- AC-006-08: Criterion for second story (note: counter continues from previous story)
- AC-006-09: Another criterion
- AC-006-10: Lint passes (run project's lint command)
```

**Important:**
- Acceptance criteria must be verifiable, not vague. "Works correctly" is bad. "Button shows confirmation dialog before deleting" is good.
- **Standard quality criteria are automatically added** based on story type:
  - **All stories:** Lint passes, Typecheck passes, Unit tests pass
  - **UI stories (frontend changes):** Also include E2E tests pass, Verify in browser using dev-browser skill
  - **Backend/API stories:** Only the base quality checks
- Story type is detected from keywords in title/description and acceptance criteria content (UI, component, display, button, page = UI story)
- **Each acceptance criterion must have its own AC ID** - do not use checkboxes `[ ]` anymore, use AC IDs instead

### 4. Functional Requirements

**Functional Requirement IDs:**
- Format: `FR-{feature_number}-{seq}`
- `{feature_number}`: The 3-digit feature number extracted from the folder name
- `{seq}`: 2-digit sequential number with zero-padding (01, 02, 03, etc.)
- Sequential counter starts at 01 for the first functional requirement
- Example: `FR-006-01`, `FR-006-02`, `FR-010-01`

Numbered list of specific functionalities:
- "FR-006-01: The system must allow users to..."
- "FR-006-02: When a user clicks X, the system must..."

Be explicit and unambiguous.

### 5. Non-Goals (Out of Scope)

What this feature will NOT include. Critical for managing scope.

### 6. Design Considerations (Optional)

- UI/UX requirements
- Link to mockups if available
- Relevant existing components to reuse

### 7. Technical Considerations (Optional)

- Known constraints or dependencies
- Integration points with existing systems
- Performance requirements

### 8. Success Metrics

How will success be measured?
- "Reduce time to complete X by 50%"
- "Increase conversion rate by 10%"

### 9. Open Questions

Remaining questions or areas needing clarification.

---

## Writing for Junior Developers

The PRD reader may be a junior developer or AI agent. Therefore:

- Be explicit and unambiguous
- Avoid jargon or explain it
- Provide enough detail to understand purpose and core logic
- Number requirements for easy reference
- Use concrete examples where helpful

---

## Output

- **Format:** Markdown (`.md`)
- **Location:** `prds/{prefix}_{name}/` (where `{prefix}_{name}` is the validated folder name)
- **Filename:** `PRD.md`
- **Full path example:** `prds/006_about_founder_name/PRD.md`

---

## Example PRD

```markdown
# PRD: Task Priority System

## Introduction

Add priority levels to tasks so users can focus on what matters most. Tasks can be marked as high, medium, or low priority, with visual indicators and filtering to help users manage their workload effectively.

## Goals

- Allow assigning priority (high/medium/low) to any task
- Provide clear visual differentiation between priority levels
- Enable filtering and sorting by priority
- Default new tasks to medium priority

## User Stories

### US-012-01: Add priority field to database

**Description:** As a developer, I need to store task priority so it persists across sessions.

**Acceptance Criteria:**
- AC-012-01: Add priority column to tasks table: 'high' | 'medium' | 'low' (default 'medium')
- AC-012-02: Generate and run migration successfully
- AC-012-03: Lint passes (run project's lint command)
- AC-012-04: Typecheck passes (run project's typecheck command)
- AC-012-05: Unit tests pass

### US-012-02: Display priority indicator on task cards

**Description:** As a user, I want to see task priority at a glance so I know what needs attention first.

**Acceptance Criteria:**
- AC-012-06: Each task card shows colored priority badge (red=high, yellow=medium, gray=low)
- AC-012-07: Priority visible without hovering or clicking
- AC-012-08: Lint passes (run project's lint command)
- AC-012-09: Typecheck passes (run project's typecheck command)
- AC-012-10: Unit tests pass
- AC-012-11: E2E tests pass
- AC-012-12: Verify in browser using dev-browser skill

### US-012-03: Add priority selector to task edit

**Description:** As a user, I want to change a task's priority when editing it.

**Acceptance Criteria:**
- AC-012-13: Priority dropdown in task edit modal
- AC-012-14: Shows current priority as selected
- AC-012-15: Saves immediately on selection change
- AC-012-16: Lint passes (run project's lint command)
- AC-012-17: Typecheck passes (run project's typecheck command)
- AC-012-18: Unit tests pass
- AC-012-19: E2E tests pass
- AC-012-20: Verify in browser using dev-browser skill

### US-012-04: Filter tasks by priority

**Description:** As a user, I want to filter the task list to see only high-priority items when I'm focused.

**Acceptance Criteria:**
- AC-012-21: Filter dropdown with options: All | High | Medium | Low
- AC-012-22: Filter persists in URL params
- AC-012-23: Empty state message when no tasks match filter
- AC-012-24: Lint passes (run project's lint command)
- AC-012-25: Typecheck passes (run project's typecheck command)
- AC-012-26: Unit tests pass
- AC-012-27: E2E tests pass
- AC-012-28: Verify in browser using dev-browser skill

## Functional Requirements

- FR-012-01: Add `priority` field to tasks table ('high' | 'medium' | 'low', default 'medium')
- FR-012-02: Display colored priority badge on each task card
- FR-012-03: Include priority selector in task edit modal
- FR-012-04: Add priority filter dropdown to task list header
- FR-012-05: Sort by priority within each status column (high to medium to low)

## Non-Goals

- No priority-based notifications or reminders
- No automatic priority assignment based on due date
- No priority inheritance for subtasks

## Technical Considerations

- Reuse existing badge component with color variants
- Filter state managed via URL search params
- Priority stored in database, not computed

## Success Metrics

- Users can change priority in under 2 clicks
- High-priority tasks immediately visible at top of lists
- No regression in task list performance

## Open Questions

- Should priority affect task ordering within a column?
- Should we add keyboard shortcuts for priority changes?
```

---

## Checklist

Before saving the PRD:

- [ ] Prompted for folder path at the start
- [ ] Validated folder path format (3-digit prefix + underscore + name)
- [ ] Extracted feature number from folder name (preserving leading zeros)
- [ ] Displayed confirmation message with feature number
- [ ] Asked clarifying questions with lettered options
- [ ] Incorporated user's answers
- [ ] User stories use folder-based IDs (US-{feature_number}-{seq})
- [ ] Acceptance criteria use folder-based IDs (AC-{feature_number}-{seq}) with global sequential numbering
- [ ] Functional requirements use folder-based IDs (FR-{feature_number}-{seq})
- [ ] User stories are small and specific
- [ ] Functional requirements are numbered and unambiguous
- [ ] Non-goals section defines clear boundaries
- [ ] **Standard quality criteria added to each story** (lint, typecheck, unit tests for all; e2e tests and browser verification for UI stories)
- [ ] Saved to `prds/{prefix}_{name}/PRD.md`

---

## Workflow Examples

### Example 1: Successful Folder Path Input and ID Generation

**User Request:** "Create a PRD for task priority system"

**System Workflow:**

```
System: Where should this document be saved? (e.g., prds/006_about_founder_name/)
User: prds/012_task_priority/

System: Validating folder name...
System: ✓ Folder name matches pattern: 012_task_priority
System: ✓ Numeric prefix: 012 (valid range 001-999)
System: ✓ Underscore separator present
System: ✓ Feature name: task_priority

System: Using feature number 012 from folder '012_task_priority'
System: Proceed with document generation? (yes/no)
User: yes

System: [Asks clarifying questions]
User: 1A, 2C, 3A, 4B

System: [Generates PRD with folder-based IDs]

Generated IDs:
- User Stories: US-012-01, US-012-02, US-012-03, US-012-04
- Acceptance Criteria: AC-012-01 through AC-012-28 (global counter)
- Functional Requirements: FR-012-01 through FR-012-05

System: Document saved to prds/012_task_priority/PRD.md
```

**Sample Output Snippet:**

```markdown
# PRD: Task Priority System

## User Stories

### US-012-01: Add priority field to database

**Description:** As a developer, I need to store task priority so it persists across sessions.

**Acceptance Criteria:**
- AC-012-01: Add priority column to tasks table: 'high' | 'medium' | 'low' (default 'medium')
- AC-012-02: Generate and run migration successfully
- AC-012-03: Lint passes (run project's lint command)
- AC-012-04: Typecheck passes (run project's typecheck command)
- AC-012-05: Unit tests pass

### US-012-02: Display priority indicator on task cards

**Description:** As a user, I want to see task priority at a glance so I know what needs attention first.

**Acceptance Criteria:**
- AC-012-06: Each task card shows colored priority badge (red=high, yellow=medium, gray=low)
- AC-012-07: Priority visible without hovering or clicking
- AC-012-08: Lint passes (run project's lint command)
- AC-012-09: Typecheck passes (run project's typecheck command)
- AC-012-10: Unit tests pass
- AC-012-11: E2E tests pass
- AC-012-12: Verify in browser using dev-browser skill

### US-012-03: Add priority selector to task edit

**Description:** As a user, I want to change a task's priority when editing it.

**Acceptance Criteria:**
- AC-012-13: Priority dropdown in task edit modal (note: global counter continues)
- AC-012-14: Shows current priority as selected
- AC-012-15: Saves immediately on selection change
- AC-012-16: Lint passes (run project's lint command)
- AC-012-17: Typecheck passes (run project's typecheck command)
- AC-012-18: Unit tests pass
- AC-012-19: E2E tests pass
- AC-012-20: Verify in browser using dev-browser skill

## Functional Requirements

- FR-012-01: Add `priority` field to tasks table ('high' | 'medium' | 'low', default 'medium')
- FR-012-02: Display colored priority badge on each task card
- FR-012-03: Include priority selector in task edit modal
- FR-012-04: Add priority filter dropdown to task list header
- FR-012-05: Sort by priority within each status column (high to medium to low)
```

### Example 2: Validation Error and Retry Flow

**User Request:** "Create a PRD for user authentication"

**System Workflow:**

```
System: Where should this document be saved? (e.g., prds/006_about_founder_name/)
User: prds/user_auth/

System: Validating folder name...
System: ✗ Validation failed

Invalid folder name format

Expected pattern: {NNN}_{feature_name}
Example: 006_about_founder_name

Your input: user_auth
Issue: Missing 3-digit numeric prefix at the start

Please provide a valid folder path:

User: prds/1_user_auth/

System: Validating folder name...
System: ✗ Validation failed

Invalid folder name format

Expected pattern: {NNN}_{feature_name}
Example: 006_about_founder_name

Your input: 1_user_auth
Issue: Numeric prefix must be exactly 3 digits (found 1 digit)

Please provide a valid folder path:

User: prds/001_user_auth/

System: Validating folder name...
System: ✓ Folder name matches pattern: 001_user_auth
System: ✓ Numeric prefix: 001 (valid range 001-999)
System: ✓ Underscore separator present
System: ✓ Feature name: user_auth

System: Using feature number 001 from folder '001_user_auth'
System: Proceed with document generation? (yes/no)
User: yes

System: [Continues with document generation]
System: Document saved to prds/001_user_auth/PRD.md
```

### Example 3: Global AC Counter Demonstration

**Folder:** `prds/025_shopping_cart/`

**Generated Document Showing Global AC Counter:**

```markdown
# PRD: Shopping Cart Feature

## User Stories

### US-025-01: Add item to cart

**Description:** As a shopper, I want to add items to my cart so I can purchase multiple products.

**Acceptance Criteria:**
- AC-025-01: "Add to Cart" button visible on product pages
- AC-025-02: Clicking button adds item to cart
- AC-025-03: Cart icon shows item count
- AC-025-04: Duplicate items increment quantity instead of adding new entry
- AC-025-05: Lint passes
- AC-025-06: Typecheck passes
- AC-025-07: Unit tests pass
- AC-025-08: E2E tests pass
- AC-025-09: Verify in browser using dev-browser skill

### US-025-02: View cart contents

**Description:** As a shopper, I want to view my cart contents so I can review my selections.

**Acceptance Criteria:**
- AC-025-10: Cart page displays all items (note: counter continues from 10, not reset to 01)
- AC-025-11: Each item shows name, price, quantity, subtotal
- AC-025-12: Cart shows total price at bottom
- AC-025-13: Empty cart shows "Your cart is empty" message
- AC-025-14: Lint passes
- AC-025-15: Typecheck passes
- AC-025-16: Unit tests pass
- AC-025-17: E2E tests pass
- AC-025-18: Verify in browser using dev-browser skill

### US-025-03: Update item quantity

**Description:** As a shopper, I want to change item quantities so I can adjust my order.

**Acceptance Criteria:**
- AC-025-19: Quantity selector shows current quantity (counter continues from 19)
- AC-025-20: Increasing quantity updates subtotal immediately
- AC-025-21: Decreasing to zero removes item from cart
- AC-025-22: Quantity limited to available stock
- AC-025-23: Lint passes
- AC-025-24: Typecheck passes
- AC-025-25: Unit tests pass
- AC-025-26: E2E tests pass
- AC-025-27: Verify in browser using dev-browser skill
```

**Note:** The AC counter increments globally: AC-025-01 through AC-025-27 across all three user stories.

---

## Troubleshooting Guide

### Common Validation Errors

#### Error: Missing 3-Digit Numeric Prefix

**Symptom:**
```
Invalid folder name format
Your input: feature_name
Issue: Missing 3-digit numeric prefix at the start
```

**Cause:** Folder name doesn't start with 3 digits

**Solution:** Add a 3-digit prefix (001-999) followed by an underscore
- ❌ Wrong: `user_auth`
- ❌ Wrong: `payment_gateway`
- ✅ Correct: `001_user_auth`
- ✅ Correct: `010_payment_gateway`

#### Error: Numeric Prefix Wrong Length

**Symptom:**
```
Invalid folder name format
Your input: 12_feature
Issue: Numeric prefix must be exactly 3 digits (found 2 digits)
```

**Cause:** Prefix has fewer or more than 3 digits

**Solution:** Use exactly 3 digits with leading zeros if needed
- ❌ Wrong: `5_feature` (1 digit)
- ❌ Wrong: `12_feature` (2 digits)
- ❌ Wrong: `0005_feature` (4 digits)
- ✅ Correct: `005_feature` (3 digits)
- ✅ Correct: `012_feature` (3 digits)

#### Error: Missing Underscore Separator

**Symptom:**
```
Invalid folder name format
Your input: 012feature
Issue: Missing underscore after the 3-digit prefix
```

**Cause:** No underscore between prefix and feature name

**Solution:** Add an underscore after the 3-digit prefix
- ❌ Wrong: `012feature`
- ❌ Wrong: `012-feature`
- ❌ Wrong: `012.feature`
- ❌ Wrong: `012 feature`
- ✅ Correct: `012_feature`

#### Error: Prefix Out of Range

**Symptom:**
```
Invalid folder name format
Your input: 000_feature
Issue: Numeric prefix must be between 001 and 999
```

**Cause:** Prefix is 000 or greater than 999

**Solution:** Use a prefix between 001 and 999
- ❌ Wrong: `000_feature` (too low)
- ❌ Wrong: `1000_feature` (too high)
- ✅ Correct: `001_feature` (minimum)
- ✅ Correct: `999_feature` (maximum)

### ID Generation Issues

#### Issue: Acceptance Criteria Counter Resets Per Story

**Symptom:** AC IDs restart at 01 for each user story

**Wrong Pattern:**
```markdown
### US-012-01: First Story
- AC-012-01: Criterion
- AC-012-02: Criterion

### US-012-02: Second Story
- AC-012-01: Criterion (WRONG - should be AC-012-03)
- AC-012-02: Criterion (WRONG - should be AC-012-04)
```

**Correct Pattern:**
```markdown
### US-012-01: First Story
- AC-012-01: Criterion
- AC-012-02: Criterion

### US-012-02: Second Story
- AC-012-03: Criterion (CORRECT - continues from previous story)
- AC-012-04: Criterion (CORRECT - global counter)
```

**Solution:** Maintain a single global counter for AC IDs throughout the entire document. The counter never resets between user stories.

#### Issue: Leading Zeros Stripped from Feature Number

**Symptom:** IDs show `US-6-01` instead of `US-006-01`

**Cause:** Feature number converted to integer, losing leading zeros

**Solution:** Keep feature number as a string throughout the process
- ❌ Wrong: `US-6-01`, `AC-6-01`, `FR-6-01`
- ✅ Correct: `US-006-01`, `AC-006-01`, `FR-006-01`

#### Issue: Inconsistent Feature Numbers in Document

**Symptom:** Document contains mixed feature numbers (US-006-01, US-007-01)

**Cause:** Feature number not consistently applied to all IDs

**Solution:** Extract feature number once at the start and use it for all IDs
- All IDs in a single document must use the same feature number
- Feature number comes from the folder name prefix
- Never mix feature numbers within a single PRD

### File Naming Issues

#### Issue: Document Saved to Wrong Location

**Symptom:** Document saved to root or incorrect folder

**Solution:** Always use the folder path provided by the user
- User provides: `prds/012_task_priority/`
- Save to: `prds/012_task_priority/PRD.md`
- Do NOT save to: `prds/PRD.md` or `PRD.md`

#### Issue: Incorrect File Extension

**Symptom:** Document saved as `.txt` or other extension

**Solution:** Always save as `.md` (Markdown)
- ❌ Wrong: `PRD.txt`, `PRD.doc`, `prd.md`
- ✅ Correct: `PRD.md` (uppercase, .md extension)

### Quality Criteria Issues

#### Issue: Missing Standard Quality Criteria

**Symptom:** User stories lack lint, typecheck, or test criteria

**Solution:** Always add standard quality criteria based on story type

**For ALL stories:**
- Lint passes (run project's lint command)
- Typecheck passes (run project's typecheck command)
- Unit tests pass

**For UI stories (additional):**
- E2E tests pass
- Verify in browser using dev-browser skill

**Example:**
```markdown
### US-012-01: Backend API Endpoint (Non-UI)
**Acceptance Criteria:**
- AC-012-01: API returns correct data structure
- AC-012-02: Error handling for invalid inputs
- AC-012-03: Lint passes
- AC-012-04: Typecheck passes
- AC-012-05: Unit tests pass

### US-012-02: User Profile Page (UI)
**Acceptance Criteria:**
- AC-012-06: Profile displays user information
- AC-012-07: Edit button opens edit modal
- AC-012-08: Lint passes
- AC-012-09: Typecheck passes
- AC-012-10: Unit tests pass
- AC-012-11: E2E tests pass
- AC-012-12: Verify in browser using dev-browser skill
```

### Best Practices

1. **Always validate before proceeding:** Don't skip folder name validation
2. **Display confirmation messages:** Let users verify the extracted feature number
3. **Use global AC counter:** Never reset AC counter per user story
4. **Preserve leading zeros:** Keep feature numbers as strings (006, not 6)
5. **Add quality criteria:** Include lint, typecheck, tests for every story
6. **Follow file naming conventions:** Use exact folder path provided by user
7. **Be consistent:** Use the same feature number for all IDs in the document
