# Implementation Plan: Update site business phone to +1 (808) 444-1168

**Story ID:** #206975
**Feature:** none — standalone story
**Date:** 2026-06-19
**State:** New  |  **Points:** 1

---

## Story Summary

**Narrative:**
As a prospective resident's family member, I want the Casa Colina Care site to display the
correct business phone number (+1 (808) 444-1168) on every page, So that I can call and
reach the care home without hitting a wrong number.

**Acceptance Criteria:**
1. The footer displays `+1 (808) 444-1168` with `href="tel:+18084441168"` on all pages
2. The CTA banner displays `+1 (808) 444-1168` with `href="tel:+18084441168"` (Home, About, FAQ)
3. The Contact page displays `+1 (808) 444-1168` with `href="tel:+18084441168"`
4. The FAQ admissions answer text includes `+1 (808) 444-1168`
5. The JSON-LD structured data `telephone` field is `+18084441168`
6. The old number `+1 (808) 200-1840` / `+18082001840` does not appear in `src/` or `tests/`
7. Fax number `+1 (808) 670-1163` is unchanged

---

## Scope

What this plan covers:
- Replace display string `+1 (808) 200-1840` → `+1 (808) 444-1168` in all 5 source files
- Replace E.164 href `tel:+18082001840` → `tel:+18084441168` in all source files
- Update 5 unit test files and 3 e2e spec files that assert the old number
- Update memory file `memory/people/kriss-aseniero.md` phone field

What this plan does NOT cover:
- Centralizing phone into `constants.ts` (known issue #4, separate story)
- Fax number `+1 (808) 670-1163` / `+18086701163` (untouched by design)
- Historical docs under `prds/**` and `progress.txt` (frozen record)

---

## Code Touchpoints

Files and modules relevant to this story:

| File / Module | Relevance |
|---------------|-----------|
| `src/lib/structured-data.ts:7` | JSON-LD `telephone` field — E.164 format, AC #5 |
| `src/components/layout/footer.tsx:52,55` | Footer phone link + display text, AC #1 |
| `src/components/sections/cta-banner.tsx:31,34` | CTA banner phone link + display text, AC #2 |
| `src/app/contact/page.tsx:72,75` | Contact page phone link + display text, AC #3 |
| `src/lib/faq-data.ts:38` | FAQ admissions answer inline text, AC #4 |
| `tests/unit/contact-page.test.tsx` | Asserts `href="tel:+18082001840"` → must update |
| `tests/unit/footer.test.tsx` | Asserts href + display text → must update |
| `tests/unit/cta-banner.test.tsx` | Asserts display + href → must update |
| `tests/unit/structured-data.test.ts` | Asserts `telephone` value → must update |
| `tests/unit/faq-page.test.tsx` | Asserts admissions answer text → must update |
| `tests/e2e/structured-data.spec.ts` | E2E asserts JSON-LD telephone → must update |
| `tests/e2e/footer-contact.spec.ts` | E2E asserts footer phone link → must update |
| `tests/e2e/contact-info.spec.ts` | E2E asserts contact page phone link → must update |
| `memory/people/kriss-aseniero.md:11` | Kriss's profile phone field → keep in sync |

---

## Approach

High-level implementation strategy:

1. **Source edits** — replace both formats in 5 source files:
   - `+1 (808) 200-1840` → `+1 (808) 444-1168` (display string)
   - `tel:+18082001840` → `tel:+18084441168` (href attribute)
   - `'+18082001840'` → `'+18084441168'` (JS string in structured-data.ts)
2. **Test updates** — update 8 test files so assertions point to the new number (same two formats)
3. **Memory file** — update `memory/people/kriss-aseniero.md` phone field
4. **Health check** — run `npm run lint -- --fix && npm run type-check && npm test -- --run`
5. **Verify clean** — `grep -rE "200[-. ]?1840|18082001840" src tests` must return empty; fax `670-1163` still present

Key decisions:
- Phone is NOT centralized — in-place replacement per file, matching the pattern of PRDs 004 and 005
- Two formats must both be updated: display `(808) 444-1168` and E.164 `+18084441168`
- Tests assert exact strings — update assertions, do NOT delete tests

---

## Dependencies

| Dependency | Type | Notes |
|------------|------|-------|
| None | — | No external dependencies identified. Purely a string replacement. |

---

## Test Plan per AC

| AC | Test Type | File | Scenario |
|----|-----------|------|----------|
| AC 1: footer `+1 (808) 444-1168` + `tel:+18084441168` | Unit + E2E | `footer.test.tsx`, `footer-contact.spec.ts` | Render Footer → assert link text and href contain new number; old number absent |
| AC 2: CTA banner `+1 (808) 444-1168` + `tel:+18084441168` | Unit | `cta-banner.test.tsx` | Render CtaBanner → assert display text and tel: href contain new number |
| AC 3: Contact page `+1 (808) 444-1168` + `tel:+18084441168` | Unit + E2E | `contact-page.test.tsx`, `contact-info.spec.ts` | Render ContactPage → assert link text and href; E2E navigates to /contact |
| AC 4: FAQ admissions text includes `+1 (808) 444-1168` | Unit | `faq-page.test.tsx` | Render FAQ data → assert admissions answer string contains new number |
| AC 5: JSON-LD `telephone` = `+18084441168` | Unit + E2E | `structured-data.test.ts`, `structured-data.spec.ts` | Parse JSON-LD → assert telephone field equals new E.164 |
| AC 6: old number absent from `src/` and `tests/` | Grep verification | all | `grep -rE "200[-. ]?1840|18082001840" src tests` returns empty |
| AC 7: fax `+1 (808) 670-1163` unchanged | Grep spot-check | `footer.tsx`, `contact/page.tsx`, `structured-data.ts` | `grep 670-1163` still returns 3 matches |

---

## Open Questions

No open questions. All file locations, line numbers, and replacement values are precisely known.
