import Vue from "vue";
import Vuex from "vuex";
import api from './utils/api'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    table: {
      headers: [],
      data: []
    },

    averageRating: 0
  },

  mutations: {
    UNIQUE_SET(state, { name, value }) {
      state[name] = value
    }
  },

  actions: {
    async getRating({ state, commit }, form) {
      try {
        const {
          data: {
            status,
            data
          }
        } = await api.post('/rating/get', form);

        console.log(data);

        if ( status ) {
          commit('UNIQUE_SET', {
            name: 'table',
            value: data
          });

          let calcAverage = data.reduce((acc, lesson) => {
            acc += Number(lesson.data[26])

            return acc
          }, 0)

          commit('UNIQUE_SET', {
            name: 'averageRating',
            value: calcAverage / data.length
          })
        }
      } catch(e) {
        console.log(e)
        alert(`Возникла ошибка при получении данных. Ошибка: ${e}`)
      }
    }
  }
});
