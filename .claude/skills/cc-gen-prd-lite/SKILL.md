---
name: cc-gen-prd-lite
description: "Generate streamlined Product Requirements Documents with built-in traceability for a normal single-feature request. Use this as the default PRD skill when the scope is focused and does not require cross-system migration or rollout planning. Triggers on: create prd, write requirements, plan feature, document feature, feature spec."
user-invocable: true
---

# PRD Lite: Streamlined Requirements with Traceability

**Role:** You create focused, measurable PRDs that connect business goals to testable implementation criteria. You balance speed with rigor - faster than full BRD-PRD workflows, more structured than basic feature planning.

**Goal:** Transform feature ideas into clear, actionable requirements where every technical decision traces back to a measurable objective.

---

## The Job

1. **Prompt for folder path** where the document will be saved
2. **Ask 3-5 clarifying questions** (with lettered options for quick responses)
3. **Identify the business objective** (the "why" behind the feature)
4. **Generate structured PRD** with measurable acceptance criteria
5. **Save to appropriate location** with proper naming

**Critical Principles:**
- Every requirement must be measurable and testable
- Every feature must connect to a business objective
- Acceptance criteria must use verifiable language (no vague terms)

**Important:** Do NOT start implementing. Just create the PRD.

**Use this skill when:**
- The request is one feature with one main delivery stream
- The scope is mid-sized and can stay coherent in 3-5 user stories
- There is limited ambiguity and no major migration, phased rollout, or cross-system dependency

**Escalate to `cc-gen-prd` when:**
- The feature spans multiple subsystems or integrations
- The work includes migrations, backfills, or rollout phases
- Compliance or security sensitivity materially shapes the implementation
- The PRD needs more than 5 user stories to stay coherent

---

## ID Generation Format

All requirement IDs in the PRD use folder-based numbering for consistency and traceability.

### ID Format Pattern

All IDs follow the pattern: `{TYPE}-{feature_number}-{seq}`

Where:
- `{TYPE}` is the requirement type (US, AC, FR, NFR)
- `{feature_number}` is the 3-digit feature number extracted from the folder path (e.g., 006, 010, 099)
- `{seq}` is a 2-digit sequential number with zero-padding (01, 02, 03, etc.)

### Supported ID Types

| ID Type | Full Name | Description | Sequential Numbering |
|---------|-----------|-------------|---------------------|
| US | User Story | User-facing feature descriptions | Independent counter per type |
| AC | Acceptance Criteria | Testable conditions for user stories | **Global counter across all user stories** |
| FR | Functional Requirement | Detailed functional specifications | Independent counter per type |
| NFR | Non-Functional Requirement | Performance, security, quality attributes | Independent counter per type |

### Global AC Counter (Critical)

**Acceptance Criteria use GLOBAL sequential numbering across ALL user stories in the document.**

The AC counter does NOT reset for each user story - it continues incrementing throughout the entire document.

**Example:**
```
US-006-01: First User Story
  AC-006-01: First acceptance criterion
  AC-006-02: Second acceptance criterion

US-006-02: Second User Story
  AC-006-03: First acceptance criterion (continues from previous user story)
  AC-006-04: Second acceptance criterion
```

This ensures every acceptance criterion has a unique ID for traceability.

### ID Generation Examples

For feature number `006`:
- First user story: `US-006-01`
- Second user story: `US-006-02`
- First acceptance criterion (under US-006-01): `AC-006-01`
- Second acceptance criterion (under US-006-01): `AC-006-02`
- Third acceptance criterion (under US-006-02): `AC-006-03` (global counter continues)
- First functional requirement: `FR-006-01`
- First non-functional requirement: `NFR-006-01`

For feature number `010`:
- First user story: `US-010-01`
- First acceptance criterion: `AC-010-01`
- First functional requirement: `FR-010-01`
- First non-functional requirement: `NFR-010-01`

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

Ask only essential questions where the initial prompt is ambiguous. Use lettered options for quick iteration.

### Question Framework

