# ECharts 5 专业图表模版库

基于UI设计稿100%还原的ECharts 5图表配置模版。

## 🎨 标准配置

```javascript
// 标准颜色配置
const STANDARD_COLORS = {
  primary: '#2E90FA', success: '#07C790', warning: '#F7B035', 
  danger: '#F47345', info: '#81A5E9'
};

const RISK_COLORS = {
  '高风险': '#F47345', '中风险': '#F7B035', 
  '低风险': '#2E90FA', '极低风险': '#07C790'
};

const FONT_CONFIG = {
  title: { fontFamily: 'PingFang SC', fontSize: 16, fontWeight: 600, color: '#17233D' },
  legend: { fontFamily: 'PingFang SC', fontSize: 14, color: '#17233D' }
};

// 颜色工具函数
function colorRgba(color, opacity) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
```

## 📊 图表模版

### 1. 饼图模版
```javascript
function createPieChart(data, colorMap, options = {}) {
  const { titleText } = options;
  const totalCount = data.reduce((sum, item) => sum + item.value, 0);
  
  return {
    color: data.map(item => colorMap[item.name]),
    title: {
      textAlign: 'center', width: 70, left: '21%', top: 'center',
      text: titleText || `总数${totalCount}`
    },
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)', confine: true },
    series: [
      {
        name: 'border', type: 'pie', clockWise: false, legendHoverLink: false,
        radius: [66, 90], center: ['21%', '50%'], animation: false, silent: true,
        data: [{ value: 0, label: { show: false }, labelLine: { show: false },
          emphasis: { disabled: true }, select: { disabled: true }, tooltip: { show: false },
          itemStyle: { color: '#fff', shadowColor: 'rgba(0, 0, 0, 0.2)', shadowBlur: 15, shadowOffsetX: 2, shadowOffsetY: 2 }
        }]
      },
      {
        type: 'pie', radius: [70, 86], center: ['21%', '50%'], avoidLabelOverlap: false,
        clockwise: true, legendHoverLink: false, startAngle: 90,
        itemStyle: { borderRadius: 3, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        data: data.map(item => ({
          name: item.name, value: item.value,
          percent: (item.percentage * 100).toFixed(2),
          itemStyle: { color: colorMap[item.name], borderRadius: 3, borderColor: '#fff', borderWidth: 2 }
        }))
      }
    ],
    legend: {
      type: 'scroll', top: 'center', left: '45%', icon: 'roundRect',
      itemWidth: 12, itemHeight: 12, orient: 'vertical', height: 180,
      textStyle: { fontSize: 12, color: '#454F64' }
    }
  };
}

function addPieChartInteractions(chart) {
  chart.on('mouseover', (params) => {
    if (params.seriesName !== 'border') chart.setOption({ title: { show: false } });
  });
  chart.on('mouseout', (params) => {
    if (params.seriesName !== 'border') chart.setOption({ title: { show: true } });
  });
}
```

### 2. 折线图模版
```javascript
function createLineChart(data, colorMap, options = {}) {
  const { smooth = true, showArea = true, symbolSize = 10, lineWidth = 3 } = options;
  
  return {
    color: Object.values(colorMap),
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' }, confine: true },
    legend: { type: 'scroll', top: 10, right: 30, icon: 'circle', itemWidth: 8, itemHeight: 8, textStyle: FONT_CONFIG.legend },
    grid: { left: 22, right: 40, top: 50, bottom: 16, containLabel: true },
    xAxis: {
      type: 'category', data: data.categories,
      axisLine: { show: true, lineStyle: { color: '#E1E6EE', type: 'dashed' } },
      axisLabel: { color: '#8B919E', fontSize: 12 }, axisTick: { show: false }
    },
    yAxis: {
      type: 'value', name: '数量', nameTextStyle: { color: '#8B919E' },
      axisLine: { show: false }, splitLine: { show: true, lineStyle: { color: '#E1E6EE', type: 'dashed' } },
      axisLabel: { color: '#8B919E', fontSize: 12 }, axisTick: { show: false }
    },
    series: data.series.map(item => ({
      name: item.name, type: 'line', symbol: 'circle', symbolSize, smooth,
      lineStyle: { width: lineWidth },
      itemStyle: { color: colorMap[item.name], borderColor: '#fff', borderWidth: 2 },
      areaStyle: showArea ? {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: colorRgba(colorMap[item.name], 0.1) },
            { offset: 1, color: colorRgba(colorMap[item.name], 0) }
          ]
        }
      } : undefined,
      emphasis: { focus: 'series' }, data: item.data
    }))
  };
}
```

