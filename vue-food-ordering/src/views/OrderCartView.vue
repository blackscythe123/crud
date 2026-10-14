<script setup>
import { useRouter } from 'vue-router'
import { useFoodStore } from '../stores/foodStore'

const store = useFoodStore()
const router = useRouter()

const checkout = () => {
  if (store.cart.length > 0) {
    router.push('/order-success')
  }
}
</script>

<template>
  <div class="cart-container">
    <h2>Your Order Cart</h2>

    <div v-if="store.cart.length === 0" class="empty-cart">
      <p>Your cart is empty.</p>
      <router-link to="/" class="menu-link">Browse Menu</router-link>
    </div>

    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.cart" :key="item.id">
            <td>{{ item.name }}</td>
            <td>${{ item.price.toFixed(2) }}</td>
            <td class="qty-cell">
              <button class="qty-btn" @click="store.decrementQuantity(item.id)">-</button>
              <span class="qty-val">{{ item.quantity }}</span>
              <button class="qty-btn" @click="store.incrementQuantity(item.id)">+</button>
            </td>
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button class="remove-btn" @click="store.removeFromCart(item.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ store.cartSubtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (5%):</span>
          <span>${{ store.taxAmount.toFixed(2) }}</span>
        </div>
        <div class="summary-row total-row">
          <span>Grand Total:</span>
          <span>${{ store.totalBill.toFixed(2) }}</span>
        </div>

        <div class="checkout-actions">
          <button class="checkout-btn" @click="checkout">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  padding: 1rem 0;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.menu-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: #007bff;
  text-decoration: none;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.cart-table th,
.cart-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.cart-table th {
  background-color: #f8f9fa;
}

.qty-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
}

.qty-btn {
  width: 28px;
  height: 28px;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
}

.qty-val {
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}

.cart-summary {
  max-width: 350px;
  margin-left: auto;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 6px;
  background-color: #fff;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.total-row {
  font-weight: bold;
  font-size: 1.1rem;
  border-top: 1px solid #ddd;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

.checkout-actions {
  margin-top: 1rem;
}

.checkout-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #0069d9;
}
</style>
