import api from "../utils/api";

export default {
  namespaced: true,
  state: {
    student: {
      recordBookNum: undefined,
      faculty: {},
      group: {}
    },
    table: [],
    tableHeader: [],
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
          let updateData = data.rating.map(rate => {
            return {
              ...rate.lesson,
              lessonName: rate.lesson.name === 'Основы формирования личности (Социология, Культурология, Психология, Правоведение"' ? 'ОФЛ' : rate.lesson.name,
              isClose: rate.lesson.isClose ? 'Да' : 'Нет',
              ...rate
            }
          })

          let headers = data.rating.map(rate => {
            return rate.value.map(item => {
              return {
                type: item.type,
                weight: item.weight
              }
            })
          })

          commit('UNIQUE_SET', {
            name: 'table',
            moduleName: 'rating',
            value: updateData
          }, {
            root: true
          });

          commit('UNIQUE_SET', {
            name: 'tableHeader',
            moduleName: 'rating',
            value: headers[0]
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

          // let calcAverage = data.reduce((acc, lesson) => {
          //   acc += Number(lesson.data[26])
          //
          //   return acc
          // }, 0)
          //
          // commit('UNIQUE_SET', {
          //   name: 'averageRating',
          //   moduleName: 'rating',
          //   value: calcAverage / data.length
          // }, {
          //   root: true
          // })
        }
      } catch(e) {
        console.log(e)
        alert(e.response.data.message)
      }
    }
  }
}