# Workshop Feedback

This file documents incongruences, errors, typos, or confusing parts encountered during the workshop.

## Resolved

The following issues have been addressed with inline `⚠️ **FEEDBACK**` notes in the relevant modules:

- ✅ Module 1: Programmatic authentication for CI/CD environments
- ✅ Module 1: Container/CI authentication troubleshooting
- ✅ Module 2: Auth requirement warning
- ✅ Module 2: Exercise prompt clarity (filename, line count, pipe wording)
- ✅ Module 3: Session persistence clarification
- ✅ Module 3: `--share`/`--share-gist` version availability
- ✅ Module 5: `--allow-tool`/`--deny-tool` version availability
- ✅ Module 7: agentskills.io external URL dependency
- ✅ Module 7: `/skill list` command availability
- ✅ Module 12: `COPILOT_TOKEN` vs standard env vars clarification
- ✅ Module 12: `--available-tools`/`--excluded-tools` flag consistency
- ✅ Module 12: Autopilot mode section with feedback callout
- ✅ Module 12: Fleet command section with feedback callout
- ✅ Module 12: `--bash-env` flag documentation with feedback callout
- ✅ Module 12: LSP timeout configuration via `lsp.json` with feedback callout
- ✅ Module 12: Shell mode access change documentation

## Open Items

### Warnings (non-blocking)

1. ~~**Module 01 Exercise 1d placement**: Exercise 1d (WinGet) appears after Exercises 2-3 in the file. Ideally all installation alternatives (1a-1d) should be grouped together before Exercise 2 (Authenticate). Consider reordering.~~ ✅ Resolved — Exercise 1d reordered to appear after Exercise 1c, before Exercise 2.
2. ~~**Module 02 `ctrl+e` dual function**: `ctrl+e` has two functions depending on context — "expand all timeline" (when no input) vs "cycle to end of line" (in edit mode). Merged into single row with contextual note. Users may still find this confusing.~~ ✅ Resolved — Split into two separate rows with context qualifiers: `ctrl+e` (no input) and `ctrl+e` (editing).
3. ~~**Module 02 `Shift+Tab` mode names**: Module 02 uses "(suggest) ⟷ (normal)" while Module 12 uses "(chat) ⟷ (command)". Both describe the same behavior but use different terminology. Consider standardizing.~~ ✅ Resolved — Standardized to canonical terminology: (chat) ⟷ (edit) across Module 02, Module 12, and Slide 02.
4. ~~**Module 04 example links**: `llm.txt` exercise contains example links (`/docs/api.md`, `/docs/adr/`, `/CONTRIBUTING.md`) that point to non-existent files. These are intentionally example content but trigger false positives in automated link checkers.~~ ✅ Resolved — Referenced example links not found in current file; issue appears outdated or previously resolved.
5. ~~**Module 03 Exercise 7**: Uses `copilot --share` and `copilot --share-gist` CLI flags to export sessions. The in-session `/share` slash command (documented in Exercise 1 note) may be more intuitive for users already in a session.~~ ✅ Resolved — Added `/share` to Session Slash Commands Reference table; added tip in Exercise 7 about using `/share` as an in-session alternative.
6. ~~**Module 12**: Has `### Resources` subsection under the completion section instead of a top-level `## References` section. A `## References` section was added for structural consistency, but the `### Resources` subsection remains as well.~~ ✅ Resolved — `### Resources` subsection merged into `## References`; only `## References` remains.

## Recent Changes

