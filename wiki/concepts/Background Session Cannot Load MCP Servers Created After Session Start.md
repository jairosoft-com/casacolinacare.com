---
title: "Background Session Cannot Load MCP Servers Created After Session Start"
type: concept
tags: [claude-code, mcp, worktree, background-session, config]
created: 2026-06-19
updated: 2026-06-19
source_count: 1
aliases: [mcp not loading background session, .mcp.json retroactive]
---

# Background Session Cannot Load MCP Servers Created After Session Start

MCP server configuration in `.mcp.json` is read once at session startup. A background session that starts before `.mcp.json` exists will never see those servers — even if the file is created mid-session.

## Constraint 1: MCP servers don't load retroactively

Creating `.mcp.json` during a running background session has no effect on that session. The ADO MCP server (or any other) will not appear in tool lists. Workaround: fall back to `az` CLI or other non-MCP tooling for that session.

## Constraint 2: Background session worktree guard blocks writes to the main checkout

Background worktree sessions enforce isolation. File edits outside `.claude/worktrees/` are rejected until `EnterWorktree` is called. Config files that must land in the main checkout (like `.mcp.json`) cannot be written by the background session itself.

Workaround: user creates the file via terminal using the `!` command prefix:

```bash
! echo '{"mcpServers": {"ado": {"command": "npx", "args": ["-y", "@azure-devops/mcp", "jairo"]}}}' > .mcp.json
```

## Takeaway

For MCP-dependent workflows, ensure `.mcp.json` exists **before** starting the session. If running a background job that needs ADO MCP, start a fresh session after the config file is in place.

## Related

- [[GitHub MCP HTTP 400 Caused by Unset GITHUB_PERSONAL_ACCESS_TOKEN]]
- [[az boards work-item CLI Uses --discussion Flag Not comment add]]

## Sources

- Session: phone-update + GitHub MCP fix (2026-06-19)
