// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

Vue.use(VueResource)
Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'   // 默认主题
Vue.use(ElementUI)

// 注册全局钩子
router.beforeEach((to, from, next) => {
  const userInfo = localStorage.getItem('MEETING_INFO')
  if (!userInfo) {
    // 无登录信息
    console.log(userInfo)
    if (to.path !== '/login' && to.path !== '/register') {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})
