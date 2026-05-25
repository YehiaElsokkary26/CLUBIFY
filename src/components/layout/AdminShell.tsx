import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { useTheme } from '../../context/ThemeContext'

export function AdminShell() {
  const { isDark } = useTheme()

  return (
    <div
      className="relative flex flex-col h-full min-h-[844px]"
      style={{ background: isDark ? '#18181B' : '#F4F4F5' }}
    >
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <BottomNav role="admin" />
    </div>
  )
}
