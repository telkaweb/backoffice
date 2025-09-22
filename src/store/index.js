import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    auth: null,
    loading: false,
    snackbarStatus: false,
    snackbarText: '',
    snackbarColor: 'success',
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
    setAuth(state, status) {
      state.auth = status
    },
    setLoading(state, condition) {
      state.loading = condition
    },
    setSnackbarStatus(state, snackbarStatus) {
      state.snackbarStatus = snackbarStatus;
    },
    setSnackbarText(state, snackbarText) {
      state.snackbarText = snackbarText;
    },
    setSnackbarColor(state, snackbarColor) {
      state.snackbarColor = snackbarColor;
    },
  },
  actions: {},
  modules: {}
})
