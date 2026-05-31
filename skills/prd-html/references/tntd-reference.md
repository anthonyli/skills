# @tntd/reference 组件参考手册

> 用于展示和管理引用关系的业务组件库,包含了ReferenceDrawer/ReferenceBatchCheck/ReferenceCheck 这3个场景

## 组件引入方式参考如下

```javascript
const {
  ReferenceDrawer,       // 单项引用抽屉
  ReferenceBatchCheck,  // 批量引用抽屉
  ReferenceCheck        // 单项引用校验（Promise）
} = tntdReference;
```

## 组件使用场景

### 1. 引用关系查看 - ReferenceDrawer
```javascript
const { ReferenceDrawer } = tntdReference;
const { Button } = tntd;
const Demo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ReferenceDrawer
          title="查看关联引用"
          visible={visible}
          onClose={() => setVisible(false)}
          fetchReference={() => {
              return new Promise((resolve) => {
                  resolve({
                      code: 200,
                      message: '成功',
                      success: true,
                      data: [
                          {
                              type: 'FUNCTION_VERSION_ONLINE',
                              title: '被引用函数[运行区]',
                              goName: 'code',
                              columns: [
                                  {
                                  title: '函数名称',
                                  dataIndex: 'name',
                                  },
                                  {
                                  title: '函数标识',
                                  dataIndex: 'code',
                                  }
                              ],
                              rows: [
                                  {
                                  name: '额度计算_利润率',
                                  code: 'F4796386976',
                                  goLink: '/noah/formula',
                                  }
                              ],
                          }
                      ]
                  });
              });
          }}
      />
      <Button onClick={() => setVisible(true)}>
        查看引用
      </Button>
    </>
  )
}
```

### 2. 单个删除引用校验 - ReferenceCheck
```javascript
const {ReferenceCheck} = tntdReference;
const { Button } = tntd;
const handleDelete = (record) => {
  ReferenceCheck({
    okText: '确定删除',
    rq: () => {
      return new Promise((resolve) => {
        resolve({
          success: true,
          data: {
            type: 'WEAK',
            result: [
              {
                type: 'POLICY_VERSION_EDIT',
                title: 'Referenced policy version [edit area]',
                tips: 'Note that the flow mode strategy judgment is reflected in the process judgment Adapted fields',
                goName: 'code',
                columns: [
                  {
                    title: 'Policy Name',
                    dataIndex: 'policyEditName',
                  },
                  {
                    title: 'Policy Identification',
                    dataIndex: 'code',
                  }
                ],
                rows: [
                  {
                    policyEditName: 'lduffy_flow_policy',
                    code: 'lduffy_flow_policy',
                    goLink: '/noah/policyManage',
                  }
                ],
              },
            ],
          },
        });
      });
    },
    appList: [],
  })
  .then(() => {
    message.success('删除成功');
  })
  .catch(() => {
    // 强引用，不做处理
  });
};
<Icon type="delete" onClick={handleDelete}>
```

### 3. 批量删除引用校验 - ReferenceBatchCheck
以可折叠面板的形式展示多条数据的引用关系。
```jsx
const {ReferenceBatchCheck} = tntdReference;
const { Icon } = tntd;
const batchHandleDelete = (records) => {
  ReferenceBatchCheck({
      okText: '确定删除',
      cancelText: '关闭',
      rq: () => {
        return new Promise((resolve) => {
          resolve({
            code: '200',
            success: true,
            message: '执行成功',
            data: {
              type: 'WEAK',
              typeName: '强引用',
              message: '存在强引用关系，禁止操作',
              result: [
                {
                  componentId: '9a735d5e1e974668bd5b4dbca83e7c34',
                  componentName: '测试11111',
                  componentCode: 'rm50r5kwnm',
                  type: 'STRONG',
                  typeName: '强引用',
                  result: [
                    {
                      type: 'INDEX_OFFLINE_VERSION_ONLINE',
                      title: '被引用离线指标[运行区]',
                      goName: 'code',
                      columns: [
                        { title: '指标名称', dataIndex: 'name' },
                        { title: '指标标识', dataIndex: 'code' }
                      ],
                      rows: [
                        {
                          name: '公式指标_gkukx',
                          code: 'pyveo4p110',
                          goLink: '/index/offIndexManage',
                          referenceCheckTypeName: '内部强引用',
                        }
                      ],
                    }
                  ],
                },
              ],
            },
          });
        });
      },
      appList: [],
      onChange: (d) => {
        console.log('d', d);
      },
    }).then(res=>{
        console.log("res",res)
    });
}
<Icon type="delete" onClick={batchHandleDelete}>
```

