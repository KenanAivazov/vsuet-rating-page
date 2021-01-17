import Vue from 'vue'
import store from './store/index'
import router from './routes/route'
import asyncData from './store/utils/asyncData'
import { Ripple } from 'vuetify/lib/directives'
import {VueMaskDirective} from 'v-mask'
import Vuetify, {
  VApp,
  VTextField,
  VBtn,
  VCard,
  VDialog,
  VSpacer,
  VNavigationDrawer,
  VContent,
  VContainer,
  VIcon,
  VLayout,
  VList,
  VListItemGroup,
  VListItem,
  VListItemAvatar,
  VAppBar,
  VAppBarNavIcon,
  VTooltip,
  VSubheader,
  VRow,
  VCol,
  VDataTable,
  VToolbarTitle,
  VCardText,
  VCardTitle,
  VListItemTitle,
  VListItemContent,
  VListItemSubtitle,
  VFileInput,
  VToolbar,
  VForm,
  VCardActions,
  VSelect,
  VTabs,
  VTab,
  VFadeTransition,
  VImg,
} from 'vuetify/lib'

import ru from 'vuetify/es5/locale/ru'

// vuetify
Vue.use(Vuetify, {
  components: {
    VApp,
    VTextField,
    VBtn,
    VCard,
    VDialog,
    VSpacer,
    VNavigationDrawer,
    VContent,
    VContainer,
    VIcon,
    VLayout,
    VList,
    VListItemGroup,
    VListItem,
    VListItemAvatar,
    VAppBar,
    VAppBarNavIcon,
    VTooltip,
    VSubheader,
    VRow,
    VCol,
    VDataTable,
    VToolbarTitle,
    VCardText,
    VCardTitle,
    VListItemTitle,
    VListItemContent,
    VListItemSubtitle,
    VFileInput,
    VToolbar,
    VForm,
    VSelect,
    VCardActions,
    VTabs,
    VTab,
    VFadeTransition,
    VImg,
  },
  directives: {
    Ripple
  }
});

Vue.directive('mask', VueMaskDirective);

const vuetifyOptions = {
  icons: {
    iconfont: 'md'
  },

  lang: {
    locales: {
      ru
    },

    current: 'ru'
  }
};

Vue.config.devtools = true;

router.beforeResolve(asyncData({ store, router }));

const vm = new Vue({
  el: "#app",
  vuetify: new Vuetify(vuetifyOptions),
  router,
  store,
  render: h => h('router-view'),
});
