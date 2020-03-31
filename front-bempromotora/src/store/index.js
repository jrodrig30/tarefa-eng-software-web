import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    informacoes: {},
  },
  mutations: {
    changeInformacoes: (state, data) => {
      state.informacoes = data;

    }
  },
  actions: {
    changeInformacoes: ({ commit }, value) => {
      if (value) {
        commit('changeInformacoes', value);
      }
    },
  },
  modules: {
  }
})
