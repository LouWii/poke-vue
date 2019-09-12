
const getInitialState = () => {
    return {
      generationId: null,
      keywords: '',
    }
  }

  const state = getInitialState()

  const getters = {
    getFilteredSpecies: (state, getters) => {
      if (getters.allSpecies.length) {
        return getters.allSpecies.filter(species => {
          let nameMatches = false;
          if (species.t_name) {
            nameMatches = species.t_name.toLowerCase().includes(state.keywords.toLowerCase())
          } else {
            nameMatches = species.name.toLowerCase().includes(state.keywords.toLowerCase())
          }

          if (!nameMatches) return false

          return !state.generationId || species.generation_id === state.generationId
        })
      }
      return []
    }
  }

  const actions = {
    setPokemonListGenerationId({commit}, generationId) {
      commit('SET_POKEMON_LIST_GENERATION_ID', generationId)
    },
    setPokemonListKeywords({commit}, keywords) {
      commit('SET_POKEMON_LIST_KEYWORDS', keywords)
    }
  }

  const mutations = {
    SET_POKEMON_LIST_GENERATION_ID: function(state, generationId) {
      state.generationId = generationId
    },
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