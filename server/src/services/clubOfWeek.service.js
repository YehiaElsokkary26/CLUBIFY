const supabase = require('../config/supabase')

async function calculateClubOfWeek() {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const { data: clubs } = await supabase.from('clubs').select('id, name')
    if (!clubs || clubs.length === 0) return null

    const scores = await Promise.all(
      clubs.map(async (club) => {
        const [eventsRes, newslettersRes, membersRes, highlightsRes] = await Promise.all([
          supabase
            .from('events')
            .select('id', { count: 'exact', head: true })
            .eq('club_id', club.id)
            .gte('created_at', sevenDaysAgo),
          supabase
            .from('newsletters')
            .select('id', { count: 'exact', head: true })
            .eq('club_id', club.id)
            .gte('created_at', sevenDaysAgo),
          supabase
            .from('club_members')
            .select('id', { count: 'exact', head: true })
            .eq('club_id', club.id)
            .gte('joined_at', sevenDaysAgo),
          supabase
            .from('club_highlights')
            .select('id', { count: 'exact', head: true })
            .eq('club_id', club.id)
            .gte('created_at', sevenDaysAgo),
        ])

        const score =
          (eventsRes.count || 0) * 3 +
          (newslettersRes.count || 0) * 2 +
          (membersRes.count || 0) * 1 +
          (highlightsRes.count || 0) * 1

        return {
          clubId: club.id,
          clubName: club.name,
          score,
          eventsCount: eventsRes.count || 0,
          newslettersCount: newslettersRes.count || 0,
          membersCount: membersRes.count || 0,
        }
      })
    )

    scores.sort((a, b) => b.score - a.score)
    const winner = scores[0]

    const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const weekEnd = new Date().toISOString().split('T')[0]

    await supabase.from('club_scores').update({ is_featured: false }).eq('is_featured', true)

    await supabase.from('club_scores').insert({
      club_id: winner.clubId,
      score: winner.score,
      events_count: winner.eventsCount,
      newsletters_count: winner.newslettersCount,
      members_count: winner.membersCount,
      is_featured: true,
      week_start: weekStart,
      week_end: weekEnd,
    })

    console.log(`Club of the week: ${winner.clubName} (score: ${winner.score})`)
    return winner
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = { calculateClubOfWeek }
