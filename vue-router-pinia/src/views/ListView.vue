<script setup>
import { useItemStore } from '../stores/itemStore'

const store = useItemStore()
</script>

<template>
  <h3>Items List (from Pinia Store)</h3>
  <br>

  <p v-if="store.items.length === 0">No items available.</p>

  <ul v-if="store.items.length > 0">
    <li v-for="item in store.items" :key="item.id">
      <span>{{ item.name }} - {{ item.description }} - ${{ item.price }} (ID: {{ item.id }})</span>
      <br><br>
      <router-link :to="'/items/' + item.id">View / Edit</router-link>
      <button @click="store.deleteItem(item.id)">Delete</button>
      <br><br>
    </li>
  </ul>
</template>
