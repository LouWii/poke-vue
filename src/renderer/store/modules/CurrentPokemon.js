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
  currentPokemonGenera: (state, getters, rootState) => {
    let generaStr = null
    if (getters.currentPokemon) {
      getters.currentPokemon.genera.forEach(genera => {
        if (genera.language.name === rootState.Pokedex.currentLanguage) generaStr = genera.genus
      })
    }
    return generaStr
  },
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
  currentPokemonSummaries: (state, getters, rootState) => {
    const summaries = []
    if (getters.currentPokemon) {
      getters.currentPokemon.flavor_text_entries.forEach(summary => {
        if (summary.language.name === rootState.Pokedex.currentLanguage) {
          let updatedSummary = Object.assign({}, summary)
          updatedSummary.flavor_text = updatedSummary.flavor_text.replace(/(\r\n|\n|\r|\f)/gm, ' ')
          summaries.push(updatedSummary)
        }
      })
    }
    return summaries
  },
  currentPokemonSummariesGrouped: (state, getters, rootState) => {
    const summaries = getters.currentPokemonSummaries
    const groupedSummaries = []
    const groupedSummariesStr = []
    summaries.forEach(summary => {
      if (groupedSummariesStr.indexOf(summary.flavor_text) === -1) {
        groupedSummariesStr.push(summary.flavor_text)
        groupedSummaries.push({flavor_text: summary.flavor_text, versions: []})
      }
      const summaryIndex = groupedSummariesStr.indexOf(summary.flavor_text)
      const version = rootState.Versions.versions[getIdFromUrl(summary.version.url)]
      groupedSummaries[summaryIndex].versions.push(version)
    })
    return groupedSummaries
  },
  currentPokemonDefaultVarietyListItem: (state, getters, rootState) => {
    let defaultVariety = null
    if (getters.currentPokemon) {
      getters.currentPokemon.varieties.forEach((pVariety) => { if (pVariety.is_default) defaultVariety = pVariety })
    }
    return defaultVariety
  },
  currentPokemonDefaultVarietyId: (state, getters, rootState) => {
    if (getters.currentPokemonDefaultVarietyListItem) return getIdFromUrl(getters.currentPokemonDefaultVarietyListItem.pokemon.url)
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
