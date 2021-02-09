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

      normalizeList() {
        if (this.modal.data.store) {
          let { name, moduleName } = this.modal.data.store;

          return this.$store.state[moduleName][name]
        }

        return this.modal.data.list
      }
    },

    methods: {
      pickListItem(el) {
        console.log(el)
      },

      normalizeData(el) {
        switch(this.modal.data.type) {
          case 'date':
            return new Date(el).toLocaleDateString('ru-Ru', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })

          case 'student':
            return el.recordBookNum

          default:
            return el
        }
      }
    },

    mounted() {

    }
  }
</script>

<template>
  <v-card-text style="height: 300px;">
    <v-list v-if="modal.data.list || modal.data.store">
      <v-list-item
          v-for="(element, elementIndex) in normalizeList"
          link
          :key="elementIndex"
          @click="pickListItem(element)"
      >
        <v-list-item-title>
          {{ normalizeData(element) }}
        </v-list-item-title>
      </v-list-item>

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