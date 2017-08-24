const RoomList = require('../models/roomList')
const roomListJson = require('./roomList.json')

const config = require('../config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.database)

const initialRoomList = function () {
  RoomList.find(null, function (err, data) {
    if (err) {
      console.log(err)
    } else if (!data.length) {
      Promise.all(roomListJson.map(item => new RoomList(item).save()))
        .then(() => console.log('Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    }
  })
}

initialRoomList()