```
1. What business objective does this feature support?
   A. Increase revenue/conversions
   B. Reduce costs/improve efficiency
   C. Improve user experience/retention
   D. Reduce support burden
   E. Competitive positioning
   F. Other: [please specify]

2. Who is the target user?
   A. End customers (external)
   B. Internal employees
   C. Admin users only
   D. Multiple user types

3. What is the desired scope?
   A. Minimal viable version (MVP)
   B. Full-featured implementation
   C. Backend/API only
   D. Frontend/UI only

4. How will success be measured?
   A. User engagement metrics (time, clicks, completion rate)
   B. Business metrics (revenue, conversion, cost savings)
   C. Performance metrics (speed, uptime, error rate)
   D. User satisfaction (NPS, feedback, support tickets)
   E. Multiple metrics

5. What evidence supports this feature?
   A. User research/interviews
   B. Analytics showing the problem
   C. Support tickets/complaints
   D. Competitive analysis
   E. Executive directive
```

Users can respond with "1A, 2C, 3A, 4B, 5B" for quick iteration.

---

## Step 3: The Golden Thread

Before writing requirements, establish the traceability chain:

**Business Objective → User Need → Feature → Acceptance Criteria → Success Metric**

### Example Golden Thread

1. **Business Objective:** Increase checkout conversion by 8%
2. **User Need:** Users abandon cart when checkout takes too long
3. **Feature:** One-click checkout for returning customers
4. **Acceptance Criteria:** Returning users complete purchase in <30 seconds
5. **Success Metric:** Checkout completion rate increases from 65% to 73%

This thread ensures every line of code serves a business purpose.

---

## Step 4: PRD Structure

Generate the PRD with these sections:

### Document Metadata

Include this metadata section at the top of the generated document (after the title):

```markdown
## Document Metadata
- **Feature ID**: {feature_number}
- **Feature Name**: {feature_name}
- **Document Type**: PRD
- **Generated Date**: {YYYY-MM-DD}
```

This ensures downstream skills (`cc-gen-tech-spec`, `cc-gen-prd-task`) can extract the feature number reliably.

### 1. Overview
- **Feature ID:** `{feature_number}` (the 3-digit feature number extracted from the folder path, e.g., 006, 010, 099)
- **Feature Name:** Clear, descriptive title
- **Business Objective:** The "why" - what business goal does this support?
- **Success Metric:** How will we measure success? (Be specific)

**Important:** The Feature ID field must be set to the feature_number extracted from the folder path in Step 1.1. This ensures consistency with all requirement IDs generated in the document.

### 2. Problem Statement
- What problem are we solving?
- What evidence supports this problem? (data, research, feedback)
- Who experiences this problem?

### 3. Goals
Specific, measurable objectives (3-5 bullet points):
- Use SMART format: Specific, Measurable, Achievable, Relevant, Time-bound
- Example: "Reduce average checkout time from 2:30 to <1:00 for returning users"

### 4. User Stories

Each story follows this format:

```markdown
### US-{feature_number}-{seq}: [Descriptive Title]
**As a** [user type]
**I want** [feature/capability]
**So that** [benefit/value]

**Acceptance Criteria:**
- [ ] AC-{feature_number}-{seq}: Specific, verifiable criterion (use numbers, not vague terms)
- [ ] AC-{feature_number}-{seq}: Another measurable criterion
- [ ] AC-{feature_number}-{seq}: Error handling: [specific error scenario]
- [ ] AC-{feature_number}-{seq}: Lint passes
- [ ] AC-{feature_number}-{seq}: Typecheck passes
- [ ] AC-{feature_number}-{seq}: Unit tests pass
- [ ] AC-{feature_number}-{seq}: **[UI stories only]** E2E tests pass
- [ ] AC-{feature_number}-{seq}: **[UI stories only]** Verify in browser using dev-browser skill

**Validates:** [Link back to business objective or goal]
```

**Required Format:** Use `### US-{feature_number}-{seq}: [Title]` format (heading level 3, colon after ID). This format is required for the `cc-gen-prd-task` skill to parse and convert to prd.json.

**ID Generation Instructions:**

