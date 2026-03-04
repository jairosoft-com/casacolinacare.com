# Tooling & Workflow Context

## Tech Stack

| Tool | Used For |
|------|----------|
| Next.js 15 | App framework (App Router, Turbopack) |
| React 19 | UI library (RSC by default) |
| TypeScript | Strict mode, all source files |
| Tailwind CSS 3 | Styling via utility classes |
| shadcn/ui | Component primitives (New York style) |
| Resend | Email delivery for contact form |
| Zustand | State management (minimal use) |
| Radix UI | Accessible primitives (Accordion, Dialog, etc.) |
| lucide-react | Icon library |

## Dev Tools

| Tool | Used For |
|------|----------|
| ESLint 9 | Linting (9+ plugins) |
| Prettier | Code formatting |
| Vitest | Unit testing + React Testing Library |
| Playwright | E2E testing (Chromium, Firefox, WebKit) |
| Husky | Pre-commit hooks |
| Commitlint | Conventional commit enforcement |
| Commitizen (cz) | Guided commit messages |

## Git Workflow

- **Branch naming:** `ralph/US-XXX-description` for AI agent work, `feature/description` for manual
- **Commits:** Conventional commits (feat, fix, docs, chore, refactor)
- **PRs:** Feature branch → main, merged via GitHub
- **Pre-commit:** Husky runs `npm run lint && npm run type-check`
- **CI:** Vercel for deployment, automated CVE fixes

## Key Commands

```bash
npm run dev                 # Dev server (Turbopack)
npm run build               # Production build
npm run lint -- --fix       # Auto-fix lint issues
npm run type-check          # TypeScript check
npm test -- --run           # Unit tests once
npm test -- --coverage      # Coverage (60% threshold)
npm run test:e2e            # E2E tests
```

## Work Tracking (Azure DevOps)

| Resource | URL |
|----------|-----|
| ADO Project | https://dev.azure.com/jairo/CasaColinaCare.com |
| Team Board | https://dev.azure.com/jairo/CasaColinaCare.com/_boards/board/t/CasaColinaCare.com%20Team/Stories |
| Organization | jairo |
| Project | CasaColinaCare.com |
| Team | CasaColinaCare.com Team |

- User stories, features, and epics are created and managed in ADO
- The Team Board is the source of truth for work items
- User stories follow the US-XXX naming convention

## Meeting Notes (Otter.ai)
- Meeting transcripts and notes are captured in Otter.ai
- Search Otter for CasaColinaCare.com related meetings and discussions
- Use the Otter MCP tools to search and fetch meeting details

## Deployment
- Hosted on Vercel
- Auto-deploys from main branch
- Vercel bot handles automated security patches
