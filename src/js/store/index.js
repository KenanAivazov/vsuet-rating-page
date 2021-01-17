import Vue from "vue";
import Vuex from "vuex";
import api from './utils/api'
Vue.use(Vuex);

import rating from "./modules/rating";

export default new Vuex.Store({
  modules: {
    rating
  },
  state: {

  },

  mutations: {
    UNIQUE_SET(state, { name, value, moduleName }) {
      if (moduleName) {
        state[moduleName][name] = value

        return
      }

      state[name] = value
    }
  },

  actions: {

  }
});
