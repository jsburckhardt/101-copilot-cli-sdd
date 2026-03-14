# 101-copilot-cli-sdd

[![APS version](https://img.shields.io/badge/APS-v1.1.17-blue?logo=github)](https://github.com/chris-buckley/agnostic-prompt-standard/releases/tag/v1.1.17)

A quick guide to use GitHub Copilot CLI (tested with **v1.0.2**) + a sample SDD (Specification-Driven Development) project

## Workshop

The full workshop guide is available in [`docs/workshop/`](docs/workshop/00-index.md).

### Presentation Slides

Slide decks for each module are in [`docs/slides/`](docs/slides/) (powered by [Marp](https://marp.app/)):

- **VS Code** — Install the [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode) extension (pre-installed in Dev Container), open any slide `.md` file, and click the preview icon (or `Marp: Open Preview to the Side`).
- **Browser (direct preview)** — `npx @marp-team/marp-cli docs/slides/02-modes.md --preview`
- **Browser (server-client)** — `npx @marp-team/marp-cli docs/slides/ --server` then visit http://localhost:8080
- **Export to PDF/PPTX** — `npx @marp-team/marp-cli docs/slides/02-modes.md -o slides.pdf`

### Recommended: Open in Dev Container

This repo includes a `.devcontainer` configuration for a fully isolated workshop environment:

1. Open this repo in VS Code
2. Click **"Reopen in Container"** when prompted (or run `Dev Containers: Reopen in Container` from the command palette)
3. All prerequisites (Node.js, npm, git, gh) are pre-installed

> This is the recommended approach — it avoids polluting your host machine and ensures a consistent environment for all participants.

### Alternative: Run Directly on Host

If you prefer not to use the Dev Container, you can follow the workshop directly on your machine (requires Node.js 22+).

### Alternative: Run in Docker

To try out the workshop without affecting your local environment, use Docker:

1. **Create the tryout folder** (if it doesn't exist):
   ```bash
   mkdir -p tryout
   ```

2. **Start the container:**
   ```bash
   # Set HOST_PROJECT_PATH to your project location (required if running inside a devcontainer)
   # export HOST_PROJECT_PATH=/path/to/101-copilot-cli-sdd

   docker run -it \
     --name copilot-workshop \
     -v "${HOST_PROJECT_PATH:-$(pwd)}/tryout":/workspace \
     -w /workspace \
     ubuntu:24.04 \
     bash
   ```

3. **Inside the container**, install prerequisites:
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

**Useful Docker commands:**

| Action | Command |
|--------|---------|
| Reconnect to stopped container | `docker start -ai copilot-workshop` |
| Open parallel shell | `docker exec -it copilot-workshop bash` |
| Remove container when done | `docker rm copilot-workshop` |

## Responsible AI

This workshop uses AI-assisted development tools. We follow [Microsoft's Responsible AI principles](https://www.microsoft.com/ai/responsible-ai), which are grounded in six core values:

1. **Fairness** — AI systems should treat all people fairly
2. **Reliability & Safety** — AI systems should perform reliably and safely
3. **Privacy & Security** — AI systems should be secure and respect privacy
4. **Inclusiveness** — AI systems should empower everyone and engage people
5. **Transparency** — AI systems should be understandable
6. **Accountability** — People should be accountable for AI systems

> **Remember:** AI is a tool, not an authority. Always review, test, and validate AI-generated code before committing. You are responsible for every line in your codebase.

For detailed guidance on applying these principles in practice, see [`docs/responsible-ai.md`](docs/responsible-ai.md).
