# ESLint Configuration Guide

## 🎯 **Overview**

This project uses a comprehensive ESLint setup with 6 powerful plugins to maintain code quality, consistency, and best practices.

---

## 📦 **Configured Plugins**

### **1. eslint-plugin-import**
**Purpose:** Validates and enforces ES6+ import/export best practices

**Features:**
- ✅ Validates import statements point to existing files
- ✅ Detects circular dependencies
- ✅ Prevents duplicate imports
- ✅ Enforces consistent import ordering
- ✅ Adds newline after imports

**Rules Enabled:**
```javascript
'import/named': 'error',              // Named imports must exist
'import/no-duplicates': 'warn',       // No duplicate imports
'import/no-cycle': 'warn',            // Prevent circular deps
'import/first': 'warn',               // Imports at top of file
'import/newline-after-import': 'warn' // Newline after imports
```

---

### **2. eslint-plugin-playwright**
**Purpose:** Lint Playwright E2E test files for best practices

**Features:**
- ✅ Enforces proper async/await in tests
- ✅ Prevents `.only` and `.skip` in commits
- ✅ Validates expect() assertions
- ✅ Discourages hard-coded timeouts
- ✅ Promotes web-first assertions

**Rules Enabled:**
```javascript
'playwright/no-focused-test': 'error',  // No .only in commits
'playwright/no-skipped-test': 'warn',   // Warn about .skip
'playwright/valid-expect': 'error',     // Proper assertions
'playwright/prefer-web-first-assertions': 'warn',
'playwright/no-wait-for-timeout': 'warn'
```

**Applied to:** `tests/e2e/**/*.spec.ts`

---

### **3. eslint-plugin-prettier**
**Purpose:** Runs Prettier as an ESLint rule

**Features:**
- ✅ Shows formatting issues as ESLint warnings
- ✅ Auto-fixes with `eslint --fix`
- ✅ Integrates Prettier into your linting workflow

**Rules Enabled:**
```javascript
'prettier/prettier': 'warn'  // Format code with Prettier
```

**Works with:** `eslint-config-prettier` (disables conflicting rules)

---

### **4. eslint-plugin-simple-import-sort**
**Purpose:** Automatically sorts imports alphabetically

**Features:**
- ✅ Auto-sorts imports by type (built-in, external, internal, relative)
- ✅ Sorts exports alphabetically
- ✅ Zero configuration needed
- ✅ Consistent across the codebase

**Rules Enabled:**
```javascript
'simple-import-sort/imports': 'warn',  // Sort imports
'simple-import-sort/exports': 'warn'   // Sort exports
```

**Example:**
```typescript
// Before
import { utils } from './utils';
import React from 'react';
import { api } from '@/lib/api';

// After auto-fix (npm run lint -- --fix)
import React from 'react';

import { api } from '@/lib/api';

import { utils } from './utils';
```

---

### **5. eslint-plugin-unicorn**
**Purpose:** Powerful collection of opinionated best practices

**Features:**
- ✅ Better regex patterns
- ✅ Consistent error naming
- ✅ Prefer modern JavaScript features
- ✅ Catch common mistakes
- ✅ Improve code readability

**Selected Rules Enabled:**
```javascript
'unicorn/consistent-function-scoping': 'warn',
'unicorn/better-regex': 'warn',
'unicorn/catch-error-name': 'warn',
'unicorn/no-useless-undefined': 'warn',
'unicorn/prefer-string-slice': 'warn',
'unicorn/prefer-array-some': 'warn'
```

**Disabled Rules (too strict for Next.js):**
```javascript
'unicorn/prevent-abbreviations': 'off',  // Too strict
'unicorn/filename-case': 'off',          // Next.js uses various cases
'unicorn/no-null': 'off',                // null is common in React
'unicorn/no-array-reduce': 'off',        // reduce is fine
```

---

### **6. eslint-config-prettier**
**Purpose:** Disables ESLint rules that conflict with Prettier

**Features:**
- ✅ Prevents ESLint/Prettier conflicts
- ✅ Ensures formatting is handled by Prettier
- ✅ Must be last in the config chain

**Why needed:** ESLint and Prettier can have conflicting formatting rules. This config turns off all ESLint formatting rules, leaving only Prettier to handle code formatting.

---

## 🚀 **Usage**

### **Run Linting**
```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint -- --fix

# Check specific file
npm run lint -- src/app/page.tsx
```

### **Auto-Fix Features**

When you run `npm run lint -- --fix`, ESLint will automatically:
1. ✅ Sort all imports alphabetically
2. ✅ Add newlines after imports
3. ✅ Format code with Prettier
4. ✅ Remove duplicate imports
5. ✅ Fix spacing issues

---

## 📋 **Pre-Commit Hooks**

ESLint runs automatically before every commit via Husky:

