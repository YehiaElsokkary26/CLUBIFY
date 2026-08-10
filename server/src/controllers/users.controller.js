const usersService = require('../services/users.service')
const { sendSuccess } = require('../utils/response')

const getById = async (req, res, next) => {
  try { return sendSuccess(res, await usersService.getById(req.params.id)) } catch (err) { next(err) }
}
const update = async (req, res, next) => {
  try { return sendSuccess(res, await usersService.update(req.params.id, req.body)) } catch (err) { next(err) }
}
const getActivity = async (req, res, next) => {
  try { return sendSuccess(res, await usersService.getActivity(req.params.id)) } catch (err) { next(err) }
}
const completeOnboarding = async (req, res, next) => {
  try { return sendSuccess(res, await usersService.completeOnboarding(req.params.id, req.body)) } catch (err) { next(err) }
}
const addFavorite = async (req, res, next) => {
  try { return sendSuccess(res, await usersService.addFavorite(req.params.id, req.params.clubId), 201) } catch (err) { next(err) }
}
const getFavorites = async (req, res, next) => {
  try { return sendSuccess(res, await usersService.getFavorites(req.params.id)) } catch (err) { next(err) }
}
const getPreferences = async (req, res, next) => {
  try { return sendSuccess(res, await usersService.getPreferences(req.params.id)) } catch (err) { next(err) }
}
const updatePreferences = async (req, res, next) => {
  try { return sendSuccess(res, await usersService.updatePreferences(req.params.id, req.body)) } catch (err) { next(err) }
}

module.exports = {
  getById, update, getActivity, completeOnboarding,
  addFavorite, getFavorites, getPreferences, updatePreferences,
}
