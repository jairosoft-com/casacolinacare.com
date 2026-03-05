# Contact Information Update & Fax Addition - Business Requirements Document

## 1. Document Control

| Version | Date       | Author | Sponsor                             | Status |
| ------- | ---------- | ------ | ----------------------------------- | ------ |
| 1.0     | 2026-02-15 | @jairo | Kriss (Owner, Casa Colina Care LLC) | Draft  |

---

## 2. Executive Summary

The Casa Colina Care website currently displays incorrect contact information
across all pages: a placeholder phone number that reaches no one, a misspelled
street name, and an incorrect postal city. Additionally, the business fax number
is absent from the site entirely. These errors undermine visitor trust, prevent
phone inquiries, and degrade local SEO accuracy through incorrect schema.org
structured data.

This initiative corrects all contact data site-wide (phone, street, city) and
adds the fax number to both the Contact page and structured data. The scope is
limited to static string replacements across 5 files with zero logic changes,
making this a low-risk, high-impact correction. Target completion is same-day
(2026-02-14).

**Expected Outcome:** 100% accurate contact information across all pages,
structured data, and LLM context files, enabling visitors to reach the facility
and improving Google Knowledge Panel accuracy.

---

## 3. Business Problem & Strategic Fit

### Current State

Casa Colina Care LLC operates a marketing website at casacolinacare.com
targeting adult children (ages 35-65) researching care options for aging
parents. The site has 4 pages (Home, About, FAQ, Contact) and relies on
phone/email inquiries as the primary conversion path.

Currently:

- **Phone number:** All instances display `+1 (800) 888-8888` -- a placeholder
  that does not connect to the business
- **Street name:** Misspelled as "Anapalua" instead of the correct "Anapalau" in
  all 4 postal address locations
- **City field:** Shows "Hawaii Kai" (a neighborhood) instead of the
  USPS-correct city "Honolulu"
- **Fax number:** Not listed anywhere on the site or in structured data
- **schema.org JSON-LD:** Contains all of the above errors, feeding incorrect
  data to search engines

### Problem Statement

Visitors who find Casa Colina Care through search or direct navigation cannot
reach the facility by phone because the displayed number is a dead-end
placeholder. The misspelled street name and incorrect city designation in both
display text and schema.org structured data erode trust with visitors and
degrade the accuracy of Google's Knowledge Panel and local search results.

For a care home where trust and accessibility are paramount to converting
inquiries, these errors directly impede the business's ability to receive and
respond to prospective client outreach.

### Root Cause

The website was initially built with placeholder contact data during
development. The placeholder phone number was never replaced with the real
business number before deployment. The street name typo ("Anapalua" vs.
"Anapalau") was introduced during initial content entry and propagated to all
address locations. The city field used the colloquial neighborhood name "Hawaii
Kai" instead of the USPS-standard city "Honolulu." The fax number was simply
never included in the original site build.

---

## 4. Business Objectives & Success Metrics

| Objective ID | SMART Objective                                                                                                        | KPI                                                              | Current | Target |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- | ------ |
| OBJ-01       | Replace 100% of placeholder phone numbers with the real business number (`+1 (808) 200-1840`) by end of day 2026-02-14 | Count of old phone number instances in `src/`                    | >0      | 0      |
| OBJ-02       | Correct 100% of street name misspellings from "Anapalua" to "Anapalau" in address contexts by end of day 2026-02-14    | Count of "Anapalua" instances in `src/`                          | >0      | 0      |
| OBJ-03       | Update postal city from "Hawaii Kai" to "Honolulu" in all address/structured data contexts by end of day 2026-02-14    | Count of "Hawaii Kai" in postal address fields                   | >0      | 0      |
| OBJ-04       | Add fax number (`+1 (808) 670-1163`) to the Contact page and schema.org structured data by end of day 2026-02-14       | Fax number visible on Contact page and in JSON-LD                | No      | Yes    |
| OBJ-05       | Maintain zero build/lint/type-check errors after all changes                                                           | `npm run build`, `npm run lint`, `npm run type-check` exit codes | 0       | 0      |

### Golden Thread: Objectives to Requirements

| Business Objective           | Functional Requirements | User Stories                   |
| ---------------------------- | ----------------------- | ------------------------------ |
| OBJ-01: Correct phone number | FR-01                   | US-001, US-002                 |
| OBJ-02: Fix street spelling  | FR-04                   | US-001, US-002, US-003, US-004 |
| OBJ-03: Correct postal city  | FR-05                   | US-001, US-002, US-003, US-004 |
| OBJ-04: Add fax number       | FR-02, FR-03            | US-001, US-002                 |
| OBJ-05: Build integrity      | NFR-01, NFR-02, NFR-03  | All                            |

