<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const router = useRouter()

const name = ref('')
const address = ref('')
const orderPlaced = ref(false)

function handleCheckout() {
  orderPlaced.value = true
  cartStore.clearCart()
}
</script>

<template>
  <div class="checkout-wrapper">
    <h2>Checkout & Order Summary</h2>

    <div v-if="orderPlaced" class="success-banner">
      <h3>Thank you for your order! 🎉</h3>
      <p>Your order has been placed successfully.</p>
      <router-link to="/" class="btn btn-shop">Continue Shopping</router-link>
    </div>

    <div v-else-if="cartStore.items.length === 0" class="empty-state">
      <p>No items in cart to checkout.</p>
      <router-link to="/">Browse Catalog</router-link>
    </div>

    <div v-else class="checkout-content">
      <div class="order-summary">
        <h3>Order Items:</h3>
        <ul>
          <li v-for="item in cartStore.items" :key="item.id">
            {{ item.name }} x {{ item.quantity }} — ${{ item.price * item.quantity }}
          </li>
        </ul>
        <p class="summary-total">Total Amount: <strong>${{ cartStore.cartTotal }}</strong></p>
      </div>

      <form @submit.prevent="handleCheckout" class="checkout-form">
        <h3>Shipping Information</h3>
        <div class="form-group">
          <label for="custName">Full Name:</label>
          <input id="custName" type="text" v-model="name" required placeholder="John Doe" />
        </div>

        <div class="form-group">
          <label for="custAddr">Delivery Address:</label>
          <textarea id="custAddr" v-model="address" rows="3" required placeholder="123 Main St, City"></textarea>
        </div>

        <button type="submit" class="btn btn-place">Confirm and Place Order</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.checkout-wrapper {
  max-width: 500px;
}

.checkout-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.order-summary ul {
  padding-left: 20px;
  margin: 10px 0;
}

.summary-total {
  font-size: 16px;
  margin-top: 10px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

input, textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
}

.btn-place {
  background-color: #27ae60;
  color: white;
  margin-top: 10px;
}

.btn-shop {
  background-color: #2980b9;
  color: white;
  display: inline-block;
  margin-top: 10px;
}

.success-banner {
  background-color: #d4edda;
  color: #155724;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
}

.empty-state {
  padding: 20px 0;
  text-align: center;
}
</style>
