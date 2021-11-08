import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'

import LottieAnimation from 'lottie-web-vue'

Vue.use(VueAxios, axios)
Vue.use(LottieAnimation)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
