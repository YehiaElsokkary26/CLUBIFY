const router = require('express').Router()
const c = require('../controllers/upload.controller')
const auth = require('../middleware/auth')
const requireRole = require('../middleware/requireRole')
const upload = require('../config/multer')

const adminRoles = requireRole('club_admin', 'super_admin')

router.post('/club-logo/:clubId', auth, adminRoles, upload.single('file'), c.uploadClubLogo)
router.post('/club-cover/:clubId', auth, adminRoles, upload.single('file'), c.uploadClubCover)
router.post('/avatar/:userId', auth, upload.single('file'), c.uploadAvatar)

module.exports = router
