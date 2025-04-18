export interface Project {
  /** i18n slug，用来在 JSON 里取标题 / 描述 / 详情 */
  id: string
  imgs: string[]
  category: 'web' | 'game' | 'academic' | 'other'
  repository?: string
  demo?: string
}
