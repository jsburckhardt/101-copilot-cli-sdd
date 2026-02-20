# Module 2: Operating Modes & Commands

## Prerequisites

- Copilot CLI installed and authenticated (Module 1)
- A project directory to work in

## Learning Objectives

- Understand the difference between interactive and programmatic modes
- Discover and use slash commands (`/command`) for CLI control
- Use `/plan`, `/review`, and `/diff` for structured workflows
- Use the delegate (`/delegate`) command to hand off to cloud agents
- Control tool approval during interactions
- Choose the right mode for different scenarios

## Concepts

### Interactive Mode

Interactive mode starts a conversational session where you chat with Copilot in real-time. It's ideal for:

- Exploratory coding and debugging
- Multi-step tasks requiring iteration
- Learning a new codebase
- Tasks where you want to review each step

```bash
# Start interactive mode
copilot
```text

### Programmatic Mode

Programmatic mode executes a single prompt and exits. Perfect for:
- CI/CD pipelines
- Scripting and automation
- Batch processing
- Single-shot tasks

```bash
# Execute a single prompt
copilot -p "summarize the README.md file"
```text

### Delegate Mode

The `/delegate` command hands off work to GitHub's cloud-based Copilot coding agent. Use it for:
- Long-running tasks
- Compute-intensive operations
- Parallel work (you continue locally while agent works)
- Tasks that benefit from full repository context

```text
/delegate implement the user authentication feature based on the spec
```text

### Slash Commands

Slash commands are prefixed with `/` and provide quick access to CLI features without leaving the conversation. They are the primary way to control Copilot CLI behavior during an interactive session.

#### Discovering Commands

- Type `/help` to see the full list of available commands
- Press `ctrl+x` then `/` to run a command via keyboard shortcut
- Commands are tab-completable — start typing `/` followed by the first letters

#### Command Categories

| Category | Commands | Purpose |
| --- | --- | --- |
| **Session** | `/clear`, `/session`, `/resume`, `/rename`, `/usage` | Manage session lifecycle |
| **Navigation** | `/cwd`, `/cd`, `/add-dir`, `/list-dirs` | Control directory scope |
| **Context** | `/context`, `/compact` | Monitor and optimize token usage |
| **Tools** | `/allow-all`, `/yolo`, `/reset-allowed-tools` | Manage tool permissions at runtime |
| **Review** | `/diff`, `/review`, `/plan` | Code review and planning workflows |
| **Configuration** | `/model`, `/mcp`, `/theme`, `/terminal-setup`, `/experimental` | Customize CLI behavior |
| **Extensibility** | `/skills`, `/plugin`, `/agent` | Manage skills, plugins, and agents |
| **Sharing** | `/share`, `/feedback` | Export sessions and submit feedback |
| **Account** | `/login`, `/logout`, `/user` | Authentication and user management |
| **System** | `/help`, `/exit`, `/quit`, `/init`, `/tasks`, `/lsp`, `/update`, `/changelog` | General utilities |

#### Keyboard Shortcuts

In addition to slash commands, Copilot CLI supports keyboard shortcuts:

| Shortcut | Action |
| --- | --- |
| `@` | Mention files — include file contents in context |
| `!` | Execute a shell command directly (bypass Copilot; also the only way to access shell mode since v0.0.410) |
| `Esc` | Cancel the current operation |
| `ctrl+x → /` | Run a slash command |
| `ctrl+c` | Cancel operation / clear input / exit |
| `ctrl+d` | Shutdown / exit CLI on empty prompt (v0.0.410+) |
| `ctrl+l` | Clear the screen |
| `ctrl+n` | Navigate down (alternative to down arrow, v0.0.410+) |
| `ctrl+p` | Navigate up (alternative to up arrow, v0.0.410+) |
| `ctrl+o` | Expand recent timeline (when no input) |
| `ctrl+e` | Expand all timeline (when no input) |
| `ctrl+t` | Toggle model reasoning display |
| `ctrl+y` | Edit plan in terminal editor (v0.0.412+) |
| `ctrl+x → ctrl+e` | Edit prompt in terminal editor (v0.0.412+) |
| `ctrl+z` | Suspend/resume CLI (Unix platforms only, v0.0.410+) |
| `Shift+Tab` | Cycle through modes (suggest, normal, autopilot) |
| `Shift+Enter` | Insert newline in prompt (requires kitty keyboard protocol, v0.0.410+) |
| `Page Up` / `Page Down` | Scroll in alt-screen mode (v0.0.410+) |
| `Double-click` | Select word in alt-screen mode (v0.0.412+) |
| `Triple-click` | Select line in alt-screen mode (v0.0.412+) |

