---
name: jodex-gen-prd-lite
description: "Generate streamlined Product Requirements Documents with built-in traceability. Balances speed with rigor for mid-sized features. Triggers on: create prd, write requirements, plan feature, document feature, feature spec."
user-invocable: true
---

# PRD Lite: Streamlined Requirements with Traceability

**Role:** You create focused, measurable PRDs that connect business goals to testable implementation criteria. You balance speed with rigor - faster than full BRD-PRD workflows, more structured than basic feature planning.

**Goal:** Transform feature ideas into clear, actionable requirements where every technical decision traces back to a measurable objective.

---

## The Job

1. **Ask 3-5 clarifying questions** (with lettered options for quick responses)
2. **Identify the business objective** (the "why" behind the feature)
3. **Generate structured PRD** with measurable acceptance criteria
4. **Save to appropriate location** with proper naming

**Critical Principles:**
- Every requirement must be measurable and testable
- Every feature must connect to a business objective
- Acceptance criteria must use verifiable language (no vague terms)

**Important:** Do NOT start implementing. Just create the PRD.

---

## Step 1: Clarifying Questions

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

## Step 2: The Golden Thread

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

## Step 3: PRD Structure

Generate the PRD with these sections:

### 1. Overview
- **Feature ID:** `<id>` (e.g., 001, 2026-02-17)
- **Feature Name:** Clear, descriptive title
- **Business Objective:** The "why" - what business goal does this support?
- **Success Metric:** How will we measure success? (Be specific)

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
### US-001: [Descriptive Title]
**As a** [user type]  
**I want** [feature/capability]  
**So that** [benefit/value]

**Acceptance Criteria:**
- [ ] Specific, verifiable criterion (use numbers, not vague terms)
- [ ] Another measurable criterion
- [ ] Error handling: [specific error scenario]
- [ ] Typecheck
- [ ] Lint passes
- [ ] New unit test added to verification suite
- [ ] New e2e test added to verification suite
- [ ] Unit Tests passes
- [ ] E2E Tests passes
- [ ] Typecheck passes
- [ ] **[UI stories only]** Verify in browser using dev-browser skill

**Validates:** [Link back to business objective or goal]
```

**Critical Rules for Acceptance Criteria:**
- Must be verifiable - no vague terms like "fast", "secure", "easy"
- Use specific numbers: "<200ms", "99.9% uptime", "<3 clicks"
- Include error/edge cases
- New unit test added to verification suite
- New e2e test added to verification suite
- Typecheck passes
- Lint passes
- Unit Test passes
- E2E Test passes
- For UI work, always include browser verification

### 5. Functional Requirements

Numbered list of specific system-level functionalities. Each requirement should reference the user story it supports.

**Format:**
- FR-1: The system must [specific action with measurable outcome] *(Supports US-XXX)*
- FR-2: When [trigger], the system must [response with timing/behavior] *(Supports US-XXX)*
- FR-3: All [data type] must be [specific constraint] *(Supports US-XXX)*

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
- **Performance:** "Page load <2.5s on 4G mobile (LCP metric)"
- **Security:** "All API endpoints require JWT authentication"
- **Accessibility:** "WCAG 2.1 AA compliance verified with axe DevTools"
- **Scalability:** "Support 10,000 concurrent users without degradation"

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

## Step 4: Writing Best Practices

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

## Step 5: Output & Save

### File Naming & Location

- **Format:** Markdown (`.md`)
- **Location:** `prd/<id>_<name>/`
- **Filename:** `PRD.md`

**Feature ID (`<id>`) Guidelines:**
- Use 3-digit sequential numbers: `001`, `002`, `003`
- Check existing `prd/` directory for the highest number
- Increment by 1 for new features
- Alternative: Use date-based IDs: `2026-02-17` or `20260217`

**Feature Name (`<name>`) Guidelines:**
- Use kebab-case: lowercase with hyphens
- Keep concise: 2-4 words maximum
- Derive from the feature name in Overview section
- Example: `user-authentication`, `payment-gateway`, `email-notifications`

**Complete Examples:**
- `prd/001_user-authentication/PRD.md`
- `prd/002_payment-gateway/PRD.md`
- `prd/2026-02-17_email-notifications/PRD.md`

### Output Format

Use Markdown with:
- Semantic heading hierarchy (# ## ###)
- Tables for structured comparisons
- Bullet/numbered lists for requirements
- Code blocks for Gherkin scenarios
- Checkboxes for acceptance criteria

---

## Example PRD

```markdown
# PRD: One-Click Checkout

