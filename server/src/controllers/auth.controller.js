const authService = require('../services/auth.service')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt')
const { sendSuccess, sendError } = require('../utils/response')

const COOKIE_OPTS = { httpOnly: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body)
    const refreshToken = signRefreshToken({ id: result.user.id, role: result.user.role })
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS)
    return sendSuccess(res, result, 201)
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body)
    const refreshToken = signRefreshToken({ id: result.user.id, role: result.user.role })
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS)
    return sendSuccess(res, result)
  } catch (err) {
    next(err)
  }
}

async function logout(req, res) {
  res.clearCookie('refreshToken')
  return sendSuccess(res, { message: 'Logged out' })
}

async function refresh(req, res) {
  const token = req.cookies.refreshToken
  if (!token) return sendError(res, 'No refresh token', 401)
  try {
    const decoded = verifyRefreshToken(token)
    const accessToken = signAccessToken({ id: decoded.id, role: decoded.role })
    return sendSuccess(res, { accessToken })
  } catch (err) {
    return sendError(res, 'Invalid or expired refresh token', 403)
  }
}

async function me(req, res) {
  return sendSuccess(res, { user: req.user })
}

module.exports = { register, login, logout, refresh, me }
