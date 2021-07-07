import Vue from "vue";
import Vuex from "vuex";
import api from './utils/api'
Vue.use(Vuex);

import rating from "./modules/rating";
import schedule from "./modules/schedule";

export default new Vuex.Store({
  modules: {
    rating,
    schedule
  },
  state: {
    welcomeModal: !Boolean(localStorage.getItem('studentInfo')),
    userInfo: JSON.parse(localStorage.getItem('studentInfo'))
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
