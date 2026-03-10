# Logo Update - Unified Requirements Document

## Document Metadata

- **Feature ID**: 008
- **Feature Name**: logo_update
- **Document Type**: BRD_PRD
- **Generated Date**: 2026-03-09

## Document Control

| Attribute | Details |
|-----------|---------|
| **Document Type** | Unified BRD-PRD |
| **Version** | 1.0 |
| **Status** | Draft |
| **Project Sponsor** | Kriss Aseniero (kriss@casacolinacare.com) |
| **Product Owner** | Ramon Aseniero (ramon@jairosoft.com) |
| **Core Team** | @Ramon (Developer) |
| **Target Release** | Q1 2026 |
| **Last Updated** | 2026-03-09 |

---

## Part I: Strategic Foundation (BRD)

### 1. Executive Summary

The Casa Colina Care website logo currently uses the Inter sans-serif font, while all page headings use Playfair Display — an elegant serif font that anchors the site's warm, trustworthy visual identity. This typographic disconnect weakens brand cohesion and makes the logo appear generic compared to the rest of the site.

This initiative updates the text-based logo across all layout components (header, footer, mobile navigation) to use Playfair Display, creating a unified typographic identity. The change is minimal in code footprint (Tailwind class additions) but meaningful in brand perception for the target audience of adult children researching care options for aging parents.

### 2. Business Problem & Opportunity

#### 2.1 Current State ("As-Is")

The website logo is rendered as plain text "Casa Colina Care" using the default body font (Inter). Meanwhile, every heading on the site — including the prominent hero text "Compassionate Care in the Heart of Hawaii Kai" — uses Playfair Display, a serif font chosen specifically to convey warmth, trustworthiness, and sophistication.

**Quantitative Evidence:**
- Logo uses `font-sans` (Inter) while headings use `font-heading` (Playfair Display) — 2 different font families in the above-the-fold area
- Logo appears in 3 separate components (header, footer, mobile nav), all using the mismatched font
- 100% of page headings (h1-h3) use Playfair Display; 0% of logo instances match

**Qualitative Evidence:**
- Business owner feedback: "We want to update the logo and create a much better logo that matches with our website"
- The current plain Inter logo appears generic and could belong to any website, lacking the distinctive character of the Playfair Display headings
- Competitor care home websites typically use serif or script fonts for logos to convey warmth and trust

#### 2.2 Root Cause Analysis

1. **Why does the logo look inconsistent?** — It uses Inter (sans-serif) while headings use Playfair Display (serif)
2. **Why does it use Inter?** — The logo inherits the default `font-sans` body text style
3. **Why wasn't it styled differently from the start?** — During initial development (PRD 002), the logo was implemented as a plain text link without explicit font-family override
4. **Why does this matter now?** — As the site has matured, the visual disconnect between the generic logo and the carefully branded headings has become a noticeable quality gap

### 3. Business Objectives & Success Metrics

**THE GOLDEN THREAD STARTS HERE**

| Objective ID | SMART Business Objective | Key Performance Indicator (KPI) | Current Baseline | Target | Measurement Method |
|---|---|---|---|---|---|
| OBJ-008-01 | Achieve 100% typographic consistency between logo and headings across all pages within 1 sprint | Font family match ratio (logo vs. headings) | 0% (logo uses Inter, headings use Playfair Display) | 100% (all logo instances use Playfair Display) | Visual inspection + automated test |

### 4. Project Scope & Boundaries

#### 4.1 In Scope

- Update header logo font from Inter to Playfair Display
- Update footer logo font to match header
- Update mobile navigation logo font to match header
- Ensure consistent font rendering across Chrome, Safari, Firefox, Edge
- Verify no Cumulative Layout Shift (CLS) introduced by the font change

#### 4.2 Out of Scope (Critical for Scope Control)