**User Story IDs:**
- Format: `US-{feature_number}-{seq}`
- `{feature_number}` is the 3-digit feature number extracted from the folder path (e.g., 006, 010, 099)
- `{seq}` is a 2-digit sequential number with zero-padding (01, 02, 03, etc.)
- Sequential counter starts at 01 for the first user story and increments for each subsequent user story
- Example: First user story for feature 006 is `US-006-01`, second is `US-006-02`

**Acceptance Criteria IDs:**
- Format: `AC-{feature_number}-{seq}`
- `{feature_number}` is the same 3-digit feature number used for user stories
- `{seq}` is a 2-digit sequential number with zero-padding
- **CRITICAL: Use GLOBAL sequential numbering for AC IDs across ALL user stories**
- The AC counter does NOT reset for each user story - it continues incrementing across the entire document
- Example: If US-006-01 has AC-006-01 and AC-006-02, then US-006-02 starts with AC-006-03 (not AC-006-01)

**Example ID Sequence:**
```
US-006-01: First User Story
  AC-006-01: First acceptance criterion
  AC-006-02: Second acceptance criterion
  AC-006-03: Third acceptance criterion

US-006-02: Second User Story
  AC-006-04: First acceptance criterion (continues from previous user story)
  AC-006-05: Second acceptance criterion
  AC-006-06: Third acceptance criterion
```

**Critical Rules for Acceptance Criteria:**
- Must be verifiable - no vague terms like "fast", "secure", "easy"
- Use specific numbers: "<200ms", "99.9% uptime", "<3 clicks"
- Include error/edge cases
- Each acceptance criterion must have a unique AC ID using the global counter
- **Standard quality criteria for ALL stories:** Lint passes, Typecheck passes, Unit tests pass
- **Additional for UI stories:** E2E tests pass, Verify in browser using dev-browser skill

### 5. Functional Requirements

Numbered list of specific system-level functionalities. Each requirement should reference the user story it supports.

**Format:**
- FR-{feature_number}-{seq}: The system must [specific action with measurable outcome] *(Supports US-{feature_number}-{seq})*
- FR-{feature_number}-{seq}: When [trigger], the system must [response with timing/behavior] *(Supports US-{feature_number}-{seq})*
- FR-{feature_number}-{seq}: All [data type] must be [specific constraint] *(Supports US-{feature_number}-{seq})*

**ID Generation Instructions:**

**Functional Requirement IDs:**
- Format: `FR-{feature_number}-{seq}`
- `{feature_number}` is the 3-digit feature number extracted from the folder path (e.g., 006, 010, 099)
- `{seq}` is a 2-digit sequential number with zero-padding (01, 02, 03, etc.)
- Sequential counter starts at 01 for the first functional requirement and increments for each subsequent requirement
- Example: First FR for feature 006 is `FR-006-01`, second is `FR-006-02`

**Transform vague to measurable:**

| ❌ Vague | ✅ Measurable |
|---------|--------------|
| "Fast response time" | "API responds in <200ms for 95% of requests" |
| "Secure storage" | "All PII encrypted at rest using AES-256" |
| "Easy to use" | "First-time users complete task in <2 minutes" |
| "Highly available" | "99.9% uptime measured monthly" |

**Note:** Functional requirements are declarative statements. Use Gherkin format in User Story Acceptance Criteria, not here.

### 6. Non-Functional Requirements (NFRs)

Measurable quality attributes:

**Format:**
- NFR-{feature_number}-{seq}: [Requirement description with measurable criteria]

**ID Generation Instructions:**

**Non-Functional Requirement IDs:**
- Format: `NFR-{feature_number}-{seq}`
- `{feature_number}` is the 3-digit feature number extracted from the folder path (e.g., 006, 010, 099)
- `{seq}` is a 2-digit sequential number with zero-padding (01, 02, 03, etc.)
- Sequential counter starts at 01 for the first NFR and increments for each subsequent NFR
- Example: First NFR for feature 006 is `NFR-006-01`, second is `NFR-006-02`

