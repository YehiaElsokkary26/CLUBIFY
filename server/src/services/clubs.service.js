const supabase = require('../config/supabase')

async function getAll({ category, search, recruiting } = {}) {
  try {
    let query = supabase.from('clubs').select('*')
    if (category) query = query.eq('category', category)
    if (search) query = query.ilike('name', `%${search}%`)
    if (recruiting === 'true' || recruiting === true) query = query.eq('is_recruiting', true)
    const { data, error } = await query
    if (error) throw new Error(error.message)
    return { clubs: data, total: data.length }
  } catch (err) {
    throw new Error(err.message)
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function getBySlug(idOrSlug) {
  try {
    const lookupField = UUID_RE.test(idOrSlug) ? 'id' : 'slug'
    const { data: club, error } = await supabase.from('clubs').select('*').eq(lookupField, idOrSlug).single()
    if (error) throw new Error('Club not found')

    const [{ data: committees }, { data: staff }, { data: events }] = await Promise.all([
      supabase.from('committees').select('*').eq('club_id', club.id),
      supabase.from('club_staff').select('*').eq('club_id', club.id).order('display_order'),
      supabase.from('events').select('*').eq('club_id', club.id),
    ])

    return {
      ...club,
      committees: committees || [],
      staff: staff || [],
      events: events || [],
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function update(id, data) {
  try {
    const { data: updated, error } = await supabase
      .from('clubs')
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

async function setRecruiting(id, isRecruiting) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .update({ is_recruiting: isRecruiting })
      .eq('id', id)
      .select('id, is_recruiting')
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function updateSpotlight(id, spotlightData) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .update({ spotlight: spotlightData })
      .eq('id', id)
      .select('id, spotlight')
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function addEvent(clubId, eventData) {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert({ club_id: clubId, ...eventData })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function updateEvent(clubId, eventId, eventData) {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', eventId)
      .eq('club_id', clubId)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function deleteEvent(clubId, eventId) {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId)
      .eq('club_id', clubId)
    if (error) throw new Error(error.message)
    return { deleted: true, eventId }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function addAnnouncement(clubId, { title, body, audience, createdBy }) {
  try {
    const { data: club } = await supabase.from('clubs').select('name').eq('id', clubId).single()
    const { data, error } = await supabase
      .from('announcements')
      .insert({
        club_id: clubId,
        club_name: club?.name || null,
        title,
        body,
        audience,
        created_by: createdBy,
      })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function updateSocialLinks(clubId, socialLinks) {
  try {
    const { data, error } = await supabase
      .from('clubs')
      .update({ social_links: socialLinks })
      .eq('id', clubId)
      .select('id, social_links')
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getSlots(clubId, availableOnly) {
  try {
    let query = supabase.from('interview_slots').select('*').eq('club_id', clubId)
    if (availableOnly) query = query.eq('is_booked', false)
    const { data, error } = await query
    if (error) throw new Error(error.message)
    return { slots: data }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function addSlot(clubId, { datetimes = [] } = {}) {
  try {
    const rows = datetimes.map((dt) => ({ club_id: clubId, datetime: dt }))
    const { data, error } = await supabase.from('interview_slots').insert(rows).select()
    if (error) throw new Error(error.message)
    return { created: data.length, slots: data }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function deleteSlot(clubId, slotId) {
  try {
    const { data: slot, error: fetchError } = await supabase
      .from('interview_slots')
      .select('is_booked')
      .eq('id', slotId)
      .single()
    if (fetchError) throw new Error('Slot not found')
    if (slot.is_booked) {
      const err = new Error('SLOT_BOOKED')
      err.statusCode = 409
      throw err
    }
    const { error } = await supabase
      .from('interview_slots')
      .delete()
      .eq('id', slotId)
      .eq('club_id', clubId)
    if (error) throw new Error(error.message)
    return { deleted: true, slotId }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getMembers(clubId) {
  try {
    const { data, error } = await supabase
      .from('club_members')
      .select('*, profiles(name, avatar_url)')
      .eq('club_id', clubId)
    if (error) throw new Error(error.message)
    return { members: data }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function removeMember(clubId, userId) {
  try {
    const { data: club } = await supabase
      .from('clubs')
      .select('member_count')
      .eq('id', clubId)
      .single()
    await supabase.from('club_members').delete().eq('club_id', clubId).eq('user_id', userId)
    await supabase
      .from('clubs')
      .update({ member_count: Math.max(0, (club?.member_count || 0) - 1) })
      .eq('id', clubId)
    return { removed: true, userId }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getCommittees(clubId) {
  try {
    const { data, error } = await supabase.from('committees').select('*').eq('club_id', clubId)
    if (error) throw new Error(error.message)
    return { committees: data }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function addCommittee(clubId, { name, description }) {
  try {
    const { data, error } = await supabase
      .from('committees')
      .insert({ club_id: clubId, name, description })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

async function updateCommittee(clubId, committeeId, data) {
  try {
    const { data: updated, error } = await supabase
      .from('committees')
      .update(data)
      .eq('id', committeeId)
      .eq('club_id', clubId)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return updated
  } catch (err) {
    throw new Error(err.message)
  }
}

async function deleteCommittee(clubId, committeeId) {
  try {
    const { data: apps } = await supabase
      .from('applications')
      .select('id')
      .eq('entity_id', clubId)
      .eq('status', 'pending')
    if (apps && apps.length > 0) {
      const err = new Error('Cannot delete committee with pending applications')
      err.statusCode = 409
      throw err
    }
    const { error } = await supabase.from('committees').delete().eq('id', committeeId)
    if (error) throw new Error(error.message)
    return { deleted: true, committeeId }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  getAll, getBySlug, update, setRecruiting, updateSpotlight,
  addEvent, updateEvent, deleteEvent, addAnnouncement, updateSocialLinks,
  getSlots, addSlot, deleteSlot, getMembers, removeMember,
  getCommittees, addCommittee, updateCommittee, deleteCommittee,
}
