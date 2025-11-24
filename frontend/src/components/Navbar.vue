<template>
  <div class="navbar">
    <router-link to="/">Магазин</router-link>
    <div v-if="user">
      Привет, {{ user.name }}!
      <button @click="handleLogout">Выйти</button>
    </div>
    <div v-else>
      <router-link to="/login">Вход</router-link>
      <router-link to="/register">Регистрация</router-link>
    </div>
  </div>
</template>

<script setup>
import { user } from '../stores/auth.js'
import { useRouter } from 'vue-router'
import { logout } from '../stores/auth.js'   // это функция из auth.js

const router = useRouter()

const handleLogout = () => {
  logout()                    // вызываем функцию выхода
  router.push('/login')       // кидаем на страницу входа
}
</script>