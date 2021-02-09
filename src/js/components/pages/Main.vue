<script>
import {mapActions, mapMutations, mapState} from 'vuex';
  import TableTrData from "../global/table/TableTrData";

  export default {
    data: () => ({
      recordBookNum: '',
      secondRecordBookNum: '',
      isVersus: false,
      button: {
        loading: false
      },

      buttonVersus: {
        loading: false
      }
    }),
    asyncData({ store }) {
    },

    computed: {
      ...mapState({
        table: state => state.rating.table,
        student: state => state.rating.student,
        averageRating: state => state.averageRating,
        tableHeader: state => state.rating.tableHeader,
        actualDate: state => state.rating.actualDate
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
          this.getRating(this.recordBookNum)
            .finally(() => {
              this.button.loading = false;
              this.$refs.table.scrollIntoView({
                behavior: "smooth"
              });
            })
        }
      },

      getActualDate(date) {
        if (Array.isArray(date)) {
          return this.parseDate(date[date.length - 1])
        }

        return date
      },

      openDateModal() {
        this.unique({
          name: 'modal',
          value: {
            active: true,
            content: 'GroupList',
            data: {
              header: 'Сохранённые даты',
              type: 'date',
              list: this.student.ratingUpdatedAt
            }
          }
        })
      },

      parseDate(date) {
        return new Date(date).toLocaleDateString('ru-Ru', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        })
      }

    },

    components: {
      TableTrData
    }
  };
</script>

<template>
  <section class="width-full">
    <div class="d-flex align-center justify-center g-main-wrapper mt-10">
      <div class="g-main-form">
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
          <v-text-field
              outlined
              rounded
              required
              prepend-inner-icon="search"
              v-if="isVersus"
              label="Номер зачётки студента из вашей группы"
              :rules="[v => !!v || 'Данное поле обязательно']"
              v-model="secondRecordBookNum"
              @keypress.enter="studentVersus"
          />
          <div class="d-none width-full flex-grow-1 justify-center align-center flex-sm-row flex-column">
            <v-btn
                rounded
                large
                :disabled="button.loading"
                :loading="button.loading"
                @click="findRating"
                class="mr-0 mr-sm-5 mb-5 mb-sm-0"
                color="primary">
              Искать
            </v-btn>
            <v-btn
                rounded
                large
                :disabled="buttonVersus.loading"
                :loading="buttonVersus.loading"
                @click="studentVersus"
                color="primary">
              Сравнить
            </v-btn>
          </div>
          <p class="mt-5 body-1">
            Made by <a target="_blank" href="https://vk.com/kenan_aivazov">Kenan Ayvazov</a>
          </p>
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
            <p>Последняя дата сбора данных: <b>{{ getActualDate(student.ratingUpdatedAt) }}</b></p>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn
                @click="openDateModal"
                color="primary">Сохранённые даты</v-btn>
          </v-card-actions>
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
              <td v-for="(itemHeader, headerIndex) in tableHeader"
                  :key="headerIndex"
                  :class="[
                    {
                      'table-item-primary': itemHeader.type.includes('Итог по КТ')
                    }
                  ]"
              >
                {{ itemHeader.type }} <br>
                <b>{{ itemHeader.weight }}</b>
              </td>
            </tr>
          </thead>
          <tbody>
            <table-tr-data
                v-for="(lesson, index) in table"
                :key="index"
                v-bind="lesson"
            ></table-tr-data>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss">
  .table {
    border-collapse: collapse;
    overflow: hidden;

    &-wrapper {
      overflow: auto;
      margin-right: 10px;
    }

    thead {
      td {
        min-width: 70px;
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

    &-item {
      &-primary {
        color: #fff;
        background-color: #757575;
      }
    }

    @media screen and (max-width: 600px) {
      td {
        min-width: 150px;

        &:not(:first-of-type) {
          min-width: 70px;
        }
      }
    }
  }
</style>
