'use client'

import { Project } from '@/types'
import {X} from 'lucide-react'

export default function ProjectModal({
  project,
  onClose
}: {
  project: Project
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-black text-black dark:text-white rounded-2xl max-w-xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-4 top-4 text-xl" onClick={onClose}>
            <X className="w-6 h-6" />
        </button>
        <img
          src={project.imgs[0]}
          alt={project.title}
          className="rounded-lg w-full h-64 object-cover mb-4"
        />
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400">{project.details}</p>
      </div>
    </div>
  )
}
