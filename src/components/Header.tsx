// src/components/Header.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

// 父级列表变体：统一子项 stagger
const navListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}
const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  hover: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  }
}

// Mobile 菜单动画：使用 clipPath 展开并 stagger
const mobileMenuVariants = {
  hidden: {
    clipPath: 'inset(0% 0% 100% 0%)',
    opacity: 0
  },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      type: 'spring', stiffness: 200, damping: 30,
      when: 'beforeChildren',
      staggerChildren: 0.05
    }
  }
}
const mobileItemVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
}

export default function Header() {
  const t = useTranslations('Header')
  const locale = useLocale()

  const navLinks = useMemo(() => [
    { href: `/${locale}`,          label: t('nav.home')     },
    { href: `/${locale}/projects`, label: t('nav.projects') },
    { href: `/${locale}/blogs`,    label: t('nav.blogs')    }
  ], [locale, t])

  // scroll shadow
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [open, setOpen] = useState(false)

  return (
    <header>
      <nav
        className={`glass-nav ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label={t('aria.siteNavigation')}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show:   { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
            }}
            initial="hidden" animate="show"
          >
            <Link
              href={`/${locale}`}
              className="text-2xl font-black text-accent hover:scale-105 transition-transform"
              aria-label={t('aria.home')}
            >
              {t('logo')}
            </Link>
          </motion.div>

          {/* Desktop links */}
          <motion.ul
            className="hidden md:flex items-center space-x-6"
            variants={navListVariants}
            initial="hidden"
            animate="show"
          >
            {navLinks.map((l) => (
              <motion.li
                key={l.href}
                variants={navItemVariants}
                whileHover="hover"
              >
                <Link
                  href={l.href}
                  className="px-3 py-1 rounded transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Utilities + Hamburger */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden h-6 w-6 relative focus:outline-none text-accent"
              aria-label={t('aria.toggleMenu')}
              aria-expanded={open}
            >
              <motion.span
                className="absolute inset-0 m-auto h-0.5 w-6 bg-current"
                animate={open
                  ? { rotate: 45, y: 0, transition: { duration: .2 } }
                  : { rotate: 0, y: -6, transition: { duration: .2 } }
                }
              />
              <motion.span
                className="absolute inset-0 m-auto h-0.5 w-6 bg-current"
                animate={open
                  ? { opacity: 0, transition: { duration: .15 } }
                  : { opacity: 1, transition: { duration: .15 } }
                }
              />
              <motion.span
                className="absolute inset-0 m-auto h-0.5 w-6 bg-current"
                animate={open
                  ? { rotate: -45, y: 0, transition: { duration: .2 } }
                  : { rotate: 0, y: 6,  transition: { duration: .2 } }
                }
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false} mode="wait">
          {open && (
            <motion.ul
              key="mobile-nav"
              className="md:hidden border-t border-gray-200 bg-[var(--color-surface)] overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {navLinks.map(l => (
                <motion.li
                  key={l.href}
                  className="border-b border-gray-200 last:border-none"
                  variants={mobileItemVariants}
                >
                  <Link
                    href={l.href}
                    className="block px-6 py-3 transition-colors ease-in-out duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}