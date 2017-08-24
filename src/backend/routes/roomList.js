const express = require('express')
const router = express.Router()

const RoomList = require('../models/roomList')
const config = require('../config')

router.get('/roomList', (req, res) => {
  RoomList.find({}, (err, roomList) => {
    if (err) {
      res.send({ code: 50003, msg: '未知错误' })
    } else {
      res.json({ code: 200, msg: '成功', records: roomList })
    }
  })
})

router.post('/roomList', (req, res) => {
  const { roomName } = req.body
  RoomList.findOne({ roomName }, (err, data) => {
    if (data) {
      res.json({ code: 40003, msg: '会议室名称已存在' })
    } else {
    	const newRoom = new RoomList({
    	  roomName,
    	  creator: 'YJF'
    	})
    	newRoom.save((err) => {
    		if (err) {
    			res.json({ code: 50001, msg: '数据库故障' })
    		}
    		res.json({ code: 200, msg: '新增成功' })
    	})
    }
  })
})

router.delete('/roomList/:roomName', (req, res) => {
	const { roomName } = req.params
	RoomList.remove({ roomName }, (err) => {
		if (err) {
			res.json({ code: 50001, msg: '数据库故障' })
		}
		res.json({ code: 200, msg: '删除成功' })
	})
})

module.exports = router
