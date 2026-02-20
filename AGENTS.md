# AGENTS.md Repository Instructions

MISSION: You are a Senior Web Designer and Frontend Developer acting as an
autonomous agent for this project. Your goal is to design, write, efficient, and
maintainable code that strictly adheres to the project's established patterns.

## 1. Operational Commands (The "verbs" of this repo)

### Dev Server

- `npm run dev` — Start development server with Turbopack
- `npm run build` — Build for production
- `npm run start` — Start production server

### Code Quality

- `npm run lint` — Run ESLint with 9 plugins
- `npm run lint -- --fix` — Auto-fix: sort imports, format code
- `npm run type-check` — TypeScript type checking
- `npm run format` — Format code with Prettier

### Unit Tests

- `npm test` — Run unit tests with Vitest (verbose reporter)
- `npm test -- --run` — Run tests once without watch mode
- `npm test -- --coverage` — Run tests with coverage report (60% threshold)

### E2E Tests

- `npm run test:e2e` — Run E2E tests with Playwright
- `npm run test:e2e:ui` — Run E2E tests with Playwright UI

### Health Check (run before committing)

```bash
npm run lint -- --fix && npm run type-check && npm test -- --run
```

### Docker (via Taskfile)

- `task docker:build` — Build Docker image
- `task docker:dev:up` — Start dev environment (foreground with logs)
- `task docker:prod:up` — Start production (detached)
- `task docker:clean` — Remove project containers, images, and volumes
- `task --list` — List all available tasks

## 2. Project Structure & Architecture

Next.js 15 App Router with React 19. TypeScript strict mode. API-first,
server-first architecture.

- **Server-first:** All components are React Server Components by default. Only
  add `"use client"` when client-side interactivity is needed.
- **API-first:** Centralized API client at `src/lib/api/client.ts`. No direct
  database access.
- **Path alias:** Use `@/` to import from the `src/` directory.

### Key Directories

```
src/
├── app/                    # App Router pages and API routes
│   ├── (group)/            # Route groups — logical organization without affecting URL path
│   ├── api/                # API Route Handlers (route.ts)
│   └── <route>/
│       ├── _components/    # Private route-specific components (not routed)
│       ├── _actions/       # Private route-specific Server Actions
│       └── _hooks/         # Private route-specific hooks
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Header, footer, mobile-nav
│   ├── sections/           # Page sections (hero, intro, cta-banner, etc.)
│   └── shared/             # Reusable components (section-heading, map-embed)
├── lib/
│   ├── api/                # API client and services
│   ├── store/              # Zustand state management
│   ├── actions/            # Server Actions
│   ├── constants.ts        # Business info, nav links
│   ├── email.ts            # Resend email builder
│   ├── faq-data.ts         # FAQ content (4 categories, 12 questions)
│   └── structured-data.ts  # JSON-LD LocalBusiness schema
├── utils/                  # Utility functions (cn, formatters, validators)
├── types/                  # TypeScript type definitions
└── styles/                 # Global styles (globals.css)
tests/
├── unit/                   # Vitest unit tests
└── e2e/                    # Playwright E2E tests
```

### Styling

- Tailwind CSS + shadcn/ui (New York style, RSC enabled)
- Use `cn()` from `@/utils/cn` for conditional class merging
- Fonts: Playfair Display for headings, Inter for body (loaded via `next/font`)
- **Hybrid Styling:** CSS Modules (`*.module.css`) are allowed ONLY as a fallback
  for complex, one-off animations or styles too cumbersome for Tailwind utilities

### Brand Theme Tokens

| Token         | Value                              | Usage                                  |
| ------------- | ---------------------------------- | -------------------------------------- |
| Primary       | `#0D7377` (Ocean Teal)             | Buttons, links, CTAs                   |
| Secondary     | `#F5E6D3` (Warm Sand)              | Soft backgrounds, alternating sections |
| Accent        | `#E07A5F` (Sunset Coral)           | Hover states, secondary CTAs           |
| Background    | `#FAFAF7` (Ivory)                  | Page background                        |
| Foreground    | `#1A1A2E` (Deep Charcoal)          | Heading and body text                  |
| Heading Font  | Playfair Display                   | All `h1`–`h3` elements                 |
| Body Font     | Inter                              | Body text, labels, buttons             |
| Border Radius | 12px (cards), 8px (buttons/inputs) | Rounded, soft feel                     |

