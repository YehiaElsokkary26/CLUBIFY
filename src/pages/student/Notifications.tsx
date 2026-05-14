import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, CheckCheck } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useNotifications } from '../../hooks/useNotifications'
import { NotificationCard } from '../../components/cards/NotificationCard'
import { EmptyState } from '../../components/shared/EmptyState'
import { cn } from '../../lib/utils'

export function Notifications() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { notifs, unreadCount, markAsRead, markAllRead } = useNotifications()

  return (
    <div className="phone-scroll h-[844px] pb-10" style={{ background: isDark ? '#1C1C1E' : '#FAF8F5' }}>
      {/* Header */}
      <div className={cn('sticky top-0 z-20 pt-12 pb-3 px-5', isDark ? 'bg-[#1C1C1E]' : 'bg-[#FAF8F5]')}>
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate(-1)} className={cn('w-9 h-9 rounded-full flex items-center justify-center', isDark ? 'bg-[#2C2C2E]' : 'bg-white shadow-sm')}>
            <ArrowLeft size={18} className={isDark ? 'text-white' : 'text-[#1C1C1E]'} />
          </button>
          <h1 className={cn('flex-1 text-xl font-black', isDark ? 'text-white' : 'text-[#1C1C1E]')}>Notifications</h1>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs font-semibold text-[#8B1A1A]">
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>
        {unreadCount > 0 && (
          <p className={cn('text-xs', isDark ? 'text-gray-400' : 'text-gray-500')}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {notifs.length === 0 ? (
        <EmptyState
          icon={<Bell size={28} className="text-gray-400" />}
          title="No notifications yet"
          description="We'll notify you about new events, recruitments, and announcements from your clubs."
        />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {notifs.map((n) => (
            <NotificationCard key={n.id} notification={n} onClick={markAsRead} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
