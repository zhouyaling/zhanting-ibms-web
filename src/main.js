// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import Axios from 'axios'
import dataV from '@jiaminghi/data-view'
import './styles/common.css'
import store from './store/store.js'


Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.$baseUrl = "http://39.107.224.254:8222"; // ibms接口地址
Vue.prototype.$ibmsAdminUrl = "http://39.107.224.254:8100"; // imbs后台地址
Vue.prototype.$acBaseUrl = "http://digital.tq-service.com/tqdata";  // 数字案场接口地址
Vue.prototype.$acUserBaseUrl = "http://sales-admin.tq-service.com";  // 数字案场接口地址


Vue.use(echarts)
Vue.use(dataV)

new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
