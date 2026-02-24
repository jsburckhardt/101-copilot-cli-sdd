---
title: "Command Reference"
description: "Slash commands, keyboard shortcuts, and tool approval reference"
sidebar_position: 3
keywords: [copilot, cli, commands, shortcuts, reference, tools]
---

This page is a quick-reference companion to [Operating Modes & Commands](/docs/getting-started/modes-and-commands). Use it to look up slash commands, keyboard shortcuts, and tool approval settings.

## Slash Commands

Slash commands are prefixed with `/` and provide quick access to CLI features without leaving the conversation. They are the primary way to control Copilot CLI behavior during an interactive session.

### Discovering Commands

* Type `/help` to see the full list of available commands
* Press `ctrl+x` then `/` to run a command via keyboard shortcut
* Commands are tab-completable. Start typing `/` followed by the first letters

### Command Categories

| Category | Commands | Purpose |
| --- | --- | --- |
| **Session** | `/clear`, `/session`, `/resume`, `/rename`, `/usage` | Manage session lifecycle |
| **Navigation** | `/cwd`, `/cd`, `/add-dir`, `/list-dirs` | Control directory scope |
| **Context** | `/context`, `/compact` | Monitor and optimize token usage |
| **Tools** | `/allow-all`, `/yolo`, `/reset-allowed-tools` | Manage tool permissions at runtime |
| **Review** | `/diff`, `/review`, `/plan` | Code review and planning workflows |
| **Configuration** | `/model`, `/mcp`, `/theme`, `/terminal-setup`, `/experimental` | Customize CLI behavior |
| **Extensibility** | `/skills`, `/plugin`, `/agent` | Manage skills, plugins, and agents |
| **Sharing** | `/share`, `/feedback` | Export sessions and submit feedback |
| **Account** | `/login`, `/logout`, `/user` | Authentication and user management |
| **System** | `/help`, `/exit`, `/quit`, `/init`, `/tasks`, `/lsp`, `/update`, `/changelog` | General utilities |

### Keyboard Shortcuts

In addition to slash commands, Copilot CLI supports keyboard shortcuts:

<details>
<summary>Full Keyboard Shortcuts</summary>

| Shortcut | Action |
| --- | --- |
| `@` | Mention files: include file contents in context |
| `!` | Execute a shell command directly (bypass Copilot; also the only way to access shell mode since v0.0.410) |
| `Esc` | Cancel the current operation |
| `ctrl+x → /` | Run a slash command |
| `ctrl+c` | Cancel operation / clear input / exit |
| `ctrl+d` | Shutdown / exit CLI on empty prompt (v0.0.410+) |
| `ctrl+l` | Clear the screen |
| `ctrl+n` | Navigate down (alternative to down arrow, v0.0.410+) |
| `ctrl+p` | Navigate up (alternative to up arrow, v0.0.410+) |
| `ctrl+o` | Expand recent timeline (when no input) |
| `ctrl+e` | Expand all timeline (when no input); or cycle to end of visual/logical line (v0.0.413+ overrides in edit mode) |
| `ctrl+t` | Toggle model reasoning display |
| `ctrl+a` | Cycle to beginning of visual line; repeated press goes to beginning of logical line (v0.0.413+) |
| `ctrl+u` | Delete to beginning of logical line (v0.0.413+) |
| `ctrl+y` | Edit plan in terminal editor (v0.0.412+) |
| `ctrl+x → ctrl+e` | Edit prompt in terminal editor (v0.0.412+) |
| `ctrl+z` | Suspend/resume CLI (Unix platforms only, v0.0.410+) |
| `ctrl+insert` | Copy selected text in alt-screen mode (v0.0.413+) |
| `Home` / `End` | Navigate within visual line (v0.0.415+) |
| `ctrl+Home` / `ctrl+End` | Jump to text boundaries (v0.0.415+) |
| `Shift+Tab` | Cycle through modes: (suggest) ⟷ (normal) since v0.0.410; use `!` for shell mode |
| `Shift+Enter` | Insert newline in prompt (requires kitty keyboard protocol, v0.0.410+) |
| `Page Up` / `Page Down` | Scroll in alt-screen mode (v0.0.410+) |
| `Double-click` | Select word in alt-screen mode (v0.0.412+) |
| `Triple-click` | Select line in alt-screen mode (v0.0.412+) |

</details>

:::warning
Some keyboard shortcuts require specific terminal capabilities:

* **Shift+Enter** for newlines requires terminals with kitty keyboard protocol support
* **Ctrl+Z** suspend/resume works on Unix platforms only
* **Page Up/Down**, **Double/Triple-click** require alt-screen mode support
* **Ctrl+Y** and **Ctrl+X Ctrl+E** require a terminal editor (set via `$EDITOR` or `$VISUAL`)
:::

### Key Commands Not Covered in Other Modules

Some commands are covered in depth in later modules (`/mcp` in Module 6, `/skills` in Module 7, `/plugin` in Module 8, `/context` and `/compact` in Module 11). The following important commands are unique to this section:

| Command | Description |
| --- | --- |
| `/plan [prompt]` | Ask Copilot to create an implementation plan before writing code |
| `/review [prompt]` | Run a code review agent to analyze changes |
| `/diff` | Review all changes made in the current directory during the session |
| `/init` | Initialize Copilot instructions and agentic features for a repository |
| `/tasks` | View and manage background tasks (subagents, shell sessions) |
| `/rename <name>` | Rename the current session for easy identification |
| `/theme [show\|set\|list]` | View or configure the terminal color theme |
| `/terminal-setup` | Configure terminal for multiline input support (shift+enter) |
| `/lsp` | View configured Language Server Protocol servers |
| `/user [show\|list\|switch]` | Manage GitHub user list (multi-account support) |
| `/update` | View update instructions for the latest Copilot CLI version |
| `/changelog` | View the changelog for recent Copilot CLI releases |

## Tool Approval Reference

### Approval Options Explained

| Option | Behavior | Risk Level |
| --- | --- | --- |
| Yes | Allow this one time | Low - Full control |
| Yes, for session | Allow all similar for session | Medium - Review first use |
| No | Deny and redirect | None - Maximum safety |

### Dangerous Commands to Watch

⚠️ **Be careful approving session-wide permissions for:**

* `rm` - File deletion
* `chmod` - Permission changes
* `git push` - Pushing to remote
* `sudo` - Elevated privileges
* Network commands - Data exfiltration risk

### Safe Commands for Session Approval

✅ **Generally safe for session-wide approval:**

* `ls`, `cat`, `head`, `tail` - Read-only
* `git status`, `git log`, `git diff` - Read-only git
* `pwd`, `echo` - Environment queries
* Linters and formatters - Analysis only

## Summary

* **Slash commands** provide quick access to CLI features via `/command` syntax
* **Keyboard shortcuts** offer fast navigation and control (e.g., `@` for files, `!` for shell)
* **Tool approval** has one-time and session-wide options
* Be cautious with session-wide approval for destructive commands
* Use `/help` to discover all available commands at any time

## References

* [About Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
* [Use Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
* [Copilot Coding Agent](https://docs.github.com/en/copilot/using-github-copilot/using-the-copilot-coding-agent)
