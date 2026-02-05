# Module 8: Plugins

## Prerequisites

- Completed Modules 1-7
- GitHub account
- Understanding of MCP concepts (Module 6)

## Learning Objectives

- Understand the Copilot plugin ecosystem
- Explore the GitHub copilot-plugins repository
- Learn about work-iq-mcp and enterprise integrations
- Install and configure plugins
- Understand plugin security considerations

## Concepts

### What are Copilot Plugins?

Plugins extend Copilot's capabilities beyond built-in features:

```
┌─────────────────┐
│   Copilot CLI   │
├─────────────────┤
│  Built-in Tools │
├─────────────────┤
│   MCP Servers   │  ← Module 6
├─────────────────┤
│     Skills      │  ← Module 7
├─────────────────┤
│    Plugins      │  ← This Module
└─────────────────┘
```

### Plugin vs MCP Server vs Skill

| Feature | Plugin | MCP Server | Skill |
|---------|--------|------------|-------|
| Installation | npm/manual | Config file | Directory |
| Scope | Global | Session/project | Project/personal |
| Capabilities | Full integration | Tools/resources | Instructions |
| Distribution | Package registry | Config sharing | Files/git |

### Plugin Sources

1. **github/copilot-plugins** - Official GitHub plugins
2. **microsoft/work-iq-mcp** - Enterprise integrations
3. **Community plugins** - Third-party extensions
4. **Custom plugins** - Your own integrations

## Hands-On Exercises

### Exercise 1: Explore Official Copilot Plugins

**Goal:** Discover available plugins in the official repository.

**Steps:**

1. Visit the copilot-plugins repository:
   ```
   https://github.com/github/copilot-plugins
   ```

2. Browse the available plugins:
   - Database integrations
   - Cloud provider tools
   - Development utilities
   - Team collaboration tools

3. Read plugin documentation for one that interests you.

4. Note the installation requirements and configuration.

5. Clone the repository to explore locally:
   ```bash
   git clone https://github.com/github/copilot-plugins.git
   cd copilot-plugins
   ls -la
   ```

6. Examine a plugin's structure:
   ```bash
   ls -la plugins/example-plugin/
   cat plugins/example-plugin/README.md
   ```

**Expected Outcome:**
You understand the available plugins and their purposes.

### Exercise 2: Explore work-iq-mcp

**Goal:** Understand enterprise integration options.

**Steps:**

1. Visit the work-iq-mcp repository:
   ```
   https://github.com/microsoft/work-iq-mcp
   ```

2. work-iq-mcp provides integrations for:
   - Microsoft 365 (Outlook, Teams, SharePoint)
   - Azure services
   - Enterprise data sources
   - Business applications

3. Review the architecture:
   ```bash
   git clone https://github.com/microsoft/work-iq-mcp.git
   cd work-iq-mcp
   cat README.md
   ```

4. Examine configuration options:
   ```bash
   cat docs/configuration.md
   ```

5. Understand authentication requirements:
   - OAuth2 flows
   - Service principals
   - Token management

**Expected Outcome:**
You understand enterprise integration capabilities.

### Exercise 3: Install a Community Plugin

**Goal:** Install and configure a third-party plugin.

**Steps:**

1. Search for Copilot-compatible MCP servers:
   ```bash
   npm search @modelcontextprotocol
   ```

2. Install a useful plugin (e.g., Brave Search):
   ```bash
   npm install -g @anthropic/mcp-server-brave-search
   ```

3. Get a Brave Search API key:
   - Visit https://brave.com/search/api/
   - Create an account and get an API key

4. Configure as MCP server:
   ```bash
   cat >> ~/.copilot/mcp-config.json << 'EOF'
   {
     "servers": {
       "brave-search": {
         "command": "npx",
         "args": ["-y", "@anthropic/mcp-server-brave-search"],
         "env": {
           "BRAVE_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   EOF
   ```

