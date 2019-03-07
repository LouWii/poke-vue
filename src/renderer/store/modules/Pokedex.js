const Pokedex = require('pokeapi-js-wrapper')
const P = new Pokedex.Pokedex()
const cloneDeep = require('lodash.clonedeep')

const defaultLanguage = 'en'

const getInitialState = () => {
  return {
    currentLanguage: defaultLanguage,
    pokemons: [],
    pokemonList: {},
    pokemonListCount: 0,
    pokemonListIsLoading: false,
    pokemonListPagination: {
      currentPage: 0,
      limit: 25
    },
    pokemonApiLanguages: [],
    pokemonApiLanguagesIsLoading: false,
    pokemonNames: {},
    pokedexIsLoading: false
  }
}
const state = cloneDeep(getInitialState())

const getters = {
  pokemonNamesList: state => state.pokemonNames[state.currentLanguage] ? Object.keys(state.pokemonNames[state.currentLanguage]) : [],
  nbPokemonsInList: state => Object.keys(state.pokemonList).length,
  pokedexIsReady: state => {
    return state.pokemonListCount !== 0 &&
      Object.keys(state.pokemonList).length >= state.pokemonListCount &&
      state.pokemonApiLanguages.length > 0
  }
}

const actions = {
  loadPokemonApiLanguages (context) {
    if (context.state.pokedexIsLoading || context.state.pokemonApiLanguagesIsLoading) {
      return false
    }
    context.commit('UPDATE_POKEMON_API_LANGUAGES_IS_LOADING', true)
    context.commit('UPDATE_POKEDEX_IS_LOADING', true)
    P.getLanguagesList()
      .then(function (response) {
        context.commit('UPDATE_POKEMON_API_LANGUAGES', response.results)

        context.commit('UPDATE_POKEMON_API_LANGUAGES_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
      .catch(function (error) {
        console.error(error)

        context.commit('UPDATE_POKEMON_API_LANGUAGES_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
  },
  loadPokemonListNextPage (context) {
    if (context.state.pokedexIsLoading || context.state.pokemonListIsLoading) {
      return false
    }
    context.commit('UPDATE_POKEMON_LIST_IS_LOADING', true)
    context.commit('UPDATE_POKEDEX_IS_LOADING', true)
    const interval = {
      limit: context.state.pokemonListPagination.limit,
      offset: context.state.pokemonListPagination.currentPage * context.state.pokemonListPagination.limit
    }
    P.getPokemonsList(interval)
      .then(function (response) {
        // console.log(response)

        let pokeList = {}
        let pokeNameList = []
        response.results.forEach(pokemonElement => {
          const urlParts = pokemonElement.url.split('/')
          const pokId = parseInt(urlParts.pop() || urlParts.pop(), 10)
          pokeList[pokId] = pokemonElement
          pokeNameList.push({name: pokemonElement.name, id: pokId})
        })

        context.commit('ADD_TO_POKEMON_LIST', pokeList)
        context.commit('ADD_POKEMON_NAMES', {names: pokeNameList})
        context.commit('UPDATE_POKEMON_LIST_COUNT', response.count)
        context.commit('UPDATE_POKEMON_LIST_PAGINATION', {currentPage: context.state.pokemonListPagination.currentPage + 1})
        context.commit('UPDATE_POKEMON_LIST_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
      .catch(function (error) {
        console.error(error)
        context.commit('UPDATE_POKEMON_LIST_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
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
  /**
   * Add a Pokemon name of a certain language to the pokemon names list
   * @param {*} state Vuex store state
   * @param {*} pokemonPayload Object with {language: '', name: '', id: 1}
   */
  ADD_POKEMON_NAME (state, pokemonPayload) {
    let nameLanguage = defaultLanguage
    if (typeof pokemonPayload.language === 'string') {
      nameLanguage = pokemonPayload.language
    }
    if (typeof state.pokemonNames[nameLanguage] === 'undefined') {
      let newLang = {}
      newLang[nameLanguage] = {}
      Object.assign(state.pokemonNames, newLang)
    }

    let newPokemon = {}
    newPokemon[pokemonPayload.name.toLowerCase()] = pokemonPayload.id
    Object.assign(state.pokemonNames[nameLanguage], newPokemon)
  },
  ADD_POKEMON_NAMES (state, pokemonPayload) {
    let nameLanguage = defaultLanguage
    if (typeof pokemonPayload.language === 'string') {
      nameLanguage = pokemonPayload.language
    }
    if (typeof state.pokemonNames[nameLanguage] === 'undefined') {
      let newLang = {}
      newLang[nameLanguage] = {}
      Object.assign(state.pokemonNames, newLang)
    }

    pokemonPayload.names.forEach((pokemonName) => {
      let newPokemon = {}
      newPokemon[pokemonName.name.toLowerCase()] = pokemonName.id
      Object.assign(state.pokemonNames[nameLanguage], newPokemon)
    })
  },
  RESET_POKEDEX_DATA (state) {
    console.log(getInitialState())
    let newState = cloneDeep(getInitialState())
    newState.pokedexIsLoading = true
    Object.assign(state, cloneDeep(getInitialState()))
    // state = getInitialState()
    // state = Object.assign({}, cloneDeep(getInitialState()))
    // Object.assign(state, {pokemons: []})
    // Vue.set(state, 'pokemons', [])
    state.pokedexIsLoading = false
    console.log(state)
  },
  UPDATE_POKEDEX_IS_LOADING (state, isLoading) {
    state.pokedexIsLoading = isLoading
  },
  UPDATE_POKEMON_API_LANGUAGES (state, languages) {
    state.pokemonApiLanguages = languages
  },
  UPDATE_POKEMON_API_LANGUAGES_IS_LOADING (state, isLoading) {
    state.pokemonApiLanguagesIsLoading = isLoading
  },
  UPDATE_POKEMON_LIST_COUNT (state, count) {
    state.pokemonListCount = count
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
