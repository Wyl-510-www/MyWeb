# Phase 7: 关于我页面 - 实施计划

## 任务组概览

| 任务组 | 预计时间 | 依赖关系 |
|--------|---------|---------|
| Task Group 1: 内容准备与结构搭建 | 30 分钟 | 无 |
| Task Group 2: 核心区块开发 | 1.5 小时 | TG1 |
| Task Group 3: 技能展示系统 | 1 小时 | TG1 |
| Task Group 4: 交互与响应式优化 | 1 小时 | TG2, TG3 |
| Task Group 5: 验证与文档 | 30 分钟 | TG4 |

**总预计时间**：4.5 小时

---

## Task Group 1: 内容准备与结构搭建

**目标**：准备页面内容，创建 HTML 基础结构

### 1.1 内容准备
- [ ] 编写个人简介文字（200-300 字）
  - 包含：职业身份、技术背景、学习态度、兴趣爱好
  - 标记关键词（用于黄色荧光笔高亮）
  
- [ ] 确定个人 slogan（用于大引号引用）
  - 例如："Code with purpose, learn with curiosity."
  
- [ ] 整理核心技能列表（3-5 项）
  - 格式：技能名称 + 简短描述 + emoji 图标
  - 例如：
    - 前端开发：熟练掌握 HTML/CSS/JavaScript，有 Vue.js 项目经验
    - 学习能力：善于总结笔记，持续学习新技术
    - ...
  
- [ ] 整理其他技能列表（分组）
  - 前端技术：HTML, CSS, JavaScript, Vue.js, Responsive Design
  - 工具与方法：Git, GitHub, VS Code, Figma
  - 正在学习：Node.js, TypeScript, ...
  
- [ ] 准备联系方式
  - 邮箱地址
  - GitHub 链接
  - 其他社交媒体（可选）

**输出**：`specs/2026-09-30-phase7-about/content-draft.md`（内容草稿）

### 1.2 创建页面结构
- [ ] 创建 `about.html`
  - 复制首页的基础模板（导航栏 + Footer）
  - 设置 `<title>` 为 "关于我 - MyWeb"
  - 引入 `css/about.css`
  
- [ ] 创建 `css/about.css`
  - 引入品牌变量 `@import url('variables.css');`
  - 设置基础布局容器样式
  
- [ ] 确认头像资源
  - 验证 `assets/avatar.jpg` 存在
  - 可选：压缩图片到 500KB 以内（使用在线工具或脚本）

**输出**：
- `about.html`（基础结构）
- `css/about.css`（空样式文件）

---

## Task Group 2: 核心区块开发

**目标**：实现头部、简介、联系方式三大区块

### 2.1 头部区域（Hero）
- [ ] 添加头像展示
  - 使用圆形头像样式（`border-radius: 50%`）
  - 尺寸：桌面 180px，移动端 120px
  - 居中对齐
  
- [ ] 添加标题和副标题
  - 标题：姓名/昵称（Fraunces 900，48px）
  - 副标题：身份标签（Noto Sans SC，18px，灰色）
  - 居中对齐，间距合理

**样式规范**：
```css
.about-hero {
  text-align: center;
  padding: 4rem 1rem;
}

.about-avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin: 0 auto 2rem;
}

.about-title {
  font-family: var(--font-decorative);
  font-size: 3rem;
  font-weight: 900;
}

.about-subtitle {
  font-size: 1.125rem;
  color: var(--gray-600);
}
```

### 2.2 简介区域
- [ ] 实现大引号样式（Big Pullquote）
  - 从 `components.md` 复制组件代码
  - 引用个人 slogan
  - 放置在简介文字前
  
- [ ] 实现黄色荧光笔高亮（Yellow Highlighter）
  - 从 `components.md` 复制组件代码
  - 包裹简介中的关键词（3-5 处）
  
- [ ] 添加简介文字
  - 分段排版（2-3 段）
  - 最大宽度 800px（桌面端）
  - 行高 1.75，字号 18px
  - 居中对齐

**HTML 结构示例**：
```html
<section class="about-intro">
  <div class="big-pullquote">
    <p>"Code with purpose, learn with curiosity."</p>
  </div>
  
  <div class="about-text">
    <p>
      我是一名<span class="highlight-yellow">前端开发者</span>，
      专注于创建简洁、高效的用户界面...
    </p>
    <p>...</p>
  </div>
</section>
```

### 2.3 联系方式区域
- [ ] 添加标题 "联系我"（Section Heading）
  
- [ ] 实现邮箱展示
  - 显示邮箱地址
  - 点击复制功能（JavaScript）
  - 或使用 `mailto:` 链接
  
