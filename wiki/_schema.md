---
title: Wiki Schema
wiki_name: "Casa Colina Care"
version: 1
---

# Wiki Schema

## Taxonomy

### Ideas
Raw, untriaged ideas extracted from sources or conversations. Starting point for the idea lifecycle.
Directory: `ideas/`

### Concepts
Promoted ideas; abstract principles, patterns, techniques, methodologies.
Directory: `concepts/`

### Entities
Named, specific things: people, organizations, products, places, events, dates.
Directory: `entities/`

### Topics
Broader subject areas that aggregate multiple entities and concepts.
Directory: `topics/`

### Plugins
Plugin specifications, design documents, implementation notes.
Directory: `plugins/`

### Platforms
Platform-specific documentation (Claude Code, ChatGPT, Codex, etc.).
Directory: `platforms/`

### Projects
Project pages: goals, status, timelines, dependencies.
Directory: `projects/`

### Decisions
Architectural Decision Records (ADRs): context, decision, consequences, status.
Directory: `decisions/`

### Code
Source code documentation: modules, APIs, patterns, architecture notes found in the codebase.
Directory: `code/`

### Sources
One summary page per ingested raw source document.
Directory: `sources/`

## Page Conventions

### Naming
- Title Case With Spaces (e.g., `Machine Learning.md`)
- Sanitize only filesystem-illegal characters: / \ : * ? " < > |
- Obsidian resolves `[[Machine Learning]]` to `Machine Learning.md`

### Required Frontmatter
title: Page Title
type: idea | concept | entity | topic | plugin | platform | project | decision | code | source
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
source_count: <number of raw sources that contributed>
aliases: [alternate name]

Additional fields by type:
- Ideas: status (raw | backlogged | promoted | archived), promoted_to, archive_reason
- Decisions: status (proposed | accepted | deprecated | superseded)

### Cross-References
- `[[Page Name]]` for page links
- `[[Page Name#Section]]` for heading links
- `[[Page Name|Display Text]]` for aliased display text
- Every page should have at least one inbound and one outbound link

### Contradiction Handling
When new info contradicts existing claims, add a conflict callout:
> [!conflict] <topic>
> [[Source A]] claims X.
> [[Source B]] claims Y.
> Needs resolution.

Never silently overwrite existing claims.

### Tiebreaker Rule
When uncertain which taxonomy bucket a piece of knowledge belongs in, route to `ideas/` with `status: raw`. The user will classify it during triage.

### Sources Section
Every wiki page ends with:
## Sources
- [[Source - Document Title]]

## Custom Rules
(User can add domain-specific rules here after initialization)
