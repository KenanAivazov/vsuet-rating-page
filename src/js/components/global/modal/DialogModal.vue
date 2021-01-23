<script>
  import { mapState, mapMutations } from 'vuex';
  import GroupList from "./content/GroupList";

  export default {
    name: "DialogModal",

    computed: {
      ...mapState({
        modal: state => state.modal
      })
    },

    components: {
      GroupList,
    },

    methods: {
      ...mapMutations({
        unique: 'UNIQUE_SET'
      }),

      closeModal() {
        this.unique({
          name: 'modal',
          value: {
            active: false,
            data: {
              header: ''
            }
          }
        })
      }
    },

    mounted() {}
  }
</script>

<template>
  <v-dialog
      v-model="modal.active"
      :scrollable="modal.content === 'GroupList'"
      width="500"
  >

    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ modal.data.header }}
      </v-card-title>

      <component :is="modal.content"></component>

      <v-card-actions class="grey lighten-2">
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="closeModal"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>