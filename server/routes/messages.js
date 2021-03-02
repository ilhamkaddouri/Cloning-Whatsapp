const router = require('express').Router()
const Message = require('../models/deMessages')

router.get('/',(req,res)=>{
    Message.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

router.post('/',(req,res)=>{

        const dbMessage = req.body;
        Message.create(dbMessage, (err,data)=>{
            if(!err){
                res.send(data)
            }else{
                res.status(500).send(err)
            }
        })
      
   
})

module.exports = router