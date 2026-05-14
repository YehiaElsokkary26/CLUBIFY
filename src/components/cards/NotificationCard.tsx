import { Bell, Calendar, Users, Megaphone, Clock, MoreVertical, Pin, Flag } from 'lucide-react'
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
  onMenu?: (id: string) => void
}

export function NotificationCard({ notification, onClick, onMenu }: NotificationCardProps) {
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
      className={cn(
        'flex items-start gap-3 px-5 py-4 transition-all',
        !notification.isRead && (isDark ? 'bg-[#2C2C2E]/60' : 'bg-[#FAF0F0]'),
        notification.isPinned && (isDark ? 'border-l-4 border-l-[#E07B39]' : 'border-l-4 border-l-[#E07B39]'),
        'border-b',
        isDark ? 'border-[#2C2C2E]' : 'border-gray-100'
      )}
    >
      <button
        onClick={() => onClick(notification.id)}
        className="flex items-start gap-3 flex-1 min-w-0 text-left cursor-pointer"
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
          <div className="flex items-start gap-2">
            {notification.isPinned && <Pin size={11} className="text-[#E07B39] mt-1 flex-shrink-0" />}
            {notification.isFlagged && <Flag size={11} className="text-red-500 mt-1 flex-shrink-0" fill="currentColor" />}
            <h4 className={cn('text-sm font-semibold flex-1', isDark ? 'text-white' : 'text-[#1C1C1E]')}>
              {notification.title}
            </h4>
            {!notification.isRead && (
              <span className="w-2 h-2 rounded-full bg-[#8B1A1A] flex-shrink-0 mt-1.5" />
            )}
          </div>
          <p className={cn('text-xs mt-0.5 leading-relaxed line-clamp-2', isDark ? 'text-gray-400' : 'text-gray-500')}>
            {notification.body}
          </p>
          <p className={cn('text-[10px] mt-1', isDark ? 'text-gray-600' : 'text-gray-400')}>
            {timeAgo(notification.timestamp)}
          </p>
        </div>
      </button>

      {onMenu && (
        <button
          onClick={(e) => { e.stopPropagation(); onMenu(notification.id) }}
          className={cn('w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0', isDark ? 'hover:bg-[#3A3A3C] text-gray-400' : 'hover:bg-gray-100 text-gray-500')}
          aria-label="Notification options"
        >
          <MoreVertical size={14} />
        </button>
      )}
    </div>
  )
}
