import Vue from 'vue'
import pokeApi, {getIdFromUrl} from '../../services/pokedex-api'

const getInitialState = () => {
  return {
    moves: {},
    loadingMoves: []
  }
}

const state = getInitialState()

const getters = {
  getMove: state => moveId => state.moves[moveId],
  isMoveLoading: state => moveId => state.loadingMoves.indexOf(moveId) !== -1
}

const actions = {
  loadPokemonVarietyMoves (context, pokemonVariety) {
    let moveCount = 0
    pokemonVariety.moves.forEach((move) => {
      const moveId = getIdFromUrl(move.move.url)
      if (typeof context.state.moves[moveId] === 'undefined') {
        setTimeout(() => {
          context.dispatch('loadMove', moveId)
        }, moveCount * 500)
      }
    })
  },
  loadMove (context, moveId) {
    if (context.state.loadingMoves.indexOf(moveId) !== -1) {
      return false
    }

    context.commit('ADD_LOADING_MOVE', moveId)
    pokeApi.getMoveByName(moveId)
      .then((response) => {
        context.commit('ADD_MOVE', response)
        context.commit('REMOVE_LOADING_MOVE', moveId)
      })
      .catch((error) => {
        console.error(error)
        context.commit('REMOVE_LOADING_MOVE', moveId)
      })
  }
}

const mutations = {
  ADD_LOADING_MOVE (state, moveId) {
    state.loadingMoves.push(moveId)
  },
  REMOVE_LOADING_MOVE (state, moveId) {
    const index = state.loadingMoves.indexOf(moveId)
    state.loadingMoves.splice(index, 1)
  },
  ADD_MOVE (state, move) {
    Vue.set(state.moves, move.id, move)
  },
  RESET_MOVE_DATA (state) {
    Object.assign(state, getInitialState())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