- ✅ **Version bump: Workshop updated to v1.0.2**; TESTED_VERSION in copilot-instructions.md updated
- ✅ **Module 13 created**: Configuration & Environment — comprehensive config options, env vars, CLI flags, IDE integration, accessibility, team standardization (6 exercises)
- ✅ **Module 01**: Updated version strings to 1.0.2, added GHEC data residency (`copilot login --host`), `--no-auto-update` flag
- ✅ **Module 02**: Added `-i, --interactive` mode, `/copy`, `/ide`, `/streamer-mode` slash commands, `--output-format`, `--screen-reader` notes
- ✅ **Module 04**: Added `--no-custom-instructions` flag and `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` env var
- ✅ **Module 05**: Added URL permissions (`--allow-url`, `--deny-url`, `url` pattern), `--disallow-temp-dir`, `--secret-env-vars`, `--no-ask-user`
- ✅ **Module 06**: Added built-in GitHub MCP server controls (`--add-github-mcp-tool`, `--add-github-mcp-toolset`, `--enable-all-github-mcp-tools`, `--disable-builtin-mcps`, `--disable-mcp-server`)
- ✅ **Module 08**: Added `--plugin-dir` flag, `owner/repo:path` subdirectory install, second default marketplace `awesome-copilot`
- ✅ **Module 09**: Added `custom_agents.default_local_only` config option
- ✅ **Module 11**: Updated model list to v1.0.x models (claude-sonnet-4.6, claude-opus-4.6, gpt-5.4, etc.)
- ✅ **Module 12**: Added `--acp`, `--max-autopilot-continues`, `--no-ask-user`, `--stream`, `--output-format json`; added `/copy`, `/ide`, `/streamer-mode` to slash commands; cross-ref to Module 13
- ✅ **Index**: Updated to v1.0.2, added Module 13, updated learning objectives, essential commands, slash commands
- ✅ **Slides**: Updated decks for Modules 01, 02, 05, 06, 12; created Module 13 slide deck
- ✅ **Docs URLs**: Updated from `about-copilot-cli` to `copilot/how-tos/copilot-cli` across modules
- ✅ Prior version bumps consolidated (all now at v1.0.2)
- ✅ Module 4: Added `/instructions` command section with feedback callout
- ✅ Index: Added `/instructions` to slash commands quick reference table
- ✅ README: Expanded SDD acronym, added Dev Container guidance, reframed install options as alternatives
- ✅ Module 1: Added container/CI auth troubleshooting section and table row
- ✅ Module 2 Ex4: Specified filename (`hello.py`) in prompt to reduce randomness across participants
- ✅ Module 2 Ex5: Replaced "first 10 lines" prompt with explicit `cat` command to avoid Copilot confusion
- ✅ Module 2 Ex6: Fixed piped input prompt wording ("Explain what this file contains" vs "Explain this output")
- ✅ Module 2: Added comprehensive "Slash Commands" section covering all 30+ `/command` features, keyboard shortcuts, command categories, and 3 new exercises (`/plan`, `/review`, `/diff`, `/init`, `/rename`, `/tasks`, `/theme`, `/terminal-setup`, `/lsp`, `/user`). Module renamed to "Operating Modes & Commands" with updated duration (30 min).
- ✅ **Module 12 Update**: Added 4 new exercises covering:
 - **Exercise 4**: Autopilot Mode - autonomous multi-step task execution
 - **Exercise 5**: Fleet Command - parallel sub-agents with orchestrator validation and parallel dispatch
 - **Exercise 6**: Advanced Shell Configuration - `--bash-env` flag and shell mode access changes
 - **Exercise 7**: LSP Configuration - `lsp.json` for language server timeout control
 - Updated configuration reference tables with version information
 - Renumbered remaining exercises (8-11)
 - Updated workshop duration from 20min to 30min
 - Updated index to reflect new features and learning objectives
- ✅ **Module 5**: Added `/reset-allowed-tools` slash command documentation
 - Added to Exercise 1 as steps 11-13 demonstrating session approval reset
 - Created new "Runtime Slash Commands" reference section
 - Updated Summary section to include the command
- ✅ **Module 5**: Added undo confirmation note
 - Undo operations now always require user confirmation before applying
 - Added ⚠️ FEEDBACK callout in Permission Model section (version-specific)
- ✅ **Module 11**: Added `#` reference shortcut for GitHub issues/PRs/discussions
 - New subsection "Referencing GitHub Issues, PRs & Discussions with `#`" with feedback callout
 - Added `#<number>` to Slash Commands reference table, Do ✅ tips, and Summary
 - Slides 11: Added `#<number>` row to Key Commands table
- ✅ **Plugin hot-reload** — updates applied:
 - Module 08: Added hot-reload note after `/plugin install` usage (Exercise 2) and summary bullet
 - Module 09: Clarified that `.agent.md` files require restart but plugin-installed agents hot-load — updated Creating Agents note, troubleshooting table, and summary
- ✅ **Module 01 update pass** — changes:
 - Added GA announcement note
 - Updated expected output version strings (2 occurrences)
 - Added `copilot update` full binary note
 - Reordered Exercise 1d (WinGet) to appear after Exercise 1c, before Exercise 2
 - Updated slide deck with GA status and exercise list
