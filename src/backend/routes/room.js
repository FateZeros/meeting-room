const express = require('express')
const router = express.Router()

const Room = require('../models/room')
const config = require('../config')

router.get('/room/:usingDay', (req, res) => {
  const { usingDay } = req.params
  Room.find({ usingDay: usingDay }, (err, room) => {
    if (err) {
      return res.send({ code: 50003, msg: '未知错误' })
    } else {
      res.json({ code: 200, msg: '成功', records: room })
    }
  })
})

router.post('/appointRoom', (req, res) => {
	const { room, roomUser, usingDay, startTime, endTime } = req.body
	Room.find({ room, usingDay }, (err, roomData) => {
		if (err) {
		  return res.send({ code: 50001, msg: '数据库故障' })
		}

		// console.log(room, usingDay, roomUser, startTime, endTime, roomData)
		// 当前会议室，当前日期 还没有预约 则直接新增预约记录
		if (roomData.length === 0) {
			new Room({
				room,
				usingDay,
				roomUse: [{
					user: roomUser,
					usingTime: [+startTime, +endTime]
				}]
			}).save((err) => {
				// console.log(err)
	  		if (err) {
	  			return res.send({ code: 50001, msg: '数据库故障' })
	  		}
	  		res.json({ code: 200, msg: '预约成功' })
	  	})
		} else {
			const updateQry = { room: room, usingDay: usingDay }
			
			const newRoomUse = {
				user: roomUser,
				usingTime: [+startTime, +endTime]
			}

			Room.update(
			  { room, usingDay },
			  { 
			  	$push: 
			  	{
			  		roomUse: newRoomUse
			  	}
				},
			  { upsert: true },
			  (err) => {
			  	if (err) {
			  		return res.send({ code: 50001, msg: '数据库故障' })
			  	}
			  	res.json({ code: 200, msg: '预约成功' })
			  }
			)
		}
	})
})

module.exports = router
