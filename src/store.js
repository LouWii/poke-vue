import Vue from 'vue'
import Vuex from 'vuex'
import sqlite3 from 'sqlite3'
import { reject } from 'q';

const pokeDb = new sqlite3.Database('db.sqlite3')

pokeDb.all('SELECT * FROM pokemon_v2_ability LIMIT 3', (error, rows) => {
  if (error) {
    console.log(error);
  }
  console.log(rows);
})

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
  }
})
