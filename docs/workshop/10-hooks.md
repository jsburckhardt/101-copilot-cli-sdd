# Module 10: Hooks

## Prerequisites

- Completed Modules 1-9
- Understanding of shell scripting (bash/PowerShell)
- JSON basics

## Learning Objectives

- Understand the hooks lifecycle
- Configure hooks for different events
- Use preToolUse hooks for permission control
- Create session logging and auditing
- Implement security guardrails with hooks

## Concepts

### What are Hooks?

Hooks are custom scripts that execute at specific points during Copilot agent execution:

```
Session Start → User Prompt → Pre-Tool → Tool Execution → Post-Tool → Session End
     ↓              ↓            ↓             ↓              ↓            ↓
   Hook           Hook         Hook                        Hook         Hook
```

### Hook Types

| Hook | Trigger | Use Cases |
|------|---------|-----------|
| `sessionStart` | Session begins | Logging, environment setup |
| `sessionEnd` | Session ends | Cleanup, metrics |
| `userPromptSubmitted` | User sends prompt | Audit, filtering |
| `preToolUse` | Before tool execution | Permission control, validation |
| `postToolUse` | After tool execution | Logging, verification |
| `errorOccurred` | Error happens | Error handling, alerts |

### Hook Locations

- **Copilot Coding Agent**: `.github/hooks/hooks.json` (on default branch)
- **Copilot CLI**: Hooks loaded from current working directory

## Hands-On Exercises

> ⚠️ **FEEDBACK**: The hooks scripts use `jq` for JSON parsing. Ensure `jq` is installed on your system (`apt install jq`, `brew install jq`, or equivalent) before running these exercises. Without `jq`, the shell scripts will fail to parse hook inputs.

### Exercise 1: Create a Basic Hooks Configuration

**Goal:** Set up hooks infrastructure.

**Steps:**

1. Create the hooks directory:
   ```bash
   mkdir -p .github/hooks
   ```

2. Create the hooks configuration file:
   ```bash
   cat > .github/hooks/hooks.json << 'EOF'
   {
     "version": 1,
     "hooks": {
       "sessionStart": [],
       "sessionEnd": [],
       "userPromptSubmitted": [],
       "preToolUse": [],
       "postToolUse": [],
       "errorOccurred": []
     }
   }
   EOF
   ```

3. This is the skeleton - we'll add hooks in subsequent exercises.

**Expected Outcome:**
Hooks configuration file ready for customization.

### Exercise 2: Session Logging Hooks

**Goal:** Log session start and end for auditing.

**Steps:**

1. Create a logs directory:
   ```bash
   mkdir -p logs
   echo "logs/" >> .gitignore
   ```

2. Update hooks.json with session hooks:
   ```bash
   cat > .github/hooks/hooks.json << 'EOF'
   {
     "version": 1,
     "hooks": {
       "sessionStart": [
         {
           "type": "command",
           "bash": "echo \"[$(date -Iseconds)] SESSION_START source=$SOURCE\" >> logs/copilot-audit.log",
           "powershell": "Add-Content -Path logs/copilot-audit.log -Value \"[$(Get-Date -Format o)] SESSION_START source=$env:SOURCE\"",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "sessionEnd": [
         {
           "type": "command",
           "bash": "echo \"[$(date -Iseconds)] SESSION_END duration=${DURATION}s\" >> logs/copilot-audit.log",
           "powershell": "Add-Content -Path logs/copilot-audit.log -Value \"[$(Get-Date -Format o)] SESSION_END duration=$env:DURATION\"",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "userPromptSubmitted": [],
       "preToolUse": [],
       "postToolUse": [],
       "errorOccurred": []
     }
   }
   EOF
   ```

3. Test the hooks:
   ```bash
   copilot
   ```
   ```
   Hello, Copilot!
   ```
   ```
   /exit
   ```

4. Check the log:
   ```bash
   cat logs/copilot-audit.log
   ```

**Expected Outcome:**
Sessions are logged with timestamps.

### Exercise 3: Prompt Auditing Hook

**Goal:** Log all user prompts for compliance.

**Steps:**

1. Add prompt logging to hooks.json:
   ```bash
   cat > .github/hooks/hooks.json << 'EOF'
   {
     "version": 1,
     "hooks": {
       "sessionStart": [
         {
           "type": "command",
           "bash": "echo \"[$(date -Iseconds)] SESSION_START\" >> logs/copilot-audit.log",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "sessionEnd": [
         {
           "type": "command",
           "bash": "echo \"[$(date -Iseconds)] SESSION_END\" >> logs/copilot-audit.log",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "userPromptSubmitted": [
         {
           "type": "command",
           "bash": "echo \"[$(date -Iseconds)] PROMPT: $(echo $PROMPT | head -c 100)...\" >> logs/copilot-audit.log",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "preToolUse": [],
       "postToolUse": [],
       "errorOccurred": []
     }
   }
   EOF
   ```