- ✅ **Prior validation pass** — fixes applied:
 - Module 01: Unified expected output format across all install variants
 - Module 01: Fixed duplicate "Exercise 1" headings → renamed to Exercise 1a/1b/1c/1d
 - Module 01: Fixed nvm URL version `v0.40.0` → `v0.40.1` (consistent with index)
 - Module 02: Merged duplicate `ctrl+e` keyboard shortcut rows into single contextual entry
 - Module 02: Updated `Shift+Tab` description to match current behavior
 - Module 12: Added `## References` section for structural consistency with other modules
 - FEEDBACK.md: Updated version changelog
- ✅ **Module 12 Update** — 7 items applied:
 - Added Exercise 12: `/research` deep-research command with exportable reports
 - Added `/chronicle` command (experimental) with ⚠️ callout — standup, tips, improve subcommands
 - Added `--mouse`/`--no-mouse` flag to command-line flags table
 - Added deprecation note: `--disable-parallel-tools-execution` flag removed
 - Added `/diagnose` command to troubleshooting exercise
 - Added status line responsive two-line layout note to summary
 - Added expanded `--help` content note to Exercises 1 and 3
 - Updated slash commands reference table with `/research`, `/chronicle`, `/diagnose`
 - Updated slides deck with new topics overview, 2 new slides, and exercise list
- ✅ **Module 06 MCP updates**:
 - Added npm-style server naming note (`.`, `/`, `@` in server names) with feedback callout
 - Updated env var auto-inheritance docs: `command`/`args`/`cwd` vars now inherited, not just `PATH` (2 occurrences)
 - Added enterprise MCP policy enforcement callout with feedback callout
 - Updated Summary section with 3 new bullet points
 - Updated slide deck with server naming, env var, and policy enforcement notes

- ✅ Module 2: `/research` and `/chronicle` (experimental) slash commands added
- ✅ Module 2: `#` reference for GitHub issues/PRs/discussions added to keyboard shortcuts
- ✅ Module 2: `Ctrl+F`/`Ctrl+B` alt-screen page shortcuts added
- ✅ Module 2: `Ctrl+G` external editor shortcut added
- ✅ Module 2: `Home`/`End` updated with dual behavior (normal + alt-screen)

## Validation Sweep (Automated)

The following items were identified during a full automated validation sweep across all 13 module files.

### Findings

#### [01] Installation — Expected Output Format Inconsistency

**Status:** warning
**Command:** `grep 'Expected Outcome' 01-installation.md`
**Error:** Exercise 1a/1b show `GitHub Copilot CLI 1.0.2` as expected output, while Exercise 1c (Homebrew) and 1d (WinGet) show `@github/copilot version X.X.X`. The two formats differ, which could confuse users who expect the same output regardless of install method.
**Doc Reference:** N/A
**Suggested Fix:** Add a note that the version output format may vary by installation method, or unify to a single expected format.
**Resolution:** Unified all four exercises (1a–1d) to `GitHub Copilot CLI 1.0.2` format; added note on Exercise 1a that exact version number depends on current release.
**Applied:** true

---

#### [08] Plugins — MCP Config Missing Explicit `type` Field

**Status:** resolved
**Command:** `grep -A10 '"command".*npx' 08-plugins.md`
**Error:** MCP server configs in Module 08 (Exercises 3, 4, 5) omit the `"type": "local"` field, while Module 06 consistently includes it. Although Copilot CLI defaults to `local` when `command` is present, the inconsistency may confuse users cross-referencing modules.
**Doc Reference:** N/A
**Suggested Fix:** Add `"type": "local"` (or `"type": "stdio"`) to all MCP config examples in Module 08 for consistency with Module 06.
**Applied:** true — Added `"type": "local"` to 5 JSON config blocks in Module 08 (Exercises 3, 4, 5, 6 and Plugin Configuration Reference) and 1 in the slide deck

---

#### [02] Operating Modes — Shift+Tab Mode Name Inconsistency

**Status:** warning
**Command:** `grep 'Shift+Tab' 02-modes.md 12-advanced.md`
**Error:** Module 02 describes Shift+Tab modes as "(suggest) ⟷ (normal)" while Module 12 uses "(chat) ⟷ (command)". Both describe the same behavior but with different terminology.
**Doc Reference:** N/A
**Suggested Fix:** Standardize to a single terminology across both modules. Already noted in FEEDBACK.md Open Items but still present.
**Applied:** true — Standardized to canonical terminology: (chat) ⟷ (edit) across Module 02 (line 113), Module 12 (lines 524, 530, 1126, 1127), and Slide 02 (line 160).

