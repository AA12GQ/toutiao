import Vue from 'vue'

import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import 'amfe-flexible'

Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
