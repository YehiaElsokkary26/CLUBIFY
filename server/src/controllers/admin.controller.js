const adminService = require('../services/admin.service')
const { sendSuccess } = require('../utils/response')

const getUsers = async (req, res, next) => {
  try { return sendSuccess(res, await adminService.getUsers()) } catch (err) { next(err) }
}
const updateUserRole = async (req, res, next) => {
  try { return sendSuccess(res, await adminService.updateUserRole(req.params.id, req.body.role)) } catch (err) { next(err) }
}
const createClub = async (req, res, next) => {
  try { return sendSuccess(res, await adminService.createClub(req.body), 201) } catch (err) { next(err) }
}
const deleteClub = async (req, res, next) => {
  try { return sendSuccess(res, await adminService.deleteClub(req.params.id)) } catch (err) { next(err) }
}
const getStats = async (req, res, next) => {
  try { return sendSuccess(res, await adminService.getStats()) } catch (err) { next(err) }
}
const getUserWarnings = async (req, res, next) => {
  try { return sendSuccess(res, await adminService.getUserWarnings(req.params.id)) } catch (err) { next(err) }
}
const addWarning = async (req, res, next) => {
  try { return sendSuccess(res, await adminService.addWarning(req.params.id, req.body), 201) } catch (err) { next(err) }
}
const deleteWarning = async (req, res, next) => {
  try { return sendSuccess(res, await adminService.deleteWarning(req.params.id, req.params.warningId)) } catch (err) { next(err) }
}

module.exports = {
  getUsers, updateUserRole, createClub, deleteClub,
  getStats, getUserWarnings, addWarning, deleteWarning,
}
