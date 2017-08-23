const express = require('express')
const router = express.Router()

const Room = require('../models/room')
const config = require('../config')

router.get('/room/:usingDay', (req, res) => {
  const { usingDay } = req.params
  Room.find({ usingDay: usingDay }, (err, room) => {
    if (err) {
      res.send({ code: 50003, msg: '未知错误' })
    } else {
      res.json({ code: 200, msg: '成功', records: room })
    }
  })
})

module.exports = router
