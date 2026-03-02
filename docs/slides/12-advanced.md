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
---

# Module 12: Advanced Topics

### GitHub Copilot CLI Workshop

---

## Topics Overview

| Topic | What you'll learn |
|-------|------------------|
| **Autopilot** | Autonomous multi-step execution |
| **Fleet** | Parallel sub-agents |
| **CI/CD** | Pipeline integration |
| **Environment** | Config, env vars, `--bash-env` |
| **LSP** | Language server timeout config |
| **Research & Chronicle** | Deep research, session insights |
| **Team workflows** | Standardization patterns |

---

## Autopilot Mode

**Autonomous execution** — Copilot works through multi-step tasks without asking

```bash
copilot --autopilot -p "Create an Express API with auth, tests, and docs"
```

Or toggle mid-session:
```
/autopilot on
/autopilot off
```

- **Permission elevation** (v0.0.414) — shows dialog to prevent auto-denied tool errors
- **Plan approval menu** (v0.0.415) — model-curated actions incl. **autopilot+fleet** option

> ✅ Boilerplate, well-defined tasks
> ❌ High-risk ops, exploratory work

---

## Fleet Command

**Parallel sub-agents** for complex tasks

```
/fleet "Refactor all components to TypeScript and add tests"
```

```
Your Prompt → Orchestrator
                  ↓
    ┌──────┬──────┬──────┬──────┐
    │ Ag 1 │ Ag 2 │ Ag 3 │ Ag 4 │  parallel!
    └──────┴──────┴──────┴──────┘
                  ↓
         Orchestrator validates       ← v0.0.412+
                  ↓
         Consolidated output
```

> v0.0.412: Orchestrator validates sub-agent work, parallel dispatch (9+ concurrent agents)

---

## CI/CD Integration

```yaml
# .github/workflows/copilot-review.yml
- name: Run Code Review
  env:
    COPILOT_GITHUB_TOKEN: ${{ secrets.COPILOT_TOKEN }}
  run: |
    copilot -p "Review PR changes" \
      --allow-tool 'shell(git)' \
      --deny-tool 'write' \
      --silent
```

Key flags for automation: `--silent`, `--allow-tool`, `--deny-tool`

---

## Environment & Configuration

| File | Purpose |
|------|---------|
| `~/.copilot/config.json` | User settings, trusted folders |
| `~/.copilot/mcp-config.json` | MCP servers |
| `~/.copilot/lsp.json` | Language server timeouts |

```bash
# Source custom env in shell sessions
copilot --bash-env

# Custom config location
export XDG_CONFIG_HOME=/custom/path

# Auth tokens (in order of precedence)
export COPILOT_GITHUB_TOKEN="ghp_..."  # highest priority
export GH_TOKEN="ghp_..."
export GITHUB_TOKEN="ghp_..."          # lowest priority
```

---

## Useful Aliases

```bash
# Add to ~/.bashrc or ~/.zshrc

alias cop='copilot'
alias cop-analyze='copilot --deny-tool write'
alias cop-safe='copilot --allow-tool "shell(cat)" --deny-tool write'
alias cop-yolo='copilot --yolo'
alias cop-resume='copilot --resume'
```

---

## /research & /chronicle

**`/research`** (v0.0.417) — deep-research workflow with exportable reports:
```
/research "Compare REST vs GraphQL for mobile backends"
```

**`/chronicle`** (v0.0.419, experimental) — session-history insights:
```
/chronicle standup    # what you accomplished
/chronicle tips       # feature suggestions
/chronicle improve    # workflow improvements
```

> ⚠️ `/chronicle` is experimental — subcommands may change

---

## New Flags & Commands (v0.0.416–v0.0.419)

| What | Details |
|------|---------|
| `--help` (v0.0.416) | Now shows descriptions, examples, sorted flags |
| Status line (v0.0.416) | Auto two-line layout on narrow terminals |
| `/diagnose` (v0.0.419) | Troubleshooting: session & environment diagnostics |
| `--mouse` / `--no-mouse` (v0.0.419) | Alt-screen mouse control (also `mouse` config) |
| `--disable-parallel-tools-execution` | **Removed** in v0.0.418 |

---

## Your Turn! 🚀

Open **Module 12** in `docs/workshop/12-advanced.md`

**Start from Exercise 1** and work through as many as you can

- **Exercise 1** — Environment variables
- **Exercise 2** — CI/CD integration
- **Exercise 3** — Advanced CLI flags
- **Exercise 4–5** — Autopilot mode & fleet command
- **Exercise 6–7** — Shell config & LSP setup
- **Exercise 8–11** — Config, troubleshooting & team workflows
- **Exercise 12** — `/research` deep research & `/chronicle` insights

⏱️ You have **~24 minutes**

---

# 🎉 Workshop Complete!

### What you've learned across all modules:

Installation → Modes → Sessions → Instructions → Tools
→ MCP → Skills → Plugins → Agents → Hooks → Context → Advanced

**Next steps:** Practice daily, create custom agents, share skills with your team

> Resources: [docs.github.com/copilot](https://docs.github.com/en/copilot) · [agentskills.io](https://agentskills.io)

