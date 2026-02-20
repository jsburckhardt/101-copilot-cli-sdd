# Module 11: Context Management

## Prerequisites

- Completed Modules 1-10
- Understanding of LLM token limits
- Active Copilot CLI session experience

## Learning Objectives

- Understand how context works in Copilot CLI
- Use `/context` to monitor token usage
- Use `/compact` to compress session history
- Optimize context for better responses
- Manage large codebases efficiently

## Concepts

### What is Context?

Context is everything Copilot "remembers" during a session:

```text
┌────────────────────────────────────────────────┐
│                  Context Window                │
├────────────────────────────────────────────────┤
│ System Instructions (AGENTS.md, etc.)          │
├────────────────────────────────────────────────┤
│ Conversation History (prompts + responses)     │
├────────────────────────────────────────────────┤
│ File Contents (read during session)            │
├────────────────────────────────────────────────┤
│ Tool Results (command outputs, etc.)           │
├────────────────────────────────────────────────┤
│ Available Space for Response                   │
└────────────────────────────────────────────────┘
```

### Token Limits

| Model | Approximate Limit |
|-------|-------------------|
| GPT-4 | ~128K tokens |
| GPT-4.1 | ~128K tokens |
| Claude Sonnet 4.6 | ~200K tokens |
| ~~GPT-5 mini~~ | ~~128K tokens~~ (deprecated v0.0.412) |

> [!NOTE]
> Use `/model` to select a model and `/context` to see context window usage. Current models include:
> - Claude Opus 4.6
> - Gemini 3 Pro
> - GPT-5.3-Codex
> - GPT-5 mini
>
> Model availability may vary by Copilot subscription tier.

### Auto-Compaction

When context reaches ~95% capacity, Copilot automatically compresses history to continue the session.

## Hands-On Exercises

### Exercise 1: Monitor Context Usage

**Goal:** Learn to track context consumption.

**Steps:**

1. Start a fresh session:
   ```bash
   copilot
   ```

2. Check initial context:
   ```
   /context
   ```

   You'll see:
   - Total tokens available
   - Tokens used
   - Percentage filled
   - Breakdown by category

3. Have a conversation that uses context:
   ```
   Explain the concept of dependency injection
   ```

4. Check context again:
   ```
   /context
   ```

5. Read some files:
   ```
   Show me the contents of package.json
   ```

6. Check how file reading affects context:
   ```
   /context
   ```

7. Continue building context:
   ```
   Now explain how TypeScript interfaces work
   ```
   ```
   Give me examples of generics in TypeScript
   ```

8. Monitor the growth:
   ```
   /context
   ```

**Expected Outcome:**
You understand how different actions consume context.

### Exercise 2: Manual Compaction

**Goal:** Use `/compact` to compress session history.

**Steps:**

1. Continue from Exercise 1 or start a session with significant history.

2. Check current context:
   ```
   /context
   ```

3. Run manual compaction:
   ```
   /compact
   ```

4. Check context after compaction:
   ```
   /context
   ```

5. Notice:
   - Token count decreased
   - Core information preserved
   - Detailed conversation history summarized

6. Verify context was preserved:
   ```
   What were we discussing earlier?
   ```

   Copilot should remember the key topics.

**Expected Outcome:**
Context reduced while preserving important information.

### Exercise 3: Context-Efficient Prompting

**Goal:** Learn to use context efficiently.

**Steps:**

1. **Inefficient approach** (uses lots of context):
   ```bash
   copilot
   ```
   ```
   Read all the files in the src directory and tell me what each one does
   ```

   This loads all files into context at once.

2. Check context:
   ```
   /context
   ```

3. Start a new session with efficient approach:
   ```bash
   copilot
   ```
   ```
   List the files in src directory
   ```

   Then selectively:
   ```
   Show me just the main entry point file
   ```

4. Compare context usage:
   ```
   /context
   ```

5. **Best practices for efficient context:**
   - Load files on-demand, not all at once
   - Use specific queries instead of broad exploration
   - Compact regularly during long sessions
   - Clear context when switching topics

**Expected Outcome:**
You can manage context efficiently.

### Exercise 4: Working with Large Codebases

**Goal:** Strategies for large projects without exhausting context.

**Steps:**

1. **Use the Explore agent for overview:**
   ```bash
   copilot
   ```
   ```
   @explore give me an overview of this codebase structure
   ```

   The Explore agent doesn't pollute main context.

2. **Focus on specific areas:**
   ```
   I want to understand the authentication flow. What files should I look at?
   ```

3. **Read selectively:**
   ```
   Show me only the auth middleware file
   ```

4. **Use grep instead of reading entire files:**
   ```
   Search for "authenticate" in the codebase
   ```

5. **Clear when switching tasks:**
   ```
   /clear
   ```
   ```
   Now let's look at the database layer
   ```

