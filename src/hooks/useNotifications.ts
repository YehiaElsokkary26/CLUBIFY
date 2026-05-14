import { useState } from 'react'
import { notifications as initialNotifications } from '../data/notifications'
import type { Notification } from '../data/types'

export function useNotifications() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications)

  const unreadCount = notifs.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  return { notifs, unreadCount, markAsRead, markAllRead }
}
