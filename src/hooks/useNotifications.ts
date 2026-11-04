import { useLocalStorage } from './useLocalStorage'
import { notifications as initialNotifications } from '../data/notifications'
import type { Notification } from '../data/types'

export function useNotifications() {
  const [readIds, setReadIds] = useLocalStorage<string[]>('clubify_notifs_read', [])
  const [pinnedIds, setPinnedIds] = useLocalStorage<string[]>('clubify_notifs_pinned', [])
  const [flaggedIds, setFlaggedIds] = useLocalStorage<string[]>('clubify_notifs_flagged', [])
  const [deletedIds, setDeletedIds] = useLocalStorage<string[]>('clubify_notifs_deleted', [])

  const notifsEnabled = localStorage.getItem('clubify_notifs_enabled') !== 'false'

  const notifs: Notification[] = initialNotifications
    .filter((n) => !deletedIds.includes(n.id))
    .map((n) => ({
      ...n,
      isRead: readIds.includes(n.id),
      isPinned: pinnedIds.includes(n.id),
      isFlagged: flaggedIds.includes(n.id),
    }))

  const unreadCount = notifsEnabled ? notifs.filter((n) => !n.isRead).length : 0

  const sorted = [...notifs].sort((a, b) => {
    if (!!a.isPinned !== !!b.isPinned) return a.isPinned ? -1 : 1
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  const markAsRead = (id: string) => {
    setReadIds((prev) => prev.includes(id) ? prev : [...prev, id])
  }

  const markAsUnread = (id: string) => {
    setReadIds((prev) => prev.filter((r) => r !== id))
  }

  const markAllRead = () => {
    setReadIds(initialNotifications.map((n) => n.id))
  }

  const deleteNotification = (id: string) => {
    setDeletedIds((prev) => [...prev, id])
  }

  const togglePin = (id: string) => {
    setPinnedIds((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id])
  }

  const toggleFlag = (id: string) => {
    setFlaggedIds((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  return {
    notifs: sorted,
    unreadCount,
    markAsRead,
    markAsUnread,
    markAllRead,
    deleteNotification,
    togglePin,
    toggleFlag,
  }
}
