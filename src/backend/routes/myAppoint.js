const express = require('express')
const router = express.Router()

const Room = require('../models/room')
const config = require('../config')

router.get('/myAppoint', (req, res) => {
  Room.find({}, (err, myAppointList) => {
    if (err) {
      res.send({ code: 50003, msg: '未知错误' })
    } else {
      res.json({ code: 200, msg: '成功', records: myAppointList })
    }
  })
})

module.exports = router
