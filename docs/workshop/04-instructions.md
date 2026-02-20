# Module 4: Custom Instructions

## Prerequisites

- Completed Modules 1-3
- Understanding of Markdown format
- A Git repository to experiment with

## Learning Objectives

- Create repository-wide instructions with `copilot-instructions.md`
- Write effective `AGENTS.md` files for agent behavior
- Understand `llm.txt` and its purpose
- Use path-specific instructions for different file types
- Implement commit conventions in agent instructions

## Concepts

### Instruction Hierarchy

Copilot CLI reads instructions from multiple sources with this priority:

```text
1. Prompt (highest) - What you type
2. AGENTS.md - Nearest in directory tree
3. .github/copilot-instructions.md - Repository-wide
4. .github/instructions/*.instructions.md - Path-specific
5. Personal instructions - ~/.copilot/instructions.md
6. Default behavior (lowest)
```text

### File Purposes

| File | Scope | Purpose |
| --- | --- | --- |
| `AGENTS.md` | Directory tree | Agent persona and behavior |
| `copilot-instructions.md` | Repository | Coding standards and conventions |
| `*.instructions.md` | File patterns | Language/path-specific rules |
| `llm.txt` | Website/project | LLM-optimized project documentation |

### The `/instructions` Command

Use `/instructions` inside an interactive session to view and toggle which custom instruction files are active:

```text
/instructions
```text

This displays all discovered instruction files (AGENTS.md, copilot-instructions.md, `*.instructions.md`, personal instructions) with their status. You can enable or disable individual files without deleting them — useful for debugging which instructions are affecting behavior.

| Action | Example |
| --- | --- |
| List all instruction files | `/instructions` |
| Toggle a file on/off | Select from the displayed list |

This is especially helpful when multiple instruction files interact and you need to isolate which one is causing unexpected behavior.

## Hands-On Exercises

### Exercise 1: Create Repository Instructions

**Goal:** Set up repository-wide coding standards.

**Steps:**

1. Create the `.github` directory:
   ```bash
   mkdir -p .github
   ```text

2. Create `copilot-instructions.md`:
   ```bash
   cat > .github/copilot-instructions.md << 'EOF'
   # Copilot Instructions for This Project

   ## Code Style
   - Use 2 spaces for indentation
   - Prefer `const` over `let` in JavaScript/TypeScript
   - Use descriptive variable names (no single letters except loop indices)
   - Add JSDoc comments for all public functions

   ## Architecture
   - Follow MVC pattern for backend code
   - Use React functional components with hooks
   - Keep components under 200 lines

   ## Testing
   - Write unit tests for all utility functions
   - Use Jest for JavaScript testing
   - Aim for 80% code coverage

   ## Dependencies
   - Prefer native Node.js APIs over npm packages when possible
   - Document any new dependencies in PR descriptions

   ## Security
   - Never hardcode secrets or API keys
   - Validate all user input
   - Use parameterized queries for database operations
   EOF
   ```text

3. Start Copilot and test:
   ```bash
   copilot
   ```text
   ```text
   Create a JavaScript function that fetches user data from an API
   ```text

4. Observe how Copilot follows your coding standards.

**Expected Outcome:**
Generated code follows your specified style (2-space indent, const usage, JSDoc comments).

### Exercise 2: Create an AGENTS.md File

**Goal:** Define agent behavior with a persona and clear boundaries.

**Steps:**

1. Create `AGENTS.md` in your project root:
   ```bash
   cat > AGENTS.md << 'EOF'
   # Agent Instructions

   You are a senior software engineer specializing in full-stack TypeScript development.

   ## Your Role
   - Write clean, maintainable, well-documented code
   - Follow SOLID principles
   - Prioritize readability over cleverness
   - Consider edge cases and error handling

   ## Project Context
   - This is a Node.js/Express backend with React frontend
   - Database: PostgreSQL with Prisma ORM
   - Authentication: JWT tokens
   - API style: RESTful with OpenAPI documentation

   ## Commit Conventions
   All commits must follow Conventional Commits v1.0.0:

   Format: `<type>(<scope>): <description>`

   Types:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation only
   - `style`: Formatting, no code change
   - `refactor`: Code change that neither fixes nor adds
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks

   Examples:
   - `feat(auth): add password reset endpoint`
   - `fix(api): handle null user in profile route`
   - `docs(readme): update installation steps`

   ## Boundaries - DO NOT
   - Never modify database migration files without explicit permission
   - Never commit directly to main branch
   - Never remove tests, even if they're failing
   - Never hardcode environment-specific values
   - Never expose internal errors to API responses

   ## File Structure
   ```text
   src/
   ├── controllers/  # Request handlers
   ├── services/     # Business logic
   ├── models/       # Database models
   ├── middleware/   # Express middleware
   ├── utils/        # Helper functions
   └── routes/       # Route definitions
   ```text

   ## Preferred Patterns

   ### Error Handling
   ```typescript
   try {
     const result = await service.doSomething();
     return res.json(result);
   } catch (error) {
     logger.error('Operation failed', { error });
     return res.status(500).json({ error: 'Internal server error' });
   }
   ```text

   ### Service Pattern
   ```typescript
   export class UserService {
     constructor(private readonly db: Database) {}

     async findById(id: string): Promise<User | null> {
       return this.db.user.findUnique({ where: { id } });
     }
   }
   ```text
   EOF
   ```text

