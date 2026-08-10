const { sendError } = require('../utils/response')

function requireRole(...roles) {
  return function (req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 'Forbidden: insufficient permissions', 403)
    }
    next()
  }
}

module.exports = requireRole
