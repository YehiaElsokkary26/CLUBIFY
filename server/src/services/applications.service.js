const { mockApplication } = require('../utils/mockData')

async function applyToClub(userId, clubId, data) {
  // TODO: replace with Supabase query
  return { ...mockApplication, userId, clubId, ...data }
}

async function applyToVolunteer(userId, activityId, data) {
  // TODO: replace with Supabase query
  return { id: `app-${Date.now()}`, userId, activityId, type: 'volunteer', status: 'pending', ...data }
}

async function getMyApplications(userId) {
  // TODO: replace with Supabase query
  return [mockApplication]
}

async function getClubApplications(clubId) {
  // TODO: replace with Supabase query
  return [mockApplication]
}

async function getVolunteerApplications(activityId) {
  // TODO: replace with Supabase query
  return [mockApplication]
}

async function updateStatus(id, status) {
  // TODO: replace with Supabase query
  return { ...mockApplication, id, status }
}

module.exports = {
  applyToClub, applyToVolunteer, getMyApplications,
  getClubApplications, getVolunteerApplications, updateStatus,
}
