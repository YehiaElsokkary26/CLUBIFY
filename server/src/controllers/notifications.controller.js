const notificationsService = require('../services/notifications.service')
const { sendSuccess } = require('../utils/response')

const getAll = async (req, res, next) => {
  try { return sendSuccess(res, await notificationsService.getByUser(req.user.id)) } catch (err) { next(err) }
}
const markRead = async (req, res, next) => {
  try { return sendSuccess(res, await notificationsService.markRead(req.params.id, req.user.id)) } catch (err) { next(err) }
}
const markAllRead = async (req, res, next) => {
  try { return sendSuccess(res, await notificationsService.markAllRead(req.user.id)) } catch (err) { next(err) }
}

module.exports = { getAll, markRead, markAllRead }
