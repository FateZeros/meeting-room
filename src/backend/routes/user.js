const express = require('express')
const router = express.Router()

const User = require('../models/user')
const config = require('../config')

const credentials = require('../credentials')
const emailService = require('../lib/sendEmail.js')(credentials)

// 用户新增
// 新增时，默认密码123
// 根据邮箱来判定唯一值
// 新增成功后发送邮件到该邮箱，告知密码，并提醒用户修改密码
router.post('/addUser', (req, res) => {
  const { userName, userEmail, orgName, userRight } = req.body
  User.findOne({ email: userEmail }, (err, user) => {
    if (err) {
      res.send({ code: 50003, msg: '服务器故障' })
    }
    if (user) {
      res.send({ code: 40002, msg: '该邮箱已被使用' })
    } else {
    	new User({
				username: userName,
				passwd: 123,
				email: userEmail,
				roleId: userRight
			}).save((err) => {
	  		if (err) {
	  			return res.send({ code: 50001, msg: '数据库故障' })
	  		}
	  		//发送邮件
				emailService.send('1031720197@qq.com', '恭喜您成为会议室系统的成员！', 'Hello');
	  		res.json({ code: 200, msg: '添加用户成功' })
	  	}) 
    }
  })
})

module.exports = router