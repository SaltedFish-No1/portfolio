'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

import ProjectCard from './ProjectCard'
import { projects } from '@/data/project'

/******************************
 * i18n & 配置
 ******************************/
const categories = ['all', 'web', 'game', 'academic', 'other'] as const
const tNs = 'ProjectList'

/******************************
 * Framer‑motion variants
 ******************************/
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, rotateX: -90, y: 30 },
  visible: {
    opacity: 1, rotateX: 0, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

/******************************
 * Component
 ******************************/
export default function ProjectList() {
  const t = useTranslations(tNs)
  const [filter, setFilter] = useState<typeof categories[number]>('all')

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  )

  return (
    <section className="py-12">
      {/* 无障碍：隐藏标题供屏阅读取 */}
      <h2 className="sr-only">{t('sectionTitle')}</h2>

      {/* 分类按钮组 */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              filter === cat
                ? 'bg-[var(--color-accent)] text-[var(--color-secondary)]'
                : 'bg-transparent border-gray-500 text-gray-400 hover:border-white hover:text-white'
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* 项目网格 */}
      <motion.ul
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.li key={p.id} layout variants={itemVariants} exit="exit">
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  )
}
