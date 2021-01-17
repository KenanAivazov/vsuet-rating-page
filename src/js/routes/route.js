import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import NotFound from '../components/global/NotFound'
import Main from '../components/pages/Main'

// store
import store from '../store/index'

// middleware
import role from './middleware/role'

Vue.use(VueRouter);

const router = new VueRouter({
  base: '/',
  // remove comments for production tip
  // mode: 'history',
  routes: [{
      path: '/',
      component: App,
      children: [
        {
          path: '/',
          component: Main,
          icon: 'home',
          name: 'main',
          title: 'Главная',
        }]
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
});


export default router;
