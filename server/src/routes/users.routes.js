const router = require('express').Router()
const c = require('../controllers/users.controller')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const { updateProfileValidator, preferencesValidator } = require('../validators/users.validators')

router.get('/:id', auth, c.getById)
router.put('/:id', auth, updateProfileValidator, validate, c.update)
router.get('/:id/activity', auth, c.getActivity)
router.post('/:id/onboarding', auth, c.completeOnboarding)
router.post('/:id/favorites/:clubId', auth, c.addFavorite)
router.get('/:id/favorites', auth, c.getFavorites)
router.get('/:id/preferences', auth, c.getPreferences)
router.patch('/:id/preferences', auth, preferencesValidator, validate, c.updatePreferences)

module.exports = router