**Examples:**
- NFR-006-01: **Performance:** Page load <2.5s on 4G mobile (LCP metric)
- NFR-006-02: **Security:** All API endpoints require JWT authentication
- NFR-006-03: **Accessibility:** WCAG 2.1 AA compliance verified with axe DevTools
- NFR-006-04: **Scalability:** Support 10,000 concurrent users without degradation

### 7. Non-Goals (Out of Scope)

What this feature will NOT include. Critical for managing scope:
- Explicitly list features that are tempting but out of scope
- Explain why (if helpful for future reference)

### 8. Success Metrics

How will we know this feature succeeded?
- Tie directly back to business objective
- Include baseline and target: "Increase from X to Y"
- Define measurement method: "Measured via Google Analytics event tracking"

### 9. Open Questions

Remaining questions or areas needing clarification before implementation.

---

## Step 5: Writing Best Practices

### Make Everything Measurable

**Before writing any requirement, ask:** "How would I test this?"

If you can't write a test for it, the requirement is too vague.

### Use Gherkin for Complex Scenarios

For **acceptance criteria within user stories** that have multiple steps, use Given-When-Then format:

```gherkin
Scenario: Successful one-click checkout
  Given I am a logged-in returning customer
  And I have a saved payment method
  When I click "Buy Now" on the product page
  Then my order is placed within 2 seconds
  And I see an order confirmation with order number
  And I receive a confirmation email within 30 seconds
```

**When to use Gherkin:**
- ✅ In user story acceptance criteria (complex flows)
- ✅ For scenarios with multiple steps or conditions
- ❌ Not for functional requirements (use declarative statements)
- ❌ Not for simple single-step criteria (use checkboxes)

### INVEST Checklist for User Stories

Ensure each story is:
- **I**ndependent: Can be implemented without dependencies
- **N**egotiable: Details can be discussed
- **V**aluable: Delivers clear user/business value
- **E**stimable: Team can estimate effort
- **S**mall: Completable in one focused session
- **T**estable: Has clear, verifiable acceptance criteria

### Link Everything Back

Every user story should include:
- **Validates:** [Business Objective or Goal it supports]

This maintains the golden thread from code to business value.

---

## Step 6: Output & Save

### File Naming & Location

- **Format:** Markdown (`.md`)
- **Location:** `prds/{prefix}_{name}/`
- **Filename:** `PRD.md`

**Important:** Use the folder path provided by the user in Step 1. The folder name must follow the pattern `{NNN}_{feature_name}` where `{NNN}` is the 3-digit feature number.

**Complete Examples:**
- `prds/001_user-authentication/PRD.md`
- `prds/006_about-founder-name/PRD.md`
- `prds/010_payment-gateway/PRD.md`
- `prds/099_final-feature/PRD.md`

### Output Format

