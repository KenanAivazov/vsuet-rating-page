<template>
  <v-expansion-panels focusable popout>
    <v-expansion-panel
        v-for="(rating, ratingIndex) in data"
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
      <v-expansion-panel-content class="pt-3">
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
                      'table-item-primary': headerItem.text.includes('Итог')
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    name: "Card",
    props: {
      data: {
        type: Array
      }
    },

    methods: {
      detectStage(rating) {
        if ( Number(rating) ) {
          rating = Number(rating);

          if (rating >= 85) return 1
          else if (rating >= 75 && rating <= 84) return 2
          else if (rating <= 74) return 3
        }

        if (rating === 'Отл') return 1
        else if (rating === 'Хор') return 2
        else if (rating === 'Удовл' || rating === 'Неуд') return 3
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
    }
  }
</script>