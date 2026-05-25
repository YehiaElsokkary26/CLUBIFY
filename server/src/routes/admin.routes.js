const router = require('express').Router()
const c = require('../controllers/admin.controller')
const auth = require('../middleware/auth')
const requireRole = require('../middleware/requireRole')

const superAdmin = requireRole('super_admin')
const adminRoles = requireRole('club_admin', 'super_admin')

router.get('/users', auth, superAdmin, c.getUsers)
router.patch('/users/:id/role', auth, superAdmin, c.updateUserRole)
router.post('/clubs', auth, superAdmin, c.createClub)
router.delete('/clubs/:id', auth, superAdmin, c.deleteClub)
router.get('/stats', auth, superAdmin, c.getStats)
router.get('/users/:id/warnings', auth, adminRoles, c.getUserWarnings)
router.post('/users/:id/warnings', auth, adminRoles, c.addWarning)
router.delete('/users/:id/warnings/:warningId', auth, superAdmin, c.deleteWarning)

module.exports = router
