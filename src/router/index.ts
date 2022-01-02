import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/home',
  },
]
const router = createRouter({
  history: createWebHistory(''),
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