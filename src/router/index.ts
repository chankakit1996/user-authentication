import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { repo } from '../config/config'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: undefined,
    redirect: ''
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/',
  },
]
const router = createRouter({
  history: process.env.NODE_ENV === 'production' ? createWebHistory() : createWebHistory(`/${repo}/`),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})
export default router