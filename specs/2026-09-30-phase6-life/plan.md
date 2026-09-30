# Phase 6: 生活记录系统 - 实施计划

## 任务组划分

本计划将 Phase 6 拆分为 3 个任务组，每组可独立完成并验证。

---

## 任务组 1: 基础架构搭建

**目标**：建立生活记录系统的核心基础设施

### 1.1 创建目录结构
- [ ] 创建 `css/life.css` 样式文件
- [ ] 创建 `css/life-detail.css` 详情页样式文件
- [ ] 创建 `scripts/build-life.js` 构建脚本
- [ ] 创建 `scripts/life-filter.js` 标签筛选脚本
- [ ] 创建 `scripts/image-gallery.js` 图片画廊脚本
- [ ] 确保 `content/life/` 目录存在
- [ ] 确保 `assets/images/life/` 目录存在

### 1.2 编写构建脚本
- [ ] 复制 `scripts/build-notes.js` 作为模板
- [ ] 修改输入路径为 `content/life/*.md`
- [ ] 修改输出路径为 `life/` 目录
- [ ] 解析 frontmatter 字段：
  - `title`, `date`, `tags`, `description`, `images`
- [ ] 使用 `marked` 转换 Markdown 为 HTML
- [ ] 生成详情页 HTML（套用模板）
- [ ] 导出 `life-data.json` 包含所有记录元数据
- [ ] 按日期倒序排序记录

### 1.3 创建测试数据
- [ ] 创建 `content/life/2026-09-test-1.md`（包含 3 张图片）
- [ ] 创建 `content/life/2026-09-test-2.md`（纯文字，无图片）
- [ ] 准备测试图片到 `assets/images/life/2026-09-test-1/`
- [ ] 确保 frontmatter 格式正确

### 验证点 1
```bash
node scripts/build-life.js
```
- ✅ 成功生成 `life-data.json`
- ✅ 成功生成 `life/2026-09-test-1.html`
- ✅ 成功生成 `life/2026-09-test-2.html`
- ✅ HTML 文件包含正确的标题、日期、标签和内容

---

## 任务组 2: 列表页实现

**目标**：实现生活记录列表页，支持时间线布局和标签筛选

### 2.1 创建列表页 HTML
- [ ] 创建 `life.html` 文件
- [ ] 复用导航栏组件（`components/navigation.js`）
- [ ] 添加页面标题："生活记录"
- [ ] 创建标签筛选区域（占位符）
- [ ] 创建时间线容器（桌面端）
- [ ] 创建卡片列表容器（移动端）
- [ ] 复用 Footer 组件（`components/footer.js`）

### 2.2 实现时间线布局样式
**文件**：`css/life.css`

- [ ] 桌面端（>768px）：
  - 垂直时间轴居左（1px 蓝色虚线）
  - 日期标签（Caveat 字体，黄色背景）
  - 卡片内容居右，带左连接线
  - 卡片样式：虚线边框、圆角、悬停抬升
- [ ] 移动端（≤768px）：
  - 隐藏时间轴
  - 单列卡片列表
  - 日期标签置于卡片顶部
  - 减小间距和字号
- [ ] 卡片内容布局：
  - 第一张图片缩略图（如果有）
  - 标题（Fraunces 900）
  - 日期（Caveat，手写风格）
  - 摘要（2 行截断）
  - 标签列表（胶囊按钮）

### 2.3 实现动态渲染逻辑
**文件**：`life.html` 内联或 `scripts/life-list.js`

- [ ] 加载 `life-data.json`
- [ ] 遍历记录数据生成卡片 DOM
- [ ] 渲染日期格式化（`YYYY-MM-DD` → `MM月DD日`）
- [ ] 渲染标签列表
- [ ] 渲染缩略图（如果 `images[0]` 存在）
- [ ] 绑定卡片点击事件，跳转到详情页
- [ ] 处理空状态（无记录时显示提示）

### 2.4 实现标签筛选功能
**文件**：`scripts/life-filter.js`

- [ ] 从 `life-data.json` 提取所有唯一标签
- [ ] 渲染标签云（顶部）
- [ ] 绑定标签点击事件
  - 筛选显示包含该标签的记录
  - 更新 URL 参数（`?tag=旅行`）
  - 高亮当前选中标签
- [ ] "显示全部"按钮清除筛选
- [ ] 页面加载时读取 URL 参数自动筛选

