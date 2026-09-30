# Phase 2: 首页开发 - 问题清单

## 未解决问题

### P1 - Footer 堆叠卡片容器未完全居中

**问题描述**：
`.stack-container` 在页面中显示时未完全居中对齐，视觉上呈现偏移状态。

**影响范围**：
- Footer 区域的联系方式堆叠卡片
- 影响视觉美观度，但不影响功能

**相关代码**：
```html
<div class="stack-container reveal reveal-d1" id="contactStack">
  <div class="stack-card" onclick="flipContactStack()">
    <div class="stack-card-icon">📧</div>
    <h3 class="stack-card-title">邮箱</h3>
    <a href="mailto:504424637@qq.com" class="stack-card-link">504424637@qq.com</a>
  </div>
  <div class="stack-card" onclick="flipContactStack()">
    <div class="stack-card-icon">📱</div>
    <h3 class="stack-card-title">小红书</h3>
    <a href="https://xhslink.cn/o/3dBs2IMNfpl" target="_blank" class="stack-card-link">@510的小红书</a>
  </div>
</div>
```

**当前样式**：
```css
.footer {
  padding: clamp(80px, 12vh, 120px) 2rem clamp(40px, 6vh, 60px);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer .container {
  width: 100%;
  max-width: 1300px;
}

.stack-container {
  position: relative;
  width: min(420px, 90vw);
  height: 200px;
  perspective: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  display: block;
}
```

**已尝试的解决方案**：
1. ✗ 添加 `margin: 0 auto` - 未生效
2. ✗ 添加 `left: 0; right: 0;` - 未生效
3. ✗ 为 `.footer .container` 添加 flexbox 布局 - 未完全解决
4. ✗ 为 `.footer` 添加 `display: flex; justify-content: center;` - 仍有偏移

**可能原因**：
- `.container` 的 `padding: 0 2rem` 可能导致视觉偏移
- `position: relative` 与内部 `position: absolute` 的堆叠卡片可能有对齐问题
- 浏览器默认样式或继承的样式影响
- 响应式宽度 `min(420px, 90vw)` 在某些视口下计算偏移

**建议修复方案**：
1. 使用浏览器开发者工具精确测量偏移量
2. 检查是否有其他继承样式影响居中
3. 考虑使用 Grid 布局替代当前的 Flexbox + margin auto 方案
4. 或使用绝对定位配合 `left: 50%; transform: translateX(-50%);`

**优先级**：P1（可后续修复）
**创建日期**：2026-09-30
**状态**：待修复

---

## 已解决问题

无
