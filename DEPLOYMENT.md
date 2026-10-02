# MVP 快速部署指南

**当前分支**: Mvp
**准备状态**: ✅ 就绪

---

## 快速部署步骤

### 方案 A: 部署 Mvp 分支（推荐用于测试）

```bash
# 1. 推送 Mvp 分支到 GitHub
git push origin Mvp

# 2. 在 GitHub 上配置 Pages
# 访问: https://github.com/Wyl-510-www/MyWeb/settings/pages
# - Source: Deploy from a branch
# - Branch: Mvp
# - Folder: / (root)
# - 点击 Save

# 3. 等待部署完成（1-2 分钟）
# 访问: https://wyl-510-www.github.io/MyWeb/
```

### 方案 B: 合并到主分支后部署（推荐用于正式上线）

```bash
# 1. 切换到主分支（假设是 2026-09-30-phase4-portfolio）
git checkout 2026-09-30-phase4-portfolio

# 2. 合并 Mvp 分支
git merge Mvp

# 3. 解决冲突（如果有）
# 检查冲突文件并手动解决

# 4. 推送到 GitHub
git push origin 2026-09-30-phase4-portfolio

# 5. 在 GitHub 上配置 Pages
# 访问: https://github.com/Wyl-510-www/MyWeb/settings/pages
# - Branch: 2026-09-30-phase4-portfolio
# - Folder: / (root)
# - 点击 Save

# 6. 等待部署完成
```

---

## 部署后验证清单

访问部署的 URL（例如 https://wyl-510-www.github.io/MyWeb/）

### 基础验证
- [ ] 首页可以正常访问
- [ ] 所有页面可以正常访问（portfolio, notes, life, about）
- [ ] 导航栏链接工作正常
- [ ] 图片和样式正常加载
- [ ] HTTPS 正常工作（浏览器地址栏显示锁图标）

### 功能验证
- [ ] 首页导航卡片翻转效果正常
- [ ] 学习笔记标签筛选功能正常
- [ ] 笔记详情页阅读进度条正常
- [ ] 所有返回按钮正常工作
- [ ] 外部链接在新窗口打开

### 控制台检查
打开 Chrome DevTools (F12)：
- [ ] Console 无 JavaScript 错误
- [ ] Network 无 404 错误
- [ ] 所有资源正常加载

### 响应式检查
使用 Chrome DevTools Device Toolbar：
- [ ] 桌面端 (1920px) 布局正常
- [ ] 平板端 (768px) 布局正常
- [ ] 移动端 (375px) 布局正常

---

## 常见问题

### 问题 1: 页面显示 404
**原因**: GitHub Pages 可能还在构建中
**解决**: 等待 1-2 分钟后刷新页面

### 问题 2: CSS 样式未加载
**原因**: 可能是缓存问题或路径问题
**解决**: 
- 强制刷新 (Ctrl+Shift+R)
- 检查 GitHub Pages 的 base URL 配置

### 问题 3: 图片无法显示
**原因**: 图片路径可能不正确
**解决**: 
- 检查图片文件是否已提交到仓库
- 检查图片路径是否使用相对路径

### 问题 4: JavaScript 功能不工作
**原因**: 可能是 CORS 或路径问题
**解决**: 
- 检查 Console 错误信息
- 确认所有 JS 文件已提交
- 检查 JS 文件路径

---

## 部署完成后的下一步

### 1. 性能优化
根据 Lighthouse 测试结果，优化：
- 图片压缩和 WebP 转换
- CSS/JS 文件压缩
- 字体加载优化

### 2. 内容填充
- 添加更多真实项目到作品集
- 编写更多学习笔记
- 记录更多生活瞬间

### 3. 功能增强
根据 `requirements.md` 中的后续迭代计划：
- 添加搜索功能
- 添加评论系统
- 实现深色模式
- 添加阅读统计

### 4. 自定义域名（可选）
如果有自定义域名：
1. 在域名服务商配置 DNS 记录
2. 在 GitHub Pages 设置中添加自定义域名
3. 在项目根目录创建 CNAME 文件
4. 启用 HTTPS

---

## 回滚方案

如果部署后发现严重问题：

```bash
# 方案 1: 回退到上一个提交
git revert HEAD
git push origin Mvp

# 方案 2: 切换到稳定分支
# 在 GitHub Pages 设置中切换到其他稳定分支
```

---

## 技术支持

- **项目仓库**: https://github.com/Wyl-510-www/MyWeb
- **问题反馈**: 在仓库创建 Issue
- **文档**: 查看 specs/ 目录下的所有规格文档

---

**最后更新**: 2026-10-02
