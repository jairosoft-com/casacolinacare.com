# CTA Banner Phone Number Fix - Unified Requirements Document

## Document Metadata

- **Feature ID**: 005
- **Feature Name**: cta_phone_fix
- **Document Type**: BRD_PRD
- **Generated Date**: 2026-03-20

## Document Control

| Attribute | Details |
|-----------|---------|
| **Document Type** | Unified BRD-PRD |
| **Version** | 2.0 |
| **Status** | Draft |
| **Project Sponsor** | Kriss Aseniero (kriss@casacolinacare.com) |
| **Product Owner** | Ramon Aseniero (ramon@jairosoft.com) |
| **Core Team** | @Ramon (Developer) |
| **Target Release** | 2026-03-20 |
| **Last Updated** | 2026-03-20 |
| **Priority** | P0 — Fix immediately |

---

## Part I: Strategic Foundation (BRD)

### 1. Executive Summary

The CTA (Call to Action) banner component displays a placeholder phone number `+1 (800) 888-8888` on 3 of 4 site pages (Home, About, FAQ). The correct business number is `+1 (808) 200-1840`. Visitors who call the displayed number reach a dead end — they cannot contact Casa Colina Care. This is a P0 user-facing data error that directly blocks the primary conversion path (phone inquiry). The fix is a single string replacement in one component file plus a regression test to prevent recurrence.

### 2. Business Problem & Opportunity

#### 2.1 Current State ("As-Is")

The `CtaBanner` component (`src/components/sections/cta-banner.tsx`) hardcodes the placeholder phone number at lines 31 and 34. This component renders on every page that includes the "Schedule Your Visit Today" banner:

- `src/app/page.tsx` (Home)
- `src/app/about/page.tsx` (About)
- `src/app/faq/page.tsx` (FAQ)

The Contact page does NOT use this component — it has its own contact info section that was already corrected in PRD 004.

**Quantitative Evidence:**

- 3 of 4 pages (75% of the site) display the wrong phone number
- 100% of users on those pages see the wrong number in the primary CTA section
- The `tel:` link `href="tel:+18008888888"` directs calls away from the business
- Existing test TC-009 (contact page) does NOT cover the CTA banner component

**Qualitative Evidence:**

- A prospective resident's family member who dials the CTA number cannot reach Casa Colina Care
- The error undermines trust in a high-stakes decision (residential elder care)
- PRD 004 fixed phone numbers in footer, contact page, FAQ, and structured data — but missed the CTA banner

#### 2.2 Root Cause Analysis

1. **Why does the CTA banner show the wrong number?** — `cta-banner.tsx` line 31 has `href="tel:+18008888888"` and line 34 displays `+1 (800) 888-8888`
2. **Why was it never updated?** — PRD 004 (contact info update) focused on footer, contact page, FAQ answer, and structured data — the CTA banner was not in scope
3. **Why wasn't it caught?** — No unit test covers the CTA banner's phone number; existing regression tests only cover the contact page
4. **Why is a placeholder there?** — The number was inherited from the initial site build (PRD 002) and never replaced

### 3. Business Objectives & Success Metrics

**THE GOLDEN THREAD STARTS HERE**

| Objective ID | SMART Business Objective | KPI | Current | Target | Measurement |
|---|---|---|---|---|---|
| OBJ-005-01 | Ensure every phone number on the site routes callers to the correct Casa Colina Care business line | Pages displaying placeholder `+1 (800) 888-8888` | 3 | 0 | `grep -r '8008888888' src/` returns no results |
| OBJ-005-02 | Prevent regression: once fixed, the wrong number must never reappear without a failing test | Automated test coverage for CTA banner phone number | 0 tests | 1 test file | `npm test -- --run` includes CTA banner phone assertions |

### 4. Project Scope & Boundaries

#### 4.1 In Scope

- Fix phone number displayed and linked in `cta-banner.tsx`
- Add a unit test covering the CTA banner phone number

#### 4.2 Out of Scope (Critical for Scope Control)

