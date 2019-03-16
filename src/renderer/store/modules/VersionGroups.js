import Vue from 'vue'
import pokeApi, { getIdFromUrl } from '../../services/pokedex-api'

const getInitialState = function () {
  return {
    loadingVersionGroups: [],
    versionGroups: {},
    versionGroupsList: {},
    versionGroupsListCount: 0,
    versionGroupsListLoading: false
  }
}

const state = getInitialState()

const getters = {
  getVersionGroup: state => versionGroupId => {
    return state.versionGroups[versionGroupId] || null
  },
  getVersionGroupNamesForLanguageFromVersionGroupId: (state, getters, rootState) => versionGroupId => {
    const versionGroup = getters.getVersionGroup(versionGroupId)
    const versionNames = []
    if (versionGroup) {
      versionGroup.versions.forEach(version => {
        versionNames.push(getters.getVersionNameForLanguage(getters.getVersion(getIdFromUrl(version.url))))
      })
    }
    if (versionNames.length) return versionNames
    return [versionGroup.name] // Fallback if we don't get the names properly for some reason
  }
}

const actions = {
  loadVersionGroupsList (context) {
    if (context.rootState.Pokedex.pokedexIsLoading || context.state.versionGroupsListLoading) {
      return false
    }

    context.commit('UPDATE_VERSION_GROUPS_LIST_IS_LOADING', true)
    context.commit('UPDATE_POKEDEX_IS_LOADING', true)
    pokeApi.getVersionGroupsList()
      .then((response) => {
        let versionGroups = {}
        response.results.forEach(versionGroup => {
          const vId = getIdFromUrl(versionGroup.url)
          versionGroups[vId] = versionGroup
        })
        context.commit('ADD_VERSION_GROUPS_TO_LIST', versionGroups)
        context.commit('UPDATE_VERSION_GROUPS_LIST_COUNT', response.count)
        context.commit('UPDATE_VERSION_GROUPS_LIST_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
      .catch((error) => {
        console.error(error)
        context.commit('UPDATE_VERSION_GROUPS_LIST_IS_LOADING', false)
        context.commit('UPDATE_POKEDEX_IS_LOADING', false)
      })
  },
  loadAllVersionGroups (context) {
    let loadCount = 0
    Object.keys(context.state.versionGroupsList).forEach(versionGroupId => {
      if (typeof context.state.versionGroups[versionGroupId] === 'undefined') {
        setTimeout(() => {
          context.dispatch('loadVersionGroup', versionGroupId)
        }, loadCount * 500)
        loadCount++
      }
    })
  },
  loadVersionGroup (context, versionGroupId) {
    if (context.state.loadingVersionGroups.indexOf(versionGroupId) !== -1) {
      return false
    }

    context.commit('ADD_LOADING_VERSION_GROUP', versionGroupId)
    pokeApi.getVersionGroupByName(versionGroupId)
      .then(response => {
        context.commit('ADD_VERSION_GROUP', response)
        context.commit('REMOVE_LOADING_VERSION_GROUP', versionGroupId)
      })
      .catch(error => {
        console.log(error)
        context.commit('REMOVE_LOADING_VERSION_GROUP', versionGroupId)
      })
  }
}

const mutations = {
  ADD_LOADING_VERSION_GROUP (state, versionGroupId) {
    state.loadingVersionGroups.push(versionGroupId)
  },
  ADD_VERSION_GROUP (state, version) {
    Vue.set(state.versionGroups, version.id, version)
  },
  ADD_VERSION_GROUPS_TO_LIST (state, versionGroups) {
    const updatedversionGroupsList = Object.assign(state.versionGroupsList, versionGroups)
    Vue.set(state, 'versionGroupsList', updatedversionGroupsList)
  },
  REMOVE_LOADING_VERSION_GROUP (state, versionGroupId) {
    const index = state.loadingVersionGroups.indexOf(versionGroupId)
    state.loadingVersionGroups.splice(index, 1)
  },
  RESET_VERSION_GROUPS_DATA (state) {
    Object.assign(state, getInitialState())
  },
  UPDATE_VERSION_GROUPS_LIST_COUNT (state, versionGroupsListCount) {
    state.versionGroupsListCount = versionGroupsListCount
  },
  UPDATE_VERSION_GROUPS_LIST_IS_LOADING (state, loading) {
    state.versionGroupsListLoading = loading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
