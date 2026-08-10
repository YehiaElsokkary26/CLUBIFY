import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Bell, CheckCheck, X, Pin, PinOff, Flag, FlagOff, Trash2, MailOpen, Mail } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useNotifications } from '../../hooks/useNotifications'
import { NotificationCard } from '../../components/cards/NotificationCard'
import { EmptyState } from '../../components/shared/EmptyState'
import { useToast } from '../../components/shared/Toast'
import { cn } from '../../lib/utils'
import type { Notification } from '../../data/types'

export function Notifications() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { toast } = useToast()
  const {
    notifs, unreadCount,
    markAsRead, markAsUnread, markAllRead,
    deleteNotification, togglePin, toggleFlag,
  } = useNotifications()

  const [openId, setOpenId] = useState<string | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)

  const openDetail = (id: string) => {
    setOpenId(id)
    markAsRead(id)
  }

  const closeDetail = () => setOpenId(null)

  const current: Notification | undefined = openId ? notifs.find((n) => n.id === openId) : undefined
  const menuTarget: Notification | undefined = menuId ? notifs.find((n) => n.id === menuId) : undefined

  const formatTime = (ts: string) => {
    const d = new Date(ts)
    return d.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="phone-scroll h-[844px] pb-10" style={{ background: isDark ? '#272831' : '#F5F5F6' }}>
      {/* Header */}
      <div className={cn('sticky top-0 z-20 pt-12 pb-3 px-5', isDark ? 'bg-[#272831]' : 'bg-[#F5F5F6]')}>
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate(-1)} className={cn('w-9 h-9 rounded-full flex items-center justify-center', isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF] shadow-sm')}>
            <ArrowLeft size={18} className={isDark ? 'text-white' : 'text-[#272831]'} />
          </button>
          <h1 className={cn('flex-1 text-xl font-black font-display tracking-wide', isDark ? 'text-white' : 'text-[#272831]')}>Notifications</h1>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs font-semibold font-body text-[#6F2F33]">
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>
        {unreadCount > 0 && (
          <p className={cn('text-xs font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {notifs.length === 0 ? (
        <EmptyState
          icon={<Bell size={28} className="text-[#929397]" />}
          title="No notifications yet"
          description="We'll notify you about new events, recruitments, and announcements from your clubs."
        />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {notifs.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onClick={openDetail}
              onMenu={setMenuId}
            />
          ))}
        </motion.div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {current && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeDetail}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className={cn(
                'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] rounded-t-3xl z-50 px-5 pb-8 pt-5 max-h-[80vh] overflow-y-auto',
                isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]'
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 flex-1">
                  {current.isPinned && <Pin size={14} className="text-[#FDA014]" />}
                  {current.isFlagged && <Flag size={14} className="text-red-500" fill="currentColor" />}
                  <span className={cn('text-[10px] uppercase tracking-wider font-bold font-body', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                    {current.type}
                  </span>
                </div>
                <button onClick={closeDetail} className={cn('w-8 h-8 rounded-full flex items-center justify-center', isDark ? 'bg-[#35363F]' : 'bg-[#F0F0F2]')}>
                  <X size={16} className={isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]'} />
                </button>
              </div>

              <h2 className={cn('text-lg font-black font-display tracking-wide mb-2', isDark ? 'text-white' : 'text-[#272831]')}>
                {current.title}
              </h2>
              {current.clubName && (
                <p className="text-xs font-semibold font-body text-[#FDA014] mb-3">{current.clubName}</p>
              )}
              <p className={cn('text-sm leading-relaxed whitespace-pre-wrap font-body', isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]')}>
                {current.body}
              </p>
              <p className={cn('text-[10px] mt-4 font-mono', isDark ? 'text-[#929397]' : 'text-[#929397]')}>
                {formatTime(current.timestamp)}
              </p>

              <div className={cn('grid grid-cols-4 gap-2 mt-5 pt-4 border-t', isDark ? 'border-[#35363F]' : 'border-[#ECECEF]')}>
                <button
                  onClick={() => { togglePin(current.id); toast(current.isPinned ? 'Unpinned' : 'Pinned', 'info') }}
                  className={cn('flex flex-col items-center gap-1 py-2 rounded-xl', isDark ? 'hover:bg-[#35363F]' : 'hover:bg-[#FFFFFF]')}
                >
                  {current.isPinned ? <PinOff size={16} className="text-[#FDA014]" /> : <Pin size={16} className={isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]'} />}
                  <span className={cn('text-[10px] font-semibold font-body', isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]')}>{current.isPinned ? 'Unpin' : 'Pin'}</span>
                </button>

                <button
                  onClick={() => { markAsUnread(current.id); toast('Marked as unread', 'info'); closeDetail() }}
                  className={cn('flex flex-col items-center gap-1 py-2 rounded-xl', isDark ? 'hover:bg-[#35363F]' : 'hover:bg-[#FFFFFF]')}
                >
                  <Mail size={16} className={isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]'} />
                  <span className={cn('text-[10px] font-semibold font-body', isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]')}>Unread</span>
                </button>

                <button
                  onClick={() => { toggleFlag(current.id); toast(current.isFlagged ? 'Flag removed' : 'Flagged', 'info') }}
                  className={cn('flex flex-col items-center gap-1 py-2 rounded-xl', isDark ? 'hover:bg-[#35363F]' : 'hover:bg-[#FFFFFF]')}
                >
                  {current.isFlagged ? <FlagOff size={16} className="text-red-500" /> : <Flag size={16} className={isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]'} />}
                  <span className={cn('text-[10px] font-semibold font-body', current.isFlagged ? 'text-red-500' : isDark ? 'text-[#B8B9C1]' : 'text-[#6B6C72]')}>
                    {current.isFlagged ? 'Unflag' : 'Flag'}
                  </span>
                </button>

                <button
                  onClick={() => { deleteNotification(current.id); toast('Notification deleted', 'info'); closeDetail() }}
                  className={cn('flex flex-col items-center gap-1 py-2 rounded-xl', isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50')}
                >
                  <Trash2 size={16} className="text-red-500" />
                  <span className="text-[10px] font-semibold font-body text-red-500">Delete</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick action menu (3-dot) */}
      <AnimatePresence>
        {menuTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuId(null)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] rounded-t-3xl z-50 px-5 pb-8 pt-4',
                isDark ? 'bg-[#272831]' : 'bg-[#FFFFFF]'
              )}
            >
              <div className={cn('w-10 h-1 rounded-full mx-auto mb-4', isDark ? 'bg-[#35363F]' : 'bg-[#E5E5E8]')} />

              <button
                onClick={() => { togglePin(menuTarget.id); toast(menuTarget.isPinned ? 'Unpinned' : 'Pinned', 'info'); setMenuId(null) }}
                className={cn('w-full flex items-center gap-3 px-3 py-3 rounded-xl', isDark ? 'hover:bg-[#35363F]' : 'hover:bg-[#FFFFFF]')}
              >
                {menuTarget.isPinned ? <PinOff size={18} className="text-[#FDA014]" /> : <Pin size={18} className={isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]'} />}
                <span className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#272831]')}>
                  {menuTarget.isPinned ? 'Unpin notification' : 'Pin notification'}
                </span>
              </button>

              <button
                onClick={() => {
                  menuTarget.isRead ? markAsUnread(menuTarget.id) : markAsRead(menuTarget.id)
                  toast(menuTarget.isRead ? 'Marked as unread' : 'Marked as read', 'info')
                  setMenuId(null)
                }}
                className={cn('w-full flex items-center gap-3 px-3 py-3 rounded-xl', isDark ? 'hover:bg-[#35363F]' : 'hover:bg-[#FFFFFF]')}
              >
                {menuTarget.isRead ? <Mail size={18} className={isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]'} /> : <MailOpen size={18} className={isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]'} />}
                <span className={cn('text-sm font-semibold font-body', isDark ? 'text-white' : 'text-[#272831]')}>
                  Mark as {menuTarget.isRead ? 'unread' : 'read'}
                </span>
              </button>

              <button
                onClick={() => { toggleFlag(menuTarget.id); toast(menuTarget.isFlagged ? 'Flag removed' : 'Flagged', 'info'); setMenuId(null) }}
                className={cn('w-full flex items-center gap-3 px-3 py-3 rounded-xl', isDark ? 'hover:bg-[#35363F]' : 'hover:bg-[#FFFFFF]')}
              >
                {menuTarget.isFlagged ? <FlagOff size={18} className="text-red-500" /> : <Flag size={18} className={isDark ? 'text-[#B8B9C1]' : 'text-[#4A4B52]'} />}
                <span className={cn('text-sm font-semibold font-body', menuTarget.isFlagged ? 'text-red-500' : isDark ? 'text-white' : 'text-[#272831]')}>
                  {menuTarget.isFlagged ? 'Remove flag' : 'Flag notification'}
                </span>
              </button>

              <button
                onClick={() => { deleteNotification(menuTarget.id); toast('Notification deleted', 'info'); setMenuId(null) }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50"
              >
                <Trash2 size={18} className="text-red-500" />
                <span className="text-sm font-semibold font-body text-red-500">Delete notification</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