```bash
# .husky/pre-commit
npm run lint && npm run type-check
```

If linting fails, the commit is blocked until you fix the issues.

---

## 🎯 **What Was Removed**

### **Removed Packages:**
```bash
❌ @typescript-eslint/eslint-plugin  # Replaced by typescript-eslint
❌ @typescript-eslint/parser          # Replaced by typescript-eslint
❌ happy-dom                          # Redundant (using jsdom)
```

### **Why Removed:**
- Modern `typescript-eslint` package replaces the old split packages
- `happy-dom` was not being used (Vitest uses `jsdom`)

---

## 🔧 **Configuration Breakdown**

### **Global Settings**
```javascript
{
  ignores: ['node_modules/', '.next/', 'dist/', 'build/', 'coverage/'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      React: 'readonly'
    }
  }
}
```

### **File-Specific Configuration**

**All JS/TS Files:**
- Base JavaScript rules
- TypeScript rules
- React rules
- Import rules
- Unicorn rules
- Prettier formatting

**E2E Test Files** (`tests/e2e/**/*.spec.ts`):
- All the above +
- Playwright-specific rules

---

## 📊 **Rule Severity Levels**

| Level | Meaning | Behavior |
|-------|---------|----------|
| `error` | Must fix | Exits with error code 1, fails CI/CD |
| `warn` | Should fix | Shows warning, doesn't fail build |
| `off` | Disabled | Rule is not checked |

---

## 🎓 **Examples**

### **Import Sorting (automatic)**
```typescript
// You write this (random order):
import { Card } from './components/Card';
import { useState } from 'react';
import { api } from '@/lib/api';

// ESLint auto-fixes to:
import { useState } from 'react';

import { api } from '@/lib/api';

import { Card } from './components/Card';
```

### **Duplicate Imports (detected)**
```typescript
// ❌ BAD
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';  // Duplicate!

// ✅ GOOD
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

### **Circular Dependencies (detected)**
```typescript
// file-a.ts
import { foo } from './file-b';  // ⚠️ Warning: circular dependency

// file-b.ts
import { bar } from './file-a';  // ⚠️ Warning: circular dependency
```

### **Playwright Best Practices**
```typescript
// ❌ BAD
test.only('debug test', async ({ page }) => {  // Error: no .only!
  page.goto('/login');  // Error: missing await!
});

// ✅ GOOD
test('login test', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveTitle('Login');
});
```

---

## 🛠️ **Customizing Rules**

### **Disable a Rule for a File**
```typescript
/* eslint-disable unicorn/prefer-string-slice */
// Code here won't be checked for this rule
```

### **Disable a Rule for a Line**
```typescript
const foo = bar.substring(0, 5);  // eslint-disable-line unicorn/prefer-string-slice
```

### **Disable Multiple Rules**
```typescript
/* eslint-disable unicorn/prefer-string-slice, import/no-duplicates */
// Code here
/* eslint-enable unicorn/prefer-string-slice, import/no-duplicates */
```

---

## 📈 **Benefits**

### **Code Quality**
- ✅ Catches bugs early
- ✅ Prevents bad patterns
- ✅ Enforces best practices
- ✅ Consistent code style

### **Developer Experience**
- ✅ Auto-fixes common issues
- ✅ Sorts imports automatically
- ✅ Formats code on save
- ✅ Fast feedback loop

### **Team Collaboration**
- ✅ Everyone follows same rules
- ✅ No style debates
- ✅ Easier code reviews
- ✅ Onboarding is faster

---

## 🔍 **Troubleshooting**

### **"The Next.js plugin was not detected" Warning**
This is a known Next.js warning with flat config. It's safe to ignore - the plugin IS configured and working.

### **"Unexpected use of networkidle" Error**
Playwright recommends avoiding `networkidle` as it's unreliable. Use:
- `domcontentloaded` (faster, page structure ready)
- `load` (all resources loaded)
- Web-first assertions instead

### **Too Many Import Sorting Warnings**
Run auto-fix once to sort everything:
```bash
npm run lint -- --fix
```

### **Rule is Too Strict**
You can disable specific rules in `eslint.config.mjs`:
```javascript
rules: {
  'rule-name': 'off'
}
```

---

## 📚 **Resources**

- [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)
- [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

---

## ✅ **Summary**

Your ESLint configuration now provides:
- ✅ **6 powerful plugins** for comprehensive code quality
- ✅ **Automatic import sorting** with simple-import-sort
- ✅ **Prettier integration** for consistent formatting
- ✅ **Playwright linting** for E2E test best practices
- ✅ **Import validation** to catch errors early
- ✅ **Opinionated best practices** with Unicorn
- ✅ **Pre-commit enforcement** via Husky hooks
- ✅ **Auto-fix capabilities** for most issues

**Your code quality is now production-ready!** 🚀

