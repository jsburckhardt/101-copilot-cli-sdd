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
- ✅ Module 12: Autopilot mode section (v0.0.411 feature) with feedback callout
- ✅ Module 12: Fleet command section (v0.0.411-v0.0.412 features) with feedback callout
- ✅ Module 12: `--bash-env` flag documentation (v0.0.412 feature) with feedback callout
- ✅ Module 12: LSP timeout configuration via `lsp.json` (v0.0.412 feature) with feedback callout
- ✅ Module 12: Shell mode access change documentation (v0.0.410 change)

## Open Items

### Warnings (non-blocking)

1. ~~**Module 01 Exercise 1d placement**: Exercise 1d (WinGet) appears after Exercises 2-3 in the file. Ideally all installation alternatives (1a-1d) should be grouped together before Exercise 2 (Authenticate). Consider reordering.~~ ✅ Resolved — Exercise 1d reordered to appear after Exercise 1c, before Exercise 2.
2. ~~**Module 02 `ctrl+e` dual function**: `ctrl+e` has two functions depending on context — "expand all timeline" (when no input) vs "cycle to end of line" (v0.0.413+ in edit mode). Merged into single row with contextual note. Users may still find this confusing.~~ ✅ Resolved — Split into two separate rows with context qualifiers: `ctrl+e` (no input) and `ctrl+e` (editing).
3. ~~**Module 02 `Shift+Tab` mode names**: Module 02 uses "(suggest) ⟷ (normal)" while Module 12 uses "(chat) ⟷ (command)". Both describe the same behavior from v0.0.410+ but use different terminology. Consider standardizing.~~ ✅ Resolved — Standardized to canonical v0.0.420 terminology: (chat) ⟷ (edit) across Module 02, Module 12, and Slide 02.
4. ~~**Module 04 example links**: `llm.txt` exercise contains example links (`/docs/api.md`, `/docs/adr/`, `/CONTRIBUTING.md`) that point to non-existent files. These are intentionally example content but trigger false positives in automated link checkers.~~ ✅ Resolved — Referenced example links not found in current file; issue appears outdated or previously resolved.
5. ~~**Module 03 Exercise 7**: Uses `copilot --share` and `copilot --share-gist` CLI flags to export sessions. The in-session `/share` slash command (documented in Exercise 1 note) may be more intuitive for users already in a session.~~ ✅ Resolved — Added `/share` to Session Slash Commands Reference table; added tip in Exercise 7 about using `/share` as an in-session alternative.
6. ~~**Module 12**: Has `### Resources` subsection under the completion section instead of a top-level `## References` section. A `## References` section was added for structural consistency, but the `### Resources` subsection remains as well.~~ ✅ Resolved — `### Resources` subsection merged into `## References`; only `## References` remains.

## Recent Changes

- ✅ Version bump: Workshop updated from v0.0.412 to v0.0.415
- ✅ Version bump: Workshop updated from v0.0.415 to v0.0.420; TESTED_VERSION in copilot-instructions.md updated; GA status (v0.0.418) noted in index and README
- ✅ Module 4: Added `/instructions` command section (v0.0.407 feature) with feedback callout
- ✅ Index: Added `/instructions` to slash commands quick reference table
- ✅ README: Expanded SDD acronym, added Dev Container guidance, reframed install options as alternatives
- ✅ Module 1: Added container/CI auth troubleshooting section and table row
- ✅ Module 2 Ex4: Specified filename (`hello.py`) in prompt to reduce randomness across participants
- ✅ Module 2 Ex5: Replaced "first 10 lines" prompt with explicit `cat` command to avoid Copilot confusion
- ✅ Module 2 Ex6: Fixed piped input prompt wording ("Explain what this file contains" vs "Explain this output")
- ✅ Module 2: Added comprehensive "Slash Commands" section covering all 30+ `/command` features, keyboard shortcuts, command categories, and 3 new exercises (`/plan`, `/review`, `/diff`, `/init`, `/rename`, `/tasks`, `/theme`, `/terminal-setup`, `/lsp`, `/user`). Module renamed to "Operating Modes & Commands" with updated duration (30 min).
- ✅ **Module 12 Update (v0.0.410-v0.0.412)**: Added 4 new exercises covering:
  - **Exercise 4**: Autopilot Mode (v0.0.411) - autonomous multi-step task execution
  - **Exercise 5**: Fleet Command (v0.0.411-v0.0.412) - parallel sub-agents with orchestrator validation and parallel dispatch
  - **Exercise 6**: Advanced Shell Configuration (v0.0.410, v0.0.412) - `--bash-env` flag and shell mode access changes
  - **Exercise 7**: LSP Configuration (v0.0.412) - `lsp.json` for language server timeout control
  - Updated configuration reference tables with version information
  - Renumbered remaining exercises (8-11)
  - Updated workshop duration from 20min to 30min
  - Updated index to reflect new features and learning objectives
