<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapState({
      modal: state => state.modal,
      students: state => state.student.data
    }),
  },

  methods: {
    pickListItem(el) {
      console.log(el)
    },
  },

  mounted() {
    this.$store.dispatch('student/getAllGroup')
  }
}
</script>

<template>
  <div>
    <v-list-item
        v-for="(student, studentIndex) in students"
        link
        :key="studentIndex"
        @click="pickListItem(student)"
    >

      <v-list-item-title>
        {{ student.recordBookNum }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<style scoped>

</style>