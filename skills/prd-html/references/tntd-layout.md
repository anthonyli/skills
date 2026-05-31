# TntdLayout 应用布局框架详细文档

## 概述
tntdLayout对象提供的企业级应用布局框架，支持多种布局模式、菜单管理、机构渠道切换、主题配置等功能。

## 数据结构

**⚠️ 重要约束**：以下所有 MOCK 数据的字段结构、数据类型、嵌套层级必须严格遵循，不可随意修改或简化。生成 HTML 原型时必须完整复制这些数据结构。

### MOCK_MENUS - 菜单树结构（标准 Mock 数据）

**用途**：TNTLayout 组件的 `menus` 属性专用 Mock 数据

**数据结构约束**：
- ✅ 必须包含的字段：`id`、`groupIcon`、`groupName`、`code`、`enName`、`children`
- ✅ 子菜单必须包含：`menuName`、`menuUuid`、`code`、`path`、`enName`
- ❌ 禁止删除任何字段
- ❌ 禁止修改字段类型
- ⚠️ 可以修改字段值以适配具体业务场景

```js
const MOCK_MENUS = [
    {
        id: '2c537ab73d19411ca19c81ea677a748c',
        groupIcon: 'tongji',
        groupName: '系统运行大盘',
        code: 'TD0101',
        enName: 'runningdasborb',
        children: [
            {
                menuName: '系统大盘',
                menuUuid: '69416dd480314eb0a645091f592523c7',
                code: 'SystemDashboard',
                path: '/noah/dashboard/system',
                enName: 'System Dashboard',
            }
        ]
    }
]
```

### MOCK_USER_INFO - 用户信息结构（标准 Mock 数据）

**用途**：TNTLayout 组件的 `userInfo` 属性专用 Mock 数据

**数据结构约束（强制执行）**：
- ✅ 必须包含的字段：`account`、`apps`、`avatar`、`lang`、`orgName`、`orgUuid`、`roles`、`userName`、`uuid`
- ✅ `apps` 数组中每个对象必须包含：`appType`、`displayName`、`name`、`partnerCode`、`uuid`
- ✅ `roles` 数组中每个对象必须包含：`code`、`name`、`orgUuid`、`type`、`uuid`
- ❌ 禁止删除任何字段
- ❌ 禁止修改字段类型
- ⚠️ 可以修改字段值（如 userName、orgName）以适配具体业务场景
- ⚠️ 生成数据时必须严格参考此结构，保持字段完整性

```js
const MOCK_USER_INFO = {
    account: "admin",
    apps: [
        {
            appType: "all",
            createdBy: "admin",
            displayName: "testinterface",
            gmtCreate: 1524464036000,
            gmtModified: 1524632742000,
            name: "interface_auto",
            partnerCode: "kratos",
            secretKey: "a4c45240279542619ca6e7730a3f3dad",
            signForSwitch: false,
            signForWrite: false,
            updatedBy: "admin",
            uuid: "d9ed07ed4dc14c4fb33470186135d36a",
        }
    ],
    avatar: "male1",
    lang: "cn",
    layout: "default",
    orgName: "同盾科技",
    orgUuid: "a8202aea546f48979754bdd45c471b08",
    roleUuids: '["ee8dbc99831b4a9cb17578b51bbb09e0"]',
    roles: [
        {
            code: "TongDun",
            name: "超级管理员",
            orgUuid: "a8202aea546f48979754bdd45c471b08",
            type: "default",
            uuid: "ee8dbc99831b4a9cb17578b51bbb09e0",
        },
    ],
    userName: "超级管理员",
    uuid: "c693e0ec0a2e4bf8b71eef8152d88a29",
}
```

### MOCK_APP_LIST - 应用列表（标准 Mock 数据）

**用途**：TNTLayout 组件的 `appList` 属性专用 Mock 数据

**数据结构约束（强制执行）**：
- ✅ 必须包含的字段：`key`、`name`、`id`、`uuid`、`displayName`、`partnerCode`、`have`、`description`
- ❌ 禁止删除任何字段
- ❌ 禁止修改字段类型
- ⚠️ 可以修改字段值以适配具体业务场景
- ⚠️ 生成数据时必须严格参考此结构，保持字段完整性

```js
const MOCK_APP_LIST = [
    {
        "key": "",
        "name": "全部渠道"
    },
    {
        "id": 3,
        "uuid": "faghgfyaiuLhgfyugesyi123432hsdf",
        "name": "initApp",
        "displayName": "initApp",
        "enDisplayName": "initApp",
        "partnerCode": "kratos",
        "have": true,
        "description": "初始应用",
        "key": "init"
    }
]
```

### MOCK_ORG_LIST - 组织列表结构（标准 Mock 数据）

**用途**：TNTLayout 组件的 `orgList` 属性专用 Mock 数据

**数据结构约束（强制执行）**：
- ✅ 必须包含的字段：`id`、`uuid`、`code`、`level`、`name`、`enName`、`orgAttribute`、`children`、`title`、`value`、`key`
- ✅ `children` 数组中每个对象必须包含相同的字段结构（递归）
- ✅ `parentUuid` 字段在子节点中必须存在
- ❌ 禁止删除任何字段
- ❌ 禁止修改字段类型
- ❌ 禁止破坏树形结构的完整性
- ⚠️ 可以修改字段值以适配具体业务场景
- ⚠️ 生成数据时必须严格参考此结构，保持字段完整性和树形层级关系

