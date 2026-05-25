# Platform Compatibility

This repository uses a conservative layout that can be adapted by multiple agent platforms.

## Common Skill Shape

Each skill has:

- `SKILL.md` for agent-facing instructions
- `skill.json` for platform and index metadata
- `README.md` for human-facing docs
- `i18n/` for localized display copy

This keeps the agent instructions stable while allowing websites, registries, and marketplace-like tools to show localized descriptions.

## Claude-Style Skills

Claude-style skills usually rely on a `SKILL.md` file with YAML frontmatter:

```yaml
---
name: example-skill
description: Use this skill when...
---
```

Keep the `description` specific and trigger-oriented.

## Codex-Style Skills

Codex-style workflows also benefit from:

- clear trigger descriptions
- small focused skill bodies
- optional `scripts/`, `references/`, and `assets/`
- deterministic verification steps when the skill creates files or code

## Generic Agent Platforms

For platforms that do not directly support `SKILL.md`, use `skill.json` and `registry.json` as the discovery layer. The platform can read:

- `id`
- `name`
- `summary`
- `tags`
- `platforms`
- `entry`
- `path`

Then it can load `SKILL.md` as plain Markdown instructions.

## Compatibility Fields

In `skill.json`, use:

```json
{
  "compatibility": {
    "requiresTools": [],
    "requiresNetwork": false,
    "requiresFilesystem": false
  }
}
```

This helps users understand whether a skill is purely instructional or depends on tool access.
