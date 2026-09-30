# MyWeb

全面记录个人成长轨迹的在线空间，平衡展示**技术作品**与**学习历程**，真实呈现从学习到实践的完整过程。

## 项目简介

MyWeb 是一个纯静态个人网站，使用 [Esther Design System](https://github.com/esthersjw/esther-design-system) 设计系统构建，无需构建工具，浏览器直接打开即可预览。

### 核心功能

- **作品集**：展示技术项目，包括技术栈、项目描述、成果链接
- **学习笔记**：记录技术学习过程、踩坑经验、知识总结
- **生活记录**：记录个人生活瞬间、思考感悟、日常随笔
- **关于我**：个人简介、技能展示和联系方式

## 技术栈

```
静态 HTML/CSS + ES6 模块化 JavaScript
├── 设计系统: Esther Design System
├── 组件库: 51 个预制组件
├── 布局: 16 种布局模式
├── 字体: Google Fonts (Noto Serif SC / Noto Sans SC / Fraunces / Caveat / Fira Code)
├── 模块化: ES6 import/export
└── 部署: GitHub Pages
```

### 品牌配色（A・原图核心配色）

| 颜色 | 色值 | 用途 |
|------|------|------|
| 夜空钴蓝 | `#3457B8` | 标题、链接、主按钮 |
| 星光暖黄 | `#FFD646` | CTA、高亮、徽章 |
| 斗篷砖红 | `#E25555` | 标签、提醒、重要标记 |
| 奶云米白 | `#F8F6F0` | 主背景 |
| 深灰 | `#2D2D2D` | 正文文字 |
| 纯白 | `#FFFFFF` | 卡片背景 |

## 目录结构

```
MyWeb/
├── index.html              # 首页（已组件化重构）
├── portfolio.html          # 作品集（待开发）
├── notes.html              # 学习笔记（待开发）
├── life.html               # 生活记录（待开发）
├── about.html              # 关于我（待开发）
├── assets/
│   ├── avatar.jpg          # 个人头像
│   └── images/             # 图片资源
├── components/             # 组件目录（2026-09-30 新增）
│   ├── nav/
│   │   ├── nav.css         # 导航栏样式
│   │   └── nav.js          # 导航栏逻辑（ES6 模块）
│   ├── hero/
│   │   └── hero.css        # Hero 区域样式
│   ├── cards/
│   │   ├── cards.css       # 导航卡片样式
│   │   └── cards.js        # 卡片交互逻辑（ES6 模块）
│   └── footer/
│       ├── footer.css      # 页脚样式
│       └── footer.js       # 页脚交互逻辑（ES6 模块）
├── content/
│   ├── notes/              # Markdown 笔记
│   └── life/               # 生活记录 Markdown
├── css/
│   ├── variables.css       # 品牌色变量
│   ├── reset.css           # CSS 重置（2026-09-30 新增）
│   └── global.css          # 全局样式（2026-09-30 新增）
├── scripts/
│   └── main.js             # 主入口脚本（ES6 模块，2026-09-30 新增）
├── esther-design-system-main/  # 设计系统资源
│   ├── brand-dna.md
│   ├── references/
│   │   ├── components.md   # 51 个组件库
│   │   ├── layouts.md      # 16 种布局模式
│   │   └── checklist.md    # 质量检查清单
│   └── assets/
└── specs/                  # 项目规格文档
    ├── mission.md          # 使命文档
    ├── tech-stack.md       # 技术栈说明
    ├── roadmap.md          # 实施路线图
    └── 2026-09-29-phase1-environment-setup/
        ├── requirements.md
        ├── plan.md
        └── validation.md
```

## 本地开发

### 快速开始

1. **克隆仓库**
   ```bash
   git clone <repo-url>
   cd MyWeb
   ```

2. **启动本地服务器**（必需，因为使用了 ES6 模块）
   
   选择以下任一方式：
   
   - **方法 1：Python**
     ```bash
     python -m http.server 8000
     # 访问 http://localhost:8000
     ```
   
   - **方法 2：Node.js**
     ```bash
     npx http-server
     # 访问 http://localhost:8080
     ```
   
   - **方法 3：VS Code Live Server**
     - 安装 Live Server 扩展
     - 右键 `index.html` → "Open with Live Server"

3. **开发说明**
   - 由于采用 ES6 模块化，**不能直接双击打开 HTML 文件**
   - 必须通过 HTTP 服务器访问，否则会出现 CORS 错误
   - 修改文件后刷新浏览器即可看到效果

### 修改样式

1. **修改品牌色**：编辑 `css/variables.css` 中的 CSS 变量
2. **修改布局**：参考 `esther-design-system-main/references/layouts.md`
3. **添加组件**：参考 `esther-design-system-main/references/components.md`

### 响应式断点

- **桌面端**：> 900px（导航卡片 4 列）
- **平板端**：600px - 900px（导航卡片 2 列）
- **移动端**：< 600px（导航卡片单列，禁用 3D 翻转效果）

### 架构特点（2026-09-30 重构）

- **ES6 模块化**：使用 import/export 组织代码
- **组件就近原则**：每个组件包含自己的 CSS 和 JS
- **移动端优化**：针对布局排版优化（字体、间距、触摸交互）
- **代码精简**：index.html 从 615 行减少到 146 行

## 部署

### GitHub Pages 部署

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `main` 分支
   - 点击 Save

3. **访问网站**
   - 网址：`https://<username>.github.io/<repo-name>/`
   - 等待 1-2 分钟部署完成

### 自定义域名（可选）

1. 在域名服务商添加 CNAME 记录指向 `<username>.github.io`
2. 在仓库根目录创建 `CNAME` 文件，写入自定义域名
3. 在 GitHub Pages 设置中填写自定义域名

## 开发路线图

- [x] **Phase 1: 环境准备** - 目录结构、配色系统、基础模板
- [ ] **Phase 2: 首页开发** - Hero 区域、导航卡片、响应式布局
- [ ] **Phase 3: 关于我页面** - 个人简介、技能展示、联系方式
- [ ] **Phase 4: 作品集页面** - 项目展示、技术栈标签、成果链接
- [ ] **Phase 5: 学习笔记系统** - Markdown 渲染、笔记列表、代码高亮
- [ ] **Phase 6: 生活记录系统** - 时间线布局、图片展示、日记卡片
- [ ] **Phase 7: 优化和部署** - 性能优化、GitHub Pages 部署

详细路线图参见：`specs/roadmap.md`

## 参考资源

- [Esther Design System](https://github.com/esthersjw/esther-design-system)
- [Esther Design System 组件库](esther-design-system-main/references/components.md)
- [Esther Design System 布局模式](esther-design-system-main/references/layouts.md)
- [项目使命文档](specs/mission.md)
- [技术栈说明](specs/tech-stack.md)

## 许可证

本项目基于 Esther Design System 构建，遵循 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) 许可证。

---

**构建于 2026-09-29** · Powered by [Esther Design System](https://github.com/esthersjw/esther-design-system)