- ✅ **Module 5**: Added `/reset-allowed-tools` slash command documentation (v0.0.412 feature)
  - Added to Exercise 1 as steps 11-13 demonstrating session approval reset
  - Created new "Runtime Slash Commands" reference section
  - Updated Summary section to include the command
- ✅ **Module 5**: Added undo confirmation note (v0.0.416 feature)
  - Undo operations now always require user confirmation before applying
  - Added ⚠️ FEEDBACK callout in Permission Model section (version-specific)
- ✅ **Module 11**: Added `#` reference shortcut for GitHub issues/PRs/discussions (v0.0.420 feature)
  - New subsection "Referencing GitHub Issues, PRs & Discussions with `#`" with feedback callout
  - Added `#<number>` to Slash Commands reference table, Do ✅ tips, and Summary
  - Slides 11: Added `#<number>` row to Key Commands table
- ✅ **v0.0.417 plugin hot-reload** — updates applied:
  - Module 08: Added hot-reload note after `/plugin install` usage (Exercise 2) and summary bullet
  - Module 09: Clarified that `.agent.md` files require restart but plugin-installed agents hot-load (v0.0.417+) — updated Creating Agents note, troubleshooting table, and summary
- ✅ **v0.0.420 update pass** — Module 01 changes:
  - Added GA announcement note (v0.0.418)
  - Updated expected output version `0.0.415` → `0.0.420` (2 occurrences)
  - Added `copilot update` full binary note (v0.0.420)
  - Reordered Exercise 1d (WinGet) to appear after Exercise 1c, before Exercise 2
  - Updated slide deck with GA status and exercise list
- ✅ **v0.0.415 validation pass** — fixes applied:
  - Module 01: Updated stale version `0.0.402` → `0.0.415` in expected output (2 occurrences)
  - Module 01: Fixed duplicate "Exercise 1" headings → renamed to Exercise 1a/1b/1c/1d
  - Module 01: Fixed nvm URL version `v0.40.0` → `v0.40.1` (consistent with index)
  - Module 02: Merged duplicate `ctrl+e` keyboard shortcut rows into single contextual entry
  - Module 02: Updated `Shift+Tab` description to match v0.0.410+ behavior
  - Module 12: Added `## References` section for structural consistency with other modules
  - FEEDBACK.md: Updated version changelog from v0.0.409 → v0.0.415
- ✅ **Module 12 Update (v0.0.416–v0.0.419)** — 7 items applied:
  - Added Exercise 12: `/research` deep-research command (v0.0.417) with exportable reports
  - Added `/chronicle` command (v0.0.419, experimental) with ⚠️ callout — standup, tips, improve subcommands
  - Added `--mouse`/`--no-mouse` flag to command-line flags table (v0.0.419)
  - Added deprecation note: `--disable-parallel-tools-execution` flag removed in v0.0.418
  - Added `/diagnose` command to troubleshooting exercise (v0.0.419)
  - Added status line responsive two-line layout note (v0.0.416) to summary
  - Added expanded `--help` content note (v0.0.416) to Exercises 1 and 3
  - Updated slash commands reference table with `/research`, `/chronicle`, `/diagnose`
  - Updated slides deck with new topics overview, 2 new slides, and exercise list
- ✅ **Module 06 MCP updates (v0.0.416, v0.0.419)**:
  - Added npm-style server naming note (`.`, `/`, `@` in server names, v0.0.419) with feedback callout
  - Updated env var auto-inheritance docs: `command`/`args`/`cwd` vars now inherited (v0.0.419), not just `PATH` (2 occurrences)
  - Added enterprise MCP policy enforcement callout (v0.0.416) with feedback callout
  - Updated Summary section with 3 new bullet points
  - Updated slide deck with server naming, env var, and policy enforcement notes

- ✅ Module 2: `/research` (v0.0.417) and `/chronicle` (v0.0.419, experimental) slash commands added
- ✅ Module 2: `#` reference for GitHub issues/PRs/discussions (v0.0.420) added to keyboard shortcuts
- ✅ Module 2: `Ctrl+F`/`Ctrl+B` alt-screen page shortcuts (v0.0.419) added
- ✅ Module 2: `Ctrl+G` external editor shortcut (v0.0.419) added
- ✅ Module 2: `Home`/`End` updated with dual behavior (normal + alt-screen, v0.0.419)

