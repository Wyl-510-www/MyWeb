# Phase 5: 学习笔记系统 - 实施计划

## 任务组 1：构建脚本开发
**目标**：创建 Markdown 转 HTML 的预渲染脚本

### 1.1 环境准备
- [ ] 初始化 Node.js 项目（`npm init -y`）
- [ ] 安装依赖：
  ```bash
  npm install marked gray-matter fs-extra --save-dev
  ```
  - `marked`：Markdown 转 HTML
  - `gray-matter`：解析 YAML front matter
  - `fs-extra`：文件操作工具

### 1.2 编写构建脚本
- [ ] 创建 `scripts/build-notes.js`
- [ ] 实现功能模块：
  - 读取 `content/notes/*.md` 文件
  - 解析 front matter（title, date, tags, description, readingTime）
  - 转换 Markdown 为 HTML
  - 生成笔记详情页 HTML（套用模板）
  - 生成笔记列表数据 `notes-data.json`
  - 输出到 `notes/` 目录

### 1.3 创建 HTML 模板
- [ ] 创建 `scripts/templates/note-detail.html`
- [ ] 模板包含：
  - 全站导航栏
  - 阅读进度条占位
  - 文章头部（标题、时间、标签）
  - 正文内容占位 `{{content}}`
  - 返回导航
  - Footer

### 1.4 测试构建流程
- [ ] 创建 3 篇测试笔记 Markdown 文件
- [ ] 运行构建脚本：`node scripts/build-notes.js`
- [ ] 验证生成的 HTML 文件正确性

**预计时间**：3-4 小时

---

## 任务组 2：笔记列表页开发
**目标**：实现笔记列表页面，展示所有笔记卡片

### 2.1 创建页面结构
- [ ] 创建 `notes.html`
- [ ] 添加全站导航栏（复用 `components/NavigationBar.js`）
- [ ] 添加页面标题区域（大标题 + 副标题）
- [ ] 添加标签筛选器区域
- [ ] 添加笔记卡片网格容器
- [ ] 添加 Footer（复用 `components/Footer.js`）

### 2.2 实现笔记卡片组件
- [ ] 创建 `components/NoteCard.js`
- [ ] 使用杂志裁切风格卡片样式
- [ ] 卡片内容：
  - 标题（Fraunces 900，大字体）
  - 标签列表（胶囊按钮，蓝/黄/红三色）
  - 发布时间（小字，灰色）
  - 摘要（1-2 行，Noto Sans SC）
  - 阅读时长（如："5 分钟阅读"）
  - "阅读全文"链接（波浪下划线动画）

### 2.3 实现标签筛选功能
- [ ] 创建 `scripts/notes-filter.js`
- [ ] 从 `notes-data.json` 读取所有标签
- [ ] 渲染标签筛选器（胶囊按钮）
- [ ] 实现点击标签筛选逻辑：
  - 高亮选中的标签
  - 显示/隐藏对应的笔记卡片
  - 支持取消筛选（显示全部）
- [ ] URL 参数支持（`?tag=JavaScript`）

### 2.4 样式和响应式
- [ ] 创建 `css/notes.css`
- [ ] 网格布局：
  - 桌面：3 列（`grid-template-columns: repeat(3, 1fr)`）
  - 平板：2 列
  - 移动：1 列
- [ ] 卡片悬停效果（抬升、阴影）
- [ ] 移动端优化（间距、字体大小）

**预计时间**：3-4 小时

---

## 任务组 3：笔记详情页开发
**目标**：实现笔记详情页面，展示完整文章内容

### 3.1 完善详情页模板
- [ ] 在 `scripts/templates/note-detail.html` 中添加样式引用
- [ ] 引入 `css/note-detail.css`
- [ ] 引入 `scripts/reading-progress.js`

### 3.2 应用 Esther Design System 样式
- [ ] 创建 `css/note-detail.css`
- [ ] 标题样式：阴影标题或穿透标题
- [ ] 代码块样式：Mac 窗口（红黄绿按钮）
- [ ] 引用块样式：重点笔记样式（大引号）
- [ ] 段落样式：Noto Sans SC，行高 1.8
- [ ] 链接样式：蓝色 + 波浪下划线
- [ ] 列表样式：自定义 bullet 点

### 3.3 实现阅读进度条
- [ ] 创建 `scripts/reading-progress.js`
- [ ] 监听页面滚动事件
- [ ] 计算阅读进度：
  ```javascript
  progress = (scrollTop / (scrollHeight - clientHeight)) * 100
  ```
- [ ] 更新进度条宽度
- [ ] 样式：固定在页面顶部，蓝色渐变

### 3.4 代码高亮
- [ ] 可选：引入 Prism.js 代码高亮库
- [ ] 或使用 `marked` 的高亮选项
- [ ] 应用 Mac 窗口样式包装代码块

### 3.5 返回导航
- [ ] 在文章底部添加"返回笔记列表"链接
- [ ] 使用蓝色按钮样式
- [ ] 添加向左箭头图标

