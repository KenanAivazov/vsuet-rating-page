<script>
  import {mapActions, mapMutations, mapState} from 'vuex';
  import TableCard from '../global/table/view/Card';
  import TableSimple from '../global/table/view/Simple';

  export default {
    data: () => ({
      recordBookNum: '' || localStorage.getItem('recordBookNum'),
      lsRecordBook: localStorage.getItem('recordBookNum'),
      appVersion: process.env.VERSION,
      isVersus: false,
      button: {
        loading: false
      },
      studentGroup: null,
      viewName: 'table-card'
    }),

    computed: {
      ...mapState({
        table: state => state.rating.table,
        student: state => state.rating.student,
        tableHeader: state => state.rating.tableHeader,
      })
    },

    components: {
      TableCard,
      TableSimple
    },

    methods: {
      ...mapActions({
        getRating: 'rating/get',
        getRatingByGroup: 'rating/getByGroup'
      }),

      ...mapMutations({
        unique: 'UNIQUE_SET'
      }),

      saveUserRecordNum() {
        localStorage.setItem('recordBookNum', this.recordBookNum);

        if (localStorage.getItem('recordBookNum')) {
          alert('Номер зачётки успешно сохранён! Теперь при заходе на сайт вам не нужно будет вводить номер зачётки повторно')
        }
      },

      clearUserRecordNum() {
        localStorage.removeItem('recordBookNum');

        if (!localStorage.getItem('recordBookNum')) {
          alert('Номер зачётки успешно удалён из локального хранилища!')
        }
      },

      findRating() {
        if ( this.$refs.form.validate() ) {
          this.button.loading = true;
          this.getRating({
            recordBookNum: this.recordBookNum
          })
              .catch(() => {
                this.button.loading = false;
              })
              .finally(() => {
                this.button.loading = false;
              })
        }
      },

      changeStudentGroup() {
        this.getRatingByGroup(this.studentGroup);
      },

      parseDate(date) {
        return (new Date(date)).toLocaleString('ru-RU')
      },

      changeDataView(component) {
        this.viewName = component
      }
    },
  };
</script>

<template>
  <section class="width-full">
    <div class="d-flex align-center justify-center g-main-wrapper mt-5">
      <div class="g-main-form">
        <v-form ref="form"
                @submit.prevent="findRating"
                class="d-flex flex-column align-center justify-center">
          <v-text-field
              outlined
              rounded
              required
              hide-details
              append-icon="search"
              @click:append="findRating"
              label="Номер зачётки"
              :loading="button.loading"
              :disabled="button.loading"
              :rules="[v => !!v || 'Данное поле обязательно']"
              v-model="recordBookNum"
          />
        </v-form>
        <p class="caption mt-3 mb-0" v-if="!table.length">
          <b>Обновление информации</b> с
          <a href="http://rating.vsuet.ru/web/Ved/Default.aspx?ref=rating.kenan.agency" target="_blank" rel="noreferrer noopener">оф. сайта</a>
          происходит 2 раза в день: в <b>12:00</b> и <b>00:00</b> (сбор данных занимает примерно час, но зачастую 45-50 минут). Во время обновления информации
          <b>сервис не будет выполнять поиск</b>!
        </p>
      </div>
    </div>

    <v-row justify="center" class="mt-5" v-if="student && student.recordBookNum">
      <v-col md="6">
        <v-card class="mb-5">
          <v-card-title>Карточка студента</v-card-title>
          <v-card-subtitle class="mt-1">
            <p class="mb-2">Номер зачётки: {{ student.recordBookNum }}</p>
            <p class="mb-2">Факультет: {{ student.faculty.name }}</p>
            <p class="mb-2" v-if="student.groups.length >= 2">
              <v-select v-model="studentGroup"
                        :items="student.groups"
                        @change="changeStudentGroup"
                        item-text="name">
                <template v-slot:prepend>
                  Группа:
                </template>
              </v-select>
            </p>
            <p class="mb-2" v-else>
              Группа: {{ student.groups[0].name }}
            </p>
            <p class="mb-2">Дата обновления: {{ parseDate(student.ratingUpdatedAt) }}</p>
            <p class="mb-0">
              Made by <a target="_blank" href="https://vk.com/kenan_aivazov">Kenan Ayvazov</a>
            </p>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="saveUserRecordNum">
              Сохранить
            </v-btn>
            <v-spacer />
            <v-btn
                color="primary"
                v-if="lsRecordBook"
                outlined
                @click="clearUserRecordNum">
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row
        justify="center"
        ref="table"
    >
      <v-col class="table-wrapper" v-if="table.length">
        <div class="d-flex justify-center mb-4">
          <v-btn
              color="primary"
              :outlined="viewName !== 'table-card'"
              class="mr-2"
              @click="changeDataView('table-card')"
              large
          >
            Карточки
          </v-btn>

          <v-btn
              color="primary"
              :outlined="viewName !== 'table-simple'"
              large
              @click="changeDataView('table-simple')"
          >
            Таблица
          </v-btn>
        </div>

        <component :is="viewName" :data="table" />
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

          td {
            &:nth-child(20) {
              @media screen and (max-width: 600px) {
                min-width: 60px;
              }
            }
          }
        }
      }

      td {
        min-width: 60px;
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
