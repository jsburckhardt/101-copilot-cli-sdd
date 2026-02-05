# Module 7: Agent Skills

## Prerequisites

- Completed Modules 1-6
- Understanding of Markdown and YAML frontmatter
- A project to practice with

## Learning Objectives

- Understand the Agent Skills framework
- Create project-specific skills
- Create personal skills for cross-project use
- Discover skills from agentskills.io
- Use progressive disclosure for efficient context

## Concepts

### What are Agent Skills?

Skills are specialized capabilities that:
- Work across multiple AI agents (Copilot CLI, VS Code, coding agent)
- Reduce repetition - create once, use everywhere
- Load progressively - only relevant content enters context
- Can be shared publicly via agentskills.io

### Skills vs Instructions vs Agents

| Feature | Instructions | Skills | Agents |
|---------|--------------|--------|--------|
| Scope | Coding standards | Capabilities | Personas |
| Trigger | Always applied | On-demand | Explicitly invoked |
| Location | `.github/` | `.github/skills/` | `.github/agents/` |
| Context | Full file loaded | Progressive loading | Full profile loaded |

### Skill Discovery Levels

```
Level 1: Discovery      → Copilot reads name/description (always)
Level 2: Instructions   → Copilot loads SKILL.md body (when relevant)
Level 3: Resources      → Copilot accesses supporting files (as needed)
```

## Hands-On Exercises

### Exercise 1: Create a Project Skill

**Goal:** Build a skill for generating API documentation.

**Steps:**

1. Create the skills directory:
   ```bash
   mkdir -p .github/skills/api-docs
   ```

2. Create the skill definition:
   ```bash
   cat > .github/skills/api-docs/SKILL.md << 'EOF'
   ---
   name: api-docs
   description: Generates comprehensive API documentation from source code. Use when asked to document APIs, create OpenAPI specs, or write endpoint documentation.
   ---

   # API Documentation Generator

   You are an expert technical writer specializing in API documentation.

   ## Capabilities
   - Generate OpenAPI/Swagger specifications
   - Write human-readable API guides
   - Create request/response examples
   - Document authentication flows

   ## Documentation Style
   - Use clear, concise language
   - Include code examples in multiple languages
   - Document all parameters with types and descriptions
   - Include error responses and status codes

   ## Output Format

   ### For OpenAPI specs:
   ```yaml
   openapi: 3.0.0
   info:
     title: API Name
     version: 1.0.0
   paths:
     /resource:
       get:
         summary: Short description
         parameters: []
         responses:
           '200':
             description: Success
   ```

   ### For Markdown documentation:
   ```markdown
   ## Endpoint Name

   `METHOD /path`

   ### Description
   Brief description of what this endpoint does.

   ### Parameters
   | Name | Type | Required | Description |
   |------|------|----------|-------------|

   ### Response
   ```json
   { "example": "response" }
   ```
   ```

   ## Instructions
   1. First, examine the source code to understand the API structure
   2. Identify all endpoints, parameters, and response types
   3. Generate documentation following the style guide above
   4. Include practical examples that users can copy-paste
   EOF
   ```

3. Test the skill:
   ```bash
   copilot
   ```
   ```
   Document the API endpoints in this project
   ```

4. Copilot should use the api-docs skill automatically.

**Expected Outcome:**
API documentation generated following your skill's style guide.

### Exercise 2: Create a Testing Skill with Resources

**Goal:** Build a skill with supporting example files.

**Steps:**

1. Create the skill directory:
   ```bash
   mkdir -p .github/skills/test-writer
   ```

