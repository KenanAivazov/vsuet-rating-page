<script>
  import {mapActions, mapMutations, mapState} from 'vuex';

  export default {
    data: () => ({
      recordBookNum: '',
      isVersus: false,
      button: {
        loading: false
      },

      buttonVersus: {
        loading: false
      }
    }),

    computed: {
      ...mapState({
        table: state => state.rating.table,
        student: state => state.rating.student,
        tableHeader: state => state.rating.tableHeader,
      })
    },

    methods: {
      ...mapActions({
        getRating: 'rating/get'
      }),

      ...mapMutations({
        unique: 'UNIQUE_SET'
      }),

      findRating() {
        if ( this.$refs.form.validate() ) {
          this.button.loading = true;
          this.getRating({
            recordBookNum: this.recordBookNum
          })
            .finally(() => {
              this.button.loading = false;
            })
        }
      },

      detectStage(rating) {
        if ( Number(rating) ) {
          rating = Number(rating);

          if (rating >= 85) return 1
          else if (rating >= 75 && rating <= 84) return 2
          else if (rating <= 74) return 3
        }

        if (rating === 'Отл') return 1
        else if (rating === 'Хор') return 2
        else if (rating === 'Удовл') return 3
        else if (rating === 'Зачет') return 4

        return false
      },

      getColor(rating) {
        switch(this.detectStage(rating)) {
          case 1:
            return 'green'
          case 2:
            return 'orange'
          case 3:
            return 'red'
          case 4:
            return 'green'
        }
      },

      hideHeaderElements(item, index) {
        return [1].includes(index) && !item.text.includes('Итог по') && !item.text.includes('Экзамен');
      }
    },
  };
</script>

<template>
  <section class="width-full">
    <div class="d-flex align-center justify-center g-main-wrapper mt-5">
      <div class="g-main-form">
        <p class="mt-0 body-1 mb-3">
          Made by <a target="_blank" href="https://vk.com/kenan_aivazov">Kenan Ayvazov</a>
        </p>
        <p class="body-1 mt-0 mb-5">Версия: 2.1.0</p>
        <v-form ref="form"
                @submit.prevent="findRating"
                class="d-flex flex-column align-center justify-center">
          <v-text-field
              outlined
              rounded
              required
              prepend-inner-icon="search"
              label="Номер зачётки"
              :loading="button.loading"
              :disabled="button.loading"
              :rules="[v => !!v || 'Данное поле обязательно']"
              v-model="recordBookNum"
          />
        </v-form>
      </div>
    </div>

    <v-row justify="center" class="mt-5">
      <v-col md="4">
        <v-card class="mb-5" v-if="student && student.recordBookNum">
          <v-card-title>Карточка студента</v-card-title>
          <v-card-subtitle class="mt-1">
            <p class="mb-2">Номер зачётки: {{ student.recordBookNum }}</p>
            <p class="mb-2">Факультет: {{ student.faculty.name }}</p>
            <p class="mb-2">Группа: {{ student.group.name }}</p>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row
        justify="center"
        ref="table"
    >
      <v-col class="table-wrapper">
        <v-expansion-panels focusable popout>
          <v-expansion-panel
              v-for="(rating, ratingIndex) in table"
              :key="ratingIndex"
          >
            <v-expansion-panel-header>
              <div class="table-header">
                <h3 class="mb-0">
                  {{ rating.lesson.name }}
                </h3>
                <h4 class="mt-2 mb-0">
                  {{ rating.lesson.type }}
                </h4>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="mt-3">
                <a :href="rating.lesson.href" target="_blank" class="d-block mb-3">Оригинал</a>

                <table ref="table" class="table">
                  <thead>
                  <tr
                      v-for="(ratingHeader, ratingHeaderIndex) in rating.lesson.header"
                  >
                    <td
                        v-for="(headerItem, headerItemIndex) in ratingHeader.children"
                        :key="headerItemIndex"
                        :rowspan="headerItem.rowSpan"
                        :colspan="headerItem.colSpan"
                        :hidden="!headerItem.text"
                        :class="[
                    {
                      'table-item-primary': headerItem.text.includes('Итог по')
                    },

                  ]"
                    >
                      {{ headerItem.text }}
                    </td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td
                        v-for="(value, valueIndex) in rating.value"
                        :key="valueIndex"
                    >
                      <v-chip :color="getColor(value)">
                        {{ value }}
                      </v-chip>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss">
  .v-application {
    a {
      color: #d72a2a !important;
    }
  }

  .v-expansion-panel-content__wrap {
    overflow-y: auto;
  }

  .v-expansion-panels--popout>.v-expansion-panel {
    max-width: 100%;
  }

  .table {
    border-collapse: collapse;
    overflow: hidden;

    &-header {
      position: sticky;
      left: 0;

      h3 {
        color: #d72a2a;
      }
    }

    &-wrapper {
      overflow: auto;
    }

    thead {
      tr {
        &:nth-of-type(1) {
          td:nth-of-type(1), td:nth-of-type(2), td:nth-of-type(3) {
            display: none;
          }
        }
      }

      td {
        min-width: 70px;
        font-size: 12px;
        text-align: center;

        &:empty {
          display: none;
        }

        @media screen and (max-width: 600px) {
          min-width: 40px;
        }
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
      text-align: center;

      .v-chip.v-size--default {
        font-size: 12px;
      }

      a {
        line-height: 1.2;
      }
    }

    &-item {
      &-primary {
        color: #fff;
        border-color: #757575 !important;
        background-color: #757575;

        @media screen and (max-width: 600px) {
          min-width: 60px !important;
        }
      }

      &-hidden {
        opacity: 0;
        border-color: transparent !important;
      }
    }
  }
</style>
