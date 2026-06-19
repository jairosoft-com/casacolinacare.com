---
title: "ADO MCP wit_add_work_item_comment Parameter Names"
type: code
tags: [ado, mcp, tools, api]
status: confirmed
created: 2026-06-18
updated: 2026-06-19
source_count: 2
aliases: [wit_add_work_item_comment, ado comment tool params]
---

# ADO MCP wit_add_work_item_comment Parameter Names

The `mcp__azure-devops__wit_add_work_item_comment` tool uses non-obvious parameter names that differ from other `wit_*` tools.

## Correct call

```json
{
  "workItemId": 206841,   // number, minimum 1 — NOT "id"
  "comment":   "...",     // string — NOT "text"
  "format":    "Markdown" // optional, defaults to "Markdown"
}
```

## Wrong call (silent validation error)

```json
{ "id": 206841, "text": "..." }
}
```

Fails with: `Expected number, received nan` on `workItemId` and `Required` on `comment`. The error appears in tool output but the comment is silently dropped — the work item is unchanged with no other indication of failure.

## Background session: project param required

In a background session (no TTY), omitting the `project` parameter causes silent cancellation — the tool returns `"Project selection cancelled"` and no comment is posted.

Always include `project` explicitly:

```json
{
  "workItemId": 206950,
  "project":    "CasaColinaCare.com",
  "comment":    "...",
  "format":     "Markdown"
}
```

## Note

The tool also sometimes times out (`MCP error -32001: Request timed out`) under load. This is transient — retry once before escalating.

## Related

- [[ADO Work Item Terminal State Is Closed Not Done]]

## Sources

- Session: Story #206841 implementation (2026-06-18)
- Session: Story #206950 implementation (2026-06-19)
