import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/AutoPianoPC.vue')
  },
  {
    path: '/links',
    name: 'FriendLinks',
    component: () => import('../pages/FriendLinks.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router