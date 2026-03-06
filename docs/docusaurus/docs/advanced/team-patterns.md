---
title: Team Patterns
description: Team workflows, performance optimization, and workshop completion
sidebar_position: 5
keywords: [copilot, cli, team, performance, optimization, workflows]
---

This page covers configuration deep-dives, troubleshooting, team standardization, and performance optimization. It wraps up the workshop with a summary of everything you've learned.

For autopilot, fleet, and LSP configuration, see [Automation Patterns](./automation-patterns.md). For foundational configuration and CI/CD, see [Advanced Topics](./advanced-topics.md).

## Exercise 8: Configuration File Deep Dive

**Goal:** Understand and customize config.json and related configuration files.

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
Custom configuration for your workflow, including LSP settings from [Exercise 7](./automation-patterns.md#exercise-7-lsp-and-language-server-configuration).

## Exercise 9: Troubleshooting Guide

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
You can diagnose and resolve common problems, including LSP timeouts and shell mode access.

## Exercise 10: Team Workflow Patterns

**Goal:** Establish team-wide Copilot practices.

**Steps:**

1. **Standardize repository configuration:**

   ```text
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
   - @reviewer - Code review
   - @docs - Documentation

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
Team-wide standardization on Copilot usage, including shared LSP and environment configurations.

## Exercise 11: Performance Optimization

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

5. **Use Autopilot for repetitive multi-step tasks:**

   ```bash
   # Instead of manual step-by-step
   copilot --autopilot -p "Set up complete testing infrastructure for all services"

   # Saves time and reduces back-and-forth
   ```

   See [Exercise 4](./automation-patterns.md#exercise-4-autopilot-mode) for full autopilot details.

6. **Use Fleet for parallel work:**

   ```bash
   # Faster than sequential processing
   copilot
   /fleet "Migrate all 50 components to the new API format"

   # Multiple agents work in parallel
   ```

   See [Exercise 5](./automation-patterns.md#exercise-5-fleet-command-for-parallel-execution) for full fleet details.

7. **Parallel sessions for independent tasks:**

   ```bash
   # Terminal 1: Frontend work
   cd frontend && copilot

   # Terminal 2: Backend work
   cd backend && copilot

   # Terminal 3: Documentation
   cd docs && copilot
   ```

**Expected Outcome:**
Maximum performance from Copilot CLI using parallelization, autopilot, and fleet features.

## Summary

* ✅ Environment variables customize behavior globally
* ✅ CI/CD integration enables automated workflows
* ✅ Advanced flags give precise control
* ✅ **Autopilot mode** enables autonomous multi-step task execution (v0.0.411)
* ✅ **Fleet command** parallelizes complex tasks with orchestrator validation (v0.0.411-v0.0.412)
* ✅ **--bash-env** sources custom environment for shell sessions (v0.0.412)
* ✅ **--experimental** enables alt-screen mode by default (v0.0.413)
* ✅ **LSP configuration** controls language server timeouts; default request timeout is 90s (v0.0.412-v0.0.413)
* ✅ **Shell mode access** via `!` command (v0.0.410)
* ✅ config.json and lsp.json persist preferences
* ✅ Team standardization ensures consistency
* ✅ Performance optimization maximizes productivity

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
12. **Advanced** - Autopilot, Fleet, CI/CD, LSP config, environment, and team practices

### Next Steps

* Practice daily with real projects
* Create custom agents for your workflow
* Share skills with your team
* Contribute to the Copilot ecosystem

### Resources

* [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
* [Copilot CLI Blog Posts](https://github.blog/tag/copilot/)
* [GitHub Community Discussions](https://github.com/orgs/community/discussions)
* [agentskills.io](https://agentskills.io/)

---

**Thank you for participating in this workshop!**
