import api from "../utils/api";
import {GET_SCHEDULE_TODAY} from "./action.type";

export default {
  state: {
    currentSchedule: {}
  },

  actions: {
    async [GET_SCHEDULE_TODAY]({ commit, rootState, }, { date }) {
      let recordBookNum = rootState.rating.student.recordBookNum;

      try {

        const data = await api.post('/schedule/get', {
          recordBookNum,
          date
        });

        console.log(data);

      } catch (e) {
        console.log(e);

        if (e?.response?.data) {
          alert(e?.response?.data?.message)
        }
      }
    }
  }
}