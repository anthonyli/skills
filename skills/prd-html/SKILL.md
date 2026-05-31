---
name: prd-html
description: "此技能用于使用 TNTD 设计系统生成可交互的 HTML 原型文件。"
---

# TNTD HTML 原型生成器

## 工作流程（强制执行）

### 步骤 1：识别页面场景
根据用户描述识别页面类型：
- **查询列表**：包含「列表/查询/表格/数据」等关键词
- **多 Tabs 列表**：包含「切换/Tabs/多状态/多个列表」等关键词
- **详情页**：包含「详情/查看/展示/基本信息」等关键词
- **图表**：包含「折线/饼/柱状图」等关键词
- **多菜单/多路由页面**：用户描述中出现 2 个及以上独立菜单功能、路由页面或侧边栏入口（如「两个菜单功能」「菜单 A 和菜单 B」「路由 /a 和 /b」「分别做 xxx、yyy」）时，必须拆成多个 HTML 文件，每个菜单功能对应一个独立 HTML 页面
- **可点击标注原型**：用户提到「标注/注释/说明/讲解/批注/产品说明/交互说明/annotation」时，必须为关键区域生成标注；只给标注序号使用亮粉色高亮，不给业务区域添加边框，标注内容默认隐藏，点击序号才显示说明


### 步骤 2：选择容器（强制决策树）
先判断是否为多菜单/多路由页面；如果是，必须为每个菜单功能分别执行以下容器选择。按以下顺序判断，命中即停止：
```
用户请求 →
├─ 包含「详情/查看/展示」→ PageContainer → 读取 references/tntd-container.md
├─ 包含「切换/多状态/Tabs/多个列表」→ TabsContainer → 读取 references/tntd-container.md
└─ 默认（查询列表/表格/数据列表）→ TableContainer → 读取 references/tntd-container.md
```

### 步骤 3：读取参考文档（强制）
生成原型时，必须根据使用的组件自动读取对应的参考文档：
- **必须读取**：`references/tntd-layout.md` — 获取 `MOCK_MENUS`、`MOCK_USER_INFO`、`MOCK_APP_LIST`、`MOCK_ORG_LIST` 数据结构
- **必须读取**：`references/tntd-container.md` — 获取容器组件使用规范
- **必须读取**：`references/query-list-scene.md` — 获取 QueryListScene 完整结构、query 方法格式、columns 配置、HandleIcon 操作列规范
- **按需读取**：其他组件参考文档

### 步骤 4：生成 Mock 数据（强制）
**严禁使用空数据或占位符数据**
- 从参考文档中提取完整数据结构
- 严格遵循字段名称、类型、嵌套层级
- 根据具体业务场景填充合理的示例数据

### 步骤 5：构建 App 组件
1. 从 `assets/template.html` 读取基础模板结构
2. 用用户请求的页面逻辑替换 `App` 组件；多菜单/多路由场景下，每个 HTML 文件只实现当前菜单对应的 `App` 组件
3. 如需添加页面特定 CSS 添加到 `<style>` 块
4. 如果用户要求标注，必须使用「prototype-html 标注规范」为 2-6 个关键区域添加标注

### 步骤 6：输出 HTML
根据页面数量输出完整 HTML：
- **单页面**：将完整 HTML 写入用户指定的 `.html` 路径
- **多菜单/多路由页面**：必须生成多个 `.html` 文件，每个菜单功能一个文件；不得把多个独立菜单功能合并成单个 HTML 内部 Tabs 或条件渲染页面
- **命名规则**：
  - 用户明确给出路由/文件名时，优先使用用户给出的路径或文件名
  - 用户只给出输出目录时，在该目录下按菜单功能生成语义化文件名，如 `customer-list.html`、`risk-rule.html`
  - 用户给出单个 HTML 文件路径但需求包含多个菜单功能时，第一个菜单使用用户给出的文件名，其余菜单写入同目录下的语义化文件名