2. Test the agent behavior:
   ```bash
   copilot
   ```text
   ```text
   Create a new endpoint for updating user preferences
   ```text

3. Verify it follows your patterns and conventions.

4. Test commit message generation:
   ```text
   I added a new login feature. What commit message should I use?
   ```text

**Expected Outcome:**
Copilot acts as a senior TypeScript engineer and suggests conventional commits.

### Exercise 3: Path-Specific Instructions

**Goal:** Apply different rules to different file types.

**Steps:**

1. Create instructions directory:
   ```bash
   mkdir -p .github/instructions
   ```text

2. Create TypeScript-specific instructions:
   ```bash
   cat > .github/instructions/typescript.instructions.md << 'EOF'
   ---
   applyTo: "**/*.ts,**/*.tsx"
   ---

   # TypeScript Instructions

   - Use strict TypeScript (`"strict": true` in tsconfig)
   - Prefer interfaces over types for object shapes
   - Use enums for fixed sets of values
   - Avoid `any` type - use `unknown` if type is truly unknown
   - Export types from dedicated `.types.ts` files
   - Use barrel exports (index.ts) for public APIs
   EOF
   ```text

3. Create test-specific instructions:
   ```bash
   cat > .github/instructions/tests.instructions.md << 'EOF'
   ---
   applyTo: "**/*.test.ts,**/*.spec.ts,**/tests/**"
   ---

   # Test File Instructions

   - Use descriptive test names: `it('should return 404 when user not found')`
   - Follow AAA pattern: Arrange, Act, Assert
   - One assertion concept per test
   - Use factories for test data, not fixtures
   - Mock external dependencies, not internal modules
   - Test edge cases: null, undefined, empty arrays, boundary values
   EOF
   ```text

4. Create documentation instructions:
   ```bash
   cat > .github/instructions/docs.instructions.md << 'EOF'
   ---
   applyTo: "**/*.md,**/docs/**"
   ---

   # Documentation Instructions

   - Use ATX-style headers (# not underlines)
   - Include code examples for all features
   - Keep line length under 100 characters
   - Use reference-style links for repeated URLs
   - Include a table of contents for files > 200 lines
   EOF
   ```text

5. Test with different file types:
   ```bash
   copilot
   ```text
   ```text
   Create a test file for a UserService class
   ```text

   Then:
   ```text
   Create documentation for the API endpoints
   ```text

**Expected Outcome:**
Different instructions apply based on file type.

### Exercise 4: Create llm.txt

**Goal:** Provide LLM-optimized project documentation.

**Steps:**

1. Create `llm.txt` in your project root:
   ```bash
   cat > llm.txt << 'EOF'
   # Project: My Awesome App

   > A full-stack application for managing tasks with team collaboration features.

   ## Quick Facts
   - Language: TypeScript
   - Frontend: React 18 + Vite
   - Backend: Node.js + Express
   - Database: PostgreSQL + Prisma
   - Auth: JWT + refresh tokens

   ## Key Files
   - `/src/server/index.ts` - Express app entry point
   - `/src/client/App.tsx` - React app root
   - `/prisma/schema.prisma` - Database schema
   - `/src/server/routes/` - API endpoints

   ## Common Tasks

   ### Add a new API endpoint
   1. Create route in `/src/server/routes/`
   2. Create service in `/src/server/services/`
   3. Add to router in `/src/server/index.ts`
   4. Write tests in `/tests/routes/`

   ### Add a new React component
   1. Create in `/src/client/components/`
   2. Export from `/src/client/components/index.ts`
   3. Add Storybook story in same directory

   ## API Conventions
   - All endpoints prefixed with `/api/v1`
   - Use plural nouns: `/users`, `/tasks`
   - Standard responses: `{ data, error, meta }`

   ## Environment Variables
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - Token signing secret
   - `PORT` - Server port (default: 3000)

   ## Links
   - [API Documentation](/docs/api.md)
   - [Architecture Decision Records](/docs/adr/)
   - [Contributing Guide](/CONTRIBUTING.md)
   EOF
   ```text

