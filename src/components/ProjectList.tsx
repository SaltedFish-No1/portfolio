'use client'

import { useState, useMemo } from 'react'
import ProjectCard from './ProjectCard'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/project'

// 分类标签
const categories = ['all', 'web', 'game', 'academic', 'other'] as const

// 容器动画：stagger 子元素
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

// 项目条目动画：翻转 + 跳出
const itemVariants = {
  hidden: {
    opacity: 0,
    rotateX: -90,
    y: 30,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
}

export default function ProjectList() {
  const [filter, setFilter] = useState<typeof categories[number]>('all')

  const filteredProjects = useMemo(() => {
    return filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter)
  }, [filter])

  return (
    <section className="py-12">
      {/* 分类按钮 */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              filter === cat
                ? 'bg-[var(--color-accent)] text-[var(--color-secondary)]'
                : 'bg-transparent border-gray-500 text-gray-400 hover:border-white hover:text-white'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 项目卡片列表 */}
      <motion.ul
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.li
              key={project.title}
              layout
              variants={itemVariants}
              exit="exit"
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  )
}
