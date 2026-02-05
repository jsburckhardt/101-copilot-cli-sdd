# Module 6: MCP Servers

## Prerequisites

- Completed Modules 1-5
- Understanding of JSON configuration
- Node.js and npm installed

## Learning Objectives

- Understand the Model Context Protocol (MCP)
- Configure remote and local MCP servers
- Use the GitHub MCP server for repository operations
- Add custom MCP servers to extend Copilot's capabilities
- Manage MCP servers with slash commands

## Concepts

### What is MCP?

Model Context Protocol (MCP) is an open standard that extends AI capabilities:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Copilot CLI │────▶│ MCP Server  │────▶│ External    │
│             │     │             │     │ Resources   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │ Tools       │
                    │ Prompts     │
                    │ Resources   │
                    └─────────────┘
```

### Server Types

| Type | Location | Use Case |
|------|----------|----------|
| Remote | Hosted externally | Team-wide tools, cloud services |
| Local | Runs on your machine | Local resources, custom tools |
| Built-in | Included with Copilot | GitHub integration |

### Configuration Location

MCP servers are configured in:
- Default: `~/.copilot/mcp-config.json`
- Custom: Set via `XDG_CONFIG_HOME`

## Hands-On Exercises

### Exercise 1: Explore the GitHub MCP Server

**Goal:** Use the built-in GitHub MCP server.

**Steps:**

1. Start Copilot:
   ```bash
   copilot
   ```

2. View current MCP configuration:
   ```
   /mcp show
   ```

3. The GitHub MCP server is pre-configured. Try using it:
   ```
   What are the open issues in this repository?
   ```

4. If you have a GitHub repository:
   ```
   Show me the recent pull requests
   ```

5. GitHub MCP provides tools for:
   - Viewing issues and PRs
   - Reading repository content
   - Accessing organization info
   - Interacting with GitHub resources

**Expected Outcome:**
Copilot can access GitHub resources through the built-in MCP server.

> ⚠️ **FEEDBACK**: Manually editing `~/.copilot/mcp-config.json` is straightforward. The command structure for MCP config follows the standard MCP specification. Verify the JSON syntax is valid before restarting Copilot.

### Exercise 2: Configure a Remote MCP Server

**Goal:** Add a remote MCP server with authentication.

**Steps:**

1. View current config file:
   ```bash
   cat ~/.copilot/mcp-config.json
   ```

2. Start Copilot and use the interactive MCP setup:
   ```bash
   copilot
   ```
   ```
   /mcp add
   ```

3. Use Tab to navigate between fields:
   - **Name**: `github-api`
   - **Type**: remote
   - **URL**: `https://api.githubcopilot.com/mcp/`
   - **Auth Header**: `Authorization: Bearer YOUR_PAT_HERE`

4. Press `Ctrl+S` to save.

5. Verify the configuration:
   ```
   /mcp show
   ```

6. Alternatively, edit the config file directly:
   ```bash
   cat > ~/.copilot/mcp-config.json << 'EOF'
   {
     "servers": {
       "github": {
         "url": "https://api.githubcopilot.com/mcp/",
         "requestInit": {
           "headers": {
             "Authorization": "Bearer ${GITHUB_TOKEN}"
           }
         }
       }
     }
   }
   EOF
   ```

**Expected Outcome:**
Remote MCP server configured and accessible.

### Exercise 3: Add a Local MCP Server

**Goal:** Configure a locally-running MCP server.

**Steps:**

1. Install the MCP memory server:
   ```bash
   npm install -g @modelcontextprotocol/server-memory
   ```

2. Add it to your MCP config:
   ```bash
   cat > ~/.copilot/mcp-config.json << 'EOF'
   {
     "servers": {
       "github": {
         "url": "https://api.githubcopilot.com/mcp/"
       },
       "memory": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-memory"
         ]
       }
     }
   }
   EOF
   ```

3. Restart Copilot to load the new server:
   ```bash
   copilot
   ```

4. Verify the server is loaded:
   ```
   /mcp show
   ```

5. Test the memory server:
   ```
   Remember that my favorite programming language is Rust
   ```

6. Later in the session:
   ```
   What's my favorite programming language?
   ```

**Expected Outcome:**
Local MCP server runs and provides additional capabilities.

### Exercise 4: File System MCP Server

**Goal:** Add an MCP server for enhanced file operations.

**Steps:**

1. Install the filesystem MCP server:
   ```bash
   npm install -g @modelcontextprotocol/server-filesystem
   ```

2. Update MCP config with directory restrictions:
   ```bash
   cat > ~/.copilot/mcp-config.json << 'EOF'
   {
     "servers": {
       "github": {
         "url": "https://api.githubcopilot.com/mcp/"
       },
       "filesystem": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-filesystem",
           "/home/user/projects"
         ]
       }
     }
   }
   EOF
   ```

