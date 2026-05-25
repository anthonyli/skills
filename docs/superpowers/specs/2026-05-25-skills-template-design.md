# Skills Repository Template Design

## Goal

Create a GitHub-ready, multi-platform skills repository template at `github.com/anthonyli/skills` that lets the owner publish personal agent skills by copying a template, editing metadata, and pushing to GitHub.

## Scope

The first version focuses on repository structure, documentation, metadata conventions, and lightweight validation. It does not include marketplace publishing automation or CI.

## Architecture

The repository separates four concerns:

- Root README files introduce the repository in Chinese, English, Japanese, and Korean.
- `registry.json` provides a repository-level index for platforms and crawlers.
- Each skill directory contains agent instructions, machine metadata, human documentation, and localized display text.
- `scripts/validate-registry.mjs` checks that registry entries point to real files and include required locale data.

## Skill Layout

Each skill follows this shape:

```text
skills/<skill-id>/
├── SKILL.md
├── skill.json
├── README.md
└── i18n/
    ├── zh-CN.json
    ├── en.json
    ├── ja.json
    └── ko.json
```

Optional bundled resources may be added later under `scripts/`, `references/`, and `assets/`.

## Metadata

`registry.json` lists public skills and includes localized summaries, tags, supported platforms, and status.

`skill.json` stores per-skill metadata, including compatibility hints for tools, network access, and filesystem access.

## Internationalization

The repository supports `zh-CN`, `en`, `ja`, and `ko`. Root README files are split by language. Per-skill localized display copy lives in `i18n/*.json`.

## Verification

Validation is handled by a dependency-free Node.js script so users can run:

```bash
npm run validate
```

The script checks registry shape, duplicate IDs, required files, ID consistency, and required locale files.