### 验证点 2
- ✅ 浏览器打开 `life.html`，显示两条测试记录
- ✅ 桌面端显示时间线布局
- ✅ 移动端（DevTools 模拟）显示单列卡片
- ✅ 标签云显示所有标签
- ✅ 点击标签成功筛选记录
- ✅ 点击卡片跳转到详情页
- ✅ URL 参数 `?tag=xxx` 自动筛选

---

## 任务组 3: 详情页与图片画廊

**目标**：实现详情页、图片画廊和 Lightbox 功能

### 3.1 创建详情页模板
**文件**：`scripts/build-life.js` 中的模板生成逻辑

- [ ] HTML 基础结构：
  - 导航栏（复用 `components/navigation.js`）
  - 返回按钮（"← 返回生活记录"）
  - 文章头部区域
  - Markdown 内容容器
  - Footer
- [ ] 文章头部内容：
  - 标题（Fraunces 900，大号）
  - 日期（Caveat 手写字体，黄色强调）
  - 标签列表（可点击跳转到列表页筛选）
  - 横向分隔线（虚线）
- [ ] 链接样式表：
  - `css/variables.css`
  - `css/life-detail.css`
  - Esther Design System 组件样式
- [ ] 引入脚本：
  - `scripts/image-gallery.js`

### 3.2 实现详情页样式
**文件**：`css/life-detail.css`

- [ ] 内容区域最大宽度 720px，居中
- [ ] Markdown 元素样式：
  - 标题（h2-h6，Noto Serif SC）
  - 段落行高 1.8
  - 列表缩进
  - 引用块（大引号样式，从 `components.md` 提取）
  - 代码块（Mac 窗口风格，Fira Code）
- [ ] 图片画廊容器：
  - 横向滚动（`overflow-x: auto`）
  - 图片间距 1rem
  - 圆角边框
  - 悬停缩放动画（`transform: scale(1.05)`）
- [ ] 响应式调整：
  - 移动端减小字号和间距
  - 图片画廊宽度 100%

### 3.3 实现图片画廊功能
**文件**：`scripts/image-gallery.js`

- [ ] 识别 Markdown 中的图片列表
- [ ] 生成横向滚动画廊 HTML
- [ ] 绑定图片点击事件，打开 Lightbox
- [ ] 实现 Lightbox 模态框：
  - 全屏遮罩（半透明黑色背景）
  - 居中显示大图
  - 左右箭头按钮切换图片
  - 关闭按钮（右上角 X）
  - ESC 键关闭
  - 点击遮罩关闭
- [ ] 图片预加载优化
- [ ] 键盘导航（左/右箭头切换图片）

### 3.4 实现特色组件集成
**文件**：`css/life-detail.css` + Markdown 内容

- [ ] 从 `esther-design-system-main/references/components.md` 提取样式：
  - 对话气泡（`.dialogue-bubble`）
  - 大引号引用块（`.big-quote`）
  - 黄色荧光笔高亮（`.highlight-yellow`）
  - 手写注释（`.handwriting`，Caveat 字体）
- [ ] **推荐字体组件**（根据需要选用）：
  - #44 Sparkles Text（星光文字）- 适用于 hero 标题、金句强调
  - #48 Kinetic Text（动态字重）- 适用于交互式标题装饰
  - #51 Comic Text（漫画文字）- 适用于趣味标题、活动记录
  - #52 Spinning Text（环形旋转）- 适用于装饰、头像周围
- [ ] 在详情页样式中封装为 CSS 类
- [ ] 测试 Markdown 内使用 HTML 标签：
  ```markdown
  <div class="big-quote">
  这是一段重要的感悟
  </div>
  ```

### 3.5 图片懒加载和压缩优化
- [ ] 图片添加 `loading="lazy"` 属性
- [ ] 可选：使用 Intersection Observer API 监听可见性
- [ ] **编写图片压缩脚本** `scripts/compress-images.js`：
  - 读取 `assets/images/life/` 目录下所有图片
  - 使用 `sharp` 库压缩图片（或手动使用 ImageOptim/TinyPNG）
  - 生成缩略图（宽度 800px，质量 80%）
  - 生成大图（宽度 1920px，质量 85%）
  - 可选：转换为 WebP 格式
  - 输出到 `assets/images/life-optimized/` 目录

