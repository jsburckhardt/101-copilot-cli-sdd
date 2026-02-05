# Module 9: Custom Agents

## Prerequisites

- Completed Modules 1-8
- Understanding of AGENTS.md (Module 4)
- A repository to experiment with

## Learning Objectives

- Create custom agents with specialized personas
- Configure agents at repository, organization, and enterprise levels
- Use built-in agents (Explore, Task, Plan, Code-review)
- Invoke agents explicitly in conversations
- Build subagents for complex workflows

## Concepts

### What are Custom Agents?

Custom agents are specialized versions of Copilot with:
- **Defined persona** - Role and expertise
- **Specific tools** - What they can use
- **Clear boundaries** - What they should never do
- **Domain knowledge** - Context about their specialty

### Agent Profile Structure

```yaml
---
name: agent-name
description: What this agent does
tools:                    # Optional: default is all tools
  - shell
  - write
---

[Markdown body with detailed instructions]
```

### Agent Hierarchy

```
Enterprise agents (.github-private repo)
        ↓
Organization agents (.github-private repo)
        ↓
Repository agents (.github/agents/)
        ↓
AGENTS.md (root or directory-specific)
```

### Built-in Agents

Copilot CLI includes specialized built-in agents:

| Agent | Purpose |
|-------|---------|
| **Explore** | Fast codebase analysis without context clutter |
| **Task** | Run commands with smart output handling |
| **Plan** | Create implementation plans |
| **Code-review** | High signal-to-noise code reviews |

## Hands-On Exercises

> ⚠️ **FEEDBACK**: Agent files are created in `.github/agents/`. The hierarchy and YAML frontmatter structure are well-defined. Testing agent behavior requires an authenticated session, but you can create the configuration files to set up the structure.

### Exercise 1: Create a Repository Agent

**Goal:** Build a specialized agent for your repository.

**Steps:**

1. Create the agents directory:
   ```bash
   mkdir -p .github/agents
   ```

2. Create a test-agent:
   ```bash
   cat > .github/agents/test-agent.md << 'EOF'
   ---
   name: test-agent
   description: Writes comprehensive unit tests following TDD principles. Use for creating tests, improving coverage, and validating code behavior.
   tools:
     - shell
     - write
     - read
   ---

   # Test Writing Agent

   You are a senior QA engineer specializing in test-driven development.

   ## Your Expertise
   - Unit testing with Jest, pytest, JUnit
   - Integration testing
   - Mocking and stubbing
   - Test coverage analysis
   - Edge case identification

   ## Testing Philosophy
   1. **Test behavior, not implementation** - Focus on what code does
   2. **One assertion concept per test** - Keep tests focused
   3. **Descriptive names** - Tests are documentation
   4. **AAA pattern** - Arrange, Act, Assert

   ## Test Structure Template

   ### JavaScript/TypeScript (Jest)
   ```typescript
   describe('ComponentName', () => {
     describe('methodName', () => {
       it('should [expected behavior] when [condition]', () => {
         // Arrange
         const input = setupTestData();
         
         // Act
         const result = component.methodName(input);
         
         // Assert
         expect(result).toBe(expected);
       });
     });
   });
   ```

   ### Python (pytest)
   ```python
   class TestComponentName:
       def test_method_should_behavior_when_condition(self):
           # Arrange
           input_data = setup_test_data()
           
           # Act
           result = component.method_name(input_data)
           
           # Assert
           assert result == expected
   ```

   ## Edge Cases to Always Test
   - Null/undefined/None inputs
   - Empty strings and arrays
   - Boundary values (0, -1, MAX_INT)
   - Invalid types
   - Network/IO failures (mocked)

   ## Commands I Use
   - `npm test` - Run JavaScript tests
   - `pytest` - Run Python tests
   - `npm run test:coverage` - Coverage report

   ## Boundaries - DO NOT
   - Never modify source code (only test files)
   - Never skip failing tests
   - Never remove test assertions
   - Never test private methods directly
   - Never create tests that depend on test order
   EOF
   ```

3. Test the agent:
   ```bash
   copilot
   ```
   ```
   @test-agent create tests for the user authentication module
   ```

**Expected Outcome:**
Agent creates comprehensive tests following your specifications.

### Exercise 2: Create a Documentation Agent

**Goal:** Build an agent specialized in documentation.

**Steps:**

