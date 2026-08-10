const { createClient } = require('@supabase/supabase-js')
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = require('./env')

// Usage: const supabase = require('./config/supabase')
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

console.log('Supabase client initialized')

module.exports = supabase
