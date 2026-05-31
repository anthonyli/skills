# QueryListScene 查询列表

用于查询列表页面场景，包含表单查询、操作工具栏、表格数据展示三部分。

## 基本用法

```jsx
const { QueryListScene, HandleIcon, Button } = tntd

const { QueryForm, Field, QueryList, createActions } = QueryListScene
// ⚠️ 重要：actions 必须为每个 QueryListScene 独立创建，不能多个实例共享同一个 actions
const actions = createActions()
const query = ({ current=1, pageSize=10, ...formData }) => {
  return Promise.resolve({
    current,
    pageSize,
    total: 25,
    data: [
      { id: 1, name: '示例数据 1', status: 'active', createTime: '2024-01-01' },
      { id: 2, name: '示例数据 2', status: 'inactive', createTime: '2024-01-02' }
    ]
  })
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    sorter: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 170,
    fixed: 'right',
    render: (val, record) => (
      <HandleIcon>
        <HandleIcon.Item title="编辑">
          <Icon
            type="form"
            onClick={() => handleEdit(record)}
          />
        </HandleIcon.Item>
        <HandleIcon.Item title="删除" desc="确认删除？">
          <Popconfirm
            title="确认删除？"
            onConfirm={() => handleDelete(record)}
          >
            <Icon type="delete" style={{ color: 'red' }} />
          </Popconfirm>
        </HandleIcon.Item>
      </HandleIcon>)
  },
]

<QueryListScene query={query} actions={actions}>
  <QueryForm extraActions={<Button type="primary" icon="plus">新建</Button>}>
    <Field type="input" name="name" props={{ placeholder: '名称' }} />
    <Field type="select" name="status" props={{ placeholder: '状态', options: [...] }} />
  </QueryForm>
  <QueryList rowKey="id" columns={columns} scroll={{ x: 450 }} />
</QueryListScene>
```

**⚠️ 重要提示（强制执行）**：
- `query` 和 `actions` 是 QueryListScene 的**必需属性**，必须显式传入
- `actions` 是状态管理器，**多个 QueryListScene 必须各自独立创建**，不能共享同一个 `actions` 实例
- 在 TabsContainer 场景中，每个 Tab 内的 QueryListScene 都必须：
  - 独立调用 `createActions()` 创建新的 actions
  - 独立定义 `query` 方法（或调用创建 query 的函数）
- ❌ 错误：`<QueryListScene {...props} />` — 空透传不传入 query 和 actions
- ✅ 正确：`<QueryListScene query={query} actions={createActions()} >`

## 核心组件

### QueryListScene

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| query | 查询数据方法，返回 Promise | Function | - |
| title | 标题 | string | - |
| actions | 由 createActions 创建的方法集合 | Object | - |
| interval | 自动轮询间隔(ms) | number | - |
| memory | 是否记住表单和分页数据 | boolean | false |
| initSearch | 是否初始不请求 | boolean | false |

### QueryForm

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| showFieldCount | 显示在外的表单数量(抽屉模式) | number | - |
| defaultExpanded | 默认是否展开 | boolean | false |
| showExpand | 是否显示展开/收起 | boolean | true |
| showSearch | 是否显示搜索按钮 | boolean | true |
| showReset | 是否显示重置按钮 | boolean | true |
| extraActions | 额外操作按钮 | ReactNode | - |
| initialValues | 初始值 | Object | - |
| onChange | 表单变化回调 | Function | - |
| onSearch | 搜索回调 | Function | - |
| onReset | 重置回调 | Function | - |

### Field

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 表单项名称(必填) | string | - |
| title | 表单 label | string | - |
| type | 表单类型，仅允许精确使用：input/search/number/select/selectInput/date/dateRange | string | - |
| component | 自定义表单组件(优先级高于 type) | ReactNode | - |
| props | 表单元素属性 | Object | - |

**Field type 取值规范（强制执行）**：
- `type` 必须使用上表枚举的原始大小写，禁止转换为 kebab-case、snake_case 或其他命名形式。
- 日期范围必须写为 `type="dateRange"`，这是 QueryListScene 识别 `DatePicker.RangePicker` 的唯一合法写法。
- 严禁写成 `type="date-range"`、`type="daterange"`、`type="date_range"`，这些写法会导致页面运行时报错。

**type="select" 扩展属性：**
- `options`: 选项数组，支持字符串数组或对象数组
- `fieldNames`: 自定义字段名 `{ label, value }`
- `loadData`: 异步加载选项，返回 Promise

**type="selectInput" 扩展属性：**
- `addonBeforeStyle`: 前置 Select 样式

### QueryList

继承 antd Table 所有属性，额外扩展：

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| resizable | 可拖拽调整列宽 | boolean | false |
| localPagination | 前端分页 | boolean | false |
| paginationSticky | 分页吸底 | boolean | false |

## Actions API

```js
const actions = createActions()

// 方法列表
actions.setFormData(data, needSearch = true)  // 设置表单数据
actions.resetFormData(needSearch = false)     // 重置表单
actions.resetMemoryData()                     // 重置记忆数据
actions.setTableDataSource(dataSource)        // 设置表格数据
actions.setPagination({ current, pageSize, total })  // 设置分页
actions.search(params, showLoading = true)    // 查询列表
actions.getFormData(name)                     // 获取表单数据
actions.getSubmittedFormData(name)            // 获取已提交的表单数据
actions.getTableDataSource()                  // 获取表格数据
actions.getPagination()                       // 获取分页数据
```

## 常见场景

### 批量操作

通过 `rowSelection` 配置选择功能，配合 `TntdAction` 实现批量操作。

## query 方法格式（强制执行）

```js
const query = ({ current=1, pageSize=10, ...formData }) => {
  return Promise.resolve({
    current,      // 当前页码
    pageSize,     // 每页条数
    total: 100,   // 总条数
    data: [       // 数据数组，根据具体业务场景生成
      {
        id: 1,
        name: '示例数据 1',
        status: 'active',
        createTime: '2024-01-01 12:00:00'
      },
      {
        id: 2,
        name: '示例数据 2',
        status: 'inactive',
        createTime: '2024-01-02 12:00:00'
      }
    ]
  })
}
```

**⚠️ 重要提示**：
- 返回值必须包含 `current`、`pageSize`、`total`、`data` 四个字段
- `data` 数组中的对象字段必须与 `columns` 中的 `dataIndex` 一一对应
- 生成 Mock 数据时，必须根据具体业务场景创建 5-10 条有意义的示例数据

## 注意事项

- 批量操作功能文档 `references/tntd-action.md`
- **强制执行** QueryListScene 不设置`title`不需要展示title
- **强制执行** QueryForm中`Field` 不设置`title`
- **强制执行** QueryForm中 要直接使用在QueryListScene中，不能单独封装组件模块

---

## 操作列规范

> 操作列完整规范、检查清单、常见错误对比详见 SKILL.md "操作列强制规范" 和 "常见错误" 部分。

**核心要点**：
- 操作列必须使用 `<HandleIcon>` > `<HandleIcon.Item>` 结构
- 删除操作必须用 `Popconfirm` 二次确认 + `style={{ color: 'red' }}`
- 操作列设置 `fixed: 'right'` 和合适的 `width`（建议 170-200）
- QueryList 增加 `scroll.x` 宽度是所有列的总和
