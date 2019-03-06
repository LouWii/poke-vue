const Pokedex = require('pokeapi-js-wrapper')
const P = new Pokedex.Pokedex()

const state = {
  pokemons: [],
  pokemonList: {},
  pokemonListPagination: {
    currentPage: 0,
    limit: 10
  }
}

const getters = {
  nbPokemonsInList: state => state.pokemonList.keys ? state.pokemonList.keys.length : 0
}

const actions = {
  loadPokemonListNextPage (context) {
    const interval = {
      limit: context.state.pokemonListPagination.limit,
      offset: context.state.pokemonListPagination.currentPage * context.state.pokemonListPagination.limit
    }
    P.getPokemonsList(interval)
      .then(function (response) {
        console.log(response)

        let pokeList = {}
        response.results.forEach(pokemonElement => {
          const urlParts = pokemonElement.url.split('/')
          const pokId = urlParts.pop() || urlParts.pop()
          pokeList[parseInt(pokId, 10)] = pokemonElement
        })

        context.commit('ADD_TO_POKEMON_LIST', pokeList)
        context.commit('UPDATE_POKEMON_LIST_PAGINATION', {currentPage: context.state.pokemonListPagination.currentPage + 1})
      })
  }
}

const mutations = {
  ADD_TO_POKEMON_LIST (state, newPokeListElements) {
    Object.assign(state.pokemonList, newPokeListElements)
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
