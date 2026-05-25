const { mockVolunteerActivity } = require('../utils/mockData')

async function getAll({ search, open, page = 1, limit = 10 } = {}) {
  // TODO: replace with Supabase query
  return { activities: [mockVolunteerActivity], total: 1, page: Number(page), hasMore: false }
}

async function getById(id) {
  // TODO: replace with Supabase query
  return mockVolunteerActivity
}

async function create(data) {
  // TODO: replace with Supabase query
  return { id: `va-${Date.now()}`, ...data }
}

async function update(id, data) {
  // TODO: replace with Supabase query
  return { ...mockVolunteerActivity, ...data }
}

async function toggle(id) {
  // TODO: replace with Supabase query
  return { ...mockVolunteerActivity, isOpen: !mockVolunteerActivity.isOpen }
}

async function remove(id) {
  // TODO: replace with Supabase query
  return { deleted: true }
}

module.exports = { getAll, getById, create, update, toggle, remove }