2. Test with several prompts:
   ```bash
   copilot
   ```
   ```
   List all files in the current directory
   ```
   ```
   Show me the contents of hooks.json
   ```
   ```
   /exit
   ```

3. Review the audit log:
   ```bash
   cat logs/copilot-audit.log
   ```

**Expected Outcome:**
All prompts logged with timestamps.

### Exercise 4: Pre-Tool Permission Control

**Goal:** Implement security guardrails with preToolUse hooks.

**Steps:**

1. Create a permission control script:
   ```bash
   mkdir -p .github/hooks/scripts
   
   cat > .github/hooks/scripts/check-tool.sh << 'EOF'
   #!/bin/bash
   
   # Read input from stdin
   INPUT=$(cat)
   
   # Parse tool information
   TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
   TOOL_ARGS=$(echo "$INPUT" | jq -r '.toolArgs')
   
   # Log the tool request
   echo "[$(date -Iseconds)] TOOL_REQUEST: $TOOL_NAME" >> logs/copilot-audit.log
   
   # Define blocked patterns
   BLOCKED_COMMANDS=("rm -rf" "sudo" "chmod 777" "> /dev/sda" "mkfs")
   
   # Check if this is a shell command
   if [ "$TOOL_NAME" = "shell" ]; then
     COMMAND=$(echo "$TOOL_ARGS" | jq -r '.command // empty')
     
     # Check against blocked patterns
     for BLOCKED in "${BLOCKED_COMMANDS[@]}"; do
       if [[ "$COMMAND" == *"$BLOCKED"* ]]; then
         echo "{\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"Command '$BLOCKED' is not allowed by policy\"}"
         exit 0
       fi
     done
   fi
   
   # Check for write operations to sensitive paths
   if [ "$TOOL_NAME" = "write" ] || [ "$TOOL_NAME" = "edit" ]; then
     FILE_PATH=$(echo "$TOOL_ARGS" | jq -r '.path // empty')
     
     # Block writes to sensitive locations
     SENSITIVE_PATHS=("/etc" "/usr" "/bin" "/sbin" ".env" ".git/config" "package-lock.json")
     
     for SENSITIVE in "${SENSITIVE_PATHS[@]}"; do
       if [[ "$FILE_PATH" == *"$SENSITIVE"* ]]; then
         echo "{\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"Writing to '$SENSITIVE' is not allowed by policy\"}"
         exit 0
       fi
     done
   fi
   
   # Allow all other operations (return nothing for default behavior)
   echo "{}"
   EOF
   
   chmod +x .github/hooks/scripts/check-tool.sh
   ```

2. Update hooks.json to use the script:
   ```bash
   cat > .github/hooks/hooks.json << 'EOF'
   {
     "version": 1,
     "hooks": {
       "sessionStart": [
         {
           "type": "command",
           "bash": "echo \"[$(date -Iseconds)] SESSION_START\" >> logs/copilot-audit.log",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "sessionEnd": [
         {
           "type": "command",
           "bash": "echo \"[$(date -Iseconds)] SESSION_END\" >> logs/copilot-audit.log",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "userPromptSubmitted": [],
       "preToolUse": [
         {
           "type": "command",
           "bash": ".github/hooks/scripts/check-tool.sh",
           "cwd": ".",
           "timeoutSec": 10
         }
       ],
       "postToolUse": [],
       "errorOccurred": []
     }
   }
   EOF
   ```

3. Test the guardrails:
   ```bash
   copilot
   ```
   ```
   Run rm -rf on the current directory
   ```

4. The hook should deny this operation.

**Expected Outcome:**
Dangerous commands are blocked by the preToolUse hook.

### Exercise 5: Post-Tool Verification

**Goal:** Log and verify tool execution results.

**Steps:**

1. Create a post-tool logging script:
   ```bash
   cat > .github/hooks/scripts/log-tool-result.sh << 'EOF'
   #!/bin/bash
   
   INPUT=$(cat)
   
   TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
   SUCCESS=$(echo "$INPUT" | jq -r '.success')
   DURATION=$(echo "$INPUT" | jq -r '.durationMs')
   
   echo "[$(date -Iseconds)] TOOL_COMPLETE: $TOOL_NAME success=$SUCCESS duration=${DURATION}ms" >> logs/copilot-audit.log
   
   # Alert on failures
   if [ "$SUCCESS" = "false" ]; then
     echo "[$(date -Iseconds)] ALERT: Tool $TOOL_NAME failed!" >> logs/copilot-alerts.log
   fi
   EOF
   
   chmod +x .github/hooks/scripts/log-tool-result.sh
   ```

2. Add to hooks.json:
   ```bash
   cat > .github/hooks/hooks.json << 'EOF'
   {
     "version": 1,
     "hooks": {
       "sessionStart": [
         {
           "type": "command",
           "bash": "echo \"[$(date -Iseconds)] SESSION_START\" >> logs/copilot-audit.log",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "sessionEnd": [],
       "userPromptSubmitted": [],
       "preToolUse": [
         {
           "type": "command",
           "bash": ".github/hooks/scripts/check-tool.sh",
           "cwd": ".",
           "timeoutSec": 10
         }
       ],
       "postToolUse": [
         {
           "type": "command",
           "bash": ".github/hooks/scripts/log-tool-result.sh",
           "cwd": ".",
           "timeoutSec": 5
         }
       ],
       "errorOccurred": []
     }
   }
   EOF
   ```

