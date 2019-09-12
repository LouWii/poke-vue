
const getInitialState = () => {
    return {
      keywords: '',
    }
  }

  const state = getInitialState()

  const getters = {
    getFilteredSpecies: (state, getters) => {
      if (getters.allSpecies.length) {
        return getters.allSpecies.filter(species => {
          if (species.t_name) {
            return species.t_name.toLowerCase().includes(state.keywords.toLowerCase())
          } else {
            return species.name.toLowerCase().includes(state.keywords.toLowerCase())
          }
        })
      }
      return []
    }
  }

  const actions = {
    setPokemonListKeywords({commit}, keywords) {
      commit('SET_POKEMON_LIST_KEYWORDS', keywords)
    }
  }

  const mutations = {
    SET_POKEMON_LIST_KEYWORDS: function(state, keywords) {
      state.keywords = keywords
    }
  }

  export default {
    state,
    getters,
    actions,
    mutations
  }