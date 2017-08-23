const Room = require('../models/room')
const roomJson = require('./room.json')

const config = require('../config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.database)

const initialRoom = function () {
  Room.find(null, function (err, data) {
    if (err) {
      console.log(err)
    } else if (!data.length) {
      Promise.all(roomJson.map(item => new Room(item).save()))
        .then(() => console.log('Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    }
  })
}

initialRoom()
