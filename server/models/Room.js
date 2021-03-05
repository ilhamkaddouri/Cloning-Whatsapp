const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    name: String,
    img: String,
    messages :[
        {
        
                message: String,
                name: String,
                timestamp : String,
                received: Boolean
        
        }
    ],
    date:{
        type: Date
    }
})

module.exports = mongoose.model('room',RoomSchema)