# TntdAction 批量操作

用于批量操作场景的按钮组封装，根据选中数据数量自动显示/隐藏操作按钮。

## 基本用法

```jsx
const { TntdAction } = tntd

const [selectedRowKeys, setSelectedRowKeys] = useState([])
const isDisabled = selectedRowKeys.length === 0

<TntdAction title={`${selectedRowKeys.length}条数据`}>
  <Button disabled={isDisabled} check>批量删除</Button>
  <Button disabled={isDisabled} check>批量导出</Button>
  <Button exclude>设置</Button>
</TntdAction>
```

## API

### TntdAction

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| actionProps | 子节点判断展示的属性 key | string | 'disabled' |
| title | 展示文案(通常显示选中数量) | string | - |
| hidden | 是否隐藏(用于 Tabs 等场景) | boolean | false |
| afterClose | 关闭后的回调 | Function | - |
| width | 容器宽度 | number | 700 |
| getPopupContainer | 返回容器 | Function | document.body |

### 子元素属性

在 Button 上添加以下属性控制行为：

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| check | 是否为判断元素(根据 disabled 状态决定显示) | boolean | false |
| exclude | 是否排除当前节点(始终显示) | boolean | false |
| text | 额外增加的文本 | string | - |

## 使用场景

### 在 QueryListScene 中使用

```jsx
<QueryForm
  extraActions={
    <Button.Group>
      <TntdAction title={`${selectedRowKeys.length}条数据`}>
        <Button icon="cloud-upload" disabled={selectedRowKeys.length>0} check text="批量上线" />
        <Button icon="cloud-download" disabled={selectedRowKeys.length>0} check text="批量下线" />
        <Button icon="plus" exclude>新增</Button>
      </TntdAction>
    </Button.Group>
  }
>
  {/* 表单字段 */}
</QueryForm>

<QueryList
  rowSelection={{
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  }}
  columns={columns}
/>
```

## 使用规范（必须严格执行）

- 带 `check` 属性的按钮：根据 `disabled` 状态决定是否显示在弹窗中
- 一直显示的按钮：使用 `exclude` 属性

