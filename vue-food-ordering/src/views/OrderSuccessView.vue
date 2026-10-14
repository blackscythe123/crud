<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFoodStore } from '../stores/foodStore'

const store = useFoodStore()
const router = useRouter()

const orderId = ref('ORD-' + Math.floor(100000 + Math.random() * 900000))
const totalPaid = ref(store.totalBill)

const orderAgain = () => {
  store.clearCart()
  router.push('/')
}
</script>

<template>
  <div class="success-container">
    <div class="success-card">
      <div class="success-icon">&#10003;</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your order. We are preparing your delicious food.</p>

      <div class="order-details">
        <div class="detail-row">
          <span>Order ID:</span>
          <strong>#{{ orderId }}</strong>
        </div>
        <div class="detail-row">
          <span>Total Paid:</span>
          <strong>${{ totalPaid.toFixed(2) }}</strong>
        </div>
      </div>

      <button class="order-again-btn" @click="orderAgain">Order Again</button>
    </div>
  </div>
</template>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
}

.success-card {
  max-width: 480px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.success-icon {
  font-size: 3rem;
  color: #28a745;
  margin-bottom: 1rem;
}

.order-details {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
}

.order-again-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.order-again-btn:hover {
  background-color: #218838;
}
</style>
