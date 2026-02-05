# Module 12: Advanced Topics

## Prerequisites

- Completed Modules 1-11
- Comfortable with Copilot CLI basics
- Understanding of CI/CD concepts

## Learning Objectives

- Configure environment variables and paths
- Set up Copilot CLI for CI/CD pipelines
- Use advanced command-line flags
- Troubleshoot common issues
- Apply best practices for team workflows

## Concepts

### Configuration Hierarchy

```
Environment Variables
        ↓
XDG_CONFIG_HOME (~/.copilot)
        ↓
Repository Configuration
        ↓
Session Overrides (flags)
```

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `~/.copilot/` | Default config location |
| `~/.copilot/config.json` | User settings |
| `~/.copilot/mcp-config.json` | MCP servers |
| `~/.copilot/skills/` | Personal skills |
| `.github/` | Repository config |

## Hands-On Exercises

### Exercise 1: Environment Variables

> ⚠️ **FEEDBACK**: `COPILOT_TOKEN` is used in the example helper script. It's unclear if this is a standard environment variable recognized by Copilot CLI or just used within the custom script. For authentication, prefer `GITHUB_TOKEN`, `GH_TOKEN`, or `COPILOT_GITHUB_TOKEN` which are documented alternatives.

**Goal:** Configure Copilot CLI behavior via environment.

**Steps:**

1. **XDG_CONFIG_HOME** - Change config location:
   ```bash
   # Set custom config directory
   export XDG_CONFIG_HOME=/custom/path
   
   # Copilot will now use /custom/path/copilot/
   copilot
   ```

2. **GITHUB_TOKEN** - Authentication for CI/CD:
   ```bash
   export GITHUB_TOKEN="ghp_your_personal_access_token"
   
   # Use in scripts
   copilot -p "Run the test suite" --allow-tool 'shell'
   ```

3. **GITHUB_ASKPASS** - Credential helper:
   ```bash
   # Create a credential helper script
   cat > ~/credential-helper.sh << 'EOF'
   #!/bin/bash
   echo "$COPILOT_TOKEN"
   EOF
   chmod +x ~/credential-helper.sh
   
   export GITHUB_ASKPASS=~/credential-helper.sh
   export COPILOT_TOKEN="your-token"
   
   copilot
   ```

4. **NO_COLOR** - Disable colored output:
   ```bash
   export NO_COLOR=1
   copilot -p "List files"
   ```

5. View effective configuration:
   ```bash
   copilot --help | head -50
   ```

**Expected Outcome:**
Environment variables customize Copilot behavior.

### Exercise 2: CI/CD Integration

**Goal:** Set up Copilot CLI in automated pipelines.

**Steps:**

1. **GitHub Actions workflow:**
   ```yaml
   # .github/workflows/copilot-review.yml
   name: Copilot Code Review
   
   on:
     pull_request:
       types: [opened, synchronize]
   
   jobs:
     review:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '22'
         
         - name: Install Copilot CLI
           run: npm install -g @github/copilot
         
         - name: Run Code Review
           env:
             GITHUB_TOKEN: ${{ secrets.COPILOT_TOKEN }}
           run: |
             copilot -p "Review the changes in this PR and provide feedback" \
               --allow-tool 'shell(git)' \
               --deny-tool 'write' \
               --silent
   ```

2. **Pre-commit hook:**
   ```bash
   # .git/hooks/pre-commit
   #!/bin/bash
   
   # Run Copilot analysis on staged files
   STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)
   
   if [ -n "$STAGED_FILES" ]; then
     copilot -p "Review these staged files for issues: $STAGED_FILES" \
       --allow-tool 'shell(cat)' \
       --allow-tool 'shell(git diff)' \
       --deny-tool 'write' \
       --silent
   fi
   ```

3. **Docker container usage:**
   ```dockerfile
   FROM node:22-slim
   
   RUN npm install -g @github/copilot
   
   # Set up config directory
   ENV XDG_CONFIG_HOME=/app/config
   
   WORKDIR /workspace
   
   # Entry point for CI
   ENTRYPOINT ["copilot"]
   ```

4. **Safe CI flags:**
   ```bash
   copilot -p "Your prompt" \
     --allow-tool 'shell(npm test)' \
     --allow-tool 'shell(npm run lint)' \
     --deny-tool 'shell(rm)' \
     --deny-tool 'shell(git push)' \
     --deny-tool 'write' \
     --silent
   ```

**Expected Outcome:**
Copilot CLI integrated into automated workflows.

### Exercise 3: Advanced Command-Line Flags

**Goal:** Master all available flags.

**Steps:**

1. **Output control:**
   ```bash
   # Silent mode - minimal output
   copilot -p "Count lines of code" --silent
   
   # Export session to markdown
   copilot -p "Analyze project" --share ./analysis.md
   
   # Export to GitHub Gist
   copilot -p "Generate report" --share-gist
   ```

