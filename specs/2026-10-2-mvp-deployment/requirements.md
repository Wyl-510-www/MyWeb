# MVP 部署需求文档

## 项目背景

MyWeb 已完成 Phase 1-7 的核心功能开发，现需要制定 MVP（最小可行产品）分支计划，进行最终优化和正式部署上线。

## MVP 范围定义

### 包含的核心功能模块

基于已完成的 Phase 1-7，MVP 将包含以下功能：

#### 1. 基础展示模块
- **首页导航（Phase 2）**
  - 响应式导航栏
  - Hero 区域（个人介绍）
  - 导航卡片（4 个主要入口）
  - Footer 组件
  - ES6 模块化架构

- **作品集页面（Phase 4）**
  - 杂志裁切风格卡片组件
  - 网格布局（桌面 2 列 / 移动端 1 列）
  - 项目展示（技术栈标签、项目描述、成果链接）
  - 悬停交互效果
  - Scroll Reveal 动画

- **关于我页面（Phase 7）**
  - 个人简介（头像 + slogan + 黄色荧光笔高亮）
  - 核心技能展示（4 张图标卡片）
  - 其他技能标签（按类别分组）
  - 联系方式（邮箱复制功能 + GitHub 链接）

#### 2. 学习笔记系统（Phase 5）
- **笔记列表页 (notes.html)**
  - Magazine 风格卡片网格布局
  - 标签筛选功能（支持 URL 参数 `?tag=xxx`）
  - 按日期倒序排序
  - 响应式布局（桌面 3 列 / 平板 2 列 / 移动 1 列）

- **笔记详情页**
  - Markdown 渲染（标题、段落、列表、代码块、引用）
  - 阅读进度条（渐变蓝到黄，固定顶部）
  - 代码块样式（Mac 窗口风格 + Fira Code 字体）
  - 文章头部元数据（标题、日期、阅读时间、标签、源文件链接）
  - 返回按钮导航

- **构建系统**
  - Node.js 预渲染脚本 (`scripts/build-notes.js`)
  - Markdown 转 HTML（使用 `marked` 库）
  - Frontmatter 解析（使用 `gray-matter`）
  - 导出 `notes-data.json` 供列表页使用

#### 3. 生活记录系统（Phase 6）
- **生活记录列表页 (life.html)**
  - 卡片网格布局
  - 按时间倒序排列
  - 响应式布局（桌面 3 列 / 平板 2 列 / 移动 1 列）

- **生活记录详情页**
  - Markdown 渲染
  - 图片展示优化（Sharp 压缩，WebP 格式）
  - 轻松的排版风格

- **构建系统**
  - 复用笔记系统的 Markdown 渲染方案
  - 图片压缩脚本

### 不包含的功能

MVP 阶段暂不包含以下功能，留待后续迭代：

- Phase 8 的性能深度优化（CSS 精简、prefers-reduced-motion）
- 笔记管理后台（Web Admin）
- 笔记全文搜索功能
- RSS 订阅功能
- 评论系统
- 深色模式切换
- 阅读统计功能
- GitHub Actions 自动部署（可选）

---

## 核心决策

### 决策 1：MVP 功能优先级

**决策内容**：MVP 包含所有用户可见的核心功能（首页、作品集、关于我、学习笔记、生活记录），但仅保留必要的部署任务。

**理由**：
- 用户选择了包含「基础展示 + 学习笔记系统 + 生活记录系统」的完整功能
- 这三个模块已经完成开发且功能稳定
- 能够充分展示个人品牌、技术能力和生活记录，符合 mission.md 的核心使命
- 后续优化可以在上线后逐步迭代

**影响范围**：
- 需要确保所有现有功能在 MVP 分支中正常工作
- 需要填充真实内容（项目、笔记、生活记录），消除占位符
- 验证工作量较大，需要全面测试

### 决策 2：部署方案为 GitHub Pages

**决策内容**：使用 GitHub Pages 作为 MVP 的部署平台，暂不配置 GitHub Actions 自动部署。

**理由**：
- GitHub Pages 免费、稳定，支持自动 HTTPS
- 与 GitHub 仓库无缝集成
- 纯静态网站，无需服务器和后端
- 支持自定义域名（可选）
- 手动部署流程简单（`git push` 即可）