- **菜单跳转规则**：
  - 所有 HTML 文件必须包含一致的 `MOCK_MENUS`
  - `MOCK_MENUS.children[].path` 必须指向对应 HTML 文件的可访问路径；本地原型必须优先使用同目录相对路径，如 `./customer-list.html`，保证产品经理双击 HTML 或用 `file://` 打开也能跳转
  - 菜单点击后应通过 TNTLayout 的菜单导航切换到对应 HTML 文件；不要只在当前 React 状态中切换内容
  - 多 HTML 本地原型必须增加当前菜单状态同步：为当前页面声明 `CURRENT_MENU_FILE` / `CURRENT_MENU_GROUP` / `CURRENT_MENU_PATH`，传入 `location={{ pathname: CURRENT_MENU_PATH, search: '', hash: '' }}`；渲染后必须调用 `syncCurrentMenuState(CURRENT_MENU_FILE, CURRENT_MENU_GROUP)`，如果当前菜单在父级下面，先自动展开父级菜单，再给当前 `li.ant-menu-item` 添加 `ant-menu-item-selected`
  - 多 HTML 本地原型必须增加捕获期点击处理：仅拦截本组 `.html` 菜单链接，使用 `new URL(fileName, window.location.href).href` 跳转，兼容 `file://` 和本地 HTTP，避免 TNTLayout 静态原型中跳到 `/undefined`
  - 菜单选中态必须显式使用主色背景 `#126bfb` 和白色文字；白字规则要覆盖到选中 `li.ant-menu-item`、内部 `a` 和所有子元素；父级菜单标题加粗；hover 其它未跳转菜单时不得改变当前选中菜单的蓝底白字状态

### 步骤 7：自检验证（强制执行）
生成完成后，必须逐项验证：
- [ ] App = ContainerComponent((props) => {...}) 赋值正确
- [ ] actions 在 App 组件内部通过 createActions() 创建
- [ ] query 方法返回 {current, pageSize, total, data} 四个字段
- [ ] data 数组包含 5-10 条有意义的 mock 数据
- [ ] columns 中的 dataIndex 与 data 对象的字段一一对应
- [ ] 操作列使用 HandleIcon > HandleIcon.Item 结构
- [ ] 删除操作使用 Popconfirm 二次确认 + 红色图标
- [ ] TNTLayout 在最外层，Container 包裹 App
- [ ] 多菜单/多路由场景：已生成多个 HTML 文件，每个菜单功能一个文件
- [ ] 多菜单/多路由场景：所有 HTML 文件中的 MOCK_MENUS 完全一致
- [ ] 多菜单/多路由场景：MOCK_MENUS 的每个叶子菜单 path 指向对应 HTML 文件的相对路径或用户指定路径
- [ ] 多菜单/多路由场景：点击侧边菜单会访问另一个 HTML 文件，而不是只切换当前文件内的状态
- [ ] 多菜单/多路由场景：无需启动服务，直接双击 HTML / `file://` 打开时菜单仍可跳转
- [ ] 多菜单/多路由场景：当前菜单父级已展开且标题加粗，当前菜单项使用 `#126bfb` 蓝底 + 白字
- [ ] 多菜单/多路由场景：hover 其它菜单但未跳转时，当前选中菜单仍保持蓝底白字
- [ ] QueryForm 中 Field 不设置 title
- [ ] Field type 严格使用 `input/search/number/select/selectInput/date/dateRange` 原始枚举；日期范围必须是 `dateRange`，严禁 `date-range`
- [ ] QueryListScene 不设置 title
- [ ] TabsContainer 场景：每个 Tab 独立创建 actions 和 query
- [ ] 标注场景：只给标注序号使用亮粉色高亮，不给业务区域添加边框、描边或背景高亮
- [ ] 标注场景：标注内容默认不显示，必须鼠标移入标注区域后点击推出的标注按钮才出现
- [ ] 标注场景：再次点击同一区域或点击空白处可关闭标注
- [ ] 标注场景：标注按钮的点击事件与页面原有点击事件隔离，不破坏原按钮、表格行、表单、弹窗、抽屉交互

**图表页面额外验证项**：
- [ ] 检测到图表关键词时已读取 `references/echarts5.md`
- [ ] 图表容器使用了 `useRef` 和正确的 `useEffect` 结构
- [ ] **图表容器宽度不超过100%**（严禁使用 `width: '120%'` 等超过100%的值）
- [ ] **使用100ms定时器延迟绘制图表**（确保DOM完全渲染后再执行chart.setOption）
- [ ] 正确处理定时器清理（clearTimeout）避免内存泄漏
- [ ] 数据结构严格符合echarts5.md规范（name/value/percentage等字段）
- [ ] 使用了标准颜色方案（RISK_COLORS/STANDARD_COLORS）
- [ ] 图表配置参数未被修改（UI设计稿100%还原）
- [ ] 添加了响应式处理（resize事件）和资源清理（dispose）
- [ ] 图表交互效果正常（悬停、图例点击等）
- [ ] ECharts CDN资源已正确引入（5.4.3版本）

