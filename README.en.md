# Agent Skills

A general-purpose, multi-platform friendly template for publishing AI agent skills. Put your skills in `skills/`, update `registry.json` and each skill's metadata, then publish the repository on GitHub for others and indexing platforms.

Languages:

- English
- [简体中文](README.md)
- [日本語](README.ja.md)
- [한국어](README.ko.md)

## Who This Is For

- People sharing skills for Claude, Codex, Cursor, or other agent tools
- Skill authors who want their repositories to be easier to index and discover
- Maintainers who want skill descriptions in English, Chinese, Japanese, and Korean

## Repository Layout

```text
.
├── registry.json
├── schemas/
│   └── skill.schema.json
├── scripts/
│   └── validate-registry.mjs
├── templates/
│   └── skill-template/
├── skills/
│   ├── financial-risk-terms/
│   ├── futuristic-tech-slides/
│   └── scitech-tutorial-slides/
└── docs/
    ├── publishing.md
    ├── platforms.md
    └── i18n.md
```

## Add a Skill

1. Copy the template:

   ```bash
   cp -R templates/skill-template skills/my-skill
   ```

2. Edit:

   - `skills/my-skill/SKILL.md`
   - `skills/my-skill/skill.json`
   - `skills/my-skill/README.md`
   - `skills/my-skill/i18n/*.json`
   - `registry.json`

3. Validate:

   ```bash
   npm run validate
   ```

4. Commit and push to GitHub.

## Current Skills

- `financial-risk-terms`: financial risk-control terminology, module boundaries, indicator/rule/decision relationships, and frontend mapping.
- `futuristic-tech-slides`: high-end futuristic HTML presentation generation.
- `scitech-tutorial-slides`: standalone HTML slide generation for science and technology tutorials.

## Skill Directory Convention

Each skill directory should include:

- `SKILL.md`: instructions read by agents
- `skill.json`: machine-readable metadata for platforms and indexers
- `README.md`: human-readable documentation
- `i18n/`: display text in English, Chinese, Japanese, and Korean

Optional directories:

- `scripts/`: executable helpers
- `references/`: reference material loaded only when needed
- `assets/`: templates, images, sample files, and other bundled resources

## Docs

- [Publishing skills](docs/publishing.md)
- [Platform compatibility](docs/platforms.md)
- [Internationalization](docs/i18n.md)

## License

MIT
