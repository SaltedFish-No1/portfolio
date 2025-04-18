'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { LanguageIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchTo = locale === 'en' ? 'zh' : 'en'
  const targetPath = pathname.replace(new RegExp(`^/${locale}`), `/${switchTo}`)

  // ✨ 关键：文字切换时过渡动画 + 最小宽度控制
  const [label, setLabel] = useState(locale === 'en' ? '中文' : 'EN')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLabel(locale === 'en' ? '中文' : 'EN')
    }, 150) // 延迟一点点让动画更流畅
    return () => clearTimeout(timeout)
  }, [locale])

  return (
    <button
      onClick={() => router.push(targetPath)}
      className="header-btn"
      aria-label="切换语言"
    >
      <LanguageIcon className="w-4 h-4 opacity-80" />
      <span
        className="
          transition-all duration-300 ease-in-out
          inline-block w-[30px] text-center
        "
      >
        {label}
      </span>
    </button>
  )
}
