---
title: "Operating Modes & Commands"
description: "Interactive, programmatic, and delegate modes for different workflows"
sidebar_position: 2
keywords: [copilot, cli, modes, interactive, programmatic, delegate, commands]
---

## Prerequisites

* Copilot CLI installed and authenticated (Module 1)
* A project directory to work in

## Learning Objectives

* Understand the difference between interactive and programmatic modes
* Discover and use slash commands (`/command`) for CLI control
* Use `/plan`, `/review`, and `/diff` for structured workflows
* Use the delegate (`/delegate`) command to hand off to cloud agents
* Control tool approval during interactions
* Choose the right mode for different scenarios

## Concepts

### Interactive Mode

Interactive mode starts a conversational session where you chat with Copilot in real-time. It's ideal for:

* Exploratory coding and debugging
* Multi-step tasks requiring iteration
* Learning a new codebase
* Tasks where you want to review each step

```bash
# Start interactive mode
copilot
```

### Programmatic Mode

Programmatic mode executes a single prompt and exits. Perfect for:
* CI/CD pipelines
* Scripting and automation
* Batch processing
* Single-shot tasks

```bash
# Execute a single prompt
copilot -p "summarize the README.md file"
```

### Delegate Mode

The `/delegate` command hands off work to GitHub's cloud-based Copilot coding agent. Use it for:
* Long-running tasks
* Compute-intensive operations
* Parallel work (you continue locally while agent works)
* Tasks that benefit from full repository context

```text
/delegate implement the user authentication feature based on the spec
```

### Slash Commands

Slash commands are prefixed with `/` and provide quick access to CLI features without leaving the conversation. They are the primary way to control Copilot CLI behavior during an interactive session.

:::note
For the full command reference, keyboard shortcuts, and tool approval guide, see [Command Reference](/docs/getting-started/command-reference).
:::

**Discovering Commands**

* Type `/help` to see the full list of available commands
* Press `ctrl+x` then `/` to run a command via keyboard shortcut
* Commands are tab-completable: start typing `/` followed by the first letters

## Hands-On Exercises

:::note
**Authentication Required:** You must authenticate before running these exercises. Complete Module 1 (authentication setup) or set one of these environment variables: `GITHUB_TOKEN`, `GH_TOKEN`, or `COPILOT_GITHUB_TOKEN`.
:::

### Exercise 1: Discovering Slash Commands

**Goal:** Learn to discover and use slash commands inside an interactive session.

**Steps:**

1. Start Copilot CLI:
   ```bash
   copilot
   ```

2. View all available commands:
   ```text
   /help
   ```

3. Review the output: you'll see commands grouped with descriptions.

4. Try the `/theme` command to see available themes:
   ```text
   /theme list
   ```

5. Set a theme (optional):
   ```text
   /theme set <theme-id>
   ```

6. Check your current working directory:
   ```text
   /cwd
   ```

7. View session usage metrics:
   ```text
   /usage
   ```

8. Exit with `/exit`.

**Expected Outcome:**
You can discover and navigate the full set of slash commands using `/help`.

### Exercise 2: Planning and Reviewing with Commands

**Goal:** Use `/plan`, `/review`, and `/diff` for structured development workflows.

**Steps:**

1. Navigate to a project directory and start Copilot:
   ```bash
   mkdir -p ~/copilot-commands-lab && cd ~/copilot-commands-lab
   git init
   copilot
   ```

2. Use `/plan` to create an implementation plan before coding:
   ```text
   /plan Build a simple REST API with Express.js that has CRUD endpoints for a todo list
   ```

3. Copilot creates a structured plan. Review it before proceeding.

4. Ask Copilot to implement the plan:
   ```text
   Go ahead and implement the plan
   ```

5. After files are created, review all changes made:
   ```text
   /diff
   ```

6. Run a code review on the changes:
   ```text
   /review Check for security issues and missing error handling
   ```

7. Exit with `/exit`.

**Expected Outcome:**
You can use `/plan` for structured implementation, `/diff` to review changes, and `/review` for code analysis.

### Exercise 3: Repository Initialization and Session Management Commands

**Goal:** Use `/init` to bootstrap Copilot configuration and `/rename` to organize sessions.

**Steps:**

1. Create a new project directory:
   ```bash
   mkdir -p ~/copilot-init-lab && cd ~/copilot-init-lab
   git init
   copilot
   ```

2. Initialize Copilot configuration for this repository:
   ```text
   /init
   ```

3. This creates starter files like `AGENTS.md` and `.github/copilot-instructions.md`.

4. Rename this session for easy identification:
   ```text
   /rename init-lab-session
   ```

5. Check session details:
   ```text
   /session
   ```

6. View background tasks (if any):
   ```text
   /tasks
   ```

7. Configure terminal for multiline input:
   ```text
   /terminal-setup
   ```

8. Exit with `/exit`.

**Expected Outcome:**
You can bootstrap Copilot configuration with `/init`, rename sessions, and configure terminal features.

### Exercise 4: Interactive Mode Basics

**Goal:** Start an interactive session and perform basic operations.

**Steps:**

1. Navigate to a project directory:
   ```bash
   mkdir -p ~/copilot-workshop && cd ~/copilot-workshop
   git init
   ```

2. Start Copilot CLI:
   ```bash
   copilot
   ```

3. Ask Copilot to create a file:
   ```text
   Create a Python script named `hello.py` that prints "Hello, Copilot!"
   ```

   :::tip
   Specifying the exact filename in prompts ensures consistent results across workshop participants. Without it, Copilot may generate different filenames each time (e.g., `hello_copilot.py`, `hello_python.py`).
   :::

4. When prompted to approve the file write, select **Yes**.

