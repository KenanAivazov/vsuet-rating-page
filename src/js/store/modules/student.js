import api from "../utils/api";

export default {
  namespaced: true,
  state: {
    data: []
  },
  actions: {
    async getAllGroup({ state, rootState, commit }) {
      if ( !state.data.length ) {
        try {
          const {
            data: {
              data
            }
          } = await api.get('/group/get/by-group', {
            params: {
              student: rootState.rating.student.recordBookNum
            }
          });

          commit('UNIQUE_SET', {
            moduleName: 'student',
            name: 'data',
            value: data
          }, {
            root: true
          })

        } catch (e) {
          console.log(e)
          alert(e.response.data.message)
        }
      }
    }
  }
}