2. **Tool control:**

   > ⚠️ **FEEDBACK**: The flags `--available-tools` and `--excluded-tools` may be synonyms or replacements for `--allow-tool` / `--deny-tool`. Documentation consistency varies by version. Check `copilot --help` to see which flags are available in your installation.

   ```bash
   # Allow specific tools only
   copilot --available-tools 'shell,read'
   
   # Exclude specific tools
   copilot --excluded-tools 'write,web_fetch'
   ```

3. **Model selection:**
   ```bash
   # Use specific model
   copilot --model gpt-4.1
   
   # Use faster model for simple tasks
   copilot --model gpt-5-mini -p "What time is it?"
   ```

4. **Session control:**
   ```bash
   # Resume last session
   copilot --resume
   
   # Use additional MCP config temporarily
   copilot --additional-mcp-config ./custom-mcp.json
   ```

5. **View all flags:**
   ```bash
   copilot --help
   ```

**Expected Outcome:**
Full command-line control over Copilot behavior.

### Exercise 4: Configuration File Deep Dive

**Goal:** Understand and customize config.json.

**Steps:**

1. View current configuration:
   ```bash
   cat ~/.copilot/config.json
   ```

2. Example full configuration:
   ```json
   {
     "trusted_folders": [
       "/home/user/projects",
       "/home/user/work"
     ],
     "default_model": "gpt-4.1",
     "theme": "dark",
     "editor": "code",
     "shell": "bash",
     "telemetry": true,
     "auto_update": true
   }
   ```

3. Add trusted folders:
   ```bash
   # Using jq to update config
   jq '.trusted_folders += ["/new/path"]' ~/.copilot/config.json > tmp.json
   mv tmp.json ~/.copilot/config.json
   ```

4. Configure URL restrictions:
   ```json
   {
     "web_fetch": {
       "allowed_urls": [
         "https://api.github.com/*",
         "https://docs.github.com/*"
       ],
       "denied_urls": [
         "https://evil.com/*"
       ]
     }
   }
   ```

**Expected Outcome:**
Custom configuration for your workflow.

### Exercise 5: Troubleshooting Guide

> ⚠️ **FEEDBACK**: This troubleshooting guide is comprehensive. If you encounter flag-related issues (e.g., `--allow-tool` not recognized), check your installed version with `copilot --version` and compare with the latest documentation. Some flags may only be available in newer versions.

**Goal:** Diagnose and fix common issues.

**Steps:**

1. **Authentication issues:**
   ```bash
   # Clear credentials and re-authenticate
   rm -rf ~/.copilot/auth*
   copilot
   # Follow OAuth flow
   ```

2. **Tool not working:**
   ```bash
   # Check if tool is allowed
   copilot -p "test" --available-tools
   
   # Verify MCP servers
   copilot
   /mcp show
   ```

3. **Session issues:**
   ```bash
   # Clear session data
   rm -rf ~/.copilot/sessions/
   
   # Start fresh
   copilot
   /clear
   ```

4. **Performance issues:**
   ```bash
   # Check context usage
   copilot
   /context
   
   # Compact if needed
   /compact
   
   # Or start fresh
   /clear
   ```

5. **Agent not found:**
   ```bash
   # Verify agent file exists
   ls -la .github/agents/
   
   # Check YAML syntax
   cat .github/agents/my-agent.md | head -10
   
   # Ensure frontmatter is valid
   ```

6. **MCP server failing:**
   ```bash
   # Check if server runs independently
   npx @modelcontextprotocol/server-memory
   
   # Check config syntax
   cat ~/.copilot/mcp-config.json | jq .
   ```

**Expected Outcome:**
You can diagnose and resolve common problems.

### Exercise 6: Team Workflow Patterns

**Goal:** Establish team-wide Copilot practices.

**Steps:**

1. **Standardize repository configuration:**
   ```bash
   # Create a template repository with:
   .github/
   ├── copilot-instructions.md    # Team coding standards
   ├── agents/
   │   ├── reviewer.md            # Code review agent
   │   └── docs.md                # Documentation agent
   ├── instructions/
   │   ├── typescript.instructions.md
   │   └── tests.instructions.md
   └── hooks/
       └── hooks.json             # Security guardrails
   
   AGENTS.md                      # Project-specific agent
   llm.txt                        # Project context for LLMs
   ```

2. **Create onboarding documentation:**
   ```markdown
   # Team Copilot CLI Guide
   
   ## Setup
   1. Install: `npm install -g @github/copilot`
   2. Authenticate: `copilot` and follow OAuth
   3. Clone this repo template
   
   ## Our Agents
   - `@reviewer` - Code review
   - `@docs` - Documentation
   
   ## Commit Convention
   All commits must follow Conventional Commits.
   
   ## Security Rules
   - Never approve `rm -rf` for session
   - Never push directly to main
   - Always use `--deny-tool 'shell(git push)'` in automation
   ```