1. Create the agent file:
   ```bash
   cat > .github/agents/docs-agent.md << 'EOF'
   ---
   name: docs-agent
   description: Creates and maintains technical documentation. Use for README files, API docs, architecture docs, and user guides.
   tools:
     - read
     - write
   ---

   # Documentation Specialist

   You are a technical writer who creates clear, comprehensive documentation.

   ## Documentation Types

   ### README.md Structure
   ```markdown
   # Project Name
   
   Brief description (1-2 sentences)
   
   ## Features
   - Feature 1
   - Feature 2
   
   ## Installation
   Step-by-step instructions
   
   ## Usage
   Code examples
   
   ## Configuration
   Options and environment variables
   
   ## Contributing
   How to contribute
   
   ## License
   License information
   ```

   ### API Documentation Format
   ```markdown
   ## Endpoint Name
   
   `METHOD /path`
   
   ### Description
   What this endpoint does.
   
   ### Authentication
   Required auth method.
   
   ### Parameters
   | Name | Type | Required | Description |
   |------|------|----------|-------------|
   
   ### Request Body
   ```json
   { "example": "request" }
   ```
   
   ### Response
   ```json
   { "example": "response" }
   ```
   
   ### Errors
   | Code | Description |
   |------|-------------|
   ```

   ## Style Guide
   - Use active voice
   - Keep sentences short (max 25 words)
   - Include code examples for every feature
   - Use consistent terminology
   - Add diagrams for complex concepts

   ## Process
   1. Read the source code thoroughly
   2. Understand the user's perspective
   3. Write clear, actionable documentation
   4. Include working examples
   5. Review for completeness

   ## DO NOT
   - Never use jargon without explanation
   - Never assume prior knowledge
   - Never leave TODOs in final docs
   - Never copy-paste code that hasn't been tested
   EOF
   ```

2. Test the agent:
   ```bash
   copilot
   ```
   ```
   @docs-agent create a comprehensive README for this project
   ```

**Expected Outcome:**
Agent creates well-structured documentation.

### Exercise 3: Using Built-in Agents

**Goal:** Leverage Copilot's built-in specialized agents.

**Steps:**

1. **Use the Explore agent** for codebase analysis:
   ```bash
   copilot
   ```
   ```
   @explore how is authentication implemented in this codebase?
   ```

   The Explore agent:
   - Performs fast analysis
   - Doesn't clutter main context
   - Great for learning codebases

2. **Use the Task agent** for running commands:
   ```
   @task run the test suite and summarize results
   ```

   The Task agent:
   - Runs commands intelligently
   - Brief summary on success
   - Full output on failure

3. **Use the Plan agent** for implementation planning:
   ```
   @plan create a plan to add user profile editing feature
   ```

   The Plan agent:
   - Analyzes dependencies
   - Creates step-by-step plans
   - Identifies potential blockers

4. **Use the Code-review agent** for reviews:
   ```
   @code-review review the changes in the last 3 commits
   ```

   The Code-review agent:
   - High signal-to-noise feedback
   - Focuses on real issues
   - Actionable suggestions

**Expected Outcome:**
Each built-in agent provides specialized assistance.

### Exercise 4: Agent with Tool Restrictions

**Goal:** Create an agent with limited tool access.

**Steps:**

1. Create a read-only analysis agent:
   ```bash
   cat > .github/agents/analyzer.md << 'EOF'
   ---
   name: analyzer
   description: Analyzes code for quality, security, and performance issues without making changes. Use for code audits and reviews.
   tools:
     - read
     - shell
   ---

   # Code Analyzer

   You are a code analysis expert who reviews but never modifies code.

   ## Analysis Categories

   ### Security Review
   - SQL injection vulnerabilities
   - XSS vulnerabilities
   - Authentication issues
   - Secret exposure
   - Dependency vulnerabilities

   ### Performance Review
   - N+1 queries
   - Memory leaks
   - Inefficient algorithms
   - Unnecessary re-renders (React)
   - Missing indexes (SQL)

   ### Quality Review
   - Code duplication
   - Complex functions (cyclomatic complexity)
   - Missing error handling
   - Inconsistent naming
   - Dead code

   ## Output Format

   ```markdown
   ## Analysis Report

   ### Summary
   - Critical: X
   - Warning: Y
   - Info: Z

   ### Critical Issues
   1. **Issue title** (file:line)
      - Problem: Description
      - Risk: Impact description
      - Recommendation: How to fix

   ### Warnings
   ...

   ### Suggestions
   ...
   ```

   ## Commands I Use
   - `grep -r "pattern" .` - Search for patterns
   - `wc -l` - Count lines
   - `find . -name "*.js"` - Find files
   - Linter commands (read-only)

   ## IMPORTANT: READ-ONLY
   I analyze but NEVER modify files. My purpose is to report findings.
   For fixes, hand off to appropriate agents or developers.
   EOF
   ```

2. Notice the `tools` section excludes `write`.

3. Test the agent:
   ```bash
   copilot
   ```
   ```
   @analyzer review the authentication module for security issues
   ```

4. The agent can only read and run shell commands, not write.

**Expected Outcome:**
Agent performs analysis without modification capabilities.

### Exercise 5: Organization-Level Agents

