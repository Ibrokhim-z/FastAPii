// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../views/Shop.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { user } from '../stores/auth.js'

const routes = [
  { path: '/', component: Shop },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Защита: если не вошёл — кидаем на /login
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register' && !user.value) {
    next('/login')
  } else {
    next()
  }
})

export default router