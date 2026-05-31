# AssignModal 授权弹窗组件

## 组件简介
用于管理机构、应用（渠道）、用户授权的复杂业务组件。

## 组件引入
```javascript
const {AssignModal} = assignModal
```

## 组件使用

```javascript
function App() {
  const [visible, setVisible] = React.useState(false);
  const orgList = [{ uuid: 'org-1', code: 'ROOT', name: '总公司', children: [] }];
  const appList = [{ uuid: 'app-1', name: 'APP1', value: 'APP1', label: '应用1' }];
  const dataItem = { orgCode: 'ROOT', appCode: 'APP1', orgCodes: ['ROOT'], appCodes: ['APP1'] };

  const handleSubmit = (data) => {
    console.log(data.checkData);
    setVisible(false);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>配置权限</Button>
      <AssignModal
        visible={visible}
        title="权限配置"
        orgList={orgList}
        appList={appList}
        dataItem={dataItem}
        onSubmit={handleSubmit}
        close={() => setVisible(false)}
      />
    </>
  );
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visible | 弹窗是否可见 | boolean | false |
| disabled | 查看模式 | boolean | false |
| title | 弹窗标题 | string | - |
| orgList | 机构列表 | Array | [] |
| appList | 应用列表 | Array | [] |
| userList | 用户列表 | Array | [] |
| dataItem | 授权数据项 | object | - |
| showUser | 显示用户面板 | boolean | false |
| onSubmit | 确定回调 | function | - |
| close | 关闭回调 | function | - |
| lang | 语言 cn/en | string | 'cn' |

## 数据结构

### dataItem

```javascript
{
  orgCode: 'ROOT',      // 所属机构
  appCode: 'APP1',     // 所属应用
  orgCodes: ['ROOT'],   // 已授权机构
  appCodes: ['APP1'],  // 已授权应用
}
```

### onSubmit 返回

```javascript
{
  checkedKeys: ['ROOT'],      // 机构编码
  appKeys: ['APP1'],         // 应用编码
  orgCheckAll: false,        // 是否全局授权
  checkData: {
    orgs: ['ROOT'],          // 具体机构
    apps: ['APP1'],         // 具体应用
  }
}
```


## 重要说明与注意事项
- **强制执行** 在 prd-html 生成的 HTML 原型中，必须使用上述定义的 `orgList`、`appList`、`dataItem` 作为 AssignModal 的参数数据源，这些 Mock 数据已经包含完整的数据结构，直接使用