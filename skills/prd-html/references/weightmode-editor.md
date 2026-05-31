# WeightModeEditor 权重模式编辑器组件

## 概述
用于配置风险阈值（分数段 → 处置方式）的业务组件，支持多行区间编辑、增删行、禁用只读等场景。


## 组件引入方式参考如下

```javascript
const WeightModeEditor = weightModeEditor
```


## 实际使用案例

### 表单中编辑模式

```jsx
<TntdForm.Item label="风险阈值" required>
  <WeightModeEditor
    className="add-drawer"
    value={formData.riskThresholds}
    onChange={(val) => setFormData({ ...formData, riskThresholds: val })}
    dealTypeList={dealTypeList}
    disabled={modalType === 'copyRuleSet'}
    isEdit
  />
</TntdForm.Item>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 阈值数组，每项含区间和处置字段 | Array | - |
| onChange | 值变化回调，参数为新数组 | function | - |
| disabled | 是否禁用（只读模式） | boolean | false |
| disabledFirst | 第一行最小值是否固定为 0 | boolean | true |
| dealTypeList | 处置方式列表，传入时渲染 Select，否则渲染 InputNumber | Array | - |
| fieldNames | 自定义 value 内字段名映射 | object | `{min,max,dealType}` |
| matchPlaceholder | 各输入框 placeholder | object | - |
| tips | 顶部提示文案 | string | 内置 I18N 文案 |
| className | 外层容器 className | string | - |
| page | 传 `'basicPage'` 时添加详情页样式 | string | - |

### value 数据结构

```javascript
// disabledFirst=true（默认），第一行 min 固定为 0
[
  { max: 60, dealType: 'pass' },
  { max: 80, dealType: 'review' },
  { max: null, dealType: 'reject' }
]

// disabledFirst=false，每行都有 min 字段
[
  { min: 0, max: 60, dealType: 'pass' },
  { min: 60, max: 80, dealType: 'review' }
]
```

### dealTypeList 数据结构

```javascript
[
  { name: 'pass',   dName: '通过' },
  { name: 'review', dName: '人工审核' },
  { name: 'reject', dName: '拒绝' }
]
```

### fieldNames 数据结构

```javascript
// 默认值
{ min: 'min', max: 'max', dealType: 'dealType' }

// 自定义示例
{ min: 'scoreMin', max: 'scoreMax', dealType: 'action' }
```

## 交互说明

- 每行右侧有 **+** / **-** 图标，最多支持 10 行，最少保留 1 行
- `disabled=true` 时隐藏操作图标，所有输入只读
- `disabledFirst=true` 时第一行区间左端固定显示 0，不可编辑
- 区间显示格式：`[左端 - 右端)`，采用左闭右开区间
