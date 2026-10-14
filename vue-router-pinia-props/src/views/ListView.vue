<script setup>
import { RouterLink } from 'vue-router'
import { useItemStore } from '../stores/itemStore'
import ItemCard from '../components/ItemCard.vue'

const store = useItemStore()

function handleDelete(id) {
  store.deleteItem(id)
}
</script>

<template>
  <h3>Items List</h3>
  <br>

  <p>Total Items in Store: {{ store.totalCount }}</p>
  <br>

  <RouterLink to="/add">Add New Item</RouterLink>
  <br><br>

  <p v-if="store.items.length === 0">No items in store.</p>

  <div v-for="item in store.items" :key="item.id">
    <ItemCard :item="item" @delete-item="handleDelete" />
    <br>
    <hr>
    <br>
  </div>
</template>
