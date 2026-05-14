import { Bell, Calendar, Users, Megaphone, Clock } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'
import type { Notification } from '../../data/types'

const typeIcon: Record<string, React.ReactNode> = {
  event: <Calendar size={16} className="text-blue-500" />,
  recruitment: <Users size={16} className="text-green-500" />,
  announcement: <Megaphone size={16} className="text-purple-500" />,
  reminder: <Clock size={16} className="text-orange-500" />,
}

interface NotificationCardProps {
  notification: Notification
  onClick: (id: string) => void
}

export function NotificationCard({ notification, onClick }: NotificationCardProps) {
  const { isDark } = useTheme()
  const timeAgo = (ts: string) => {
    const d = new Date(ts)
    const diff = Date.now() - d.getTime()
    const h = Math.floor(diff / 3600000)
    const day = Math.floor(h / 24)
    if (day > 0) return `${day}d ago`
    if (h > 0) return `${h}h ago`
    return 'Just now'
  }

  return (
    <div
      onClick={() => onClick(notification.id)}
      className={cn(
        'flex items-start gap-3 px-5 py-4 cursor-pointer transition-all',
        !notification.isRead && (isDark ? 'bg-[#2C2C2E]/60' : 'bg-[#FAF0F0]'),
        'border-b',
        isDark ? 'border-[#2C2C2E]' : 'border-gray-100'
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
          isDark ? 'bg-[#3A3A3C]' : 'bg-white shadow-sm'
        )}
      >
        {typeIcon[notification.type] || <Bell size={16} className="text-gray-400" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
            {notification.title}
          </h4>
          {!notification.isRead && (
            <span className="w-2 h-2 rounded-full bg-[#8B1A1A] flex-shrink-0 mt-1" />
          )}
        </div>
        <p className={cn('text-xs mt-0.5 leading-relaxed', isDark ? 'text-gray-400' : 'text-gray-500')}>
          {notification.body}
        </p>
        <p className={cn('text-[10px] mt-1', isDark ? 'text-gray-600' : 'text-gray-400')}>
          {timeAgo(notification.timestamp)}
        </p>
      </div>
    </div>
  )
}
