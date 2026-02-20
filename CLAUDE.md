# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

Marketing website for **Casa Colina Care LLC**, a licensed residential care home
in Hawaii Kai, HI. Four pages (Home, About, FAQ, Contact) with a contact form
that sends email via Resend. No database, no auth, no CMS. Target audience:
adult children (35-65) researching care for aging parents.

Live URL: `https://casacolinacare.com`

## Commands

```bash
npm run dev                 # Dev server (Turbopack)
npm run build               # Production build
npm run lint -- --fix       # Auto-fix: sort imports, format code
npm run type-check          # TypeScript strict mode check
npm test -- --run           # Unit tests (Vitest, once)
npm test -- --coverage      # Coverage report (60% threshold)
npm run test:e2e            # E2E tests (Playwright)
```

Health check before committing:

```bash
npm run lint -- --fix && npm run type-check && npm test -- --run
```

Pre-commit hooks (Husky) automatically run `npm run lint && npm run type-check`.
Conventional commits enforced by Commitlint — use `npx cz` or just `git commit`.

## Architecture

Next.js 15 App Router, React 19, TypeScript strict mode. Server-first — all
components are RSC by default. Only two client components exist: `Header`
(navigation with `usePathname`) and `ContactForm` (form state + fetch).

### Pages and Routes

| Route          | File                          | Rendering |
| -------------- | ----------------------------- | --------- |
| `/`            | `src/app/page.tsx`            | SSG       |
| `/about`       | `src/app/about/page.tsx`      | SSG       |
| `/faq`         | `src/app/faq/page.tsx`        | SSG       |
| `/contact`     | `src/app/contact/page.tsx`    | SSG       |
| `POST /api/contact` | `src/app/api/contact/route.ts` | Serverless |

### Contact Form Flow

1. Client-side validation in `src/components/sections/contact-form.tsx`
2. `POST /api/contact` — server-side validation + Resend email
3. Email sent to `kriss@casacolinacare.com` via Resend SDK
4. Email HTML built by `src/lib/email.ts`

### Component Organization

```
src/components/
├── layout/       # Header, Footer, MobileNav
├── sections/     # Page sections (Hero, Intro, ServicesOverview, CtaBanner, Testimonial, ContactForm)
├── shared/       # Reusable (SectionHeading, MapEmbed)
└── ui/           # shadcn/ui primitives (Button, Card, Input, Label, Textarea, Accordion, Sheet)
```

### Key Lib Files

- `src/lib/constants.ts` — Business info, nav links
- `src/lib/faq-data.ts` — FAQ content (4 categories, 12 questions)
- `src/lib/email.ts` — HTML email template builder
- `src/lib/structured-data.ts` — JSON-LD LocalBusiness schema
- `src/utils/cn.ts` — `cn()` class merging utility (clsx + tailwind-merge)

## Styling & Brand

Tailwind CSS 3.x + shadcn/ui (New York style). Theme defined via HSL CSS
variables in `src/styles/globals.css`.

| Token      | Hex       | Name             | Usage                          |
| ---------- | --------- | ---------------- | ------------------------------ |
| Primary    | `#0D7377` | Ocean Teal       | Buttons, links, CTAs           |
| Secondary  | `#F5E6D3` | Warm Sand        | Soft backgrounds, alt sections |
| Accent     | `#E07A5F` | Sunset Coral     | Hover states, secondary CTAs   |
| Background | `#FAFAF7` | Ivory            | Page background                |
| Foreground | `#1A1A2E` | Deep Charcoal    | Heading and body text          |

Fonts: **Playfair Display** (`font-heading`) for h1-h3, **Inter** (`font-sans`)
for body text. Loaded via `next/font/google` in `src/app/layout.tsx`.

Border radius: 12px cards, 8px buttons/inputs. Mobile-first breakpoints:
375px > 768px > 1280px. No dark mode.

## Environment Variables

Only one required (in `.env.local`):

```bash
RESEND_API_KEY=re_...     # Resend API key for contact form emails
```

## Boundary Conditions

- No database, no ORM — this is a static marketing site with one API route
- No auth, no accounts, no payments
- No dark mode
- No blog, CMS, or admin panel
- Contact form data is emailed and forgotten (no storage)
- Do not expose `RESEND_API_KEY` to the client
- Both client-side AND server-side validation required on contact form
- Phone numbers: clickable `tel:` links. Emails: `mailto:` links
- Semantic HTML: single `h1` per page, sequential heading hierarchy
- Minimum 44x44px touch targets

## Testing

- **Unit tests**: Vitest + React Testing Library in `tests/unit/`
- **E2E tests**: Playwright in `tests/e2e/`
- Tests are NOT colocated with source — always use `/tests/` directory
- Coverage: 60% threshold (lines, functions, branches, statements)

## Key References

- `AGENTS.md` — Detailed agent instructions with full command reference, code
  style rules, and project structure
- `prd/002_init_design/prd.md` — Product requirements (10 user stories)
- `prd/002_init_design/SPEC.md` — Engineering specification
- `prd/004_contact_update/` — Contact info update specs
- `ai_docs/` — General development guides (ESLint config, testing strategy,
  deployment, branching)
