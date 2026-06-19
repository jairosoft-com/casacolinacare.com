---
title: "Vercel Project — casacolinacare-com"
type: code
tags: [vercel, deployment, casacolinacare]
created: 2026-06-17
updated: 2026-06-19
source_count: 2
aliases: [vercel casacolinacare, casacolinacare vercel]
---

# Vercel Project — casacolinacare-com

MCP-accessible Vercel project for the Casa Colina Care marketing website.

## IDs

| Field | Value |
|-------|-------|
| Team name | `ramon-asenieros-projects` |
| Team ID | `team_a0HxSoTHUsrDilHfzDZfvQ2g` |
| Project name | `casacolinacare-com` |
| Project ID | `prj_RF8zLE6hbmTDR3LXbPiIkmJV5dS2` |

## Deployment Behavior

- **Production**: auto-deploys on merge to `main` via GitHub integration
- **Preview**: PR branches get preview deployments automatically on every push
- **Build command**: `npm run build` (Next.js 15)
- **Region**: Washington D.C. (iad1)

## MCP Access

Use `mcp__vercel__*` tools with `teamId: team_a0HxSoTHUsrDilHfzDZfvQ2g` and `projectId: prj_RF8zLE6hbmTDR3LXbPiIkmJV5dS2`.

## Monitoring a production deploy

To confirm a PR merged to main deployed successfully, use this chain:

```
1. list_teams()
   → teamId: "team_a0HxSoTHUsrDilHfzDZfvQ2g"

2. list_projects(teamId)
   → projectId: "prj_RF8zLE6hbmTDR3LXbPiIkmJV5dS2"

3. list_deployments(projectId, teamId)
   → deployments[0] is the most recent
```

A production deploy is confirmed when `deployments[0]` shows:

| Field | Expected value |
|-------|----------------|
| `state` | `"READY"` |
| `target` | `"production"` |
| `meta.githubCommitRef` | `"main"` |

The `meta.githubCommitMessage` identifies which PR triggered the deployment. `state: "ERROR"` means the build failed — check `get_deployment_build_logs(deploymentId, teamId)`.

## Related

- [[GitHub Auto-Update Branch Can Break TypeScript Build]]
- [[ADO Work Item Terminal State Is Closed Not Done]]

## Sources

- Session: Vercel build error investigation on PR #51 (2026-06-17)
- Session: Story #206950 — monitored PR #56 production deploy (2026-06-19)
