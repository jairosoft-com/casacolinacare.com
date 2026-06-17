---
title: "ADO Work Item Terminal State Is 'Closed' Not 'Done'"
type: decision
tags: [ado, workflow, work-items]
status: accepted
created: 2026-06-17
updated: 2026-06-17
source_count: 1
aliases: []
---

# ADO Work Item Terminal State Is 'Closed' Not 'Done'

## Context

When closing User Stories and Tasks in the CasaColinaCare.com ADO project via `wit_update_work_item`, the state value `"Done"` is rejected.

## Decision

Use `"Closed"` as the terminal state value for both User Stories and Tasks.

```json
{ "path": "/fields/System.State", "value": "Closed" }
```

## Consequences

- `"Done"` returns error: "value 'Done' is not in the list of supported values"
- `"Closed"` succeeds and sets `System.Reason` to `"Acceptance tests pass"` for Stories and `"Completed"` for Tasks
- Confirmed on Tasks #206772, #206773 and Story #206771 (2026-06-17)

## Related

- [[Vercel Project casacolinacare-com]]

## Sources

- Session: Story #206771 implementation (2026-06-17)
