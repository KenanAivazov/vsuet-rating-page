<template>
  <v-bottom-sheet persistent v-model="welcomeModal">
    <v-sheet rounded>
      <v-card class="pb-3">
        <v-card-title>
          Информация о студенте
        </v-card-title>
        <v-card-subtitle class="caption">
          Заполните информацию о себе, да бы не нужно было каждый раз её вводить.
          Данная информация будет хранится <strong>только</strong> на вашем устройстве
        </v-card-subtitle>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
                label="Номер зачётной книжки"
                inputmode="numeric"
                maxlength="6"
                :rules="[
                  v => !!v || 'Обязательное поле',
                  v => /^\d+$/.test(v) || 'Номер зачётной книжки должно состоять из цифр',
                  v => (v && String(v).length === 6) || 'Номер зачётной книжки не может быть меньше 6 символов',
                ]"
                required
                v-model.number="student.number"
            ></v-text-field>

            <v-text-field
                label="Номер подгруппы"
                inputmode="numeric"
                maxlength="1"
                :rules="[
                  v => !!v || 'Обязательное поле',
                ]"
                required
                v-model.number="student.subgroup"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="saveStudentInfo" color="primary">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "WelcomeModal",
  data: () => ({
    student: {
      number: null,
      subgroup: null
    }
  }),
  computed: {
    ...mapState([
      'welcomeModal'
    ])
  },
  methods: {
    ...mapMutations({
      closeModal: 'UNIQUE_SET'
    }),
    saveStudentInfo() {
      if (this.$refs.form.validate()) {
        localStorage.setItem('studentInfo', JSON.stringify(this.student));

        this.closeModal({
          name: 'welcomeModal',
          value: false
        })

        alert('Информация сохранена!')
      }
    }
  }
}
</script>