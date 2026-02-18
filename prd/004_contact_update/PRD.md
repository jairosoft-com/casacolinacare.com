# Contact Information Update & Fax Addition

## Unified BRD-PRD

---

## 1. Project Snapshot

| Attribute            | Details                                   |
| -------------------- | ----------------------------------------- |
| **Project Name**     | CasaColinaCare.com                        |
| **Feature Name**     | Contact Information Update & Fax Addition |
| **Feature ID**       | 12345                                     |
| **Document Type**    | Unified BRD-PRD                           |
| **Status**           | Draft                                     |
| **Core Team**        | @jairo (PM/Dev)                           |
| **Target Release**   | 2026-02-14                                |
| **Document Version** | 2.0                                       |
| **Last Updated**     | 2026-02-15                                |
| **Product Manager**  | Jairo                                     |
| **Product Owner**    | Jairo                                     |
| **Reference Spec**   | [`TECH_SPEC.md`](TECH_SPEC.md)            |

---
 
## 2. Strategic Context

### Problem Statement

The Casa Colina Care website displays incorrect contact information across multiple pages and structured data. Visitors cannot reach the facility by phone, and search engines index inaccurate business data.

**Quantitative Evidence:**

- 100% of phone-number displays show a placeholder (`+1 (800) 888-8888`) instead of the real business number (`+1 (808) 200-1840`)
- The street name is misspelled in all 4 postal address locations (`Anapalua` instead of `Anapalau`)
- The postal city field shows `Hawaii Kai` (a neighborhood) instead of the correct USPS city `Honolulu`
- The business fax number (`+1 (808) 670-1163`) is not listed anywhere on the site

**Qualitative Evidence:**

- Visitors attempting to call the facility reach a dead-end placeholder number, blocking the primary conversion path (phone inquiry)
- Incorrect address data in schema.org structured data may degrade Google Knowledge Panel accuracy and local SEO rankings
- Missing fax number prevents referral partners and medical professionals from sending documents

---

## 3. Business Objectives

| ID | Objective | Success Metric | Measurement |
|----|-----------|---------------|-------------|
| OBJ-01 | Eliminate all placeholder phone numbers from the site so visitors can reach the facility | 0 instances of `8008888888` in `src/` | `grep -r '8008888888' src/` returns no results |
| OBJ-02 | Correct all misspelled street names so visitors and search engines have accurate address data | 0 instances of `Anapalua` in `src/` | `grep -r 'Anapalua' src/` returns no results |
| OBJ-03 | Add fax number to the site so referral partners can send documents | Fax number displayed on Contact page and in schema.org JSON-LD | Visual inspection + Google Rich Results Test |
| OBJ-04 | Use correct USPS postal city (`Honolulu`) in all postal address contexts | 0 instances of `Hawaii Kai` used as a postal city in `src/` | `grep` for `Hawaii Kai, HI` in postal address contexts returns no results |
| OBJ-05 | Maintain build, lint, and type-check integrity after all changes | `npm run build`, `npm run lint`, `npm run type-check` all exit with code 0 | CI pipeline |

---

## 4. Target Users

**Primary Persona:** Adult Children (35-65)

- **Goals:** Find accurate contact information to reach Casa Colina Care about their aging parent's care needs
- **Pain Points:** Placeholder phone number prevents them from calling; incorrect address could cause confusion when planning visits

**Secondary Persona:** Search Engine Crawlers

- **Goals:** Index accurate business data from schema.org structured data
- **Pain Points:** Incorrect phone, address, and missing fax in JSON-LD degrades Knowledge Panel accuracy

---

## 5. Functional Requirements

