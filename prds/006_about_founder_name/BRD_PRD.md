# About Us Founder Name Correction - Unified Requirements Document

## Document Metadata

- **Feature ID**: 006
- **Feature Name**: about_founder_name
- **Document Type**: BRD_PRD
- **Generated Date**: 2026-03-05

## Document Control

| Attribute | Details |
|-----------|---------|
| **Document Type** | Unified BRD-PRD |
| **Version** | 2.0 |
| **Status** | Draft |
| **Project Sponsor** | Kriss Aseniero (kriss@casacolinacare.com) |
| **Product Owner** | Ramon Aseniero (ramon@jairosoft.com) |
| **Core Team** | @Ramon (Developer) |
| **Target Release** | 2026-03-05 |
| **Last Updated** | 2026-03-18 |

---

## Part I: Strategic Foundation (BRD)

### 1. Executive Summary

The Casa Colina Care About Us page incorrectly displays "Kriss Judd" as the founder name in the "Meet Our Team" section. The correct name is "Kriss Aseniero." The original name was entered incorrectly during the initial site build (PRD 002) and propagated into 4 documentation files. This is a content correction — string replacements across 5 files with zero logic changes. The fix restores brand accuracy and professional credibility for the business owner.

### 2. Business Problem & Opportunity

#### 2.1 Current State ("As-Is")

The About page (`src/app/about/page.tsx`) renders a team section with the founder listed as "Kriss Judd" (line 43). This incorrect name also appears in project documentation files that inform AI assistants and future developers.

**Quantitative Evidence:**

- 1 source file displays the wrong name to site visitors
- 4 documentation files propagate the incorrect name to AI assistants and developers
- 100% of About page visitors see the wrong founder name

**Qualitative Evidence:**

- An incorrect founder name undermines the personal, trust-based brand that Casa Colina Care presents to prospective families
- The business owner's correct name is "Kriss Aseniero," not "Kriss Judd"

#### 2.2 Root Cause Analysis

1. **Why does the About page show the wrong name?** — The `team` array in `src/app/about/page.tsx` has `name: 'Kriss Judd'`
2. **Why was it entered as "Kriss Judd"?** — The name was entered incorrectly during the initial site build (PRD 002)
3. **Why did the error propagate?** — Documentation files (`CLAUDE.md`, `memory/people/`, `memory/glossary.md`, `memory/projects/`) were created using the same incorrect name
4. **Why wasn't it caught?** — No review caught the mistake before deployment

### 3. Business Objectives & Success Metrics

**THE GOLDEN THREAD STARTS HERE**

| Objective ID | SMART Business Objective | KPI | Current | Target | Measurement |
|---|---|---|---|---|---|
| OBJ-006-01 | Eliminate all instances of "Kriss Judd" in `src/` so the About page displays the correct founder name | Count of "Kriss Judd" in `src/` | 1 | 0 | `grep -r 'Kriss Judd' src/` returns no results |
| OBJ-006-02 | Update all documentation references so AI assistants and developers use the correct name | Count of "Kriss Judd" in `CLAUDE.md` and `memory/` | 4 | 0 | `grep -r 'Kriss Judd' CLAUDE.md memory/` returns no results |
| OBJ-006-03 | Maintain build, lint, and type-check integrity after all changes | Exit codes for `npm run build`, `npm run lint`, `npm run type-check` | 0 | 0 | CI pipeline |

### 4. Project Scope & Boundaries

#### 4.1 In Scope

- Replace "Kriss Judd" with "Kriss Aseniero" in the About page team array (`src/app/about/page.tsx`)
- Update "Kriss Judd" to "Kriss Aseniero" in `CLAUDE.md` people table
- Rename `memory/people/kriss-judd.md` to `memory/people/kriss-aseniero.md` and update name inside
- Update "Kriss Judd" to "Kriss Aseniero" in `memory/glossary.md` nicknames table
- Update "Kriss Judd" to "Kriss Aseniero" in `memory/projects/casacolinacare-website.md` key people

#### 4.2 Out of Scope (Critical for Scope Control)

