# Agent Skills

AI Agent Skills를 공개하기 위한 범용 멀티 플랫폼 템플릿입니다. 직접 만든 skill을 `skills/`에 넣고 `registry.json` 및 각 skill의 메타데이터를 수정한 뒤 GitHub에 공유할 수 있습니다.

언어:

- [English](README.en.md)
- [简体中文](README.md)
- [日本語](README.ja.md)
- 한국어

## 대상

- Claude, Codex, Cursor, 기타 Agent 도구용 skills를 공유하려는 사람
- 플랫폼이나 커뮤니티 목록에 더 쉽게 수집될 수 있는 구조를 원하는 사람
- 영어, 중국어, 일본어, 한국어로 skill 소개를 관리하려는 사람

## 저장소 구조

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

## Skill 추가하기

1. 템플릿을 복사합니다.

   ```bash
   cp -R templates/skill-template skills/my-skill
   ```

2. 다음 파일을 수정합니다.

   - `skills/my-skill/SKILL.md`
   - `skills/my-skill/skill.json`
   - `skills/my-skill/README.md`
   - `skills/my-skill/i18n/*.json`
   - `registry.json`

3. 검증합니다.

   ```bash
   npm run validate
   ```

4. GitHub에 commit / push 합니다.

## 현재 Skills

- `financial-risk-terms`: 금융 리스크 관리 용어, 모듈 경계, 지표/규칙/의사결정 관계, 프런트엔드 매핑.
- `futuristic-tech-slides`: 미래형 고품질 HTML 프레젠테이션 생성.
- `scitech-tutorial-slides`: 과학기술 튜토리얼용 독립 HTML 슬라이드 생성.

## License

MIT
