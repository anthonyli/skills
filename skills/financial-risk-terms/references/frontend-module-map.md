# 前端项目仓库对应表

使用规则：当用户提到模块、url 前缀、后端请求前缀、前端仓库时，优先查本表。表中的“项目名称”理解为前端 git 仓库，“前缀”理解为页面 url 前缀，“nginx api前缀”理解为前端请求后端时使用的 api 前缀。

## 高频别名

| 用户可能说法 | 默认定位 |
|---|---|
| 指标 / 指标平台 / 实时指标 / 离线指标 | `salaxy-react` / `index` / `indexApi` |
| 外数指标 / 人行报文指标 | `captain-react` / `params` / `captainApi` |
| 交易反欺诈 / 天策交易 | `spartan-react` / `trade` / `tradeApi` |
| 账户 / 天策账户 | `spartan-acct-react` / `account` / `accountApi` |
| 决策中台组件 | `noah-react` / `noah` / `noahApi` |
| 模型运行 | `holmes-react` / `model` / `modelApi` |
| 模型构建 | `turing-new-react` / `turing` / `turingApi` |
| 模型管理 | `model-paas-react` / `modelex` / `modelexApi` |
| 贷中监控预警 | `galaxy-react` / `galaxy` / `galaxyApi` |
| 名单 | 老名单 `dc-react` / `data` / `dataApi`；新名单 `roster-react` / `roster` / `rosterApi`，需结合上下文 |
| 审批流 | 老审批 `fiona-react` / `audit` / `auditApi`；新审批 `aflow-react` / `aflow` / `aflowApi`，需结合上下文 |

## 完整映射

| 大类 | 模块 / 系统 | url 前缀 | 前端仓库 | api 前缀 | 备注 |
|---|---|---|---|---|---|
| 公共系统 | 统一登录权限 | `bridge` | `bifrost-react` | `bridgeApi` |  |
| 公共系统 | 前置服务 | `unite` | `preserver-react` | `uniteApi` | `tiangong-admin`，最新版本合到 `bifrost-react` |
| 公共系统 | 名单管理 | `data` | `dc-react` | `dataApi` | `tiangong-admin`；名单服务前端，代号 river，后端 river |
| 公共系统 | 名单管理（新） | `roster` | `roster-react` | `rosterApi` | 最新版本合到 `bifrost-react` |
| 公共系统 | 天座三方 | `handle` | `freyr-react` | `handleApi` | `tianzuo-admin` |
| 公共系统 | 审批流 | `audit` | `fiona-react` | `auditApi` | 审批老版本 |
| 公共系统 | 审批流（新） | `aflow` | `aflow-react` | `aflowApi` | 最新版本合到 `bifrost-react` |
| 公共系统 | 决策中台组件 | `noah` | `noah-react` | `noahApi` | `tiangong-admin` |
| 公共系统 | AI智能体 | `agent` | `archer-agent-react` | `agentApi` | `archer-agent` |
| 公共系统 | 微前端基座 |  | `lightbox-react` |  |  |
| 天策交易 | 交易反欺诈 | `trade` | `spartan-react` | `tradeApi` |  |
| 天策交易 | 交易规则 |  | `kratos-react` |  | 不维护了 |
| 天策信贷 | 信贷系统 | `credit` | `atreus-react` | `creditApi` |  |
| 天策信贷 | 业务监控 |  | `heimdallr-react` |  | 不维护了 |
| 天策信贷 | 信贷决策引擎-决策分离 | `creditEngine` | `atreus-engine-react` |  | 不维护了 |
| 天策商户 | 基于交易产品 | `merchant` | `merchant-react` | `merchantApi` |  |
| 天策商户 | 基于交易产品 | `kratos` | `merchant-api-react` |  | 不维护了 |
| 天策贷中 | 贷中 | `loan` | `atreus-loan-react` |  | 不维护了 |
| 天策贷中 | 贷中监控预警 | `galaxy` | `galaxy-react` | `galaxyApi` |  |
| 天策账户 | 账户 | `account` | `spartan-acct-react` | `accountApi` |  |
| 指标平台 | 实时指标&离线指标 | `index` | `salaxy-react` | `indexApi` |  |
| 指标平台 | 人行报文指标 / 外数指标 | `params` | `captain-react` | `captainApi` | `tianzuo-captain` |
| 方升 | 监控预警 | `radar` | `radar-react` |  | 不维护了 |
| 方升 | 监控预警 | `alert` | `td-monitor-react` | `alertApi` |  |
| 明模 | 模型运行 | `model` | `holmes-react` | `modelApi` |  |
| 明模 | 模型构建 | `turing` | `turing-new-react` | `turingApi` | 从标准版 2.0 开始废弃 `turing-react` |
| 明模 | 模型管理 | `modelex` | `model-paas-react` | `modelexApi` |  |
| 明模 | 数据管理 | `chaos` | `chaos-react` | `chaosApi` |  |
| 明模 | 工作流 | `fiona` | `fiona-react` | `auditApi` | 明模独有分支 |
| 云图 | 云图-启明 | `qiming` | `yuntu-qiming-react` | `qimingApi` | `yuntu-qiming` |
| 云图 | 云图-明眸 | `mingmou` | `yuntu-mingmou-react` | `mingmouApi` | `yuntu-mingmou` |
| 云图 | 云图-指标服务 | `indicator` | 无 | `indicatorApi` | `yuntu-indicator` |
| 云图 | 对公图谱 | `duigong` | `yuntu-duigong-react` | `duigongApi` | `yuntu-duigong` |
| 云图 | 图谱实验室 | `lab` | `yuntu-lab-react` | `labApi` | `yuntu-lab`，不维护了 |
| 云图 | 模糊匹配 | `address` | `yuntu-address-react` | `addressApi` | `yuntu-nireus` |
| 云图 | 案例查证 | `aml` | `yuntu-aml-react` | `caseVerificationApi` | `yuntu-aml` |
| 数据BI | databi |  | `databi-frontend` |  |  |
| 数据管理 | 数据管理组件 | `dm` | `paas-dm-react` | `dmApi` | 主分支 `tiance-master` |
| 政企 | 诸葛金融大模型 | `chat` | `ai-financial-model-web` |  |  |
| 政企 | 诸葛金融大模型后台 | `admin` | `ai-financial-model-admin-web` |  |  |
| 政企 | 数据资产平台 | `ds` | `data-assets-frontend` |  |  |
