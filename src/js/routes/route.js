import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import NotFound from '../components/global/NotFound'
import Rating from '../components/pages/Rating'
import Schedule from "../components/pages/Schedule";

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
          component: Rating,
          name: 'Rating',
        },
        {
          path: '/schedule',
          component: Schedule,
          name: 'Schedule',
        }
        ]
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
