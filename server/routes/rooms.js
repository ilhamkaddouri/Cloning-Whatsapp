const router = require('express').Router()
const Room = require('../models/Room')

router.get('/',(req,res)=>{
    Room.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

router.post('/',(req,res)=>{
    const room = req.body;
    Room.create(room,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

router.get('/:id',(req,res)=>{
    Room.findById(req.params.id,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

router.post('/:id/messages',(req,res)=>{
   
    Room.findById(req.params.id,(err,room)=>{
        if(err){
            res.status(500).send(err)
        }else{
            const mesage = req.body
            console.log(room.messages)
            room.messages.push(mesage);
            room.save()
            res.send(room)
        }
    })
})

module.exports = router