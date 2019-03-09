import Vue from 'vue'
import pokeApi, {getIdFromUrl} from '../../services/pokedex-api'

const cloneDeep = require('lodash.clonedeep')

const defaultLanguage = 'en'

const getInitialState = () => {
  return {
    currentLanguage: defaultLanguage,
    currentSection: '',
    loadingPokedexConfirmed: false,
    pokemons: [],
    pokemonDetails: {},
    pokemonList: {},
    pokemonListCount: 0,
    pokemonListIsLoading: false,
    pokemonListPagination: {
      currentPage: 0,
      limit: 25
    },
    pokemonNames: {},
    pokedexIsLoading: false
  }
}
const state = cloneDeep(getInitialState())

const getters = {
  pokemonNamesList: state => state.pokemonNames[state.currentLanguage] ? state.pokemonNames[state.currentLanguage] : [],
  nbPokemonsInList: state => Object.keys(state.pokemonList).length,
  pokedexReadyToConfirm: (state, getters, rootState) => {
    // Cheating Vue to force it to properly update the getter by creating vars
    const pokemonListCountReady = (state.pokemonListCount > 0)
    const pokemonListReady = (Object.keys(state.pokemonList).length >= state.pokemonListCount)
    const languagesReady = (rootState.Languages.apiLanguages.length > 0)
    return pokemonListCountReady &&
      pokemonListReady &&
      typeof state.pokemonList[state.pokemonListCount - 1] !== 'undefined' &&
      languagesReady
  },
  pokedexIsReady: (state, getters) => {
    return getters.pokedexReadyToConfirm &&
      state.loadingPokedexConfirmed
  }
}

const actions = {
  confirmPokedexLoaded (context) {
    context.commit('UPDATE_LOADING_POKEDEX_CONFIRMED', true)
  },
  loadPokemon (context, pokemonId) {
    if (context.state.pokedexIsLoading) {
      return false
    }
    pokeApi.getPokemonSpeciesByName(pokemonId)
      .then(function (response) {
        context.commit('ADD_POKEMON', response)
        context.commit('ADD_A_POKEMON_NAMES', response)
      })
      .catch(function (error) {
        console.error(error)
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
    // pokeApi.getPokemonsList(interval)
    pokeApi.getPokemonSpeciesList(interval)
      .then(function (response) {
        // console.log(response)

        let pokeList = {}
        let pokeNameList = []
        response.results.forEach(pokemonElement => {
          const pokId = getIdFromUrl(pokemonElement.url)
          pokeList[pokId] = pokemonElement
          pokeNameList.push({name: pokemonElement.name, id: pokId})
        })

        context.commit('ADD_TO_POKEMON_LIST', pokeList)
        context.commit('ADD_POKEMONS_NAME_TO_LANGUAGE', {names: pokeNameList})
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
    context.commit('RESET_LANGUAGES_DATA')
    context.commit('RESET_VARIETIES_DATA')
    context.commit('RESET_POKEDEX_DATA')
  },
  setCurrentSection (context, sectionName) {
    context.commit('UPDATE_CURRENT_SECTION', sectionName)
  }
}

const mutations = {
  ADD_TO_POKEMON_LIST (state, newPokeListElements) {
    const updatedPokeList = Object.assign(state.pokemonList, newPokeListElements)
    Vue.set(state, 'pokemonList', updatedPokeList)
  },
  ADD_POKEMON (state, pokemon) {
    let newPokemon = {}
    newPokemon[pokemon.id] = pokemon
    Object.assign(state.pokemonDetails, newPokemon)
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
  /**
   * Add the different names of a Pokemon to each Pokemon names language list
   * @param {*} state Vuex state
   * @param {*} pokemonPayload Pokemon object from PokeAPI
   */
  ADD_A_POKEMON_NAMES (state, pokemonPayload) {
    if (Array.isArray(pokemonPayload.names)) {
      pokemonPayload.names.forEach((pokemonName) => {
        // Create language list if it doesn't exist
        if (typeof state.pokemonNames[pokemonName.language.name] === 'undefined') {
          const newLang = {}
          newLang[pokemonName.language.name] = {}
          Object.assign(state.pokemonNames, newLang)
        }

        const newPokeName = {}
        newPokeName[pokemonName.name.toLowerCase()] = pokemonPayload.id
        Object.assign(state.pokemonNames[pokemonName.language.name], newPokeName)
      })
    }
  },
  /**
   * Add multiple pokemon names for a specific language
   * @param {*} state Vuex state
   * @param {*} pokemonPayload Object with data {language: 'en', names: [{name: 'poke name', id: 1}]}
   */
  ADD_POKEMONS_NAME_TO_LANGUAGE (state, pokemonPayload) {
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
    let newState = cloneDeep(getInitialState())
    newState.pokedexIsLoading = true
    Object.assign(state, cloneDeep(getInitialState()))
    state.pokedexIsLoading = false
  },
  UPDATE_CURRENT_SECTION (state, sectionName) {
    state.currentSection = sectionName
  },
  UPDATE_LOADING_POKEDEX_CONFIRMED (state, isValidated) {
    state.loadingPokedexConfirmed = isValidated
  },
  UPDATE_POKEDEX_IS_LOADING (state, isLoading) {
    state.pokedexIsLoading = isLoading
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
