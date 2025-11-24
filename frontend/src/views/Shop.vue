<template>
  <div class="container">
    <!-- Шапка -->
    <div class="header">
      <h1>Мой магазин</h1>
      <!-- Если вошёл — приветствие -->
      <div v-if="user" class="user-info">
        Привет, {{ user.name }}!
        <button @click="handleLogout" class="logout-btn">Выйти</button>
      </div>
    </div>

    <!-- Форма входа/регистрации в правом верхнем углу -->
    <div v-if="!user" class="auth-box">
      <h3>{{ isLoginMode ? 'Вход' : 'Регистрация' }}</h3>

      <input v-if="!isLoginMode" v-model="name" placeholder="Имя" />
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="password" placeholder="Пароль" type="password" />

      <button @click="doLogin" v-if="isLoginMode">Войти</button>
      <button @click="doRegister" v-else class="reg-btn">Зарегистрироваться</button>

      <p class="switch">
        {{ isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
        <a @click="isLoginMode = !isLoginMode" style="color:#007bff;cursor:pointer">
          {{ isLoginMode ? 'Регистрация' : 'Войти' }}
        </a>
      </p>
    </div>

    <!-- Товары -->
    <div class="products">
      <div v-for="p in products" :key="p.id" class="card">
        <img :src="p.image" :alt="p.name" />
        <h3>{{ p.name }}</h3>
        <p class="price">{{ p.price.toLocaleString() }} ₸</p>
        <button @click="addToCart(p)">В корзину</button>
      </div>
    </div>

    <!-- Корзина справа -->
    <div class="cart">
      <h2>Корзина ({{ cart.length }})</h2>
      <div v-if="cart.length === 0" class="empty">Пусто</div>
      <div v-else>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <span>{{ item.name }} — {{ item.price.toLocaleString() }} ₸</span>
          <button @click="removeFromCart(item.id)" class="del">✕</button>
        </div>
        <div class="total">Итого: {{ total.toLocaleString() }} ₸</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { user, login, logout } from '../stores/auth.js'

// === АВТОРИЗАЦИЯ ===
const isLoginMode = ref(true)     // true = вход, false = регистрация
const name = ref('')
const email = ref('')
const password = ref('')

const doLogin = () => {
  if (!email.value || !password.value) return alert('Введи email и пароль')
  login({ name: email.value.split('@')[0] || 'Пользователь' }, 'fake-token')
  clearForm()
}

const doRegister = () => {
  if (!name.value || !email.value || !password.value) return alert('Заполни все поля')
  alert('Регистрация прошла успешно! Теперь войди')
  isLoginMode.value = true
  clearForm()
}

const clearForm = () => {
  name.value = ''
  email.value = ''
  password.value = ''
}

const handleLogout = () => {
  logout()
}

// === ТОВАРЫ ===
const products = ref([
  { id: 1, name: "iPhone 16", price: 650000, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-1inch-deserttitanium?wid=800&hei=800&fmt=p-jpg&qlt=85" },
  { id: 2, name: "Samsung S24", price: 520000, image: "https://images.samsung.com/is/image/samsung/p6pim/kz/galaxy-s24/gallery/kz-galaxy-s24-s921-sm-s921bzkdskz-539573-800x600?$800_800_PNG$" },
  { id: 3, name: "MacBook Air", price: 720000, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-silver-select-202402?wid=800&hei=800&fmt=jpeg&qlt=85" },
  { id: 4, name: "AirPods Pro", price: 115000, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=800&hei=800&fmt=jpeg&qlt=85" },
  { id: 5, name: "PlayStation 5", price: 380000, image: "https://images.prom.ua/5042508336_w640_h640_igrovaya-pristavka-sony.jpg" },
  { id: 6, name: "Xiaomi 14", price: 420000, image: "https://i01.appmifile.com/v1/MI18_WEB/usr/731/731743/731743_1.jpg" }
])

// === КОРЗИНА ===
const cart = ref([])

onMounted(() => {
  const saved = localStorage.getItem('cart')
  if (saved) cart.value = JSON.parse(saved)
})

const addToCart = (p) => {
  cart.value.push({ ...p })
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter(x => x.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const total = computed(() => cart.value.reduce((s, x) => s + x.price, 0))
</script>

<style scoped>
.container { max-width: 1300px; margin: 0 auto; padding: 20px; position: relative; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.user-info { font-weight: bold; color: #333; font-size: 18px; }
.logout-btn { margin-left: 15px; background: #dc3545; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; }

.auth-box { position: absolute; top: 80px; right: 20px; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); width: 320px; z-index: 100; }
.auth-box input { width: 100%; padding: 12px; margin: 8px 0; border: 1px solid #ddd; border-radius: 6px; }
.auth-box button { width: 100%; padding: 12px; margin: 8px 0; border: none; border-radius: 6px; color: white; cursor: pointer; }
.auth-box button:first-of-type { background: #007bff; }
.reg-btn { background: #28a745 !important; }
.switch { text-align: center; margin-top: 10px; font-size: 14px; }

.products { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 25px; }
.card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; padding: 15px; }
.card img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; }
.price { font-size: 20px; font-weight: bold; color: #e91e63; margin: 10px 0; }
.card button { background: #007bff; color: white; padding: 12px 20px; border: none; border-radius: 6px; cursor: pointer; }

.cart { position: fixed; right: 20px; top: 100px; width: 360px; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
.cart-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
.del { background: none; color: red; font-size: 22px; cursor: pointer; }
.total { margin-top: 15px; font-size: 22px; font-weight: bold; color: #e91e63; text-align: right; }
.empty { color: #999; font-style: italic; text-align: center; padding: 20px; }
</style>