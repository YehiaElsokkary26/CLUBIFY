const clubsService = require('../services/clubs.service')
const { sendSuccess } = require('../utils/response')

const getAll = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.getAll()) } catch (err) { next(err) }
}
const getBySlug = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.getBySlug(req.params.slug)) } catch (err) { next(err) }
}
const update = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.update(req.params.id, req.body)) } catch (err) { next(err) }
}
const setRecruiting = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.setRecruiting(req.params.id, req.body.isRecruiting)) } catch (err) { next(err) }
}
const updateSpotlight = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.updateSpotlight(req.params.id, req.body)) } catch (err) { next(err) }
}
const addEvent = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.addEvent(req.params.id, req.body), 201) } catch (err) { next(err) }
}
const updateEvent = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.updateEvent(req.params.id, req.params.eventId, req.body)) } catch (err) { next(err) }
}
const deleteEvent = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.deleteEvent(req.params.id, req.params.eventId)) } catch (err) { next(err) }
}
const addAnnouncement = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.addAnnouncement(req.params.id, req.body), 201) } catch (err) { next(err) }
}
const updateSocialLinks = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.updateSocialLinks(req.params.id, req.body)) } catch (err) { next(err) }
}
const getSlots = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.getSlots(req.params.id)) } catch (err) { next(err) }
}
const addSlot = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.addSlot(req.params.id, req.body), 201) } catch (err) { next(err) }
}
const deleteSlot = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.deleteSlot(req.params.id, req.params.slotId)) } catch (err) { next(err) }
}
const getMembers = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.getMembers(req.params.id)) } catch (err) { next(err) }
}
const removeMember = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.removeMember(req.params.id, req.params.userId)) } catch (err) { next(err) }
}
const getCommittees = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.getCommittees(req.params.id)) } catch (err) { next(err) }
}
const addCommittee = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.addCommittee(req.params.id, req.body), 201) } catch (err) { next(err) }
}
const updateCommittee = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.updateCommittee(req.params.id, req.params.committeeId, req.body)) } catch (err) { next(err) }
}
const deleteCommittee = async (req, res, next) => {
  try { return sendSuccess(res, await clubsService.deleteCommittee(req.params.id, req.params.committeeId)) } catch (err) { next(err) }
}

module.exports = {
  getAll, getBySlug, update, setRecruiting, updateSpotlight,
  addEvent, updateEvent, deleteEvent, addAnnouncement, updateSocialLinks,
  getSlots, addSlot, deleteSlot, getMembers, removeMember,
  getCommittees, addCommittee, updateCommittee, deleteCommittee,
}
