// src/components/Footer.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, ArrowUp } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className=" bottom-0 left-0 w-full bg-[var(--color-surface)] backdrop-blur-[var(--backdrop-blur)] border-t border-[var(--gray-400)] shadow-glass z-50 mt-16"
    >
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xs text-gray-400">© {year} Haotian Chen. All rights reserved.</span>
        <div className="flex items-center space-x-4">
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-full hover:bg-[var(--color-surface-hover)] transition"
          >
            <ArrowUp size={18} className="text-gray-400 hover:text-accent" />
          </button>
          <a
            href="https://github.com/SaltedFish-No1/portfolio"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-[var(--color-surface-hover)] transition"
          >
            <Github size={20} className="text-gray-400 hover:text-accent" />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
