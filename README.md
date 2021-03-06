![](https://img.shields.io/badge/javaScript-vue-brightgreen.svg)
![](https://img.shields.io/badge/css-elementUI-yellow.svg)
![](https://img.shields.io/badge/db-mongondb-blue.svg)
> vue express mongodb mongoose

## meeting-room 会议室预约OA系统

基于`vue.js+mongodb+express+Element UI+g2` 构建的会议室预约管理系统

## 功能

- [x] 实现会议室的预约，并用图表展现预约情况
- [x] 实现会议室管理，用户管理功能
- [ ] 预约查询管理，取消预约功能
- [ ] 使用发送邮件功能，通知与会人员

<img src="https://github.com/FateZeros/meeting-room/blob/master/screenshots/room1.png" />
<img src="https://github.com/FateZeros/meeting-room/blob/master/screenshots/room2.png" />

## 目录结构
```
.
├── README.md
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html
├── package.json
├── src
│   ├── backend                     #后台连接mongodb提供api
│   │   ├── assets
│   │   │   └── users
│   │   ├── config.js
│   │   ├── credentials.js          #证书
│   │   ├── lib
│   │   │   └── sendEmail.js        #发送邮件
│   │   ├── mockData                #mock数据
│   │   │   ├── room.js
│   │   │   ├── room.json
│   │   │   ├── roomList.js
│   │   │   ├── roomList.json
│   │   │   ├── user.js
│   │   │   └── user.json
│   │   ├── models                  #mongodb models
│   │   │   ├── room.js
│   │   │   ├── roomList.js
│   │   │   └── user.js
│   │   ├── routes                  #api
│   │   │   ├── index.js
│   │   │   ├── login.js
│   │   │   ├── myAppoint.js
│   │   │   ├── room.js
│   │   │   ├── roomList.js
│   │   │   └── user.js
│   │   └── server.js               #后台服务
│   └── front                       #前端资源文件
│       ├── App.vue
│       ├── api
│       │   └── index.js
│       ├── assets
│       │   └── logo.png
│       ├── components
│       │   ├── chart
│       │   ├── common
│       │   └── page
│       ├── main.js
│       ├── router
│       │   └── index.js
│       └── utils
│           ├── appointTime.js
│           ├── index.js
│           └── restApi.js
├── static
│   └── imgs
│       └── login-bg.jpg
└── test
    ├── e2e
    │   ├── custom-assertions
    │   │   └── elementCount.js
    │   ├── nightwatch.conf.js
    │   ├── runner.js
    │   └── specs
    │       └── test.js
    └── unit
        ├── index.js
        ├── karma.conf.js
        └── specs
            └── Hello.spec.js


```

## 构建项目
``` bash
vue init webpack project-name
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3366
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 引入g2
```bash
npm install g2 --save
```

### 安装 nodemon
```bash
npm install --save nodemon
```

### 安装mongoose
``` bash
npm install --save mongoose
```

### 安装express
```bash
npm install --save express body-parser
```

### 安装jwt
```bash
npm install --save jsonwebtoken
```

### 安装bcrypt
```bash
npm install --save bcrypt
```

### 发邮件功能
```bash
npm install --save nodemailer nodemailer-smtp-transport
```

### webpack 无法解析vue-jsx语法
```bash
npm install --save-dev babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx
```
在.babelrc中添加
"plugins": ["transform-vue-jsx"]


## github 添加已存在的项目到Github
``` bash
git push -u origin master
```


## 参考
[Element UI](http://element.eleme.io/#/zh-CN)
