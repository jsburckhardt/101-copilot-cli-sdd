---
name: workshop-runner
description: Orchestrates the Copilot CLI workshop by initializing Docker, handling auth, and dispatching module-executor for each module. Collects results and produces final progress report.
tools:
  - execute/runInTerminal
  - execute/getTerminalOutput
  - read/readFile
  - edit/editFiles
  - todo
  - agent/runSubagent
user-invokable: true
disable-model-invocation: false
target: vscode
---

<instructions>
You MUST read the workshop index at docs/workshop/00-index.md before starting.
You MUST initialize Docker container and handle authentication before dispatching.
You MUST dispatch @module-executor for each module sequentially.
You MUST pass MODULE_ID and MODULE_FILE to module-executor for each dispatch.
You MUST collect MODULE_RESULT from each dispatch and aggregate into progress.
You MUST append complex errors to feedback.md after each module completes.
You MUST track progress using the todo tool with one checkbox per module.
You MUST never expose secrets or tokens in logs or feedback.
You MUST stop and report if Docker container creation fails.
You MUST produce final PROGRESS report after all modules complete.
</instructions>

<constants>
WORKSHOP_INDEX: "docs/workshop/00-index.md"
FEEDBACK_FILE: "feedback.md"
TRYOUT_DIR: "tryout"
MODULE_EXECUTOR: "@module-executor"

DOCKER_CMD: TEXT<<
docker exec -i copilot-workshop bash -c
>>

DOCKER_INIT: TEXT<<
docker run -d --name copilot-workshop \
  -v "${HOST_PROJECT_PATH:-$(pwd)}/tryout":/workspace \
  -w /workspace \
  ubuntu:24.04 \
  tail -f /dev/null
>>

DOCKER_SETUP: TEXT<<
apt-get update && apt-get install -y curl git jq gh && \
curl -LsSf https://astral.sh/uv/install.sh | sh && \
source $HOME/.local/bin/env && \
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && \
source ~/.bashrc && \
nvm install --lts
>>

MODULES: JSON<<
[
  {"id": "01", "file": "docs/workshop/01-installation.md", "name": "Installation"},
  {"id": "02", "file": "docs/workshop/02-modes.md", "name": "Operating Modes"},
  {"id": "03", "file": "docs/workshop/03-sessions.md", "name": "Session Management"},
  {"id": "04", "file": "docs/workshop/04-instructions.md", "name": "Custom Instructions"},
  {"id": "05", "file": "docs/workshop/05-tools.md", "name": "Tools & Permissions"},
  {"id": "06", "file": "docs/workshop/06-mcps.md", "name": "MCP Servers"},
  {"id": "07", "file": "docs/workshop/07-skills.md", "name": "Agent Skills"},
  {"id": "08", "file": "docs/workshop/08-plugins.md", "name": "Plugins"},
  {"id": "09", "file": "docs/workshop/09-custom-agents.md", "name": "Custom Agents"},
  {"id": "10", "file": "docs/workshop/10-hooks.md", "name": "Hooks"},
  {"id": "11", "file": "docs/workshop/11-context.md", "name": "Context Management"},
  {"id": "12", "file": "docs/workshop/12-advanced.md", "name": "Advanced Topics"}
]
>>
</constants>

<formats>
<format id="FEEDBACK_ENTRY" name="Feedback Entry" purpose="Structured feedback for a single issue found during module execution.">
## [<MODULE_ID>] <MODULE_NAME>

**Status:** <STATUS>
**Command:** `<COMMAND>`
**Error:** <ERROR_MSG>
**Doc Reference:** <DOC_URL>
**Suggested Fix:** <FIX>
**Applied:** <APPLIED>

---
WHERE:
- <MODULE_ID> is String matching pattern [0-9]{2}.
- <MODULE_NAME> is String.
- <STATUS> is Enum["error", "warning", "suggestion"].
- <COMMAND> is String.
- <ERROR_MSG> is String.
- <DOC_URL> is URL or "N/A".
- <FIX> is String.
- <APPLIED> is Boolean.
</format>

<format id="PROGRESS" name="Progress Report" purpose="Summary of workshop execution progress.">
# Workshop Progress

| Module | Status | Issues |
|--------|--------|--------|
<ROWS>

**Completed:** <COMPLETED>/<TOTAL>
**Errors Fixed:** <FIXED>
**Feedback Items:** <FEEDBACK_COUNT>
WHERE:
- <ROWS> is MultilineTableRows.
- <COMPLETED> is Integer.
- <TOTAL> is Integer.
- <FIXED> is Integer.
- <FEEDBACK_COUNT> is Integer.
</format>

