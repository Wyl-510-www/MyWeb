---
title: JavaScript 性能优化实践
date: 2026-09-28
tags: [JavaScript, 性能优化]
description: 介绍防抖、节流、懒加载等常见 JavaScript 性能优化技巧
readingTime: 8 分钟
---

# JavaScript 性能优化实践

在现代 Web 开发中，性能优化是提升用户体验的关键。本文将介绍几种常见且实用的 JavaScript 性能优化技巧。

## 1. 防抖（Debounce）

防抖是限制函数执行频率的技术，确保函数在事件触发后的一段时间内只执行一次。

### 使用场景
- 搜索框输入实时查询
- 窗口 resize 事件处理
- 表单验证

### 实现代码

```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 使用示例
const searchInput = document.querySelector('#search');
const handleSearch = debounce((e) => {
  console.log('搜索:', e.target.value);
  // 执行 API 调用
}, 300);

searchInput.addEventListener('input', handleSearch);
```

> **关键点**：防抖会在事件停止触发后等待指定时间才执行函数。

## 2. 节流（Throttle）

节流确保函数在指定时间间隔内最多执行一次。

### 使用场景
- 滚动事件监听
- 鼠标移动事件
- 按钮点击防重复提交

### 实现代码

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用示例
const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 200);

window.addEventListener('scroll', handleScroll);
```

## 3. 懒加载（Lazy Loading）

懒加载延迟加载非关键资源，直到需要时才加载。

### 图片懒加载

使用 Intersection Observer API 实现图片懒加载：

```javascript
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

### 模块懒加载

使用动态 import 实现代码分割：

```javascript
// 仅在需要时加载图表库
async function loadChart() {
  const { Chart } = await import('./chart-library.js');
  return new Chart();
}

document.querySelector('#showChart').addEventListener('click', async () => {
  const chart = await loadChart();
  chart.render();
});
```

## 4. 使用 requestAnimationFrame

对于动画和视觉更新，使用 `requestAnimationFrame` 比 `setTimeout` 或 `setInterval` 更高效。

```javascript
let lastScrollPosition = 0;

function updateScrollIndicator() {
  const currentPosition = window.scrollY;
  
  if (currentPosition !== lastScrollPosition) {
    const progress = (currentPosition / 
      (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    document.querySelector('#progress-bar').style.width = progress + '%';
    lastScrollPosition = currentPosition;
  }
  
  requestAnimationFrame(updateScrollIndicator);
}

requestAnimationFrame(updateScrollIndicator);
```

## 5. 避免强制同步布局

读取布局属性（如 `offsetHeight`）后立即修改样式会触发强制同步布局，影响性能。

### ❌ 不好的做法

```javascript
elements.forEach(el => {
  const height = el.offsetHeight; // 读取
  el.style.height = height + 10 + 'px'; // 写入
  // 每次循环都会触发重排
});
```

### ✅ 好的做法

```javascript
// 批量读取
const heights = elements.map(el => el.offsetHeight);

// 批量写入
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});
```

## 总结

- **防抖**：等待事件停止后执行
- **节流**：限制执行频率
- **懒加载**：延迟加载非关键资源
- **requestAnimationFrame**：优化动画性能
- **批量操作 DOM**：减少重排和重绘

性能优化是一个持续的过程，需要根据实际场景选择合适的技术。使用浏览器开发者工具的 Performance 面板可以帮助识别性能瓶颈。
