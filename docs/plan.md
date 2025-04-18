# 开发计划（React 个人主页）

## 📁 推荐的 `src/` 项目结构

以下是推荐的项目结构，该结构支持国际化 (i18n) 和组件复用：

```
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ [lang]/             ← 国际化路由（/zh, /en）
│     └─ page.tsx         ← 主入口页面
├─ components/
│  ├─ Header.tsx          ← 顶部栏 + 语言切换
│  ├─ ThemeToggle.tsx     ← 暗色模式切换按钮
│  ├─ ProjectCard.tsx     ← 单个项目卡片
│  ├─ ProjectList.tsx     ← 项目卡片列表
│  ├─ SkillTags.tsx       ← 技能标签云
│  ├─ ContactForm.tsx     ← 联系表单
├─ hooks/
│  ├─ useDebounce.ts
│  ├─ useToggle.ts
├─ lib/
│  ├─ i18n.ts              ← 国际化配置（next-intl）
├─ locales/
│  ├─ en.json
│  ├─ zh.json
├─ styles/
│  └─ globals.css
├─ types/
│  └─ index.ts             ← 项目类型定义（如 Project, Skill）
```

---

## ✅ 各组件与面试知识点覆盖表

| 组件             | 功能概述                       | 涉及知识点                                                   |
| ---------------- | ------------------------------ | ------------------------------------------------------------ |
| `Header`         | 国际化语言切换 + 暗色按钮      | `useState`, `useEffect`, `context`, `Next.js dynamic routing` |
| `DarkModeToggle` | 主题切换 + localStorage 持久化 | `useEffect`, `localStorage`, `context`                       |
| `ProjectCard`    | 单卡片展开/折叠，内容动态加载  | `useState`, `props`, `children`, 动画控制                    |
| `ProjectList`    | 渲染项目卡片列表               | `useMemo`, `map`, `key`, `React.memo`                        |
| `SkillTags`      | 技能渲染，hover 动效           | `React.memo`, `map`, 条件 classNames                         |
| `ContactForm`    | 表单状态控制 + 防抖保存        | `useState`, `useRef`, `useEffect`, `useDebounce`, `onSubmit` |

---

# 组件交付顺序（拓扑排序 + 学习曲线）

1. **ThemeToggle（暗色模式切换组件）**
   - **理由：** 作为基础的全局状态控件，它涉及 localStorage、useEffect 与上下文管理，是整个项目风格和状态管理的先行者，其他组件中 Header 会依赖暗色模式的状态展示。

2. **Header（顶部导航与语言切换）**
   - **理由：** Header 汇集了国际化（依赖 i18n 配置）和主题切换（嵌入 ThemeToggle），构建 Header 时可以复用前面实现的主题切换逻辑，同时演示 Next.js 动态路由与 context 使用。

3. **ProjectCard（项目单卡组件）**
   - **理由：** 作为展示项目内容的基本单元，ProjectCard 的设计（包括展开/折叠、动画效果、props 与 children 传递）为后续构建项目列表打下基础。

4. **ProjectList（项目列表容器）**
   - **理由：** ProjectList 依赖于 ProjectCard 作为子组件，通过 map 渲染列表，是列表渲染与性能优化（useMemo、React.memo、key）的实战展示。

5. **SkillTags（技能标签云组件）**
   - **理由：** SkillTags 能独立展示技能列表及动态 hover 效果，本身可以和前述组件独立构建，但放在后面可以利用前面组件的开发经验来优化组件性能（如 React.memo 与条件 classNames 的书写）。

6. **ContactForm（联系表单组件）**
   - **理由：** 作为项目中最后完善的模块，ContactForm 集中考察表单状态控制、防抖处理（useDebounce）、useRef 与 useEffect 等技术点，独立性较好且逻辑稍微复杂，适合在其他核心组件完成后整合到整体页面中。

---

# 各组件的最佳实践指南

## ThemeToggle（暗色模式切换组件）

