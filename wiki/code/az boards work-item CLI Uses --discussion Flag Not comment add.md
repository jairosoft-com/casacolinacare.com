---
title: "az boards work-item CLI Uses --discussion Flag Not comment add"
type: code
tags: [ado, azure-devops, cli, az]
created: 2026-06-19
updated: 2026-06-19
source_count: 1
aliases: [az boards comment, ado cli comment, az work-item discussion]
---

# az boards work-item CLI Uses --discussion Flag Not comment add

`az boards work-item comment add` is not a valid subcommand. The correct way to post a comment on an ADO work item via the `az` CLI is the `--discussion` flag on `update`.

## Wrong (fails)

```bash
az boards work-item comment add --id 206975 --comment "..."
# ERROR: 'comment' is misspelled or not recognized by the system.
```

## Correct

```bash
az boards work-item update \
  --id 206975 \
  --org https://dev.azure.com/<org> \
  --discussion "Your comment text here."
```

The `--discussion` flag appends a new discussion comment to the work item's history. The response includes `commentVersionRef.commentId` confirming the post.

## Note

This is the `az` CLI fallback pattern when [[ADO MCP wit_add_work_item_comment Parameter Names|MCP tools]] are unavailable (e.g., [[Background Session Cannot Load MCP Servers Created After Session Start|background sessions that started before `.mcp.json` was created]]).

## Related

- [[ADO MCP wit_add_work_item_comment Parameter Names]]
- [[ADO Work Item Terminal State Is Closed Not Done]]

## Sources

- Session: phone-update + GitHub MCP fix (2026-06-19)