| Req ID | Requirement | Supports | Files Affected |
|--------|-------------|----------|----------------|
| FR-01 | Replace phone `+1 (800) 888-8888` (E.164: `+18008888888`) with `+1 (808) 200-1840` (E.164: `+18082001840`) in schema.org structured data, Contact page, footer, and FAQ admissions answer | US-001, US-002, US-003, US-004 | `layout.tsx`, `contact/page.tsx`, `footer.tsx`, `faq/page.tsx` |
| FR-02 | Add fax number `+1 (808) 670-1163` (E.164: `+18086701163`) as `faxNumber` property in schema.org JSON-LD, positioned after `telephone` and before `email` | US-001 | `layout.tsx` |
| FR-03 | Add fax as non-clickable plain text on Contact page between Phone and Email blocks, with `Phone` icon, label "Fax", and matching visual style. The fax number must NOT be wrapped in an `<a>` tag | US-002 | `contact/page.tsx` |
| FR-04 | Add fax number as non-clickable plain text in footer contact section. The fax number must NOT be wrapped in an `<a>` tag | US-003 | `footer.tsx` |
| FR-05 | Replace misspelled street `189 Anapalua Street` with `189 Anapalau Street` in all 4 postal address locations | US-001, US-002, US-003, US-004 | `layout.tsx`, `contact/page.tsx`, `footer.tsx`, `faq/page.tsx` |
| FR-06 | Replace city `Hawaii Kai` with `Honolulu` in all postal address contexts (not marketing copy) | US-001, US-002, US-003, US-004 | `layout.tsx`, `contact/page.tsx`, `footer.tsx`, `faq/page.tsx` |
| FR-07 | Append neighborhood label `(Hawaii Kai)` to street line in display contexts only: Contact page, footer, FAQ answer, `llms.txt` | US-002, US-003, US-004, US-005 | `contact/page.tsx`, `footer.tsx`, `faq/page.tsx`, `llms.txt` |
| FR-08 | Do NOT include `(Hawaii Kai)` in schema.org structured data (no standard field exists for neighborhood) | US-001 | `layout.tsx` |
| FR-09 | Update `llms.txt` postal address to reflect corrected street name and neighborhood label | US-005 | `public/llms.txt` |

---

## 6. User Stories & Acceptance Criteria

### Must-Have (MoSCoW)

---

### US-001: Update Schema.org Structured Data — Phone, Fax, Address

**As a** search engine crawler
**I want** accurate phone, fax, and address data in the JSON-LD structured data
**So that** Google Knowledge Panel and local search results display correct contact information

**Priority:** Must-Have
**File:** `src/app/layout.tsx`

**Action (Technical Steps):**

All changes are in the `jsonLd` object literal in `src/app/layout.tsx`:

1. **Update telephone** (~line 43):
   - Change `telephone: '+18008888888'` to `telephone: '+18082001840'`

2. **Insert faxNumber** (new line after telephone, before email ~line 44):
   - Add `faxNumber: '+18086701163',` immediately after the `telephone` line
   - The `email` property must remain on the next line after `faxNumber`

3. **Update streetAddress** (~line 47):
   - Change `streetAddress: '189 Anapalua Street'` to `streetAddress: '189 Anapalau Street'`
   - Do NOT append `(Hawaii Kai)` — schema.org has no standard neighborhood field

4. **Update addressLocality** (~line 48):
   - Change `addressLocality: 'Hawaii Kai'` to `addressLocality: 'Honolulu'`

