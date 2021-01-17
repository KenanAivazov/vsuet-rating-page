<script>
  import { mapActions, mapState } from 'vuex';


  export default {
    data: () => ({
      faculty: [
        'УИТС'
      ],
      group: [
          'У-205'
      ],
      formValid: false,

      student: JSON.parse(localStorage.getItem('studentData')) || {
        recordBookNum: undefined,
        facultyName: undefined,
        group: undefined
      },

      buttonLoading: false
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
      ...mapActions([
          'getRating',
      ]),

      async findRating() {
        if ( this.$refs.form.validate() ) {
          console.log(this.student)

          this.buttonLoading = true;

          this.getRating(this.student)
            .finally(_ => {
              this.buttonLoading = false;
            })

        }
      },

      saveData() {
        localStorage.setItem('studentData', JSON.stringify(this.student));

        alert('Данные успешно сохранены! Теперь форма будет сама заполняться')
      }
    },

    components: {
    }
  };
</script>

<template>
  <section class="col-12">
    <v-row justify="center">
      <v-col md="6" sm="12">
        <v-card>
          <v-card-text>
            <v-form ref="form">
              <v-select
                  label="Факультет"
                  filled
                  required
                  :rules="[v => !!v || 'Данное поле обязательно']"
                  v-model="student.facultyName"
                  :items="faculty"
              />

              <v-select
                  label="Группа"
                  filled
                  required
                  :rules="[v => !!v || 'Данное поле обязательно']"
                  v-model="student.group"
                  :items="group"
              />

              <v-text-field
                  filled
                  required
                  label="Номер зачётки"
                  :rules="[v => !!v || 'Данное поле обязательно']"
                  v-model="student.recordBookNum"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :disabled="buttonLoading" :loading="buttonLoading" class="d-block ml-auto mr-auto" @click="findRating" rounded>
              Искать
            </v-btn>
            <v-btn color="primary" class="d-block ml-auto mr-auto" @click="saveData" rounded>
              Сохранить данные
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-10">
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
