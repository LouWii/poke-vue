import pokeApi, {getIdFromUrl} from '../../services/pokedex-api'

const getInitialState = () => {
  return {
    varieties: {},
    loadingVarieties: []
  }
}

const state = getInitialState()

const getters = {
  getVariety: state => varietyId => state.varieties[varietyId]
}

const actions = {
  loadPokemonVarieties (context, pokemon) {
    pokemon.varieties.forEach((variety) => {
      const varietyId = getIdFromUrl(variety.pokemon.url)
      if (typeof context.state.varieties[varietyId] === 'undefined') {
        context.dispatch('loadVariety', varietyId)
      }
    })
  },
  loadVariety (context, varietyId) {
    if (context.state.loadingVarieties.indexOf(varietyId) !== -1) {
      return false
    }

    context.commit('ADD_LOADING_VARIETY', varietyId)
    pokeApi.getPokemonByName(varietyId)
      .then((response) => {
        context.commit('ADD_VARIETY', response)
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
  ADD_VARIETY (state, variety) {
    const newVariety = {}
    newVariety[variety.id] = variety
    Object.assign(state.varieties, newVariety)
  },
  RESET_VARIETIES_DATA (state) {
    Object.assign(state, getInitialState())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
