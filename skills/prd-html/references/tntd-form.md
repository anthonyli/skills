# TntdForm 表单

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。完全兼容 Ant Design 4.x Form API。

## 基本用法

```jsx
const { TntdForm, Input, Select, Button } = tntd

const Demo = () => {
  const [form] = TntdForm.useForm()

  const onFinish = (values) => {
    console.log('表单值：', values)
  }

  return (
    <TntdForm
      form={form}
      onFinish={onFinish}
      initialValues={{ name: '张三' }}
    >
      <TntdForm.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input />
      </TntdForm.Item>
      <TntdForm.Item name="gender" label="性别" rules={[{ required: true }]}>
        <Select options={[{ label: '男', value: 'male' }, { label: '女', value: 'female' }]} />
      </TntdForm.Item>
      <TntdForm.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" htmlType="submit">提交</Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </TntdForm.Item>
    </TntdForm>
  )
}
```

## 核心 API

### TntdForm

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| form | 表单实例，通过 TntdForm.useForm() 创建 | FormInstance | - |
| initialValues | 表单初始值 | object | - |
| labelCol | label 标签布局 | object | - |
| wrapperCol | 表单控件布局 | object | - |
| layout | 表单布局 | 'horizontal' \| 'vertical' \| 'inline' | 'horizontal' |
| onFinish | 提交表单且验证通过后的回调 | Function(values) | - |
| onFinishFailed | 提交表单且验证失败后的回调 | Function({ values, errorFields }) | - |
| onValuesChange | 字段值更新时触发回调 | Function(changedValues, allValues) | - |
| disabled | 设置表单组件禁用 | boolean | false |
| validateMessages | 验证提示模板 | object | - |

### TntdForm.Item

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名，支持数组 | string \| string[] | - |
| label | 标签文本 | ReactNode | - |
| rules | 校验规则 | Rule[] | - |
| dependencies | 依赖字段，依赖字段更新时会触发校验 | string[] | - |
| valuePropName | 子节点的值属性（Switch/Checkbox 为 'checked'） | string | 'value' |
| initialValue | 字段初始值 | any | - |
| required | 必填样式设置 | boolean | false |
| hidden | 是否隐藏字段 | boolean | false |
| tooltip | 配置提示信息 | ReactNode | - |
| validateTrigger | 设置字段校验的时机 | string \| string[] | 'onChange' |

### TntdForm.List

用于动态表单项管理。

| 属性 | 说明 | 类型 |
|------|------|------|
| name | 字段名 | string \| string[] |
| children | 渲染函数 | (fields, operation, meta) => ReactNode |
| initialValue | 设置子元素默认值 | any[] |

```jsx
<TntdForm.List name="users">
  {(fields, { add, remove }) => (
    <>
      {fields.map((field) => (
        <TntdForm.Item {...field} key={field.key}>
          <Input />
        </TntdForm.Item>
      ))}
      <Button onClick={() => add()}>添加</Button>
    </>
  )}
</TntdForm.List>
```

## Form 实例方法

```js
const [form] = TntdForm.useForm()

// 常用方法
form.setFieldsValue({ name: '张三' })     // 设置表单值
form.getFieldsValue()                     // 获取所有字段值
form.getFieldValue('name')                // 获取单个字段值
form.resetFields()                        // 重置表单
form.validateFields()                     // 触发表单验证
form.setFields([{ name: 'name', errors: ['错误'] }])  // 设置字段状态
form.scrollToField('name')                // 滚动到指定字段
```

## 常用校验规则

```js
rules={[
  { required: true, message: '请输入' },
  { type: 'email', message: '请输入正确的邮箱' },
  { min: 6, max: 20, message: '长度在 6 到 20 个字符' },
  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
  { 
    validator: (_, value) => 
      value > 0 ? Promise.resolve() : Promise.reject('必须大于0') 
  }
]}
```

## Hooks

### TntdForm.useForm

创建 Form 实例，用于管理所有数据状态。

```jsx
const [form] = TntdForm.useForm()
```

### TntdForm.useWatch

用于直接获取 form 中字段对应的值。

```jsx
const userName = TntdForm.useWatch('username', form)
```

### TntdForm.Item.useStatus

获取当前 TntdForm.Item 的校验状态。

```jsx
const { status, errors, warnings } = TntdForm.Item.useStatus()
```

## 常见场景

### 动态表单项

使用 TntdForm.List 实现动态增减表单项。

### 表单联动

通过 `dependencies` 实现字段间联动校验。

```jsx
<TntdForm.Item name="password" rules={[{ required: true }]}>
  <Input.Password />
</TntdForm.Item>
<TntdForm.Item
  name="confirm"
  dependencies={['password']}
  rules={[
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
        return Promise.reject('两次密码不一致')
      },
    }),
  ]}
>
  <Input.Password />
</TntdForm.Item>
```

## 注意事项

- Switch、Checkbox 需要设置 `valuePropName="checked"`
- 设置了 `name` 的 TntdForm.Item 子组件会转为受控模式，`defaultValue` 不生效
- 使用 TntdForm 的 `initialValues` 设置默认值，而非 Item 的 `initialValue`
- `setFieldsValue` 不会触发 `onValuesChange`，仅用户交互才会触发
