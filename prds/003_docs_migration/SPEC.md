# SPEC: Migrate `docs/` to `ai_docs/`

**Version:** 2.0 **Status:** Draft **Author:** Claude Code (Spec Architect
review) **Date:** 2026-02-13

---

## Context

### Business Goal

Consolidate all project documentation into a single canonical directory
(`ai_docs/`). The current split between `docs/` (10 dev guides) and `ai_docs/`
(7 AI guides) creates unnecessary cognitive overhead — both contain
developer-facing markdown with no meaningful distinction.

### Current State

**`docs/` — 10 files to move:**

| #   | File                        | Description                      |
| --- | --------------------------- | -------------------------------- |
| 1   | `API_DESIGN_GUIDE.md`       | Server Actions vs Route Handlers |
| 2   | `AUTHENTICATION_GUIDE.md`   | Auth setup with Clerk            |
| 3   | `CLEANUP_GUIDE.md`          | Safe file removal procedures     |
| 4   | `DEPLOYMENT_GUIDE.md`       | Vercel and Docker deployment     |
| 5   | `DOCKERIGNORE_REVIEW.md`    | Docker build optimization        |
| 6   | `ESLINT_CONFIGURATION.md`   | ESLint setup and plugins         |
| 7   | `GITIGNORE_REVIEW.md`       | What to track vs ignore          |
| 8   | `IMPLEMENTATION_SUMMARY.md` | Complete project overview        |
| 9   | `STATE_MANAGEMENT_GUIDE.md` | State management patterns        |
| 10  | `TESTING_STRATEGY.md`       | 60% coverage testing approach    |

**`ai_docs/` — 7 files already in place (untouched by this migration):**

| File                                                                              |
| --------------------------------------------------------------------------------- |
| `A_Contextual_Prompt_for_Agent.md`                                                |
| `AI_Collaborative_Architecture_The_Definitive_Project_Template_for_Next.js_15.md` |
| `branching-merging-strategy.md`                                                   |
| `general_ai_behaviour.md`                                                         |
| `next.js-project-standards-best-practices.md`                                     |
| `test-driven-development-typescript.md`                                           |
| `univeral_coding_principle.md`                                                    |

### Pre-Conditions

- Working tree **must be clean** (`git status` shows no uncommitted changes)
  before starting.
- No filename collisions exist between `docs/` and `ai_docs/` (verified: zero
  overlapping names).

---

## Action

### Commit Strategy

**Single atomic commit.** All file moves and reference updates are committed
together. This prevents any broken intermediate state where files have moved but
references still point to `docs/`.

Commit message format:

```
refactor: consolidate docs/ into ai_docs/

Move all 10 documentation files from docs/ to ai_docs/ and update
all references across CLAUDE.md, AGENTS.md, README.md, llms.txt,
and .dockerignore. Removes the now-empty docs/ directory.
```

---

### Step 1: Move Files with `git mv`

Use `git mv` (not `mv`) to preserve commit history:

```bash
git mv docs/API_DESIGN_GUIDE.md ai_docs/API_DESIGN_GUIDE.md
git mv docs/AUTHENTICATION_GUIDE.md ai_docs/AUTHENTICATION_GUIDE.md
git mv docs/CLEANUP_GUIDE.md ai_docs/CLEANUP_GUIDE.md
git mv docs/DEPLOYMENT_GUIDE.md ai_docs/DEPLOYMENT_GUIDE.md
git mv docs/DOCKERIGNORE_REVIEW.md ai_docs/DOCKERIGNORE_REVIEW.md
git mv docs/ESLINT_CONFIGURATION.md ai_docs/ESLINT_CONFIGURATION.md
git mv docs/GITIGNORE_REVIEW.md ai_docs/GITIGNORE_REVIEW.md
git mv docs/IMPLEMENTATION_SUMMARY.md ai_docs/IMPLEMENTATION_SUMMARY.md
git mv docs/STATE_MANAGEMENT_GUIDE.md ai_docs/STATE_MANAGEMENT_GUIDE.md
git mv docs/TESTING_STRATEGY.md ai_docs/TESTING_STRATEGY.md
```

