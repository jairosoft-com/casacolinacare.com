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
│   ├── fonts.ts            # Font configuration
│   └── email.ts            # Resend email builder
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

## 3. Code Style & Conventions

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

## 4. Testing Strategy

- **Unit tests:** Vitest + React Testing Library. Place test files in
  `tests/unit/`, not colocated with source files.
- **E2E tests:** Playwright (Chromium, Firefox, WebKit). Place test files in
  `tests/e2e/`.
- **Coverage threshold:** 60% for lines, functions, branches, and statements.
- **Coverage excludes:** config files, type definitions, index files, and test
  setup files (see `vitest.config.ts` for full exclusion list).
- Always run `npm test -- --run` before committing to verify tests pass.

## 5. Git Workflow & Commit Standards

- Conventional commits enforced by Commitlint
  (`@commitlint/config-conventional`)
- Use Commitizen: run `npx cz` or just `git commit` (Husky hook triggers it
  automatically)
- Pre-commit hooks (Husky) run: `npm run lint && npm run type-check`
- Allowed commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`,
  `chore`
- Branch naming: `feature/<description>`, `fix/<description>`

## 6. Boundary Conditions (The "Do Not" List)

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

## 7. Documentation Index

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
