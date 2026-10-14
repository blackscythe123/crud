<script setup>
import { RouterLink } from 'vue-router'
import { items } from '../data/items'

function deleteItem(id) {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <h3>Items List</h3>
  <br>

  <RouterLink to="/add">Add New Item</RouterLink>
  <br><br>

  <p v-if="items.length === 0">No items available.</p>

  <ul v-if="items.length > 0">
    <li v-for="item in items" :key="item.id">
      <span>{{ item.name }} - ${{ item.price }}</span>
      <br><br>
      <RouterLink :to="'/item/' + item.id">View Details</RouterLink>
      <br><br>
      <button @click="deleteItem(item.id)">Delete</button>
      <br><br>
    </li>
  </ul>
</template>
