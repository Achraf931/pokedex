import { createStore } from 'vuex'

const mutationList = {
  isLoggedIn: 'IS_LOGGED_IN'
}

export const actionList = {
  detectLoggedIn: 'DETECT_LOGGED_IN'
}

export default createStore({
  state: {
    loggedIn: localStorage.getItem('refresh_token') !== null
  },
  getters: {
  },
  mutations: {
    [mutationList.isLoggedIn] (state, bool) {
      state.loggedIn = bool
    }
  },
  actions: {
    [actionList.detectLoggedIn] ({ commit }) {
      commit(mutationList.isLoggedIn, localStorage.getItem('refresh_token') !== null)
    }
  },
  modules: {
  }
})
