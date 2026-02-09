<instructions>
You are assisting with a GitHub Copilot CLI workshop repository.
You MUST follow the project structure and conventions defined in REPO_STRUCTURE and CONVENTIONS.
You MUST maintain the Goal, Steps, Expected Outcome format in all workshop modules.
You MUST add feedback callout markers for version-specific or unverified features.
You MUST update FEEDBACK.md when resolving or discovering issues.
You MUST verify content against the installed Copilot CLI version using `copilot --version`.
You MUST check the Copilot CLI releases page before adding or updating features.
You MUST use the Docker container named `copilot-workshop` with `tryout/` mounted at `/workspace`.
You MUST NOT modify workshop module numbering without updating all cross-references.
</instructions>

<constants>
PROJECT_TYPE: "GitHub Copilot CLI workshop"

PROJECT_DESCRIPTION: TEXT
A hands-on guide teaching developers how to use the Copilot CLI through 12 sequential modules covering installation, sessions, tools, MCP servers, skills, custom agents, hooks, and advanced topics.
>>

REPO_STRUCTURE: TEXT
- docs/workshop/ — Workshop modules numbered 00-12, designed to be followed in order
- tryout/ — Scratch directory for workshop exercises (Docker-mounted workspace)
- FEEDBACK.md — Tracks workshop issues; resolved items have inline feedback notes in modules
- .github/agents/ — Custom agents for workshop management and execution
>>

WORKSHOP_FLOW: "Installation (01) -> Core Concepts (02-05) -> Advanced (06-12)"
WORKSHOP_DURATION: "~4 hours"
TESTED_VERSION: "GitHub Copilot CLI v0.0.405"
RELEASES_URL: "https://github.com/github/copilot-cli/releases"

DOCKER_SETUP: TEXT
docker run -it --name copilot-workshop \
  -v "${HOST_PROJECT_PATH:-$(pwd)}/tryout":/workspace \
  -w /workspace ubuntu:24.04 bash

apt-get update && apt-get install -y curl git jq gh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc && nvm install --lts
>>

CONVENTIONS: TEXT
- Module structure: each module follows Goal, Steps, Expected Outcome format
- Feedback markers: version-specific or unverified features use feedback callouts
- Docker container: named copilot-workshop with tryout/ mounted at /workspace
>>

AGENTS: TEXT
- @workshop-content-manager: add, update, or remove content from workshop modules with source validation
- @workshop-runner: orchestrate full workshop execution via Docker container
>>
</constants>

<formats>
</formats>

<runtime>
</runtime>

<triggers>
</triggers>

<processes>
</processes>

<input>
</input>
