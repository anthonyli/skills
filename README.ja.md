# Agent Skills

AI Agent Skills を公開するための、汎用的で複数プラットフォームに対応しやすいテンプレートです。自分のスキルを `skills/` に置き、`registry.json` と各スキルのメタデータを更新して、GitHub で共有できます。

言語：

- [English](README.en.md)
- [简体中文](README.md)
- 日本語
- [한국어](README.ko.md)

## 対象

- Claude、Codex、Cursor、その他 Agent ツール向けの skills を共有したい人
- プラットフォームやコミュニティ一覧に収録されやすい構成にしたい人
- 英語、中国語、日本語、韓国語でスキル紹介を管理したい人

## リポジトリ構成

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

## スキルを追加する

1. テンプレートをコピーします。

   ```bash
   cp -R templates/skill-template skills/my-skill
   ```

2. 次のファイルを編集します。

   - `skills/my-skill/SKILL.md`
   - `skills/my-skill/skill.json`
   - `skills/my-skill/README.md`
   - `skills/my-skill/i18n/*.json`
   - `registry.json`

3. 検証します。

   ```bash
   npm run validate
   ```

4. GitHub に commit / push します。

## 現在の Skills

- `financial-risk-terms`: 金融リスク管理の用語、モジュール境界、指標・ルール・意思決定の関係、フロントエンド対応。
- `futuristic-tech-slides`: 未来的な高品質 HTML プレゼンテーション生成。
- `scitech-tutorial-slides`: 科学技術チュートリアル向けの単体 HTML スライド生成。

## License

MIT
