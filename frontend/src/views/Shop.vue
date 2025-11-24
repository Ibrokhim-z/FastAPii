<template>
  <div class="container">
    <h1>Мой магазин</h1>
    <div class="shop">
      <div class="products">
        <div v-for="p in products" :key="p.id" class="card">
          <img :src="p.image" :alt="p.name" />
          <h3>{{ p.name }}</h3>
          <p class="price">{{ p.price.toLocaleString() }} ₸</p>
          <button @click="addToCart(p)">В корзину</button>
        </div>
      </div>

      <div class="cart">
        <h2>Корзина ({{ cart.length }})</h2>
        <div v-if="cart.length === 0" class="empty">Пусто</div>
        <div v-else>
          <div v-for="(item, i) in cart" :key="i" class="cart-item">
            <span>{{ item.name }} — {{ item.price.toLocaleString() }} ₸</span>
            <button @click="removeFromCart(item.id)" class="del">✕</button>
          </div>
          <div class="total">Итого: {{ total.toLocaleString() }} ₸</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const cart = ref([])

onMounted(async () => {
  const res = await axios.get('/api/products')
  products.value = res.data

  const saved = localStorage.getItem('cart')
  if (saved) cart.value = JSON.parse(saved)
})

const addToCart = (p) => {
  cart.value.push(p)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter(x => x.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const total = () => cart.value.reduce((s, x) => s + x.price, 0)
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
.container { max-width: 1200px; margin: 0 auto; }
h1 { text-align: center; margin-bottom: 30px; color: #333; }

.shop { display: flex; gap: 30px; }
.products { flex: 3; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.card {
  background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center; padding: 15px;
}
.card img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; }
.price { font-size: 20px; font-weight: bold; color: #e91e63; margin: 10px 0; }
button {
  background: #007bff; color: white; border: none; padding: 12px 20px;
  border-radius: 6px; cursor: pointer; font-size: 16px;
}
button:hover { background: #0056b3; }

.cart {
  flex: 1; background: white; padding: 20px; border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: sticky; top: 20px; align-self: start;
}
.cart h2 { margin-bottom: 15px; }
.cart-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
.del { background: none; color: red; font-size: 20px; }
.total { margin-top: 20px; font-size: 22px; font-weight: bold; color: #e91e63; }
.empty { color: #999; font-style: italic; }
</style>






<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
h1 { text-align: center; margin-bottom: 30px; color: #333; }
.shop { display: flex; gap: 30px; flex-wrap: wrap; }
.products { flex: 3; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; padding: 15px; }
.card img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; }
.price { font-size: 20px; font-weight: bold; color: #e91e63; margin: 10px 0; }
button { background: #007bff; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-size: 16px; }
button:hover { background: #0056b3; }
.cart { flex: 1; min-width: 300px; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: sticky; top: 20px; align-self: flex-start; }
.cart-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
.del { background: none; color: red; font-size: 24px; cursor: pointer; }
.total { margin-top: 20px; font-size: 22px; font-weight: bold; color: #e91e63; text-align: right; }
.empty { color: #999; font-style: italic; text-align: center; padding: 20px; }
</style>