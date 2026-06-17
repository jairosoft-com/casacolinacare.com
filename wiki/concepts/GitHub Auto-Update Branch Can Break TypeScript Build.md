---
title: "GitHub Auto-Update Branch Can Break TypeScript Build"
type: concept
tags: [github, vercel, typescript, merge, build, pitfall]
created: 2026-06-17
updated: 2026-06-17
source_count: 1
aliases: [auto-update branch typescript error, unused import merge conflict]
---

# GitHub Auto-Update Branch Can Break TypeScript Build

GitHub's "Update branch" button (and automatic branch sync) merges `main` into the PR branch. When both branches modified the same file, the auto-merge may produce a bad conflict resolution that breaks the Vercel build.

## Pattern

1. PR branch modifies `file.tsx` (e.g., changes a string literal)
2. `main` also modifies `file.tsx` (e.g., adds a new import and uses it in a template literal)
3. GitHub auto-updates the PR branch by merging `main` in
4. Auto-resolution keeps:
   - The `import` statement from `main` ✓
   - The file body from the PR branch ✗ (which doesn't use the imported symbol)
5. Result: **unused import** — TypeScript strict mode (`noUnusedLocals`) fails the build

## Error

```
Type error: 'FOUNDER_NICKNAME' is declared but its value is never read.
./src/app/about/page.tsx:5:1
```

## Fix

After any auto-update merge, scan the modified files for imports that are not used in the merged body. Update the body to use the import (or remove the import if the feature was intentionally reverted).

## Real Example

PR #51 (`worktree-plan-story-206771`) changed `role` string in `about/page.tsx`. GitHub merged `main` (which had `FOUNDER_NICKNAME` import + template literal bio from US-010-01) into the branch. The merged file had the import but the bio stayed as a plain string literal — breaking the Vercel preview build.

**Fix commit**: `3c4d4e6` — updated bio to use `${FOUNDER_NICKNAME}` template literal.

## Related

- [[Vercel Project casacolinacare-com]]
- [[Squash Merge Makes Branch Cleanup Require Force Delete]]

## Sources

- Session: PR #51 Vercel build error (2026-06-17)
