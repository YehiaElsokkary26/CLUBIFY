import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { useTheme } from '../../context/ThemeContext'

export function AdminShell() {
  const { isDark } = useTheme()

  return (
    <div
      className="relative flex flex-col h-full min-h-[844px]"
      style={{ background: isDark ? '#0D1A12' : '#F4FBF6' }}
    >
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <BottomNav role="admin" />
    </div>
  )
}
