import Vue from 'vue'
import axios from 'axios'
import VueTabs from 'vue-nav-tabs'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight, faCog, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueTabs)

library.add(faAngleLeft, faAngleRight, faCog, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
