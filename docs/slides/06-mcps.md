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

# Module 6: MCP Servers

### GitHub Copilot CLI Workshop

---

## What is MCP?

**Model Context Protocol** — an open standard that gives Copilot **plugins**

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│ Copilot CLI │────>│ MCP Server  │────>│ External Tools  │
│             │<────│             │<────│ & Resources     │
└─────────────┘     └─────────────┘     └─────────────────┘
```

Connect Copilot to: databases, APIs, file systems, search, Slack, and more

---

## Three Types of MCP Servers

| Type | Protocol | Where it runs | Example |
|------|----------|--------------|---------|
| **Built-in** | N/A | Included with Copilot | GitHub (issues, PRs, repos) |
| **Remote** | `http` / `sse` | Hosted externally | Cloud APIs, team services |
| **Local** | `local` / `stdio` | Your machine | Memory, filesystem, Postgres |

> `local` = `stdio`, `http` = streamable HTTP, `sse` = legacy SSE (deprecated)

---

## Configuration

Lives at **`~/.copilot/mcp-config.json`**

```json
{
  "mcpServers": {
    "memory": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "exa": { "type": "http", "url": "https://mcp.exa.ai/mcp" }
  }
}
```

**Local** → `"type": "local"` + `command`/`args` | **Remote** → `"type": "http"` + `url`
Optional: `"tools": ["*"]` (default), `"env": {}`, `"headers": {}`

---

## Built-in GitHub MCP

**Already configured** — no setup needed

```
> What are the open issues in this repository?
> Show me recent pull requests
> What changed in the last commit?
```

Copilot uses GitHub MCP tools automatically

---

## Popular MCP Servers

| Server | Package / URL | What it does |
|--------|---------------|-------------|
| Exa | `https://mcp.exa.ai/mcp` (remote) | Web search, code search |
| Memory | `server-memory` | Remember things across sessions |
| Filesystem | `server-filesystem` | Structured file access |
| PostgreSQL | `server-postgres` | Query databases |

Full list: [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

---

## Managing MCP Servers

All from inside a Copilot session:

| Command | Action |
|---------|--------|
| `/mcp show` | List all servers (grouped by source, v0.0.415) |
| `/mcp show NAME` | View details and tools for a specific server |
| `/mcp add` | Interactive setup (available immediately) |
| `/mcp edit NAME` | Edit an existing server |
| `/mcp delete NAME` | Remove a server |
| `/mcp reload` | Reload config without restart (v0.0.412+) |
| `/mcp disable/enable` | Toggle server on/off |

> Use `--additional-mcp-config "$(cat file.json)"` for session-only servers

---

## Your Turn! 🚀

Open **Module 6** in `docs/workshop/06-mcps.md`

**Start from Exercise 1** and work through as many as you can

- **Exercise 1** — Explore GitHub MCP
- **Exercise 2** — Remote MCP server
- **Exercise 3** — Local MCP server
- **Exercise 4** — File system MCP
- **Exercise 5** — MCP management commands
- **Exercise 6** — MCP tools with permissions
- **Exercise 7** — Temporary MCP config

⏱️ You have **~12 minutes**