### State Management Hierarchy

1. **URL State** — For filters, search, pagination (shareable)
2. **Server Components** — For initial data fetching
3. **Local State** — For component-specific state (`useState`)
4. **React Context** — For small subtree state
5. **Zustand** — For global state (auth, cart, notifications) in
   `src/lib/store/`

## 3. Architecture Rules

These rules govern where code lives and how components interact. See
[AI Collaborative Architecture](ai_docs/AI_Collaborative_Architecture_The_Definitive_Project_Template_for_Next.js_15.md)
for full rationale.

### Component Placement Decision

| Question                                      | Placement                                   |
| --------------------------------------------- | ------------------------------------------- |
| Used by only one route?                       | Co-locate in `src/app/<route>/_components/` |
| Stateless UI primitive (Button, Card, Input)? | `src/components/ui/`                        |
| Page section (Hero, CTA, Testimonial)?        | `src/components/sections/`                  |
| Structural chrome (Header, Footer, Sidebar)?  | `src/components/layout/`                    |
| Reusable across multiple routes?              | `src/components/shared/`                    |

*Note: For this marketing site, `src/components/sections/` serves the role of
the "features" directory described in the core architecture document.*

Route-specific actions go in `src/app/<route>/_actions/`, route-specific hooks
in `src/app/<route>/_hooks/`. Prefix these folders with `_` so Next.js excludes
them from routing.

### `"use client"` Decision

Only add `"use client"` when the component requires **at least one** of:

- Event handlers (`onClick`, `onChange`, `onSubmit`)
- Browser APIs (`localStorage`, `window`, `navigator`)
- React hooks (`useState`, `useEffect`, `useRef`, `usePathname`)
- Interactive third-party libraries

If none apply, it must remain a Server Component.

### Data Fetching Patterns

- **Default:** Fetch data in Server Components with `async/await`. The component
  itself is `async`.
- **Parallel fetching:** Use `Promise.all()` for independent data dependencies —
  never sequential `await` chains.
- **Mutations:** Use Server Actions (`"use server"`) for all
  create/update/delete operations.
- **Client-side fetching:** Only for real-time data, user-interaction-driven
  data, or post-initial-load lazy data.
- **Caching & Revalidation:** GET requests in Next.js 15 are uncached by default
  (`cache: 'no-store'`). Explicitly opt into caching when appropriate:
  - `{ cache: 'force-cache' }` — static data cached indefinitely.
  - `{ next: { revalidate: 3600 } }` — time-based revalidation.
  - `{ next: { tags: ['tag-name'] } }` — on-demand revalidation via Server
    Actions using `revalidateTag()`.

### Error Handling Pattern

All API responses and Server Actions MUST return discriminated union types for
type-safe error handling. Never throw raw errors to the client.

```typescript
type ActionResponse<T> =
  | { data: T; error?: never }
  | { data?: never; error: string };
```

### `lib/` vs `utils/` Distinction

| Directory    | Contains                                              | Characteristics                                 |
| ------------ | ----------------------------------------------------- | ----------------------------------------------- |
| `src/lib/`   | API clients, email service, store, actions, constants | Stateful, singleton, side-effects, foundational |
| `src/utils/` | `cn()`, formatters, validators                        | Pure functions, stateless, no side-effects      |

### Constants as Single Source of Truth

All business data (phone, fax, email, address, URL, hours, nav links) **must**
be defined in `src/lib/constants.ts` and imported wherever needed. Never
hardcode business data in components, pages, or structured data files.

### Import Direction Rules

Imports flow **inward and downward** only:

- `app/` → imports from `components/`, `lib/`, `utils/`, `types/`
- `components/` → imports from `lib/`, `utils/`, `types/`
- `lib/` → imports from `utils/`, `types/`
- `utils/` → imports from `types/` only
- **Never** import from `app/` into `components/`, `lib/`, or `utils/`

## 4. Code Style & Conventions

- TypeScript strict mode is enabled — all code must be properly typed
- ESLint flat config with 9 plugins: import validation, circular dependency
  detection, auto-sort imports, React best practices, Next.js best practices,
  Playwright, Prettier, Unicorn
