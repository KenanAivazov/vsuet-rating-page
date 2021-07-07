import Vue from 'vue'
import store from './store/index'
import router from './routes/route'
import asyncData from './store/utils/asyncData'
import { Ripple } from 'vuetify/lib/directives'
import {VueMaskDirective} from 'v-mask'
import PortalVue from 'portal-vue'
import Vuetify, {
  VApp,
  VTextField,
  VSelect,
  VBtn,
  VCard,
  VCardSubtitle,
  VDialog,
  VSpacer,
  VContent,
  VContainer,
  VLayout,
  VTooltip,
  VRow,
  VCol,
  VCardText,
  VCardTitle,
  VCardActions,
  VForm,
  VChip,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelHeader,
  VExpansionPanelContent,
  VBottomNavigation,
  VIcon,
  VBottomSheet,
  VSheet,
} from 'vuetify/lib'

import ru from 'vuetify/es5/locale/ru'

// vuetify
Vue.use(Vuetify, {
  components: {
    VApp,
    VTextField,
    VSelect,
    VBtn,
    VCard,
    VCardSubtitle,
    VDialog,
    VSpacer,
    VContent,
    VContainer,
    VLayout,
    VTooltip,
    VRow,
    VCol,
    VCardText,
    VCardTitle,
    VCardActions,
    VForm,
    VChip,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelHeader,
    VExpansionPanelContent,
    VBottomNavigation,
    VIcon,
    VBottomSheet,
    VSheet,
  },
  directives: {
    Ripple
  }
});
Vue.use(PortalVue);

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
