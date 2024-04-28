import { createRouter, createWebHistory } from 'vue-router'

import LoginRegister from '../views/LoginRegister.vue'
import DashboardConnected from '../views/DashboardConnected.vue'
import WidgetsConnected from '../views/WidgetsConnected.vue'

const routes = [
  {
    path: '/',
    name: 'LoginRegister',
    component: LoginRegister
  },

  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashboardConnected
  },

  {
    path: '/widgets',
    name: 'Widgets',
    component: WidgetsConnected
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