**Result (Expected State After Changes):**

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Casa Colina Care',
  // ...
  telephone: '+18082001840',
  faxNumber: '+18086701163',
  email: 'kriss@casacolinacare.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '189 Anapalau Street',
    addressLocality: 'Honolulu',
    addressRegion: 'HI',
    postalCode: '96825',
    addressCountry: 'US',
  },
  // ...
};
```

**Acceptance Criteria:**

- [ ] AC-001-01: The `telephone` field in JSON-LD is `'+18082001840'` and the old value `'+18008888888'` does not exist anywhere in the file
- [ ] AC-001-02: The `faxNumber` field in JSON-LD is `'+18086701163'` and is positioned after `telephone` and before `email`
- [ ] AC-001-03: The `streetAddress` field is `'189 Anapalau Street'` with no `(Hawaii Kai)` appended, and old value `'189 Anapalua Street'` does not exist
- [ ] AC-001-04: The `addressLocality` field is `'Honolulu'` and old value `'Hawaii Kai'` does not exist in `PostalAddress`
- [ ] AC-001-05: Typecheck passes (`npm run type-check` exits 0)
- [ ] AC-001-06: Lint passes (`npm run lint` exits 0)
- [ ] AC-001-07: Unit test added (`tests/unit/layout-schema.test.tsx`) and passes
- [ ] AC-001-08: E2E test added (`tests/e2e/schema-org.spec.ts`) and passes

**Validates:** OBJ-01, OBJ-02, OBJ-03, OBJ-04, OBJ-05

---

### US-002: Update Contact Page — Phone, Fax, and Address

**As a** visitor on the Contact page
**I want** to see the correct phone number, a fax number, and the updated address
**So that** I can reach the facility through the right channels

**Priority:** Must-Have
**File:** `src/app/contact/page.tsx`

**Action (Technical Steps):**

All changes are in `src/app/contact/page.tsx`. The `Phone` icon is already imported from `lucide-react` — no new imports needed.

1. **Update phone href** (~line 72):
   - Change `href="tel:+18008888888"` to `href="tel:+18082001840"`

2. **Update phone display text** (~line 75):
   - Change `+1 (800) 888-8888` to `+1 (808) 200-1840`

3. **Insert fax block** (after the Phone block ending ~line 78, before the Email block starting ~line 80):
   - Create a new `<div>` with identical structure and className to the Phone block
   - Use the `Phone` icon (already imported) with same styling: `className="mt-1 h-5 w-5 shrink-0 text-primary"` and `aria-hidden="true"`
   - Label `<p>`: `"Fax"`
   - Display the number as plain `<p>` text with `className="text-muted-foreground"` — NOT wrapped in an `<a>` tag

4. **Update street address** (~line 104):
   - Change `189 Anapalua Street` to `189 Anapalau Street (Hawaii Kai)`

5. **Update city** (~line 106):
   - Change `Hawaii Kai, HI 96825` to `Honolulu, HI 96825`

**Result (Fax Block JSX to Insert):**

```tsx
{/* Fax */}
<div className="flex items-start gap-4">
  <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
  <div>
    <p className="font-medium">Fax</p>
    <p className="text-muted-foreground">+1 (808) 670-1163</p>
  </div>
</div>
```

**Acceptance Criteria:**

- [ ] AC-002-01: Phone link `href` is `'tel:+18082001840'` and display text is `'+1 (808) 200-1840'`; old phone `'+1 (800) 888-8888'` does not exist
- [ ] AC-002-02: Fax block exists between Phone and Email blocks with display text `'+1 (808) 670-1163'`
- [ ] AC-002-03: Fax number is rendered as plain text (NOT wrapped in an `<a>` tag) and is NOT a clickable link
- [ ] AC-002-04: Fax block uses the `Phone` icon from lucide-react, has label `"Fax"`, and styling matches the Phone block
- [ ] AC-002-05: Street address displays `'189 Anapalau Street (Hawaii Kai)'`
- [ ] AC-002-06: City displays `'Honolulu, HI 96825'`
- [ ] AC-002-07: Typecheck passes (`npm run type-check` exits 0)
- [ ] AC-002-08: Lint passes (`npm run lint` exits 0)
- [ ] AC-002-09: Unit test added (`tests/unit/contact-page.test.tsx`) and passes
- [ ] AC-002-10: E2E test added (`tests/e2e/contact-info.spec.ts`) and passes
- [ ] AC-002-11: Verified in browser using dev-browser skill

**Validates:** OBJ-01, OBJ-02, OBJ-03, OBJ-04, OBJ-05

---

### US-003: Update Footer — Phone, Fax, and Address

**As a** visitor on any page
**I want** the footer to show the correct phone number, fax number, street address, and city
**So that** I have accurate contact and location information available site-wide

**Priority:** Must-Have
**File:** `src/components/layout/footer.tsx`

**Action (Technical Steps):**

All changes are in `src/components/layout/footer.tsx`. The footer has two sections with contact data: a business info `<address>` block and a "Contact" section with links.

1. **Update street address** (~line 21, inside `<address>` block):
   - Change `<p>189 Anapalua Street</p>` to `<p>189 Anapalau Street (Hawaii Kai)</p>`

2. **Update city** (~line 22, inside `<address>` block):
   - Change `<p>Hawaii Kai, HI 96825</p>` to `<p>Honolulu, HI 96825</p>`

3. **Update phone href** (~line 52, inside Contact section):
   - Change `href="tel:+18008888888"` to `href="tel:+18082001840"`

4. **Update phone display text** (~line 55):
   - Change `+1 (800) 888-8888` to `+1 (808) 200-1840`

5. **Insert fax entry** (after the phone `<p>` block ending ~line 57, before the email `<p>` block starting ~line 59):
   - Add a new `<p>` containing the fax label and number as plain text — NOT wrapped in an `<a>` tag
   - The footer does not use lucide-react icons for contact items, so no icon is needed here

**Result (Fax Entry JSX to Insert in Contact Section):**

```tsx
<p>
  <span className="text-foreground">Fax: </span>
  +1 (808) 670-1163