### 3. 柱状图模版
```javascript
function createBarChart(data, colorMap, options = {}) {
  const { barMaxWidth = '12px', showDataZoom = false, stack = false } = options;
  
  const config = {
    color: Object.values(colorMap),
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, confine: true },
    legend: { top: 10, right: 30, textStyle: FONT_CONFIG.legend },
    grid: { left: 22, right: 40, top: 50, bottom: 16, containLabel: true },
    xAxis: {
      type: 'category', data: data.categories, axisPointer: { type: 'shadow' },
      axisLine: { show: true, lineStyle: { color: '#E1E6EE', type: 'dashed' } },
      axisLabel: { color: '#8B919E', fontSize: 12 }, axisTick: { show: false }
    },
    yAxis: {
      type: 'value', name: '数量', nameTextStyle: { color: '#8B919E' },
      axisLine: { show: false }, splitLine: { show: true, lineStyle: { color: '#E1E6EE', type: 'dashed' } },
      axisLabel: { color: '#8B919E', fontSize: 12 }, axisTick: { show: false }
    },
    series: data.series.map(item => ({
      name: item.name, type: 'bar', barMaxWidth, stack: stack ? 'total' : undefined,
      itemStyle: { color: colorMap[item.name], borderRadius: [3, 3, 0, 0], borderColor: '#fff', borderWidth: 1 },
      emphasis: { focus: 'series', itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' } },
      data: item.data
    }))
  };
  
  if (showDataZoom && data.categories.length > 10) {
    config.dataZoom = [{
      type: 'slider', show: true, height: 6, right: 10, bottom: 10,
      borderColor: 'transparent', backgroundColor: '#e9edf4',
      fillerColor: 'rgba(184,195,213,1)', handleColor: '#6a83aa', handleSize: 12,
      startValue: 0, endValue: 10
    }];
  }
  
  return config;
}
```

### 4. 组合图模版
```javascript
function createBarLineChart(data, colorMap, options = {}) {
  const { barColor = STANDARD_COLORS.primary, lineColor = STANDARD_COLORS.danger } = options;
  
  return {
    color: [barColor, lineColor],
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' }, confine: true },
    legend: { top: 16, right: 100, textStyle: FONT_CONFIG.legend },
    grid: { left: 22, right: 40, top: 50, bottom: 16, containLabel: true },
    xAxis: {
      type: 'category', data: data.categories, axisPointer: { type: 'shadow' },
      axisLine: { show: true, lineStyle: { color: '#E1E6EE', type: 'dashed' } },
      axisLabel: { color: '#8B919E', fontSize: 12 }, axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value', name: '数量', position: 'left', nameTextStyle: { color: '#8B919E' },
        axisLine: { show: false }, splitLine: { show: true, lineStyle: { color: '#E1E6EE', type: 'dashed' } },
        axisLabel: { color: '#8B919E', fontSize: 12 }, axisTick: { show: false }
      },
      {
        type: 'value', name: '比率(%)', position: 'right', nameTextStyle: { color: '#8B919E' },
        axisLine: { show: false }, splitLine: { show: false },
        axisLabel: { color: '#8B919E', fontSize: 12 }, axisTick: { show: false }
      }
    ],
    series: [
      {
        name: data.barName || '数量', type: 'bar', yAxisIndex: 0, barMaxWidth: '12px',
        itemStyle: { color: barColor, borderRadius: [3, 3, 0, 0] },
        emphasis: { focus: 'series', itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' } },
        data: data.barData
      },
      {
        name: data.lineName || '比率', type: 'line', yAxisIndex: 1,
        symbol: 'circle', symbolSize: 8, smooth: true,
        lineStyle: { width: 3, color: lineColor },
        itemStyle: { color: lineColor, borderColor: '#fff', borderWidth: 2 },
        emphasis: { focus: 'series' }, data: data.lineData
      }
    ]
  };
}
```

## 📋 React组件示例

### 通用图表组件模板
```jsx
const ChartComponent = (props) => {
  const chartRef = useRef(null);
  
  // 示例数据
  const sampleData = [
    { name: '高风险', value: 156, percentage: 0.25 },
    { name: '中风险', value: 234, percentage: 0.38 }
  ];

  useEffect(() => {
    if (chartRef.current && window.echarts) {
      const timer = setTimeout(() => {
        const chart = echarts.init(chartRef.current);
        // 使用具体的图表函数，如 createPieChart、createLineChart、createBarChart 等
        const option = createPieChart(sampleData, RISK_COLORS);
        chart.setOption(option);
        
        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
          chart.dispose();
        };
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div ref={chartRef} style={{ backgroundColor:"#fff",width: '100%', height: '400px' }} />
  );
};
```

## 重要说明与注意事项

### 容器尺寸规范（强制执行）
- **图表容器宽度最大不能超过100%**
- 标准容器样式：`style={{ width: '100%', height: '400px' }}`
- 禁止使用超过100%的宽度值，如：`width: '120%'`、`width: 'calc(100% + 20px)'`
- 高度可根据业务需求调整，建议范围：300px-600px

### 数据结构规范
- **饼图数据**：`[{ name, value, percentage }]`
- **折线图数据**：`{ categories: [], series: [{ name, data }] }`
- **柱状图数据**：`{ categories: [], series: [{ name, data }] }`
- **组合图数据**：`{ categories: [], barName, lineName, barData: [], lineData: [] }`

### 定时器绘制规范（强制执行）
- **所有图表必须使用100ms定时器延迟绘制**
- 确保DOM元素完全渲染后再执行 `chart.setOption(option)`
- 正确处理定时器清理，避免内存泄漏

### 其他重要规范
- **强制执行** 在 prd-html 生成的 HTML 原型中，可以直接使用mock数据，必须百分百使用文档中设置的参数配置

### 其他重要规范
- **强制执行** 在 prd-html 生成的 HTML 原型中，可以直接使用mock数据，必须百分百使用文档中设置的参数配置