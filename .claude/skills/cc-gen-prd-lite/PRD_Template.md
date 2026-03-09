# PRD: {Feature Title}

## Document Metadata
- **Feature ID**: {feature_number}
- **Feature Name**: {feature_name}
- **Document Type**: PRD
- **Generated Date**: {YYYY-MM-DD}

## Overview
- **Feature ID:** {feature_number}
- **Feature Name:** Clear, descriptive title
- **Business Objective:** The "why" - what business goal does this support?
- **Success Metric:** How will we measure success? (Be specific)

## Problem Statement
- What problem are we solving?
- What evidence supports this problem? (data, research, feedback)
- Who experiences this problem?

## Goals
Specific, measurable objectives (3-5 bullet points):
- Use SMART format: Specific, Measurable, Achievable, Relevant, Time-bound
- Example: "Reduce average checkout time from 2:30 to <1:00 for returning users"

## User Stories

### US-{feature_number}-{seq}: [Descriptive Title]
**As a** [user type]
**I want** [feature/capability]
**So that** [benefit/value]

**Acceptance Criteria:**
- [ ] AC-{feature_number}-{seq}: Specific, verifiable criterion (use numbers, not vague terms)
- [ ] AC-{feature_number}-{seq}: Another measurable criterion
- [ ] AC-{feature_number}-{seq}: Error handling: [specific error scenario]
- [ ] AC-{feature_number}-{seq}: Lint passes
- [ ] AC-{feature_number}-{seq}: Typecheck passes
- [ ] AC-{feature_number}-{seq}: Unit tests pass
- [ ] AC-{feature_number}-{seq}: **[UI stories only]** E2E tests pass
- [ ] AC-{feature_number}-{seq}: **[UI stories only]** Verify in browser using dev-browser skill

**Validates:** [Link back to business objective or goal]

## Functional Requirements

- FR-{feature_number}-{seq}: The system must [specific action with measurable outcome] *(Supports US-{feature_number}-{seq})*
- FR-{feature_number}-{seq}: When [trigger], the system must [response with timing/behavior] *(Supports US-{feature_number}-{seq})*
- FR-{feature_number}-{seq}: All [data type] must be [specific constraint] *(Supports US-{feature_number}-{seq})*

## Non-Functional Requirements (NFRs)

- NFR-{feature_number}-{seq}: **Performance:** [measurable criterion]
- NFR-{feature_number}-{seq}: **Security:** [specific standard or constraint]
- NFR-{feature_number}-{seq}: **Accessibility:** [compliance level and verification method]

## Non-Goals (Out of Scope)

- Explicitly list features that are tempting but out of scope
- Explain why (if helpful for future reference)

## Success Metrics

**Primary Metrics:**
- Tie directly back to business objective
- Include baseline and target: "Increase from X to Y"

**Measurement:**
- Define measurement method: "Measured via Google Analytics event tracking"

## Open Questions

- Remaining questions or areas needing clarification before implementation
