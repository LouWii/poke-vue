import pokeApi from '../../services/pokedex-api'

const getInitialState = () => {
  return {
    varieties: {},
    loadingVarieties: []
  }
}

const state = getInitialState()

const getters = {}

const actions = {
  loadPokemonVarieties (context, pokemon) {

  },
  loadVarieriety (context, varietyId) {
    if (context.state.loadingVarieties.indexOf(varietyId) !== -1) {
      return false
    }

    context.commit('ADD_LOADING_VARIETY', varietyId)
    pokeApi.getPokemonByName(varietyId)
      .then((response) => {
        context.commit('REMOVE_LOADING_VARIETY', varietyId)
      })
      .catch((error) => {
        console.error(error)
        context.commit('REMOVE_LOADING_VARIETY', varietyId)
      })
  }
}

const mutations = {
  ADD_LOADING_VARIETY (state, varietyId) {
    state.loadingVarieties.push(varietyId)
  },
  REMOVE_LOADING_VARIETY (state, varietyId) {
    const index = state.loadingVarieties.indexOf(varietyId)
    state.loadingVarieties.splice(index, 1)
  },
  RESET_VARIETIES_DATA (state) {

  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
