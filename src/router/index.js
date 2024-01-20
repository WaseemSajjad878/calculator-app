import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresAuth: false,
        title: 'Home Page',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        requiresAuth: true,
        title: 'Dashboard',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LogIn.vue'),
      meta: {
        requiresAuth: false,
        title: 'Login',
      },
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/views/auth/SignUp.vue'),
      meta: {
        requiresAuth: false,
        title: 'SignUp',
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('_token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (!to.meta.requiresAuth && token) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
})

export default router
