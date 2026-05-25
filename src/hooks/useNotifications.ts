import { useState } from 'react'
import { notifications as initialNotifications } from '../data/notifications'
import type { Notification } from '../data/types'

export function useNotifications() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications)

  const notifsEnabled = localStorage.getItem('clubify_notifs_enabled') !== 'false'
  const unreadCount = notifsEnabled ? notifs.filter((n) => !n.isRead).length : 0

  const sorted = [...notifs].sort((a, b) => {
    if (!!a.isPinned !== !!b.isPinned) return a.isPinned ? -1 : 1
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  const markAsRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAsUnread = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: false } : n)))
  }

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id))
  }

  const togglePin = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n)))
  }

  const toggleFlag = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, isFlagged: !n.isFlagged } : n)))
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
