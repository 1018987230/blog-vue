import { createRouter,createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    mode:'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import(/*webpackChunkName: "home" */ '../views/front/index.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/*webpackChunkName: "home" */ '../views/front/login.vue')
        },
        {
            path: '/edit',
            name: 'edit',
            component: () => import(/*webpackChunkName: "home" */ '../views/front/edit.vue')
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import(/*webpackChunkName: "home" */ '../views/front/detail.vue')
        },
    ]
})
export default router