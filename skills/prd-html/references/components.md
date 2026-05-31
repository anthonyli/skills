# TNTD 组件

## 组件分类

### 业务组件

面向企业级业务场景的专用组件：

#### TntdLayout
- 完整的布局系统，包含头部、侧边栏和内容区域
- 支持菜单分组和嵌套导航
- 菜单项支持图标

#### TntdIcon
- TNTD 自定义图标集
- 基于类型的图标选择
- 可搜索的图标库

#### TntdModal
- 具有增强功能的模态对话框
- 可自定义头部、内容和底部

#### TntdSelect
- 增强的选择器组件
- 支持虚拟滚动大数据集

#### TntdVirtualTree
- 大型层级数据的虚拟化树组件
- 高效渲染数千个节点

#### TntdVirtualTreeSelect
- 带虚拟滚动的树选择器
- 针对大数据集优化

#### PageContainer
- 页面布局容器组件
- 面包屑支持
- 统一的页面结构

#### PageLoading
- 页面级加载指示器
- 全屏或容器加载状态

#### LoadingButton
- 内置加载状态的按钮
- 加载期间禁用

#### TabsContainer
- 选项卡内容容器
- 统一的选项卡行为

#### ColorPicker
- 颜色选择组件
- 预设颜色和自定义颜色选择

#### Columns
- 列布局组件
- 响应式列管理

#### Label
- 表单字段标签组件
- 必填项指示器

#### Img
- 增强的图片组件
- 加载状态、错误处理

#### Title
- 标题组件，具有一致的样式
- 多种尺寸变体

#### Exception
- 异常页面组件
- 404、403、500 错误状态

#### Handle
- 拖拽手柄组件
- 用于可拖拽元素

#### TntdAction
- 操作组件
- 多种操作类型

#### TntdReference
- 引用选择组件
- 关联数据选择

#### Ellipsis
- 文本溢出处理
- 长文本自动省略

#### DevelopmentLogin
- 开发环境登录组件

### 标准组件

#### 数据展示

**Badge**
- 状态徽章组件
- 数量和标签支持

**Avatar**
- 用户头像组件
- 多种变体

**Calendar**
- 日历组件
- 日期选择和展示

**Card**
- 卡片容器
- 头部、主体、底部区域

**Carousel**
- 图片/内容轮播
- 导航控件

**Collapse**
- 可折叠面板
- 手风琴行为

**Comment**
- 评论展示组件
- 嵌套评论支持

**Descriptions**
- 描述列表
- 键值对展示

**Empty**
- 空状态组件
- 自定义插图

**List**
- 列表组件
- 多种展示模式

**Statistic**
- 统计展示
- 数值数据可视化

**Timeline**
- 时间线组件
- 事件顺序展示

**Tree**
- 树组件
- 层级数据展示

**Tag**
- 标签组件
- 多种颜色变体

**Popover**
- 气泡卡片内容
- 触发式展示

**Segmented**
- 分段控制器
- 选项选择

**Tabs**
- 选项卡组件
- 内容切换

**Tooltip**
- 提示组件
- 悬停触发提示

#### 数据录入

**AutoComplete**
- 自动完成输入
- 基于建议的选择

**Cascader**
- 级联选择
- 多级选择

**Checkbox**
- 复选框组件
- 分组选择

**DatePicker**
- 日期选择器
- 单个、范围、多个选择

**Form**
- 表单组件
- 验证和布局

**Input**
- 文本输入
- 多种变体

**InputNumber**
- 数字输入
- 步进控制

**Mentions**
- 提及组件
- @用户语法支持

**Radio**
- 单选按钮
- 单个选择

**Rate**
- 评分组件
- 星级评分

**Select**
- 选择器组件
- 下拉选择

**Slider**
- 滑动器组件
- 范围选择

**Switch**
- 开关切换
- 开启/关闭状态

**TimePicker**
- 时间选择器
- 时间选择

**Transfer**
- 穿梭框组件
- 在列表之间移动项目

**TreeSelect**
- 树选择器组件
- 层级选择

**Upload**
- 文件上传组件
- 拖拽支持

#### 反馈

**Alert**
- 警告提示组件
- 多种严重程度级别

**Drawer**
- 抽屉组件
- 滑入面板

**Message**
- 消息组件
- 吐司通知

**Modal**
- 模态框组件
- 对话框遮罩

**Notification**
- 通知组件
- 持续性通知

**Popconfirm**
- 确认气泡弹窗
- 操作确认

**Progress**
- 进度条组件
- 多种变体

**Result**
- 结果组件
- 成功/错误/空状态

**Skeleton**
- 骨架屏加载
- 内容占位

**Spin**
- 加载 spinner
- 多种变体

#### 导航

**Affix**
- 固钉组件
- 粘性定位

**Breadcrumb**
- 面包屑导航
- 路径展示

**Dropdown**
- 下拉菜单
- 操作菜单

**Menu**
- 菜单组件
- 多种模式

**PageHeader**
- 页面头部组件
- 标题和操作

**Pagination**
- 分页组件
- 页面导航

**Steps**
- 步骤条组件
- 进度指示器

#### 布局

**Grid**
- 栅格系统
- 响应式布局

**Layout**
- 布局组件
- 头部、内容、底部

#### 通用

**Icon**
- 图标组件
- Ant Design 图标

**Typography**
- 排版组件
- 文本样式

#### 其他

**BackTop**
- 返回顶部按钮
- 滚动到顶部

**ConfigProvider**
- 全局配置
- 主题和语言

**Divider**
- 分割线组件
- 视觉分隔

## 导入语句

```javascript
import {
  // 业务组件
  TntdIcon,
  TntdModal,
  TntdSelect,
  PageContainer,
  PageLoading,
  LoadingButton,
  TabsContainer,

  // 标准组件
  Button,
  Form,
  Input,
  Table,
  Card,
  Modal,
  // ... 其他组件
} from 'tntd'
```

## 配置

```javascript
import { ConfigProvider, renderEmpty } from 'tntd'
import zhCN from 'tntd/es/locale/zh_CN'

const App = () => {
  return (
    <ConfigProvider locale={zhCN} renderEmpty={renderEmpty}>
      {/* 应用内容 */}
    </ConfigProvider>
  )
}
```

## 主题定制

```javascript
// webpack.config.js
{
  loader: "less-loader",
  options: {
    javascriptEnabled: true,
    modifyVars: {
      hack: "true; @import \"~tntd/themes/default/variables.less\";"
    }
  }
}
```

## Babel 配置

```javascript
// .babelrc
[
  "import",
  {
    "libraryName": "tntd",
    "libraryDirectory": "es"
  },
  "tntd"
]
```
