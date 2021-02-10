<script>
  import { mapState, mapMutations } from 'vuex';

  import DateList from "./components/DateList";
  import StudentList from "./components/StudentList";

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

    components: {
      DateList,
      StudentList
    },

    methods: {

    },

    mounted() {

    }
  }
</script>

<template>
  <v-card-text style="height: 300px;">
    <v-list v-if="modal.data.component">
      <component :is="modal.data.component" />
    </v-list>
    <p v-else>
      {{ modal.data.errorText }}
    </p>
  </v-card-text>
</template>

<style scoped>
  .v-card__text {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
  }
</style>