# **Taskfile.yml for Docker Management**

## **Business Requirements Document (BRD) & Product Requirements Document (PRD)**

---

> **Document Type**: Combined BRD/PRD
> **Approach**: Minimalist template for small-scale internal tooling project
> **Format Standards**:
>
> - User Stories follow the "As a [user type], I want [goal] so that [benefit]"
>   format
> - Acceptance Criteria use Given/When/Then (BDD) format with scenario-based
>   structure
> - Follows Taskfile.dev v3 guidelines and best practices
>
> **Note**: This document combines business requirements (the "what" and "why")
> with product requirements (the "how") in a single unified document suitable
> for this project's scope.

---

## **1. Project Snapshot**

| Item                 | Details                                           |
| :------------------- | :------------------------------------------------ |
| **Project Name**     | Taskfile.yml Implementation for Docker Operations |
| **Project Owner**    | Jairo                                             |
| **Key Contacts**     | Development Team                                  |
| **Status**           | Requirements Definition                           |
| **Target Date**      | TBD                                               |
| **Document Version** | 1.1                                               |
| **Last Updated**     | 2025-10-07                                        |
| **Product Manager**  | Jairo                                             |
| **Product Owner**    | Jairo                                             |

---

## **2. Problem Statement**

Currently, Docker operations for the Next.js 15 starter project require manual
execution of verbose `docker` and `docker-compose` commands. This creates
friction in the development workflow, increases the likelihood of errors from
mistyped commands, and lacks a standardized approach for common operations like
building, running, stopping, and cleaning up Docker resources. Additionally,
there is no clear documentation guiding developers on how to perform these
operations efficiently. There is a specific need for comprehensive cleanup tasks
to remove all Docker containers, images, and build artifacts efficiently, along
with well-documented, commented task definitions and updated README
instructions.

---

## **3. Business Objective(s)**

- **Objective 1:** Streamline Docker operations by providing a standardized,
  easy-to-use task runner interface that reduces command verbosity and improves
  developer productivity.
- **Objective 2:** Ensure comprehensive Docker resource management with robust
  cleanup tasks that can remove all containers, images, volumes, and build cache
  to maintain a clean development environment.
- **Objective 3:** Establish a maintainable and well-documented task structure
  that complements existing `docker-compose.yml` and `Dockerfile` configurations
  without replacing native Docker commands.
- **Objective 4:** Provide comprehensive documentation through inline comments
  in Taskfile.yml and updated README.md to ensure developers can quickly
  understand and utilize all available tasks.

---

## **4. Core User Stories & Acceptance Criteria**

### **Feature 1: Docker Build Operations**

- **US-001:** As a developer, I want to build Docker images using simple task
  commands so that I don't have to remember complex Docker build flags and
  options.
  - **AC-001.1: Scenario:** Build production image
    - **Given** I am in the project root directory
    - **And** the Dockerfile exists
    - **When** I run `task docker:build`
    - **Then** the Docker image is built using the multi-stage Dockerfile
    - **And** the image is tagged appropriately for the project
  - **AC-001.2: Scenario:** Build with no cache
    - **Given** I need a fresh build without cached layers
    - **When** I run `task docker:build:no-cache`
    - **Then** the Docker image is built without using any cached layers
    - **And** the build completes successfully

### **Feature 2: Docker Run Operations**

- **US-002:** As a developer, I want to start and stop Docker containers easily
  so that I can quickly test the application in a containerized environment.
  - **AC-002.1: Scenario:** Start containers in development mode
    - **Given** Docker Compose configuration exists
    - **When** I run `task docker:dev:up`
    - **Then** the containers start in development mode
    - **And** logs are displayed in the terminal
  - **AC-002.2: Scenario:** Start containers in production mode
    - **Given** Docker Compose configuration exists
    - **When** I run `task docker:prod:up`
    - **Then** the containers start in production mode
    - **And** containers run in detached mode
  - **AC-002.3: Scenario:** Stop running containers
    - **Given** containers are currently running
    - **When** I run `task docker:stop`
    - **Then** all project containers are stopped gracefully
    - **And** no containers remain running

### **Feature 3: Docker Cleanup Operations**

