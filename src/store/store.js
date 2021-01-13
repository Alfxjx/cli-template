import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    example: ""
  },
  mutations: {
    updateExample(state, payload) {
      state.example = payload;
    }
  },
  actions: {
    dispatchExample({ commit }, payload) {
      commit("updateExample", payload);
    }
  },
  modules: {}
});
