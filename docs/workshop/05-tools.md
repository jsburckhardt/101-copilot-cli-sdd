# Module 5: Tools & Permissions

## Prerequisites

- Completed Modules 1-4
- Understanding of command-line security concepts
- A test directory for safe experimentation

## Learning Objectives

- Understand Copilot CLI's built-in tools
- Master the permission approval workflow
- Use `--allow-tool` and `--deny-tool` flags effectively
- Understand `--yolo` mode and when to use it safely
- Configure trusted directories

## Concepts

### Built-in Tools

Copilot CLI includes several built-in tools:

| Tool | Purpose | Risk Level |
|------|---------|------------|
| `shell` | Execute shell commands | ⚠️ High |
| `write` | Create/modify files | ⚠️ High |
| `read` | Read file contents | Low |
| `show_file` | Present code/diffs to user in a prominent view (v0.0.415+) | Low |
| `web_fetch` | Fetch web content | Medium |
| `mcp` | Use MCP server tools | Varies |

### Permission Model

Every potentially destructive action requires approval:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ Copilot     │────▶│ Permission   │────▶│ Execute     │
│ wants to    │     │ Prompt       │     │ Action      │
│ use tool    │     │              │     │             │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ User         │
                    │ Decides      │
                    └──────────────┘
```

### Approval Levels

1. **One-time** - Approve this specific invocation only
2. **Session-wide** - Approve this tool for the entire session
3. **Deny** - Reject and provide alternative guidance

## Hands-On Exercises

### Exercise 1: Understanding Tool Prompts

**Goal:** Learn to read and respond to tool approval prompts.

**Steps:**

1. Create a test directory:
   ```bash
   mkdir -p ~/copilot-tools-lab && cd ~/copilot-tools-lab
   git init
   ```

2. Start Copilot:
   ```bash
   copilot
   ```

3. Request a file operation:
   ```
   Create a file called test.txt with "Hello World"
   ```

4. Observe the tool approval prompt. It shows:
   - Tool name: `write`
   - File path: `test.txt`
   - Content preview
   - Three approval options

5. Select **Yes** (one-time approval).

6. Now request another file:
   ```
   Create another file called test2.txt
   ```

7. Notice you're prompted again (one-time didn't persist).

8. This time select **Yes, and approve write for the rest of the session**.

9. Request a third file:
   ```
   Create test3.txt
   ```

10. No prompt this time - session approval persists.

11. To reset all approved tools for the session, use:
    ```
    /reset-allowed-tools
    ```

12. Now request another file operation:
    ```
    Create test4.txt
    ```

13. Notice you're prompted again - the reset cleared all session approvals.

**Expected Outcome:**
You understand the difference between one-time and session-wide approval, and can reset session approvals when needed.

### Exercise 2: Shell Command Approval

**Goal:** Safely approve shell commands with granular control.

**Steps:**

1. In the same session:
   ```
   List all files in the current directory
   ```

2. If Copilot requests `shell(ls)`, approve for session.
   > Note: In some managed environments, `ls` may already be allowed and run without a prompt.

3. Now try:
   ```
   Show me the disk usage of this directory
   ```

4. If prompted, Copilot requests `shell(du)`. This is a different command.

5. Approve `du` for session as well (if prompted).

6. Request something more dangerous:
   ```
   Delete the test.txt file
   ```

7. Copilot requests `shell(rm)` (or blocks it by policy). **Select No** and explain:
   ```
   I don't want to delete files right now. Just show me what would be deleted.
   ```

8. Copilot adjusts its approach without executing `rm` (or reports that `rm` is blocked).

**Expected Outcome:**
Low-risk shell commands may already be pre-approved in some environments, while dangerous commands are still handled separately (prompted or blocked) by command name.

### Exercise 3: Using --allow-tool Flag

**Goal:** Pre-approve tools for programmatic mode.

**Steps:**

1. Exit the interactive session.

2. Run with specific tool allowance:
   ```bash
   copilot -p "Show me all .txt files" --allow-tool 'shell(ls)'
   ```

3. Allow multiple read-only commands:
   ```bash
   copilot -p "Show git status and recent commits" \
     --allow-tool 'shell(git status)' \
     --allow-tool 'shell(git log)'
   ```

4. Allow all shell commands (be careful!):
   ```bash
   copilot -p "Analyze this directory structure" --allow-tool 'shell'
   ```

5. Allow file writing:
   ```bash
   copilot -p "Create a README.md with project description" --allow-tool 'write'
   ```

**Expected Outcome:**
Commands execute without interactive prompts.

### Exercise 4: Using --deny-tool Flag

**Goal:** Explicitly block dangerous operations.

**Steps:**

1. Allow all tools but block dangerous ones:
   ```bash
   copilot -p "Help me clean up this project" \
     --allow-all-tools \
     --deny-tool 'shell(rm)' \
     --deny-tool 'shell(rm -rf)'
   ```

2. Block git push while allowing other git:
   ```bash
   copilot -p "Commit these changes with a good message" \
     --allow-tool 'shell(git:*)' \
     --deny-tool 'shell(git push)'
   ```

3. Block file modifications:
   ```bash
   copilot -p "Review this codebase" \
     --allow-tool 'shell' \
     --deny-tool 'write'
   ```

4. Create a safe analysis mode:
   ```bash
   copilot -p "Analyze security issues" \
     --allow-tool 'shell(cat)' \
     --allow-tool 'shell(grep)' \
     --allow-tool 'shell(find)' \
     --deny-tool 'shell(rm)' \
     --deny-tool 'shell(mv)' \
     --deny-tool 'write'
   ```

**Expected Outcome:**
Deny rules take precedence over allow rules.

### Exercise 5: YOLO Mode (Careful!)

**Goal:** Understand fully autonomous execution.

**Steps:**

⚠️ **WARNING:** Only use `--yolo` in safe, isolated environments!

1. Create an isolated test directory:
   ```bash
   mkdir -p ~/yolo-test && cd ~/yolo-test
   echo "test content" > safe-file.txt
   ```

2. Run with yolo mode on a safe task:
   ```bash
   copilot --yolo -p "Create a Python hello world script"
   ```

3. Notice: No prompts, file created directly.

4. More complex autonomous task:
   ```bash
   copilot --yolo -p "Create a Node.js project with package.json and a simple server"
   ```

5. Review what was created:
   ```bash
   ls -la
   cat package.json
   ```

**When to Use YOLO:**
- ✅ Inside Docker containers
- ✅ Disposable dev environments
- ✅ CI/CD pipelines with controlled scope
- ✅ Codespaces that can be reset

**When NOT to Use YOLO:**
- ❌ Production systems
- ❌ Directories with important data
- ❌ Shared development environments
- ❌ When untrusted input is involved

**Expected Outcome:**
You understand YOLO mode's power and risks.

### Exercise 6: Configuring Trusted and Accessible Directories

**Goal:** Understand the two separate directory permission layers in Copilot CLI.

> **Key concept:** Copilot CLI has two distinct directory controls:
>
> | Layer | Purpose | Scope |
> |---|---|---|
> | **Startup trust** (`trusted_folders`) | Skips the "do you trust this folder?" prompt when launching Copilot | Launch-time only |
> | **Runtime access** (`/add-dir`, `--allow-path`) | Controls which paths the agent can read/write during a session | Session-time only |
>
> These are **independent** — trusting a folder does **not** grant runtime file access to it, and vice versa.

#### Part A: Startup Trust

1. Start Copilot in a new directory:
   ```bash
   mkdir -p ~/trusted-test && cd ~/trusted-test
   copilot
   ```

2. When prompted about trusting the folder:
   - **Yes, proceed** — Trust for this session only
   - **Yes, and remember** — Permanently add to `trusted_folders`
   - **No, exit** — Don't trust

3. Select **Yes, proceed** for now.

4. In a side terminal, check the config:
   ```bash
   cat ~/.copilot/config.json
   ```
   Notice that `trusted_folders` was **not** updated (you chose session-only trust).

5. To permanently skip the prompt for specific directories, add them to your config:
   ```bash
   # Edit config.json to add:
   {
     "trusted_folders": [
       "/home/user/projects",
       "/home/user/copilot-workshop"
     ]
   }
   ```
   Next time you launch Copilot from those directories, it won't ask for trust confirmation.

#### Part B: Runtime File Access

6. Back in your Copilot session, check which paths the agent can access:
   ```
   /list-dirs
   ```
   You'll see only the **working directory** and `/tmp` — not the `trusted_folders` entries.

7. Grant runtime access to an additional directory:
   > Note: Create the directory first (e.g., `mkdir -p /tmp/safe-dir`).
   ```
   /add-dir /tmp/safe-dir
   ```

8. Verify with `/list-dirs` — the new path now appears.

9. To grant runtime access at launch instead, use the `--allow-path` flag:
   ```bash
   copilot --allow-path /home/user/projects --allow-path /home/user/copilot-workshop
   ```

**Expected Outcome:**
You understand that `trusted_folders` controls the **startup trust prompt**, while `/add-dir`, `/list-dirs`, and `--allow-path` control **runtime file access** — and that these are two independent permission layers.

### Exercise 7: Creating a Safe Automation Script

**Goal:** Build a secure automated workflow.

**Steps:**

1. Create a script `analyze-project.sh`:
   ```bash
   #!/bin/bash
   set -e

   PROJECT_DIR="${1:-.}"

   echo "🔍 Analyzing project in: $PROJECT_DIR"
   echo "=================================="

   # Safe analysis - read-only operations only
   copilot -p "Analyze the code quality and suggest improvements" \
     --allow-tool 'shell(find)' \
     --allow-tool 'shell(wc)' \
     --allow-tool 'shell(grep)' \
     --allow-tool 'shell(cat)' \
     --allow-tool 'shell(head)' \
     --allow-tool 'shell(tail)' \
     --deny-tool 'write' \
     --deny-tool 'shell(rm)' \
     --deny-tool 'shell(mv)' \
     --deny-tool 'shell(chmod)' \
     --silent
   ```

2. Create a code review script:
   ```bash
   #!/bin/bash

   # Review changes but don't modify anything
   copilot -p "Review the git diff and provide feedback" \
     --allow-tool 'shell(git diff)' \
     --allow-tool 'shell(git log)' \
     --allow-tool 'shell(git status)' \
     --deny-tool 'shell(git push)' \
     --deny-tool 'shell(git commit)' \
     --deny-tool 'write'
   ```

3. Make executable and test:
   ```bash
   chmod +x analyze-project.sh
   ./analyze-project.sh
   ```

**Expected Outcome:**
Safe, repeatable automation with explicit permissions.

## Tool Permission Reference

### Allow/Deny Syntax

```bash
# Allow specific command
--allow-tool 'shell(git status)'