> [!WARNING]
> Some keyboard shortcuts require specific terminal capabilities:
> - **Shift+Enter** for newlines requires terminals with kitty keyboard protocol support
> - **Ctrl+Z** suspend/resume works on Unix platforms only
> - **Page Up/Down**, **Double/Triple-click** require alt-screen mode support
> - **Ctrl+Y** and **Ctrl+X Ctrl+E** require a terminal editor (set via `$EDITOR` or `$VISUAL`)

#### Key Commands Not Covered in Other Modules

Some commands are covered in depth in later modules (`/mcp` in Module 6, `/skills` in Module 7, `/plugin` in Module 8, `/context` and `/compact` in Module 11). The following important commands are unique to this section:

| Command | Description |
| --- | --- |
| `/plan [prompt]` | Ask Copilot to create an implementation plan before writing code |
| `/review [prompt]` | Run a code review agent to analyze changes |
| `/diff` | Review all changes made in the current directory during the session |
| `/init` | Initialize Copilot instructions and agentic features for a repository |
| `/tasks` | View and manage background tasks (subagents, shell sessions) |
| `/rename <name>` | Rename the current session for easy identification |
| `/theme [show\|set\|list]` | View or configure the terminal color theme |
| `/terminal-setup` | Configure terminal for multiline input support (shift+enter) |
| `/lsp` | View configured Language Server Protocol servers |
| `/user [show\|list\|switch]` | Manage GitHub user list (multi-account support) |
| `/update` | View update instructions for the latest Copilot CLI version |
| `/changelog` | View the changelog for recent Copilot CLI releases |

## Hands-On Exercises

> [!NOTE]
> **Authentication Required:** You must authenticate before running these exercises. Complete Module 1 (authentication setup) or set one of these environment variables: `GITHUB_TOKEN`, `GH_TOKEN`, or `COPILOT_GITHUB_TOKEN`.

### Exercise 1: Discovering Slash Commands

**Goal:** Learn to discover and use slash commands inside an interactive session.

**Steps:**

1. Start Copilot CLI:
   ```bash
   copilot
   ```text

2. View all available commands:
   ```text
   /help
   ```text

3. Review the output — you'll see commands grouped with descriptions.

4. Try the `/theme` command to see available themes:
   ```text
   /theme list
   ```text

5. Set a theme (optional):
   ```text
   /theme set <theme-id>
   ```text

6. Check your current working directory:
   ```text
   /cwd
   ```text

7. View session usage metrics:
   ```text
   /usage
   ```text

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
   ```text

2. Use `/plan` to create an implementation plan before coding:
   ```text
   /plan Build a simple REST API with Express.js that has CRUD endpoints for a todo list
   ```text

3. Copilot creates a structured plan. Review it before proceeding.

4. Ask Copilot to implement the plan:
   ```text
   Go ahead and implement the plan
   ```text

5. After files are created, review all changes made:
   ```text
   /diff
   ```text

6. Run a code review on the changes:
   ```text
   /review Check for security issues and missing error handling
   ```text

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
   ```text

2. Initialize Copilot configuration for this repository:
   ```text
   /init
   ```text

3. This creates starter files like `AGENTS.md` and `.github/copilot-instructions.md`.

4. Rename this session for easy identification:
   ```text
   /rename init-lab-session
   ```text

5. Check session details:
   ```text
   /session
   ```text

6. View background tasks (if any):
   ```text
   /tasks
   ```text

7. Configure terminal for multiline input:
   ```text
   /terminal-setup
   ```text

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
   ```text

2. Start Copilot CLI:
   ```bash
   copilot
   ```text

3. Ask Copilot to create a file:
   ```text
   Create a Python script named `hello.py` that prints "Hello, Copilot!"
   ```text

   > [!TIP]
   > Specifying the exact filename in prompts ensures consistent results across workshop participants. Without it, Copilot may generate different filenames each time (e.g., `hello_copilot.py`, `hello_python.py`).

4. When prompted to approve the file write, select **Yes**.

5. Ask a follow-up question:
   ```text
   Now modify it to accept a name as a command-line argument
   ```text

6. Continue the conversation:
   ```text
   Add error handling if no argument is provided
   ```text

7. Exit with `/exit` or `Ctrl+C`.

**Expected Outcome:**
A Python script evolves through multiple iterations with your guidance.

### Exercise 5: Tool Approval Workflow

**Goal:** Understand how to approve, deny, and manage tool permissions.

**Steps:**

1. Start a new session:
   ```bash
   copilot
   ```text

2. Ask Copilot to run a command:
   ```text
   List all files in the current directory with details
   ```text

3. Copilot will request to use the `shell` tool. You'll see three options:
   - **Yes** - Allow this time only
   - **Yes, and approve TOOL for the rest of the session** - Session-wide approval
   - **No, and tell Copilot what to do differently** - Deny and redirect

4. Select **Yes** (first option) to allow once.

5. Now ask:
   ```text
   Display the contents of hello.py using the cat command
   ```text

   > [!TIP]
   > Avoid prompts that reference a specific number of lines (e.g., "first 10 lines") for short files — Copilot may reason about the file length instead of running the expected command.

6. Copilot asks for shell permission again (since you only approved once).

7. This time select **Yes, and approve shell for the rest of the session**.

8. Ask another command:
   ```text
   Count the lines in hello.py
   ```text

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
   ```text

