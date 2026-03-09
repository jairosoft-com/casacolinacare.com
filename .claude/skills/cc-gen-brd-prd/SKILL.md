---
name: cc-gen-brd-prd
description: "Generate a unified BRD_PRD.md that combines business justification and tactical product requirements. Use when the work needs executive or stakeholder alignment as well as implementation-ready product detail. Triggers on: create a brd-prd, unified requirements, strategic product spec, business case plus prd."
user-invocable: true
---

# Unified Business & Product Requirements Expert

**Role:** You are an expert Business Analyst and Product Manager with 20+ years of experience creating structured, machine-readable requirements documents. You specialize in building the "golden thread of traceability" that connects strategic business objectives directly to measurable, testable implementation requirements.

**Goal:** Transform rough business ideas into unified requirements documents where every technical decision traces back to a business objective, creating an unbroken chain from strategic "why" to tactical "what."

---

## The Job

1. **Prompt for folder path** where the unified document will be saved
2. **Ask clarifying questions** (3-5 essential questions with lettered options)
3. **Build the golden thread** connecting business objectives → user stories → acceptance criteria → NFRs
4. **Generate a unified BRD_PRD.md** with measurable, testable requirements
5. **Save to the specified folder path** with proper naming

**Critical Principle:** Every requirement must trace back to a business objective. Every acceptance criterion must be measurable and testable.

**Important:** Do NOT start implementing. Just create the document.

**Important:** Do NOT create `prd.json`. That is the responsibility of the `cc-gen-prd-task` skill, which should run after the Technical Spec is written.

**Important:** When this document is later converted to JSON format (by the `cc-gen-prd-task` skill), the `featureId` field in the JSON output MUST be set to the extracted feature_number (e.g., "006", "010", "099"). Ensure the feature_number is clearly documented in the generated markdown document so it can be extracted during JSON conversion.

---

## Understanding the Duality: BRD vs PRD vs Unified

### When To Use This Skill

- Use this skill when the request needs both strategic business framing and tactical product requirements in one document.
- Use `cc-gen-prd-lite` or `cc-gen-prd` instead when the user only needs a PRD.

### The Two Questions Every Project Must Answer

1. **Strategic "Why" (BRD):** Why are we doing this? What business value will it deliver? What constitutes success for the organization?
2. **Tactical "What" (PRD):** What precisely are we building? How should it function for users?

**Critical Insight:** Conflating these is a costly error. The BRD is the business case and investment justification. The PRD is the build plan and implementation blueprint.

### Document Type Decision Matrix

| Use Case | Document Type | Primary Audience | Lifecycle |
| -------- | ------------- | ---------------- | --------- |
| Need executive buy-in, budget approval, strategic alignment | **BRD** | Executives, sponsors, stakeholders | Static, formally approved at inception |
| Planning features, defining user stories, guiding development | **PRD** | Product managers, engineers, designers, QA | Living document, evolves iteratively |
| Small-to-medium projects where strategy and execution are tightly coupled | **Unified BRD-PRD** | All stakeholders + delivery team | Hybrid: strategic sections static, tactical sections evolve |

### The Golden Thread of Traceability

The ultimate goal is creating an unbroken chain of logic:

1. **Business Objective** (BRD) → "Increase e-commerce conversion rate by 5%"
2. **User Insight** (Research) → "Every second of page load delay beyond 2s drops conversion by 7%"
3. **Measurable NFR** (PRD) → "All pages must load in <2.5s on 4G mobile"
4. **Testable Acceptance Criterion** (User Story) → "Given a 4G connection, When page renders, Then LCP completes within 2.5s"

This thread allows anyone to trace a line of code back to the business objective it serves.

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
4. Proceed to Step 1.2 (ID Generation Format)

---

## Step 1.2: ID Generation Format

**After extracting and confirming the feature number, use it to generate all requirement IDs throughout the document.**

### ID Format Pattern

All requirement IDs must follow this pattern:

```
{TYPE}-{feature_number}-{seq}
```

Where:
- **{TYPE}**: The requirement type (see supported types below)
- **{feature_number}**: The 3-digit feature number extracted from the folder (e.g., "006", "010", "099")
- **{seq}**: A 2-digit sequential number with zero-padding (01, 02, 03, ..., 10, 11, etc.)