## HTML 文件结构（强制执行）

每个生成的原型遵循以下结构：`TNTLayout -> 容器 -> App`

### 容器使用规范（强制执行）

**核心规则**：容器是 HOC（高阶组件），必须将返回值赋值给 App

#### TableContainer（单表格查询页面）
```jsx
const App = TableContainer((props) => {
  const actions = createActions();
  const query = ({ current, pageSize }) => Promise.resolve({ current, pageSize, total: 25, data: [...] });
  return <QueryListScene query={query} actions={actions}>...</QueryListScene>;
});
// ✅ 正确：App = TableContainer(...)
// ❌ 错误：TableContainer(App) // 单独执行不赋值
```

#### TabsContainer（多 Tabs/可切换列表页面）
```jsx
const App = TabsContainer((props) => {
  // ⚠️ 每个 Tab 独立创建 actions 和 query，禁止共享
  return (
    <Tabs type="ladder-card" defaultActiveKey="1">
      <Tabs.TabPane tab="全部" key="1">
        <QueryListScene query={createQuery('all')} actions={createActions()}>
          <QueryForm><Field type="input" name="name" /></QueryForm>
          <QueryList rowKey="id" columns={columns} />
        </QueryListScene>
      </Tabs.TabPane>
      {/* 更多 TabPane... */}
    </Tabs>
  );
});
// 完整示例见 references/tntd-container.md TabsContainer 部分
```

#### PageContainer（详情页面）
```jsx
const App = PageContainer((props) => {
  return (
    <Card title="基本信息">
      <Descriptions bordered column={2}>...</Descriptions>
    </Card>
  );
});
```

**渲染结构**：
```jsx
const App = TableContainer((props) => { ... })
// 或 TabsContainer / PageContainer

ReactDOM.createRoot(document.getElementById('root')).render(
  <TNTLayout {...layoutProps}>
    <App />
  </TNTLayout>
)
```

**输出**：
- 单页面需求：输出单个自包含的 `.html` 文件。
- 多菜单/多路由需求：输出多个自包含的 `.html` 文件，并通过一致的 `MOCK_MENUS` 路径互相跳转访问。

### 多菜单/多路由输出规范（强制执行）

当用户表达的是 2 个及以上独立菜单功能时，按「一个菜单功能 = 一个 HTML 文件」处理：

```js
const MOCK_MENUS = [
  {
    id: 'business-platform',
    groupIcon: 'yingyong',
    groupName: '业务管理',
    code: 'BusinessPlatform',
    enName: 'Business Platform',
    children: [
      {
        menuName: '客户管理',
        menuUuid: 'customer-list-menu',
        code: 'CustomerList',
        path: './customer-list.html',
        enName: 'Customer List',
      },
      {
        menuName: '风险规则',
        menuUuid: 'risk-rule-menu',
        code: 'RiskRule',
        path: './risk-rule.html',
        enName: 'Risk Rule',
      }
    ]
  }
]
```

生成文件：
- `customer-list.html`：只实现「客户管理」页面的 App
- `risk-rule.html`：只实现「风险规则」页面的 App

两个文件都必须复制同一份 `MOCK_MENUS`，且 `path` 指向对应 HTML。不要生成一个 `index.html` 后在内部用 `activeMenu`、`useState`、`Tabs` 或条件渲染模拟路由切换；侧边菜单必须能打开另一个 HTML 文件。

多 HTML 原型必须可直接文件访问：不要要求用户启动本地服务。生成的菜单路径优先写成 `./xxx.html`，并在每个 HTML 中加入以下等价逻辑：

```jsx
const CURRENT_MENU_FILE = 'customer-list.html'
const CURRENT_MENU_GROUP = '业务管理'
const CURRENT_MENU_PATH = './' + CURRENT_MENU_FILE
const CURRENT_LOCATION = { pathname: CURRENT_MENU_PATH, search: '', hash: '' }

ReactDOM.createRoot(document.getElementById('root')).render(
  <TNTLayout location={CURRENT_LOCATION} menus={MOCK_MENUS} {...layoutProps}>
    <App />
  </TNTLayout>
)

syncCurrentMenuState(CURRENT_MENU_FILE, CURRENT_MENU_GROUP)
bindLocalHtmlMenuNavigation(['customer-list.html', 'risk-rule.html'])
```

