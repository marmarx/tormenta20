import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: ['/home','/inicio','/início'],
      component: Home,
    },
    {
      path: '/personagem',
      name: 'personagem',
      alias: ['/character','/char'],
      component: () => import('@/views/char.vue')
    },
    {
      path: '/magias',
      name: 'magias',
      component: () => import('@/views/spells.vue')
    },
    {
      path: '/magias/:id',
      name: 'magiasId',
      alias:['/magias/:id/editar','/magias/:id/edit'],
      component: () => import('@/views/spells.vue')
    }
  ],
})

export default router
