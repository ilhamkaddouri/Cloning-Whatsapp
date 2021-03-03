const router = require('express').Router()
const googlelogin = require('../controller/auth')


router.post('/login',googlelogin)

module.exports = router