- **US-003:** As a developer, I want comprehensive cleanup tasks so that I can
  easily remove all Docker resources and free up disk space.
  - **AC-003.1: Scenario:** Clean project containers and images
    - **Given** project containers and images exist
    - **When** I run `task docker:clean`
    - **Then** all project-specific containers are stopped and removed
    - **And** all project-specific images are removed
    - **And** orphaned volumes are removed
  - **AC-003.2: Scenario:** Deep clean all Docker resources
    - **Given** I want to remove all Docker resources system-wide
    - **When** I run `task docker:clean:all`
    - **Then** all stopped containers are removed
    - **And** all dangling images are removed
    - **And** all unused volumes are removed
    - **And** all build cache is pruned
    - **And** a summary of freed space is displayed
  - **AC-003.3: Scenario:** Clean build cache only
    - **Given** I want to free up space from build cache
    - **When** I run `task docker:clean:cache`
    - **Then** all Docker build cache is removed
    - **And** containers and images remain intact

### **Feature 4: Docker Status and Logs**

- **US-004:** As a developer, I want to easily view container status and logs so
  that I can monitor and debug the application.
  - **AC-004.1: Scenario:** View container status
    - **Given** containers may or may not be running
    - **When** I run `task docker:status`
    - **Then** I see a list of all project containers with their status
    - **And** the output includes container names, status, and ports
  - **AC-004.2: Scenario:** View container logs
    - **Given** containers are running
    - **When** I run `task docker:logs`
    - **Then** I see the logs from all running containers
    - **And** logs are displayed with timestamps
  - **AC-004.3: Scenario:** Follow container logs in real-time
    - **Given** containers are running
    - **When** I run `task docker:logs:follow`
    - **Then** I see real-time streaming logs from all containers
    - **And** logs continue to display until I interrupt the command

### **Feature 5: Task Documentation and Help**

- **US-005:** As a developer, I want to see available tasks and their
  descriptions so that I can discover and understand what operations are
  available.
  - **AC-005.1: Scenario:** List all available tasks
    - **Given** Taskfile.yml is properly configured
    - **When** I run `task --list` or `task -l`
    - **Then** I see a formatted list of all available Docker tasks
    - **And** each task includes a clear description of its purpose
  - **AC-005.2: Scenario:** View detailed task information
    - **Given** I want to understand a specific task
    - **When** I run `task --summary <task-name>`
    - **Then** I see detailed information about the task
    - **And** the output includes the commands that will be executed
  - **AC-005.3: Scenario:** Understand task internals through code comments
    - **Given** I open the Taskfile.yml file
    - **When** I read through the task definitions
    - **Then** I see clear comments explaining each task's purpose, parameters,
      and behavior
    - **And** complex commands have inline explanations of their flags and
      options

### **Feature 6: README Documentation**

- **US-006:** As a developer, I want comprehensive instructions in the README so
  that I can quickly learn how to use the Taskfile without reading the entire
  Taskfile.yml.
  - **AC-006.1: Scenario:** Find Taskfile documentation in README
    - **Given** I open the README.md file
    - **When** I navigate to the Docker/Taskfile section
    - **Then** I see a dedicated section explaining Taskfile usage
    - **And** the section includes installation instructions for Task runner
  - **AC-006.2: Scenario:** Learn common task commands
    - **Given** I am reading the README Docker section
    - **When** I review the Taskfile examples
    - **Then** I see practical examples of the most common task commands
    - **And** each example includes a brief explanation of when to use it
  - **AC-006.3: Scenario:** Quick reference for all tasks
    - **Given** I need to see all available tasks
    - **When** I check the README
    - **Then** I see either a complete list of tasks with descriptions
    - **Or** clear instructions on how to list all tasks using `task --list`

---

## **5. Scope Boundaries**

### **In Scope**

- Creation of `Taskfile.yml` in the project root directory
- Task definitions for Docker build operations (`docker:build`,
  `docker:build:no-cache`)
- Task definitions for Docker run operations grouped by environment:
  - Development tasks: `docker:dev:up`, `docker:dev:down`
  - Production tasks: `docker:prod:up`, `docker:prod:down`
- Task definitions for Docker lifecycle operations (`docker:start`,
  `docker:stop`, `docker:restart`)
- Comprehensive cleanup tasks:
  - `docker:clean` - Remove project-specific containers and images
  - `docker:clean:all` - Deep clean all Docker resources system-wide
  - `docker:clean:cache` - Remove build cache only
  - `docker:clean:volumes` - Remove unused volumes
- Task definitions for monitoring operations (`docker:status`, `docker:logs`,
  `docker:logs:follow`)
- Task naming convention using `docker:` prefix
- Clear task descriptions for documentation via `desc:` field in each task
- Inline code comments explaining complex commands, flags, and task behavior
- Integration with existing `docker-compose.yml` and `Dockerfile`
- Comprehensive README documentation section with:
  - Taskfile installation instructions
  - Common usage examples
  - Complete task reference or instructions to list tasks
  - Best practices for Docker operations in this project

