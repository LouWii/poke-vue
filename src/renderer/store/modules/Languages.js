import Vue from 'vue'
import pokeApi from '../../services/pokedex-api'

const getInitialState = () => {
  return {
    apiLanguages: [],
    apiLanguagesIsLoading: false
  }
}

const state = getInitialState()

const getters = {}

const actions = {
  loadApiLanguages (context) {
    if (context.rootState.Pokedex.pokedexIsLoading || context.state.apiLanguagesIsLoading) {
      return false
    }

    context.commit('UPDATE_API_LANGUAGES_IS_LOADING', true)
    context.commit('UPDATE_POKEDEX_IS_LOADING', true)
    pokeApi.getLanguagesList()
      .then(function (response) {
        context.commit('UPDATE_API_LANGUAGES', response.results)

        context.commit('UPDATE_API_LANGUAGES_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
      .catch(function (error) {
        console.error(error)

        context.commit('UPDATE_API_LANGUAGES_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
  }
}

const mutations = {
  RESET_LANGUAGES_DATA (state) {
    Object.assign(state, getInitialState())
  },
  UPDATE_API_LANGUAGES (state, languages) {
    Vue.set(state, 'apiLanguages', languages)
  },
  UPDATE_API_LANGUAGES_IS_LOADING (state, isLoading) {
    state.apiLanguagesIsLoading = isLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
