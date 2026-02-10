# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository (myapp6 - Next.js 15 Starter Project).

## Development Commands

### Running the Application

```bash
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
```

### Code Quality

```bash
npm run lint            # Run ESLint with 9 plugins
npm run lint -- --fix   # Auto-fix issues (sort imports, format code)
npm run type-check      # TypeScript type checking
npm run format          # Format code with Prettier
```

### Testing

```bash
npm test                # Run unit tests with Vitest (verbose reporter)
npm test -- <file>      # Run specific test file (e.g., users.test.ts)
npm test -- --watch     # Run tests in watch mode
npm test -- --coverage  # Run tests with coverage report (60% threshold)
npm test -- --run       # Run tests once without watch mode
npm run test:e2e        # Run E2E tests with Playwright
npm run test:e2e:ui     # Run E2E tests with Playwright UI
npx playwright test --project=chromium  # Run E2E for specific browser
npx playwright test --debug             # Debug E2E tests with inspector
npx playwright codegen                  # Record E2E test actions
```

### Git Workflow

```bash
npm run prepare         # Install Husky hooks
git commit              # Commitizen automatically runs via Husky hook
npx cz                  # Manually run Commitizen for conventional commits
```

### Docker Deployment

```bash
docker build -t nextjs-starter .    # Build Docker image
docker run -p 3000:3000 nextjs-starter  # Run container
docker-compose up -d                # Use Docker Compose
vercel --prod                       # Deploy to Vercel

# If Taskfile.yml is implemented (see prd/001_taskfile_yml/):
task docker:build               # Build Docker image
task docker:dev:up              # Start dev environment
task docker:prod:up             # Start production (detached)
task docker:clean:all           # Deep clean Docker resources
task --list                     # List all available tasks
```

## Architecture Overview

This is a Next.js 15 starter template using the App Router with React 19,
implementing an **API-first, server-first architecture** where all components
are React Server Components by default and all external data is fetched through
a centralized API client (no direct database access).

### Key Directories

- `/src/app/` - App Router pages and API routes
- `/src/components/` - React components, with `/ui/` for shadcn/ui components
- `/src/lib/` - Core libraries and services
  - `/src/lib/api/` - API client and services
  - `/src/lib/store/` - Zustand state management
  - `/src/lib/actions/` - Server Actions (when implemented)
- `/src/utils/` - Utility functions and helpers
- `/src/types/` - TypeScript type definitions
- `/tests/` - Test files (unit tests in `/unit/`, E2E in `/e2e/`)
- `/docs/` - Comprehensive documentation (13,000+ words)
- `/ai_docs/` - AI collaboration guides

### Core Architecture Patterns

1. **Server-First Rendering**: All components are React Server Components by
   default. Only add `"use client"` when client-side interactivity is needed
2. **Client Wrapper Pattern**: Use the `ClientWrapper` component when server
   components need client-side features
3. **Path Aliases**: Use `@/` to import from the `src/` directory
4. **Styling System**:
   - Tailwind CSS with semantic CSS variables for theming (primary, secondary,
     muted, accent, destructive)
   - Dark mode support via CSS variables in `src/styles/globals.css`
   - Use `cn()` utility from `@/utils/cn` for conditional class merging
5. **Component Library**: shadcn/ui configured (New York style, RSC enabled) -
   components go in `/src/components/ui/`
6. **Error Handling Pattern**: API responses use discriminated union types with
   `data` and `error` fields for type-safe error handling

### Testing Strategy

- Unit tests use Vitest with React Testing Library
- E2E tests use Playwright with automatic dev server startup
- Test files should be placed in the `/tests/` directory, not colocated with
  source files
- Coverage thresholds are set at 60% for lines, functions, branches, and
  statements
- Coverage reports available in text, JSON, HTML, and LCOV formats
- Coverage excludes: config files, type definitions, index files, and test
  setup files (see vitest.config.ts for full exclusion list)

### Code Standards

- TypeScript strict mode is enabled - ensure all code is properly typed
- ESLint configured with 9 plugins for comprehensive code quality:
  - Import validation & circular dependency detection
  - Auto-sort imports alphabetically
  - React and Next.js best practices
  - Prettier formatting integration
- Conventional commits are enforced via Commitlint and Commitizen
- Pre-commit hooks run `npm run lint && npm run type-check` via Husky
- Auto-fix available: `npm run lint -- --fix` sorts imports and formats code

