import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { repo } from '../config/config';
import Register from '../view/Register.vue';
import Login from '../view/Login.vue';
import ResetPassword from '../view/ResetPassword.vue';
import Admin from '../view/Admin.vue';

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     component: MainPage,
    // },
    {
        name: 'register',
        path: '/register',
        component: Register,
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
    },
    {
        name: 'reset-password',
        path: '/reset-password',
        component: ResetPassword,
    },
    {
        name: 'admin',
        path: '/admin',
        component: Admin
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/login',
    },
];
const router = createRouter({
    history:
        process.env.NODE_ENV === 'production'
            ? createWebHistory(`/${repo}/`)
            : createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            el: '#app',
            top: 0,
            behavior: 'smooth',
        };
    },
});
export default router;
