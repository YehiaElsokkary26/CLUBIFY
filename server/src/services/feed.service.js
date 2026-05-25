const { mockAnnouncement } = require('../utils/mockData')

async function getFeed({ filter = 'all', page = 1, limit = 10 } = {}) {
  // TODO: replace with Supabase query
  const items = [mockAnnouncement]
  return {
    items,
    total: items.length,
    page: Number(page),
    hasMore: false,
  }
}

module.exports = { getFeed }
