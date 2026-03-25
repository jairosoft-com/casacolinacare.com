# BRD-PRD: Fix Founder Name Using Full Name Format

## Document Metadata

- **Feature ID**: 009
- **Feature Name**: fix_founder_name_using_fullname_format
- **Document Type**: BRD_PRD
- **Generated Date**: 2026-03-24

---

## Executive Summary

The founder and director's name on the Casa Colina Care website currently displays as "Kriss Aseniero" instead of the correct full name "Mari Kriss C. Aseniero". This inaccuracy undermines brand credibility and professional presentation. The fix must update the name everywhere it appears — including heading displays and inline bio text — to use the complete name format: `<firstname> <middle initial> <lastname>`.

---

## Problem Statement

**Current State:** The About Us page team section displays the founder's name as "Kriss Aseniero" and the bio text references "Kriss" as a standalone first name.

**Desired State:** All references to the founder must use the full legal name **"Mari Kriss C. Aseniero"** in headings/labels, and update bio text references accordingly.

**Impact:** An incorrect name on a professional care facility website erodes trust with prospective families evaluating the credibility and legitimacy of the business.

**Evidence:** Screenshot from the live site (2026-03-24) confirms the name displays as "Kriss Aseniero" on the About Us page team section.

---

## Business Objectives

### OBJ-009-01: Ensure Brand Accuracy and Professional Credibility

Correct the founder's displayed name across all site pages to reflect the legal full name "Mari Kriss C. Aseniero", reinforcing trust and professionalism for prospective families researching care options.

**Success Metric:** 100% of founder name references on the site use the full name format "Mari Kriss C. Aseniero".

---

## Goals

### GOAL-009-01: Update All Founder Name References Site-Wide

Audit and update every occurrence of the founder's name in the codebase — display text, bio copy, structured data, and any metadata — to use "Mari Kriss C. Aseniero".

**Measure:** Zero instances of "Kriss Aseniero" (without the full name) remain in the source code after implementation.

---

## Scope

### In Scope

- Update the founder's name in the About Us page team section heading
- Update the founder's bio text to reference the full name
- Audit all source files for any other occurrences of the founder's name
- Update structured data / JSON-LD if the founder is referenced
- Update any constants or configuration files that store the founder's name
- Regression testing to ensure no broken layouts or content

### Out of Scope

- Redesigning the About Us team section layout
- Adding new team members
- Changing the founder's role/title ("Founder & Director" remains unchanged)
- Updating the business contact email (kriss@casacolinacare.com remains unchanged)
- Changes to any other team member information

---

## Codebase Audit Results

The following occurrences of the founder's name were found during the audit:

| File | Line | Current Value | Required Change |
|------|------|---------------|-----------------|
| `src/app/about/page.tsx` | 43 | `name: 'Kriss Aseniero'` | Change to `'Mari Kriss C. Aseniero'` |
| `src/app/about/page.tsx` | 45 | `...Kriss founded Casa Colina Care...` | Change to `...Mari Kriss C. Aseniero founded Casa Colina Care...` |

**No occurrences found in:**
- `src/lib/constants.ts` — no founder name reference
- `src/lib/structured-data.ts` — no founder name reference (email only)
- Other page files — founder name does not appear

---

## Risks

### RISK-009-01: Incomplete Name Update

**Risk:** Some occurrences of the old name may be missed, leading to inconsistent name display across the site.
**Likelihood:** Low (audit found only 2 occurrences in a single file)
**Mitigation:** Automated grep search for "Kriss Aseniero" as part of acceptance testing to confirm zero remaining instances.

### RISK-009-02: Layout Breakage from Longer Name

**Risk:** The full name "Mari Kriss C. Aseniero" is longer than "Kriss Aseniero" and may cause text overflow or layout issues in the team card component, especially on mobile viewports.
**Likelihood:** Low-Medium
**Mitigation:** Visual inspection at mobile (375px), tablet (768px), and desktop (1280px) breakpoints.

---

## Non-Functional Requirements

### NFR-009-01: No Visual Regression

The updated name must render correctly without text overflow, truncation, or layout shifts at all supported breakpoints (375px, 768px, 1280px).

### NFR-009-02: Build Health

All existing linting rules, type checks, and unit tests must continue to pass after the change.

---

## Technical Constraints

### TC-009-01: Single Source File

The founder's name is currently hardcoded in `src/app/about/page.tsx` (the `team` array). There is no centralized constant for the founder's name. The fix should update the values in place.

---

## User Stories

### US-009-01: Display Founder Full Name in Team Section

**As a** prospective family member visiting the About Us page
**I want** to see the founder's complete legal name "Mari Kriss C. Aseniero"
**So that** I can trust the credibility and professionalism of the care facility

**Acceptance Criteria:**

