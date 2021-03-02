const express = require('express')
const mongoose = require('mongoose')
const Pusher = require('pusher')
const cors = require('cors')
//Config app
const app = express()
const PORT = process.env.PORT || 7000

//pusher
const pusher = new Pusher({
    appId: "1164503",
    key: "97afa67d358853afcd93",
    secret: "3f2b3be017c8ed4c7fc4",
    cluster: "eu",
    useTLS: true
  });
  

//routes
const messageRoute = require('./routes/messages')

//DB config
const DB_URL = 'mongodb+srv://ilham:adminmongo@cluster0.2slfn.mongodb.net/whatsapDB?retryWrites=true&w=majority'
mongoose.connect(DB_URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('connection')).catch(()=>console.log('error connecting bd'))

const db = mongoose.connection
db.once("open",()=>{
    console.log('Db connected');
    const msgCollection = db.collection('messages');
    const changeSream = msgCollection.watch()
    changeSream.on("change",(change)=>{
        console.log("change is ",change);

        if(change.operationType==='insert'){
            const messageDetails = change.fullDocument;
            //it has the channel "messages" 
            pusher.trigger('messages',"inserted",{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp : messageDetails.message,
                received: messageDetails.received
            })
        }else{
            console.log("Error triggering pusher")
        }
    })
})
//middleware
app.use(express.json())
app.use(cors())
app.use('/api/messages',messageRoute)

app.listen(PORT, ()=>{
    console.log(`we are listeing to the port ${PORT} yeeey`)
})