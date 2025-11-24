<template>
  <div class="auth">
    <h2>Вход</h2>
    <input v-model="email" placeholder="Email" type="email" />
    <input v-model="password" placeholder="Пароль" type="password" />
    <button @click="doLogin">Войти</button>
    <p>Нет аккаунта? <router-link to="/register">Регистрация</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { login } from '../stores/auth.js'

const email = ref('')
const password = ref('')
const router = useRouter()

const doLogin = async () => {
  try {
    const res = await axios.post('/api/login', { email: email.value, password: password.value })
    login(res.data.user, res.data.token)
    router.push('/')
  } catch {
    alert('Неправильный логин или пароль')
  }
}
</script>