5. Restart Copilot and test:
   ```bash
   copilot
   ```
   ```
   Search the web for the latest Node.js release
   ```

**Expected Outcome:**
Web search capability added via plugin.

### Exercise 4: Database Plugin Integration

**Goal:** Add database query capabilities.

**Steps:**

1. Install PostgreSQL MCP server:
   ```bash
   npm install -g @modelcontextprotocol/server-postgres
   ```

2. Configure with your database:
   ```bash
   # Add to mcp-config.json
   {
     "servers": {
       "postgres": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-postgres"],
         "env": {
           "POSTGRES_CONNECTION": "postgresql://user:pass@localhost/dbname"
         }
       }
     }
   }
   ```

3. Test database queries:
   ```bash
   copilot
   ```
   ```
   Show me the schema of the users table
   ```
   ```
   How many records are in the orders table?
   ```

4. **Security Note:** Be careful with production databases!

**Expected Outcome:**
Database query capabilities via Copilot.

### Exercise 5: Create a Simple Custom Plugin

> ⚠️ **FEEDBACK**: The code snippet uses `require` (CommonJS) but doesn't include `module.exports` or type definition in `package.json`. This is fine as CommonJS is the default. The `npm install @modelcontextprotocol/sdk` command should complete successfully.

**Goal:** Build a basic plugin for your workflow.

**Steps:**

1. Create a plugin directory:
   ```bash
   mkdir -p ~/copilot-plugins/my-tools
   cd ~/copilot-plugins/my-tools
   ```

2. Initialize as Node.js project:
   ```bash
   npm init -y
   ```

3. Create a simple MCP server:
   ```bash
   cat > index.js << 'EOF'
   const { Server } = require('@modelcontextprotocol/sdk/server');
   
   const server = new Server({
     name: 'my-tools',
     version: '1.0.0'
   });
   
   // Add a simple tool
   server.addTool({
     name: 'get-timestamp',
     description: 'Get the current timestamp in various formats',
     parameters: {
       type: 'object',
       properties: {
         format: {
           type: 'string',
           enum: ['iso', 'unix', 'human'],
           default: 'iso'
         }
       }
     },
     handler: async ({ format }) => {
       const now = new Date();
       switch (format) {
         case 'unix':
           return { timestamp: Math.floor(now.getTime() / 1000) };
         case 'human':
           return { timestamp: now.toLocaleString() };
         default:
           return { timestamp: now.toISOString() };
       }
     }
   });
   
   // Add a resource
   server.addResource({
     name: 'system-info',
     description: 'System information',
     handler: async () => ({
       platform: process.platform,
       nodeVersion: process.version,
       cwd: process.cwd()
     })
   });
   
   server.start();
   EOF
   ```

4. Install dependencies:
   ```bash
   npm install @modelcontextprotocol/sdk
   ```

5. Configure in Copilot:
   ```bash
   # Add to mcp-config.json
   {
     "servers": {
       "my-tools": {
         "command": "node",
         "args": ["/home/user/copilot-plugins/my-tools/index.js"]
       }
     }
   }
   ```

6. Test your plugin:
   ```bash
   copilot
   ```
   ```
   What's the current timestamp?
   ```

**Expected Outcome:**
Custom plugin provides new capabilities to Copilot.

### Exercise 6: Plugin Security Review

**Goal:** Understand plugin security considerations.

**Steps:**

1. Review a plugin before installation:
   ```bash
   # Check the source
   npm view @package/name repository
   
   # Review dependencies
   npm view @package/name dependencies
   
   # Check for known vulnerabilities
   npm audit @package/name
   ```

2. Security checklist for plugins:
   - [ ] Source code is open and auditable
   - [ ] Active maintenance and updates
   - [ ] Minimal dependencies
   - [ ] No known vulnerabilities
   - [ ] Clear permission requirements
   - [ ] Data handling documented

