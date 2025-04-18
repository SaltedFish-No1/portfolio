// src/components/Hero.tsx
'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate
} from 'framer-motion'
import { useEffect, useState } from 'react'

const slides = [
  { greeting: '你好，我是昊天', description: '欢迎光临我的主页。' }, // 中文
  { greeting: "Hello, I'm Haotian", description: 'Welcome to my homepage.' }, // English
  { greeting: 'こんにちは、昊天です', description: '私のホームページへようこそ。' }, // Japanese
  { greeting: 'Hola, soy Haotian', description: 'Bienvenido a mi página web.' }, // Spanish
  { greeting: 'Bonjour, je suis Haotian', description: "Bienvenue sur ma page d'accueil." }, // French
  { greeting: 'Hallo, ich bin Haotian', description: 'Willkommen auf meiner Homepage.' }, // German
  { greeting: '안녕하세요, 저는 하오톈입니다', description: '제 홈페이지에 오신 것을 환영합니다.' }, // Korean
  { greeting: 'Привет, я Хаотянь', description: 'Добро пожаловать на мою домашнюю страницу.' }, // Russian
  { greeting: 'مرحبًا، أنا هاوتيان', description: 'أهلاً بك في صفحتي الرئيسية.' }, // Arabic
  { greeting: 'Olá, eu sou o Haotian', description: 'Bem-vindo à minha página inicial.' }, // Portuguese
  { greeting: 'Ciao, sono Haotian', description: 'Benvenuto nella mia pagina personale.' }, // Italian
];


export default function Hero() {
  /* --------------------------- 文案循环，无闪烁 --------------------------- */
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  /* ---------------------- 统一旋转逻辑（桌面+移动） ---------------------- */
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const smoothX = useSpring(rotX, { stiffness: 200, damping: 18 })
  const smoothY = useSpring(rotY, { stiffness: 200, damping: 18 })

  // 光照
  const lx = useTransform(smoothY, [-15, 15], ['0%', '100%'])
  const ly = useTransform(smoothX, [-15, 15], ['100%', '0%'])
  const gradient = useMotionTemplate`radial-gradient(900px circle at ${lx} ${ly}, rgba(255 255 255 / .25), transparent 60%)`

  /* -------- 桌面：根据指针在整个视口内计算旋转，避免 pointerleave 闪烁 ------- */
  const handlePointerMove = (e: React.PointerEvent) => {
    const { innerWidth: w, innerHeight: h } = window
    const dx = e.clientX - w / 2
    const dy = e.clientY - h / 2
    const maxDeg = 15
    rotY.set((dx / (w / 2)) * maxDeg)
    rotX.set((-dy / (h / 2)) * maxDeg)
  }
  const reset = () => {
    rotX.set(0)
    rotY.set(0)
  }

  /* -------------------- 移动：设备方向/自动轻微摇摆 -------------------- */
  useEffect(() => {
    const orient = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return
      const maxDeg = 10
      rotY.set((e.gamma / 45) * maxDeg)
      rotX.set((-e.beta / 45) * maxDeg)
    }
    window.addEventListener('deviceorientation', orient)
    return () => window.removeEventListener('deviceorientation', orient)
  }, [rotX, rotY])

  /* ------------------------------ Render ------------------------------ */
  const { greeting, description } = slides[idx]

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden px-4 sm:px-6"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {/* 背景光晕 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/10 blur-2xl animate-pulseSlow" />
        <div className="w-48 h-48 rounded-full bg-[#a4fffa]/10 blur-3xl animate-pulseSlow delay-2000" />
      </div>

      <motion.div
        className="glass-card bg-white/10 backdrop-blur-lg rounded-2xl z-10 flex flex-col items-center justify-center text-center select-none"
        style={{ perspective: 1000, rotateX: smoothX, rotateY: smoothY, backgroundImage: gradient }}
        initial={{ width: '90vw', height: '60vh' }}
        animate={{ width: '90vw', height: '60vh', maxWidth: 640, minHeight: 320, padding: 24 }}
      >
        <motion.h1
          key={greeting}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45 }}
          className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold mb-3 shimmer"
        >
          {greeting}
        </motion.h1>

        <motion.p
          key={description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45 }}
          className="text-gray-300 max-w-[75%] text-sm sm:text-base"
        >
          {description}
        </motion.p>

        {/* 下滑提示 */}
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 text-white/70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </motion.div>
    </section>
  )
}
