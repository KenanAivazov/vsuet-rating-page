<template>
  <div>
    <div
        v-for="(rating, ratingIndex) in data"
        class="mt-4"
        :key="ratingIndex">
      <table ref="table" class="table">
        <thead>
          <tr
              v-for="(ratingHeader, ratingHeaderIndex) in rating.lesson.header"
          >
            <td></td>
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
            <td>
              <p class="text-left mb-0">
                {{ rating.lesson.name }}
                <br>
                <b>{{ rating.lesson.type }}</b>
                <br>
                <a :href="rating.lesson.href" target="_blank" class="d-block mt-3">Оригинал</a>
              </p>
            </td>
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
  </div>
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
  }
}
</script>

<style scoped lang="scss">
  .table {
    position: relative;

    thead {
      tr:first-of-type {
        td:nth-of-type(4) {
          opacity: 0;
        }
      }
    }

    tbody {
      td {
        &:nth-of-type(1) {
          position: sticky;
          left: 0;
          top: 0;
          z-index: 1;
          min-width: 140px;
          max-width: 140px;
        }
      }
    }
  }
</style>