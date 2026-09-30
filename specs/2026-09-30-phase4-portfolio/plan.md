# Phase 4: 作品集页面 - 实施计划

## 任务组概览

1. **创建页面结构**：HTML 骨架 + 导航栏 + Footer
2. **实现卡片样式**：杂志裁切风格卡片 + 技术栈标签
3. **响应式适配**：桌面 2 列 → 移动端 1 列
4. **测试与优化**：浏览器测试 + 性能检查

---

## 任务组 1: 创建页面结构

**目标**：搭建 `portfolio.html` 基础框架

### 步骤

1. 创建 `portfolio.html` 文件
   - 复制 `index.html` 的 `<head>` 部分（字体、样式引用）
   - 添加 `portfolio.css` 样式表引用
   
2. 添加导航栏
   - 复用全局导航栏组件
   - 标记"作品集"为当前激活页面（`.active`）

3. 创建页面标题区
   - 使用 `.page-header` 包含标题和副标题
   - 应用 Scroll Reveal 动画（`.reveal`）

4. 创建项目网格容器
   - 使用 `.portfolio-grid` 作为卡片容器

5. 复用 Footer 组件

**预计时间**：30 分钟

---

## 任务组 2: 实现卡片样式

**目标**：创建杂志裁切风格的项目卡片样式

### 步骤

1. 创建 `components/portfolio/` 目录

2. 编写 `portfolio.css`
   - 页面标题样式（`.page-title`, `.page-subtitle`）
   - 网格布局（`.portfolio-grid`）：
     ```css
     grid-template-columns: repeat(2, 1fr);
     gap: 40px;
     ```
   - 杂志卡片样式（`.portfolio-card`）：
     - 参考 `components.md` #1A 杂志裁切风卡片
     - 大标题：Fraunces 900 / Noto Serif SC 700
     - 白底卡片，圆角，投影
   - 技术栈标签（`.tag`）：
     - 胶囊按钮样式（圆角、内边距、品牌配色）
     - 三种颜色变体：`.tag-blue`, `.tag-yellow`, `.tag-red`
   - 卡片悬停效果（`transform: translateY(-4px)`）

3. 添加示例项目卡片到 HTML
   - 至少 3 个项目示例
   - 每个卡片包含：标题、标签、描述、链接

**预计时间**：1 小时

---

## 任务组 3: 响应式适配

**目标**：确保桌面和移动端布局良好

### 步骤

1. 在 `portfolio.css` 中添加媒体查询
   ```css
   @media (max-width: 768px) {
     .portfolio-grid {
       grid-template-columns: 1fr;
       gap: 24px;
     }
   }
   ```

2. 调整卡片内容间距
   - 移动端减小卡片内边距（`padding: 24px`）
   - 调整标题字号（使用 `clamp()`）

4. 测试不同屏幕尺寸
   - Chrome DevTools 设备模拟器
   - 测试断点：375px (iPhone SE), 768px (iPad), 1440px (Desktop)

**预计时间**：30 分钟

---

## 任务组 4: 测试与优化

**目标**：验证功能完整性和性能

### 步骤

1. 功能测试
   - [ ] 卡片链接可点击跳转
   - [ ] 悬停效果流畅
   - [ ] Scroll Reveal 动画正常触发

2. 响应式测试
   - [ ] 桌面端 2 列布局正常
   - [ ] 移动端 1 列布局正常

3. 浏览器兼容性测试
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

4. 性能检查
   - [ ] 页面加载时间 < 2 秒
   - [ ] 无控制台错误
   - [ ] 图片和字体正常加载

5. 对照 `checklist.md` 验证
   - 参考 `esther-design-system-main/references/checklist.md`
   - 检查 P0 必须项

**预计时间**：30 分钟

---

## 总体时间估算

- **任务组 1**：30 分钟
- **任务组 2**：1 小时
- **任务组 3**：30 分钟
- **任务组 4**：30 分钟

**总计**：约 2.5 小时

---

## 依赖关系

- 任务组 1 → 任务组 2（需要 HTML 结构）
- 任务组 2 → 任务组 3（需要卡片样式）
- 任务组 3 → 任务组 4（需要完整实现）

---

## 风险与应对

| 风险 | 影响 | 应对措施 |
|------|------|---------|
| Scroll Reveal 动画不触发 | 低 | 检查 `main.js` 是否正确引入 |
| 卡片内容过长导致高度不一致 | 低 | 限制描述文字行数，使用 `line-clamp` |
| 移动端布局错位 | 中 | 测试多种设备尺寸，调整断点 |

---

## 完成标准

1. ✅ `portfolio.html` 页面可正常访问
2. ✅ 至少展示 3 个项目卡片（含 1 个真实项目）
3. ✅ 响应式布局：桌面 2 列，移动端 1 列
4. ✅ 通过浏览器兼容性测试
5. ✅ 无控制台错误，性能良好
6. ✅ 符合 Esther Design System 设计规范
