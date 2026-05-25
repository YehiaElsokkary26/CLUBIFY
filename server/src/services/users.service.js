const { mockUser, mockPreferences } = require('../utils/mockData')

async function getById(id) {
  // TODO: replace with Supabase query
  return mockUser
}

async function update(id, data) {
  // TODO: replace with Supabase query
  return { ...mockUser, ...data }
}

async function getActivity(userId) {
  // TODO: replace with Supabase query
  return { events: [], clubs: [], applications: [] }
}

async function completeOnboarding(userId, data) {
  // TODO: replace with Supabase query
  return { ...mockUser, onboardingComplete: true, ...data }
}

async function addFavorite(userId, clubId) {
  // TODO: replace with Supabase query
  return { userId, clubId, added: true }
}

async function getFavorites(userId) {
  // TODO: replace with Supabase query
  return []
}

async function getPreferences(userId) {
  // TODO: replace with Supabase query
  return mockPreferences
}

async function updatePreferences(userId, data) {
  // TODO: replace with Supabase query
  return { ...mockPreferences, ...data }
}

module.exports = {
  getById, update, getActivity, completeOnboarding,
  addFavorite, getFavorites, getPreferences, updatePreferences,
}
