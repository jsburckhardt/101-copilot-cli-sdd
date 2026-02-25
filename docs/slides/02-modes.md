---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
color: #242424
style: |
  section {
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  h1 {
    color: #0078D4;
    border-bottom: 3px solid #0078D4;
    padding-bottom: 0.3em;
  }
  h2, h3 {
    color: #0078D4;
  }
  code {
    background: #f3f2f1;
    color: #242424;
  }
  pre {
    background: #f3f2f1 !important;
    border-radius: 4px;
    border-left: 4px solid #0078D4;
  }
  table {
    font-size: 0.85em;
  }
  th {
    background: #0078D4;
    color: #ffffff;
  }
  td {
    background: #f3f2f1;
  }
  strong {
    color: #0078D4;
  }
  blockquote {
    border-left: 4px solid #0078D4;
    color: #605e5c;
    background: #f3f2f1;
    padding: 0.5em 1em;
    border-radius: 4px;
  }
  a {
    color: #0078D4;
  }
  footer {
    color: #605e5c;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
---

# Module 2: Operating Modes & Commands

### GitHub Copilot CLI Workshop

---

## Three Ways to Use Copilot CLI

| Mode | Command | Best for |
|------|---------|----------|
| **Interactive** | `copilot` | Exploration, debugging, multi-step |
| **Programmatic** | `copilot -p "..."` | CI/CD, scripts, one-shot tasks |
| **Delegate** | `/delegate` | Long-running, heavy-lifting tasks |

---

## Interactive Mode

Start a **conversation** — context builds over time

```bash
copilot
```

```
> Explain this codebase
> Now refactor the auth module
> Add tests for the changes
> /exit
```

Perfect for: learning, debugging, iterating

---

## Programmatic Mode

**One prompt, one answer, done.**

```bash
copilot -p "summarize the README.md"
```

```bash
# With tool permissions
copilot -p "run tests and explain failures" --allow-tool 'shell'
```

```bash
# Pipe content in
cat error.log | copilot -p "explain these errors"
```

Perfect for: automation, CI/CD, scripting

---

## Delegate Mode

**Hand off to a cloud agent** — it creates a branch and PR

```
/delegate implement user authentication based on the spec
```

- Works **asynchronously** — you keep working locally
- Creates a **draft PR** you can review
- Has full repository context

Perfect for: big features, refactoring, parallel work

---

## Slash Commands

Type **`/help`** to see them all

| Category | Key commands |
|----------|-------------|
| **Workflow** | `/plan`, `/review`, `/diff` |
| **Session** | `/clear`, `/rename`, `/session` |
| **Navigation** | `/cwd`, `/cd` |
| **Context** | `/context`, `/compact` |
| **Config** | `/model`, `/mcp`, `/init` |
| **Tools** | `/allow-all`, `/yolo` |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `@` | Mention files — include as context |
| `!` | Run shell commands directly |
| `Shift+Tab` | Cycle between modes |
| `Esc` | Cancel current operation |
| `ctrl+t` | Toggle reasoning display |
| `ctrl+x → /` | Quick slash command |

---

## Tool Approval

When Copilot wants to run a command, you choose:

| Option | Effect |
|--------|--------|
| **Yes** | Allow once |
| **Yes, for session** | Allow all similar for session |
| **No** | Deny and redirect |

> ⚠️ Be careful with session-wide approval for `rm`, `git push`, `sudo`
> ✅ Safe for `ls`, `cat`, `git status`, `git diff`

---

## Your Turn! 🚀

Open **Module 2** in `docs/workshop/02-modes.md`

**Start from Exercise 1** and work through as many as you can

- **Exercise 1** — Slash commands
- **Exercise 2** — Plan → Review → Diff
- **Exercise 3** — Repo init & sessions
- **Exercise 4–5** — Interactive basics & tool approval
- **Exercise 6–7** — Programmatic mode & chaining
- **Exercise 8–9** — Delegate & comparing modes

⏱️ You have **~16 minutes**

