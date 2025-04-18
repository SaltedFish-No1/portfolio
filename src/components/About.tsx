'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function About() {
    const t = useTranslations('About')
    return (
        <section
            id="about"
            className="relative w-full max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-center gap-10"
        >
            {/* 背景光圈 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/10 blur-2xl animate-pulseSlow" />
                <div className="w-48 h-48 rounded-full bg-[#a4fffa]/10 blur-3xl animate-pulseSlow delay-2000" />
            </div>

            {/* 头像 */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0"
            >
                <Image
                    src="/images/avatar.jpg"
                    alt="Avatar"
                    width={200}
                    height={200}
                    className="rounded-full w-48 h-48 object-cover border-4 border-white/10 shadow-lg"
                />
            </motion.div>

            {/* 自我介绍 */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card backdrop-blur-lg bg-white/10 p-6 rounded-2xl z-10 max-w-xl text-center md:text-left"
            >
                <h2 className="heading-2">{
                    t('name')
                }</h2>
                <p className="paragraph">
                    {t('self-introduction')}
                </p>
            </motion.div>
        </section>
    )
}
