# About Founder Name Correction

## Document Metadata

- **Feature ID**: 006
- **Feature Name**: about_founder_name
- **Document Type**: BRD_PRD

## Executive Summary

The Casa Colina Care About page currently displays the founder's name incorrectly. This feature corrects the public-facing About page and related documentation so that the site, technical specs, and downstream work tracking all use the correct founder name.

## Business Objectives

### OBJ-006-01: Display The Correct Founder Name
Ensure the About page shows the correct founder name to site visitors.

### OBJ-006-02: Remove Incorrect Internal References
Ensure documentation and local working artifacts no longer propagate the incorrect founder name.

## User Stories

### US-006-01: Update founder name in About page team section
**Description:** As a site visitor viewing the About page, I want to see the correct founder name so that I have accurate information about who runs the care home.

**Acceptance Criteria:**
- AC-006-01: The team array entry at index 0 has `name: 'Kriss Aseniero'`.
- AC-006-02: The string `Kriss Judd` does not appear anywhere in `src/app/about/page.tsx`.
- AC-006-03: Unit tests pass.
- AC-006-04: E2E tests pass.

**Validates:** OBJ-006-01

### US-006-02: Update documentation references
**Description:** As a developer or AI assistant working on the codebase, I want all documentation to reference the correct founder name so that the incorrect name does not propagate into future work.

**Acceptance Criteria:**
- AC-006-05: `CLAUDE.md` lists `Kriss Aseniero` instead of `Kriss Judd`.
- AC-006-06: `grep -r 'Kriss Judd' CLAUDE.md memory/` returns no results.
- AC-006-07: Lint passes.
- AC-006-08: Typecheck passes.

**Validates:** OBJ-006-02
