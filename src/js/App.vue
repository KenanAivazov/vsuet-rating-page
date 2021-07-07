<script>
  import WelcomeModal from "./components/global/WelcomeModal";
  import {mapState} from "vuex";

  export default {
    data: () => ({
      activeRouter: '',
    }),
    methods: {
    },
    computed: {
      ...mapState(['userInfo'])
    },
    components: {
      WelcomeModal
    },
    mounted() {
      console.log(this.userInfo)
      this.activeRouter = this.$route.name.toLowerCase();
    }
  };
</script>
<template>
  <v-app class="fill-height">
    <v-content class="fill-height">
      <v-container fill-height fluid>
        <v-layout>
          <router-view />
        </v-layout>
      </v-container>
    </v-content>

    <v-bottom-navigation
        app
        color="indigo"
        grow
        v-model="activeRouter"
        fixed
    >
      <router-link value="rating" :to="{ name: 'Rating' }" tag="v-btn">
        <span class="mt-1">
          Рейтинг
        </span>

        <v-icon>
          stars
        </v-icon>
      </router-link>

      <router-link value="schedule" :to="{ name: 'Schedule' }" tag="v-btn">
        <span class="mt-1">
          Расписание
        </span>

        <v-icon>
          calendar_today
        </v-icon>
      </router-link>
    </v-bottom-navigation>

    <portal-target name="modal" />

    <welcome-modal />
  </v-app>
</template>