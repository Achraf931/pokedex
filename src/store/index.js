import { createStore } from 'vuex'

export const mutationList = {
  isLoggedIn: 'IS_LOGGED_IN'
}

export const actionList = {
  detectLoggedIn: 'DETECT_LOGGED_IN',
  logOut: 'LOG_OUT'
}

export default createStore({
  state: {
    loggedIn: localStorage.getItem('refresh_token') !== null
  },
  getters: {
    getLoggedIn (state) {
      return state.loggedIn
    }
  },
  mutations: {
    [mutationList.isLoggedIn] (state, bool) {
      state.loggedIn = bool
    }
  },
  actions: {
    [actionList.detectLoggedIn] ({ commit }) {
      commit(mutationList.isLoggedIn, localStorage.getItem('refresh_token') !== null)
    },
    [actionList.logOut] ({ commit }) {
      localStorage.clear()
      commit(mutationList.isLoggedIn, false)
    }
  },
  modules: {
  }
})