- Run `npm run lint -- --fix` to auto-sort imports and format code
- Prettier with Tailwind plugin (auto-sorts class names)
- Semantic HTML: single `h1` per page, sequential `h2`/`h3` heading hierarchy
- Mobile-first responsive design: 375px > 768px > 1280px > 2560px
- Minimum 44x44px touch targets for all interactive elements
- Border radius: 12px for cards, 8px for buttons and inputs
- Use Next.js `<Link>` for all navigation (no SPA client-side routing)
- Phone numbers must be clickable `tel:` links; emails must be `mailto:` links

## 5. Testing Strategy

- **Unit tests:** Vitest + React Testing Library. Place test files in
  `tests/unit/`, not colocated with source files.
- **E2E tests:** Playwright (Chromium, Firefox, WebKit). Place test files in
  `tests/e2e/`.
- **Coverage threshold:** 60% for lines, functions, branches, and statements.
- **Coverage excludes:** config files, type definitions, index files, and test
  setup files (see `vitest.config.ts` for full exclusion list).
- Always run `npm test -- --run` before committing to verify tests pass.

## 6. Git Workflow & Commit Standards

- Conventional commits enforced by Commitlint
  (`@commitlint/config-conventional`)
- Use Commitizen: run `npx cz` or just `git commit` (Husky hook triggers it
  automatically)
- Pre-commit hooks (Husky) run: `npm run lint && npm run type-check`
- Allowed commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`,
  `chore`
- Branch naming: `feature/<description>`, `fix/<description>`

## 7. Boundary Conditions (The "Do Not" List)

- Do NOT access any database directly — this is an API-first project
- Do NOT add `"use client"` unless the component requires event handlers,
  browser APIs, or React hooks
- Do NOT store form data — emails are sent and forgotten
- Do NOT implement user authentication or accounts
- Do NOT add a blog, CMS, or admin panel
- Do NOT process payments or financial information
- Do NOT use client-side JavaScript for navigation — use Next.js `<Link>`
- Do NOT expose the `RESEND_API_KEY` to the client
- Do NOT submit the contact form without both client-side AND server-side
  validation passing
- Do NOT implement dark mode
- Do NOT commit `.env.local` or any secrets

## 8. Documentation Index

### Primary

- [CLAUDE.md](CLAUDE.md) — AI assistant guidance with dev commands,
  architecture, and code standards
- [Website PRD](prd/002_init_design/prd-casacolinacare-website.md) — Product
  requirements for the Casa Colina Care website
- [Website SPEC](prd/002_init_design/SPEC.md) — Engineering specification for
  the website

### Documentation (`ai_docs/`)

- [A Contextual Prompt for Agent](ai_docs/A_Contextual_Prompt_for_Agent.md)
- [AI Collaborative Architecture](ai_docs/AI_Collaborative_Architecture_The_Definitive_Project_Template_for_Next.js_15.md)
- [API Design Guide](ai_docs/API_DESIGN_GUIDE.md) — Server Actions vs Route
  Handlers
- [Authentication Guide](ai_docs/AUTHENTICATION_GUIDE.md) — Auth setup with
  Clerk
- [Branching & Merging Strategy](ai_docs/branching-merging-strategy.md)
- [Cleanup Guide](ai_docs/CLEANUP_GUIDE.md) — Safe file removal procedures
- [Deployment Guide](ai_docs/DEPLOYMENT_GUIDE.md) — Vercel and Docker deployment
- [Dockerignore Review](ai_docs/DOCKERIGNORE_REVIEW.md) — Docker build
  optimization
- [ESLint Configuration](ai_docs/ESLINT_CONFIGURATION.md) — ESLint setup and
  plugins
- [General AI Behaviour](ai_docs/general_ai_behaviour.md)
- [Gitignore Review](ai_docs/GITIGNORE_REVIEW.md) — What to track vs ignore
- [Implementation Summary](ai_docs/IMPLEMENTATION_SUMMARY.md) — Complete project
  overview
- [Next.js Project Standards](ai_docs/next.js-project-standards-best-practices.md)
- [State Management Guide](ai_docs/STATE_MANAGEMENT_GUIDE.md) — State management
  patterns
- [Test-Driven Development TypeScript](ai_docs/test-driven-development-typescript.md)
- [Testing Strategy](ai_docs/TESTING_STRATEGY.md) — 60% coverage testing
  approach
- [Universal Coding Principles](ai_docs/univeral_coding_principle.md)
