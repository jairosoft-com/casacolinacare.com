# Project Analysis: casacolinacare.com

**Date**: 2026-02-20 **Scope**: Full codebase audit of the Casa Colina Care
marketing website **Purpose**: Identify refactoring opportunities, dead code,
inconsistencies, and quality improvements

---

## 1. Project Overview

Marketing website for Casa Colina Care LLC, a licensed residential care home in
Hawaii Kai, HI. Built with Next.js 15 (App Router), React 19, TypeScript strict
mode. Four pages (Home, About, FAQ, Contact) plus one API route for the contact
form (Resend email). No database, no auth, no CMS.

**Live URL**: `https://casacolinacare.com`

---

## 2. File Inventory

### Source Files (src/)

| Directory                  | Files   | Total Lines | Notes                                                |
| -------------------------- | ------- | ----------- | ---------------------------------------------------- |
| `src/app/`                 | 7 files | ~624        | 4 pages + layout + robots + sitemap                  |
| `src/app/api/contact/`     | 1 file  | 107         | POST handler for contact form                        |
| `src/components/layout/`   | 3 files | 204         | Header, Footer, MobileNav                            |
| `src/components/sections/` | 6 files | 566         | Hero, Intro, Services, Testimonial, CTA, ContactForm |
| `src/components/shared/`   | 2 files | 44          | SectionHeading, MapEmbed                             |
| `src/components/ui/`       | 7 files | 407         | shadcn/ui primitives                                 |
| `src/components/`          | 1 file  | 10          | ClientWrapper (unused)                               |
| `src/lib/`                 | 4 files | 183         | constants (empty), email, faq-data, structured-data  |
| `src/lib/api/`             | 3 files | 290         | API client, types, user service (all unused)         |
| `src/lib/store/`           | 1 file  | 102         | Zustand stores (unused)                              |
| `src/utils/`               | 5 files | 10          | cn utility + 3 empty files + barrel                  |
| `src/types/`               | 1 file  | 1           | Empty types file                                     |
| `src/styles/`              | 1 file  | 42          | globals.css                                          |

### Test Files (tests/)

| Directory     | Files   | Total Lines | Notes                                  |
| ------------- | ------- | ----------- | -------------------------------------- |
| `tests/unit/` | 6 files | 202         | Vitest + React Testing Library         |
| `tests/e2e/`  | 6 files | 235         | Playwright (Chromium, Firefox, WebKit) |

### Configuration Files (root)

| File                   | Lines | Notes                                                              |
| ---------------------- | ----- | ------------------------------------------------------------------ |
| `package.json`         | 76    | Package name is "myapp6" (starter template leftover)               |
| `tsconfig.json`        | 51    | Target ES5 (unnecessarily conservative)                            |
| `tailwind.config.ts`   | 90    | Includes unused `darkMode: ['class']` and dead `src/pages/**` path |
| `next.config.ts`       | 49    | Standalone output, React Compiler commented out                    |
| `eslint.config.mjs`    | 119   | Flat config with 9 plugins                                         |
| `prettier.config.js`   | 18    | Standard config with Tailwind plugin                               |
| `vitest.config.ts`     | 40    | 60% coverage threshold                                             |
| `playwright.config.ts` | 63    | Multi-browser on CI                                                |
| `Dockerfile`           | 53    | Multi-stage Node 20 Alpine                                         |
| `docker-compose.yml`   | 37    | Healthcheck on nonexistent `/api/health`                           |

---

## 3. Architecture Assessment

### Component Breakdown

**Client Components** (7 files, marked `'use client'`):

- `header.tsx` -- `usePathname` for active link highlighting
- `mobile-nav.tsx` -- `useState` for Sheet open/close
- `contact-form.tsx` -- Form state, validation, fetch submission (309 lines,
  largest component)
- `accordion.tsx`, `label.tsx`, `sheet.tsx` -- shadcn/ui Radix wrappers
- `ClientWrapper.tsx` -- Empty wrapper, renders children only. **Not imported
  anywhere.**

**Server Components** (12 files):

- `footer.tsx`, `hero.tsx`, `intro.tsx`, `services-overview.tsx`,
  `testimonial.tsx`, `cta-banner.tsx`
- `section-heading.tsx`, `map-embed.tsx`
- `button.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`

**Assessment**: The RSC/client boundary is cleanly separated. Only components
that require browser APIs or React hooks are client components. This is correct.

### Rendering Strategy

All pages are statically generated (SSG). No ISR, no server-side rendering at
request time. This is the optimal strategy for a marketing site with no dynamic
content.

### Data Flow

Contact form is the only interactive data flow:

