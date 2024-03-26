import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
      children:[{
        path:'/demo',
        name:'demo',
        component:()=>import('../views/demo.vue')
      }]
    },
  ]
})

export default router
