const router = require('express').Router()
const c = require('../controllers/volunteer.controller')
const auth = require('../middleware/auth')
const requireRole = require('../middleware/requireRole')
const validate = require('../middleware/validate')
const { createVolunteerValidator, updateVolunteerValidator } = require('../validators/volunteer.validators')

const superAdmin = requireRole('super_admin')

router.get('/', c.getAll)
router.get('/:id', c.getById)
router.post('/', auth, superAdmin, createVolunteerValidator, validate, c.create)
router.put('/:id', auth, superAdmin, updateVolunteerValidator, validate, c.update)
router.patch('/:id/toggle', auth, superAdmin, c.toggle)
router.delete('/:id', auth, superAdmin, c.remove)

module.exports = router
