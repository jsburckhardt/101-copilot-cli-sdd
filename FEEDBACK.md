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

## Open Items

None - all identified issues have been addressed.

## Recent Changes

- ✅ Version bump: Workshop updated from v0.0.405 to v0.0.409
- ✅ Module 4: Added `/instructions` command section (v0.0.407 feature) with feedback callout
- ✅ Index: Added `/instructions` to slash commands quick reference table
- ✅ README: Expanded SDD acronym, added Dev Container guidance, reframed install options as alternatives
- ✅ Module 1: Added container/CI auth troubleshooting section and table row
- ✅ Module 2 Ex4: Specified filename (`hello.py`) in prompt to reduce randomness across participants
- ✅ Module 2 Ex5: Replaced "first 10 lines" prompt with explicit `cat` command to avoid Copilot confusion
- ✅ Module 2 Ex6: Fixed piped input prompt wording ("Explain what this file contains" vs "Explain this output")
- ✅ Module 2: Added comprehensive "Slash Commands" section covering all 30+ `/command` features, keyboard shortcuts, command categories, and 3 new exercises (`/plan`, `/review`, `/diff`, `/init`, `/rename`, `/tasks`, `/theme`, `/terminal-setup`, `/lsp`, `/user`). Module renamed to "Operating Modes & Commands" with updated duration (30 min).

## Summary

The workshop content provides a thorough deep dive into the GitHub Copilot CLI, covering installation, basic usage, configuration, and advanced customization via MCP, skills, agents, and hooks.

**Positive Aspects:**
1. **Structure:** Logical progression from basics to advanced topics.
2. **Practicality:** Hands-on exercises are well-designed.
3. **Advanced Features:** Coverage of MCP, custom agents, and hooks demonstrates powerful extensibility.
4. **Inline Warnings:** Version-specific features are now clearly marked with feedback callouts.