After all 10 moves, `docs/` will be empty. Git removes empty directories
automatically on commit.

---

### Step 2: Update References (9 files)

**Rules for all reference updates:**

- Replace **only local path references** where `docs/` is a path prefix (e.g.,
  `docs/API_DESIGN_GUIDE.md`).
- **Do NOT modify** external URLs (e.g., `nextjs.org/docs/`, `eslint.org/docs/`,
  `playwright.dev/docs/`).
- **Do NOT modify** content, descriptions, or formatting — only the path portion
  changes.
- When two separate documentation sections exist (one for `docs/`, one for
  `ai_docs/`), **merge them** into a single section with header:
  **`Documentation (`ai_docs/`)`**.
- When merging, sort all entries **alphabetically by display name**.

---

#### 2.1 `CLAUDE.md`

**Key Directories section (~lines 82-83):**

Find:

```markdown
- `/docs/` - Comprehensive documentation (13,000+ words)
- `/ai_docs/` - AI collaboration guides
```

Replace with:

```markdown
- `/ai_docs/` - Documentation and AI collaboration guides
```

**Comprehensive Documentation section (~lines 252-269):**

Find:

```markdown
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
```

Replace with:

```markdown
## Documentation (`ai_docs/`)

The `/ai_docs/` directory contains all project documentation:

- `API_DESIGN_GUIDE.md` - Server Actions vs Route Handlers
- `AUTHENTICATION_GUIDE.md` - Quick auth setup with Clerk
- `CLEANUP_GUIDE.md` - Safe file removal
- `DEPLOYMENT_GUIDE.md` - Vercel + Docker deployment
- `ESLINT_CONFIGURATION.md` - Complete ESLint setup & plugins
- `GITIGNORE_REVIEW.md` - What to track vs ignore
- `IMPLEMENTATION_SUMMARY.md` - Complete project overview
- `STATE_MANAGEMENT_GUIDE.md` - Complete state management patterns
- `TESTING_STRATEGY.md` - 60% coverage approach

Refer to these guides for detailed implementation patterns and best practices.
```

---

#### 2.2 `AGENTS.md`

**Merge two sections (~lines 156-177):**

Find:

```markdown
### AI Collaboration Guides (`ai_docs/`)

- [A Contextual Prompt for Agent](ai_docs/A_Contextual_Prompt_for_Agent.md)
- [AI Collaborative Architecture](ai_docs/AI_Collaborative_Architecture_The_Definitive_Project_Template_for_Next.js_15.md)
- [Branching & Merging Strategy](ai_docs/branching-merging-strategy.md)
- [General AI Behaviour](ai_docs/general_ai_behaviour.md)
- [Next.js Project Standards](ai_docs/next.js-project-standards-best-practices.md)
- [Test-Driven Development TypeScript](ai_docs/test-driven-development-typescript.md)
- [Universal Coding Principles](ai_docs/univeral_coding_principle.md)

### Development Guides (`docs/`)

- [API Design Guide](docs/API_DESIGN_GUIDE.md) — Server Actions vs Route
  Handlers
- [Authentication Guide](docs/AUTHENTICATION_GUIDE.md) — Auth setup with Clerk
- [Cleanup Guide](docs/CLEANUP_GUIDE.md) — Safe file removal procedures
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) — Vercel and Docker deployment
- [Dockerignore Review](docs/DOCKERIGNORE_REVIEW.md) — Docker build optimization
- [ESLint Configuration](docs/ESLINT_CONFIGURATION.md) — ESLint setup and
  plugins
- [Gitignore Review](docs/GITIGNORE_REVIEW.md) — What to track vs ignore
- [Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md) — Complete project
  overview
- [State Management Guide](docs/STATE_MANAGEMENT_GUIDE.md) — State management
  patterns
- [Testing Strategy](docs/TESTING_STRATEGY.md) — 60% coverage testing approach
```

