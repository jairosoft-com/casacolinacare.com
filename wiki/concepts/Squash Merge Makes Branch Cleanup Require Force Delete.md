---
title: "Squash Merge Makes Branch Cleanup Require Force Delete"
type: concept
tags: [git, squash-merge, worktree, workflow, branch-cleanup]
created: 2026-06-17
updated: 2026-06-17
source_count: 1
aliases: [squash merge branch delete, force delete squash merged branch]
---

# Squash Merge Makes Branch Cleanup Require Force Delete

When GitHub squash-merges a PR, the original branch commits are collapsed into a single new commit on `main`. The branch's own commit graph is NOT replayed onto `main` — it is rewritten.

## Symptoms

```bash
git merge-base --is-ancestor <branch> main
# → exits non-zero (false) even after the PR was merged

git branch -d <branch>
# → error: the branch 'X' is not fully merged
```

## Cause

`git branch -d` checks ancestry via `git merge-base --is-ancestor`. A squash merge creates a NEW commit on `main` that is not a descendant of the original branch commits. The branch is not technically an ancestor of `main`.

## Fix

Use `git branch -D` (force delete). This is safe when the PR merge is confirmed on GitHub.

```bash
git branch -D worktree-plan-story-206771
```

## Impact on jx-pm:clean-worktree

The B5 "already merged" check (`git merge-base --is-ancestor`) will return false for squash-merged PRs. When the PR is confirmed squash-merged via GitHub:
1. Skip the re-merge step (changes are already on remote `main`)
2. Proceed directly to `git worktree remove`
3. Use `git branch -D` instead of `git branch -d`

## Related

- [[git worktree remove Requires --force for Claude Code Worktrees]]

## Sources

- Session: jx-pm:clean-worktree on worktree-plan-story-206771 (2026-06-17)
