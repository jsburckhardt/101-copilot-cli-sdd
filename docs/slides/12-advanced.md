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
         Orchestrator validates
                  ↓
         Consolidated output
```

---

## CI/CD Integration

```yaml
# .github/workflows/copilot-review.yml
- name: Run Code Review
  env:
    GITHUB_TOKEN: ${{ secrets.COPILOT_TOKEN }}
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

# Auth token for CI
export GITHUB_TOKEN="ghp_..."
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

## Your Turn! 🚀

Open **Module 12** in `docs/workshop/12-advanced.md`

Recommended path:
1. **Exercise 4** — Autopilot mode
2. **Exercise 5** — Fleet command
3. **Exercise 2** — CI/CD integration

⏱️ You have **~24 minutes**

---

# 🎉 Workshop Complete!

### What you've learned across all modules:

Installation → Modes → Sessions → Instructions → Tools
→ MCP → Skills → Plugins → Agents → Hooks → Context → Advanced

**Next steps:** Practice daily, create custom agents, share skills with your team

> Resources: [docs.github.com/copilot](https://docs.github.com/en/copilot) · [agentskills.io](https://agentskills.io)

