const router = require('express').Router()
const { register, login, logout, refresh, me } = require('../controllers/auth.controller')
const { registerValidator, loginValidator } = require('../validators/auth.validators')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')

router.post('/register', registerValidator, validate, register)
router.post('/login', loginValidator, validate, login)
router.post('/logout', logout)
router.post('/refresh', refresh)
router.get('/me', auth, me)

module.exports = router
