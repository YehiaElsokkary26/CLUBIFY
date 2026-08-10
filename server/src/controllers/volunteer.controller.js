const volunteerService = require('../services/volunteer.service')
const { sendSuccess } = require('../utils/response')

const getAll = async (req, res, next) => {
  try { return sendSuccess(res, await volunteerService.getAll(req.query)) } catch (err) { next(err) }
}
const getById = async (req, res, next) => {
  try { return sendSuccess(res, await volunteerService.getById(req.params.id)) } catch (err) { next(err) }
}
const create = async (req, res, next) => {
  try { return sendSuccess(res, await volunteerService.create(req.body), 201) } catch (err) { next(err) }
}
const update = async (req, res, next) => {
  try { return sendSuccess(res, await volunteerService.update(req.params.id, req.body)) } catch (err) { next(err) }
}
const toggle = async (req, res, next) => {
  try { return sendSuccess(res, await volunteerService.toggle(req.params.id)) } catch (err) { next(err) }
}
const remove = async (req, res, next) => {
  try { return sendSuccess(res, await volunteerService.remove(req.params.id)) } catch (err) { next(err) }
}

module.exports = { getAll, getById, create, update, toggle, remove }
