# About Us Founder Name Correction - Unified Requirements Document

## Document Control

| Attribute | Details |
|-----------|---------|
| **Document Type** | Unified BRD-PRD |
| **Version** | 1.0 |
| **Status** | Draft |
| **Project Sponsor** | Kriss (Owner, Casa Colina Care LLC) |
| **Product Owner** | @jairo |
| **Core Team** | @jairo (PM/Dev) |
| **Target Release** | 2026-03-05 |
| **Last Updated** | 2026-03-05 |

---

## Part I: Strategic Foundation (BRD)

### 1. Executive Summary

The Casa Colina Care About Us page incorrectly displays "Kriss Judd" as the founder name in the "Meet Our Team" section. The correct name is "Kriss Aseniero." The original name was entered incorrectly during the initial site build. This is a simple content correction — a string replacement in 1 source file and 2 documentation files — with zero logic changes. The fix restores brand accuracy and professional credibility for the business owner.

### 2. Business Problem & Opportunity

#### 2.1 Current State ("As-Is")

The About page (`src/app/about/page.tsx`) renders a team section with the founder listed as "Kriss Judd" (line 43). This incorrect name also appears in project documentation files that inform AI assistants and future developers:

- `CLAUDE.md` — People table lists "Kriss Judd, business owner"
- `memory/people/kriss-judd.md` — Memory file with name, role, and contact info

**Quantitative Evidence:**

- 1 source file displays the wrong name to site visitors
- 2 documentation files propagate the incorrect name to AI assistants and developers
- 100% of About page visitors see the wrong founder name

**Qualitative Evidence:**

- An incorrect founder name undermines the personal, trust-based brand that Casa Colina Care presents to prospective families
- The business owner's correct name is "Kriss Aseniero," not "Kriss Judd"

#### 2.2 Root Cause Analysis

The name "Kriss Judd" was entered incorrectly during the initial site build (PRD 002). The error propagated into documentation files created during that same period. No review caught the mistake before deployment.

### 3. Business Objectives & Success Metrics

**THE GOLDEN THREAD STARTS HERE**

| Objective ID | SMART Business Objective | KPI | Current | Target | Measurement |
|--------------|-------------------------|-----|---------|--------|-------------|
| OBJ-01 | Eliminate all instances of "Kriss Judd" in `src/` so the About page displays the correct founder name | Count of "Kriss Judd" in `src/` | 1 | 0 | `grep -r 'Kriss Judd' src/` returns no results |
| OBJ-02 | Update all documentation references so AI assistants and developers use the correct name | Count of "Kriss Judd" in `CLAUDE.md` and `memory/` | 2 | 0 | `grep -r 'Kriss Judd' CLAUDE.md memory/` returns no results |
| OBJ-03 | Maintain build, lint, and type-check integrity after all changes | Exit codes for `npm run build`, `npm run lint`, `npm run type-check` | 0 | 0 | CI pipeline |

### 4. Project Scope & Boundaries

#### 4.1 In Scope

- Replace "Kriss Judd" with "Kriss Aseniero" in the About page team array (`src/app/about/page.tsx`)
- Update "Kriss Judd" to "Kriss Aseniero" in `CLAUDE.md` people table
- Rename `memory/people/kriss-judd.md` to `memory/people/kriss-aseniero.md` and update name inside

#### 4.2 Out of Scope (Critical for Budget Control)

- **Bio text:** The founder's biographical description remains unchanged
- **Role title:** "Founder & Director" stays as-is
- **Other team members:** No changes to other entries in the team array
- **Profile images:** No images are added or modified
- **Other pages:** Only the About page source code is affected
- **Contact information:** Phone, email, address are unrelated to this change

### 5. Stakeholder Analysis (RACI)

| Stakeholder | Role | RACI |
|-------------|------|------|
| Kriss | Business Owner, Casa Colina Care LLC | A (Accountable) — confirmed correct name |
| @jairo | PM/Developer | R (Responsible) — implements all changes |
| Site Visitors | End users viewing the About page | I (Informed) — will see corrected name |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

