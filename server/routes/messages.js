const router = require('express').Router({ mergeParams: true })
const Message = require('../models/deMessages')
const Room = require('../models/Room')
const auth = require('../controller/auth')
//asycn handler to handle async await errors
const ash = require('express-async-handler')

// //router.use(auth.protect)
router.get('/',ash(async (req,res)=>{
   await Message.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}))

router.post('/:id',ash(async (req,res)=>{
    const message = req.body
    await Room.findById(req.params.id,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
             data.messages.unshift()
            res.status(200).send(data)
        }
    })
}))

router.post('/',async (req,res)=>{
    
        //const dbMessage = req.body;
        const message  = req.body.message;
        const name = req.body.name;
        const timestamp = new Date()
        const newMessage = {
            message : message,
            name: name,
            timestamp: timestamp
        }
        await Message.create(newMessage,(err,data)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(data)
            }
        })
        res.send(messageCreated)
  
        
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