</p>
```

**Result (Updated Address Block):**

```tsx
<address className="mt-3 space-y-1 text-sm not-italic text-muted-foreground">
  <p>189 Anapalau Street (Hawaii Kai)</p>
  <p>Honolulu, HI 96825</p>
</address>
```

**Acceptance Criteria:**

- [ ] AC-003-01: Footer phone link `href` is `'tel:+18082001840'` and display text is `'+1 (808) 200-1840'`; old phone does not exist
- [ ] AC-003-02: Footer fax entry exists with display text `'+1 (808) 670-1163'` and label `"Fax"`
- [ ] AC-003-03: Footer fax number is rendered as plain text (NOT wrapped in an `<a>` tag) and is NOT a clickable link
- [ ] AC-003-04: Footer street address displays `'189 Anapalau Street (Hawaii Kai)'`; old street does not exist
- [ ] AC-003-05: Footer city displays `'Honolulu, HI 96825'`; old value `'Hawaii Kai, HI 96825'` does not exist
- [ ] AC-003-06: Typecheck passes (`npm run type-check` exits 0)
- [ ] AC-003-07: Lint passes (`npm run lint` exits 0)
- [ ] AC-003-08: Unit test added (`tests/unit/footer.test.tsx`) and passes
- [ ] AC-003-09: E2E test added (`tests/e2e/footer-contact.spec.ts`) and passes
- [ ] AC-003-10: Verified in browser using dev-browser skill

**Validates:** OBJ-01, OBJ-02, OBJ-03, OBJ-04, OBJ-05

---

### US-004: Update FAQ Location Answer

**As a** visitor reading the FAQ
**I want** the "Where are you located?" answer to show the correct address
**So that** I have accurate location information when planning a visit

**Priority:** Must-Have
**File:** `src/app/faq/page.tsx`

**Action (Technical Steps):**

All changes are in `src/app/faq/page.tsx`. The FAQ data is stored as an array of `{ question, answer }` objects.

1. **Update location answer** (~line 36, "Where is Casa Colina Care located?" answer):
   - Change: `'We are located at 189 Anapalua Street in beautiful Hawaii Kai, HI 96825. Our home is nestled...'`
   - To: `'We are located at 189 Anapalau Street (Hawaii Kai), Honolulu, HI 96825. Our home is nestled...'`
   - Only the address portion changes. The rest of the sentence (`Our home is nestled...`) remains unchanged.

2. **Update phone in admissions answer** (~line 51, "How do I begin the admissions process?" answer):
   - Change: `'+1 (800) 888-8888'` to `'+1 (808) 200-1840'`
   - This is within the answer string: `'...by calling us at +1 (808) 200-1840, emailing...'`

3. **Preserve marketing copy** — Do NOT modify any other references to "Hawaii Kai" in other FAQ answers, question text, or meta descriptions. Only postal address contexts change.

**Acceptance Criteria:**

- [ ] AC-004-01: Location answer reads `'We are located at 189 Anapalau Street (Hawaii Kai), Honolulu, HI 96825.'` and old address text does not exist
- [ ] AC-004-02: Admissions answer phone reads `'+1 (808) 200-1840'` and old phone `'+1 (800) 888-8888'` does not exist
- [ ] AC-004-03: Marketing-style references to Hawaii Kai in other FAQ answers remain unchanged
- [ ] AC-004-04: Typecheck passes (`npm run type-check` exits 0)
- [ ] AC-004-05: Lint passes (`npm run lint` exits 0)
- [ ] AC-004-06: Unit test added (`tests/unit/faq-page.test.tsx`) and passes
- [ ] AC-004-07: Verified in browser using dev-browser skill

**Validates:** OBJ-01, OBJ-02, OBJ-04, OBJ-05

---

### US-005: Update LLM Context File

**As an** LLM consuming the llms.txt file
**I want** the address to be accurate
**So that** I can provide correct information about the facility location

**Priority:** Must-Have
**File:** `public/llms.txt`

**Action (Technical Steps):**

Single line change in `public/llms.txt`:

1. **Update postal address** (~line 7):
   - Change: `- The postal address of the facility is 189 Anapalua Street, Honolulu, HI`
   - To: `- The postal address of the facility is 189 Anapalau Street (Hawaii Kai), Honolulu, HI`
   - No other lines in the file are modified.

**Verification Steps:**

- **Local:** Run `npm run dev`, then open `http://localhost:3000/llms.txt` in a browser or `curl http://localhost:3000/llms.txt`
- **Production:** After deploy, verify at `https://casacolinacare.com/llms.txt`
- **Expected:** HTTP 200, Content-Type includes `text/plain`, body contains corrected address