2. Create the main skill file:
   ```bash
   cat > .github/skills/test-writer/SKILL.md << 'EOF'
   ---
   name: test-writer
   description: Writes comprehensive unit and integration tests. Use when asked to create tests, improve test coverage, or write test cases.
   ---

   # Test Writing Specialist

   You are a QA engineer who writes thorough, maintainable tests.

   ## Testing Philosophy
   - Test behavior, not implementation
   - One assertion concept per test
   - Use descriptive test names
   - Follow the AAA pattern (Arrange, Act, Assert)

   ## Framework Detection
   Detect the testing framework from:
   - `package.json` dependencies (Jest, Mocha, Vitest)
   - `pytest.ini` or `pyproject.toml` (pytest)
   - `Cargo.toml` (Rust tests)
   - Existing test files

   ## Test Categories
   1. **Unit tests** - Test individual functions in isolation
   2. **Integration tests** - Test component interactions
   3. **Edge cases** - Test boundaries and error conditions

   ## Examples
   See `examples/` directory for framework-specific templates.

   ## Commands
   - Run tests: Check `package.json` scripts or use framework defaults
   - Coverage: Look for coverage configuration

   ## DO NOT
   - Remove failing tests without understanding why
   - Skip edge cases
   - Create tests that depend on external services without mocking
   EOF
   ```

3. Add example templates:
   ```bash
   mkdir -p .github/skills/test-writer/examples
   
   cat > .github/skills/test-writer/examples/jest.ts << 'EOF'
   import { describe, it, expect, beforeEach } from 'jest';
   import { MyService } from '../src/my-service';
   
   describe('MyService', () => {
     let service: MyService;
   
     beforeEach(() => {
       service = new MyService();
     });
   
     describe('methodName', () => {
       it('should return expected value for valid input', () => {
         // Arrange
         const input = 'valid';
   
         // Act
         const result = service.methodName(input);
   
         // Assert
         expect(result).toBe('expected');
       });
   
       it('should throw error for invalid input', () => {
         // Arrange
         const input = null;
   
         // Act & Assert
         expect(() => service.methodName(input)).toThrow('Invalid input');
       });
     });
   });
   EOF
   
   cat > .github/skills/test-writer/examples/pytest.py << 'EOF'
   import pytest
   from src.my_service import MyService
   
   
   class TestMyService:
       @pytest.fixture
       def service(self):
           return MyService()
   
       def test_method_returns_expected_for_valid_input(self, service):
           # Arrange
           input_value = "valid"
   
           # Act
           result = service.method_name(input_value)
   
           # Assert
           assert result == "expected"
   
       def test_method_raises_for_invalid_input(self, service):
           # Arrange
           input_value = None
   
           # Act & Assert
           with pytest.raises(ValueError, match="Invalid input"):
               service.method_name(input_value)
   EOF
   ```

4. Test the skill with examples:
   ```bash
   copilot
   ```
   ```
   Write tests for the user authentication module
   ```

5. Ask specifically about examples:
   ```
   Show me a pytest example for testing the API client
   ```

**Expected Outcome:**
Skill uses example files to generate framework-appropriate tests.

### Exercise 3: Create Personal Skills

**Goal:** Create skills that work across all your projects.

**Steps:**

1. Create personal skills directory:
   ```bash
   mkdir -p ~/.copilot/skills/git-workflow
   ```

2. Create a Git workflow skill:
   ```bash
   cat > ~/.copilot/skills/git-workflow/SKILL.md << 'EOF'
   ---
   name: git-workflow
   description: Manages Git operations following best practices. Use for commits, branches, PRs, and Git troubleshooting.
   ---

   # Git Workflow Assistant

   You help with Git operations following established conventions.

   ## Commit Messages
   Follow Conventional Commits:
   ```
   <type>(<scope>): <description>
   
   [optional body]
   
   [optional footer(s)]
   ```

   Types: feat, fix, docs, style, refactor, test, chore

   ## Branching Strategy
   - `main` - Production-ready code
   - `develop` - Integration branch
   - `feature/xxx` - New features
   - `fix/xxx` - Bug fixes
   - `hotfix/xxx` - Urgent production fixes

   ## PR Workflow
   1. Create feature branch from develop
   2. Make atomic commits with clear messages
   3. Push and create PR
   4. Address review feedback
   5. Squash and merge when approved

   ## Common Tasks

   ### Undo last commit (keep changes)
   ```bash
   git reset --soft HEAD~1
   ```

   ### Interactive rebase last N commits
   ```bash
   git rebase -i HEAD~N
   ```

   ### Clean up merged branches
   ```bash
   git branch --merged | grep -v "main\|develop" | xargs git branch -d
   ```
   EOF
   ```

