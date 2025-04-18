import { Project } from '@/types'

/** 静态资源 + 分类等非语言信息 */
export const projects: Project[] = [
  {
    id: 'aiResume',
    imgs: ['/images/projects/resume-builder.png'],
    category: 'web',
    repository: 'https://github.com/your/repo',
    demo: 'https://your-demo.com'
  },
  {
    id: 'portfolio',
    imgs: ['/images/projects/portfolio.png'],
    category: 'web'
  },
  {
    id: 'ghostHunter',
    imgs: [
      '/images/projects/ghost-hunter-lose.gif',
      '/images/projects/ghost-hunter-win.gif'
    ],
    category: 'game'
  },
  {
    id: 'conceptDrift',
    imgs: ['/images/projects/concept-drift-deepfake.png'],
    category: 'academic'
  },
  {
    id: 'subdomainSecurity',
    imgs: ['/images/projects/subdomain-security-japan.svg'],
    category: 'academic'
  }
]