**Acceptance Criteria:**

- [ ] AC-005-01: Address line reads `'- The postal address of the facility is 189 Anapalau Street (Hawaii Kai), Honolulu, HI'` and old address line does not exist
- [ ] AC-005-02: No other lines in the file are modified
- [ ] AC-005-03: File is served at `/llms.txt` with HTTP 200 and Content-Type containing `text/plain`
- [ ] AC-005-04: E2E test added (`tests/e2e/llms-txt.spec.ts`) and passes

**Validates:** OBJ-02, OBJ-04

---

## 7. Non-Functional Requirements

| NFR ID | Category | Requirement | Supports | Test Method |
|--------|----------|-------------|----------|-------------|
| NFR-01 | Build Integrity | `npm run build` exits with code 0 after all changes | OBJ-05 | CI pipeline |
| NFR-02 | Code Quality | `npm run lint` exits with code 0 after all changes | OBJ-05 | CI pipeline |
| NFR-03 | Type Safety | `npm run type-check` exits with code 0 after all changes | OBJ-05 | CI pipeline |
| NFR-04 | SEO | schema.org JSON-LD validates against Google Rich Results Test with no errors | OBJ-01, OBJ-03 | Manual validation |
| NFR-05 | Regression | No runtime regressions — all changes are static string replacements with no logic changes | OBJ-05 | Visual smoke test of all 4 pages |

---

## 8. Technical Considerations

- **Schema.org:** `LocalBusiness` type supports `faxNumber` as a standard property — no custom extension needed
- **Icon Reuse:** The `Phone` icon from lucide-react is already imported in `contact/page.tsx` — the fax block reuses it without a new import
- **Fax Display:** The fax number must be rendered as plain text (not a `tel:` link) on both the Contact page and footer — fax numbers should not be clickable
- **Risk:** All changes are static string replacements with no logic changes — minimal risk of runtime regressions
- **Scope of changes:** 5 files modified, 0 files created, 0 files deleted

### Reference Values