**技术实现**：
- 配置仓库的 GitHub Pages 设置（Settings → Pages → 选择分支）
- 验证 HTTPS 和访问速度
- 可选：配置自定义域名

### 决策 3：验证标准严格执行

**决策内容**：MVP 必须通过以下 4 项验证标准才能上线：
1. **响应式布局正常**：在移动端和桌面浏览器上测试所有核心页面
2. **导航和链接完整可用**：所有导航、返回按钮、内部链接正常工作
3. **性能达标**：使用 Lighthouse 测试核心 Web Vitals（LCP < 2.5s, CLS < 0.1）
4. **内容完整无占位符**：至少 2 个真实项目、5 篇笔记、完整的个人介绍

**理由**：
- 用户选择了所有 4 项验证标准，表明对质量要求较高
- 这些标准覆盖了功能、性能、内容三个维度
- 确保上线后用户体验良好

**执行方式**：
- 使用 Chrome DevTools 进行响应式测试
- 使用真机测试（iPhone/iPad）
- 使用 Lighthouse 进行性能测试
- 手动验证所有链接和导航
- 编写测试清单（validation.md）

### 决策 4：时间预期为 1-2 天完整打磨

**决策内容**：MVP 分支的完成时间预期为 1-2 天，包含完整测试、部署配置（不包含内容填充）。

**理由**：
- 用户选择了「完整打磨」并明确不考虑内容填充
- 1-2 天足够完成以下工作：
  - Day 1: 多设备测试和响应式优化、导航和链接验证、性能测试
  - Day 2: GitHub Pages 部署配置、最终检查和文档完善

**风险缓解**：
- 如果某个环节遇到阻塞，有足够的缓冲时间
- 可以在第 1 天完成主要测试工作，第 2 天进行部署和打磨

---

## 技术约束

### 设计系统
- 严格使用 Esther Design System 的组件和布局
- 品牌配色方案已在 `css/variables.css` 中定义
- 禁止使用 HTML 默认样式

### 技术栈
- 前端：纯静态 HTML/CSS + 原生 JavaScript（ES6 模块化）
- Markdown 渲染：Node.js 预渲染（`marked` + `gray-matter`）
- 代码高亮：Mac 窗口风格 + Fira Code 字体
- 图片优化：Sharp 压缩，WebP 格式
- 部署：GitHub Pages

### 浏览器兼容性
- 现代浏览器（Chrome, Firefox, Safari, Edge 最新版本）
- 移动端浏览器（iOS Safari, Chrome for Android）
- 不支持 IE11

### 性能目标
- Lighthouse Performance Score > 90
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1
- 首屏加载时间 < 3s

---

## 成功标准

MVP 部署成功的标准：

✅ **功能完整**
- 所有页面正常访问
- 所有导航和链接正常工作
- 笔记和生活记录的标签筛选功能正常
- 邮箱复制功能正常

✅ **响应式正常**
- 在 iPhone (375px) 上测试通过
- 在 iPad (768px) 上测试通过
- 在桌面浏览器 (1920px) 上测试通过

✅ **性能达标**
- Lighthouse Performance Score > 90
- LCP < 2.5s
- CLS < 0.1

✅ **代码质量**
- 无控制台错误
- 无 404 链接
- 代码格式规范

✅ **部署成功**
- GitHub Pages 配置完成
- HTTPS 访问正常
- 域名解析正常（如果使用自定义域名）

---

## 参考文档

- `specs/mission.md` - 项目核心使命
- `specs/tech-stack.md` - 技术栈决策
- `specs/roadmap.md` - 开发路线图
- `specs/2026-09-30-phase2-homepage/` - 首页开发规格
- `specs/2026-09-30-phase4-portfolio/` - 作品集规格
- `specs/2026-09-30-phase5-notes/` - 学习笔记系统规格
- `specs/2026-09-30-phase6-life/` - 生活记录系统规格
- `specs/2026-09-30-phase7-about/` - 关于我页面规格
- `esther-design-system-main/references/checklist.md` - 质量检查清单