- **Centralizing business data into `constants.ts`** — tracked separately as Known Issue #4 in CLAUDE.md
- **Email address in CTA banner** — already correct (`kriss@casacolinacare.com`)
- **Changes to any other component or page** — footer, contact page, FAQ, structured data already fixed in PRD 004
- **Adding `metadataBase` or OG images** — separate SEO concern
- **Rate limiting on contact API** — separate security concern

### 5. Stakeholder Analysis (RACI Matrix)

| Stakeholder | Role | Requirements | Approval | UAT | Development |
|---|---|---|---|---|---|
| Kriss Aseniero | Business Owner / Sponsor | C | **A** | **A** | I |
| Ramon Aseniero | Developer / Product Owner | **R** | C | C | **R** |
| Site Visitors | Prospective families (35-65) | I | I | I | I |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

### 6. Assumptions, Constraints & Dependencies

#### Assumptions

- The correct phone number is `+1 (808) 200-1840` / `tel:+18082001840` (confirmed by all other data sources in the project)
- No database, CMS, or external config is involved — this is a source code fix
- The `CtaBanner` component accepts props but the phone number is hardcoded, not passed as a prop

#### Constraints

| ID | Constraint |
|---|---|
| TC-005-01 | Changes must not break existing build, lint, or type-check pipelines |
| TC-005-02 | Same-day implementation and deployment |
| TC-005-03 | $0 incremental cost — developer time only |

#### Dependencies

- No external dependencies — single file change plus new test file

### 7. Financial Justification

#### Cost-Benefit Analysis

- **Estimated Costs:** $0 incremental (internal developer time, <15 minutes of work)
- **Projected Benefits:** Restores phone inquiry conversion path on 75% of site pages; every lead that would have called the placeholder can now reach the business
- **ROI:** Effectively infinite — fixing a blocking error at zero cost
- **Payback Period:** Immediate upon deployment

#### Risk Assessment

| Risk ID | Risk Description | Likelihood (1-5) | Impact (1-5) | Mitigation Strategy |
|---|---|---|---|---|
| RISK-005-01 | Typo introduced during string replacement | 1 | 3 | Acceptance criteria specify exact string; new regression test catches errors |
| RISK-005-02 | CTA banner props override the fix | 1 | 1 | Phone number is hardcoded in the component, not passed as a prop; no caller overrides it |

---

## Part II: Tactical Execution (PRD)

### 8. Target Users & Personas

**Primary Persona:** Site Visitors (Adult Children, 35-65)

- **Goals:** Call Casa Colina Care to schedule a visit or ask about care options
- **Pain Points:** The CTA banner phone number reaches a dead end, not the business
- **Context:** Browsing Home, About, or FAQ pages and clicking the prominent "Schedule Your Visit" phone link

### 9. User Stories & Functional Requirements

**THE GOLDEN THREAD CONTINUES: Each story links to a business objective**

#### Feature Area 1: Source Code Fix

---

### US-005-01: Correct Phone Number in CTA Banner
**As a** prospective resident's family member browsing the Casa Colina Care website
**I want** the phone number in the "Schedule Your Visit" banner to be the real Casa Colina Care number
**So that** I can call directly from any page without being misdirected

**Priority:** Must-Have (MoSCoW)
**File:** `src/components/sections/cta-banner.tsx`

**Acceptance Criteria:**

```gherkin
Scenario: CTA banner displays correct phone number
  Given the CtaBanner component is rendered on any page
  When I inspect the phone contact link
  Then it displays "+1 (808) 200-1840"
  And its href attribute is "tel:+18082001840"

Scenario: Old placeholder number is absent
  Given the CtaBanner component is rendered
  When I search the rendered output
  Then the text "+1 (800) 888-8888" is not present
  And no href contains "+18008888888"
```

**Numbered Acceptance Criteria:**
- [ ] AC-005-01: The CTA banner displays the phone number `+1 (808) 200-1840`
- [ ] AC-005-02: The `tel:` anchor in `cta-banner.tsx` has `href` value `tel:+18082001840`
- [ ] AC-005-03: The string `+1 (800) 888-8888` does not appear anywhere in the rendered CTA banner
- [ ] AC-005-04: The string `+18008888888` does not appear in any `href` attribute in `cta-banner.tsx`
- [ ] AC-005-05: Typecheck passes (`npm run type-check` exits 0)
- [ ] AC-005-06: Lint passes (`npm run lint` exits 0)

