const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  
    name:{
        type : String,
        required : true,
        max:32,
        trim:true
    },
    email:{
        type : String,
        required : true,
        unique: true,
        lowercase:true
    },
    password:{
        type : String,
        required: true
    },
    resetLink:{
        type : String,
        default : ""
    }
},{timestamps: true})

module.exports = mongoose.model('user',UserSchema)