- Image-based or SVG logo design
- Logo icon or graphic elements (e.g., house, palm tree, wave motifs)
- Logo color changes (stays foreground/Deep Charcoal #1A1A2E)
- Favicon update
- Logo animations or hover effects
- New font downloads or packages (Playfair Display already loaded)
- Changes to heading styles elsewhere on the site
- Brand style guide creation

### 5. Stakeholder Analysis (RACI Matrix)

| Stakeholder | Role | Requirements | Approval | UAT | Development |
|---|---|---|---|---|---|
| Kriss Aseniero | Business Owner / Sponsor | C | **A** | **A** | I |
| Ramon Aseniero | Developer / Product Owner | **R** | C | C | **R** |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

### 6. Assumptions, Constraints & Dependencies

#### Assumptions

- Playfair Display renders acceptably at the logo's text size (`text-xl` / ~20px) across all supported browsers
- The existing `font-heading` Tailwind utility class is sufficient — no custom CSS needed
- No user testing is required for a font-only change; business owner approval is sufficient

#### Constraints

| ID | Constraint |
|---|---|
| TC-008-01 | Must use the existing `font-heading` Tailwind utility class (Playfair Display already configured) |
| TC-008-02 | No new npm packages or font files may be added |
| TC-008-03 | Logo must remain a text-based `<Link>` component (no image replacement) |

#### Dependencies

- None. Playfair Display is already loaded via `next/font/google` in `src/app/layout.tsx`

### 7. Financial Justification

#### Cost-Benefit Analysis

- **Estimated Costs:** ~1-2 hours of developer time (Tailwind class changes in 3 files)
- **Projected Benefits:** Improved brand perception and visual professionalism for potential clients
- **ROI:** High — minimal effort, meaningful brand consistency improvement
- **Payback Period:** Immediate upon deployment

#### Risk Assessment

| Risk ID | Risk Description | Likelihood (1-5) | Impact (1-5) | Mitigation Strategy |
|---|---|---|---|---|
| RISK-008-01 | Playfair Display renders poorly at small sizes on certain OS/browser combinations | 2 | 3 | Test across Chrome, Safari, Firefox on macOS, Windows, iOS, Android before deployment |
| RISK-008-02 | Font swap causes visible layout shift (CLS) during page load | 1 | 3 | Playfair Display is already preloaded via `next/font`; verify with Lighthouse CLS metric |
| RISK-008-03 | Logo becomes less legible at mobile viewport sizes with serif font | 2 | 2 | Verify readability at 375px viewport width; adjust font-size if needed |

---

## Part II: Tactical Execution (PRD)

### 8. Target Users & Personas

**Primary Persona:** Sarah, 52, Adult Daughter
- **Goals:** Find a trustworthy care home for her aging mother in Hawaii Kai
- **Pain Points:** Needs to quickly assess if a care home is professional and legitimate from the website
- **Context:** Browsing on mobile (iPhone) and desktop, comparing multiple care home websites

**Secondary Persona:** Kriss Aseniero, Business Owner
- **Goals:** Present Casa Colina Care as a warm, professional, and trustworthy brand online
- **Pain Points:** Current logo looks generic and doesn't match the carefully chosen visual identity of the site

### 9. User Stories & Functional Requirements

**THE GOLDEN THREAD CONTINUES: Each story links to a business objective**

#### Feature Area: Logo Typography Update

---

### US-008-01: Header Logo Font Update
**As a** site visitor
**I want** to see the "Casa Colina Care" logo in the header rendered in Playfair Display font
**So that** the logo visually matches the website's heading typography and conveys a warm, professional brand

**Acceptance Criteria:**

```gherkin
Scenario: Header logo displays in Playfair Display
  Given I navigate to any page on casacolinacare.com
  When the page loads completely
  Then the header logo text "Casa Colina Care" is rendered in Playfair Display font
  And the logo font matches the font used in page headings (h1, h2, h3)

Scenario: Header logo remains a clickable link to home
  Given I am on any page other than the home page
  When I click the "Casa Colina Care" logo in the header
  Then I am navigated to the home page (/)
```

**Numbered Acceptance Criteria:**
- [ ] AC-008-01: Header logo text "Casa Colina Care" renders in Playfair Display (`font-heading` class applied)
- [ ] AC-008-02: Logo retains `font-bold` weight and `tracking-tight` letter spacing
- [ ] AC-008-03: Logo remains a clickable `<Link>` to `/` (home page)
- [ ] AC-008-04: Logo is legible at desktop viewport (1280px+) and mobile viewport (375px)

**Validates:** OBJ-008-01

---

### US-008-02: Footer Logo Font Consistency
**As a** site visitor
**I want** to see the footer logo in the same Playfair Display font as the header logo
**So that** the brand identity is consistent across the entire page layout

**Acceptance Criteria:**

```gherkin
Scenario: Footer logo matches header logo font
  Given I scroll to the footer of any page
  When the footer is visible
  Then the "Casa Colina Care" text in the footer uses Playfair Display font
  And the footer logo font matches the header logo font exactly
```

**Numbered Acceptance Criteria:**
- [ ] AC-008-05: Footer logo text renders in Playfair Display (`font-heading` class applied)
- [ ] AC-008-06: Footer logo font family matches header logo font family (both use `font-heading`)

**Validates:** OBJ-008-01

---

### US-008-03: Mobile Navigation Logo Font Consistency
**As a** mobile site visitor
**I want** to see the mobile navigation logo in the same Playfair Display font as the header
**So that** the brand experience is consistent when I open the mobile menu

**Acceptance Criteria:**

```gherkin
Scenario: Mobile nav logo matches header logo font
  Given I am viewing the site on a mobile device (viewport < 768px)
  When I open the mobile navigation menu
  Then the "Casa Colina Care" text in the mobile nav header uses Playfair Display font
  And the mobile nav logo font matches the header logo font exactly
```

**Numbered Acceptance Criteria:**
- [ ] AC-008-07: Mobile nav `SheetTitle` text renders in Playfair Display (`font-heading` class applied)
- [ ] AC-008-08: Mobile nav logo font matches header and footer logo font

**Validates:** OBJ-008-01

---

### US-008-04: Logo Quality Assurance
**As a** developer
**I want** the logo font change to pass all existing lint, typecheck, and test suites
**So that** the change does not introduce regressions

**Acceptance Criteria:**

```gherkin
Scenario: No build regressions from logo change
  Given the logo font has been updated in header, footer, and mobile nav
  When I run the project health check (lint, typecheck, tests)
  Then all checks pass without errors or warnings

Scenario: No layout shift from font change
  Given a user loads any page on casacolinacare.com
  When the page renders
  Then the Cumulative Layout Shift (CLS) score remains below 0.1
```

**Numbered Acceptance Criteria:**
- [ ] AC-008-09: `npm run lint -- --fix` passes with no errors
- [ ] AC-008-10: `npm run type-check` passes with no errors
- [ ] AC-008-11: `npm test -- --run` passes with no failures
- [ ] AC-008-12: Lighthouse CLS score remains < 0.1 on all pages

**Validates:** OBJ-008-01

---

### 10. Non-Functional Requirements (NFRs)

**THE GOLDEN THREAD COMPLETES: NFRs trace to business objectives**

| NFR ID | Category | Requirement | Business Objective Link | Test Method |
|---|---|---|---|---|
| NFR-008-01 | Performance | Logo font change must not increase CLS above 0.1 on any page | OBJ-008-01 | Lighthouse audit |
| NFR-008-02 | Accessibility | Logo text must maintain WCAG 2.1 AA contrast ratio (minimum 4.5:1 against background) | OBJ-008-01 | axe DevTools / contrast checker |
| NFR-008-03 | Compatibility | Logo must render correctly in Chrome, Safari, Firefox, and Edge (latest 2 versions) | OBJ-008-01 | Manual cross-browser testing |
| NFR-008-04 | Responsiveness | Logo must be legible and properly sized at viewports from 375px to 1440px+ | OBJ-008-01 | Visual inspection at breakpoints |

### 11. User Interaction & Design

**Current Logo (Before):**
```
[Casa Colina Care]  ← Inter (sans-serif), text-xl, font-bold, tracking-tight
```

**Updated Logo (After):**
```
[Casa Colina Care]  ← Playfair Display (serif), text-xl, font-bold, tracking-tight
```

- No wireframes needed — this is a CSS class change only
- Visual difference: Playfair Display will give the logo an elegant serif appearance matching the hero heading

### 12. Technical Considerations

**Architecture:** No architectural changes. This is a Tailwind CSS class addition.

**Files to Modify:**

| File | Current Classes | Change |
|---|---|---|
| `src/components/layout/header.tsx` (line 24) | `text-xl font-bold tracking-tight` | Add `font-heading` |
| `src/components/layout/footer.tsx` (line 18) | *(plain text)* | Add `font-heading` class |
| `src/components/layout/mobile-nav.tsx` (line 41) | *(SheetTitle)* | Add `font-heading` class |

**Existing Infrastructure (no changes needed):**
- `tailwind.config.ts` — `font-heading` maps to `var(--font-playfair-display)`
- `src/app/layout.tsx` — Playfair Display loaded via `next/font/google`
- `src/styles/globals.css` — CSS variables already defined

**Integration Points:** None. No external APIs or services involved.

### 13. Open Questions & Decision Log

| Question/Topic | Date Raised | Decision | Rationale | Date Decided | Owner |
|---|---|---|---|---|---|
| Should the logo also include brand color (Ocean Teal)? | 2026-03-09 | No — text only, current foreground color | MVP scope: font change only per business owner request | 2026-03-09 | Ramon |
| Should an icon/graphic be added alongside the text? | 2026-03-09 | No — text only | MVP scope: keep it simple, evaluate in future iteration | 2026-03-09 | Ramon |
| Should the logo font size change with the new font? | 2026-03-09 | Keep `text-xl` initially | Playfair Display at `text-xl` should be legible; adjust only if testing reveals issues | 2026-03-09 | Ramon |

### 14. Release Plan & Milestones

| Milestone | Target Date | Status | Dependencies |
|---|---|---|---|
| BRD_PRD Approved | 2026-03-09 | Draft | Business owner review |
| Implementation | 2026-03-10 | Pending | BRD_PRD approval |
| Cross-browser Testing | 2026-03-10 | Pending | Implementation |
| Business Owner UAT | 2026-03-11 | Pending | Testing |
| Production Deployment | 2026-03-11 | Pending | UAT approval |

### 15. What We're NOT Doing (Out of Scope for This Release)

- Image/SVG logo design or logo graphic creation
- Logo icon or symbol (house, palm tree, wave, etc.)
- Color treatment for the logo (stays Deep Charcoal #1A1A2E)
- Favicon redesign
- Logo animations, transitions, or hover effects
- Brand style guide or design system documentation
- New font packages or typeface exploration
- Changes to any other component styling

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
| Playfair Display | A serif typeface used for headings on the Casa Colina Care website, conveying elegance and warmth |
| Inter | A sans-serif typeface used for body text on the website |
| font-heading | Tailwind CSS utility class that applies the Playfair Display font family |
| font-sans | Tailwind CSS utility class that applies the Inter font family |
| CLS | Cumulative Layout Shift — a Core Web Vital metric measuring visual stability during page load |
| RSC | React Server Component — the default component type in Next.js App Router |
| Tailwind CSS | Utility-first CSS framework used for styling throughout the project |
| SheetTitle | A shadcn/ui component used in the mobile navigation slide-out menu |
| WCAG 2.1 AA | Web Content Accessibility Guidelines level AA — the standard for accessible web content |

---

## Golden Thread Summary

```
OBJ-008-01: Achieve 100% typographic consistency between logo and headings
  ├── US-008-01: Header logo font update
  │     ├── AC-008-01: font-heading class applied to header logo
  │     ├── AC-008-02: Bold weight and tight tracking retained
  │     ├── AC-008-03: Link to home page preserved
  │     └── AC-008-04: Legible at desktop and mobile viewports
  ├── US-008-02: Footer logo consistency
  │     ├── AC-008-05: font-heading class applied to footer logo
  │     └── AC-008-06: Matches header font
  ├── US-008-03: Mobile nav logo consistency
  │     ├── AC-008-07: font-heading class applied to mobile nav
  │     └── AC-008-08: Matches header and footer font
  └── US-008-04: Quality assurance
        ├── AC-008-09: Lint passes
        ├── AC-008-10: Typecheck passes
        ├── AC-008-11: Unit tests pass
        └── AC-008-12: CLS < 0.1
```