### 6. Assumptions, Constraints & Dependencies

#### Assumptions

- "Kriss Aseniero" is the confirmed correct name for the business owner/founder
- The bio text and role title associated with the founder entry are correct and do not need changes

#### Constraints

- **Timeline:** Same-day implementation and deployment
- **Budget:** $0 incremental cost — developer time only
- **Technical:** Changes must not break existing build, lint, or type-check pipelines

#### Dependencies

- No external dependencies — all changes are to existing static content in the codebase

### 7. Financial Justification

- **Costs:** $0 incremental (internal developer time, <15 minutes of work)
- **Benefits:** Restores brand accuracy; ensures the business owner's correct name is displayed to all site visitors and used by AI assistants
- **ROI:** Effectively infinite — fixing a data entry error at zero cost
- **Payback:** Immediate upon deployment

#### Risk Assessment

| Risk ID | Risk Description | Likelihood (1-5) | Impact (1-5) | Mitigation Strategy |
|---------|-----------------|------------------|--------------|---------------------|
| RISK-01 | Typo introduced during string replacement | 1 | 2 | Acceptance criteria specify exact string; build/lint gates catch errors |
| RISK-02 | Memory file rename breaks a reference | 1 | 1 | Memory files are read by AI assistants, not imported by code; no build dependency |

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

**US-001: Update founder name in About page team section**

- **Story:** As a site visitor viewing the About page, I want to see the correct founder name "Kriss Aseniero" so that I have accurate information about who runs the care home.
- **Business Objective Link:** OBJ-01 (Eliminate incorrect name from source code)
- **Priority:** Must-Have (MoSCoW)
- **File:** `src/app/about/page.tsx`

**Action (Technical Steps):**

1. In the `team` array (~line 43), change `name: 'Kriss Judd'` to `name: 'Kriss Aseniero'`
2. No other changes to the file

**Acceptance Criteria:**

- [ ] AC-001-01: The `team` array entry at index 0 has `name: 'Kriss Aseniero'`
- [ ] AC-001-02: The string `'Kriss Judd'` does not appear anywhere in `src/app/about/page.tsx`
- [ ] AC-001-03: The About page renders "Kriss Aseniero" in the team section (verified by unit test)
- [ ] AC-001-04: Typecheck passes (`npm run type-check` exits 0)
- [ ] AC-001-05: Lint passes (`npm run lint` exits 0)

**Validates:** OBJ-01, OBJ-03

---

#### Feature Area 2: Documentation

**US-002: Update documentation references**

- **Story:** As a developer or AI assistant working on the codebase, I want all documentation to reference the correct name "Kriss Aseniero" so that the incorrect name does not propagate into future work.
- **Business Objective Link:** OBJ-02 (Update documentation references)
- **Priority:** Must-Have (MoSCoW)
- **Files:** `CLAUDE.md`, `memory/people/kriss-judd.md`

**Action (Technical Steps):**

1. In `CLAUDE.md`, update the People table: change "Kriss Judd, business owner" to "Kriss Aseniero, business owner"
2. Rename `memory/people/kriss-judd.md` to `memory/people/kriss-aseniero.md`
3. Inside the renamed file, update the heading from "# Kriss Judd" to "# Kriss Aseniero"

**Acceptance Criteria:**

- [ ] AC-002-01: `CLAUDE.md` People table lists "Kriss Aseniero" (not "Kriss Judd")
- [ ] AC-002-02: The file `memory/people/kriss-judd.md` no longer exists
- [ ] AC-002-03: The file `memory/people/kriss-aseniero.md` exists with heading "# Kriss Aseniero"
- [ ] AC-002-04: `grep -r 'Kriss Judd' CLAUDE.md memory/` returns no results

**Validates:** OBJ-02

---

### 10. Non-Functional Requirements (NFRs)

**THE GOLDEN THREAD COMPLETES: NFRs trace to business objectives**

