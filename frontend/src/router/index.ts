import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { repo } from '../config/config';
import Register from '../view/Register.vue';
import Login from '../view/Login.vue';
import ResetPassword from '../view/ResetPassword.vue';
import Admin from '../view/Admin.vue';
import PageNotFound from '../view/PageNotFound.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
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
        component: Admin,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: PageNotFound,
    },
];
const router = createRouter({
    history:
        process.env.NODE_ENV === 'production'
            ? createWebHistory(`${repo}`)
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

router.beforeEach((to, from) => {
    if (to.path)
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        return {
            path: '/login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        };
    }
});
export default router;
