# Unified BRD-PRD: Fix Wrong Phone Number in CTA Banner

**Document ID:** BRD-PRD-005-001\
**Date:** 2026-02-20\
**Priority:** P0 — Fix immediately\
**Status:** Draft\
**Author:** Project Analysis Audit

---

## Executive Summary

The CTA banner component (`cta-banner.tsx`) displays the wrong phone number
(`+1 (800) 888-8888`) to users on the Home, About, and FAQ pages. The correct
business number is `+1 (808) 200-1840`. This is a user-facing data error that
causes potential leads to reach a non-existent or wrong number when attempting
to contact Casa Colina Care.

**Business Impact:** Every Home, About, and FAQ visitor who calls the displayed
CTA number reaches a dead end. Affected pages represent 3 of 4 site pages.

**Fix:** Update the hardcoded value in `cta-banner.tsx` to the correct number
and add a regression test to the CTA banner to prevent recurrence.

---

## Part 1: Business Requirements (BRD)

### 1.1 Problem Statement

The Casa Colina Care website CTA banner — present on 3 of 4 pages (Home, About,
FAQ) — has been displaying a placeholder phone number `+1 (800) 888-8888` that
was inherited from a starter template and never replaced with the real business
number `+1 (808) 200-1840`.

**Quantitative evidence:**

- 3 of 4 pages (75% of the site) are affected
- 100% of users on those pages see the wrong number in the primary CTA section
- The `tel:` link `href="tel:+18008888888"` directs calls away from the business
- The existing unit test `TC-009` confirms the old number must not appear on the
  contact _page_ — but it does not cover the CTA banner component, allowing this
  defect to persist undetected

**Qualitative evidence:**

- A prospective resident's family member who dials the CTA number cannot reach
  Casa Colina Care and may assume the business is unreachable or unprofessional
- The error undermines trust in a high-stakes, high-emotion purchase decision
  (residential elder care)

### 1.2 Business Objectives

| ID     | Objective                                                                                                                   | Metric                                                                    |
| ------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| OBJ-01 | Ensure every phone number displayed on the website routes callers to the correct Casa Colina Care business line             | 0 pages display `+1 (800) 888-8888`; all `tel:` hrefs use `+18082001840`  |
| OBJ-02 | Prevent regression: once fixed, the wrong number must never reappear on any page without a failing test blocking the commit | Automated test suite catches any reintroduction of the placeholder number |

### 1.3 Stakeholders

| Role             | Name / Reference                 | Interest                                    |
| ---------------- | -------------------------------- | ------------------------------------------- |
| Business Owner   | Kriss (<kriss@casacolinacare.com>) | Correct contact number displayed to clients |
| Developer        | Engineering team                 | Clear fix scope, regression coverage        |
| Website Visitors | Prospective families (35–65)     | Accurate number to call for consultation    |

### 1.4 Success Metrics

| Metric                                  | Target                                        |
| --------------------------------------- | --------------------------------------------- |
| Pages displaying correct phone number   | 4 of 4 (100%)                                 |
| `tel:` href accuracy                    | All `tel:` links point to `tel:+18082001840`  |
| Regression test coverage for CTA banner | New test TC-010 passes and catches old number |
| CI health after fix                     | `npm test -- --run` passes with 0 failures    |

### 1.5 Scope

**In scope:**

- Fix phone number displayed and linked in `cta-banner.tsx`
- Add a unit test covering the CTA banner phone number (TC-010)

**Out of scope:**

- Centralizing all business data into `constants.ts` (tracked separately as P1
  in the refactoring priority matrix)
- Updating the email address displayed in the CTA banner (it is correct)
- Changes to any other component or page

### 1.6 Assumptions & Constraints

- The correct phone number is `+1 (808) 200-1840` / `tel:+18082001840` as
  confirmed by all other data sources in the project
- No database, CMS, or external config is involved — this is a source code fix
- The fix must not break any existing tests (currently 28 unit tests passing)

---

## Part 2: Product Requirements (PRD)

### 2.1 Problem Statement (Technical)

