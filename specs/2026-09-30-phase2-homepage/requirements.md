# Phase 2: 首页开发 - 需求文档

## 功能范围

实现个人网站首页，建立整体视觉风格和导航体系。

## 设计决策

### 1. 模板选择
**决定**：使用 tutorial 风格（`template-tutorial.html`）  
**理由**：内容导向，适合技术博客和学习笔记展示，布局清晰易读，符合项目「记录个人成长轨迹」的核心使命

### 2. 页面结构
采用三段式布局：
- **Hero 区域**：个人简介 + 视觉焦点
- **导航区域**：四个入口卡片（作品集、学习笔记、生活记录、关于我）
- **Footer 区域**：联系方式

### 3. 组件选择

#### Hero 区域
- 头像展示（`assets/avatar.jpg`）
- 通用个人简介模板：
  - 标题：「记录 · 成长 · 分享」
  - 副标题：「在这里沉淀技术学习与生活点滴」
  - 简介文字：「一个正在成长的开发者，用代码解决问题，用笔记记录思考，用作品证明自己。这里是我的数字花园，欢迎你的到来。」

#### 导航卡片
**卡片类型**：杂志卡片（Magazine Card）  
**特殊效果**：
- 悬停翻转卡片（Hover Flip）
- 3D 翻转效果（3D Flip Card）

四个卡片内容：
1. **作品集**
   - 图标：🎨
   - 描述：技术项目作品展示
   - 链接：`portfolio.html`（待开发）

2. **学习笔记**
   - 图标：📝
   - 描述：技术学习笔记与踩坑记录
   - 链接：`notes.html`（待开发）

3. **生活记录**
   - 图标：📷
   - 描述：个人生活瞬间与思考感悟
   - 链接：`life.html`（待开发）

4. **关于我**
   - 图标：👤
   - 描述：个人简介与联系方式
   - 链接：`about.html`（待开发）

#### Footer 区域
**联系方式**：
- 邮箱：504424637@qq.com
- 小红书：https://xhslink.cn/o/3dBs2IMNfpl

**特殊组件**：
- 肖像分割引号（Quote with Portrait Split）
- 堆叠卡片（Stacked Cards）用于展示联系方式

### 4. 技术约束

#### 品牌色使用（参考 `css/variables.css`）
- 主色（蓝）：`#2B7FD8` - 60%（标题、链接）
- 强调色（黄）：`#F4D758` - 30%（装饰、badges）
- 点缀色（红）：`#E84A5F` - 10%（CTA、标签）

#### 响应式断点
- 桌面：> 900px
- 平板：600px - 900px
- 手机：< 600px

#### 字体方案
- 中文标题：Noto Serif SC（衬线）
- 中文正文：Noto Sans SC（无衬线）
- 英文装饰：Fraunces（italic）
- 手写注释：Caveat

## 上下文参考

### 项目使命（`specs/mission.md`）
- 核心使命：记录个人成长轨迹，平衡展示技术作品与学习历程
- 目标受众：自己（知识管理）、潜在雇主（能力展示）、同行开发者（经验分享）

### 技术栈（`specs/tech-stack.md`）
- 纯静态 HTML/CSS + 原生 JavaScript
- 直接复用 Esther Design System 组件
- 无需构建工具，浏览器直接打开预览

### 资源位置
- 设计系统：`esther-design-system-main/`
- 组件库：`esther-design-system-main/references/components.md`
- 布局模式：`esther-design-system-main/references/layouts.md`
- 品牌规范：`esther-design-system-main/brand-dna.md`
- 质量检查清单：`esther-design-system-main/references/checklist.md`

## 非功能性需求

### 性能
- 首屏加载时间 < 2s
- 图片优化（头像 < 200KB）
- 无阻塞式加载

### 可访问性
- 语义化 HTML5 标签
- 键盘导航支持
- 屏幕阅读器友好

### 浏览器兼容性
- Chrome/Edge（最新版）
- Safari（最新版）
- Firefox（最新版）
- 移动端浏览器

## 排除范围（后续 Phase）

本阶段**不包含**以下功能：
- 实际页面内容（作品集、笔记、生活记录详情页面）
- 动态内容加载
- 搜索功能
- 深色模式切换
- 评论系统
- 数据统计

## 成功标准

1. ✅ 页面在桌面/平板/手机三种设备上显示正常
2. ✅ 所有四个导航卡片可点击（虽然目标页面未开发，但链接结构正确）
3. ✅ 联系方式链接可用（邮箱可点击、小红书链接可跳转）
4. ✅ 通过 `esther-design-system-main/references/checklist.md` P0 检查项
5. ✅ 在 900px、600px 断点处响应式布局切换正常
6. ✅ 3D 翻转卡片动画流畅（无卡顿）
