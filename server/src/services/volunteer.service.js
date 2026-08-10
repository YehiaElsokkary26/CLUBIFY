const supabase = require('../config/supabase')
const notificationsService = require('./notifications.service')

async function getAll({ search, open, page = 1, limit = 20 } = {}) {
  try {
    const pageNum = Number(page)
    const limitNum = Number(limit)
    const from = (pageNum - 1) * limitNum
    const to = from + limitNum - 1

    let query = supabase.from('volunteer_activities').select('*', { count: 'exact' })
    if (search) query = query.ilike('title', `%${search}%`)
    if (open !== undefined) query = query.eq('is_open', open === 'true' || open === true)
    query = query.range(from, to)

    const { data, error, count } = await query
    if (error) throw new Error(error.message)
    return { activities: data, total: count, page: pageNum, hasMore: to < (count || 0) }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getById(id) {
  try {
    const { data, error } = await supabase
      .from('volunteer_activities')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw new Error('Activity not found')
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function create(data) {
  try {
    const { data: created, error } = await supabase
      .from('volunteer_activities')
      .insert(data)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return created
  } catch (err) {
    throw new Error(err.message)
  }
}

async function update(id, data) {
  try {
    const { data: updated, error } = await supabase
      .from('volunteer_activities')
      .update(data)
      .eq('id', id)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return updated
  } catch (err) {
    throw new Error(err.message)
  }
}

async function toggle(id) {
  try {
    const { data: current, error: fetchError } = await supabase
      .from('volunteer_activities')
      .select('is_open, title')
      .eq('id', id)
      .single()
    if (fetchError) throw new Error(fetchError.message)

    const newValue = !current.is_open
    const { data, error } = await supabase
      .from('volunteer_activities')
      .update({ is_open: newValue })
      .eq('id', id)
      .select()
      .single()
    if (error) throw new Error(error.message)

    if (newValue) {
      notificationsService
        .broadcastNotification({
          message: `${current.title} is now open for volunteers!`,
          type: 'volunteer_open',
        })
        .catch(() => {})
    }

    return { id, is_open: newValue, spots_left: data.spots_left }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function remove(id) {
  try {
    const { error } = await supabase.from('volunteer_activities').delete().eq('id', id)
    if (error) throw new Error(error.message)
    return { deleted: true, id }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = { getAll, getById, create, update, toggle, remove }
