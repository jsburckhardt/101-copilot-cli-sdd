# Module 3: Session Management

## Prerequisites

- Completed Modules 1-2
- Copilot CLI installed and authenticated

## Learning Objectives

- Understand session lifecycle and persistence
- Resume and continue previous sessions
- Use session-related slash commands
- Track session usage and metrics
- Clear context when needed

## Concepts

### What is a Session?

A session is a continuous interaction with Copilot CLI that maintains:
- **Conversation history** - All prompts and responses
- **Context** - Files, directories, and information gathered
- **Tool approvals** - Permissions granted during the session
- **Working directory** - The directory scope

Sessions can be:
- **Continued** - Pick up where you left off
- **Resumed** - Restore a previous session
- **Cleared** - Start fresh while staying in Copilot

### Session Storage

Sessions are stored in your Copilot config directory:
- Default: `~/.copilot/`
- Custom: Set via `XDG_CONFIG_HOME` environment variable

## Hands-On Exercises

### Exercise 1: Session Persistence

> ⚠️ **FEEDBACK**: Session persistence behavior may be unclear. By default, each `copilot` invocation starts a **fresh session**. The expected outcome stating "Recent session context is preserved when quickly re-entering" may not match actual behavior. Use `--resume` (Exercise 2) to explicitly restore a previous session. Clarification is needed on whether auto-resume is a feature or if `--resume` is always required.

**Goal:** Understand how sessions persist between interactions.

**Steps:**

1. Start a new session and gather some context:
   ```bash
   copilot
   ```

2. Ask Copilot to remember something:
   ```
   Remember that I'm working on a user authentication feature. The main file is auth.py.
   ```

3. Ask about the files:
   ```
   What files are in the current directory?
   ```

4. Exit with `Ctrl+C` (not `/exit`).

5. Immediately start Copilot again:
   ```bash
   copilot
   ```

6. Ask if it remembers:
   ```
   What feature was I working on?
   ```

7. Copilot should remember from the previous session context.

**Expected Outcome:**
Recent session context is preserved when quickly re-entering.

### Exercise 2: Resume a Session

**Goal:** Learn to explicitly resume a previous session.

**Steps:**

1. Start a session and do some work:
   ```bash
   copilot
   ```
   ```
   Create a file called notes.txt with "Session 1 notes"
   ```

2. Use `/session` to see session info:
   ```
   /session
   ```

3. Note the session ID displayed.

4. Exit completely:
   ```
   /exit
   ```

5. Start a new session with resume flag:
   ```bash
   copilot --resume
   ```

6. Verify you're in the same context:
   ```
   What was the last file we created?
   ```

**Expected Outcome:**
The `--resume` flag restores your previous session state.

### Exercise 3: Slash Commands for Session Control

**Goal:** Master session-related slash commands.

**Steps:**

1. Start an interactive session:
   ```bash
   copilot
   ```

2. **View all commands:**
   ```
   /help
   ```

3. **Check current session:**
   ```
   /session
   ```
   This shows:
   - Session ID
   - Start time
   - Duration
   - Files modified
   - Commands executed

4. **Check usage statistics:**
   ```
   /usage
   ```
   This shows:
   - Token consumption
   - API calls made
   - Model used

5. **View current working directory:**
   ```
   /cwd
   ```

6. **Clear conversation history:**
   ```
   /clear
   ```

7. Verify context is cleared:
   ```
   What was I just working on?
   ```

   Copilot won't know because context was cleared.

**Expected Outcome:**
You understand each session command's purpose.

### Exercise 4: Managing Working Directory

**Goal:** Control which directories Copilot can access.

**Steps:**

1. Start in your home directory:
   ```bash
   cd ~
   copilot
   ```

2. Check current working directory:
   ```
   /cwd
   ```

3. Change to a specific project:
   ```
   /cwd ~/copilot-workshop
   ```

4. Verify the change:
   ```
   /cwd
   ```

5. Add another directory for access:
   ```
   /add-dir ~/another-project
   ```

6. List all accessible directories:
   ```
   /list-dirs
   ```

7. Try to access a file outside allowed directories:
   ```
   Show me /etc/passwd
   ```

   Copilot should request permission or refuse.

