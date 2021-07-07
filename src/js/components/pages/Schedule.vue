<template>
  <div>
    <section>
      расписание
    </section>
  </div>
</template>

<script>
import {GET_SCHEDULE_TODAY} from "../../store/modules/action.type";

export default {
  name: "Schedule",

  data: () => ({

  }),

  mounted() {
    console.log('mount')
    this.$store.dispatch(GET_SCHEDULE_TODAY, {
      date: new Date
    });
  }
}
</script>

<style scoped>

</style>