2. Test how Copilot uses this context:
   ```bash
   copilot
   ```text
   ```text
   How do I add a new API endpoint to this project?
   ```text

**Expected Outcome:**
Copilot references `llm.txt` to provide accurate project-specific guidance.

### Exercise 5: Nested AGENTS.md for Subdirectories

**Goal:** Use different agent behaviors in different parts of the codebase.

**Steps:**

1. Create a subdirectory with its own instructions:
   ```bash
   mkdir -p src/database
   ```text

2. Create a specialized AGENTS.md:
   ```bash
   cat > src/database/AGENTS.md << 'EOF'
   # Database Agent Instructions

   You are a database specialist focusing on PostgreSQL and Prisma.

   ## Your Expertise
   - Database schema design
   - Query optimization
   - Migration safety
   - Data integrity

   ## Rules
   - Always include indexes for foreign keys
   - Use transactions for multi-table operations
   - Add `createdAt` and `updatedAt` to all tables
   - Use soft deletes (`deletedAt`) for user data

   ## Migration Safety
   Before creating migrations:
   1. Check for data that would be affected
   2. Consider backward compatibility
   3. Plan rollback strategy

   ## DO NOT
   - Drop columns in production without data backup
   - Use `CASCADE` deletes without explicit approval
   - Create migrations that lock tables for extended periods
   EOF
   ```text

3. Test from different directories:
   ```bash
   cd src/database
   copilot
   ```text
   ```text
   Create a migration to add a comments table
   ```text

4. Compare with root directory behavior:
   ```bash
   cd ../..
   copilot
   ```text
   ```text
   Create a migration to add a comments table
   ```text

**Expected Outcome:**
The database directory uses specialized database agent behavior.

### Exercise 6: Commit Convention Enforcement

**Goal:** Ensure Copilot suggests proper commit messages.

**Steps:**

1. Ensure AGENTS.md has commit conventions (from Exercise 2).

2. Make some changes:
   ```bash
   echo "console.log('hello');" > feature.js
   git add feature.js
   ```text

3. Ask Copilot for commit message:
   ```bash
   copilot
   ```text
   ```text
   I've added a new JavaScript file. Suggest a commit message.
   ```text

4. Copilot should suggest conventional format:
   ```text
   feat: add feature.js with hello world logging
   ```text

5. Test with a bug fix scenario:
   ```text
   I fixed a null pointer exception in the user service. Commit message?
   ```text

   Expected:
   ```text
   fix(user): handle null pointer in user service
   ```text

**Expected Outcome:**
Commit messages follow Conventional Commits format.

## Best Practices

### AGENTS.md Writing Tips

1. **Be specific about persona:**
   ```markdown
   ❌ "You are a helpful assistant"
   ✅ "You are a senior React developer with 10 years of experience"
   ```text

2. **Include explicit boundaries:**
   ```markdown
   ## DO NOT
   - Never modify package-lock.json directly
   - Never remove error handling
   ```text

3. **Provide code examples:**
   ```markdown
   ## Preferred Error Pattern
   ```typescript
   throw new AppError('User not found', 404);
   ```text
   ```text

4. **Document file structure:**
   ```markdown
   ## Project Structure
   - `/src` - Source code
   - `/tests` - Test files
   ```text

## Summary

- ✅ `copilot-instructions.md` sets repository-wide standards
- ✅ `AGENTS.md` defines agent persona and boundaries
- ✅ Path-specific instructions target file types with `applyTo`
- ✅ `llm.txt` provides LLM-optimized project context
- ✅ Nested AGENTS.md files enable directory-specific behavior
- ✅ Commit conventions should be explicitly documented

## Next Steps

→ Continue to [Module 5: Tools & Permissions](05-tools.md)

## References

- [Custom Instructions - GitHub Docs](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [How to Write Great AGENTS.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [llms.txt Specification](https://github.com/AnswerDotAI/llms-txt)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
