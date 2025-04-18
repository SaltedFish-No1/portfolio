// src/types/index.ts
export interface Project {
  title: string
  imgs: string[] // 多图，取第一张为封面
  description: string
  category: 'web' | 'game' | 'other' | 'academic'
  repository?: string // GitHub repo link
  demo?: string // Demo link
  details?: string
}