**Expected Outcome:**
You can control Copilot's file access scope.

### Exercise 5: Session Clearing Strategies

**Goal:** Know when and how to clear session context.

**Steps:**

1. Build up context in a session:
   ```bash
   copilot
   ```
   ```
   Let's work on the frontend. The main component is App.tsx.
   ```
   ```
   The backend uses Express.js with routes in /api.
   ```
   ```
   We're using PostgreSQL for the database.
   ```

2. Check token usage:
   ```
   /context
   ```

3. Notice context filling up. If working on something unrelated:
   ```
   /clear
   ```

4. Start fresh:
   ```
   Now let's work on a completely different Python script.
   ```

5. **Alternative: Partial clear** - Exit and start new:
   ```
   /exit
   ```
   ```bash
   copilot
   ```

**When to Clear:**

| Scenario | Action |
|----------|--------|
| Switching to unrelated task | `/clear` |
| Confused responses | `/clear` |
| Context limit approaching | `/compact` first, then `/clear` if needed |
| Sensitive info discussed | `/clear` and `/exit` |
| Session becomes slow | `/clear` |

**Expected Outcome:**
You know when clearing context improves your workflow.

### Exercise 6: Multiple Sessions Strategy

**Goal:** Work with multiple Copilot instances.

**Steps:**

1. Open Terminal 1 - Frontend work:
   ```bash
   cd ~/project/frontend
   copilot
   ```
   ```
   Let's focus on React components
   ```

2. Open Terminal 2 - Backend work:
   ```bash
   cd ~/project/backend
   copilot
   ```
   ```
   Let's focus on API endpoints
   ```

3. Each terminal maintains its own:
   - Session context
   - Working directory
   - Tool approvals

4. Switch between terminals as needed for parallel work.

**Expected Outcome:**
You can run multiple focused sessions simultaneously.

### Exercise 7: Session Export and Sharing

> ⚠️ **FEEDBACK**: The `--share` and `--share-gist` flags may not be available in all versions. These flags were not visible in `copilot --help` for version `0.0.400`. If these commands don't work, they may be from a newer version or preview build. Check `copilot --help` to verify available flags in your installation.

**Goal:** Export session transcripts for documentation or sharing.

**Steps:**

1. Start a session and do meaningful work:
   ```bash
   copilot
   ```
   ```
   Explain the architecture of a typical Express.js application
   ```

2. Have a productive conversation building up knowledge.

3. Export to a file:
   ```bash
   copilot --share ./session-export.md
   ```
   
4. Or export to a GitHub Gist:
   ```bash
   copilot --share-gist
   ```

5. Review the exported markdown file:
   ```bash
   cat session-export.md
   ```

**Expected Outcome:**
Session transcript saved for future reference or sharing.

## Session Slash Commands Reference

| Command | Description | Example |
|---------|-------------|---------|
| `/help` | List all commands | `/help` |
| `/session` | Show session info | `/session` |
| `/usage` | Show usage stats | `/usage` |
| `/cwd` | Show/change directory | `/cwd ~/project` |
| `/add-dir` | Add accessible directory | `/add-dir /tmp` |
| `/list-dirs` | List accessible directories | `/list-dirs` |
| `/clear` | Clear conversation history | `/clear` |
| `/exit` | End session | `/exit` |
| `/model` | Switch AI model | `/model gpt-4` |

## Command Line Flags

| Flag | Description |
|------|-------------|
| `--resume` | Resume last session |
| `--share PATH` | Export to markdown file |
| `--share-gist` | Export to GitHub Gist |
| `--silent` | Suppress stats/logs |

## Summary

- ✅ Sessions maintain conversation history and context
- ✅ Use `--resume` to continue previous sessions
- ✅ `/clear` resets context without exiting
- ✅ `/cwd` and `/add-dir` control file access scope
- ✅ Run multiple sessions in different terminals
- ✅ Export sessions with `--share` for documentation

## Next Steps

→ Continue to [Module 4: Custom Instructions](04-instructions.md)

## References

- [Use Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Slash Commands Cheat Sheet](https://github.blog/ai-and-ml/github-copilot/a-cheat-sheet-to-slash-commands-in-github-copilot-cli/)
