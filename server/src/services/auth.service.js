const supabase = require('../config/supabase')
const { signAccessToken } = require('../utils/jwt')

const GUC_EMAIL_RE = /@guc\.edu\.eg$|@student\.guc\.edu\.eg$/

async function register({ name, email, password, studentId, faculty, year }) {
  try {
    if (!GUC_EMAIL_RE.test(email)) {
      const err = new Error('Only GUC email addresses are allowed')
      err.statusCode = 400
      throw err
    }

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, student_id: studentId, faculty, year },
    })
    if (authError) throw new Error(authError.message)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()
    if (profileError) throw new Error(profileError.message)

    const accessToken = signAccessToken({ id: profile.id, role: profile.role })
    return { user: profile, accessToken }
  } catch (err) {
    throw new Error(err.message)
  }
}

async function login({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      const authErr = new Error('Invalid email or password')
      authErr.statusCode = 401
      throw authErr
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()
    if (profileError) throw new Error(profileError.message)

    const accessToken = signAccessToken({ id: profile.id, role: profile.role })
    return { user: profile, accessToken }
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = { register, login }
