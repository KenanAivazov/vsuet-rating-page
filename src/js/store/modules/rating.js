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
    async get({ state, rootState, commit }, { recordBookNum, groupId }) {

      let bookNum = recordBookNum || rootState.rating.student.recordBookNum;

      try {
        const {
          data: {
            status,
            data
          }
        } = await api.get('/rating/get', {
          params: {
            recordBookNum: bookNum,
            groupId
          }
        });

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
      } catch(e) {
        console.log(e)

        if (e?.response?.data) {
          alert(e?.response?.data?.message)
        }
      }
    },
  }
}