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

    <v-row justify="center" class="mt-10">
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
        class="g-main-table"
        v-for="(rating, ratingIndex) in table"
        :key="ratingIndex"
    >
      <v-col class="table-wrapper">
        <h2 class="mb-5">
          <a :href="rating.lesson.href" target="_blank">
            {{ rating.lesson.name }}
          </a>
          <br>
          {{ rating.lesson.type }}
        </h2>
        <table ref="table" class="table">
          <thead>
            <tr v-for="(ratingHeader) in rating.lesson.header">
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
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
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

  .table {
    border-collapse: collapse;
    overflow: hidden;

    &-wrapper {
      overflow: auto;
      margin-right: 10px;
    }

    thead {
      tr {
        &:nth-of-type(1) {
          td:nth-of-type(1), td:nth-of-type(2), td:nth-of-type(3) {
            display: none;
          }
        }

        &:last-of-type {
          td {
            border-bottom-color: #000;
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
          min-width: 50px;
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

    tbody {
      td {
        border-color: #000;
      }
    }

    &-item {
      &-primary {
        color: #fff;
        border-color: #757575 !important;
        background-color: #757575;
      }
    }
  }
</style>
