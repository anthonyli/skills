# TNTD 主题颜色

## 颜色系统概述

TNTD 使用全面的颜色系统，包含 13 个色系，每个色系有 10 个变体（1-10，从最浅到最深）。

## 核心调色板

### 蓝色系（主色）
```css
--blue-1: #e6f4ff;   --blue-2: #b5dbff;   --blue-3: #8cc4ff;
--blue-4: #63a9ff;   --blue-5: #3b8cff;   --blue-6: #126bfb;  /* 主色 */
--blue-7: #044dd4;   --blue-8: #0037ad;   --blue-9: #002687;
--blue-10: #001861;
```
**特殊变体：**
- `--blue-6-tint-20: #4189fc`
- `--blue-6-tint-50: #89b5fd`
- `--blue-6-fade: 18, 107, 251`（用于 rgba 的 RGB 值）

### 绿色系（成功）
```css
--green-1: #e6fff4;  --green-2: #aafad9;  --green-3: #7bedc2;
--green-4: #51e0ae;  --green-5: #2ad49e;  --green-6: #07c790;  /* 成功 */
--green-7: #00a178;  --green-8: #007a60;  --green-9: #005445;
--green-10: #002e27;
```

### 金色系（警告）
```css
--gold-1: #fffcf0;   --gold-2: #fff6d9;   --gold-3: #ffeab0;
--gold-4: #ffdb87;   --gold-5: #ffc95e;   --gold-6: #f7b035;  /* 警告 */
--gold-7: #d18b21;   --gold-8: #ab6913;   --gold-9: #854a08;
--gold-10: #5e3205;
```
**特殊变体：**
- `--gold-6-fade: 247, 176, 53`

### 红色系（错误/危险）
```css
--red-1: #fff2f0;    --red-2: #ffedeb;    --red-3: #ffc8c2;
--red-4: #ffa099;    --red-5: #fc746f;    --red-6: #ef4444;   /* 错误 */
--red-7: #c92e34;    --red-8: #a31d26;    --red-9: #7d101b;
--red-10: #570a15;
```
**特殊变体：**
- `--red-5-fade: 252, 116, 111`

### 紫色系
```css
--purple-1: #f9f0ff;  --purple-2: #efdbff;  --purple-3: #d3adf7;
--purple-4: #b37feb;  --purple-5: #9254de;  --purple-6: #722ed1;
--purple-7: #531dab;  --purple-8: #391085;  --purple-9: #22075e;
--purple-10: #120338;
```

### 青色系
```css
--cyan-1: #e6fffb;   --cyan-2: #b5f5ec;   --cyan-3: #87e8de;
--cyan-4: #5cdbd3;   --cyan-5: #36cfc9;   --cyan-6: #13c2c2;
--cyan-7: #08979c;   --cyan-8: #006d75;   --cyan-9: #00474f;
--cyan-10: #002329;
```

### 洋红色系
```css
--magenta-1: #fff0f6; --magenta-2: #ffd6e7; --magenta-3: #ffadd2;
--magenta-4: #ff85c0; --magenta-5: #f759ab; --magenta-6: #eb2f96;
--magenta-7: #c41d7f; --magenta-8: #9e1068; --magenta-9: #780650;
--magenta-10: #520339;
```

### 橙色系
```css
--orange-1: #fff7e6;  --orange-2: #ffe7ba;  --orange-3: #ffd591;
--orange-4: #ffc069;  --orange-5: #ffa940;  --orange-6: #fa8c16;
--orange-7: #d46b08;  --orange-8: #ad4e00;  --orange-9: #873800;
--orange-10: #612500;
```

### 黄色系
```css
--yellow-1: #feffe6;  --yellow-2: #ffffb8;  --yellow-3: #fffb8f;
--yellow-4: #fff566;  --yellow-5: #ffec3d;  --yellow-6: #fadb14;
--yellow-7: #d4b106;  --yellow-8: #ad8b00;  --yellow-9: #876800;
--yellow-10: #614700;
```

### 火山系
```css
--volcano-1: #fff2e8;  --volcano-2: #ffd8bf;  --volcano-3: #ffbb96;
--volcano-4: #ff9c6e;  --volcano-5: #ff7a45;  --volcano-6: #fa541c;
--volcano-7: #d4380d;  --volcano-8: #ad2102;  --volcano-9: #871400;
--volcano-10: #610b00;
```

