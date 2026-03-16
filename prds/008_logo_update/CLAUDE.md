# Jodex Agent Instructions

You are an autonomous coding agent working on a software project.

## Your Task

1. Read the PRD at `prd.json` (in the same directory as this file)
2. If `prd.json` contains a `detailedPrdPath` field, read that file for full
   context (goals, functional requirements, design considerations, non-goals)
3. If `prd.json` contains a `technicalSpecPath` field, read the technical
   specification section for the current story (use `technicalSpecSection` field
   from the story)
4. Read the progress log at `progress.txt` (check Codebase Patterns section
   first)
5. Treat `prd.json` as the execution source of truth for scope, user story
   order, acceptance criteria, and completion state
6. Pick the **highest priority** user story where `passes: false`
7. Use `prd.json` to determine what is required for that story. Treat BRD, PRD and
   Technical Spec documents as context only
8. If BRD, PRD or Technical Spec documents describe broader scope than `prd.json`,
   do **not** expand the implementation scope. Append a note to `progress.txt`
   stating that broader context exists, but execution remained limited to the
   `prd.json` story set
9. Derive the story branch name using this pattern:
   `[feature-id]-[feature-name-kebab-case]/[story-id]-[story-name-slugified]`
10. Build `feature-name-kebab-case` by lowercasing `featureName` and converting
    `/`, `_`, and spaces to `-`, then collapsing repeated hyphens
11. Build `story-name-slugified` by lowercasing the story title and converting
    `/`, `_`, and spaces to `-`, then collapsing repeated hyphens
12. Check you're on the correct derived branch. If not, check it out or create
    it from `main`
13. Implement that single user story
14. Run the baseline health check:

    ```bash
    npm run lint -- --fix && npm run type-check && npm test -- --run
    ```

15. Run browser verification only if the selected story's `prd.json`
    acceptance criteria explicitly require browser verification
16. Run E2E tests only if the selected story's `prd.json` acceptance criteria
    explicitly require E2E coverage
17. Update CLAUDE.md files if you discover reusable patterns (see below)
18. Update the PRD to set `passes: true` for the completed story
19. Append your progress to `progress.txt`
20. Stage only files intentionally changed for the selected story, plus
    required state files such as `prd.json` and `progress.txt`
21. Ignore unrelated tracked and untracked changes outside the selected story
    scope. Do not stop the loop solely because unrelated changes exist
22. If a selected story requires editing a file that already contains unrelated
    changes, preserve those changes and make only the minimal required story
    change
23. Before committing, confirm that the selected story was selected from the
    current `passes: false` set, required checks passed, any broader-scope
    mismatch was logged, and only story-scoped files are staged
24. If checks pass, commit the staged story-scoped changes with message:
    `feat: [Feature ID] - [Feature Name]: [Story ID] - [Story Title]`
25. Push the story branch to the remote:
    `git push -u origin [feature-id]-[feature-name-kebab-case]/[story-id]-[story-name-slugified]`
26. Open a pull request targeting `main` using the GitHub CLI:

    ```bash
    gh pr create --base main \
      --title "feat: [Feature ID] - [Feature Name] / [User Story ID] - [User Story Title]" \
      --body "## Summary
    - What was implemented (brief description)
    - Acceptance criteria met

    ## Notes
    - Any relevant implementation notes or decisions

    Review requested."
    ```

27. If `gh` CLI is not available or not authenticated, skip the PR creation, log
    a message in `progress.txt` noting that a PR needs to be created manually
    for this branch, and continue.

## Source of Truth

- `prd.json` is authoritative for executable scope, story order, acceptance
  criteria, and `passes` state
- BRD and technical spec documents provide context only
- If BRD or technical spec documents describe broader scope than `prd.json`,
  implement only what `prd.json` requires and record the mismatch in
  `progress.txt`

## Staging Rules

- Stage only files intentionally changed for the selected story
- Required state files such as `prd.json` and `progress.txt` may be staged when
  they are updated as part of the story
- Ignore unrelated tracked and untracked changes outside the selected story
  scope
- Do not revert, clean, or overwrite unrelated changes
- If a story file already contains unrelated edits, preserve them and make only
  the minimal required story change

## Quality Gates

- Always run the baseline health check before commit:

  ```bash
  npm run lint -- --fix && npm run type-check && npm test -- --run
  ```

- Run browser verification only when the selected story's `prd.json`
  acceptance criteria explicitly require it
- Run E2E only when the selected story's `prd.json` acceptance criteria
  explicitly require it
- Do not commit, push, or open a PR until required checks pass and only
  story-scoped files are staged

## Progress Report Format

APPEND to progress.txt (never replace, always append):

```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered (e.g., "this codebase uses X for Y")
  - Gotchas encountered (e.g., "don't forget to update Z when changing W")
  - Useful context (e.g., "the evaluation panel is in component X")
---
```

The learnings section is critical - it helps future iterations avoid repeating
mistakes and understand the codebase better.

## Consolidate Patterns

If you discover a **reusable pattern** that future iterations should know, add
it to the `## Codebase Patterns` section at the TOP of progress.txt (create it
if it doesn't exist). This section should consolidate the most important
learnings:

```
## Codebase Patterns
- Example: Use `sql<number>` template for aggregations
- Example: Always use `IF NOT EXISTS` for migrations
- Example: Export types from actions.ts for UI components
```

Only add patterns that are **general and reusable**, not story-specific details.

## Update CLAUDE.md Files

Before committing, check if any edited files have learnings worth preserving in
nearby CLAUDE.md files:

1. **Identify directories with edited files** - Look at which directories you
   modified
2. **Check for existing CLAUDE.md** - Look for CLAUDE.md in those directories or
   parent directories
3. **Add valuable learnings** - If you discovered something future
   developers/agents should know:
   - API patterns or conventions specific to that module
   - Gotchas or non-obvious requirements
   - Dependencies between files
   - Testing approaches for that area
   - Configuration or environment requirements

**Examples of good CLAUDE.md additions:**

- "When modifying X, also update Y to keep them in sync"
- "This module uses pattern Z for all API calls"
- "Tests require the dev server running on PORT 3000"
- "Field names must match the template exactly"

**Do NOT add:**

- Story-specific implementation details
- Temporary debugging notes
- Information already in progress.txt

Only update CLAUDE.md if you have **genuinely reusable knowledge** that would
help future work in that directory.

## Quality Requirements

- ALL commits must pass your project's quality checks (typecheck, lint, test)
- Do NOT commit broken code
- Keep changes focused and minimal
- Follow existing code patterns

## Browser Testing (If Available)

For any story whose `prd.json` acceptance criteria explicitly require browser
verification, verify it works in the browser if you have browser testing tools
configured (e.g., via MCP):

1. Navigate to the relevant page
2. Verify the UI changes work as expected
3. Take a screenshot if helpful for the progress log

If no browser tools are available, note in your progress report that manual
browser verification is needed.

## Stop Condition

After completing a user story, check if ALL stories have `passes: true`.

If ALL stories are complete and passing, reply with: <promise>COMPLETE</promise>

If there are still stories with `passes: false`, end your response normally
(another iteration will pick up the next story).

## Important

- Work on ONE story per iteration
- Commit frequently
- Keep CI green
- Read the Codebase Patterns section in progress.txt before starting