- [ ] AC-009-01: GIVEN the About Us page is loaded, WHEN the user views the team section, THEN the founder's name displays as "Mari Kriss C. Aseniero"
- [ ] AC-009-02: GIVEN the About Us page is loaded, WHEN the user reads the founder's bio, THEN the bio text references "Mari Kriss C. Aseniero" (not just "Kriss")
- [ ] AC-009-03: GIVEN a codebase search for the string "Kriss Aseniero" (without "Mari"), WHEN the search runs across all source files, THEN zero matches are returned (excluding test files that validate this condition and PRD files)
- [ ] AC-009-04: GIVEN the About Us page is viewed on mobile (375px), tablet (768px), and desktop (1280px), WHEN the founder's full name is displayed, THEN no text overflow, truncation, or layout breakage occurs
- [ ] AC-009-05: GIVEN the codebase after changes, WHEN `npm run lint` is executed, THEN it passes with zero errors
- [ ] AC-009-06: GIVEN the codebase after changes, WHEN `npm run type-check` is executed, THEN it passes with zero errors
- [ ] AC-009-07: GIVEN the codebase after changes, WHEN `npm test -- --run` is executed, THEN all existing unit tests pass

**Validates:** OBJ-009-01, GOAL-009-01

### US-009-02: Regression Test for Founder Name Format

**As a** developer maintaining the site
**I want** a regression test that verifies the founder's name uses the full name format
**So that** future changes don't accidentally revert to the incomplete name

**Acceptance Criteria:**

- [ ] AC-009-08: GIVEN a unit test for the About page, WHEN the test runs, THEN it asserts that the rendered output contains "Mari Kriss C. Aseniero"
- [ ] AC-009-09: GIVEN a unit test for the About page, WHEN the test runs, THEN it asserts that the rendered output does NOT contain "Kriss Aseniero" without the full name prefix
- [ ] AC-009-10: GIVEN the new test, WHEN `npm test -- --run` is executed, THEN the test passes

**Validates:** OBJ-009-01, GOAL-009-01

---

## Functional Requirements

- **FR-009-01:** The `team` array in `src/app/about/page.tsx` must set the founder's `name` field to `"Mari Kriss C. Aseniero"`. *(Supports: US-009-01)*
- **FR-009-02:** The founder's `bio` field must reference the full name "Mari Kriss C. Aseniero" instead of just "Kriss". *(Supports: US-009-01)*
- **FR-009-03:** A regression test must exist in `tests/unit/` that validates the founder's name renders as "Mari Kriss C. Aseniero". *(Supports: US-009-02)*

---

## Test Cases

### TC-009-01: Founder Name Displays Correctly

**Validates:** US-009-01, AC-009-01, AC-009-02
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Founder full name in team section
  Given the About Us page is rendered
  When the team section is visible
  Then the text "Mari Kriss C. Aseniero" is present in the document
  And the text "Founder & Director" is present as the role
```

### TC-009-02: No Incomplete Name Remnants

**Validates:** US-009-01, AC-009-03
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: No partial name references remain
  Given the About Us page is rendered
  When the team section is visible
  Then the text does not contain "Kriss Aseniero" without the "Mari" prefix
```

### TC-009-03: Visual Regression at All Breakpoints

**Validates:** US-009-01, AC-009-04
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario Outline: Name displays without overflow at <breakpoint>
  Given I am viewing the About Us page at <width>px viewport width
  When the team section renders
  Then the founder's name "Mari Kriss C. Aseniero" is fully visible
  And no horizontal overflow occurs on the team card

Examples:
  | breakpoint | width |
  | mobile     | 375   |
  | tablet     | 768   |
  | desktop    | 1280  |
```

### TC-009-04: Build Health After Changes

**Validates:** US-009-01, AC-009-05, AC-009-06, AC-009-07
**Test Type:** Integration
**Framework:** npm scripts

```gherkin
Scenario: All build checks pass
  Given the founder name changes have been applied
  When the lint, type-check, and test suites are executed
  Then all three pass with zero errors
```

---

## Decision Log

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | Update name in place rather than centralizing to constants.ts | Only 1 file references the founder name; adding a constant for a single reference adds unnecessary abstraction | 2026-03-24 |
| 2 | Update bio text to use full name instead of keeping "Kriss" as informal reference | Business owner explicitly requested full name format in all references | 2026-03-24 |
| 3 | Add regression test to prevent future reversion | Name has been incorrect before (PRD 006 also addressed this); a test prevents recurrence | 2026-03-24 |

---

## Glossary

| Term | Definition |
|------|------------|
| Full name format | `<firstname> <middle initial> <lastname>` — e.g., "Mari Kriss C. Aseniero" |
| Team section | The "Meet Our Team" section on the About Us page displaying staff cards |
| SSG | Static Site Generation — pages are pre-rendered at build time |
| RSC | React Server Component — server-rendered by default in Next.js App Router |