Replace with:

```markdown
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
```

(All 17 files, alphabetically sorted by display name.)

---

#### 2.3 `README.md`

**Directory tree (~lines 66-67):**

Find:

```
├── docs/                    # Comprehensive documentation
├── ai_docs/                 # AI collaboration guides
```

Replace with:

```
├── ai_docs/                 # Documentation and AI collaboration guides
```

**Documentation section (~lines 155-180):**

Find:

```markdown
## 📖 **Documentation**

Comprehensive guides are available in the `/docs` directory:

### **Core Guides**

- [**State Management Guide**](docs/STATE_MANAGEMENT_GUIDE.md) - Complete state
  management patterns
- [**API Design Guide**](docs/API_DESIGN_GUIDE.md) - Server Actions vs Route
  Handlers
- [**Authentication Guide**](docs/AUTHENTICATION_GUIDE.md) - Quick auth setup
  with Clerk
- [**Deployment Guide**](docs/DEPLOYMENT_GUIDE.md) - Vercel + Docker deployment
- [**Testing Strategy**](docs/TESTING_STRATEGY.md) - 60% coverage approach
- [**Implementation Summary**](docs/IMPLEMENTATION_SUMMARY.md) - Complete
  overview

### **Development Guides**

- [**ESLint Configuration**](docs/ESLINT_CONFIGURATION.md) - Complete ESLint
  setup & plugins
- [**Gitignore Review**](docs/GITIGNORE_REVIEW.md) - What to track vs ignore
- [**Dockerignore Review**](docs/DOCKERIGNORE_REVIEW.md) - Docker optimization
- [**Cleanup Guide**](docs/CLEANUP_GUIDE.md) - Safe file removal

### **AI Collaboration**

- [**CLAUDE.md**](CLAUDE.md) - AI assistant guidance
- [**AI Docs**](ai_docs/) - Architecture and best practices

**Total Documentation:** 13,000+ words of comprehensive guides
```

Replace with:

```markdown
## 📖 **Documentation**

All guides are in the [`/ai_docs`](ai_docs/) directory:

- [**API Design Guide**](ai_docs/API_DESIGN_GUIDE.md) - Server Actions vs Route
  Handlers
- [**Authentication Guide**](ai_docs/AUTHENTICATION_GUIDE.md) - Quick auth setup
  with Clerk
- [**CLAUDE.md**](CLAUDE.md) - AI assistant guidance
- [**Cleanup Guide**](ai_docs/CLEANUP_GUIDE.md) - Safe file removal
- [**Deployment Guide**](ai_docs/DEPLOYMENT_GUIDE.md) - Vercel + Docker
  deployment
- [**Dockerignore Review**](ai_docs/DOCKERIGNORE_REVIEW.md) - Docker
  optimization
- [**ESLint Configuration**](ai_docs/ESLINT_CONFIGURATION.md) - Complete ESLint
  setup & plugins
- [**Gitignore Review**](ai_docs/GITIGNORE_REVIEW.md) - What to track vs ignore
- [**Implementation Summary**](ai_docs/IMPLEMENTATION_SUMMARY.md) - Complete
  overview
- [**State Management Guide**](ai_docs/STATE_MANAGEMENT_GUIDE.md) - Complete
  state management patterns
- [**Testing Strategy**](ai_docs/TESTING_STRATEGY.md) - 60% coverage approach
```

**Remaining scattered references** — find-and-replace these exact strings:

| Find (exact string)                | Replace with                          |
| ---------------------------------- | ------------------------------------- |
| `(docs/STATE_MANAGEMENT_GUIDE.md)` | `(ai_docs/STATE_MANAGEMENT_GUIDE.md)` |
| `(docs/DEPLOYMENT_GUIDE.md)`       | `(ai_docs/DEPLOYMENT_GUIDE.md)`       |
| `(docs/CLEANUP_GUIDE.md)`          | `(ai_docs/CLEANUP_GUIDE.md)`          |
| `(docs/IMPLEMENTATION_SUMMARY.md)` | `(ai_docs/IMPLEMENTATION_SUMMARY.md)` |
| `[docs/](docs/)`                   | `[ai_docs/](ai_docs/)`                |

