const router = require('express').Router()
const c = require('../controllers/clubs.controller')
const auth = require('../middleware/auth')
const requireRole = require('../middleware/requireRole')
const validate = require('../middleware/validate')
const {
  updateClubValidator, recruitingValidator, eventValidator,
  announcementValidator, socialLinksValidator, slotValidator, committeeValidator,
} = require('../validators/clubs.validators')

const adminRoles = requireRole('club_admin', 'super_admin')

router.get('/', c.getAll)
router.get('/:slug', c.getBySlug)
router.put('/:id', auth, adminRoles, updateClubValidator, validate, c.update)
router.patch('/:id/recruiting', auth, adminRoles, recruitingValidator, validate, c.setRecruiting)
router.put('/:id/spotlight', auth, adminRoles, c.updateSpotlight)
router.post('/:id/events', auth, adminRoles, eventValidator, validate, c.addEvent)
router.put('/:id/events/:eventId', auth, adminRoles, eventValidator, validate, c.updateEvent)
router.delete('/:id/events/:eventId', auth, adminRoles, c.deleteEvent)
router.post('/:id/announcements', auth, adminRoles, announcementValidator, validate, c.addAnnouncement)
router.put('/:id/social-links', auth, adminRoles, socialLinksValidator, validate, c.updateSocialLinks)
router.get('/:id/slots', c.getSlots)
router.post('/:id/slots', auth, adminRoles, slotValidator, validate, c.addSlot)
router.delete('/:id/slots/:slotId', auth, adminRoles, c.deleteSlot)
router.get('/:id/members', c.getMembers)
router.delete('/:id/members/:userId', auth, adminRoles, c.removeMember)
router.get('/:id/committees', c.getCommittees)
router.post('/:id/committees', auth, adminRoles, committeeValidator, validate, c.addCommittee)
router.put('/:id/committees/:committeeId', auth, adminRoles, committeeValidator, validate, c.updateCommittee)
router.delete('/:id/committees/:committeeId', auth, adminRoles, c.deleteCommittee)

module.exports = router
