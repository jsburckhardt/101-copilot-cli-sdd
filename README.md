# 101-copilot-cli-sdd

A quick guide to use copilot cli + a sample SDD (Specification-Driven Development) project

## Workshop

The full workshop guide is available in [`docs/workshop/`](docs/workshop/00-index.md).

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
