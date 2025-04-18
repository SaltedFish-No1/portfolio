// src/components/Footer.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-card mt-16 py-6"
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <span className="text-sm text-gray-400">© {year} Haotian Chen. All rights reserved.</span>
        <div className="flex space-x-6">
          <a
            href="https://github.com/SaltedFish-No1"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
