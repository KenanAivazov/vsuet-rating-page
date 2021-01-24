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
      })
    },

    mounted() {
      this.$store.dispatch('student/getAllGroup')
    }
  }
</script>

<template>
  <v-card-text style="height: 300px;">
    <v-list v-if="students">
      <v-list-item
          v-for="(student, studentIndex) in students"
          link
          :key="studentIndex"
      >
        <v-list-item-title>
          {{ student.recordBookNum }}
        </v-list-item-title>
      </v-list-item>

    </v-list>
    <p v-else>
      Не удалось получить всех студентов вашей группы. Сорян :/
    </p>
  </v-card-text>
</template>

<style scoped>
  .v-card__text {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
  }
</style>