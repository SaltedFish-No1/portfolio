// src/context/ThemeProvider.tsx
'use client'

import { useState, createContext, useContext, useEffect, use } from "react"

interface ThemeContextProps {
    theme: 'light' | 'dark' | null
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)


export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

// Hook 只能写在函数组件或自定义 Hook 的函数体内部，不能在组件外部或条件判断中调用。
export function ThemeProvider(
    { children }: { children: React.ReactNode }
) {

    const [theme, setTheme] = useState<'light' | 'dark' | null>(null)
    // 1. 初始化， 放入useEffect中，避免SSR时读取localStorage报错
    useEffect(() => {
        //初始化时从 localStorage 中读取主题设置，如果没有设置，则跟据系统偏好设置来决定
        const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        const storedTheme = localStorage.getItem('theme')
        //2. 使用 useState 来设置主题状态
        setTheme(storedTheme === 'dark' ? 'dark' : (prefersDark ? 'dark' : 'light'))
    }, [])


    //3. 在切换主题时，更新 localStorage 中的值
    const toggleTheme = () => { setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light') }

    useEffect(() => {
        if (!theme) return

        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
        //5. 监听系统主题变化，自动切换主题
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light')
        }
        mediaQuery.addEventListener('change', handleChange)
        // 4. 清理函数，移除事件监听器
        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    
    }, [theme])

    // 6. 如果没有主题，返回 null 以避免页面闪烁
    if (!theme) {
        return null // 或者返回一个加载状态
    }


    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
        }}>
            {children}
        </ThemeContext.Provider >
    )
}


