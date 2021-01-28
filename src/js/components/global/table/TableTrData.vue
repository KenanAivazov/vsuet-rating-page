<script>
  import { mapMutations } from "vuex";

  export default {
    name: "TableTrData",
    props: {
      lesson: Object,
      value: Object,
      lessonName: String,
    },
    data() {
      return {
        showMenu: false
      }
    },

    methods: {
      ...mapMutations({
        unique: 'UNIQUE_SET'
      }),

      openLink(href) {
        window.open(`${href}&ref=vsuet-kenan-rating`, '_blank')
      },

      parseDate(date) {
        return date ? new Date(date).toLocaleDateString('ru-Ru') : 'не указано'
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

      getText(rating) {
        switch(this.detectStage(rating)) {
          case 1:
            return 'Молодец! Продолжай в том же духе :)'
          case 2:
            return 'Неплохо, но ты можешь лучше'
          case 3:
            return 'Попробуй поговорить с преподавателем и исправить данную точку. Я думаю у тебя выйдет исправить :)'
          default:
            return 'Пусто :('
        }
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

      openGroupModal() {
        this.unique({
          name: 'modal',
          value: {
            active: true,
            content: 'GroupList',
            data: {
              header: 'Список одногруппников'
            }
          }
        })
      }
    }
  }
</script>

<template>
  <tr>
    <v-menu
        v-model="showMenu"
        absolute
        offset-y
    >
      <v-list>
        <v-list-item link>
          <v-list-item-title @click="openLink(lesson.href)">
            Открыть оригинал
          </v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title @click="openGroupModal">
            Сравнить рейтинг по <b>"{{ lessonName }}"</b> с другими одногруппниками
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:activator="{ on, attrs }">
        <td v-on="on"
            v-bind="attrs"
            class="g-pointer-el">
          <span>
            {{ lessonName }}
            <br>
            <b>
              {{ lesson.type }}
            </b>
            <br>
            Дата: {{ parseDate(lesson.createdTime) }}
          </span>
        </td>
      </template>
    </v-menu>
    <td v-for="(lessonData, lessonIndex) in value"
        :key="lessonIndex"
        :class="[
          {
            'table-item-primary': lessonData.type.includes('Итог по КТ')
          }
        ]"
    >
      <v-tooltip top>
        <span>
          {{ getText(lessonData.value) }}
        </span>

        <template v-slot:activator="{ on, attrs }">
          <v-chip v-bind="attrs"
                  v-on="on"
                  :color="`${getColor(lessonData.value)} lighten-1`">
            {{ lessonData.value }}
          </v-chip>
        </template>
      </v-tooltip>
    </td>
  </tr>
</template>

<style scoped>

</style>