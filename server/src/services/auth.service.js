const { mockUser } = require('../utils/mockData')

async function register(data) {
  // TODO: replace with Supabase query
  return { user: mockUser, accessToken: 'stub_token' }
}

async function login(data) {
  // TODO: replace with Supabase query
  return { user: mockUser, accessToken: 'stub_token' }
}

module.exports = { register, login }
