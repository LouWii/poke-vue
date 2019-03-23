const defaultLanguage = 'en'

const getInitialState = () => {
  return {
    defaultLanguage,
    settingsPanelOpen: false,
    userLanguage: defaultLanguage
  }
}

const state = getInitialState()

const getters = {}

const actions = {
  closeSettingsPanel (context) {
    if (context.state.settingsPanelOpen) context.commit('TRIGGER_SETTINGS_PANEL')
  },
  triggerSettingsPanel (context) {
    context.commit('TRIGGER_SETTINGS_PANEL')
  }
}

const mutations = {
  TRIGGER_SETTINGS_PANEL (state) {
    state.settingsPanelOpen = !state.settingsPanelOpen
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
