import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'
// import { validUsername } from '@/utils/validate'
import App from './App'
import store from './store'
import router from './router'
import '@/icons'
import '@/permission'
import animated from 'animate.css'
import { mockXHR } from '../mock'
import echarts from 'echarts'
import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
// if (sessionStorage.getItem('user')) {
//   this.$store.dispatch('user/setroutes').then(() => {
//   }).catch(() => {
//   })
// }
Vue.use(animated)

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.$echarts = echarts
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    if (sessionStorage.getItem('name')) {
      this.$store.dispatch('user/setroutes').then(() => {
      }).catch(() => {
      })
    }
  }
})
