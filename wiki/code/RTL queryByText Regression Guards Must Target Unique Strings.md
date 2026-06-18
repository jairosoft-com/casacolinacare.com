---
title: "RTL queryByText Regression Guards Must Target Unique Strings"
type: code
tags: [testing, rtl, vitest, react-testing-library, regression]
status: confirmed
created: 2026-06-18
updated: 2026-06-18
source_count: 1
aliases: [queryByText regression, not.toBeInTheDocument unique]
---

# RTL queryByText Regression Guards Must Target Unique Strings

`queryByText(str).not.toBeInTheDocument()` fails if ANY node in the DOM still contains that string — even a different component that legitimately uses the same text.

## The failure mode

The About page has three team cards. Only `team[1]` was updated from `'Care Team Member'` to `'Aileen Jordan, RN'`. `team[2]` still has `name: 'Care Team Member'`.

```ts
// FAILS — team[2] still has "Care Team Member" in its h3
expect(screen.queryByText('Care Team Member')).not.toBeInTheDocument();
```

Error: `expected document not to contain element, found <h3 ...>Care Team Member</h3>`

## Fix 1: target strings unique to the changed element

```ts
// PASSES — "Lead Caregiver" only ever existed on team[1]
expect(screen.queryByText('Lead Caregiver')).not.toBeInTheDocument();
```

## Fix 2: query by accessible name when the text must be exact

```ts
// PASSES — queries the h3 whose accessible name matches exactly
expect(
  screen.getByRole('heading', { level: 3, name: 'Aileen Jordan, RN' })
).toBeInTheDocument();
```

## Rule

Before writing `.not.toBeInTheDocument()` for a string, grep the component for that string and confirm it appears in exactly ONE place after your change. If it still appears elsewhere, switch to Fix 1 (unique string) or Fix 2 (role + name query).

## Related

- [[RTL getAllByRole Returns All Headings Across Full Page Not Just Section]]

## Sources

- Session: Story #206841 implementation (2026-06-18)