渲染后必须同步静态菜单状态：调用模板内置的 `syncCurrentMenuState(CURRENT_MENU_FILE, CURRENT_MENU_GROUP)`。如果当前 `a[href="./xxx.html"]` 未出现在 DOM 中，先找到 `CURRENT_MENU_GROUP` 对应的 `.ant-menu-submenu-title` 并点击展开；随后展开父级 `li.ant-menu-submenu`，给当前 `li.ant-menu-item` 添加 `ant-menu-item-selected`，并补充 CSS 将选中项设为主色背景 `#126bfb` + 白色文字。白字 CSS 必须同时覆盖选中 `li.ant-menu-item`、内部 `a` 和所有子元素，避免 TNTD 内部链接样式覆盖。父级菜单标题加粗。选中菜单的 `:hover` 和 `ant-menu-item-active` 状态也必须保持蓝底白字，避免鼠标悬停其它未跳转菜单时改变当前选中态。同时调用 `bindLocalHtmlMenuNavigation([...htmlFiles])` 增加捕获期点击处理，把 `./xxx.html`、`xxx.html`、`/xxx.html` 归一成同目录文件名后通过 `new URL(fileName, window.location.href).href` 跳转，保证 `file://` 和 `http://127.0.0.1` 都可用。

### prototype-html 标注规范（强制执行）

当用户要求标注时，说明卡和连线交互参考 `prototype-html/assets/example.html` 的 `proto-desc` / `connection-line` 风格。但 PRD HTML 不要给业务区域增加边框、描边或背景高亮；只给标注序号一个亮粉色圆点。标注内容不能默认展示，必须由用户主动打开。

- 只给关键区域添加标注，通常 2-6 个；不要把每个控件都标注一遍
- 有标注的区域只作为定位容器，必须带 `prd-annotation-target`，不能给业务区域添加边框、描边、阴影或背景高亮
- 标注内容默认隐藏，页面加载后不能直接铺开展示
- 不要给标注目标本身绑定标注 `onClick`；目标本身可能已有按钮点击、表格行点击、菜单点击等页面事件
- 标注目标内必须放一个独立的 `.proto-annotation-trigger` 亮粉色序号按钮；按钮默认可见并与标注目标贴边重叠，点击这个按钮才显示说明，不能出现移向按钮时按钮消失的 hover 断层
- `.proto-annotation-trigger` 的点击事件必须 `preventDefault()` + `stopPropagation()`，与页面原有点击事件区分开
- 再次点击同一个标注按钮或点击页面空白处关闭说明
- 标注说明使用固定定位，不参与布局，不挤压页面结构；说明卡视觉必须使用 `proto-desc` 的琥珀色样式；弹出时必须动态判断视口边缘，在右、左、下、上之间选择可放置位置，实在放不下时夹到窗口内
- 打开说明时可以绘制一条 `connection-line` 从目标指向说明卡，连线不接收鼠标事件

推荐标注数据结构：

```jsx
window.PRD_ANNOTATIONS = {
  createButton: {
    title: '新增接口服务',
    content: '点击后打开新增弹窗，需要配置服务基础信息、入参映射和出参映射。',
  },
  serviceTable: {
    title: '接口服务列表',
    content: '展示服务名称、服务标识、类型、状态和操作入口，支持查询与分页。',
  },
}
```

推荐使用方式：

```jsx
<span
  className="prd-annotation-target"
  data-annotation-id="createButton"
  data-annotation-label="1"
>
  <Button type="primary" icon="plus">新增</Button>
  <button
    type="button"
    className="proto-annotation-trigger"
    onClick={(event) => showPrdAnnotation(event, 'createButton')}
    aria-label="查看标注 1"
  >1</button>
</span>
```

表格区域标注可包裹 `QueryList` 外层或表格卡片外层，不要给每个单元格都加标注；块级区域必须追加 `prd-annotation-block`，避免标注包装导致表格/卡片宽度收缩。严禁把 `showPrdAnnotation` 直接绑定在业务按钮、表格行、菜单项、表单控件或抽屉/弹窗触发器上。

