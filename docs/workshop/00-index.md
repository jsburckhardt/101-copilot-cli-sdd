# GitHub Copilot CLI Workshop

Welcome to this hands-on workshop for mastering GitHub Copilot CLI! This workshop will take you from installation to advanced automation techniques.

## Prerequisites

- GitHub account with an active Copilot subscription (Pro, Pro+, Business, or Enterprise)
- Node.js v22+ and npm v10+ (for npm installation method)
- Basic command-line experience
- A code editor (VS Code recommended)
- Git installed and configured

## Learning Objectives

By the end of this workshop, you will be able to:

- Install and configure Copilot CLI on any platform
- Use interactive and programmatic modes effectively
- Manage sessions and delegate tasks to cloud agents
- Create custom instructions with AGENTS.md and llm.txt
- Control tool permissions and use `--yolo` mode safely
- Configure and use MCP servers
- Create and use skills from agentskills.io
- Build custom agents for specialized workflows
- Set up hooks for lifecycle automation
- Manage context effectively with `/context` and `/compact`

## Workshop Modules

| # | Module | Duration | Description |
|---|--------|----------|-------------|
| 01 | [Installation](01-installation.md) | 15 min | Install via npm, Homebrew, or script |
| 02 | [Operating Modes](02-modes.md) | 20 min | Interactive chat, programmatic, and `/delegate` |
| 03 | [Session Management](03-sessions.md) | 15 min | Continue, resume, clear, and track sessions |
| 04 | [Custom Instructions](04-instructions.md) | 25 min | AGENTS.md, llm.txt, copilot-instructions.md |
| 05 | [Tools & Permissions](05-tools.md) | 20 min | Built-in tools, allow/deny, `--yolo` mode |
| 06 | [MCP Servers](06-mcps.md) | 25 min | Configure remote and local MCP servers |
| 07 | [Agent Skills](07-skills.md) | 20 min | Create and use skills, agentskills.io |
| 08 | [Plugins](08-plugins.md) | 15 min | Plugins and the marketplace ecosystem |
| 09 | [Custom Agents](09-custom-agents.md) | 25 min | Build specialized agents and subagents |
| 10 | [Hooks](10-hooks.md) | 20 min | Lifecycle hooks and automation |
| 11 | [Context Management](11-context.md) | 15 min | `/context`, `/compact`, token optimization |
| 12 | [Advanced Topics](12-advanced.md) | 20 min | Environment variables, CI/CD, tips |

**Total estimated time: ~4 hours**

## Workshop Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Installation   │────▶│  Core Concepts  │────▶│    Advanced     │
│   (Module 1)    │     │  (Modules 2-5)  │     │  (Modules 6-12) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## How to Use This Workshop

1. **Follow in order** - Modules build on each other
2. **Complete exercises** - Hands-on practice reinforces learning
3. **Check expected outcomes** - Verify your understanding
4. **Use the references** - Official docs have more detail

## Quick Reference Card

### Essential Commands

```bash
# Start interactive session
copilot

# Programmatic mode (single prompt)
copilot -p "your prompt here"

# Allow specific tools
copilot --allow-tool 'shell(git)'

# Full autonomy (use carefully!)
copilot --yolo

# Resume last session
copilot --resume
```

### Essential Slash Commands

| Command | Description |
|---------|-------------|
| `/help` | Show all available commands |
| `/clear` | Clear session context |
| `/context` | View token usage |
| `/compact` | Compress session history |
| `/delegate` | Hand off to cloud agent |
| `/model` | Switch AI model |
| `/mcp` | Manage MCP servers |
| `/cwd` | Change working directory |

## Environment Setup Check

Before starting, verify your environment:

```bash
# Check Node.js version (need v22+)
node --version

# Check npm version (need v10+)
npm --version

# Check Git
git --version

# Check GitHub CLI (optional but recommended)
gh --version
```

### Ubuntu/Debian Quick Setup (example)

If you're missing prerequisites (e.g., in a fresh Docker container):

```bash
# Basic tools
apt-get update && apt-get install -y curl git jq gh

# Install uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.local/bin/env

# Install nvm and Node.js LTS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
```

## Getting Help

- **Official Docs**: https://docs.github.com/en/copilot
- **GitHub Community**: https://github.com/orgs/community/discussions
- **Issue Tracker**: https://github.com/github/copilot-cli/issues

---

**Ready to begin?** → Continue to [Module 1: Installation](01-installation.md)