- **Bio text:** The founder's biographical description remains unchanged
- **Role title:** "Founder & Director" stays as-is
- **Other team members:** No changes to other entries in the team array
- **Profile images:** No images are added or modified
- **Other pages:** Only the About page source code is affected
- **Contact information:** Phone, email, address are unrelated to this change

### 5. Stakeholder Analysis (RACI Matrix)

| Stakeholder | Role | Requirements | Approval | UAT | Development |
|---|---|---|---|---|---|
| Kriss Aseniero | Business Owner / Sponsor | C | **A** | **A** | I |
| Ramon Aseniero | Developer / Product Owner | **R** | C | C | **R** |
| Site Visitors | End users viewing the About page | I | I | I | I |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

### 6. Assumptions, Constraints & Dependencies

#### Assumptions

- "Kriss Aseniero" is the confirmed correct name for the business owner/founder
- The bio text and role title associated with the founder entry are correct and do not need changes

#### Constraints

| ID | Constraint |
|---|---|
| TC-006-01 | Changes must not break existing build, lint, or type-check pipelines |
| TC-006-02 | Same-day implementation and deployment |
| TC-006-03 | $0 incremental cost — developer time only |

#### Dependencies

- No external dependencies — all changes are to existing static content in the codebase

### 7. Financial Justification

#### Cost-Benefit Analysis

- **Estimated Costs:** $0 incremental (internal developer time, <15 minutes of work)
- **Projected Benefits:** Restores brand accuracy; ensures the business owner's correct name is displayed to all site visitors and used by AI assistants
- **ROI:** Effectively infinite — fixing a data entry error at zero cost
- **Payback Period:** Immediate upon deployment

#### Risk Assessment

| Risk ID | Risk Description | Likelihood (1-5) | Impact (1-5) | Mitigation Strategy |
|---|---|---|---|---|
| RISK-006-01 | Typo introduced during string replacement | 1 | 2 | Acceptance criteria specify exact string; build/lint gates catch errors |
| RISK-006-02 | Memory file rename breaks a reference | 1 | 1 | Memory files are read by AI assistants, not imported by code; no build dependency |

---

## Part II: Tactical Execution (PRD)

### 8. Target Users & Personas

**Primary Persona:** Site Visitors (Adult Children, 35-65)

- **Goals:** Learn about the team behind Casa Colina Care
- **Pain Points:** Seeing an incorrect founder name undermines confidence in the facility's professionalism
- **Context:** Viewing the About page "Meet Our Team" section

**Secondary Persona:** AI Assistants & Developers

- **Goals:** Use accurate business information when working on the codebase
- **Pain Points:** Documentation files contain the wrong name, leading to potential propagation of the error

### 9. User Stories & Functional Requirements

**THE GOLDEN THREAD CONTINUES: Each story links to a business objective**

#### Feature Area 1: Source Code

---

### US-006-01: Update Founder Name in About Page Team Section
**As a** site visitor viewing the About page
**I want** to see the correct founder name "Kriss Aseniero"
**So that** I have accurate information about who runs the care home

**Priority:** Must-Have (MoSCoW)
**File:** `src/app/about/page.tsx`

**Acceptance Criteria:**

```gherkin
Scenario: About page displays correct founder name
  Given the About page is rendered
  When I inspect the team section
  Then the text contains 'Kriss Aseniero'
  And the text does not contain 'Kriss Judd'

Scenario: About page team array has correct name at index 0
  Given the source file src/app/about/page.tsx
  When I inspect the team array
  Then the entry at index 0 has name 'Kriss Aseniero'
```

**Numbered Acceptance Criteria:**
- [ ] AC-006-01: The `team` array entry at index 0 has `name: 'Kriss Aseniero'`
- [ ] AC-006-02: The string `'Kriss Judd'` does not appear anywhere in `src/app/about/page.tsx`
- [ ] AC-006-03: The About page renders "Kriss Aseniero" in the team section (verified by unit test)
- [ ] AC-006-04: Typecheck passes (`npm run type-check` exits 0)
- [ ] AC-006-05: Lint passes (`npm run lint` exits 0)

**Validates:** OBJ-006-01, OBJ-006-03

---