### 验证点 3
- ✅ 浏览器打开 `life/2026-09-test-1.html`
- ✅ 显示标题、日期、标签、内容
- ✅ 图片以横向滚动画廊展示
- ✅ 点击图片打开 Lightbox 全屏查看
- ✅ 左右箭头切换图片正常
- ✅ ESC 键关闭 Lightbox
- ✅ 返回按钮跳转到列表页
- ✅ 引用块、高亮等特色组件样式正确
- ✅ 移动端布局适配良好

---

## 任务组 4: 完善与优化（可选）

**目标**：提升用户体验和性能

### 4.1 性能优化
- [ ] **图片自动压缩脚本**（`scripts/compress-images.js`）：
  - 安装依赖：`npm install sharp --save-dev`
  - 读取 `assets/images/life/` 所有图片
  - 压缩为两个版本：
    - 缩略图：宽度 800px，质量 80%，输出到 `*-thumb.jpg`
    - 大图：宽度 1920px，质量 85%，输出到 `*-large.jpg`
  - 可选：生成 WebP 格式（`*.webp`）
  - 输出压缩统计报告（原始大小 vs 压缩后大小）
- [ ] 运行压缩脚本：`node scripts/compress-images.js`
- [ ] 验证图片文件大小符合要求（缩略图 ≤300KB，大图 ≤1MB）
- [ ] 添加 `prefers-reduced-motion` CSS 查询
- [ ] 减少 CSS 未使用样式
- [ ] 测试多设备加载速度

### 4.2 交互优化
- [ ] Scroll Reveal 动画（卡片淡入）
- [ ] 标签点击防抖处理
- [ ] 图片加载进度指示器
- [ ] 空状态优化（无记录时显示插画）

### 4.3 内容扩展
- [ ] 添加 5-10 条真实生活记录
- [ ] 准备真实图片素材
- [ ] 测试不同标签组合

### 验证点 4
- ✅ Lighthouse 性能评分 >90
- ✅ 移动端体验流畅
- ✅ 动画效果自然不突兀

---

## 实施顺序建议

1. **先完成任务组 1**：确保构建脚本和数据流正常
2. **再完成任务组 2**：实现列表页浏览和筛选
3. **最后完成任务组 3**：实现详情页和图片功能
4. **任务组 4 可迭代优化**：不影响核心功能上线

---

## 依赖关系

```
任务组 1（基础架构）
    ↓
任务组 2（列表页） ← 必须先有 life-data.json
    ↓
任务组 3（详情页） ← 必须先有详情页 HTML 生成
    ↓
任务组 4（优化）  ← 可选增强
```

---

## 预计工作量

| 任务组 | 预计时间 | 关键风险 |
|--------|----------|----------|
| 任务组 1 | 1.5 小时 | Markdown 图片路径处理可能出错 |
| 任务组 2 | 2 小时 | 时间线布局 CSS 较复杂 |
| 任务组 3 | 2.5 小时 | Lightbox 交互需要仔细测试 |
| 任务组 4 | 1 小时 | 图片压缩需要额外工具 |
| **总计** | **7 小时** | MVP 可控制在 6 小时内 |

---

## 技术难点与解决方案

### 难点 1：图片路径处理
**问题**：Markdown 中使用相对路径 `../../assets/images/life/xxx.jpg`，构建后可能失效

**解决方案**：
- 构建脚本中正则替换相对路径为绝对路径
- 或统一使用 `/assets/images/life/` 开头的路径
- 在详情页模板中设置 `<base href="/">` 标签

### 难点 2：时间线布局响应式
**问题**：桌面端时间轴在移动端难以展示

**解决方案**：
- 使用媒体查询完全切换布局方式
- 桌面端：`display: grid; grid-template-columns: 80px 1fr;`
- 移动端：`display: block;`，隐藏时间轴

### 难点 3：Lightbox 键盘导航
**问题**：左右箭头切换图片需要维护当前索引

**解决方案**：
```javascript
let currentIndex = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  if (e.key === 'Escape') closeLightbox();
});
```

---

## 验收标准

完成本计划后，应满足：
- ✅ 列表页正常显示所有生活记录
- ✅ 标签筛选功能正常工作
- ✅ 详情页正确渲染 Markdown 内容
- ✅ 图片画廊和 Lightbox 交互流畅
- ✅ 移动端和桌面端响应式适配完善
- ✅ 构建脚本可重复执行，无错误
