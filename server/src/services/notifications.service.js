const supabase = require('../config/supabase')

async function createNotification({ userId, message, type, clubId } = {}) {
  try {
    const { data: prefs } = await supabase
      .from('user_preferences')
      .select('notifications_enabled')
      .eq('user_id', userId)
      .single()
    if (prefs && prefs.notifications_enabled === false) return null

    const { data, error } = await supabase
      .from('notifications')
      .insert({ user_id: userId, message, type, club_id: clubId || null })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch {
    return null
  }
}

async function broadcastNotification({ message, type, clubId } = {}) {
  try {
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'student')
    if (usersError) throw new Error(usersError.message)

    const { data: optedOut } = await supabase
      .from('user_preferences')
      .select('user_id')
      .eq('notifications_enabled', false)
    const optedOutSet = new Set((optedOut || []).map((p) => p.user_id))

    const rows = (users || [])
      .filter((u) => !optedOutSet.has(u.id))
      .map((u) => ({ user_id: u.id, message, type, club_id: clubId || null, read: false }))

    if (rows.length === 0) return { sent: 0 }
    const { error } = await supabase.from('notifications').insert(rows)
    if (error) throw new Error(error.message)
    return { sent: rows.length }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getByUser(userId, { read, type } = {}) {
  try {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (read !== undefined) query = query.eq('read', read === 'true' || read === true)
    if (type) query = query.eq('type', type)

    const { data, error } = await query
    if (error) throw new Error(error.message)

    const { count } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false)

    return { notifications: data, unreadCount: count || 0 }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function markRead(id, userId) {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('user_id', userId)
    if (error) throw new Error(error.message)
    return { id, read: true }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function markAllRead(userId) {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)
    if (error) throw new Error(error.message)
    return { updated: true }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = { createNotification, broadcastNotification, getByUser, markRead, markAllRead }
