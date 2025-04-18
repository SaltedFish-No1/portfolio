'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useMemo } from 'react'

export default function Header() {
  const locale = useLocale()

  // 自动拼接语言前缀
  const navLinks = useMemo(() => [
    { href: `/${locale}/projects`, label: 'Projects' },
    { href: `/${locale}/blogs`, label: 'Blogs' },
  ], [locale])

  return (
    <header>
      <nav className="glass-nav flex justify-between items-center">
        {/* 左边：Logo */}
        <div className="text-accent font-bold">Brand</div>

        {/* 右边：导航 + 功能按钮 */}
        <div className="flex items-center justify-end gap-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  )
}
