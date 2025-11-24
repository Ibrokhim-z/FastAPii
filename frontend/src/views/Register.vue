<template>
  <div class="auth">
    <h2>Регистрация</h2>
    <input v-model="name" placeholder="Имя" />
    <input v-model="email" placeholder="Email" type="email" />
    <input v-model="password" placeholder="Пароль" type="password" />
    <button @click="doRegister">Создать аккаунт</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { login } from '../stores/auth.js'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const doRegister = async () => {
  await axios.post('/api/register', {
    name: name.value,
    email: email.value,
    password: password.value
  })
  alert('Аккаунт создан! Теперь войдите')
  router.push('/login')
}
</script>