<script>

  export default {
    data: () => ({
      navMenu: false
    }),
    asyncData({ store }) {
    },
    computed: {


      nameRoute() {
        return this.$route.name
      },

      menu() {
        return this.$router.options.routes[0].children
      }
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
      <v-app-bar dark app color="primary">
        <v-app-bar-nav-icon @click.stop="navMenu = !navMenu"/>
        <v-toolbar-title>{{ nameRoute }}</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer app :fixed="true" v-model="navMenu">
        <v-list shaped>
          <v-subheader>Меню</v-subheader>
          <v-list-item-group>
            <v-list-item v-for="(item, index) in menu" color="primary" :key="`${item.name}_${index}`" @click="$router.push(item.path)">
              <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
<!--            <v-list-item  color="error" @click="exit">-->
<!--              <v-list-item-avatar>-->
<!--                <v-icon>exit_to_app</v-icon>-->
<!--              </v-list-item-avatar>-->
<!--              <v-list-item-content>-->
<!--                <v-list-item-title>-->
<!--                  Выход-->
<!--                </v-list-item-title>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

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