2. Run Copilot in programmatic mode:
   ```bash
   copilot -p "What does the README.md contain?"
   ```text

3. Try with tool permissions:
   ```bash
   copilot -p "Add a 'Getting Started' section to README.md" --allow-tool 'write'
   ```text

4. Combine multiple tool permissions:
   ```bash
   copilot -p "Run git status and explain what it means" --allow-tool 'shell(git)'
   ```text

5. Pipe file content as context:
   ```bash
   cat README.md | copilot -p "Explain what this file contains"
   ```text

   > [!TIP]
   > When piping content to Copilot, use prompts that reference "this content" or "this file" rather than "this output" to avoid Copilot responding with "I don't see any output to explain."

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
   ```text

2. Make it executable:
   ```bash
   chmod +x analyze.sh
   ```text

3. Run the script:
   ```bash
   ./analyze.sh
   ```text

**Expected Outcome:**
Multiple Copilot operations run sequentially in a script.

### Exercise 8: Delegate to Cloud Agent

**Goal:** Hand off a task to the cloud-based Copilot coding agent.

**Steps:**

1. Ensure you have a GitHub repository (local work pushed to GitHub).

2. Start interactive mode:
   ```bash
   copilot
   ```text

3. Build some context by exploring:
   ```text
   What files are in this project?
   ```text

4. Use delegate to hand off a task:
   ```text
   /delegate create comprehensive unit tests for all Python files in this project
   ```text

5. Copilot will:
   - Ask you to commit any unstaged changes
   - Create a new branch
   - Open a draft pull request
   - Start working asynchronously

6. You'll receive a link to track progress.

7. Continue working locally while the agent works in the cloud.

**Expected Outcome:**
A draft PR is created and the cloud agent begins working asynchronously.

### Exercise 9: Comparing Modes

**Goal:** Understand when to use each mode.

**Steps:**

1. **Interactive exploration** - Start a session and explore:
   ```bash
   copilot
   > Explain the structure of this codebase
   > What does the main function do?
   > How would I add a new feature?
   > /exit
   ```text

2. **Programmatic for automation** - Single focused tasks:
   ```bash
   # Good for CI/CD
   copilot -p "Run all tests and report failures" --allow-tool 'shell'

   # Good for git workflows
   copilot -p "Summarize changes since last tag" --allow-tool 'shell(git)'
   ```text

3. **Delegate for heavy lifting** - Long-running tasks:
   ```text
   /delegate refactor the authentication module to use JWT tokens
   ```text

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

## Tool Approval Reference

### Approval Options Explained

| Option | Behavior | Risk Level |
| --- | --- | --- |
| Yes | Allow this one time | Low - Full control |
| Yes, for session | Allow all similar for session | Medium - Review first use |
| No | Deny and redirect | None - Maximum safety |

### Dangerous Commands to Watch

⚠️ **Be careful approving session-wide permissions for:**

- `rm` - File deletion
- `chmod` - Permission changes
- `git push` - Pushing to remote
- `sudo` - Elevated privileges
- Network commands - Data exfiltration risk

### Safe Commands for Session Approval

✅ **Generally safe for session-wide approval:**

- `ls`, `cat`, `head`, `tail` - Read-only
- `git status`, `git log`, `git diff` - Read-only git
- `pwd`, `echo` - Environment queries
- Linters and formatters - Analysis only

## Summary

- ✅ **Interactive mode** - Conversational, multi-step, exploratory
- ✅ **Programmatic mode** - Single prompt, scriptable, CI/CD friendly
- ✅ **Delegate mode** - Hands off to cloud agent for heavy tasks
- ✅ **Slash commands** - `/plan`, `/review`, `/diff`, `/init`, and 25+ others for CLI control
- ✅ **Keyboard shortcuts** - `@` for files, `!` for shell, `ctrl+x → /` for commands
- ✅ Tool approval has one-time and session-wide options
- ✅ Be cautious with session-wide approval for destructive commands

## Next Steps

→ Continue to [Module 3: Session Management](03-sessions.md)

## References

- [About Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
- [Use Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-the-copilot-coding-agent)