3. Configure with least privilege:
   ```json
   {
     "servers": {
       "plugin-name": {
         "command": "npx",
         "args": ["-y", "@package/plugin"],
         "env": {
           "API_KEY": "${PLUGIN_API_KEY}"
         }
       }
     }
   }
   ```

4. Use environment variables for secrets:
   ```bash
   export PLUGIN_API_KEY="your-key"
   copilot
   ```

5. Restrict plugin capabilities with deny rules:
   ```bash
   copilot --allow-tool 'plugin-name' --deny-tool 'shell(rm)'
   ```

**Expected Outcome:**
You can evaluate and securely configure plugins.

### Exercise 7: Plugin Discovery and Ecosystem

**Goal:** Navigate the plugin ecosystem.

**Steps:**

1. Official sources:
   - https://github.com/github/copilot-plugins
   - https://github.com/modelcontextprotocol/servers

2. Search npm for MCP servers:
   ```bash
   npm search mcp-server
   npm search modelcontextprotocol
   ```

3. Check community collections:
   - GitHub topics: `copilot-plugin`, `mcp-server`
   - Awesome lists: `awesome-mcp`, `awesome-copilot`

4. Evaluate a plugin:
   ```bash
   # Stars and activity
   gh repo view owner/plugin-repo
   
   # Recent commits
   gh api repos/owner/plugin-repo/commits --jq '.[0:5] | .[].commit.message'
   
   # Open issues
   gh issue list -R owner/plugin-repo
   ```

5. Contribute to the ecosystem:
   - Report issues you find
   - Submit feature requests
   - Create and share your own plugins

**Expected Outcome:**
You can find, evaluate, and contribute to the plugin ecosystem.

## Plugin Configuration Reference

### MCP Server Plugin Format

```json
{
  "servers": {
    "plugin-name": {
      "command": "npx",
      "args": ["-y", "@scope/package-name", "--option"],
      "env": {
        "API_KEY": "${ENV_VAR}",
        "CONFIG": "value"
      },
      "cwd": "/optional/working/dir"
    }
  }
}
```

### Remote Plugin Format

```json
{
  "servers": {
    "remote-plugin": {
      "url": "https://plugin-server.example.com/mcp/",
      "requestInit": {
        "headers": {
          "Authorization": "Bearer ${TOKEN}"
        }
      }
    }
  }
}
```

### Common Plugins

| Plugin | Package | Purpose |
|--------|---------|---------|
| Brave Search | `@anthropic/mcp-server-brave-search` | Web search |
| PostgreSQL | `@modelcontextprotocol/server-postgres` | Database |
| Filesystem | `@modelcontextprotocol/server-filesystem` | File ops |
| GitHub | Built-in | GitHub integration |
| Memory | `@modelcontextprotocol/server-memory` | Persistence |
| Puppeteer | `@anthropic/mcp-server-puppeteer` | Browser automation |

## Security Best Practices

1. **Audit before install** - Review source code
2. **Use environment variables** - Never hardcode secrets
3. **Principle of least privilege** - Grant minimal permissions
4. **Keep updated** - Regularly update plugins
5. **Monitor usage** - Track plugin activity
6. **Sandbox when possible** - Use containers for untrusted plugins

## Summary

- ✅ Plugins extend Copilot's capabilities significantly
- ✅ github/copilot-plugins provides official integrations
- ✅ work-iq-mcp enables enterprise Microsoft integrations
- ✅ Community MCP servers add diverse capabilities
- ✅ You can create custom plugins for specific needs
- ✅ Always review plugins for security before installation

## Next Steps

→ Continue to [Module 9: Custom Agents](09-custom-agents.md)

## References

- [GitHub Copilot Plugins](https://github.com/github/copilot-plugins)
- [Microsoft work-iq-mcp](https://github.com/microsoft/work-iq-mcp)
- [MCP Servers Collection](https://github.com/modelcontextprotocol/servers)
- [Model Context Protocol](https://modelcontextprotocol.io/)
