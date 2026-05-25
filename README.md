# Agent Skills

一个通用、多平台友好的 AI Agent Skills 仓库模板。你可以把自己的技能放进 `skills/`，更新 `registry.json` 和每个技能的简介文件，然后发布到 GitHub 供其他人使用或被平台收录。

语言版本：

- [English](README.en.md)
- [日本語](README.ja.md)
- [한국어](README.ko.md)
- 简体中文

## 适合谁

- 想把 Claude / Codex / Cursor / 其他 Agent 工具的 skills 开源分享的人
- 想让技能更容易被平台、社区列表、搜索引擎收录的人
- 想用中英日韩四种语言维护技能介绍的人

## 仓库结构

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
│   └── example-skill/
└── docs/
    ├── publishing.md
    ├── platforms.md
    └── i18n.md
```

## 快速添加一个技能

1. 复制模板：

   ```bash
   cp -R templates/skill-template skills/my-skill
   ```

2. 修改这些文件：

   - `skills/my-skill/SKILL.md`
   - `skills/my-skill/skill.json`
   - `skills/my-skill/README.md`
   - `skills/my-skill/i18n/*.json`
   - `registry.json`

3. 校验仓库：

   ```bash
   npm run validate
   ```

4. 提交并推送到 GitHub。

## Skill 目录约定

每个技能目录至少包含：

- `SKILL.md`：给 Agent 读取的技能主体说明
- `skill.json`：给平台和索引工具读取的机器元数据
- `README.md`：给人类阅读的技能介绍
- `i18n/`：中英日韩展示文案

可选目录：

- `scripts/`：可执行脚本
- `references/`：按需读取的参考资料
- `assets/`：模板、图片、示例文件等资源

## 发布文档

- [发布和新增技能](docs/publishing.md)
- [多平台兼容说明](docs/platforms.md)
- [多语言维护说明](docs/i18n.md)

## License

MIT
