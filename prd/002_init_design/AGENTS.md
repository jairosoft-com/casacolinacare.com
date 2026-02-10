# AGENTS.md — PRD 002: Initial Design Implementation

MISSION: You are an autonomous coding agent implementing user stories for the CasaColinaCare.com website. Work through one user story per iteration, following the workflow defined here.

## 1. Workflow

1. Read the PRD at [prd.json](prd.json) in this directory
2. Read [progress.txt](progress.txt) — check the Codebase Patterns section first
3. Start from `main` — run `git checkout main && git pull origin main`, then create a feature branch: `git checkout -b ralph/{story-id}-{slugified-title}` (e.g., `ralph/US-001-header-navigation`)
4. Pick the **highest priority** user story where `passes: false`
5. Implement that single user story
6. Run quality checks: `npm run lint -- --fix && npm run type-check && npm test -- --run`
7. If checks pass, commit ALL changes: `feat: [Story ID] - [Story Title]`
8. Update `prd.json` to set `passes: true` for the completed story
9. Append progress to [progress.txt](progress.txt)
10. Push the branch: `git push -u origin ralph/{story-id}-{slugified-title}`
11. Open a PR targeting `main`:
    ```bash
    gh pr create --base main \
      --title "feat: [Story ID] - [Story Title]" \
      --body "## Summary
    - What was implemented (brief description)
    - Acceptance criteria met

    ## Notes
    - Any relevant implementation notes or decisions

    Review requested."
    ```
12. If `gh` CLI is unavailable, log in `progress.txt` that a PR needs manual creation

## 2. Key References

Read these before starting implementation:

- [prd.json](prd.json) — 12 user stories (US-001 through US-012) with acceptance criteria
- [prd-casacolinacare-website.md](prd-casacolinacare-website.md) — Full PRD with functional requirements and design details
- [SPEC.md](SPEC.md) — Engineering specification with brand theme, file structure, API contracts, and test plan
- [../../AGENTS.md](../../AGENTS.md) — Root repo instructions (commands, architecture, code style, boundary conditions)
- [../../CLAUDE.md](../../CLAUDE.md) — AI guidance with architecture patterns and implementation examples

## 3. Quality Checks (run before every commit)

```bash
npm run lint -- --fix && npm run type-check && npm test -- --run
```

ALL commits must pass. Do NOT commit broken code.

## 4. Browser Testing (required for frontend stories)

For any story that changes UI:

1. Navigate to the relevant page on `http://localhost:3000`
2. Verify the UI changes work as expected
3. Take a screenshot if helpful for the progress log

A frontend story is NOT complete until browser verification passes.

## 5. Progress Reporting

APPEND to [progress.txt](progress.txt) (never replace):

```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered
  - Gotchas encountered
  - Useful context
---
```

If you discover a **reusable pattern**, add it to the `## Codebase Patterns` section at the TOP of `progress.txt`.

## 6. Stop Condition

- If ALL stories have `passes: true`, reply with: `<promise>COMPLETE</promise>`
- If stories remain with `passes: false`, end normally (another iteration picks up the next story)
- Work on **ONE story per iteration**