标注样式必须包含：

```css
.proto-desc {
  transition: all 0.2s ease;
  border-radius: 6px;
  border: 1px solid #fde68a;
  background-color: #fffbeb;
}
.proto-desc:hover {
  background-color: #fef3c7;
  border-color: #f59e0b;
  box-shadow: 0 2px 8px rgba(245,158,11,0.15);
}
.proto-desc.active-highlight {
  background-color: #fde68a;
  border-color: #d97706;
  box-shadow: 0 2px 8px rgba(245,158,11,0.25);
}
.prd-annotation-target {
  position: relative;
  display: inline-block;
}
.prd-annotation-target.prd-annotation-block {
  display: block;
}
.proto-annotation-trigger {
  position: absolute;
  top: 50%;
  right: -12px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #ff4fa3;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(255,79,163,0.35);
  opacity: 1;
  pointer-events: auto;
  transform: translate(0, -50%);
  transition: all 0.2s ease;
  z-index: 30;
}
.prd-annotation-target:hover .proto-annotation-trigger,
.prd-annotation-target.active-highlight .proto-annotation-trigger,
.proto-annotation-trigger:focus {
  opacity: 1;
  pointer-events: auto;
  transform: translate(4px, -50%) scale(1.04);
}
.proto-annotation-card {
  position: fixed;
  z-index: 9999;
  width: min(300px, calc(100vw - 24px));
  padding: 12px;
}
.proto-annotation-card-title {
  margin-bottom: 6px;
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
}
.proto-annotation-card-content {
  color: #6b7280;
  font-size: 12px;
  line-height: 1.6;
}
#prd-annotation-connections {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9998;
}
.connection-line {
  fill: none;
  stroke: #165DFF;
  stroke-width: 2;
  opacity: 0.6;
  transition: all 0.2s ease;
}
.connection-line.active {
  stroke-width: 3;
  opacity: 1;
}
.connection-label {
  fill: #fff;
  font-size: 12px;
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: central;
}
.connection-label-bg {
  fill: #ff4fa3;
}
```

标注脚本必须包含点击后才显示逻辑，不能默认渲染所有说明：

