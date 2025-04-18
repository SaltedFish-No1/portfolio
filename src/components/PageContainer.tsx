// src/components/PageContainer.tsx
'use client'

import React, { ReactNode, useEffect } from 'react'
import {
    motion,
    useReducedMotion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate
} from 'framer-motion'

interface PageContainerProps {
    isAnimating?: boolean
    children: ReactNode
}

export default function PageContainer({ isAnimating,children }: PageContainerProps) {
    const shouldReduce = useReducedMotion()
    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)

    // smoother spring for tilt
    const springOptions = { stiffness: 160, damping: 20 }
    const springX = shouldReduce ? rawX : useSpring(rawX, springOptions)
    const springY = shouldReduce ? rawY : useSpring(rawY, springOptions)

    // dynamic light gradient
    const lx = useTransform(springY, [-15, 15], ['0%', '100%'])
    const ly = useTransform(springX, [-15, 15], ['100%', '0%'])
    const lightGradient = useMotionTemplate`
    radial-gradient(
      1200px circle at ${lx} ${ly},
      rgba(var(--glass-light),0.15),
      transparent 70%
    )`
    if (isAnimating) {
    // pointer move for desktop
    useEffect(() => {
        if (shouldReduce) return
        let frame = 0
        const onPointerMove = (e: PointerEvent) => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                const w = window.innerWidth
                const h = window.innerHeight
                const dx = e.clientX - w / 2
                const dy = e.clientY - h / 2
                const max = 12
                rawY.set((dx / (w / 2)) * max)
                rawX.set((-dy / (h / 2)) * max)
                document.documentElement.style.setProperty('--lx', `${e.clientX}px`)
                document.documentElement.style.setProperty('--ly', `${e.clientY}px`)
            })
        }
        const onPointerLeave = () => {
            rawX.set(0)
            rawY.set(0)
        }
        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('pointerleave', onPointerLeave)
        return () => {
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerleave', onPointerLeave)
            cancelAnimationFrame(frame)
        }
    }, [rawX, rawY, shouldReduce])

    // device orientation for mobile
    useEffect(() => {
        if (shouldReduce) return
        const onOrient = (e: DeviceOrientationEvent) => {
            if (e.gamma == null || e.beta == null) return
            const max = 10
            rawY.set((e.gamma / 45) * max)
            rawX.set((-e.beta / 45) * max)
        }
        window.addEventListener('deviceorientation', onOrient)
        return () => window.removeEventListener('deviceorientation', onOrient)
    }, [rawX, rawY, shouldReduce])
    
        }
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-transparent">
            {/* Stage light overlay */}
            <div
                className="fixed inset-0 z-10 pointer-events-none mix-blend-screen
        bg-[radial-gradient(400px_circle_at_var(--lx,50%)_var(--ly,50%),rgba(255,255,255,0.12),transparent_80%)]
        will-change-[background] transition-none"
            />

            {/* Background glows */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 sm:w-96 sm:h-96 rounded-full
          bg-[rgba(var(--glass-light),0.08)] blur-2xl animate-pulseSlow will-change-transform" />
                <div className="w-44 h-44 rounded-full bg-[rgba(var(--accent-rgb),0.15)]
          blur-3xl animate-pulseSlow delay-2000 will-change-transform" />
            </div>

            {/* Content wrapper with tilt */}
            <motion.div
                className="relative z-20 flex flex-col items-center justify-start gap-24
    pt-24 pb-16 px-4 sm:px-6 w-full max-w-screen-xl mx-auto"

                style={{
                    perspective: shouldReduce ? undefined : 1000,
                    rotateX: shouldReduce ? undefined : springX,
                    rotateY: shouldReduce ? undefined : springY,
                    backgroundImage: shouldReduce ? undefined : lightGradient
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
                {children}
            </motion.div>
        </section>
    )
}
