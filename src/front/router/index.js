import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/front/components/page/Login.vue'
import Home from '@/front/components/page/Home.vue'
import RoomAppoint from '@/front/components/page/roomAppoint.vue'
import MyAppoint from '@/front/components/page/myAppoint.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          component: RoomAppoint
        },
        {
          path: '/my-appoint',
          component: MyAppoint
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
