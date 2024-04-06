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
        path:'/welcome',
        name:'welcome',
        component:()=>import('../views/pages/welcome.vue')
      },{
        path:'/answer',
        name:'answer',
        component:()=>import('../views/pages/answer.vue')
      }
      ]
    },
  ]
})

export default router
