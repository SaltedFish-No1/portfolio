// src/components/SkillsSection.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
// 使用 next/image 可能需要配置 remotePatterns 在 next.config.js 中允许 skillicons.dev
// 如果不使用 next/image 或者配置麻烦，可以换回普通的 <img> 标签
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeProvider";

/*********************************
 * DATA MODEL & CONFIG
 *********************************/
interface Skill {
  name: string;
  level: number; // 0 – 1 for progress ring fill
  iconId?: string; // skillicons.dev id (optional)
  color: string; // Tailwind ring / stroke colour class
}

// 技能列表保持不变
export const skills: Skill[] = [
  { name: "Next.js",      level: 0.5,  iconId: "nextjs",   color: "text-neutral-400" },
  { name: "React",        level: 0.7,  iconId: "react",    color: "text-sky-400" },
  { name: "TypeScript",   level: 0.8,  iconId: "ts",       color: "text-blue-500" },
  { name: "JavaScript",   level: 0.8,  iconId: "js",       color: "text-yellow-400" },
  { name: "HTML",         level: 0.8, iconId: "html",     color: "text-orange-600" },
  { name: "CSS",          level: 0.6, iconId: "css",      color: "text-blue-600" },
  { name: "Tailwind CSS", level: 0.5, iconId: "tailwind", color: "text-cyan-400" },
  { name: "Node.js",      level: 0.3,  iconId: "nodejs",   color: "text-green-500" },
  { name: "SQL",          level: 0.5,  iconId: "postgres", color: "text-indigo-600" },
  { name: "Python",       level: 0.7,  iconId: "py",       color: "text-yellow-500" },
  { name: "C++",       level: 0.5,  iconId: "cpp",   color: "text-blue-500" }
];

// **恢复熟练程度定义**
const PROFICIENCY = [
  { t: 0.9, key: "proficiencyExpert" },       // >= 0.9 -> Expert
  { t: 0.8, key: "proficiencyAdvanced" },     // >= 0.8 -> Advanced
  { t: 0.65, key: "proficiencyIntermediate" }, // >= 0.65 -> Intermediate
  { t: 0, key: "proficiencyBasic" }           // >= 0 -> Basic
];

/*********************************
 * CONSTANTS FOR GRAPHICS
 *********************************/
const R = 36;                  // Circle radius
const STROKE = 4;              // Stroke width
const CIRC = 2 * Math.PI * R;  // Circumference

/*********************************
 * FRAMER‑MOTION VARIANTS
 *********************************/
// 卡片进入和悬停动画
const cardVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  // 使用 whileInView 触发，根据 index 产生延迟
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // staggered delay
      type: "spring",
      stiffness: 120,
      damping: 20
    }
  }),
  // 简单的悬停效果，如果你想用之前的倾斜效果，可以替换这里的定义
  hover: {
    scale: 1.05,
    zIndex: 10 // 确保悬停卡片在最上层
    // rotateX: 8, // 如果需要倾斜效果可以加回来
    // rotateY: -8,
  }
};

// 进度环动画
const strokeVariants: Variants = {
  initial: { strokeDashoffset: CIRC },
  // 使用 whileInView 触发，根据 level 计算偏移量
  enter: (level: number) => ({
    strokeDashoffset: CIRC * (1 - level),
    transition: { duration: 1, ease: "easeOut", delay: 0.2 } // 加一点延迟让卡片先出现
  })
};

/*********************************
 * INDIVIDUAL CARD COMPONENT
 *********************************/
interface SkillCardProps {
  skill: Skill;
  theme: "dark" | "light";
  index: number;
  t: (key: string) => string; // **添加 t 函数类型**
}

/* ------------ 固定尺寸常量 ------------ */
const CARD_SIDE   = 160;   // SkillCard 宽高
const RING_SIZE   = 96;    // SVG viewBox & 外环 size
const ICON_SIZE   = 56;    // 图标 / 首字母


/* ------------ 单张技能卡片 ------------ */
function SkillCard({ skill, theme, index, t }: SkillCardProps) {
  const iconUrl = skill.iconId
    ? `https://skillicons.dev/icons?i=${skill.iconId}&theme=${theme}`
    : undefined;

  // 计算熟练度文案
  const proficiencyKey =
    PROFICIENCY.find(p => skill.level >= p.t)?.key || 'proficiencyBasic';
  const proficiencyText = t(proficiencyKey);

  return (
    <motion.li
      style={{ width: CARD_SIDE, height: CARD_SIDE }}          /* 固定整体尺寸 */
      className="relative flex flex-col items-center rounded-xl
                 bg-[var(--color-surface)]/40 shadow-md backdrop-blur-md
                 will-change-transform"
      variants={cardVariants}
      initial="initial"
      whileInView="enter"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
    >
      {/* 进度环 + 图标 */}
      <div className="relative mt-4 flex items-center justify-center"
           style={{ width: RING_SIZE, height: RING_SIZE }}>
        {/* 背景圆环 */}
        <svg width={RING_SIZE} height={RING_SIZE}
             viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
             className="absolute inset-0">
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={R}
            stroke="var(--color-surface-hover)"
            strokeWidth={STROKE}
            fill="none"
          />
          {/* 进度圆环 */}
          <motion.circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={R}
            className={`${skill.color}`}
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            variants={strokeVariants}
            initial="initial"
            whileInView="enter"
            viewport={{ once: true, amount: 0.5 }}
            custom={skill.level}
            style={{ rotate: '-90deg', transformOrigin: 'center' }}
          />
        </svg>

        {/* 图标 / 首字母 */}
        <div style={{ width: ICON_SIZE, height: ICON_SIZE }}
             className="relative flex items-center justify-center">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={skill.name}
              className="pointer-events-none h-full w-full select-none object-contain"
              loading="lazy"
            />
          ) : (
            <span className="select-none text-2xl font-bold text-[var(--color-primary)]">
              {skill.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* 名称 + 熟练度 —— 高度恒定，避免撑开 */}
      <div className="mt-2 flex flex-col items-center leading-tight">
        <span className="text-sm font-medium text-[var(--color-primary)] max-w-[100%]">
          {skill.name}
        </span>
        <span className="text-xs text-[var(--gray-500)]">{proficiencyText}</span>
      </div>
    </motion.li>
  );
}

/*********************************
 * SKILLS SECTION COMPONENT
 *********************************/
export default function SkillsSection() {
  const t = useTranslations("Skills"); // 获取翻译函数
  const { theme } = useTheme(); // 获取当前主题
  const currentTheme = theme === "dark" ? "dark" : "light";

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6"> {/* 添加容器限制最大宽度并居中 */}
        <h2 className="mb-12 text-center text-4xl font-bold text-[var(--color-primary)] md:mb-16">
          {t("title")} {/* 使用翻译函数获取标题
           */}
        </h2>

        {/* 使用 ul 和 Tailwind 的 grid-cols-* 实现响应式布局 */}
        <motion.ul
          className="grid gap-4 sm:gap-6 md:gap-8
                     grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {skills.map((skill, idx) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              theme={currentTheme}
              index={idx}
              t={t} // **将 t 函数传递给 SkillCard**
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}