```jsx
function closePrdAnnotation() {
  document.querySelectorAll('.proto-annotation-card, #prd-annotation-connections')
    .forEach((el) => el.remove())
  document.querySelectorAll('.prd-annotation-target.active-highlight')
    .forEach((el) => el.classList.remove('active-highlight'))
}

function showPrdAnnotation(event, id) {
  event.preventDefault()
  event.stopPropagation()
  const target = event.currentTarget.closest('.prd-annotation-target')
  const annotation = window.PRD_ANNOTATIONS && window.PRD_ANNOTATIONS[id]
  if (!annotation || !target) return
  const wasActive = target.classList.contains('active-highlight')
  closePrdAnnotation()
  if (wasActive) return
  target.classList.add('active-highlight')
  const label = target.getAttribute('data-annotation-label') || annotation.label || ''
  const card = document.createElement('div')
  card.className = 'proto-desc proto-annotation-card active-highlight'
  card.setAttribute('data-proto-id', label)
  card.innerHTML = `
    <div class="proto-annotation-card-title">${label ? label + '. ' : ''}${annotation.title}</div>
    <div class="proto-annotation-card-content">${annotation.content}</div>
  `
  card.addEventListener('click', (e) => e.stopPropagation())
  document.body.appendChild(card)
  positionPrdAnnotationCard(target, card)
  drawPrdAnnotationConnection(target, card, label)
}

function positionPrdAnnotationCard(target, card) {
  const rect = target.getBoundingClientRect()
  const width = card.offsetWidth
  const height = card.offsetHeight
  const margin = 12
  const gap = 32
  const centerTop = rect.top + rect.height / 2 - height / 2
  const centerLeft = rect.left + rect.width / 2 - width / 2
  const candidates = [
    { placement: 'right', top: centerTop, left: rect.right + gap },
    { placement: 'left', top: centerTop, left: rect.left - width - gap },
    { placement: 'bottom', top: rect.bottom + gap, left: centerLeft },
    { placement: 'top', top: rect.top - height - gap, left: centerLeft },
  ]
  const fits = (item) => (
    item.left >= margin &&
    item.top >= margin &&
    item.left + width <= window.innerWidth - margin &&
    item.top + height <= window.innerHeight - margin
  )
  const overflow = (item) => {
    const leftOverflow = Math.max(margin - item.left, 0)
    const topOverflow = Math.max(margin - item.top, 0)
    const rightOverflow = Math.max(item.left + width - (window.innerWidth - margin), 0)
    const bottomOverflow = Math.max(item.top + height - (window.innerHeight - margin), 0)
    return leftOverflow + topOverflow + rightOverflow + bottomOverflow
  }
  const selected = candidates.find(fits) || candidates.slice().sort((a, b) => overflow(a) - overflow(b))[0]
  const left = Math.max(margin, Math.min(selected.left, window.innerWidth - width - margin))
  const top = Math.max(margin, Math.min(selected.top, window.innerHeight - height - margin))
  card.dataset.placement = selected.placement
  card.style.left = left + 'px'
  card.style.top = top + 'px'
}

function drawPrdAnnotationConnection(target, card, label) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('id', 'prd-annotation-connections')
  const targetRect = target.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  const targetIsLeft = targetRect.left < cardRect.left
  const x1 = targetIsLeft ? targetRect.right : targetRect.left
  const y1 = targetRect.top + targetRect.height / 2
  const x2 = targetIsLeft ? cardRect.left : cardRect.right
  const y2 = cardRect.top + cardRect.height / 2
  const cp1x = x1 + (x2 - x1) * 0.5
  const cp2x = cp1x
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`)
  path.setAttribute('class', 'connection-line active')
  svg.appendChild(path)
  if (label) {
    const midX = (x1 + x2) / 2
    const midY = (y1 + y2) / 2
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    bg.setAttribute('cx', midX)
    bg.setAttribute('cy', midY)
    bg.setAttribute('r', 11)
    bg.setAttribute('class', 'connection-label-bg')
    svg.appendChild(bg)
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', midX)
    text.setAttribute('y', midY)
    text.setAttribute('dy', '0.05em')
    text.setAttribute('class', 'connection-label')
    text.textContent = label
    svg.appendChild(text)
  }
  document.body.appendChild(svg)
}