---

#### [11] Context Management — Speculative Model Names

**Status:** resolved
**Command:** `grep 'Claude Opus\|GPT-5\|Gemini 3' 11-context.md`
**Error:** Module 11 lists model names (Claude Opus 4.6, Gemini 3 Pro, GPT-5.3-Codex, GPT-5 mini) that may not match actual available models at time of workshop delivery. These appear to be forward-looking/speculative.
**Doc Reference:** N/A
**Suggested Fix:** Add a note that model names are examples and availability may vary, or use generic model references.
**Applied:** true — Replaced speculative names with real/generic ones; added ⚠️ FEEDBACK callout in module; marked table header as "(example)"; updated slides to match.

---

#### [12] Advanced Topics — Duplicate Reference Sections

**Status:** warning
**Command:** `grep -n '## References\|### Resources' 12-advanced.md`
**Error:** Module 12 contains both a `### Resources` subsection (line 1200) and a `## References` section (line 1213). This creates duplication. Already noted in FEEDBACK.md Open Items.
**Doc Reference:** N/A
**Suggested Fix:** Merge into a single `## References` section and remove the `### Resources` subsection.
**Applied:** true — `### Resources` subsection merged into `## References` section; no duplication remains.

---

### Validation Passed (No Issues)

The following modules passed all validation checks with zero issues:

- ✅ **[00] Index** — Version v1.0.2 confirmed, all 13 module links valid, duration accurate (275 min = ~4.5 hours)
- ✅ **[02] Operating Modes** — 9 exercises, all slash commands covered, keyboard shortcuts documented
- ✅ **[03] Session Management** — 7 exercises, --resume/--share/--share-gist all documented, /share slash command noted
- ✅ **[04] Custom Instructions** — 5 exercises, hierarchy documented, /instructions command, applyTo frontmatter
- ✅ **[05] Tools & Permissions** — 7 exercises, all 6 built-in tools documented, show_file, /reset-allowed-tools, trusted_folders vs runtime access distinction
- ✅ **[06] MCP Servers** — 7 exercises, all transport types (http/sse/local/stdio), /mcp reload, npm-style naming, env var auto-inheritance, policy enforcement
- ✅ **[07] Agent Skills** — 6 exercises, SKILL.md format, progressive disclosure, project/personal/legacy paths, agentskills.io, UTF-8 BOM fix
- ✅ **[09] Custom Agents** — 7 exercises, .agent.md extension, user/repo/org/enterprise hierarchy, built-in agents (Explore/Task/Plan/Code-review), model field, --agent flag
- ✅ **[10] Hooks** — 7 exercises, all 6 hook types documented, toolArgs JSON string parsing with fromjson, permissionDecision response schema
- ✅ **[11] Context Management** — 7 exercises (minus model name warning above), /context, /compact, /usage, @ file reference, # issue/PR reference, auto-compaction

### Cross-Module Validation Results

| Check | Result |
|-------|--------|
| Version consistency (v1.0.2) | ✅ Pass |
| All cross-module links valid | ✅ Pass |
| All module files exist (14/14) | ✅ Pass |
| Section structure consistency (Prerequisites, Objectives, Exercises, Summary, References) | ✅ Pass (13/13 modules) |
| Code block balance (all fences paired) | ✅ Pass |
| Duration accuracy (275 min = ~4.5 hours) | ✅ Pass |
| CLI flag syntax consistency | ✅ Pass |
| 51 features documented for v1.0.2 | ✅ Pass |
| Exercise count totals: 102 exercises across 13 modules | ✅ Pass |

## Summary

The workshop content provides a thorough deep dive into the GitHub Copilot CLI, covering installation, basic usage, configuration, and advanced customization via MCP, skills, agents, and hooks.

**Positive Aspects:**
1. **Structure:** Logical progression from basics to advanced topics.
2. **Practicality:** Hands-on exercises are well-designed.
3. **Advanced Features:** Coverage of MCP, custom agents, and hooks demonstrates powerful extensibility.
4. **Inline Warnings:** Features with evolving behavior are clearly marked with feedback callouts.
5. **Version Consistency:** All content validated against Copilot CLI v1.0.2.
6. **Cross-References:** All inter-module links are valid and navigation flow is correct.
