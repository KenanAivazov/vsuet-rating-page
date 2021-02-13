<script>
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapState({
      modal: state => state.modal,
      student: state => state.rating.student
    }),
  },

  methods: {
    ...mapActions({
      getRating: 'rating/get'
    }),

    ...mapMutations({
      unique: 'UNIQUE_SET'
    }),

    pickListItem(el) {
      console.log(el)
      this.getRating({
        date: el
      })

      this.unique({
        name: 'modal',

        value: {
          active: false,
          content: '',
          data: {
            header: ''
          }
        }
      })
    },

    normalizeDate(el) {
      return new Date(el).toLocaleDateString('ru-Ru', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
    }
  },

  mounted() {

  }
}
</script>

<template>
  <div>
    <v-list-item
        v-for="(date, dateIndex) in student.ratingUpdatedAt"
        link
        :key="dateIndex"
        @click="pickListItem(date)"
    >

      <v-list-item-title>
        {{ normalizeDate(date) }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<style scoped>

</style>