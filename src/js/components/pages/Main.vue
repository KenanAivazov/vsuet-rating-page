<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    data: () => ({
      recordBookNum: '',
      button: {
        loading: false
      },
      headers: [
        {
          text: 'Предмет',
          value: 'lessonName'
        },
        {
          text: 'Лек.',
          value: '0'
        },
        {
          text: 'Пр.',
          value: '1'
        },
        {
          text: 'Лаб',
          value: '2'
        },
        {
          text: 'Др.',
          value: '3'
        },
        {
          text: 'Итог, 1 КТ',
          value: '4'
        },
        {
          text: 'Лек.',
          value: '5'
        },
        {
          text: 'Пр.',
          value: '6'
        },
        {
          text: 'Лаб',
          value: '7'
        },
        {
          text: 'Др.',
          value: '8'
        },
        {
          text: 'Итог, 2 КТ',
          value: '9'
        },
        {
          text: 'Лек.',
          value: '10'
        },
        {
          text: 'Пр.',
          value: '11'
        },
        {
          text: 'Лаб',
          value: '12'
        },
        {
          text: 'Др.',
          value: '13'
        },
        {
          text: 'Итог, 3 КТ',
          value: '14'
        },
        {
          text: 'Лек.',
          value: '15'
        },
        {
          text: 'Пр.',
          value: '16'
        },
        {
          text: 'Лаб',
          value: '17'
        },
        {
          text: 'Др.',
          value: '18'
        },
        {
          text: 'Итог, 4 КТ',
          value: '19'
        },
        {
          text: 'Лек.',
          value: '20'
        },
        {
          text: 'Пр.',
          value: '21'
        },
        {
          text: 'Лаб',
          value: '22'
        },
        {
          text: 'Др.',
          value: '23'
        },
        {
          text: 'Итог, 5 КТ',
          value: '24'
        },
        {
          text: 'Надбавка',
          value: '25'
        },
        {
          text: 'Итоговый рейтинг',
          value: '26'
        },
        {
          text: 'Оценка по рейтингу',
          value: '27'
        },
        {
          text: 'Зачёт',
          value: '28'
        },
        {
          text: 'Итог',
          value: '29'
        },
        {
          text: 'Закрыто',
          value: 'isClose'
        }
      ]
    }),
    asyncData({ store }) {
    },

    computed: {
      ...mapState({
        table: state => state.rating.table,
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
              this.$refs.table.scrollIntoView({
                behavior: "smooth"
              });
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
    <div class="fill-height d-flex align-center justify-center g-main-wrapper">
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
          <p class="mt-5 body-1">
            Made with ❤ by <a target="_blank" href="https://vk.com/kenan_aivazov">Kenan Ayvazov</a>
          </p>
        </v-form>
      </div>
    </div>

    <v-row justify="center" ref="table" class="g-main-table">
      <v-col class="table-wrapper">
        <v-data-table
            v-if="table.length"
            :headers="headers"
            :items="table"
            hide-default-footer
        ></v-data-table>
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
