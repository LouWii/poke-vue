import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

import pokeDb from '@/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    
  },
  actions: {
    getAbility(state, payload) {
      return new Promise((resolve, reject) => {
        pokeDb.all('SELECT * FROM pokemon_v2_ability WHERE id = $id', {$id: payload}, (error, rows) => {
          if (error) {
            reject(error)
          } else {
            resolve(rows)
          }
        })
      })
      
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
