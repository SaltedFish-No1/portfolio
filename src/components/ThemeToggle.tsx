import { useTheme } from '@/context/ThemeProvider'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="切换主题"
      className="header-btn"
    >
      {theme === 'dark' ? <SunIcon className="w-4 h-4 opacity-80" /> : <MoonIcon className="w-4 h-4 opacity-80" />}
      <span
        className="
          transition-all duration-300 ease-in-out
          inline-block w-[30px] text-center
        "
      >
        {theme === 'dark' ? '开灯' : '关灯'}
      </span>
      <span className="sr-only">
        {theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
      </span>

    </button>
  )
}
