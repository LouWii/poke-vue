import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store'

// Font awsome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCog, faChevronLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