3. Test with various operations and check logs.

**Expected Outcome:**
All tool executions are logged with results.

### Exercise 6: Error Handling Hooks

**Goal:** Capture and respond to errors.

**Steps:**

1. Create an error handling script:
   ```bash
   cat > .github/hooks/scripts/handle-error.sh << 'EOF'
   #!/bin/bash
   
   INPUT=$(cat)
   
   ERROR_TYPE=$(echo "$INPUT" | jq -r '.errorType')
   ERROR_MESSAGE=$(echo "$INPUT" | jq -r '.errorMessage')
   TIMESTAMP=$(date -Iseconds)
   
   # Log the error
   echo "[$TIMESTAMP] ERROR: $ERROR_TYPE - $ERROR_MESSAGE" >> logs/copilot-errors.log
   
   # Could also send to monitoring system, Slack, etc.
   # curl -X POST https://monitoring.example.com/api/errors \
   #   -H "Content-Type: application/json" \
   #   -d "{\"type\":\"$ERROR_TYPE\",\"message\":\"$ERROR_MESSAGE\"}"
   EOF
   
   chmod +x .github/hooks/scripts/handle-error.sh
   ```

2. Add error hook:
   ```json
   "errorOccurred": [
     {
       "type": "command",
       "bash": ".github/hooks/scripts/handle-error.sh",
       "cwd": ".",
       "timeoutSec": 10
     }
   ]
   ```

**Expected Outcome:**
Errors are logged and can trigger alerts.

### Exercise 7: Directory-Restricted Hooks

**Goal:** Allow edits only in specific directories.

**Steps:**

1. Create a path restriction script:
   ```bash
   cat > .github/hooks/scripts/restrict-paths.sh << 'EOF'
   #!/bin/bash
   
   INPUT=$(cat)
   TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
   
   # Only check write operations
   if [ "$TOOL_NAME" != "write" ] && [ "$TOOL_NAME" != "edit" ]; then
     echo "{}"
     exit 0
   fi
   
   FILE_PATH=$(echo "$INPUT" | jq -r '.toolArgs.path // empty')
   
   # Allowed directories
   ALLOWED_DIRS=("src/" "test/" "tests/" "docs/")
   
   ALLOWED=false
   for DIR in "${ALLOWED_DIRS[@]}"; do
     if [[ "$FILE_PATH" == $DIR* ]] || [[ "$FILE_PATH" == ./$DIR* ]]; then
       ALLOWED=true
       break
     fi
   done
   
   if [ "$ALLOWED" = false ]; then
     echo "{\"permissionDecision\":\"deny\",\"permissionDecisionReason\":\"Can only edit files in src/, test/, tests/, or docs/ directories\"}"
     exit 0
   fi
   
   echo "{}"
   EOF
   
   chmod +x .github/hooks/scripts/restrict-paths.sh
   ```

2. Update preToolUse to use this script.

3. Test:
   ```bash
   copilot
   ```
   ```
   Create a file called config.json in the root directory
   ```

4. Should be denied. Then try:
   ```
   Create a file called utils.ts in the src directory
   ```

5. Should be allowed.

**Expected Outcome:**
Writes restricted to allowed directories.

## Hooks Configuration Reference

### Hook Input Variables

#### sessionStart
```json
{
  "source": "cli|vscode|coding-agent",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### userPromptSubmitted
```json
{
  "prompt": "User's prompt text",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### preToolUse
```json
{
  "toolName": "shell|write|edit|read|...",
  "toolArgs": {
    "command": "...",
    "path": "..."
  }
}
```

#### postToolUse
```json
{
  "toolName": "shell",
  "toolArgs": {},
  "success": true,
  "durationMs": 150,
  "result": "..."
}
```

### Permission Decision Response

```json
{
  "permissionDecision": "allow|deny",
  "permissionDecisionReason": "Explanation shown to user"
}
```

### Hook Command Schema

```json
{
  "type": "command",
  "bash": "script for bash",
  "powershell": "script for PowerShell",
  "cwd": ".",
  "timeoutSec": 10
}
```

## Summary

- ✅ Hooks execute at key points in agent lifecycle
- ✅ `preToolUse` enables security guardrails
- ✅ `postToolUse` allows verification and logging
- ✅ Session hooks enable auditing
- ✅ Error hooks support monitoring integration
- ✅ Hooks must return JSON for permission decisions

## Next Steps

→ Continue to [Module 11: Context Management](11-context.md)

## References

- [Hooks Configuration - GitHub Docs](https://docs.github.com/en/copilot/reference/hooks-configuration)
- [Use Hooks - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks)
