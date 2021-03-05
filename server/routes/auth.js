const router = require('express').Router()
const googlelogin = require('../controller/auth')
const auth = require('../controller/auth')

router.post('/login',auth.googlelogin)
router.get('/logout',auth.logout )

module.exports = router