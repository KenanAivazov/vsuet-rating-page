import api from "../utils/api";

export default {
  namespaced: true,
  state: {
    table: {
      headers: [],
      data: []
    },

    averageRating: 0
  },
  actions: {
    async get({ state, commit }, recordBookNum) {
      try {
        const {
          data: {
            status,
            data
          }
        } = await api.get('/rating/get', {
          params: {
            student: recordBookNum
          }
        });

        console.log(data);

        if ( status ) {
          commit('UNIQUE_SET', {
            name: 'table',
            value: data
          }, {
            root: true
          });

          let calcAverage = data.reduce((acc, lesson) => {
            acc += Number(lesson.data[26])

            return acc
          }, 0)

          commit('UNIQUE_SET', {
            name: 'averageRating',
            value: calcAverage / data.length
          }, {
            root: true
          })
        }
      } catch(e) {
        console.log(e)
        alert(e.response.data.message)
      }
    }
  }
}