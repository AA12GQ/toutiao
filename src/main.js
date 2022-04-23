import Vue from 'vue'

import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import './styles/index.less'
import 'amfe-flexible'
import './utils/dayjs'

Vue.config.productionTip = false
Vue.prototype.baseUrl = 'http://42.192.3.136:8084/api/v1'
Vue.use(Vant)
Vue.use(VueCompositionAPI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
