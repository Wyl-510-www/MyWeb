# Phase 1: 环境准备 - 需求文档

## 功能范围

### 核心目标
为 MyWeb 项目建立完整的开发基础设施，包括目录结构、品牌配色系统、基础 HTML 模板和项目文档。

### 实施内容

#### 1. 目录结构创建 ✅
```
MyWeb/
├── assets/
│   ├── avatar.jpg           # 个人头像（已就位）
│   └── images/              # 图片资源目录
├── content/
│   ├── notes/               # Markdown 学习笔记
│   └── life/                # 生活记录 Markdown
├── css/
│   └── variables.css        # 品牌色变量文件（待创建）
└── specs/
    └── 2026-09-29-phase1-environment-setup/
        ├── requirements.md  # 本文件
        ├── plan.md
        └── validation.md
```

**状态**：已完成

#### 2. 品牌配色系统
采用 **A・原图核心配色方案**：

```css
:root {
  /* 核心四色 */
  --color-primary: #3457B8;      /* 夜空钴蓝 - 标题、链接、主按钮 */
  --color-accent: #FFD646;       /* 星光暖黄 - CTA、高亮、徽章 */
  --color-highlight: #E25555;    /* 斗篷砖红 - 标签、提醒 */
  --color-bg: #F8F6F0;          /* 奶云米白 - 主背景 */
  
  /* 必要补充 */
  --color-text: #2D2D2D;        /* 深灰 - 正文文字 */
  --color-white: #FFFFFF;       /* 纯白 - 卡片背景 */
}
```

**配色比例原则**：主色 60% · 强调色 30% · 点缀色 10%

**决策理由**：
- 保持 Esther Design System 原设计风格，组件适配最优
- 饱和度高，视觉冲击力强，适合技术展示
- 蓝黄红经典组合，平衡专业感与活力

#### 3. 基础 HTML 模板
从 `esther-design-system-main/demo-landing.html` 复制并改造为 `index.html`

**选择理由**：
- 着陆页风格，有 Hero 区域和卡片布局
- 适合首页展示个人介绍和四大入口
- 已包含响应式布局和完整样式

**需要修改的内容**：
- 替换头像路径为 `assets/avatar.jpg`
- 修改 CSS 变量引用新的 `css/variables.css`
- 清理示例内容，保留结构框架
- 确保样式路径正确

#### 4. 项目 README
编写 `README.md` 包含：
- 项目简介和目标
- 技术栈说明
- 目录结构说明
- 本地开发指南（如何预览）
- 部署说明（GitHub Pages 准备）

---

## 技术决策

### 1. 为什么不修改品牌色？
✅ **决定**：使用 A 方案原色，不做调整

**理由**：
- 配色经过验证，视觉和谐
- 避免过早优化，先实现功能
- 后续可通过 CSS 变量快速调整

### 2. 为什么选择 demo-landing.html？
✅ **决定**：复制 `demo-landing.html` 而非 `template-landing.html`

**理由**：
- `demo-landing.html` 是参考网站的实际着陆页，更接近最终需求
- 包含完整的样式和布局示例
- `template-*.html` 是空模板，需要从零填充

### 3. CSS 组织方式
✅ **决定**：创建独立的 `css/variables.css` 存放品牌色变量

**理由**：
- 统一管理配色，便于全局修改
- 避免在每个 HTML 文件内嵌 `:root` 变量
- 符合样式分离原则

---

## 约束条件

1. **纯静态方案**：无需 Node.js 构建，浏览器直接打开预览
2. **复用 Esther Design System**：所有样式和组件从设计系统复用，不自定义新组件
3. **保持简洁**：Phase 1 只做环境准备，不涉及内容填充

---

## 范围外

以下内容 **不在** Phase 1 范围内：

- ❌ 首页内容填充（Hero 文案、导航卡片内容）
- ❌ 其他页面创建（portfolio.html、notes.html 等）
- ❌ JavaScript 交互逻辑
- ❌ Markdown 渲染方案
- ❌ GitHub Pages 部署配置

---

## 依赖资源

- ✅ `esther-design-system-main/` 目录完整
- ✅ 头像文件 `assets/avatar.jpg`（5.5MB）
- ✅ Git 分支 `2026-09-29-phase1-environment-setup` 已创建

---

## 成功标准

Phase 1 完成后应达到：

1. ✅ 目录结构完整创建
2. ✅ `css/variables.css` 包含 A 方案的六个颜色变量
3. ✅ `index.html` 能在浏览器正常打开，样式正确
4. ✅ `README.md` 记录完整的项目信息
5. ✅ `specs/` 文档齐全（requirements.md、plan.md、validation.md）
