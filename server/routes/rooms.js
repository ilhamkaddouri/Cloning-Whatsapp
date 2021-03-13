const router = require('express').Router()
const Room = require('../models/Room')
const multer = require('multer')

const fileFilter = (req,file,cb)=>{
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb(new Error('Not an image! Please upload only images.', 400), false);
      }
}

const storage= multer.diskStorage({
    destination:function (req, file, cb){
        cb(null,'Images')
    },filename:(req,file,cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})

const upl = multer({dest :'uploads/'})
const upload = multer({storage: storage, 
    
    limits:{
    fileSize : 1024*1024*5
}})

var upld = multer({ dest: './public' })
router.post('/stats', upld.single('img'), (req,res)=>{
    try{
        console.log("Uploaded Successfull with filename : "+req.message);
        res.send("did it")
    }catch(err){
        res.send('err'+err)
    }
    
    });

router.post('/upload',upl.single('image'),(req,res)=>{
    //console.log("files is " + req.body.file)
    res.send('image uploaded'+req.file)
})

router.get('/',(req,res)=>{
    Room.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

router.post('/',upload.single('image'),async (req,res)=>{
    
    
    const room ={
        name: 'user',
        img: req.file,
        date :  Date.now()
    }
    console.log(room)
    await Room.create(room,(err,data)=>{
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