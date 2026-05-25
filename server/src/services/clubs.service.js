const { mockClub, mockSlot, mockMember } = require('../utils/mockData')

async function getAll() {
  // TODO: replace with Supabase query
  return { clubs: [mockClub], total: 18 }
}

async function getBySlug(slug) {
  // TODO: replace with Supabase query
  return mockClub
}

async function update(id, data) {
  // TODO: replace with Supabase query
  return { ...mockClub, ...data }
}

async function setRecruiting(id, isRecruiting) {
  // TODO: replace with Supabase query
  return { ...mockClub, isRecruiting }
}

async function updateSpotlight(id, data) {
  // TODO: replace with Supabase query
  return { ...mockClub, spotlightContent: data }
}

async function addEvent(clubId, eventData) {
  // TODO: replace with Supabase query
  return { id: `ev-${Date.now()}`, clubId, ...eventData }
}

async function updateEvent(clubId, eventId, data) {
  // TODO: replace with Supabase query
  return { id: eventId, clubId, ...data }
}

async function deleteEvent(clubId, eventId) {
  // TODO: replace with Supabase query
  return { deleted: true }
}

async function addAnnouncement(clubId, data) {
  // TODO: replace with Supabase query
  return { id: `ann-${Date.now()}`, clubId, ...data }
}

async function updateSocialLinks(clubId, links) {
  // TODO: replace with Supabase query
  return { clubId, ...links }
}

async function getSlots(clubId) {
  // TODO: replace with Supabase query
  return [mockSlot]
}

async function addSlot(clubId, data) {
  // TODO: replace with Supabase query
  return { id: `slot-${Date.now()}`, clubId, ...data }
}

async function deleteSlot(clubId, slotId) {
  // TODO: replace with Supabase query
  return { deleted: true }
}

async function getMembers(clubId) {
  // TODO: replace with Supabase query
  return [mockMember]
}

async function removeMember(clubId, userId) {
  // TODO: replace with Supabase query
  return { deleted: true }
}

async function getCommittees(clubId) {
  // TODO: replace with Supabase query
  return mockClub.committees
}

async function addCommittee(clubId, data) {
  // TODO: replace with Supabase query
  return { id: `com-${Date.now()}`, clubId, ...data }
}

async function updateCommittee(clubId, committeeId, data) {
  // TODO: replace with Supabase query
  return { id: committeeId, clubId, ...data }
}

async function deleteCommittee(clubId, committeeId) {
  // TODO: replace with Supabase query
  return { deleted: true }
}

module.exports = {
  getAll, getBySlug, update, setRecruiting, updateSpotlight,
  addEvent, updateEvent, deleteEvent, addAnnouncement, updateSocialLinks,
  getSlots, addSlot, deleteSlot, getMembers, removeMember,
  getCommittees, addCommittee, updateCommittee, deleteCommittee,
}
