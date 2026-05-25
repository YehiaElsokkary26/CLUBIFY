const { sendError } = require('../utils/response')

module.exports = function notFound(req, res) {
  return sendError(res, 'Route not found', 404)
}