3. Restart Copilot:
   ```bash
   copilot
   ```

4. Test file operations through MCP:
   ```
   Using the filesystem server, list all TypeScript files in my projects
   ```

**Expected Outcome:**
MCP server provides structured file access with defined boundaries.

### Exercise 5: MCP Server Management Commands

**Goal:** Master MCP management through slash commands.

**Steps:**

1. Start Copilot:
   ```bash
   copilot
   ```

2. **Show all servers:**
   ```
   /mcp show
   ```

3. **Add a new server interactively:**
   ```
   /mcp add
   ```
   Fill in details and `Ctrl+S` to save.

4. **Edit an existing server:**
   ```
   /mcp edit memory
   ```

5. **Disable a server temporarily:**
   ```
   /mcp disable memory
   ```

6. **Re-enable it:**
   ```
   /mcp enable memory
   ```

7. **Delete a server:**
   ```
   /mcp delete memory
   ```

**Expected Outcome:**
You can manage MCP servers without editing config files.

### Exercise 6: Using MCP Tools with Permissions

**Goal:** Control MCP tool access with allow/deny flags.

**Steps:**

1. Allow specific MCP server in programmatic mode:
   ```bash
   copilot -p "Check my GitHub notifications" \
     --allow-tool 'github'
   ```

2. Allow all MCP tools:
   ```bash
   copilot -p "Use memory to store my preferences" \
     --allow-tool 'memory'
   ```

3. Deny specific MCP server while allowing others:
   ```bash
   copilot -p "Analyze the project" \
     --allow-all-tools \
     --deny-tool 'github'
   ```

4. Combine with other tool permissions:
   ```bash
   copilot -p "Review code and check GitHub issues" \
     --allow-tool 'shell(cat)' \
     --allow-tool 'github' \
     --deny-tool 'write'
   ```

**Expected Outcome:**
MCP server tools follow the same permission model as built-in tools.

### Exercise 7: Temporary MCP Configuration

**Goal:** Use additional MCP servers for specific sessions.

**Steps:**

1. Create a temporary MCP config file:
   ```bash
   cat > /tmp/temp-mcp.json << 'EOF'
   {
     "servers": {
       "brave-search": {
         "command": "npx",
         "args": [
           "-y",
           "@anthropic/mcp-server-brave-search"
         ],
         "env": {
           "BRAVE_API_KEY": "${BRAVE_API_KEY}"
         }
       }
     }
   }
   EOF
   ```

2. Start Copilot with the additional config:
   ```bash
   copilot --additional-mcp-config /tmp/temp-mcp.json
   ```

3. The temporary servers are available for this session only.

4. Verify:
   ```
   /mcp show
   ```

5. The base config + temporary config are merged.

**Expected Outcome:**
Additional MCP servers can be loaded per-session without modifying base config.

## MCP Configuration Reference

### Remote Server Schema

```json
{
  "servers": {
    "server-name": {
      "url": "https://example.com/mcp/",
      "requestInit": {
        "headers": {
          "Authorization": "Bearer TOKEN"
        }
      }
    }
  }
}
```

### Local Server Schema

```json
{
  "servers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/server-name"],
      "env": {
        "API_KEY": "${ENV_VAR}"
      },
      "cwd": "/optional/working/directory"
    }
  }
}
```

### Common MCP Servers

| Server | Package | Purpose |
|--------|---------|---------|
| Memory | `@modelcontextprotocol/server-memory` | Persistent memory |
| Filesystem | `@modelcontextprotocol/server-filesystem` | File operations |
| GitHub | Built-in | GitHub integration |
| PostgreSQL | `@modelcontextprotocol/server-postgres` | Database queries |
| Slack | `@modelcontextprotocol/server-slack` | Slack integration |
| Brave Search | `@anthropic/mcp-server-brave-search` | Web search |

### Slash Commands

| Command | Description |
|---------|-------------|
| `/mcp show` | Display all MCP servers |
| `/mcp add` | Add a new server interactively |
| `/mcp edit NAME` | Edit an existing server |
| `/mcp delete NAME` | Remove a server |
| `/mcp disable NAME` | Temporarily disable |
| `/mcp enable NAME` | Re-enable a disabled server |

## Summary

- ✅ MCP extends Copilot with custom tools and resources
- ✅ Built-in GitHub MCP server provides repository access
- ✅ Local servers run on your machine for local resources
- ✅ Remote servers connect to external services
- ✅ `/mcp` commands manage servers without editing files
- ✅ `--additional-mcp-config` loads temporary servers

## Next Steps

→ Continue to [Module 7: Agent Skills](07-skills.md)

## References

- [Extending Copilot with MCP - GitHub Docs](https://docs.github.com/en/copilot/customizing-copilot/using-model-context-protocol/extending-copilot-chat-with-mcp)
- [GitHub MCP Server Setup](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/set-up-the-github-mcp-server)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
