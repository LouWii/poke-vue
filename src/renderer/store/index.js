import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'
import { createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState()
    // createSharedMutations() // This triggers a bug where Vuex actions aren't working
  ],
  strict: process.env.NODE_ENV !== 'production'
})
