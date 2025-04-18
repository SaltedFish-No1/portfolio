import { Project } from '@/types'

export const projects: Project[] = [
    {
        title: 'AI Resume Generator',
        imgs: ['/images/projects/resume-builder.png'],
        description: 'A modern Next.js web app that generates resumes powered by GPT. Features real-time preview and PDF export.',
        category: 'web',
        details: 'Built with Next.js, Tailwind CSS, Firebase Auth, and OpenAI API. Used react-pdf to render export-ready resumes.'
    },
    {
        title: 'Portfolio Website',
        imgs: ['/images/projects/portfolio.png'],
        description: 'A transparent, minimal, and animated portfolio website inspired by the Nothing Phone aesthetic.',
        category: 'web',
        details: 'Built with Next.js App Router, Tailwind CSS V4, Framer Motion, and CSS-first glassmorphism system.'
    },
    {
        title: 'GhostHunter',
        imgs: ['/images/projects/ghost-hunter-lose.gif', 'ghost-hunter-win.gif'],
        description: 'An OpenGL-powered FPS game where you vacuum up ghosts in a haunted house. Built with C++ and Visual Studio.',
        category: 'game',
        details: `Ghost Hunter is a simple FPS game project developed using C++ and OpenGL. You play as a ghost hunter, using a vacuum cleaner to capture ghosts in a haunted house.`
    },
    {
        title: 'Concept Drift in Audio Deepfake Detection',
        imgs: ['/images/projects/concept-drift-deepfake.png'],
        description: 'An academic study on how evolving generative models affect audio deepfake detection generalization.',
        category: 'academic',
        details: `This research project investigates how concept drift—changes in the distribution of generative audio—contributes to model overfitting and generalization failure in deepfake detection systems.`
    },
    {
        title: 'Subdomain Security in Japan',
        imgs: ['/images/projects/subdomain-security-japan.svg'],
        description: 'A measurement study on TLS configurations and certificate mismatches in Japanese subdomains.',
        category: 'academic',
        details: `This academic project analyzes the TLS configurations and certificate mismatches in over 20,000 Japanese websites, comparing top 10K and random-ranked domains.`
    },
]
