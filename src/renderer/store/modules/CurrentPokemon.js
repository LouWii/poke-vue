import { getIdFromUrl } from '../../services/pokedex-api'

const cloneDeep = require('lodash.clonedeep')

const getInitialState = () => {
  return {
    pokemonId: null
  }
}

const state = cloneDeep(getInitialState())

const getters = {
  currentPokemon: (state, getters, rootState) => rootState.Pokedex.pokemonDetails[state.pokemonId] ? rootState.Pokedex.pokemonDetails[state.pokemonId] : null,
  currentPokemonName: (state, getters, rootState) => {
    if (state.pokemonId === null) return null

    if (rootState.Pokedex.currentLanguage === 'en') {
      return rootState.Pokedex.pokemonList[state.pokemonId].name
    }

    // Look for the name in the correct language in object
    Object.keys(rootState.Pokedex.pokemonNames[rootState.Pokedex.currentLanguage]).forEach((pokemonLangName) => {
      if (rootState.Pokedex.pokemonNames[rootState.Pokedex.currentLanguage][pokemonLangName] === state.pokemonId) return pokemonLangName
    })

    console.error('Pokemon ' + state.pokemonId + ' not found for lang ' + rootState.Pokedex.currentLanguage)
    return null
  },
  currentPokemonVarietyIds: (state, getters, rootState) => {
    if (getters.currentPokemon) {
      const varietyIds = []
      getters.currentPokemon.varieties.forEach((pVariety) => varietyIds.push(getIdFromUrl(pVariety.pokemon.url)))
      return varietyIds
    }
    return []
  }
}

const actions = {
  closePokemon (context) {
    context.commit('UPDATE_CURRENT_POKEMON', null)
  },
  loadCurrentPokemon (context) {
    context.dispatch('loadPokemon', context.state.pokemonId)
  },
  showPokemon (context, pokemonId) {
    context.commit('UPDATE_CURRENT_POKEMON', pokemonId)
  }
}

const mutations = {
  UPDATE_CURRENT_POKEMON (state, pokemonId) {
    state.pokemonId = pokemonId
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
