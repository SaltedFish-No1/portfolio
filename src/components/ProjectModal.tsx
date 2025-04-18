'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Project } from '@/types'

export default function ProjectModal({
  project,
  onClose
}: {
  project: Project
  onClose: () => void
}) {
  // 从 locales/{locale}.json 的 "projects" 部分取文案
  const t = useTranslations('projects')

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-auto rounded-2xl bg-white p-6 text-black dark:bg-black dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        {/* <button
          aria-label={t(`${project.id}.title`)}
          className="absolute right-4 top-4 text-xl"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button> */}

        {/* 封面图 */}
        <div className="relative mb-4 h-64 w-full rounded-lg">
          <Image
            src={project.imgs[0]}
            alt={t(`${project.id}.title`)}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* 标题 */}
        <h3 id="modal-title" className="mb-2 text-2xl font-bold">
          {t(`${project.id}.title`)}
        </h3>

        {/* 详情 */}
        <p className="whitespace-pre-wrap text-gray-400 dark:text-gray-300">
          {t(`${project.id}.details`)}
        </p>
      </div>
    </div>
  )
}
