const router = require('express').Router()
const c = require('../controllers/notifications.controller')
const auth = require('../middleware/auth')

router.get('/', auth, c.getAll)
router.patch('/read-all', auth, c.markAllRead)
router.patch('/:id/read', auth, c.markRead)

module.exports = router
