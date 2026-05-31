# tree-view 通用树视图组件

用于展示通用树形结构数据。

## 应用场景

- 面向任何需要“层级结构可视化”的场景：系统结构概览、业务配置树、组织/目录导航、依赖关系展示等
- 支持颜色标记、标签扩展、展开/收起、交互回调等能力，可灵活适配不同产品语义
- 可结合实际数据结构定制节点形态与交互，不限定具体页面或业务域

## API

### 方法

| 方法 | 说明 |
|------|------|
| init(params) | 初始化 |
| setData(data) | 设置数据 |
| getData() | 获取数据 |
| expand() | 展开所有 |
| packUp() | 收起所有 |

### init 参数

```javascript
{
    options: {
        onFinish: () => {},
        onChange: () => {},
        onSelect: (node) => {},
        onExpand: (node) => {}
    },
    styleOptions: {},
    refs: refObject,
    container: domElement,
    key: 'id'
}
```

### actions

```javascript
refs.current.actions.expand();  // 展开
refs.current.actions.packUp();  // 收起
```

## 数据结构

```javascript
const treeData = {
    id: 'node-1',
    name: '节点名称',
    componentType: 'typeA',
    color: '#1890ff',
    children: [{ id: 'node-2', name: '子节点', children: [] }]
}
```

## 组件

```javascript
const { TreeView } = treeView;
```

- 组件初始化与使用

```jsx

const Overview = ({ data, options, refs = {}, styleOptions, style }) => {
    const tree = useRef();
    const container = useRef();

    const formatData = (data) => {
        const loop = (node) => {
            if (node?.children?.length) {
                node.children.forEach((item) => loop(item));
            }
            node.color = NODE_TYPE_MAP?.[node?.componentType]?.color || '#c7d0d9';
        };
        loop(data);
        return data;
    };

    useEffect(() => {
        tree.current = TreeView();
        refs.current = tree.current;

        refs.current.actions = { packUp, expand };

        tree.current.init({
            options: {
                ...options,
                onFinish: () => setLoad(false),
                onChange: () => setLoad(true)
            },
            styleOptions,
            refs,
            container: container.current,
            key: 'componentId'
        });
    }, []);

    useEffect(() => {
        tree.current.setData(formatData(treeData));
    }, [treeData]);

    return <div ref={container} id="tree" style={style} />;
};
```



## 重要说明与注意事项
- **强制执行** 在 prd-html 生成的 HTML 原型中，treeData必须使用上述定义的 `treeData` 作为 TreeView 的参数数据源，这些 Mock 数据已经包含完整的数据结构，直接使用