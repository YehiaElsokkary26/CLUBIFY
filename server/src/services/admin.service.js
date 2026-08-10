const supabase = require('../config/supabase')

async function getUsers({ search, role, page = 1, limit = 20 } = {}) {
  try {
    const pageNum = Number(page)
    const limitNum = Number(limit)
    const from = (pageNum - 1) * limitNum
    let query = supabase.from('profiles').select('*', { count: 'exact' })
    if (search) query = query.ilike('name', `%${search}%`)
    if (role) query = query.eq('role', role)
    query = query.range(from, from + limitNum - 1)
    const { data, error, count } = await query
    if (error) throw new Error(error.message)
    return { users: data, total: count, page: pageNum }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function updateUserRole(userId, role) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return { id: userId, role: data.role }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function createClub(clubData) {
  try {
    const slug = clubData.name
      ? clubData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : `club-${Date.now()}`
    const { data, error } = await supabase
      .from('clubs')
      .insert({ slug, ...clubData })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function deleteClub(clubId) {
  try {
    const { error } = await supabase.from('clubs').delete().eq('id', clubId)
    if (error) throw new Error(error.message)
    return { deleted: true, id: clubId }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getStats() {
  try {
    const [clubsRes, usersRes, recruitingRes, volunteerRes, pendingRes] = await Promise.all([
      supabase.from('clubs').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('clubs').select('*', { count: 'exact', head: true }).eq('is_recruiting', true),
      supabase.from('volunteer_activities').select('*', { count: 'exact', head: true }).eq('is_open', true),
      supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ])

    const { data: allApps } = await supabase
      .from('applications')
      .select('status, applied_at')

    const now = new Date()
    const months = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const label = d.toLocaleString('default', { month: 'short' })
      const monthApps = (allApps || []).filter((a) => {
        const appDate = new Date(a.applied_at)
        return (
          appDate.getMonth() === d.getMonth() &&
          appDate.getFullYear() === d.getFullYear()
        )
      })
      months.push({
        month: label,
        applications: monthApps.length,
        accepted: monthApps.filter((a) => a.status === 'accepted').length,
      })
    }

    return {
      totalClubs: clubsRes.count || 0,
      totalUsers: usersRes.count || 0,
      activeRecruitments: recruitingRes.count || 0,
      openVolunteerActivities: volunteerRes.count || 0,
      pendingApplications: pendingRes.count || 0,
      monthlyActivity: months,
      funnel: {
        applied: allApps?.length || 0,
        accepted: allApps?.filter((a) => a.status === 'accepted').length || 0,
        rejected: allApps?.filter((a) => a.status === 'rejected').length || 0,
      },
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getUserWarnings(userId) {
  try {
    const { data, error } = await supabase
      .from('warnings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return { warnings: data }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function addWarning(userId, { reason, issuedBy } = {}) {
  try {
    const { data, error } = await supabase
      .from('warnings')
      .insert({ user_id: userId, reason, issued_by: issuedBy })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function deleteWarning(userId, warningId) {
  try {
    const { error } = await supabase.from('warnings').delete().eq('id', warningId)
    if (error) throw new Error(error.message)
    return { deleted: true, warningId }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  getUsers, updateUserRole, createClub, deleteClub,
  getStats, getUserWarnings, addWarning, deleteWarning,
}
