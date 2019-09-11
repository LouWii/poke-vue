const defaultLanguage = 5
const englishLanguage = 9

const getInitialState = () => {
  return {
    defaultLanguage,
    englishLanguage,
    userLanguage: defaultLanguage
  }
}

const state = getInitialState()

const getters = {}

const actions = {
  setUserLanguage(context, languageId) {
    context.commit('SET_USER_LANGUAGE', languageId)
  }
}

const mutations = {
  SET_USER_LANGUAGE (state, languageId) {
    state.userLanguage = languageId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}