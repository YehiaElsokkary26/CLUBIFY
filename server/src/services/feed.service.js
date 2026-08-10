const supabase = require('../config/supabase')

async function getFeed({ filter = 'all', page = 1, limit = 20, userId } = {}) {
  try {
    const pageNum = Number(page)
    const limitNum = Number(limit)

    let announcements = []
    let events = []

    if (filter === 'my_clubs' && userId) {
      const { data: memberships } = await supabase
        .from('club_members')
        .select('club_id')
        .eq('user_id', userId)
      const clubIds = (memberships || []).map((m) => m.club_id)

      if (clubIds.length > 0) {
        const [annRes, evRes] = await Promise.all([
          supabase
            .from('announcements')
            .select('*')
            .in('club_id', clubIds)
            .order('created_at', { ascending: false }),
          supabase
            .from('events')
            .select('*, clubs(name)')
            .in('club_id', clubIds)
            .order('date', { ascending: true }),
        ])
        announcements = annRes.data || []
        events = evRes.data || []
      }
    } else if (filter === 'announcements') {
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
      announcements = data || []
    } else {
      const [annRes, evRes] = await Promise.all([
        supabase
          .from('announcements')
          .select('*')
          .eq('audience', 'all')
          .order('created_at', { ascending: false }),
        supabase
          .from('events')
          .select('*, clubs(name)')
          .gte('date', new Date().toISOString())
          .order('date', { ascending: true })
          .limit(10),
      ])
      announcements = annRes.data || []
      events = evRes.data || []
    }

    const announcementItems = announcements.map((a) => ({
      ...a,
      type: 'announcement',
      date: a.created_at,
    }))
    const eventItems = events.map((e) => ({
      ...e,
      type: 'event',
      date: e.date,
      clubName: e.clubs?.name,
    }))

    const allItems = [...announcementItems, ...eventItems].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )

    const start = (pageNum - 1) * limitNum
    const paginated = allItems.slice(start, start + limitNum)

    return {
      items: paginated,
      total: allItems.length,
      page: pageNum,
      hasMore: start + limitNum < allItems.length,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = { getFeed }
