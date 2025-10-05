# Next.js 15 Starter Project 2025

A production-ready Next.js 15 starter template following the AI-Collaborative Architecture principles, designed for scalability, maintainability, and seamless AI assistant collaboration.

## 🎯 **Project Overview**

This is a modern Next.js 15 application template featuring:

- ✅ **Next.js 15.4.2** with **React 19** and **Turbopack**
- ✅ **TypeScript** with strict mode
- ✅ **Tailwind CSS** with shadcn/ui components
- ✅ **API-first architecture** (no direct database access)
- ✅ **Zustand** for global state management
- ✅ **Comprehensive testing** (Vitest + Playwright)
- ✅ **Docker support** (Vercel + self-hosted ready)
- ✅ **Code quality tools** (ESLint with 9 plugins, Prettier, Husky)
- ✅ **Auto-formatting** (import sorting, code formatting)
- ✅ **Conventional commits** with Commitizen

---

## 🚀 **Quick Start**

### **1. Install Dependencies**

```bash
npm install
```

### **2. Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### **3. Build for Production**

```bash
npm run build
npm run start
```

---

## 📁 **Project Structure**

```
nextjs_starter_project_2025/
├── src/
│   ├── app/                 # App Router pages & layouts
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── ClientWrapper.tsx
│   ├── lib/
│   │   ├── api/             # API client & services
│   │   ├── store/           # Zustand state management
│   │   └── constants.ts
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
├── tests/
│   ├── unit/                # Vitest unit tests
│   └── e2e/                 # Playwright E2E tests
├── docs/                    # Comprehensive documentation
├── ai_docs/                 # AI collaboration guides
├── public/                  # Static assets
└── [config files]           # All configuration files
```

---

## 📚 **Available Scripts**

### **Development**

```bash
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
```

### **Code Quality**

```bash
npm run lint            # Run ESLint with 9 plugins
npm run lint -- --fix   # Auto-fix issues (sort imports, format code)
npm run type-check      # TypeScript type checking
npm run format          # Format code with Prettier
```

### **Testing**

```bash
npm test                # Run unit tests with Vitest
npm test -- --coverage  # Run tests with 60% coverage threshold
npm run test:e2e        # Run E2E tests with Playwright
npm run test:e2e:ui     # Run E2E tests with Playwright UI
```

### **Git Workflow**

```bash
npm run prepare         # Install Husky hooks
git commit              # Commitizen runs automatically
npx cz                  # Manually trigger Commitizen
```

---

## 🏗️ **Architecture**

### **Core Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.4.2 | React framework with App Router |
| React | 19.1.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.17 | Utility-first styling |
| Zustand | 5.0.8 | Global state management |
| Vitest | 3.2.4 | Unit testing |
| Playwright | 1.54.1 | E2E testing |

### **API-First Architecture**

This project calls external APIs instead of direct database access:

```typescript
// Centralized API client
import apiClient from '@/lib/api/client';

// In Server Component
const result = await apiClient.get('/users');

// In Server Action
export async function createUser(data) {
  return apiClient.post('/users', data);
}
```

### **State Management Hierarchy**

1. **URL State** - For filters, search, pagination (shareable)
2. **Server Components** - For initial data fetching
3. **Local State** - For component-specific state (`useState`)
4. **React Context** - For small subtree state
5. **Zustand** - For global state (auth, cart, notifications)

See [State Management Guide](docs/STATE_MANAGEMENT_GUIDE.md) for details.

---

## 📖 **Documentation**

Comprehensive guides are available in the `/docs` directory:

### **Core Guides**

- [**State Management Guide**](docs/STATE_MANAGEMENT_GUIDE.md) - Complete state management patterns
- [**API Design Guide**](docs/API_DESIGN_GUIDE.md) - Server Actions vs Route Handlers
- [**Authentication Guide**](docs/AUTHENTICATION_GUIDE.md) - Quick auth setup with Clerk
- [**Deployment Guide**](docs/DEPLOYMENT_GUIDE.md) - Vercel + Docker deployment
- [**Testing Strategy**](docs/TESTING_STRATEGY.md) - 60% coverage approach
- [**Implementation Summary**](docs/IMPLEMENTATION_SUMMARY.md) - Complete overview