document.addEventListener('click', closePrdAnnotation)
window.addEventListener('resize', closePrdAnnotation)
window.addEventListener('scroll', closePrdAnnotation, true)
```

## 组件快速参考

| 组件 | 关键属性 |
|-----|---------|
| `Button` | `type="primary|default|link|dashed"`, `danger`, `loading`, `icon`, `size` |
| `Input` | `placeholder`, `allowClear`, `prefix`, `suffix`, `disabled` |
| `Input.Search` | `onSearch`, `enterButton`, `allowClear` |
| `Input.TextArea` | `rows`, `maxLength`, `showCount` |
| `InputNumber` | `min`, `max`, `step`, `precision` |
| `Select` | `options=[{label,value}]`, `placeholder`, `mode="multiple"`, `allowClear` |
| `DatePicker` | `format`, `showTime`, `picker="date|month|year"` |
| `DatePicker.RangePicker` | `format`, `showTime` |
| `Checkbox` | `checked`, `onChange` |
| `Radio.Group` | `options=[{label,value}]`, `optionType="button"` |
| `Switch` | `checked`, `onChange`, `checkedChildren`, `unCheckedChildren` |
| `Table` | `dataSource`, `columns`, `rowKey`, `pagination`, `loading`, `rowSelection` |
| `Card` | `title`, `extra`, `bordered` |
| `Modal` | `title`, 对话框是否可见必须用`visible`（严禁用`open`）, `onOk`, `onCancel`, `width`, `destroyOnClose` |
| `Drawer` | `title`, 对话框是否可见必须用`visible`（严禁用`open`）, `onClose`, `width`, `footer`, `destroyOnClose` |
| `TntdForm` | `form`, `labelCol`, `wrapperCol`, `layout="vertical|horizontal"` |
| `TntdForm.Item` | `name`, `label`, `rules=[{required,message}]`, `initialValue` |
| `Tag` | `color="green|red|blue|gold|default"`, `closable` |
| `Tabs` | `activeKey`, `onChange`, `type="card|line"`, `items` |
| `Popconfirm` | `title`, `onConfirm`, `okText`, `cancelText` |
| `Space` | `size="small|middle|large"`, `direction="vertical"` |
| `Descriptions` | `title`, `column`, `bordered`, `size` |
| `Steps` | `current`, `items=[{title,description}]`, `direction` |
| `Spin` | `spinning`, `tip`, `size` |
| `Badge` | `count`, `status="success|error|warning"`, `dot` |
| `Tooltip` | `title`, `placement` |
| `Breadcrumb` | `items=[{title,href}]` |
| `Divider` | `type="horizontal|vertical"`, `dashed` |
| `Upload` | `action`, `listType="text|picture|picture-card"` |
| `message` | `.success(text)`, `.error(text)`, `.info(text)`, `.warning(text)` |
| `Modal` (静态方法) | `Modal.confirm({title,content,onOk})`, `.success()`, `.error()` |
| `TntdVirtualTreeSelect` | `isOrg`, `showPrefixIcon` |
| `HandleIcon` | 操作列专用组件，必须用 `<HandleIcon>` 包裹 `<HandleIcon.Item>` |
| `TntdAction` | 批量操作组件，配合 `selectedRowKeys` 使用 |
| `AssignModal`| 授权组件，`visible`,`orgList`,`appList`,`dataItem` |
| `echarts`| 图表类 `饼图`,`折线图`,`柱状图`|

### QueryListScene Field type 强制规范

`QueryForm` 中的 `<Field>` 必须使用 QueryListScene 支持的精确枚举值：

| 场景 | 正确写法 | 错误写法 |
|------|----------|----------|
| 文本输入 | `type="input"` | - |
| 搜索输入 | `type="search"` | - |
| 数字输入 | `type="number"` | - |
| 下拉选择 | `type="select"` | - |
| 选择+输入组合 | `type="selectInput"` | `type="select-input"` |
| 单日期 | `type="date"` | - |
| 日期范围 | `type="dateRange"` | - |

**强制执行**：生成原型后必须全文检查，不允许出现 `type="date-range"`。日期范围字段只能写成：

```jsx
<Field type="dateRange" name="createTimeRange" props={{ placeholder: ['开始日期', '结束日期'] }} />
```



## 主题颜色

| 颜色 | 值 | 用途 |
|-----|-----|-----|
| 蓝色（主色） | `#126bfb` | 主要操作、链接 |
| 绿色 | `#07c790` | 成功 |
| 金色 | `#f7b035` | 警告 |
| 红色 | `#ef4444` | 错误、危险 |
| 文本 | `#17233d` | 主文本 |
| 次要文本 | `#454f64` | 次要文本 |
| 边框 | `#c9d2dd` | 边框 |
| 背景 | `#f0f2f5` | 页面背景 |

## 设计规范

1. 主要操作：`type="primary"`，次要操作：`type="default"`
2. 删除操作：始终用 `Popconfirm` 包裹二次确认
3. 表单验证：使用 `rules={[{ required: true, message: '请输入...' }]}`
4. 状态显示：使用语义化颜色的 `Tag`（绿色=启用，红色=禁用）

## 操作列强制规范（重点）

**强制执行 - 表格操作列必须使用 HandleIcon**

```jsx
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
        <Popconfirm
          title="确认删除？"
          onConfirm={() => handleDelete(record)}
        >
          <Icon type="delete" style={{ color: 'red' }} />
        </Popconfirm>
      </HandleIcon.Item>
    </HandleIcon>
  )
}
```

**检查清单：**
- [ ] 操作列使用了 `<HandleIcon>` 作为根容器
- [ ] 每个操作按钮都用 `<HandleIcon.Item>` 包裹
- [ ] 每个 `HandleIcon.Item` 都设置了 `title` 属性
- [ ] 删除操作使用了 `Popconfirm` 进行二次确认
- [ ] 删除图标设置为红色：`style={{ color: 'red' }}`
- [ ] 操作列设置了 `fixed: 'right'` 固定在右侧
- [] `Modal`/`Drawer` 对话框是否可见 通过 `visible` 控制（严禁使用 `open`，TNTD 不支持 Ant Design v5 的 `open` 属性）

## 常见错误（严禁出现）

### 1. 空透传 props vs 显式传入 query/actions
```jsx
// ❌ 错误：空透传，QueryListScene 收不到 query 和 actions
<QueryListScene {...props} />

// ✅ 正确：显式传入 query 和 actions
<QueryListScene query={query} actions={createActions()}>
```