**Validates:** OBJ-005-01

---

#### Feature Area 2: Regression Test

### US-005-02: Regression Test Guards CTA Banner Phone Number
**As a** developer maintaining the Casa Colina Care codebase
**I want** an automated test that asserts the CTA banner shows the correct phone number
**So that** any future accidental reintroduction of a placeholder number is caught before merging

**Priority:** Must-Have (MoSCoW)
**File:** `tests/unit/cta-banner.test.tsx`

**Acceptance Criteria:**

```gherkin
Scenario: Regression test catches correct number
  Given a unit test renders <CtaBanner /> with default props
  When the test suite runs
  Then the test asserts "+1 (808) 200-1840" is present
  And the test asserts the tel: href is "tel:+18082001840"

Scenario: Regression test catches old number absence
  Given a unit test renders <CtaBanner /> with default props
  When the test suite runs
  Then the test asserts "+1 (800) 888-8888" is NOT present
```

**Numbered Acceptance Criteria:**
- [ ] AC-005-07: A test file exists at `tests/unit/cta-banner.test.tsx` that renders `CtaBanner` and asserts `+1 (808) 200-1840` is present
- [ ] AC-005-08: The test asserts that `+1 (800) 888-8888` is NOT present in the rendered output
- [ ] AC-005-09: The test asserts the `tel:` link has `href="tel:+18082001840"`
- [ ] AC-005-10: The test file is in the `tests/unit/` directory (not colocated with source)
- [ ] AC-005-11: All unit tests pass (`npm test -- --run` exits 0)

**Validates:** OBJ-005-02

---

### 10. Non-Functional Requirements (NFRs)

**THE GOLDEN THREAD COMPLETES: NFRs trace to business objectives**

| NFR ID | Category | Requirement | Business Objective Link | Test Method |
|---|---|---|---|---|
| NFR-005-01 | Build Integrity | `npm run build` exits with code 0 after all changes | OBJ-005-01 | CI pipeline |
| NFR-005-02 | Code Quality | `npm run lint` exits with code 0 after all changes | OBJ-005-01 | CI pipeline |
| NFR-005-03 | Type Safety | `npm run type-check` exits with code 0 after all changes | OBJ-005-01 | CI pipeline |

### 11. User Interaction & Design

**Current State (Before):**
```
CTA Banner → "Schedule Your Visit Today"
Phone: +1 (800) 888-8888  ← PLACEHOLDER (wrong)
Email: kriss@casacolinacare.com  ← correct
```

**Updated State (After):**
```
CTA Banner → "Schedule Your Visit Today"
Phone: +1 (808) 200-1840  ← CORRECT
Email: kriss@casacolinacare.com  ← unchanged
```

- No layout, styling, or visual changes — only the phone number string and href
- The CTA banner appears on Home, About, and FAQ pages

### 12. Technical Considerations

**Architecture:** No architectural changes. This is a static string replacement in a shared section component.

**File to Modify:**

| # | File | Line | Change |
|---|---|---|---|
| 1 | `src/components/sections/cta-banner.tsx` | 31 | `href="tel:+18008888888"` → `href="tel:+18082001840"` |
| 2 | `src/components/sections/cta-banner.tsx` | 34 | `+1 (800) 888-8888` → `+1 (808) 200-1840` |

**File to Create:**

| # | File | Purpose |
|---|---|---|
| 1 | `tests/unit/cta-banner.test.tsx` | Regression test asserting correct phone number and absence of placeholder |

**Integration Points:** None. `CtaBanner` is a standalone presentational component with no API calls or external dependencies.

### 13. Open Questions & Decision Log