5. Ask a follow-up question:
   ```text
   Now modify it to accept a name as a command-line argument
   ```

6. Continue the conversation:
   ```text
   Add error handling if no argument is provided
   ```

7. Exit with `/exit` or `Ctrl+C`.

**Expected Outcome:**
A Python script evolves through multiple iterations with your guidance.

### Exercise 5: Tool Approval Workflow

**Goal:** Understand how to approve, deny, and manage tool permissions.

**Steps:**

1. Start a new session:
   ```bash
   copilot
   ```

2. Ask Copilot to run a command:
   ```text
   List all files in the current directory with details
   ```

3. Copilot will request to use the `shell` tool. You'll see three options:
   * **Yes** - Allow this time only
   * **Yes, and approve TOOL for the rest of the session** - Session-wide approval
   * **No, and tell Copilot what to do differently** - Deny and redirect

4. Select **Yes** (first option) to allow once.

5. Now ask:
   ```text
   Display the contents of hello.py using the cat command
   ```

   :::tip
   Avoid prompts that reference a specific number of lines (e.g., "first 10 lines") for short files. Copilot may reason about the file length instead of running the expected command.
   :::

6. Copilot asks for shell permission again (since you only approved once).

7. This time select **Yes, and approve shell for the rest of the session**.

8. Ask another command:
   ```text
   Count the lines in hello.py
   ```

9. Notice Copilot doesn't ask for permission this time.

**Expected Outcome:**
You understand the difference between one-time and session-wide tool approval.

### Exercise 6: Programmatic Mode

**Goal:** Execute single commands without entering interactive mode.

**Steps:**

1. Create a test file:
   ```bash
   echo "# My Project" > README.md
   echo "This is a test project for learning Copilot CLI." >> README.md
   ```

2. Run Copilot in programmatic mode:
   ```bash
   copilot -p "What does the README.md contain?"
   ```

3. Try with tool permissions:
   ```bash
   copilot -p "Add a 'Getting Started' section to README.md" --allow-tool 'write'
   ```

4. Combine multiple tool permissions:
   ```bash
   copilot -p "Run git status and explain what it means" --allow-tool 'shell(git)'
   ```

5. Pipe file content as context:
   ```bash
   cat README.md | copilot -p "Explain what this file contains"
   ```

   :::tip
   When piping content to Copilot, use prompts that reference "this content" or "this file" rather than "this output" to avoid Copilot responding with "I don't see any output to explain."
   :::

**Expected Outcome:**
Commands execute and exit without entering interactive mode.

### Exercise 7: Chaining Prompts

**Goal:** Use programmatic mode in shell scripts.

**Steps:**

1. Create a script `analyze.sh`:
   ```bash
   #!/bin/bash

   echo "=== Project Analysis ==="

   # Get file count
   copilot -p "Count all .py files recursively and report" --allow-tool 'shell'

   echo ""
   echo "=== Code Quality Check ==="

   # Check for issues
   copilot -p "Look for any TODO comments in Python files" --allow-tool 'shell'
   ```

2. Make it executable:
   ```bash
   chmod +x analyze.sh
   ```

3. Run the script:
   ```bash
   ./analyze.sh
   ```

**Expected Outcome:**
Multiple Copilot operations run sequentially in a script.

### Exercise 8: Delegate to Cloud Agent

**Goal:** Hand off a task to the cloud-based Copilot coding agent.

**Steps:**

1. Ensure you have a GitHub repository (local work pushed to GitHub).

2. Start interactive mode:
   ```bash
   copilot
   ```

3. Build some context by exploring:
   ```text
   What files are in this project?
   ```

4. Use delegate to hand off a task:
   ```text
   /delegate create comprehensive unit tests for all Python files in this project
   ```

5. Copilot will:
   * Ask you to commit any unstaged changes
   * Create a new branch
   * Open a draft pull request
   * Start working asynchronously

6. You'll receive a link to track progress.

7. Continue working locally while the agent works in the cloud.

**Expected Outcome:**
A draft PR is created and the cloud agent begins working asynchronously.

### Exercise 9: Comparing Modes

**Goal:** Understand when to use each mode.

**Steps:**

1. **Interactive exploration** start a session and explore:
   ```bash
   copilot
   > Explain the structure of this codebase
   > What does the main function do?
   > How would I add a new feature?
   > /exit
   ```

2. **Programmatic for automation** single focused tasks:
   ```bash
   # Good for CI/CD
   copilot -p "Run all tests and report failures" --allow-tool 'shell'

   # Good for git workflows
   copilot -p "Summarize changes since last tag" --allow-tool 'shell(git)'
   ```

3. **Delegate for heavy lifting** long-running tasks:
   ```text
   /delegate refactor the authentication module to use JWT tokens
   ```

**Decision Guide:**

| Scenario | Recommended Mode |
| --- | --- |
| Learning a new codebase | Interactive |
| Debugging an issue | Interactive |
| CI/CD pipeline task | Programmatic |
| Generate release notes | Programmatic |
| Major refactoring | Delegate |
| Implement new feature | Delegate |
| Quick code review | Interactive |

**Expected Outcome:**
You can choose the appropriate mode for any task.

## Summary

* **Interactive mode** conversational, multi-step, exploratory
* **Programmatic mode** single prompt, scriptable, CI/CD friendly
* **Delegate mode** hands off to cloud agent for heavy tasks
* **Slash commands** `/plan`, `/review`, `/diff`, `/init`, and 25+ others for CLI control
* Tool approval has one-time and session-wide options

## Next Steps

Continue to [Session Management](/docs/getting-started/session-management)

## References

* [About Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
* [Use Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
* [Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-the-copilot-coding-agent)