- [ ] 实现社交媒体链接
  - 图标 + 文字链接
  - 水平排列（Flexbox）
  - 悬停效果：下划线动画
  - 使用蓝色按钮样式（可选）
  
- [ ] 添加主 CTA 按钮
  - "联系我" 蓝色按钮
  - 点击跳转邮箱或显示联系方式

**HTML 结构示例**：
```html
<section class="about-contact">
  <h2>联系我</h2>
  
  <div class="contact-email">
    <span>📧 your.email@example.com</span>
    <button class="copy-btn">复制</button>
  </div>
  
  <div class="contact-social">
    <a href="https://github.com/yourusername" class="social-link">
      <span>🔗 GitHub</span>
    </a>
    <!-- 其他社交链接 -->
  </div>
  
  <a href="mailto:your.email@example.com" class="btn-primary">
    联系我
  </a>
</section>
```

---

## Task Group 3: 技能展示系统

**目标**：实现混合技能展示（核心技能卡片 + 其他技能标签）

### 3.1 核心技能卡片
- [ ] 从 `components.md` 复制图标卡片（Icon Card）组件
  
- [ ] 创建技能卡片数据结构（硬编码在 HTML）
  - 3-5 张卡片
  - 每张包含：emoji 图标、技能名称、简短描述
  
- [ ] 实现网格布局
  - 桌面端：3 列（`grid-template-columns: repeat(3, 1fr)`）
  - 移动端：1-2 列（响应式调整）
  - 间距：2rem
  
- [ ] 添加卡片样式
  - 使用 Esther Design System 的图标卡片样式
  - 悬停效果：轻微抬升（`transform: translateY(-4px)`）

**HTML 结构示例**：
```html
<section class="about-skills">
  <h2>核心技能</h2>
  
  <div class="skills-grid">
    <div class="icon-card">
      <div class="icon">💻</div>
      <h3>前端开发</h3>
      <p>熟练掌握 HTML/CSS/JavaScript，有 Vue.js 项目经验</p>
    </div>
    
    <div class="icon-card">
      <div class="icon">📚</div>
      <h3>学习能力</h3>
      <p>善于总结笔记，持续学习新技术</p>
    </div>
    
    <!-- 更多卡片 -->
  </div>
</section>
```

### 3.2 其他技能标签
- [ ] 从 `components.md` 复制胶囊按钮（Capsule Button）组件
  
- [ ] 按类别分组展示技能标签
  - 分组：前端技术 / 工具与方法 / 正在学习
  - 每组标题（小标题样式）+ 标签列表
  
- [ ] 使用三色胶囊标签
  - 蓝色：前端技术
  - 黄色：工具与方法
  - 红色：正在学习
  - Flexbox 布局，自动换行

**HTML 结构示例**：
```html
<section class="about-other-skills">
  <h3>前端技术</h3>
  <div class="skill-tags">
    <span class="capsule-btn blue">HTML</span>
    <span class="capsule-btn blue">CSS</span>
    <span class="capsule-btn blue">JavaScript</span>
    <span class="capsule-btn blue">Vue.js</span>
  </div>
  
  <h3>工具与方法</h3>
  <div class="skill-tags">
    <span class="capsule-btn yellow">Git</span>
    <span class="capsule-btn yellow">GitHub</span>
    <span class="capsule-btn yellow">VS Code</span>
  </div>
  
  <h3>正在学习</h3>
  <div class="skill-tags">
    <span class="capsule-btn red">Node.js</span>
    <span class="capsule-btn red">TypeScript</span>
  </div>
</section>
```

---

## Task Group 4: 交互与响应式优化

**目标**：添加交互功能，优化移动端体验

### 4.1 交互功能
- [ ] 实现邮箱复制功能
  - 创建 `scripts/copy-email.js`
  - 点击"复制"按钮，复制邮箱到剪贴板
  - 显示"已复制"提示（toast 或按钮文字变化）
  
- [ ] 可选：添加 Scroll Reveal 动画
  - 引入现有的 `scripts/scroll-reveal.js`
  - 为各区块添加 `data-scroll-reveal` 属性
  - 保持与首页动画一致

**JavaScript 示例**：
```javascript
// scripts/copy-email.js
document.querySelector('.copy-btn').addEventListener('click', () => {
  const email = 'your.email@example.com';
  navigator.clipboard.writeText(email).then(() => {
    const btn = document.querySelector('.copy-btn');
    btn.textContent = '已复制!';
    setTimeout(() => {
      btn.textContent = '复制';
    }, 2000);
  });
});
```

### 4.2 响应式优化
- [ ] 移动端布局调整（<768px）
  - 头像缩小到 120px
  - 技能卡片改为 1 列
  - 文字字号适当缩小（标题 2rem，正文 16px）
  - 简介区块 padding 减少
  
