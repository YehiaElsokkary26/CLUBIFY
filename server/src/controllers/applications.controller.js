const applicationsService = require('../services/applications.service')
const { sendSuccess } = require('../utils/response')

const applyToClub = async (req, res, next) => {
  try { return sendSuccess(res, await applicationsService.applyToClub(req.user.id, req.params.clubId, req.body), 201) } catch (err) { next(err) }
}
const applyToVolunteer = async (req, res, next) => {
  try { return sendSuccess(res, await applicationsService.applyToVolunteer(req.user.id, req.params.activityId, req.body), 201) } catch (err) { next(err) }
}
const getMyApplications = async (req, res, next) => {
  try { return sendSuccess(res, await applicationsService.getMyApplications(req.user.id)) } catch (err) { next(err) }
}
const getClubApplications = async (req, res, next) => {
  try { return sendSuccess(res, await applicationsService.getClubApplications(req.params.clubId)) } catch (err) { next(err) }
}
const getVolunteerApplications = async (req, res, next) => {
  try { return sendSuccess(res, await applicationsService.getVolunteerApplications(req.params.activityId)) } catch (err) { next(err) }
}
const updateStatus = async (req, res, next) => {
  try { return sendSuccess(res, await applicationsService.updateStatus(req.params.id, req.body.status)) } catch (err) { next(err) }
}
const selectSlot = async (req, res, next) => {
  try { return sendSuccess(res, await applicationsService.selectSlot(req.params.id, req.user.id, req.body.slotId)) } catch (err) { next(err) }
}

module.exports = {
  applyToClub, applyToVolunteer, getMyApplications, selectSlot,
  getClubApplications, getVolunteerApplications, updateStatus,
}