#### Feature Area 2: Documentation

### US-006-02: Update Documentation References
**As a** developer or AI assistant working on the codebase
**I want** all documentation to reference the correct name "Kriss Aseniero"
**So that** the incorrect name does not propagate into future work

**Priority:** Must-Have (MoSCoW)
**Files:** `CLAUDE.md`, `memory/people/kriss-judd.md`, `memory/glossary.md`, `memory/projects/casacolinacare-website.md`

**Acceptance Criteria:**

```gherkin
Scenario: Documentation contains correct founder name
  Given the documentation files CLAUDE.md and memory/
  When I search for 'Kriss Judd'
  Then zero results are returned

Scenario: Memory file renamed correctly
  Given the file memory/people/kriss-judd.md existed previously
  When I check the filesystem
  Then memory/people/kriss-judd.md does not exist
  And memory/people/kriss-aseniero.md exists with heading '# Kriss Aseniero'
```

**Numbered Acceptance Criteria:**
- [ ] AC-006-06: `CLAUDE.md` People table lists "Kriss Aseniero" (not "Kriss Judd")
- [ ] AC-006-07: The file `memory/people/kriss-judd.md` no longer exists
- [ ] AC-006-08: The file `memory/people/kriss-aseniero.md` exists with heading "# Kriss Aseniero"
- [ ] AC-006-09: `memory/glossary.md` Nicknames table lists "Kriss Aseniero" (not "Kriss Judd")
- [ ] AC-006-10: `memory/projects/casacolinacare-website.md` Key People lists "Kriss Aseniero" (not "Kriss Judd")
- [ ] AC-006-11: `grep -r 'Kriss Judd' CLAUDE.md memory/` returns no results

**Validates:** OBJ-006-02

---

### 10. Non-Functional Requirements (NFRs)

**THE GOLDEN THREAD COMPLETES: NFRs trace to business objectives**

| NFR ID | Category | Requirement | Business Objective Link | Test Method |
|---|---|---|---|---|
| NFR-006-01 | Build Integrity | `npm run build` exits with code 0 after all changes | OBJ-006-03 | CI pipeline |
| NFR-006-02 | Code Quality | `npm run lint` exits with code 0 after all changes | OBJ-006-03 | CI pipeline |
| NFR-006-03 | Type Safety | `npm run type-check` exits with code 0 after all changes | OBJ-006-03 | CI pipeline |

### 11. User Interaction & Design

**Current State (Before):**
```
Meet Our Team section → "Kriss Judd" — Founder & Director
```

**Updated State (After):**
```
Meet Our Team section → "Kriss Aseniero" — Founder & Director
```

- No wireframes needed — this is a static string replacement
- No layout, styling, or visual changes

### 12. Technical Considerations

**Architecture:** No architectural changes. This is a static string replacement in a React Server Component and Markdown documentation files.

**Files to Modify:**

| # | File | Change |
|---|---|---|
| 1 | `src/app/about/page.tsx` (line 43) | `name: 'Kriss Judd'` → `name: 'Kriss Aseniero'` |
| 2 | `CLAUDE.md` (line 15) | People table: "Kriss Judd" → "Kriss Aseniero" |
| 3 | `memory/people/kriss-judd.md` | Rename to `kriss-aseniero.md`, update heading |
| 4 | `memory/glossary.md` (line 87) | Nicknames table: "Kriss Judd" → "Kriss Aseniero" |
| 5 | `memory/projects/casacolinacare-website.md` (line 22) | Key People: "Kriss Judd" → "Kriss Aseniero" |

**Integration Points:** None. No external APIs or services involved.

### 13. Open Questions & Decision Log

| Question/Topic | Date Raised | Decision | Rationale | Date Decided | Owner |
|---|---|---|---|---|---|
| Is the correct name "Kriss Aseniero"? | 2026-03-04 | Yes — confirmed | Original name was entered incorrectly during initial build | 2026-03-04 | Kriss |
| Should bio text change too? | 2026-03-04 | No — name only | Bio text is accurate; only the name was wrong | 2026-03-04 | Ramon |
| Document format? | 2026-03-04 | Unified BRD-PRD | Proportional to change size | 2026-03-04 | Ramon |
| Additional files beyond original PRD scope? | 2026-03-05 | Include glossary.md and casacolinacare-website.md | TECH_SPEC grep revealed 5 total files, not 3 | 2026-03-05 | Ramon |

