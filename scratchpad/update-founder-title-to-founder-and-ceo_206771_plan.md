# Implementation Plan: Update Founder Title to "Founder & CEO"

**Story ID:** #206771
**Feature:** none (orphaned story — no parent Feature linked)
**Date:** 2026-06-17
**State:** New  |  **Points:** 1

---

## Story Summary

**Narrative:**
As a visitor on the About page, I want Mari Kriss C. Aseniero's title shown as "Founder & CEO", so that the leadership information reflects her current role at Casa Colina Care.

**Acceptance Criteria:**

Scenario: Founder title displays as "Founder & CEO"
  Given the About page is rendered
  When the founder's team card is displayed
  Then the title shown is "Founder & CEO"

Scenario: Previous title no longer appears
  Given the About page is rendered
  When the founder's team card is displayed
  Then the text "Founder & Director" does not appear

Scenario: Founder name and bio are unchanged
  Given the About page is rendered
  When the founder's team card is displayed
  Then the name shown is "Mari Kriss C. Aseniero"
  And the founder bio paragraph is unchanged

---

## Scope

What this plan covers:
- Change the `role` string for Mari Kriss C. Aseniero in `src/app/about/page.tsx` from `'Founder & Director'` to `'Founder & CEO'`
- Add a regression test asserting the new title renders correctly on the About page
- Verify health check passes (lint, type-check, unit tests)
- Ship via PR (not direct push to main)

What this plan does NOT cover:
- Any change to the bio text or founder name
- Changes to `Lead Caregiver` or `Activities Coordinator` roles
- Structured data / JSON-LD (no founder role reference exists there — confirmed by grep)
- Meta tags or page description (no founder role reference)

---

## Code Touchpoints

| File / Module | Relevance |
|---|---|
| `src/app/about/page.tsx:44` | **Only change target.** `role: 'Founder & Director'` → `'Founder & CEO'` in the `team` array |
| `src/app/about/page.tsx:147` | Render site: `<p className="text-sm text-primary">{member.role}</p>` — no change needed |
| `tests/unit/about-page.test.tsx` | Unit tests for About page — currently asserts name only; no change needed |
| `tests/e2e/about-founder.spec.ts` | **E2E regression target.** Currently asserts name/old-name; extend with role assertions for "Founder & CEO" |

No other files reference `'Founder & Director'` — confirmed by `grep -rn "Founder & Director" src tests` → only `page.tsx:44`.

---

## Approach

1. **Edit `src/app/about/page.tsx:44`** — change `role: 'Founder & Director'` to `role: 'Founder & CEO'`. Single string literal change; no imports, no props, no derived types affected.

2. **Add E2E regression test in `tests/e2e/about-founder.spec.ts`** — extend the existing `about-founder` spec with two new assertions: `page.getByText('Founder & CEO')` is visible, and `page.getByText('Founder & Director')` is hidden. No role assertion currently exists in any test; without it, future regressions would go undetected.

3. **Run health check** — `npm run lint -- --fix && npm run type-check && npm test -- --run`. All existing tests should pass; new regression test should go green.

4. **Verify visually** — `npm run dev`, open `/about`, confirm "Meet Our Team" shows **Founder & CEO** under Mari Kriss C. Aseniero's name.

5. **Open PR** — push the feature branch, create PR targeting `main` (GitHub MCP or `gh pr create`). Never push to `main` directly. Conventional commit: `feat: update founder title to Founder & CEO`.

Key decisions:
- No E2E change strictly required — unit test is sufficient for AC sign-off. Optional E2E scenario noted in Test Plan.
- `'Founder & CEO'` is a plain string literal — no constants file, no i18n layer — single change is complete.

---

## Dependencies

No external dependencies identified.

---

## Test Plan per AC

| AC | Test Type | Scenario |
|---|---|---|
| AC-1: title shown is "Founder & CEO" | **E2E (new)** | `await expect(page.getByText('Founder & CEO')).toBeVisible()` in `about-founder.spec.ts` |
| AC-2: "Founder & Director" does not appear | **E2E (new)** | `await expect(page.getByText('Founder & Director')).toBeHidden()` in `about-founder.spec.ts` |
| AC-3: name and bio unchanged | Unit (existing) | `expect(screen.getByText('Mari Kriss C. Aseniero')).toBeInTheDocument()` — already in `about-page.test.tsx` |

---

## Open Questions

No open questions — ACs are concrete and scope is unambiguous.

---

## ADO Task Breakdown

| # | Task | Est. | Definition of Done |
|---|---|---|---|
| — | ~~Implement code change + health check~~ | ~~1h~~ | Already covered by **Task #206772** |
| 1 | **Add E2E regression tests for "Founder & CEO" title** | 1h | `tests/e2e/about-founder.spec.ts` extended with role assertions; `npm run test:e2e` green |
