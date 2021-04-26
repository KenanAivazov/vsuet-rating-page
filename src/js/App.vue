<script>
  export default {
    data: () => ({
      navMenu: false
    }),
    asyncData({ store }) {
    },
    computed: {
    },
    methods: {
    },
    components: {
    },
    mounted() {

    }
  };
</script>
<template>
  <v-app class="fill-height">
    <main class="fill-height">
      <v-content class="fill-height">
        <v-container fill-height fluid>
          <v-layout>
            <router-view />
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>