### **Development Guides**

- [**ESLint Configuration**](docs/ESLINT_CONFIGURATION.md) - Complete ESLint setup & plugins
- [**Gitignore Review**](docs/GITIGNORE_REVIEW.md) - What to track vs ignore
- [**Dockerignore Review**](docs/DOCKERIGNORE_REVIEW.md) - Docker optimization
- [**Cleanup Guide**](docs/CLEANUP_GUIDE.md) - Safe file removal

### **AI Collaboration**

- [**CLAUDE.md**](CLAUDE.md) - AI assistant guidance
- [**AI Docs**](ai_docs/) - Architecture and best practices

**Total Documentation:** 13,000+ words of comprehensive guides

---

## 🐳 **Docker Deployment**

### **Build and Run with Docker**

```bash
# Build the image
docker build -t nextjs-starter .

# Run the container
docker run -p 3000:3000 nextjs-starter

# Or use Docker Compose
docker-compose up -d
```

### **Deploy to Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

See [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) for complete instructions.

---

## 🧪 **Testing**

### **Unit Tests (Vitest)**

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# Run specific test
npm test -- users.test.ts
```

**Coverage Threshold:** 60% for lines, functions, branches, and statements

### **E2E Tests (Playwright)**

```bash
# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific browser
npx playwright test --project=chromium
```

**Configured Browsers:** Chromium, Firefox, WebKit

---

## 🔧 **Environment Variables**

Create a `.env.local` file in the root directory:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Authentication (if using Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Add other environment variables as needed
```

**Important:** Never commit `.env.local` - it's in `.gitignore`

---

## 🎨 **Styling**

### **Tailwind CSS**

Utility-first CSS framework with semantic design tokens:

```typescript
// Use semantic colors
<div className="bg-primary text-primary-foreground">
  <h1 className="text-2xl font-bold">Hello World</h1>
</div>
```

### **shadcn/ui Components**

Pre-built, customizable components in `/src/components/ui/`:

```bash
# Add new components
npx shadcn@latest add button
npx shadcn@latest add card
```

Components are copied into your project - you own the code!

---

## 🚀 **Getting Started Guide**

### **1. Set Up Environment**

```bash
# Copy example env file (if you create one)
cp .env.example .env.local

# Edit with your values
nano .env.local
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Run Development Server**

```bash
npm run dev
```

### **4. Start Building**

1. Create API services in `/src/lib/api/services/`
2. Create Server Actions in `/src/lib/actions/`
3. Build UI components in `/src/components/`
4. Add tests in `/tests/`
5. Update documentation as you go

---

## 📋 **Code Quality**

### **Pre-Commit Checks**

Husky runs these checks before every commit:

1. ✅ **ESLint** - Code linting with 9 plugins
   - Import validation & circular dependency detection
   - Auto-sort imports alphabetically
   - Playwright test best practices
   - Unicorn opinionated rules
   - Prettier code formatting
2. ✅ **TypeScript** - Type checking (strict mode)
3. ✅ **Commitlint** - Conventional commit format

**Auto-Fix Available:** Run `npm run lint -- --fix` to automatically:
- Sort all imports
- Format code with Prettier
- Add newlines after imports
- Fix spacing issues

### **Conventional Commits**

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add user authentication
fix: resolve login redirect issue
docs: update README
style: format code with prettier
refactor: restructure API client
test: add user service tests
chore: update dependencies
```

Use Commitizen for guided commits:

```bash
npx cz
```

---

## 🏆 **Best Practices**

### **Component Development**

- **Server Components** by default (no `'use client'`)
- **Client Components** only when needed (events, hooks, browser APIs)
- **Co-location** - keep route-specific code in private folders (`_components`, `_actions`)

### **Data Fetching**

- **Server Components** - Fetch data with `async/await`
- **Server Actions** - For mutations (create, update, delete)
- **Route Handlers** - For webhooks and external APIs

### **State Management**

