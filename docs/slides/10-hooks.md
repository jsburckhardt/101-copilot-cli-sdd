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

# Module 10: Hooks

### GitHub Copilot CLI Workshop

---

## What are Hooks?

**Custom scripts** that run at key points in the agent lifecycle

```
Session Start → Prompt → Pre-Tool → Execute → Post-Tool → Session End
     ↓            ↓         ↓                      ↓           ↓
   Hook         Hook      Hook                   Hook        Hook
```

Use cases: **logging**, **security guardrails**, **auditing**, **alerts**

---

## Hook Types

| Hook | Trigger | Common use |
|------|---------|-----------|
| `sessionStart` | Session begins | Logging, setup |
| `sessionEnd` | Session ends | Cleanup, metrics |
| `userPromptSubmitted` | User sends prompt | Audit trail |
| `preToolUse` | Before tool runs | **Permission control** |
| `postToolUse` | After tool runs | Verification, logging |
| `errorOccurred` | Error happens | Alerts, monitoring |

---

## Configuration

Lives at `.github/hooks/hooks.json`

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "bash": ".github/hooks/scripts/check-tool.sh",
        "cwd": ".",
        "timeoutSec": 10
      }
    ]
  }
}
```

---

## Pre-Tool Permission Control

The most powerful hook — **block dangerous operations**

```bash
# Script receives JSON on stdin with toolName + toolArgs
# Return deny decision to block:
echo '{
  "permissionDecision": "deny",
  "permissionDecisionReason": "rm -rf is not allowed"
}'

# Return empty object to allow:
echo '{}'
```

Block `rm -rf`, `sudo`, writes to `.env`, sensitive paths, etc.

---

## Your Turn! 🚀

Open **Module 10** in `docs/workshop/10-hooks.md`

Recommended path:
1. **Exercise 1** — Create hooks skeleton
2. **Exercise 2** — Session logging hooks
3. **Exercise 4** — Pre-tool permission control (the key one!)

⏱️ You have **~16 minutes**