# Allow command family
--allow-tool 'shell(git:*)'

# Allow all shell
--allow-tool 'shell'

# Allow file writes
--allow-tool 'write'

# Allow MCP server
--allow-tool 'mcp-server-name'

# Deny takes precedence
--allow-all-tools --deny-tool 'shell(rm)'
```

### Risk Categories

| Category | Commands | Recommendation |
|----------|----------|----------------|
| Read-only | `ls`, `cat`, `grep`, `find` | Safe for session |
| Git read | `git status`, `git log`, `git diff` | Safe for session |
| Git write | `git commit`, `git push` | One-time only |
| File modify | `touch`, `echo >`, `sed -i` | Review each use |
| File delete | `rm`, `rm -rf` | Always one-time |
| System | `chmod`, `chown`, `sudo` | Deny in automation |

### Shorthand Flags

| Flag | Equivalent |
|------|------------|
| `--yolo` | `--allow-all-tools --allow-all-paths --allow-all-urls` |
| `--available-tools` | Allowlist specific tools |
| `--excluded-tools` | Denylist specific tools |

### Runtime Slash Commands

| Command | Description |
|---------|-------------|
| `/reset-allowed-tools` | Reset the list of tools approved during the session |
| `/add-dir <path>` | Add a trusted directory for the session |
| `/list-dirs` | View accessible directories |

## Summary

- ✅ Copilot requires approval for high-risk actions; some low-risk tools may be pre-approved by environment policy
- ✅ One-time vs session-wide approval gives granular control
- ✅ Use `/reset-allowed-tools` to clear session approvals
- ✅ `--allow-tool` and `--deny-tool` enable automation
- ✅ Deny rules take precedence over allow rules
- ✅ `--yolo` enables full autonomy - use only in safe environments
- ✅ Trusted directories control Copilot's file access scope

## Next Steps

→ Continue to [Module 6: MCP Servers](06-mcps.md)

## References

- [About Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
- [Responsible Use of Copilot CLI](https://docs.github.com/en/copilot/responsible-use/copilot-cli)
- [Use Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
