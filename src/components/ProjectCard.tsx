'use client'

import { useState, lazy, Suspense } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { Project } from '@/types'

const ProjectModal = lazy(() => import('./ProjectModal'))

export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('ProjectList')
  const tp = useTranslations('projects')
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 卡片主体 */}
      <div className="group relative h-full">
        {/* Hover 暗化罩层 */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40" />

        <motion.div
          role="button"
          tabIndex={0}
          aria-label={t('aria.viewProject', { title: tp(`${project.id}.title`) })}
          onClick={() => setOpen(true)}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && setOpen(true)
          }
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="glass-card relative z-20 flex h-full cursor-pointer flex-col overflow-hidden outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          {/* 封面图 */}
          <div className="relative h-48 w-full flex-shrink-0">
            <Image
              src={project.imgs[0]}
              alt={tp(`${project.id}.title`)}
              fill
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw"
            />
            <div className="absolute right-2 top-2 rounded-full bg-[var(--color-accent)] px-2 py-1 text-xs text-[var(--color-secondary)] shadow-sm backdrop-blur-sm">
              {t(`categories.${project.category}`)}
            </div>
          </div>

          {/* 文本区 */}
          <div className="flex grow flex-col p-4">
            <h3 className="text-xl font-semibold mb-2">
              {tp(`${project.id}.title`)}
            </h3>
            <p className="text-sm text-gray-400 …">
              {tp(`${project.id}.description`)}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 懒加载详情弹窗 */}
      {open && (
        <Suspense fallback={null}>
          <ProjectModal project={project} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