### Environment Variables

Environment variables should be managed in `.env.local` (not committed to
repository). No environment files are currently present, which is a security
best practice.

Required environment variable for API client:
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

## Implementation Patterns

### API-First Architecture

The project uses a centralized API client (`/src/lib/api/client.ts`) for all
external data fetching. The client returns typed responses with error handling:

```typescript
import apiClient from '@/lib/api/client';

// In Server Component
const result = await apiClient.get<User[]>('/users');
if (result.error) {
  // Handle error
  console.error(result.error);
} else {
  // Use typed data
  const users = result.data;
}

// In Server Action
export async function createUser(data: UserData) {
  return apiClient.post<User, UserData>('/users', data);
}

// Set auth token when needed
apiClient.setAuthToken(token);
```

### Server Actions and API Routes

- **Server Actions**: Use `"use server"` directive for form mutations and
  server-side operations
- **API Routes**: Create in `/src/app/api/[route]/route.ts` with
  GET/POST/PUT/DELETE exports
- **Route Handlers**: Return `NextResponse.json()` for JSON responses

### Component Development

- **Server Components**: Default for data fetching and static rendering
- **Client Components**: Add `"use client"` only when you need:
  - Event handlers (onClick, onChange, etc.)
  - Browser APIs (localStorage, window, etc.)
  - React hooks (useState, useEffect, etc.)
  - Interactive third-party libraries

### File Organization

- **Utilities**: Separate by concern - `formatters.ts`, `validators.ts`,
  `utils.ts`
- **Constants**: Global values in `/src/lib/constants.ts`
- **Types**: Shared TypeScript types in `/src/types/types.ts`

### Fonts and Assets

- **Fonts**: Geist Sans and Geist Mono are configured via next/font/google
- **Public Assets**: Static files in `/public/` directory

### State Management Hierarchy

1. **URL State** - For filters, search, pagination (shareable)
2. **Server Components** - For initial data fetching
3. **Local State** - For component-specific state (`useState`)
4. **React Context** - For small subtree state
5. **Zustand** (v5.0.8) - For global state (auth, cart, notifications)

Use Zustand stores in `/src/lib/store/` for cross-component state that doesn't
belong in URL or server state.

### Planned Technologies

Based on TODO.md, this library is selected for future implementation:

- **Validation**: Zod for schema validation

Note: Drizzle ORM was initially considered but this project follows an
API-first architecture with no direct database access.

## Quick Reference

### Common Patterns

```typescript
// Async Server Component pattern
export default async function Page() {
  const { data, error } = await apiClient.get<Data>('/endpoint');
  if (error) return <ErrorComponent error={error} />;
  return <DataComponent data={data} />;
}

// Client Component with Zustand
'use client';
import { useStore } from '@/lib/store/store';

export function InteractiveComponent() {
  const { state, setState } = useStore();
  // Component logic
}
```

### Project Health Checks

```bash
npm run lint -- --fix   # Fix all auto-fixable issues
npm run type-check      # Ensure no TypeScript errors
npm test -- --run       # Quick test run
```

## Current Development Notes

- **Taskfile Implementation**: A comprehensive Taskfile.yml for Docker management
  is planned (see `/prd/001_taskfile_yml/` for design docs)
- **Git Status**: The project uses conventional commits with Commitizen and
  Commitlint for consistent commit messages

## Comprehensive Documentation

The `/docs/` directory contains 13,000+ words of detailed guides:

- **Core Guides**:
  - `STATE_MANAGEMENT_GUIDE.md` - Complete state management patterns
  - `API_DESIGN_GUIDE.md` - Server Actions vs Route Handlers
  - `AUTHENTICATION_GUIDE.md` - Quick auth setup with Clerk
  - `DEPLOYMENT_GUIDE.md` - Vercel + Docker deployment
  - `TESTING_STRATEGY.md` - 60% coverage approach
  - `IMPLEMENTATION_SUMMARY.md` - Complete project overview

- **Development Guides**:
  - `ESLINT_CONFIGURATION.md` - Complete ESLint setup & plugins
  - `GITIGNORE_REVIEW.md` - What to track vs ignore
  - `CLEANUP_GUIDE.md` - Safe file removal

Refer to these guides for detailed implementation patterns and best practices.
