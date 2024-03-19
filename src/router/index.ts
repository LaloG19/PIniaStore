import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import UsuarioView from '@/views/UsuarioView.vue'
import RegistroView from '@/views/RegistroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/usuario/:id',
      name: 'usuario',
      component: UsuarioView
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView
    }
  ]
})

export default router
