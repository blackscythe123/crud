<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <div>
    <h2>Your Shopping Cart</h2>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Your cart is empty.</p>
      <router-link to="/">Browse Products</router-link>
    </div>

    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>${{ item.price }}</td>
            <td class="qty-cell">
              <button type="button" class="btn-qty" @click="cartStore.decrementQuantity(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button type="button" class="btn-qty" @click="cartStore.incrementQuantity(item.id)">+</button>
            </td>
            <td>${{ item.price * item.quantity }}</td>
            <td>
              <button type="button" class="btn-remove" @click="cartStore.removeFromCart(item.id)">Remove</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="total-label">Grand Total:</td>
            <td colspan="2" class="total-value">${{ cartStore.cartTotal }}</td>
          </tr>
        </tfoot>
      </table>

      <div class="cart-actions">
        <button type="button" class="btn btn-clear" @click="cartStore.clearCart()">Clear Cart</button>
        <router-link to="/checkout" class="btn btn-checkout">Proceed to Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.empty-cart {
  padding: 30px;
  text-align: center;
  color: #777;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

.cart-table th, .cart-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.cart-table th {
  background-color: #f2f2f2;
}

.qty-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-qty {
  width: 24px;
  height: 24px;
  background-color: #eee;
  border: 1px solid #ccc;
  cursor: pointer;
}

.btn-remove {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
}

.total-label {
  text-align: right;
  font-weight: bold;
}

.total-value {
  font-weight: bold;
  color: #27ae60;
  font-size: 16px;
}

.cart-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.btn {
  padding: 10px 18px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.btn-clear {
  background-color: #95a5a6;
  color: white;
}

.btn-checkout {
  background-color: #27ae60;
  color: white;
}
</style>
