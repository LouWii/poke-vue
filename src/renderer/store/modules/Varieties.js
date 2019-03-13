import Vue from 'vue'
import pokeApi, {getIdFromUrl} from '../../services/pokedex-api'

const getInitialState = () => {
  return {
    varieties: {},
    loadingVarieties: []
  }
}

const state = getInitialState()

const getters = {
  getVariety: state => varietyId => state.varieties[varietyId],
  getVarietyMovesGroupedByVersionsAndLearnMethod: (state, getters, rootState) => varietyId => {
    const movesPerVersion = {}
    const versionGroups = []
    const variety = getters.getVariety(varietyId)
    if (variety) {
      variety.moves.forEach(
        move => {
          move.version_group_details.forEach(
            versionGroupDetails => {
              // Check if version-group exists
              if (typeof movesPerVersion[versionGroupDetails.version_group.name] === 'undefined') {
                const versionGroupId = getIdFromUrl(versionGroupDetails.version_group.url)
                Vue.set(movesPerVersion, versionGroupDetails.version_group.name, {versionGroupId, learnMethods: {}})
                versionGroups.push({versionGroupName: versionGroupDetails.version_group.name, versionGroupId})
                // Vue.set(movesPerVersion, versionGroupId, {})
              }

              // Check if learn method exists
              if (typeof movesPerVersion[versionGroupDetails.version_group.name].learnMethods[versionGroupDetails.move_learn_method.name] === 'undefined') {
                const learnMethodId = getIdFromUrl(versionGroupDetails.move_learn_method.url)
                let newLearnMethod = {}
                newLearnMethod[versionGroupDetails.move_learn_method.name] = {moves: [], learnMethodId}
                Object.assign(movesPerVersion[versionGroupDetails.version_group.name].learnMethods, newLearnMethod)
              }

              // let newMove = {}
              // newMove[move.move.name] = {move, level_learned_at: versionGroupDetails.level_learned_at}
              // Object.assign(
              //   movesPerVersion[versionGroupDetails.version_group.name].learnMethods[versionGroupDetails.move_learn_method.name].moves,
              //   newMove)
              movesPerVersion[versionGroupDetails.version_group.name].learnMethods[versionGroupDetails.move_learn_method.name].moves.push({move, level_learned_at: versionGroupDetails.level_learned_at})
            }
          )
        }
      )
    }
    // Ordering gets a bit tricky as we use objects and not array, but this does the trick
    versionGroups.sort((group1, group2) => group1.versionGroupId - group2.versionGroupId)
    const orderedMovesPerVersion = {}
    versionGroups.forEach(versionGroupSort => {
      const versionGroupMoves = {}
      versionGroupMoves[versionGroupSort.versionGroupName] = movesPerVersion[versionGroupSort.versionGroupName]
      Object.assign(orderedMovesPerVersion, versionGroupMoves)
    })
    return orderedMovesPerVersion
  }
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
    Vue.set(state.varieties, variety.id, variety)
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
