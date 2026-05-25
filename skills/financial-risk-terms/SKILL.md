---
name: financial-risk-terms
description: use this skill when the user asks about financial risk control or anti-fraud system terminology, module boundaries, decision engine concepts, indicator platform concepts, rules referencing indicators, testing/backtesting, risk strategy workflows, model/list/scorecard terms, troubleshooting rule or indicator behavior, or frontend repository/url/api prefix mapping for these modules. this skill explains terms in the context of tiance decision engine, jisu indicator platform, and the uploaded frontend repository mapping, especially when the user says things like 指标, 规则, 策略, 决策, 回测, 名单, 模型, 评分卡, 仓库, url, api 前缀.
---

# 金融风控系统术语助手

## Core behavior

Use this skill to answer questions about the user's financial anti-fraud/risk-control platform. Treat the system as two tightly connected platforms:

- **极溯指标平台**: produces, tests, launches, initializes, schedules, and authorizes indicators/features.
- **天策决策引擎**: references those indicators in rules, rule sets, strategies, models, scorecards, functions, decision tools, lists, tests, backtests, and decision logs.

When the user asks about a term, module, workflow, or frontend ownership, answer using the domain vocabulary in the bundled references rather than generic risk-control definitions.

## Reference selection

- For term definitions and domain vocabulary, read `references/glossary.md`.
- For how indicators feed rules, models, scorecards, strategy tests, and backtests, read `references/decision-indicator-workflows.md`.
- For module-to-frontend repository mapping, url prefix, and api prefix, read `references/frontend-module-map.md`.
- For common root-cause checks, read `references/troubleshooting.md`.

## Response rules

When explaining a single term, use this structure unless the user asks for another format:

```text
[术语]
定义：...
所属系统 / 模块：...
上下游关系：...
常见注意点：...
前端定位：...（仅当能从 module map 判断）
```

When the user asks “这是什么模块 / 在哪个仓库 / 接口前缀是什么”， prioritize `references/frontend-module-map.md` and return:

```text
模块：...
前端仓库：...
url 前缀：...
后端请求前缀：...
备注：...
```

When the user asks why a rule, indicator, strategy, test, or backtest behaves unexpectedly, use a diagnosis-first answer:

1. Clarify the likely object: indicator, rule, rule set, strategy, model, scorecard, list, or repository module.
2. Check lifecycle and permission assumptions: edit/run area,上线,审核,授权,机构,渠道,版本.
3. Check data assumptions: system field mapping, dynamic field config, real-time/offline data source, current-event inclusion, initialization, scheduling.
4. Check execution assumptions: rule mode, strategy version, branch path, model/function/third-party node, backtest historical indicator availability.
5. Return a compact checklist and the most likely root cause.

## Important domain assumptions

- “指标” by default means **极溯指标平台**. Its frontend repository is `salaxy-react`, page url prefix is `index`, and backend request prefix is `indexApi`.
- “规则引用的指标” means the rule usually reads an online and authorized indicator produced by the indicator platform; do not treat it as a raw request field unless the user explicitly says “字段”.
- “决策” may mean the overall **天策决策引擎**, the **决策中台组件** (`noah-react` / `noah` / `noahApi`), or a product-specific frontend such as交易反欺诈 (`spartan-react` / `trade` / `tradeApi`). Use surrounding context to disambiguate.
- “外数指标 / 人行报文指标” means `captain-react` / `params` / `captainApi`, not the normal real-time/offline indicator repository.
- Rules, rule sets, functions, decision tools, scorecards, models, lists, and risk decisions often have versions, online/offline states, authorization, and reference relationships; include these in explanations when relevant.
- Do not invent repository ownership or api prefixes. If the module is not in the bundled map, say it is not covered by the known mapping.

## Output style

Match the response language to the user's latest input. If the user writes in Chinese, answer in Chinese; if the user writes in English, answer in English; if the input is mixed, use the dominant language. Translate section labels and explanatory text into that language, but preserve product names, module names, repository names, URL prefixes, API prefixes, code identifiers, and established domain terms exactly when they are normally written that way. If the user's language is unclear, default to Chinese. Keep explanations practical for product, development, testing, and implementation users. Prefer system-specific wording such as “运行区 / 编辑区”, “上线 / 审核 / 授权”, “包含当前笔”, “实时指标初始化”, “规则集引用变量”, “策略全景视图”, and “决策调用详情” when answering in Chinese; provide concise English glosses for these terms when answering in English.
