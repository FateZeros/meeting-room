const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config') //连接数据库配置

/** 连接数据库 **/
mongoose.Promise = global.Promise
mongoose.connect(config.database) 

const db = mongoose.connection
db.on('error', function () {
  console.log('Database connection error.')
})

db.once('open', function () {
  console.log('The database has connected.')
})
/** 连接数据库 **/

const routes = require('./routes')

const app = express()

// 设置服务器端口
app.set('port', (process.env.port || 6633))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//加载静态资源
app.use(express.static(path.join(__dirname, 'static')))
//加载 图片静态资源
app.use('/static/imgs', express.static(path.join(__dirname, 'assets')))

routes(app)

app.use(function(req, res) {
  res.status(404).end()
})


app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
