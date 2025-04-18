// src/lib/i18n.ts

export const locales = ['en', 'zh'] as const
export const defaultLocale = 'zh'

export type Locale = typeof locales[number]
