# [Feature Name] - Product Requirements Document

## 1. Overview

| Attribute | Details |
|-----------|---------|
| **Feature Name** | [Name] |
| **Status** | [Draft/In Review/Approved/In Development] |
| **Core Team** | [@PM, @Designer, @TechLead, @QA] |
| **Target Release** | [Date] |
| **Related BRD** | [Link] |
| **Epic** | [Link to Jira] |

## 2. Strategic Context

### Problem Statement
*(What user problem does this solve?)*

**Quantitative Evidence:**
- [Data point 1]

**Qualitative Evidence:**
- [User feedback]

### Business Objective Link
*(Which BRD objective does this support?)*
- **Links to:** OBJ-{feature_number}-{seq} from [BRD Name]

**Note:** Replace `{feature_number}` with the 3-digit feature number extracted from the folder path (e.g., "006").

### Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| [Metric] | [Baseline] | [Goal] | [Method] |

## 3. Target Users

**Primary Persona:** [Name]
- **Goals:** [What they want]
- **Pain Points:** [Current frustrations]

## 4. User Stories & Requirements

### Must-Have (MoSCoW)

**US-{feature_number}-01: [Title]**
- **Story:** As a [persona], I want to [action], so that [benefit].
- **Business Link:** → OBJ-{feature_number}-{seq}
- **Acceptance Criteria:**

```gherkin
Scenario: [Name] (AC-{feature_number}-01)
  Given [context]
  When [action]
  Then [outcome]

Scenario: [Error case] (AC-{feature_number}-02)
  Given [error context]
  When [action]
  Then [error handling]
```

### Should-Have
- **US-{feature_number}-02:** [Link to Jira for details]
  - AC-{feature_number}-03: [Criterion - note global counter continues]
  - AC-{feature_number}-04: [Another criterion]

### Could-Have
- **US-{feature_number}-03:** [Link to Jira for details]
  - AC-{feature_number}-05: [Criterion]

**Note:** Replace `{feature_number}` with the 3-digit feature number. AC IDs use global sequential numbering across all user stories.

## 5. Non-Functional Requirements

| NFR ID | Category | Requirement | Business Link | Test Method |
|--------|----------|-------------|---------------|-------------|
| NFR-{feature_number}-01 | Performance | [Specific, measurable requirement] | → OBJ-{feature_number}-{seq} | [Method] |
| NFR-{feature_number}-02 | Security | [Specific requirement] | → Compliance | [Method] |
| NFR-{feature_number}-03 | Usability | [Specific requirement] | → OBJ-{feature_number}-{seq} | [Method] |

**Note:** Replace `{feature_number}` with the 3-digit feature number extracted from the folder path.

## 6. Design & User Experience

- **User Flows:** [Link to Miro]
- **Wireframes:** [Link to Figma]
- **Mockups:** [Link to Figma]
- **Prototype:** [Link to Figma/InVision]

## 7. Technical Considerations

- **Architecture:** [Approach]
- **Integrations:** [External systems]
- **Data Model:** [Link to schema]

## 8. Open Questions & Decisions

| Question | Date | Decision | Rationale | Owner |
|----------|------|----------|-----------|-------|
| [Question] | [Date] | [Decision] | [Why] | [Name] |

## 9. Out of Scope (This Release)

- [Excluded feature 1]
- [Excluded feature 2]

## 10. Release Plan

| Milestone | Date | Status |
|-----------|------|--------|
| Design Complete | [Date] | [Status] |
| Dev Kickoff | [Date] | [Status] |
| Beta | [Date] | [Status] |
| Launch | [Date] | [Status] |