---

#### 2.4 `public/llms.txt`

**"Optional" section (lines 29-38)** — update paths only, no section
restructure:

| Find (exact string)                | Replace with                          |
| ---------------------------------- | ------------------------------------- |
| `(docs/API_DESIGN_GUIDE.md)`       | `(ai_docs/API_DESIGN_GUIDE.md)`       |
| `(docs/AUTHENTICATION_GUIDE.md)`   | `(ai_docs/AUTHENTICATION_GUIDE.md)`   |
| `(docs/CLEANUP_GUIDE.md)`          | `(ai_docs/CLEANUP_GUIDE.md)`          |
| `(docs/DEPLOYMENT_GUIDE.md)`       | `(ai_docs/DEPLOYMENT_GUIDE.md)`       |
| `(docs/DOCKERIGNORE_REVIEW.md)`    | `(ai_docs/DOCKERIGNORE_REVIEW.md)`    |
| `(docs/ESLINT_CONFIGURATION.md)`   | `(ai_docs/ESLINT_CONFIGURATION.md)`   |
| `(docs/GITIGNORE_REVIEW.md)`       | `(ai_docs/GITIGNORE_REVIEW.md)`       |
| `(docs/IMPLEMENTATION_SUMMARY.md)` | `(ai_docs/IMPLEMENTATION_SUMMARY.md)` |
| `(docs/STATE_MANAGEMENT_GUIDE.md)` | `(ai_docs/STATE_MANAGEMENT_GUIDE.md)` |
| `(docs/TESTING_STRATEGY.md)`       | `(ai_docs/TESTING_STRATEGY.md)`       |

---

#### 2.5 `.dockerignore`

Find and **delete** this line:

```
docs/
```

Keep `ai_docs/` line as-is (it remains excluded from Docker builds).

---

#### 2.6 `ai_docs/GITIGNORE_REVIEW.md` (self-references after move)

| Find (exact string)                                             | Replace with                                                      |
| --------------------------------------------------------------- | ----------------------------------------------------------------- |
| `✅ docs/                     # All documentation files`        | `✅ ai_docs/                  # All documentation files`          |
| `✅ All documentation in /docs/`                                | `✅ All documentation in /ai_docs/`                               |
| `✅ All AI guidance in /ai_docs/`                               | Remove this line (merged above)                                   |
| `?? docs/                              ← All new documentation` | `?? ai_docs/                             ← All new documentation` |
| `git add docs/`                                                 | `git add ai_docs/`                                                |
| `` `docs/`, `*.md` ``                                           | `` `ai_docs/`, `*.md` ``                                          |

---

#### 2.7 `ai_docs/DOCKERIGNORE_REVIEW.md` (self-references after move)

| Find (exact string)                                          | Replace with                             |
| ------------------------------------------------------------ | ---------------------------------------- |
| ` 84KB  docs/` (size listing, ~line 20)                      | Remove line (sizes merged into ai_docs/) |
| `docs/` (standalone dockerignore example line, ~line 146)    | Remove line                              |
| Row containing `` `docs/` `` in comparison table (~line 281) | Remove row                               |
| ` 84KB  docs/              ✓` (savings listing, ~line 469)   | Remove line                              |

---

#### 2.8 `ai_docs/CLEANUP_GUIDE.md` (self-references after move)

| Find (exact string)                                 | Replace with                                  |
| --------------------------------------------------- | --------------------------------------------- |
| `` `docs/` - All guides ``                          | `` `ai_docs/` - All guides ``                 |
| `` `ai_docs/` - AI collaboration docs ``            | Remove line (merged above)                    |
| `❌ docs/                  # Documentation`         | `❌ ai_docs/                 # Documentation` |
| `docs/` (standalone line ~207 in directory listing) | `ai_docs/`                                    |

