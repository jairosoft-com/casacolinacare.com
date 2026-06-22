---
title: "gh pr merge Fails When Main Branch Is Checked Out in Another Worktree"
type: code
tags: [git, worktree, github, cli]
created: 2026-06-19
updated: 2026-06-19
source_count: 1
aliases: [gh pr merge worktree error, gh pr merge main already used]
---

# gh pr merge Fails When Main Branch Is Checked Out in Another Worktree

`gh pr merge` internally tries to check out the PR's base branch locally after merging. If `main` is already checked out in another worktree, this step fails.

## Error

```
fatal: 'main' is already used by worktree at '/Users/jairo/Projects/casacolinacare.com'
```

## Fix

Use the GitHub REST API directly instead:

```bash
gh api repos/<owner>/<repo>/pulls/<num>/merge \
  -X PUT \
  -f merge_method=squash \
  -f commit_title="fix: your commit title"
```

Returns `{"merged": true, "sha": "..."}` on success. Branch auto-deletion (if configured on the repo) still fires.

## Why gh pr merge fails

`gh pr merge` calls `git checkout main` locally to fast-forward the local copy. Worktrees lock branches — a branch checked out in any worktree cannot be checked out again elsewhere.

## Related

- [[Squash Merge Makes Branch Cleanup Require Force Delete]]
- [[git worktree remove Requires --force for Claude Code Worktrees]]

## Sources

- Session: phone-update + GitHub MCP fix (2026-06-19)
