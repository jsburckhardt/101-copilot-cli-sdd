---
title: Automation Patterns
description: Autopilot mode, fleet command, and LSP configuration
sidebar_position: 4
keywords: [copilot, cli, autopilot, fleet, lsp, automation]
---

This page covers Copilot CLI's most powerful automation features: autonomous task execution, parallel sub-agents, advanced shell configuration, and language server tuning.

For foundational configuration and CI/CD setup, see [Advanced Topics](./advanced-topics.md).

## Exercise 4: Autopilot Mode

**Goal:** Use Autopilot mode for autonomous multi-step tasks.

**Steps:**

1. **What is Autopilot mode?**

   Autopilot mode allows Copilot to work autonomously through complex, multi-step tasks without requiring approval for each step. The agent:
   * Plans the full task execution path
   * Executes multiple steps sequentially
   * Handles errors and retries automatically
   * Reports progress and completion

2. **When to use Autopilot vs Interactive mode:**

   **Use Autopilot for:**
   * Repetitive multi-step tasks (e.g., creating boilerplate code)
   * Well-defined workflows (e.g., setting up test infrastructure)
   * Tasks requiring many sequential operations
   * Automation scenarios where human intervention is unnecessary

   **Use Interactive mode for:**
   * Exploratory work where you need to review each step
   * High-risk operations (database changes, deployment)
   * Learning new codebases or technologies
   * Tasks requiring human judgment at each step

3. **Enable Autopilot mode:**

   ```bash
   # Start Copilot in autopilot mode
   copilot --autopilot

   # Or use /autopilot command in an active session
   copilot
   /autopilot on
   ```

   :::note
   **Permission elevation (v0.0.414):** When accepting a plan with autopilot, Copilot shows a permission elevation dialog to prevent auto-denied tool errors during autonomous execution.
   :::

   :::tip
   **Plan approval menu (v0.0.415):** Plan approval now shows model-curated actions with a recommended option highlighted, including an **autopilot+fleet** option for parallelizable work.
   :::

4. **Example: Set up a new Express.js API:**

   ```bash
   copilot --autopilot -p "Create a new Express.js API with:
   - User authentication endpoints
   - PostgreSQL database connection
   - Jest test setup
   - Proper error handling middleware
   - Environment variable configuration"
   ```

5. **Monitor Autopilot execution:**

   ```bash
   # Autopilot will show progress:
   # ✓ Created package.json with dependencies
   # ✓ Created src/server.js with Express setup
   # ✓ Created src/auth/routes.js with auth endpoints
   # ✓ Created src/db/connection.js with PostgreSQL config
   # ✓ Created tests/auth.test.js with Jest tests
   # ✓ Created .env.example with required variables
   # ✓ Created src/middleware/errorHandler.js
   ```

6. **Disable Autopilot mid-session:**

   ```bash
   # In an active session
   /autopilot off

   # Now you'll be prompted for approval on each action
   ```

7. **Safety tips:**

   ```bash
   # Still use tool restrictions with autopilot
   copilot --autopilot --deny-tool 'shell(rm)' --deny-tool 'shell(git push)'

   # Review changes after autopilot completes
   git diff

   # Use in trusted directories only
   ```

**Expected Outcome:**
Copilot autonomously completes multi-step tasks with minimal human intervention.

## Exercise 5: Fleet Command for Parallel Execution

**Goal:** Use the fleet command to launch multiple sub-agents in parallel for complex tasks.

**Steps:**

1. **What is the fleet command?**

   The `/fleet` command enables:
   * **Parallel sub-agents**: Multiple AI agents working simultaneously on different parts of a task
   * **Orchestrator validation**: A supervisor agent that validates work from sub-agents
   * **Parallel dispatch**: Intelligent scheduling to maximize parallelism and speed
   * **Complex task decomposition**: Automatic breaking down of large tasks

2. **When to use /fleet:**

   **Ideal for:**
   * Large refactoring across multiple files
   * Generating test suites for multiple modules
   * Setting up multi-service architectures (frontend + backend + database)
   * Batch operations on independent components

   **Not ideal for:**
   * Small single-file tasks
   * Tasks with tight sequential dependencies
   * Simple prompts that don't benefit from parallelization

3. **Basic fleet usage:**

   ```bash
   copilot
   /fleet "Refactor all components in src/components/ to use TypeScript and add unit tests"
   ```

