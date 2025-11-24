// src/stores/auth.js
import { ref } from 'vue'

export const user = ref(null)           // null = никто не вошёл
export const token = ref(localStorage.getItem('token') || null)

export function login(userData, newToken) {
  user.value = userData
  token.value = newToken
  localStorage.setItem('token', newToken)
}

export function logout() {
  user.value = null
  token.value = null
  localStorage.removeItem('token')
}