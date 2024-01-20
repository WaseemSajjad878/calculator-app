import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: () => import('@/views/Index.vue')
    // },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    },
  ]
})

export default router