3. Create a code review skill:
   ```bash
   mkdir -p ~/.copilot/skills/code-review
   
   cat > ~/.copilot/skills/code-review/SKILL.md << 'EOF'
   ---
   name: code-review
   description: Performs thorough code reviews focusing on quality, security, and maintainability. Use when reviewing PRs or code changes.
   ---

   # Code Review Expert

   You provide constructive, actionable code review feedback.

   ## Review Checklist
   1. **Correctness** - Does it work as intended?
   2. **Security** - Any vulnerabilities?
   3. **Performance** - Efficient algorithms and queries?
   4. **Maintainability** - Clear and well-structured?
   5. **Testing** - Adequate test coverage?

   ## Feedback Style
   - Be specific and actionable
   - Explain the "why" behind suggestions
   - Distinguish between blocking issues and suggestions
   - Acknowledge good patterns

   ## Categories
   - 🔴 **Blocking** - Must fix before merge
   - 🟡 **Suggestion** - Recommended improvement
   - 🟢 **Nitpick** - Optional style preference
   - 💡 **Question** - Needs clarification

   ## Example Feedback
   
   🔴 **Blocking**: SQL injection vulnerability
   ```javascript
   // Current (vulnerable)
   db.query(`SELECT * FROM users WHERE id = ${userId}`);
   
   // Suggested (safe)
   db.query('SELECT * FROM users WHERE id = ?', [userId]);
   ```
   
   🟡 **Suggestion**: Consider extracting to a helper function for reuse.
   EOF
   ```

4. Test personal skills in any project:
   ```bash
   cd ~/any-project
   copilot
   ```
   ```
   Review the changes in my last commit
   ```

**Expected Outcome:**
Personal skills are available in all projects.

### Exercise 4: Discover Skills from agentskills.io

> ⚠️ **FEEDBACK**: This exercise relies on the external URL `https://agentskills.io`. Verify that this URL is live and reachable before proceeding. If the site is unavailable, you can skip this exercise or create skills manually based on the examples in previous exercises.

**Goal:** Find and use community-created skills.

**Steps:**

1. Visit https://agentskills.io

2. Browse available skills by category:
   - Documentation
   - Testing
   - Security
   - DevOps
   - Data processing

3. Install a skill (example: security-review):
   ```bash
   # Download skill to project
   mkdir -p .github/skills/security-review
   curl -o .github/skills/security-review/SKILL.md \
     https://agentskills.io/skills/security-review/SKILL.md
   ```

4. Or install to personal skills:
   ```bash
   mkdir -p ~/.copilot/skills/security-review
   curl -o ~/.copilot/skills/security-review/SKILL.md \
     https://agentskills.io/skills/security-review/SKILL.md
   ```

5. Test the installed skill:
   ```bash
   copilot
   ```
   ```
   Review this code for security vulnerabilities
   ```

**Expected Outcome:**
Community skills enhance your Copilot capabilities.

### Exercise 5: Skill with Scripts

**Goal:** Create a skill that includes executable scripts.

**Steps:**

1. Create a deployment skill:
   ```bash
   mkdir -p .github/skills/deploy
   ```