- **URL State** - For shareable state (filters, search)
- **Local State** - For component state (`useState`)
- **Zustand** - For global state (auth, cart)

---

## 🤝 **Contributing**

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run tests: `npm test && npm run test:e2e`
4. Commit: `npx cz` (uses Commitizen)
5. Push: `git push origin feature/amazing-feature`
6. Create a Pull Request

---

## 📦 **What's Included**

### **Frontend**

- ✅ Next.js 15 with App Router
- ✅ React 19 with Server Components
- ✅ TypeScript strict mode
- ✅ Tailwind CSS + shadcn/ui
- ✅ Zustand state management

### **API Integration**

- ✅ Centralized API client
- ✅ Type-safe requests/responses
- ✅ Error handling
- ✅ Authentication support

### **Testing**

- ✅ Vitest for unit tests
- ✅ Playwright for E2E tests
- ✅ 60% coverage threshold
- ✅ React Testing Library

### **Code Quality**

- ✅ ESLint (flat config) with 9 plugins:
  - `eslint-plugin-react` - React best practices
  - `eslint-plugin-react-hooks` - Hooks rules
  - `@next/eslint-plugin-next` - Next.js optimizations
  - `eslint-plugin-import` - Import validation & circular dependency detection
  - `eslint-plugin-playwright` - E2E test linting
  - `eslint-plugin-prettier` - Format as you lint
  - `eslint-plugin-simple-import-sort` - Auto-sort imports
  - `eslint-plugin-unicorn` - Opinionated best practices
  - `eslint-config-prettier` - Prevent conflicts
- ✅ Prettier with Tailwind plugin (auto-sort classes)
- ✅ Husky git hooks (pre-commit quality gates)
- ✅ Commitizen + Commitlint (conventional commits)

### **Deployment**

- ✅ Docker support
- ✅ Vercel-ready
- ✅ Production optimized

### **Documentation**

- ✅ 13,000+ words of guides
- ✅ AI collaboration docs
- ✅ Best practices
- ✅ Examples and patterns

---

## 🎓 **Learning Resources**

### **Documentation**

- Read the [docs/](docs/) directory for comprehensive guides
- Check [CLAUDE.md](CLAUDE.md) for AI assistant guidance
- Review [ai_docs/](ai_docs/) for architecture details

### **External Resources**

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Zustand](https://docs.pmnd.rs/zustand)
- [Vitest](https://vitest.dev)
- [Playwright](https://playwright.dev)

---

## 🔄 **Maintenance**

### **Update Dependencies**

```bash
# Check outdated packages
npm outdated

# Update all dependencies
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

### **Clean Cache Files**

```bash
# Remove cache and artifacts
rm -rf .next/
rm -rf node_modules/
rm -rf coverage/
rm tsconfig.tsbuildinfo

# Reinstall
npm install
npm run dev
```

See [Cleanup Guide](docs/CLEANUP_GUIDE.md) for details.

---

## 📝 **License**

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 **Acknowledgments**

Built with:
- [Next.js](https://nextjs.org) by Vercel
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) by shadcn
- [Zustand](https://github.com/pmndrs/zustand) by Poimandres
- Inspired by the AI-Collaborative Architecture template

---

## 📞 **Support**

- 📖 **Documentation:** [docs/](docs/)
- 🤖 **AI Guidance:** [CLAUDE.md](CLAUDE.md)
- 📋 **Issues:** Check documentation first
- 💬 **Questions:** Review [docs/IMPLEMENTATION_SUMMARY.md](docs/IMPLEMENTATION_SUMMARY.md)

---

## ✨ **What Makes This Special**

1. **Production-Ready** - Complete tooling and configuration
2. **Well-Documented** - 13,000+ words of comprehensive guides
3. **Type-Safe** - End-to-end TypeScript with strict mode
4. **Modern Stack** - Latest Next.js 15 + React 19
5. **API-First** - Clean separation of concerns
6. **Flexible Deployment** - Vercel or Docker
7. **Test-Ready** - Vitest + Playwright configured
8. **AI-Friendly** - Structured for AI assistant collaboration

---

**Happy coding! 🚀**

---

*Last updated: October 2025*
