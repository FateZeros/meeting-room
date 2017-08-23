const User = require('../models/user')
const userJson = require('./user.json')

const config = require('../config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.database)

const initialUser = function () {
  User.find(null, function (err, data) {
    if (err) {
      console.log(err)
    } else if (!data.length) {
      Promise.all(userJson.map(item => new User(item).save()))
        .then(() => console.log('Initialize successfully.'))
        .catch(() => console.log('Something went wrong during initializing.'))
    }
  })
}

//用户
initialUser()
