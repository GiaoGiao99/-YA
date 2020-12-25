// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mock from 'mockjs'
import swal from 'sweetalert'
import cm from '@/assets/index'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Mock)
Vue.swal = swal
Vue.prototype.cm = cm
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
