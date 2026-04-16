---
description: "Conventions for creating and editing Docusaurus documentation pages in the Copilot CLI Workshop site"
applyTo: 'docs/docusaurus/**'
---

# Docusaurus Content Instructions

These instructions apply automatically when editing any file under `docs/docusaurus/`. Follow them to maintain consistency across the documentation site.

## Frontmatter

Every documentation page requires these frontmatter fields:

* `title`: Page title displayed in the browser tab and sidebar
* `description`: One-sentence summary for SEO and social sharing
* `sidebar_position`: Integer controlling page order within its category (1, 2, 3...)

Optional fields:

* `sidebar_label`: Override the sidebar display text when it should differ from `title`
* `keywords`: Array of terms for search indexing

```yaml
---
title: Installation
description: Install the GitHub Copilot CLI via npm, Homebrew, or install script
sidebar_position: 1
keywords: [copilot, cli, installation, setup]
---
```

## Admonitions

Use Docusaurus triple-colon syntax for callout boxes. Do not use GitHub-flavored `> [!NOTE]` alerts.

```markdown
:::note
Useful information that users should know, even when skimming.
:::

:::tip
Helpful advice for doing things better or more easily.
:::

:::warning
Important information that could prevent problems.
:::

:::danger
Critical information about potential data loss or security issues.
:::
```

## Internal Links

Link between documentation pages using relative paths without the `.md` extension:

```markdown
See [Installation](/docs/getting-started/installation) for setup details.
```

Do not use `.md` extensions in links. Do not use `<https://url>` angle-bracket URLs (MDX treats them as JSX and breaks the build).

## Mermaid Diagrams

Use fenced code blocks with the `mermaid` language identifier:

````markdown
```mermaid
flowchart LR
    A["Step 1"] --> B["Step 2"]
```
````

Verify diagrams render in both light and dark themes.

## Code Blocks

Always specify a language identifier for syntax highlighting. Use `text` when no highlighting is needed:

````markdown
```bash
copilot --version
```

```text
Plain text output with no highlighting
```
````

## List Markers

Use `*` for unordered lists. Do not use `-` or `+`:

```markdown
* First item
* Second item
* Third item
```

## Page Length and Structure

Aim for 5-10 minute read time per page. When a page exceeds 10 minutes, split into multiple pages or use progressive disclosure with `<details>` blocks.

Each paragraph communicates one core idea. Every major concept (H2 heading) should have a diagram, table, code example, or concrete scenario alongside prose.

## Progressive Disclosure

For advanced or detailed content, use `<details>` blocks:

```markdown
<details>
<summary>Advanced: Full command reference</summary>

Detailed reference content here...

</details>
```

## Headings

Do not use H1 (`#`) in content files. Docusaurus renders the title from YAML frontmatter. Start content headings at H2 (`##`). Limit depth to H3 (`###`) to keep the right-side TOC readable.

## Writing Style

* Address the reader as "you"
* Use "we" when speaking for the project
* Do not use em dashes
* Lead with "why this matters" before "how to do it"
* Ground abstract concepts in concrete examples

## Category Structure

Each sidebar category is a directory containing a `_category_.json` file. The current hierarchy:

1. Getting Started (collapsed: false)
2. Customization
3. Extensibility
4. Advanced
5. Reference

Do not create new top-level categories without discussion. Add pages to existing categories using sequential `sidebar_position` values.

## Images

Place images in `docs/docusaurus/static/img/` and reference with absolute paths:

```markdown
![Description](/img/example.png)
```
