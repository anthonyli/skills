# TntdVirtualTreeSelect 机构下拉框组件

## 组件简介

`TntdVirtualTreeSelect` 是 tntd 组件库提供的树状下拉框的组件，如果应用场景为机构下拉框的时候需要把`isOrg` 和 `showPrefixIcon`属性的值设置为true(默认为false)。

## 组件引入

```javascript
const { TntdVirtualTreeSelect } = tntd;
```

## 基础使用

```javascript
<TntdVirtualTreeSelect
    isOrg
    showPrefixIcon
    placeholder="选择机构"
    searchPlaceholder="机构名称"
    showSearch
    value={value}
    treeData={[
        {
            title: "总公司",
            value: "org_001",
            code: "org_001",
            children: [
                {
                    title: "北京分公司",
                    value: "org_002",
                    code: "org_002",
                    children: [],
                },
                {
                    title: "上海分公司",
                    value: "org_003",
                    code: "org_003",
                    children: [],
                },
            ],
        },
    ]}
    treeDefaultExpandAll
    onChange={(val) => setValue(val)}
    style={{ width: "100%" }}
    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
/>
```

## 完整 Props 列表

| 属性                   | 类型          | 说明             | 默认值 |
| ---------------------- | ------------- | ---------------- | ------ |
| `isOrg`                | boolean       | 机构选择模式     | false  |
| `showPrefixIcon`       | boolean       | 显示前缀图标     | false  |
| `treeData`             | array         | 树形数据源       | []     |
| `value`                | string/number | 当前选中的值     | -      |
| `onChange`             | function      | 值变化回调       | -      |
| `showSearch`           | boolean       | 显示搜索框       | false  |
| `searchPlaceholder`    | string        | 搜索框占位文本   | -      |
| `treeDefaultExpandAll` | boolean       | 默认展开所有节点 | false  |
| `disabled`             | boolean       | 是否禁用         | false  |
| `allowClear`           | boolean       | 显示清除按钮     | false  |
| `placeholder`          | string        | 占位文本         | -      |
| `style`                | object        | 容器样式         | -      |
| `dropdownStyle`        | object        | 下拉菜单样式     | -      |

## 数据格式

```javascript
const treeData = [
    {
        title: "节点名称", // 显示文本
        value: "node_001", // 节点值
        code: "node_001", // 节点编码
        children: [
            {
                title: "子节点名称1",
                value: "node_children_001",
                code: "node_children_001",
                children: [
                    {
                        title: "子节点名称2",
                        value: "node_children_002",
                        code: "node_children_002",
                    }
                ],
            }
        ], // 子节点
    },
];
```

## 注意事项

1. **机构场景** `isOrg` 和 `showPrefixIcon` 的值应设置为true
2. 大数据量时建议设置 `dropdownStyle.maxHeight`
