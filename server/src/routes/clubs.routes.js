const router = require('express').Router()
const c = require('../controllers/clubs.controller')
const auth = require('../middleware/auth')
const requireRole = require('../middleware/requireRole')
const validate = require('../middleware/validate')
const {
  updateClubValidator, recruitingValidator, eventValidator,
  announcementValidator, socialLinksValidator, slotValidator, committeeValidator,
} = require('../validators/clubs.validators')
const supabase = require('../config/supabase')
const { sendSuccess, sendError } = require('../utils/response')

const adminRoles = requireRole('club_admin', 'super_admin')

router.get('/', c.getAll)

router.get('/featured', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('club_scores')
      .select('*, clubs(*)')
      .eq('is_featured', true)
      .order('calculated_at', { ascending: false })
      .limit(1)
      .single()
    if (error) return sendError(res, 'No featured club found', 404)
    return sendSuccess(res, data)
  } catch (err) {
    next(err)
  }
})

router.get('/:slug/newsletters', async (req, res, next) => {
  try {
    const { data: club, error: clubErr } = await supabase
      .from('clubs')
      .select('id')
      .eq('slug', req.params.slug)
      .single()
    if (clubErr || !club) return sendError(res, 'Club not found', 404)

    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('club_id', club.id)
      .order('published_at', { ascending: false })
    if (error) throw new Error(error.message)
    return sendSuccess(res, { newsletters: data || [], total: (data || []).length })
  } catch (err) {
    next(err)
  }
})

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