- **本质与职责：**
  - 负责主题状态切换，并通过 useEffect 同步到 localStorage 以实现持久化。
  - 通过 context 将主题状态传递给子组件（如 Header）。
- **最佳实践：**
  - **状态管理：** 使用 useState 存储当前主题，使用 useEffect 监听主题变化并更新 localStorage。
  - **上下文封装：** 结合 React.createContext 和 useContext 将主题设置封装成 Provider，保证组件树中的其他组件可以方便地共享和响应主题变化。
  - **无障碍设计：** 添加 aria-label 和角色描述，确保切换按钮对辅助技术友好。

---

## Header（顶部导航与语言切换组件）

- **本质与职责：**
  - 提供页面头部展示，包括语言切换、Logo 展示和内嵌 ThemeToggle。
- **最佳实践：**
  - **语义化标签：** 使用 header、nav 等语义标签，提升页面结构可读性。
  - **动态路由：** 对于国际化语言切换，利用 Next.js 提供的动态路由（例如 /zh、/en）实现路由切换，并通过 i18n 配置（lib/i18n.ts）管理多语言资源。
  - **状态传递：** 结合 context 管理语言和主题状态，确保子组件能够响应全局状态变更。

---

## ProjectCard（项目单卡组件）

- **本质与职责：**
  - 展示单个项目的详细信息，支持展开/折叠和内容动态加载，同时演示动画效果。
- **最佳实践：**
  - **局部状态：** 使用 useState 控制展开与折叠状态，保证交互流畅。
  - **组件组合：** 通过 props 和 children 的方式传递内容，保证组件易于复用和组合。
  - **动画处理：** 可利用 CSS Transition 或第三方动画库（例如 React Transition Group）实现基本动画，保持代码简洁易懂。
  - **优化加载：** 对非关键内容采用懒加载，提升初次渲染性能。

---

## ProjectList（项目列表容器组件）

- **本质与职责：**
  - 遍历项目数据，利用 ProjectCard 展示多个项目单元，实现列表渲染和性能优化示例。
- **最佳实践：**
  - **列表渲染：** 使用 Array.map 渲染列表时为每项设置稳定的 key 值。
  - **性能优化：** 利用 useMemo 缓存计算密集型数据，采用 React.memo 对 ProjectCard 做组件缓存，防止不必要的重渲。
  - **数据管理：** 明确数据结构类型（在 types/index.ts 中定义），便于后续维护与扩展。

---

## SkillTags（技能标签云组件）

- **本质与职责：**
  - 渲染技能标签，支持 hover 动效以及智能状态样式控制。
- **最佳实践：**
  - **组件优化：** 利用 React.memo 对整个标签列表进行优化，确保标签在不变时不重复渲染。
  - **条件样式：** 使用条件 classNames 管理 hover 与选中状态，保证逻辑清晰。
  - **可拓展性：** 将标签数据结构抽象成独立类型，方便后续扩展及样式调整。

---

## ContactForm（联系表单组件）

- **本质与职责：**
  - 负责捕获用户输入，管理表单状态，采用防抖处理技术防止频繁保存，完成数据校验与提交。
- **最佳实践：**
  - **表单控制：** 采用受控组件模式，利用 useState 保存每个字段的值，同时结合 useRef 快速定位到输入框（如错误提示）。
  - **防抖处理：** 引入自定义 useDebounce Hook 来优化输入处理，降低不必要的高频更新。
  - **事件处理：** 在提交表单时使用 onSubmit 事件，并使用 event.preventDefault() 防止页面刷新。
  - **用户体验：** 提供必要的实时验证反馈与错误处理机制，确保用户输入体验流畅。

---

## 总结

通过上述拓扑排序和学习曲线安排，从最基础的暗色模式切换组件 (ThemeToggle) 到独立性最强的联系表单 (ContactForm)，你能在完成项目的同时，系统性地覆盖 React 面试高频考点。每个组件在其最佳实践指南中包含了具体的实现细节与注意事项，能有效帮助你在实际开发中写出可维护、高性能且可复用的代码。