| NFR ID | Category | Requirement | Business Objective Link | Test Method |
|--------|----------|-------------|------------------------|-------------|
| NFR-01 | Build Integrity | `npm run build` exits with code 0 after all changes | OBJ-03 | CI pipeline |
| NFR-02 | Code Quality | `npm run lint` exits with code 0 after all changes | OBJ-03 | CI pipeline |
| NFR-03 | Type Safety | `npm run type-check` exits with code 0 after all changes | OBJ-03 | CI pipeline |

### 11. Testing Requirements

#### Test Cases

Place test files in `/tests/unit/`. Run with `npm test -- --run`.

---

**TC-001: About page renders "Kriss Aseniero" in the team section**

**Validates:** US-001, AC-001-01, AC-001-03 **Test Type:** Unit **Framework:** Vitest + React Testing Library

```gherkin
Scenario: About page displays correct founder name
  Given the About page is rendered
  When I inspect the team section
  Then the text contains 'Kriss Aseniero'
```

---

**TC-002: About page does not contain "Kriss Judd"**

**Validates:** US-001, AC-001-02 **Test Type:** Unit **Framework:** Vitest + React Testing Library

```gherkin
Scenario: Old founder name is absent from About page
  Given the About page is rendered
  When I search the rendered output
  Then the text does not contain 'Kriss Judd'
```

---

**TC-003: About page team section displays correct name (E2E)**

**Validates:** US-001, AC-001-01, AC-001-02, AC-001-03 **Test Type:** E2E **Framework:** Playwright

```gherkin
Scenario: About page team section displays correct founder name
  Given I navigate to /about
  Then the page contains text 'Kriss Aseniero'
  And the page does not contain text 'Kriss Judd'
```

---

### 12. Open Questions & Decision Log

| Question/Topic | Date Raised | Decision | Rationale | Date Decided |
|---------------|-------------|----------|-----------|--------------|
| Is the correct name "Kriss Aseniero"? | 2026-03-04 | Yes — confirmed | Original name was entered incorrectly during initial build | 2026-03-04 |
| Should bio text change too? | 2026-03-04 | No — name only | Bio text is accurate; only the name was wrong | 2026-03-04 |
| Document format? | 2026-03-04 | Unified BRD-PRD (single file) | Proportional to change size; follows updated skill convention | 2026-03-04 |

### 13. Release Plan & Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| PRD Approved | 2026-03-05 | Draft |
| Implementation | 2026-03-05 | Pending |
| Build, Lint & Type-Check Verification | 2026-03-05 | Pending |
| Deploy to Production | 2026-03-05 | Pending |

### 14. What We're NOT Doing (Out of Scope for This Release)

- Bio text changes (the biographical description is correct)
- Role title changes ("Founder & Director" is correct)
- Other team member entries
- Profile images or headshots
- Changes to any page other than About (source code)
- Contact information updates (separate from this change)

---

## Golden Thread Traceability Matrix

| Business Objective | User Stories | Acceptance Criteria | Test Cases |
|--------------------|-------------|---------------------|------------|
| OBJ-01: Eliminate "Kriss Judd" from `src/` | US-001 | AC-001-01, AC-001-02, AC-001-03 | TC-001, TC-002, TC-003 |
| OBJ-02: Update all documentation references | US-002 | AC-002-01, AC-002-02, AC-002-03, AC-002-04 | — (manual grep verification) |
| OBJ-03: Maintain build/lint/type integrity | US-001 | AC-001-04, AC-001-05 | `npm run lint && npm run type-check && npm test -- --run` |

---

## Approval & Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Business Owner / Sponsor | Kriss | | |
| PM / Developer | @jairo | | |

---

## Glossary

| Term | Definition |
|------|------------|
| Golden Thread | Unbroken traceability chain from business objectives through user stories, acceptance criteria, and test cases |
| RSC | React Server Component — the About page is an RSC (no client-side interactivity) |
| MoSCoW | Prioritization framework: Must/Should/Could/Won't Have |