2. Create the skill with script references:
   ```bash
   cat > .github/skills/deploy/SKILL.md << 'EOF'
   ---
   name: deploy
   description: Handles deployment tasks including build, test, and deploy to various environments. Use for deployment operations.
   ---

   # Deployment Assistant

   You manage deployments following this project's CI/CD pipeline.

   ## Environments
   - `development` - Auto-deploy on merge to develop
   - `staging` - Manual trigger, production-like
   - `production` - Manual trigger with approval

   ## Deployment Steps
   1. Run tests: `./scripts/test.sh`
   2. Build: `./scripts/build.sh`
   3. Deploy: `./scripts/deploy.sh <environment>`

   ## Scripts
   See `scripts/` directory for deployment scripts.

   ## Pre-deployment Checklist
   - [ ] All tests passing
   - [ ] No security vulnerabilities
   - [ ] Database migrations reviewed
   - [ ] Feature flags configured
   - [ ] Rollback plan documented

   ## Common Commands
   
   ### Deploy to staging
   ```bash
   ./scripts/deploy.sh staging
   ```

   ### Check deployment status
   ```bash
   ./scripts/status.sh <environment>
   ```
   EOF
   ```

3. Add helper scripts:
   ```bash
   mkdir -p .github/skills/deploy/scripts
   
   cat > .github/skills/deploy/scripts/deploy.sh << 'EOF'
   #!/bin/bash
   ENV=${1:-staging}
   echo "Deploying to $ENV..."
   # Add actual deployment logic
   EOF
   
   chmod +x .github/skills/deploy/scripts/deploy.sh
   ```

4. Test:
   ```bash
   copilot
   ```
   ```
   Deploy the current build to staging
   ```

**Expected Outcome:**
Skill provides deployment guidance and can reference scripts.

### Exercise 6: Skill Invocation

**Goal:** Understand how Copilot invokes skills.

**Steps:**

1. Create multiple skills in your project.

2. Start Copilot and observe skill selection:
   ```bash
   copilot
   ```

3. Ask a general question:
   ```
   Help me with the user authentication
   ```

4. Ask questions that match specific skills:
   ```
   Write tests for the payment service
   ```
   (Should trigger test-writer skill)

5. Ask about documentation:
   ```
   Document the REST API endpoints
   ```
   (Should trigger api-docs skill)

6. Use the `/skill` command (if available):
   ```
   /skill list
   ```

> ⚠️ **FEEDBACK**: The `/skill list` command may not exist in all versions. Check `copilot` then `/help` to verify available slash commands in your installation.

7. Explicitly invoke a skill:
   ```
   Using the test-writer skill, create tests for utils.ts
   ```

**Expected Outcome:**
Copilot selects appropriate skills based on your request.

## Skill Structure Reference

### Required Files

```
.github/skills/
└── skill-name/
    └── SKILL.md          # Required: Skill definition
```

### Optional Files

```
.github/skills/
└── skill-name/
    ├── SKILL.md          # Required
    ├── examples/         # Example code
    │   ├── example1.ts
    │   └── example2.py
    ├── templates/        # Code templates
    │   └── template.ts
    └── scripts/          # Helper scripts
        └── helper.sh
```

### SKILL.md Frontmatter

```yaml
---
name: skill-name          # Required: lowercase, hyphens, max 64 chars
description: What this skill does and when to use it  # Required: max 1024 chars
license: MIT              # Optional: License identifier
---
```

### Skill Locations

| Location | Scope | Priority |
|----------|-------|----------|
| `.github/skills/` | Project | Higher |
| `~/.copilot/skills/` | Personal | Lower |
| `~/.claude/skills/` | Personal (legacy) | Lower |

## Summary

- ✅ Skills are specialized capabilities that work across AI agents
- ✅ Progressive disclosure loads only relevant content
- ✅ Project skills in `.github/skills/`, personal in `~/.copilot/skills/`
- ✅ Include examples and templates for better output quality
- ✅ agentskills.io provides community-created skills
- ✅ Copilot auto-selects skills based on your request

## Next Steps

→ Continue to [Module 8: Plugins](08-plugins.md)

## References

- [Agent Skills - VS Code Docs](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [About Agent Skills - GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [agentskills.io](https://agentskills.io/)