6. **Leverage file-specific questions:**
   ```
   In src/db/connection.ts, how is the connection pool configured?
   ```

   Copilot reads only what's needed.

**Expected Outcome:**
Large codebases manageable without hitting limits.

### Exercise 5: Context Window Optimization

**Goal:** Configure for optimal context usage.

**Steps:**

1. **Choose the right model:**
   ```bash
   copilot
   ```
   ```
   /model
   ```

   Select a model with larger context if available.

2. **Use specific instructions:**

   Instead of:
   ```
   Tell me everything about this file
   ```

   Use:
   ```
   What does the processPayment function in payment.ts do?
   ```

3. **Batch related questions:**

   Instead of:
   ```
   What does function A do?
   What does function B do?
   What does function C do?
   ```

   Use:
   ```
   Explain functions A, B, and C in auth.ts
   ```

4. **Use references instead of copies:**
   ```
   Look at the PaymentService class - don't repeat the code, just explain the flow
   ```

5. **Summarize when appropriate:**
   ```
   Summarize what we've learned so far in 3 bullet points
   ```

   Then clear and continue with the summary as context.

**Expected Outcome:**
Maximum utility from available context.

### Exercise 6: Understanding Auto-Compaction

**Goal:** See auto-compaction in action.

**Steps:**

1. Start a session and fill context deliberately:
   ```bash
   copilot
   ```

2. Generate lots of content:
   ```
   Write a detailed explanation of microservices architecture with examples
   ```
   ```
   Now explain event-driven architecture in detail
   ```
   ```
   Compare REST vs GraphQL with code examples for both
   ```

3. Continue until you see auto-compaction trigger:
   ```
   Explain the CQRS pattern with implementation details
   ```

4. Watch for the auto-compaction message.

5. After compaction:
   ```
   /context
   ```

6. Verify continuity:
   ```
   What architectural patterns have we discussed?
   ```

**Expected Outcome:**
Auto-compaction preserves session continuity.

### Exercise 7: Context-Aware Workflow

**Goal:** Build a workflow that manages context intelligently.

**Steps:**

1. **Phase 1: Discovery (low context)**
   ```bash
   copilot
   ```
   ```
   @explore what are the main components of this application?
   ```

2. **Phase 2: Focus (targeted context)**
   ```
   /clear
   ```
   ```
   Let's focus on the API layer. Show me the main router file.
   ```

3. **Phase 3: Deep dive (specific context)**
   ```
   I want to add a new endpoint. Show me an existing endpoint as a template.
   ```

4. **Phase 4: Implementation (working context)**
   ```
   Create a new endpoint for user preferences based on that pattern
   ```

5. **Phase 5: Cleanup (compact)**
   ```
   /compact
   ```
   ```
   Now let's write tests for the new endpoint
   ```

6. **Monitor throughout:**
   After each phase:
   ```
   /context
   ```

**Expected Outcome:**
Systematic workflow keeps context under control.

## Context Commands Reference

### Slash Commands

| Command | Description |
|---------|-------------|
| `/context` | Show detailed context usage |
| `/compact` | Compress session history |
| `/clear` | Clear all context (start fresh) |
| `/cwd` | Change working directory (affects context scope) |
| `/add-dir` | Add directory to accessible scope |

### Context Categories

| Category | Description | Impact |
|----------|-------------|--------|
| System | Instructions, agents | Fixed overhead |
| History | Conversation turns | Grows with conversation |
| Files | Read file contents | Can be large |
| Tools | Command outputs | Varies by tool |
| Response | Space for answer | Reduces with context |

### Optimization Strategies

| Strategy | When to Use |
|----------|-------------|
| `/clear` | Switching to unrelated topic |
| `/compact` | Long session, need to continue |
| `@explore` | Codebase overview without context cost |
| Selective reading | Large files, specific needs |
| Summarization | Preserve knowledge, reduce tokens |

## Context Usage Tips

### Do ✅

- Check `/context` regularly
- Compact before running out
- Clear when switching topics
- Use targeted queries
- Leverage `@explore` for overview

### Don't ❌

- Read entire codebase at once
- Ask broad questions in large projects
- Let auto-compaction be your only strategy
- Repeat information already in context
- Ignore context warnings

## Summary

- ✅ Context is limited - monitor with `/context`
- ✅ `/compact` compresses while preserving key info
- ✅ `/clear` resets for topic changes
- ✅ Auto-compaction triggers at ~95% capacity
- ✅ Efficient prompting extends useful session length
- ✅ `@explore` agent preserves main context

## Next Steps

→ Continue to [Module 12: Advanced Topics](12-advanced.md)

## References

- [Use Copilot CLI - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Context Management Changelog](https://github.blog/changelog/2026-01-14-github-copilot-cli-enhanced-agents-context-management-and-new-ways-to-install/)
