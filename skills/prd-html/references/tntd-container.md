# TNTD 页面容器模板（标准化）

## 核心说明
所有容器模板基于 TNTD 设计规范开发，内置通用状态（加载/分页/表单）、遵循主题色规范，可直接替换业务字段使用。

## 场景识别与自动填充（强制执行）

### 可切换列表场景
- **识别关键词**：可切换列表 / 多列表 / 多 Tabs 列表 / 多状态列表 / 切换查询
- **自动选择容器**：`TabsContainer`
- **完整示例**：见下方 [TabsContainer 容器](#2-多-tabs多个列表可切换容器tabscontainer)
- **必读文档**：`references/query-list-scene.md`

**关键约束**：
1. 必须使用 `<Tabs>` + `<Tabs.TabPane>` 嵌套结构，不可用 `items` 属性
2. 每个 Tab 必须显式传入 `query` 和 `actions`：`<QueryListScene query={...} actions={createActions()}>`
3. ❌ 禁止空透传：`<QueryListScene {...props} />`
4. `type="ladder-card"` 是 TNTD 标准样式，不可修改

### 单表格查询场景
- **识别关键词**：查询列表 / 表格查询 / 列表页面 / 数据列表
- **自动选择容器**：`TableContainer`
- **自动填充结构**：`QueryListScene` 完整结构
- **必读文档**：`references/query-list-scene.md`

### 详情页面场景
- **识别关键词**：详情页 / 详情展示 / 数据详情
- **自动选择容器**：`PageContainer`
- **常用组件**：Descriptions、Card、Tabs（用于分组展示）

## 容器列表

### 1. 查询列表/单个表格容器（TableContainer）

**适用场景**：单列表查询页面（如「用户列表」「订单列表」）

**完整示例**：
```jsx
const { TableContainer, QueryListScene, HandleIcon, Icon, Popconfirm, Tag, Button } = tntd
const { QueryForm, Field, QueryList, createActions } = QueryListScene

// ✅ 正确：容器是 HOC，必须将返回值赋值给 App
const App = TableContainer((props) => {
  // ⚠️ actions 和 query 必须在 App 组件内部创建
  const actions = createActions()

  const query = ({ current, pageSize, ...formData }) => {
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
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '名称', dataIndex: 'name', width: 200 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 170,
      fixed: 'right',
      render: (val, record) => (
        <HandleIcon>
          <HandleIcon.Item title="编辑">
            <Icon type="form" onClick={() => handleEdit(record)} />
          </HandleIcon.Item>
          <HandleIcon.Item title="删除" desc="确认删除？">
            <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record)}>
              <Icon type="delete" style={{ color: 'red' }} />
            </Popconfirm>
          </HandleIcon.Item>
        </HandleIcon>
      )
    }
  ]

  return (
    <QueryListScene query={query} actions={actions}>
      <QueryForm extraActions={<Button type="primary" icon="plus">新建</Button>}>
        <Field type="input" name="name" props={{ placeholder: '名称' }} />
        <Field type="select" name="status" props={{ placeholder: '状态', options: [...] }} />
      </QueryForm>
      <QueryList rowKey="id" columns={columns} />
    </QueryListScene>
  );
})
```

**⚠️ 重要提示**：
- ✅ 正确：`const App = TableContainer((props) => { ... })`
- ❌ 错误：先定义 App，再执行 `TableContainer(App)` — 这样不会返回新组件

### 2. 多 Tabs/多个列表/可切换容器（TabsContainer）

**适用场景**：多列表 (可切换) 查询页面（如「运行区」、「编辑区」多状态列表）

**完整示例**：
```jsx
const { TabsContainer, Tabs, QueryListScene, HandleIcon, Icon, Popconfirm, Tag, Button } = tntd
const { QueryForm, QueryList, Field, createActions } = QueryListScene

// 每个 Tab 需要独立的 query 方法和 actions 实例
const createQuery = (status) => ({ current, pageSize, ...formData }) => {
  return Promise.resolve({
    current: current || 1,
    pageSize: pageSize || 10,
    total: 20,
    data: [
      { id: 1, orderNo: 'ORD001', status: status, amount: 100, createTime: '2024-01-15' },
      { id: 2, orderNo: 'ORD002', status: status, amount: 200, createTime: '2024-01-16' }
    ]
  })
}

const columns = [
  { title: '订单号', dataIndex: 'orderNo', width: 150 },
  { title: '金额', dataIndex: 'amount', width: 100 },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    render: (s) => <Tag color={s === 'pending' ? 'gold' : 'green'}>{s === 'pending' ? '待处理' : '已完成'}</Tag>
  },
  { title: '创建时间', dataIndex: 'createTime', width: 160 },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    fixed: 'right',
    render: (_, r) => (
      <HandleIcon>
        <HandleIcon.Item title="查看"><Icon type="eye" onClick={() => alert(r.orderNo)} /></HandleIcon.Item>
        <HandleIcon.Item title="删除" desc="确认？">
          <Popconfirm title="确认？" onConfirm={() => alert('已删除')}>
            <Icon type="delete" style={{ color: 'red' }} />
          </Popconfirm>
        </HandleIcon.Item>
      </HandleIcon>
    )
  }
]

// ✅ 正确：容器是 HOC，必须将返回值赋值给 App
const App = TabsContainer((props) => {
  // ⚠️ 每个 QueryListScene 必须独立创建 actions 和 query，不能共享
  return (
    <Tabs type="ladder-card" defaultActiveKey="1">
      <Tabs.TabPane tab="全部" key="1">
        <QueryListScene query={createQuery('all')} actions={createActions()}>
          <QueryForm>
            <Field type="input" name="orderNo" props={{ placeholder: '订单号' }} />
          </QueryForm>
          <QueryList rowKey="id" columns={columns} />
        </QueryListScene>
      </Tabs.TabPane>
      <Tabs.TabPane tab="待处理" key="2">
        <QueryListScene query={createQuery('pending')} actions={createActions()}>
          <QueryForm>
            <Field type="input" name="orderNo" props={{ placeholder: '订单号' }} />
          </QueryForm>
          <QueryList rowKey="id" columns={columns} />
        </QueryListScene>
      </Tabs.TabPane>
      <Tabs.TabPane tab="已完成" key="3">
        <QueryListScene query={createQuery('completed')} actions={createActions()}>
          <QueryForm>
            <Field type="input" name="orderNo" props={{ placeholder: '订单号' }} />
          </QueryForm>
          <QueryList rowKey="id" columns={columns} />
        </QueryListScene>
      </Tabs.TabPane>
    </Tabs>
  );
})
```

**重要约束**：
- ⚠️ **每个 QueryListScene 必须独立创建 `actions` 和 `query`** — 不能共享同一个实例
- ⚠️ **禁止使用 `<QueryListScene {...props} />` 空透传** — 必须显式传入 `query` 和 `actions`
- 每个 Tab 内容必须使用 `<QueryListScene query={...} actions={...}>` 完整结构
- `type="ladder-card"` 是 TNTD 标准样式，不可修改
- ✅ 正确：`const App = TabsContainer(...)`
- ❌ 错误：先定义 App，再执行 `TabsContainer(App)`

### 3. 详情页面容器（PageContainer）

**适用场景**：多为二级页面，数据详情展示页面（如「用户详情」「订单详情」）

**完整示例**：
```jsx
const { PageContainer, Card, Descriptions, Tag } = tntd

// ✅ 正确：容器是 HOC，必须将返回值赋值给 App
const App = PageContainer((props) => {
  const data = {
    id: 1,
    name: '示例数据',
    status: 'active',
    createTime: '2024-01-01 12:00:00',
    description: '这是一条示例数据的详细描述'
  }

  return (
    <>
      <Card title="基本信息" style={{ marginBottom: 16 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={data.status === 'active' ? 'green' : 'red'}>
              {data.status === 'active' ? '启用' : '禁用'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>{data.description}</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
})
```

## TNTLayout 嵌套规则（强制执行）

所有容器必须与 TNTLayout 配合使用，嵌套规则如下：

```jsx
// 正确 ✅
<TNTLayout {...layoutProps}>
  <App />  {/* App 已被 TableContainer/TabsContainer/PageContainer 处理 */}
</TNTLayout>

// 错误 ❌
<TableContainer>
  <TNTLayout>{children}</TNTLayout>  {/* 禁止将 TNTLayout 嵌套在容器内部 */}
</TableContainer>
```

**核心规则**：
- TNTLayout 始终作为应用的根容器
- 容器（TableContainer/TabsContainer/PageContainer）包裹 App 组件
- TNTLayout 包裹容器处理后的 App 组件