---

## 5. Project Scope

### In Scope

- Replace placeholder phone number with real business number in schema.org
  JSON-LD and Contact page
- Add fax number to schema.org structured data (`faxNumber` property) and
  Contact page (new contact block)
- Correct street name spelling ("Anapalua" to "Anapalau") in all 4 address
  locations
- Update postal city from "Hawaii Kai" to "Honolulu" in all address/structured
  data contexts
- Append neighborhood label "(Hawaii Kai)" to street line in display contexts
  (Contact page, Footer, FAQ, llms.txt)
- Update `public/llms.txt` with corrected address

### Out of Scope

- **Marketing copy:** ~30 references to "Hawaii Kai" in hero sections, about
  page, testimonials, service descriptions, and meta descriptions remain
  unchanged
- **Form validation:** Contact form phone validation regex in `contact-form.tsx`
  and `route.ts` is not modified
- **Email templates:** The `email.ts` phone field template is dynamic and not
  hardcoded
- **New icon imports:** Fax block reuses the existing `Phone` icon from
  lucide-react
- **Geo-coordinates:** Latitude/longitude in schema.org structured data are not
  changed
- **Other PRD directories:** Only source code and public files are modified

---

## 6. Stakeholder Analysis (RACI)

| Stakeholder                          | Role                                  | RACI                                                              |
| ------------------------------------ | ------------------------------------- | ----------------------------------------------------------------- |
| Kriss                                | Business Owner, Casa Colina Care LLC  | A (Accountable) - Provided correct contact data, approves changes |
| @jairo                               | PM/Developer                          | R (Responsible) - Implements all changes                          |
| Search Engine Crawlers               | Automated consumer of structured data | I (Informed) - Will re-index updated data                         |
| Site Visitors (Adult Children 35-65) | End users seeking care information    | I (Informed) - Will see corrected contact info                    |

---

## 7. Assumptions, Constraints, Dependencies

### Assumptions

- The phone number `+1 (808) 200-1840` and fax number `+1 (808) 670-1163` are
  confirmed correct by the business owner
- The correct street spelling is "Anapalau" (not "Anapalua") per USPS records
- "Honolulu" is the correct USPS city for zip code 96825 (Hawaii Kai is a
  neighborhood within Honolulu)
- The `LocalBusiness` schema.org type supports the `faxNumber` property as a
  standard field
- All changes are static string replacements with no logic modifications
  required

### Constraints

- **Timeline:** Same-day implementation and deployment (2026-02-14)
- **Budget:** $0 incremental cost -- developer time only
- **Technical:** Changes must not break existing build, lint, or type-check
  pipelines
- **SEO:** schema.org JSON-LD must remain valid per Google Rich Results Test
  after changes

### Dependencies

- No external dependencies -- all changes are to existing static content in the
  codebase
- Vercel deployment pipeline must be operational for production push

---

## 8. Financial Analysis

- **Costs:** $0 incremental (internal developer time, < 1 hour of work)
- **Benefits:**
  - Enables phone inquiries (currently blocked by placeholder number)
  - Improves local SEO accuracy through correct structured data
  - Builds visitor trust through accurate, professional contact information
  - Adds fax as an additional contact channel for referral partners
- **ROI:** Effectively infinite -- fixing a blocking error at zero incremental
  cost
- **Payback:** Immediate upon deployment

### Risk Assessment

| Risk ID | Risk                                                      | Likelihood (1-5) | Impact (1-5) | Mitigation                                                                                             |
| ------- | --------------------------------------------------------- | ---------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| RISK-01 | Typo introduced during string replacement                 | 1                | 3            | Acceptance criteria specify exact strings; build/lint/type-check gates catch errors                    |
| RISK-02 | Marketing references to "Hawaii Kai" accidentally changed | 1                | 2            | Out-of-scope section explicitly excludes marketing copy; changes are targeted to address contexts only |
| RISK-03 | schema.org JSON-LD becomes invalid after changes          | 1                | 3            | Validate against Google Rich Results Test post-deployment                                              |
| RISK-04 | Deployment pipeline fails                                 | 1                | 2            | Standard Vercel deployment; rollback available                                                         |

---

## 9. Approval

| Role                     | Name   | Signature | Date |
| ------------------------ | ------ | --------- | ---- |
| Business Owner / Sponsor | Kriss  |           |      |
| PM / Developer           | @jairo |           |      |
