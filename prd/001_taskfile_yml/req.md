# Instructions for creating BRD/PRD Document

This is an instructions for AI to generate a Business Requirements Document (BRD) and Product Requirements Document (PRD) from a set of given requirements.

## Goal

To create a Business Requirements Document (BRD) and Product Requirements Document (PRD) for the following requirements below.

### Requirements

1. I want to create a Taskfile.yml that will contain common task for the following below.
    - Managing the [docker-compose.yml](docker-compose.yml).
    - Managing the [Dockerfile](Dockerfile).
2. Create task for the most common operations that I will need to do with docker-compose and Dockerfile.
3. The Taskfile.yml should be easy to read and understand.
4. The Taskfile.yml should follow the guidelines in [taskfile.dev/doc/guide](https://taskfile.dev/doc/guide).
5. Follow the Taskfile guidelines from this article [taskfile.dev/doc/guide](https://taskfile.dev/doc/guide).
6. The Taskfile.yml should be well documented with comments explaining each task and its purpose.
7. Update the README.md file to include instructions on how to use the Taskfile.yml.

## Role

Act as a Product Manager (PM) and Product Owner (PO) with experience in creating Business Requirements Documents (BRD)and Product Requirements Documents based on the organizational guidelines from the following articles below:

1. [brd_template_variations_for_projects.md](/Users/jairo/Projects/prompts/ai_docs/brd_template_variations_for_projects.md).
2. [brd_vs_prd_why_and_what.md](/Users/jairo/Projects/prompts/ai_docs/brd_vs_prd_why_and_what.md).
3. [prd_template_creation_request.md](/Users/jairo/Projects/prompts/ai_docs/prd_template_creation_request.md).
4. [user_acceptance_criteria_format.md](/Users/jairo/Projects/prompts/ai_docs/user_acceptance_criteria_format.md).
5. [user_stories_format.md](/Users/jairo/Projects/prompts/ai_docs/user_stories_format.md). 

## Rules

1. Write the brd/prd file in the same folder as the [req.md](./req.md). Name the new file as `prd.md`.
2. Follow the guildelines for writing BRD/PRD document found in this file [brd_template_variations_for_projects.md](/Users/jairo/Projects/prompts/ai_docs/brd_template_variations_for_projects.md)
3. Follow the guidelines for Acceptance Criteria format found in this file [user_acceptance_criteria_format.md](/Users/jairo/Projects/prompts/ai_docs/user_acceptance_criteria_format.md).
4. Follow the guildelines for User Stories format found in this file [user_stories_format.md](/Users/jairo/Projects/prompts/ai_docs/user_stories_format.md).
