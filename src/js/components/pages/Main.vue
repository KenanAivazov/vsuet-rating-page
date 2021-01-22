<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    data: () => ({
      recordBookNum: '',
      button: {
        loading: false
      },
    }),
    asyncData({ store }) {
    },

    computed: {
      ...mapState({
        table: state => state.rating.table,
        student: state => state.rating.student,
        averageRating: state => state.averageRating,
        tableHeader: state => state.rating.tableHeader
      })
    },

    methods: {
      ...mapActions({
        getRating: 'rating/get'
      }),

      getColor(rating) {
        switch(this.detectStage(rating)) {
          case 1:
            return 'green'
          case 2:
            return 'orange'
          case 3:
            return 'red'
          case 4:
            return 'white'

        }
      },

      detectStage(rating) {
        if ( Number(rating) ) {
          rating = Number(rating);

          if (rating >= 85) return 1
          else if (rating >= 75 && rating <= 84) return 2
          else if (rating <= 74) return 3
        }

        return 4
      },

      getText(rating) {
        switch(this.detectStage(rating)) {
          case 1:
            return 'Молодец! Продолжай в том же духе :)'
          case 2:
            return 'Неплохо, но тыч можешь лучше'
          case 3:
            return 'Попробуй поговорить с преподавателем и исправить данную точку. Я думаю у тебя выйдет исправить :)'
          case 4:
            return 'Пусто :('
        }
      },

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
    <div class="d-flex align-center justify-center g-main-wrapper">
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
            Made by <a target="_blank" href="https://vk.com/kenan_aivazov">Kenan Ayvazov</a>
          </p>
        </v-form>
      </div>
    </div>

    <v-row justify="center" class="mt-10">
      <v-col lg="4" md="3">
        <v-card class="mb-5" v-if="student && student.recordBookNum">
          <v-card-title>Карточка студента</v-card-title>
          <v-card-subtitle class="mt-1">
            <p class="mb-2">Номер зачётки: {{ student.recordBookNum }}</p>
            <p class="mb-2">Факультет: {{ student.faculty.name }}</p>
            <p>Группа: {{ student.group.name }}</p>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" ref="table" class="g-main-table">
      <v-col class="table-wrapper">
        <table ref="table" class="table" v-if="table.length">
          <thead>
            <tr>
              <td>
                Предмет
              </td>
              <td v-for="(itemHeader, headerIndex) in tableHeader" :key="headerIndex">
                {{ itemHeader.type }} <br>
                {{ itemHeader.weight }}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(lesson, index) in table" :key="index">
              <td>
                <a :href="`${lesson.href}?ref=vsuet-kenan-rating`" target="_blank" rel="noopener">
                  {{ lesson.lessonName }}
                </a>
              </td>
              <td v-for="(lessonData, lessonIndex) in lesson.value" :key="lessonIndex">
                <v-tooltip top>
                  <span>
                    {{ getText(lessonData.value) }}
                  </span>

                  <template v-slot:activator="{ on, attrs }">
                    <v-chip v-bind="attrs"
                            v-on="on"
                            :color="getColor(lessonData.value)">
                      {{ lessonData.value }}
                    </v-chip>
                  </template>
                </v-tooltip>
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
    border-collapse: collapse;

    &-wrapper {
      overflow: auto;
    }

    thead {
      td {
        font-size: 12px;
        text-align: center;
      }
    }

    tr {
      td {
        &:first-of-type {
          padding: 6px 10px;
        }
      }
    }

    td {
      border: 2px solid #eeee;
      padding: 6px;
      font-size: 12px;

      .v-chip.v-size--default {
        font-size: 12px;
      }

      a {
        line-height: 1.2;
      }

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