### Supported ID Types

This skill uses the following ID types:

| ID Type | Description | Example |
|---------|-------------|---------|
| **OBJ** | Business Objective | OBJ-006-01 |
| **GOAL** | Goal | GOAL-006-01 |
| **US** | User Story | US-006-01 |
| **AC** | Acceptance Criteria | AC-006-01 |
| **RISK** | Risk | RISK-006-01 |
| **NFR** | Non-Functional Requirement | NFR-006-01 |
| **TC** | Technical Constraint | TC-006-01 |
| **FR** | Functional Requirement | FR-006-01 |

### Sequential Numbering Rules

1. **Most ID types use independent sequential counters:**
   - First Business Objective: OBJ-006-01, second: OBJ-006-02, etc.
   - First User Story: US-006-01, second: US-006-02, etc.
   - First Risk: RISK-006-01, second: RISK-006-02, etc.

2. **Acceptance Criteria (AC) use GLOBAL sequential numbering:**
   - AC IDs increment continuously across ALL user stories
   - Do NOT reset the AC counter for each user story
   - Example:
     ```markdown
     ### US-006-01: User Login
     - AC-006-01: WHEN user enters valid credentials...
     - AC-006-02: WHEN user enters invalid credentials...
     
     ### US-006-02: User Profile
     - AC-006-03: WHEN user navigates to profile... (counter continues from 03, not reset to 01)
     - AC-006-04: WHEN user updates profile...
     ```

3. **Sequential numbers are always 2 digits with zero-padding:**
   - First item: 01 (not 1)
   - Tenth item: 10
   - Hundredth item: 100 (if needed)

### ID Generation Examples

**For feature number "006":**
- First user story: `US-006-01`
- Second user story: `US-006-02`
- First AC under US-006-01: `AC-006-01`
- Second AC under US-006-01: `AC-006-02`
- First AC under US-006-02: `AC-006-03` (global counter continues)
- Tenth AC overall: `AC-006-10`
- First risk: `RISK-006-01`

**For feature number "010":**
- First business objective: `OBJ-010-01`
- First goal: `GOAL-010-01`
- Fifth technical constraint: `TC-010-05`
- First functional requirement: `FR-010-01`

**For feature number "099":**
- First user story: `US-099-01`
- First NFR: `NFR-099-01`

### Implementation Instructions

When generating the document:

1. **Initialize counters for each ID type** at the start of document generation
2. **Maintain a global AC counter** that increments across all user stories
3. **Use the extracted feature_number** in all generated IDs
4. **Format sequential numbers with zero-padding** (use 01, 02, not 1, 2)
5. **Preserve leading zeros in feature_number** (use "006", not "6")

Proceed to Step 2 (Clarifying Questions) after understanding these ID generation rules.

---

## Step 2: Clarifying Questions

Ask only critical questions where the initial prompt is ambiguous. Use lettered options for quick responses.

### Essential Questions Framework

```text
1. What is the primary business objective?
   A. Increase revenue/conversions
   B. Reduce costs/improve efficiency
   C. Improve user experience/satisfaction
   D. Regulatory compliance/risk mitigation
   E. Market expansion/competitive positioning
   F. Other: [please specify]

2. What type of document do you need?
   A. BRD only (strategic justification for executives)
   B. PRD only (tactical implementation for dev team)
   C. Unified BRD-PRD (both strategy and execution)
   D. Not sure - help me decide

3. Who is the target user/audience?
   A. End customers (external)
   B. Internal employees
   C. Business partners/B2B
   D. Administrators only
   E. Multiple user types

4. What is the desired scope?
   A. Minimal viable version (MVP)
   B. Full-featured implementation
   C. Phased rollout (specify phases)
   D. Proof of concept only

5. What evidence supports this initiative?
   A. User research/interviews
   B. Analytics/data showing problem
   C. Competitive analysis
   D. Executive directive/strategic initiative
   E. Multiple sources
```

This lets users respond with "1A, 2C, 3E, 4A, 5B" for quick iteration.

---

## Step 3: Core Principles for Requirements Excellence

### The Golden Thread Principle

Every requirement must trace back to a business objective. If you cannot draw a line from a technical specification to a business goal, that requirement is suspect.

**Implementation:** Use explicit linking in your documents:

