'use client'

import { useState, lazy, Suspense } from 'react'
import Image from 'next/image'
import { Project } from '@/types'
import { motion } from 'framer-motion'

const ProjectModal = lazy(() => import('./ProjectModal'))

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="relative group h-full">
        {/* Hover 时全局暗化 */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none z-10" />

        <motion.div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(true)}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative z-20 glass-card cursor-pointer overflow-hidden outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow duration-300 will-change-transform flex flex-col h-full"
          aria-label={`View project: ${project.title}`}
        >
          {/* 封面图 */}
          <div className="relative w-full h-48 flex-shrink-0">
            <Image
              src={project.imgs[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute top-2 right-2 bg-[var(--color-accent)] text-[var(--color-secondary)] text-xs px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
              {project.category.toUpperCase()}
            </div>
          </div>

          {/* 标题 + 描述 */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-400 overflow-hidden text-ellipsis transition-all duration-300 ease-in-out line-clamp-3 group-hover:line-clamp-none">
              {project.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 懒加载弹窗 */}
      {open && (
        <Suspense fallback={null}>
          <ProjectModal project={project} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
