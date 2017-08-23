const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
  room: {
    type: String,
    unique: true,
    require: true
  },
  usingDay: {
  	type: Date,
  	unique: true,
  	require: true
  },
  roomUse: [{
  	user: {
  		type: String,
  		require: true
  	},
  	usingTime: {
  		type: Array,
  		require: true
  	}
  }]
})

const Room = module.exports = mongoose.model('Room', roomSchema)