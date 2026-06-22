---
title: "Playwright getByText Fails When Middle Initial Interrupts Name Substring"
type: code
tags: [testing, playwright, e2e, selectors]
created: 2026-06-19
updated: 2026-06-19
source_count: 1
aliases: [playwright getByText substring, middle initial test failure]
---

# Playwright getByText Fails When Middle Initial Interrupts Name Substring

`page.getByText(str)` does a literal substring match. If the DOM renders a full name with a middle initial, a shorter version of the name without the initial will NOT match — even if both first and last name are present.

## Example

DOM renders: `Mari Kriss C. Aseniero`
Test asserts: `page.getByText('Kriss Aseniero')`

**Result: fails.** `Kriss Aseniero` is not a literal substring of `Mari Kriss C. Aseniero` — the `C.` sits between them.

## Fix

Assert the exact string as rendered in the DOM:

```ts
await expect(page.getByText('Mari Kriss C. Aseniero')).toBeVisible();
```

## Rule

Before writing a `getByText` assertion, check what the component actually renders — not what you expect the name to be. Grep the source file for the exact string used in JSX.

## Related

- [[RTL queryByText Regression Guards Must Target Unique Strings]]

## Sources

- Session: phone-update + GitHub MCP fix (2026-06-19)
