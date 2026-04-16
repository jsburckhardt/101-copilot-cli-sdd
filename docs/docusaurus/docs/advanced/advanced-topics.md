---
title: Advanced Topics
description: Configuration hierarchy, environment variables, CI/CD integration, and shell mode
sidebar_position: 3
keywords: [copilot, cli, advanced, configuration, cicd, environment]
---

## Prerequisites

* Completed Modules 1-11
* Comfortable with Copilot CLI basics
* Understanding of CI/CD concepts

## Learning Objectives

* Configure environment variables and paths
* Set up Copilot CLI for CI/CD pipelines
* Use advanced command-line flags
* Troubleshoot common issues
* Apply best practices for team workflows

## Configuration Hierarchy

```text
Environment Variables
        ↓
XDG_CONFIG_HOME (~/.copilot)
        ↓
Repository Configuration
        ↓
Session Overrides (flags)
```

## Key Directories

| Directory | Purpose |
| --------- | --------- |
| `~/.copilot/` | Default config location |
| `~/.copilot/config.json` | User settings |
| `~/.copilot/mcp-config.json` | MCP servers |
| `~/.copilot/skills/` | Personal skills |
| `.github/` | Repository config |

## Exercise 1: Environment Variables

:::important
Use `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, or `GITHUB_TOKEN` (in order of precedence) as the authentication token. These take precedence over previously stored credentials.
:::

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

## Exercise 2: CI/CD Integration

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

## Exercise 3: Advanced Command-Line Flags

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

## Quick Reference

### Configuration Files

| File | Purpose | Version Added |
| ------ | --------- | --------------- |
| `~/.copilot/config.json` | User settings | Base |
| `~/.copilot/mcp-config.json` | MCP servers | Base |
| `~/.copilot/lsp.json` | LSP timeout configuration | v0.0.412 |
| `~/.copilot/skills/` | Personal skills | Base |
| `.github/copilot-instructions.md` | Repository instructions | Base |

### Environment Variables

| Variable | Purpose |
| ---------- | --------- |
| `XDG_CONFIG_HOME` | Config directory location |
| `GITHUB_TOKEN` | Authentication token |
| `GITHUB_ASKPASS` | Credential helper script |
| `NO_COLOR` | Disable colored output |
| `COPILOT_DEBUG` | Enable debug logging |

### Command-Line Flags

| Flag | Description | Version |
| ------ | ------------- | --------- |
| `-p, --prompt` | Programmatic mode prompt | Base |
| `--model` | Select AI model | Base |
| `--resume` | Resume last session | Base |
| `--yolo` | Allow all tools | Base |
| `--allow-tool` | Allow specific tool | Base |
| `--deny-tool` | Deny specific tool | Base |
| `--silent` | Suppress output | Base |
| `--share PATH` | Export to markdown | Base |
| `--share-gist` | Export to Gist | Base |
| `--additional-mcp-config` | Add MCP config | Base |
| `--autopilot` | Enable autonomous multi-step execution | v0.0.411 |
| `--bash-env` | Source BASH_ENV in shell sessions | v0.0.412 |
| `--experimental` | Enable experimental features | v0.0.413 |

### Shell Mode Access

:::note
Changed in v0.0.410: Shell mode removed from Shift+Tab cycle.
:::

| Method | Description | Version |
| -------- | ------------- | --------- |
| `!` | Direct access to shell mode | v0.0.410+ |
| `Shift+Tab` | Cycle (chat) / (command) only | v0.0.410+ |

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

## Next Steps

Continue to [Automation Patterns](./automation-patterns.md) for autopilot mode, fleet command, and LSP configuration.
