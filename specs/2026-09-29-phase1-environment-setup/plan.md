# Phase 1: 环境准备 - 实施计划

## 任务分组

### Task Group 1: CSS 变量文件创建
**预计时间**：10 分钟

1. 创建 `css/variables.css`
2. 定义 A 方案的六个核心颜色变量
3. 添加注释说明每个颜色的用途

**产出**：
- `css/variables.css` 文件

---

### Task Group 2: 基础 HTML 模板创建
**预计时间**：20 分钟

1. 从 `esther-design-system-main/demo-landing.html` 复制到项目根目录 `index.html`
2. 修改 `<head>` 引入 `css/variables.css`
3. 更新头像路径为 `assets/avatar.jpg`
4. 清理示例内容，保留 HTML 结构框架
5. 验证样式路径正确（确保 Esther Design System 的 CSS 正确加载）

**产出**：
- `index.html` 文件

**关键文件**：
- 输入：`esther-design-system-main/demo-landing.html`
- 输出：`index.html`

---

### Task Group 3: 项目 README 编写
**预计时间**：15 分钟

1. 创建 `README.md`
2. 编写项目简介（引用 `specs/mission.md`）
3. 记录技术栈（引用 `specs/tech-stack.md`）
4. 说明目录结构
5. 提供本地开发指南（如何在浏览器打开 `index.html`）
6. 说明 GitHub Pages 部署准备

**产出**：
- `README.md` 文件

---

### Task Group 4: 验证和文档完善
**预计时间**：10 分钟

1. 在浏览器打开 `index.html`，验证样式正常加载
2. 检查 `css/variables.css` 变量在 DevTools 中可见
3. 检查头像显示正常
4. 对照 `validation.md` 逐项验证
5. 完善 `specs/` 目录下的三个文档

**验证清单**：
- [ ] `index.html` 在浏览器正常渲染
- [ ] CSS 变量生效（通过 DevTools 检查 `:root` 变量）
- [ ] 头像路径正确且图片显示
- [ ] 响应式布局工作正常（测试 900px、600px 断点）
- [ ] 所有文档无遗漏

---

## 任务依赖关系

```
Task Group 1 (CSS 变量)
    ↓
Task Group 2 (HTML 模板) → Task Group 4 (验证)
    ↓
Task Group 3 (README)
```

**说明**：
- Task Group 2 依赖 Task Group 1（需要先有 `variables.css` 才能引用）
- Task Group 3 可与 Task Group 2 并行
- Task Group 4 等待所有前置任务完成

---

## 实施顺序

1. **创建 CSS 变量文件**（必须先做，其他任务依赖此文件）
2. **创建 HTML 模板**（核心交付物）
3. **编写 README**（可并行）
4. **验证和完善**（最后统一验证）

---

## 关键路径

```
创建 css/variables.css
  → 修改 index.html 引用变量文件
    → 验证浏览器渲染
      → 完成
```

**最短完成时间**：45 分钟（不包括文档编写）

---

## 风险与缓解

### 风险 1：样式路径问题
**描述**：`index.html` 引用 Esther Design System 的 CSS 时路径错误

**缓解**：
- 复制时保持 `demo-landing.html` 的相对路径结构
- 在 `<head>` 中添加相对路径 `<link rel="stylesheet" href="esther-design-system-main/...">`

### 风险 2：CSS 变量不生效
**描述**：`variables.css` 优先级低于内联样式或原始样式

**缓解**：
- 确保 `variables.css` 在 `<head>` 最顶部引入
- 使用 DevTools 检查变量是否被覆盖

### 风险 3：头像文件过大
**描述**：头像 5.5MB 可能影响加载速度

**缓解**：
- Phase 1 暂不优化，记录在后续 TODO
- Phase 7 优化阶段统一处理图片压缩

---

## 架构考量

### CSS 组织方式
```
index.html
  → css/variables.css (品牌色变量)
  → esther-design-system-main/[内嵌样式] (组件样式)
```

**决策**：
- 品牌色通过 CSS 变量覆盖 Esther Design System 的默认色
- 不修改设计系统源文件，保持可更新性

### 文件路径约定
- 静态资源放 `assets/`
- 样式文件放 `css/`
- Markdown 内容放 `content/`
- 规格文档放 `specs/`

---

## 后续接口

Phase 1 完成后，Phase 2（首页开发）需要：
- 使用 `index.html` 作为基础
- 引用 `css/variables.css` 中的配色
- 从 `esther-design-system-main/references/components.md` 选择组件
- 填充 Hero 区域和导航卡片内容

**交付给 Phase 2 的资产**：
- ✅ 可运行的 `index.html`
- ✅ 配色系统 `css/variables.css`
- ✅ 头像 `assets/avatar.jpg`
- ✅ 完整的项目文档
