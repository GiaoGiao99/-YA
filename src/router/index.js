import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ShopCar from '@/components/ShopCar'
import CommodityIntroduce from '@/components/CommodityIntroduce'
import Home from '@/components/Home'
import Classify from '@/components/Classify'
import Myself from '@/components/Myself'
import Order from '@/components/Order'
import Pay from '@/components/Pay'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/ShopCar',
      name: 'ShopCar',
      component: ShopCar
    },
    {
      path: '/CommodityIntroduce',
      name: 'CommodityIntroduce',
      component: CommodityIntroduce
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/Myself',
      name: 'Myself',
      component: Myself
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Pay',
      name: 'Pay',
      component: Pay
    }
  ]
})
