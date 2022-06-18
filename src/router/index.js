import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/Login'
import order from '../views/external/OrderPage'

Vue.use(Router)

export default new Router(
  {
    routes: [
      {
        path: '/',
        name: 'login',
        component: login,
        meta: {
          title: '前端基本框架'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: order,
        meta:{
          title: '古的电脑维修'
        }
      }
    ]
  }
)
