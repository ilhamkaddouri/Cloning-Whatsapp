const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    name: String,
    img: String
})

module.exports = mongoose.model('room',RoomSchema)