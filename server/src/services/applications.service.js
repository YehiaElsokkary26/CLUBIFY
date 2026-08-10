const supabase = require('../config/supabase')
const { createNotification } = require('./notifications.service')

async function applyToClub(userId, clubId, { committeeId, motivationNote } = {}) {
  try {
    const { data: club, error: clubErr } = await supabase
      .from('clubs')
      .select('name, is_recruiting')
      .eq('id', clubId)
      .single()
    if (clubErr || !club) throw new Error('Club not found')
    if (!club.is_recruiting) {
      const err = new Error('RECRUITMENT_CLOSED')
      err.statusCode = 409
      throw err
    }

    const { data: committee, error: commErr } = await supabase
      .from('committees')
      .select('name')
      .eq('id', committeeId)
      .single()
    if (commErr || !committee) throw new Error('Committee not found')

    const { data: existing } = await supabase
      .from('applications')
      .select('id')
      .eq('user_id', userId)
      .eq('entity_id', clubId)
      .eq('entity_type', 'club')
    if (existing && existing.length > 0) {
      const err = new Error('ALREADY_APPLIED')
      err.statusCode = 409
      throw err
    }

    const { data: application, error: appErr } = await supabase
      .from('applications')
      .insert({
        user_id: userId,
        entity_id: clubId,
        entity_type: 'club',
        entity_name: club.name || null,
        committee: committee.name,
        motivation_note: motivationNote,
        status: 'pending',
      })
      .select()
      .single()
    if (appErr) throw new Error(appErr.message)

    createNotification({
      userId,
      message: `Your application to ${club.name || 'the club'} has been submitted successfully!`,
      type: 'application_update',
      clubId,
    }).catch(() => {})

    return application
  } catch (err) {
    if (err.statusCode) throw err
    throw new Error(err.message)
  }
}

async function selectSlot(applicationId, userId, slotId) {
  try {
    const { data: application, error: appErr } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single()
    if (appErr || !application) throw new Error('Application not found')
    if (application.user_id !== userId) {
      const err = new Error('Not your application')
      err.statusCode = 403
      throw err
    }
    if (application.entity_type !== 'club') {
      const err = new Error('Slot selection only applies to club applications')
      err.statusCode = 400
      throw err
    }

    const { data: slot, error: slotErr } = await supabase
      .from('interview_slots')
      .select('*')
      .eq('id', slotId)
      .single()
    if (slotErr || !slot) throw new Error('Slot not found')
    if (slot.club_id !== application.entity_id) {
      const err = new Error('Slot does not belong to this club')
      err.statusCode = 400
      throw err
    }
    if (slot.is_booked) {
      const err = new Error('SLOT_TAKEN')
      err.statusCode = 409
      throw err
    }

    const { error: bookErr } = await supabase
      .from('interview_slots')
      .update({ is_booked: true, booked_by: userId })
      .eq('id', slotId)
    if (bookErr) throw new Error(bookErr.message)

    const { data: updatedApplication, error: updateErr } = await supabase
      .from('applications')
      .update({ interview_slot: slot.datetime })
      .eq('id', applicationId)
      .select()
      .single()
    if (updateErr) throw new Error(updateErr.message)

    createNotification({
      userId,
      message: `Your interview slot for ${application.entity_name || 'your application'} is confirmed for ${slot.datetime}.`,
      type: 'application_update',
      clubId: application.entity_id,
    }).catch(() => {})

    return { ...updatedApplication, slot: { ...slot, is_booked: true, booked_by: userId } }
  } catch (err) {
    if (err.statusCode) throw err
    throw new Error(err.message)
  }
}

async function applyToVolunteer(userId, activityId, { motivationNote } = {}) {
  try {
    const { data: existing } = await supabase
      .from('applications')
      .select('id')
      .eq('user_id', userId)
      .eq('entity_id', activityId)
      .eq('entity_type', 'volunteer')
    if (existing && existing.length > 0) {
      const err = new Error('ALREADY_APPLIED')
      err.statusCode = 409
      throw err
    }

    const { data: activity } = await supabase
      .from('volunteer_activities')
      .select('title')
      .eq('id', activityId)
      .single()

    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        user_id: userId,
        entity_id: activityId,
        entity_type: 'volunteer',
        entity_name: activity?.title || null,
        motivation_note: motivationNote,
        status: 'pending',
      })
      .select()
      .single()
    if (error) throw new Error(error.message)

    createNotification({
      userId,
      message: `You have signed up for ${activity?.title || 'a volunteer activity'}!`,
      type: 'application_update',
    }).catch(() => {})

    return application
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getMyApplications(userId) {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .order('applied_at', { ascending: false })
    if (error) throw new Error(error.message)
    return { applications: data, total: data.length }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getClubApplications(clubId, status) {
  try {
    let query = supabase
      .from('applications')
      .select('*, profiles(name, avatar_url)')
      .eq('entity_id', clubId)
      .eq('entity_type', 'club')
    if (status) query = query.eq('status', status)
    const { data, error } = await query
    if (error) throw new Error(error.message)
    return { applications: data, total: data.length }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getVolunteerApplications(activityId, status) {
  try {
    let query = supabase
      .from('applications')
      .select('*, profiles(name, avatar_url)')
      .eq('entity_id', activityId)
      .eq('entity_type', 'volunteer')
    if (status) query = query.eq('status', status)
    const { data, error } = await query
    if (error) throw new Error(error.message)
    return { applications: data, total: data.length }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function updateStatus(applicationId, status) {
  try {
    const { data: app, error } = await supabase
      .from('applications')
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq('id', applicationId)
      .select()
      .single()
    if (error) throw new Error(error.message)

    if (status === 'accepted' && app.entity_type === 'club') {
      await supabase
        .from('club_members')
        .upsert(
          { club_id: app.entity_id, user_id: app.user_id },
          { onConflict: 'club_id,user_id', ignoreDuplicates: true }
        )
      const { data: club } = await supabase
        .from('clubs')
        .select('member_count')
        .eq('id', app.entity_id)
        .single()
      if (club) {
        await supabase
          .from('clubs')
          .update({ member_count: (club.member_count || 0) + 1 })
          .eq('id', app.entity_id)
      }
    }

    const message =
      status === 'accepted'
        ? `Your application to ${app.entity_name || 'the club'} has been accepted! Welcome aboard!`
        : `Your application to ${app.entity_name || 'the club'} was not successful this time.`

    createNotification({
      userId: app.user_id,
      message,
      type: 'application_update',
      clubId: app.entity_type === 'club' ? app.entity_id : null,
    }).catch(() => {})

    return app
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  applyToClub, applyToVolunteer, getMyApplications, selectSlot,
  getClubApplications, getVolunteerApplications, updateStatus,
}