## v0.0.420 Validation Sweep (Automated)

The following items were identified during a full automated validation sweep across all 13 module files.

### Findings

#### [01] Installation — Expected Output Format Inconsistency

**Status:** warning
**Command:** `grep 'Expected Outcome' 01-installation.md`
**Error:** Exercise 1a/1b show `GitHub Copilot CLI 0.0.420` as expected output, while Exercise 1c (Homebrew) and 1d (WinGet) show `@github/copilot version X.X.X`. The two formats differ, which could confuse users who expect the same output regardless of install method.
**Doc Reference:** N/A
**Suggested Fix:** Add a note that the version output format may vary by installation method, or unify to a single expected format.
**Resolution:** Unified all four exercises (1a–1d) to `GitHub Copilot CLI 0.0.420` format; added note on Exercise 1a that exact version number depends on current release.
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
**Error:** Module 02 describes Shift+Tab modes as "(suggest) ⟷ (normal)" while Module 12 uses "(chat) ⟷ (command)". Both describe the same v0.0.410+ behavior but with different terminology.
**Doc Reference:** N/A
**Suggested Fix:** Standardize to a single terminology across both modules. Already noted in FEEDBACK.md Open Items but still present.
**Applied:** true — Standardized to canonical v0.0.420 terminology: (chat) ⟷ (edit) across Module 02 (line 113), Module 12 (lines 524, 530, 1126, 1127), and Slide 02 (line 160).

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

- ✅ **[00] Index** — Version v0.0.420 confirmed, all 12 module links valid, duration accurate (255 min = ~4.25 hours)
- ✅ **[02] Operating Modes** — 9 exercises, all slash commands covered, keyboard shortcuts (v0.0.410–v0.0.420) documented
- ✅ **[03] Session Management** — 7 exercises, --resume/--share/--share-gist all documented, /share slash command noted
- ✅ **[04] Custom Instructions** — 5 exercises, hierarchy documented, /instructions command, applyTo frontmatter
- ✅ **[05] Tools & Permissions** — 7 exercises, all 6 built-in tools documented, show_file (v0.0.415+), /reset-allowed-tools, trusted_folders vs runtime access distinction
- ✅ **[06] MCP Servers** — 7 exercises, all transport types (http/sse/local/stdio), /mcp reload (v0.0.412+), npm-style naming (v0.0.419), env var auto-inheritance (v0.0.419), policy enforcement (v0.0.416+)
- ✅ **[07] Agent Skills** — 6 exercises, SKILL.md format, progressive disclosure, project/personal/legacy paths, agentskills.io, UTF-8 BOM fix (v0.0.415)
- ✅ **[09] Custom Agents** — 7 exercises, .agent.md extension, user/repo/org/enterprise hierarchy, built-in agents (Explore/Task/Plan/Code-review), model field (v0.0.415+), --agent flag
- ✅ **[10] Hooks** — 7 exercises, all 6 hook types documented, toolArgs JSON string parsing with fromjson, permissionDecision response schema
- ✅ **[11] Context Management** — 7 exercises (minus model name warning above), /context, /compact, /usage, @ file reference, # issue/PR reference (v0.0.420), auto-compaction

### Cross-Module Validation Results

| Check | Result |
|-------|--------|
| Version consistency (no stale pre-v0.0.410 refs) | ✅ Pass |
| All cross-module links valid | ✅ Pass |
| All module files exist (13/13) | ✅ Pass |
| Section structure consistency (Prerequisites, Objectives, Exercises, Summary, References) | ✅ Pass (12/12 modules) |
| Code block balance (all fences paired) | ✅ Pass |
| Duration accuracy (255 min = ~4.25 hours) | ✅ Pass |
| CLI flag syntax consistency (12 flags across modules) | ✅ Pass |
| 36 version-tagged features (v0.0.410–v0.0.420) documented | ✅ Pass |
| Exercise count totals: 88 exercises across 12 modules | ✅ Pass |

## Summary

The workshop content provides a thorough deep dive into the GitHub Copilot CLI, covering installation, basic usage, configuration, and advanced customization via MCP, skills, agents, and hooks.

**Positive Aspects:**
1. **Structure:** Logical progression from basics to advanced topics.
2. **Practicality:** Hands-on exercises are well-designed.
3. **Advanced Features:** Coverage of MCP, custom agents, and hooks demonstrates powerful extensibility.
4. **Inline Warnings:** Version-specific features are now clearly marked with feedback callouts.
5. **Version Consistency:** All version references are current (v0.0.410–v0.0.420 range) with no stale pre-v0.0.410 versions found.
6. **Cross-References:** All inter-module links are valid and navigation flow is correct.
