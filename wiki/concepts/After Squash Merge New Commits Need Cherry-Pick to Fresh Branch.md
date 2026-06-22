---
title: "After Squash Merge New Commits Need Cherry-Pick to Fresh Branch"
type: concept
tags: [git, squash-merge, worktree, workflow, cherry-pick]
created: 2026-06-19
updated: 2026-06-19
source_count: 1
aliases: [squash merge cherry-pick, post-squash continuation]
---

# After Squash Merge New Commits Need Cherry-Pick to Fresh Branch

After a PR is squash-merged, any additional commits on the original branch cannot be cleanly rebased onto `main` — git does not auto-skip the already-merged commits because the squash created a new SHA.

## Symptom

Attempting `git rebase origin/main` on a branch that has both squash-merged commits and new work will either replay the merged commits (duplication) or conflict, depending on how similar the changes are.

## Correct Workflow

```bash
# 1. Find the SHA of only the NEW commit(s)
git log --oneline fix/old-branch

# 2. Create a clean branch from main
git checkout -b fix/new-branch origin/main

# 3. Cherry-pick only the new work
git cherry-pick <new-commit-sha>

# 4. Push and open a new PR
git push -u origin fix/new-branch
```

## Why Rebase Fails

A squash merge rewrites the branch's commit graph into a single new commit on `main`. The original commits' SHAs don't exist in `main`'s history, so `git rebase` sees them all as new work and tries to replay everything — including what was already merged.

## Related

- [[Squash Merge Makes Branch Cleanup Require Force Delete]]
- [[gh pr merge Fails When Main Branch Is Checked Out in Another Worktree]]

## Sources

- Session: phone-update + GitHub MCP fix (2026-06-19)