1. Client-side validation in `contact-form.tsx`
2. `POST /api/contact` with server-side validation
3. Resend SDK sends email to `kriss@casacolinacare.com`
4. No data persistence -- email and forget

---

## 4. Critical Issues

### 4.1 Wrong Phone Number in CTA Banner

**File**: `src/components/sections/cta-banner.tsx:34` **Severity**: High
(user-facing data error)

The CTA banner hardcodes the old placeholder phone number `+1 (800) 888-8888`.
Every other location in the project uses the correct number `+1 (808) 200-1840`.
This component renders on Home, About, and FAQ pages.

Existing test `TC-009` in `contact-page.test.tsx` explicitly asserts this old
number does NOT appear -- but only checks the contact page, not the CTA banner.

### 4.2 Empty constants.ts Violates Architecture Contract

**File**: `src/lib/constants.ts` **Severity**: High (architectural violation)

AGENTS.md states: _"All business data must be defined in constants.ts and
imported wherever needed. Never hardcode business data in components."_ The file
is empty (single comment line). All business data is hardcoded across 7+ files.

### 4.3 XSS Risk in Email Template

**File**: `src/lib/email.ts` **Severity**: Medium (internal email, limited
attack surface)

User-submitted values (`firstName`, `lastName`, `email`, `message`) are
interpolated directly into the HTML email template without HTML entity escaping.
While the email is sent only to the business owner, a malicious form submission
could inject arbitrary HTML/JavaScript into the email if the email client
renders raw HTML.

### 4.4 No Rate Limiting on API Route

**File**: `src/app/api/contact/route.ts` **Severity**: Medium (abuse potential)

The contact form API has no rate limiting. An attacker could send thousands of
emails through the endpoint, potentially exhausting the Resend API quota and
generating spam.

---

## 5. Dead Code & Unused Dependencies

### Unused Source Files (~500 lines)

| File                               | Lines    | Description                                                               |
| ---------------------------------- | -------- | ------------------------------------------------------------------------- |
| `src/lib/api/client.ts`            | 172      | Full REST API client with auth, error handling. Never imported.           |
| `src/lib/api/types.ts`             | 72       | User, LoginRequest, PaginatedResponse types. Never imported outside api/. |
| `src/lib/api/services/users.ts`    | 46       | User CRUD service. Never imported.                                        |
| `src/lib/store/index.ts`           | 102      | Three Zustand stores (auth, UI, notifications). Never imported.           |
| `src/components/ClientWrapper.tsx` | 10       | Empty client wrapper. Never imported.                                     |
| `src/utils/formatters.ts`          | 1        | Empty file (comment only).                                                |
| `src/utils/utils.ts`               | 1        | Empty file (comment only).                                                |
| `src/utils/validators.ts`          | 1        | Empty file (comment only).                                                |
| `src/types/types.ts`               | 1        | Empty file (comment only).                                                |
| **Total**                          | **~406** |                                                                           |

### Unused Public Assets

The following default Next.js starter SVGs are not referenced anywhere:

- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`

### Unused Production Dependency

**`zustand` (^5.0.8)**: Listed as a production dependency. None of the three
stores defined in `src/lib/store/index.ts` are imported anywhere. This adds
unnecessary weight to `node_modules` and potentially to the client bundle.

---

## 6. Code Duplication

### 6.1 Navigation Links (3 locations)

The `navLinks` array is independently defined with identical content in:

- `src/components/layout/header.tsx:11-16`
- `src/components/layout/footer.tsx:3-8`
- `src/components/layout/mobile-nav.tsx:17-22`

**Recommendation**: Define once in `src/lib/constants.ts`, import everywhere.

### 6.2 Contact Information (6+ locations)

Phone number, fax, email, address, and hours are hardcoded in:

- `src/app/contact/page.tsx` (JSX)
- `src/components/layout/footer.tsx` (JSX)
- `src/components/sections/cta-banner.tsx` (JSX -- wrong number)
- `src/lib/structured-data.ts` (JSON-LD)
- `src/lib/faq-data.ts` (FAQ answer text)
- `public/llms.txt` (static file)

**Recommendation**: Centralize in `src/lib/constants.ts`. Import into components
and structured data. The `llms.txt` file is static and must be updated manually,
but all dynamic sources should share one definition.

### 6.3 Form Validation Logic (2 locations)

Client-side validation in `contact-form.tsx:40-76` and server-side validation in
`api/contact/route.ts:25-58` duplicate the same regex patterns and field
constraints.

**Recommendation**: Extract a shared validation module (e.g.,
`src/lib/validation.ts`) imported by both client and server code.

---

## 7. Inconsistencies

### 7.1 Import Paths for `cn()` Utility

Three different import styles are used for the same function:

| Style           | Used in                                           |
| --------------- | ------------------------------------------------- |
| `@/utils/cn`    | header.tsx, card.tsx, section-heading.tsx         |
| `@/utils`       | button.tsx, sheet.tsx, mobile-nav.tsx             |
| `@/utils/index` | input.tsx, label.tsx, textarea.tsx, accordion.tsx |

All resolve to the same export. Should standardize on one path (recommend
`@/utils/cn` for explicitness, or `@/utils` via barrel export).

### 7.2 Package Name

`package.json` has `"name": "myapp6"` -- leftover from a starter template.
Should be `"casacolinacare-web"` or similar.

### 7.3 TypeScript Target

`tsconfig.json` targets `"es5"` which is unnecessarily conservative. Next.js
handles transpilation via SWC regardless of the tsconfig target. Modern targets
like `"es2020"` or `"esnext"` are more appropriate and enable better
type-checking for modern APIs.

### 7.4 Tailwind Config Mismatches

- `darkMode: ['class']` is configured but the project explicitly has no dark
  mode. No dark CSS variables exist, no toggle component exists.
- Content paths include `src/pages/**` which does not exist (this is an App
  Router project with no Pages Router).

### 7.5 Docker Healthcheck Points to Nonexistent Route

`docker-compose.yml:26` references `curl http://localhost:3000/api/health` but
no `/api/health` route exists.

---

## 8. Testing Assessment

### Current Coverage

**Unit Tests** (5 meaningful tests):

- Structured data schema validation
- Contact page content verification
- Footer content verification
- FAQ page content verification
- 1 trivial placeholder test (`1 === 1`)

**E2E Tests** (6 specs):

- Home page core elements
- Console error detection
- Structured data in DOM
- Footer contact info
- Contact page info
- llms.txt accessibility

### Coverage Gaps

| Area                                                    | Status                |
| ------------------------------------------------------- | --------------------- |
| Home page sections (Hero, Intro, Services, Testimonial) | Not tested            |
| About page content                                      | Not tested            |
| Header navigation                                       | Not tested            |
| MobileNav behavior                                      | Not tested            |
| ContactForm validation (unit)                           | Not tested            |
| ContactForm submission (unit)                           | Not tested            |
| API route (POST /api/contact)                           | Not tested            |
| Email template generation                               | Not tested            |
| Form accessibility (focus management)                   | Not tested            |
| CTA banner content (including phone number)             | Not tested            |
| Error boundaries                                        | None exist to test    |
| 404/not-found behavior                                  | No custom page exists |
| Responsive layout                                       | Not tested            |

### Test Infrastructure

The test infrastructure is well-configured:

- Vitest with jsdom, React Testing Library, jest-dom matchers
- Playwright with multi-browser CI support
- 60% coverage threshold
- `@testing-library/user-event` installed but unused

---

## 9. SEO & Metadata Assessment

### Present

- Per-page `title` and `description` metadata
- `openGraph` with title, description, URL per page
- Title template (`%s | Casa Colina Care`)
- JSON-LD `LocalBusiness` structured data
- `robots.ts` allowing all crawlers
- `sitemap.ts` with all 4 pages
- `llms.txt` for AI/LLM discovery
- Semantic HTML with proper heading hierarchy
- `<html lang="en">`

### Missing

| Item                        | Impact                                             |
| --------------------------- | -------------------------------------------------- |
| `metadataBase` in layout    | Required by Next.js 15 for OG image URL resolution |
| `openGraph.images`          | No social sharing image on any page                |
| Twitter card metadata       | No Twitter/X card previews                         |
| Canonical URLs              | Relies on OG url, not explicit canonical           |
| `image` property in JSON-LD | Recommended for LocalBusiness schema               |
| `sameAs` in JSON-LD         | No social media profile links                      |
| Custom favicon metadata     | Relies on default `/favicon.ico`                   |
| Custom 404 page             | Uses default Next.js not-found page                |

---

## 10. Performance Profile

### Strengths

- All pages statically generated (SSG) -- optimal for marketing site
- Images in WebP format with `next/image` optimization
- Hero image has `priority` flag for LCP
- Fonts loaded via `next/font/google` with `variable` strategy (no FOUT/FOIT)
- Font subsets limited to `['latin']`
- Google Maps iframe has `loading="lazy"`

### Concerns

| Item                           | Description                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Unused `zustand` dep           | Production dependency, potentially included in client bundle                                             |
| `lucide-react`                 | Large package (~0.5MB unpacked), only 8 icons used. Tree-shaking should handle this but worth verifying. |
| No `loading.tsx`               | Acceptable for SSG but means no loading UI for client-side navigation                                    |
| `sitemap.ts` uses `new Date()` | `lastModified` updates on every build even when content hasn't changed                                   |

---

## 11. Security Assessment

| Area                       | Status      | Notes                                              |
| -------------------------- | ----------- | -------------------------------------------------- |
| API key protection         | OK          | `RESEND_API_KEY` server-side only, factory pattern |
| Server-side validation     | OK          | All form fields validated on server                |
| Client-side validation     | OK          | Mirrors server validation                          |
| HTML escaping in emails    | MISSING     | User input interpolated directly into HTML         |
| Rate limiting              | MISSING     | No protection against form submission abuse        |
| CSRF protection            | MISSING     | No CSRF token on API route                         |
| Content-Type checking      | MISSING     | API route doesn't verify Content-Type header       |
| Dependency vulnerabilities | NOT AUDITED | Should run `npm audit`                             |

---

## 12. Dependency Analysis

### Production Dependencies (14 packages)

| Package                      | Necessity                                  |
| ---------------------------- | ------------------------------------------ |
| `next`, `react`, `react-dom` | Core framework -- required                 |
| `@radix-ui/react-accordion`  | Used in FAQ page -- required               |
| `@radix-ui/react-dialog`     | Used in Sheet/MobileNav -- required        |
| `@radix-ui/react-label`      | Used in ContactForm -- required            |
| `@radix-ui/react-slot`       | Used in Button asChild -- required         |
| `class-variance-authority`   | Used in Button, Sheet variants -- required |
| `clsx`                       | Used in `cn()` utility -- required         |
| `lucide-react`               | Used for icons (8 icons) -- required       |
| `resend`                     | Used for contact form email -- required    |
| `tailwind-merge`             | Used in `cn()` utility -- required         |
| `zustand`                    | **NOT USED** -- should be removed          |

### Dev Dependencies (24 packages)

All dev dependencies are actively used by the toolchain (TypeScript, ESLint,
Prettier, Vitest, Playwright, Husky, Commitlint) except:

- `commitizen` and `cz-conventional-changelog` -- optional (Commitizen workflow)

---

## 13. Refactoring Priority Matrix

| Priority | Issue                                                             | Impact                   | Effort  |
| -------- | ----------------------------------------------------------------- | ------------------------ | ------- |
| P0       | Fix CTA banner phone number                                       | User-facing error        | Trivial |
| P1       | Populate `constants.ts` with business data                        | Architecture, DRY        | Medium  |
| P1       | Remove dead code (API client, stores, empty files, ClientWrapper) | Codebase clarity, bundle | Low     |
| P1       | Remove `zustand` production dependency                            | Bundle size              | Trivial |
| P2       | Extract shared validation module                                  | DRY, maintainability     | Low     |
| P2       | Deduplicate `navLinks`                                            | DRY                      | Trivial |
| P2       | HTML-escape email template inputs                                 | Security                 | Low     |
| P2       | Add `not-found.tsx` and `error.tsx` pages                         | UX                       | Low     |
| P2       | Standardize `cn()` import paths                                   | Consistency              | Trivial |
| P3       | Fix package name (`myapp6` -> project name)                       | Hygiene                  | Trivial |
| P3       | Update tsconfig target to `es2020`+                               | Hygiene                  | Trivial |
| P3       | Remove `darkMode` and dead content paths from tailwind config     | Hygiene                  | Trivial |
| P3       | Fix Docker healthcheck route                                      | DevOps                   | Trivial |
| P3       | Remove unused public SVGs                                         | Hygiene                  | Trivial |
| P3       | Add `metadataBase` and OG images                                  | SEO                      | Medium  |
| P3       | Add rate limiting to contact API                                  | Security                 | Medium  |
| P4       | Expand test coverage (ContactForm, API route, About page)         | Quality                  | High    |
| P4       | Add Twitter card metadata                                         | SEO                      | Low     |
| P4       | Add `image` and `sameAs` to JSON-LD                               | SEO                      | Low     |

---

## 14. Summary

The Casa Colina Care website is a well-structured Next.js marketing site with a
clean RSC/client boundary, good accessibility foundations, and a solid tooling
setup. The primary issues are:

1. **~500 lines of dead boilerplate code** from a starter template (API client,
   Zustand stores, empty placeholder files) that should be removed entirely.
2. **Business data is scattered across 7+ files** instead of being centralized
   in `constants.ts` as the architecture specifies, leading to a wrong phone
   number in the CTA banner.
3. **Validation logic is duplicated** between client and server with no shared
   module.
4. **Minor inconsistencies** in import paths, config values, and naming that
   reduce codebase professionalism.

None of these issues affect the site's core functionality or performance in a
critical way, but they accumulate as maintenance debt and increase the risk of
data inconsistencies (as demonstrated by the wrong phone number).