| Data Point | Old (Incorrect) Value | New (Correct) Value |
|------------|----------------------|---------------------|
| Phone (display) | `+1 (800) 888-8888` | `+1 (808) 200-1840` |
| Phone (E.164) | `+18008888888` | `+18082001840` |
| Fax (display) | *(not present)* | `+1 (808) 670-1163` |
| Fax (E.164) | *(not present)* | `+18086701163` |
| Street | `189 Anapalua Street` | `189 Anapalau Street` |
| Street (display) | `189 Anapalua Street` | `189 Anapalau Street (Hawaii Kai)` |
| City (postal) | `Hawaii Kai` | `Honolulu` |

---

## 9. Testing Requirements

### Test Cases — Unit Tests (Vitest + React Testing Library)

Place test files in `/tests/unit/`. Run with `npm test -- --run`.

---

#### TC-001: Schema.org JSON-LD contains correct phone number

**Validates:** US-001, AC-001-01
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Schema.org JSON-LD contains correct phone number
  Given the root layout is rendered
  When I extract the JSON-LD script content
  Then the telephone field is '+18082001840'
```

---

#### TC-002: Schema.org JSON-LD contains fax number

**Validates:** US-001, AC-001-02
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Schema.org JSON-LD contains fax number
  Given the root layout is rendered
  When I extract the JSON-LD script content
  Then the faxNumber field is '+18086701163'
```

---

#### TC-003: Schema.org address uses Honolulu (not Hawaii Kai)

**Validates:** US-001, AC-001-03, AC-001-04
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Schema.org address uses Honolulu
  Given the root layout is rendered
  When I extract the JSON-LD PostalAddress
  Then addressLocality is 'Honolulu'
  And streetAddress is '189 Anapalau Street'
  And streetAddress does not contain '(Hawaii Kai)'
```

---

#### TC-004: Contact page phone number renders with correct href

**Validates:** US-002, AC-002-01
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Phone number renders with correct href
  Given the Contact page is rendered
  When I query the phone link
  Then the link href is 'tel:+18082001840'
  And the link text contains '(808) 200-1840'
```

---

#### TC-005: Contact page fax number renders as plain text (not a link)

**Validates:** US-002, AC-002-02, AC-002-03, AC-002-04
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Fax number renders as plain text (not a link)
  Given the Contact page is rendered
  When I query the fax section
  Then the fax text contains '(808) 670-1163'
  And there is no <a> tag wrapping the fax number
  And the fax label text is 'Fax'
```

---

#### TC-006: Contact page fax block positioned between Phone and Email

**Validates:** US-002, AC-002-02
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Fax block is positioned between Phone and Email
  Given the Contact page is rendered
  When I inspect the order of contact blocks
  Then the fax block appears after the phone block
  And the fax block appears before the email block
```

---

#### TC-007: Contact page street address displays with neighborhood label

**Validates:** US-002, AC-002-05
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Street address displays with neighborhood label
  Given the Contact page is rendered
  When I query the address section
  Then the text contains '189 Anapalau Street (Hawaii Kai)'
```

---

#### TC-008: Contact page city displays as Honolulu

**Validates:** US-002, AC-002-06
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: City displays as Honolulu
  Given the Contact page is rendered
  When I query the address section
  Then the text contains 'Honolulu, HI 96825'
  And the text does not contain 'Hawaii Kai, HI 96825'
```

---

#### TC-009: Contact page old placeholder phone number does not exist

**Validates:** US-002, AC-002-01
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Old placeholder phone number does not exist
  Given the Contact page is rendered
  When I search the rendered output
  Then the text does not contain '(800) 888-8888'
```

---

#### TC-010: Footer phone number renders with correct href

**Validates:** US-003, AC-003-01
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Footer phone number renders with correct href
  Given the Footer component is rendered
  When I query the phone link
  Then the link href is 'tel:+18082001840'
  And the link text contains '(808) 200-1840'
```

---

#### TC-011: Footer fax number renders as plain text (not a link)

