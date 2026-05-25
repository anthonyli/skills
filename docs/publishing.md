# Publishing Skills

This guide describes the recommended workflow for adding and publishing a new skill.

## Add a New Skill

1. Copy the template:

   ```bash
   cp -R templates/skill-template skills/my-skill
   ```

2. Rename metadata values:

   - Change `skill.json.id` to `my-skill`.
   - Change `skill.json.name` to the public display name.
   - Update `SKILL.md` frontmatter `name` and `description`.
   - Update all files in `i18n/`.

3. Add the skill to `registry.json`:

   ```json
   {
     "id": "my-skill",
     "name": "My Skill",
     "path": "skills/my-skill",
     "entry": "SKILL.md",
     "metadata": "skill.json",
     "summary": {
       "zh-CN": "中文简介。",
       "en": "English summary.",
       "ja": "日本語の概要。",
       "ko": "한국어 요약."
     },
     "tags": ["tag"],
     "platforms": ["claude", "codex", "cursor", "generic-agent"],
     "status": "stable"
   }
   ```

4. Validate:

   ```bash
   npm run validate
   ```

5. Commit:

   ```bash
   git add .
   git commit -m "feat: add my-skill"
   ```

## Status Values

- `template`: Example or reusable starting point
- `draft`: Usable but still evolving
- `stable`: Ready for others to use
- `deprecated`: Kept for history, not recommended for new usage

## Good Skill Metadata

Use a short `id`, a clear `name`, and practical `tags`.

The `description` in `SKILL.md` should say when the skill should trigger, not just what the skill is. Good descriptions include user phrases, task types, or contexts.

## Before Publishing

Run:

```bash
npm run validate
```

Then read the rendered GitHub README and at least one skill README to make sure the public presentation is clear.