### 14. Release Plan & Milestones

| Milestone | Target Date | Status | Dependencies |
|---|---|---|---|
| BRD_PRD Approved | 2026-03-05 | Draft | Business owner review |
| Implementation | 2026-03-05 | Pending | BRD_PRD approval |
| Build, Lint & Type-Check Verification | 2026-03-05 | Pending | Implementation |
| Deploy to Production | 2026-03-05 | Pending | Verification |

### 15. What We're NOT Doing (Out of Scope for This Release)

- Bio text changes (the biographical description is correct)
- Role title changes ("Founder & Director" is correct)
- Other team member entries
- Profile images or headshots
- Changes to any page other than About (source code)
- Contact information updates (separate from this change)

---

## Testing Requirements

### Test Cases — Unit Tests (Vitest + React Testing Library)

Place test files in `/tests/unit/`. Run with `npm test -- --run`.

---

### TC-006-01: About page renders "Kriss Aseniero" in the team section

**Validates:** US-006-01, AC-006-01, AC-006-03
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: About page displays correct founder name
  Given the About page is rendered
  When I inspect the team section
  Then the text contains 'Kriss Aseniero'
```

---

### TC-006-02: About page does not contain "Kriss Judd"

**Validates:** US-006-01, AC-006-02
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Old founder name is absent from About page
  Given the About page is rendered
  When I search the rendered output
  Then the text does not contain 'Kriss Judd'
```

---

### Test Cases — E2E Tests (Playwright)

Place test files in `/tests/e2e/`. Run with `npm run test:e2e`.

---

### TC-006-03: About page team section displays correct name (E2E)

**Validates:** US-006-01, AC-006-01, AC-006-02, AC-006-03
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: About page team section displays correct founder name
  Given I navigate to /about
  Then the page contains text 'Kriss Aseniero'
  And the page does not contain text 'Kriss Judd'
```

---

## Approval & Sign-Off

| Role | Name | Signature | Date |
|---|---|---|---|
| Business Owner / Sponsor | Kriss Aseniero | | |
| Developer / Product Owner | Ramon Aseniero | | |

---

## Glossary

| Term | Definition |
|---|---|
| Golden Thread | Unbroken traceability chain from business objectives through user stories, acceptance criteria, and test cases |
| RSC | React Server Component — the About page is an RSC (no client-side interactivity) |
| SSG | Static Site Generation — the About page is pre-rendered at build time |
| MoSCoW | Prioritization framework: Must/Should/Could/Won't Have |

---

## Golden Thread Summary

```
OBJ-006-01: Eliminate "Kriss Judd" from src/
  └── US-006-01: Update founder name in About page team section
        ├── AC-006-01: team array entry has name 'Kriss Aseniero'
        ├── AC-006-02: 'Kriss Judd' absent from page.tsx
        ├── AC-006-03: About page renders correct name (unit test)
        ├── AC-006-04: Typecheck passes
        └── AC-006-05: Lint passes
        Tests: TC-006-01, TC-006-02, TC-006-03

OBJ-006-02: Update all documentation references
  └── US-006-02: Update documentation references
        ├── AC-006-06: CLAUDE.md lists 'Kriss Aseniero'
        ├── AC-006-07: kriss-judd.md no longer exists
        ├── AC-006-08: kriss-aseniero.md exists with correct heading
        ├── AC-006-09: glossary.md lists 'Kriss Aseniero'
        ├── AC-006-10: casacolinacare-website.md lists 'Kriss Aseniero'
        └── AC-006-11: grep returns no results
        Tests: — (manual grep verification)

OBJ-006-03: Maintain build/lint/type integrity
  ├── US-006-01: AC-006-04, AC-006-05
  └── NFR-006-01, NFR-006-02, NFR-006-03
      Tests: npm run lint && npm run type-check && npm test -- --run
```