## Overview
**Feature ID:** 009
**Feature Name:** One-Click Checkout for Returning Customers  
**Business Objective:** Increase checkout conversion rate by 8% (from 65% to 73%)  
**Success Metric:** Checkout completion time reduced from 2:30 to <1:00 for returning users

## Problem Statement

Analytics show 35% of returning customers abandon their cart during checkout. User interviews reveal the multi-step checkout process feels tedious for repeat purchases. Competitors offer one-click checkout, putting us at a disadvantage.

**Evidence:**
- 35% cart abandonment rate for returning users
- Average checkout time: 2 minutes 30 seconds
- User feedback: "Why do I have to re-enter everything?"
- Competitor analysis: 3 of 5 top competitors offer one-click

## Goals

- Reduce checkout time from 2:30 to <1:00 for returning customers
- Increase checkout completion rate from 65% to 73%
- Maintain PCI compliance and security standards
- Launch within 6 weeks

## User Stories

### US-001: Save payment method securely
**As a** returning customer  
**I want** my payment method saved securely  
**So that** I don't have to re-enter it on every purchase

**Acceptance Criteria:**
- [ ] Payment details stored using PCI-compliant tokenization
- [ ] User can save up to 3 payment methods
- [ ] Saved methods show last 4 digits only
- [ ] User can delete saved payment methods
- [ ] Typecheck passes

**Validates:** Security requirement for one-click checkout

### US-002: One-click purchase button
**As a** returning customer with saved payment  
**I want** a "Buy Now" button on product pages  
**So that** I can complete purchase in one click

**Acceptance Criteria:**
- [ ] "Buy Now" button visible only for logged-in users with saved payment
- [ ] Clicking button completes purchase within 2 seconds
- [ ] Order confirmation displays immediately with order number
- [ ] Confirmation email sent within 30 seconds
- [ ] Button disabled during processing to prevent double-clicks
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

**Validates:** Goal to reduce checkout time to <1:00

### US-003: Order confirmation flow
**As a** customer who used one-click checkout  
**I want** immediate confirmation of my order  
**So that** I know my purchase was successful

**Acceptance Criteria:**
- [ ] Confirmation page loads within 1 second
- [ ] Shows order number, items, total, delivery estimate
- [ ] Includes link to order tracking
- [ ] Confirmation email sent within 30 seconds
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

**Validates:** User confidence in one-click purchase

## Functional Requirements

- FR-1: System must securely tokenize and store payment methods using PCI-compliant vault *(Supports US-001)*
- FR-2: "Buy Now" button appears on product pages for logged-in users with saved payment *(Supports US-002)*
- FR-3: Clicking "Buy Now" completes purchase within 2 seconds (95th percentile) *(Supports US-002)*
- FR-4: Order confirmation email sent within 30 seconds of purchase *(Supports US-003)*
- FR-5: Users can manage saved payment methods in account settings *(Supports US-001)*

## Non-Functional Requirements

- **Performance:** Order processing completes in <2 seconds for 95% of requests
- **Security:** All payment data tokenized using PCI DSS Level 1 compliant provider
- **Availability:** 99.9% uptime for checkout service
- **Accessibility:** All UI elements meet WCAG 2.1 AA standards
- **Mobile:** Feature works on iOS Safari and Android Chrome

## Non-Goals

- No support for guest checkout (one-click requires account)
- No saved shipping addresses in v1 (future enhancement)
- No subscription/recurring payment support
- No cryptocurrency payment options

## Success Metrics

**Primary Metrics:**
- Checkout completion rate: 65% → 73% (target: +8%)
- Average checkout time: 2:30 → <1:00 (target: 60% reduction)

**Secondary Metrics:**
- One-click adoption rate: >40% of returning customers
- Cart abandonment rate: 35% → <27%
- Customer satisfaction (post-purchase survey): >4.5/5

**Measurement:**
- Google Analytics event tracking for checkout funnel
- Server-side timing logs for performance
- Post-purchase NPS survey

## Open Questions

- Should we require re-authentication for purchases over $500?
- Do we need to support multiple shipping addresses in v1?
- What's the fallback if payment processing fails?
```

---

## Checklist Before Saving

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
- [ ] Saved to `docs/prd-[feature-name].md` or `tasks/prd-[feature-name].md`

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
