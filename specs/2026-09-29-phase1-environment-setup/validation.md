# Phase 1: 环境准备 - 验证清单

## 验证标准

### 1. 目录结构验证 ✅

**验证方法**：
```bash
# 检查目录是否存在
ls -la assets/
ls -la assets/images/
ls -la content/notes/
ls -la content/life/
ls -la css/
ls -la specs/2026-09-29-phase1-environment-setup/
```

**通过标准**：
- [x] `assets/` 目录存在
- [x] `assets/images/` 子目录存在
- [x] `assets/avatar.jpg` 文件存在（大小约 5.5MB）
- [x] `content/notes/` 目录存在
- [x] `content/life/` 目录存在
- [x] `css/` 目录存在
- [x] `specs/2026-09-29-phase1-environment-setup/` 目录存在

---

### 2. 品牌色变量文件验证

**验证方法**：
```bash
# 检查文件是否存在
test -f css/variables.css && echo "✅ 文件存在" || echo "❌ 文件缺失"

# 查看文件内容
cat css/variables.css
```

**通过标准**：
- [ ] `css/variables.css` 文件存在
- [ ] 包含以下六个 CSS 变量：
  - `--color-primary: #3457B8;`
  - `--color-accent: #FFD646;`
  - `--color-highlight: #E25555;`
  - `--color-bg: #F8F6F0;`
  - `--color-text: #2D2D2D;`
  - `--color-white: #FFFFFF;`
- [ ] 每个变量有注释说明用途

---

### 3. 基础 HTML 模板验证

**验证方法**：
```bash
# 检查文件是否存在
test -f index.html && echo "✅ 文件存在" || echo "❌ 文件缺失"

# 在浏览器打开
# Windows: start index.html
# Mac: open index.html
# Linux: xdg-open index.html
```

**通过标准**：
- [ ] `index.html` 文件存在于项目根目录
- [ ] `<head>` 中包含 `<link rel="stylesheet" href="css/variables.css">`
- [ ] 头像路径为 `assets/avatar.jpg`
- [ ] 引用 Esther Design System 的 CSS（检查相对路径正确）
- [ ] 在浏览器打开后页面正常渲染，无控制台错误
- [ ] 样式正确加载（检查 Hero 区域、卡片等组件样式）

**浏览器 DevTools 验证**：
1. 打开 `index.html`
2. 按 F12 打开 DevTools
3. 切换到 Elements 标签
4. 选择 `<html>` 元素
5. 在 Styles 面板检查 `:root` 变量是否包含自定义配色
6. 切换到 Console 标签，确认无 404 或样式错误

---

### 4. 响应式布局验证

**验证方法**：
1. 在浏览器打开 `index.html`
2. 按 F12 打开 DevTools
3. 点击设备模拟图标（Toggle device toolbar）
4. 测试以下断点：
   - 桌面端：1200px+
   - 平板端：600px - 900px
   - 移动端：< 600px

**通过标准**：
- [ ] 桌面端布局正常（卡片横向排列）
- [ ] 平板端布局适配（卡片 2 列）
- [ ] 移动端布局适配（卡片单列堆叠）
- [ ] 头像在各尺寸下正常显示
- [ ] 文字不溢出，间距合理

---

### 5. 项目文档验证

**验证方法**：
```bash
# 检查 README 是否存在
test -f README.md && echo "✅ 文件存在" || echo "❌ 文件缺失"

# 检查 specs 文档
ls specs/2026-09-29-phase1-environment-setup/
```

**通过标准**：
- [ ] `README.md` 存在于项目根目录
- [ ] README 包含以下章节：
  - 项目简介
  - 技术栈说明
  - 目录结构
  - 本地开发指南
  - 部署说明
- [ ] `specs/2026-09-29-phase1-environment-setup/requirements.md` 存在
- [ ] `specs/2026-09-29-phase1-environment-setup/plan.md` 存在
- [ ] `specs/2026-09-29-phase1-environment-setup/validation.md` 存在（本文件）

---

## 端到端验证流程

### 完整验证步骤

1. **克隆仓库验证**（模拟新成员加入）：
   ```bash
   git clone <repo-url>
   cd MyWeb
   ```

2. **检查文件完整性**：
   ```bash
   ls -la
   ls -la assets/
   ls -la css/
   ls -la content/
   ```

3. **打开首页**：
   - 双击 `index.html` 或通过浏览器打开

4. **验证样式**：
   - 检查配色是否为 A 方案（蓝黄红）
   - 检查头像是否显示
   - 检查响应式布局

5. **阅读文档**：
   - 阅读 `README.md` 了解项目
   - 阅读 `specs/mission.md` 了解目标
   - 阅读 `specs/roadmap.md` 了解进度

---

## 失败场景与修复

### 场景 1：样式未加载
**现象**：`index.html` 打开后是纯 HTML，无样式

**检查**：
1. DevTools Console 是否有 404 错误
2. `<link>` 标签路径是否正确
3. `css/variables.css` 文件是否存在

**修复**：
- 修正 CSS 文件路径
- 确保 Esther Design System 的 CSS 正确引用

### 场景 2：头像不显示
**现象**：头像位置显示裂图图标

**检查**：
1. `assets/avatar.jpg` 是否存在
2. HTML 中图片路径是否正确

**修复**：
- 检查文件路径拼写
- 确认图片格式正确（虽然命名为 .jpg，实际是 .png 也能显示）

### 场景 3：CSS 变量不生效
**现象**：页面显示 Esther Design System 默认配色，而非 A 方案

**检查**：
1. DevTools → Elements → `:root` 查看变量定义
2. 检查 `variables.css` 是否在 `<head>` 顶部引入

**修复**：
- 调整 `<link>` 标签顺序，确保 `variables.css` 在最前
- 使用 `!important` 强制覆盖（不推荐，优先调整引入顺序）

---

## 质量门禁

Phase 1 必须通过以下门禁才能进入 Phase 2：

### P0（必须通过）
- [x] 目录结构完整
- [ ] `index.html` 能在浏览器打开且样式正确
- [ ] `css/variables.css` 包含 A 方案配色
- [ ] 头像显示正常
- [ ] `README.md` 记录完整

### P1（建议通过）
- [ ] 响应式布局在三个断点正常工作
- [ ] specs 文档齐全（requirements、plan、validation）
- [ ] Git 提交信息清晰

### P2（可选）
- [ ] 图片资源优化（Phase 7 再处理）
- [ ] 添加 favicon
- [ ] 添加 meta 标签（SEO、OG）

---

## 验证签字

**验证人**：___________  
**验证日期**：2026-09-29  
**验证结果**：□ 通过 / □ 不通过  
**备注**：___________