### 2. 全局创建 actions vs 组件内部创建
```jsx
// ❌ 错误：在 App 组件外部全局创建
const actions = createActions()
const App = TableContainer((props) => {
  return <QueryListScene query={query} actions={actions}>...

// ✅ 正确：在 App 组件内部创建
const App = TableContainer((props) => {
  const actions = createActions()
  return <QueryListScene query={query} actions={actions}>...
```

### 3. 操作列直接使用 Button vs HandleIcon 包裹
```jsx
// ❌ 错误：直接使用 Button 或 a 标签
render: (_, record) => (
  <Space>
    <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
    <Button type="link" danger onClick={() => handleDelete(record)}>删除</Button>
  </Space>
)

// ✅ 正确：使用 HandleIcon 包裹（见上方"操作列强制规范"的完整模板）
```

### 4. data 字段与 columns dataIndex 不匹配
```jsx
// ❌ 错误：data 中字段名与 columns 的 dataIndex 不一致
data: [{ id: 1, userName: '张三' }]
columns: [{ title: '姓名', dataIndex: 'name' }]  // userName vs name 不匹配

// ✅ 正确：data 字段与 dataIndex 严格一一对应
data: [{ id: 1, name: '张三' }]
columns: [{ title: '姓名', dataIndex: 'name' }]
```

### 5. query 返回值缺少必需字段
```jsx
// ❌ 错误：缺少 current/pageSize/total
const query = () => Promise.resolve({ data: [...] })

// ✅ 正确：必须返回完整的四个字段
const query = ({ current, pageSize }) => Promise.resolve({
  current, pageSize, total: 25, data: [...]
})
```

### 6. Modal/Drawer 使用 open 属性（严重错误）
**TNTD 基于 Ant Design v3，不支持 v5 的 `open` 属性，必须使用 `visible`。**
```jsx
// ❌ 严重错误：使用了 Ant Design v5 的 open 属性，TNTD 不支持
<Modal open={visible} onCancel={handleClose}>...</Modal>
<Drawer open={visible} onClose={handleClose}>...</Drawer>

// ✅ 正确：TNTD 必须使用 visible 属性
<Modal visible={visible} onCancel={handleClose}>...</Modal>
<Drawer visible={visible} onClose={handleClose}>...</Drawer>
```

### 7. Field 日期范围 type 写成 date-range（严重错误）
**QueryListScene 的 Field type 不支持 kebab-case。日期范围必须使用精确的 `dateRange`。**
```jsx
// ❌ 严重错误：QueryListScene 不识别 date-range，会导致页面报错
<Field type="date-range" name="createTimeRange" />

// ✅ 正确：必须保持 camelCase
<Field type="dateRange" name="createTimeRange" props={{ placeholder: ['开始日期', '结束日期'] }} />
```

## 参考文件

需要特定 API 详情时可查阅详细文档：
- `references/tntd-layout.md` - 完整的 TNTLayout API 和配置（包含 menus、userInfo、orgList、appList 数据结构）
- `references/tntd-container.md` — 容器组件 TableContainer/TabsContainer/PageContainer 详情
- `references/query-list-scene.md` — 查询列表组件（包含 query 方法格式、columns 结构、Field 配置、HandleIcon 规范）
- `references/tntd-form.md` — 表单组件
- `references/components.md` — 完整组件列表及导入路径
- `references/theme-colors.md` — 完整 13 个色系颜色系统（130 个颜色值）及 CSS 变量
- `references/design-system.md` — 设计原则及交互规范
- `references/tntd-action.md` — 批量操作组件
- `references/assign-modal.md` — AssignModal 授权弹窗组件
- `references/tree-view.md` — TreeView 树状结构组件
- `references/monaco-editor.md` — MonacoEditor 代码编辑器组件
- `references/tntd-reference.md` — 引用关系组件，当删除/校验，查看引用关系场景的时候触发
- `references/weightmode-editor.md` — WeightModeEditor 权重模式编辑器，风险阈值区间配置场景
- `references/echarts5.md` — echarts 图表类，折线图/饼图/柱状图

**重要提示**：每次生成原型时，必须读取相关参考文件并根据其中的数据结构示例生成 mock 数据。本 SKILL.md 中的快速参考仅用于了解组件属性，不包含数据结构规范。
