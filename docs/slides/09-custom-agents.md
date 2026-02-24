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

# Module 9: Custom Agents

### GitHub Copilot CLI Workshop

---

## What are Custom Agents?

**Specialized Copilot personas** with:

- 🎭 Defined role and expertise
- 🔧 Specific tool access
- 🚫 Clear boundaries
- 📚 Domain knowledge

Live in **`.github/agents/name.md`** → invoke with **`@name`**

---

## Agent File Structure

```yaml
---
name: test-agent
description: Writes tests following TDD principles
model: claude-sonnet-4.6          # optional
tools:                             # optional (default = all)
  - shell
  - read
  - write
---

# Test Writing Agent

You are a senior QA engineer...

## DO NOT
- Never modify source code (only test files)
- Never skip failing tests
```

---

## Built-in Agents

Use these right now — no setup needed

| Agent | What it does | Example |
|-------|-------------|---------|
| `@explore` | Fast codebase Q&A | `@explore how does auth work?` |
| `@task` | Run commands smartly | `@task run tests, summarize` |
| `@plan` | Implementation planning | `@plan add user profiles` |
| `@code-review` | High-signal reviews | `@code-review last 3 commits` |

---

## Agent Hierarchy

```
Enterprise agents    (.github-private repo)
       ↓
Organization agents  (.github-private repo)
       ↓
Repository agents    (.github/agents/)
       ↓
AGENTS.md            (root or subdirectory)
```

More specific **overrides** less specific
Agents can **delegate to other agents** (`@test-agent`, `@docs-agent`)

---

## Your Turn! 🚀

Open **Module 9** in `docs/workshop/09-custom-agents.md`

Recommended path:
1. **Exercise 1** — Create your first custom agent
2. **Exercise 3** — Try the built-in agents
3. **Exercise 4** — Agent with tool restrictions

⏱️ You have **~8 minutes**

