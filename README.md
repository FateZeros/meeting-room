# meeting-room

> vue express mongodb

## 构建项目
``` bash
vue init webpack project-name
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
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

### webpack 无法解析vue-jsx语法
```bash
npm install --save-dev babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx
```
在.babelrc中添加
"plugins": ["transform-vue-jsx"]

## 项目目录规划

## github 添加已存在的项目到Github
``` bash
git push -u origin master
```


## 参考
[chart.js](https://github.com/chartjs/Chart.js)

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
