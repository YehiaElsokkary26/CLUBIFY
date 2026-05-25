import { NavLink, useLocation } from 'react-router-dom'
import { Home, Search, Users, User, LayoutDashboard, Settings, Building2, BarChart3 } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'

const studentItems = [
  { to: '/student/home', icon: Home, label: 'Home' },
  { to: '/student/clubs', icon: Search, label: 'Clubs' },
  { to: '/student/recruit', icon: Users, label: 'Recruit' },
  { to: '/student/profile', icon: User, label: 'Profile' },
]

const adminItems = [
  { to: '/admin/feed', icon: LayoutDashboard, label: 'Feed' },
  { to: '/admin/manage', icon: Settings, label: 'Manage' },
  { to: '/admin/club', icon: Building2, label: 'Club' },
  { to: '/admin/stats', icon: BarChart3, label: 'Stats' },
]

interface BottomNavProps {
  role: 'student' | 'admin'
}

export function BottomNav({ role }: BottomNavProps) {
  const { isDark } = useTheme()
  const location = useLocation()
  const items = role === 'admin' ? adminItems : studentItems

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 px-2 pb-2"
      style={{ maxWidth: '430px' }}
    >
      <div
        className="flex items-center justify-around rounded-2xl px-2 py-3 mx-2"
        style={{
          background: isDark ? 'rgba(24,24,27,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${isDark ? '#3F3F46' : '#D4D4D8'}`,
          boxShadow: isDark
            ? '0 -1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)'
            : '0 -1px 0 rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.12)',
        }}
      >
        {items.map(({ to, icon: Icon, label }) => {
          const active = location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200',
                active
                  ? 'text-[#0891B2] bg-[#E0F2FE]'
                  : isDark ? 'text-zinc-500' : 'text-zinc-400'
              )}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? 'text-[#0891B2]' : ''}
              />
              <span
                className={cn(
                  'text-[10px] font-semibold tracking-wide font-body',
                  active ? 'text-[#0891B2]' : isDark ? 'text-zinc-500' : 'text-zinc-400'
                )}
              >
                {label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
