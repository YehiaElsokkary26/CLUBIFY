const multer = require('multer')
const { sendError } = require('../utils/response')
const { NODE_ENV } = require('../config/env')

module.exports = function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return sendError(res, 'File too large. Maximum size is 5MB.', 413)
  }

  const status = err.status || err.statusCode || 500
  const message = err.message || 'Internal server error'

  const body = { success: false, message }
  if (NODE_ENV === 'development') body.stack = err.stack

  return res.status(status).json(body)
}
