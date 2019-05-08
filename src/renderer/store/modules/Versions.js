import Vue from 'vue'
import pokeApi, { getIdFromUrl } from '../../services/pokedex-api'

const getInitialState = function () {
  return {
    loadingVersions: [],
    versions: {},
    versionsList: {},
    versionsListCount: 0,
    versionsListLoading: false
  }
}

const state = getInitialState()

const getters = {
  getVersion: state => versionId => {
    return state.versions[versionId] || null
  },
  getVersionNameForLanguage: (state, getters, rootState) => version => {
    let englishName = null
    let langName = null
    version.names.forEach(versionLanguage => {
      if (versionLanguage.language.name === 'en') englishName = versionLanguage.name
      if (versionLanguage.language.name === rootState.Settings.userLanguage) langName = versionLanguage.name
    })
    return langName || englishName
  }
}

const actions = {
  loadVersionList (context) {
    if (context.rootState.Pokedex.pokedexIsLoading || context.state.versionsListLoading) {
      return false
    }

    context.commit('UPDATE_VERSIONS_LIST_IS_LOADING', true)
    context.commit('UPDATE_POKEDEX_IS_LOADING', true)
    pokeApi.getVersionsList()
      .then((response) => {
        let versions = {}
        response.results.forEach(version => {
          const vId = getIdFromUrl(version.url)
          versions[vId] = version
        })
        context.commit('ADD_VERSIONS_TO_LIST', versions)
        context.commit('UPDATE_VERSIONS_LIST_COUNT', response.count)
        context.commit('UPDATE_VERSIONS_LIST_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
      .catch((error) => {
        console.error(error)
        context.commit('UPDATE_VERSIONS_LIST_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
  },
  loadAllVersions (context) {
    let loadCount = 0
    Object.keys(context.state.versionsList).forEach(versionId => {
      if (typeof context.state.versions[versionId] === 'undefined') {
        setTimeout(() => {
          context.dispatch('loadVersion', versionId)
        }, loadCount * 500)
        loadCount++
      }
    })
  },
  loadVersion (context, versionId) {
    if (context.state.loadingVersions.indexOf(versionId) !== -1) {
      return false
    }

    context.commit('ADD_LOADING_VERSION', versionId)
    pokeApi.getVersionByName(versionId)
      .then(response => {
        context.commit('ADD_VERSION', response)
        context.commit('REMOVE_LOADING_VERSION', versionId)
      })
      .catch(error => {
        console.log(error)
        context.commit('REMOVE_LOADING_VERSION', versionId)
      })
  }
}

const mutations = {
  ADD_LOADING_VERSION (state, versionId) {
    state.loadingVersions.push(versionId)
  },
  ADD_VERSION (state, version) {
    Vue.set(state.versions, version.id, version)
  },
  ADD_VERSIONS_TO_LIST (state, versions) {
    const updatedVersionsList = Object.assign(state.versionsList, versions)
    Vue.set(state, 'versionsList', updatedVersionsList)
  },
  REMOVE_LOADING_VERSION (state, versionId) {
    const index = state.loadingVersions.indexOf(versionId)
    state.loadingVersions.splice(index, 1)
  },
  RESET_VERSIONS_DATA (state) {
    Object.assign(state, getInitialState())
  },
  UPDATE_VERSIONS_LIST_COUNT (state, versionsListCount) {
    state.versionsListCount = versionsListCount
  },
  UPDATE_VERSIONS_LIST_IS_LOADING (state, loading) {
    state.versionsListLoading = loading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
