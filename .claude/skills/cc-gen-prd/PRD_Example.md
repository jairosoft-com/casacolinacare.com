# PRD: Task Priority System

## Document Metadata
- **Feature ID**: 012
- **Feature Name**: task_priority
- **Document Type**: PRD
- **Generated Date**: 2024-01-15

## Introduction

Add priority levels to tasks so users can focus on what matters most. Tasks can be marked as high, medium, or low priority, with visual indicators and filtering to help users manage their workload effectively.

## Goals

- Allow assigning priority (high/medium/low) to any task
- Provide clear visual differentiation between priority levels
- Enable filtering and sorting by priority
- Default new tasks to medium priority

## User Stories

### US-012-01: Add priority field to database

**Description:** As a developer, I need to store task priority so it persists across sessions.

**Acceptance Criteria:**
- AC-012-01: Add priority column to tasks table: 'high' | 'medium' | 'low' (default 'medium')
- AC-012-02: Generate and run migration successfully
- AC-012-03: Lint passes (run project's lint command)
- AC-012-04: Typecheck passes (run project's typecheck command)
- AC-012-05: Unit tests pass

### US-012-02: Display priority indicator on task cards

**Description:** As a user, I want to see task priority at a glance so I know what needs attention first.

**Acceptance Criteria:**
- AC-012-06: Each task card shows colored priority badge (red=high, yellow=medium, gray=low)
- AC-012-07: Priority visible without hovering or clicking
- AC-012-08: Lint passes (run project's lint command)
- AC-012-09: Typecheck passes (run project's typecheck command)
- AC-012-10: Unit tests pass
- AC-012-11: E2E tests pass
- AC-012-12: Verify in browser using dev-browser skill

### US-012-03: Add priority selector to task edit

**Description:** As a user, I want to change a task's priority when editing it.

**Acceptance Criteria:**
- AC-012-13: Priority dropdown in task edit modal
- AC-012-14: Shows current priority as selected
- AC-012-15: Saves immediately on selection change
- AC-012-16: Lint passes (run project's lint command)
- AC-012-17: Typecheck passes (run project's typecheck command)
- AC-012-18: Unit tests pass
- AC-012-19: E2E tests pass
- AC-012-20: Verify in browser using dev-browser skill

### US-012-04: Filter tasks by priority

**Description:** As a user, I want to filter the task list to see only high-priority items when I'm focused.

**Acceptance Criteria:**
- AC-012-21: Filter dropdown with options: All | High | Medium | Low
- AC-012-22: Filter persists in URL params
- AC-012-23: Empty state message when no tasks match filter
- AC-012-24: Lint passes (run project's lint command)
- AC-012-25: Typecheck passes (run project's typecheck command)
- AC-012-26: Unit tests pass
- AC-012-27: E2E tests pass
- AC-012-28: Verify in browser using dev-browser skill

## Functional Requirements

- FR-012-01: Add `priority` field to tasks table ('high' | 'medium' | 'low', default 'medium')
- FR-012-02: Display colored priority badge on each task card
- FR-012-03: Include priority selector in task edit modal
- FR-012-04: Add priority filter dropdown to task list header
- FR-012-05: Sort by priority within each status column (high to medium to low)

## Non-Goals

- No priority-based notifications or reminders
- No automatic priority assignment based on due date
- No priority inheritance for subtasks

## Technical Considerations

- Reuse existing badge component with color variants
- Filter state managed via URL search params
- Priority stored in database, not computed

## Success Metrics

- Users can change priority in under 2 clicks
- High-priority tasks immediately visible at top of lists
- No regression in task list performance

## Open Questions

- Should priority affect task ordering within a column?
- Should we add keyboard shortcuts for priority changes?
