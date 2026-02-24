---
title: "Tools & Permissions"
description: "Built-in tools, allow/deny permissions, and yolo mode"
sidebar_position: 2
keywords: [copilot, cli, tools, permissions, yolo, security]
---

## Prerequisites

* Completed Modules 1-4
* Understanding of command-line security concepts
* A test directory for safe experimentation

## Learning Objectives

* Understand Copilot CLI's built-in tools
* Master the permission approval workflow
* Use `--allow-tool` and `--deny-tool` flags effectively
* Understand `--yolo` mode and when to use it safely
* Configure trusted directories

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

```text
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
   ```text
   Create a file called test.txt with "Hello World"
   ```

4. Observe the tool approval prompt. It shows:
   * Tool name: `write`
   * File path: `test.txt`
   * Content preview
   * Three approval options

5. Select **Yes** (one-time approval).

6. Now request another file:
   ```text
   Create another file called test2.txt
   ```

7. Notice you're prompted again (one-time didn't persist).

8. This time select **Yes, and approve write for the rest of the session**.

9. Request a third file:
   ```text
   Create test3.txt
   ```

10. No prompt this time - session approval persists.

11. To reset all approved tools for the session, use:
    ```text
    /reset-allowed-tools
    ```

12. Now request another file operation:
    ```text
    Create test4.txt
    ```

13. Notice you're prompted again - the reset cleared all session approvals.

**Expected Outcome:**
You understand the difference between one-time and session-wide approval, and can reset session approvals when needed.

### Exercise 2: Shell Command Approval

**Goal:** Safely approve shell commands with granular control.

**Steps:**

1. In the same session:
   ```text
   List all files in the current directory
   ```

2. Copilot requests `shell(ls)`. Approve for session.

3. Now try:
   ```text
   Show me the disk usage of this directory
   ```

4. Copilot requests `shell(du)`. This is a different command!

5. Approve `du` for session as well.

6. Request something more dangerous:
   ```text
   Delete the test.txt file
   ```

7. Copilot requests `shell(rm)`. **Select No** and explain:
   ```text
   I don't want to delete files right now. Just show me what would be deleted.
   ```

8. Copilot adjusts its approach without executing `rm`.

**Expected Outcome:**
Shell commands are approved individually by command name.

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
     --allow-tool 'shell(git)' \
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

:::warning
Only use `--yolo` in safe, isolated environments!
:::

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
* ✅ Inside Docker containers
* ✅ Disposable dev environments
* ✅ CI/CD pipelines with controlled scope
* ✅ Codespaces that can be reset

**When NOT to Use YOLO:**
* ❌ Production systems
* ❌ Directories with important data
* ❌ Shared development environments
* ❌ When untrusted input is involved

**Expected Outcome:**
You understand YOLO mode's power and risks.

### Exercise 6: Configuring Trusted Directories

**Goal:** Manage which directories Copilot can access.

**Steps:**

1. Start Copilot in a new directory:
   ```bash
   mkdir -p ~/trusted-test && cd ~/trusted-test
   copilot
   ```

2. When prompted about trusting the folder:
   * **Yes, proceed** - Trust for this session only
   * **Yes, and remember** - Permanently trust
   * **No, exit** - Don't trust

3. Select **Yes, proceed** for now.

4. Check trusted directories in config:
   ```bash
   cat ~/.copilot/config.json
   ```

5. Manually add trusted directories by editing `config.json`:
   ```json
   {
     "trusted_folders": [
       "/home/user/projects",
       "/home/user/copilot-workshop"
     ]
   }
   ```

6. Use `/add-dir` at runtime:
   ```text
   /add-dir /tmp/safe-dir
   ```

7. View accessible directories:
   ```text
   /list-dirs
   ```

**Expected Outcome:**
You can control directory access both persistently and per-session.

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
--allow-tool 'shell(git)'

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
| `--yolo` | `--allow-all-tools` |
| `--available-tools` | Allowlist specific tools |
| `--excluded-tools` | Denylist specific tools |

### Runtime Slash Commands

| Command | Description |
|---------|-------------|
| `/reset-allowed-tools` | Reset the list of tools approved during the session |
| `/add-dir <path>` | Add a trusted directory for the session |
| `/list-dirs` | View accessible directories |

## Summary

* ✅ Copilot requires approval for file changes and command execution
* ✅ One-time vs session-wide approval gives granular control
* ✅ Use `/reset-allowed-tools` to clear session approvals
* ✅ `--allow-tool` and `--deny-tool` enable automation
* ✅ Deny rules take precedence over allow rules
* ✅ `--yolo` enables full autonomy, use only in safe environments
* ✅ Trusted directories control Copilot's file access scope

## Next Steps

→ Continue to [Module 6: MCP Servers](/docs/customization/mcp-servers)

## References

* [About Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
* [Responsible Use of Copilot CLI](https://docs.github.com/en/copilot/responsible-use/copilot-cli)
* [Use Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
