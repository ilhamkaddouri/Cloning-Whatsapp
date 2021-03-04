const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    message: {
        type:String,
        required:true,

    },
    name: {
        type : String,
        required : true
    },
    timestamp : {
       type:  String,
       required : true
    },
    received: {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('message', MessageSchema)