const supabase = require('../config/supabase')

async function getById(userId) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) throw new Error('User not found')

    const fields = ['name', 'student_id', 'faculty', 'year', 'avatar_url', 'bio']
    const filled = fields.filter((f) => profile[f]).length

    const [prefsResult, memberResult] = await Promise.all([
      supabase.from('user_preferences').select('onboarding_completed').eq('user_id', userId).single(),
      supabase.from('club_members').select('id').eq('user_id', userId).limit(1),
    ])

    const onboarding = prefsResult.data?.onboarding_completed ? 1 : 0
    const hasClub = memberResult.data?.length > 0 ? 1 : 0
    const score = Math.round(((filled + onboarding + hasClub) / 8) * 100)
    const missing = fields.filter((f) => !profile[f])

    return { ...profile, profile_completion: { score, missing } }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function update(userId, data) {
  try {
    const { data: updated, error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return updated
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getActivity(userId) {
  try {
    const [clubsResult, volunteerResult, warningsResult, eventsResult] = await Promise.all([
      supabase.from('club_members').select('clubs(name)').eq('user_id', userId),
      supabase
        .from('applications')
        .select('entity_name')
        .eq('user_id', userId)
        .eq('entity_type', 'volunteer')
        .eq('status', 'accepted'),
      supabase.from('warnings').select('*').eq('user_id', userId),
      supabase
        .from('events')
        .select('*, clubs(name)')
        .gte('date', new Date().toISOString())
        .order('date')
        .limit(3),
    ])

    return {
      clubsJoined: (clubsResult.data || []).map((c) => c.clubs?.name).filter(Boolean),
      volunteerHistory: (volunteerResult.data || []).map((a) => a.entity_name).filter(Boolean),
      warnings: warningsResult.data || [],
      upcomingActivities: eventsResult.data || [],
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function completeOnboarding(userId, { interests, activityLevel, goal } = {}) {
  try {
    await supabase
      .from('user_preferences')
      .upsert(
        { user_id: userId, onboarding_completed: true, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      )

    const categoryMap = {
      Technology: 'Technical / Engineering',
      Business: 'Events / Fashion',
      Sports: 'Sports / Health',
      Media: 'Media / Talks',
      Community: 'Charity / Volunteering',
      Arts: 'Gaming / Design',
      Academic: 'Debate / Politics',
      Volunteering: 'Charity / Teaching',
      tech: 'Technical / Engineering',
      arts: 'Gaming / Design',
      sports: 'Sports / Health',
      business: 'Events / Fashion',
      community: 'Charity / Volunteering',
    }
    const categories = (interests || []).map((i) => categoryMap[i]).filter(Boolean)

    const { data: recommendedClubs } =
      categories.length > 0
        ? await supabase.from('clubs').select('*').in('category', categories).limit(3)
        : await supabase.from('clubs').select('*').limit(3)

    return { completed: true, recommendedClubs: recommendedClubs || [] }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function addFavorite(userId, clubId) {
  try {
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('club_id', clubId)
      .single()

    if (existing) {
      await supabase.from('favorites').delete().eq('user_id', userId).eq('club_id', clubId)
      return { clubId, favorited: false }
    }

    await supabase.from('favorites').insert({ user_id: userId, club_id: clubId })
    return { clubId, favorited: true }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getFavorites(userId) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('clubs(*)')
      .eq('user_id', userId)
    if (error) throw new Error(error.message)
    return { favorites: (data || []).map((f) => f.clubs) }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getPreferences(userId) {
  try {
    const { data } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()
    return data || { notifications_enabled: true, language: 'en' }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function updatePreferences(userId, data) {
  try {
    const { data: updated, error } = await supabase
      .from('user_preferences')
      .upsert(
        { user_id: userId, ...data, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      )
      .select()
      .single()
    if (error) throw new Error(error.message)
    return updated
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  getById, update, getActivity, completeOnboarding,
  addFavorite, getFavorites, getPreferences, updatePreferences,
}
