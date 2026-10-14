<script setup>
import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <div class="store-app">
    <header class="store-header">
      <h1>Vue Pinia Shopping Cart</h1>
      <nav class="nav">
        <router-link to="/" class="nav-link">Products</router-link>
        <span class="divider">|</span>
        <router-link to="/cart" class="nav-link cart-link">
          Cart ({{ cartStore.cartCount }})
        </router-link>
      </nav>
    </header>

    <main class="store-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.store-app {
  max-width: 650px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
  padding: 0 15px;
}

.store-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #333;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.store-header h1 {
  font-size: 20px;
  margin: 0;
}

.nav {
  display: flex;
  gap: 10px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #2980b9;
  font-weight: bold;
}

.nav-link.router-link-exact-active {
  color: #27ae60;
  text-decoration: underline;
}

.cart-link {
  background-color: #f1f2f6;
  padding: 6px 12px;
  border-radius: 20px;
}

.divider {
  color: #ccc;
}

.store-main {
  padding: 10px 0;
}
</style>
