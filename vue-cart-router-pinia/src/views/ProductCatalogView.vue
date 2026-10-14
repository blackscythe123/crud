<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <div>
    <h2>Available Products</h2>
    <div class="product-grid">
      <div v-for="product in cartStore.products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p class="category">{{ product.category }}</p>
        <p class="price">${{ product.price }}</p>
        <button
          type="button"
          class="btn btn-add"
          @click="cartStore.addToCart(product)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  text-align: center;
  background-color: #fafafa;
}

.product-card h3 {
  font-size: 16px;
  margin: 5px 0;
}

.category {
  color: #777;
  font-size: 12px;
  margin-bottom: 8px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 12px;
}

.btn-add {
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #1f618d;
}
</style>
