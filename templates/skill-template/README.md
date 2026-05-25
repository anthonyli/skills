# Skill Template

复制这个目录来创建新技能。

## 必改文件

- `SKILL.md`
- `skill.json`
- `README.md`
- `i18n/zh-CN.json`
- `i18n/en.json`
- `i18n/ja.json`
- `i18n/ko.json`

## 建议

- 技能目录名使用 kebab-case，例如 `code-review-helper`。
- `skill.json.id` 必须和目录名一致。
- `registry.json` 中的 `path` 使用 `skills/<skill-id>`。
- `SKILL.md` 的 frontmatter `description` 写清楚触发场景。
