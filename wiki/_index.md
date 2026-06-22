---
title: Wiki Index
updated: 2026-06-19
page_count: 14
---

# Wiki Index

## Ideas

_No ideas yet._

## Concepts

- [[After Squash Merge New Commits Need Cherry-Pick to Fresh Branch]] — after squash merge, use cherry-pick to fresh branch for follow-on commits, not rebase (#git, #squash-merge, #workflow)
- [[Background Session Cannot Load MCP Servers Created After Session Start]] — .mcp.json created mid-session has no effect; fall back to az CLI (#claude-code, #mcp, #worktree)
- [[GitHub Auto-Update Branch Can Break TypeScript Build]] — GitHub auto-merge can produce unused imports that break TypeScript strict build (#github, #typescript, #build)
- [[Squash Merge Makes Branch Cleanup Require Force Delete]] — squash merge means `git branch -d` fails; always use `-D` after confirmed squash PR (#git, #squash-merge)

## Entities

_No entities yet._

## Topics

_No topics yet._

## Plugins

_No plugins yet._

## Platforms

_No platforms yet._

## Projects

_No projects yet._

## Decisions

- [[ADO Work Item Terminal State Is Closed Not Done]] — terminal state for Stories and Tasks in this project is `Closed`, not `Done` (#ado, #workflow)

## Code

- [[az boards work-item CLI Uses --discussion Flag Not comment add]] — `az boards work-item update --discussion "..."` is correct; `comment add` subcommand does not exist (#ado, #cli)
- [[ADO MCP wit_add_work_item_comment Parameter Names]] — use `workItemId` (not `id`) and `comment` (not `text`); wrong params silently drop the comment (#ado, #mcp)
- [[gh pr merge Fails When Main Branch Is Checked Out in Another Worktree]] — use `gh api` directly when main is live in another worktree (#git, #worktree, #github)
- [[GitHub MCP HTTP 400 Caused by Unset GITHUB_PERSONAL_ACCESS_TOKEN]] — empty bearer header → HTTP 400; fix: wire PAT into settings.json env block (#github, #mcp, #auth)
- [[git worktree remove Requires --force for Claude Code Worktrees]] — Claude harness copies untracked hook files into every worktree; always use `--force` (#git, #worktree, #claude-code)
- [[Playwright getByText Fails When Middle Initial Interrupts Name Substring]] — `getByText('Kriss Aseniero')` fails when DOM has `Mari Kriss C. Aseniero`; assert exact rendered string (#testing, #playwright)
- [[RTL getAllByRole Returns All Headings Across Full Page Not Just Section]] — `getAllByRole('heading')` returns all headings on the full page; use `{ name: '...' }` not index (#testing, #rtl)
- [[RTL queryByText Regression Guards Must Target Unique Strings]] — `.not.toBeInTheDocument()` fails if the string appears in ANY node; target unique strings only (#testing, #rtl)
- [[Vercel Project casacolinacare-com]] — team/project IDs, deployment behavior, MCP access config (#vercel, #deployment)

## Sources

_No sources yet._
