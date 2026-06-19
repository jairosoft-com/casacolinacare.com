---
title: "EnterWorktree path Switches Active Session Between Worktrees"
type: code
tags: [worktree, claude-code, background-session, isolation]
status: confirmed
created: 2026-06-19
updated: 2026-06-19
source_count: 1
aliases: [EnterWorktree path, switch worktree mid-session]
---

# EnterWorktree path Switches Active Session Between Worktrees

When a background session starts in one worktree (e.g., a `study-library` worktree) and needs to implement in a different worktree (e.g., `impl-206950`), call `EnterWorktree` with the `path` parameter — not `name` — to switch mid-session.

## Usage

```json
EnterWorktree({ "path": "/Users/jairo/Projects/casacolinacare.com/.claude/worktrees/impl-206950" })
```

The path must appear in `git worktree list` for the current repo.

## Behavior after switch

- All file edits target the new worktree
- The old worktree is left on disk untouched
- `ExitWorktree` will **not** auto-remove a worktree entered via `path` — use `action: "keep"` to return to the original directory

## Symptom that triggers this

Trying to edit a shared-checkout path while isolated in another worktree returns:

> Edit the worktree copy of this file instead of the shared-checkout path.

Or editing a path in worktree A while the session is isolated in worktree B returns:

> This session is now isolated in /path/to/worktree-A. Edit the worktree copy of this file instead.

## Fix

Call `EnterWorktree({ path: "/absolute/path/to/target/worktree" })` before the first edit that targets the new worktree.

## Related

- [[git worktree remove Requires --force for Claude Code Worktrees]]

## Sources

- Session: Story #206950 — switched from `study-library` worktree to `impl-206950` mid-session (2026-06-19)