`src/components/sections/cta-banner.tsx` hardcodes the tel href and display text
to `+18008888888` / `+1 (800) 888-8888`. This placeholder was never replaced.
The component is rendered on:

- `src/app/page.tsx` (Home)
- `src/app/about/page.tsx` (About)
- `src/app/faq/page.tsx` (FAQ)

The existing regression test `TC-009` (in `contact-page.test.tsx`) guards only
the `/contact` page render tree, which does not include `CtaBanner`.

### 2.2 User Stories

#### US-001: Correct Phone Number in CTA Banner

**As a** prospective resident's family member browsing the Casa Colina Care
website,\
**I want** the phone number in the "Schedule Your Visit" banner to be the real
Casa Colina Care number,\
**So that** I can call directly from any page without being misdirected.

**Validates:** OBJ-01

**Acceptance Criteria:**

- [ ] **AC-001-01:** The CTA banner on all pages (Home, About, FAQ) displays the
      phone number `+1 (808) 200-1840`
- [ ] **AC-001-02:** The `tel:` anchor in `cta-banner.tsx` has `href` value
      `tel:+18082001840`
- [ ] **AC-001-03:** The string `+1 (800) 888-8888` does not appear anywhere in
      the rendered CTA banner
- [ ] **AC-001-04:** The string `+18008888888` does not appear in any `href`
      attribute in the rendered CTA banner
- [ ] **AC-001-05:** TypeScript type-check passes (`npm run type-check`)
- [ ] **AC-001-06:** All existing unit tests continue to pass
      (`npm test -- --run`)

---

#### US-002: Regression Test Guards CTA Banner Phone Number

**As a** developer maintaining the Casa Colina Care codebase,\
**I want** an automated test that asserts the CTA banner shows the correct phone
number,\
**So that** any future accidental reintroduction of a placeholder number is
caught before merging.

**Validates:** OBJ-02

**Acceptance Criteria:**

- [ ] **AC-002-01:** A new test TC-010 exists in `tests/unit/` that renders
      `CtaBanner` in isolation and asserts `+1 (808) 200-1840` is present
- [ ] **AC-002-02:** TC-010 asserts that `+1 (800) 888-8888` is NOT present in
      the rendered output
- [ ] **AC-002-03:** TC-010 asserts the `tel:` link has
      `href="tel:+18082001840"`
- [ ] **AC-002-04:** TC-010 is co-located in the existing unit test directory
      `tests/unit/` (not colocated with source)
- [ ] **AC-002-05:** TC-010 passes in CI (`npm test -- --run`)

---

### 2.3 Functional Requirements

| ID    | Requirement                                                                                          | Supports |
| ----- | ---------------------------------------------------------------------------------------------------- | -------- |
| FR-01 | `cta-banner.tsx` must render `+1 (808) 200-1840` as the phone display text                           | US-001   |
| FR-02 | `cta-banner.tsx` must use `href="tel:+18082001840"` on the phone anchor element                      | US-001   |
| FR-03 | A unit test file must render `<CtaBanner />` and assert display and `href` correctness               | US-002   |
| FR-04 | The unit test must assert the old placeholder `+1 (800) 888-8888` is absent from the rendered output | US-002   |

### 2.4 Non-Functional Requirements

| ID     | Requirement                                              | Measurable Target                           |
| ------ | -------------------------------------------------------- | ------------------------------------------- |
| NFR-01 | Fix must not introduce any new ESLint warnings or errors | `npm run lint` exits with code 0            |
| NFR-02 | Fix must not reduce the existing 28-test passing suite   | `npm test -- --run` shows 29+ tests passing |
| NFR-03 | TypeScript strict mode must remain satisfied             | `npm run type-check` exits with code 0      |

### 2.5 Out of Scope

The following are explicitly out of scope for this fix and tracked separately:

- Extracting phone/email/address into `src/lib/constants.ts` (P1 refactor)
- Adding a `metadataBase` or OG images (P3 SEO)
- Rate limiting on the contact API (P3 security)
- Any changes to the Footer, Contact page, or structured data

---

