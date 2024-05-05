import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Operate/index.vue'
import Test from '../pages/Test/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