**预计时间**：3-4 小时

---

## 任务组 4：示例内容创建
**目标**：创建至少 3 篇示例笔记

### 4.1 创建笔记文件
- [ ] `content/notes/javascript-performance.md`
  - 标题：JavaScript 性能优化实践
  - 标签：JavaScript, 性能优化
  - 内容：介绍常见性能优化技巧（防抖、节流、懒加载等）
  
- [ ] `content/notes/react-hooks-best-practices.md`
  - 标题：React Hooks 最佳实践
  - 标签：React, JavaScript
  - 内容：useEffect、useMemo、useCallback 使用技巧
  
- [ ] `content/notes/css-responsive-design.md`
  - 标题：CSS 响应式设计技巧
  - 标签：CSS, 响应式
  - 内容：媒体查询、Flexbox、Grid 布局实践

### 4.2 内容质量检查
- [ ] 每篇笔记至少 500 字
- [ ] 包含代码示例（测试 Mac 窗口样式）
- [ ] 包含引用块（测试重点笔记样式）
- [ ] 包含列表（测试列表样式）
- [ ] 检查 YAML front matter 格式正确

**预计时间**：2-3 小时

---

## 任务组 5：集成和测试
**目标**：集成到主站，全面测试功能

### 5.1 导航集成
- [ ] 在首页导航卡片中添加"学习笔记"卡片
- [ ] 更新全站导航栏，添加"笔记"链接
- [ ] 确保 Footer 在笔记页面正确显示

### 5.2 构建流程
- [ ] 运行 `node scripts/build-notes.js` 生成笔记页面
- [ ] 验证 `notes/` 目录生成正确
- [ ] 验证 `notes-data.json` 数据正确

### 5.3 功能测试
- [ ] **笔记列表页**：
  - 卡片正确显示
  - 标签筛选功能正常
  - 响应式布局正确（桌面 3 列 → 移动 1 列）
  - 链接跳转正确
  
- [ ] **笔记详情页**：
  - 阅读进度条随滚动更新
  - 代码块 Mac 窗口样式正确
  - 引用块样式正确
  - 标题样式正确
  - 返回链接正常
  
- [ ] **跨页面测试**：
  - 从首页 → 笔记列表 → 笔记详情 → 返回列表
  - URL 参数筛选（`notes.html?tag=JavaScript`）

### 5.4 对照清单验证
- [ ] 对照 `esther-design-system-main/references/checklist.md`
- [ ] P0 检查项：
  - 移动端适配
  - 链接可点击区域足够大
  - 加载速度（图片优化）
  - 颜色对比度符合 WCAG

### 5.5 多设备测试
- [ ] Chrome DevTools 测试：iPhone、iPad、桌面
- [ ] 真机测试（可选）

**预计时间**：2-3 小时

---

## 任务组 6：文档和提交
**目标**：完善文档，提交代码

### 6.1 更新文档
- [ ] 在 `README.md` 中添加笔记系统使用说明
- [ ] 创建 `specs/2026-09-30-phase5-notes/completion.md`
- [ ] 记录实际耗时和完成内容

### 6.2 Git 提交
- [ ] 暂存所有更改
- [ ] 创建提交：
  ```bash
  git add .
  git commit -m "feat: 完成 Phase 5 学习笔记系统
  
  - Node.js 预渲染脚本
  - 笔记列表页（卡片网格 + 标签筛选）
  - 笔记详情页（Mac 窗口代码样式 + 阅读进度条）
  - 3 篇示例笔记
  
  Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
  ```

### 6.3 更新路线图
- [ ] 在 `specs/roadmap.md` 中标记 Phase 5 为已完成
- [ ] 记录实际耗时

**预计时间**：1 小时

---

## 总体时间估算
- 任务组 1：3-4 小时
- 任务组 2：3-4 小时
- 任务组 3：3-4 小时
- 任务组 4：2-3 小时
- 任务组 5：2-3 小时
- 任务组 6：1 小时

**总计**：14-19 小时

---

## 依赖关系
- 任务组 1 必须先完成（构建脚本是基础）
- 任务组 2、3 可以并行开发（列表页和详情页相对独立）
- 任务组 4 依赖任务组 1（需要构建脚本转换 Markdown）
- 任务组 5 依赖任务组 1-4 全部完成
- 任务组 6 最后执行

---

## 风险和注意事项

### 技术风险
- **Node.js 环境**：确保本地已安装 Node.js（建议 v16+）
- **路径问题**：Windows 环境路径分隔符需处理（使用 `path.join()`）
- **编码问题**：Markdown 文件确保 UTF-8 编码

### 设计风险
- **卡片内容过长**：摘要需严格控制在 1-2 行
- **标签过多**：单个笔记标签建议不超过 3 个
- **代码块溢出**：Mac 窗口样式需支持横向滚动

### 迭代原则
- 先实现核心功能（列表 + 详情），再优化交互（筛选 + 进度条）
- 先静态内容，后动态交互
- 保持 Esther Design System 组件复用，禁止自创样式
