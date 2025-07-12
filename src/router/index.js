import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Diagnose from '../views/Diagnose.vue';
import Tools from '../views/Tools.vue';
import Tutorials from '../views/Tutorials.vue';
import SpareParts from '../views/SpareParts.vue';
import Settings from '../views/Settings.vue';
import DeviceAdjustment from '../views/DeviceAdjustment.vue';

const routes = [
  {
    path: '/error',
    name: 'Error',
    component: () => import('../views/ErrorPage.vue')
  },
  {
    path: '/model',
    name: 'Model',
    component: () => import('../views/ModelView.vue')
  },
  { path: '/', component: Home },
  { path: '/diagnose', component: Diagnose },
  { path: '/tools', component: Tools },
  { path: '/tutorials', component: Tutorials },
  { path: '/spare-parts', component: SpareParts },
  { path: '/settings', component: Settings },
    { path: '/device-adjustment', component: DeviceAdjustment }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

export default router;