import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { useTheme } from '../../context/ThemeContext'

export function StudentShell() {
  const { isDark } = useTheme()

  return (
    <div
      className="relative flex flex-col h-full min-h-[844px]"
      style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}
    >
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <BottomNav role="student" />
    </div>
  )
}