---

#### 2.9 `ai_docs/IMPLEMENTATION_SUMMARY.md` (self-references after move)

Global find-and-replace within this file:

| Find (exact string)                               | Replace with                         |
| ------------------------------------------------- | ------------------------------------ |
| `/docs/STATE_MANAGEMENT_GUIDE.md`                 | `/ai_docs/STATE_MANAGEMENT_GUIDE.md` |
| `/docs/AUTHENTICATION_GUIDE.md`                   | `/ai_docs/AUTHENTICATION_GUIDE.md`   |
| `/docs/API_DESIGN_GUIDE.md`                       | `/ai_docs/API_DESIGN_GUIDE.md`       |
| `/docs/DEPLOYMENT_GUIDE.md`                       | `/ai_docs/DEPLOYMENT_GUIDE.md`       |
| `/docs/TESTING_STRATEGY.md`                       | `/ai_docs/TESTING_STRATEGY.md`       |
| `in \`/docs/\`:`                                  | `in \`/ai_docs/\`:`                  |
| `docs/` (standalone directory listing, ~line 195) | `ai_docs/`                           |

---

### Out of Scope

The following `docs/` references are **explicitly NOT updated**:

| File                                                          | Reference                                        | Reason          |
| ------------------------------------------------------------- | ------------------------------------------------ | --------------- |
| `ai_docs/STATE_MANAGEMENT_GUIDE.md` lines 396, 398            | `nextjs.org/docs/...`                            | External URL    |
| `ai_docs/ESLINT_CONFIGURATION.md` line 368                    | `eslint.org/docs/...`                            | External URL    |
| `ai_docs/test-driven-development-typescript.md` lines 888-908 | `nextjs.org/docs/...`                            | External URL    |
| `ai_docs/AI_Collaborative_Architecture...md` lines 477, 732   | `nextjs.org/docs/...`, `playwright.dev/docs/...` | External URL    |
| `prd/001_taskfile_yml/req.md`                                 | `/Users/jairo/Projects/prompts/ai_docs/` paths   | External repo   |
| `prd/002_init_design/prd-enhanced.md`                         | `ai_docs/` references                            | Already correct |
| `prd/002_init_design/SPEC.md`                                 | `ai_docs/` reference                             | Already correct |

---

## Result

After the single atomic commit:

1. **`docs/` directory does not exist.**
2. **`ai_docs/` contains exactly 17 `.md` files** (7 original + 10 moved).
3. **Zero stale local `docs/` path references** across all project files.
4. **Git history preserved** — `git log --follow ai_docs/<file>` traces back
   through the rename.
5. **Merged documentation sections** — CLAUDE.md, AGENTS.md, README.md each have
   a single "Documentation (`ai_docs/`)" section instead of two separate
   sections.

---

## Evaluation

### Negative Constraints (Must NOT)

1. **Must NOT modify external URLs.** Any URL containing `nextjs.org/docs`,
   `eslint.org/docs`, `playwright.dev/docs`, `react.dev/docs` remains untouched.
2. **Must NOT alter file content beyond path references.** No rewording
   descriptions, no reformatting, no adding/removing documentation content —
   only path strings change.
3. **Must NOT create a broken intermediate commit.** File moves and reference
   updates are in the same commit.

### Verification Script

