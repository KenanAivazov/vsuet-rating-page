<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    data: () => ({
      recordBookNum: '',
      button: {
        loading: false
      }
    }),
    asyncData({ store }) {
    },

    computed: {
      ...mapState({
        table: state => state.table,
        averageRating: state => state.averageRating
      })
    },

    methods: {
      ...mapActions({
        getRating: 'rating/get'
      }),

      findRating() {
        if ( this.$refs.form.validate() ) {
          this.button.loading = true;
          this.getRating(this.recordBookNum)
            .finally(() => {
              this.button.loading = false;
            })
        }
      }
    },

    components: {
    }
  };
</script>

<template>
  <section class="col-12">
    <div class="g-main-form">
      <v-form ref="form"
              class="d-flex flex-column align-center justify-center">
        <v-text-field
            outlined
            rounded
            required
            prepend-inner-icon="search"
            label="Номер зачётки"
            :rules="[v => !!v || 'Данное поле обязательно']"
            v-model="recordBookNum"
        />
        <v-btn
            rounded
            large
            :disabled="button.loading"
            :loading="button.loading"
            @click="findRating"
            color="primary">
          Искать
        </v-btn>
      </v-form>
    </div>

    <v-row justify="center" class="d-none mt-10">
      <v-col class="table-wrapper">
        <v-card class="mb-5">
          <v-card-title class="d-flex justify-center">Средний рейтинг: {{ averageRating }}</v-card-title>
        </v-card>

        <table class="table">
          <tbody>
            <tr v-for="(lesson, index) in table" :key="index">
              <td>
                {{ lesson.name }}
              </td>
              <td v-for="(lessonData, lessonIndex) in lesson.data" :key="lessonIndex">
                {{ lessonData }}
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </section>
</template>

<style scoped lang="scss">
  .table {

    &-wrapper {
      overflow: auto;
    }

    td {
      border: 1px solid #eeee;
      padding: 4px;

      &:not(:first-of-type) {
        text-align: center;
      }
    }

    @media screen and (max-width: 600px) {
      td {
        min-width: 300px;

        &:not(:first-of-type) {
          min-width: 70px;
        }
      }
    }
  }
</style>
