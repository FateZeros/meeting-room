const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const roomListSchema = new Schema({
  roomName: {
  	type: String,
  	require: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: String
  }
})

const RoomList = module.exports = mongoose.model('RoomList', roomListSchema)