### **Out of Scope**

- Integration with npm scripts in `package.json`
- Modification of existing `docker-compose.yml` or `Dockerfile`
- Docker installation or setup instructions
- Environment variable management beyond what's in `docker-compose.yml`
- Database seeding or migration tasks
- Custom development workflows (hot-reload, debugging)
- CI/CD pipeline integration
- Multi-environment configuration files (staging, QA, etc.)
- Docker Swarm or Kubernetes orchestration
- Automated testing within Docker containers
- Performance monitoring or profiling tasks
- Security scanning of Docker images

---

## **6. Assumptions & Constraints**

### **Assumptions**

- Docker and Docker Compose are already installed on the developer's machine
- The developer has appropriate permissions to run Docker commands
- The existing `docker-compose.yml` and `Dockerfile` are functional and tested
- Developers are familiar with basic Docker concepts
- Task (go-task/task) is installed or will be installed by developers
- The project structure and file locations remain consistent with the current
  setup
- Developers have read access to the Taskfile.yml documentation
- The `NEXT_PUBLIC_API_BASE_URL` environment variable is properly configured in
  `.env.local` or the environment

### **Constraints**

- Must follow Taskfile.dev v3 specification and best practices
- Task names must use the `docker:` prefix convention for consistency
- Must not modify or replace existing Docker Compose commands
- Must work on macOS, Linux, and Windows (with WSL2) environments
- Cleanup tasks must include safety confirmations for destructive operations
- All tasks must provide clear, actionable output messages
- Task execution must not require additional dependencies beyond Docker, Docker
  Compose, and Task
- Documentation must be concise and follow the minimalist approach
- File must be maintainable by developers with varying levels of Taskfile
  experience

---

## **7. Task Structure & Organization**

### **Proposed Task Hierarchy**

The Taskfile.yml will organize tasks into logical groups using the namespace
prefix convention:

#### **Build Tasks** (`docker:build:*`)

- `docker:build` - Build the Docker image
- `docker:build:no-cache` - Build without cache

#### **Development Tasks** (`docker:dev:*`)

- `docker:dev:up` - Start containers in development mode (foreground)
- `docker:dev:down` - Stop and remove development containers

#### **Production Tasks** (`docker:prod:*`)

- `docker:prod:up` - Start containers in production mode (detached)
- `docker:prod:down` - Stop and remove production containers

#### **Lifecycle Tasks** (`docker:*`)

- `docker:start` - Start existing containers
- `docker:stop` - Stop running containers
- `docker:restart` - Restart containers

#### **Cleanup Tasks** (`docker:clean:*`)

- `docker:clean` - Remove project containers and images
- `docker:clean:all` - Deep clean all Docker resources (with confirmation)
- `docker:clean:cache` - Remove build cache
- `docker:clean:volumes` - Remove unused volumes

#### **Monitoring Tasks** (`docker:*`)

- `docker:status` - Show container status
- `docker:logs` - View container logs
- `docker:logs:follow` - Follow logs in real-time

---

## **8. Success Criteria**

The Taskfile.yml implementation will be considered successful when:

1. **Usability**: Developers can execute all common Docker operations using
   simple, memorable task commands
2. **Completeness**: All defined user stories and acceptance criteria are
   implemented and tested
3. **Documentation Quality**:
   - The Taskfile includes clear `desc` fields for each task visible in
     `task --list`
   - Inline comments explain the purpose and behavior of each task
   - Complex commands have explanatory comments for flags and options
   - README includes a comprehensive Taskfile section with installation,
     examples, and reference
4. **Cleanup Effectiveness**: The `docker:clean:all` task successfully removes
   all Docker resources and frees up disk space
5. **Reliability**: All tasks execute without errors in the target environments
   (macOS, Linux, WSL2)
6. **Maintainability**: The Taskfile.yml is well-structured, commented, and easy
   to modify or extend
7. **Discoverability**: New developers can understand available tasks and how to
   use them within 5 minutes using README and `task --list`
8. **Adoption**: Development team members actively use the Taskfile for Docker
   operations instead of manual commands

---

## **9. Technical Considerations**

### **Taskfile.yml Best Practices**

- Use Taskfile v3 schema specification
- Include `version: '3'` at the top of the file
- Provide meaningful `desc` fields for all tasks for `task --list` output
- Add inline comments above each task explaining its purpose and behavior
- Add inline comments for complex commands explaining flags and options
- Use `silent: true` for tasks that should suppress command echo where
  appropriate
