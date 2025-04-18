// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function DemoPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen bg-secondary text-primary transition-colors duration-300">
      {/* 顶部导航 */}
      <nav className="glass-nav flex items-center justify-between">
        <div className="text-accent font-semibold">Brand Logo</div>
        <button
          onClick={() => setDark((p) => !p)}
          className="btn"
        >
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      {/* 主要内容 */}
      <main className="pt-[4rem] px-[var(--spacing-4)]">
        <h1 className="text-3xl font-sans mb-6">Tailwind CSS‑first 主题 Demo</h1>

        {/* 玻璃卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card">
              <h2 className="text-xl mb-2">卡片 {i}</h2>
              <p>这是第 {i} 个玻璃卡片的示例内容。</p>
              <button className="btn mt-4">操作按钮</button>
            </div>
          ))}
        </div>

        {/* 表单区域 */}
        <section className="mt-10 space-y-4">
          <input
            type="text"
            placeholder="请输入内容…"
            className="glass-input"
          />
          <button className="btn">提交</button>
        </section>
      </main>
    </div>
  );
}