```bash
#!/bin/bash
set -e
PASS=0; FAIL=0

# 1. docs/ directory must not exist
if [ -d "docs/" ]; then
  echo "FAIL: docs/ directory still exists"; ((FAIL++))
else
  echo "PASS: docs/ directory removed"; ((PASS++))
fi

# 2. All 10 files exist in ai_docs/
FILES=(API_DESIGN_GUIDE.md AUTHENTICATION_GUIDE.md CLEANUP_GUIDE.md
       DEPLOYMENT_GUIDE.md DOCKERIGNORE_REVIEW.md ESLINT_CONFIGURATION.md
       GITIGNORE_REVIEW.md IMPLEMENTATION_SUMMARY.md STATE_MANAGEMENT_GUIDE.md
       TESTING_STRATEGY.md)
for f in "${FILES[@]}"; do
  if [ -f "ai_docs/$f" ]; then
    echo "PASS: ai_docs/$f exists"; ((PASS++))
  else
    echo "FAIL: ai_docs/$f missing"; ((FAIL++))
  fi
done

# 3. Total file count in ai_docs/ is 17
COUNT=$(ls -1 ai_docs/*.md | wc -l | tr -d ' ')
if [ "$COUNT" -eq 17 ]; then
  echo "PASS: ai_docs/ has 17 files"; ((PASS++))
else
  echo "FAIL: ai_docs/ has $COUNT files (expected 17)"; ((FAIL++))
fi

# 4. No stale local docs/ references in target files
STALE=$(grep -rn 'docs/' CLAUDE.md AGENTS.md README.md public/llms.txt .dockerignore \
        ai_docs/GITIGNORE_REVIEW.md ai_docs/DOCKERIGNORE_REVIEW.md \
        ai_docs/CLEANUP_GUIDE.md ai_docs/IMPLEMENTATION_SUMMARY.md 2>/dev/null \
  | grep -v 'ai_docs/' \
  | grep -v 'nextjs.org/docs' \
  | grep -v 'eslint.org/docs' \
  | grep -v 'playwright.dev/docs' \
  | grep -v 'react.dev/docs' \
  | grep -v 'prd/' || true)
if [ -z "$STALE" ]; then
  echo "PASS: no stale docs/ references"; ((PASS++))
else
  echo "FAIL: stale references found:"; echo "$STALE"; ((FAIL++))
fi

# 5. Git history preserved for a sample file
HISTORY=$(git log --follow --oneline ai_docs/API_DESIGN_GUIDE.md 2>/dev/null | head -1)
if [ -n "$HISTORY" ]; then
  echo "PASS: git history preserved"; ((PASS++))
else
  echo "FAIL: git history not found"; ((FAIL++))
fi

# 6. Build passes
if npm run build > /dev/null 2>&1; then
  echo "PASS: npm run build"; ((PASS++))
else
  echo "FAIL: npm run build"; ((FAIL++))
fi

# 7. Lint passes
if npm run lint > /dev/null 2>&1; then
  echo "PASS: npm run lint"; ((PASS++))
else
  echo "FAIL: npm run lint"; ((FAIL++))
fi

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
```

### Acceptance Criteria

| #     | Criterion                                                                                                                 | Verification                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| AC-1  | `docs/` directory does not exist                                                                                          | `[ ! -d docs/ ]`                                                        |
| AC-2  | All 10 moved files present in `ai_docs/`                                                                                  | Script check #2                                                         |
| AC-3  | `ai_docs/` contains exactly 17 `.md` files                                                                                | `ls -1 ai_docs/*.md \| wc -l` equals 17                                 |
| AC-4  | `git log --follow` shows pre-move history for each moved file                                                             | Script check #5                                                         |
| AC-5  | Zero local `docs/` path references in: CLAUDE.md, AGENTS.md, README.md, public/llms.txt, .dockerignore                    | Script check #4                                                         |
| AC-6  | Zero `docs/` self-references in moved files: GITIGNORE_REVIEW, DOCKERIGNORE_REVIEW, CLEANUP_GUIDE, IMPLEMENTATION_SUMMARY | Script check #4                                                         |
| AC-7  | All external URLs containing `docs/` are unchanged                                                                        | `grep -c 'nextjs.org/docs' ai_docs/STATE_MANAGEMENT_GUIDE.md` returns 2 |
| AC-8  | `npm run build` exits 0                                                                                                   | Script check #6                                                         |
| AC-9  | `npm run lint` exits 0                                                                                                    | Script check #7                                                         |
| AC-10 | Exactly one commit contains all changes                                                                                   | `git log --oneline -1` shows single commit message                      |
