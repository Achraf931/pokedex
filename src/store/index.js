import { createStore } from 'vuex'

export const mutationList = {
  isLoggedIn: 'IS_LOGGED_IN',
  setNotification: 'SET_NOTIFICATION'
}

export const actionList = {
  detectLoggedIn: 'DETECT_LOGGED_IN',
  logOut: 'LOG_OUT',
  pushNotification: 'PUSH_NOTIFICATION'
}

export default createStore({
  state: {
    loggedIn: localStorage.getItem('refresh_token') !== null,
    notification: ''
  },
  getters: {
    getLoggedIn (state) {
      return state.loggedIn
    },
    getNotification (state) {
      return state.notification
    }
  },
  mutations: {
    [mutationList.isLoggedIn] (state, bool) {
      state.loggedIn = bool
    },
    [mutationList.setNotification] (state, message) {
      state.notification = message
    }
  },
  actions: {
    [actionList.detectLoggedIn] ({ commit }) {
      commit(mutationList.isLoggedIn, localStorage.getItem('refresh_token') !== null)
    },
    [actionList.logOut] ({ commit }) {
      localStorage.clear()
      commit(mutationList.isLoggedIn, false)
    },
    [actionList.pushNotification] ({ commit }, message) {
      clearTimeout()
      commit(mutationList.setNotification, message)
      setTimeout(() => commit(mutationList.setNotification, ''), 3000)
    }
  },
  modules: {
  }
})
