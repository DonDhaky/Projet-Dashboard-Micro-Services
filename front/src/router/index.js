import { createRouter, createWebHistory } from 'vue-router';
import LoginRegister from '../views/LoginRegister.vue';

const routes = [
  {
    path: '/',
    name: 'LoginRegister',
    component: LoginRegister
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
