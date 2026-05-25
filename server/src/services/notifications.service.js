const { mockNotification } = require('../utils/mockData')

async function getByUser(userId) {
  // TODO: replace with Supabase query
  return { notifications: [mockNotification], unreadCount: 3 }
}

async function markRead(id, userId) {
  // TODO: replace with Supabase query
  return { ...mockNotification, id, isRead: true }
}

async function markAllRead(userId) {
  // TODO: replace with Supabase query
  return { updated: true }
}

module.exports = { getByUser, markRead, markAllRead }
