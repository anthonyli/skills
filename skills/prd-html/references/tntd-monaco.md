# tntd-monaco Monaco 编辑器组件

基于 Monaco Editor 的增强型代码编辑器。

## 应用场景

- 面向“结构化/脚本内容编辑与对比”的通用需求：公式、规则、代码片段、配置文本等
- 支持编辑与只读对比、中文编码、主题与语言扩展，可按产品语义自由组合使用
- 可通过选项灵活配置路径与布局，适配多种页面形态与加载策略（如预加载）

## 组件

```javascript
const { default:BaseMonacoEditor, FormulaEditor, DiffEditor } = TntdMonaco;
```

- **BaseMonacoEditor** - 基础编辑器
- **FormulaEditor** - 公式编辑器（支持中文编码）
- **DiffEditor** - 差异对比编辑器

## 基础用法

### BaseMonacoEditor

```jsx
<BaseMonacoEditor
    defaultValue="// 代码"
    language="java"
    height={400}
    onChange={(code) => console.log(code)}
    options={{ path: 'https://gw.alipayobjects.com/os/lib/monaco-editor/0.47.0/min/vs', automaticLayout: true }}
/>
```

### DiffEditor

```jsx
<DiffEditor
    language="python"
    original={`def hello():\n    print("Hello")`}
    modified={`def hello():\n    print("Hello World")`}
    readOnly={true}
    height={400}
/>
```

## API

### BaseMonacoEditor Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| defaultValue | 默认值 | string | - |
| language | 语言 | string | 'javascript' |
| height | 高度 | number | 400 |
| readOnly | 只读 | boolean | false |
| theme | 主题 | string | 'vs' |
| options | Monaco 配置 | object | - |
| onChange | 变化回调 | function | - |

### FormulaEditor Props

| 参数 | 说明 | 类型 |
|------|------|------|
| ready | 字段列表就绪 | boolean |
| code | 中文代码 | string |
| fieldList | 字段列表 | array |
| tagList | 标签列表 | array |
| onChange | 变化回调 | function |

### DiffEditor Props

| 参数 | 说明 | 类型 |
|------|------|------|
| isDiff | 差异模式 | boolean |
| original | 原始值 | string |
| modified | 修改值 | string |
| language | 语言 | string |
| readOnly | 只读 | boolean |

