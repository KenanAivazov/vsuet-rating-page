<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {

    }
  },

  computed: {
    ...mapState({
      modal: state => state.modal
    }),
  },

  methods: {
    pickListItem(el) {
      console.log(el)
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
        v-for="(date, dateIndex) in modal.data.list"
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