```jsx 
const MOCK_ORG_LIST = {
    "id": 25,
    "uuid": "a8202aea546f48979754bdd45c471b08",
    "code": "TongDun",
    "level": 1,
    "name": "TongDun",
    "enName": "TongDun",
    "orgAttribute": 2,
    "children": [
        {
            "id": 4,
            "uuid": "480b52b921624596910e345e366ca4f4",
            "code": "test0115",
            "level": 2,
            "parentUuid": "a8202aea546f48979754bdd45c471b08",
            "name": "授权机构A",
            "orgAttribute": 2,
            "children": [
                {
                    "id": 7,
                    "uuid": "b15a1e482d3f4fc7a53eaaa2c1042fd3",
                    "code": "test011504",
                    "level": 3,
                    "parentUuid": "480b52b921624596910e345e366ca4f4",
                    "name": "授权机构A_职能部门",
                    "orgAttribute": 1,
                    "children": [],
                    "title": "授权机构A_职能部门",
                    "value": "b15a1e482d3f4fc7a53eaaa2c1042fd3",
                    "key": "b15a1e482d3f4fc7a53eaaa2c1042fd3"
                }
            ],
            "title": "授权机构A",
            "value": "480b52b921624596910e345e366ca4f4",
            "key": "480b52b921624596910e345e366ca4f4"
        },
    ],
    "title": "TongDun",
    "value": "a8202aea546f48979754bdd45c471b08",
    "key": "a8202aea546f48979754bdd45c471b08"
}
```

## 基础用法
```jsx
const { TNTLayout } = tntdLayout;

// 使用标准 Mock 数据
<TNTLayout
  type="enterprise"
  logo={<img className="logo" src={logoUrl} />}
  name="应用名称"
  enName="App Name"
  userInfo={MOCK_USER_INFO}
  menus={MOCK_MENUS}
  appList={MOCK_APP_LIST}
  orgList={MOCK_ORG_LIST}
  onLogout={handleLogout}
>
  {children}
</TNTLayout>
```

## 完整 Props 列表

### 核心配置

| 属性 | 说明 | 类型 | 默认值 | 必须 |
|------|------|------|--------|------|
| type | 布局类型：`default` \| `enterprise` \| `paas` | string | default | 否 |
| logo | 应用 logo（ReactNode 或图片 URL） | ReactNode \| string | - | 是 |
| logoCustom | 自定义 logo 区域 | ReactNode | - | 否 |
| name | 应用名称（中文）⚠️ 已废弃 | string | - | 否 |
| enName | 应用英文名称 | string | - | 否 |
| prefixCls | 自定义样式前缀 | string | - | 否 |

### 用户信息

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| userInfo | 统一登录用户信息对象 | Object | - |
| needAuth | 是否需要认证 | boolean | false |

### 菜单配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| menus | 菜单树数据 | Array | - |

### 机构/渠道

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| appList | 渠道列表（显示渠道切换器，只有orgList为非真的场景下才会展示渠道列表） | Array | - |
| curAppList | 当前渠道列表 | Array | - |
| onAppChange | 渠道切换回调 `(app) => void` | Function | - |
| orgList | 机构列表（显示机构切换器） | Array | - |
| curOrgList | 当前机构下的渠道列表 | Array | - |
| onOrgChange | 机构切换回调 `(org) => void` | Function | - |
| orgAppShow | 是否显示机构下的渠道列表 | boolean | false |
| orgAppList | 机构下的渠道列表数据 | Array | - |
| orgAppListReady | 机构下的渠道列表是否就绪 | boolean | false |

### 布局控制

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| isEmptyLayout | 空布局模式，不显示 header 和侧边菜单 | boolean | false |

## 空布局模式

```jsx
const { TNTLayout } = tntdLayout;
// 不显示 header 和侧边菜单，仅保留内容区域
<TNTLayout isEmptyLayout={true} >
  {children}
</TNTLayout>
```

## 重要说明与注意事项
- **强制执行** 在 prd-html 生成的 HTML 原型中，必须使用上述定义的 `MOCK_MENUS`、`MOCK_USER_INFO`、`MOCK_APP_LIST`、`MOCK_ORG_LIST` 作为 TNTLayout 的数据源，这些 Mock 数据已经包含完整的数据结构，可以直接使用
- prd-html 生成中的 根容器角色：
   - TNTLayout 始终作为应用的根容器
   - 负责全局布局：菜单、头部、用户信息、机构渠道切换
- **机构渠道场景**：使用 `orgList`和`orgAppShow` 实现机构与机构下的渠道是否展示，如果`orgAppShow`为true，则使用`orgAppList`作为机构下的渠道列表展示， `orgList`为非真，则`appList`作为只有渠道展示， `appList`为渠道的下拉列表数据
- **isEmptyLayout**：适用于登录页、全屏页等不需要菜单布局的场景