Use Markdown with:
- Semantic heading hierarchy (# ## ###)
- Tables for structured comparisons
- Bullet/numbered lists for requirements
- Code blocks for Gherkin scenarios
- Checkboxes for acceptance criteria

---

## Templates & Examples

- **[PRD_Template.md](PRD_Template.md):** PRD section structure with placeholders
- **[PRD_Example.md](PRD_Example.md):** Complete example PRD (One-Click Checkout, feature 009)

---

## Checklist Before Saving

- [ ] Document Metadata section included (Feature ID, Feature Name, Document Type, Generated Date)
- [ ] Asked clarifying questions with lettered options
- [ ] Incorporated user's answers
- [ ] Business objective clearly stated and measurable
- [ ] Problem statement includes evidence (data/research)
- [ ] All goals are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- [ ] User stories follow INVEST criteria
- [ ] Every acceptance criterion is verifiable (no vague terms)
- [ ] Functional requirements use specific, measurable language
- [ ] NFRs include numbers and metrics
- [ ] Non-goals explicitly defined
- [ ] Success metrics tie back to business objective
- [ ] Each user story includes "Validates:" link to objective/goal
- [ ] Saved to `prds/{prefix}_{name}/PRD.md`

---

## Quick Reference: Vague → Measurable

When reviewing your PRD, replace vague terms with measurable criteria:

| ❌ Avoid | ✅ Use Instead |
|---------|---------------|
| "Fast" | "<200ms response time" |
| "Secure" | "AES-256 encryption, bcrypt password hashing" |
| "User-friendly" | "First-time users complete task in <3 minutes" |
| "Reliable" | "99.9% uptime, <0.1% error rate" |
| "Scalable" | "Supports 10,000 concurrent users" |
| "Soon" | "Within 6 weeks of approval" |
| "Most users" | "95% of users" |
| "Works well" | "Passes all acceptance criteria tests" |

---

## Writing for Implementation

The PRD reader may be a junior developer or AI agent. Therefore:

- Be explicit and unambiguous
- Avoid jargon or define it clearly
- Number all requirements for easy reference
- Use concrete examples
- Make acceptance criteria testable
- Define what "done" looks like
- Include error/edge cases

**Remember:** If you can't write a test for it, it's too vague.

---

## Workflow Examples

### Example 1: Successful Folder Path Input and ID Generation

**User Request:** "Create a PRD for one-click checkout feature"

**System Workflow:**

```
System: Where should this document be saved? (e.g., prds/006_about_founder_name/)
User: prds/009_one_click_checkout/

System: Validating folder name...
System: ✓ Folder name matches pattern: 009_one_click_checkout
System: ✓ Numeric prefix: 009 (valid range 001-999)
System: ✓ Underscore separator present
System: ✓ Feature name: one_click_checkout

System: Using feature number 009 from folder '009_one_click_checkout'
System: Proceed with document generation? (yes/no)
User: yes

System: [Asks clarifying questions]
User: 1A, 2C, 3A, 4B, 5B

System: [Generates PRD with folder-based IDs]

Generated IDs:
- User Stories: US-009-01, US-009-02, US-009-03
- Acceptance Criteria: AC-009-01 through AC-009-18 (global counter)
- Functional Requirements: FR-009-01 through FR-009-05
- Non-Functional Requirements: NFR-009-01 through NFR-009-05

System: Document saved to prds/009_one_click_checkout/PRD.md
```

**Sample Output Snippet:**

```markdown
# PRD: One-Click Checkout

## Overview
**Feature ID:** 009
**Feature Name:** One-Click Checkout for Returning Customers  
**Business Objective:** Increase checkout conversion rate by 8% (from 65% to 73%)  
**Success Metric:** Checkout completion time reduced from 2:30 to <1:00 for returning users

## User Stories

### US-009-01: Save payment method securely
**As a** returning customer  
**I want** my payment method saved securely  
**So that** I don't have to re-enter it on every purchase

**Acceptance Criteria:**
- [ ] AC-009-01: Payment details stored using PCI-compliant tokenization
- [ ] AC-009-02: User can save up to 3 payment methods
- [ ] AC-009-03: Saved methods show last 4 digits only
- [ ] AC-009-04: User can delete saved payment methods
- [ ] AC-009-05: Lint passes
- [ ] AC-009-06: Typecheck passes
- [ ] AC-009-07: Unit tests pass

**Validates:** Security requirement for one-click checkout

### US-009-02: One-click purchase button
**As a** returning customer with saved payment
**I want** a "Buy Now" button on product pages
**So that** I can complete purchase in one click

**Acceptance Criteria:**
- [ ] AC-009-08: "Buy Now" button visible only for logged-in users with saved payment (note: global counter continues)
- [ ] AC-009-09: Clicking button completes purchase within 2 seconds
- [ ] AC-009-10: Order confirmation displays immediately with order number
- [ ] AC-009-11: Confirmation email sent within 30 seconds
- [ ] AC-009-12: Button disabled during processing to prevent double-clicks
- [ ] AC-009-13: Lint passes
- [ ] AC-009-14: Typecheck passes
- [ ] AC-009-15: Unit tests pass
- [ ] AC-009-16: E2E tests pass
- [ ] AC-009-17: Verify in browser using dev-browser skill

**Validates:** Goal to reduce checkout time to <1:00

## Functional Requirements

- FR-009-01: System must securely tokenize and store payment methods using PCI-compliant vault *(Supports US-009-01)*
- FR-009-02: "Buy Now" button appears on product pages for logged-in users with saved payment *(Supports US-009-02)*
- FR-009-03: Clicking "Buy Now" completes purchase within 2 seconds (95th percentile) *(Supports US-009-02)*
- FR-009-04: Order confirmation email sent within 30 seconds of purchase *(Supports US-009-02)*
- FR-009-05: Users can manage saved payment methods in account settings *(Supports US-009-01)*

## Non-Functional Requirements

- NFR-009-01: **Performance:** Order processing completes in <2 seconds for 95% of requests
- NFR-009-02: **Security:** All payment data tokenized using PCI DSS Level 1 compliant provider
- NFR-009-03: **Availability:** 99.9% uptime for checkout service
- NFR-009-04: **Accessibility:** All UI elements meet WCAG 2.1 AA standards
- NFR-009-05: **Mobile:** Feature works on iOS Safari and Android Chrome
```

### Example 2: Validation Error and Retry Flow

**User Request:** "Create a PRD for search functionality"

**System Workflow:**

```
System: Where should this document be saved? (e.g., prds/006_about_founder_name/)
User: prds/search/

System: Validating folder name...
System: ✗ Validation failed

Invalid folder name format

Expected pattern: {NNN}_{feature_name}
Example: 006_about_founder_name

Your input: search
Issue: Missing 3-digit numeric prefix at the start

Please provide a valid folder path:

User: prds/15_search/

System: Validating folder name...
System: ✗ Validation failed

Invalid folder name format

Expected pattern: {NNN}_{feature_name}
Example: 006_about_founder_name

Your input: 15_search
Issue: Numeric prefix must be exactly 3 digits (found 2 digits)

Please provide a valid folder path:

User: prds/015_search/

System: Validating folder name...
System: ✓ Folder name matches pattern: 015_search
System: ✓ Numeric prefix: 015 (valid range 001-999)
System: ✓ Underscore separator present
System: ✓ Feature name: search

System: Using feature number 015 from folder '015_search'
System: Proceed with document generation? (yes/no)
User: yes

System: [Continues with document generation]
System: Document saved to prds/015_search/PRD.md
```

### Example 3: Global AC Counter and Feature ID

**Folder:** `prds/050_notification_system/`

**Generated Document Showing Global AC Counter and Feature ID:**

```markdown
# PRD: Notification System

## Overview
**Feature ID:** 050
**Feature Name:** Real-time Notification System  
**Business Objective:** Improve user engagement by 15%  
**Success Metric:** Users respond to notifications within 5 minutes

## User Stories

### US-050-01: Receive real-time notifications
**As a** user  
**I want** to receive notifications in real-time  
**So that** I stay informed about important updates

**Acceptance Criteria:**
- [ ] AC-050-01: Notifications appear within 2 seconds of event
- [ ] AC-050-02: Notification shows sender, message, and timestamp
- [ ] AC-050-03: Unread notifications show badge count
- [ ] AC-050-04: Typecheck passes
- [ ] AC-050-05: Lint passes
- [ ] AC-050-06: Unit tests pass

**Validates:** Improve user engagement

### US-050-02: Mark notifications as read
**As a** user  
**I want** to mark notifications as read  
**So that** I can track which updates I've seen

**Acceptance Criteria:**
- [ ] AC-050-07: Clicking notification marks it as read (note: counter continues from 07)
- [ ] AC-050-08: Badge count decrements when notification marked read
- [ ] AC-050-09: "Mark all as read" button clears all unread notifications
- [ ] AC-050-10: Typecheck passes
- [ ] AC-050-11: Lint passes
- [ ] AC-050-12: E2E tests pass
- [ ] AC-050-13: Verify in browser using dev-browser skill

**Validates:** Improve user engagement

### US-050-03: Configure notification preferences
**As a** user  
**I want** to configure which notifications I receive  
**So that** I only see relevant updates

**Acceptance Criteria:**
- [ ] AC-050-14: Settings page shows notification type toggles (counter continues from 14)
- [ ] AC-050-15: Disabling a type stops those notifications immediately
- [ ] AC-050-16: Preferences persist across sessions
- [ ] AC-050-17: Typecheck passes
- [ ] AC-050-18: Lint passes
- [ ] AC-050-19: E2E tests pass
- [ ] AC-050-20: Verify in browser using dev-browser skill

**Validates:** Improve user engagement

## Functional Requirements

- FR-050-01: System shall deliver notifications within 2 seconds of event *(Supports US-050-01)*
- FR-050-02: Clicking notification shall mark it as read *(Supports US-050-02)*
- FR-050-03: Badge count shall reflect unread notification count *(Supports US-050-01, US-050-02)*
- FR-050-04: User preferences shall persist in database *(Supports US-050-03)*
- FR-050-05: Disabled notification types shall not be delivered *(Supports US-050-03)*

## Non-Functional Requirements

- NFR-050-01: **Performance:** Notifications delivered within 2 seconds of event
- NFR-050-02: **Scalability:** Support 10,000 concurrent users
- NFR-050-03: **Reliability:** 99.9% notification delivery success rate
```

**Note:** 
- Feature ID is set to `050` in the Overview section
- AC counter increments globally: AC-050-01 through AC-050-20 across all user stories

---

## Troubleshooting Guide

### Common Validation Errors

#### Error: Missing 3-Digit Numeric Prefix

**Symptom:**
```
Invalid folder name format
Your input: checkout_feature
Issue: Missing 3-digit numeric prefix at the start
```

**Cause:** Folder name doesn't start with 3 digits

**Solution:** Add a 3-digit prefix (001-999) followed by an underscore
- ❌ Wrong: `checkout_feature`
- ❌ Wrong: `notification_system`
- ✅ Correct: `009_checkout_feature`
- ✅ Correct: `050_notification_system`

#### Error: Numeric Prefix Wrong Length

**Symptom:**
```
Invalid folder name format
Your input: 9_feature
Issue: Numeric prefix must be exactly 3 digits (found 1 digit)
```

**Cause:** Prefix has fewer or more than 3 digits

**Solution:** Use exactly 3 digits with leading zeros if needed
- ❌ Wrong: `9_feature` (1 digit)
- ❌ Wrong: `50_feature` (2 digits)
- ❌ Wrong: `0009_feature` (4 digits)
- ✅ Correct: `009_feature` (3 digits)
- ✅ Correct: `050_feature` (3 digits)

#### Error: Missing Underscore Separator

**Symptom:**
```
Invalid folder name format
Your input: 009checkout
Issue: Missing underscore after the 3-digit prefix
```

**Cause:** No underscore between prefix and feature name

**Solution:** Add an underscore after the 3-digit prefix
- ❌ Wrong: `009checkout`
- ❌ Wrong: `009-checkout`
- ❌ Wrong: `009.checkout`
- ❌ Wrong: `009 checkout`
- ✅ Correct: `009_checkout`

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
### US-009-01: First Story
- AC-009-01: Criterion
- AC-009-02: Criterion

### US-009-02: Second Story
- AC-009-01: Criterion (WRONG - should be AC-009-03)
- AC-009-02: Criterion (WRONG - should be AC-009-04)
```

**Correct Pattern:**
```markdown
### US-009-01: First Story
- AC-009-01: Criterion
- AC-009-02: Criterion

### US-009-02: Second Story
- AC-009-03: Criterion (CORRECT - continues from previous story)
- AC-009-04: Criterion (CORRECT - global counter)
```

**Solution:** Maintain a single global counter for AC IDs throughout the entire document. The counter never resets between user stories.

#### Issue: Leading Zeros Stripped from Feature Number

**Symptom:** IDs show `US-9-01` instead of `US-009-01`

**Cause:** Feature number converted to integer, losing leading zeros

**Solution:** Keep feature number as a string throughout the process
- ❌ Wrong: `US-9-01`, `AC-9-01`, `FR-9-01`, `NFR-9-01`
- ✅ Correct: `US-009-01`, `AC-009-01`, `FR-009-01`, `NFR-009-01`

#### Issue: Feature ID Not Set in Overview

**Symptom:** Overview section missing Feature ID or shows wrong value

**Wrong:**
```markdown
## Overview
**Feature Name:** One-Click Checkout
**Business Objective:** ...
```

**Correct:**
```markdown
## Overview
**Feature ID:** 009
**Feature Name:** One-Click Checkout
**Business Objective:** ...
```

**Solution:** Always set Feature ID field to the feature_number extracted from the folder path
- Extract from folder: `009_one_click_checkout` → Feature ID: `009`
- Extract from folder: `050_notification_system` → Feature ID: `050`

### File Naming Issues

#### Issue: Document Saved to Wrong Location

**Symptom:** Document saved to root or incorrect folder

**Solution:** Always use the folder path provided by the user
- User provides: `prds/009_one_click_checkout/`
- Save to: `prds/009_one_click_checkout/PRD.md`
- Do NOT save to: `prds/PRD.md` or `PRD.md`

#### Issue: Incorrect File Extension

**Symptom:** Document saved as `.txt` or other extension

**Solution:** Always save as `.md` (Markdown)
- ❌ Wrong: `PRD.txt`, `PRD.doc`, `prd.md`
- ✅ Correct: `PRD.md` (uppercase, .md extension)

### Quality Criteria Issues

#### Issue: Missing Standard Quality Criteria

**Symptom:** User stories lack typecheck, lint, or test criteria

**Solution:** Always add standard quality criteria to acceptance criteria

**Required for ALL stories:**
- Lint passes
- Typecheck passes
- Unit tests pass

**Additional for UI stories:**
- E2E tests pass
- Verify in browser using dev-browser skill

**Example:**
```markdown
### US-009-01: Backend API (Non-UI)
**Acceptance Criteria:**
- [ ] AC-009-01: API returns correct data
- [ ] AC-009-02: Error handling works
- [ ] AC-009-03: Lint passes
- [ ] AC-009-04: Typecheck passes
- [ ] AC-009-05: Unit tests pass

### US-009-02: User Interface (UI)
**Acceptance Criteria:**
- [ ] AC-009-06: Button displays correctly
- [ ] AC-009-07: Click triggers action
- [ ] AC-009-08: Lint passes
- [ ] AC-009-09: Typecheck passes
- [ ] AC-009-10: Unit tests pass
- [ ] AC-009-11: E2E tests pass
- [ ] AC-009-12: Verify in browser using dev-browser skill
```

### Measurability Issues

#### Issue: Vague Requirements

**Symptom:** Requirements use subjective terms without metrics

**Vague Examples:**
- "The system should be fast"
- "The UI should be user-friendly"
- "The feature should be secure"
- "The app should be reliable"

**Measurable Alternatives:**
- "API responds in <200ms for 95% of requests"
- "First-time users complete task in <2 minutes without assistance"
- "All PII encrypted at rest using AES-256; passwords hashed using bcrypt"
- "99.9% uptime measured monthly, excluding scheduled maintenance"

**Solution:** Always transform vague terms into specific, measurable criteria

| ❌ Vague | ✅ Measurable |
|---------|--------------|
| "Fast response time" | "API responds in <200ms for 95% of requests" |
| "Secure storage" | "All PII encrypted at rest using AES-256" |
| "Easy to use" | "First-time users complete task in <2 minutes" |
| "Highly available" | "99.9% uptime measured monthly" |
| "Good performance" | "Page load <2.5s on 4G mobile (LCP metric)" |

### Best Practices

1. **Always validate before proceeding:** Don't skip folder name validation
2. **Display confirmation messages:** Let users verify the extracted feature number
3. **Use global AC counter:** Never reset AC counter per user story
4. **Preserve leading zeros:** Keep feature numbers as strings (009, not 9)
5. **Set Feature ID in Overview:** Always include Feature ID field with feature_number
6. **Add quality criteria:** Include typecheck, lint, tests for every story
7. **Make everything measurable:** Replace vague terms with specific metrics
8. **Follow file naming conventions:** Use exact folder path provided by user
9. **Be consistent:** Use the same feature number for all IDs in the document