### 极客蓝系
```css
--geekblue-1: #f0f5ff;  --geekblue-2: #d6e4ff;  --geekblue-3: #adc6ff;
--geekblue-4: #85a5ff;  --geekblue-5: #597ef7;  --geekblue-6: #2f54eb;
--geekblue-7: #1d39c4;  --geekblue-8: #10239e;  --geekblue-9: #061178;
--geekblue-10: #030852;
```

### 柠檬绿系
```css
--lime-1: #fcffe6;  --lime-2: #f4ffb8;  --lime-3: #eaff8f;
--lime-4: #d3f261;  --lime-5: #bae637;  --lime-6: #a0d911;
--lime-7: #7cb305;  --lime-8: #5b8c00;  --lime-9: #3f6600;
--lime-10: #254000;
```

## 中性色

### 文本颜色
```css
--text-color: #17233d;              /* 主要文本 */
--text-color-secondary: #454f64;     /* 次要文本 */
--text-color-tint-50: #8b919e;      /* 辅助文本 */
--text-color-tertiary: #babdc5;     /* 禁用文本 */
--text-color-fade: 23, 35, 61;      /* 用于 rgba 的 RGB 值 */
```

### 背景/填充颜色
```css
--white: #ffffff;                    /* 白色 */
--white-fade: 255, 255, 255;        /* 用于 rgba 的 RGB 值 */
--fill-color: #e9edf3;              /* 默认背景 */
--fill-color-tertiary: #f1f2f5;     /* 浅色背景 */
--fill-color-quaternary: #f8f9fb;    /* 非常浅的背景 */
--bg-color-quaternary: var(--fill-color-quaternary);
--bg-color-spotilight: var(--text-color);
--bg-color-spotilight-tint-50: var(--text-color-tint-50);
```

### 边框颜色
```css
--border-color: #c9d2dd;            /* 默认边框 */
--border-color-secondary: #e1e6ee;  /* 浅色边框 */
```

## 间距系统

### 内边距
```css
--padding-xxs: 4px;     --padding-xs: 8px;     --padding-sm: 12px;
--padding-base: 16px;    --padding-md: 20px;    --padding-lg: 24px;
--padding-xl: 32px;     --padding-xxl: 48px;
```

### 外边距
```css
--margin-xxs: 4px;      --margin-xs: 8px;      --margin-sm: 12px;
--margin-base: 16px;     --margin-md: 20px;     --margin-lg: 24px;
--margin-xl: 32px;      --margin-xxl: 48px;
```

## 排版

### 标题字号
```css
--heading-1-size: 32px;  --heading-2-size: 24px;
--heading-3-size: 18px;  --heading-4-size: 16px;
```

### 行高
```css
--line-height-base: 22 / 14;     --line-height-sm: 20 / 12;
--line-height-lg: 24 / 16;      --line-height-xl: 28 / 20;
--heading-1-line-height: 40 / 32;
--heading-2-line-height: 32 / 24;
--heading-3-line-height: 26 / 18;
--heading-4-line-height: 24 / 16;
```

## 圆角
```css
--border-radius-xs: 2px;   --border-radius-sm: 4px;
--border-radius-base: 8px;  --border-radius-lg: 16px;
```

## 阴影
```css
--box-shadow-md: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
--box-shadow-lg: 0px 0px 25px 0px rgba(0, 0, 0, 0.1), 0px 0px 5px -5px rgba(0, 0, 0, 0.05);
```

## 尺寸步进单位
```css
--size-step-base: 4;
--size-step-unit: 4;
```

## 颜色使用指南

- **主色 (Blue-6)**：主要操作、链接、激活状态
- **成功色 (Green-6)**：成功消息、积极操作
- **警告色 (Gold-6)**：警告状态、提示消息
- **错误色 (Red-6)**：错误消息、破坏性操作
- **Text-Color**：主要文本、标题
- **Text-Color-Secondary**：次要文本、描述
- **Text-Color-Tint-50**：辅助文本、占位符
- **Text-Color-Tertiary**：禁用文本
- **Border-Color**：默认边框、分割线
- **Border-Color-Secondary**：浅边框、细微分割线
- **Fill-Color**：默认背景、卡片
- **Fill-Color-Tertiary**：浅色背景、区域
- **Fill-Color-Quaternary**：非常浅的背景、页面背景