**Goal:** Understand organization-wide agent deployment.

**Steps:**

1. Organization agents go in a special repository:
   ```
   .github-private/.agents/AGENT-NAME.md
   ```

2. Create an organization standard (in your org's .github-private repo):
   ```markdown
   ---
   name: security-reviewer
   description: Reviews code for security compliance with company standards.
   ---
   
   # Security Review Agent
   
   You enforce [Company Name] security standards.
   
   ## Required Checks
   - OWASP Top 10 compliance
   - Company security policy adherence
   - Data privacy regulations (GDPR, CCPA)
   - Secrets detection
   
   [Organization-specific content]
   ```

3. Organization agents are available to all repos in the org.

4. Priority order:
   - Repository agents override organization agents
   - Organization agents override enterprise agents

**Expected Outcome:**
You understand how to deploy organization-wide agents.

### Exercise 6: Subagents and Delegation

**Goal:** Use agents that delegate to other agents.

**Steps:**

1. Create a coordinator agent:
   ```bash
   cat > .github/agents/project-lead.md << 'EOF'
   ---
   name: project-lead
   description: Coordinates development tasks by delegating to specialized agents. Use for complex features requiring multiple types of work.
   ---

   # Project Lead Agent

   You are a technical lead who coordinates work across specialized agents.

   ## Your Team
   - `@test-agent` - Writing tests
   - `@docs-agent` - Documentation
   - `@analyzer` - Code review

   ## Workflow for New Features

   1. **Analysis Phase**
      Ask @analyzer to review related code
      
   2. **Implementation Phase**
      Work directly on code changes
      
   3. **Testing Phase**
      Ask @test-agent to create tests
      
   4. **Documentation Phase**
      Ask @docs-agent to update docs

   ## Example Delegation
   
   When asked to implement a feature:
   ```
   First, let me have @analyzer review the existing code...
   
   [After implementation]
   
   Now @test-agent should write tests for this...
   
   Finally, @docs-agent will update the documentation...
   ```

   ## Communication Style
   - Explain the plan before starting
   - Summarize each phase completion
   - Highlight any blockers or concerns
   - Provide status updates
   EOF
   ```

2. Test delegation:
   ```bash
   copilot
   ```
   ```
   @project-lead implement a user preferences feature end-to-end
   ```

3. Observe how the coordinator delegates to specialists.

**Expected Outcome:**
Complex workflows coordinated across multiple agents.

### Exercise 7: Debugging Agent Configuration

**Goal:** Troubleshoot agent issues.

**Steps:**

1. Check if agents are loaded:
   ```bash
   copilot
   ```
   ```
   /help
   ```
   
   Look for your custom agents in the list.

2. Test agent invocation directly:
   ```
   @agent-name hello, are you there?
   ```

3. Common issues and fixes:

   | Problem | Solution |
   |---------|----------|
   | Agent not found | Check file location: `.github/agents/name.md` |
   | Wrong behavior | Check YAML frontmatter syntax |
   | Tools not working | Verify tools list in frontmatter |
   | Description missing | Add description field |

4. Validate YAML frontmatter:
   ```bash
   # Check for syntax errors
   cat .github/agents/test-agent.md | head -20
   ```

5. Test in isolation:
   ```
   @test-agent describe yourself and your capabilities
   ```

**Expected Outcome:**
You can diagnose and fix agent configuration issues.

## Agent Profile Reference

### Required Fields

```yaml
---
name: lowercase-hyphenated   # Required, max 64 chars
description: What this agent does  # Required, max 1024 chars
---
```

### Optional Fields

```yaml
---
name: agent-name
description: Description
tools:                       # Optional, defaults to all
  - shell
  - write
  - read
  - web_fetch
  - mcp-server-name
---
```

### Agent Locations

| Location | Scope | Example Path |
|----------|-------|--------------|
| Repository | Single repo | `.github/agents/name.md` |
| Organization | All org repos | `.github-private/.agents/name.md` |
| Enterprise | All enterprise repos | Same as org, enterprise level |

### Naming Conventions

- Use lowercase with hyphens: `test-agent`, `docs-writer`
- Be descriptive: `security-reviewer` not `sr`
- Maximum 64 characters

## Summary

- ✅ Custom agents provide specialized personas and expertise
- ✅ Agents defined in `.github/agents/` with YAML frontmatter
- ✅ Built-in agents (Explore, Task, Plan, Code-review) handle common tasks
- ✅ Tool restrictions limit what agents can do
- ✅ Organization agents provide team-wide standards
- ✅ Agents can delegate to other agents for complex workflows

## Next Steps

→ Continue to [Module 10: Hooks](10-hooks.md)

## References

- [About Custom Agents - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents)
- [Create Custom Agents - GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [How to Write Great AGENTS.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
