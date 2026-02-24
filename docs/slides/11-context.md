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

# Module 11: Context Management

### GitHub Copilot CLI Workshop

---

## What's in the Context Window?

```
┌──────────────────────────────────────┐
│  System Instructions (AGENTS.md)     │  fixed overhead
├──────────────────────────────────────┤
│  Conversation History                │  grows with chat
├──────────────────────────────────────┤
│  File Contents                       │  can be large
├──────────────────────────────────────┤
│  Tool Results                        │  varies
├──────────────────────────────────────┤
│  ← Space left for response →        │  shrinks!
└──────────────────────────────────────┘
```

When full → **auto-compaction** at ~95% capacity

---

## Key Commands

| Command | Action | When to use |
|---------|--------|-------------|
| `/context` | Show token usage | Check regularly |
| `/compact` | Compress history | Long sessions |
| `/clear` | Reset everything | Switching topics |
| `@explore` | Query without context cost | Codebase overview |

---

## Context-Efficient Prompting

**❌ Wasteful:**
```
Read all files in src/ and explain each one
```

**✅ Efficient:**
```
List files in src/
```
then selectively:
```
Show me just src/auth/middleware.ts
```

> Load on-demand, not all at once. Use `@explore` for overviews.

---

## Optimization Strategies

| Strategy | When |
|----------|------|
| `/clear` | Switching to unrelated topic |
| `/compact` | Long session, need to continue |
| `@explore` | Codebase overview without cost |
| Selective reads | Large files, specific needs |
| Batch questions | Multiple related questions |
| Summarize → clear | Preserve knowledge, free space |

---

## Your Turn! 🚀

Open **Module 11** in `docs/workshop/11-context.md`

Recommended path:
1. **Exercise 1** — Monitor context usage with `/context`
2. **Exercise 2** — Manual compaction with `/compact`
3. **Exercise 3** — Context-efficient prompting

⏱️ You have **~12 minutes**

