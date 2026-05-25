const { sendSuccess } = require('../utils/response')

const uploadClubLogo = async (req, res, next) => {
  try {
    // TODO: replace with Supabase Storage upload
    return sendSuccess(res, { clubId: req.params.clubId, file: req.file })
  } catch (err) { next(err) }
}

const uploadClubCover = async (req, res, next) => {
  try {
    // TODO: replace with Supabase Storage upload
    return sendSuccess(res, { clubId: req.params.clubId, file: req.file })
  } catch (err) { next(err) }
}

const uploadAvatar = async (req, res, next) => {
  try {
    // TODO: replace with Supabase Storage upload
    return sendSuccess(res, { userId: req.params.userId, file: req.file })
  } catch (err) { next(err) }
}

module.exports = { uploadClubLogo, uploadClubCover, uploadAvatar }
