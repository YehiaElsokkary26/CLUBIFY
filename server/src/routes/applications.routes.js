const router = require('express').Router()
const c = require('../controllers/applications.controller')
const auth = require('../middleware/auth')
const requireRole = require('../middleware/requireRole')
const validate = require('../middleware/validate')
const { clubApplicationValidator, volunteerApplicationValidator } = require('../validators/applications.validators')

router.post('/club/:clubId', auth, requireRole('student'), clubApplicationValidator, validate, c.applyToClub)
router.post('/volunteer/:activityId', auth, requireRole('student'), volunteerApplicationValidator, validate, c.applyToVolunteer)
router.get('/my', auth, c.getMyApplications)
router.get('/club/:clubId', auth, requireRole('club_admin', 'super_admin'), c.getClubApplications)
router.get('/volunteer/:activityId', auth, requireRole('super_admin'), c.getVolunteerApplications)
router.patch('/:id/status', auth, requireRole('club_admin', 'super_admin'), c.updateStatus)

module.exports = router