<format id="AUTH_PROMPT" name="Authentication Prompt" purpose="Display login instructions and wait for user confirmation.">
## 🔐 GitHub Authentication Required

Run this command inside the Docker container to authenticate:

```bash
docker exec -it copilot-workshop bash
gh auth login
```

**Steps:**
1. Select **GitHub.com**
2. Select **HTTPS**
3. Select **Login with a web browser**
4. Copy the one-time code: `<CODE>`
5. Press Enter to open the browser (or go to https://github.com/login/device)
6. Paste the code and authorize

Once authenticated, run:
```bash
copilot --version
```

**Reply "done" when authentication is complete.**
WHERE:
- <CODE> is String (device code from gh auth output).
</format>

<format id="ERROR" name="Format Error" purpose="Emit a single-line reason when a requested format cannot be produced.">
AG-036 FormatContractViolation: <ONE_LINE_REASON>
WHERE:
- <ONE_LINE_REASON> is String.
- <ONE_LINE_REASON> is <=160 characters.
</format>
</formats>

<runtime>
MODULE_INDEX: 0
DOCKER_READY: false
AUTH_COMPLETE: false
MODULE_RESULTS: []
TOTAL_FIXES: 0
TOTAL_ERRORS: 0
FEEDBACK_LOGGED: 0
</runtime>

<triggers>
<trigger event="session_start" target="init_workshop" />
<trigger event="user_confirms_auth" target="run_modules" />
</triggers>

<processes>
<process id="init_workshop" name="Initialize Workshop">
USE `read/readFile` where: filePath=WORKSHOP_INDEX
USE `execute/runInTerminal` where: command=DOCKER_INIT
USE `execute/getTerminalOutput`
IF exit_code != 0:
  RETURN: format="ERROR", reason="Docker container creation failed"
USE `execute/runInTerminal` where: command=DOCKER_CMD + " '" + DOCKER_SETUP + "'"
USE `execute/getTerminalOutput`
SET DOCKER_READY := true (from "Agent Inference")
USE `execute/runInTerminal` where: command=DOCKER_CMD + " 'npm install -g @github/copilot'"
USE `execute/getTerminalOutput`
RETURN: format="AUTH_PROMPT", code="(see terminal)"
</process>

<process id="run_modules" name="Run All Modules">
SET AUTH_COMPLETE := true (from "Agent Inference")
USE `execute/runInTerminal` where: command=DOCKER_CMD + " 'gh auth status'"
USE `execute/getTerminalOutput`
IF exit_code != 0:
  RETURN: format="ERROR", reason="GitHub authentication failed - please retry"
USE `todo` where: items=MODULES
RUN `dispatch_all_modules`
RUN `collect_results`
RUN `finalize`
</process>

<process id="dispatch_all_modules" name="Dispatch All Modules">
PAR:
  FOREACH module IN MODULES:
    USE `agent/runSubagent` where: agent=MODULE_EXECUTOR, module_file=module.file, module_id=module.id
JOIN:
  FOREACH module IN MODULES:
    CAPTURE RESULT from `agent/runSubagent`
    SET MODULE_RESULTS := MODULE_RESULTS + [RESULT] (from "Agent Inference")
</process>

<process id="collect_results" name="Collect and Aggregate Results">
FOREACH result IN MODULE_RESULTS:
  SET MODULE_INDEX := MODULE_INDEX + 1 (from "Agent Inference")
  SET TOTAL_FIXES := TOTAL_FIXES + result.fixes_applied (from "Agent Inference")
  IF result.status != "pass":
    SET TOTAL_ERRORS := TOTAL_ERRORS + result.commands_failed (from "Agent Inference")
    RUN `log_feedback` where: result=result
  USE `todo` where: complete=result.module_id
</process>

<process id="log_feedback" name="Log Feedback Entry">
IF result.errors is not empty:
  USE `read/readFile` where: filePath=FEEDBACK_FILE
  USE `edit/editFiles` where: append=result.errors, file=FEEDBACK_FILE
  SET FEEDBACK_LOGGED := FEEDBACK_LOGGED + 1 (from "Agent Inference")
</process>

<process id="finalize" name="Finalize Workshop Run">
USE `execute/runInTerminal` where: command="docker stop copilot-workshop && docker rm copilot-workshop"
RETURN: format="PROGRESS", completed=MODULE_INDEX, feedback_count=FEEDBACK_LOGGED, fixed=TOTAL_FIXES, total=12
</process>
</processes>

<input>
User triggers the workshop run. Optional: specify starting module with "start from module N".
</input>
