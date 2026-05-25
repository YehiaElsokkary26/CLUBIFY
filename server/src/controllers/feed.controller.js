const feedService = require('../services/feed.service')
const { sendSuccess } = require('../utils/response')

const getFeed = async (req, res, next) => {
  try { return sendSuccess(res, await feedService.getFeed(req.query)) } catch (err) { next(err) }
}

module.exports = { getFeed }
