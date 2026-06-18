---
title: "RTL getAllByRole Returns All Headings Across the Full Page, Not Just One Section"
type: code
tags: [testing, rtl, vitest, react-testing-library, accessibility, headings]
status: confirmed
created: 2026-06-18
updated: 2026-06-18
source_count: 1
aliases: [getAllByRole heading index, rtl heading position]
---

# RTL getAllByRole Returns All Headings Across the Full Page, Not Just One Section

`screen.getAllByRole('heading', { level: 3 })` returns every h3 on the entire rendered page — not just those in the section you're testing. Index-based queries silently fail when other sections render h3s before the one you intend.

## The failure mode

The About page renders h3s in this order across all sections:

| Index | Text | Section |
|---|---|---|
| 0 | Aloha Spirit | values |
| 1 | Dignity & Independence | values |
| 2 | Family First | values |
| 3 | Community Connection | values |
| 4 | Mari Kriss C. Aseniero | team |
| 5 | Aileen Jordan, RN | team |
| 6 | Care Team Member | team |

```ts
// FAILS — headings[1] is "Dignity & Independence", not the nurse card
const headings = screen.getAllByRole('heading', { level: 3 });
expect(headings[1]).toHaveTextContent('Aileen Jordan, RN');
// Received: "Dignity & Independence"
```

## Fix: query by accessible name

```ts
// PASSES — finds the specific h3 by accessible name, position-independent
expect(
  screen.getByRole('heading', { level: 3, name: 'Aileen Jordan, RN' })
).toBeInTheDocument();
```

## Rule

Never assume heading index == card position. Always use `getByRole('heading', { name: '...' })` when targeting a specific heading by content. Index-based heading queries are brittle and break any time the page gains a new section above the target.

## Related

- [[RTL queryByText Regression Guards Must Target Unique Strings]]

## Sources

- Session: Story #206841 implementation (2026-06-18)
