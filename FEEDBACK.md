# Workshop Feedback

This file documents incongruences, errors, typos, or confusing parts encountered during the workshop.

## Resolved

The following issues have been addressed with inline `⚠️ **FEEDBACK**` notes in the relevant modules:

- ✅ Module 1: Programmatic authentication for CI/CD environments
- ✅ Module 1: Container/CI authentication troubleshooting
- ✅ Module 2: Auth requirement warning
- ✅ Module 2: Exercise prompt clarity (filename, line count, pipe wording)
- ✅ Module 11: Session persistence clarification
- ✅ Module 11: `--share`/`--share-gist` version availability
- ✅ Module 4: `--allow-tool`/`--deny-tool` version availability
- ✅ Module 6: agentskills.io external URL dependency
- ✅ Module 6: `/skill list` command availability
- ✅ Module 12: `COPILOT_TOKEN` vs standard env vars clarification
- ✅ Module 12: `--available-tools`/`--excluded-tools` flag consistency
- ✅ Module 12: Autopilot mode section (v0.0.411 feature) with feedback callout
- ✅ Module 12: Fleet command section (v0.0.411-v0.0.412 features) with feedback callout
- ✅ Module 12: `--bash-env` flag documentation (v0.0.412 feature) with feedback callout
- ✅ Module 12: LSP timeout configuration via `lsp.json` (v0.0.412 feature) with feedback callout
- ✅ Module 12: Shell mode access change documentation (v0.0.410 change)

## Open Items

### Warnings (non-blocking)

1. **Module 01 Exercise 1d placement**: Exercise 1d (WinGet) appears after Exercises 2-3 in the file. Ideally all installation alternatives (1a-1d) should be grouped together before Exercise 2 (Authenticate). Consider reordering.
2. **Module 02 `ctrl+e` dual function**: `ctrl+e` has two functions depending on context — "expand all timeline" (when no input) vs "cycle to end of line" (v0.0.413+ in edit mode). Merged into single row with contextual note. Users may still find this confusing.
3. **Module 02 `Shift+Tab` mode names**: Module 02 uses "(suggest) ⟷ (normal)" while Module 12 uses "(chat) ⟷ (command)". Both describe the same behavior from v0.0.410+ but use different terminology. Consider standardizing.
4. **Module 03 example links**: `llm.txt` exercise contains example links (`/docs/api.md`, `/docs/adr/`, `/CONTRIBUTING.md`) that point to non-existent files. These are intentionally example content but trigger false positives in automated link checkers.
5. **Module 11 Exercise 7**: Uses `copilot --share` and `copilot --share-gist` CLI flags to export sessions. The in-session `/share` slash command (documented in Exercise 1 note) may be more intuitive for users already in a session.
6. **Module 12**: Has `### Resources` subsection under the completion section instead of a top-level `## References` section. A `## References` section was added for structural consistency, but the `### Resources` subsection remains as well.

## Recent Changes

- ✅ Version bump: Workshop updated from v0.0.412 to v0.0.415
- ✅ Module 3: Added `/instructions` command section (v0.0.407 feature) with feedback callout
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
- ✅ **Module 4**: Added `/reset-allowed-tools` slash command documentation (v0.0.412 feature)
  - Added to Exercise 1 as steps 11-13 demonstrating session approval reset
  - Created new "Runtime Slash Commands" reference section
  - Updated Summary section to include the command
- ✅ **v0.0.415 validation pass** — fixes applied:
  - Module 01: Updated stale version `0.0.402` → `0.0.415` in expected output (2 occurrences)
  - Module 01: Fixed duplicate "Exercise 1" headings → renamed to Exercise 1a/1b/1c/1d
  - Module 01: Fixed nvm URL version `v0.40.0` → `v0.40.1` (consistent with index)
  - Module 02: Merged duplicate `ctrl+e` keyboard shortcut rows into single contextual entry
  - Module 02: Updated `Shift+Tab` description to match v0.0.410+ behavior
  - Module 12: Added `## References` section for structural consistency with other modules
  - FEEDBACK.md: Updated version changelog from v0.0.409 → v0.0.415

## Summary

The workshop content provides a thorough deep dive into the GitHub Copilot CLI, covering installation, basic usage, configuration, and advanced customization via MCP, skills, agents, and hooks.

**Positive Aspects:**
1. **Structure:** Logical progression from basics to advanced topics.
2. **Practicality:** Hands-on exercises are well-designed.
3. **Advanced Features:** Coverage of MCP, custom agents, and hooks demonstrates powerful extensibility.
4. **Inline Warnings:** Version-specific features are now clearly marked with feedback callouts.
