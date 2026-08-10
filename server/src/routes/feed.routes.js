const router = require('express').Router()
const c = require('../controllers/feed.controller')
const auth = require('../middleware/auth')

router.get('/', auth, c.getFeed)

module.exports = router
