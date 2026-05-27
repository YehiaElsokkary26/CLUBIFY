import { Bell, Calendar, Users, Megaphone, Clock, MoreVertical, Pin, Flag } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../lib/utils'
import type { Notification } from '../../data/types'

const typeIcon: Record<string, React.ReactNode> = {
  event:        <Calendar  size={16} className="text-blue-500" />,
  recruitment:  <Users     size={16} className="text-[#6E8B5A]" />,
  announcement: <Megaphone size={16} className="text-purple-500" />,
  reminder:     <Clock     size={16} className="text-[#C99B2E]" />,
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
        'flex items-start gap-3 px-5 py-4 transition-all border-b',
        !notification.isRead && (isDark ? 'bg-[#6F2F33]/10 border-l-4 border-l-[#6F2F33]' : 'bg-[#fae8e9] border-l-4 border-l-[#6F2F33]'),
        notification.isPinned && !notification.isRead && 'border-l-[#6F2F33]',
        notification.isPinned && notification.isRead && (isDark ? 'border-l-4 border-l-[#6F2F33]/50' : 'border-l-4 border-l-[#e8c5c8]'),
        isDark ? 'border-b-[#2d3d4a]' : 'border-b-[#EAE5D8]'
      )}
    >
      <button
        onClick={() => onClick(notification.id)}
        className="flex items-start gap-3 flex-1 min-w-0 text-left cursor-pointer"
      >
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
            isDark ? 'bg-[#2d3d4a]' : 'bg-[#FAF6EA] shadow-sm'
          )}
        >
          {typeIcon[notification.type] || <Bell size={16} className="text-[#A8A09A]" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            {notification.isPinned && <Pin size={11} className="text-[#6F2F33] mt-1 flex-shrink-0" />}
            {notification.isFlagged && <Flag size={11} className="text-[#C75A6B] mt-1 flex-shrink-0" fill="currentColor" />}
            <h4 className={cn('text-sm font-semibold font-body flex-1', isDark ? 'text-white' : 'text-[#1E1B16]')}>
              {notification.title}
            </h4>
            {!notification.isRead && (
              <span className="w-2 h-2 rounded-full bg-[#6F2F33] flex-shrink-0 mt-1.5" />
            )}
          </div>
          <p className={cn('text-xs mt-0.5 leading-relaxed line-clamp-2 font-body', isDark ? 'text-[#A8A09A]' : 'text-[#76706A]')}>
            {notification.body}
          </p>
          <p className={cn('text-[10px] mt-1 type-mono', isDark ? 'text-[#5C5650]' : 'text-[#A8A09A]')}>
            {timeAgo(notification.timestamp)}
          </p>
        </div>
      </button>

      {onMenu && (
        <button
          onClick={(e) => { e.stopPropagation(); onMenu(notification.id) }}
          className={cn('w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0', isDark ? 'hover:bg-[#2d3d4a] text-[#A8A09A]' : 'hover:bg-[#EDE8D8] text-[#76706A]')}
          aria-label="Notification options"
        >
          <MoreVertical size={14} />
        </button>
      )}
    </div>
  )
}
