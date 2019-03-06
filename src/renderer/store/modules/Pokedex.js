const Pokedex = require('pokeapi-js-wrapper')
const P = new Pokedex.Pokedex()
const cloneDeep = require('lodash.clonedeep')

const getInitialState = () => {
  return {
    pokemons: [],
    pokemonList: {},
    pokemonListCount: 0,
    pokemonListIsLoading: false,
    pokemonListPagination: {
      currentPage: 0,
      limit: 25
    },
    pokemonApiLanguages: []
  }
}
const state = cloneDeep(getInitialState())

const getters = {
  nbPokemonsInList: state => Object.keys(state.pokemonList).length
}

const actions = {
  loadPokemonApiLanguages (context) {
    P.getLanguagesList()
      .then(function (response) {
        context.commit('UPDATE_POKEMON_API_LANGUAGES', response.results)
      })
      .catch(function (error) {
        console.error(error)
      })
  },
  loadPokemonListNextPage (context) {
    context.commit('UPDATE_POKEMON_LIST_IS_LOADING', true)
    const interval = {
      limit: context.state.pokemonListPagination.limit,
      offset: context.state.pokemonListPagination.currentPage * context.state.pokemonListPagination.limit
    }
    P.getPokemonsList(interval)
      .then(function (response) {
        // console.log(response)

        let pokeList = {}
        response.results.forEach(pokemonElement => {
          const urlParts = pokemonElement.url.split('/')
          const pokId = urlParts.pop() || urlParts.pop()
          pokeList[parseInt(pokId, 10)] = pokemonElement
        })

        context.commit('ADD_TO_POKEMON_LIST', pokeList)
        context.commit('UPDATE_POKEMON_LIST_PAGINATION', {currentPage: context.state.pokemonListPagination.currentPage + 1})
        context.commit('UPDATE_POKEMON_LIST_IS_LOADING', false)
      })
      .catch(function (error) {
        console.error(error)
        context.commit('UPDATE_POKEMON_LIST_IS_LOADING', false)
      })
  },
  resetPokedexData (context) {
    context.commit('RESET_POKEDEX_DATA')
  }
}

const mutations = {
  ADD_TO_POKEMON_LIST (state, newPokeListElements) {
    Object.assign(state.pokemonList, newPokeListElements)
  },
  RESET_POKEDEX_DATA (state) {
    console.log(getInitialState())
    Object.assign(state, cloneDeep(getInitialState()))
    // state = getInitialState()
    // state = Object.assign({}, cloneDeep(getInitialState()))
    // Object.assign(state, {pokemons: []})
    // Vue.set(state, 'pokemons', [])

    console.log(state)
  },
  UPDATE_POKEMON_API_LANGUAGES (state, languages) {
    state.pokemonApiLanguages = languages
  },
  UPDATE_POKEMON_LIST_IS_LOADING (state, isLoading) {
    state.pokemonListIsLoading = isLoading
  },
  UPDATE_POKEMON_LIST_PAGINATION (state, pagination) {
    Object.assign(state.pokemonListPagination, pagination)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