- Implement `preconditions` for tasks that require specific conditions
- Use `cmds` array for multi-step operations
- Include helpful status messages using `echo` or task's built-in messaging
- Group related tasks using consistent namespace prefixes (e.g.,
  `docker:clean:*`)

### **Docker Command Patterns**

- Use `docker-compose` for orchestration tasks
- Use `docker` CLI for image and system-level operations
- Include `--project-name` flag for project-specific operations
- Use `--force` flags carefully with user confirmation for destructive
  operations
- Leverage Docker's `--filter` options for targeted cleanup operations

### **Error Handling**

- Tasks should fail fast with clear error messages
- Cleanup tasks should handle cases where resources don't exist gracefully
- Provide informative output for both success and failure scenarios

---

## **10. Deliverables**

1. **Taskfile.yml** - Complete task runner configuration file in project root
   with:
   - All task definitions following Taskfile v3 specification
   - Clear `desc` fields for each task
   - Inline comments explaining complex commands and logic
   - Proper organization using task namespaces
2. **Updated README.md** - New comprehensive section documenting:
   - Taskfile installation instructions (macOS, Linux, Windows)
   - Quick start guide with common examples
   - Complete list of available tasks with descriptions
   - Best practices and troubleshooting tips
3. **Testing Validation** - Confirmation that all tasks execute successfully in
   at least one target environment

---

## **11. Glossary**

| Term                  | Definition                                                                                   |
| :-------------------- | :------------------------------------------------------------------------------------------- |
| **Taskfile**          | A task runner and build tool that uses YAML configuration files to define and execute tasks  |
| **Docker Compose**    | A tool for defining and running multi-container Docker applications using YAML configuration |
| **Dangling Image**    | A Docker image that is not tagged and not referenced by any container                        |
| **Build Cache**       | Intermediate layers stored by Docker to speed up subsequent builds                           |
| **Detached Mode**     | Running containers in the background without attaching to the terminal                       |
| **Orphaned Volume**   | A Docker volume that is not associated with any container                                    |
| **Multi-stage Build** | A Dockerfile pattern that uses multiple FROM statements to optimize image size               |
| **Task Namespace**    | A prefix convention (e.g., `docker:`) used to group related tasks logically                  |

---

## **Appendix A: Document Creation Guidelines**

This BRD/PRD was created following industry best practices and structured
templates from:

1. **BRD/PRD Template Framework**: "A Strategic Framework for Modern Business
   Requirements Documentation: Templates for Human-AI Collaboration" - Provides
   scalable templates (Minimalist, Standard, Detailed) based on project
   complexity
2. **BRD vs PRD Philosophy**: "The Definitive Guide to Business and Product
   Requirements Documents: From Strategic 'Why' to Tactical 'What'" - Clarifies
   the distinction between business requirements (BRD) and product requirements
   (PRD)
3. **PRD Structure**: "The Minimalist PRD: A Reusable Template for Agile
   Software Development" - Modern, agile-friendly approach to product
   requirements documentation
4. **User Story Format**: "User Story Format" - Standard "As a [user], I want
   [goal] so that [benefit]" structure
5. **Acceptance Criteria Format**: "Acceptance Criteria Format" -
   Given/When/Then (BDD) format with scenario-based structure

---

## **Appendix B: Technical Reference Links**

- **Taskfile Documentation**: <https://taskfile.dev/>
- **Taskfile Usage Guide**: <https://taskfile.dev/usage/>
- **Taskfile Installation**: <https://taskfile.dev/installation/>
- **Docker CLI Reference**:
  <https://docs.docker.com/engine/reference/commandline/cli/>
- **Docker Compose CLI**: <https://docs.docker.com/compose/reference/>

---

## **Appendix C: Example Task Usage**

```bash
# Build the Docker image
task docker:build

# Start development environment
task docker:dev:up

# View logs
task docker:logs

# Clean up everything
task docker:clean:all

# List all available tasks
task --list
```

---

## **Document Change Log**

| Version | Date       | Changes                                                                                                                                                     | Author |
| :------ | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| 1.0     | 2025-10-05 | Initial BRD/PRD creation with core requirements                                                                                                             | AI/PM  |
| 1.1     | 2025-10-07 | Added documentation requirements (inline comments, README updates), added Feature 6 (README Documentation), expanded success criteria, updated deliverables | AI/PM  |

---

**Document Status**: Ready for Review
**Next Steps**: Review and approval of BRD/PRD before implementation begins