**Validates:** US-003, AC-003-02, AC-003-03
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Footer fax number renders as plain text (not a link)
  Given the Footer component is rendered
  When I query the fax section
  Then the fax text contains '(808) 670-1163'
  And there is no <a> tag wrapping the fax number
```

---

#### TC-012: Footer street address displays with neighborhood label

**Validates:** US-003, AC-003-04
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Footer street address displays with neighborhood label
  Given the Footer component is rendered
  When I query the address section
  Then the text contains '189 Anapalau Street (Hawaii Kai)'
```

---

#### TC-013: Footer city displays as Honolulu

**Validates:** US-003, AC-003-05
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Footer city displays as Honolulu
  Given the Footer component is rendered
  When I query the address section
  Then the text contains 'Honolulu, HI 96825'
```

---

#### TC-014: Footer does not contain old placeholder phone

**Validates:** US-003, AC-003-01
**Test Type:** Unit
**Framework:** Vitest + React Testing Library

```gherkin
Scenario: Footer does not contain old placeholder phone
  Given the Footer component is rendered
  When I search the rendered output
  Then the text does not contain '(800) 888-8888'
```

---

### Test Cases — E2E Tests (Playwright)

Place test files in `/tests/e2e/`. Run with `npm run test:e2e`.

---

#### TC-015: Contact page phone link is clickable with correct href

**Validates:** US-002, AC-002-01
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: Contact page phone link is clickable with correct href
  Given I navigate to /contact
  When I locate the phone link
  Then the link has href 'tel:+18082001840'
  And the link is visible
```

---

#### TC-016: Contact page fax number is visible but not clickable

**Validates:** US-002, AC-002-02, AC-002-03
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: Contact page fax number is visible but not clickable
  Given I navigate to /contact
  When I locate the fax number text '+1 (808) 670-1163'
  Then the fax text is visible
  And the fax text is NOT inside a link element
```

---

#### TC-017: Contact page displays correct address

**Validates:** US-002, AC-002-05, AC-002-06
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: Contact page displays correct address
  Given I navigate to /contact
  Then the page contains text '189 Anapalau Street (Hawaii Kai)'
  And the page contains text 'Honolulu, HI 96825'
  And the page does not contain text '189 Anapalua Street'
  And the page does not contain text '(800) 888-8888'
```

---

#### TC-018: Footer phone link is correct on every page

**Validates:** US-003, AC-003-01
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: Footer phone link is correct on every page
  Given I navigate to each page: /, /about, /faq, /contact
  When I locate the footer phone link
  Then the link has href 'tel:+18082001840'
  And the link text contains '(808) 200-1840'
```

---

#### TC-019: Footer fax number is visible but not clickable on every page

**Validates:** US-003, AC-003-02, AC-003-03
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: Footer fax number is visible but not clickable on every page
  Given I navigate to each page: /, /about, /faq, /contact
  When I locate the footer fax text
  Then the fax text is visible
  And the fax text is NOT inside a link element
```

---

#### TC-020: Footer displays correct address on every page

**Validates:** US-003, AC-003-04, AC-003-05
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: Footer displays correct address on every page
  Given I navigate to each page: /, /about, /faq, /contact
  Then the footer contains '189 Anapalau Street (Hawaii Kai)'
  And the footer contains 'Honolulu, HI 96825'
```

---

#### TC-021: Schema.org JSON-LD is valid and contains correct data

**Validates:** US-001, AC-001-01, AC-001-02, AC-001-03, AC-001-04
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: Schema.org JSON-LD is valid and contains correct data
  Given I navigate to /
  When I extract the JSON-LD script tag content
  Then it parses as valid JSON
  And telephone is '+18082001840'
  And faxNumber is '+18086701163'
  And address.streetAddress is '189 Anapalau Street'
  And address.addressLocality is 'Honolulu'
```

---

#### TC-022: llms.txt is accessible and contains correct address

**Validates:** US-005, AC-005-01, AC-005-03
**Test Type:** E2E
**Framework:** Playwright

