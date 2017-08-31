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
	  	// 	const msgBody = `Hello ${userName}`
				// emailService.send(userEmail, '恭喜您成为xx的成员！', msgBody)
	  		res.json({ code: 200, msg: '添加用户成功' })
	  	}) 
    }
  })
})

// 用户权限 对照表
const userRightObj = {
	'role_1': '超级管理员',
	'role_2': '管理员',
	'role_3': '普通用户' 
}

// 获取用户列表
router.get('/userList', (req, res) => {
	User.find({}, (err, userList) => {
		if (err) {
		  res.send({ code: 50003, msg: '服务器故障' })
		} else {
			const userData = userList.map(({ username, email, roleId }) => ({ username, email, userRight: userRightObj[roleId] }))
		  res.json({ code: 200, msg: '成功', records: userData })
		}
	})
})

// 删除用户
router.delete('/user/:email', (req, res) => {
	const { email } = req.params

	User.remove({ email }, (err) => {
		if (err) {
			res.json({ code: 50001, msg: '数据库故障' })
		}
		res.json({ code: 200, msg: '删除成功' })
	})
})

// 获取单个用户
router.get('/user/:email', (req, res) => {
  const { email } = req.params
  User.findOne({ email }, (err, user) =>{
  	if (err) {
  		res.send({ code: 50003, msg: '服务器故障' })
  	} else {
  	  const { _id, username, roleId, email } = user
  		const userData = { username, roleId, email, _id }
  		res.json({ code: 200, msg: '成功', records: userData })
  	}
  })
})

// 编辑单个用户 根据objectID来操作 字段都是可以编辑的，但要判断邮箱是否唯一
router.post('/user', (req, res) => {
  const { userName, userEmail, userRight, editUserId } = req.body
  User.findOne({ _id: editUserId }, (err) => {
  	if (err) {
  	  res.send({ code: 50003, msg: '服务器故障' })
  	} else {
			User.update(
			  { _id: editUserId },
			  { 
			  	$set: {
			  		username: userName,
			  		email: userEmail,
			  		roleId: userRight
			    } 
				},
			  { upsert: true },
			  (err) => {
			  	if (err) {
			  	  console.log(err)
			  		return res.send({ code: 50001, msg: '数据库故障' })
			  	}
			  	res.json({ code: 200, msg: '用户修改成功' })
			  }
			)
  	}
  })
})

// 重置密码
router.post('/resetpwd', (req, res) => {
	// const { email } = req.body
})

module.exports = router