# Module 2: Operating Modes

## Prerequisites

- Copilot CLI installed and authenticated (Module 1)
- A project directory to work in

## Learning Objectives

- Understand the difference between interactive and programmatic modes
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
```

### Programmatic Mode

Programmatic mode executes a single prompt and exits. Perfect for:
- CI/CD pipelines
- Scripting and automation
- Batch processing
- Single-shot tasks

```bash
# Execute a single prompt
copilot -p "summarize the README.md file"
```

### Delegate Mode

The `/delegate` command hands off work to GitHub's cloud-based Copilot coding agent. Use it for:
- Long-running tasks
- Compute-intensive operations
- Parallel work (you continue locally while agent works)
- Tasks that benefit from full repository context

```
/delegate implement the user authentication feature based on the spec
```

## Hands-On Exercises

> ⚠️ **FEEDBACK**: These exercises require authentication. If you encounter errors like "not authenticated", ensure you've completed Module 1 Exercise 4, or set one of these environment variables for programmatic authentication: `GITHUB_TOKEN`, `GH_TOKEN`, or `COPILOT_GITHUB_TOKEN`.

### Exercise 1: Interactive Mode Basics

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
   ```
   Create a simple Python script that prints "Hello, Copilot!"
   ```

4. When prompted to approve the file write, select **Yes**.

5. Ask a follow-up question:
   ```
   Now modify it to accept a name as a command-line argument
   ```

6. Continue the conversation:
   ```
   Add error handling if no argument is provided
   ```

7. Exit with `/exit` or `Ctrl+C`.

**Expected Outcome:**
A Python script evolves through multiple iterations with your guidance.

### Exercise 2: Tool Approval Workflow

**Goal:** Understand how to approve, deny, and manage tool permissions.

**Steps:**

1. Start a new session:
   ```bash
   copilot
   ```

2. Ask Copilot to run a command:
   ```
   List all files in the current directory with details
   ```

3. Copilot will request to use the `shell` tool. You'll see three options:
   - **Yes** - Allow this time only
   - **Yes, and approve TOOL for the rest of the session** - Session-wide approval
   - **No, and tell Copilot what to do differently** - Deny and redirect

4. Select **Yes** (first option) to allow once.

5. Now ask:
   ```
   Show me the first 10 lines of hello.py
   ```

6. Copilot asks for shell permission again (since you only approved once).

7. This time select **Yes, and approve shell for the rest of the session**.

8. Ask another command:
   ```
   Count the lines in hello.py
   ```

9. Notice Copilot doesn't ask for permission this time.

**Expected Outcome:**
You understand the difference between one-time and session-wide tool approval.

### Exercise 3: Programmatic Mode

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

5. Pipe output:
   ```bash
   copilot -p "Explain this output" < README.md
   ```

**Expected Outcome:**
Commands execute and exit without entering interactive mode.

### Exercise 4: Chaining Prompts

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

### Exercise 5: Delegate to Cloud Agent

**Goal:** Hand off a task to the cloud-based Copilot coding agent.

**Steps:**

1. Ensure you have a GitHub repository (local work pushed to GitHub).

2. Start interactive mode:
   ```bash
   copilot
   ```

3. Build some context by exploring:
   ```
   What files are in this project?
   ```

4. Use delegate to hand off a task:
   ```
   /delegate create comprehensive unit tests for all Python files in this project
   ```

5. Copilot will:
   - Ask you to commit any unstaged changes
   - Create a new branch
   - Open a draft pull request
   - Start working asynchronously

6. You'll receive a link to track progress.

7. Continue working locally while the agent works in the cloud.

**Expected Outcome:**
A draft PR is created and the cloud agent begins working asynchronously.

### Exercise 6: Comparing Modes

**Goal:** Understand when to use each mode.

**Steps:**

1. **Interactive exploration** - Start a session and explore:
   ```bash
   copilot
   > Explain the structure of this codebase
   > What does the main function do?
   > How would I add a new feature?
   > /exit
   ```

2. **Programmatic for automation** - Single focused tasks:
   ```bash
   # Good for CI/CD
   copilot -p "Run all tests and report failures" --allow-tool 'shell'
   
   # Good for git workflows  
   copilot -p "Summarize changes since last tag" --allow-tool 'shell(git)'
   ```

3. **Delegate for heavy lifting** - Long-running tasks:
   ```
   /delegate refactor the authentication module to use JWT tokens
   ```

**Decision Guide:**

| Scenario | Recommended Mode |
|----------|------------------|
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
|--------|----------|------------|
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
- ✅ Tool approval has one-time and session-wide options
- ✅ Be cautious with session-wide approval for destructive commands

## Next Steps

→ Continue to [Module 3: Session Management](03-sessions.md)

## References

- [About Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
- [Use Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-the-copilot-coding-agent)
