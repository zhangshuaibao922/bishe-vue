import {createRouter, createWebHistory} from 'vue-router'
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
            path: '/creat',
            name: 'creat',
            component: () => import('../views/creat.vue'),
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/home.vue'),
            children: [{
                    path: '/welcome',
                    name: 'welcome',
                    component: () => import('../views/pages/welcome.vue')
                }, {
                    path: '/answer',
                    name: 'answer',
                    component: () => import('../views/pages/answer.vue')
                },
                {
                    path: '/school',
                    name: 'school',
                    component: () => import('../views/pages/school.vue')
                },
                {
                    path: '/class',
                    name: 'class',
                    component: () => import('../views/pages/class.vue')
                },
                {
                    path: '/student',
                    name: 'student',
                    component: () => import('../views/pages/student.vue')
                },
                {
                    path: '/authority',
                    name: 'authority',
                    component: () => import('../views/pages/authority.vue')
                },
                {
                    path: '/myclass',
                    name: 'myclass',
                    component: () => import('../views/pages/myclass.vue')
                },
                {
                    path: '/test',
                    name: 'test',
                    component: () => import('../views/pages/test.vue')
                },
                {
                    path: '/exam',
                    name: 'exam',
                    component: () => import('../views/pages/exam.vue')
                },
                {
                    path: '/score',
                    name: 'score',
                    component: () => import('../views/pages/score.vue')
                },
                {
                    path: '/setScore',
                    name: 'setScore',
                    component: () => import('../views/pages/setScore.vue')
                },
                {
                    path: '/getScore',
                    name: 'getScore',
                    component: () => import('../views/pages/getScore.vue')
                },
                {
                    path: '/seeScore',
                    name: 'seeScore',
                    component: () => import('../views/pages/seeScore.vue')
                },
                {
                    path: '/studentScore',
                    name: 'studentScore',
                    component: () => import('../views/pages/studenScore.vue')
                },
                {
                    path: '/oneStudent',
                    name: 'oneStudent',
                    component: () => import('../views/pages/oneStudent.vue')
                },
                {
                    path: '/teacher',
                    name: 'teacher',
                    component: () => import('../views/pages/teacher.vue')
                },
                {
                    path: '/studentInfo',
                    name: 'studentInfo',
                    component: () => import('../views/pages/studentInfo.vue')
                }
            ]
        },
    ]
})

export default router
