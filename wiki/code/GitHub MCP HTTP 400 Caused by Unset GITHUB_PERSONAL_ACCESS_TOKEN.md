---
title: "GitHub MCP HTTP 400 Caused by Unset GITHUB_PERSONAL_ACCESS_TOKEN"
type: code
tags: [github, mcp, auth, claude-code, config]
created: 2026-06-19
updated: 2026-06-19
source_count: 1
aliases: [github mcp 400, github mcp bearer token, GITHUB_PERSONAL_ACCESS_TOKEN]
---

# GitHub MCP HTTP 400 Caused by Unset GITHUB_PERSONAL_ACCESS_TOKEN

The GitHub MCP server at `api.githubcopilot.com/mcp/` requires `Authorization: Bearer <token>`. If `GITHUB_PERSONAL_ACCESS_TOKEN` is not set in the environment, the header becomes `Authorization: Bearer ` (empty value), and the server returns HTTP 400.

## Error

```
Failed to reconnect to plugin:github:github: HTTP 400 at https://api.githubcopilot.com/mcp/
```

## Fix

Add the PAT to `~/.claude/settings.json` under `env`:

```json
{
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "github_pat_..."
  }
}
```

The GitHub plugin config at `~/.claude/plugins/cache/claude-plugins-official/github/unknown/.mcp.json` reads this env var:

```json
{
  "github": {
    "type": "http",
    "url": "https://api.githubcopilot.com/mcp/",
    "headers": {
      "Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"
    }
  }
}
```

## Generating a PAT

GitHub → Settings → Developer settings → Personal access tokens → Fine-grained. Scope to the target repos. Verify with `curl -H "Authorization: Bearer <pat>" https://api.github.com/user` — expect HTTP 200.

## Note

A `401` from the PAT validation endpoint means the token itself is invalid or revoked. Generate a new one.

## Related

- [[Background Session Cannot Load MCP Servers Created After Session Start]]

## Sources

- Session: phone-update + GitHub MCP fix (2026-06-19)
