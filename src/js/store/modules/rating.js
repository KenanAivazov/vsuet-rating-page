import api from "../utils/api";

export default {
  namespaced: true,
  state: {
    student: {
      recordBookNum: undefined,
      faculty: {},
      group: {}
    },
    actualDate: '',
    table: [],
    tableHeader: [],
    averageRating: 0
  },
  actions: {
    async get({ state, rootState, commit }, { recordBookNum, date = '' }) {

      let bookNum = recordBookNum || rootState.rating.student.recordBookNum;

      try {
        const {
          data: {
            status,
            data
          }
        } = await api.get('/rating/get', {
          params: {
            student: bookNum,
            date
          }
        });

        console.log(data);

        if ( status ) {
          commit('UNIQUE_SET', {
            name: 'table',
            moduleName: 'rating',
            value: data.rating
          }, {
            root: true
          });

          commit('UNIQUE_SET', {
            name: 'student',
            moduleName: 'rating',
            value: data.student
          }, {
            root: true
          });

          if ( date ) {
            return commit('UNIQUE_SET', {
              name: 'actualDate',
              moduleName: 'rating',
              value: date
            }, {
              root: true
            })
          }
        }
      } catch(e) {
        console.log(e)
        alert(e.response.data.message)
      }
    }
  }
}