| Question/Topic | Date Raised | Decision | Rationale | Date Decided | Owner |
|---|---|---|---|---|---|
| Fix hardcoded value or centralize to constants.ts? | 2026-02-20 | Fix hardcoded value directly | Centralizing is a P1 refactor; P0 is to stop the error immediately | 2026-02-20 | Ramon |
| Test location: colocated or tests/unit/? | 2026-02-20 | tests/unit/ | Project convention per AGENTS.md: tests never colocated | 2026-02-20 | Ramon |
| Severity: P0 not P1 or P2? | 2026-02-20 | P0 | Wrong contact info on 75% of pages; lost leads = direct business harm | 2026-02-20 | Ramon |

### 14. Release Plan & Milestones

| Milestone | Target Date | Status | Dependencies |
|---|---|---|---|
| BRD_PRD Approved | 2026-03-20 | Draft | Business owner review |
| Implementation | 2026-03-20 | Pending | BRD_PRD approval |
| Build, Lint & Type-Check Verification | 2026-03-20 | Pending | Implementation |
| Deploy to Production | 2026-03-20 | Pending | Verification |

### 15. What We're NOT Doing (Out of Scope for This Release)

- Centralizing phone/email/address into `src/lib/constants.ts` (Known Issue #4)
- Adding `metadataBase` or OG images (separate SEO concern)
- Rate limiting on contact API (separate security concern)
- Changes to footer, contact page, FAQ, or structured data (already fixed in PRD 004)
- Making the phone number a configurable prop on `CtaBanner`

---

## Testing Requirements

### Test Cases — Unit Tests (Vitest + React Testing Library)

Place test files in `/tests/unit/`. Run with `npm test -- --run`.

---

### TC-005-01: CTA banner displays correct phone number and href

**Validates:** US-005-01, AC-005-01, AC-005-02, US-005-02, AC-005-07, AC-005-09
**Test Type:** Unit
**Framework:** Vitest + React Testing Library
**Location:** `tests/unit/cta-banner.test.tsx`

```gherkin
Scenario: CTA banner phone link displays correct number and href
  Given the CtaBanner component is rendered with default props
  When I query the phone link
  Then the link text contains '(808) 200-1840'
  And the link href is 'tel:+18082001840'
```

---

### TC-005-02: CTA banner does not contain old placeholder number

**Validates:** US-005-01, AC-005-03, AC-005-04, US-005-02, AC-005-08
**Test Type:** Unit
**Framework:** Vitest + React Testing Library
**Location:** `tests/unit/cta-banner.test.tsx`

```gherkin
Scenario: Old placeholder phone number is absent from CTA banner
  Given the CtaBanner component is rendered with default props
  When I search the rendered output
  Then the text does not contain '(800) 888-8888'
  And no href contains '+18008888888'
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
| CTA | Call to Action — the prominent banner section encouraging visitors to take action (call, visit, schedule) |
| Golden Thread | Unbroken traceability chain from business objectives through user stories, acceptance criteria, and test cases |
| RSC | React Server Component — the CtaBanner is an RSC (no client-side interactivity) |
| MoSCoW | Prioritization framework: Must/Should/Could/Won't Have |
| E.164 | International telephone numbering format (e.g., `+18082001840`) |

---

## Golden Thread Summary

```
OBJ-005-01: Every phone number routes to correct business line
  └── US-005-01: Correct Phone Number in CTA Banner
        ├── AC-005-01: CTA displays +1 (808) 200-1840
        ├── AC-005-02: tel: href is tel:+18082001840
        ├── AC-005-03: +1 (800) 888-8888 absent
        ├── AC-005-04: +18008888888 absent from href
        ├── AC-005-05: Typecheck passes
        └── AC-005-06: Lint passes
        Tests: TC-005-01, TC-005-02

OBJ-005-02: Regression test prevents recurrence
  └── US-005-02: Regression Test Guards CTA Banner
        ├── AC-005-07: Test asserts correct number present
        ├── AC-005-08: Test asserts old number absent
        ├── AC-005-09: Test asserts tel: href correct
        ├── AC-005-10: Test in tests/unit/ directory
        └── AC-005-11: All unit tests pass
        Tests: TC-005-01, TC-005-02
```