- [ ] 触摸交互优化
  - 按钮和链接的点击区域至少 44x44px
  - 卡片间距适当增加（移动端）
  
- [ ] 测试多设备
  - Chrome DevTools 模拟：iPhone SE, iPhone 12, iPad, Desktop
  - 验证排版、字体大小、交互可用性

**CSS 响应式示例**：
```css
@media (max-width: 768px) {
  .about-avatar {
    width: 120px;
    height: 120px;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .about-hero,
  .about-intro,
  .about-skills,
  .about-contact {
    padding: 2rem 1rem;
  }
}
```

---

## Task Group 5: 验证与文档

**目标**：验证功能完整性，编写完成文档

### 5.1 功能验证
- [ ] 对照 `validation.md` 检查清单逐项验证
  - 内容完整性
  - 视觉一致性
  - 响应式适配
  - 交互可用性
  - 性能指标
  
- [ ] 浏览器兼容性测试
  - Chrome, Safari, Firefox（桌面端）
  - Chrome Mobile, Safari Mobile（移动端）
  
- [ ] 可选：对照 `esther-design-system-main/references/checklist.md` P0 清单检查

### 5.2 性能优化
- [ ] 压缩头像图片
  - 使用在线工具（如 TinyPNG）或 `sharp` 库
  - 目标大小：<500KB
  
- [ ] 检查 CSS 文件大小
  - 移除未使用的样式
  - 可选：合并 CSS 文件
  
- [ ] 验证页面加载时间
  - Chrome DevTools Performance 面板
  - 目标：<2 秒

### 5.3 文档与提交
- [ ] 编写 `specs/2026-09-30-phase7-about/completion.md`
  - 记录实际完成情况
  - 截图展示（桌面端 + 移动端）
  - 遗留问题（如果有）
  
- [ ] 更新 `specs/roadmap.md`
  - 标记 Phase 7 为已完成 ✅
  - 记录实际耗时
  - 添加提交记录 hash
  
- [ ] Git 提交
  - 创建提交："feat: Phase 7 关于我页面"
  - 提交内容：
    - `about.html`
    - `css/about.css`
    - `scripts/copy-email.js`（如果有）
    - 规格文档更新

---

## 里程碑检查点

### Checkpoint 1: 内容与结构就绪（TG1 完成后）
- ✅ 个人简介文字已编写
- ✅ 技能列表已整理
- ✅ 联系方式已准备
- ✅ `about.html` 基础结构已创建

### Checkpoint 2: 核心区块完成（TG2 完成后）
- ✅ 头部区域显示正常（头像、标题、副标题）
- ✅ 简介区域排版优雅（大引号、荧光笔高亮）
- ✅ 联系方式清晰可见（邮箱、社交链接、CTA 按钮）

### Checkpoint 3: 技能展示完成（TG3 完成后）
- ✅ 核心技能卡片网格布局正常
- ✅ 其他技能标签分组展示
- ✅ 视觉层次清晰（核心技能突出，其他技能次要）

### Checkpoint 4: 交互与响应式优化（TG4 完成后）
- ✅ 邮箱复制功能正常
- ✅ 移动端布局适配良好
- ✅ 触摸交互流畅

### Checkpoint 5: 验证通过（TG5 完成后）
- ✅ 所有验证项通过
- ✅ 性能指标达标
- ✅ 文档已更新
- ✅ 代码已提交

---

## 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| 个人简介文字编写耗时 | 延迟 TG1 | 提前准备内容草稿，或使用占位文本先搭建结构 |
| 技能图标难以选择 | 影响视觉效果 | 优先使用 emoji（简单高效），后续可替换为 SVG |
| 移动端布局不理想 | 影响用户体验 | 使用 Chrome DevTools 实时预览，多次调整间距和字号 |
| 邮箱复制功能兼容性问题 | 部分浏览器不支持 | 降级方案：显示纯文本邮箱，用户手动复制 |

---

## 开发顺序建议

1. **先内容后样式**：先准备内容并搭建 HTML 结构，再逐步添加样式
2. **先桌面后移动**：桌面端布局完成后，再调整移动端响应式
3. **先核心后增强**：优先完成核心区块（简介、技能、联系），最后添加交互动画
4. **分批提交**：每完成一个任务组，可选择性提交一次（便于回退）

---

## 预计时间分配

- **Task Group 1**：30 分钟（内容准备占主要时间）
- **Task Group 2**：1.5 小时（三大区块开发）
- **Task Group 3**：1 小时（技能展示系统）
- **Task Group 4**：1 小时（响应式与交互）
- **Task Group 5**：30 分钟（验证与文档）

**总计**：约 4.5 小时
