const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const config = require('../config')

//登录
router.post('/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.send({ code: 50003, msg: '服务器故障' })
    }
    if (!user) {
      res.send({ code: 40001, msg: '用户名不存在' })
    } else if (user) {
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign({ name: user.username }, config.secret, {
            expiresIn: 10080
          })
          User.update(
            { username },  // 条件值
            { token },
            { upsert: true },
            (err) => {
              if (err) {
                res.send({ code: 50003, msg: '未知错误' })
              }
              res.json({
                code: 200,
                msg: '登录成功',
                records: {
                  token,
                  username: user.username,
                  userImg: user.userImg,
                  userRole: user.roleId
                }
              })
            }
          )
        } else {
          res.send({ code: 40002, msg: '密码错误' })
        }
      })
    }
  })
})

module.exports = router
