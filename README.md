# 个人主页（Profolio）

一个基于 Next.js App Router、TypeScript、Tailwind CSS v4（CSS‑First）和 Framer Motion 打造的极简玻璃风格个人作品集网站，支持中／英双语（next-intl）、暗色模式切换、响应式布局、项目与技能展示、留言表单等功能。

## 特性

- **玻璃拟态设计**：全局变量控制透明度、模糊、阴影，实现 “科技内部运作可见” 的视觉风格  
- **暗色／浅色主题**：自动跟随系统偏好或手动切换，本地存储持久化  
- **国际化 (i18n)**：Prefix‑based 路由 (`/en`, `/zh`)，基于 next‑intl 动态加载翻译资源  
- **高级动画**：入口、悬停、点击和表单验证抖动等动画均由 Framer Motion 驱动  
- **响应式布局**：12 栏网格 + 自动适配列数 + 流式元素，移动端与桌面端都完美展示  
- **项目展示**：分类过滤、Modal 详情、加载动画  
- **技能展示**：进度环 / 进度条 / 翻转效果，可复用组件  
- **留言表单**：表单防抖（`useDebounce`）、草稿本地保留、第三方托管（Formsubmit.co）快速集成  
- **底部工具栏**：固定页脚到视口底部，社交图标与回到顶部按钮  

## 技术栈

- **框架**：Next.js 15+ (App Router)  
- **语言**：TypeScript, React  
- **样式**：Tailwind CSS v4 (CSS‑First, 自定义 design tokens)  
- **动画**：Framer Motion  
- **国际化**：next‑intl  
- **图标**：lucide‑react  
- **表单托管**：Formsubmit.co（可选换 Formspree / Getform / Netlify Forms）  

## 目录结构

```
src/
├── app/
│   ├── layout.tsx            # 全局布局与 Provider（Theme、Intl）
│   ├── page.tsx              # 主入口（包含 Hero、About、...）
│   └── api/contact/route.ts  # （可选）自托管 API 发送邮件
├── components/
│   ├── Header.tsx            # 顶部导航＋语言切换＋主题切换
│   ├── ThemeToggle.tsx       # 明暗模式按钮
│   ├── ProjectCard.tsx       # 单个项目卡片
│   ├── ProjectList.tsx       # 项目列表＋过滤
│   ├── SkillTags.tsx         # 技能标签云
│   ├── ContactForm.tsx       # 留言表单
│   └── Footer.tsx            # 固定底部工具栏
├── hooks/
│   └── useDebounce.ts        # 通用防抖 Hook
├── lib/
│   └── i18n.ts               # next‑intl 配置
├── locales/
│   ├── en.json               # 英文资源
│   └── zh.json               # 中文资源
├── styles/
│   └── globals.css           # Tailwind design tokens & 组件层样式
└── types/
    └── index.ts              # 全局类型定义
```

## 快速开始

1. **克隆仓库**  
   ```bash
   git clone https://github.com/SaltedFish-No1/portfolio
   cd profolio
   ```

2. **安装依赖**  
   ```bash
   pnpm install
   # 或者 npm install / yarn
   ```

3. **配置国际化消息**  
   - 编辑 `locales/en.json`、`locales/zh.json`，添加页面文案。

4. **Formsubmit.co 快速接入**  
   - 修改 `ContactForm.tsx` 内的接收邮箱地址  
   - 首次提交将触发邮箱验证，验证后即可实时收到留言

5. **本地启动**  
   ```bash
   pnpm dev
   # 访问 http://localhost:3000/
   ```

6. **生产构建**  
   ```bash
   pnpm build
   pnpm start
   ```

## 部署

- **Vercel**：支持 Next.js App Router，无需额外配置  
- **Netlify**：将输出目录指向 `.vercel/output` 或使用 adapter  
- **自托管**：确保环境变量包含表单服务或 SMTP 凭据  

## 组件说明

| 组件             | 功能简介                                    |
| ---------------- | ------------------------------------------- |
| `Header`         | Logo、导航锚点、语言切换、主题切换           |
| `ThemeToggle`    | 明暗模式切换按钮                            |
| `ProjectCard`    | 项目卡片，支持翻转动画与 Modal 弹窗          |
| `ProjectList`    | 项目列表渲染、分类过滤                      |
| `SkillTags`      | 技能标签云，进度条/环 + hover 翻转效果       |
| `ContactForm`    | 留言表单，自动防抖、草稿保留、第三方表单集成 |
| `Footer`         | 固定底部栏，社交图标 & 回到顶部              |

## 开发指南

- **主题 & 设计令牌**：`styles/globals.css` 中统一维护  
- **动画时长 & 缓动**：组件内通过 Framer Motion `transition` 参数调整  
- **国际化**：使用 `useTranslations(namespace)` 获取文案  
- **新增页面**：在 `app/[lang]/` 下添加新的路由文件夹  
- **样式覆盖**：可在 `@layer components` 中添加自定义 class  

---

感谢使用，如果发现问题或有建议，欢迎 PR 或在 Issue 中交流！