4. **How fleet works:**

   ```text
   Your Prompt
        ↓
   Orchestrator Agent (Plans & Validates)
        ↓
   ┌─────────┬─────────┬─────────┬─────────┐
   │ Agent 1 │ Agent 2 │ Agent 3 │ Agent 4 │  (Parallel Dispatch)
   │ UserCard│ NavBar  │ Footer  │ Button  │
   └─────────┴─────────┴─────────┴─────────┘
        ↓         ↓         ↓         ↓
   Orchestrator Validates Each Result
        ↓
   Final Consolidated Output
   ```

5. **Orchestrator validation (v0.0.412):**

   The orchestrator agent:
   * Reviews each sub-agent's work for quality
   * Ensures consistency across parallel work
   * Catches errors before consolidation
   * Requests revisions from sub-agents if needed

   Example validation checks:
   * Code style consistency across files
   * No duplicated effort between agents
   * All tests pass
   * No breaking changes introduced

6. **Parallel dispatch optimization (v0.0.412):**

   ```bash
   # Fleet automatically maximizes parallelism
   # Before v0.0.412: Sequential sub-agent execution
   # After v0.0.412: More sub-agents run simultaneously

   /fleet "Generate API routes, database models, and tests for User, Product, Order entities"

   # Fleet might dispatch:
   # - 3 agents for routes (User, Product, Order) in parallel
   # - 3 agents for models in parallel
   # - 3 agents for tests in parallel
   # = 9 sub-agents potentially running concurrently
   ```

7. **Monitor fleet progress:**

   ```bash
   # Fleet shows orchestrator activity:
   # 📋 Orchestrator: Breaking down task into 6 subtasks
   # 🚀 Dispatched: Agent 1 → UserRoutes.ts
   # 🚀 Dispatched: Agent 2 → ProductRoutes.ts
   # 🚀 Dispatched: Agent 3 → OrderRoutes.ts
   # ✓ Agent 1 complete → Validating...
   # ✓ Agent 2 complete → Validating...
   # ⚠️ Agent 3 validation failed → Requesting revision...
   # ✓ Agent 3 revision complete
   # 📦 Consolidating results...
   ```

8. **Fleet with tool restrictions:**

   ```bash
   copilot --allow-tool 'write' --allow-tool 'shell(npm test)'
   /fleet "Create and test all CRUD endpoints for the API"
   ```

