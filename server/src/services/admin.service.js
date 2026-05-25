const { mockUser, mockStats, mockWarning, mockClub } = require('../utils/mockData')

async function getUsers() {
  // TODO: replace with Supabase query
  return [mockUser]
}

async function updateUserRole(id, role) {
  // TODO: replace with Supabase query
  return { ...mockUser, id, role }
}

async function createClub(data) {
  // TODO: replace with Supabase query
  return { id: `c-${Date.now()}`, ...data }
}

async function deleteClub(id) {
  // TODO: replace with Supabase query
  return { deleted: true }
}

async function getStats() {
  // TODO: replace with Supabase query
  return mockStats
}

async function getUserWarnings(userId) {
  // TODO: replace with Supabase query
  return [mockWarning]
}

async function addWarning(userId, data) {
  // TODO: replace with Supabase query
  return { id: `warn-${Date.now()}`, userId, ...data }
}

async function deleteWarning(userId, warningId) {
  // TODO: replace with Supabase query
  return { deleted: true }
}

module.exports = {
  getUsers, updateUserRole, createClub, deleteClub,
  getStats, getUserWarnings, addWarning, deleteWarning,
}