3. **Share MCP configurations:**
   ```bash
   # Create a shared MCP config
   cat > shared-mcp-config.json << 'EOF'
   {
     "servers": {
       "team-tools": {
         "url": "https://team-mcp.example.com/",
         "requestInit": {
           "headers": {
             "Authorization": "Bearer ${TEAM_MCP_TOKEN}"
           }
         }
       }
     }
   }
   EOF
   ```

4. **Establish review checklist:**
   ```markdown
   ## PR Copilot Checklist
   - [ ] Run `@reviewer` on changes
   - [ ] Generate docs with `@docs`
   - [ ] Check context usage stayed reasonable
   - [ ] No sensitive data in session exports
   ```

**Expected Outcome:**
Team-wide standardization on Copilot usage.

### Exercise 7: Performance Optimization

**Goal:** Get the best performance from Copilot CLI.

**Steps:**

1. **Optimize startup time:**
   ```bash
   # Pre-authenticate
   copilot --version
   
   # Use --silent for faster scripted operations
   copilot -p "quick task" --silent
   ```

2. **Reduce network round-trips:**
   ```bash
   # Batch operations
   copilot -p "Create user.ts, user.test.ts, and user.types.ts with related code" \
     --allow-tool 'write'
   
   # Instead of three separate prompts
   ```

3. **Choose appropriate models:**
   ```bash
   # Fast model for simple tasks
   copilot --model gpt-5-mini -p "Format this JSON"
   
   # Full model for complex analysis
   copilot --model gpt-4.1 -p "Refactor this complex module"
   ```

4. **Efficient context management:**
   ```bash
   # Use @explore for overview without context cost
   # Use targeted reads instead of reading all files
   # Compact proactively, not reactively
   ```

5. **Parallel sessions for independent tasks:**
   ```bash
   # Terminal 1: Frontend work
   cd frontend && copilot
   
   # Terminal 2: Backend work
   cd backend && copilot
   
   # Terminal 3: Documentation
   cd docs && copilot
   ```

**Expected Outcome:**
Maximum performance from Copilot CLI.

## Configuration Reference

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `XDG_CONFIG_HOME` | Config directory location |
| `GITHUB_TOKEN` | Authentication token |
| `GITHUB_ASKPASS` | Credential helper script |
| `NO_COLOR` | Disable colored output |
| `COPILOT_DEBUG` | Enable debug logging |

### Command-Line Flags

| Flag | Description |
|------|-------------|
| `-p, --prompt` | Programmatic mode prompt |
| `--model` | Select AI model |
| `--resume` | Resume last session |
| `--yolo` | Allow all tools |
| `--allow-tool` | Allow specific tool |
| `--deny-tool` | Deny specific tool |
| `--silent` | Suppress output |
| `--share PATH` | Export to markdown |
| `--share-gist` | Export to Gist |
| `--additional-mcp-config` | Add MCP config |

### Useful Aliases

```bash
# Add to ~/.bashrc or ~/.zshrc

# Quick Copilot start
alias cop='copilot'

# Read-only analysis
alias cop-analyze='copilot --deny-tool write'

# Safe automation mode
alias cop-safe='copilot --allow-tool "shell(cat)" --allow-tool "shell(grep)" --deny-tool write'

# Full autonomy (careful!)
alias cop-yolo='copilot --yolo'

# Resume session
alias cop-resume='copilot --resume'
```

## Summary

- ✅ Environment variables customize behavior globally
- ✅ CI/CD integration enables automated workflows
- ✅ Advanced flags give precise control
- ✅ config.json persists preferences
- ✅ Team standardization ensures consistency
- ✅ Performance optimization maximizes productivity

## Workshop Complete! 🎉

Congratulations on completing the GitHub Copilot CLI Workshop!

### What You've Learned

1. **Installation** - Multiple methods to install and authenticate
2. **Operating Modes** - Interactive, programmatic, and delegate
3. **Sessions** - Management, persistence, and control
4. **Instructions** - AGENTS.md, copilot-instructions.md, llm.txt
5. **Tools** - Permissions, allow/deny, YOLO mode
6. **MCP Servers** - Configuration and custom integrations
7. **Skills** - Creating and using specialized capabilities
8. **Plugins** - Ecosystem and custom extensions
9. **Custom Agents** - Building specialized personas
10. **Hooks** - Lifecycle automation and security
11. **Context** - Monitoring and optimization
12. **Advanced** - CI/CD, environment, and team practices

### Next Steps

- Practice daily with real projects
- Create custom agents for your workflow
- Share skills with your team
- Contribute to the Copilot ecosystem

### Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Copilot CLI Blog Posts](https://github.blog/tag/copilot/)
- [GitHub Community Discussions](https://github.com/orgs/community/discussions)
- [agentskills.io](https://agentskills.io/)

---

**Thank you for participating in this workshop!**

→ Return to [Workshop Index](00-index.md)
