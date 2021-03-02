const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('serevr is nice done')
})

module.exports = router