<script setup>
import { useFoodStore } from './stores/foodStore'

const store = useFoodStore()
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-inner">
        <h1 class="logo">Food Ordering App</h1>
        <nav class="nav-links">
          <router-link to="/" class="nav-item">Menu</router-link>
          <router-link to="/cart" class="nav-item cart-link">
            Cart
            <span v-if="store.cartCount > 0" class="cart-badge">{{ store.cartCount }}</span>
          </router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #333;
  background-color: #f4f6f9;
}
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.header-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.4rem;
  color: #222;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-item {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.nav-item.router-link-exact-active {
  color: #007bff;
}

.cart-badge {
  background-color: #dc3545;
  color: #fff;
  border-radius: 50%;
  font-size: 0.75rem;
  min-width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  margin-left: 0.4rem;
}

.main-content {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  flex: 1;
}
</style>