## Part 3: Gherkin Acceptance Criteria

### Scenario: CTA Banner Shows Correct Phone Number

```gherkin
Feature: CTA Banner Phone Number

  Scenario: Correct number is displayed on all pages that include CTA banner
    Given the CtaBanner component is rendered
    When I inspect the phone contact link
    Then it displays "+1 (808) 200-1840"
    And its href attribute is "tel:+18082001840"
    And the old placeholder "+1 (800) 888-8888" is not present
    And the old href "tel:+18008888888" is not present
```

### Scenario: Regression Test Catches Wrong Number

```gherkin
  Scenario: Automated test catches reintroduction of placeholder number
    Given a unit test renders <CtaBanner /> with default props
    When the test suite runs
    Then TC-010 passes with no assertion failures
    And if "+1 (800) 888-8888" were reintroduced, TC-010 would fail
```

---

## Part 4: Test Cases

### TC-010: CTA Banner — Correct Phone Number

**Validates:** US-001 (AC-001-01, AC-001-02, AC-001-03, AC-001-04), US-002
(AC-002-01, AC-002-02, AC-002-03)\
**Test Type:** Unit\
**Framework:** Vitest + React Testing Library\
**File:** `tests/unit/cta-banner.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { CtaBanner } from '@/components/sections/cta-banner';

describe('CtaBanner — Phone Number (US-001, US-002)', () => {
  test('TC-010: phone link displays correct number and href', () => {
    render(<CtaBanner />);
    const phoneLink = screen.getByRole('link', { name: /808.*200.*1840/ });
    expect(phoneLink).toHaveAttribute('href', 'tel:+18082001840');
  });

  test('TC-010b: old placeholder number is not present', () => {
    render(<CtaBanner />);
    const body = document.body.textContent ?? '';
    expect(body).not.toContain('(800) 888-8888');
    expect(body).not.toContain('+18008888888');
  });
});
```

---

## Part 5: Implementation Checklist

### Developer Checklist

- [ ] Update `src/components/sections/cta-banner.tsx`:
  - Change `href="tel:+18008888888"` → `href="tel:+18082001840"`
  - Change display text `+1 (800) 888-8888` → `+1 (808) 200-1840`
- [ ] Create `tests/unit/cta-banner.test.tsx` with TC-010 and TC-010b
- [ ] Run `npm run lint -- --fix` — verify 0 errors
- [ ] Run `npm run type-check` — verify passes
- [ ] Run `npm test -- --run` — verify 29+ tests pass (was 28, +1 new test file
      with 2 tests)

### Definition of Done

All of the following must be true before this ticket is closed:

1. `+1 (808) 200-1840` appears in the CTA banner on Home, About, and FAQ pages
2. `+1 (800) 888-8888` appears nowhere on the site
3. `tel:+18082001840` is the `href` on the CTA phone link
4. TC-010 and TC-010b pass in the unit test suite
5. `npm run lint -- --fix && npm run type-check && npm test -- --run` all exit 0

---

## Part 6: Traceability Matrix

| Business Objective | User Story | Acceptance Criteria                        | Test Case       |
| ------------------ | ---------- | ------------------------------------------ | --------------- |
| OBJ-01             | US-001     | AC-001-01, AC-001-02, AC-001-03, AC-001-04 | TC-010, TC-010b |
| OBJ-02             | US-002     | AC-002-01, AC-002-02, AC-002-03            | TC-010, TC-010b |

---

## Decision Log

| Decision                                  | Rationale                                                                                                                 | Date       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Fix hardcoded value directly in component | Centralizing into `constants.ts` is a P1 effort; the P0 is to stop the user-facing error immediately with minimal risk    | 2026-02-20 |
| Add test in `tests/unit/` (not colocated) | Project convention: all tests live in `tests/unit/` or `tests/e2e/`, never colocated with source files (per AGENTS.md §5) | 2026-02-20 |
| Severity: P0 (not P1 or P2)               | Wrong contact info is displayed to users on 75% of pages; any lost lead is direct business harm                           | 2026-02-20 |
