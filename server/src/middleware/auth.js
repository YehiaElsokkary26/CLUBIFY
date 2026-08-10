const { verifyAccessToken } = require('../utils/jwt')
const { sendError } = require('../utils/response')

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return sendError(res, 'No token provided', 401)
  }
  const token = header.split(' ')[1]
  try {
    req.user = verifyAccessToken(token)
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, 'Token expired', 403)
    }
    return sendError(res, 'Invalid token', 401)
  }
}