- User stories include "Validates: [OBJ-XX or GOAL-XX]" field
- Acceptance criteria are numbered (AC-XXX-01, AC-XXX-02, etc.)
- Functional requirements include "Supports: [US-XXX]" notation
- Test cases include "Validates: [US-XXX, AC-XXX-XX]" field
- This creates complete bidirectional traceability from test code to business value

### Machine-Readability First

- **Plain Language:** Avoid jargon, use direct statements
- **Clear Hierarchy:** Use semantic headings (#, ##, ###)
- **Structured Formats:** Tables and lists over prose
- **Explicit Terminology:** Include glossary for domain terms
- **Markdown Format:** Preserve semantic structure for AI parsing

### Structured Requirements Language

- **User Stories:** "As a [user type], I want [goal] so that [benefit]"
  - Each user story must include a "Validates:" field linking back to the business objective or goal it supports
- **Gherkin Acceptance Criteria:** Given-When-Then format for testability
- **MoSCoW Prioritization:** Must/Should/Could/Won't Have
- **SMART Goals:** Specific, Measurable, Achievable, Relevant, Time-bound
- **INVEST User Stories:** Independent, Negotiable, Valuable, Estimable, Small, Testable

### The Measurability Mandate

**Vague requirements are untestable.** Transform every subjective statement into an objective, measurable criterion:

| ❌ Vague (Avoid) | ✅ Measurable (Use) |
| ---------------- | ------------------- |
| "The system should be fast" | "95% of API requests must return in <200ms under 1,000 concurrent users" |
| "The site should be secure" | "All PII encrypted at rest using AES-256; passwords hashed using bcrypt" |
| "Easy to use" | "First-time users complete checkout in <3 minutes without assistance" |
| "Highly available" | "99.95% uptime measured quarterly, excluding scheduled maintenance" |

---

## Step 4: Generate Document

Based on user answers, generate the appropriate document using templates below. Always build the golden thread from business objectives to testable criteria.

### Document Templates

#### Template Selection Guide

- **Use BRD Template:** When you need executive approval, budget justification, or formal sign-off before development
- **Use PRD Template:** When business case is approved and you need to guide the development team
- **Use Unified Template:** For small-to-medium projects where strategy and execution are tightly coupled

#### Unified BRD-PRD Template (Recommended for Most Projects)

- **[BRD-PRD Template.md](BRD_PRD_Template.md):** This template combines strategic justification with tactical execution, maintaining the golden thread throughout.

#### Standalone BRD Template (For Executive Approval Only)

- **[BRD Template](BRD_Template.md):** Use this when you need formal business case approval before creating the PRD.

#### Standalone PRD Template (When BRD Already Approved)

- **[PRD Template](PRD_Template.md):** Use this when the business case is approved and you need to guide development.

### Gherkin Acceptance Criteria Masterclass

Gherkin is a structured language for writing testable acceptance criteria using the Given-When-Then format. It's the bridge between business requirements and automated testing.

#### The Gherkin Syntax

- **Given:** Initial context/precondition - the state before the action
- **When:** Action performed - what the user does
- **Then:** Expected outcome - what should happen
- **And/But:** Extend any step with additional conditions

**Example:**

```gherkin
Scenario: Successful user login
  Given I am on the login page
  And I have entered valid credentials
  When I click "Log In"
  Then I am redirected to my dashboard
  And I see a welcome message with my name
```

#### Gherkin Best Practices

1. **Write Scenarios for Both Happy and Sad Paths:**
   - Happy path: Everything works as expected
   - Sad path: Error conditions and edge cases

2. **Be Specific and Measurable:**
   - ❌ "Then the page loads quickly"
   - ✅ "Then the LCP completes within 2.5 seconds"

3. **One Scenario Per Behavior:**
   - Don't combine multiple unrelated behaviors in one scenario

4. **Use Real Data in Examples:**
   - ❌ "Given I enter a valid email"
   - ✅ "Given I enter `user@example.com` as my email"

#### Complete User Story Template with Gherkin

- **[Complete User Story Template with Gherkin](Complete_User_Story_Template_with_Gherkin):** A template of a complete User Story with Gherkin.

### INVEST Criteria for User Stories

Ensure user stories are:

- **I**ndependent: Self-contained
- **N**egotiable: Starting point for conversation
- **V**aluable: Delivers clear user value
- **E**stimable: Team can estimate effort
- **S**mall: Completable in one sprint
- **T**estable: Clear completion criteria

### User Story Format with Traceability

Each user story must follow this format:

```markdown
### US-{feature_number}-{seq}: [Descriptive Title]
**As a** [user type]
**I want** [feature/capability]
**So that** [benefit/value]

**Acceptance Criteria:**
- [ ] AC-{feature_number}-{seq}: Specific, verifiable criterion (use numbers, not vague terms)
- [ ] AC-{feature_number}-{seq}: Another measurable criterion
- [ ] AC-{feature_number}-{seq}: Error handling: [specific error scenario]
- [ ] AC-{feature_number}-{seq}: Typecheck/lint passes

**Validates:** [OBJ-{feature_number}-{seq}, GOAL-{feature_number}-{seq}, or NFR-{feature_number}-{seq} that this story supports]
```

**Required Format:** Use `### US-{feature_number}-{seq}: [Title]` format (heading level 3, colon after ID). This format is required for the `cc-gen-prd-task` skill to parse and convert to prd.json.

**Important:**

- Use the feature number extracted from the folder path in all IDs
- Number each acceptance criterion with global sequential numbering (AC-{feature_number}-01, AC-{feature_number}-02, etc.) for traceability
- The AC counter increments globally across all user stories, not per story
- The "Validates:" field maintains the golden thread by explicitly linking each user story back to its business justification
- Test cases will reference these AC IDs to complete the traceability chain

**Example for feature number "006":**
```markdown
### US-006-01: User Login
**As a** registered user  
**I want** to log in with my credentials  
**So that** I can access my account

**Acceptance Criteria:**
- [ ] AC-006-01: WHEN user enters valid credentials, THEN user is logged in
- [ ] AC-006-02: WHEN user enters invalid credentials, THEN error message is displayed

**Validates:** OBJ-006-01

### US-006-02: User Profile
**As a** logged-in user  
**I want** to view my profile  
**So that** I can see my account information

**Acceptance Criteria:**
- [ ] AC-006-03: WHEN user navigates to profile, THEN profile information is displayed (note: global counter continues)
- [ ] AC-006-04: WHEN user updates profile, THEN changes are saved

**Validates:** OBJ-006-01
```

### Writing Best Practices

#### When Creating BRDs

1. **Collaborate Early**: Engage stakeholders from the start
2. **Write Executive Summary Last**: After all sections are complete
3. **Use SMART Goals**: Specific, Measurable, Achievable, Relevant, Time-bound
4. **Define "Out of Scope" Explicitly**: Prevent scope creep
5. **Include Root Cause Analysis**: Solve the right problem
6. **Formal Approval**: Get sign-off before development

#### When Creating PRDs

1. **Co-Create with Team**: Product, design, and engineering together - never write in a silo
2. **Focus on Problem, Not Solution**: Empower team to find best "how"
3. **Keep It Living**: Update continuously as decisions are made - PRD is never "done"
4. **Link to External Tools**: Jira for stories, Figma for designs - avoid embedding everything
5. **Use Visuals**: Flow diagrams, mockups, prototypes enhance clarity
6. **Make NFRs Measurable**: Avoid vague terms like "fast" or "secure"
7. **Define Success Metrics First**: Before designing solution, establish what success looks like
8. **Anchor to Problem Statement**: Use it as filter for scope decisions and feature requests
9. **Log Decisions**: Track "why" behind choices to prevent re-litigation
10. **Progressive Disclosure**: Keep core document concise, link to detailed artifacts

---

## Step 5: Output & Save

### File Naming & Location

**Unified BRD-PRD Files:**

- **Format:** Markdown (`.md`)
- **Location:** `prds/[seq]_[feature-name]/` (snake-case)
- **Filename:** `BRD_PRD.md`
- Example: `prds/004_contact_update/BRD_PRD.md`

### Document Metadata for JSON Conversion

**Important:** When this document is later converted to JSON format (by the `cc-gen-prd-task` skill), the following metadata must be extractable:

- **featureId**: Set to the extracted feature_number (e.g., "006", "010", "099")
- **featureName**: Extracted from the folder name (e.g., "about_founder_name", "payment_gateway")
- **documentType**: Always set to `"BRD_PRD"` for this skill

To ensure proper JSON conversion, include a metadata section at the top of the generated document (after the title) with this information:

```markdown
## Document Metadata

- **Feature ID**: {feature_number}
- **Feature Name**: {feature_name}
- **Document Type**: BRD_PRD
- **Generated Date**: {YYYY-MM-DD}
```

**Example:**
```markdown
## Document Metadata

- **Feature ID**: 006
- **Feature Name**: about_founder_name
- **Document Type**: BRD_PRD
- **Generated Date**: 2024-01-15
```

This metadata section ensures that when the document is converted to JSON format, the `featureId` field will be correctly set to the feature_number extracted from the folder path.

### Output Format Standards

Always output in Markdown with:

- Semantic heading hierarchy (# ## ###)
- Tables for structured data
- Bullet/numbered lists for items
- Gherkin code blocks for acceptance criteria
- Links to external resources where appropriate

---

## Checklist Before Saving

### Unified BRD-PRD Checklist

- [ ] Asked clarifying questions with lettered options
- [ ] Incorporated user's answers
- [ ] All business objectives are SMART goals
- [ ] Success metrics are measurable and specific
- [ ] Problem statement includes quantitative AND qualitative evidence
- [ ] Success metrics defined before solution design
- [ ] User stories follow INVEST criteria
- [ ] Each story has verifiable acceptance criteria numbered as AC-XXX-01, AC-XXX-02, etc.
- [ ] Each user story includes "Validates:" field linking to business objective/goal
- [ ] Functional requirements include "Supports:" notation linking to user stories
- [ ] Non-functional requirements are measurable
- [ ] Out-of-scope items explicitly listed
- [ ] Decision log included for key choices
- [ ] Document Metadata section included with Feature ID, Feature Name, Document Type, and Generated Date
- [ ] Saved to `prds/{prefix}_{name}/BRD_PRD.md`

### Test Implementation Checklist

- [ ] Each test case includes "Validates:" field referencing US-XXX and AC-XXX-XX
- [ ] Test cases use numbered IDs (TC-001, TC-002, etc.)
- [ ] Test type and framework clearly specified
- [ ] Tests cover both happy path and error scenarios
- [ ] All acceptance criteria have corresponding test cases

---

## Golden Thread of Traceability

Ensure every requirement traces back to business objectives with explicit linking:

1. **Business Objective** (BRD) → OBJ-{feature_number}-01
2. **User Story** (PRD) → US-{feature_number}-15 *(Validates: OBJ-{feature_number}-01)*
3. **Acceptance Criteria** (PRD) → AC-{feature_number}-45 *(part of US-{feature_number}-15)*
4. **Test Cases** (Implementation) → TC-{feature_number}-01 *(Validates: US-{feature_number}-15, AC-{feature_number}-45)*

This creates an unbroken chain from strategic goals to executable specifications.

**Example for feature number "006":**

1. **Business Objective** (BRD) → OBJ-006-01
2. **User Story** (PRD) → US-006-15 *(Validates: OBJ-006-01)*
3. **Acceptance Criteria** (PRD) → AC-006-45 *(part of US-006-15)*
4. **Test Cases** (Implementation) → TC-006-01 *(Validates: US-006-15, AC-006-45)*

### Test Case Format with Traceability

Each test case must reference the acceptance criteria it validates:

```markdown
### TC-{feature_number}-{seq}: [Descriptive Test Name]
**Validates:** [US-{feature_number}-{seq}, AC-{feature_number}-{seq} that this test verifies]
**Test Type:** [Unit/Integration/E2E/Performance/Security]
**Framework:** [Jest/Cypress/Lighthouse/etc.]

[Test implementation using Gherkin or test framework syntax]
```

This ensures every test traces back through acceptance criteria to user stories to business objectives.

**Example for feature number "006":**
```markdown
### TC-006-01: User Login Success
**Validates:** US-006-01, AC-006-01
**Test Type:** E2E
**Framework:** Playwright

Given I am on the login page
When I enter valid credentials
Then I am logged in successfully
```

### Example: Complete Golden Thread

Let's trace a complete golden thread from business objective to testable criterion:

**1. Business Objective (BRD):**

- OBJ-006-01: Increase e-commerce conversion rate by 5% within 6 months

**2. User Research Insight:**

- Data shows: Every 1 second of page load delay beyond 2s reduces conversion by 7%

**3. Measurable NFR (PRD):**

- NFR-006-01: All customer-facing pages must achieve Largest Contentful Paint (LCP) < 2.5s on 4G mobile

**4. User Story:**

- US-006-15: As a mobile shopper, I want pages to load quickly, so that I can complete my purchase without frustration.
- **Validates:** OBJ-006-01 (Increase e-commerce conversion rate by 5%)

**5. Testable Acceptance Criterion (Gherkin):**

```gherkin
Scenario: Fast page load on mobile
  Given I am a user on a 4G mobile connection
  And I navigate to the product detail page
  When the page begins to render
  Then the Largest Contentful Paint (LCP) completes within 2.5 seconds
  And the page is fully interactive

Scenario: Performance under load
  Given the system is experiencing 1,000 concurrent users
  When I navigate to the checkout page
  Then the page still loads with LCP < 2.5 seconds
  And no degradation in user experience occurs
```

**6. Test Implementation:**

```markdown
### TC-006-01: Fast page load on mobile
**Validates:** US-006-15, AC-006-45 (LCP < 2.5s on 4G mobile)
**Test Type:** Automated performance test
**Framework:** Lighthouse CI

Scenario: Fast page load on mobile
  Given I am a user on a 4G mobile connection
  And I navigate to the product detail page
  When the page begins to render
  Then the Largest Contentful Paint (LCP) completes within 2.5 seconds
  And the page is fully interactive

**Implementation:**
- Automated Lighthouse CI test runs on every deployment
- Fails build if LCP > 2.5s
- Directly validates AC-006-45, which is part of US-006-15, which validates OBJ-006-01
```

This is the golden thread in action: a test case (TC-006-01) traces through acceptance criteria (AC-006-45) → user story (US-006-15) → business objective (OBJ-006-01). Every line of test code serves a documented business purpose.

---

## Writing for Junior Developers & AI Agents

The document reader may be a junior developer or AI agent. Therefore:

- Be explicit and unambiguous
- Avoid jargon or explain it in glossary
- Provide enough detail to understand purpose and core logic
- Number requirements for easy reference using the canonical folder-based format (OBJ-{feature_number}-{seq}, US-{feature_number}-{seq}, AC-{feature_number}-{seq}, etc.)
- Use concrete examples where helpful
- Make acceptance criteria verifiable, not vague
- Define what "done" looks like for each requirement

---

## Workflow Examples

### Example 1: Successful Folder Path Input and ID Generation

**User Request:** "Create a BRD-PRD for the About Founder feature"

**System Workflow:**

```
System: Where should this document be saved? (e.g., prds/006_about_founder_name/)
User: prds/006_about_founder_name/

System: Validating folder name...
System: ✓ Folder name matches pattern: 006_about_founder_name
System: ✓ Numeric prefix: 006 (valid range 001-999)
System: ✓ Underscore separator present
System: ✓ Feature name: about_founder_name

System: Using feature number 006 from folder '006_about_founder_name'
System: Proceed with document generation? (yes/no)
User: yes

System: [Asks clarifying questions with lettered options]
User: 1A, 2C, 3E, 4A, 5B

System: [Generates BRD-PRD with folder-based IDs]

Generated IDs:
- Business Objectives: OBJ-006-01, OBJ-006-02
- Goals: GOAL-006-01, GOAL-006-02
- User Stories: US-006-01, US-006-02, US-006-03
- Acceptance Criteria: AC-006-01, AC-006-02, AC-006-03, AC-006-04 (global counter)
- Risks: RISK-006-01
- NFRs: NFR-006-01, NFR-006-02
- Technical Constraints: TC-006-01
- Functional Requirements: FR-006-01, FR-006-02

System: Document saved to prds/006_about_founder_name/BRD_PRD.md
System: ✓ Feature ID set to 006 in document metadata
```

**Sample Output Snippet:**

```markdown
## Document Metadata

- **Feature ID**: 006
- **Feature Name**: about_founder_name
- **Document Type**: BRD_PRD
- **Generated Date**: 2024-01-15

## Business Objectives

### OBJ-006-01: Increase User Trust
Build credibility by showcasing founder's expertise and background...

## User Stories

### US-006-01: View Founder Biography
**As a** potential customer  
**I want** to read about the founder's background  
**So that** I can trust the company's expertise

**Acceptance Criteria:**
- [ ] AC-006-01: Biography section displays founder's name and photo
- [ ] AC-006-02: Biography includes professional background (minimum 200 words)
- [ ] AC-006-03: Typecheck passes
- [ ] AC-006-04: Lint passes

**Validates:** OBJ-006-01

### US-006-02: View Founder Credentials
**As a** potential customer  
**I want** to see the founder's credentials and certifications  
**So that** I can verify their qualifications

**Acceptance Criteria:**
- [ ] AC-006-05: Credentials section lists all certifications (note: global counter continues)
- [ ] AC-006-06: Each credential shows issuing organization and date
- [ ] AC-006-07: Typecheck passes

**Validates:** OBJ-006-01
```

### Example 2: Validation Error and Retry Flow

**User Request:** "Create a BRD-PRD for the payment gateway feature"

**System Workflow:**

```
System: Where should this document be saved? (e.g., prds/006_about_founder_name/)
User: prds/payment_gateway/

System: Validating folder name...
System: ✗ Validation failed

Invalid folder name format

Expected pattern: {NNN}_{feature_name}
Example: 006_about_founder_name

Your input: payment_gateway
Issue: Missing 3-digit numeric prefix at the start

Please provide a valid folder path:

User: prds/10_payment_gateway/

System: Validating folder name...
System: ✗ Validation failed

Invalid folder name format

Expected pattern: {NNN}_{feature_name}
Example: 006_about_founder_name

Your input: 10_payment_gateway
Issue: Numeric prefix must be exactly 3 digits (found 2 digits)

Please provide a valid folder path:

User: prds/010_payment_gateway/

System: Validating folder name...
System: ✓ Folder name matches pattern: 010_payment_gateway
System: ✓ Numeric prefix: 010 (valid range 001-999)
System: ✓ Underscore separator present
System: ✓ Feature name: payment_gateway

System: Using feature number 010 from folder '010_payment_gateway'
System: Proceed with document generation? (yes/no)
User: yes

System: [Continues with document generation]
System: Document saved to prds/010_payment_gateway/BRD_PRD.md
```

### Example 3: Complete Document with Folder-Based IDs

**Folder:** `prds/099_final_feature/`

**Generated Document Structure:**

```markdown
# BRD-PRD: Final Feature Implementation

## Document Metadata

- **Feature ID**: 099
- **Feature Name**: final_feature
- **Document Type**: BRD_PRD
- **Generated Date**: 2024-01-15

## Business Objectives

### OBJ-099-01: Complete Product Launch
Finalize all remaining features for product launch...

### OBJ-099-02: Achieve Market Readiness
Ensure product meets all market requirements...

## Goals

### GOAL-099-01: Launch by Q2 2024
Complete development and testing by March 31, 2024...

## User Stories

### US-099-01: Final Integration Testing
**As a** QA engineer  
**I want** to run comprehensive integration tests  
**So that** all features work together seamlessly

**Acceptance Criteria:**
- [ ] AC-099-01: All integration tests pass
- [ ] AC-099-02: No critical bugs remain
- [ ] AC-099-03: Performance meets NFR-099-01 requirements

**Validates:** GOAL-099-01

### US-099-02: Production Deployment
**As a** DevOps engineer  
**I want** to deploy to production environment  
**So that** users can access the complete product

**Acceptance Criteria:**
- [ ] AC-099-04: Deployment pipeline executes successfully (global counter continues)
- [ ] AC-099-05: Health checks pass post-deployment
- [ ] AC-099-06: Rollback plan tested and documented

**Validates:** GOAL-099-01

## Risks

### RISK-099-01: Deployment Delays
**Risk:** Integration issues may delay production deployment
**Mitigation:** Conduct thorough staging environment testing

## Non-Functional Requirements

### NFR-099-01: System Performance
All API endpoints must respond within 200ms under 1000 concurrent users

### NFR-099-02: System Availability
99.9% uptime measured monthly, excluding scheduled maintenance

## Technical Constraints

### TC-099-01: Database Migration
Must migrate existing data without downtime using blue-green deployment

## Functional Requirements

- FR-099-01: System shall support rollback to previous version within 5 minutes
- FR-099-02: All user data shall be backed up before deployment
```

---

## Troubleshooting Guide

### Common Validation Errors

#### Error: Missing 3-Digit Numeric Prefix

**Symptom:**
```
Invalid folder name format
Your input: about_founder
Issue: Missing 3-digit numeric prefix at the start
```

**Cause:** Folder name doesn't start with 3 digits

**Solution:** Add a 3-digit prefix (001-999) followed by an underscore
- ❌ Wrong: `about_founder`
- ✅ Correct: `006_about_founder`

#### Error: Numeric Prefix Wrong Length

**Symptom:**
```
Invalid folder name format
Your input: 6_feature
Issue: Numeric prefix must be exactly 3 digits (found 1 digit)
```

**Cause:** Prefix has fewer or more than 3 digits

**Solution:** Use exactly 3 digits with leading zeros if needed
- ❌ Wrong: `6_feature` (1 digit)
- ❌ Wrong: `06_feature` (2 digits)
- ❌ Wrong: `0006_feature` (4 digits)
- ✅ Correct: `006_feature` (3 digits)

#### Error: Missing Underscore Separator

**Symptom:**
```
Invalid folder name format
Your input: 006feature
Issue: Missing underscore after the 3-digit prefix
```

**Cause:** No underscore between prefix and feature name

**Solution:** Add an underscore after the 3-digit prefix
- ❌ Wrong: `006feature`
- ❌ Wrong: `006-feature`
- ❌ Wrong: `006.feature`
- ✅ Correct: `006_feature`

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

#### Issue: Acceptance Criteria Counter Not Global

**Symptom:** AC IDs reset for each user story (AC-006-01, AC-006-01, AC-006-01...)

**Expected Behavior:** AC IDs should increment globally across all user stories

**Correct Pattern:**
```markdown
### US-006-01: First Story
- AC-006-01: First criterion
- AC-006-02: Second criterion

### US-006-02: Second Story
- AC-006-03: First criterion (continues from 03, not reset to 01)
- AC-006-04: Second criterion
```

**Solution:** Maintain a single global counter for AC IDs throughout the entire document

#### Issue: Leading Zeros Stripped from Feature Number

**Symptom:** IDs show `US-6-01` instead of `US-006-01`

**Cause:** Feature number converted to integer, losing leading zeros

**Solution:** Keep feature number as a string throughout the process
- ❌ Wrong: Convert "006" to number 6, then format as `US-6-01`
- ✅ Correct: Keep "006" as string, format as `US-006-01`

#### Issue: Inconsistent Feature Numbers in Document

**Symptom:** Document contains mixed feature numbers (US-006-01, US-007-01)

**Cause:** Feature number not consistently applied to all IDs

**Solution:** Extract feature number once at the start and use it for all IDs
- All IDs in a single document must use the same feature number
- Feature number comes from the folder name prefix

### Metadata Issues

#### Issue: Feature ID Not Set in Metadata

**Symptom:** Document metadata missing Feature ID field

**Solution:** Always include metadata section at the top of the document:
```markdown
## Document Metadata

- **Feature ID**: 006
- **Feature Name**: about_founder_name
- **Document Type**: BRD_PRD
- **Generated Date**: 2024-01-15
```

This ensures proper JSON conversion by the `cc-gen-prd-task` skill.

### File Naming Issues

#### Issue: Document Saved to Wrong Location

**Symptom:** Document saved to root or incorrect folder

**Solution:** Always use the folder path provided by the user
- User provides: `prds/006_about_founder_name/`
- Save to: `prds/006_about_founder_name/BRD_PRD.md`
- Do NOT save to: `prds/BRD_PRD.md` or `BRD_PRD.md`

### Best Practices

1. **Always validate before proceeding:** Don't skip folder name validation
2. **Display confirmation messages:** Let users verify the extracted feature number
3. **Use global AC counter:** Never reset AC counter per user story
4. **Preserve leading zeros:** Keep feature numbers as strings (006, not 6)
5. **Include metadata section:** Required for JSON conversion
6. **Follow file naming conventions:** Use exact folder path provided by user