9. **Best practices:**
   * Let fleet handle task decomposition (don't over-specify subtasks)
   * Use for independent, parallelizable work
   * Review orchestrator validation results
   * Monitor for agent conflicts (rare but possible)
   * Works best with clear, well-scoped objectives

**Expected Outcome:**
Complex tasks are completed faster through parallel sub-agent execution with quality validation.

## Exercise 6: Advanced Shell Configuration

**Goal:** Configure advanced shell behavior and environment.

**Steps:**

1. **Using --bash-env flag (v0.0.412):**

   The `--bash-env` flag sources your BASH_ENV file in Copilot's shell sessions:

   ```bash
   # Create a custom BASH_ENV file
   cat > ~/.copilot_env << 'EOF'
   # Custom environment for Copilot sessions
   export PROJECT_ROOT=/workspace/myproject
   export NODE_ENV=development
   export DEBUG=app:*

   # Useful aliases
   alias ll='ls -lah'
   alias gst='git status'

   # Functions
   test-and-commit() {
     npm test && git commit -m "$1"
   }
   EOF

   # Set BASH_ENV
   export BASH_ENV=~/.copilot_env

   # Start Copilot with the environment
   copilot --bash-env
   ```

2. **When to use --bash-env:**
   * Project-specific environment variables needed by scripts
   * Custom aliases that your workflow depends on
   * Functions that Copilot should have access to
   * Consistent shell configuration across sessions

3. **Example with custom environment:**

   ```bash
   # In ~/.copilot_env
   export DB_HOST=localhost
   export DB_PORT=5432
   export API_KEY=${SECURE_API_KEY}

   # Start Copilot
   copilot --bash-env -p "Run the database migration script"

   # Copilot's shell commands will have access to DB_HOST, DB_PORT, etc.
   ```

4. **Shell mode access change (v0.0.410):**

   :::warning
   As of v0.0.410, shell mode is no longer accessible via Shift+Tab cycling.
   :::

   **Old behavior (before v0.0.410):**

   ```text
   Shift+Tab: cycle through (chat) → (command) → (shell)
   ```

   **New behavior (v0.0.410+):**

   ```text
   Shift+Tab: cycle through (chat) ⟷ (command) only
   ! (exclamation): direct access to shell mode
   ```

   **To enter shell mode:**

   ```bash
   copilot
   # Type ! to enter shell mode
   ! ls -la
   ! git status
   ! npm install
   ```

5. **Combining shell mode with --bash-env:**

   ```bash
   # Set up environment
   export BASH_ENV=~/.copilot_project_env
   copilot --bash-env

   # In session, use shell mode
   ! echo $PROJECT_ROOT
   # Outputs: /workspace/myproject (from BASH_ENV)

   ! test-and-commit "Add new feature"
   # Uses function from BASH_ENV
   ```

**Expected Outcome:**
Shell sessions have consistent environment configuration, and you understand the new shell mode access pattern.

## Exercise 7: LSP and Language Server Configuration

**Goal:** Configure Language Server Protocol (LSP) timeout settings.

**Steps:**

1. **What is LSP timeout configuration?**

   Copilot CLI can use language servers (TypeScript, Python, Go, etc.) for:
   * Code intelligence and completions
   * Jump to definition
   * Find references
   * Type information

   Some language servers may timeout on large codebases. The `lsp.json` config lets you adjust these timeouts.

2. **Create lsp.json configuration:**

   ```bash
   # Create LSP config in Copilot config directory
   cat > ~/.copilot/lsp.json << 'EOF'
   {
     "timeout": {
       "initialization": 30000,
       "request": 10000,
       "shutdown": 5000
     },
     "servers": {
       "typescript": {
         "timeout": {
           "initialization": 60000,
           "request": 20000
         }
       },
       "python": {
         "timeout": {
           "initialization": 45000,
           "request": 15000
         }
       }
     }
   }
   EOF
   ```

3. **Timeout values explained:**
   * `initialization`: Time allowed for LSP server to start (milliseconds)
   * `request`: Time allowed for individual LSP requests
   * `shutdown`: Time allowed for graceful shutdown

   **Default values (if not configured):**
   * initialization: 15000ms (15 seconds)
   * request: 90000ms (90 seconds) increased from 30s in v0.0.413
   * shutdown: 3000ms (3 seconds)

4. **When to adjust LSP timeouts:**

   ```bash
   # Increase if you see errors like:
   # "TypeScript language server initialization timeout"
   # "LSP request timeout for workspace/symbol"

   # Common scenarios:
   # - Large monorepos with thousands of files
   # - Slow file systems (network drives, container volumes)
   # - Resource-constrained environments
   # - Complex TypeScript projects with heavy type inference
   ```

5. **Per-language server configuration:**

   ```json
   {
     "servers": {
       "typescript": {
         "timeout": {
           "initialization": 90000,
           "request": 30000
         },
         "maxNumberOfProblems": 100
       },
       "rust": {
         "timeout": {
           "initialization": 120000,
           "request": 45000
         }
       }
     }
   }
   ```

6. **Verify LSP configuration:**

   ```bash
   # Check if config is valid JSON
   cat ~/.copilot/lsp.json | jq .

   # Start Copilot and check for LSP initialization
   copilot
   # Watch for language server startup messages in debug mode
   ```

7. **Debug LSP issues:**

   ```bash
   # Enable debug logging
   export COPILOT_DEBUG=1
   copilot

   # Look for LSP-related messages:
   # "Initializing TypeScript language server..."
   # "LSP initialization complete in 23457ms"
   # "LSP request: textDocument/definition"
   ```

8. **Disable LSP for specific languages:**

   ```json
   {
     "servers": {
       "javascript": {
         "enabled": false
       }
     }
   }
   ```

**Expected Outcome:**
Language server timeouts are configured for your environment, eliminating timeout errors in large projects.

## Slash Commands Reference

| Command | Description | Version |
| --------- | ------------- | --------- |
| `/help` | Show all available commands | Base |
| `/clear` | Clear session context | Base |
| `/context` | View token usage | Base |
| `/compact` | Compress session history | Base |
| `/plan` | Create implementation plan | Base |
| `/review` | Run code review agent | Base |
| `/delegate` | Hand off to cloud agent | Base |
| `/fleet` | Launch parallel sub-agents for complex tasks | v0.0.411 |
| `/autopilot on\|off` | Toggle autopilot mode | v0.0.411 |
| `/mcp` | Manage MCP servers | Base |

## Next Steps

Continue to [Team Patterns](./team-patterns.md) for team workflows, performance optimization, and the workshop wrap-up.
