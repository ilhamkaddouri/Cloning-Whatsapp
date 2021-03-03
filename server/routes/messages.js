const router = require('express').Router()
const Message = require('../models/deMessages')
const Room = require('../models/Room')
router.get('/',(req,res)=>{
    Message.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

router.post('/:id',async (req,res)=>{
    const message = req.body
    await Room.findById(req.params.id,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
             data.messages.unshift()
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

// router.post('/rooms/:id', (req,res)=>{
//     const message =  req.body
//     Room.findById(req.params.id,(err,data)=>{
//         if(err){
//             console.log(err)
//         }else{
//             const room = data
//             room.messages.unshift(message)
//             room.save()
//             console.log(room)
//             res.send(message)
//         }
//     })
   
    
// })

module.exports = router