```gherkin
Scenario: llms.txt is accessible and contains correct address
  Given I send a GET request to /llms.txt
  Then the response status is 200
  And the response body contains '189 Anapalau Street (Hawaii Kai), Honolulu, HI'
  And the response body does not contain '189 Anapalua Street'
```

---

## 10. Open Questions & Decisions

| Question/Topic | Date Raised | Decision | Rationale | Date Decided |
|---------------|-------------|----------|-----------|--------------|
| All values and placement decisions | 2026-02-14 | Confirmed | Owner provided final values for phone, fax, address | 2026-02-14 |

---

## 11. Out of Scope (This Release)

- **No changes to marketing copy.** The ~30 references to "Hawaii Kai" in hero sections, about page, testimonials, service descriptions, and meta descriptions remain unchanged
- **No changes to form validation.** The contact form phone validation regex in `contact-form.tsx` and `route.ts` is not modified
- **No changes to email templates.** The `email.ts` phone field template is dynamic and not hardcoded
- **No new icon imports.** The fax block reuses the existing `Phone` icon from lucide-react
- **No footer layout changes.** Footer structure stays the same; only contact data values and fax addition change
- **No geo-coordinate updates.** The latitude/longitude in schema.org structured data are not changed
- **No changes to files in other PRD directories.** Only source code and public files are modified

---

## 12. Release Plan

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| PRD Approved | 2026-02-14 | Draft |
| Implementation | 2026-02-14 | Pending |
| Build, Lint & Type-Check Verification | 2026-02-14 | Pending |
| Visual QA (all 4 pages) | 2026-02-14 | Pending |
| Deploy to Production | 2026-02-14 | Pending |

---

## 13. Golden Thread Traceability Matrix

| Business Objective | User Stories | Acceptance Criteria | Test Cases |
|-------------------|-------------|-------------------|------------|
| OBJ-01: Eliminate placeholder phone numbers | US-001, US-002, US-003, US-004 | AC-001-01, AC-002-01, AC-003-01, AC-004-02 | TC-001, TC-004, TC-009, TC-010, TC-014, TC-015, TC-018 |
| OBJ-02: Correct misspelled street names | US-001, US-002, US-003, US-004, US-005 | AC-001-03, AC-002-05, AC-003-04, AC-004-01, AC-005-01 | TC-003, TC-007, TC-012, TC-017, TC-020, TC-022 |
| OBJ-03: Add fax number to site | US-001, US-002, US-003 | AC-001-02, AC-002-02, AC-002-03, AC-002-04, AC-003-02, AC-003-03 | TC-002, TC-005, TC-006, TC-011, TC-016, TC-019, TC-021 |
| OBJ-04: Use correct USPS postal city | US-001, US-002, US-003, US-004, US-005 | AC-001-04, AC-002-06, AC-003-05, AC-004-01, AC-005-01 | TC-003, TC-008, TC-013, TC-017, TC-020, TC-022 |
| OBJ-05: Maintain build/lint/type integrity | US-001, US-002, US-003, US-004 | AC-001-05 through AC-001-08, AC-002-07 through AC-002-10, AC-003-06 through AC-003-09, AC-004-04 through AC-004-06 | All tests passing |

---

## Glossary

| Term | Definition |
|------|------------|
| E.164 | International telephone numbering format (e.g., `+18082001840`) |
| JSON-LD | JavaScript Object Notation for Linked Data — used for schema.org structured data |
| schema.org | Vocabulary for structured data recognized by major search engines |
| Hawaii Kai | Neighborhood in Honolulu, HI where Casa Colina Care is located |
| llms.txt | A text file providing context about the business for LLM consumption |
| MoSCoW | Prioritization framework: Must/Should/Could/Won't Have |
| Golden Thread | Unbroken traceability chain from business objectives through user stories, acceptance criteria, and test cases |
| INVEST | User story quality criteria: Independent, Negotiable, Valuable, Estimable, Small, Testable |
